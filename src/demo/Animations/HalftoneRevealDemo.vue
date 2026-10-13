<template>
  <h1 class="sub-category">Halftone Reveal</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="halftoneReveal.usage"
    :source="halftoneRevealSource"
    component-name="HalftoneReveal"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <HalftoneReveal v-bind="halftoneRevealProps" />
        <RefreshButton @click="forceRerender" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Ink Color" v-model="inkColor" />
        <PreviewColorPicker title="Paper Color" v-model="paperColor" />
        <PreviewSelect title="Mode" :options="modeOptions" v-model="mode" />
        <PreviewSelect title="Dot Shape" :options="shapeOptions" v-model="shape" />
        <PreviewSlider title="Dot Density" :min="30" :max="180" :step="1" v-model="dotDensity" />
        <PreviewSlider title="Dot Size" :min="0.4" :max="1.6" :step="0.01" v-model="dotSize" />
        <PreviewSlider title="Screen Angle" :min="0" :max="90" :step="1" v-model="angle" valueUnit="°" />
        <PreviewSlider title="Contrast" :min="0.6" :max="2" :step="0.01" v-model="contrast" />
        <PreviewSwitch title="Invert" v-model="invert" />
        <PreviewSlider title="Reveal Radius" :min="0.05" :max="0.6" :step="0.01" v-model="revealRadius" />
        <PreviewSlider title="Loupe Edge" :min="0" :max="1" :step="0.01" v-model="edge" />
        <PreviewSlider title="Follow" :min="0.02" :max="0.4" :step="0.01" v-model="follow" valueUnit="s" />
        <PreviewSlider title="Idle Reveal" :min="0" :max="1" :step="0.01" v-model="idleReveal" />
        <PreviewSelect title="Trigger" :options="triggerOptions" v-model="trigger" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="halftone-reveal" :usage="halftoneReveal.usage!" :source="halftoneRevealSource" />
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
import { halftoneReveal } from '@/constants/code/Animations/halftoneRevealCode';
import HalftoneReveal, {
  type Mode,
  type Shape,
  type Trigger
} from '@/content/Animations/HalftoneReveal/HalftoneReveal.vue';
import halftoneRevealSource from '@/content/Animations/HalftoneReveal/HalftoneReveal.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEFAULTS = {
  src: 'https://picsum.photos/seed/halftone-reveal/1200/800',
  inkColor: '#141414',
  paperColor: '#fff7e6',
  mode: 'mono' as Mode,
  dotSize: 1,
  dotDensity: 71,
  angle: 45,
  shape: 'circle' as Shape,
  contrast: 1.15,
  invert: false,
  revealRadius: 0.4,
  edge: 0.8,
  follow: 0.37,
  idleReveal: 0,
  trigger: 'hover' as Trigger
};

const modeOptions = [
  { label: 'Mono', value: 'mono' },
  { label: 'Duotone', value: 'duotone' },
  { label: 'Color (CMYK)', value: 'color' }
];

const shapeOptions = [
  { label: 'Circle', value: 'circle' },
  { label: 'Square', value: 'square' },
  { label: 'Diamond', value: 'diamond' },
  { label: 'Line', value: 'line' }
];

const triggerOptions = [
  { label: 'Hover', value: 'hover' },
  { label: 'Always', value: 'always' },
  { label: 'Off', value: 'off' }
];

const src = ref(DEFAULTS.src);
const inkColor = ref(DEFAULTS.inkColor);
const paperColor = ref(DEFAULTS.paperColor);
const mode = ref(DEFAULTS.mode);
const dotSize = ref(DEFAULTS.dotSize);
const dotDensity = ref(DEFAULTS.dotDensity);
const angle = ref(DEFAULTS.angle);
const shape = ref(DEFAULTS.shape);
const contrast = ref(DEFAULTS.contrast);
const invert = ref(DEFAULTS.invert);
const revealRadius = ref(DEFAULTS.revealRadius);
const edge = ref(DEFAULTS.edge);
const follow = ref(DEFAULTS.follow);
const idleReveal = ref(DEFAULTS.idleReveal);
const trigger = ref(DEFAULTS.trigger);

const halftoneRevealProps = computed(() => ({
  src: src.value,
  inkColor: inkColor.value,
  paperColor: paperColor.value,
  mode: mode.value,
  dotSize: dotSize.value,
  dotDensity: dotDensity.value,
  angle: angle.value,
  shape: shape.value,
  contrast: contrast.value,
  invert: invert.value,
  revealRadius: revealRadius.value,
  edge: edge.value,
  follow: follow.value,
  idleReveal: idleReveal.value,
  trigger: trigger.value
}));

const hasChanges = computed(
  () =>
    src.value !== DEFAULTS.src ||
    inkColor.value !== DEFAULTS.inkColor ||
    paperColor.value !== DEFAULTS.paperColor ||
    mode.value !== DEFAULTS.mode ||
    dotSize.value !== DEFAULTS.dotSize ||
    dotDensity.value !== DEFAULTS.dotDensity ||
    angle.value !== DEFAULTS.angle ||
    shape.value !== DEFAULTS.shape ||
    contrast.value !== DEFAULTS.contrast ||
    invert.value !== DEFAULTS.invert ||
    revealRadius.value !== DEFAULTS.revealRadius ||
    edge.value !== DEFAULTS.edge ||
    follow.value !== DEFAULTS.follow ||
    idleReveal.value !== DEFAULTS.idleReveal ||
    trigger.value !== DEFAULTS.trigger
);

function reset() {
  src.value = DEFAULTS.src;
  inkColor.value = DEFAULTS.inkColor;
  paperColor.value = DEFAULTS.paperColor;
  mode.value = DEFAULTS.mode;
  dotSize.value = DEFAULTS.dotSize;
  dotDensity.value = DEFAULTS.dotDensity;
  angle.value = DEFAULTS.angle;
  shape.value = DEFAULTS.shape;
  contrast.value = DEFAULTS.contrast;
  invert.value = DEFAULTS.invert;
  revealRadius.value = DEFAULTS.revealRadius;
  edge.value = DEFAULTS.edge;
  follow.value = DEFAULTS.follow;
  idleReveal.value = DEFAULTS.idleReveal;
  trigger.value = DEFAULTS.trigger;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'src', type: 'string', default: 'picsum photo', description: 'Image URL rendered as a halftone print.' },
  { name: 'inkColor', type: 'string', default: '#141414', description: 'Colour of the printed dots (hex).' },
  {
    name: 'paperColor',
    type: 'string',
    default: '#fff7e6',
    description: 'Colour of the paper behind the ink (hex).'
  },
  {
    name: 'mode',
    type: '"mono" | "duotone" | "color"',
    default: 'mono',
    description: 'Screen model: single ink, two-ink riso, or a CMYK rosette.'
  },
  { name: 'dotSize', type: 'number', default: '1', description: 'Overall scale of each ink dot.' },
  { name: 'dotDensity', type: 'number', default: '71', description: 'Number of dot cells across the frame.' },
  { name: 'angle', type: 'number', default: '45', description: 'Rotation of the halftone screen, in degrees.' },
  {
    name: 'shape',
    type: '"circle" | "square" | "diamond" | "line"',
    default: 'circle',
    description: 'Shape of each printed dot.'
  },
  { name: 'contrast', type: 'number', default: '1.15', description: 'Tonal contrast applied before screening.' },
  { name: 'invert', type: 'boolean', default: 'false', description: 'Invert the tones (negative print).' },
  {
    name: 'revealRadius',
    type: 'number',
    default: '0.4',
    description: 'Radius of the sharp loupe around the cursor.'
  },
  {
    name: 'edge',
    type: 'number',
    default: '0.8',
    description: 'Hardness of the loupe boundary (0 soft, 1 hard).'
  },
  {
    name: 'follow',
    type: 'number',
    default: '0.37',
    description: 'Loupe follow time in seconds (lower = snappier).'
  },
  {
    name: 'idleReveal',
    type: 'number',
    default: '0',
    description: 'Baseline sharpness applied everywhere with no cursor.'
  },
  {
    name: 'trigger',
    type: '"hover" | "always" | "off"',
    default: 'hover',
    description: 'When the loupe is active.'
  },
  { name: 'borderRadius', type: 'string', default: '16px', description: 'Corner radius of the frame.' }
];
</script>
