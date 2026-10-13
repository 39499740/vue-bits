import code from '@/content/Backgrounds/AcidSquares/AcidSquares.vue?raw';
import { createCodeObject } from '@/types/code';

export const acidSquares = createCodeObject(code, 'Backgrounds/AcidSquares', {
  usage: `<script setup>
import AcidSquares from './AcidSquares.vue'
</script>

<template>
  <div
    style="width: 100%; height: 600px; position: relative;"
  >
    <AcidSquares
      color1="#5227FF"
      color2="#A855F7"
      color3="#FFFFFF"
      detail="medium"
      :speed="0.7"
      :wave-depth="1"
      :zoom="1.3"
      :density="10.0"
      :glow="1.0"
      :exposure="2700"
      :spread="0.3"
      :step-size="0.002"
      :color-shift="0"
      :contrast="1"
      :brightness="1.0"
      :opacity="1.0"
      :mouse-interaction="true"
      :mouse-strength="0.1"
      :mouse-radius="0.35"
      :blur="0"
      :grain="true"
      :grain-intensity="0.05"
    />
  </div>
</template>`
});
