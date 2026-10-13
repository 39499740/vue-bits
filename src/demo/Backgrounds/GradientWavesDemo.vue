<template>
  <h1 class="sub-category">Gradient Waves</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="gradientWaves.usage"
    :source="gradientWavesSource"
    componentName="GradientWaves"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <GradientWaves :key="key" v-bind="gradientWavesProps" />
        <BackgroundContent pillText="New Background" headline="Soft rolling gradient waves fading into haze." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Horizon Color" v-model="horizonColor" />
        <PreviewColorPicker title="Wave Color" v-model="waveColor" />
        <PreviewColorPicker title="Crest Color" v-model="crestColor" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Amplitude" :min="0" :max="5" :step="0.05" v-model="amplitude" />
        <PreviewSlider title="Wave Scale" :min="0.3" :max="3" :step="0.05" v-model="waveScale" />
        <PreviewSlider title="Wave Ratio" :min="0.3" :max="3" :step="0.05" v-model="waveRatio" />
        <PreviewSlider title="Swell" :min="0" :max="40" :step="0.5" v-model="swell" />
        <PreviewSlider title="Turbulence" :min="0" :max="60" :step="0.5" v-model="turbulence" />
        <PreviewSlider title="Tilt" :min="0.2" :max="1.3" :step="0.01" v-model="tilt" />
        <PreviewSlider title="Zoom" :min="0.4" :max="2.5" :step="0.05" v-model="zoom" />
        <PreviewSlider title="Horizon Height" :min="2" :max="10" :step="0.1" v-model="height" />
        <PreviewSlider title="Fog Depth" :min="5" :max="60" :step="1" v-model="fogDepth" />
        <PreviewSelect
          title="Detail"
          name="gradient-waves-detail"
          width="140"
          v-model="detail"
          :options="['low', 'medium', 'high']"
        />
        <PreviewSlider title="Brightness" :min="0.2" :max="2" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.01" v-model="opacity" />
        <PreviewSwitch title="Cursor Parallax" v-model="mouseInteraction" />
        <PreviewSlider title="Parallax Strength" :min="0" :max="1" :step="0.01" v-model="parallaxStrength" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="gradient-waves" :usage="gradientWaves.usage!" :source="gradientWavesSource" />
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
import { gradientWaves } from '@/constants/code/Backgrounds/gradientWavesCode';
import GradientWaves, { type GradientWavesDetail } from '@/content/Backgrounds/GradientWaves/GradientWaves.vue';
import gradientWavesSource from '@/content/Backgrounds/GradientWaves/GradientWaves.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  horizonColor: '#10B981',
  waveColor: '#84CC16',
  crestColor: '#FFFFFF',
  speed: 0.4,
  amplitude: 2.5,
  waveScale: 0.6,
  waveRatio: 0.9,
  swell: 35,
  turbulence: 20,
  tilt: 1.11,
  zoom: 1.0,
  height: 5.5,
  fogDepth: 15,
  detail: 'medium' as GradientWavesDetail,
  brightness: 1.0,
  opacity: 1.0,
  mouseInteraction: true,
  parallaxStrength: 0.5,
  grain: true,
  grainIntensity: 0.05
};

const horizonColor = ref(DEFAULTS.horizonColor);
const waveColor = ref(DEFAULTS.waveColor);
const crestColor = ref(DEFAULTS.crestColor);
const speed = ref(DEFAULTS.speed);
const amplitude = ref(DEFAULTS.amplitude);
const waveScale = ref(DEFAULTS.waveScale);
const waveRatio = ref(DEFAULTS.waveRatio);
const swell = ref(DEFAULTS.swell);
const turbulence = ref(DEFAULTS.turbulence);
const tilt = ref(DEFAULTS.tilt);
const zoom = ref(DEFAULTS.zoom);
const height = ref(DEFAULTS.height);
const fogDepth = ref(DEFAULTS.fogDepth);
const detail = ref(DEFAULTS.detail);
const brightness = ref(DEFAULTS.brightness);
const opacity = ref(DEFAULTS.opacity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const parallaxStrength = ref(DEFAULTS.parallaxStrength);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);

const gradientWavesProps = computed(() => ({
  horizonColor: horizonColor.value,
  waveColor: waveColor.value,
  crestColor: crestColor.value,
  speed: speed.value,
  amplitude: amplitude.value,
  waveScale: waveScale.value,
  waveRatio: waveRatio.value,
  swell: swell.value,
  turbulence: turbulence.value,
  tilt: tilt.value,
  zoom: zoom.value,
  height: height.value,
  fogDepth: fogDepth.value,
  detail: detail.value,
  brightness: brightness.value,
  opacity: opacity.value,
  mouseInteraction: mouseInteraction.value,
  parallaxStrength: parallaxStrength.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value
}));

const hasChanges = computed(
  () =>
    horizonColor.value !== DEFAULTS.horizonColor ||
    waveColor.value !== DEFAULTS.waveColor ||
    crestColor.value !== DEFAULTS.crestColor ||
    speed.value !== DEFAULTS.speed ||
    amplitude.value !== DEFAULTS.amplitude ||
    waveScale.value !== DEFAULTS.waveScale ||
    waveRatio.value !== DEFAULTS.waveRatio ||
    swell.value !== DEFAULTS.swell ||
    turbulence.value !== DEFAULTS.turbulence ||
    tilt.value !== DEFAULTS.tilt ||
    zoom.value !== DEFAULTS.zoom ||
    height.value !== DEFAULTS.height ||
    fogDepth.value !== DEFAULTS.fogDepth ||
    detail.value !== DEFAULTS.detail ||
    brightness.value !== DEFAULTS.brightness ||
    opacity.value !== DEFAULTS.opacity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    parallaxStrength.value !== DEFAULTS.parallaxStrength ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity
);

function reset() {
  horizonColor.value = DEFAULTS.horizonColor;
  waveColor.value = DEFAULTS.waveColor;
  crestColor.value = DEFAULTS.crestColor;
  speed.value = DEFAULTS.speed;
  amplitude.value = DEFAULTS.amplitude;
  waveScale.value = DEFAULTS.waveScale;
  waveRatio.value = DEFAULTS.waveRatio;
  swell.value = DEFAULTS.swell;
  turbulence.value = DEFAULTS.turbulence;
  tilt.value = DEFAULTS.tilt;
  zoom.value = DEFAULTS.zoom;
  height.value = DEFAULTS.height;
  fogDepth.value = DEFAULTS.fogDepth;
  detail.value = DEFAULTS.detail;
  brightness.value = DEFAULTS.brightness;
  opacity.value = DEFAULTS.opacity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  parallaxStrength.value = DEFAULTS.parallaxStrength;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'horizonColor',
    type: 'string',
    default: "'#10B981'",
    description: 'Distant haze color the waves fade into.'
  },
  {
    name: 'waveColor',
    type: 'string',
    default: "'#84CC16'",
    description: 'Mid color of the rolling wave bodies.'
  },
  {
    name: 'crestColor',
    type: 'string',
    default: "'#FFFFFF'",
    description: 'Highlight color of the nearest wave crests.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.4',
    description: 'Animation speed of the undulating wave field.'
  },
  {
    name: 'amplitude',
    type: 'number',
    default: '2.5',
    description: 'Height of the sine-plasma waves.'
  },
  {
    name: 'waveScale',
    type: 'number',
    default: '0.6',
    description: 'Overall spatial frequency of the waves.'
  },
  {
    name: 'waveRatio',
    type: 'number',
    default: '0.9',
    description: 'Ratio between the short and long wavelength components.'
  },
  {
    name: 'swell',
    type: 'number',
    default: '35',
    description: 'Large-scale horizontal swell distortion.'
  },
  {
    name: 'turbulence',
    type: 'number',
    default: '20',
    description: 'Large-scale cross-flow turbulence distortion.'
  },
  {
    name: 'tilt',
    type: 'number',
    default: '1.11',
    description: 'Camera pitch toward the horizon (radians).'
  },
  {
    name: 'zoom',
    type: 'number',
    default: '1.0',
    description: 'Field-of-view zoom into the wave field.'
  },
  {
    name: 'height',
    type: 'number',
    default: '5.5',
    description: 'Vertical offset of the horizon line.'
  },
  {
    name: 'fogDepth',
    type: 'number',
    default: '15',
    description: 'Distance over which the waves fade into haze and transparency.'
  },
  {
    name: 'detail',
    type: 'string',
    default: "'medium'",
    description: "Raymarch quality tier: 'low', 'medium', or 'high'."
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.0',
    description: 'Overall brightness multiplier for the final color.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Global opacity of the effect.'
  },
  {
    name: 'mouseInteraction',
    type: 'boolean',
    default: 'true',
    description: 'Enable subtle pointer-driven camera parallax.'
  },
  {
    name: 'parallaxStrength',
    type: 'number',
    default: '0.5',
    description: 'Strength of the cursor parallax drift.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Overlay a whisper-subtle animated film grain on the effect.'
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
