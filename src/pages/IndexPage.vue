<template>
  <div>
    <ComponentList :list="componentMetadata" :title="$t('index.title')" sorting="alphabetical" has-favorite-button />
  </div>
</template>

<script setup lang="ts">
import ComponentList from '@/components/common/ComponentList.vue';
import { componentMetadata } from '@/constants/Information';
</script>
