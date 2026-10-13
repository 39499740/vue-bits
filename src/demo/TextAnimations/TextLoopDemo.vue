<template>
  <h1 class="sub-category">Text Loop</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="textLoop.usage"
    :source="textLoopSource"
    component-name="TextLoop"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <TextLoop :key="key" v-bind="textLoopProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" placeholder="Your phrase" :maxLength="30" v-model="text" />
        <PreviewInput title="Separator" placeholder="✦" :width="90" :maxLength="3" v-model="separator" />
        <PreviewSelect title="Shape" :options="SHAPE_OPTIONS" v-model="shape" />
        <PreviewSelect title="Direction" :options="DIRECTION_OPTIONS" v-model="direction" />
        <PreviewColorPicker title="Text Color" v-model="color" />
        <PreviewColorPicker title="Ribbon Color" v-model="ribbonColor" />
        <PreviewSwitch title="Ribbon" v-model="ribbon" />
        <PreviewSwitch title="Uppercase" v-model="uppercase" />
        <PreviewSwitch title="Pause On Hover" v-model="pauseOnHover" />
        <PreviewSlider title="Speed" :min="10" :max="260" :step="5" v-model="speed" />
        <PreviewSlider title="Curviness" :min="0" :max="160" :step="2" v-model="curviness" />
        <PreviewSlider title="Ribbon Width" :min="0" :max="160" :step="2" v-model="ribbonWidth" valueUnit="px" />
        <PreviewSlider title="Font Size" :min="18" :max="90" :step="2" v-model="fontSize" valueUnit="px" />
        <PreviewSlider title="Font Weight" :min="300" :max="900" :step="50" v-model="fontWeight" />
        <PreviewSlider title="Letter Spacing" :min="-2" :max="14" :step="0.5" v-model="letterSpacing" valueUnit="px" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="text-loop" :usage="textLoop.usage!" :source="textLoopSource" />
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
import { textLoop } from '@/constants/code/TextAnimations/textLoopCode';
import TextLoop, { type TextLoopDirection, type TextLoopShape } from '@/content/TextAnimations/TextLoop/TextLoop.vue';
import textLoopSource from '@/content/TextAnimations/TextLoop/TextLoop.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Vue ✦ Bits',
  shape: 'wave' as TextLoopShape,
  speed: 90,
  direction: 'forward' as TextLoopDirection,
  separator: '✦',
  curviness: 90,
  fontSize: 46,
  fontWeight: 800,
  letterSpacing: 2,
  uppercase: true,
  color: '#ffffff',
  ribbon: true,
  ribbonColor: '#27FF64',
  ribbonWidth: 86,
  pauseOnHover: true
};

const SHAPE_OPTIONS = [
  { value: 'wave', label: 'Wave' },
  { value: 'circle', label: 'Circle' },
  { value: 'infinity', label: 'Infinity' },
  { value: 'arch', label: 'Arch' },
  { value: 'line', label: 'Line' }
];

const DIRECTION_OPTIONS = [
  { value: 'forward', label: 'Forward' },
  { value: 'reverse', label: 'Reverse' }
];

const text = ref(DEFAULTS.text);
const shape = ref(DEFAULTS.shape);
const speed = ref(DEFAULTS.speed);
const direction = ref(DEFAULTS.direction);
const separator = ref(DEFAULTS.separator);
const curviness = ref(DEFAULTS.curviness);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const letterSpacing = ref(DEFAULTS.letterSpacing);
const uppercase = ref(DEFAULTS.uppercase);
const color = ref(DEFAULTS.color);
const ribbon = ref(DEFAULTS.ribbon);
const ribbonColor = ref(DEFAULTS.ribbonColor);
const ribbonWidth = ref(DEFAULTS.ribbonWidth);
const pauseOnHover = ref(DEFAULTS.pauseOnHover);

const textLoopProps = computed(() => ({
  text: text.value,
  shape: shape.value,
  speed: speed.value,
  direction: direction.value,
  separator: separator.value,
  curviness: curviness.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  letterSpacing: letterSpacing.value,
  uppercase: uppercase.value,
  color: color.value,
  ribbon: ribbon.value,
  ribbonColor: ribbonColor.value,
  ribbonWidth: ribbonWidth.value,
  pauseOnHover: pauseOnHover.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    shape.value !== DEFAULTS.shape ||
    speed.value !== DEFAULTS.speed ||
    direction.value !== DEFAULTS.direction ||
    separator.value !== DEFAULTS.separator ||
    curviness.value !== DEFAULTS.curviness ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    letterSpacing.value !== DEFAULTS.letterSpacing ||
    uppercase.value !== DEFAULTS.uppercase ||
    color.value !== DEFAULTS.color ||
    ribbon.value !== DEFAULTS.ribbon ||
    ribbonColor.value !== DEFAULTS.ribbonColor ||
    ribbonWidth.value !== DEFAULTS.ribbonWidth ||
    pauseOnHover.value !== DEFAULTS.pauseOnHover
);

function reset() {
  text.value = DEFAULTS.text;
  shape.value = DEFAULTS.shape;
  speed.value = DEFAULTS.speed;
  direction.value = DEFAULTS.direction;
  separator.value = DEFAULTS.separator;
  curviness.value = DEFAULTS.curviness;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  letterSpacing.value = DEFAULTS.letterSpacing;
  uppercase.value = DEFAULTS.uppercase;
  color.value = DEFAULTS.color;
  ribbon.value = DEFAULTS.ribbon;
  ribbonColor.value = DEFAULTS.ribbonColor;
  ribbonWidth.value = DEFAULTS.ribbonWidth;
  pauseOnHover.value = DEFAULTS.pauseOnHover;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'text', type: 'string', default: '"React ✦ Bits"', description: 'The phrase repeated along the curve.' },
  {
    name: 'shape',
    type: '"wave" | "circle" | "infinity" | "arch" | "line"',
    default: '"wave"',
    description: 'Built-in curve the text flows along.'
  },
  {
    name: 'path',
    type: 'string',
    default: 'undefined',
    description: 'Custom SVG path data, drawn in a 1200x400 viewBox. Overrides shape when provided.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '90',
    description: 'Travel speed along the path, in units per second.'
  },
  {
    name: 'direction',
    type: '"forward" | "reverse"',
    default: '"forward"',
    description: 'Direction the text scrolls around the curve.'
  },
  { name: 'separator', type: 'string', default: '"✦"', description: 'Glyph placed between each repetition.' },
  {
    name: 'curviness',
    type: 'number',
    default: '90',
    description: 'Amplitude of the wave, or the radius of the closed shapes.'
  },
  { name: 'fontSize', type: 'number', default: '46', description: 'Font size of the looping text.' },
  { name: 'fontWeight', type: 'number', default: '800', description: 'Font weight of the looping text.' },
  { name: 'letterSpacing', type: 'number', default: '2', description: 'Extra tracking between letters.' },
  { name: 'uppercase', type: 'boolean', default: 'true', description: 'Renders the phrase in uppercase.' },
  { name: 'color', type: 'string', default: '"#ffffff"', description: 'Fill color of the text.' },
  {
    name: 'ribbon',
    type: 'boolean',
    default: 'true',
    description: 'Draws a solid band behind the text along the path.'
  },
  { name: 'ribbonColor', type: 'string', default: '"#27FF64"', description: 'Color of the band behind the text.' },
  { name: 'ribbonWidth', type: 'number', default: '86', description: 'Thickness of the band behind the text.' },
  {
    name: 'pauseOnHover',
    type: 'boolean',
    default: 'true',
    description: 'Pauses the loop while the pointer is over it.'
  },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the wrapper.' },
  { name: 'style', type: 'object', default: '{}', description: 'Inline styles for the wrapper.' }
];
</script>
