import code from '@/content/TextAnimations/WarpText/WarpText.vue?raw';
import { createCodeObject } from '@/types/code';

export const warpText = createCodeObject(code, 'TextAnimations/WarpText', {
  usage: `<script setup>
import WarpText from './WarpText.vue'
</script>

<template>
<div :style="{ width: '100%', height: 360, background: '#09090f' }">
  <WarpText
    text="Bend the moment"
    color="#f8f5ff"
    :warpStrength="0.08"
    :warpScale="1.7"
    :speed="0.55"
    :pointerInfluence="0.42"
    :pointerStrength="0.38"
    :refraction="0.018"
    ripple
    fontSize="clamp(3rem, 10vw, 9rem)"
    :fontWeight="800"
    :style="{ height: '320px' }"
  />
</div>
</template>`
});
