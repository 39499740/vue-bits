import code from '@/content/TextAnimations/FoldText/FoldText.vue?raw';
import { createCodeObject } from '@/types/code';

export const foldText = createCodeObject(code, 'TextAnimations/FoldText', {
  usage: `<script setup>
import FoldText from './FoldText.vue'
</script>

<template>
  <FoldText
    text="Design unfolds"
    split-by="char"
    hinge="top"
    trigger="mount"
    :duration="0.65"
    :stagger="0.045"
    ease="power3.out"
    :perspective="700"
    :crease-shading="0.55"
    :font-size="80"
    :font-weight="800"
    color="#f7f2e8"
  />
</template>`
});
