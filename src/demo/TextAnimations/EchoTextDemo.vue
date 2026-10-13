<template>
  <h1 class="sub-category">Echo Text</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="echoText.usage"
    :source="echoTextSource"
    component-name="EchoText"
    :props-table="props"
  >
    <template #preview>
      <div class="relative h-140 overflow-hidden demo-container">
        <EchoText :key="key" v-bind="echoTextProps" />
        <RefreshButton @click="forceRerender" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewInput title="Text" v-model="text" :maxlength="24" />
        <PreviewColorPicker title="Text Color" v-model="color" />
        <PreviewColorPicker title="Echo Tint" v-model="tint" />
        <PreviewSwitch title="Tint Echoes" :isChecked="!!tint" />
        <PreviewSelect title="Mode" :options="MODE_OPTIONS" v-model="mode" />
        <PreviewSlider
          title="Cursor Radius"
          :min="80"
          :max="900"
          :step="10"
          v-model="cursorRadius"
          valueUnit="px"
          :isDisabled="!mode"
        />
        <PreviewSelect title="Direction" :options="DIRECTION_OPTIONS" v-model="direction" />
        <PreviewSelect title="Ease" :options="EASE_OPTIONS" v-model="ease" />
        <PreviewSelect title="Size" :options="FONT_SIZE_OPTIONS" v-model="fontSize" />
        <PreviewSlider title="Echoes" :min="2" :max="18" :step="1" v-model="echoes" />
        <PreviewSlider title="Lag" :min="0.05" :max="0.3" :step="0.01" v-model="lag" />
        <PreviewSlider title="Offset" :min="8" :max="56" :step="1" v-model="offset" valueUnit="px" />
        <PreviewSlider title="Fade" :min="0.35" :max="0.85" :step="0.01" v-model="fade" />
        <PreviewSlider title="Blur" :min="0" :max="7" :step="0.25" v-model="blur" valueUnit="px" />
        <PreviewSlider title="Duration" :min="300" :max="1600" :step="50" v-model="duration" valueUnit="ms" />
        <PreviewSlider title="Weight" :min="500" :max="950" :step="50" v-model="fontWeight" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="echo-text" :usage="echoText.usage!" :source="echoTextSource" />
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
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PropTable, { type PropRow } from '@/components/common/PropTable.vue';
import RefreshButton from '@/components/common/RefreshButton.vue';
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { echoText } from '@/constants/code/TextAnimations/echoTextCode';
import EchoText, { type Direction, type Ease, type Mode } from '@/content/TextAnimations/EchoText/EchoText.vue';
import echoTextSource from '@/content/TextAnimations/EchoText/EchoText.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  text: 'Motion Echo',
  echoes: 12,
  lag: 0.24,
  offset: 36,
  direction: 'right' as Direction,
  fade: 0.72,
  blur: 3,
  tint: '#7dd3fc',
  mode: 'both' as Mode,
  cursorRadius: 320,
  duration: 900,
  ease: 'ease-out' as Ease,
  fontSize: 'clamp(3rem, 9vw, 7rem)',
  fontWeight: 800,
  color: '#f8fafc'
};

const DIRECTION_OPTIONS = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'up', label: 'Up' },
  { value: 'down', label: 'Down' },
  { value: 'diagonal', label: 'Diagonal' }
];

const MODE_OPTIONS = [
  { value: 'both', label: 'Entrance + Pointer' },
  { value: 'entrance', label: 'Entrance Only' },
  { value: 'pointer', label: 'Pointer Only' }
];

const EASE_OPTIONS = [
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'snappy', label: 'Snappy' },
  { value: 'linear', label: 'Linear' }
];

const FONT_SIZE_OPTIONS = [
  { value: 'clamp(2.5rem, 7vw, 5.5rem)', label: 'Compact' },
  { value: 'clamp(3rem, 9vw, 7rem)', label: 'Hero' },
  { value: 'clamp(4rem, 12vw, 9rem)', label: 'Billboard' }
];

const text = ref(DEFAULTS.text);
const echoes = ref(DEFAULTS.echoes);
const lag = ref(DEFAULTS.lag);
const offset = ref(DEFAULTS.offset);
const direction = ref(DEFAULTS.direction);
const fade = ref(DEFAULTS.fade);
const blur = ref(DEFAULTS.blur);
const tint = ref(DEFAULTS.tint);
const mode = ref(DEFAULTS.mode);
const cursorRadius = ref(DEFAULTS.cursorRadius);
const duration = ref(DEFAULTS.duration);
const ease = ref(DEFAULTS.ease);
const fontSize = ref(DEFAULTS.fontSize);
const fontWeight = ref(DEFAULTS.fontWeight);
const color = ref(DEFAULTS.color);

const echoTextProps = computed(() => ({
  text: text.value,
  echoes: echoes.value,
  lag: lag.value,
  offset: offset.value,
  direction: direction.value,
  fade: fade.value,
  blur: blur.value,
  tint: tint.value,
  mode: mode.value,
  cursorRadius: cursorRadius.value,
  duration: duration.value,
  ease: ease.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  color: color.value
}));

const hasChanges = computed(
  () =>
    text.value !== DEFAULTS.text ||
    echoes.value !== DEFAULTS.echoes ||
    lag.value !== DEFAULTS.lag ||
    offset.value !== DEFAULTS.offset ||
    direction.value !== DEFAULTS.direction ||
    fade.value !== DEFAULTS.fade ||
    blur.value !== DEFAULTS.blur ||
    tint.value !== DEFAULTS.tint ||
    mode.value !== DEFAULTS.mode ||
    cursorRadius.value !== DEFAULTS.cursorRadius ||
    duration.value !== DEFAULTS.duration ||
    ease.value !== DEFAULTS.ease ||
    fontSize.value !== DEFAULTS.fontSize ||
    fontWeight.value !== DEFAULTS.fontWeight ||
    color.value !== DEFAULTS.color
);

function reset() {
  text.value = DEFAULTS.text;
  echoes.value = DEFAULTS.echoes;
  lag.value = DEFAULTS.lag;
  offset.value = DEFAULTS.offset;
  direction.value = DEFAULTS.direction;
  fade.value = DEFAULTS.fade;
  blur.value = DEFAULTS.blur;
  tint.value = DEFAULTS.tint;
  mode.value = DEFAULTS.mode;
  cursorRadius.value = DEFAULTS.cursorRadius;
  duration.value = DEFAULTS.duration;
  ease.value = DEFAULTS.ease;
  fontSize.value = DEFAULTS.fontSize;
  fontWeight.value = DEFAULTS.fontWeight;
  color.value = DEFAULTS.color;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    default: '"Motion Echo"',
    description: 'Text rendered by the crisp front copy and every echo layer.'
  },
  {
    name: 'echoes',
    type: 'number',
    default: '12',
    description: 'Number of ghost copies behind the front text.'
  },
  {
    name: 'lag',
    type: 'number',
    default: '0.24',
    description: 'How slowly deeper echoes chase the current target.'
  },
  {
    name: 'offset',
    type: 'number',
    default: '36',
    description: 'Pixel travel used by the entrance spread and pointer response.'
  },
  {
    name: 'direction',
    type: '"right" | "left" | "up" | "down" | "diagonal"',
    default: '"right"',
    description: 'Direction the entrance trail collapses from.'
  },
  {
    name: 'fade',
    type: 'number',
    default: '0.72',
    description: 'Opacity falloff applied from one echo to the next.'
  },
  {
    name: 'blur',
    type: 'number',
    default: '3',
    description: 'Maximum blur in pixels on the deepest echo.'
  },
  {
    name: 'tint',
    type: 'string | false',
    default: '"#7dd3fc"',
    description: 'Optional chromatic tint blended into the echo layers.'
  },
  {
    name: 'mode',
    type: '"entrance" | "pointer" | "both"',
    default: '"both"',
    description: 'Whether to run the entrance, pointer smear, or both.'
  },
  {
    name: 'cursorRadius',
    type: 'number',
    default: '320',
    description:
      'Distance in pixels over which the cursor pulls the text to full offset. Larger values react from further away and arrive later.'
  },
  {
    name: 'duration',
    type: 'number',
    default: '900',
    description: 'Entrance convergence duration in milliseconds.'
  },
  {
    name: 'ease',
    type: '"linear" | "ease-out" | "ease-in-out" | "snappy"',
    default: '"ease-out"',
    description: 'Timing curve used for the entrance convergence.'
  },
  {
    name: 'fontSize',
    type: 'string | number',
    default: '"clamp(3rem, 9vw, 7rem)"',
    description: 'Font size applied to the text stack.'
  },
  {
    name: 'fontWeight',
    type: 'string | number',
    default: '800',
    description: 'Font weight applied to all copies.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#f8fafc"',
    description: 'Color of the crisp front copy.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional class names for the root element.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Optional inline styles for the root element.'
  }
];
</script>
