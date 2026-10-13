import code from '@/content/TextAnimations/StrokeText/StrokeText.vue?raw';
import { createCodeObject } from '@/types/code';

export const strokeText = createCodeObject(code, 'TextAnimations/StrokeText', {
  usage: `<script setup>
import StrokeText from './StrokeText.vue'
</script>

<template>
<div :style="{ width: '100%', height: 360, background: '#09090f' }">
  <StrokeText
    text="Draw Attention"
    strokeColor="#A78BFA"
    fillColor="#F8FAFC"
    :strokeWidth="1.4"
    :drawDuration="1.6"
    :fillDelay="0.2"
    :stagger="0.05"
    ease="power2.out"
    trigger="mount"
    fillMode="wipe"
    :fontSize="128"
    :fontWeight="800"
    :letterSpacing="-4"
  />
</div>
</template>`
});
