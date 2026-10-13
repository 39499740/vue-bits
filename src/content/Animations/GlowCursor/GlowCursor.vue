<script setup lang="ts">
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { onMounted, onUnmounted, ref, watch, type CSSProperties } from 'vue';

const MAX_POINTS = 64;

export type BlendMode = 'normal' | 'screen' | 'plus-lighter';

interface GlowCursorProps {
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  idleFade?: boolean;
  idleTimeout?: number;
  fadeDuration?: number;
  blendMode?: BlendMode;
  maxDevicePixelRatio?: number;
  enabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 p, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(p);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    float active = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  gl_FragColor = vec4(color * luminance, alpha);
}
`;

const hexToRgb = (hex: string): [number, number, number] => {
  let value = (hex || '').replace('#', '').trim();
  if (value.length === 3)
    value = value
      .split('')
      .map((char: string) => char + char)
      .join('');
  const parsed = Number.parseInt(value || '000000', 16);
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

interface ScalarUniform {
  value: number;
}
interface VecUniform {
  value: number[];
}

interface MainUniforms {
  uResolution: VecUniform;
  uPoints: VecUniform;
  uPointCount: ScalarUniform;
  uColor: VecUniform;
  uSecondaryColor: VecUniform;
  uTrailWidth: ScalarUniform;
  uTaper: ScalarUniform;
  uGlowIntensity: ScalarUniform;
  uGlowSpread: ScalarUniform;
  uHotspot: ScalarUniform;
  uBrightness: ScalarUniform;
  uOpacity: ScalarUniform;
  uPulseSpeed: ScalarUniform;
  uNoiseStrength: ScalarUniform;
  uTime: ScalarUniform;
  uFade: ScalarUniform;
}

const props = withDefaults(defineProps<GlowCursorProps>(), {
  color: '#67E8F9',
  secondaryColor: '#A78BFA',
  trailLength: 40,
  trailWidth: 8,
  trailTaper: 0.8,
  followSpeed: 0.16,
  glowIntensity: 1.9,
  glowSpread: 1.2,
  hotspot: 0.65,
  brightness: 1.25,
  opacity: 1,
  pulseSpeed: 1.1,
  noiseStrength: 0.035,
  idleFade: true,
  idleTimeout: 700,
  fadeDuration: 900,
  blendMode: 'screen',
  maxDevicePixelRatio: 1.5,
  enabled: true,
  className: ''
});

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

let teardown: (() => void) | null = null;

const setup = () => {
  const container = containerRef.value;
  const canvas = canvasRef.value;
  if (!container || !canvas) return;

  const renderer = new Renderer({
    canvas,
    alpha: true,
    dpr: Math.min(window.devicePixelRatio || 1, props.maxDevicePixelRatio)
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const pointData: number[] = Array(MAX_POINTS * 2).fill(0);
  const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
  const target = { x: 0, y: 0 };
  const head = { x: 0, y: 0 };

  const localProgram = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    uniforms: {
      uResolution: { value: [1, 1] },
      uPoints: { value: pointData },
      uPointCount: { value: props.trailLength },
      uColor: { value: hexToRgb(props.color) },
      uSecondaryColor: { value: hexToRgb(props.secondaryColor) },
      uTrailWidth: { value: props.trailWidth },
      uTaper: { value: props.trailTaper },
      uGlowIntensity: { value: props.glowIntensity },
      uGlowSpread: { value: props.glowSpread },
      uHotspot: { value: props.hotspot },
      uBrightness: { value: props.brightness },
      uOpacity: { value: props.opacity },
      uPulseSpeed: { value: props.pulseSpeed },
      uNoiseStrength: { value: props.noiseStrength },
      uTime: { value: 0 },
      uFade: { value: 0 }
    },
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  const mu = localProgram.uniforms as unknown as MainUniforms;
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: localProgram });

  let width = 1;
  let height = 1;
  let initialized = false;
  let pointerInside = false;
  let fade = 0;
  let lastInputTime = performance.now();
  let lastFrameTime = performance.now();
  let raf = 0;
  let destroyed = false;

  const resize = () => {
    width = Math.max(container.clientWidth, 1);
    height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height);
    mu.uResolution.value = [width, height];
  };

  const initializeTrail = (x: number, y: number) => {
    target.x = x;
    target.y = y;
    head.x = x;
    head.y = y;
    for (const point of points) {
      point.x = x;
      point.y = y;
    }
    initialized = true;
    fade = 1;
  };

  const updatePointer = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(rect.height - (event.clientY - rect.top), 0, rect.height);
    if (!initialized) initializeTrail(x, y);
    target.x = x;
    target.y = y;
    pointerInside = true;
    lastInputTime = performance.now();
  };

  const onPointerLeave = () => {
    pointerInside = false;
    lastInputTime = performance.now();
  };

  const render = (now: number) => {
    if (destroyed) return;
    const delta = Math.min((now - lastFrameTime) / 16.667, 3);
    lastFrameTime = now;

    if (initialized) {
      const headEase = 1 - Math.pow(1 - clamp(props.followSpeed, 0.01, 0.99), delta);
      const chainBase = clamp(0.28 + props.followSpeed * 0.35, 0.08, 0.92);
      const chainEase = 1 - Math.pow(1 - chainBase, delta);
      head.x += (target.x - head.x) * headEase;
      head.y += (target.y - head.y) * headEase;
      points[0].x = head.x;
      points[0].y = head.y;

      for (let i = 1; i < MAX_POINTS; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * chainEase;
        points[i].y += (points[i - 1].y - points[i].y) * chainEase;
      }

      for (let i = 0; i < MAX_POINTS; i++) {
        pointData[i * 2] = points[i].x;
        pointData[i * 2 + 1] = points[i].y;
      }
    }

    const idleFor = now - lastInputTime;
    const shouldFade = props.idleFade && (!pointerInside || idleFor > props.idleTimeout);
    const fadeStep = (16.667 * delta) / Math.max(props.fadeDuration, 16);
    const fadeTarget = initialized && props.enabled && !shouldFade ? 1 : 0;
    fade += (fadeTarget - fade) * Math.min(1, fadeStep * 7);

    mu.uPointCount.value = clamp(Math.round(props.trailLength), 2, MAX_POINTS);
    mu.uColor.value = hexToRgb(props.color);
    mu.uSecondaryColor.value = hexToRgb(props.secondaryColor);
    mu.uTrailWidth.value = Math.max(props.trailWidth, 0.1);
    mu.uTaper.value = clamp(props.trailTaper, 0, 1);
    mu.uGlowIntensity.value = Math.max(props.glowIntensity, 0);
    mu.uGlowSpread.value = Math.max(props.glowSpread, 0);
    mu.uHotspot.value = clamp(props.hotspot, 0, 1);
    mu.uBrightness.value = Math.max(props.brightness, 0);
    mu.uOpacity.value = clamp(props.opacity, 0, 1);
    mu.uPulseSpeed.value = props.pulseSpeed;
    mu.uNoiseStrength.value = clamp(props.noiseStrength, 0, 1);
    mu.uTime.value = now * 0.001;
    mu.uFade.value = fade;

    renderer.render({ scene: mesh });
    if (!destroyed) raf = requestAnimationFrame(render);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  container.addEventListener('pointermove', updatePointer);
  container.addEventListener('pointerenter', updatePointer);
  container.addEventListener('pointerleave', onPointerLeave);
  resize();
  raf = requestAnimationFrame(render);

  teardown = () => {
    destroyed = true;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    container.removeEventListener('pointermove', updatePointer);
    container.removeEventListener('pointerenter', updatePointer);
    container.removeEventListener('pointerleave', onPointerLeave);
    mesh.geometry.remove();
    localProgram.remove();
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
  () => props.maxDevicePixelRatio,
  () => {
    teardown?.();
    teardown = null;
    setup();
  }
);
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full overflow-hidden" :class="className" :style="style">
    <canvas
      ref="canvasRef"
      class="block absolute inset-0 w-full h-full pointer-events-none select-none"
      :style="{ mixBlendMode: blendMode }"
      aria-hidden="true"
    />
    <div v-if="$slots.default" class="z-1 relative w-full h-full">
      <slot />
    </div>
  </div>
</template>
