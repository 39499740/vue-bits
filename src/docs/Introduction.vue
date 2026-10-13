<script setup lang="ts">
import { ArrowRight, Search, SlidersHorizontal, TerminalSquare } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import CopyPageButton from './CopyPageButton.vue';
import DocsButtonBar from './DocsButtonBar.vue';

const { t } = useI18n();

const QUICK_START_STEPS = computed(() => [
  {
    key: 'choose',
    icon: Search,
    title: t('docs.introduction.steps.choose.title'),
    description: t('docs.introduction.steps.choose.desc')
  },
  {
    key: 'customize',
    icon: SlidersHorizontal,
    title: t('docs.introduction.steps.customize.title'),
    description: t('docs.introduction.steps.customize.desc')
  },
  {
    key: 'add',
    icon: TerminalSquare,
    title: t('docs.introduction.steps.add.title'),
    description: t('docs.introduction.steps.add.desc')
  }
]);

const PRINCIPLES = ['freeForAll', 'propFirst', 'modular', 'stack'] as const;
const PERFORMANCE_TIPS = ['lessIsMore', 'mobile', 'thoroughTesting'] as const;

onMounted(() => window.scrollTo(0, 0));
</script>

<template>
  <section class="mx-auto pb-24 max-w-168.75 docs-page">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <h1 class="m-0 text-4xl md:text-[2.75rem] font-bold leading-[1.04] tracking-tight text-(--text-primary)">
        {{ $t('docs.introduction.title') }}
      </h1>
      <CopyPageButton />
    </div>

    <p class="max-w-[60ch] mt-4 mb-5 text-lg leading-relaxed text-(--text-secondary)">
      {{ $t('docs.introduction.lead') }}
    </p>

    <div class="my-7 overflow-hidden rounded-2xl border border-(--border-primary) bg-(--bg-elevated)">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-(--border-primary)">
        <div
          v-for="(step, index) in QUICK_START_STEPS"
          :key="step.key"
          class="bg-(--bg-elevated) p-5 flex flex-col gap-2"
        >
          <div class="flex items-center gap-2 justify-between text-(--color-accent)">
            <span class="font-mono text-xs text-(--text-muted)">0{{ index + 1 }}</span>
            <component :is="step.icon" :size="17" aria-hidden="true" />
          </div>
          <h2 class="m-0 text-[15px] font-semibold text-(--text-primary)">{{ step.title }}</h2>
          <p class="m-0 text-sm leading-relaxed text-(--text-muted)">{{ step.description }}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 p-4">
        <RouterLink
          to="/get-started/index"
          class="inline-flex items-center gap-2 px-4 h-10 rounded-sm text-sm font-semibold text-black! bg-(--color-primary) no-underline transition-transform duration-200 hover:-translate-y-px"
        >
          {{ $t('docs.introduction.browseComponents') }}
          <ArrowRight :size="14" aria-hidden="true" />
        </RouterLink>
        <RouterLink
          to="/get-started/installation"
          class="inline-flex items-center px-4 h-10 rounded-sm text-sm font-medium text-(--text-muted) no-underline transition-colors duration-200 hover:text-(--text-primary)"
        >
          {{ $t('docs.introduction.installationGuide') }}
        </RouterLink>
      </div>
    </div>

    <p class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)">
      {{ $t('docs.introduction.about') }}
    </p>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.introduction.mission.title') }}
    </h2>

    <p class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
      {{ $t('docs.introduction.mission.goal') }}
    </p>
    <p class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)">
      {{ $t('docs.introduction.mission.principlesIntro') }}
    </p>

    <ul class="space-y-2 mb-7 pl-5 list-disc">
      <i18n-t
        v-for="key in PRINCIPLES"
        :key="key"
        :keypath="`docs.introduction.mission.principles.${key}.text`"
        tag="li"
        class="text-[15px] leading-relaxed text-(--text-secondary) max-w-[55ch]"
      >
        <template #label>
          <span class="font-semibold text-(--color-accent)">
            {{ $t(`docs.introduction.mission.principles.${key}.label`) }}
          </span>
        </template>
      </i18n-t>
    </ul>

    <template v-for="key in PRINCIPLES" :key="`section-${key}`">
      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t(`docs.introduction.sections.${key}.title`) }}
      </h3>
      <p class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)">
        {{ $t(`docs.introduction.sections.${key}.body`) }}
      </p>
    </template>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.introduction.performance.title') }}
    </h2>

    <p class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
      {{ $t('docs.introduction.performance.intro') }}
    </p>

    <ul class="space-y-2 mb-7 pl-5 list-disc">
      <i18n-t
        v-for="key in PERFORMANCE_TIPS"
        :key="key"
        :keypath="`docs.introduction.performance.tips.${key}.text`"
        tag="li"
        class="text-[15px] leading-relaxed text-(--text-secondary) max-w-[55ch]"
      >
        <template #label>
          <span class="font-semibold text-(--color-accent)">
            {{ $t(`docs.introduction.performance.tips.${key}.label`) }}
          </span>
        </template>
      </i18n-t>
    </ul>

    <DocsButtonBar :next="{ label: $t('docs.installation.title'), route: '/get-started/installation' }" />
  </section>
</template>
