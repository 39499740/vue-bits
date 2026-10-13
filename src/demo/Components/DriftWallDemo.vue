<template>
  <h1 class="sub-category">Drift Wall</h1>
  <TabsLayout
    :has-changes="hasChanges"
    :onreset="reset"
    :usage="driftWall.usage"
    :source="driftWallSource"
    component-name="DriftWall"
    :props-table="props"
  >
    <template #preview>
      <div class="h-140 overflow-hidden demo-container">
        <DriftWall :key="key" :items="ITEMS" v-bind="driftWallProps" />
      </div>
    </template>

    <template #customize>
      <Customize>
        <PreviewColorPicker title="Overlay" v-model="overlayColor" />
        <PreviewSlider title="Columns" :min="2" :max="8" :step="1" v-model="columns" width="140" />
        <PreviewSlider title="Tile Width" :min="120" :max="280" :step="4" v-model="tileWidth" valueUnit="px" />
        <PreviewSlider title="Tile Height" :min="90" :max="220" :step="2" v-model="tileHeight" valueUnit="px" />
        <PreviewSlider title="Gap" :min="0" :max="48" :step="2" v-model="gap" valueUnit="px" />
        <PreviewSlider title="Radius" :min="0" :max="40" :step="1" v-model="radius" valueUnit="px" />
        <PreviewSelect title="Direction" :options="['up', 'down']" v-model="direction" width="110" />
        <PreviewSlider title="Speed" :min="0" :max="120" :step="2" v-model="speed" />
        <PreviewSlider title="Variance" :min="0" :max="1" :step="0.05" v-model="variance" />
        <PreviewSlider title="Tilt" :min="-30" :max="40" :step="1" v-model="tilt" valueUnit="°" />
        <PreviewSlider title="Turn" :min="-30" :max="30" :step="1" v-model="turn" valueUnit="°" />
        <PreviewSlider title="Roll" :min="-20" :max="20" :step="1" v-model="roll" valueUnit="°" />
        <PreviewSlider title="Perspective" :min="600" :max="2400" :step="50" v-model="perspective" valueUnit="px" />
        <PreviewSlider title="Depth" :min="0" :max="400" :step="10" v-model="depth" valueUnit="px" />
        <PreviewSlider title="Parallax" :min="0" :max="2" :step="0.1" v-model="parallax" />
        <PreviewSlider title="Lift" :min="0" :max="140" :step="4" v-model="lift" valueUnit="px" />
        <PreviewSlider title="Fade}" :min="0" :max="1" :step="0.05" v-model="fade" />
        <PreviewSlider title="Dim" :min="0.15" :max="1" :step="0.05" v-model="dim" />
        <PreviewSwitch title="Pause on Hover" v-model="pauseOnHover" />
        <PreviewSwitch title="Grayscale" v-model="grayscale" />
      </Customize>
    </template>

    <template #propTable>
      <PropTable :data="props" />
    </template>

    <template #code>
      <DemoCodeTab slug="drift-wall" :usage="driftWall.usage!" :source="driftWallSource" />
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
import { driftWall } from '@/constants/code/Components/driftWallCode';
import DriftWall from '@/content/Components/DriftWall/DriftWall.vue';
import driftWallSource from '@/content/Components/DriftWall/DriftWall.vue?raw';
import { computed, ref } from 'vue';

const { rerenderKey: key, forceRerender } = useForceRerender();

const DEFAULTS = {
  columns: 5,
  tileWidth: 200,
  tileHeight: 132,
  gap: 18,
  radius: 14,
  tilt: 16,
  turn: -14,
  roll: 0,
  perspective: 1200,
  depth: 120,
  speed: 42,
  direction: 'up' as 'up' | 'down',
  variance: 0.45,
  parallax: 0.6,
  pauseOnHover: false,
  lift: 64,
  fade: 0.6,
  dim: 0.55,
  grayscale: false,
  overlayColor: '#001000'
};

const IMAGE_IDS = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164, 177];

const ITEMS = IMAGE_IDS.map((id, i) => ({
  image: `https://picsum.photos/id/${id}/600/400`,
  title: `Tile ${i + 1}`,
  href: 'https://vue-bits.dev'
}));

const columns = ref(DEFAULTS.columns);
const tileWidth = ref(DEFAULTS.tileWidth);
const tileHeight = ref(DEFAULTS.tileHeight);
const gap = ref(DEFAULTS.gap);
const radius = ref(DEFAULTS.radius);
const tilt = ref(DEFAULTS.tilt);
const turn = ref(DEFAULTS.turn);
const roll = ref(DEFAULTS.roll);
const perspective = ref(DEFAULTS.perspective);
const depth = ref(DEFAULTS.depth);
const speed = ref(DEFAULTS.speed);
const direction = ref(DEFAULTS.direction);
const variance = ref(DEFAULTS.variance);
const parallax = ref(DEFAULTS.parallax);
const pauseOnHover = ref(DEFAULTS.pauseOnHover);
const lift = ref(DEFAULTS.lift);
const fade = ref(DEFAULTS.fade);
const dim = ref(DEFAULTS.dim);
const grayscale = ref(DEFAULTS.grayscale);
const overlayColor = ref(DEFAULTS.overlayColor);

const driftWallProps = computed(() => ({
  columns: columns.value,
  tileWidth: tileWidth.value,
  tileHeight: tileHeight.value,
  gap: gap.value,
  radius: radius.value,
  tilt: tilt.value,
  turn: turn.value,
  roll: roll.value,
  perspective: perspective.value,
  depth: depth.value,
  speed: speed.value,
  direction: direction.value,
  variance: variance.value,
  parallax: parallax.value,
  pauseOnHover: pauseOnHover.value,
  lift: lift.value,
  fade: fade.value,
  dim: dim.value,
  grayscale: grayscale.value,
  overlayColor: overlayColor.value
}));

const hasChanges = computed(
  () =>
    columns.value !== DEFAULTS.columns ||
    tileWidth.value !== DEFAULTS.tileWidth ||
    tileHeight.value !== DEFAULTS.tileHeight ||
    gap.value !== DEFAULTS.gap ||
    radius.value !== DEFAULTS.radius ||
    tilt.value !== DEFAULTS.tilt ||
    turn.value !== DEFAULTS.turn ||
    roll.value !== DEFAULTS.roll ||
    perspective.value !== DEFAULTS.perspective ||
    depth.value !== DEFAULTS.depth ||
    speed.value !== DEFAULTS.speed ||
    direction.value !== DEFAULTS.direction ||
    variance.value !== DEFAULTS.variance ||
    parallax.value !== DEFAULTS.parallax ||
    pauseOnHover.value !== DEFAULTS.pauseOnHover ||
    lift.value !== DEFAULTS.lift ||
    fade.value !== DEFAULTS.fade ||
    dim.value !== DEFAULTS.dim ||
    grayscale.value !== DEFAULTS.grayscale ||
    overlayColor.value !== DEFAULTS.overlayColor
);

function reset() {
  columns.value = DEFAULTS.columns;
  tileWidth.value = DEFAULTS.tileWidth;
  tileHeight.value = DEFAULTS.tileHeight;
  gap.value = DEFAULTS.gap;
  radius.value = DEFAULTS.radius;
  tilt.value = DEFAULTS.tilt;
  turn.value = DEFAULTS.turn;
  roll.value = DEFAULTS.roll;
  perspective.value = DEFAULTS.perspective;
  depth.value = DEFAULTS.depth;
  speed.value = DEFAULTS.speed;
  direction.value = DEFAULTS.direction;
  variance.value = DEFAULTS.variance;
  parallax.value = DEFAULTS.parallax;
  pauseOnHover.value = DEFAULTS.pauseOnHover;
  lift.value = DEFAULTS.lift;
  fade.value = DEFAULTS.fade;
  dim.value = DEFAULTS.dim;
  grayscale.value = DEFAULTS.grayscale;
  overlayColor.value = DEFAULTS.overlayColor;
  forceRerender();
}

const props: PropRow[] = [
  {
    name: 'items',
    type: 'array',
    default: '15 demo tiles',
    description: 'Tiles to display. Each item has { image, title?, href? }.'
  },
  { name: 'columns', type: 'number', default: '5', description: 'Number of drifting columns.' },
  { name: 'tileWidth', type: 'number', default: '200', description: 'Width of each tile in pixels.' },
  { name: 'tileHeight', type: 'number', default: '132', description: 'Height of each tile in pixels.' },
  { name: 'gap', type: 'number', default: '18', description: 'Spacing between tiles and columns in pixels.' },
  { name: 'radius', type: 'number', default: '14', description: 'Corner radius of each tile in pixels.' },
  { name: 'tilt', type: 'number', default: '16', description: 'Perspective pitch of the wall (rotateX, degrees).' },
  { name: 'turn', type: 'number', default: '-14', description: 'Perspective yaw of the wall (rotateY, degrees).' },
  { name: 'roll', type: 'number', default: '0', description: 'In-plane rotation of the wall (rotateZ, degrees).' },
  {
    name: 'perspective',
    type: 'number',
    default: '1200',
    description: 'Perspective distance in pixels — smaller is more dramatic.'
  },
  {
    name: 'depth',
    type: 'number',
    default: '120',
    description: 'How far the wall sits back from the viewer in pixels.'
  },
  { name: 'speed', type: 'number', default: '42', description: 'Base drift speed in pixels per second.' },
  {
    name: 'direction',
    type: '"up" | "down"',
    default: '"up"',
    description: 'Primary drift direction; columns alternate around it.'
  },
  {
    name: 'variance',
    type: 'number',
    default: '0.45',
    description: 'How much column speeds differ from each other (0-1).'
  },
  {
    name: 'parallax',
    type: 'number',
    default: '0.6',
    description: 'Pointer-follow tilt strength (0 disables it).'
  },
  {
    name: 'pauseOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Pause the whole wall while the pointer is over it.'
  },
  {
    name: 'lift',
    type: 'number',
    default: '64',
    description: 'How far a hovered tile lifts toward the viewer in pixels.'
  },
  { name: 'fade', type: 'number', default: '0.6', description: 'Strength of the edge and depth dissolve (0-1).' },
  { name: 'dim', type: 'number', default: '0.55', description: 'Resting opacity of unhovered tiles (0-1).' },
  {
    name: 'grayscale',
    type: 'boolean',
    default: 'false',
    description: 'Desaturate resting tiles; hover restores colour.'
  },
  {
    name: 'overlayColor',
    type: 'string',
    default: '"#001000"',
    description: 'Tint laid over resting tiles, cleared on hover.'
  }
];
</script>
