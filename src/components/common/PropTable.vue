<template>
  <section class="prop-table-section">
    <div class="prop-table-frame">
      <div class="prop-table-heading">
        <h2 class="demo-title-extra">{{ $t('demo.props') }}</h2>
        <span>{{ data.length }} {{ data.length === 1 ? $t('demo.property') : $t('demo.properties') }}</span>
      </div>

      <!-- Desktop table -->
      <div class="prop-table-wrap">
        <table class="prop-table">
          <thead>
            <tr>
              <th>{{ $t('demo.property') }}</th>
              <th>{{ $t('demo.type') }}</th>
              <th>{{ $t('demo.default') }}</th>
              <th>{{ $t('demo.description') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.name">
              <td>
                <code class="prop-code">{{ row.name }}</code>
              </td>
              <td>
                <span class="prop-type">{{ row.type }}</span>
              </td>
              <td>
                <code class="prop-code">{{ row.default?.length ? row.default : $t('demo.placeholder') }}</code>
              </td>
              <td>{{ translatedDesc(row) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="prop-cards">
        <div class="prop-card" v-for="row in data" :key="row.name">
          <div class="prop-card-header">
            <code class="prop-code">{{ row.name }}</code>
            <span class="prop-card-type">{{ row.type }}</span>
          </div>
          <p class="prop-card-desc">{{ translatedDesc(row) }}</p>
          <div class="prop-card-default">
            <span class="prop-card-label">{{ $t('demo.defaultLabel') }}</span>
            <code class="prop-code">{{ row.default?.length ? row.default : $t('demo.placeholder') }}</code>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export type PropRow = {
  name: string;
  type: string;
  default: string;
  description: string;
};

defineProps<{ data: PropRow[] }>();

const { t, te } = useI18n();
const route = useRoute();

// TabsLayout injects the exact component name. As a safety net for pages that
// forget to pass `component-name`, derive it from the route slug instead of
// silently rendering the English source text.
const injectedSlug = inject('componentSlug', '');
const routeSlug = computed(() => {
  const sub = (route.params.subcategory as string) ?? '';
  return sub
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
});
const componentSlug = computed(() => injectedSlug || routeSlug.value);

function translatedDesc(row: PropRow): string {
  const key = componentSlug.value ? `propDescs.${componentSlug.value}.${row.name}` : '';
  return key && te(key) ? t(key) : row.description;
}
</script>
