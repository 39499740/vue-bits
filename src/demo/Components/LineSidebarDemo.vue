<template>
  <h1 class="sub-category">Line Sidebar</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="lineSidebar.usage"
    :source="lineSidebarSource"
    component-name="LineSidebar"
    :props-table="props"
  >
    <template #preview>
      <div class="relative flex justify-start! items-center py-12 pl-6 md:pl-12 h-125 overflow-hidden demo-container">
        <LineSidebar :key="key" :items="DEMO_ITEMS" v-bind="lineSidebarProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Accent" v-model="accentColor" />
        <PreviewColorPicker title="Text" v-model="textColor" />
        <PreviewColorPicker title="Marker" v-model="markerColor" />
        <PreviewSelect title="Falloff" :options="['linear', 'smooth', 'sharp']" v-model="falloff" />
        <PreviewSlider
          title="Proximity Radius"
          :min="40"
          :max="280"
          :step="5"
          v-model="proximityRadius"
          valueUnit="px"
        />
        <PreviewSlider title="Max Shift" :min="0" :max="60" :step="1" v-model="maxShift" valueUnit="px" />
        <PreviewSlider title="Marker Length" :min="20" :max="200" :step="5" v-model="markerLength" valueUnit="px" />
        <PreviewSlider title="Marker Gap" :min="0" :max="60" :step="1" v-model="markerGap" valueUnit="px" />
        <PreviewSlider title="Tick Scale" :min="0" :max="1" :step="0.02" v-model="tickScale" />
        <PreviewSlider title="Smoothing" :min="0" :max="800" :step="20" v-model="smoothing" valueUnit="ms" />
        <PreviewSwitch title="Show Index" v-model="showIndex" />
        <PreviewSwitch title="Show Marker" v-model="showMarker" />
        <PreviewSwitch title="Scale Ticks" v-model="scaleTick" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="line-sidebar" :usage="lineSidebar.usage!" :source="lineSidebarSource" />
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
import { lineSidebar } from '@/constants/code/Components/lineSidebarCode';
import LineSidebar, { type Falloff } from '@/content/Components/LineSidebar/LineSidebar.vue';
import lineSidebarSource from '@/content/Components/LineSidebar/LineSidebar.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  accentColor: '#27FF64',
  textColor: '#c4c4c4',
  markerColor: '#6c6c6c',
  showIndex: true,
  showMarker: true,
  proximityRadius: 100,
  maxShift: 30,
  falloff: 'smooth' as Falloff,
  markerLength: 60,
  markerGap: 0,
  tickScale: 0.5,
  scaleTick: true,
  itemGap: 20,
  fontSize: 1.1,
  smoothing: 100
};
const DEMO_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog'
];

const accentColor = ref(DEFAULTS.accentColor);
const textColor = ref(DEFAULTS.textColor);
const markerColor = ref(DEFAULTS.markerColor);
const showIndex = ref(DEFAULTS.showIndex);
const showMarker = ref(DEFAULTS.showMarker);
const proximityRadius = ref(DEFAULTS.proximityRadius);
const maxShift = ref(DEFAULTS.maxShift);
const falloff = ref<Falloff>(DEFAULTS.falloff);
const markerLength = ref(DEFAULTS.markerLength);
const markerGap = ref(DEFAULTS.markerGap);
const tickScale = ref(DEFAULTS.tickScale);
const scaleTick = ref(DEFAULTS.scaleTick);
const itemGap = ref(DEFAULTS.itemGap);
const fontSize = ref(DEFAULTS.fontSize);
const smoothing = ref(DEFAULTS.smoothing);

const lineSidebarProps = computed(() => ({
  accentColor: accentColor.value,
  textColor: textColor.value,
  markerColor: markerColor.value,
  showIndex: showIndex.value,
  showMarker: showMarker.value,
  proximityRadius: proximityRadius.value,
  maxShift: maxShift.value,
  falloff: falloff.value,
  markerLength: markerLength.value,
  markerGap: markerGap.value,
  tickScale: tickScale.value,
  scaleTick: scaleTick.value,
  itemGap: itemGap.value,
  fontSize: fontSize.value,
  smoothing: smoothing.value
}));

const hasChanges = computed(
  () =>
    accentColor.value !== DEFAULTS.accentColor ||
    textColor.value !== DEFAULTS.textColor ||
    markerColor.value !== DEFAULTS.markerColor ||
    showIndex.value !== DEFAULTS.showIndex ||
    showMarker.value !== DEFAULTS.showMarker ||
    proximityRadius.value !== DEFAULTS.proximityRadius ||
    maxShift.value !== DEFAULTS.maxShift ||
    falloff.value !== DEFAULTS.falloff ||
    markerLength.value !== DEFAULTS.markerLength ||
    markerGap.value !== DEFAULTS.markerGap ||
    tickScale.value !== DEFAULTS.tickScale ||
    scaleTick.value !== DEFAULTS.scaleTick ||
    itemGap.value !== DEFAULTS.itemGap ||
    fontSize.value !== DEFAULTS.fontSize ||
    smoothing.value !== DEFAULTS.smoothing
);

function reset() {
  textColor.value = DEFAULTS.textColor;
  markerColor.value = DEFAULTS.markerColor;
  showIndex.value = DEFAULTS.showIndex;
  showMarker.value = DEFAULTS.showMarker;
  proximityRadius.value = DEFAULTS.proximityRadius;
  maxShift.value = DEFAULTS.maxShift;
  falloff.value = DEFAULTS.falloff;
  markerLength.value = DEFAULTS.markerLength;
  markerGap.value = DEFAULTS.markerGap;
  tickScale.value = DEFAULTS.tickScale;
  scaleTick.value = DEFAULTS.scaleTick;
  itemGap.value = DEFAULTS.itemGap;
  fontSize.value = DEFAULTS.fontSize;
  smoothing.value = DEFAULTS.smoothing;
  forceRerender();
}

const props: PropRow[] = [
  { name: 'items', type: 'string[]', default: '[...]', description: 'Labels rendered as the list of sidebar entries.' },
  {
    name: 'accentColor',
    type: 'string',
    default: '"#27FF64"',
    description: 'Color items and markers shift toward as the cursor gets close.'
  },
  { name: 'textColor', type: 'string', default: '"#c4c4c4"', description: 'Resting color of the item labels.' },
  {
    name: 'markerColor',
    type: 'string',
    default: '"#6c6c6c"',
    description: 'Resting color of the leading marker lines.'
  },
  { name: 'showIndex', type: 'boolean', default: 'true', description: 'Show the zero-padded index before each label.' },
  {
    name: 'showMarker',
    type: 'boolean',
    default: 'true',
    description: 'Show the marker lines (and short ticks) beside each item.'
  },
  {
    name: 'proximityRadius',
    type: 'number',
    default: '100',
    description: 'Vertical distance in pixels within which the cursor influences an item.'
  },
  {
    name: 'maxShift',
    type: 'number',
    default: '30',
    description: 'Maximum horizontal shift in pixels the label slides at full proximity.'
  },
  {
    name: 'falloff',
    type: '"linear" | "smooth" | "sharp"',
    default: '"smooth"',
    description: 'Curve mapping cursor distance to the proximity effect.'
  },
  {
    name: 'markerLength',
    type: 'number',
    default: '60',
    description: 'Length in pixels of the marker line; the in-between ticks scale from this too.'
  },
  { name: 'markerGap', type: 'number', default: '0', description: 'Gap in pixels between the labels and the markers.' },
  {
    name: 'tickScale',
    type: 'number',
    default: '0.5',
    description: 'Length of the in-between ticks as a fraction of markerLength.'
  },
  {
    name: 'scaleTick',
    type: 'boolean',
    default: 'true',
    description: 'When true, the in-between ticks also grow with cursor proximity.'
  },
  { name: 'itemGap', type: 'number', default: '20', description: 'Vertical gap between items in pixels.' },
  { name: 'fontSize', type: 'number', default: '1.1', description: 'Font size of the labels in rem.' },
  {
    name: 'smoothing',
    type: 'number',
    default: '100',
    description: 'Transition duration in milliseconds for the proximity response.'
  },
  {
    name: 'defaultActive',
    type: 'number | null',
    default: 'null',
    description: 'Index of the item selected on mount.'
  },
  {
    name: 'onItemClick',
    type: '(index, label) => void',
    default: '-',
    description: 'Called when an item is clicked; the clicked item also becomes active.'
  },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the outer wrapper.' }
];
</script>
