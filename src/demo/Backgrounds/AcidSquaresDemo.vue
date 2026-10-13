<template>
  <h1 class="sub-category">Acid Squares</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="acidSquares.usage"
    :source="acidSquaresSource"
    componentName="AcidSquares"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <AcidSquares :key="key" v-bind="acidSquaresProps" />
        <BackgroundContent pillText="New Background" headline="A luminous crystal corridor of stacked squares." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Color 1" v-model="color1" />
        <PreviewColorPicker title="Color 2" v-model="color2" />
        <PreviewColorPicker title="Color 3" v-model="color3" />
        <PreviewSelect
          title="Detail"
          name="acid-squares-detail"
          v-model="detail"
          :options="['low', 'medium', 'high']"
        />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Wave Depth" :min="0" :max="4" :step="0.1" v-model="waveDepth" />
        <PreviewSlider title="Color Shift" :min="0" :max="2" :step="0.05" v-model="colorShift" />
        <PreviewSlider title="Zoom" :min="0.4" :max="2.5" :step="0.05" v-model="zoom" />
        <PreviewSlider title="Density" :min="4" :max="16" :step="0.5" v-model="density" />
        <PreviewSlider title="Spread" :min="0.15" :max="0.45" :step="0.01" v-model="spread" />
        <PreviewSlider title="Step Size" :min="0.001" :max="0.02" :step="0.001" v-model="stepSize" />
        <PreviewSlider title="Glow" :min="0.2" :max="3" :step="0.05" v-model="glow" />
        <PreviewSlider title="Exposure" :min="400" :max="6000" :step="50" v-model="exposure" />
        <PreviewSlider title="Brightness" :min="0.2" :max="2.5" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Contrast" :min="0.5" :max="2.5" :step="0.05" v-model="contrast" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.05" v-model="opacity" />
        <PreviewSwitch title="Cursor Collapse" v-model="mouseInteraction" />
        <PreviewSlider title="Collapse Strength" :min="0" :max="1.5" :step="0.05" v-model="mouseStrength" />
        <PreviewSlider title="Cursor Radius" :min="0.05" :max="1" :step="0.01" v-model="mouseRadius" />
        <PreviewSlider title="Blur" :min="0" :max="1" :step="0.01" v-model="blur" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="acid-squares" :usage="acidSquares.usage!" :source="acidSquaresSource" />
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
import { acidSquares } from '@/constants/code/Backgrounds/acidSquaresCode';
import AcidSquares, { type AcidSquaresDetail } from '@/content/Backgrounds/AcidSquares/AcidSquares.vue';
import acidSquaresSource from '@/content/Backgrounds/AcidSquares/AcidSquares.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color1: '#7cff67',
  color2: '#A0FFBC',
  color3: '#FFFFFF',
  detail: 'medium' as AcidSquaresDetail,
  speed: 0.7,
  waveDepth: 1,
  zoom: 1.3,
  density: 10.0,
  glow: 1.0,
  exposure: 2700,
  spread: 0.3,
  stepSize: 0.002,
  colorShift: 0,
  contrast: 1,
  brightness: 1.0,
  opacity: 1.0,
  mouseInteraction: true,
  mouseStrength: 0.1,
  mouseRadius: 0.35,
  blur: 0,
  grain: true,
  grainIntensity: 0.05
};

const color1 = ref(DEFAULTS.color1);
const color2 = ref(DEFAULTS.color2);
const color3 = ref(DEFAULTS.color3);
const detail = ref(DEFAULTS.detail);
const speed = ref(DEFAULTS.speed);
const waveDepth = ref(DEFAULTS.waveDepth);
const zoom = ref(DEFAULTS.zoom);
const density = ref(DEFAULTS.density);
const glow = ref(DEFAULTS.glow);
const exposure = ref(DEFAULTS.exposure);
const spread = ref(DEFAULTS.spread);
const stepSize = ref(DEFAULTS.stepSize);
const colorShift = ref(DEFAULTS.colorShift);
const contrast = ref(DEFAULTS.contrast);
const brightness = ref(DEFAULTS.brightness);
const opacity = ref(DEFAULTS.opacity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseStrength = ref(DEFAULTS.mouseStrength);
const mouseRadius = ref(DEFAULTS.mouseRadius);
const blur = ref(DEFAULTS.blur);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);

const acidSquaresProps = computed(() => ({
  color1: color1.value,
  color2: color2.value,
  color3: color3.value,
  detail: detail.value,
  speed: speed.value,
  waveDepth: waveDepth.value,
  zoom: zoom.value,
  density: density.value,
  glow: glow.value,
  exposure: exposure.value,
  spread: spread.value,
  stepSize: stepSize.value,
  colorShift: colorShift.value,
  contrast: contrast.value,
  brightness: brightness.value,
  opacity: opacity.value,
  mouseInteraction: mouseInteraction.value,
  mouseStrength: mouseStrength.value,
  mouseRadius: mouseRadius.value,
  blur: blur.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value
}));

const hasChanges = computed(
  () =>
    color1.value !== DEFAULTS.color1 ||
    color2.value !== DEFAULTS.color2 ||
    color3.value !== DEFAULTS.color3 ||
    detail.value !== DEFAULTS.detail ||
    speed.value !== DEFAULTS.speed ||
    waveDepth.value !== DEFAULTS.waveDepth ||
    zoom.value !== DEFAULTS.zoom ||
    density.value !== DEFAULTS.density ||
    glow.value !== DEFAULTS.glow ||
    exposure.value !== DEFAULTS.exposure ||
    spread.value !== DEFAULTS.spread ||
    stepSize.value !== DEFAULTS.stepSize ||
    colorShift.value !== DEFAULTS.colorShift ||
    contrast.value !== DEFAULTS.contrast ||
    brightness.value !== DEFAULTS.brightness ||
    opacity.value !== DEFAULTS.opacity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseStrength.value !== DEFAULTS.mouseStrength ||
    mouseRadius.value !== DEFAULTS.mouseRadius ||
    blur.value !== DEFAULTS.blur ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity
);

function reset() {
  color1.value = DEFAULTS.color1;
  color2.value = DEFAULTS.color2;
  color3.value = DEFAULTS.color3;
  detail.value = DEFAULTS.detail;
  speed.value = DEFAULTS.speed;
  waveDepth.value = DEFAULTS.waveDepth;
  zoom.value = DEFAULTS.zoom;
  density.value = DEFAULTS.density;
  glow.value = DEFAULTS.glow;
  exposure.value = DEFAULTS.exposure;
  spread.value = DEFAULTS.spread;
  stepSize.value = DEFAULTS.stepSize;
  colorShift.value = DEFAULTS.colorShift;
  contrast.value = DEFAULTS.contrast;
  brightness.value = DEFAULTS.brightness;
  opacity.value = DEFAULTS.opacity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseStrength.value = DEFAULTS.mouseStrength;
  mouseRadius.value = DEFAULTS.mouseRadius;
  blur.value = DEFAULTS.blur;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'color1',
    type: 'string',
    default: "'#7cff67'",
    description: 'Violet core color used for the dim depths of the corridor.'
  },
  {
    name: 'color2',
    type: 'string',
    default: "'#A0FFBC'",
    description: 'Pink mid-tone color used for the glowing crystal faces.'
  },
  {
    name: 'color3',
    type: 'string',
    default: "'#FFFFFF'",
    description: 'White highlight color used for the hottest edges.'
  },
  {
    name: 'detail',
    type: '"low" | "medium" | "high"',
    default: "'medium'",
    description: 'Raymarch quality tier (20 / 32 / 48 steps). Higher looks richer but costs more.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.7',
    description: 'Speed of the forward drift through the lattice.'
  },
  {
    name: 'waveDepth',
    type: 'number',
    default: '1',
    description: 'How far the view gently drifts in and back out as the corridor breathes. 0 holds it still.'
  },
  {
    name: 'zoom',
    type: 'number',
    default: '1.3',
    description: 'Field of view into the corridor. Higher zooms in.'
  },
  {
    name: 'density',
    type: 'number',
    default: '10.0',
    description: 'How tightly the boxes of the lattice are packed.'
  },
  {
    name: 'glow',
    type: 'number',
    default: '1.0',
    description: 'Gain applied to the accumulated light along each ray.'
  },
  {
    name: 'exposure',
    type: 'number',
    default: '2700',
    description: 'Tone-mapping exposure. Higher values darken the render.'
  },
  {
    name: 'spread',
    type: 'number',
    default: '0.3',
    description: 'Controls how the ray step grows each iteration; strongly shapes the look.'
  },
  {
    name: 'stepSize',
    type: 'number',
    default: '0.002',
    description: 'Minimum ray step. Larger values thin out the glow.'
  },
  {
    name: 'colorShift',
    type: 'number',
    default: '0',
    description: 'Rate of the gentle brightness shimmer cycling over time.'
  },
  {
    name: 'contrast',
    type: 'number',
    default: '1',
    description: 'Contrast applied around the mid-tones of the final image.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.0',
    description: 'Overall brightness multiplier before tone mapping.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Overall opacity of the effect over the transparent background.'
  },
  {
    name: 'mouseInteraction',
    type: 'boolean',
    default: 'true',
    description: 'Enables a soft depression that sinks the lattice downward around the pointer.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '0.1',
    description: 'How deeply the cursor presses the lattice down inside the affected area.'
  },
  {
    name: 'mouseRadius',
    type: 'number',
    default: '0.35',
    description: 'Size of the area around the pointer that collapses, as a fraction of the view height.'
  },
  {
    name: 'blur',
    type: 'number',
    default: '0',
    description: 'Softens the whole effect with a post-process Gaussian blur. 0 is crisp; 1 is a soft haze.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Adds a faint animated film grain over the final image for a subtle analog texture.'
  },
  {
    name: 'grainIntensity',
    type: 'number',
    default: '0.05',
    description: 'Amplitude of the grain overlay. 0 disables it entirely.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
