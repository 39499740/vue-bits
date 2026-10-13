import code from '@/content/TextAnimations/TextLoop/TextLoop.vue?raw';
import { createCodeObject } from '@/types/code';

export const textLoop = createCodeObject(code, 'TextAnimations/TextLoop', {
  usage: `<script setup>
import TextLoop from './TextLoop.vue'
</script>

<template>
<div :style="{ width: '100%', height: 360, background: '#09090f' }">
  <TextLoop
    text="Vue ✦ Bits"
    shape="wave"
    :speed="90"
    direction="forward"
    separator="✦"
    :curviness="90"
    :fontSize="46"
    :fontWeight="800"
    :letterSpacing="2"
    uppercase
    color="#ffffff"
    ribbon
    ribbonColor="#5227FF"
    :ribbonWidth="86"
    pauseOnHover
  />
</div>
</template>`
});
