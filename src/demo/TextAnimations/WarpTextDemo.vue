<template>
  <h1 class="sub-category">Warp Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="warpText.usage"
    :source="warpTextSource"
    component-name="WarpText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <WarpText :key="key" v-bind="warpTextProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" placeholder="Your headline" :maxLength="36" v-model="text" />
        <PreviewColorPicker title="Text Color" v-model="color" />
        <PreviewSelect title="Font" :options="fontOptions" v-model="fontFamily" />
        <PreviewSelect title="Weight" :options="weightOptions" v-model="fontWeight" />
        <PreviewSlider title="Font Size" :min="56" :max="160" :step="1" v-model="fontSize" valueUnit="px" />
        <PreviewSlider
          title="Letter Spacing"
          :min="-0.12"
          :max="0.04"
          :step="0.01"
          v-model="letterSpacing"
          valueUnit="em"
        />
        <PreviewSlider title="Line Height" :min="0.78" :max="1.2" :step="0.01" v-model="lineHeight" />
        <PreviewSlider title="Warp Strength" :min="0" :max="0.18" :step="0.01" v-model="warpStrength" />
        <PreviewSlider title="Warp Scale" :min="0.8" :max="3" :step="0.1" v-model="warpScale" />
        <PreviewSlider title="Speed" :min="0" :max="1.5" :step="0.05" v-model="speed" />
        <PreviewSlider title="Pointer Radius" :min="0.18" :max="0.75" :step="0.01" v-model="pointerInfluence" />
        <PreviewSlider title="Pointer Strength" :min="0" :max="0.8" :step="0.01" v-model="pointerStrength" />
        <PreviewSlider title="Refraction" :min="0" :max="0.05" :step="0.001" v-model="refraction" />
        <PreviewSwitch title="Ripple" v-model="ripple" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="warp-text" :usage="warpText.usage!" :source="warpTextSource" />
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
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { warpText } from '@/constants/code/TextAnimations/warpTextCode';
import WarpText from '@/content/TextAnimations/WarpText/WarpText.vue';
import warpTextSource from '@/content/TextAnimations/WarpText/WarpText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Bend the moment',
  color: '#f8f5ff',
  warpStrength: 0.08,
  warpScale: 1.7,
  speed: 0.55,
  pointerInfluence: 0.42,
  pointerStrength: 0.38,
  refraction: 0.018,
  ripple: true,
  fontSize: 116,
  fontWeight: 800,
  fontFamily: 'inherit',
  letterSpacing: -0.06,
  lineHeight: 0.9
};

const fontOptions = [
  { value: 'inherit', label: 'System' },
  { value: 'Georgia, serif', label: 'Serif' },
  { value: 'ui-monospace, SFMono-Regular, Menlo, monospace', label: 'Mono' }
];

const weightOptions = [
  { value: 600, label: '600' },
  { value: 700, label: '700' },
  { value: 800, label: '800' },
  { value: 900, label: '900' }
];

const text = ref(DEFAULTS.text);
const color = ref(DEFAULTS.color);
const warpStrength = ref(DEFAULTS.warpStrength);
const warpScale = ref(DEFAULTS.warpScale);
const speed = ref(DEFAULTS.speed);
const pointerInfluence = ref(DEFAULTS.pointerInfluence);
const pointerStrength = ref(DEFAULTS.pointerStrength);
const refraction = ref(DEFAULTS.refraction);
const ripple = ref(DEFAULTS.ripple);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const fontFamily = ref(DEFAULTS.fontFamily);
const letterSpacing = ref(DEFAULTS.letterSpacing);
const lineHeight = ref(DEFAULTS.lineHeight);

const warpTextProps = computed(() => ({
  text: text.value,
  color: color.value,
  warpStrength: warpStrength.value,
  warpScale: warpScale.value,
  speed: speed.value,
  pointerInfluence: pointerInfluence.value,
  pointerStrength: pointerStrength.value,
  refraction: refraction.value,
  ripple: ripple.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  fontFamily: fontFamily.value,
  letterSpacing: letterSpacing.value,
  lineHeight: lineHeight.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    color.value !== DEFAULTS.color ||
    warpStrength.value !== DEFAULTS.warpStrength ||
    warpScale.value !== DEFAULTS.warpScale ||
    speed.value !== DEFAULTS.speed ||
    pointerInfluence.value !== DEFAULTS.pointerInfluence ||
    pointerStrength.value !== DEFAULTS.pointerStrength ||
    refraction.value !== DEFAULTS.refraction ||
    ripple.value !== DEFAULTS.ripple ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    fontFamily.value !== DEFAULTS.fontFamily ||
    letterSpacing.value !== DEFAULTS.letterSpacing ||
    lineHeight.value !== DEFAULTS.lineHeight
);

function reset() {
  text.value = DEFAULTS.text;
  color.value = DEFAULTS.color;
  warpStrength.value = DEFAULTS.warpStrength;
  warpScale.value = DEFAULTS.warpScale;
  speed.value = DEFAULTS.speed;
  pointerInfluence.value = DEFAULTS.pointerInfluence;
  pointerStrength.value = DEFAULTS.pointerStrength;
  refraction.value = DEFAULTS.refraction;
  ripple.value = DEFAULTS.ripple;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  fontFamily.value = DEFAULTS.fontFamily;
  letterSpacing.value = DEFAULTS.letterSpacing;
  lineHeight.value = DEFAULTS.lineHeight;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Bend the moment"',
    description: 'The headline text rendered into the WebGL texture.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#f8f5ff"',
    description: 'Text fill color before the glass refraction pass.'
  },
  {
    name: 'warpStrength',
    type: 'number',
    default: '0.08',
    description: 'Amount of ambient glass distortion at rest.'
  },
  { name: 'warpScale', type: 'number', default: '1.7', description: 'Size of the moving distortion cells.' },
  { name: 'speed', type: 'number', default: '0.55', description: 'Speed of the ambient undulation.' },
  { name: 'pointerInfluence', type: 'number', default: '0.42', description: 'Radius of the cursor lensing area.' },
  {
    name: 'pointerStrength',
    type: 'number',
    default: '0.38',
    description: 'Strength of cursor-driven bending and magnification.'
  },
  {
    name: 'refraction',
    type: 'number',
    default: '0.018',
    description: 'Subtle RGB channel split for the glass edge.'
  },
  { name: 'ripple', type: 'boolean', default: 'true', description: 'Adds a soft ripple to the pointer lens.' },
  {
    name: 'fontSize',
    type: 'string | number',
    default: '"clamp(3rem, 10vw, 9rem)"',
    description: 'Canvas raster font size. Numbers are pixels.'
  },
  {
    name: 'fontWeight',
    type: 'string | number',
    default: '800',
    description: 'Font weight used when rasterising the text texture.'
  },
  {
    name: 'fontFamily',
    type: 'string',
    default: '"inherit"',
    description: 'Font family used when rasterising the text texture.'
  },
  {
    name: 'letterSpacing',
    type: 'string | number',
    default: '"-0.06em"',
    description: 'Tracking applied while drawing the text into the texture.'
  },
  { name: 'lineHeight', type: 'string | number', default: '0.9', description: 'Line height for multi-line text.' },
  { name: 'className', type: 'string', default: '""', description: 'Optional class name for the root element.' },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Optional inline styles for sizing or layout.'
  }
];
</script>
