<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FiEdit3, FiPackage, FiShield } from 'vue-icons-plus/fi';

import './Ownership.css';

const { t } = useI18n();

type TokenKind = 'kw' | 'comp' | 'attr' | 'str' | 'num' | 'punc';
type Token = [string, TokenKind];

interface TreeRow {
  depth: number;
  name: string;
  kind: 'dir' | 'file';
  added?: boolean;
  active?: boolean;
}

const POINTS = computed(() => [
  {
    icon: FiPackage,
    title: t('own.points.noWrapper.title'),
    desc: t('own.points.noWrapper.desc')
  },
  {
    icon: FiEdit3,
    title: t('own.points.editAnything.title'),
    desc: t('own.points.editAnything.desc')
  },
  {
    icon: FiShield,
    title: t('own.points.noLockIn.title'),
    desc: t('own.points.noLockIn.desc')
  }
]);

const TREE: TreeRow[] = [
  { depth: 0, name: 'your-project', kind: 'dir' },
  { depth: 1, name: 'src', kind: 'dir' },
  { depth: 2, name: 'components', kind: 'dir' },
  { depth: 3, name: 'Aurora.vue', kind: 'file', added: true, active: true },
  { depth: 3, name: 'Aurora.css', kind: 'file', added: true },
  { depth: 2, name: 'App.vue', kind: 'file' },
  { depth: 1, name: 'package.json', kind: 'file' }
];

const CODE: Token[][] = [
  [
    ['import ', 'kw'],
    ['{ Renderer, Program, Mesh }', 'attr'],
    [' from ', 'kw'],
    ["'ogl'", 'str'],
    [';', 'punc']
  ],
  [
    ['import ', 'kw'],
    ['{ ref, onMounted }', 'attr'],
    [' from ', 'kw'],
    ["'vue'", 'str'],
    [';', 'punc']
  ],
  [],
  [
    ['const ', 'kw'],
    ['props', 'attr'],
    [' = ', 'punc'],
    ['defineProps', 'comp'],
    ['({', 'punc']
  ],
  [
    ['  colorStops', 'attr'],
    [': [', 'punc'],
    ["'#5227FF'", 'str'],
    [', ', 'punc'],
    ["'#7cff67'", 'str'],
    ['],', 'punc']
  ],
  [
    ['  speed', 'attr'],
    [': ', 'punc'],
    ['1', 'num'],
    [',', 'punc']
  ],
  [
    ['  blend', 'attr'],
    [': ', 'punc'],
    ['0.5', 'num'],
    [',', 'punc']
  ],
  [['});', 'punc']],
  [],
  [
    ['const ', 'kw'],
    ['ctn', 'attr'],
    [' = ', 'punc'],
    ['ref', 'comp'],
    ['(', 'punc'],
    ['null', 'kw'],
    [');', 'punc']
  ]
];

const sectionEl = ref<HTMLDivElement | null>(null);
const visible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!sectionEl.value) return;

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true;
          observer?.disconnect();
        }
      }
    },
    { threshold: 0.1, rootMargin: '-60px' }
  );

  observer.observe(sectionEl.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="ln-own-section">
    <div class="ln-own-inner">
      <div ref="sectionEl" :class="['ln-own-grid', { 'is-visible': visible }]">
        <div class="ln-own-visual">
          <div
            class="ln-own-window"
            role="img"
            :aria-label="t('own.visualAria')"
          >
            <div class="ln-own-tabs">
              <span class="ln-own-tab is-active">Aurora.vue</span>
              <span class="ln-own-tab">Aurora.css</span>
            </div>

            <div class="ln-own-body">
              <div class="ln-own-tree">
                <div
                  v-for="row in TREE"
                  :key="row.name"
                  :class="['ln-own-tree-row', { 'is-added': row.added, 'is-active': row.active }]"
                  :style="{ paddingLeft: `${8 + row.depth * 11}px` }"
                >
                  <span class="ln-own-tree-name">{{ row.name }}{{ row.kind === 'dir' ? '/' : '' }}</span>
                </div>
              </div>

              <div class="ln-own-code">
                <div v-for="(line, i) in CODE" :key="i" class="ln-own-code-line">
                  <span class="ln-own-code-num" aria-hidden="true">{{ i + 1 }}</span>
                  <span class="ln-own-code-text">
                    <span v-for="(token, j) in line" :key="j" :class="`ln-own-t-${token[1]}`">{{ token[0] }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="ln-own-status">
              <span class="ln-own-status-item">{{ t('own.statusOgl') }}</span>
              <span class="ln-own-status-item">{{ t('own.statusNoPackage') }}</span>
            </div>
          </div>
        </div>

        <div class="ln-own-copy">
          <h2 class="ln-own-title">{{ t('own.title') }}</h2>
          <p class="ln-own-subtitle">
            {{ t('own.subtitle') }}
          </p>

          <ul class="ln-own-points">
            <li v-for="point in POINTS" :key="point.title" class="ln-own-point">
              <span class="ln-own-point-icon" aria-hidden="true">
                <component :is="point.icon" :size="13" />
              </span>
              <h3 class="ln-own-point-title">{{ point.title }}</h3>
              <p class="ln-own-point-desc">{{ point.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
