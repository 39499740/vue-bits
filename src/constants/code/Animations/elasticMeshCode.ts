import code from '@/content/Animations/ElasticMesh/ElasticMesh.vue?raw';
import { createCodeObject } from '@/types/code';

export const elasticMesh = createCodeObject(code, 'Animations/ElasticMesh', {
  usage: `<script setup>
import ElasticMesh from './ElasticMesh.vue'
</script>

<template>
  <div :style="{ width: '480px', height: '320px' }">
    <ElasticMesh
      color1="#4F46E5"
      color2="#0EA5E9"
    />
  </div>

  <div :style="{ width: '480px', height: '320px' }">
    <ElasticMesh
      image="https://picsum.photos/seed/elastic/800/600"
      interaction="drag"
      :tilt="16"
      :shading="1"
    />
  </div>
</template>`
});
