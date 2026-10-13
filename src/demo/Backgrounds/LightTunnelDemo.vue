<template>
  <h1 class="sub-category">Light Tunnel</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="lightTunnel.usage"
    :source="lightTunnelSource"
    componentName="LightTunnel"
    :props-table="props"
  >
    <template #preview>
      <div class="relative bg-[#14110e] rounded-2xl w-full h-125 overflow-hidden demo-container">
        <LightTunnel :key="key" v-bind="lightTunnelProps" />
        <BackgroundContent pillText="New Background" headline="A fibre-optic tunnel of traveling light." />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Cable Color" v-model="cableColor" />
        <PreviewColorPicker title="Pulse Color" v-model="pulseColor" />
        <PreviewColorPicker title="Tunnel Color" v-model="tunnelColor" />
        <PreviewSlider title="Tunnel Opacity" :min="0" :max="1" :step="0.01" v-model="tunnelOpacity" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSelect
          title="Flow Direction"
          name="light-tunnel-flow"
          v-model="flowDirection"
          :options="[
            { label: 'Inward', value: 'inward' },
            { label: 'Outward', value: 'outward' }
          ]"
        />
        <PreviewSlider title="Pulse Speed" :min="0" :max="3" :step="0.05" v-model="pulseSpeed" />
        <PreviewSlider title="Pulse Length" :min="0.02" :max="0.5" :step="0.01" v-model="pulseLength" />
        <PreviewSlider title="Pulse Blend" :min="0" :max="1" :step="0.01" v-model="pulseBlend" />
        <PreviewSlider title="Pulse Width" :min="0.1" :max="1" :step="0.01" v-model="pulseWidth" />
        <PreviewSlider title="Cable Count" :min="10" :max="80" :step="1" v-model="cableCount" />
        <PreviewSlider title="Thickness" :min="0.1" :max="1" :step="0.01" v-model="thickness" />
        <PreviewSlider title="Rim Width" :min="0" :max="1" :step="0.01" v-model="rimWidth" />
        <PreviewSlider title="Waviness" :min="0" :max="1" :step="0.01" v-model="waviness" />
        <PreviewSlider title="Sway" :min="0" :max="1" :step="0.01" v-model="sway" />
        <PreviewSlider title="Size" :min="0.3" :max="3" :step="0.05" v-model="size" />
        <PreviewSlider title="Center Offset X" :min="-1" :max="1" :step="0.01" v-model="centerX" />
        <PreviewSlider title="Center Offset Y" :min="-1" :max="1" :step="0.01" v-model="centerY" />
        <PreviewSlider title="Glow" :min="0" :max="3" :step="0.05" v-model="glow" />
        <PreviewSlider title="Fade Near" :min="0.01" :max="0.6" :step="0.01" v-model="fadeNear" />
        <PreviewSlider title="Fade Far" :min="0.9" :max="2.5" :step="0.05" v-model="fadeFar" />
        <PreviewSlider title="Brightness" :min="0" :max="2.5" :step="0.05" v-model="brightness" />
        <PreviewSwitch title="Color Variance" v-model="colorVariance" />
        <PreviewSwitch title="Grain" v-model="grain" />
        <PreviewSlider title="Grain Intensity" :min="0" :max="0.3" :step="0.01" v-model="grainIntensity" />
        <PreviewSlider title="Opacity" :min="0" :max="1" :step="0.01" v-model="opacity" />
        <PreviewSwitch title="Cursor Parallax" v-model="mouseInteraction" />
        <PreviewSlider title="Cursor Strength" :min="0" :max="0.4" :step="0.01" v-model="mouseStrength" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="light-tunnel" :usage="lightTunnel.usage!" :source="lightTunnelSource" />
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
import { lightTunnel } from '@/constants/code/Backgrounds/lightTunnelCode';
import LightTunnel, { type FlowDirection } from '@/content/Backgrounds/LightTunnel/LightTunnel.vue';
import lightTunnelSource from '@/content/Backgrounds/LightTunnel/LightTunnel.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  cableColor: '#10B981',
  pulseColor: '#10B981',
  tunnelColor: '#84CC16',
  tunnelOpacity: 0,
  speed: 0.1,
  flowDirection: 'outward' as FlowDirection,
  pulseSpeed: 2,
  pulseLength: 0.28,
  pulseBlend: 1,
  pulseWidth: 1,
  cableCount: 20,
  thickness: 0.35,
  rimWidth: 0.15,
  waviness: 0.3,
  sway: 0.5,
  size: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  glow: 1.0,
  fadeNear: 0.5,
  fadeFar: 2,
  brightness: 1.0,
  colorVariance: true,
  grain: true,
  grainIntensity: 0.05,
  opacity: 1.0,
  mouseInteraction: true,
  mouseStrength: 0.1
};

const cableColor = ref(DEFAULTS.cableColor);
const pulseColor = ref(DEFAULTS.pulseColor);
const tunnelColor = ref(DEFAULTS.tunnelColor);
const tunnelOpacity = ref(DEFAULTS.tunnelOpacity);
const speed = ref(DEFAULTS.speed);
const flowDirection = ref(DEFAULTS.flowDirection);
const pulseSpeed = ref(DEFAULTS.pulseSpeed);
const pulseLength = ref(DEFAULTS.pulseLength);
const pulseBlend = ref(DEFAULTS.pulseBlend);
const pulseWidth = ref(DEFAULTS.pulseWidth);
const cableCount = ref(DEFAULTS.cableCount);
const thickness = ref(DEFAULTS.thickness);
const rimWidth = ref(DEFAULTS.rimWidth);
const waviness = ref(DEFAULTS.waviness);
const sway = ref(DEFAULTS.sway);
const size = ref(DEFAULTS.size);
const centerX = ref(DEFAULTS.centerX);
const centerY = ref(DEFAULTS.centerY);
const glow = ref(DEFAULTS.glow);
const fadeNear = ref(DEFAULTS.fadeNear);
const fadeFar = ref(DEFAULTS.fadeFar);
const brightness = ref(DEFAULTS.brightness);
const colorVariance = ref(DEFAULTS.colorVariance);
const grain = ref(DEFAULTS.grain);
const grainIntensity = ref(DEFAULTS.grainIntensity);
const opacity = ref(DEFAULTS.opacity);
const mouseInteraction = ref(DEFAULTS.mouseInteraction);
const mouseStrength = ref(DEFAULTS.mouseStrength);

const lightTunnelProps = computed(() => ({
  cableColor: cableColor.value,
  pulseColor: pulseColor.value,
  tunnelColor: tunnelColor.value,
  tunnelOpacity: tunnelOpacity.value,
  speed: speed.value,
  flowDirection: flowDirection.value,
  pulseSpeed: pulseSpeed.value,
  pulseLength: pulseLength.value,
  pulseBlend: pulseBlend.value,
  pulseWidth: pulseWidth.value,
  cableCount: cableCount.value,
  thickness: thickness.value,
  rimWidth: rimWidth.value,
  waviness: waviness.value,
  sway: sway.value,
  size: size.value,
  centerX: centerX.value,
  centerY: centerY.value,
  glow: glow.value,
  fadeNear: fadeNear.value,
  fadeFar: fadeFar.value,
  brightness: brightness.value,
  colorVariance: colorVariance.value,
  grain: grain.value,
  grainIntensity: grainIntensity.value,
  opacity: opacity.value,
  mouseInteraction: mouseInteraction.value,
  mouseStrength: mouseStrength.value
}));

const hasChanges = computed(
  () =>
    cableColor.value !== DEFAULTS.cableColor ||
    pulseColor.value !== DEFAULTS.pulseColor ||
    tunnelColor.value !== DEFAULTS.tunnelColor ||
    tunnelOpacity.value !== DEFAULTS.tunnelOpacity ||
    speed.value !== DEFAULTS.speed ||
    flowDirection.value !== DEFAULTS.flowDirection ||
    pulseSpeed.value !== DEFAULTS.pulseSpeed ||
    pulseLength.value !== DEFAULTS.pulseLength ||
    pulseBlend.value !== DEFAULTS.pulseBlend ||
    pulseWidth.value !== DEFAULTS.pulseWidth ||
    cableCount.value !== DEFAULTS.cableCount ||
    thickness.value !== DEFAULTS.thickness ||
    rimWidth.value !== DEFAULTS.rimWidth ||
    waviness.value !== DEFAULTS.waviness ||
    sway.value !== DEFAULTS.sway ||
    size.value !== DEFAULTS.size ||
    centerX.value !== DEFAULTS.centerX ||
    centerY.value !== DEFAULTS.centerY ||
    glow.value !== DEFAULTS.glow ||
    fadeNear.value !== DEFAULTS.fadeNear ||
    fadeFar.value !== DEFAULTS.fadeFar ||
    brightness.value !== DEFAULTS.brightness ||
    colorVariance.value !== DEFAULTS.colorVariance ||
    grain.value !== DEFAULTS.grain ||
    grainIntensity.value !== DEFAULTS.grainIntensity ||
    opacity.value !== DEFAULTS.opacity ||
    mouseInteraction.value !== DEFAULTS.mouseInteraction ||
    mouseStrength.value !== DEFAULTS.mouseStrength
);

function reset() {
  cableColor.value = DEFAULTS.cableColor;
  pulseColor.value = DEFAULTS.pulseColor;
  tunnelColor.value = DEFAULTS.tunnelColor;
  tunnelOpacity.value = DEFAULTS.tunnelOpacity;
  speed.value = DEFAULTS.speed;
  flowDirection.value = DEFAULTS.flowDirection;
  pulseSpeed.value = DEFAULTS.pulseSpeed;
  pulseLength.value = DEFAULTS.pulseLength;
  pulseBlend.value = DEFAULTS.pulseBlend;
  pulseWidth.value = DEFAULTS.pulseWidth;
  cableCount.value = DEFAULTS.cableCount;
  thickness.value = DEFAULTS.thickness;
  rimWidth.value = DEFAULTS.rimWidth;
  waviness.value = DEFAULTS.waviness;
  sway.value = DEFAULTS.sway;
  size.value = DEFAULTS.size;
  centerX.value = DEFAULTS.centerX;
  centerY.value = DEFAULTS.centerY;
  glow.value = DEFAULTS.glow;
  fadeNear.value = DEFAULTS.fadeNear;
  fadeFar.value = DEFAULTS.fadeFar;
  brightness.value = DEFAULTS.brightness;
  colorVariance.value = DEFAULTS.colorVariance;
  grain.value = DEFAULTS.grain;
  grainIntensity.value = DEFAULTS.grainIntensity;
  opacity.value = DEFAULTS.opacity;
  mouseInteraction.value = DEFAULTS.mouseInteraction;
  mouseStrength.value = DEFAULTS.mouseStrength;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'cableColor',
    type: 'string',
    default: "'#10B981'",
    description: 'Base color of the fibre-optic cables.'
  },
  {
    name: 'pulseColor',
    type: 'string',
    default: "'#10B981'",
    description: 'Color of the light pulses travelling along each cable.'
  },
  {
    name: 'tunnelColor',
    type: 'string',
    default: "'#84CC16'",
    description: 'Tint color of the cable body fill (visible when tunnelOpacity is above 0).'
  },
  {
    name: 'tunnelOpacity',
    type: 'number',
    default: '0',
    description: 'Opacity of the cable body fill. 0 leaves the tunnel see-through so only rims and pulses show.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.1',
    description: 'Overall scroll speed of the pulses down the tunnel.'
  },
  {
    name: 'flowDirection',
    type: "'inward' | 'outward'",
    default: "'outward'",
    description: 'Whether the light travels toward or away from the vanishing point.'
  },
  {
    name: 'pulseSpeed',
    type: 'number',
    default: '2',
    description: 'Speed multiplier for the individual light pulses.'
  },
  {
    name: 'pulseLength',
    type: 'number',
    default: '0.28',
    description: 'Length of the glowing pulse along each cable.'
  },
  {
    name: 'pulseBlend',
    type: 'number',
    default: '1',
    description: 'How softly the pulse fades out at its edges — low is a crisp packet, high is a long smooth trail.'
  },
  {
    name: 'pulseWidth',
    type: 'number',
    default: '1',
    description:
      'How much of the cable cross-section the pulse lights up — 1 fills the cable, lower narrows it to a filament.'
  },
  {
    name: 'cableCount',
    type: 'number',
    default: '20',
    description: 'Number of cables radiating around the tunnel.'
  },
  {
    name: 'thickness',
    type: 'number',
    default: '0.35',
    description: 'Thickness of each cable core.'
  },
  {
    name: 'rimWidth',
    type: 'number',
    default: '0.15',
    description: 'Width of the soft outline glow around each cable.'
  },
  {
    name: 'waviness',
    type: 'number',
    default: '0.3',
    description: 'Amount of wavy distortion applied along the tunnel depth.'
  },
  {
    name: 'sway',
    type: 'number',
    default: '0.5',
    description: 'Strength of the gentle rotational sway of the tunnel.'
  },
  {
    name: 'size',
    type: 'number',
    default: '1.0',
    description: 'Zoom / scale of the tunnel field.'
  },
  {
    name: 'centerX',
    type: 'number',
    default: '0.0',
    description: 'Horizontal offset of the vanishing point.'
  },
  {
    name: 'centerY',
    type: 'number',
    default: '0.0',
    description: 'Vertical offset of the vanishing point.'
  },
  {
    name: 'glow',
    type: 'number',
    default: '1.0',
    description: 'Intensity of the cable rim glow.'
  },
  {
    name: 'fadeNear',
    type: 'number',
    default: '0.5',
    description: 'Radius over which the tunnel fades in near the center.'
  },
  {
    name: 'fadeFar',
    type: 'number',
    default: '2',
    description: 'Radius at which the tunnel fades out toward the edges.'
  },
  {
    name: 'brightness',
    type: 'number',
    default: '1.0',
    description: 'Overall brightness multiplier of the effect.'
  },
  {
    name: 'colorVariance',
    type: 'boolean',
    default: 'true',
    description: 'Adds subtle per-cable color variation so cables are not uniform.'
  },
  {
    name: 'grain',
    type: 'boolean',
    default: 'true',
    description: 'Adds a whisper-subtle animated film grain to break up banding in the gradients.'
  },
  {
    name: 'grainIntensity',
    type: 'number',
    default: '0.05',
    description: 'Amplitude of the grain overlay. 0 disables it entirely.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '1.0',
    description: 'Global opacity of the rendered tunnel.'
  },
  {
    name: 'mouseInteraction',
    type: 'boolean',
    default: 'true',
    description: 'Enables gentle parallax of the vanishing point toward the pointer.'
  },
  {
    name: 'mouseStrength',
    type: 'number',
    default: '0.1',
    description: 'Magnitude of the cursor parallax drift.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes applied to the container.'
  }
];
</script>
