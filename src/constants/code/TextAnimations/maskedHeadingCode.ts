import code from '@/content/TextAnimations/MaskedHeading/MaskedHeading.vue?raw';
import { createCodeObject } from '@/types/code';

export const maskedHeading = createCodeObject(code, 'TextAnimations/MaskedHeading', {
  usage: `<script setup>
import MaskedHeading from './MaskedHeading.vue'
</script>

<template>
  <MaskedHeading text="Designed in the details" src="/hero.jpg" />
  <MaskedHeading
    text="Shot on location"
    mediaType="video"
    src="/reel.mp4"
    poster="/reel-poster.jpg"
    :fillScale="1.3"
    :parallax="34"
    reveal="wipe"
    trigger="view"
  />
</template>`
});
