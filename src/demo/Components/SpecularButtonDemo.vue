<template>
  <h1 class="sub-category">Specular Button</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="specularButton.usage"
    :source="specularButtonSource"
    component-name="SpecularButton"
    :props-table="props"
  >
    <template #preview>
      <div class="h-123 overflow-hidden demo-container">
        <SpecularButton :key="key" v-bind="specularButtonProps">Get Started</SpecularButton>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Highlight" v-model="lineColor" />
        <PreviewColorPicker title="Edge" v-model="baseColor" />
        <PreviewColorPicker title="Tint" v-model="tint" />
        <PreviewColorPicker title="Text" v-model="textColor" />
        <PreviewSelect title="Size" :options="SIZE_OPTIONS" v-model="size" />
        <PreviewSlider title="Radius" :min="0" :max="60" :step="1" v-model="radius" valueUnit="" />
        <PreviewSlider title="Tint Opacity" :min="0" :max="0.4" :step="0.01" v-model="tintOpacity" />
        <PreviewSlider title="Blur" :min="0" :max="30" :step="1" v-model="blur" valueUnit="px" />
        <PreviewSlider title="Intensity" :min="0" :max="3" :step="0.05" v-model="intensity" />
        <PreviewSlider title="Shine Size" :min="5" :max="90" :step="1" v-model="shineSize" valueUnit="deg" />
        <PreviewSlider title="Shine Fade" :min="0" :max="60" :step="1" v-model="shineFade" valueUnit="deg" />
        <PreviewSlider title="Thickness" :min="0.5" :max="5" :step="0.1" v-model="thickness" valueUnit="px" />
        <PreviewSlider title="Speed" :min="0" :max="2" :step="0.05" v-model="speed" />
        <PreviewSlider title="Proximity" :min="50" :max="500" :step="10" v-model="proximity" valueUnit="px" />
        <PreviewSwitch title="Follow Mouse" v-model="followMouse" />
        <PreviewSwitch title="Auto Animate" v-model="autoAnimate" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="specular-button" :usage="specularButton.usage!" :source="specularButtonSource" />
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
import { specularButton } from '@/constants/code/Components/specularButtonCode';
import SpecularButton, { type ButtonSize } from '@/content/Components/SpecularButton/SpecularButton.vue';
import specularButtonSource from '@/content/Components/SpecularButton/SpecularButton.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  size: 'lg' as ButtonSize,
  radius: 18,
  tint: '#ffffff',
  tintOpacity: 0,
  blur: 0,
  textColor: '#f5f5f5',
  lineColor: '#ffffff',
  baseColor: '#525252',
  intensity: 1,
  shineSize: 10,
  shineFade: 40,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 250,
  autoAnimate: false
};

const size = ref(DEFAULTS.size);
const radius = ref(DEFAULTS.radius);
const tint = ref(DEFAULTS.tint);
const tintOpacity = ref(DEFAULTS.tintOpacity);
const blur = ref(DEFAULTS.blur);
const textColor = ref(DEFAULTS.textColor);
const lineColor = ref(DEFAULTS.lineColor);
const baseColor = ref(DEFAULTS.baseColor);
const intensity = ref(DEFAULTS.intensity);
const shineSize = ref(DEFAULTS.shineSize);
const shineFade = ref(DEFAULTS.shineFade);
const thickness = ref(DEFAULTS.thickness);
const speed = ref(DEFAULTS.speed);
const followMouse = ref(DEFAULTS.followMouse);
const proximity = ref(DEFAULTS.proximity);
const autoAnimate = ref(DEFAULTS.autoAnimate);

const SIZE_OPTIONS = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' }
];

const specularButtonProps = computed(() => ({
  size: size.value,
  radius: radius.value,
  tint: tint.value,
  tintOpacity: tintOpacity.value,
  blur: blur.value,
  textColor: textColor.value,
  lineColor: lineColor.value,
  baseColor: baseColor.value,
  intensity: intensity.value,
  shineSize: shineSize.value,
  shineFade: shineFade.value,
  thickness: thickness.value,
  speed: speed.value,
  followMouse: followMouse.value,
  proximity: proximity.value,
  autoAnimate: autoAnimate.value
}));

const hasChanges = computed(
  () =>
    size.value !== DEFAULTS.size ||
    radius.value !== DEFAULTS.radius ||
    tint.value !== DEFAULTS.tint ||
    tintOpacity.value !== DEFAULTS.tintOpacity ||
    blur.value !== DEFAULTS.blur ||
    textColor.value !== DEFAULTS.textColor ||
    lineColor.value !== DEFAULTS.lineColor ||
    baseColor.value !== DEFAULTS.baseColor ||
    intensity.value !== DEFAULTS.intensity ||
    shineSize.value !== DEFAULTS.shineSize ||
    shineFade.value !== DEFAULTS.shineFade ||
    thickness.value !== DEFAULTS.thickness ||
    speed.value !== DEFAULTS.speed ||
    followMouse.value !== DEFAULTS.followMouse ||
    proximity.value !== DEFAULTS.proximity ||
    autoAnimate.value !== DEFAULTS.autoAnimate
);

function reset() {
  size.value = DEFAULTS.size;
  radius.value = DEFAULTS.radius;
  tint.value = DEFAULTS.tint;
  tintOpacity.value = DEFAULTS.tintOpacity;
  blur.value = DEFAULTS.blur;
  textColor.value = DEFAULTS.textColor;
  lineColor.value = DEFAULTS.lineColor;
  baseColor.value = DEFAULTS.baseColor;
  intensity.value = DEFAULTS.intensity;
  shineSize.value = DEFAULTS.shineSize;
  shineFade.value = DEFAULTS.shineFade;
  thickness.value = DEFAULTS.thickness;
  speed.value = DEFAULTS.speed;
  followMouse.value = DEFAULTS.followMouse;
  proximity.value = DEFAULTS.proximity;
  autoAnimate.value = DEFAULTS.autoAnimate;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'children', type: 'slot', default: '"Get Started"', description: 'Button label or any custom content.' },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"lg"',
    description: 'Preset padding and font size of the button.'
  },
  {
    name: 'radius',
    type: 'number',
    default: '18',
    description: 'Corner radius in pixels; clamps to a pill automatically.'
  },
  { name: 'tint', type: 'string', default: '"#ffffff"', description: 'Color of the glass background tint.' },
  { name: 'tintOpacity', type: 'number', default: '0', description: 'Strength of the glass tint.' },
  { name: 'blur', type: 'number', default: '0', description: 'Backdrop blur in pixels behind the button.' },
  { name: 'textColor', type: 'string', default: '"#f5f5f5"', description: 'Color of the button label.' },
  { name: 'lineColor', type: 'string', default: '"#ffffff"', description: 'Color of the moving specular highlight.' },
  {
    name: 'baseColor',
    type: 'string',
    default: '"#525252"',
    description: 'Color of the static edge stroke under the highlight.'
  },
  { name: 'intensity', type: 'number', default: '1', description: 'Brightness of the specular highlight.' },
  {
    name: 'shineSize',
    type: 'number',
    default: '10',
    description: 'Angular size in degrees of each shine streak along the edge.'
  },
  {
    name: 'shineFade',
    type: 'number',
    default: '40',
    description: 'How gradually each streak fades out at its ends, in degrees.'
  },
  { name: 'thickness', type: 'number', default: '1', description: 'Width of the highlight line in pixels.' },
  {
    name: 'speed',
    type: 'number',
    default: '0.35',
    description: 'Rotation speed of the sweep when autoAnimate is on.'
  },
  { name: 'followMouse', type: 'boolean', default: 'true', description: 'Point the light toward the cursor.' },
  {
    name: 'proximity',
    type: 'number',
    default: '250',
    description: 'Distance in pixels within which the shine fades in as the cursor approaches.'
  },
  {
    name: 'autoAnimate',
    type: 'boolean',
    default: 'false',
    description: 'Keep the shine always on with a rotating sweep, regardless of cursor distance.'
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
  { name: 'onClick', type: 'MouseEventHandler', default: '-', description: 'Standard button click handler.' },
  { name: 'type', type: '"button" | "submit" | "reset"', default: '"button"', description: 'Native button type.' },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the button.' }
];
</script>
