import code from '@/content/TextAnimations/DepthText/DepthText.vue?raw';
import { createCodeObject } from '@/types/code';

export const depthText = createCodeObject(code, 'TextAnimations/DepthText', {
  usage: `<script setup lang="ts">
import DepthText from './DepthText.vue';
</script>

<template>
  <DepthText
    text="Elevate"
    :layers="34"
    :depth="2.4"
    face-color="#f8fafc"
    depth-color="#7c3aed"
    :tilt="7.5"
    pointer-tracking
    :smoothing="0.14"
    :perspective="900"
    auto-orbit
    :orbit-speed="0.35"
    font-size="clamp(3rem, 12vw, 7rem)"
    :font-weight="900"
    shadow
  />
</template>`
});
