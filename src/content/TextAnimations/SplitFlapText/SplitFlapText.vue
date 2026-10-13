<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, type CSSProperties, type ComponentPublicInstance } from 'vue';

interface TileState {
  current: string;
  next: string;
  flipping: boolean;
  tick: number;
}

interface AnimationPlan {
  index: number;
  from: string;
  target: string;
  sequence: string[];
  start: number;
  step: number;
  done: boolean;
}

interface TileUpdate {
  index: number;
  current: string;
  next: string;
  done: boolean;
}

interface SplitFlapTextProps {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: string;
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  className?: string;
  style?: CSSProperties;
}

const CHARSETS: Record<string, string> = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numeric: '0123456789'
};

const FLIP_EASING = 'cubic-bezier(0.23, 1, 0.32, 1)';

const toCssUnit = (value: number | string): string => (typeof value === 'number' ? `${value}px` : value);

const resolveCharset = (charset: string): string => {
  if (charset && CHARSETS[charset]) return CHARSETS[charset];
  return typeof charset === 'string' && charset.length > 0 ? charset : CHARSETS.alphanumeric;
};

const normalizePhrase = (phrase: string, width: number): string => {
  const safe = String(phrase ?? '');
  return safe.padEnd(width, ' ').slice(0, width);
};

const createTiles = (phrase: string): TileState[] =>
  phrase.split('').map(char => ({
    current: char,
    next: char,
    flipping: false,
    tick: 0
  }));

const sampleChar = (charset: string): string => charset.charAt(Math.floor(Math.random() * charset.length)) || ' ';

const buildSequence = (target: string, flips: number, charset: string): string[] => {
  const steps: string[] = [];
  for (let i = 0; i < flips; i += 1) {
    steps.push(sampleChar(charset));
  }
  steps.push(target);
  return steps;
};

const props = withDefaults(defineProps<SplitFlapTextProps>(), {
  words: () => ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  flipDuration: 0.12,
  stagger: 0.06,
  cycleDelay: 2400,
  charset: 'alphanumeric',
  flipsPerChar: 8,
  tileColor: '#1b2711',
  textColor: '#f8fafc',
  tileRadius: 8,
  gap: 6,
  fontSize: 52,
  loop: true,
  padTo: 12,
  className: ''
});

const rootClass =
  "inline-flex items-center whitespace-pre select-none leading-none tracking-[0.035em] tabular-nums [font-weight:760] [font-family:'SFMono-Regular','Roboto_Mono','Cascadia_Code','Liberation_Mono',Menlo,monospace] [font-size:var(--split-flap-font-size,52px)] [gap:var(--split-flap-gap,6px)]";

const tileClass =
  "relative [width:0.78em] [height:1.08em] overflow-hidden [border-radius:var(--split-flap-radius,8px)] [background:radial-gradient(circle_at_50%_0%,rgba(255,255,255,.16),transparent_44%),linear-gradient(180deg,color-mix(in_srgb,var(--split-flap-tile-color,#111827)_82%,white),var(--split-flap-tile-color,#111827))] [box-shadow:0_0.035em_0.08em_rgba(255,255,255,.08)_inset,0_-0.05em_0.1em_rgba(0,0,0,.38)_inset,0_0.16em_0.38em_rgba(0,0,0,.28)] [perspective:520px] [transform-style:preserve-3d] isolate before:content-[''] before:absolute before:z-[8] before:[top:calc(50%-0.5px)] before:left-0 before:w-full before:h-px before:[background:linear-gradient(90deg,transparent,rgba(255,255,255,.18)_18%,rgba(0,0,0,.64)_50%,rgba(255,255,255,.14)_82%,transparent)] before:[box-shadow:0_-1px_0_rgba(255,255,255,.08),0_1px_0_rgba(0,0,0,.5)] before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:z-[9] after:[border:1px_solid_rgba(255,255,255,.08)] after:rounded-[inherit] after:[box-shadow:0_0_0_1px_rgba(0,0,0,.2)_inset] after:pointer-events-none";

const halfBaseClass = 'absolute left-0 w-full h-1/2 overflow-hidden [backface-visibility:hidden]';
const halfTopClass = `${halfBaseClass} top-0 [background:linear-gradient(180deg,rgba(255,255,255,.07),transparent_34%),var(--split-flap-tile-color,#111827)]`;
const halfBottomClass = `${halfBaseClass} bottom-0 [background:linear-gradient(0deg,rgba(255,255,255,.06),transparent_38%),color-mix(in_srgb,var(--split-flap-tile-color,#111827)_92%,black)]`;

const flapBaseClass = `${halfBaseClass} z-[6] [will-change:transform,filter] [transform-style:preserve-3d]`;
const flapFrontClass = `${flapBaseClass} top-0 [background:linear-gradient(180deg,rgba(255,255,255,.07),transparent_34%),var(--split-flap-tile-color,#111827)] [transform-origin:center_bottom]`;
const flapBackClass = `${flapBaseClass} bottom-0 [background:linear-gradient(0deg,rgba(255,255,255,.06),transparent_38%),color-mix(in_srgb,var(--split-flap-tile-color,#111827)_92%,black)] [transform-origin:center_top] [transform:rotateX(90deg)]`;

const charClass =
  'absolute left-0 w-full h-[200%] flex items-center justify-center [color:var(--split-flap-text-color,#f8fafc)] [text-shadow:0_0.025em_0_rgba(255,255,255,.16),0_0.09em_0.16em_rgba(0,0,0,.42)]';
const charTopClass = `${charClass} top-0`;
const charBottomClass = `${charClass} bottom-0`;

const sourceWords = computed(() => (Array.isArray(props.words) && props.words.length > 0 ? props.words : props.words));
const phrasesKey = computed(() =>
  typeof props.text === 'string' ? props.text : sourceWords.value.map(word => String(word ?? '')).join('\u001f')
);
const phrases = computed(() => phrasesKey.value.split('\u001f'));
const width = computed(() => {
  const longest = phrases.value.reduce((max, phrase) => Math.max(max, phrase.length), 1);
  return Math.max(1, Math.ceil(Number(props.padTo) || 0), longest);
});
const normalizedPhrases = computed(() => phrases.value.map(phrase => normalizePhrase(phrase, width.value)));

const tiles = ref<TileState[]>(createTiles(normalizedPhrases.value[0] || ''));
const settledText = computed(() =>
  tiles.value
    .map(tile => tile.current)
    .join('')
    .trimEnd()
);

const componentStyle = computed<CSSProperties>(
  () =>
    ({
      '--split-flap-tile-color': props.tileColor,
      '--split-flap-text-color': props.textColor,
      '--split-flap-radius': toCssUnit(props.tileRadius),
      '--split-flap-gap': toCssUnit(props.gap),
      '--split-flap-font-size': toCssUnit(props.fontSize),
      '--split-flap-flip-duration': `${Math.max(0.04, Number(props.flipDuration) || 0.12)}s`,
      ...(props.style || {})
    }) as CSSProperties
);

const flipDurationMs = computed(() => Math.max(0.04, Number(props.flipDuration) || 0.12) * 1000);

const playFrontFlip = (el: Element | ComponentPublicInstance | null) => {
  if (!(el instanceof HTMLElement)) return;
  el.animate(
    [
      { transform: 'rotateX(0deg)', filter: 'brightness(1.08)' },
      { transform: 'rotateX(-90deg)', filter: 'brightness(0.52)' }
    ],
    { duration: flipDurationMs.value, easing: FLIP_EASING, fill: 'both' }
  );
};

const playBackFlip = (el: Element | ComponentPublicInstance | null) => {
  if (!(el instanceof HTMLElement)) return;
  el.animate(
    [
      { transform: 'rotateX(90deg)', filter: 'brightness(0.58)', offset: 0 },
      { transform: 'rotateX(90deg)', filter: 'brightness(0.58)', offset: 0.45 },
      { transform: 'rotateX(0deg)', filter: 'brightness(1)', offset: 1 }
    ],
    { duration: flipDurationMs.value, easing: FLIP_EASING, fill: 'both' }
  );
};

const prefersReducedMotion = ref(false);
let mediaQuery: MediaQueryList | null = null;
let handleMediaChange: (() => void) | null = null;

onMounted(() => {
  if (typeof window === 'undefined' || !window.matchMedia) return;
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  handleMediaChange = () => {
    prefersReducedMotion.value = mediaQuery!.matches;
  };
  handleMediaChange();
  mediaQuery.addEventListener('change', handleMediaChange);
});

onUnmounted(() => {
  if (mediaQuery && handleMediaChange) mediaQuery.removeEventListener('change', handleMediaChange);
});

let raf: number | null = null;
let cycleTimer: number | null = null;
let currentText = '';
let teardownCycle: (() => void) | null = null;

const clearAnimation = () => {
  if (raf) {
    cancelAnimationFrame(raf);
    raf = null;
  }
  if (cycleTimer) {
    clearTimeout(cycleTimer);
    cycleTimer = null;
  }
};

const setupCycle = () => {
  clearAnimation();

  const firstPhrase = normalizedPhrases.value[0] || '';
  currentText = firstPhrase;
  tiles.value = createTiles(firstPhrase);

  if (normalizedPhrases.value.length <= 1 || typeof window === 'undefined') return;

  let phraseIndex = 0;
  let cancelled = false;

  const safeFlipMs = Math.max(40, (Number(props.flipDuration) || 0.12) * 1000);
  const safeStaggerMs = Math.max(0, (Number(props.stagger) || 0) * 1000);
  const safeCycleDelay = Math.max(400, Number(props.cycleDelay) || 2400);
  const safeFlips = Math.max(0, Math.floor(Number(props.flipsPerChar) || 0));
  const activeCharset = resolveCharset(props.charset);

  const animateTo = (targetPhrase: string): number => {
    if (prefersReducedMotion.value) {
      currentText = targetPhrase;
      tiles.value = createTiles(targetPhrase);
      return 0;
    }

    const fromPhrase = normalizePhrase(currentText, width.value);
    const targetChars = targetPhrase.split('');

    const plans = targetChars
      .map<AnimationPlan | null>((targetChar, index) => {
        const fromChar = fromPhrase[index] || ' ';
        if (fromChar === targetChar) return null;

        return {
          index,
          from: fromChar,
          target: targetChar,
          sequence: buildSequence(targetChar, safeFlips, activeCharset),
          start: index * safeStaggerMs,
          step: -1,
          done: false
        };
      })
      .filter((plan): plan is AnimationPlan => plan !== null);

    if (!plans.length) {
      currentText = targetPhrase;
      tiles.value = createTiles(targetPhrase);
      return 0;
    }

    const totalDuration = plans.reduce((max, plan) => Math.max(max, plan.start + plan.sequence.length * safeFlipMs), 0);
    const startedAt = performance.now();

    const updateTiles = (updates: TileUpdate[]) => {
      const nextTiles = [...tiles.value];
      updates.forEach(update => {
        const tile = nextTiles[update.index];
        if (!tile) return;

        nextTiles[update.index] = {
          current: update.current,
          next: update.next,
          flipping: !update.done,
          tick: tile.tick + 1
        };
      });
      tiles.value = nextTiles;
    };

    const tick = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startedAt;
      const updates: TileUpdate[] = [];
      let shouldContinue = false;

      plans.forEach(plan => {
        const localElapsed = elapsed - plan.start;

        if (localElapsed < 0) {
          shouldContinue = true;
          return;
        }

        const step = Math.floor(localElapsed / safeFlipMs);

        if (step < plan.sequence.length) {
          shouldContinue = true;

          if (step !== plan.step) {
            plan.step = step;
            updates.push({
              index: plan.index,
              current: step === 0 ? plan.from : plan.sequence[step - 1],
              next: plan.sequence[step],
              done: false
            });
          }
        } else if (!plan.done) {
          plan.done = true;
          updates.push({
            index: plan.index,
            current: plan.target,
            next: plan.target,
            done: true
          });
        }
      });

      if (updates.length > 0) updateTiles(updates);

      if (shouldContinue) {
        raf = requestAnimationFrame(tick);
      } else {
        currentText = targetPhrase;
        raf = null;
      }
    };

    raf = requestAnimationFrame(tick);
    return totalDuration;
  };

  const scheduleNext = (delay: number) => {
    cycleTimer = window.setTimeout(() => {
      if (cancelled) return;

      const nextIndex = phraseIndex + 1;

      if (nextIndex >= normalizedPhrases.value.length && !props.loop) return;

      phraseIndex = nextIndex % normalizedPhrases.value.length;
      const animationDuration = animateTo(normalizedPhrases.value[phraseIndex]);
      scheduleNext(safeCycleDelay + animationDuration);
    }, delay);
  };

  scheduleNext(safeCycleDelay);

  teardownCycle = () => {
    cancelled = true;
    clearAnimation();
  };
};

onMounted(() => {
  setupCycle();
});

onUnmounted(() => {
  teardownCycle?.();
  teardownCycle = null;
});

watch(
  () => [
    normalizedPhrases.value,
    width.value,
    props.loop,
    props.cycleDelay,
    props.flipDuration,
    props.stagger,
    props.flipsPerChar,
    props.charset,
    prefersReducedMotion.value
  ],
  () => {
    teardownCycle?.();
    teardownCycle = null;
    setupCycle();
  },
  { deep: true }
);
</script>

<template>
  <div :class="[rootClass, className]" :style="componentStyle" role="text" :aria-label="settledText || undefined">
    <span v-for="(tile, index) in tiles" :key="`${index}-${tiles.length}`" :class="tileClass" aria-hidden="true">
      <span :class="halfTopClass">
        <span :class="charTopClass">{{ tile.current === ' ' ? '\u00A0' : tile.current }}</span>
      </span>
      <span :class="halfBottomClass">
        <span :class="charBottomClass">{{ tile.flipping ? tile.next : tile.current }}</span>
      </span>

      <template v-if="tile.flipping">
        <span
          :key="`front-${index}-${tile.tick}`"
          :ref="(el: Element | ComponentPublicInstance | null) => playFrontFlip(el)"
          :class="flapFrontClass"
        >
          <span :class="charTopClass">{{ tile.current === ' ' ? '\u00A0' : tile.current }}</span>
        </span>
        <span
          :key="`back-${index}-${tile.tick}`"
          :ref="(el: Element | ComponentPublicInstance | null) => playBackFlip(el)"
          :class="flapBackClass"
        >
          <span :class="charBottomClass">{{ tile.next === ' ' ? '\u00A0' : tile.next }}</span>
        </span>
      </template>
    </span>
  </div>
</template>
