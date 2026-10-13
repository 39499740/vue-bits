<template>
  <h1 class="sub-category">Elastic Mesh</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="elasticMesh.usage"
    :source="elasticMeshSource"
    component-name="ElasticMesh"
    :props-table="props"
  >
    <template #preview>
      <div class="relative p-0 h-125 overflow-hidden demo-container">
        <ElasticMesh v-bind="elasticMeshProps" />
        <p class="right-0 bottom-3 left-0 absolute text-sm text-center" style="color: #a6a6a6">
          {{ interaction === 'drag' ? 'Click and drag across the sheet.' : 'Move your cursor across the sheet.' }}
        </p>
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewSwitch title="Use Image" v-model="showImage" />
        <PreviewColorPicker title="Color 1" v-model="color1" />
        <PreviewColorPicker title="Color 2" v-model="color2" />
        <PreviewColorPicker title="Grid Color" v-model="gridColor" />
        <PreviewSwitch title="Show Grid" v-model="showGrid" />
        <PreviewSlider title="Grid Density" :min="4" :max="40" :step="1" v-model="gridDensity" />
        <PreviewSlider title="Grid Opacity" :min="0" :max="1" :step="0.01" v-model="gridOpacity" />
        <PreviewColorPicker title="Highlight" v-model="highlight" />
        <PreviewSlider title="Stiffness" :min="0.02" :max="0.15" :step="0.005" v-model="stiffness" />
        <PreviewSlider title="Damping" :min="0.03" :max="0.25" :step="0.01" v-model="damping" />
        <PreviewSlider title="Grab Radius" :min="0.15" :max="0.8" :step="0.01" v-model="grabRadius" />
        <PreviewSlider title="Pull" :min="0" :max="1" :step="0.02" v-model="pull" />
        <PreviewSlider title="Wobble" :min="0" :max="8" :step="1" v-model="wobble" />
        <PreviewSlider title="Tilt" :min="0" :max="32" :step="1" v-model="tilt" valueUnit="°" />
        <PreviewSlider title="Shading" :min="0" :max="1.5" :step="0.05" v-model="shading" />
        <PreviewSlider title="Border Radius" :min="0" :max="80" :step="1" v-model="borderRadius" valueUnit="px" />
        <PreviewSlider title="Resolution" :min="10" :max="36" :step="1" v-model="resolution" />
        <PreviewSelect title="Interaction" :options="['hover', 'drag']" v-model="interaction" />
        <PreviewSwitch title="Enabled" v-model="enabled" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="elastic-mesh" :usage="elasticMesh.usage!" :source="elasticMeshSource" />
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
import { elasticMesh } from '@/constants/code/Animations/elasticMeshCode';
import ElasticMesh from '@/content/Animations/ElasticMesh/ElasticMesh.vue';
import elasticMeshSource from '@/content/Animations/ElasticMesh/ElasticMesh.vue?raw';
import { computed, ref } from 'vue';

const { forceRerender } = useForceRerender();

const DEFAULTS = {
  showImage: true,
  color1: '#10B981',
  color2: '#c6d0b4',
  showGrid: true,
  gridDensity: 20,
  gridOpacity: 0.28,
  gridColor: '#ffffff',
  highlight: '#ffffff',
  borderRadius: 25,
  stiffness: 0.05,
  damping: 0.2,
  grabRadius: 0.6,
  pull: 0.4,
  wobble: 5,
  tilt: 14,
  shading: 0.5,
  resolution: 25,
  interaction: 'hover' as 'hover' | 'drag',
  enabled: true
};

const showImage = ref(DEFAULTS.showImage);
const color1 = ref(DEFAULTS.color1);
const color2 = ref(DEFAULTS.color2);
const showGrid = ref(DEFAULTS.showGrid);
const gridDensity = ref(DEFAULTS.gridDensity);
const gridOpacity = ref(DEFAULTS.gridOpacity);
const gridColor = ref(DEFAULTS.gridColor);
const highlight = ref(DEFAULTS.highlight);
const borderRadius = ref(DEFAULTS.borderRadius);
const stiffness = ref(DEFAULTS.stiffness);
const damping = ref(DEFAULTS.damping);
const grabRadius = ref(DEFAULTS.grabRadius);
const pull = ref(DEFAULTS.pull);
const wobble = ref(DEFAULTS.wobble);
const tilt = ref(DEFAULTS.tilt);
const shading = ref(DEFAULTS.shading);
const resolution = ref(DEFAULTS.resolution);
const interaction = ref(DEFAULTS.interaction);
const enabled = ref(DEFAULTS.enabled);

const elasticMeshProps = computed(() => ({
  showImage: showImage.value,
  image: showImage.value ? 'https://picsum.photos/seed/elastic/900/600' : '',
  color1: color1.value,
  color2: color2.value,
  showGrid: showGrid.value,
  gridDensity: gridDensity.value,
  gridOpacity: gridOpacity.value,
  gridColor: gridColor.value,
  highlight: highlight.value,
  borderRadius: borderRadius.value,
  stiffness: stiffness.value,
  damping: damping.value,
  grabRadius: grabRadius.value,
  pull: pull.value,
  wobble: wobble.value,
  tilt: tilt.value,
  shading: shading.value,
  resolution: resolution.value,
  interaction: interaction.value,
  enabled: enabled.value
}));

const hasChanges = computed(
  () =>
    showImage.value !== DEFAULTS.showImage ||
    color1.value !== DEFAULTS.color1 ||
    color2.value !== DEFAULTS.color2 ||
    showGrid.value !== DEFAULTS.showGrid ||
    gridDensity.value !== DEFAULTS.gridDensity ||
    gridOpacity.value !== DEFAULTS.gridOpacity ||
    gridColor.value !== DEFAULTS.gridColor ||
    highlight.value !== DEFAULTS.highlight ||
    borderRadius.value !== DEFAULTS.borderRadius ||
    stiffness.value !== DEFAULTS.stiffness ||
    damping.value !== DEFAULTS.damping ||
    grabRadius.value !== DEFAULTS.grabRadius ||
    pull.value !== DEFAULTS.pull ||
    wobble.value !== DEFAULTS.wobble ||
    tilt.value !== DEFAULTS.tilt ||
    shading.value !== DEFAULTS.shading ||
    resolution.value !== DEFAULTS.resolution ||
    interaction.value !== DEFAULTS.interaction ||
    enabled.value !== DEFAULTS.enabled
);

function reset() {
  showImage.value = DEFAULTS.showImage;
  color1.value = DEFAULTS.color1;
  color2.value = DEFAULTS.color2;
  showGrid.value = DEFAULTS.showGrid;
  gridDensity.value = DEFAULTS.gridDensity;
  gridOpacity.value = DEFAULTS.gridOpacity;
  gridColor.value = DEFAULTS.gridColor;
  highlight.value = DEFAULTS.highlight;
  borderRadius.value = DEFAULTS.borderRadius;
  stiffness.value = DEFAULTS.stiffness;
  damping.value = DEFAULTS.damping;
  grabRadius.value = DEFAULTS.grabRadius;
  pull.value = DEFAULTS.pull;
  wobble.value = DEFAULTS.wobble;
  tilt.value = DEFAULTS.tilt;
  shading.value = DEFAULTS.shading;
  resolution.value = DEFAULTS.resolution;
  interaction.value = DEFAULTS.interaction;
  enabled.value = DEFAULTS.enabled;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'image',
    type: 'string',
    default: "''",
    description: 'Optional image URL to warp. When empty, a color gradient surface is rendered instead.'
  },
  { name: 'color1', type: 'string', default: '#10B981', description: 'Top color of the gradient surface.' },
  { name: 'color2', type: 'string', default: '#c6d0b4', description: 'Bottom color of the gradient surface.' },
  { name: 'showGrid', type: 'boolean', default: 'true', description: 'Draw the mesh lattice over the surface.' },
  { name: 'gridDensity', type: 'number', default: '20', description: 'Number of lattice cells across the sheet.' },
  { name: 'gridOpacity', type: 'number', default: '0.28', description: 'Opacity of the lattice lines.' },
  { name: 'gridColor', type: 'string', default: '#ffffff', description: 'Color of the lattice lines.' },
  {
    name: 'highlight',
    type: 'string',
    default: '#ffffff',
    description: 'Specular highlight color used by the shading.'
  },
  { name: 'borderRadius', type: 'number', default: '25', description: 'Corner radius of the sheet in pixels.' },
  {
    name: 'stiffness',
    type: 'number',
    default: '0.05',
    description: 'How hard the mesh springs back to flat. Higher settles faster.'
  },
  {
    name: 'damping',
    type: 'number',
    default: '0.2',
    description: 'How quickly wobbles die out. Higher damping settles faster with fewer oscillations.'
  },
  {
    name: 'grabRadius',
    type: 'number',
    default: '0.6',
    description: 'How much of the sheet the pointer grabs (fraction of the surface).'
  },
  { name: 'pull', type: 'number', default: '0.4', description: 'How far the surface stretches toward the pointer.' },
  {
    name: 'wobble',
    type: 'number',
    default: '5',
    description: 'Neighbor coupling — higher spreads the deformation into more visible ripples.'
  },
  { name: 'tilt', type: 'number', default: '14', description: 'Perspective tilt of the sheet in degrees.' },
  {
    name: 'shading',
    type: 'number',
    default: '0.5',
    description: 'Fake lighting strength that gives the warp depth. Keep above 0 to read the deformation.'
  },
  { name: 'resolution', type: 'number', default: '25', description: 'Mesh grid density (nodes per side).' },
  {
    name: 'interaction',
    type: '"hover" | "drag"',
    default: '"hover"',
    description: 'Whether the mesh reacts to hover or only while dragging.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Enables or disables the pointer interaction.' },
  { name: 'className', type: 'string', default: "''", description: 'Additional class names for the container.' },
  { name: 'style', type: 'object', default: '—', description: 'Inline styles for the container.' }
];
</script>
