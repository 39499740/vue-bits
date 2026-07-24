<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

export type Falloff = 'linear' | 'smooth' | 'sharp';

interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: Falloff;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
}

interface Pulse {
  x: number;
  y: number;
  t0: number;
}

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
  linear: t => t,
  smooth: t => t * t * (3 - 2 * t),
  sharp: t => t * t * t
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  const v =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const props = withDefaults(defineProps<CursorGridProps>(), {
  cellSize: 70,
  color: '#D946EF',
  radius: 140,
  falloff: 'smooth',
  holdTime: 400,
  fadeDuration: 800,
  lineWidth: 1.2,
  maxOpacity: 1,
  fillOpacity: 0,
  gridOpacity: 0,
  cellRadius: 0,
  clickPulse: true,
  pulseSpeed: 600
});

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Mutable, non-reactive state — mirrors the React version's plain useRef
// values that don't need to trigger re-renders.
let wake: (() => void) | null = null;
let teardown: (() => void) | null = null;

const setupCanvas = () => {
  const container = containerRef.value;
  const canvas = canvasRef.value;
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Grid state: one alpha + timestamp pair per cell, indexed row-major.
  let cols = 0;
  let rows = 0;
  let offX = 0;
  let offY = 0;
  let alphas = new Float32Array(0);
  let touched = new Float64Array(0);
  let w = 0;
  let h = 0;
  const pulses: Pulse[] = [];
  let raf = 0;
  let running = false;
  let lastFrame = 0;

  const rebuild = () => {
    w = container.offsetWidth;
    h = container.offsetHeight;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / props.cellSize) + 1;
    rows = Math.ceil(h / props.cellSize) + 1;
    // Center the lattice so edge cells crop evenly on both sides
    offX = (w - cols * props.cellSize) / 2;
    offY = (h - rows * props.cellSize) / 2;
    alphas = new Float32Array(cols * rows);
    touched = new Float64Array(cols * rows);
  };

  const cellCenter = (i: number): [number, number] => {
    const cx = offX + (i % cols) * props.cellSize + props.cellSize / 2;
    const cy = offY + Math.floor(i / cols) * props.cellSize + props.cellSize / 2;
    return [cx, cy];
  };

  // Light up every cell whose center falls inside the radius, with the
  // configured falloff curve mapping distance to brightness.
  const energize = (x: number, y: number, boost?: number) => {
    const r = Math.max(props.radius, 1);
    const ease = FALLOFF_CURVES[props.falloff] ?? FALLOFF_CURVES.linear;
    const now = performance.now();
    const minCol = Math.max(0, Math.floor((x - r - offX) / props.cellSize));
    const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / props.cellSize));
    const minRow = Math.max(0, Math.floor((y - r - offY) / props.cellSize));
    const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / props.cellSize));
    for (let cRow = minRow; cRow <= maxRow; cRow++) {
      for (let cCol = minCol; cCol <= maxCol; cCol++) {
        const i = cRow * cols + cCol;
        const [cx, cy] = cellCenter(i);
        const dist = Math.hypot(cx - x, cy - y);
        if (dist > r) continue;
        const level = ease(1 - dist / r) * props.maxOpacity * (boost ?? 1);
        if (level > alphas[i]) {
          alphas[i] = level;
          touched[i] = now;
        } else if (level > 0) {
          touched[i] = now;
        }
      }
    }
  };

  const draw = (now: number) => {
    const dt = Math.min(now - lastFrame, 50);
    lastFrame = now;
    ctx.clearRect(0, 0, w, h);
    const [cr, cg, cb] = hexToRgb(props.color);

    // Optional faint static lattice
    if (props.gridOpacity > 0) {
      ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${props.gridOpacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let cCol = 0; cCol <= cols; cCol++) {
        const x = Math.round(offX + cCol * props.cellSize) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let cRow = 0; cRow <= rows; cRow++) {
        const y = Math.round(offY + cRow * props.cellSize) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    // Expanding click pulses hand their energy to cells as they pass
    for (let pi = pulses.length - 1; pi >= 0; pi--) {
      const pulse = pulses[pi];
      const age = (now - pulse.t0) / 1000;
      const ringR = age * props.pulseSpeed;
      if (ringR > Math.hypot(w, h)) {
        pulses.splice(pi, 1);
        continue;
      }
      const band = props.cellSize;
      const minCol = Math.max(0, Math.floor((pulse.x - ringR - band - offX) / props.cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((pulse.x + ringR + band - offX) / props.cellSize));
      const minRow = Math.max(0, Math.floor((pulse.y - ringR - band - offY) / props.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringR + band - offY) / props.cellSize));
      for (let cRow = minRow; cRow <= maxRow; cRow++) {
        for (let cCol = minCol; cCol <= maxCol; cCol++) {
          const i = cRow * cols + cCol;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
          if (Math.abs(dist - ringR) < band / 2 && props.maxOpacity > alphas[i]) {
            alphas[i] = props.maxOpacity;
            touched[i] = now;
          }
        }
      }
    }

    let anyVisible = pulses.length > 0;
    const fadeStep = dt / Math.max(props.fadeDuration, 16);
    const half = props.cellSize / 2;

    for (let i = 0; i < alphas.length; i++) {
      let a = alphas[i];
      if (a <= 0) continue;
      if (now - touched[i] > props.holdTime) {
        a = Math.max(0, a - fadeStep);
        alphas[i] = a;
        if (a <= 0) continue;
      }
      anyVisible = true;

      const [cx, cy] = cellCenter(i);
      const gradient = ctx.createRadialGradient(cx, cy, half * 0.1, cx, cy, props.cellSize);
      gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${a})`);
      gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

      const x = cx - half + 0.5;
      const y = cy - half + 0.5;
      const s = props.cellSize - 1;

      ctx.beginPath();
      if (props.cellRadius > 0) {
        ctx.roundRect(x, y, s, s, props.cellRadius);
      } else {
        ctx.rect(x, y, s, s);
      }
      if (props.fillOpacity > 0) {
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a * props.fillOpacity})`;
        ctx.fill();
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = props.lineWidth;
      ctx.stroke();
    }

    if (anyVisible) {
      raf = requestAnimationFrame(draw);
    } else {
      running = false;
      if (props.gridOpacity <= 0) ctx.clearRect(0, 0, w, h);
    }
  };

  const localWake = () => {
    if (running) return;
    running = true;
    lastFrame = performance.now();
    raf = requestAnimationFrame(draw);
  };
  wake = localWake;

  const toLocal = (e: PointerEvent): [number, number] => {
    const rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  const onPointerMove = (e: PointerEvent) => {
    const [x, y] = toLocal(e);
    energize(x, y);
    localWake();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!props.clickPulse) return;
    const [x, y] = toLocal(e);
    pulses.push({ x, y, t0: performance.now() });
    localWake();
  };

  const ro = new ResizeObserver(() => {
    rebuild();
    localWake();
  });
  ro.observe(container);
  rebuild();
  localWake();

  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);

  teardown = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerdown', onPointerDown);
    wake = null;
  };
};

onMounted(() => {
  setupCanvas();
});

onUnmounted(() => {
  teardown?.();
});

watch(
  () => props.cellSize,
  () => {
    teardown?.();
    setupCanvas();
  }
);

// Repaint static layers when visual props change while idle
watch(
  () => [props.gridOpacity, props.color, props.lineWidth, props.maxOpacity, props.fillOpacity, props.cellRadius],
  () => {
    wake?.();
  }
);
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full overflow-hidden">
    <canvas ref="canvasRef" class="block w-full h-full" />
  </div>
</template>
