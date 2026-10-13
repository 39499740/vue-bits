<script setup lang="ts">
import CodeBlock from '@/components/common/CodeBlock.vue';
import { jsrepoAddSnippet, PKG_MANAGERS, registryUrl, shadcnAddSnippet, type PackageManager } from '@/constants/cli';
import { Check, Copy, TerminalSquare } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import CopyPageButton from './CopyPageButton.vue';
import DocsButtonBar from './DocsButtonBar.vue';
import MethodSelector from './MethodSelector.vue';

const EXAMPLE_SLUG = 'split-text';

const usageExample = [
  '<' + 'script setup>',
  "import SplitText from './SplitText.vue';",
  '</' + 'script>',
  '',
  '<template>',
  '  <SplitText text="Hello, you!" :delay="100" :duration="0.6" />',
  '</template>'
].join('\n');

const installMode = ref<'manual' | 'cli'>('manual');
const cliTool = ref<'shadcn' | 'jsrepo'>('shadcn');
const pkg = ref<PackageManager>('npm');
const copied = ref(false);

const command = computed(() =>
  cliTool.value === 'shadcn' ? shadcnAddSnippet(EXAMPLE_SLUG, pkg.value) : jsrepoAddSnippet(EXAMPLE_SLUG, pkg.value)
);

async function copyCommand() {
  try {
    await navigator.clipboard.writeText(command.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    // clipboard write failed silently
  }
}

onMounted(() => window.scrollTo(0, 0));
</script>

<template>
  <section class="mx-auto pb-24 max-w-168.75 docs-page">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <h1 class="m-0 text-4xl md:text-[2.75rem] font-bold leading-[1.04] tracking-tight text-(--text-primary)">
        {{ $t('docs.installation.title') }}
      </h1>
      <CopyPageButton />
    </div>

    <p class="max-w-[60ch] mt-4 mb-5 text-lg leading-relaxed text-(--text-secondary)">
      {{ $t('docs.installation.lead') }}
    </p>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.installation.pickMethod') }}
    </h2>
    <MethodSelector
      :methods="[
        { key: 'manual', label: $t('docs.installation.methods.manual'), icon: Copy },
        { key: 'cli', label: 'CLI', icon: TerminalSquare }
      ]"
      :selected="installMode"
      :aria-label="$t('docs.installation.methods.manualAria')"
      @select="key => (installMode = key as 'manual' | 'cli')"
    />

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.installation.stepsHeading') }}
    </h2>

    <template v-if="installMode === 'manual'">
      <p class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
        {{ $t('docs.installation.manual.intro') }}
      </p>

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.manual.step1.title') }}
      </h3>
      <i18n-t
        keypath="docs.installation.manual.step1.body"
        tag="p"
        class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)"
      >
        <template #tab>
          <span class="font-semibold text-(--color-accent)">
            {{ $t('docs.installation.manual.step1.tab') }}
          </span>
        </template>
      </i18n-t>

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.manual.step2.title') }}
      </h3>
      <i18n-t
        keypath="docs.installation.manual.step2.body"
        tag="p"
        class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)"
      >
        <template #file>
          <span class="font-semibold text-(--color-accent)">.vue</span>
        </template>
      </i18n-t>

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.manual.step3.title') }}
      </h3>
      <p class="text-[15px] leading-relaxed mb-3 text-(--text-secondary)">
        {{ $t('docs.installation.manual.step3.body1') }}
      </p>
      <CodeBlock code="npm install gsap" language="bash" />
      <p class="text-[15px] leading-relaxed my-3 text-(--text-secondary)">
        {{ $t('docs.installation.manual.step3.body2') }}
      </p>
      <CodeBlock :code="usageExample" language="html" />
    </template>

    <template v-else>
      <p class="text-[15px] leading-relaxed mb-5 text-(--text-muted)">
        {{ $t('docs.installation.cli.intro') }}
      </p>

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.cli.step1.title') }}
      </h3>
      <p class="text-[15px] leading-relaxed mb-3 text-(--text-secondary)">
        {{ $t('docs.installation.cli.step1.body') }}
      </p>
      <MethodSelector
        :methods="[
          { key: 'shadcn', label: 'shadcn' },
          { key: 'jsrepo', label: 'jsrepo' }
        ]"
        :selected="cliTool"
        :aria-label="$t('docs.installation.cli.toolAria')"
        @select="key => (cliTool = key as 'shadcn' | 'jsrepo')"
      />

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.cli.step2.title') }}
      </h3>
      <MethodSelector
        :methods="PKG_MANAGERS.map(m => ({ key: m, label: m }))"
        :selected="pkg"
        :aria-label="$t('docs.installation.cli.pkgAria')"
        @select="key => (pkg = key as PackageManager)"
      />

      <h3 class="mt-8 mb-2 text-[1.0625rem] font-semibold text-(--text-secondary)">
        {{ $t('docs.installation.cli.step3.title') }}
      </h3>
      <i18n-t
        keypath="docs.installation.cli.step3.body"
        tag="p"
        class="text-[15px] leading-relaxed mb-3 text-(--text-secondary)"
      >
        <template #name>
          <span class="font-semibold text-(--color-accent)">SplitText</span>
        </template>
      </i18n-t>

      <div class="relative rounded-xl border border-(--border-secondary) overflow-hidden">
        <code
          class="block w-full box-border py-4 pl-5 pr-14 font-mono text-sm text-(--text-primary) whitespace-pre overflow-x-auto"
        >
          {{ command }}
        </code>
        <button
          type="button"
          class="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-(--border-secondary) cursor-pointer transition-colors duration-200"
          :class="
            copied
              ? 'bg-(--color-primary) text-black'
              : 'bg-(--bg-body) text-(--text-muted) hover:bg-(--bg-elevated) hover:text-(--text-primary)'
          "
          :aria-label="$t('demo.copyInstallCommand')"
          @click="copyCommand"
        >
          <Check v-if="copied" :size="15" />
          <Copy v-else :size="15" />
        </button>
      </div>

      <i18n-t
        keypath="docs.installation.cli.footer"
        tag="p"
        class="text-[15px] leading-relaxed mt-4 text-(--text-muted)"
      >
        <template #link>
          <a class="text-(--color-accent)" :href="registryUrl(EXAMPLE_SLUG)" target="_blank" rel="noreferrer">
            {{ registryUrl(EXAMPLE_SLUG) }}
          </a>
        </template>
      </i18n-t>
    </template>

    <h2 class="mt-14 mb-3 text-xl font-semibold text-(--text-primary)">
      {{ $t('docs.installation.done.title') }}
    </h2>

    <p class="text-[15px] leading-relaxed mb-5 text-(--text-secondary)">
      {{ $t('docs.installation.done.body') }}
    </p>

    <DocsButtonBar
      :next="{ label: $t('docs.mcp.title'), route: '/get-started/mcp' }"
      :previous="{ label: $t('docs.introduction.title'), route: '/get-started/introduction' }"
    />
  </section>
</template>
