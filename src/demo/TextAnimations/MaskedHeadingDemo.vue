<template>
  <h1 class="sub-category">Masked Heading</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="maskedHeading.usage"
    :source="maskedHeadingSource"
    component-name="MaskedHeading"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <MaskedHeading
          :key="replayKey"
          :src="mediaType === 'video' ? DEMO_VIDEO : DEMO_IMAGE"
          v-bind="maskedHeadingProps"
        />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSelect
          title="Text"
          :options="[
            { label: 'Details', value: 'Designed in the details' },
            { label: 'Web', value: 'Made for the web' },
            { label: 'Location', value: 'Shot on location' }
          ]"
          v-model="text"
        />
        <PreviewSelect
          title="Media"
          :options="[
            { label: 'Video', value: 'video' },
            { label: 'Image', value: 'image' }
          ]"
          v-model="mediaType"
        />
        <PreviewSelect
          title="Reveal"
          :options="[
            { label: 'Rise', value: 'rise' },
            { label: 'Wipe', value: 'wipe' },
            { label: 'Fade', value: 'fade' },
            { label: 'None', value: 'none' }
          ]"
          v-model="reveal"
        />
        <PreviewSelect
          title="Trigger"
          :options="[
            { label: 'In View', value: 'view' },
            { label: 'On Mount', value: 'mount' },
            { label: 'On Hover', value: 'hover' }
          ]"
          v-model="trigger"
        />
        <PreviewSelect
          title="Align"
          :options="[
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' }
          ]"
          v-model="align"
        />
        <PreviewSlider title="Fill Scale" :min="1" :max="2" :step="0.05" v-model="fillScale" />
        <PreviewSlider title="Parallax" :min="0" :max="80" :step="1" v-model="parallax" valueUnit="px" />
        <PreviewSlider title="Drift" :min="0" :max="60" :step="1" v-model="drift" valueUnit="px" />
        <PreviewSlider title="Brightness" :min="0.4" :max="2" :step="0.05" v-model="brightness" />
        <PreviewSlider title="Saturation" :min="0" :max="2" :step="0.05" v-model="saturation" />
        <PreviewSlider title="Duration" :min="0.3" :max="2.4" :step="0.05" v-model="duration" valueUnit="s" />
        <PreviewSlider title="Stagger" :min="0" :max="0.3" :step="0.01" v-model="stagger" valueUnit="s" />
        <PreviewSlider title="Text Size" :min="0.05" :max="0.15" :step="0.005" v-model="textScale" />
        <PreviewSlider title="Weight" :min="300" :max="900" :step="100" v-model="weight" />
        <PreviewSlider title="Tracking" :min="-0.08" :max="0.06" :step="0.005" v-model="tracking" valueUnit="em" />
        <PreviewSlider title="Line Height" :min="0.85" :max="1.6" :step="0.02" v-model="lineHeight" />
        <PreviewSwitch title="Grayscale" v-model="grayscale" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="masked-heading" :usage="maskedHeading.usage!" :source="maskedHeadingSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { maskedHeading } from '@/constants/code/TextAnimations/maskedHeadingCode';
import MaskedHeading, { type Reveal, type Trigger } from '@/content/TextAnimations/MaskedHeading/MaskedHeading.vue';
import maskedHeadingSource from '@/content/TextAnimations/MaskedHeading/MaskedHeading.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?q=80&w=1600&auto=format&fit=crop';
const DEMO_VIDEO = '/assets/videos/masked-heading.mp4';

const DEFAULTS = {
  text: 'Designed in the details',
  mediaType: 'video' as 'image' | 'video',
  fillScale: 1.25,
  parallax: 26,
  drift: 18,
  brightness: 1,
  saturation: 1,
  grayscale: false,
  reveal: 'rise' as Reveal,
  trigger: 'view' as Trigger,
  duration: 1.1,
  stagger: 0.09,
  align: 'center' as 'left' | 'center' | 'right',
  weight: 700,
  tracking: -0.03,
  lineHeight: 1.06,
  textScale: 0.115
};

const text = ref(DEFAULTS.text);
const mediaType = ref(DEFAULTS.mediaType);
const fillScale = ref(DEFAULTS.fillScale);
const parallax = ref(DEFAULTS.parallax);
const drift = ref(DEFAULTS.drift);
const brightness = ref(DEFAULTS.brightness);
const saturation = ref(DEFAULTS.saturation);
const grayscale = ref(DEFAULTS.grayscale);
const reveal = ref(DEFAULTS.reveal);
const trigger = ref(DEFAULTS.trigger);
const duration = ref(DEFAULTS.duration);
const stagger = ref(DEFAULTS.stagger);
const align = ref(DEFAULTS.align);
const weight = ref(DEFAULTS.weight);
const tracking = ref(DEFAULTS.tracking);
const lineHeight = ref(DEFAULTS.lineHeight);
const textScale = ref(DEFAULTS.textScale);

const maskedHeadingProps = computed(() => ({
  text: text.value,
  mediaType: mediaType.value,
  fillScale: fillScale.value,
  parallax: parallax.value,
  drift: drift.value,
  brightness: brightness.value,
  saturation: saturation.value,
  grayscale: grayscale.value,
  reveal: reveal.value,
  trigger: trigger.value,
  duration: duration.value,
  stagger: stagger.value,
  align: align.value,
  weight: weight.value,
  tracking: tracking.value,
  lineHeight: lineHeight.value,
  textScale: textScale.value
}));

const replayKey = computed(
  () => `${text.value}-${mediaType.value}-${reveal.value}-${trigger.value}-${duration.value}-${stagger.value}`
);

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    mediaType.value !== DEFAULTS.mediaType ||
    fillScale.value !== DEFAULTS.fillScale ||
    parallax.value !== DEFAULTS.parallax ||
    drift.value !== DEFAULTS.drift ||
    brightness.value !== DEFAULTS.brightness ||
    saturation.value !== DEFAULTS.saturation ||
    grayscale.value !== DEFAULTS.grayscale ||
    reveal.value !== DEFAULTS.reveal ||
    trigger.value !== DEFAULTS.trigger ||
    duration.value !== DEFAULTS.duration ||
    stagger.value !== DEFAULTS.stagger ||
    align.value !== DEFAULTS.align ||
    weight.value !== DEFAULTS.weight ||
    tracking.value !== DEFAULTS.tracking ||
    lineHeight.value !== DEFAULTS.lineHeight ||
    textScale.value !== DEFAULTS.textScale
);

function reset() {
  text.value = DEFAULTS.text;
  mediaType.value = DEFAULTS.mediaType;
  fillScale.value = DEFAULTS.fillScale;
  parallax.value = DEFAULTS.parallax;
  drift.value = DEFAULTS.drift;
  brightness.value = DEFAULTS.brightness;
  saturation.value = DEFAULTS.saturation;
  grayscale.value = DEFAULTS.grayscale;
  reveal.value = DEFAULTS.reveal;
  trigger.value = DEFAULTS.trigger;
  duration.value = DEFAULTS.duration;
  stagger.value = DEFAULTS.stagger;
  align.value = DEFAULTS.align;
  weight.value = DEFAULTS.weight;
  tracking.value = DEFAULTS.tracking;
  lineHeight.value = DEFAULTS.lineHeight;
  textScale.value = DEFAULTS.textScale;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'text', type: 'string', default: "'Designed in the details'", description: 'Heading copy.' },
  {
    name: 'tag',
    type: 'string',
    default: "'h2'",
    description: 'Element the heading renders as, so it can carry the right semantics.'
  },
  {
    name: 'mediaType',
    type: '"image" | "video"',
    default: '"image"',
    description: 'Whether the source showing through the letters is an image or a looping muted video.'
  },
  { name: 'src', type: 'string', default: "''", description: 'Image or video URL.' },
  { name: 'poster', type: 'string', default: "''", description: 'Poster frame used while a video loads.' },
  {
    name: 'fillScale',
    type: 'number',
    default: '1.25',
    description: 'How far the media is zoomed past the heading. The overscan is what parallax travels into.'
  },
  {
    name: 'parallax',
    type: 'number',
    default: '26',
    description: 'How far the media slides under the letters as the pointer moves, in px.'
  },
  {
    name: 'drift',
    type: 'number',
    default: '18',
    description: 'Amplitude of the slow idle motion, in px. 0 holds the media still.'
  },
  { name: 'brightness', type: 'number', default: '1', description: 'Brightness of the media.' },
  { name: 'saturation', type: 'number', default: '1', description: 'Saturation of the media.' },
  { name: 'grayscale', type: 'boolean', default: 'false', description: 'Render the media in black and white.' },
  {
    name: 'reveal',
    type: '"rise" | "wipe" | "fade" | "none"',
    default: '"rise"',
    description: 'Entrance style: words rise into place, a wipe sweeps across, or the whole block fades up.'
  },
  {
    name: 'trigger',
    type: '"view" | "mount" | "hover"',
    default: '"view"',
    description: 'When the entrance runs.'
  },
  { name: 'duration', type: 'number', default: '1.1', description: 'Entrance duration, in seconds.' },
  {
    name: 'stagger',
    type: 'number',
    default: '0.09',
    description: 'Delay between words, in seconds. Used by the rise reveal.'
  },
  { name: 'align', type: '"left" | "center" | "right"', default: '"center"', description: 'Text alignment.' },
  { name: 'weight', type: 'number', default: '700', description: 'Font weight.' },
  { name: 'tracking', type: 'number', default: '-0.03', description: 'Letter spacing, in em.' },
  { name: 'lineHeight', type: 'number', default: '1.06', description: 'Line height.' },
  {
    name: 'textScale',
    type: 'number',
    default: '0.115',
    description: 'Type size as a fraction of the container width, so the heading stays responsive.'
  },
  { name: 'className', type: 'string', default: "''", description: 'Additional class names.' },
  { name: 'style', type: 'object', default: '—', description: 'Inline styles for the heading.' }
];
</script>
