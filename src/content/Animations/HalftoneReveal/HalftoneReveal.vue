<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, type CSSProperties } from 'vue';
import { Renderer, Program, Triangle, Mesh, Texture } from 'ogl';

const DEFAULT_SRC = 'https://picsum.photos/seed/halftone-reveal/1200/800';

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [0, 0, 0];
};

export type Mode = 'mono' | 'duotone' | 'color';
export type Shape = 'circle' | 'square' | 'diamond' | 'line';
export type Trigger = 'off' | 'hover' | 'always';

const MODES: Record<Mode, number> = { mono: 0, duotone: 1, color: 2 };
const SHAPES: Record<Shape, number> = { circle: 0, square: 1, diamond: 2, line: 3 };
const TRIGGERS: Record<Trigger, number> = { off: 0, hover: 1, always: 2 };

interface HalftoneRevealProps {
  src?: string;
  inkColor?: string;
  paperColor?: string;
  mode?: Mode;
  dotSize?: number;
  dotDensity?: number;
  angle?: number;
  shape?: Shape;
  contrast?: number;
  invert?: boolean;
  revealRadius?: number;
  edge?: number;
  follow?: number;
  idleReveal?: number;
  trigger?: Trigger;
  borderRadius?: string;
}

const vertex = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform float uActivity;

uniform float uDotSize;
uniform float uDensity;
uniform float uAngle;
uniform int uShape;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform int uMode;
uniform float uContrast;
uniform float uInvert;

uniform float uRevealRadius;
uniform float uEdge;
uniform float uIdleReveal;
uniform int uTrigger;

in vec2 vUv;
out vec4 fragColor;

vec2 uAspect() {
  return vec2(iResolution.x / max(iResolution.y, 1.0), 1.0);
}

vec2 coverUv(vec2 uv) {
  float ia = uImageSize.x / max(uImageSize.y, 1.0);
  float pa = iResolution.x / max(iResolution.y, 1.0);
  vec2 s = pa > ia ? vec2(1.0, ia / pa) : vec2(pa / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

vec3 gradeRGB(vec3 c) {
  c = clamp((c - 0.5) * uContrast + 0.5, 0.0, 1.0);
  return mix(c, 1.0 - c, uInvert);
}

float shapeDist(vec2 f) {
  if (uShape == 1) return max(abs(f.x), abs(f.y));
  if (uShape == 2) return abs(f.x) + abs(f.y);
  if (uShape == 3) return abs(f.y);
  return length(f);
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec4 sampleCell(vec2 st, float dens, float ang) {
  vec2 rp = rot(ang) * st * dens;
  vec2 center = floor(rp) + 0.5;
  vec2 stC = rot(-ang) * (center / dens);
  vec2 uvC = stC / uAspect();
  return texture(tMap, clamp(coverUv(uvC), 0.0, 1.0));
}

float coverage(vec2 st, float dens, float ang, float ink, float rscale) {
  vec2 rp = rot(ang) * st * dens;
  vec2 f = fract(rp) - 0.5;
  float d = shapeDist(f);
  float r = sqrt(clamp(ink, 0.0, 1.0)) * 0.72 * rscale * uDotSize;
  float w = length(fwidth(rp)) * 0.6 + 1e-4;
  return smoothstep(r + w, r - w, d);
}

void main() {
  vec2 aspect = uAspect();
  vec2 st = vUv * aspect;
  float ang = radians(uAngle);

  vec2 duv = (vUv - uMouse) * aspect;
  float dist = length(duv);

  float act = uTrigger == 2 ? 1.0 : (uTrigger == 0 ? 0.0 : uActivity);
  float radius = max(uRevealRadius, 1e-4) * mix(0.4, 1.0, act);

  float px = 1.4 / max(iResolution.y, 1.0);
  float band = max(px, radius * (1.0 - clamp(uEdge, 0.0, 1.0)) * 0.45);
  float loupe = 1.0 - smoothstep(radius - band, radius + band, dist);
  float focus = clamp(max(loupe * act, uIdleReveal), 0.0, 1.0);

  float dens = uDensity;

  vec3 print;
  if (uMode == 2) {
    vec3 gc = gradeRGB(sampleCell(st, dens, ang + radians(15.0)).rgb);
    vec3 gm = gradeRGB(sampleCell(st, dens, ang + radians(75.0)).rgb);
    vec3 gy = gradeRGB(sampleCell(st, dens, ang).rgb);
    vec3 gk = gradeRGB(sampleCell(st, dens, ang + radians(45.0)).rgb);
    float c = 1.0 - gc.r;
    float m = 1.0 - gm.g;
    float y = 1.0 - gy.b;
    float k = 1.0 - dot(gk, vec3(0.299, 0.587, 0.114));
    float gcr = min(min(c, m), y) * 0.5;
    c = clamp(c - gcr, 0.0, 1.0);
    m = clamp(m - gcr, 0.0, 1.0);
    y = clamp(y - gcr, 0.0, 1.0);
    k = clamp(max(gcr, k * k * 0.9), 0.0, 1.0);
    float covC = coverage(st, dens, ang + radians(15.0), c, 0.82);
    float covM = coverage(st, dens, ang + radians(75.0), m, 0.82);
    float covY = coverage(st, dens, ang, y, 0.82);
    float covK = coverage(st, dens, ang + radians(45.0), k, 0.78);
    print = uPaper;
    print = mix(print, print * vec3(0.10, 0.72, 0.90), covC);
    print = mix(print, print * vec3(0.92, 0.10, 0.52), covM);
    print = mix(print, print * vec3(0.98, 0.86, 0.10), covY);
    print = mix(print, print * vec3(0.08), covK);
  } else if (uMode == 1) {
    vec3 ink2 = mix(uInk.gbr, vec3(0.90, 0.24, 0.30), 0.7);
    float lumA = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float lumB = dot(gradeRGB(sampleCell(st, dens, ang + radians(38.0)).rgb), vec3(0.299, 0.587, 0.114));
    float covA = coverage(st, dens, ang, 1.0 - lumA, 1.0);
    float covB = coverage(st, dens, ang + radians(38.0), pow(1.0 - lumB, 1.4), 0.92);
    print = uPaper;
    print = mix(print, ink2, covB * 0.85);
    print = mix(print, uInk, covA);
  } else {
    float lum = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float cov = coverage(st, dens, ang, 1.0 - lum, 1.0);
    print = mix(uPaper, uInk, cov);
  }

  float t = clamp(dist / radius, 0.0, 1.0);
  float bend = t * t * t * t;
  vec2 dir = dist > 1e-5 ? duv / dist : vec2(0.0);
  vec2 off = dir * bend * radius * 0.22 / aspect;
  vec2 ca = dir * bend * 0.0045 / aspect;
  vec3 sharp = gradeRGB(vec3(
    texture(tMap, clamp(coverUv(vUv - off - ca), 0.0, 1.0)).r,
    texture(tMap, clamp(coverUv(vUv - off), 0.0, 1.0)).g,
    texture(tMap, clamp(coverUv(vUv - off + ca), 0.0, 1.0)).b
  ));

  vec3 col = mix(print, sharp, focus);
  fragColor = vec4(col, 1.0);
}
`;

interface ScalarUniform {
  value: number;
}
interface VecUniform {
  value: number[];
}
interface TextureUniform {
  value: InstanceType<typeof Texture>;
}

interface MainUniforms {
  tMap: TextureUniform;
  iResolution: VecUniform;
  uImageSize: VecUniform;
  uMouse: VecUniform;
  uActivity: ScalarUniform;
  uDotSize: ScalarUniform;
  uDensity: ScalarUniform;
  uAngle: ScalarUniform;
  uShape: ScalarUniform;
  uInk: VecUniform;
  uPaper: VecUniform;
  uMode: ScalarUniform;
  uContrast: ScalarUniform;
  uInvert: ScalarUniform;
  uRevealRadius: ScalarUniform;
  uEdge: ScalarUniform;
  uIdleReveal: ScalarUniform;
  uTrigger: ScalarUniform;
}

const props = withDefaults(defineProps<HalftoneRevealProps>(), {
  src: DEFAULT_SRC,
  inkColor: '#141414',
  paperColor: '#fff7e6',
  mode: 'mono',
  dotSize: 1,
  dotDensity: 71,
  angle: 45,
  shape: 'circle',
  contrast: 1.15,
  invert: false,
  revealRadius: 0.4,
  edge: 0.8,
  follow: 0.37,
  idleReveal: 0,
  trigger: 'hover',
  borderRadius: '16px'
});

const containerRef = ref<HTMLDivElement | null>(null);

let uniforms: MainUniforms | null = null;
let teardown: (() => void) | null = null;

const syncUniforms = () => {
  if (!uniforms) return;
  const u = uniforms;
  u.uDotSize.value = props.dotSize;
  u.uDensity.value = props.dotDensity;
  u.uAngle.value = props.angle;
  u.uShape.value = SHAPES[props.shape] ?? 0;
  u.uInk.value = hexToRgb(props.inkColor);
  u.uPaper.value = hexToRgb(props.paperColor);
  u.uMode.value = MODES[props.mode] ?? 0;
  u.uContrast.value = props.contrast;
  u.uInvert.value = props.invert ? 1 : 0;
  u.uRevealRadius.value = props.revealRadius;
  u.uEdge.value = props.edge;
  u.uIdleReveal.value = props.idleReveal;
  u.uTrigger.value = TRIGGERS[props.trigger] ?? 1;
};

watch(
  () => [
    props.dotSize,
    props.dotDensity,
    props.angle,
    props.shape,
    props.inkColor,
    props.paperColor,
    props.mode,
    props.contrast,
    props.invert,
    props.revealRadius,
    props.edge,
    props.idleReveal,
    props.trigger
  ],
  () => syncUniforms()
);

const setup = () => {
  const container = containerRef.value;
  if (!container) return;

  const reduced =
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    alpha: false,
    antialias: true
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 1);
  gl.canvas.style.width = '100%';
  gl.canvas.style.height = '100%';
  gl.canvas.style.display = 'block';
  container.appendChild(gl.canvas);

  const texture = new Texture(gl, { generateMipmaps: false });

  const rawUniforms = {
    tMap: { value: texture },
    iResolution: { value: [1, 1] },
    uImageSize: { value: [1, 1] },
    uMouse: { value: [0.5, 0.5] },
    uActivity: { value: 0 },
    uDotSize: { value: props.dotSize },
    uDensity: { value: props.dotDensity },
    uAngle: { value: props.angle },
    uShape: { value: SHAPES[props.shape] ?? 0 },
    uInk: { value: hexToRgb(props.inkColor) },
    uPaper: { value: hexToRgb(props.paperColor) },
    uMode: { value: MODES[props.mode] ?? 0 },
    uContrast: { value: props.contrast },
    uInvert: { value: props.invert ? 1 : 0 },
    uRevealRadius: { value: props.revealRadius },
    uEdge: { value: props.edge },
    uIdleReveal: { value: props.idleReveal },
    uTrigger: { value: TRIGGERS[props.trigger] ?? 1 }
  };
  const u = rawUniforms as unknown as MainUniforms;
  uniforms = u;

  const program = new Program(gl, { vertex, fragment, uniforms: rawUniforms });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = props.src;
  img.onload = () => {
    texture.image = img;
    u.uImageSize.value = [img.naturalWidth, img.naturalHeight];
  };

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h);
    u.iResolution.value = [gl.canvas.width, gl.canvas.height];
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouse = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5, active: 0, target: 0 };

  const onMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    mouse.target = reduced ? 0 : 1;
  };
  const onLeave = () => {
    mouse.target = 0;
  };
  container.addEventListener('pointermove', onMove, { passive: true });
  container.addEventListener('pointerenter', onMove, { passive: true });
  container.addEventListener('pointerleave', onLeave, { passive: true });

  let prev = performance.now();
  let raf = 0;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
    prev = now;

    const a = 1 - Math.exp(-dt / Math.max(0.001, props.follow));
    mouse.sx += (mouse.x - mouse.sx) * a;
    mouse.sy += (mouse.y - mouse.sy) * a;
    const ba = 1 - Math.exp(-dt / 0.18);
    mouse.active += (mouse.target - mouse.active) * ba;

    u.uMouse.value[0] = mouse.sx;
    u.uMouse.value[1] = mouse.sy;
    u.uActivity.value = mouse.active;

    renderer.render({ scene: mesh });
  };
  raf = requestAnimationFrame(loop);

  syncUniforms();

  teardown = () => {
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerenter', onMove);
    container.removeEventListener('pointerleave', onLeave);
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
    if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
    uniforms = null;
  };
};

onMounted(() => {
  setup();
});

onUnmounted(() => {
  teardown?.();
  teardown = null;
});

watch(
  () => props.src,
  () => {
    teardown?.();
    teardown = null;
    setup();
  }
);
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden touch-none cursor-crosshair"
    :style="{ borderRadius } as CSSProperties"
  />
</template>
