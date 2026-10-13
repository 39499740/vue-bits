<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, type CSSProperties } from 'vue';

interface DepthTextProps {
  text?: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: boolean;
}

interface DepthLayer {
  index: number;
  color: string;
  transform: string;
}

const MAX_LAYERS = 64;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const getLayerColor = (faceColor: string, depthColor: string, index: number, total: number): string => {
  const progress = total <= 1 ? 1 : index / total;
  const eased = progress * progress;
  const faceMix = Math.round((1 - eased) * 72 + 4);
  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
};

const getTransform = (rotateX: number, rotateY: number): string =>
  `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;

const props = withDefaults(defineProps<DepthTextProps>(), {
  text: 'Elevate',
  layers: 34,
  depth: 2.4,
  faceColor: '#f8fafc',
  depthColor: '#117b5a',
  tilt: 7.5,
  pointerTracking: true,
  smoothing: 0.14,
  perspective: 900,
  autoOrbit: true,
  orbitSpeed: 0.35,
  fontSize: 'clamp(3rem, 12vw, 7rem)',
  fontWeight: 900,
  shadow: true
});

const rootRef = ref<HTMLSpanElement | null>(null);
const stageRef = ref<HTMLSpanElement | null>(null);

const safeLayers = computed(() => clamp(Math.round(Number(props.layers) || 1), 2, MAX_LAYERS));
const safeDepth = computed(() => clamp(Number(props.depth) || 0, 0, 12));
const safeTilt = computed(() => clamp(Number(props.tilt) || 0, 0, 12));
const safeSmoothing = computed(() => clamp(Number(props.smoothing) || 0.14, 0.02, 0.35));
const safePerspective = computed(() => clamp(Number(props.perspective) || 900, 300, 2000));
const safeOrbitSpeed = computed(() => clamp(Number(props.orbitSpeed) || 0, 0, 2));

const baseRotation = computed(() => ({ x: -safeTilt.value * 0.32, y: safeTilt.value * 0.42 }));

const depthLayers = computed<DepthLayer[]>(() =>
  Array.from({ length: safeLayers.value }, (_, layerIndex) => {
    const index = safeLayers.value - layerIndex;
    return {
      index,
      color: getLayerColor(props.faceColor, props.depthColor, index, safeLayers.value),
      transform: `translateZ(${-index * safeDepth.value}px)`
    };
  })
);

const rootStyle = computed<CSSProperties>(() => ({
  perspective: `${safePerspective.value}px`,
  perspectiveOrigin: '50% 48%',
  contain: 'layout paint',
  isolation: 'isolate'
}));

const stageStyle = computed<CSSProperties>(() => ({
  transformStyle: 'preserve-3d',
  transform: getTransform(baseRotation.value.x, baseRotation.value.y),
  transformOrigin: '50% 50%',
  willChange: 'transform'
}));

const textStyle = computed<CSSProperties>(() => ({
  fontSize: props.fontSize,
  fontWeight: props.fontWeight,
  lineHeight: 0.86,
  letterSpacing: '-0.065em',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden',
  fontKerning: 'normal',
  textRendering: 'geometricPrecision'
}));

let stopMotion: (() => void) | null = null;

const setupMotion = () => {
  const root = rootRef.value;
  const stage = stageRef.value;
  if (!root || !stage || typeof window === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const canTrackPointer = props.pointerTracking && finePointer && !reducedMotion;

  if (reducedMotion) {
    stage.style.transform = getTransform(baseRotation.value.x, baseRotation.value.y);
    return;
  }

  let frameId = 0;
  let activePointer = false;
  const startTime = performance.now();
  const current = { ...baseRotation.value };
  const target = { ...baseRotation.value };

  const applyTransform = () => {
    stage.style.transform = getTransform(current.x, current.y);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    activePointer = true;
    const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1, 1);
    const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1, 1);

    target.x = baseRotation.value.x - y * safeTilt.value;
    target.y = baseRotation.value.y + x * safeTilt.value;
  };

  const handlePointerLeave = () => {
    activePointer = false;
    target.x = baseRotation.value.x;
    target.y = baseRotation.value.y;
  };

  if (canTrackPointer) {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
  }

  const tick = (now: number) => {
    if ((!canTrackPointer || !activePointer) && props.autoOrbit) {
      const elapsed = (now - startTime) / 1000;
      const orbit = elapsed * safeOrbitSpeed.value * Math.PI * 2;
      const fallbackAmount = canTrackPointer ? 0.18 : 0.55;
      target.x = baseRotation.value.x + Math.sin(orbit) * safeTilt.value * fallbackAmount;
      target.y = baseRotation.value.y + Math.cos(orbit * 0.85) * safeTilt.value * fallbackAmount;
    }

    current.x += (target.x - current.x) * safeSmoothing.value;
    current.y += (target.y - current.y) * safeSmoothing.value;
    applyTransform();
    frameId = requestAnimationFrame(tick);
  };

  applyTransform();
  frameId = requestAnimationFrame(tick);

  stopMotion = () => {
    if (canTrackPointer) {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    }
    cancelAnimationFrame(frameId);
  };
};

onMounted(() => {
  setupMotion();
});

onUnmounted(() => {
  stopMotion?.();
  stopMotion = null;
});

watch(
  () => [props.autoOrbit, props.pointerTracking, safeOrbitSpeed.value, safeSmoothing.value, safeTilt.value],
  () => {
    stopMotion?.();
    stopMotion = null;
    setupMotion();
  }
);
</script>

<template>
  <span ref="rootRef" class="inline-block" :style="rootStyle">
    <span ref="stageRef" class="inline-grid relative place-items-center" :style="stageStyle">
      <span
        v-for="layer in depthLayers"
        :key="layer.index"
        aria-hidden="true"
        class="inline-block z-0 absolute inset-0 brightness-95 saturate-95 pointer-events-none"
        :style="{ ...textStyle, color: layer.color, transform: layer.transform }"
      >
        {{ text }}
      </span>
      <span
        class="inline-block z-10 relative"
        :style="{
          ...textStyle,
          color: faceColor,
          textShadow: shadow
            ? `0 22px 34px color-mix(in srgb, ${depthColor} 36%, transparent), 0 4px 8px rgba(0, 0, 0, 0.28)`
            : 'none',
          transform: 'translateZ(0.6px)'
        }"
      >
        {{ text }}
      </span>
    </span>
  </span>
</template>
