import code from '@/content/Animations/CursorGrid/CursorGrid.vue?raw';
import { createCodeObject } from '@/types/code';

export const cursorGrid = createCodeObject(code, 'Animations/CursorGrid', {
  usage: `<template>
  <div class="relative h-150 w-full">
    <CursorGrid
      :cell-size="70"
      color="#D946EF"
      :radius="140"
      falloff="smooth"
      :hold-time="400"
      :fade-duration="800"
      :line-width="1.2"
      :max-opacity="1"
      :fill-opacity="0"
      :grid-opacity="0"
      :cell-radius="0"
      :click-pulse="true"
      :pulse-speed="600"
    />
  </div>
</template>

<script setup>
import CursorGrid from './CursorGrid.vue'
</script>`
});
