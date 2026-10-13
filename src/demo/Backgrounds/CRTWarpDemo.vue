<template>
  <h1 class="sub-category">CRT Warp</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="cRTWarp.usage"
    :source="cRTWarpSource"
    componentName="CRTWarp"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <CRTWarp :key="key" v-bind="cRTWarpProps" />
        <BackgroundContent pillText="New Background" headline="Make every pixel pulse." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Phosphor Color" v-model="color" />
        <PreviewColorPicker title="Background" v-model="backgroundColor" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Curvature" :min="0" :max="1" :step="0.01" v-model="curvature" />
        <PreviewSlider title="Wave Amount" :min="0" :max="1" :step="0.01" v-model="waveAmplitude" />
        <PreviewSlider title="Wave Density" :min="0.5" :max="6" :step="0.1" v-model="waveFrequency" />
        <PreviewSlider title="Scanline Strength" :min="0" :max="1" :step="0.01" v-model="scanlineStrength" />
        <PreviewSlider title="Scanline Density" :min="40" :max="500" :step="5" v-model="scanlineFrequency" />
        <PreviewSlider title="Bloom" :min="0" :max="3" :step="0.05" v-model="bloom" />
        <PreviewSlider title="Bloom Radius" :min="0.1" :max="3" :step="0.05" v-model="bloomRadius" />
        <PreviewSlider title="Noise" :min="0" :max="0.25" :step="0.005" v-model="noise" />
        <PreviewSlider title="Vignette" :min="0" :max="1" :step="0.01" v-model="vignette" />
        <PreviewSlider title="Brightness" :min="0.25" :max="2.5" :step="0.05" v-model="brightness" />
        <PreviewSlider title="RGB Shift" :min="0" :max="0.03" :step="0.001" v-model="rgbShift" />
        <PreviewSelect
          title="Pixel Size"
          :options="[
            { value: 1, label: 'Smooth' },
            { value: 2, label: '2 px' },
            { value: 4, label: '4 px' },
            { value: 8, label: '8 px' }
          ]"
          v-model="pixelation"
        />
        <PreviewSelect
          title="Render Quality"
          :options="[
            { value: 0.75, label: 'Performance' },
            { value: 1, label: 'Balanced' },
            { value: 1.5, label: 'Sharp' }
          ]"
          v-model="dpr"
        />
        <PreviewSelect
          title="Frame Rate"
          :options="[
            { value: 24, label: '24 FPS' },
            { value: 30, label: '30 FPS' },
            { value: 45, label: '45 FPS' },
            { value: 60, label: '60 FPS' }
          ]"
          v-model="fps"
        />
        <PreviewSwitch title="Pointer Warp" v-model="mouseReact" />
        <PreviewSlider
          title="Pointer Strength"
          :min="0"
          :max="1.5"
          :step="0.01"
          v-model="mouseStrength"
          :isDisabled="!mouseReact"
        />
        <PreviewSwitch title="Pause" v-model="paused" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="cRTWarp" :usage="cRTWarp.usage!" :source="cRTWarpSource" />
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
import { cRTWarp } from '@/constants/code/Backgrounds/cRTWarpCode';
import CRTWarp from '@/content/Backgrounds/CRTWarp/CRTWarp.vue';
import cRTWarpSource from '@/content/Backgrounds/CRTWarp/CRTWarp.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color: '#55f77c',
  backgroundColor: '#010a03',
  speed: 0.5,
  curvature: 0.25,
  scanlineStrength: 0.25,
  scanlineFrequency: 200,
  waveAmplitude: 0.3,
  waveFrequency: 2.5,
  bloom: 1.5,
  bloomRadius: 1,
  noise: 0.1,
  vignette: 0,
  brightness: 1.25,
  pixelation: 1,
  rgbShift: 0.015,
  mouseReact: true,
  mouseStrength: 0.5,
  dpr: 1,
  fps: 30,
  paused: false
};

const color = ref(DEFAULTS.color);
const backgroundColor = ref(DEFAULTS.backgroundColor);
const speed = ref(DEFAULTS.speed);
const curvature = ref(DEFAULTS.curvature);
const scanlineStrength = ref(DEFAULTS.scanlineStrength);
const scanlineFrequency = ref(DEFAULTS.scanlineFrequency);
const waveAmplitude = ref(DEFAULTS.waveAmplitude);
const waveFrequency = ref(DEFAULTS.waveFrequency);
const bloom = ref(DEFAULTS.bloom);
const bloomRadius = ref(DEFAULTS.bloomRadius);
const noise = ref(DEFAULTS.noise);
const vignette = ref(DEFAULTS.vignette);
const brightness = ref(DEFAULTS.brightness);
const pixelation = ref(DEFAULTS.pixelation);
const rgbShift = ref(DEFAULTS.rgbShift);
const mouseReact = ref(DEFAULTS.mouseReact);
const mouseStrength = ref(DEFAULTS.mouseStrength);
const dpr = ref(DEFAULTS.dpr);
const fps = ref(DEFAULTS.fps);
const paused = ref(DEFAULTS.paused);

const cRTWarpProps = computed(() => ({
  color: color.value,
  backgroundColor: backgroundColor.value,
  speed: speed.value,
  curvature: curvature.value,
  scanlineStrength: scanlineStrength.value,
  scanlineFrequency: scanlineFrequency.value,
  waveAmplitude: waveAmplitude.value,
  waveFrequency: waveFrequency.value,
  bloom: bloom.value,
  bloomRadius: bloomRadius.value,
  noise: noise.value,
  vignette: vignette.value,
  brightness: brightness.value,
  pixelation: pixelation.value,
  rgbShift: rgbShift.value,
  mouseReact: mouseReact.value,
  mouseStrength: mouseStrength.value,
  dpr: dpr.value,
  fps: fps.value,
  paused: paused.value
}));

const hasChanges = computed(
  () =>
    color.value !== DEFAULTS.color ||
    backgroundColor.value !== DEFAULTS.backgroundColor ||
    speed.value !== DEFAULTS.speed ||
    curvature.value !== DEFAULTS.curvature ||
    scanlineStrength.value !== DEFAULTS.scanlineStrength ||
    scanlineFrequency.value !== DEFAULTS.scanlineFrequency ||
    waveAmplitude.value !== DEFAULTS.waveAmplitude ||
    waveFrequency.value !== DEFAULTS.waveFrequency ||
    bloom.value !== DEFAULTS.bloom ||
    bloomRadius.value !== DEFAULTS.bloomRadius ||
    noise.value !== DEFAULTS.noise ||
    vignette.value !== DEFAULTS.vignette ||
    brightness.value !== DEFAULTS.brightness ||
    pixelation.value !== DEFAULTS.pixelation ||
    rgbShift.value !== DEFAULTS.rgbShift ||
    mouseReact.value !== DEFAULTS.mouseReact ||
    mouseStrength.value !== DEFAULTS.mouseStrength ||
    dpr.value !== DEFAULTS.dpr ||
    fps.value !== DEFAULTS.fps ||
    paused.value !== DEFAULTS.paused
);

function reset() {
  color.value = DEFAULTS.color;
  backgroundColor.value = DEFAULTS.backgroundColor;
  speed.value = DEFAULTS.speed;
  curvature.value = DEFAULTS.curvature;
  scanlineStrength.value = DEFAULTS.scanlineStrength;
  scanlineFrequency.value = DEFAULTS.scanlineFrequency;
  waveAmplitude.value = DEFAULTS.waveAmplitude;
  waveFrequency.value = DEFAULTS.waveFrequency;
  bloom.value = DEFAULTS.bloom;
  bloomRadius.value = DEFAULTS.bloomRadius;
  noise.value = DEFAULTS.noise;
  vignette.value = DEFAULTS.vignette;
  brightness.value = DEFAULTS.brightness;
  pixelation.value = DEFAULTS.pixelation;
  rgbShift.value = DEFAULTS.rgbShift;
  mouseReact.value = DEFAULTS.mouseReact;
  mouseStrength.value = DEFAULTS.mouseStrength;
  dpr.value = DEFAULTS.dpr;
  fps.value = DEFAULTS.fps;
  paused.value = DEFAULTS.paused;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'color', type: 'string', default: "'#55f77c'", description: 'Main phosphor color.' },
  { name: 'backgroundColor', type: 'string', default: "'#010a03'", description: 'Canvas background color.' },
  { name: 'speed', type: 'number', default: '0.5', description: 'Animation speed.' },
  { name: 'curvature', type: 'number', default: '0.25', description: 'Strength of the CRT barrel distortion.' },
  {
    name: 'scanlineStrength',
    type: 'number',
    default: '0.25',
    description: 'Visibility of the horizontal scanlines.'
  },
  {
    name: 'scanlineFrequency',
    type: 'number',
    default: '200',
    description: 'Number of scanline bands across the canvas.'
  },
  { name: 'waveAmplitude', type: 'number', default: '0.3', description: 'Amount of fluid displacement.' },
  { name: 'waveFrequency', type: 'number', default: '2.5', description: 'Density of the plasma waves.' },
  { name: 'bloom', type: 'number', default: '1.5', description: 'Intensity of the soft phosphor glow.' },
  { name: 'bloomRadius', type: 'number', default: '1', description: 'Spread of the glow sampling.' },
  { name: 'noise', type: 'number', default: '0.1', description: 'Fine analog grain amount.' },
  { name: 'vignette', type: 'number', default: '0', description: 'Edge darkening strength.' },
  { name: 'brightness', type: 'number', default: '1.25', description: 'Overall output brightness.' },
  { name: 'pixelation', type: 'number', default: '1', description: 'Pixel block size; 1 keeps the image smooth.' },
  { name: 'rgbShift', type: 'number', default: '0.015', description: 'Horizontal phosphor-channel separation.' },
  { name: 'mouseReact', type: 'boolean', default: 'true', description: 'Lets the pointer bend the signal.' },
  { name: 'mouseStrength', type: 'number', default: '0.5', description: 'Strength of the pointer distortion.' },
  { name: 'dpr', type: 'number', default: '1', description: 'Maximum device pixel ratio used by the renderer.' },
  { name: 'fps', type: 'number', default: '30', description: 'Maximum render frame rate.' },
  { name: 'paused', type: 'boolean', default: 'false', description: 'Freezes the animation when true.' },
  { name: 'className', type: 'string', default: 'undefined', description: 'Optional container class name.' },
  { name: 'style', type: 'object', default: 'undefined', description: 'Optional inline container styles.' }
];
</script>
