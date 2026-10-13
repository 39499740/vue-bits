<template>
  <h1 class="sub-category">Molten Metal</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="moltenMetal.usage"
    :source="moltenMetalSource"
    componentName="MoltenMetal"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <MoltenMetal :key="key" v-bind="moltenMetalProps" />
        <BackgroundContent pillText="New Background" headline="Molten violet caustics that flow like liquid." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color 1" v-model="color1" />
        <PreviewColorPicker title="Color 2" v-model="color2" />
        <PreviewColorPicker title="Color 3" v-model="color3" />
        <PreviewSelect
          title="Color Mode"
          name="molten-metal-color-mode"
          v-model="colorMode"
          :options="[
            { label: 'Molten', value: 'molten' },
            { label: 'Ember', value: 'ember' },
            { label: 'Frost', value: 'frost' }
          ]"
        />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Scale" :min="2" :max="12" :step="0.1" v-model="scale" />
        <PreviewSlider title="Detail" :min="1" :max="8" :step="1" v-model="detail" />
        <PreviewSlider title="Glow" :min="0.2" :max="3" :step="0.05" v-model="glow" />
        <PreviewSlider title="Core Size" :min="0.05" :max="0.4" :step="0.01" v-model="coreSize" />
        <PreviewSlider title="Swirl" :min="0" :max="2" :step="0.05" v-model="swirl" />
        <PreviewSlider title="Fold" :min="-0.4" :max="-0.05" :step="0.01" v-model="fold" />
        <PreviewSlider title="Black Point" :min="0" :max="0.3" :step="0.01" v-model="blackPoint" />
        <PreviewSlider title="Brightness" :min="0.2" :max="3" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.05" v-model="opacity" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
        <PreviewSwitch title="Cursor Drift" v-model="mouseInteraction" />
        <PreviewSlider title="Cursor Strength" :min="0" :max="1" :step="0.05" v-model="mouseStrength" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="molten-metal" :usage="moltenMetal.usage!" :source="moltenMetalSource" />
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
import { moltenMetal } from '@/constants/code/Backgrounds/moltenMetalCode';
import MoltenMetal, { type MoltenMetalColorMode } from '@/content/Backgrounds/MoltenMetal/MoltenMetal.vue';
import moltenMetalSource from '@/content/Backgrounds/MoltenMetal/MoltenMetal.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color1: '#27FF64',
  color2: '#A8FFB6',
  color3: '#FFFFFF',
  speed: 0.35,
  scale: 4,
  detail: 3,
  glow: 1.6,
  coreSize: 0.1,
  swirl: 1,
  fold: -0.2,
  blackPoint: 0.05,
  brightness: 1.3,
  colorMode: 'molten' as MoltenMetalColorMode,
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseStrength: 0.3,
  opacity: 1.0
};

const color1 = ref(DEFAULTS.color1);
const color2 = ref(DEFAULTS.color2);
const color3 = ref(DEFAULTS.color3);
const speed = ref(DEFAULTS.speed);
const scale = ref(DEFAULTS.scale);
const detail = ref(DEFAULTS.detail);
const glow = ref(DEFAULTS.glow);
const coreSize = ref(DEFAULTS.coreSize);
const swirl = ref(DEFAULTS.swirl);
const fold = ref(DEFAULTS.fold);
const blackPoint = ref(DEFAULTS.blackPoint);
const brightness = ref(DEFAULTS.brightness);
const colorMode = ref(DEFAULTS.colorMode);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseStrength = ref(DEFAULTS.mouseStrength);
const opacity = ref(DEFAULTS.opacity);

const moltenMetalProps = computed(() => ({
  color1: color1.value,
  color2: color2.value,
  color3: color3.value,
  speed: speed.value,
  scale: scale.value,
  detail: detail.value,
  glow: glow.value,
  coreSize: coreSize.value,
  swirl: swirl.value,
  fold: fold.value,
  blackPoint: blackPoint.value,
  brightness: brightness.value,
  colorMode: colorMode.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value,
  mouseInteraction: mouseInteraction.value,
  mouseStrength: mouseStrength.value,
  opacity: opacity.value
}));

const hasChanges = computed(
  () =>
    color1.value !== DEFAULTS.color1 ||
    color2.value !== DEFAULTS.color2 ||
    color3.value !== DEFAULTS.color3 ||
    speed.value !== DEFAULTS.speed ||
    scale.value !== DEFAULTS.scale ||
    detail.value !== DEFAULTS.detail ||
    glow.value !== DEFAULTS.glow ||
    coreSize.value !== DEFAULTS.coreSize ||
    swirl.value !== DEFAULTS.swirl ||
    fold.value !== DEFAULTS.fold ||
    blackPoint.value !== DEFAULTS.blackPoint ||
    brightness.value !== DEFAULTS.brightness ||
    colorMode.value !== DEFAULTS.colorMode ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseStrength.value !== DEFAULTS.mouseStrength ||
    opacity.value !== DEFAULTS.opacity
);

function reset() {
  color1.value = DEFAULTS.color1;
  color2.value = DEFAULTS.color2;
  color3.value = DEFAULTS.color3;
  speed.value = DEFAULTS.speed;
  scale.value = DEFAULTS.scale;
  detail.value = DEFAULTS.detail;
  glow.value = DEFAULTS.glow;
  coreSize.value = DEFAULTS.coreSize;
  swirl.value = DEFAULTS.swirl;
  fold.value = DEFAULTS.fold;
  blackPoint.value = DEFAULTS.blackPoint;
  brightness.value = DEFAULTS.brightness;
  colorMode.value = DEFAULTS.colorMode;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseStrength.value = DEFAULTS.mouseStrength;
  opacity.value = DEFAULTS.opacity;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'color1',
    type: 'string',
    default: "'#27FF64'",
    description: 'Shadow color for the dim caustic glow.'
  },
  {
    name: 'color2',
    type: 'string',
    default: "'#A8FFB6'",
    description: 'Midtone color for the flowing filaments.'
  },
  {
    name: 'color3',
    type: 'string',
    default: "'#FFFFFF'",
    description: 'Highlight color for the hot filament cores.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.35',
    description: 'Animation speed of the liquid motion.'
  },
  {
    name: 'scale',
    type: 'number',
    default: '4',
    description: 'Zoom of the caustic field (higher = more detail on screen).'
  },
  {
    name: 'detail',
    type: 'number',
    default: '3',
    description: 'Number of domain-folding iterations (1-8).'
  },
  {
    name: 'glow',
    type: 'number',
    default: '1.6',
    description: 'Gain applied to the accumulated filament glow.'
  },
  {
    name: 'coreSize',
    type: 'number',
    default: '0.1',
    description: 'Thickness of the bright filament cores.'
  },
  {
    name: 'swirl',
    type: 'number',
    default: '1',
    description: 'Amount of rotational swirl across the field.'
  },
  {
    name: 'fold',
    type: 'number',
    default: '-0.2',
    description: 'Turbulence / fold strength of the iterative warp.'
  },
  {
    name: 'blackPoint',
    type: 'number',
    default: '0.05',
    description: 'Raises the dark floor so shadows fade to transparent.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.3',
    description: 'Overall brightness of the effect.'
  },
  {
    name: 'colorMode',
    type: 'string',
    default: "'molten'",
    description: 'Palette mapping: molten, ember, or frost.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Adds subtle animated film grain.'
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
    description: 'Enables gentle drift of the field toward the cursor.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '0.3',
    description: 'Strength of the cursor drift.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Overall opacity of the effect over the page.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
