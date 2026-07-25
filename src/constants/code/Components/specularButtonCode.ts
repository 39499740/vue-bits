import code from '@/content/Components/SpecularButton/SpecularButton.vue?raw';
import { createCodeObject } from '@/types/code';

export const specularButton = createCodeObject(code, 'Components/SpecularButton', {
  installation: `npm install ogl`,
  usage: `<script setup lang="ts">
import SpecularButton from './SpecularButton.vue'

const handleClick = () => {
  console.log('clicked')
}
</script>

<template>
  <SpecularButton
    size="lg"
    :radius="18"
    tint="#ffffff"
    :tint-opacity="0"
    :blur="0"
    text-color="#f5f5f5"
    line-color="#ffffff"
    base-color="#525252"
    :intensity="1"
    :shine-size="10"
    :shine-fade="40"
    :thickness="1"
    :speed="0.35"
    follow-mouse
    :proximity="250"
    :auto-animate="false"
    @click="handleClick"
  >
    Get Started
  </SpecularButton>
</template>`
});
