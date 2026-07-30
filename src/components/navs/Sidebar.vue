<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { getSavedComponents } from '@/utils/favorites';
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';

const emit = defineEmits<{ navigate: [] }>();
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

const activeCategory = computed(() => (route.params.category as string) ?? '');
const activeSub = computed(() => (route.params.subcategory as string) ?? '');

const CATEGORY_I18N_KEY: Record<string, string> = {
  'Get Started': 'categories.getStarted',
  'Text Animations': 'categories.textAnimations',
  Animations: 'categories.animations',
  Components: 'categories.components',
  Backgrounds: 'categories.backgrounds'
};

function catName(cat: string): string {
  const key = CATEGORY_I18N_KEY[cat];
  return key ? t(key) : cat;
}

function isActive(cat: string, sub: string) {
  return slug(cat) === activeCategory.value && slug(sub) === activeSub.value;
}

// ── saved set ─────────────────────────────────────────────────────────────────
const savedSet = ref(new Set(getSavedComponents()));

function loadSaved() {
  savedSet.value = new Set(getSavedComponents());
}
const onStorage = (e: StorageEvent) => {
  if (!e.key || e.key === 'savedComponents') loadSaved();
};

onMounted(() => {
  loadSaved();
  window.addEventListener('favorites:updated', loadSaved);
  window.addEventListener('storage', onStorage);
});
onBeforeUnmount(() => {
  window.removeEventListener('favorites:updated', loadSaved);
  window.removeEventListener('storage', onStorage);
});

// ── navigation ────────────────────────────────────────────────────────────────
async function navigate(path: string) {
  emit('navigate');
  if (route.path === path) return;
  await router.push(path);
  window.scrollTo(0, 0);
}
</script>

<template>
  <aside class="sidebar" :aria-label="$t('favorites.docsNav')">
    <div class="sidebar-inner">
      <div class="sidebar-cat-list">
        <div v-for="cat in CATEGORIES" :key="cat.name">
          <p :id="`sidebar-${slug(cat.name)}`" class="category-name">{{ catName(cat.name) }}</p>
          <div class="sidebar-stack" role="list" :aria-labelledby="`sidebar-${slug(cat.name)}`">
            <a
              v-for="sub in cat.subcategories"
              :key="sub"
              class="sidebar-item"
              :class="{
                active: isActive(cat.name, sub)
              }"
              :href="`/${slug(cat.name)}/${slug(sub)}`"
              :aria-current="isActive(cat.name, sub) ? 'page' : undefined"
              role="listitem"
              @click.prevent="navigate(`/${slug(cat.name)}/${slug(sub)}`)"
            >
              <span>{{ sub }}</span>
              <svg
                v-if="savedSet.has(`${cat.name}/${sub}`)"
                class="favorite-sidebar-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                />
              </svg>
              <span v-if="(NEW as string[]).includes(sub)" class="new-tag">{{ $t('sidebar.new') }}</span>
              <span v-else-if="(UPDATED as string[]).includes(sub)" class="updated-tag">{{ $t('sidebar.updated') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
