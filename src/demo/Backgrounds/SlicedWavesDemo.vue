<template>
  <h1 class="sub-category">Sliced Waves</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="slicedWaves.usage"
    :source="slicedWavesSource"
    componentName="SlicedWaves"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <SlicedWaves :key="key" v-bind="slicedWavesProps" />
        <BackgroundContent pillText="New Background" headline="A soft slatted wave rippling across the grid." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color 1" v-model="color1" />
        <PreviewColorPicker title="Color 2" v-model="color2" />
        <PreviewColorPicker title="Color 3" v-model="color3" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Travel" :min="0" :max="1" :step="0.01" v-model="travel" />
        <PreviewSlider title="Wave Spread" :min="0" :max="3" :step="0.05" v-model="waveSpread" />
        <PreviewSlider title="Row Offset" :min="0" :max="3" :step="0.05" v-model="rowOffset" />
        <PreviewSlider title="Columns" :min="2" :max="40" :step="1" v-model="columns" />
        <PreviewSlider title="Rows" :min="1" :max="24" :step="1" v-model="rows" />
        <PreviewSlider title="Bar Thickness" :min="0.05" :max="0.9" :step="0.01" v-model="barThickness" />
        <PreviewSelect
          title="Orientation"
          name="sliced-waves-orientation"
          v-model="orientation"
          :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' }
          ]"
        />
        <PreviewSlider title="Softness" :min="0" :max="0.4" :step="0.005" v-model="softness" />
        <PreviewSlider title="Glow" :min="0" :max="1" :step="0.01" v-model="glow" />
        <PreviewSlider title="Brightness" :min="0.2" :max="2" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Contrast" :min="0.2" :max="2" :step="0.05" v-model="contrast" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.05" v-model="opacity" />
        <PreviewSwitch title="Alternate Rows" v-model="alternate" />
        <PreviewSwitch title="Cursor Interaction" v-model="mouseInteraction" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
        <PreviewSlider title="Cursor Strength" :min="0" :max="2" :step="0.05" v-model="mouseStrength" />
        <PreviewSlider title="Cursor Radius" :min="0.05" :max="1" :step="0.05" v-model="mouseRadius" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="sliced-waves" :usage="slicedWaves.usage!" :source="slicedWavesSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import BackgroundContent from '@/components/common/BackgroundContent.vue';
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewColorPicker from '@/components/common/PreviewColorPicker.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { slicedWaves } from '@/constants/code/Backgrounds/slicedWavesCode';
import SlicedWaves, { type SlicedWavesOrientation } from '@/content/Backgrounds/SlicedWaves/SlicedWaves.vue';
import slicedWavesSource from '@/content/Backgrounds/SlicedWaves/SlicedWaves.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color1: '#27FF64',
  color2: '#7CFF67',
  color3: '#A8FFB6',
  columns: 14,
  rows: 8,
  barThickness: 0.1,
  speed: 0.35,
  travel: 0.7,
  waveSpread: 0.9,
  rowOffset: 1.0,
  softness: 0.05,
  glow: 0,
  brightness: 1.0,
  contrast: 1.0,
  opacity: 0.5,
  orientation: 'horizontal' as SlicedWavesOrientation,
  alternate: false,
  mouseInteraction: true,
  mouseStrength: 1,
  mouseRadius: 0.3,
  grain: true,
  grainIntensity: 0.05
};

const color1 = ref(DEFAULTS.color1);
const color2 = ref(DEFAULTS.color2);
const color3 = ref(DEFAULTS.color3);
const columns = ref(DEFAULTS.columns);
const rows = ref(DEFAULTS.rows);
const barThickness = ref(DEFAULTS.barThickness);
const speed = ref(DEFAULTS.speed);
const travel = ref(DEFAULTS.travel);
const waveSpread = ref(DEFAULTS.waveSpread);
const rowOffset = ref(DEFAULTS.rowOffset);
const softness = ref(DEFAULTS.softness);
const glow = ref(DEFAULTS.glow);
const brightness = ref(DEFAULTS.brightness);
const contrast = ref(DEFAULTS.contrast);
const opacity = ref(DEFAULTS.opacity);
const orientation = ref(DEFAULTS.orientation);
const alternate = ref(DEFAULTS.alternate);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseStrength = ref(DEFAULTS.mouseStrength);
const mouseRadius = ref(DEFAULTS.mouseRadius);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);

const slicedWavesProps = computed(() => ({
  color1: color1.value,
  color2: color2.value,
  color3: color3.value,
  columns: columns.value,
  rows: rows.value,
  barThickness: barThickness.value,
  speed: speed.value,
  travel: travel.value,
  waveSpread: waveSpread.value,
  rowOffset: rowOffset.value,
  softness: softness.value,
  glow: glow.value,
  brightness: brightness.value,
  contrast: contrast.value,
  opacity: opacity.value,
  orientation: orientation.value,
  alternate: alternate.value,
  mouseInteraction: mouseInteraction.value,
  mouseStrength: mouseStrength.value,
  mouseRadius: mouseRadius.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value
}));

const hasChanges = computed(
  () =>
    color1.value !== DEFAULTS.color1 ||
    color2.value !== DEFAULTS.color2 ||
    color3.value !== DEFAULTS.color3 ||
    columns.value !== DEFAULTS.columns ||
    rows.value !== DEFAULTS.rows ||
    barThickness.value !== DEFAULTS.barThickness ||
    speed.value !== DEFAULTS.speed ||
    travel.value !== DEFAULTS.travel ||
    waveSpread.value !== DEFAULTS.waveSpread ||
    rowOffset.value !== DEFAULTS.rowOffset ||
    softness.value !== DEFAULTS.softness ||
    glow.value !== DEFAULTS.glow ||
    brightness.value !== DEFAULTS.brightness ||
    contrast.value !== DEFAULTS.contrast ||
    opacity.value !== DEFAULTS.opacity ||
    orientation.value !== DEFAULTS.orientation ||
    alternate.value !== DEFAULTS.alternate ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseStrength.value !== DEFAULTS.mouseStrength ||
    mouseRadius.value !== DEFAULTS.mouseRadius ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity
);

function reset() {
  color1.value = DEFAULTS.color1;
  color2.value = DEFAULTS.color2;
  color3.value = DEFAULTS.color3;
  columns.value = DEFAULTS.columns;
  rows.value = DEFAULTS.rows;
  barThickness.value = DEFAULTS.barThickness;
  speed.value = DEFAULTS.speed;
  travel.value = DEFAULTS.travel;
  waveSpread.value = DEFAULTS.waveSpread;
  rowOffset.value = DEFAULTS.rowOffset;
  softness.value = DEFAULTS.softness;
  glow.value = DEFAULTS.glow;
  brightness.value = DEFAULTS.brightness;
  contrast.value = DEFAULTS.contrast;
  opacity.value = DEFAULTS.opacity;
  orientation.value = DEFAULTS.orientation;
  alternate.value = DEFAULTS.alternate;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseStrength.value = DEFAULTS.mouseStrength;
  mouseRadius.value = DEFAULTS.mouseRadius;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'color1',
    type: 'string',
    default: "'#27FF64'",
    description: 'Highlight color for bars at the top of their travel.'
  },
  {
    name: 'color2',
    type: 'string',
    default: "'#7CFF67'",
    description: 'Deep color for bars at the bottom of their travel.'
  },
  {
    name: 'color3',
    type: 'string',
    default: "'#A8FFB6'",
    description: 'Accent tint blended across the grid.'
  },
  {
    name: 'columns',
    type: 'number',
    default: '14',
    description: 'Number of grid columns.'
  },
  {
    name: 'rows',
    type: 'number',
    default: '8',
    description: 'Number of grid rows.'
  },
  {
    name: 'barThickness',
    type: 'number',
    default: '0.1',
    description: 'Thickness of each bar relative to its cell.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.35',
    description: 'Animation speed of the travelling wave.'
  },
  {
    name: 'travel',
    type: 'number',
    default: '0.7',
    description: 'How far each bar moves within its cell.'
  },
  {
    name: 'waveSpread',
    type: 'number',
    default: '0.9',
    description: 'Phase step between columns; controls how tight the wave is.'
  },
  {
    name: 'rowOffset',
    type: 'number',
    default: '1.0',
    description: 'Per-row phase offset that staggers the bars.'
  },
  {
    name: 'softness',
    type: 'number',
    default: '0.05',
    description: 'Edge softness; higher values turn bars into glowing bands.'
  },
  {
    name: 'glow',
    type: 'number',
    default: '0',
    description: 'Soft halo emitted around each bar.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.0',
    description: 'Overall brightness of the bars.'
  },
  {
    name: 'contrast',
    type: 'number',
    default: '1.0',
    description: 'Color contrast applied to the final render.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '0.5',
    description: 'Overall opacity of the effect.'
  },
  {
    name: 'orientation',
    type: 'string',
    default: "'horizontal'",
    description: "Bar orientation: 'horizontal' slats move vertically, 'vertical' slats move horizontally."
  },
  {
    name: 'alternate',
    type: 'boolean',
    default: 'false',
    description: 'Reverse the travel direction on alternating rows.'
  },
  {
    name: 'mouseInteraction',
    type: 'boolean',
    default: 'true',
    description: 'Enable cursor-proximity brightening and thickening.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '1',
    description: 'Strength of the cursor-proximity response.'
  },
  {
    name: 'mouseRadius',
    type: 'number',
    default: '0.3',
    description: 'Radius of the cursor influence falloff.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Adds a subtle animated grain.'
  },
  {
    name: 'grainIntensity',
    type: 'number',
    default: '0.05',
    description: 'Amplitude of the grain overlay. 0 disables it entirely.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
