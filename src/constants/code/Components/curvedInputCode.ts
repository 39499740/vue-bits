import code from '@/content/Components/CurvedInput/CurvedInput.vue?raw';
import { createCodeObject } from '@/types/code';

export const curvedInput = createCodeObject(code, 'Components/CurvedInput', {
  usage: `<script setup lang="ts">
import CurvedInput from './CurvedInput.vue';
import { Mail } from 'lucide-vue-next';
</script>

<template>
  <!-- Default -->
  <CurvedInput
    placeholder="david@reactbits.dev"
    button-text="Get Started"
    theme="light"
    :bend="28"
    :height="64"
    :width="450"
    @submit="value => console.log(value)"
  />

  <!-- Customized Colors -->
  <CurvedInput
    placeholder="Search components..."
    type="text"
    :show-button="true"
    :show-icon="true"
    :corner-radius="18"
    :border-width="1.5"
    :font-size="16"
    background-color="#ffffff"
    text-color="#1d2050"
    border-color="#262a56"
    button-color="#4763eb"
    button-text-color="#ffffff"
    shadow-size="md"
  />

  <!-- Custom Icon -->
  <CurvedInput placeholder="Search...">
    <template #icon>
      <g transform="translate(-8 -8)">
        <Mail :size="16" color="#ffffff" />
      </g>
    </template>
  </CurvedInput>
</template>`
});
