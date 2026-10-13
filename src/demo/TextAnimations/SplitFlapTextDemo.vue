<template>
  <h1 class="sub-category">Split Flap Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="splitFlapText.usage"
    :source="splitFlapTextSource"
    component-name="SplitFlapText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <SplitFlapText :key="key" v-bind="splitFlapTextProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSelect title="Phrase Set" :options="phraseOptions" v-model="phraseSet" />
        <PreviewSelect title="Charset" :options="charsetOptions" v-model="charset" />
        <PreviewColorPicker title="Tile Color" v-model="tileColor" />
        <PreviewColorPicker title="Text Color" v-model="textColor" />
        <PreviewSlider
          title="Flip Duration"
          :min="0.06"
          :max="0.24"
          :step="0.01"
          v-model="flipDuration"
          valueUnit="s"
        />
        <PreviewSlider title="Stagger" :min="0" :max="0.14" :step="0.01" v-model="stagger" valueUnit="s" />
        <PreviewSlider title="Cycle Delay" :min="900" :max="5000" :step="100" v-model="cycleDelay" valueUnit="ms" />
        <PreviewSlider title="Flips" :min="1" :max="14" :step="1" v-model="flipsPerChar" />
        <PreviewSlider title="Pad To" :min="8" :max="18" :step="1" v-model="padTo" />
        <PreviewSlider title="Font Size" :min="32" :max="76" :step="1" v-model="fontSize" valueUnit="px" />
        <PreviewSlider title="Tile Radius" :min="0" :max="18" :step="1" v-model="tileRadius" valueUnit="px" />
        <PreviewSlider title="Gap" :min="2" :max="14" :step="1" v-model="gap" valueUnit="px" />
        <PreviewSwitch title="Loop" v-model="loop" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="split-flap-text" :usage="splitFlapText.usage!" :source="splitFlapTextSource" />
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
import { splitFlapText } from '@/constants/code/TextAnimations/splitFlapTextCode';
import SplitFlapText from '@/content/TextAnimations/SplitFlapText/SplitFlapText.vue';
import splitFlapTextSource from '@/content/TextAnimations/SplitFlapText/SplitFlapText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const PHRASE_SETS = {
  launch: ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  travel: ['BOARDING NOW', 'FINAL CALL', 'GATE OPEN'],
  product: ['BUILD FASTER', 'SHIP CLEANER', 'DELIGHT USERS'],
  numeric: ['FLIGHT 204', 'GATE 18', 'SEAT 07A']
};

const DEFAULTS = {
  words: ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  flipDuration: 0.12,
  stagger: 0.06,
  cycleDelay: 2400,
  charset: 'alphanumeric',
  flipsPerChar: 8,
  tileColor: '#1b2711',
  textColor: '#f8fafc',
  tileRadius: 8,
  gap: 6,
  fontSize: 52,
  loop: true,
  padTo: 12
};

const phraseOptions = [
  { value: 'launch', label: 'Launch' },
  { value: 'travel', label: 'Travel' },
  { value: 'product', label: 'Product' },
  { value: 'numeric', label: 'Numeric' }
];

const charsetOptions = [
  { value: 'alphanumeric', label: 'A-Z + 0-9' },
  { value: 'alpha', label: 'A-Z' },
  { value: 'numeric', label: '0-9' },
  { value: 'ABCDEF0123456789•', label: 'Hex + dot' }
];

const words = ref(DEFAULTS.words);
const flipDuration = ref(DEFAULTS.flipDuration);
const stagger = ref(DEFAULTS.stagger);
const cycleDelay = ref(DEFAULTS.cycleDelay);
const charset = ref(DEFAULTS.charset);
const flipsPerChar = ref(DEFAULTS.flipsPerChar);
const tileColor = ref(DEFAULTS.tileColor);
const textColor = ref(DEFAULTS.textColor);
const tileRadius = ref(DEFAULTS.tileRadius);
const gap = ref(DEFAULTS.gap);
const fontSize = ref(DEFAULTS.fontSize);
const loop = ref(DEFAULTS.loop);
const padTo = ref(DEFAULTS.padTo);

const splitFlapTextProps = computed(() => ({
  words: words.value,
  flipDuration: flipDuration.value,
  stagger: stagger.value,
  cycleDelay: cycleDelay.value,
  charset: charset.value,
  flipsPerChar: flipsPerChar.value,
  tileColor: tileColor.value,
  textColor: textColor.value,
  tileRadius: tileRadius.value,
  gap: gap.value,
  fontSize: fontSize.value,
  loop: loop.value,
  padTo: padTo.value
}));

const hasChanges = computed(
  () =>
    words.value !== DEFAULTS.words ||
    flipDuration.value !== DEFAULTS.flipDuration ||
    stagger.value !== DEFAULTS.stagger ||
    cycleDelay.value !== DEFAULTS.cycleDelay ||
    charset.value !== DEFAULTS.charset ||
    flipsPerChar.value !== DEFAULTS.flipsPerChar ||
    tileColor.value !== DEFAULTS.tileColor ||
    textColor.value !== DEFAULTS.textColor ||
    tileRadius.value !== DEFAULTS.tileRadius ||
    gap.value !== DEFAULTS.gap ||
    fontSize.value !== DEFAULTS.fontSize ||
    loop.value !== DEFAULTS.loop ||
    padTo.value !== DEFAULTS.padTo
);

function reset() {
  words.value = DEFAULTS.words;
  flipDuration.value = DEFAULTS.flipDuration;
  stagger.value = DEFAULTS.stagger;
  cycleDelay.value = DEFAULTS.cycleDelay;
  charset.value = DEFAULTS.charset;
  flipsPerChar.value = DEFAULTS.flipsPerChar;
  tileColor.value = DEFAULTS.tileColor;
  textColor.value = DEFAULTS.textColor;
  tileRadius.value = DEFAULTS.tileRadius;
  gap.value = DEFAULTS.gap;
  fontSize.value = DEFAULTS.fontSize;
  loop.value = DEFAULTS.loop;
  padTo.value = DEFAULTS.padTo;
  forceRerender();
}

const phraseSet = computed({
  get: () => {
    return (
      Object.entries(PHRASE_SETS).find(([, phrases]) => phrases.join('\u001f') === words.value.join('\u001f'))?.[0] ||
      'launch'
    );
  },
  set: value => {
    words.value = [...PHRASE_SETS[value as keyof typeof PHRASE_SETS]];
  }
});

const props: PropRow[] = [
  {
    name: 'words',
    type: 'string[]',
    default: "['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']",
    description: 'Phrases to cycle through like a departure board.'
  },
  {
    name: 'text',
    type: 'string',
    default: 'undefined',
    description: 'Optional single phrase. When set, it takes precedence over words.'
  },
  {
    name: 'flipDuration',
    type: 'number',
    default: '0.12',
    description: 'Duration, in seconds, of each individual flap turn.'
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.06',
    description: 'Delay, in seconds, between each tile starting its cascade.'
  },
  {
    name: 'cycleDelay',
    type: 'number',
    default: '2400',
    description: 'Hold time, in milliseconds, before cycling to the next phrase.'
  },
  {
    name: 'charset',
    type: '"alpha" | "alphanumeric" | "numeric" | string',
    default: '"alphanumeric"',
    description: 'Characters used for the intermediate flip glyphs.'
  },
  {
    name: 'flipsPerChar',
    type: 'number',
    default: '8',
    description: 'Number of intermediate glyphs each changed tile flips through.'
  },
  {
    name: 'tileColor',
    type: 'string',
    default: '"#1b2711"',
    description: 'Base color of each mechanical tile.'
  },
  {
    name: 'textColor',
    type: 'string',
    default: '"#f8fafc"',
    description: 'Color of the glyphs on every flap.'
  },
  {
    name: 'tileRadius',
    type: 'number | string',
    default: '8',
    description: 'Corner radius for each tile.'
  },
  {
    name: 'gap',
    type: 'number | string',
    default: '6',
    description: 'Space between adjacent flap tiles.'
  },
  {
    name: 'fontSize',
    type: 'number | string',
    default: '52',
    description: 'Tile type size. Numeric values are treated as pixels.'
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'true',
    description: 'Whether the phrase array repeats after the final phrase.'
  },
  {
    name: 'padTo',
    type: 'number',
    default: '12',
    description: 'Fixed tile count used to keep the board width stable.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class name for custom styling.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Optional inline styles for the root element.'
  }
];
</script>
