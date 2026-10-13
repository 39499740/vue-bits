import code from '@/content/Backgrounds/Topography/Topography.vue?raw';
import { createCodeObject } from '@/types/code';

export const topography = createCodeObject(code, 'Backgrounds/Topography', {
  usage: `<script setup>
import Topography from './Topography.vue'
</script>

<template>
<div :style="{ width: '100%', height: '600px', position: 'relative' }">
  <Topography
    lowColor="#5227FF"
    midColor="#FF9FFC"
    highColor="#FFFFFF"
    :speed="0.35"
    :morphAmount="3.0"
    :morphSpeed="0.05"
    :bands="2.0"
    :thickness="0.01"
    :scale="1.0"
    :pixelSize="1.0"
    :glow="0.5"
    colorMode="elevation"
    :contrast="3.0"
    :brightness="1.0"
    :fillBands="false"
    :opacity="1.0"
    :grain="true"
    :grainIntensity="0.05"
    :mouseInteraction="true"
    :mouseRadius="0.3"
    :mouseStrength="0.4"
  />
</div>
</template>`
});
