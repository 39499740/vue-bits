<template>
  <h1 class="sub-category">Glow Cursor</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="glowCursor.usage"
    :source="glowCursorSource"
    component-name="GlowCursor"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <GlowCursor :key="key" v-bind="glowCursorProps">
          <p
            class="top-1/2 left-1/2 absolute font-black text-[#293a2f] text-[clamp(2rem,6vw,3rem)] text-center -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          >
            Move Your Cursor
          </p>
        </GlowCursor>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Head Color" v-model="color" />
        <PreviewColorPicker title="Tail Color" v-model="secondaryColor" />
        <PreviewSelect title="Blend Mode" :options="BLEND_OPTIONS" v-model="blendMode" />
        <PreviewSlider title="Trail Length" :min="8" :max="64" :step="1" v-model="trailLength" />
        <PreviewSlider title="Trail Width" :min="2" :max="24" :step="1" v-model="trailWidth" valueUnit="px" />
        <PreviewSlider title="Trail Taper" :min="0" :max="1" :step="0.01" v-model="trailTaper" />
        <PreviewSlider title="Follow Speed" :min="0.03" :max="0.5" :step="0.01" v-model="followSpeed" />
        <PreviewSlider title="Glow Intensity" :min="0" :max="4" :step="0.05" v-model="glowIntensity" />
        <PreviewSlider title="Glow Spread" :min="0.1" :max="3" :step="0.05" v-model="glowSpread" />
        <PreviewSlider title="Hotspot" :min="0" :max="1" :step="0.01" v-model="hotspot" />
        <PreviewSlider title="Brightness" :min="0.25" :max="2.5" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Opacity" :min="0.1" :max="1" :step="0.01" v-model="opacity" />
        <PreviewSlider title="Pulse Speed" :min="0" :max="4" :step="0.1" v-model="pulseSpeed" />
        <PreviewSlider title="Noise" :min="0" :max="0.25" :step="0.005" v-model="noiseStrength" />
        <PreviewSlider title="Idle Timeout" :min="0" :max="2000" :step="50" v-model="idleTimeout" valueUnit="ms" />
        <PreviewSlider title="Fade Duration" :min="100" :max="2500" :step="50" v-model="fadeDuration" valueUnit="ms" />
        <PreviewSlider title="Max DPR" :min="0.5" :max="2" :step="0.25" v-model="maxDevicePixelRatio" />
        <PreviewSwitch title="Idle Fade" v-model="idleFade" />
        <PreviewSwitch title="Enabled" v-model="enabled" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="glow-cursor" :usage="glowCursor.usage!" :source="glowCursorSource" />
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
import { glowCursor } from '@/constants/code/Animations/glowCursorCode';
import GlowCursor, { type BlendMode } from '@/content/Animations/GlowCursor/GlowCursor.vue';
import glowCursorSource from '@/content/Animations/GlowCursor/GlowCursor.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  color: '#67E8F9',
  secondaryColor: '#84CC16',
  trailLength: 40,
  trailWidth: 8,
  trailTaper: 0.8,
  followSpeed: 0.16,
  glowIntensity: 1.9,
  glowSpread: 1.2,
  hotspot: 0.65,
  brightness: 1.25,
  opacity: 1,
  pulseSpeed: 1.1,
  noiseStrength: 0.035,
  idleFade: true,
  idleTimeout: 700,
  fadeDuration: 900,
  blendMode: 'screen' as BlendMode,
  maxDevicePixelRatio: 1.5,
  enabled: true
};

const BLEND_OPTIONS = [
  { value: 'screen', label: 'Screen' },
  { value: 'plus-lighter', label: 'Plus Lighter' },
  { value: 'normal', label: 'Normal' }
];

const color = ref(DEFAULTS.color);
const secondaryColor = ref(DEFAULTS.secondaryColor);
const trailLength = ref(DEFAULTS.trailLength);
const trailWidth = ref(DEFAULTS.trailWidth);
const trailTaper = ref(DEFAULTS.trailTaper);
const followSpeed = ref(DEFAULTS.followSpeed);
const glowIntensity = ref(DEFAULTS.glowIntensity);
const glowSpread = ref(DEFAULTS.glowSpread);
const hotspot = ref(DEFAULTS.hotspot);
const brightness = ref(DEFAULTS.brightness);
const opacity = ref(DEFAULTS.opacity);
const pulseSpeed = ref(DEFAULTS.pulseSpeed);
const noiseStrength = ref(DEFAULTS.noiseStrength);
const idleFade = ref(DEFAULTS.idleFade);
const idleTimeout = ref(DEFAULTS.idleTimeout);
const fadeDuration = ref(DEFAULTS.fadeDuration);
const blendMode = ref(DEFAULTS.blendMode);
const maxDevicePixelRatio = ref(DEFAULTS.maxDevicePixelRatio);
const enabled = ref(DEFAULTS.enabled);

const glowCursorProps = computed(() => ({
  color: color.value,
  secondaryColor: secondaryColor.value,
  trailLength: trailLength.value,
  trailWidth: trailWidth.value,
  trailTaper: trailTaper.value,
  followSpeed: followSpeed.value,
  glowIntensity: glowIntensity.value,
  glowSpread: glowSpread.value,
  hotspot: hotspot.value,
  brightness: brightness.value,
  opacity: opacity.value,
  pulseSpeed: pulseSpeed.value,
  noiseStrength: noiseStrength.value,
  idleFade: idleFade.value,
  idleTimeout: idleTimeout.value,
  fadeDuration: fadeDuration.value,
  blendMode: blendMode.value,
  maxDevicePixelRatio: maxDevicePixelRatio.value,
  enabled: enabled.value
}));

const hasChanges = computed(
  () =>
    color.value !== DEFAULTS.color ||
    secondaryColor.value !== DEFAULTS.secondaryColor ||
    trailLength.value !== DEFAULTS.trailLength ||
    trailWidth.value !== DEFAULTS.trailWidth ||
    trailTaper.value !== DEFAULTS.trailTaper ||
    followSpeed.value !== DEFAULTS.followSpeed ||
    glowIntensity.value !== DEFAULTS.glowIntensity ||
    glowSpread.value !== DEFAULTS.glowSpread ||
    hotspot.value !== DEFAULTS.hotspot ||
    brightness.value !== DEFAULTS.brightness ||
    opacity.value !== DEFAULTS.opacity ||
    pulseSpeed.value !== DEFAULTS.pulseSpeed ||
    noiseStrength.value !== DEFAULTS.noiseStrength ||
    idleFade.value !== DEFAULTS.idleFade ||
    idleTimeout.value !== DEFAULTS.idleTimeout ||
    fadeDuration.value !== DEFAULTS.fadeDuration ||
    blendMode.value !== DEFAULTS.blendMode ||
    maxDevicePixelRatio.value !== DEFAULTS.maxDevicePixelRatio ||
    enabled.value !== DEFAULTS.enabled
);

function reset() {
  color.value = DEFAULTS.color;
  secondaryColor.value = DEFAULTS.secondaryColor;
  trailLength.value = DEFAULTS.trailLength;
  trailWidth.value = DEFAULTS.trailWidth;
  trailTaper.value = DEFAULTS.trailTaper;
  followSpeed.value = DEFAULTS.followSpeed;
  glowIntensity.value = DEFAULTS.glowIntensity;
  glowSpread.value = DEFAULTS.glowSpread;
  hotspot.value = DEFAULTS.hotspot;
  brightness.value = DEFAULTS.brightness;
  opacity.value = DEFAULTS.opacity;
  pulseSpeed.value = DEFAULTS.pulseSpeed;
  noiseStrength.value = DEFAULTS.noiseStrength;
  idleFade.value = DEFAULTS.idleFade;
  idleTimeout.value = DEFAULTS.idleTimeout;
  fadeDuration.value = DEFAULTS.fadeDuration;
  blendMode.value = DEFAULTS.blendMode;
  maxDevicePixelRatio.value = DEFAULTS.maxDevicePixelRatio;
  enabled.value = DEFAULTS.enabled;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'color', type: 'string', default: "'#67E8F9'", description: 'Color at the bright head of the trail.' },
  {
    name: 'secondaryColor',
    type: 'string',
    default: "'#84CC16'",
    description: 'Color blended into the end of the trail.'
  },
  {
    name: 'trailLength',
    type: 'number',
    default: '40',
    description: 'Number of smoothed points used to build the trail, from 2 to 64.'
  },
  { name: 'trailWidth', type: 'number', default: '8', description: 'Width of the luminous trail core in pixels.' },
  {
    name: 'trailTaper',
    type: 'number',
    default: '0.8',
    description: 'How strongly the trail narrows and dims toward its tail.'
  },
  {
    name: 'followSpeed',
    type: 'number',
    default: '0.16',
    description: 'How quickly the glowing head catches the pointer.'
  },
  {
    name: 'glowIntensity',
    type: 'number',
    default: '1.9',
    description: 'Strength of the soft inverse-square halo around the trail.'
  },
  {
    name: 'glowSpread',
    type: 'number',
    default: '1.2',
    description: 'Distance the outer glow spreads from the trail core.'
  },
  {
    name: 'hotspot',
    type: 'number',
    default: '0.65',
    description: 'Amount of white-hot color added to the brightest part of the trail.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.25',
    description: 'Final luminance multiplier for the shader.'
  },
  { name: 'opacity', type: 'number', default: '1', description: 'Overall trail opacity.' },
  {
    name: 'pulseSpeed',
    type: 'number',
    default: '1.1',
    description: 'Speed of the energy pulse travelling through the trail. Set to 0 to stop it.'
  },
  {
    name: 'noiseStrength',
    type: 'number',
    default: '0.035',
    description: 'Amount of fine animated texture in the glow.'
  },
  {
    name: 'idleFade',
    type: 'boolean',
    default: 'true',
    description: 'Fade the effect when the pointer stops or leaves the container.'
  },
  {
    name: 'idleTimeout',
    type: 'number',
    default: '700',
    description: 'Idle time in milliseconds before fading begins.'
  },
  {
    name: 'fadeDuration',
    type: 'number',
    default: '900',
    description: 'Approximate duration of the idle fade in milliseconds.'
  },
  {
    name: 'blendMode',
    type: "'normal' | 'screen' | 'plus-lighter'",
    default: "'screen'",
    description: 'CSS blend mode used to composite the canvas over its content.'
  },
  {
    name: 'maxDevicePixelRatio',
    type: 'number',
    default: '1.5',
    description: 'Render-resolution cap for balancing sharpness and GPU cost.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Enable or fade out the cursor effect.' },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Optional content rendered beneath the interactive trail.'
  },
  { name: 'className', type: 'string', default: "''", description: 'Additional classes for the container.' },
  { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Inline styles for the container.' }
];
</script>
