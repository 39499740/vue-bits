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

const SUB_CATEGORY_I18N_KEY: Record<string, string> = {
  'Index': 'categories.getStarted',
  'ASCII Text': 'componentNames.ASCII_Text',
  'Blur Text': 'componentNames.Blur_Text',
  'Circular Text': 'componentNames.Circular_Text',
  'Count Up': 'componentNames.Count_Up',
  'Curved Loop': 'componentNames.Curved_Loop',
  'Decrypted Text': 'componentNames.Decrypted_Text',
  'Falling Text': 'componentNames.Falling_Text',
  'Fuzzy Text': 'componentNames.Fuzzy_Text',
  'Glitch Text': 'componentNames.Glitch_Text',
  'Gradient Text': 'componentNames.Gradient_Text',
  'Rotating Text': 'componentNames.Rotating_Text',
  'Scramble Text': 'componentNames.Scramble_Text',
  'Scroll Float': 'componentNames.Scroll_Float',
  'Scroll Reveal': 'componentNames.Scroll_Reveal',
  'Scroll Velocity': 'componentNames.Scroll_Velocity',
  'Shiny Text': 'componentNames.Shiny_Text',
  'Shuffle': 'componentNames.Shuffle',
  'Split Text': 'componentNames.Split_Text',
  'Text Cursor': 'componentNames.Text_Cursor',
  'Text Pressure': 'componentNames.Text_Pressure',
  'Text Type': 'componentNames.Text_Type',
  'True Focus': 'componentNames.True_Focus',
  'Variable Proximity': 'componentNames.Variable_Proximity',
  'Animated Content': 'componentNames.Animated_Content',
  'Antigravity': 'componentNames.Antigravity',
  'Blob Cursor': 'componentNames.Blob_Cursor',
  'Click Spark': 'componentNames.Click_Spark',
  'Crosshair': 'componentNames.Crosshair',
  'Cubes': 'componentNames.Cubes',
  'Electric Border': 'componentNames.Electric_Border',
  'Fade Content': 'componentNames.Fade_Content',
  'Ghost Cursor': 'componentNames.Ghost_Cursor',
  'Glare Hover': 'componentNames.Glare_Hover',
  'Gradual Blur': 'componentNames.Gradual_Blur',
  'Image Trail': 'componentNames.Image_Trail',
  'Laser Flow': 'componentNames.Laser_Flow',
  'Logo Loop': 'componentNames.Logo_Loop',
  'Magic Rings': 'componentNames.Magic_Rings',
  'Magnet': 'componentNames.Magnet',
  'Magnet Lines': 'componentNames.Magnet_Lines',
  'Meta Balls': 'componentNames.Meta_Balls',
  'Metallic Paint': 'componentNames.Metallic_Paint',
  'Noise': 'componentNames.Noise',
  'Orbit Images': 'componentNames.Orbit_Images',
  'Pixel Trail': 'componentNames.Pixel_Trail',
  'Pixel Transition': 'componentNames.Pixel_Transition',
  'Ribbons': 'componentNames.Ribbons',
  'Shape Blur': 'componentNames.Shape_Blur',
  'Splash Cursor': 'componentNames.Splash_Cursor',
  'Star Border': 'componentNames.Star_Border',
  'Sticker Peel': 'componentNames.Sticker_Peel',
  'Strands': 'componentNames.Strands',
  'Target Cursor': 'componentNames.Target_Cursor',
  'Animated List': 'componentNames.Animated_List',
  'Border Glow': 'componentNames.Border_Glow',
  'Bounce Cards': 'componentNames.Bounce_Cards',
  'Bubble Menu': 'componentNames.Bubble_Menu',
  'Card Nav': 'componentNames.Card_Nav',
  'Card Swap': 'componentNames.Card_Swap',
  'Carousel': 'componentNames.Carousel',
  'Chroma Grid': 'componentNames.Chroma_Grid',
  'Circular Gallery': 'componentNames.Circular_Gallery',
  'Counter': 'componentNames.Counter',
  'Decay Card': 'componentNames.Decay_Card',
  'Dock': 'componentNames.Dock',
  'Dome Gallery': 'componentNames.Dome_Gallery',
  'Elastic Slider': 'componentNames.Elastic_Slider',
  'Flowing Menu': 'componentNames.Flowing_Menu',
  'Flying Posters': 'componentNames.Flying_Posters',
  'Folder': 'componentNames.Folder',
  'Glass Icons': 'componentNames.Glass_Icons',
  'Glass Surface': 'componentNames.Glass_Surface',
  'Gooey Nav': 'componentNames.Gooey_Nav',
  'Infinite Menu': 'componentNames.Infinite_Menu',
  'Magic Bento': 'componentNames.Magic_Bento',
  'Masonry': 'componentNames.Masonry',
  'Model Viewer': 'componentNames.Model_Viewer',
  'Pill Nav': 'componentNames.Pill_Nav',
  'Pixel Card': 'componentNames.Pixel_Card',
  'Profile Card': 'componentNames.Profile_Card',
  'Reflective Card': 'componentNames.Reflective_Card',
  'Scroll Stack': 'componentNames.Scroll_Stack',
  'Spotlight Card': 'componentNames.Spotlight_Card',
  'Stack': 'componentNames.Stack',
  'Staggered Menu': 'componentNames.Staggered_Menu',
  'Stepper': 'componentNames.Stepper',
  'Tilted Card': 'componentNames.Tilted_Card',
  'Aurora': 'componentNames.Aurora',
  'Balatro': 'componentNames.Balatro',
  'Ballpit': 'componentNames.Ballpit',
  'Beams': 'componentNames.Beams',
  'Color Bends': 'componentNames.Color_Bends',
  'Dark Veil': 'componentNames.Dark_Veil',
  'Dither': 'componentNames.Dither',
  'Dot Field': 'componentNames.Dot_Field',
  'Dot Grid': 'componentNames.Dot_Grid',
  'Faulty Terminal': 'componentNames.Faulty_Terminal',
  'Ferrofluid': 'componentNames.Ferrofluid',
  'Floating Lines': 'componentNames.Floating_Lines',
  'Galaxy': 'componentNames.Galaxy',
  'Gradient Blinds': 'componentNames.Gradient_Blinds',
  'Grainient': 'componentNames.Grainient',
  'Grid Distortion': 'componentNames.Grid_Distortion',
  'Grid Motion': 'componentNames.Grid_Motion',
  'Grid Scan': 'componentNames.Grid_Scan',
  'Hyperspeed': 'componentNames.Hyperspeed',
  'Iridescence': 'componentNames.Iridescence',
  'Letter Glitch': 'componentNames.Letter_Glitch',
  'Light Pillar': 'componentNames.Light_Pillar',
  'Light Rays': 'componentNames.Light_Rays',
  'Lightfall': 'componentNames.Lightfall',
  'Lightning': 'componentNames.Lightning',
  'Line Waves': 'componentNames.Line_Waves',
  'Liquid Chrome': 'componentNames.Liquid_Chrome',
  'Liquid Ether': 'componentNames.Liquid_Ether',
  'Orb': 'componentNames.Orb',
  'Particles': 'componentNames.Particles',
  'Pixel Blast': 'componentNames.Pixel_Blast',
  'Pixel Snow': 'componentNames.Pixel_Snow',
  'Plasma': 'componentNames.Plasma',
  'Plasma Wave': 'componentNames.Plasma_Wave',
  'Prism': 'componentNames.Prism',
  'Prismatic Burst': 'componentNames.Prismatic_Burst',
  'Radar': 'componentNames.Radar',
  'Ripple Grid': 'componentNames.Ripple_Grid',
  'Shape Grid': 'componentNames.Shape_Grid',
  'Side Rays': 'componentNames.Side_Rays',
  'Silk': 'componentNames.Silk',
  'Soft Aurora': 'componentNames.Soft_Aurora',
  'Threads': 'componentNames.Threads',
  'Waves': 'componentNames.Waves',
  'Evil Eye': 'componentNames.Evil_Eye'
};

function subName(sub: string): string {
  const key = SUB_CATEGORY_I18N_KEY[sub];
  return key ? t(key) : sub;
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
              <span>{{ subName(sub) }}</span>
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
