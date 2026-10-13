import code from '@/content/Components/AccordionGallery/AccordionGallery.vue?raw';
import { createCodeObject } from '@/types/code';

export const accordionGallery = createCodeObject(code, 'Components/AccordionGallery', {
  usage: `<script setup>
import AccordionGallery from './AccordionGallery.vue'

const items = [
  {
    image: 'https://picsum.photos/id/1015/900/1200',
    label: 'Canyon',
    link: '#'
  },
  {
    image: 'https://picsum.photos/id/1018/900/1200',
    label: 'Ridgeline',
    link: '#'
  },
  {
    image: 'https://picsum.photos/id/1039/900/1200',
    label: 'Falls',
    link: '#'
  },
  {
    image: 'https://picsum.photos/id/1043/900/1200',
    label: 'Harbour',
    link: '#'
  },
  {
    image: 'https://picsum.photos/id/1044/900/1200',
    label: 'Skyline',
    link: '#'
  }
]
</script>

<template>
  <AccordionGallery
    :items="items"
    :default-index="2"
    :expand-ratio="0.52"
    trigger="hover"
    accent-color="#ffffff"
    overlay-color="#060010"
    text-color="#ffffff"
    grayscale
    show-labels
    :duration="0.6"
    ease="power3.out"
    :parallax="0.5"
    :tilt="8"
    :stagger="0.06"
    :height="460"
    :gap="10"
    :radius="16"
    orientation="horizontal"
  />
</template>`
});
