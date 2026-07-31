<template>
  <div class="scrubber">
    <div class="scrubber-track scrubber-track--input" :data-disabled="isDisabled">
      <span class="scrubber-label">{{ displayTitle }}</span>
      <input
        class="scrubber-input"
        type="text"
        :value="modelValue"
        :placeholder="displayPlaceholder"
        :maxlength="maxlength"
        :disabled="isDisabled"
        :aria-label="displayTitle"
        @input="modelValue = ($event.target as HTMLInputElement).value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const {
  title = '',
  placeholder = '',
  maxlength,
  isDisabled = false
} = defineProps<{
  title?: string;
  placeholder?: string;
  maxlength?: number;
  isDisabled?: boolean;
}>();

const modelValue = defineModel<string>({ default: '' });
const { t, te } = useI18n();
const displayTitle = computed(() => {
  const key = `controls.${title.replace(/\s+/g, '_')}`;
  return te(key) ? t(key) : title;
});
const displayPlaceholder = computed(() => {
  const key = `placeholders.${placeholder}`;
  return te(key) ? t(key) : placeholder;
});
</script>
