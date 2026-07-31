<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

type Item = { name: string; cat: 'backgrounds' | 'animations' };

const ROW_A: Item[] = [
  { name: 'Dot Field', cat: 'backgrounds' },
  { name: 'Line Waves', cat: 'backgrounds' },
  { name: 'Blob Cursor', cat: 'animations' },
  { name: 'Soft Aurora', cat: 'backgrounds' },
  { name: 'Magnet Lines', cat: 'animations' },
  { name: 'Antigravity', cat: 'animations' },
  { name: 'Ballpit', cat: 'backgrounds' },
  { name: 'Pixel Trail', cat: 'animations' },
  { name: 'Magic Rings', cat: 'animations' }
];

const ROW_B: Item[] = [
  { name: 'Radar', cat: 'backgrounds' },
  { name: 'Shape Grid', cat: 'backgrounds' },
  { name: 'Ribbons', cat: 'animations' },
  { name: 'Grainient', cat: 'backgrounds' },
  { name: 'Orbit Images', cat: 'animations' },
  { name: 'Metallic Paint', cat: 'animations' },
  { name: 'Balatro', cat: 'backgrounds' },
  { name: 'Aurora', cat: 'backgrounds' },
  { name: 'Splash Cursor', cat: 'animations' },
  { name: 'Beams', cat: 'backgrounds' }
];

// Note: components don't exist yet, so links go to /get-started/index
const HREF = '/get-started/index';
const rowADoubled = [...ROW_A, ...ROW_A];
const rowBDoubled = [...ROW_B, ...ROW_B];
const { t, te } = useI18n();

const localize = (name: string) => {
  const key = `componentNames.${name.replace(/\s+/g, '_')}`;
  return te(key) ? t(key) : name;
};

const localizedRows = computed(() => ({
  a: rowADoubled.map(item => ({ ...item, label: localize(item.name) })),
  b: rowBDoubled.map(item => ({ ...item, label: localize(item.name) }))
}));
</script>

<template>
  <div class="ln-feat-marquee">
    <div class="ln-feat-marquee-track">
      <div class="ln-feat-marquee-scroll">
        <a
          v-for="(c, i) in localizedRows.a"
          :key="i"
          :href="HREF"
          :data-slug="toSlug(c.name)"
          :data-cat="c.cat"
          class="ln-feat-pill"
        >
          {{ c.label }}
        </a>
      </div>
    </div>
    <div class="ln-feat-marquee-track">
      <div class="ln-feat-marquee-scroll--rev ln-feat-marquee-scroll">
        <a
          v-for="(c, i) in localizedRows.b"
          :key="i"
          :href="HREF"
          :data-slug="toSlug(c.name)"
          :data-cat="c.cat"
          class="ln-feat-pill"
        >
          {{ c.label }}
        </a>
      </div>
    </div>
  </div>
</template>
