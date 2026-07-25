<template>
  <h1 class="sub-category">Option Wheel</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="optionWheel.usage"
    :source="optionWheelSource"
    component-name="OptionWheel"
    :props-table="props"
  >
    <template #preview>
      <div class="h-125 overflow-hidden demo-container">
        <OptionWheel :key="key" v-bind="optionWheelProps" :items="DEMO_ITEMS" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Text" v-model="textColor" />
        <PreviewColorPicker title="Active" v-model="activeColor" />
        <PreviewSelect title="Side" :options="['left', 'right']" v-model="side" />
        <PreviewSlider title="Font Size" :min="1.5" :max="5" :step="0.1" v-model="fontSize" valueUnit="rem" />
        <PreviewSlider title="Spacing" :min="1" :max="2.5" :step="0.05" v-model="spacing" />
        <PreviewSlider title="Curve" :min="0" :max="2" :step="0.05" v-model="curve" />
        <PreviewSlider title="Tilt" :min="0" :max="15" :step="0.5" v-model="tilt" valueUnit="deg" />
        <PreviewSlider title="Blur" :min="0" :max="6" :step="0.25" v-model="blur" valueUnit="px" />
        <PreviewSlider title="Fade" :min="0" :max="0.5" :step="0.01" v-model="fade" />
        <PreviewSlider title="Smoothing" :min="50" :max="800" :step="10" v-model="smoothing" valueUnit="ms" />
        <PreviewSlider title="Inset" :min="0" :max="240" :step="4" v-model="inset" valueUnit="px" />
        <PreviewSlider title="Sound Volume" :min="0" :max="1" :step="0.05" v-model="soundVolume" />
        <PreviewSwitch title="Loop" v-model="loop" />
        <PreviewSwitch title="Draggable" v-model="draggable" />
        <PreviewSwitch
          title="Sound"
          :model-value="!!soundUrl"
          @update:model-value="value => (soundUrl = value ? '/assets/sounds/click-soft.mp3' : '')"
        />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="option-wheel" :usage="optionWheel.usage!" :source="optionWheelSource" />
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
import { optionWheel } from '@/constants/code/Components/optionWheelCode';
import OptionWheel, { type Side } from '@/content/Components/OptionWheel/OptionWheel.vue';
import optionWheelSource from '@/content/Components/OptionWheel/OptionWheel.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  textColor: '#a6a6a6',
  activeColor: '#ffffff',
  side: 'left' as Side,
  fontSize: 3,
  spacing: 1.4,
  curve: 1,
  tilt: 6,
  blur: 2,
  fade: 0.25,
  smoothing: 200,
  inset: 80,
  loop: false,
  draggable: true,
  soundUrl: '/assets/sounds/click-soft.mp3',
  soundVolume: 0.5
};

const textColor = ref(DEFAULTS.textColor);
const activeColor = ref(DEFAULTS.activeColor);
const side = ref(DEFAULTS.side);
const fontSize = ref(DEFAULTS.fontSize);
const spacing = ref(DEFAULTS.spacing);
const curve = ref(DEFAULTS.curve);
const tilt = ref(DEFAULTS.tilt);
const blur = ref(DEFAULTS.blur);
const fade = ref(DEFAULTS.fade);
const smoothing = ref(DEFAULTS.smoothing);
const inset = ref(DEFAULTS.inset);
const loop = ref(DEFAULTS.loop);
const draggable = ref(DEFAULTS.draggable);
const soundUrl = ref(DEFAULTS.soundUrl);
const soundVolume = ref(DEFAULTS.soundVolume);

const DEMO_ITEMS = [
  'Ambient',
  'House',
  'Techno',
  'Jazz',
  'Lo-Fi',
  'Synthwave',
  'Trance',
  'Funk',
  'Disco',
  'Hip-Hop',
  'Chillwave',
  'Drum & Bass'
];

const optionWheelProps = computed(() => ({
  textColor: textColor.value,
  activeColor: activeColor.value,
  side: side.value,
  fontSize: fontSize.value,
  spacing: spacing.value,
  curve: curve.value,
  tilt: tilt.value,
  blur: blur.value,
  fade: fade.value,
  smoothing: smoothing.value,
  inset: inset.value,
  loop: loop.value,
  draggable: draggable.value,
  soundUrl: soundUrl.value,
  soundVolume: soundVolume.value
}));

const hasChanges = computed(
  () =>
    textColor.value !== DEFAULTS.textColor ||
    activeColor.value !== DEFAULTS.activeColor ||
    side.value !== DEFAULTS.side ||
    fontSize.value !== DEFAULTS.fontSize ||
    spacing.value !== DEFAULTS.spacing ||
    curve.value !== DEFAULTS.curve ||
    tilt.value !== DEFAULTS.tilt ||
    blur.value !== DEFAULTS.blur ||
    fade.value !== DEFAULTS.fade ||
    smoothing.value !== DEFAULTS.smoothing ||
    inset.value !== DEFAULTS.inset ||
    loop.value !== DEFAULTS.loop ||
    draggable.value !== DEFAULTS.draggable ||
    soundUrl.value !== DEFAULTS.soundUrl ||
    soundVolume.value !== DEFAULTS.soundVolume
);

function reset() {
  textColor.value = DEFAULTS.textColor;
  activeColor.value = DEFAULTS.activeColor;
  side.value = DEFAULTS.side;
  fontSize.value = DEFAULTS.fontSize;
  spacing.value = DEFAULTS.spacing;
  curve.value = DEFAULTS.curve;
  tilt.value = DEFAULTS.tilt;
  blur.value = DEFAULTS.blur;
  fade.value = DEFAULTS.fade;
  smoothing.value = DEFAULTS.smoothing;
  inset.value = DEFAULTS.inset;
  loop.value = DEFAULTS.loop;
  draggable.value = DEFAULTS.draggable;
  soundUrl.value = DEFAULTS.soundUrl;
  soundVolume.value = DEFAULTS.soundVolume;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'items', type: 'string[]', default: '[...]', description: 'Labels rendered as the wheel options.' },
  { name: 'defaultSelected', type: 'number', default: '3', description: 'Index of the option selected on mount.' },
  {
    name: 'onChange',
    type: '(index, item) => void',
    default: '-',
    description: 'Called whenever the wheel settles on a new option.'
  },
  { name: 'textColor', type: 'string', default: '"#a6a6a6"', description: 'Resting color of the option labels.' },
  {
    name: 'activeColor',
    type: 'string',
    default: '"#ffffff"',
    description: 'Color an option blends toward as it reaches the middle of the wheel.'
  },
  {
    name: 'side',
    type: '"left" | "right"',
    default: '"left"',
    description: 'Edge of the container the wheel curves around.'
  },
  { name: 'fontSize', type: 'number', default: '3', description: 'Font size of the option labels in rem.' },
  {
    name: 'spacing',
    type: 'number',
    default: '1.4',
    description: 'Vertical distance between options as a multiple of the font size.'
  },
  {
    name: 'curve',
    type: 'number',
    default: '1',
    description: 'Depth of the circular curve; 0 flattens the wheel into a straight list.'
  },
  {
    name: 'tilt',
    type: 'number',
    default: '6',
    description: 'Angle in degrees between neighboring options; higher values curl the wheel tighter.'
  },
  { name: 'blur', type: 'number', default: '2', description: 'Blur in pixels added per step away from the middle.' },
  { name: 'fade', type: 'number', default: '0.25', description: 'Opacity lost per step away from the middle.' },
  { name: 'minOpacity', type: 'number', default: '0.05', description: 'Opacity floor for the furthest options.' },
  {
    name: 'smoothing',
    type: 'number',
    default: '200',
    description: 'Easing time constant in milliseconds; higher values feel heavier.'
  },
  {
    name: 'inset',
    type: 'number',
    default: '80',
    description: 'Padding in pixels between the anchored edge and the centered option.'
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    description: 'Wrap around infinitely instead of stopping at the first and last option.'
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'true',
    description: 'Allow dragging the wheel with a pointer, in addition to scroll and arrow keys.'
  },
  {
    name: 'soundUrl',
    type: 'string',
    default: '""',
    description: 'URL of a short tick sound played when the selection changes; empty disables it.'
  },
  { name: 'soundVolume', type: 'number', default: '0.5', description: 'Playback volume of the tick sound.' },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the outer wrapper.' }
];
</script>
