<template>
  <h1 class="sub-category">Depth Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="depthText.usage"
    :source="depthTextSource"
    component-name="DepthText"
    :props-table="props"
  >
    <template #preview>
      <div class="h-140 overflow-hidden demo-container">
        <DepthText :key="key" v-bind="depthTextProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" v-model="text" placeholder="Your word" :maxLength="12" />
        <PreviewColorPicker title="Face Color" v-model="faceColor" />
        <PreviewColorPicker title="Depth Color" v-model="depthColor" />
        <PreviewSelect title="Font Size" :options="FONT_SIZE_OPTIONS" v-model="fontSize" />
        <PreviewSelect title="Weight" :options="FONT_WEIGHT_OPTIONS" v-model="fontWeight" />
        <PreviewSlider title="Layers" :min="8" :max="56" :step="1" v-model="layers" />
        <PreviewSlider title="Depth" :min="0.8" :max="5" :step="0.1" v-model="depth" valueUnit="px" />
        <PreviewSlider title="Tilt" :min="0" :max="12" :step="0.5" v-model="tilt" valueUnit="°" />
        <PreviewSlider title="Smoothing" :min="0.04" :max="0.3" :step="0.01" v-model="smoothing" />
        <PreviewSlider title="Perspective" :min="450" :max="1500" :step="25" v-model="perspective" valueUnit="px" />
        <PreviewSlider title="Orbit Speed" :min="0.05" :max="1" :step="0.05" v-model="orbitSpeed" />
        <PreviewSwitch title="Pointer Tracking" v-model="pointerTracking" />
        <PreviewSwitch title="Auto Orbit" v-model="autoOrbit" />
        <PreviewSwitch title="Shadow" v-model="shadow" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="depth-text" :usage="depthText.usage!" :source="depthTextSource" />
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
import { depthText } from '@/constants/code/TextAnimations/depthTextCode';
import DepthText from '@/content/TextAnimations/DepthText/DepthText.vue';
import depthTextSource from '@/content/TextAnimations/DepthText/DepthText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Elevate',
  layers: 34,
  depth: 2.4,
  faceColor: '#f8fafc',
  depthColor: '#117b5a',
  tilt: 7.5,
  pointerTracking: true,
  smoothing: 0.14,
  perspective: 900,
  autoOrbit: true,
  orbitSpeed: 0.35,
  fontSize: 'clamp(3rem, 12vw, 7rem)',
  fontWeight: 900,
  shadow: true
};

const FONT_WEIGHT_OPTIONS = [
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' }
];

const FONT_SIZE_OPTIONS = [
  { value: 'clamp(2.5rem, 9vw, 5.5rem)', label: 'Compact' },
  { value: 'clamp(3rem, 12vw, 7rem)', label: 'Hero' },
  { value: 'clamp(3.5rem, 15vw, 8.5rem)', label: 'Billboard' }
];

const text = ref(DEFAULTS.text);
const layers = ref(DEFAULTS.layers);
const depth = ref(DEFAULTS.depth);
const faceColor = ref(DEFAULTS.faceColor);
const depthColor = ref(DEFAULTS.depthColor);
const tilt = ref(DEFAULTS.tilt);
const pointerTracking = ref(DEFAULTS.pointerTracking);
const smoothing = ref(DEFAULTS.smoothing);
const perspective = ref(DEFAULTS.perspective);
const autoOrbit = ref(DEFAULTS.autoOrbit);
const orbitSpeed = ref(DEFAULTS.orbitSpeed);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const shadow = ref(DEFAULTS.shadow);

const depthTextProps = computed(() => ({
  text: text.value,
  layers: layers.value,
  depth: depth.value,
  faceColor: faceColor.value,
  depthColor: depthColor.value,
  tilt: tilt.value,
  pointerTracking: pointerTracking.value,
  smoothing: smoothing.value,
  perspective: perspective.value,
  autoOrbit: autoOrbit.value,
  orbitSpeed: orbitSpeed.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  shadow: shadow.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    layers.value !== DEFAULTS.layers ||
    depth.value !== DEFAULTS.depth ||
    faceColor.value !== DEFAULTS.faceColor ||
    depthColor.value !== DEFAULTS.depthColor ||
    tilt.value !== DEFAULTS.tilt ||
    pointerTracking.value !== DEFAULTS.pointerTracking ||
    smoothing.value !== DEFAULTS.smoothing ||
    perspective.value !== DEFAULTS.perspective ||
    autoOrbit.value !== DEFAULTS.autoOrbit ||
    orbitSpeed.value !== DEFAULTS.orbitSpeed ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    shadow.value !== DEFAULTS.shadow
);

function reset() {
  text.value = DEFAULTS.text;
  layers.value = DEFAULTS.layers;
  depth.value = DEFAULTS.depth;
  faceColor.value = DEFAULTS.faceColor;
  depthColor.value = DEFAULTS.depthColor;
  tilt.value = DEFAULTS.tilt;
  pointerTracking.value = DEFAULTS.pointerTracking;
  smoothing.value = DEFAULTS.smoothing;
  perspective.value = DEFAULTS.perspective;
  autoOrbit.value = DEFAULTS.autoOrbit;
  orbitSpeed.value = DEFAULTS.orbitSpeed;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  shadow.value = DEFAULTS.shadow;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Elevate"',
    description: 'The word or short phrase rendered as extruded type.'
  },
  {
    name: 'layers',
    type: 'number',
    default: '34',
    description: 'Number of stacked copies that form the extrusion. Clamped to protect the DOM.'
  },
  {
    name: 'depth',
    type: 'number',
    default: '2.4',
    description: 'Spacing in pixels between each layer of the extrusion.'
  },
  {
    name: 'faceColor',
    type: 'string',
    default: '"#f8fafc"',
    description: 'Color of the crisp front face of the text.'
  },
  {
    name: 'depthColor',
    type: 'string',
    default: '"#117b5a"',
    description: 'Tint used for the back of the extrusion and its shadow.'
  },
  {
    name: 'tilt',
    type: 'number',
    default: '7.5',
    description: 'Maximum pointer-driven rotation in degrees.'
  },
  {
    name: 'pointerTracking',
    type: 'boolean',
    default: 'true',
    description: 'Enables smoothed pointer parallax on fine pointer devices.'
  },
  {
    name: 'smoothing',
    type: 'number',
    default: '0.14',
    description: 'Damping amount used to ease rotation toward the pointer target.'
  },
  {
    name: 'perspective',
    type: 'number',
    default: '900',
    description: 'Perspective distance in pixels for the 3D stack.'
  },
  {
    name: 'autoOrbit',
    type: 'boolean',
    default: 'true',
    description: 'Adds a subtle orbit when pointer tracking is unavailable or idle.'
  },
  {
    name: 'orbitSpeed',
    type: 'number',
    default: '0.35',
    description: 'Speed of the fallback orbit in cycles per second.'
  },
  {
    name: 'fontSize',
    type: 'string',
    default: '"clamp(3rem, 12vw, 7rem)"',
    description: 'CSS font-size value for the display word.'
  },
  {
    name: 'fontWeight',
    type: 'number | string',
    default: '900',
    description: 'Font weight used for every layer.'
  },
  {
    name: 'shadow',
    type: 'boolean',
    default: 'true',
    description: 'Adds a soft colored drop shadow to the front face.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class name for the outer wrapper.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Optional inline styles for the outer wrapper.'
  }
];
</script>
