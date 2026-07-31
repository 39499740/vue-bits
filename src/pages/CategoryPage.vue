<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { decodeLabel } from '../utils/utils';
import { componentMap } from '../constants/Components';

const route = useRoute();
const { t, te, locale } = useI18n();

const sub = computed(() => (route.params.subcategory as string) ?? '');
const niceName = computed(() => decodeLabel(sub.value));
const translatedName = computed(() => {
  const keyName = niceName.value === 'Ascii Text' ? 'ASCII Text' : niceName.value;
  const key = `componentNames.${keyName.replace(/\s+/g, '_')}`;
  return te(key) ? t(key) : niceName.value;
});

const loadedSlug = ref('');
const PageComponent = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null);
const loading = ref(false);
const loadError = ref(false);

watch(
  sub,
  slug => {
    const load = componentMap[slug as keyof typeof componentMap];
    loadedSlug.value = slug;
    PageComponent.value = null;
    loadError.value = false;

    if (!load) {
      loading.value = false;
      return;
    }

    loading.value = true;
    load()
      .then(module => {
        if (loadedSlug.value !== slug) return;
        PageComponent.value = defineAsyncComponent(() => Promise.resolve(module));
        loading.value = false;
      })
      .catch(() => {
        if (loadedSlug.value !== slug) return;
        loading.value = false;
        loadError.value = true;
      });
  },
  { immediate: true }
);

watch(
  [translatedName, locale],
  ([name]) => {
    if (!name) return;
    document.title = sub.value === 'index' ? t('index.pageTitle') : t('componentDetail.pageTitle', { name });
  },
  { immediate: true }
);
</script>

<template>
  <div class="category-page">
    <h1 v-if="sub !== 'index'" class="sub-category category-page-title">{{ translatedName }}</h1>
    <component :is="PageComponent" v-if="PageComponent" />
    <div v-else-if="loading" class="category-page-state">{{ $t('componentDetail.loading') }}</div>
    <div v-else-if="loadError" class="category-page-state">{{ $t('componentDetail.loadError') }}</div>
    <h1 v-else class="sub-category">{{ translatedName }}</h1>
  </div>
</template>

<style scoped>
.category-page :deep(h1.sub-category:not(.category-page-title)) {
  display: none;
}

.category-page-state {
  color: var(--text-secondary, #888);
  padding: 1.5rem 0;
}
</style>
