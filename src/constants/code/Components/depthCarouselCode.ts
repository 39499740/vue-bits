import code from '@/content/Components/DepthCarousel/DepthCarousel.vue?raw';
import { createCodeObject } from '@/types/code';

export const depthCarousel = createCodeObject(code, 'Components/DepthCarousel', {
  usage: `<script setup>
import DepthCarousel from './DepthCarousel.vue'

const items = [
  {
    image: 'https://picsum.photos/seed/a/800/1000',
    alt: 'One'
  },
  {
    image: 'https://picsum.photos/seed/b/800/1000',
    alt: 'Two'
  },
  {
    image: 'https://picsum.photos/seed/c/800/1000',
    alt: 'Three'
  },
  {
    image: 'https://picsum.photos/seed/d/800/1000',
    alt: 'Four'
  },
  {
    image: 'https://picsum.photos/seed/e/800/1000',
    alt: 'Five'
  }
]
</script>

<template>
  <DepthCarousel
    :items="items"
    :depth="220"
    :spread="90"
    :tilt="22"
    tilt-direction="right"
    :perspective="1400"
    :visible-cards="4"
    :falloff="0.2"
    :blur="6"
    autoplay
    loop
  />
</template>`
});
