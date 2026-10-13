<template>
  <h1 class="sub-category">Particle Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="particleText.usage"
    :source="particleTextSource"
    component-name="ParticleText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <ParticleText :key="key" v-bind="particleTextProps" />
        <RefreshButton @click="forceRerender" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" v-model="text" placeholder="Your heading" :maxLength="24" />
        <PreviewSelect title="Trigger" :options="triggerOptions" v-model="trigger" />
        <PreviewSelect title="Weight" :options="weightOptions" v-model="fontWeight" />
        <PreviewColorPicker title="Color" v-model="color" />
        <PreviewColorPicker title="Highlight" v-model="highlightColor" />
        <PreviewSlider title="Particle Size" :min="1" :max="4" :step="0.1" v-model="particleSize" valueUnit="px" />
        <PreviewSlider title="Density" :min="2" :max="8" :step="1" v-model="density" />
        <PreviewSlider title="Scatter" :min="40" :max="320" :step="10" v-model="scatter" valueUnit="px" />
        <PreviewSlider title="Gather" :min="500" :max="3000" :step="100" v-model="gatherDuration" valueUnit="ms" />
        <PreviewSlider title="Stagger" :min="0" :max="900" :step="30" v-model="stagger" valueUnit="ms" />
        <PreviewSlider title="Repel Strength" :min="0" :max="90" :step="2" v-model="pointerRepel" />
        <PreviewSlider title="Repel Radius" :min="40" :max="220" :step="5" v-model="repelRadius" valueUnit="px" />
        <PreviewSlider title="Idle Drift" :min="0" :max="2" :step="0.1" v-model="idleDrift" valueUnit="px" />
        <PreviewSwitch title="Glow" v-model="glow" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="particle-text" :usage="particleText.usage!" :source="particleTextSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewColorPicker from '@/components/common/PreviewColorPicker.vue';
import PreviewInput from '@/components/common/PreviewInput.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import RefreshButton from '@/components/common/RefreshButton.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { particleText } from '@/constants/code/TextAnimations/particleTextCode';
import ParticleText from '@/content/TextAnimations/ParticleText/ParticleText.vue';
import particleTextSource from '@/content/TextAnimations/ParticleText/ParticleText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Future Interfaces',
  particleSize: 2.2,
  density: 4,
  color: '#f8fafc',
  highlightColor: '#84CC16',
  scatter: 190,
  gatherDuration: 1600,
  stagger: 420,
  pointerRepel: 42,
  repelRadius: 120,
  idleDrift: 0.8,
  trigger: 'mount' as 'mount' | 'hover' | 'click',
  fontSize: 'clamp(3.5rem, 13vw, 9rem)',
  fontWeight: 800,
  fontFamily: 'inherit',
  glow: true
};

const triggerOptions = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'click', label: 'Click' }
];

const weightOptions = [
  { value: 500, label: '500' },
  { value: 650, label: '650' },
  { value: 800, label: '800' },
  { value: 900, label: '900' }
];

const text = ref(DEFAULTS.text);
const particleSize = ref(DEFAULTS.particleSize);
const density = ref(DEFAULTS.density);
const color = ref(DEFAULTS.color);
const highlightColor = ref(DEFAULTS.highlightColor);
const scatter = ref(DEFAULTS.scatter);
const gatherDuration = ref(DEFAULTS.gatherDuration);
const stagger = ref(DEFAULTS.stagger);
const pointerRepel = ref(DEFAULTS.pointerRepel);
const repelRadius = ref(DEFAULTS.repelRadius);
const idleDrift = ref(DEFAULTS.idleDrift);
const trigger = ref(DEFAULTS.trigger);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const fontFamily = ref(DEFAULTS.fontFamily);
const glow = ref(DEFAULTS.glow);

const particleTextProps = computed(() => ({
  text: text.value,
  particleSize: particleSize.value,
  density: density.value,
  color: color.value,
  highlightColor: highlightColor.value,
  scatter: scatter.value,
  gatherDuration: gatherDuration.value,
  stagger: stagger.value,
  pointerRepel: pointerRepel.value,
  repelRadius: repelRadius.value,
  idleDrift: idleDrift.value,
  trigger: trigger.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  fontFamily: fontFamily.value,
  glow: glow.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    particleSize.value !== DEFAULTS.particleSize ||
    density.value !== DEFAULTS.density ||
    color.value !== DEFAULTS.color ||
    highlightColor.value !== DEFAULTS.highlightColor ||
    scatter.value !== DEFAULTS.scatter ||
    gatherDuration.value !== DEFAULTS.gatherDuration ||
    stagger.value !== DEFAULTS.stagger ||
    pointerRepel.value !== DEFAULTS.pointerRepel ||
    repelRadius.value !== DEFAULTS.repelRadius ||
    idleDrift.value !== DEFAULTS.idleDrift ||
    trigger.value !== DEFAULTS.trigger ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    fontFamily.value !== DEFAULTS.fontFamily ||
    glow.value !== DEFAULTS.glow
);

function reset() {
  text.value = DEFAULTS.text;
  particleSize.value = DEFAULTS.particleSize;
  density.value = DEFAULTS.density;
  color.value = DEFAULTS.color;
  highlightColor.value = DEFAULTS.highlightColor;
  scatter.value = DEFAULTS.scatter;
  gatherDuration.value = DEFAULTS.gatherDuration;
  stagger.value = DEFAULTS.stagger;
  pointerRepel.value = DEFAULTS.pointerRepel;
  repelRadius.value = DEFAULTS.repelRadius;
  idleDrift.value = DEFAULTS.idleDrift;
  trigger.value = DEFAULTS.trigger;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  fontFamily.value = DEFAULTS.fontFamily;
  glow.value = DEFAULTS.glow;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Vue Bits"',
    description: 'The words sampled into particle targets.'
  },
  {
    name: 'particleSize',
    type: 'number',
    default: '2',
    description: 'Rendered size of each particle in CSS pixels.'
  },
  {
    name: 'density',
    type: 'number',
    default: '4',
    description: 'Pixel sampling step for the offscreen glyph canvas. Lower values create more particles.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#ffffff"',
    description: 'Primary particle color.'
  },
  {
    name: 'highlightColor',
    type: 'string',
    default: '"#84CC16"',
    description: 'Secondary color blended through the particle field.'
  },
  {
    name: 'scatter',
    type: 'number',
    default: '180',
    description: 'How far particles begin from their final glyph targets.'
  },
  {
    name: 'gatherDuration',
    type: 'number',
    default: '1600',
    description: 'Milliseconds for particles to converge into the text.'
  },
  {
    name: 'stagger',
    type: 'number',
    default: '420',
    description: 'Maximum per-particle delay in milliseconds before gathering.'
  },
  {
    name: 'pointerRepel',
    type: 'number',
    default: '40',
    description: 'Strength of the cursor pushback.'
  },
  {
    name: 'repelRadius',
    type: 'number',
    default: '120',
    description: 'Cursor influence radius in pixels.'
  },
  {
    name: 'idleDrift',
    type: 'number',
    default: '0.7',
    description: 'Subtle resting motion after the text has formed.'
  },
  {
    name: 'trigger',
    type: '"mount" | "hover" | "click"',
    default: '"mount"',
    description: 'How the scatter-and-reform sequence can replay after the first formation.'
  },
  {
    name: 'fontSize',
    type: 'number | string',
    default: '"clamp(3rem, 12vw, 8rem)"',
    description: 'Canvas text size used for glyph sampling.'
  },
  {
    name: 'fontWeight',
    type: 'number | string',
    default: '800',
    description: 'Font weight used for sampling.'
  },
  {
    name: 'fontFamily',
    type: 'string',
    default: '"inherit"',
    description: 'Font family used for sampling. Inherit waits for the surrounding font before sampling.'
  },
  {
    name: 'glow',
    type: 'boolean',
    default: 'true',
    description: 'Adds a soft particle bloom in the highlight color.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional wrapper class name.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Optional inline styles for the wrapper.'
  }
];
</script>
