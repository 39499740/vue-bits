import code from '@/content/Components/OptionWheel/OptionWheel.vue?raw';
import { createCodeObject } from '@/types/code';

export const optionWheel = createCodeObject(code, 'Components/OptionWheel', {
  usage: `<script setup lang="ts">
import OptionWheel from './OptionWheel.vue'

const items = [
  'Ambient',
  'House',
  'Techno',
  'Jazz',
  'Lo-Fi',
  'Synthwave'
]

const handleChange = (index: number, item: string) => {
  console.log(index, item)
}
</script>

<template>
  <OptionWheel
    :items="items"
    :default-selected="2"
    text-color="#a6a6a6"
    active-color="#ffffff"
    side="left"
    :font-size="3"
    :spacing="1.4"
    :curve="1"
    :tilt="6"
    :blur="2"
    :fade="0.25"
    :smoothing="200"
    :inset="80"
    :loop="false"
    draggable
    sound-url="/sounds/click-soft.mp3"
    :sound-volume="0.5"
    @change="handleChange"
  />
</template>`
});
