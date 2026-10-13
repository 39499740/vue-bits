<template>
  <h1 class="sub-category">Ripple Distortion</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="rippleDistortion.usage"
    :source="rippleDistortionSource"
    component-name="RippleDistortion"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <RippleDistortion v-bind="rippleDistortionProps" />
        <RefreshButton @click="forceRerender" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSlider title="Brush Size" :min="40" :max="260" :step="5" v-model="brushSize" valueUnit="px" />
        <PreviewSlider title="Strength" :min="0.01" :max="0.3" :step="0.005" v-model="strength" />
        <PreviewSlider title="Swirl" :min="0" :max="3" :step="0.05" v-model="swirl" />
        <PreviewSlider title="Rings" :min="0" :max="5" :step="0.25" v-model="rings" />
        <PreviewSlider title="Spread" :min="1" :max="10" :step="0.25" v-model="spread" />
        <PreviewSlider title="Fade" :min="0.5" :max="5" :step="0.1" v-model="fade" valueUnit="s" />
        <PreviewSlider title="Spacing" :min="1" :max="40" :step="1" v-model="spacing" valueUnit="px" />
        <PreviewSlider title="Click Strength" :min="1" :max="4" :step="0.1" v-model="clickStrength" />
        <PreviewSlider title="Dispersion" :min="0" :max="1" :step="0.05" v-model="dispersion" />
        <PreviewSlider title="Glint" :min="0" :max="1.5" :step="0.05" v-model="glint" />
        <PreviewSlider title="Tint Amount" :min="0" :max="0.6" :step="0.02" v-model="tintAmount" />
        <PreviewColorPicker title="Tint" v-model="tint" />
        <PreviewColorPicker title="Highlight" v-model="highlightColor" />
        <PreviewSelect title="Trigger" :options="triggerOptions" v-model="trigger" />
        <PreviewSelect title="Quality" :options="qualityOptions" v-model="quality" />
        <PreviewSwitch title="Grayscale" v-model="grayscale" />
        <PreviewSwitch title="Enabled" v-model="enabled" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="ripple-distortion" :usage="rippleDistortion.usage!" :source="rippleDistortionSource" />
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
import RefreshButton from '@/components/common/RefreshButton.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { rippleDistortion } from '@/constants/code/Animations/rippleDistortionCode';
import RippleDistortion, {
  type RippleQuality,
  type RippleTrigger
} from '@/content/Animations/RippleDistortion/RippleDistortion.vue';
import rippleDistortionSource from '@/content/Animations/RippleDistortion/RippleDistortion.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEFAULTS = {
  brushSize: 150,
  strength: 0.2,
  swirl: 1,
  rings: 4,
  spread: 5,
  fade: 3,
  spacing: 15,
  dispersion: 0,
  glint: 0,
  tint: '#10B981',
  tintAmount: 0.1,
  grayscale: true,
  highlightColor: '#ffffff',
  trigger: 'hover' as RippleTrigger,
  clickStrength: 2,
  quality: 'low' as RippleQuality,
  enabled: true
};

const triggerOptions = [
  { label: 'Hover', value: 'hover' },
  { label: 'Click', value: 'click' },
  { label: 'Both', value: 'both' }
];

const qualityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' }
];

const brushSize = ref(DEFAULTS.brushSize);
const strength = ref(DEFAULTS.strength);
const swirl = ref(DEFAULTS.swirl);
const rings = ref(DEFAULTS.rings);
const spread = ref(DEFAULTS.spread);
const fade = ref(DEFAULTS.fade);
const spacing = ref(DEFAULTS.spacing);
const dispersion = ref(DEFAULTS.dispersion);
const glint = ref(DEFAULTS.glint);
const tint = ref(DEFAULTS.tint);
const tintAmount = ref(DEFAULTS.tintAmount);
const grayscale = ref(DEFAULTS.grayscale);
const highlightColor = ref(DEFAULTS.highlightColor);
const trigger = ref(DEFAULTS.trigger);
const clickStrength = ref(DEFAULTS.clickStrength);
const quality = ref(DEFAULTS.quality);
const enabled = ref(DEFAULTS.enabled);

const rippleDistortionProps = computed(() => ({
  brushSize: brushSize.value,
  strength: strength.value,
  swirl: swirl.value,
  rings: rings.value,
  spread: spread.value,
  fade: fade.value,
  spacing: spacing.value,
  dispersion: dispersion.value,
  glint: glint.value,
  tint: tint.value,
  tintAmount: tintAmount.value,
  grayscale: grayscale.value,
  highlightColor: highlightColor.value,
  trigger: trigger.value,
  clickStrength: clickStrength.value,
  quality: quality.value,
  enabled: enabled.value
}));

const hasChanges = computed(
  () =>
    brushSize.value !== DEFAULTS.brushSize ||
    strength.value !== DEFAULTS.strength ||
    swirl.value !== DEFAULTS.swirl ||
    rings.value !== DEFAULTS.rings ||
    spread.value !== DEFAULTS.spread ||
    fade.value !== DEFAULTS.fade ||
    spacing.value !== DEFAULTS.spacing ||
    dispersion.value !== DEFAULTS.dispersion ||
    glint.value !== DEFAULTS.glint ||
    tint.value !== DEFAULTS.tint ||
    tintAmount.value !== DEFAULTS.tintAmount ||
    grayscale.value !== DEFAULTS.grayscale ||
    highlightColor.value !== DEFAULTS.highlightColor ||
    trigger.value !== DEFAULTS.trigger ||
    clickStrength.value !== DEFAULTS.clickStrength ||
    quality.value !== DEFAULTS.quality ||
    enabled.value !== DEFAULTS.enabled
);

function reset() {
  brushSize.value = DEFAULTS.brushSize;
  strength.value = DEFAULTS.strength;
  swirl.value = DEFAULTS.swirl;
  rings.value = DEFAULTS.rings;
  spread.value = DEFAULTS.spread;
  fade.value = DEFAULTS.fade;
  spacing.value = DEFAULTS.spacing;
  dispersion.value = DEFAULTS.dispersion;
  glint.value = DEFAULTS.glint;
  tint.value = DEFAULTS.tint;
  tintAmount.value = DEFAULTS.tintAmount;
  grayscale.value = DEFAULTS.grayscale;
  highlightColor.value = DEFAULTS.highlightColor;
  trigger.value = DEFAULTS.trigger;
  clickStrength.value = DEFAULTS.clickStrength;
  quality.value = DEFAULTS.quality;
  enabled.value = DEFAULTS.enabled;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'src',
    type: 'string',
    default: "'https://images.unsplash.com/...'",
    description: 'Image URL the ripples distort. Cover fitted to the container.'
  },
  {
    name: 'brushSize',
    type: 'number',
    default: '150',
    description: 'Diameter of each ripple the pointer lays down, in px.'
  },
  {
    name: 'strength',
    type: 'number',
    default: '0.2',
    description: 'How far the image is pushed, as a fraction of its size.'
  },
  {
    name: 'swirl',
    type: 'number',
    default: '1',
    description:
      'Full turns the push direction sweeps through as a ripple builds. 0 gives a flat push, higher folds the image into caustics.'
  },
  {
    name: 'rings',
    type: 'number',
    default: '4',
    description: 'Concentric swells inside each ripple. 0 is a single plain blob.'
  },
  {
    name: 'spread',
    type: 'number',
    default: '5',
    description: 'How many times its own size a ripple grows to before it dies.'
  },
  { name: 'fade', type: 'number', default: '3', description: 'How long a ripple survives, in seconds.' },
  {
    name: 'spacing',
    type: 'number',
    default: '15',
    description: 'Pointer travel between ripples, in px. Higher leaves a sparser trail.'
  },
  {
    name: 'dispersion',
    type: 'number',
    default: '0',
    description: 'Chromatic split between the red and blue channels as they refract.'
  },
  { name: 'glint', type: 'number', default: '0', description: 'Sheen riding the shoulders of each ripple.' },
  { name: 'tint', type: 'string', default: '#10B981', description: 'Colour the disturbed water takes on.' },
  {
    name: 'tintAmount',
    type: 'number',
    default: '0.1',
    description: 'How strongly the tint colours the disturbed water.'
  },
  { name: 'highlightColor', type: 'string', default: '#ffffff', description: 'Colour of the sheen.' },
  {
    name: 'grayscale',
    type: 'boolean',
    default: 'true',
    description: 'Drain the colour out of the image so the folds read on tone alone.'
  },
  {
    name: 'trigger',
    type: "'hover' | 'click' | 'both'",
    default: "'hover'",
    description: 'What disturbs the surface: motion, clicks, or both.'
  },
  {
    name: 'clickStrength',
    type: 'number',
    default: '2',
    description: 'How much larger a click ripple starts than a hover one.'
  },
  {
    name: 'quality',
    type: "'low' | 'medium' | 'high'",
    default: "'low'",
    description: 'Resolution of the displacement buffer. Lower trades crispness for fill rate.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Toggle the effect on or off.' },
  { name: 'className', type: 'string', default: "''", description: 'Extra classes on the container.' }
];
</script>
