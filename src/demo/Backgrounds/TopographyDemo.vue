<template>
  <h1 class="sub-category">Topography</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="topography.usage"
    :source="topographySource"
    componentName="Topography"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <Topography :key="key" v-bind="topographyProps" />
        <BackgroundContent pillText="New Background" headline="A living topographic contour map." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Low Color" v-model="lowColor" />
        <PreviewColorPicker title="Mid Color" v-model="midColor" />
        <PreviewColorPicker title="High Color" v-model="highColor" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Morph Amount" :min="0.5" :max="6" :step="0.1" v-model="morphAmount" />
        <PreviewSlider title="Morph Speed" :min="0.01" :max="0.2" :step="0.01" v-model="morphSpeed" />
        <PreviewSlider title="Bands" :min="1" :max="12" :step="0.5" v-model="bands" />
        <PreviewSlider title="Thickness" :min="0.01" :max="0.25" :step="0.01" v-model="thickness" />
        <PreviewSlider title="Scale" :min="0.3" :max="3" :step="0.05" v-model="scale" />
        <PreviewSlider title="Pixel Size" :min="1" :max="40" :step="1" v-model="pixelSize" />
        <PreviewSlider title="Glow" :min="0" :max="1.5" :step="0.05" v-model="glow" />
        <PreviewSelect
          title="Color Mode"
          name="topography-color-mode"
          :width="140"
          v-model="colorMode"
          :options="[
            { label: 'Elevation', value: 'elevation' },
            { label: 'Uniform', value: 'uniform' },
            { label: 'Alternating', value: 'alternating' }
          ]"
        />
        <PreviewSlider title="Contrast" :min="0.2" :max="3" :step="0.05" v-model="contrast" />
        <PreviewSlider title="Brightness" :min="0" :max="2" :step="0.05" v-model="brightness" />
        <PreviewSwitch title="Fill Bands" v-model="fillBands" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.05" v-model="opacity" />
        <PreviewSwitch title="Cursor Elevation" v-model="mouseInteraction" />
        <PreviewSlider title="Cursor Radius" :min="0.05" :max="1" :step="0.01" v-model="mouseRadius" />
        <PreviewSlider title="Cursor Strength" :min="0" :max="1.5" :step="0.05" v-model="mouseStrength" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="topography" :usage="topography.usage!" :source="topographySource" />
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
import { topography } from '@/constants/code/Backgrounds/topographyCode';
import Topography, { type ColorMode } from '@/content/Backgrounds/Topography/Topography.vue';
import topographySource from '@/content/Backgrounds/Topography/Topography.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  lowColor: '#27ff41',
  midColor: '#9ffffd',
  highColor: '#FFFFFF',
  speed: 0.35,
  morphAmount: 3.0,
  morphSpeed: 0.05,
  bands: 2.0,
  thickness: 0.01,
  scale: 2.0,
  pixelSize: 1.0,
  glow: 0.5,
  colorMode: 'elevation' as ColorMode,
  contrast: 3.0,
  brightness: 1.0,
  fillBands: false,
  opacity: 1.0,
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseRadius: 0.3,
  mouseStrength: 0.4
};

const lowColor = ref(DEFAULTS.lowColor);
const midColor = ref(DEFAULTS.midColor);
const highColor = ref(DEFAULTS.highColor);
const speed = ref(DEFAULTS.speed);
const morphAmount = ref(DEFAULTS.morphAmount);
const morphSpeed = ref(DEFAULTS.morphSpeed);
const bands = ref(DEFAULTS.bands);
const thickness = ref(DEFAULTS.thickness);
const scale = ref(DEFAULTS.scale);
const pixelSize = ref(DEFAULTS.pixelSize);
const glow = ref(DEFAULTS.glow);
const colorMode = ref(DEFAULTS.colorMode);
const contrast = ref(DEFAULTS.contrast);
const brightness = ref(DEFAULTS.brightness);
const fillBands = ref(DEFAULTS.fillBands);
const opacity = ref(DEFAULTS.opacity);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseRadius = ref(DEFAULTS.mouseRadius);
const mouseStrength = ref(DEFAULTS.mouseStrength);

const topographyProps = computed(() => ({
  lowColor: lowColor.value,
  midColor: midColor.value,
  highColor: highColor.value,
  speed: speed.value,
  morphAmount: morphAmount.value,
  morphSpeed: morphSpeed.value,
  bands: bands.value,
  thickness: thickness.value,
  scale: scale.value,
  pixelSize: pixelSize.value,
  glow: glow.value,
  colorMode: colorMode.value,
  contrast: contrast.value,
  brightness: brightness.value,
  fillBands: fillBands.value,
  opacity: opacity.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value,
  mouseInteraction: mouseInteraction.value,
  mouseRadius: mouseRadius.value,
  mouseStrength: mouseStrength.value
}));

const hasChanges = computed(
  () =>
    lowColor.value !== DEFAULTS.lowColor ||
    midColor.value !== DEFAULTS.midColor ||
    highColor.value !== DEFAULTS.highColor ||
    speed.value !== DEFAULTS.speed ||
    morphAmount.value !== DEFAULTS.morphAmount ||
    morphSpeed.value !== DEFAULTS.morphSpeed ||
    bands.value !== DEFAULTS.bands ||
    thickness.value !== DEFAULTS.thickness ||
    scale.value !== DEFAULTS.scale ||
    pixelSize.value !== DEFAULTS.pixelSize ||
    glow.value !== DEFAULTS.glow ||
    colorMode.value !== DEFAULTS.colorMode ||
    contrast.value !== DEFAULTS.contrast ||
    brightness.value !== DEFAULTS.brightness ||
    fillBands.value !== DEFAULTS.fillBands ||
    opacity.value !== DEFAULTS.opacity ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseRadius.value !== DEFAULTS.mouseRadius ||
    mouseStrength.value !== DEFAULTS.mouseStrength
);

function reset() {
  lowColor.value = DEFAULTS.lowColor;
  midColor.value = DEFAULTS.midColor;
  highColor.value = DEFAULTS.highColor;
  speed.value = DEFAULTS.speed;
  morphAmount.value = DEFAULTS.morphAmount;
  morphSpeed.value = DEFAULTS.morphSpeed;
  bands.value = DEFAULTS.bands;
  thickness.value = DEFAULTS.thickness;
  scale.value = DEFAULTS.scale;
  pixelSize.value = DEFAULTS.pixelSize;
  glow.value = DEFAULTS.glow;
  colorMode.value = DEFAULTS.colorMode;
  contrast.value = DEFAULTS.contrast;
  brightness.value = DEFAULTS.brightness;
  fillBands.value = DEFAULTS.fillBands;
  opacity.value = DEFAULTS.opacity;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseRadius.value = DEFAULTS.mouseRadius;
  mouseStrength.value = DEFAULTS.mouseStrength;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'lowColor',
    type: 'string',
    default: "'#27ff41'",
    description: 'Color used for the lowest elevation bands.'
  },
  {
    name: 'midColor',
    type: 'string',
    default: "'#9ffffd'",
    description: 'Color used for the mid elevation bands.'
  },
  {
    name: 'highColor',
    type: 'string',
    default: "'#FFFFFF'",
    description: 'Color used for the highest ridge lines.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.35',
    description: 'Animation speed of the morphing elevation field.'
  },
  {
    name: 'morphAmount',
    type: 'number',
    default: '3.0',
    description: 'Amplitude of the field morphing (how much the terrain shifts).'
  },
  {
    name: 'morphSpeed',
    type: 'number',
    default: '0.05',
    description: 'How differently each control point animates over time.'
  },
  {
    name: 'bands',
    type: 'number',
    default: '2.0',
    description: 'Contour line density (number of elevation bands).'
  },
  {
    name: 'thickness',
    type: 'number',
    default: '0.01',
    description: 'Thickness of the contour lines.'
  },
  {
    name: 'scale',
    type: 'number',
    default: '1.0',
    description: 'Zoom level of the topographic field.'
  },
  {
    name: 'pixelSize',
    type: 'number',
    default: '1.0',
    description: 'Retro pixelation step (1 = smooth, higher = chunkier).'
  },
  {
    name: 'glow',
    type: 'number',
    default: '0.5',
    description: 'Soft bloom radius around the contour lines.'
  },
  {
    name: 'colorMode',
    type: 'string',
    default: "'elevation'",
    description: "Line coloring mode: 'elevation', 'uniform', or 'alternating'."
  },
  {
    name: 'contrast',
    type: 'number',
    default: '3.0',
    description: 'Contrast of the line coverage (sharpens or softens lines).'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.0',
    description: 'Overall brightness of the contour lines.'
  },
  {
    name: 'fillBands',
    type: 'boolean',
    default: 'false',
    description: 'Softly tint the areas between contour lines by elevation.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Overall opacity of the effect.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Whisper-subtle animated film grain over the effect.'
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
    description: 'Lift the elevation field gently around the cursor.'
  },
  {
    name: 'mouseRadius',
    type: 'number',
    default: '0.3',
    description: 'Radius of the cursor elevation bump.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '0.4',
    description: 'Strength of the cursor elevation bump.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
