<template>
  <h1 class="sub-category">Scroll Expand</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="scrollExpand.usage"
    :source="scrollExpandSource"
    component-name="ScrollExpand"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <ScrollExpand v-bind="scrollExpandProps">
          <h2 className="font-bold text-[2rem] text-white leading-[1.1] tracking-[-0.02em]">Every pixel, everywhere</h2>
          <p className="mt-3 max-w-120 text-[rgba(255,255,255,0.72)] text-base">
            The frame opens up as you scroll and hands the whole stage to your media.
          </p>
        </ScrollExpand>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSelect
          title="Title"
          :options="[
            { label: 'Built to scale', value: 'Built to scale' },
            { label: 'See it bigger', value: 'See it bigger' },
            { label: 'None', value: '' }
          ]"
          v-model="title"
        />
        <PreviewSlider title="Start Width" :min="15" :max="90" :step="1" v-model="startWidth" valueUnit="%" />
        <PreviewSlider title="Start Height" :min="15" :max="90" :step="1" v-model="startHeight" valueUnit="%" />
        <PreviewSlider title="Start Radius" :min="0" :max="80" :step="1" v-model="startRadius" valueUnit="px" />
        <PreviewSlider title="End Radius" :min="0" :max="80" :step="1" v-model="endRadius" valueUnit="px" />
        <PreviewSlider title="Media Zoom" :min="1" :max="2" :step="0.01" v-model="mediaZoom" />
        <PreviewSlider title="Scroll Distance" :min="0.5" :max="3" :step="0.1" v-model="scrollDistance" />
        <PreviewSlider title="Hold Distance" :min="0" :max="1.5" :step="0.05" v-model="holdDistance" />
        <PreviewSlider title="Smoothing" :min="0" :max="0.4" :step="0.01" v-model="smoothing" valueUnit="s" />
        <PreviewSlider title="Overlay Scrim" :min="0" :max="1" :step="0.01" v-model="overlayScrim" />
        <PreviewSwitch title="Enabled" v-model="enabled" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="scroll-expand" :usage="scrollExpand.usage!" :source="scrollExpandSource" />
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
import { scrollExpand } from '@/constants/code/Animations/scrollExpandCode';
import ScrollExpand from '@/content/Animations/ScrollExpand/ScrollExpand.vue';
import scrollExpandSource from '@/content/Animations/ScrollExpand/ScrollExpand.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEMO_SRC = 'https://picsum.photos/seed/scroll-expand/1600/1000';

const DEFAULTS = {
  title: 'Built to scale',
  scrollHint: 'Scroll inside the frame',
  startWidth: 42,
  startHeight: 58,
  startRadius: 24,
  endRadius: 0,
  mediaZoom: 1.35,
  scrollDistance: 1.2,
  holdDistance: 0.35,
  smoothing: 0.1,
  overlayScrim: 0.45,
  enabled: true
};

const title = ref(DEFAULTS.title);
const scrollHint = ref(DEFAULTS.scrollHint);
const startWidth = ref(DEFAULTS.startWidth);
const startHeight = ref(DEFAULTS.startHeight);
const startRadius = ref(DEFAULTS.startRadius);
const endRadius = ref(DEFAULTS.endRadius);
const mediaZoom = ref(DEFAULTS.mediaZoom);
const scrollDistance = ref(DEFAULTS.scrollDistance);
const holdDistance = ref(DEFAULTS.holdDistance);
const smoothing = ref(DEFAULTS.smoothing);
const overlayScrim = ref(DEFAULTS.overlayScrim);
const enabled = ref(DEFAULTS.enabled);

const scrollExpandProps = computed(() => ({
  src: DEMO_SRC,
  title: title.value,
  scrollHint: scrollHint.value,
  startWidth: startWidth.value,
  startHeight: startHeight.value,
  startRadius: startRadius.value,
  endRadius: endRadius.value,
  mediaZoom: mediaZoom.value,
  scrollDistance: scrollDistance.value,
  holdDistance: holdDistance.value,
  smoothing: smoothing.value,
  overlayScrim: overlayScrim.value,
  enabled: enabled.value
}));

const hasChanges = computed(
  () =>
    title.value !== DEFAULTS.title ||
    scrollHint.value !== DEFAULTS.scrollHint ||
    startWidth.value !== DEFAULTS.startWidth ||
    startHeight.value !== DEFAULTS.startHeight ||
    startRadius.value !== DEFAULTS.startRadius ||
    endRadius.value !== DEFAULTS.endRadius ||
    mediaZoom.value !== DEFAULTS.mediaZoom ||
    scrollDistance.value !== DEFAULTS.scrollDistance ||
    holdDistance.value !== DEFAULTS.holdDistance ||
    smoothing.value !== DEFAULTS.smoothing ||
    overlayScrim.value !== DEFAULTS.overlayScrim ||
    enabled.value !== DEFAULTS.enabled
);

function reset() {
  title.value = DEFAULTS.title;
  scrollHint.value = DEFAULTS.scrollHint;
  startWidth.value = DEFAULTS.startWidth;
  startHeight.value = DEFAULTS.startHeight;
  startRadius.value = DEFAULTS.startRadius;
  endRadius.value = DEFAULTS.endRadius;
  mediaZoom.value = DEFAULTS.mediaZoom;
  scrollDistance.value = DEFAULTS.scrollDistance;
  holdDistance.value = DEFAULTS.holdDistance;
  smoothing.value = DEFAULTS.smoothing;
  overlayScrim.value = DEFAULTS.overlayScrim;
  enabled.value = DEFAULTS.enabled;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'src', type: 'string', default: "''", description: 'Image or video URL shown inside the frame.' },
  {
    name: 'mediaType',
    type: '"image" | "video"',
    default: '"image"',
    description: 'Whether the source is an image or a looping muted video.'
  },
  { name: 'poster', type: 'string', default: "''", description: 'Poster frame used while a video loads.' },
  { name: 'alt', type: 'string', default: "''", description: 'Alt text for the image.' },
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'Headline held over the frame that lifts away as the media takes over.'
  },
  {
    name: 'scrollHint',
    type: 'string',
    default: "''",
    description: 'Small cue shown under the resting frame that fades away as soon as the scroll begins.'
  },
  {
    name: 'startWidth',
    type: 'number',
    default: '42',
    description: 'Frame width before expanding, as a percentage of the stage.'
  },
  {
    name: 'startHeight',
    type: 'number',
    default: '58',
    description: 'Frame height before expanding, as a percentage of the stage.'
  },
  { name: 'startRadius', type: 'number', default: '24', description: 'Corner radius of the resting frame, in px.' },
  { name: 'endRadius', type: 'number', default: '0', description: 'Corner radius once fully expanded, in px.' },
  {
    name: 'mediaZoom',
    type: 'number',
    default: '1.35',
    description: 'How far the media is zoomed in at rest. It eases back to 1 as the frame opens up.'
  },
  {
    name: 'scrollDistance',
    type: 'number',
    default: '1.2',
    description: 'Scroll length of the expansion, in multiples of the stage height.'
  },
  {
    name: 'holdDistance',
    type: 'number',
    default: '0.35',
    description: 'Extra scroll the frame stays pinned at full bleed before releasing.'
  },
  {
    name: 'smoothing',
    type: 'number',
    default: '0.1',
    description: 'Follow time in seconds. 0 locks the frame exactly to the scrollbar.'
  },
  {
    name: 'overlayScrim',
    type: 'number',
    default: '0.45',
    description: 'Strength of the gradient scrim that fades in to keep overlay content readable.'
  },
  {
    name: 'useWindowScroll',
    type: 'boolean',
    default: 'false',
    description: 'Drive the expansion from the page scroll instead of the component’s own scroller.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Enable or disable the expansion.' },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Content that fades in over the media once it reaches full bleed.'
  },
  { name: 'className', type: 'string', default: "''", description: 'Additional class names for the container.' },
  { name: 'style', type: 'object', default: '—', description: 'Inline styles for the container.' }
];
</script>
