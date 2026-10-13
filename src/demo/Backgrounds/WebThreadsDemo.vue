<template>
  <h1 class="sub-category">Web Threads</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="webThreads.usage"
    :source="webThreadsSource"
    componentName="WebThreads"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <WebThreads :key="key" v-bind="webThreadsProps" />
        <BackgroundContent pillText="New Background" headline="Luminous threads woven to a glowing pinch." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color 1" v-model="color1" />
        <PreviewColorPicker title="Color 2" v-model="color2" />
        <PreviewColorPicker title="Core Color" v-model="color3" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Thread Count" :min="1" :max="10" :step="1" v-model="threadCount" />
        <PreviewSlider title="Frequency" :min="1" :max="14" :step="0.5" v-model="frequency" />
        <PreviewSlider title="Spread" :min="0" :max="0.6" :step="0.01" v-model="spread" />
        <PreviewSlider title="Taper" :min="0" :max="3" :step="0.05" v-model="taper" />
        <PreviewSlider title="Position" :min="0" :max="1" :step="0.01" v-model="position" />
        <PreviewSelect
          title="Fan Mode"
          name="web-threads-fan"
          v-model="fanMode"
          :options="[
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' }
          ]"
        />
        <PreviewSlider title="Glow" :min="0" :max="0.06" :step="0.001" v-model="glow" />
        <PreviewSlider title="Falloff" :min="0.3" :max="1.2" :step="0.01" v-model="falloff" />
        <PreviewSlider title="Thickness" :min="0.3" :max="3" :step="0.05" v-model="thickness" />
        <PreviewSlider title="Brightness" :min="0" :max="2.5" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.01" v-model="opacity" />
        <PreviewSwitch title="Mirror" v-model="mirror" />
        <PreviewSwitch title="Shimmer" v-model="shimmer" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
        <PreviewSwitch title="Cursor Light" v-model="mouseInteraction" />
        <PreviewSlider title="Cursor Strength" :min="0" :max="1" :step="0.01" v-model="mouseStrength" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="webThreads" :usage="webThreads.usage!" :source="webThreadsSource" />
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
import { webThreads } from '@/constants/code/Backgrounds/webThreadsCode';
import WebThreads, { type FanMode } from '@/content/Backgrounds/WebThreads/WebThreads.vue';
import webThreadsSource from '@/content/Backgrounds/WebThreads/WebThreads.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color1: '#10B981',
  color2: '#84CC16',
  color3: '#FFFFFF',
  speed: 0.2,
  threadCount: 6,
  frequency: 5.0,
  spread: 0.18,
  taper: 1.0,
  position: 0.5,
  fanMode: 'center' as FanMode,
  glow: 0.02,
  falloff: 0.6,
  thickness: 1.1,
  brightness: 0.6,
  opacity: 1.0,
  mirror: true,
  shimmer: false,
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseStrength: 0.3
};

const color1 = ref(DEFAULTS.color1);
const color2 = ref(DEFAULTS.color2);
const color3 = ref(DEFAULTS.color3);
const speed = ref(DEFAULTS.speed);
const threadCount = ref(DEFAULTS.threadCount);
const frequency = ref(DEFAULTS.frequency);
const spread = ref(DEFAULTS.spread);
const taper = ref(DEFAULTS.taper);
const position = ref(DEFAULTS.position);
const fanMode = ref(DEFAULTS.fanMode);
const glow = ref(DEFAULTS.glow);
const falloff = ref(DEFAULTS.falloff);
const thickness = ref(DEFAULTS.thickness);
const brightness = ref(DEFAULTS.brightness);
const opacity = ref(DEFAULTS.opacity);
const mirror = ref(DEFAULTS.mirror);
const shimmer = ref(DEFAULTS.shimmer);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseStrength = ref(DEFAULTS.mouseStrength);

const webThreadsProps = computed(() => ({
  color1: color1.value,
  color2: color2.value,
  color3: color3.value,
  speed: speed.value,
  threadCount: threadCount.value,
  frequency: frequency.value,
  spread: spread.value,
  taper: taper.value,
  position: position.value,
  fanMode: fanMode.value,
  glow: glow.value,
  falloff: falloff.value,
  thickness: thickness.value,
  brightness: brightness.value,
  opacity: opacity.value,
  mirror: mirror.value,
  shimmer: shimmer.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value,
  mouseInteraction: mouseInteraction.value,
  mouseStrength: mouseStrength.value
}));

const hasChanges = computed(
  () =>
    color1.value !== DEFAULTS.color1 ||
    color2.value !== DEFAULTS.color2 ||
    color3.value !== DEFAULTS.color3 ||
    speed.value !== DEFAULTS.speed ||
    threadCount.value !== DEFAULTS.threadCount ||
    frequency.value !== DEFAULTS.frequency ||
    spread.value !== DEFAULTS.spread ||
    taper.value !== DEFAULTS.taper ||
    position.value !== DEFAULTS.position ||
    fanMode.value !== DEFAULTS.fanMode ||
    glow.value !== DEFAULTS.glow ||
    falloff.value !== DEFAULTS.falloff ||
    thickness.value !== DEFAULTS.thickness ||
    brightness.value !== DEFAULTS.brightness ||
    opacity.value !== DEFAULTS.opacity ||
    mirror.value !== DEFAULTS.mirror ||
    shimmer.value !== DEFAULTS.shimmer ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseStrength.value !== DEFAULTS.mouseStrength
);

function reset() {
  color1.value = DEFAULTS.color1;
  color2.value = DEFAULTS.color2;
  color3.value = DEFAULTS.color3;
  speed.value = DEFAULTS.speed;
  threadCount.value = DEFAULTS.threadCount;
  frequency.value = DEFAULTS.frequency;
  spread.value = DEFAULTS.spread;
  taper.value = DEFAULTS.taper;
  position.value = DEFAULTS.position;
  fanMode.value = DEFAULTS.fanMode;
  glow.value = DEFAULTS.glow;
  falloff.value = DEFAULTS.falloff;
  thickness.value = DEFAULTS.thickness;
  brightness.value = DEFAULTS.brightness;
  opacity.value = DEFAULTS.opacity;
  mirror.value = DEFAULTS.mirror;
  shimmer.value = DEFAULTS.shimmer;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseStrength.value = DEFAULTS.mouseStrength;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'color1',
    type: 'string',
    default: "'#10B981'",
    description: 'Color of the first thread; threads blend from this toward color2.'
  },
  {
    name: 'color2',
    type: 'string',
    default: "'#84CC16'",
    description: 'Color of the last thread; threads blend toward this hue.'
  },
  {
    name: 'color3',
    type: 'string',
    default: "'#FFFFFF'",
    description: 'Hot-core color mixed into the brightest parts of the threads.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.2',
    description: 'Animation speed of the weaving motion.'
  },
  {
    name: 'threadCount',
    type: 'number',
    default: '6',
    description: 'Number of glowing threads (1–10).'
  },
  {
    name: 'frequency',
    type: 'number',
    default: '5.0',
    description: 'Number of sine waves across the screen width.'
  },
  {
    name: 'spread',
    type: 'number',
    default: '0.18',
    description: 'How far the threads fan out away from the pinch point.'
  },
  {
    name: 'taper',
    type: 'number',
    default: '1.0',
    description: 'Per-thread amplitude growth; higher values fan later threads out more.'
  },
  {
    name: 'position',
    type: 'number',
    default: '0.5',
    description: 'Vertical position of the woven strand (0 bottom, 1 top).'
  },
  {
    name: 'fanMode',
    type: 'string',
    default: "'center'",
    description: 'Where the threads pinch together: center, left, or right.'
  },
  {
    name: 'glow',
    type: 'number',
    default: '0.02',
    description: 'Brightness of the glow radiating from each thread.'
  },
  {
    name: 'falloff',
    type: 'number',
    default: '0.6',
    description: 'How tightly the glow hugs the thread (higher = thinner filament).'
  },
  {
    name: 'thickness',
    type: 'number',
    default: '1.1',
    description: 'Core thickness of each thread.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '0.6',
    description: 'Overall brightness multiplier.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Overall opacity of the effect (0–1).'
  },
  {
    name: 'mirror',
    type: 'boolean',
    default: 'true',
    description: 'Mirror the wave phase across the pinch point for a woven look.'
  },
  {
    name: 'shimmer',
    type: 'boolean',
    default: 'false',
    description: 'Add a subtle per-thread phase shimmer.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Overlay a whisper-subtle animated film grain on the threads.'
  },
  {
    name: 'grainIntensity',
    type: 'number',
    default: '0.05',
    description: 'Amplitude of the grain overlay. 0 disables it entirely.'
  },
  {
    name: 'mouseInteraction',
    type: 'boolean',
    default: 'true',
    description: 'Let the pinch point drift toward the cursor with a soft brightness bloom.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '0.3',
    description: 'Strength of the cursor influence on the pinch point and bloom.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
