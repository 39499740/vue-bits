<template>
  <h1 class="sub-category">Curved Input</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="curvedInput.usage"
    :source="curvedInputSource"
    component-name="CurvedInput"
    :props-table="props"
  >
    <template #preview>
      <div class="h-125 overflow-hidden demo-container">
        <CurvedInput
          :key="key"
          placeholder="david@reactbits.dev"
          v-bind="curvedInputProps"
          @submit="value => console.log('Submitted:', value)"
        />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSelect title="Theme" :options="['dark', 'light']" v-model="theme" />
        <PreviewColorPicker title="Background" v-model="backgroundColor" />
        <PreviewColorPicker title="Text" v-model="textColor" />
        <PreviewColorPicker title="Border" v-model="borderColor" />
        <PreviewColorPicker title="Button" v-model="buttonColor" />
        <PreviewColorPicker title="Button Text" v-model="buttonTextColor" />
        <PreviewInput title="Button Label" v-model="buttonText" :maxlength="24" />
        <PreviewSelect title="Shadow" :options="SHADOW_OPTIONS" v-model="shadowSize" />
        <PreviewSlider title="Width" :min="340" :max="720" :step="10" v-model="width" valueUnit="px" />
        <PreviewSlider title="Bend" :min="-60" :max="60" :step="1" v-model="bend" valueUnit="px" />
        <PreviewSlider title="Height" :min="48" :max="96" :step="1" v-model="height" valueUnit="px" />
        <PreviewSlider title="Corner Radius" :min="0" :max="36" :step="1" v-model="cornerRadius" valueUnit="px" />
        <PreviewSlider title="Border Width" :min="0" :max="4" :step="0.5" v-model="borderWidth" valueUnit="px" />
        <PreviewSlider title="Font Size" :min="13" :max="22" :step="1" v-model="fontSize" valueUnit="px" />
        <PreviewSwitch title="Show Button" v-model="showButton" />
        <PreviewSwitch title="Show Icon" v-model="showIcon" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="curved-input" :usage="curvedInput.usage!" :source="curvedInputSource" />
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
import TabsLayout from '@/components/common/TabsLayout.vue';
import { useForceRerender } from '@/composables/useForceRerender';
import { curvedInput } from '@/constants/code/Components/curvedInputCode';
import CurvedInput, { type ShadowSize, type Theme } from '@/content/Components/CurvedInput/CurvedInput.vue';
import curvedInputSource from '@/content/Components/CurvedInput/CurvedInput.vue?raw';
import { computed, ref, watch } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  theme: 'dark' as Theme,
  width: 450,
  bend: 28,
  height: 64,
  cornerRadius: 18,
  borderWidth: 1.5,
  fontSize: 16,
  backgroundColor: '#070F07',
  textColor: '#f5f5f5',
  borderColor: '#2e4e34',
  buttonColor: '#10B981',
  buttonTextColor: '#ffffff',
  buttonText: 'Get Started',
  shadowSize: 'md' as ShadowSize,
  showButton: true,
  showIcon: true
};

const THEME_COLORS = {
  dark: {
    backgroundColor: '#070F07',
    textColor: '#f5f5f5',
    borderColor: '#2e4e34',
    buttonColor: '#10B981',
    buttonTextColor: '#ffffff'
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#1f501d',
    borderColor: '#2e5626',
    buttonColor: '#47eb48',
    buttonTextColor: '#000000'
  }
};

const SHADOW_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Soft' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Heavy' }
];

const theme = ref(DEFAULTS.theme);
const width = ref(DEFAULTS.width);
const bend = ref(DEFAULTS.bend);
const height = ref(DEFAULTS.height);
const cornerRadius = ref(DEFAULTS.cornerRadius);
const borderWidth = ref(DEFAULTS.borderWidth);
const fontSize = ref(DEFAULTS.fontSize);
const backgroundColor = ref(DEFAULTS.backgroundColor);
const textColor = ref(DEFAULTS.textColor);
const borderColor = ref(DEFAULTS.borderColor);
const buttonColor = ref(DEFAULTS.buttonColor);
const buttonTextColor = ref(DEFAULTS.buttonTextColor);
const buttonText = ref(DEFAULTS.buttonText);
const shadowSize = ref(DEFAULTS.shadowSize);
const showButton = ref(DEFAULTS.showButton);
const showIcon = ref(DEFAULTS.showIcon);

const curvedInputProps = computed(() => ({
  theme: theme.value,
  width: width.value,
  bend: bend.value,
  height: height.value,
  cornerRadius: cornerRadius.value,
  borderWidth: borderWidth.value,
  fontSize: fontSize.value,
  backgroundColor: backgroundColor.value,
  textColor: textColor.value,
  borderColor: borderColor.value,
  buttonColor: buttonColor.value,
  buttonTextColor: buttonTextColor.value,
  buttonText: buttonText.value,
  shadowSize: shadowSize.value,
  showButton: showButton.value,
  showIcon: showIcon.value
}));

const hasChanges = computed(
  () =>
    theme.value !== DEFAULTS.theme ||
    width.value !== DEFAULTS.width ||
    bend.value !== DEFAULTS.bend ||
    height.value !== DEFAULTS.height ||
    cornerRadius.value !== DEFAULTS.cornerRadius ||
    borderWidth.value !== DEFAULTS.borderWidth ||
    fontSize.value !== DEFAULTS.fontSize ||
    backgroundColor.value !== DEFAULTS.backgroundColor ||
    textColor.value !== DEFAULTS.textColor ||
    borderColor.value !== DEFAULTS.borderColor ||
    buttonColor.value !== DEFAULTS.buttonColor ||
    buttonTextColor.value !== DEFAULTS.buttonTextColor ||
    buttonText.value !== DEFAULTS.buttonText ||
    shadowSize.value !== DEFAULTS.shadowSize ||
    showButton.value !== DEFAULTS.showButton ||
    showIcon.value !== DEFAULTS.showIcon
);

function reset() {
  theme.value = DEFAULTS.theme;
  width.value = DEFAULTS.width;
  bend.value = DEFAULTS.bend;
  height.value = DEFAULTS.height;
  cornerRadius.value = DEFAULTS.cornerRadius;
  borderWidth.value = DEFAULTS.borderWidth;
  fontSize.value = DEFAULTS.fontSize;
  backgroundColor.value = DEFAULTS.backgroundColor;
  textColor.value = DEFAULTS.textColor;
  borderColor.value = DEFAULTS.borderColor;
  buttonColor.value = DEFAULTS.buttonColor;
  buttonTextColor.value = DEFAULTS.buttonTextColor;
  buttonText.value = DEFAULTS.buttonText;
  shadowSize.value = DEFAULTS.shadowSize;
  showButton.value = DEFAULTS.showButton;
  showIcon.value = DEFAULTS.showIcon;
  forceRerender();
}

watch(theme, newTheme => {
  const colors = THEME_COLORS[newTheme as keyof typeof THEME_COLORS];

  backgroundColor.value = colors.backgroundColor;
  textColor.value = colors.textColor;
  borderColor.value = colors.borderColor;
  buttonColor.value = colors.buttonColor;
  buttonTextColor.value = colors.buttonTextColor;
});

const props: PropRow[] = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    description: 'Controlled value; leave undefined for uncontrolled usage.'
  },
  { name: 'defaultValue', type: 'string', default: '""', description: 'Initial value when the input is uncontrolled.' },
  {
    name: 'onChange',
    type: '(value) => void',
    default: '-',
    description: 'Called with the new value on every keystroke.'
  },
  {
    name: 'onSubmit',
    type: '(value) => void',
    default: '-',
    description: 'Called when the button is pressed or Enter is hit.'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '"Enter your email"',
    description: 'Placeholder text rendered along the curve when empty.'
  },
  { name: 'buttonText', type: 'string', default: '"Get Started"', description: 'Label of the curved submit button.' },
  {
    name: 'type',
    type: 'string',
    default: '"email"',
    description: 'Semantic input type; email/number map to the matching mobile keyboard.'
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    description: 'Name attribute forwarded to the underlying input.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: 'undefined',
    description: 'Accessible label; falls back to the placeholder.'
  },
  {
    name: 'theme',
    type: '"dark" | "light"',
    default: '"dark"',
    description: 'Color preset; any explicit color prop overrides its theme value.'
  },
  {
    name: 'width',
    type: 'number | string',
    default: '450',
    description: 'Width of the input bar (pixels or any CSS width value, e.g. "100%").'
  },
  {
    name: 'bend',
    type: 'number',
    default: '28',
    description: 'How many pixels the center of the bar arches above its ends; negative bends downward, 0 is flat.'
  },
  { name: 'height', type: 'number', default: '64', description: 'Thickness of the input bar in pixels.' },
  {
    name: 'cornerRadius',
    type: 'number',
    default: '18',
    description: 'Corner rounding of the bar; the button rounds proportionally.'
  },
  { name: 'borderWidth', type: 'number', default: '1.5', description: 'Outline stroke width in pixels.' },
  { name: 'fontSize', type: 'number', default: '16', description: 'Font size of the curved text and button label.' },
  {
    name: 'backgroundColor',
    type: 'string',
    default: 'undefined',
    description: 'Fill color of the input bar; overrides the theme.'
  },
  {
    name: 'textColor',
    type: 'string',
    default: 'undefined',
    description: 'Color of the typed text and caret; overrides the theme.'
  },
  {
    name: 'placeholderColor',
    type: 'string',
    default: 'undefined',
    description: 'Color of the placeholder text; overrides the theme.'
  },
  {
    name: 'borderColor',
    type: 'string',
    default: 'undefined',
    description: 'Color of the outline stroke; overrides the theme.'
  },
  {
    name: 'buttonColor',
    type: 'string',
    default: 'undefined',
    description: 'Fill of the submit button, the focus ring and the default icon chip; overrides the theme.'
  },
  {
    name: 'buttonTextColor',
    type: 'string',
    default: 'undefined',
    description: 'Color of the button label; overrides the theme.'
  },
  {
    name: 'iconColor',
    type: 'string',
    default: 'undefined',
    description: 'Fill of the icon chip; defaults to the button color.'
  },
  {
    name: 'shadowSize',
    type: '"none" | "sm" | "md" | "lg"',
    default: '"md"',
    description: 'Size of the soft drop shadow under the bar.'
  },
  {
    name: 'shadowColor',
    type: 'string',
    default: 'undefined',
    description: 'Tint of the drop shadow; overrides the theme.'
  },
  { name: 'showButton', type: 'boolean', default: 'true', description: 'Render the curved submit button.' },
  { name: 'showIcon', type: 'boolean', default: 'true', description: 'Render the leading icon chip.' },
  {
    name: 'icon',
    type: 'slot',
    default: 'undefined',
    description: 'Custom SVG content for the icon, centered at the origin; replaces the default envelope chip.'
  },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the wrapper form.' },
  { name: 'style', type: 'CSSProperties', default: 'undefined', description: 'Inline styles for the wrapper form.' }
];
</script>
