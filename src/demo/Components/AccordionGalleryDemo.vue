<template>
  <h1 class="sub-category">Accordion Gallery</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="accordionGallery.usage"
    :source="accordionGallerySource"
    component-name="AccordionGallery"
    :props-table="props"
  >
    <template #preview>
      <div class="h-140 overflow-hidden demo-container">
        <AccordionGallery :key="key" :items="ITEMS" v-bind="accordionGalleryProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Accent Color" v-model="accentColor" />
        <PreviewColorPicker title="Overlay Color" v-model="overlayColor" />
        <PreviewColorPicker title="Text Color" v-model="textColor" />
        <PreviewSlider title="Default Index" :min="0" :max="ITEMS.length - 1" :step="1" v-model="defaultIndex" />
        <PreviewSwitch title="Grayscale" v-model="grayscale" />
        <PreviewSwitch title="Show Labels" v-model="showLabels" />
        <PreviewSelect title="Trigger" :options="['hover', 'click']" v-model="trigger" />
        <PreviewSelect
          title="Ease"
          :options="['power2.inOut', 'power3.out', 'power4.out', 'expo.out', 'back.out', 'sine.inOut']"
          v-model="ease"
        />
        <PreviewSlider title="Duration" :min="0.2" :max="1.2" :step="0.05" v-model="duration" valueUnit="s" />
        <PreviewSlider title="Parallax" :min="0" :max="1.5" :step="0.05" v-model="parallax" />
        <PreviewSlider title="Tilt" :min="0" :max="20" :step="1" v-model="tilt" valueUnit="°" />
        <PreviewSlider title="Stagger" :min="0" :max="0.15" :step="0.01" v-model="stagger" valueUnit="s" />
        <PreviewSelect title="Orientation" :options="['horizontal', 'vertical']" v-model="orientation" />
        <PreviewSlider title="Height" :min="320" :max="560" :step="10" v-model="height" valueUnit="px" />
        <PreviewSlider title="Expand Ratio" :min="0.3" :max="0.8" :step="0.02" v-model="expandRatio" />
        <PreviewSlider title="Gap" :min="0" :max="30" :step="1" v-model="gap" valueUnit="px" />
        <PreviewSlider title="Radius" :min="0" :max="40" :step="1" v-model="radius" valueUnit="px" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="accordion-gallery" :usage="accordionGallery.usage!" :source="accordionGallerySource" />
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
import { accordionGallery } from '@/constants/code/Components/accordionGalleryCode';
import AccordionGallery, {
  type Orientation,
  type Trigger
} from '@/content/Components/AccordionGallery/AccordionGallery.vue';
import accordionGallerySource from '@/content/Components/AccordionGallery/AccordionGallery.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  defaultIndex: 2,
  accentColor: '#ffffff',
  overlayColor: '#060010',
  textColor: '#ffffff',
  grayscale: true,
  showLabels: true,
  duration: 0.6,
  ease: 'power3.out',
  parallax: 0.5,
  tilt: 8,
  stagger: 0.06,
  trigger: 'hover' as Trigger,
  height: 460,
  gap: 10,
  radius: 16,
  expandRatio: 0.52,
  orientation: 'horizontal' as Orientation
};

const ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const defaultIndex = ref(DEFAULTS.defaultIndex);
const accentColor = ref(DEFAULTS.accentColor);
const overlayColor = ref(DEFAULTS.overlayColor);
const textColor = ref(DEFAULTS.textColor);
const grayscale = ref(DEFAULTS.grayscale);
const showLabels = ref(DEFAULTS.showLabels);
const duration = ref(DEFAULTS.duration);
const ease = ref(DEFAULTS.ease);
const parallax = ref(DEFAULTS.parallax);
const tilt = ref(DEFAULTS.tilt);
const stagger = ref(DEFAULTS.stagger);
const trigger = ref(DEFAULTS.trigger);
const height = ref(DEFAULTS.height);
const gap = ref(DEFAULTS.gap);
const radius = ref(DEFAULTS.radius);
const expandRatio = ref(DEFAULTS.expandRatio);
const orientation = ref(DEFAULTS.orientation);

const accordionGalleryProps = computed(() => ({
  defaultIndex: defaultIndex.value,
  accentColor: accentColor.value,
  overlayColor: overlayColor.value,
  textColor: textColor.value,
  grayscale: grayscale.value,
  showLabels: showLabels.value,
  duration: duration.value,
  ease: ease.value,
  parallax: parallax.value,
  tilt: tilt.value,
  stagger: stagger.value,
  trigger: trigger.value,
  height: height.value,
  gap: gap.value,
  radius: radius.value,
  expandRatio: expandRatio.value,
  orientation: orientation.value
}));

const hasChanges = computed(
  () =>
    defaultIndex.value !== DEFAULTS.defaultIndex ||
    accentColor.value !== DEFAULTS.accentColor ||
    overlayColor.value !== DEFAULTS.overlayColor ||
    textColor.value !== DEFAULTS.textColor ||
    grayscale.value !== DEFAULTS.grayscale ||
    showLabels.value !== DEFAULTS.showLabels ||
    duration.value !== DEFAULTS.duration ||
    ease.value !== DEFAULTS.ease ||
    parallax.value !== DEFAULTS.parallax ||
    tilt.value !== DEFAULTS.tilt ||
    stagger.value !== DEFAULTS.stagger ||
    trigger.value !== DEFAULTS.trigger ||
    height.value !== DEFAULTS.height ||
    gap.value !== DEFAULTS.gap ||
    radius.value !== DEFAULTS.radius ||
    expandRatio.value !== DEFAULTS.expandRatio ||
    orientation.value !== DEFAULTS.orientation
);

function reset() {
  defaultIndex.value = DEFAULTS.defaultIndex;
  accentColor.value = DEFAULTS.accentColor;
  overlayColor.value = DEFAULTS.overlayColor;
  textColor.value = DEFAULTS.textColor;
  grayscale.value = DEFAULTS.grayscale;
  showLabels.value = DEFAULTS.showLabels;
  duration.value = DEFAULTS.duration;
  ease.value = DEFAULTS.ease;
  parallax.value = DEFAULTS.parallax;
  tilt.value = DEFAULTS.tilt;
  stagger.value = DEFAULTS.stagger;
  trigger.value = DEFAULTS.trigger;
  height.value = DEFAULTS.height;
  gap.value = DEFAULTS.gap;
  radius.value = DEFAULTS.radius;
  expandRatio.value = DEFAULTS.expandRatio;
  orientation.value = DEFAULTS.orientation;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'items',
    type: 'Array<{ image: string; label?: string; link?: string; alt?: string }>',
    default: '5 sample panels',
    description: 'The panels to render. Each needs an image, and optionally a label, link and alt text.'
  },
  {
    name: 'defaultIndex',
    type: 'number',
    default: '2',
    description: 'Index of the panel that is expanded on load, so the gallery never looks dead.'
  },
  {
    name: 'accentColor',
    type: 'string',
    default: '"#ffffff"',
    description: 'Colour of the caption accent bar and the focus ring.'
  },
  {
    name: 'overlayColor',
    type: 'string',
    default: '"#060010"',
    description: 'Colour used for the bottom legibility gradient and the dimming of collapsed panels.'
  },
  {
    name: 'textColor',
    type: 'string',
    default: '"#ffffff"',
    description: 'Colour of the caption text.'
  },
  {
    name: 'grayscale',
    type: 'boolean',
    default: 'true',
    description: 'Desaturate collapsed panels and restore full colour on the expanded one.'
  },
  {
    name: 'showLabels',
    type: 'boolean',
    default: 'true',
    description: 'Whether captions reveal on the expanded panel.'
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.6',
    description: 'Duration of the expand / collapse transition in seconds.'
  },
  {
    name: 'ease',
    type: 'string',
    default: '"power3.out"',
    description: 'GSAP easing used for every transition.'
  },
  {
    name: 'parallax',
    type: 'number',
    default: '0.5',
    description: 'Strength of the internal image drift as panels resize (0 disables it).'
  },
  {
    name: 'tilt',
    type: 'number',
    default: '8',
    description: 'Degrees of 3D rotation applied to collapsed panels, easing to flat on the open one.'
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.06',
    description: 'Delay between the caption bar and text reveal, in seconds.'
  },
  {
    name: 'trigger',
    type: '"hover" | "click"',
    default: '"hover"',
    description: 'How a panel expands on pointer devices. Focus and tap always expand too.'
  },
  {
    name: 'height',
    type: 'number',
    default: '460',
    description: 'Height of the row in pixels (width of the column when vertical).'
  },
  {
    name: 'gap',
    type: 'number',
    default: '10',
    description: 'Gap between panels in pixels.'
  },
  {
    name: 'radius',
    type: 'number',
    default: '16',
    description: 'Corner radius of each panel in pixels.'
  },
  {
    name: 'expandRatio',
    type: 'number',
    default: '0.52',
    description: 'Fraction of the row the expanded panel occupies (0.2 – 0.9).'
  },
  {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Lay the accordion out as a row or a column.'
  }
];
</script>
