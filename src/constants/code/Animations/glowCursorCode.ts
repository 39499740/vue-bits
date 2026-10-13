import code from '@/content/Animations/GlowCursor/GlowCursor.vue?raw';
import { createCodeObject } from '@/types/code';

export const glowCursor = createCodeObject(code, 'Animations/GlowCursor', {
  usage: `<script setup>
import GlowCursor from './GlowCursor.vue'
</script>

<template>
<div :style="{ position: 'relative', width: '100%', height: '500px', background: '#050610' }">
  <GlowCursor
    color="#67E8F9"
    secondaryColor="#A78BFA"
    :trailLength="40"
    :trailWidth="8"
    :trailTaper="0.8"
    :followSpeed="0.16"
    :glowIntensity="1.9"
    :glowSpread="1.2"
    :hotspot="0.65"
    :brightness="1.25"
    :opacity="1"
    :pulseSpeed="1.1"
    :noiseStrength="0.035"
    idleFade
    :idleTimeout="700"
    :fadeDuration="900"
    blendMode="screen"
  >
    <!-- Your content here -->
  </GlowCursor>
</div>
</template>`
});
