import code from '@/content/Animations/RippleDistortion/RippleDistortion.vue?raw';
import { createCodeObject } from '@/types/code';

export const rippleDistortion = createCodeObject(code, 'Animations/RippleDistortion', {
  usage: `<script setup>
import RippleDistortion from './RippleDistortion.vue'
</script>

<template>
<div :style="{ width: '600px', height: '400px' }">
    <RippleDistortion
        src="/hero.jpg"
        :brushSize="150"
        :strength="0.2"
        :swirl="1"
        :rings="4"
        grayscale
    />
</div>
</template>`
});
