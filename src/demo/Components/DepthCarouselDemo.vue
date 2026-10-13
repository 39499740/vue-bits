<template>
  <h1 class="sub-category">Depth Carousel</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="depthCarousel.usage"
    :source="depthCarouselSource"
    component-name="DepthCarousel"
    :props-table="props"
  >
    <template #preview>
      <div class="h-140 overflow-hidden demo-container">
        <DepthCarousel :key="key" :items="ITEMS" v-bind="depthCarouselProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Depth Tint" v-model="tint" />
        <PreviewSlider title="Card Width" :min="180" :max="420" :step="10" v-model="cardWidth" valueUnit="px" />
        <PreviewSlider title="Card Height" :min="220" :max="520" :step="10" v-model="cardHeight" valueUnit="px" />
        <PreviewSlider title="Corner Radius" :min="0" :max="48" :step="1" v-model="radius" valueUnit="px" />
        <PreviewSlider title="Depth" :min="80" :max="420" :step="10" v-model="depth" valueUnit="px" />
        <PreviewSlider title="Spread" :min="0" :max="220" :step="5" v-model="spread" valueUnit="px" />
        <PreviewSlider title="Tilt" :min="0" :max="60" :step="1" v-model="tilt" valueUnit="°" />
        <PreviewSelect title="Tilt Direction" :options="['left', 'right']" v-model="tiltDirection" />
        <PreviewSlider title="Perspective" :min="600" :max="2400" :step="50" v-model="perspective" valueUnit="px" />
        <PreviewSlider title="Visible Cards" :min="2" :max="6" :step="1" v-model="visibleCards" />
        <PreviewSlider title="Falloff" :min="0.05" :max="0.5" :step="0.01" v-model="falloff" />
        <PreviewSlider title="Blur" :min="0" :max="16" :step="1" v-model="blur" valueUnit="px" />
        <PreviewSlider title="Duration" :min="200" :max="1400" :step="50" v-model="duration" valueUnit="ms" />
        <PreviewSelect title="Ease" :options="EASE_OPTIONS" v-model="ease" />
        <PreviewSwitch title="Autoplay" v-model="autoplay" />
        <PreviewSlider
          title="Autoplay Delay"
          :min="1200"
          :max="6000"
          :step="100"
          v-model="autoplayDelay"
          valueUnit="ms"
          :isDisabled="!autoplay"
        />
        <PreviewSwitch title="Loop" v-model="loop" />
        <PreviewSwitch title="Controls" v-model="showControls" />
        <PreviewSwitch title="Indicators" v-model="showIndicators" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="depth-carousel" :usage="depthCarousel.usage!" :source="depthCarouselSource" />
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
import { depthCarousel } from '@/constants/code/Components/depthCarouselCode';
import DepthCarousel, { type TiltDirection } from '@/content/Components/DepthCarousel/DepthCarousel.vue';
import depthCarouselSource from '@/content/Components/DepthCarousel/DepthCarousel.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  cardWidth: 300,
  cardHeight: 380,
  radius: 18,
  tint: '#05060a',
  depth: 220,
  spread: 90,
  tilt: 22,
  tiltDirection: 'right' as TiltDirection,
  perspective: 1400,
  visibleCards: 4,
  falloff: 0.2,
  blur: 6,
  duration: 700,
  ease: 'power3.out',
  autoplay: false,
  autoplayDelay: 3200,
  loop: true,
  showControls: true,
  showIndicators: true
};

const ITEMS = [
  { image: 'https://picsum.photos/seed/dc-alto/800/1000', alt: 'Alto' },
  { image: 'https://picsum.photos/seed/dc-bay/800/1000', alt: 'Bay' },
  { image: 'https://picsum.photos/seed/dc-coast/800/1000', alt: 'Coast' },
  { image: 'https://picsum.photos/seed/dc-dune/800/1000', alt: 'Dune' },
  { image: 'https://picsum.photos/seed/dc-edge/800/1000', alt: 'Edge' },
  { image: 'https://picsum.photos/seed/dc-fjord/800/1000', alt: 'Fjord' },
  { image: 'https://picsum.photos/seed/dc-glade/800/1000', alt: 'Glade' }
];

const EASE_OPTIONS = [
  { label: 'Power3 Out', value: 'power3.out' },
  { label: 'Power2 In Out', value: 'power2.inOut' },
  { label: 'Expo Out', value: 'expo.out' },
  { label: 'Back Out', value: 'back.out(1.4)' },
  { label: 'Linear', value: 'none' }
];

const cardWidth = ref(DEFAULTS.cardWidth);
const cardHeight = ref(DEFAULTS.cardHeight);
const radius = ref(DEFAULTS.radius);
const tint = ref(DEFAULTS.tint);
const depth = ref(DEFAULTS.depth);
const spread = ref(DEFAULTS.spread);
const tilt = ref(DEFAULTS.tilt);
const tiltDirection = ref(DEFAULTS.tiltDirection);
const perspective = ref(DEFAULTS.perspective);
const visibleCards = ref(DEFAULTS.visibleCards);
const falloff = ref(DEFAULTS.falloff);
const blur = ref(DEFAULTS.blur);
const duration = ref(DEFAULTS.duration);
const ease = ref(DEFAULTS.ease);
const autoplay = ref(DEFAULTS.autoplay);
const autoplayDelay = ref(DEFAULTS.autoplayDelay);
const loop = ref(DEFAULTS.loop);
const showControls = ref(DEFAULTS.showControls);
const showIndicators = ref(DEFAULTS.showIndicators);

const depthCarouselProps = computed(() => ({
  cardWidth: cardWidth.value,
  cardHeight: cardHeight.value,
  radius: radius.value,
  tint: tint.value,
  depth: depth.value,
  spread: spread.value,
  tilt: tilt.value,
  tiltDirection: tiltDirection.value,
  perspective: perspective.value,
  visibleCards: visibleCards.value,
  falloff: falloff.value,
  blur: blur.value,
  duration: duration.value,
  ease: ease.value,
  autoplay: autoplay.value,
  autoplayDelay: autoplayDelay.value,
  loop: loop.value,
  showControls: showControls.value,
  showIndicators: showIndicators.value
}));

const hasChanges = computed(
  () =>
    cardWidth.value !== DEFAULTS.cardWidth ||
    cardHeight.value !== DEFAULTS.cardHeight ||
    radius.value !== DEFAULTS.radius ||
    tint.value !== DEFAULTS.tint ||
    depth.value !== DEFAULTS.depth ||
    spread.value !== DEFAULTS.spread ||
    tilt.value !== DEFAULTS.tilt ||
    tiltDirection.value !== DEFAULTS.tiltDirection ||
    perspective.value !== DEFAULTS.perspective ||
    visibleCards.value !== DEFAULTS.visibleCards ||
    falloff.value !== DEFAULTS.falloff ||
    blur.value !== DEFAULTS.blur ||
    duration.value !== DEFAULTS.duration ||
    ease.value !== DEFAULTS.ease ||
    autoplay.value !== DEFAULTS.autoplay ||
    autoplayDelay.value !== DEFAULTS.autoplayDelay ||
    loop.value !== DEFAULTS.loop ||
    showControls.value !== DEFAULTS.showControls ||
    showIndicators.value !== DEFAULTS.showIndicators
);

function reset() {
  cardWidth.value = DEFAULTS.cardWidth;
  cardHeight.value = DEFAULTS.cardHeight;
  radius.value = DEFAULTS.radius;
  tint.value = DEFAULTS.tint;
  depth.value = DEFAULTS.depth;
  spread.value = DEFAULTS.spread;
  tilt.value = DEFAULTS.tilt;
  tiltDirection.value = DEFAULTS.tiltDirection;
  perspective.value = DEFAULTS.perspective;
  visibleCards.value = DEFAULTS.visibleCards;
  falloff.value = DEFAULTS.falloff;
  blur.value = DEFAULTS.blur;
  duration.value = DEFAULTS.duration;
  ease.value = DEFAULTS.ease;
  autoplay.value = DEFAULTS.autoplay;
  autoplayDelay.value = DEFAULTS.autoplayDelay;
  loop.value = DEFAULTS.loop;
  showControls.value = DEFAULTS.showControls;
  showIndicators.value = DEFAULTS.showIndicators;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'items',
    type: 'Array<string | { image: string; alt?: string }>',
    default: '6 sample images',
    description: 'Slides to display. Pass image URLs or objects with an image URL and alt text.'
  },
  { name: 'cardWidth', type: 'number', default: '300', description: 'Width of each card in pixels.' },
  { name: 'cardHeight', type: 'number', default: '380', description: 'Height of each card in pixels.' },
  { name: 'radius', type: 'number', default: '18', description: 'Corner rounding of the cards in pixels.' },
  {
    name: 'tint',
    type: 'string',
    default: '"#05060a"',
    description: 'Colour multiplied over cards as they recede, shading the depth of the stack.'
  },
  {
    name: 'depth',
    type: 'number',
    default: '220',
    description:
      'Z distance in pixels between each card along the depth rail. Higher values push the stack further back.'
  },
  {
    name: 'spread',
    type: 'number',
    default: '90',
    description: 'Lateral offset in pixels applied per card so the stack fans out to one side.'
  },
  {
    name: 'tilt',
    type: 'number',
    default: '22',
    description: 'Degrees each receding card rotates around the vertical axis, revealing its edge.'
  },
  {
    name: 'tiltDirection',
    type: '"left" | "right"',
    default: '"right"',
    description: 'Which side the stack fans and tilts toward.'
  },
  {
    name: 'perspective',
    type: 'number',
    default: '1400',
    description: 'CSS perspective in pixels. Lower values exaggerate the depth foreshortening.'
  },
  {
    name: 'visibleCards',
    type: 'number',
    default: '4',
    description: 'How many cards deep remain visible before further ones fade out.'
  },
  {
    name: 'falloff',
    type: 'number',
    default: '0.2',
    description: 'How quickly brightness, tint and blur ramp up with depth.'
  },
  {
    name: 'blur',
    type: 'number',
    default: '6',
    description: 'Maximum blur in pixels applied to the furthest visible card.'
  },
  {
    name: 'duration',
    type: 'number',
    default: '700',
    description: 'Length of the advance transition in milliseconds.'
  },
  {
    name: 'ease',
    type: 'string',
    default: '"power3.out"',
    description: 'GSAP easing used for navigation transitions.'
  },
  {
    name: 'autoplay',
    type: 'boolean',
    default: 'false',
    description: 'Auto-advance the carousel, pausing on hover or focus.'
  },
  {
    name: 'autoplayDelay',
    type: 'number',
    default: '3200',
    description: 'Delay between auto-advances in milliseconds.'
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'true',
    description: 'Wrap seamlessly from the last card back to the first.'
  },
  {
    name: 'showControls',
    type: 'boolean',
    default: 'true',
    description: 'Show the previous / next arrow buttons.'
  },
  { name: 'showIndicators', type: 'boolean', default: 'true', description: 'Show the dot indicators.' },
  {
    name: 'onChange',
    type: '(index: number, item) => void',
    default: 'undefined',
    description: 'Called whenever the focused card changes.'
  }
];
</script>
