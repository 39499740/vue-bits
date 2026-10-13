import code from '@/content/Backgrounds/WebThreads/WebThreads.vue?raw';
import { createCodeObject } from '@/types/code';

export const webThreads = createCodeObject(code, 'Backgrounds/WebThreads', {
  usage: `<script setup>
import WebThreads from './WebThreads.vue'
</script>

<template>
<div :style="{ width: '100%', height: '600px', position: 'relative' }">
  <WebThreads
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    :speed="0.2"
    :threadCount="6"
    :frequency="5.0"
    :spread="0.18"
    :taper="1.0"
    :position="0.5"
    fanMode="center"
    :glow="0.02"
    :falloff="0.6"
    :thickness="1.1"
    :brightness="0.6"
    :opacity="1.0"
    :mirror="true"
    :shimmer="false"
    :grain="true"
    :grainIntensity="0.05"
    :mouseInteraction="true"
    :mouseStrength="0.3"
  />
</div>
</template>`
});
