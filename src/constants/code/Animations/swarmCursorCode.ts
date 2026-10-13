import code from '@/content/Animations/SwarmCursor/SwarmCursor.vue?raw';
import { createCodeObject } from '@/types/code';

export const swarmCursor = createCodeObject(code, 'Animations/SwarmCursor', {
  usage: `<script setup>
import SwarmCursor from './SwarmCursor.vue'
</script>

<template>
<div :style="{ position: 'relative', width: '100%', height: '450px' }">
  <SwarmCursor
    color="#ffffff"
    accentColor="#ffffff"
    :count="10"
    :size="10"
    :speed="2.5"
    :spread="100"
    :wander="0.25"
    :trail="0.75"
    scatterOnClick
  >
    <!-- Your content here -->
  </SwarmCursor>
</div>
</template>`
});
