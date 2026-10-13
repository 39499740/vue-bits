<script setup lang="ts">
import claudeIcon from '@/assets/icons/claude.svg';
import cursorIcon from '@/assets/icons/cursor.svg';
import vscodeIcon from '@/assets/icons/vscode.svg';
import CodeBlock from '@/components/common/CodeBlock.vue';
import { SAMPLE_COMPONENTS_JSON_REGISTRIES_DOC } from '@/constants/cli';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CopyPageButton from './CopyPageButton.vue';
import DocsButtonBar from './DocsButtonBar.vue';
import MethodSelector from './MethodSelector.vue';

const { t } = useI18n();

const CLIENTS = [
  { key: 'claude', label: 'Claude Code', icon: claudeIcon },
  { key: 'cursor', label: 'Cursor', icon: cursorIcon },
  { key: 'vscode', label: 'VS Code', icon: vscodeIcon }
];

const EXAMPLE_PROMPTS = computed(() => [
  t('docs.mcp.prompts.browseBackgrounds'),
  t('docs.mcp.prompts.addDither'),
  t('docs.mcp.prompts.addFadeSection')
]);

const selectedClient = ref<'claude' | 'cursor' | 'vscode'>('claude');

const initCommand = computed(() => `npx shadcn@latest mcp init --client ${selectedClient.value}`);

onMounted(() => window.scrollTo(0, 0));
</script>

<template>
  <section class="mx-auto pb-24 max-w-168.75 docs-page">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <h1 class="m-0 text-4xl md:text-[2.75rem] font-bold leading-[1.04] tracking-tight text-(--text-primary)">
        {{ $t('docs.mcp.title') }}
      </h1>
      <CopyPageButton />
    </div>

    <i18n-t
      keypath="docs.mcp.lead"
      tag="p"
      class="max-w-[60ch] mt-4 mb-5 text-lg leading-relaxed text-(--text-secondary)"
    >
      <template #mcp>
        <a
          class="underline text-(--text-secondary)"
          href="https://modelcontextprotocol.io/"
          target="_blank"
          rel="noreferrer"
        >
          Model Context Protocol (MCP)
        </a>
      </template>
    </i18n-t>

    <p class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
      {{ $t('docs.mcp.encourages') }}
    </p>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.mcp.quickStart') }}
    </h2>

    <i18n-t
      keypath="docs.mcp.registriesIntro"
      tag="p"
      class="text-[15px] leading-relaxed mb-3 text-(--text-secondary)"
    >
      <template #file>
        <span class="font-semibold text-(--color-accent)">components.json</span>
      </template>
      <template #registry>
        <span class="font-semibold text-(--color-accent)">@vue-bits</span>
      </template>
    </i18n-t>
    <CodeBlock :code="SAMPLE_COMPONENTS_JSON_REGISTRIES_DOC" language="json" />

    <p class="text-[15px] leading-relaxed my-5 text-(--text-muted)">
      {{ $t('docs.mcp.selectClient') }}
    </p>

    <MethodSelector
      :methods="CLIENTS"
      :selected="selectedClient"
      :aria-label="$t('docs.mcp.clientAria')"
      @select="key => (selectedClient = key as 'claude' | 'cursor' | 'vscode')"
    />

    <p class="text-[15px] leading-relaxed my-5 text-(--text-secondary)">{{ $t('docs.mcp.runThis') }}</p>
    <CodeBlock :code="initCommand" language="bash" />

    <p v-if="selectedClient === 'claude'" class="text-[15px] leading-relaxed my-3 text-(--text-secondary)">
      {{ $t('docs.mcp.promptIntro.claude') }}
    </p>
    <p v-else-if="selectedClient === 'cursor'" class="text-[15px] leading-relaxed my-3 text-(--text-secondary)">
      {{ $t('docs.mcp.promptIntro.cursor') }}
    </p>
    <i18n-t
      v-else
      keypath="docs.mcp.promptIntro.vscode"
      tag="p"
      class="text-[15px] leading-relaxed my-3 text-(--text-secondary)"
    >
      <template #file>
        <span class="font-semibold text-(--color-accent)">.vscode/mcp.json</span>
      </template>
      <template #start>
        <span class="font-semibold text-(--color-accent)">Start</span>
      </template>
    </i18n-t>

    <ul class="space-y-2 mb-5 pl-5 list-disc">
      <li
        v-for="(prompt, i) in EXAMPLE_PROMPTS"
        :key="i"
        class="text-[15px] leading-relaxed text-(--text-muted) max-w-[55ch]"
      >
        {{ prompt }}
      </li>
    </ul>

    <p v-if="selectedClient === 'claude'" class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
      {{ $t('docs.mcp.tip') }}
    </p>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.mcp.learnMore.title') }}
    </h2>

    <p class="text-[15px] leading-relaxed mb-4 text-(--text-muted)">
      {{ $t('docs.mcp.learnMore.body') }}
    </p>

    <a
      class="underline text-[15px] text-(--text-secondary)"
      href="https://ui.shadcn.com/docs/mcp"
      target="_blank"
      rel="noreferrer"
    >
      ui.shadcn.com/docs/mcp
    </a>

    <DocsButtonBar
      :next="{ label: $t('componentList.browseComponents'), route: '/get-started/index' }"
      :previous="{ label: $t('docs.installation.title'), route: '/get-started/installation' }"
    />
  </section>
</template>
