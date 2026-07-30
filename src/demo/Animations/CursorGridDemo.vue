<template>
  <h1 class="sub-category">Cursor Grid</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="cursorGrid.usage"
    :source="cursorGridSource"
    component-name="CursorGrid"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <CursorGrid v-bind="cursorGridProps" />
        <p
          class="top-1/2 left-1/2 absolute font-black text-[#293a2d] text-[clamp(2rem,6vw,3rem)] text-center -translate-x-1/2 -translate-y-1/2"
        >
          Move Your Cursor
        </p>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color" v-model="color" />
        <PreviewSelect title="Falloff" :options="['linear', 'smooth', 'sharp']" v-model="falloff" />
        <PreviewSlider title="Cell Size" :min="30" :max="160" :step="5" v-model="cellSize" valueUnit="px" />
        <PreviewSlider title="Radius" :min="40" :max="400" :step="10" v-model="radius" valueUnit="px" />
        <PreviewSlider title="Hold Time" :min="0" :max="2000" :step="50" v-model="holdTime" valueUnit="ms" />
        <PreviewSlider title="Fade Duration" :min="100" :max="3000" :step="50" v-model="fadeDuration" valueUnit="ms" />
        <PreviewSlider title="Line Width" :min="0.5" :max="4" :step="0.1" v-model="lineWidth" valueUnit="px" />
        <PreviewSlider title="Max Opacity" :min="0.1" :max="1" :step="0.05" v-model="maxOpacity" />
        <PreviewSlider title="Fill Opacity" :min="0" :max="0.5" :step="0.02" v-model="fillOpacity" />
        <PreviewSlider title="Grid Opacity" :min="0" :max="0.3" :step="0.01" v-model="gridOpacity" />
        <PreviewSlider title="Cell Corners" :min="0" :max="20" :step="1" v-model="cellRadius" valueUnit="px" />
        <PreviewSlider title="Pulse Speed" :min="100" :max="2000" :step="50" v-model="pulseSpeed" valueUnit="px/s" />
        <PreviewSwitch title="Click Pulse" v-model="clickPulse" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="cursorGrid" :usage="cursorGrid.usage!" :source="cursorGridSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewColorPicker from '@/components/common/PreviewColorPicker.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { cursorGrid } from '@/constants/code/Animations/cursorGridCode';
import CursorGrid, { type Falloff } from '@/content/Animations/CursorGrid/CursorGrid.vue';
import cursorGridSource from '@/content/Animations/CursorGrid/CursorGrid.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEFAULTS = {
  cellSize: 70,
  color: '#57ef46',
  radius: 140,
  falloff: 'smooth' as Falloff,
  holdTime: 400,
  fadeDuration: 800,
  lineWidth: 1.2,
  maxOpacity: 1,
  fillOpacity: 0,
  gridOpacity: 0,
  cellRadius: 0,
  clickPulse: true,
  pulseSpeed: 600
};

const cellSize = ref(DEFAULTS.cellSize);
const color = ref(DEFAULTS.color);
const radius = ref(DEFAULTS.radius);
const falloff = ref(DEFAULTS.falloff);
const holdTime = ref(DEFAULTS.holdTime);
const fadeDuration = ref(DEFAULTS.fadeDuration);
const lineWidth = ref(DEFAULTS.lineWidth);
const maxOpacity = ref(DEFAULTS.maxOpacity);
const fillOpacity = ref(DEFAULTS.fillOpacity);
const gridOpacity = ref(DEFAULTS.gridOpacity);
const cellRadius = ref(DEFAULTS.cellRadius);
const clickPulse = ref(DEFAULTS.clickPulse);
const pulseSpeed = ref(DEFAULTS.pulseSpeed);

const cursorGridProps = computed(() => ({
  cellSize: cellSize.value,
  color: color.value,
  radius: radius.value,
  falloff: falloff.value,
  holdTime: holdTime.value,
  fadeDuration: fadeDuration.value,
  lineWidth: lineWidth.value,
  maxOpacity: maxOpacity.value,
  fillOpacity: fillOpacity.value,
  gridOpacity: gridOpacity.value,
  cellRadius: cellRadius.value,
  clickPulse: clickPulse.value,
  pulseSpeed: pulseSpeed.value
}));

const hasChanges = computed(
  () =>
    cellSize.value !== DEFAULTS.cellSize ||
    color.value !== DEFAULTS.color ||
    radius.value !== DEFAULTS.radius ||
    falloff.value !== DEFAULTS.falloff ||
    holdTime.value !== DEFAULTS.holdTime ||
    fadeDuration.value !== DEFAULTS.fadeDuration ||
    lineWidth.value !== DEFAULTS.lineWidth ||
    maxOpacity.value !== DEFAULTS.maxOpacity ||
    fillOpacity.value !== DEFAULTS.fillOpacity ||
    gridOpacity.value !== DEFAULTS.gridOpacity ||
    cellRadius.value !== DEFAULTS.cellRadius ||
    clickPulse.value !== DEFAULTS.clickPulse ||
    pulseSpeed.value !== DEFAULTS.pulseSpeed
);

function reset() {
  cellSize.value = DEFAULTS.cellSize;
  color.value = DEFAULTS.color;
  radius.value = DEFAULTS.radius;
  falloff.value = DEFAULTS.falloff;
  holdTime.value = DEFAULTS.holdTime;
  fadeDuration.value = DEFAULTS.fadeDuration;
  lineWidth.value = DEFAULTS.lineWidth;
  maxOpacity.value = DEFAULTS.maxOpacity;
  fillOpacity.value = DEFAULTS.fillOpacity;
  gridOpacity.value = DEFAULTS.gridOpacity;
  cellRadius.value = DEFAULTS.cellRadius;
  clickPulse.value = DEFAULTS.clickPulse;
  pulseSpeed.value = DEFAULTS.pulseSpeed;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'cellSize', type: 'number', default: '70', description: 'Size of each grid cell in pixels.' },
  { name: 'color', type: 'string', default: '"#57ef46"', description: 'Color of the cell strokes, fills and pulses.' },
  {
    name: 'radius',
    type: 'number',
    default: '140',
    description: 'Radius in pixels around the cursor within which cells light up.'
  },
  {
    name: 'falloff',
    type: '"linear" | "smooth" | "sharp"',
    default: '"smooth"',
    description: 'Curve mapping distance from the cursor to cell brightness.'
  },
  {
    name: 'holdTime',
    type: 'number',
    default: '400',
    description: 'How long in milliseconds a cell stays lit before it starts fading.'
  },
  {
    name: 'fadeDuration',
    type: 'number',
    default: '800',
    description: 'How long in milliseconds a fully lit cell takes to fade out.'
  },
  { name: 'lineWidth', type: 'number', default: '1.2', description: 'Stroke width of the cell outlines.' },
  { name: 'maxOpacity', type: 'number', default: '1', description: 'Peak opacity of a cell at the cursor position.' },
  {
    name: 'fillOpacity',
    type: 'number',
    default: '0',
    description: 'Translucent fill of lit cells; 0 disables the fill.'
  },
  {
    name: 'gridOpacity',
    type: 'number',
    default: '0',
    description: 'Opacity of a faint always-visible lattice; 0 hides it.'
  },
  { name: 'cellRadius', type: 'number', default: '0', description: 'Corner radius of the cells in pixels.' },
  {
    name: 'clickPulse',
    type: 'boolean',
    default: 'true',
    description: 'Emit an expanding ring of lit cells on click.'
  },
  {
    name: 'pulseSpeed',
    type: 'number',
    default: '600',
    description: 'Expansion speed of the click ring in pixels per second.'
  },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the wrapper.' }
];
</script>
