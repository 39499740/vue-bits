<template>
  <h1 class="sub-category">Stroke Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="strokeText.usage"
    :source="strokeTextSource"
    component-name="StrokeText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <StrokeText :key="key" v-bind="strokeTextProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" placeholder="Your headline" :maxLength="22" v-model="text" />
        <PreviewColorPicker title="Stroke" v-model="strokeColor" />
        <PreviewColorPicker title="Fill" v-model="fillColor" />
        <PreviewSelect title="Trigger" :options="triggerOptions" v-model="trigger" />
        <PreviewSelect title="Fill Mode" :options="fillModeOptions" v-model="fillMode" />
        <PreviewSelect title="Ease" :options="easeOptions" v-model="ease" />
        <PreviewSlider title="Stroke Width" :min="0.5" :max="4" :step="0.1" v-model="strokeWidth" />
        <PreviewSlider title="Draw Duration" :min="0.6" :max="3" :step="0.1" v-model="drawDuration" valueUnit="s" />
        <PreviewSlider title="Fill Delay" :min="0" :max="1" :step="0.05" v-model="fillDelay" valueUnit="s" />
        <PreviewSlider title="Stagger" :min="0" :max="0.12" :step="0.005" v-model="stagger" valueUnit="s" />
        <PreviewSlider title="Font Size" :min="72" :max="170" :step="2" v-model="fontSize" valueUnit="px" />
        <PreviewSlider title="Font Weight" :min="300" :max="900" :step="50" v-model="fontWeight" />
        <PreviewSlider title="Letter Spacing" :min="-10" :max="8" :step="0.5" v-model="letterSpacing" valueUnit="px" />
        <PreviewSwitch title="Reverse Stagger" v-model="reverse" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="stroke-text" :usage="strokeText.usage!" :source="strokeTextSource" />
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
import { strokeText } from '@/constants/code/TextAnimations/strokeTextCode';
import StrokeText, {
  type StrokeTextFillMode,
  type StrokeTextTrigger
} from '@/content/TextAnimations/StrokeText/StrokeText.vue';
import strokeTextSource from '@/content/TextAnimations/StrokeText/StrokeText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Draw Attention',
  strokeColor: '#8bfa99',
  fillColor: '#F8FAFC',
  strokeWidth: 1.4,
  drawDuration: 1.6,
  fillDelay: 0.2,
  stagger: 0.05,
  ease: 'power2.out',
  trigger: 'mount' as StrokeTextTrigger,
  fillMode: 'wipe' as StrokeTextFillMode,
  fontSize: 128,
  fontWeight: 800,
  letterSpacing: -4,
  reverse: false
};

const triggerOptions = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'loop', label: 'Loop' }
];

const fillModeOptions = [
  { value: 'wipe', label: 'Wipe' },
  { value: 'fade', label: 'Fade' },
  { value: 'none', label: 'None' }
];

const easeOptions = [
  { value: 'power2.out', label: 'Power Out' },
  { value: 'power3.out', label: 'Crisp Out' },
  { value: 'expo.out', label: 'Expo Out' },
  { value: 'sine.inOut', label: 'Sine In Out' }
];

const text = ref(DEFAULTS.text);
const strokeColor = ref(DEFAULTS.strokeColor);
const fillColor = ref(DEFAULTS.fillColor);
const strokeWidth = ref(DEFAULTS.strokeWidth);
const drawDuration = ref(DEFAULTS.drawDuration);
const fillDelay = ref(DEFAULTS.fillDelay);
const stagger = ref(DEFAULTS.stagger);
const ease = ref(DEFAULTS.ease);
const trigger = ref(DEFAULTS.trigger);
const fillMode = ref(DEFAULTS.fillMode);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const letterSpacing = ref(DEFAULTS.letterSpacing);
const reverse = ref(DEFAULTS.reverse);

const strokeTextProps = computed(() => ({
  text: text.value,
  strokeColor: strokeColor.value,
  fillColor: fillColor.value,
  strokeWidth: strokeWidth.value,
  drawDuration: drawDuration.value,
  fillDelay: fillDelay.value,
  stagger: stagger.value,
  ease: ease.value,
  trigger: trigger.value,
  fillMode: fillMode.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  letterSpacing: letterSpacing.value,
  reverse: reverse.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    strokeColor.value !== DEFAULTS.strokeColor ||
    fillColor.value !== DEFAULTS.fillColor ||
    strokeWidth.value !== DEFAULTS.strokeWidth ||
    drawDuration.value !== DEFAULTS.drawDuration ||
    fillDelay.value !== DEFAULTS.fillDelay ||
    stagger.value !== DEFAULTS.stagger ||
    ease.value !== DEFAULTS.ease ||
    trigger.value !== DEFAULTS.trigger ||
    fillMode.value !== DEFAULTS.fillMode ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    letterSpacing.value !== DEFAULTS.letterSpacing ||
    reverse.value !== DEFAULTS.reverse
);

function reset() {
  text.value = DEFAULTS.text;
  strokeColor.value = DEFAULTS.strokeColor;
  fillColor.value = DEFAULTS.fillColor;
  strokeWidth.value = DEFAULTS.strokeWidth;
  drawDuration.value = DEFAULTS.drawDuration;
  fillDelay.value = DEFAULTS.fillDelay;
  stagger.value = DEFAULTS.stagger;
  ease.value = DEFAULTS.ease;
  trigger.value = DEFAULTS.trigger;
  fillMode.value = DEFAULTS.fillMode;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  letterSpacing.value = DEFAULTS.letterSpacing;
  reverse.value = DEFAULTS.reverse;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Draw Attention"',
    description: 'The heading copy rendered as measured SVG glyphs.'
  },
  {
    name: 'strokeColor',
    type: 'string',
    default: '"#8bfa99"',
    description: 'Color used for the drawing outline.'
  },
  {
    name: 'fillColor',
    type: 'string',
    default: '"#F8FAFC"',
    description: 'Color that floods into the glyphs after the outline draw.'
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '1.4',
    description: 'Width of the SVG text outline.'
  },
  {
    name: 'drawDuration',
    type: 'number',
    default: '1.6',
    description: 'Seconds each character outline spends drawing on.'
  },
  {
    name: 'fillDelay',
    type: 'number',
    default: '0.2',
    description: 'Seconds to wait after the outline draw before the fill begins.'
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.05',
    description: 'Delay in seconds between each character animation.'
  },
  {
    name: 'ease',
    type: 'string',
    default: '"power2.out"',
    description: 'GSAP easing used for the outline draw.'
  },
  {
    name: 'trigger',
    type: '"mount" | "hover" | "scroll" | "loop"',
    default: '"mount"',
    description: 'Chooses when the draw timeline starts.'
  },
  {
    name: 'fillMode',
    type: '"fade" | "wipe" | "none"',
    default: '"wipe"',
    description: 'Controls whether fill appears with a fade, left-to-right wipe, or not at all.'
  },
  {
    name: 'fontSize',
    type: 'number | string',
    default: '128',
    description: 'SVG font size before the responsive viewBox scales the wordmark.'
  },
  {
    name: 'fontWeight',
    type: 'number | string',
    default: '800',
    description: 'Weight of the rendered letterforms.'
  },
  {
    name: 'letterSpacing',
    type: 'number | string',
    default: '-4',
    description: 'Tracking applied during measurement and rendering.'
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Draws the stagger from the final character back to the first.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class applied to the root wrapper.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Inline styles passed to the root wrapper.'
  }
];
</script>
