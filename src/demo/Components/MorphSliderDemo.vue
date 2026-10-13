<template>
  <h1 class="sub-category">Morph Slider</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="morphSlider.usage"
    :source="morphSliderSource"
    component-name="MorphSlider"
    :props-table="props"
  >
    <template #preview>
      <div class="h-140 overflow-hidden demo-container">
        <MorphSlider :key="key" :items="DEMO_ITEMS" v-bind="morphSliderProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSelect title="Transition" :options="TRANSITION_OPTIONS" v-model="transition" />
        <PreviewColorPicker title="Overlay" v-model="overlayColor" />
        <PreviewSelect title="Ease" :options="EASE_OPTIONS" v-model="ease" />
        <PreviewSlider title="Duration" :min="0.4" :max="2.5" :step="0.1" v-model="duration" valueUnit="s" />
        <PreviewSlider title="Intensity" :min="0" :max="1.2" :step="0.05" v-model="intensity" />
        <PreviewSlider title="Noise Scale" :min="0.5" :max="6" :step="0.1" v-model="scale" />
        <PreviewSlider title="Aberration" :min="0" :max="1" :step="0.05" v-model="aberration" />
        <PreviewSlider title="Drift" :min="0" :max="1.5" :step="0.05" v-model="drift" />
        <PreviewSlider title="Autoplay Delay" :min="1.5" :max="8" :step="0.5" v-model="autoplayDelay" valueUnit="s" />
        <PreviewSlider title="Radius" :min="0" :max="40" :step="1" v-model="radius" valueUnit="px" />
        <PreviewSwitch title="Autoplay" v-model="autoplay" />
        <PreviewSwitch title="Loop" v-model="loop" />
        <PreviewSwitch title="Captions" v-model="showCaptions" />
        <PreviewSwitch title="Controls" v-model="showControls" />
        <PreviewSwitch title="Indicators" v-model="showIndicators" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="morph-slider" :usage="morphSlider.usage!" :source="morphSliderSource" />
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
import { morphSlider } from '@/constants/code/Components/morphSliderCode';
import MorphSlider, { type MorphTransition } from '@/content/Components/MorphSlider/MorphSlider.vue';
import morphSliderSource from '@/content/Components/MorphSlider/MorphSlider.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  transition: 'melt' as MorphTransition,
  overlayColor: '#05060a',
  duration: 1.1,
  ease: 'power2.inOut',
  intensity: 0.55,
  scale: 2.4,
  aberration: 0.35,
  drift: 0.4,
  autoplay: false,
  autoplayDelay: 4,
  loop: true,
  radius: 16,
  showCaptions: true,
  showControls: true,
  showIndicators: true
};

const DEMO_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop',
    caption: 'One'
  },
  {
    image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop',
    caption: 'Two'
  },
  {
    image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop',
    caption: 'Three'
  },
  {
    image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop',
    caption: 'Four'
  }
];

const TRANSITION_OPTIONS = [
  { value: 'melt', label: 'Melt' },
  { value: 'ripple', label: 'Ripple' },
  { value: 'shear', label: 'Shear' },
  { value: 'swirl', label: 'Swirl' }
];

const EASE_OPTIONS = [
  { value: 'power2.inOut', label: 'Smooth (power2.inOut)' },
  { value: 'power3.out', label: 'Expo Out (power3.out)' },
  { value: 'expo.inOut', label: 'Expo InOut' },
  { value: 'none', label: 'Linear' }
];

const transition = ref(DEFAULTS.transition);
const overlayColor = ref(DEFAULTS.overlayColor);
const duration = ref(DEFAULTS.duration);
const ease = ref(DEFAULTS.ease);
const intensity = ref(DEFAULTS.intensity);
const scale = ref(DEFAULTS.scale);
const aberration = ref(DEFAULTS.aberration);
const drift = ref(DEFAULTS.drift);
const autoplay = ref(DEFAULTS.autoplay);
const autoplayDelay = ref(DEFAULTS.autoplayDelay);
const loop = ref(DEFAULTS.loop);
const radius = ref(DEFAULTS.radius);
const showCaptions = ref(DEFAULTS.showCaptions);
const showControls = ref(DEFAULTS.showControls);
const showIndicators = ref(DEFAULTS.showIndicators);

const morphSliderProps = computed(() => ({
  transition: transition.value,
  overlayColor: overlayColor.value,
  duration: duration.value,
  ease: ease.value,
  intensity: intensity.value,
  scale: scale.value,
  aberration: aberration.value,
  drift: drift.value,
  autoplay: autoplay.value,
  autoplayDelay: autoplayDelay.value,
  loop: loop.value,
  radius: radius.value,
  showCaptions: showCaptions.value,
  showControls: showControls.value,
  showIndicators: showIndicators.value
}));

const hasChanges = computed(
  () =>
    transition.value !== DEFAULTS.transition ||
    overlayColor.value !== DEFAULTS.overlayColor ||
    duration.value !== DEFAULTS.duration ||
    ease.value !== DEFAULTS.ease ||
    intensity.value !== DEFAULTS.intensity ||
    scale.value !== DEFAULTS.scale ||
    aberration.value !== DEFAULTS.aberration ||
    drift.value !== DEFAULTS.drift ||
    autoplay.value !== DEFAULTS.autoplay ||
    autoplayDelay.value !== DEFAULTS.autoplayDelay ||
    loop.value !== DEFAULTS.loop ||
    radius.value !== DEFAULTS.radius ||
    showCaptions.value !== DEFAULTS.showCaptions ||
    showControls.value !== DEFAULTS.showControls ||
    showIndicators.value !== DEFAULTS.showIndicators
);

function reset() {
  transition.value = DEFAULTS.transition;
  overlayColor.value = DEFAULTS.overlayColor;
  duration.value = DEFAULTS.duration;
  ease.value = DEFAULTS.ease;
  intensity.value = DEFAULTS.intensity;
  scale.value = DEFAULTS.scale;
  aberration.value = DEFAULTS.aberration;
  drift.value = DEFAULTS.drift;
  autoplay.value = DEFAULTS.autoplay;
  autoplayDelay.value = DEFAULTS.autoplayDelay;
  loop.value = DEFAULTS.loop;
  radius.value = DEFAULTS.radius;
  showCaptions.value = DEFAULTS.showCaptions;
  showControls.value = DEFAULTS.showControls;
  showIndicators.value = DEFAULTS.showIndicators;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'items',
    type: 'Array<{ image: string; caption?: string }>',
    default: '[...]',
    description: 'Slides to morph between. Each item is an image URL with an optional caption.'
  },
  { name: 'startIndex', type: 'number', default: '0', description: 'Index of the slide shown on mount.' },
  {
    name: 'transition',
    type: '"melt" | "ripple" | "shear" | "swirl"',
    default: '"melt"',
    description: 'Character of the GPU displacement morph between slides.'
  },
  { name: 'duration', type: 'number', default: '1.1', description: 'Length of a full transition in seconds.' },
  {
    name: 'ease',
    type: 'string',
    default: '"power2.inOut"',
    description: 'GSAP easing curve used to drive the transition progress.'
  },
  {
    name: 'intensity',
    type: 'number',
    default: '0.55',
    description: 'Strength of the displacement — how far the images warp during the morph.'
  },
  {
    name: 'scale',
    type: 'number',
    default: '2.4',
    description: 'Frequency of the procedural noise field (affects the Melt transition most).'
  },
  {
    name: 'aberration',
    type: 'number',
    default: '0.35',
    description: 'Amount of RGB split that peaks mid-transition and resolves to zero.'
  },
  {
    name: 'drift',
    type: 'number',
    default: '0.4',
    description: 'Idle drift / breathing applied to the current image so it is never fully static.'
  },
  {
    name: 'autoplay',
    type: 'boolean',
    default: 'false',
    description: 'Advance slides automatically; pauses on hover.'
  },
  {
    name: 'autoplayDelay',
    type: 'number',
    default: '4',
    description: 'Seconds each slide holds before autoplay advances.'
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'true',
    description: 'Wrap around from the last slide back to the first.'
  },
  { name: 'radius', type: 'number', default: '16', description: 'Corner radius of the slider in pixels.' },
  {
    name: 'overlayColor',
    type: 'string',
    default: '"#000000"',
    description: 'Tint used for the subtle edge vignette over the images.'
  },
  {
    name: 'showCaptions',
    type: 'boolean',
    default: 'true',
    description: 'Show slide captions that animate in with each transition.'
  },
  {
    name: 'showControls',
    type: 'boolean',
    default: 'true',
    description: 'Show the previous / next arrow buttons.'
  },
  { name: 'showIndicators', type: 'boolean', default: 'true', description: 'Show the slide indicator dots.' },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the outer wrapper.' }
];
</script>
