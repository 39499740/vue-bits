<template>
  <h1 class="sub-category">Swarm Cursor</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="swarmCursor.usage"
    :source="swarmCursorSource"
    component-name="SwarmCursor"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <SwarmCursor :key="key" v-bind="swarmCursorProps">
          <div class="flex flex-col items-center gap-2 pointer-events-none select-none">
            <h2 class="font-black text-[2.6rem] text-white tracking-[-0.02em]">Move your cursor</h2>
            <p class="text-white/50 text-base">a living swarm follows — click to scatter it</p>
          </div>
        </SwarmCursor>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color" v-model="color" />
        <PreviewColorPicker title="Accent Color" v-model="accentColor" />
        <PreviewSlider title="Count" :min="6" :max="40" :step="1" v-model="count" />
        <PreviewSlider title="Size" :min="1" :max="80" :step="1" v-model="size" />
        <PreviewSlider title="Merge" :min="0.15" :max="1.6" :step="0.01" v-model="merge" />
        <PreviewSlider title="Glow" :min="0" :max="1" :step="0.01" v-model="glow" />
        <PreviewSlider title="Opacity" :min="0.1" :max="1" :step="0.01" v-model="opacity" />
        <PreviewSlider title="Spread" :min="30" :max="320" :step="5" v-model="spread" />
        <PreviewSlider title="Separation" :min="0" :max="1.5" :step="0.01" v-model="separation" />
        <PreviewSlider title="Speed" :min="1" :max="10" :step="0.1" v-model="speed" />
        <PreviewSlider title="Wander" :min="0" :max="1.2" :step="0.01" v-model="wander" />
        <PreviewSlider title="Trail" :min="0" :max="1" :step="0.01" v-model="trail" />
        <PreviewSwitch title="Scatter On Click" v-model="scatterOnClick" />
        <PreviewSwitch title="Enabled" v-model="enabled" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="swarm-cursor" :usage="swarmCursor.usage!" :source="swarmCursorSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewColorPicker from '@/components/common/PreviewColorPicker.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { swarmCursor } from '@/constants/code/Animations/swarmCursorCode';
import SwarmCursor from '@/content/Animations/SwarmCursor/SwarmCursor.vue';
import swarmCursorSource from '@/content/Animations/SwarmCursor/SwarmCursor.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color: '#ffffff',
  accentColor: '#ffffff',
  count: 8,
  size: 5,
  merge: 0.77,
  glow: 0.75,
  opacity: 1,
  spread: 100,
  separation: 0.15,
  speed: 2.5,
  wander: 0.25,
  trail: 0.75,
  scatterOnClick: true,
  enabled: true
};

const color = ref(DEFAULTS.color);
const accentColor = ref(DEFAULTS.accentColor);
const count = ref(DEFAULTS.count);
const size = ref(DEFAULTS.size);
const merge = ref(DEFAULTS.merge);
const glow = ref(DEFAULTS.glow);
const opacity = ref(DEFAULTS.opacity);
const spread = ref(DEFAULTS.spread);
const separation = ref(DEFAULTS.separation);
const speed = ref(DEFAULTS.speed);
const wander = ref(DEFAULTS.wander);
const trail = ref(DEFAULTS.trail);
const scatterOnClick = ref(DEFAULTS.scatterOnClick);
const enabled = ref(DEFAULTS.enabled);

const swarmCursorProps = computed(() => ({
  color: color.value,
  accentColor: accentColor.value,
  count: count.value,
  size: size.value,
  merge: merge.value,
  glow: glow.value,
  opacity: opacity.value,
  spread: spread.value,
  separation: separation.value,
  speed: speed.value,
  wander: wander.value,
  trail: trail.value,
  scatterOnClick: scatterOnClick.value,
  enabled: enabled.value
}));

const hasChanges = computed(
  () =>
    color.value !== DEFAULTS.color ||
    accentColor.value !== DEFAULTS.accentColor ||
    count.value !== DEFAULTS.count ||
    size.value !== DEFAULTS.size ||
    merge.value !== DEFAULTS.merge ||
    glow.value !== DEFAULTS.glow ||
    opacity.value !== DEFAULTS.opacity ||
    spread.value !== DEFAULTS.spread ||
    separation.value !== DEFAULTS.separation ||
    speed.value !== DEFAULTS.speed ||
    wander.value !== DEFAULTS.wander ||
    trail.value !== DEFAULTS.trail ||
    scatterOnClick.value !== DEFAULTS.scatterOnClick ||
    enabled.value !== DEFAULTS.enabled
);

function reset() {
  color.value = DEFAULTS.color;
  accentColor.value = DEFAULTS.accentColor;
  count.value = DEFAULTS.count;
  size.value = DEFAULTS.size;
  merge.value = DEFAULTS.merge;
  glow.value = DEFAULTS.glow;
  opacity.value = DEFAULTS.opacity;
  spread.value = DEFAULTS.spread;
  separation.value = DEFAULTS.separation;
  speed.value = DEFAULTS.speed;
  wander.value = DEFAULTS.wander;
  trail.value = DEFAULTS.trail;
  scatterOnClick.value = DEFAULTS.scatterOnClick;
  enabled.value = DEFAULTS.enabled;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'color', type: 'string', default: "'#ffffff'", description: 'Base color of the swarm.' },
  {
    name: 'accentColor',
    type: 'string',
    default: "'#ffffff'",
    description: 'Color where the swarm is densest.'
  },
  { name: 'count', type: 'number', default: '10', description: 'Number of particles in the swarm.' },
  { name: 'size', type: 'number', default: '10', description: 'Radius of each particle, in pixels.' },
  {
    name: 'merge',
    type: 'number',
    default: '0.77',
    description: 'How readily nearby particles fuse into a single body. Lower is gooier.'
  },
  { name: 'glow', type: 'number', default: '0.75', description: 'Strength of the soft halo around the swarm.' },
  { name: 'opacity', type: 'number', default: '1', description: 'Overall opacity of the effect.' },
  {
    name: 'spread',
    type: 'number',
    default: '100',
    description: 'Radius of the cloud the swarm orbits the cursor at.'
  },
  {
    name: 'separation',
    type: 'number',
    default: '0.15',
    description: 'How strongly particles push each other apart.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '2.5',
    description: 'Travel speed and turn rate of the swarm, on a 1-10 dial.'
  },
  {
    name: 'wander',
    type: 'number',
    default: '0.25',
    description: 'How strongly the drifting flow field pulls particles off their chase.'
  },
  {
    name: 'trail',
    type: 'number',
    default: '0.75',
    description: 'Length of the motion trail each particle leaves behind.'
  },
  {
    name: 'scatterOnClick',
    type: 'boolean',
    default: 'true',
    description: 'Burst the swarm outward on click, then let it regroup.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Enable or disable the effect.' },
  { name: 'children', type: 'slot', default: '—', description: 'Content the swarm moves over.' }
];
</script>
