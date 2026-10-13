<template>
  <h1 class="sub-category">Fold Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="foldText.usage"
    :source="foldTextSource"
    component-name="FoldText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <FoldText :key="key" v-bind="foldTextProps" />
        <RefreshButton @click="forceRerender" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" v-model="text" placeholder="Enter heading text" :maxlength="34" />
        <PreviewSelect title="Split By" :options="SPLIT_OPTIONS" v-model="splitBy" />
        <PreviewSelect title="Hinge" :options="HINGE_OPTIONS" v-model="hinge" />
        <PreviewSelect title="Trigger" :options="TRIGGER_OPTIONS" v-model="trigger" />
        <PreviewSelect title="Ease" :options="EASE_OPTIONS" v-model="ease" :width="140" />
        <PreviewColorPicker title="Text Color" :v-model="color" />
        <PreviewSlider title="Duration" :min="0.35" :max="1.2" :step="0.05" v-model="duration" valueUnit="s" />
        <PreviewSlider title="Stagger" :min="0.03" :max="0.08" :step="0.005" v-model="stagger" valueUnit="s" />
        <PreviewSlider title="Perspective" :min="350" :max="1200" :step="25" v-model="perspective" valueUnit="px" />
        <PreviewSlider title="Crease Shading" :min="0" :max="1" :step="0.05" v-model="creaseShading" />
        <PreviewSlider title="Font Size" :min="44" :max="112" :step="2" v-model="fontSize" valueUnit="px" />
        <PreviewSlider title="Font Weight" :min="300" :max="900" :step="50" v-model="fontWeight" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="fold-text" :usage="foldText.usage!" :source="foldTextSource" />
    </template>
  </TabsLayout>
</template>

<script setup lang="ts">
import Customize from '@/components/common/Customize.vue';
import DemoCodeTab from '@/components/common/DemoCodeTab.vue';
import PreviewColorPicker from '@/components/common/PreviewColorPicker.vue';
import PreviewInput from '@/components/common/PreviewInput.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import RefreshButton from '@/components/common/RefreshButton.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { foldText } from '@/constants/code/TextAnimations/foldTextCode';
import FoldText, { type Hinge, type SplitBy, type Trigger } from '@/content/TextAnimations/FoldText/FoldText.vue';
import foldTextSource from '@/content/TextAnimations/FoldText/FoldText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Design unfolds',
  splitBy: 'char' as SplitBy,
  hinge: 'top' as Hinge,
  duration: 0.65,
  stagger: 0.045,
  ease: 'power3.out',
  perspective: 700,
  creaseShading: 0.55,
  trigger: 'mount' as Trigger,
  fontSize: 80,
  fontWeight: 800,
  color: '#f7f2e8'
};

const SPLIT_OPTIONS = [
  { value: 'char', label: 'Character' },
  { value: 'word', label: 'Word' },
  { value: 'line', label: 'Line' }
];

const HINGE_OPTIONS = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
];

const TRIGGER_OPTIONS = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'loop', label: 'Loop' }
];

const EASE_OPTIONS = [
  { value: 'power3.out', label: 'Power out' },
  { value: 'expo.out', label: 'Expo out' },
  { value: 'back.out(1.2)', label: 'Soft back' },
  { value: 'circ.out', label: 'Circular' }
];

const text = ref(DEFAULTS.text);
const splitBy = ref(DEFAULTS.splitBy);
const hinge = ref(DEFAULTS.hinge);
const duration = ref(DEFAULTS.duration);
const stagger = ref(DEFAULTS.stagger);
const ease = ref(DEFAULTS.ease);
const perspective = ref(DEFAULTS.perspective);
const creaseShading = ref(DEFAULTS.creaseShading);
const trigger = ref(DEFAULTS.trigger);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const color = ref(DEFAULTS.color);

const foldTextProps = computed(() => ({
  text: text.value,
  splitBy: splitBy.value,
  hinge: hinge.value,
  duration: duration.value,
  stagger: stagger.value,
  ease: ease.value,
  perspective: perspective.value,
  creaseShading: creaseShading.value,
  trigger: trigger.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  color: color.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    splitBy.value !== DEFAULTS.splitBy ||
    hinge.value !== DEFAULTS.hinge ||
    duration.value !== DEFAULTS.duration ||
    stagger.value !== DEFAULTS.stagger ||
    ease.value !== DEFAULTS.ease ||
    perspective.value !== DEFAULTS.perspective ||
    creaseShading.value !== DEFAULTS.creaseShading ||
    trigger.value !== DEFAULTS.trigger ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    color.value !== DEFAULTS.color
);

function reset() {
  text.value = DEFAULTS.text;
  splitBy.value = DEFAULTS.splitBy;
  hinge.value = DEFAULTS.hinge;
  duration.value = DEFAULTS.duration;
  stagger.value = DEFAULTS.stagger;
  ease.value = DEFAULTS.ease;
  perspective.value = DEFAULTS.perspective;
  creaseShading.value = DEFAULTS.creaseShading;
  trigger.value = DEFAULTS.trigger;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  color.value = DEFAULTS.color;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Design unfolds"',
    description: 'The text content to split and fold into place.'
  },
  {
    name: 'splitBy',
    type: '"char" | "word" | "line"',
    default: '"char"',
    description: 'Controls whether each character, word, or explicit line folds as a panel.'
  },
  {
    name: 'hinge',
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: 'The edge that acts as the 3D fold hinge.'
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.65',
    description: 'Duration in seconds for each panel to unfold.'
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.045',
    description: 'Delay in seconds between panels; 0.03-0.08 keeps the cascade crisp.'
  },
  {
    name: 'ease',
    type: 'string',
    default: '"power3.out"',
    description: 'GSAP easing curve used by the unfold timeline.'
  },
  {
    name: 'perspective',
    type: 'number',
    default: '700',
    description: 'Perspective distance applied to each panel parent.'
  },
  {
    name: 'creaseShading',
    type: 'number',
    default: '0.55',
    description: 'Strength of the gradient shade while panels are folded.'
  },
  {
    name: 'trigger',
    type: '"mount" | "hover" | "scroll" | "loop"',
    default: '"mount"',
    description: 'Determines when the unfold animation starts.'
  },
  {
    name: 'fontSize',
    type: 'string | number',
    default: '80',
    description: 'Font size applied to the root text.'
  },
  {
    name: 'fontWeight',
    type: 'string | number',
    default: '800',
    description: 'Font weight applied to the root text.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#f7f2e8"',
    description: 'Text color of the folded panels.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Adds custom classes to the root element.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Inline style overrides for the root element.'
  }
];
</script>
