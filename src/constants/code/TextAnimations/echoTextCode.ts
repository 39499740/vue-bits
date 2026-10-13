import code from '@/content/TextAnimations/EchoText/EchoText.vue?raw';
import { createCodeObject } from '@/types/code';

export const echoText = createCodeObject(code, 'TextAnimations/EchoText', {
  usage: `<script setup>
import EchoText from './EchoText.vue'
</script>

<template>
  <EchoText
    text="Motion Echo"
    :echoes="12"
    :lag="0.24"
    :offset="36"
    direction="right"
    :fade="0.72"
    :blur="3"
    tint="#7dd3fc"
    mode="both"
    :cursor-radius="320"
    :duration="900"
    ease="ease-out"
    font-size="clamp(3rem, 9vw, 7rem)"
    :font-weight="800"
    color="#f8fafc"
  />
</template>`
});
