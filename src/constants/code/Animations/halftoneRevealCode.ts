import code from '@/content/Animations/HalftoneReveal/HalftoneReveal.vue?raw';
import { createCodeObject } from '@/types/code';

export const halftoneReveal = createCodeObject(code, 'Animations/HalftoneReveal', {
  usage: `<script setup>
import HalftoneReveal from './HalftoneReveal.vue'
</script>

<template>
  <div
    :style="{
      height: '500px',
      position: 'relative',
    }"
  >
    <HalftoneReveal
      src="https://picsum.photos/seed/halftone-reveal/1200/800"
      inkColor="#141414"
      paperColor="#f4efe4"
      mode="mono"
      :dotDensity="90"
      :angle="28"
      :revealRadius="0.28"
    />
  </div>
</template>`
});
