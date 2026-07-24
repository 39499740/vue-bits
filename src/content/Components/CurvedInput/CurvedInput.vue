<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted, type CSSProperties } from 'vue';

const DEG = 180 / Math.PI;

const round2 = (n: number): number => Math.round(n * 100) / 100;

const hexToRgba = (hex: string, alpha: number): string => {
  let h = String(hex).replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return hex;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export type ShadowSize = 'sm' | 'md' | 'lg';
export type Theme = 'dark' | 'light';

const SHADOWS: Record<ShadowSize, [number, number, number]> = {
  sm: [5, 12, 0.3],
  md: [10, 24, 0.4],
  lg: [16, 40, 0.52]
};

interface ThemePalette {
  backgroundColor: string;
  textColor: string;
  placeholderColor: string;
  borderColor: string;
  buttonColor: string;
  buttonTextColor: string;
  shadowColor: string;
}

const THEMES: Record<Theme, ThemePalette> = {
  dark: {
    backgroundColor: '#070F07',
    textColor: '#f5f5f5',
    placeholderColor: '#a1a1aa',
    borderColor: '#2e4e34',
    buttonColor: '#10B981',
    buttonTextColor: '#ffffff',
    shadowColor: '#000000'
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#1f501d',
    placeholderColor: '#9ab6a0',
    borderColor: '#2e5626',
    buttonColor: '#47eb48',
    buttonTextColor: '#000000',
    shadowColor: '#0b2a0c'
  }
};

interface Geometry {
  straight: boolean;
  W: number;
  T: number;
  svgH: number;
  R?: number;
  dir?: number;
  uPerLen: number;
  point: (u: number, v: number) => [number, number];
  angleAt: (u: number) => number;
  uFromPoint: (x: number, y?: number) => number;
}

// Maps the flat coordinate space (u: 0..W along the bar, v: offset from the
// centerline, positive down) onto a circular arc with the given sagitta
// (`bend`, in px). Positive bend arches up, negative sags down, 0 is flat.
const buildGeometry = (width: number, bend: number, thickness: number, pad: number): Geometry => {
  const W = width;
  const T = thickness;
  const s = Math.max(-W * 0.35, Math.min(bend, W * 0.35));
  const a = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const svgH = T + a + pad * 2;

  if (a < 0.75) {
    const midY = pad + T / 2;
    return {
      straight: true,
      W,
      T,
      svgH,
      uPerLen: 1,
      point: (u, v) => [u, midY + v],
      angleAt: () => 0,
      uFromPoint: x => x
    };
  }

  const R = (W * W * 0.25 + a * a) / (2 * a);
  const cx = W / 2;
  const apexY = pad + T / 2 + (dir > 0 ? 0 : a);
  const cy = apexY + dir * R;
  const phi = Math.asin(Math.min(1, W / (2 * R)));

  return {
    straight: false,
    W,
    T,
    svgH,
    R,
    dir,
    uPerLen: W / (2 * R * phi),
    point: (u, v) => {
      const th = ((u - cx) / cx) * phi;
      const rho = R - dir * v;
      return [cx + rho * Math.sin(th), cy - dir * rho * Math.cos(th)];
    },
    angleAt: u => dir * ((u - cx) / cx) * phi * DEG,
    uFromPoint: (x, y = 0) => {
      const th = Math.atan2(x - cx, dir * (cy - y));
      return cx + (th / phi) * cx;
    }
  };
};

const fmt = (g: Geometry, u: number, v: number): string => {
  const [x, y] = g.point(u, v);
  return `${round2(x)} ${round2(y)}`;
};

// Segment along a constant-v edge, as a circular arc (or a line when flat)
const edgeSeg = (g: Geometry, uTo: number, v: number, ltr: boolean): string => {
  if (g.straight) return `L ${fmt(g, uTo, v)}`;
  const rho = round2(g.R! - g.dir! * v);
  const sweep = ltr === g.dir! > 0 ? 1 : 0;
  return `A ${rho} ${rho} 0 0 ${sweep} ${fmt(g, uTo, v)}`;
};

// A rectangle bent along the arc: circular top/bottom edges, radial end caps
// and quadratic rounded corners.
const bentRectPath = (g: Geometry, u0: number, u1: number, vTop: number, vBot: number, radius: number): string => {
  const rc = Math.max(0, Math.min(radius, (vBot - vTop) / 2, (u1 - u0) / 2));
  return [
    `M ${fmt(g, u0 + rc, vTop)}`,
    edgeSeg(g, u1 - rc, vTop, true),
    `Q ${fmt(g, u1, vTop)} ${fmt(g, u1, vTop + rc)}`,
    `L ${fmt(g, u1, vBot - rc)}`,
    `Q ${fmt(g, u1, vBot)} ${fmt(g, u1 - rc, vBot)}`,
    edgeSeg(g, u0 + rc, vBot, false),
    `Q ${fmt(g, u0, vBot)} ${fmt(g, u0, vBot - rc)}`,
    `L ${fmt(g, u0, vTop + rc)}`,
    `Q ${fmt(g, u0, vTop)} ${fmt(g, u0 + rc, vTop)}`,
    'Z'
  ].join(' ');
};

const bentLinePath = (g: Geometry, u0: number, u1: number, v: number): string =>
  `M ${fmt(g, u0, v)} ${edgeSeg(g, u1, v, true)}`;

const SELECTABLE_TYPES = ['text', 'search', 'tel', 'url', 'password'];

interface Layout {
  btnInset: number;
  chipH: number;
  chipW: number;
  iconU: number;
  textStartU: number;
  textEndU: number;
  btnU0: number;
  btnU1: number;
  winLen: number;
}

interface SvgContent {
  vBase: number;
  bandPath: string;
  layoutPathD: string;
  clipPathD: string;
  chipFill: string;
  chipW: number;
  chipH: number;
  ew: number;
  eh: number;
  sw: number;
  ix: number;
  iy: number;
  iconAngle: number;
  caretX: number;
  caretY: number;
  caretAngle: number;
  caretH: number;
  buttonPath: string;
  buttonTextPathD: string;
}

interface CurvedInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  theme?: Theme;
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  shadowSize?: ShadowSize;
  shadowColor?: string;
  showButton?: boolean;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<CurvedInputProps>(), {
  defaultValue: '',
  placeholder: 'Enter your email',
  buttonText: 'Get Started',
  type: 'email',
  theme: 'dark',
  width: 450,
  bend: 28,
  height: 64,
  cornerRadius: 18,
  borderWidth: 1.5,
  fontSize: 16,
  shadowSize: 'md',
  showButton: true,
  showIcon: true
});

const emit = defineEmits<{
  change: [value: string];
  submit: [value: string];
}>();

const uid = Math.random().toString(36).slice(2, 10);
const layoutPathId = `ci-text-${uid}`;
const buttonPathId = `ci-btn-${uid}`;
const clipId = `ci-clip-${uid}`;

const rootRef = ref<HTMLFormElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const textRef = ref<SVGTextElement | null>(null);
const btnMeasureRef = ref<SVGTextElement | null>(null);
let scrollRef = 0;
let ro: ResizeObserver | null = null;

const w = ref(0);
const innerValue = ref(props.defaultValue);
const caretIndex = ref(props.defaultValue.length);
const focused = ref(false);
const caretU = ref(0);
const scrollLen = ref(0);
const btnTextW = ref(0);
const fontTick = ref(0);

const val = computed(() => (props.value !== undefined ? props.value : innerValue.value));
const display = computed(() => (props.type === 'password' ? '•'.repeat(val.value.length) : val.value));

const palette = computed<ThemePalette>(() => THEMES[props.theme] ?? THEMES.dark);
const bgColor = computed(() => props.backgroundColor ?? palette.value.backgroundColor);
const fgColor = computed(() => props.textColor ?? palette.value.textColor);
const phColor = computed(() => props.placeholderColor ?? palette.value.placeholderColor);
const strokeColor = computed(() => props.borderColor ?? palette.value.borderColor);
const accentColor = computed(() => props.buttonColor ?? palette.value.buttonColor);
const btnFgColor = computed(() => props.buttonTextColor ?? palette.value.buttonTextColor);
const shColor = computed(() => props.shadowColor ?? palette.value.shadowColor);

const pad = computed(() => Math.ceil(props.borderWidth / 2) + 6);
const geom = computed<Geometry | null>(() =>
  w.value > 2 ? buildGeometry(w.value, props.bend, props.height, pad.value) : null
);

const layout = computed<Layout | null>(() => {
  const g = geom.value;
  if (!g) return null;
  const T = props.height;
  const btnInset = Math.max(5, props.borderWidth + 4);
  const chipH = Math.min(34, Math.max(16, T * 0.34));
  const chipW = chipH * 1.25;
  const iconU = 22 + chipW / 2;
  const textStartU = props.showIcon ? 22 + chipW + 13 : 24;
  const btnW = props.showButton ? Math.max(btnTextW.value + props.fontSize * 2.7, T * 1.35) : 0;
  const btnU1 = g.W - btnInset;
  const btnU0 = btnU1 - btnW;
  const textEndU = Math.max(textStartU + 20, props.showButton ? btnU0 - 14 : g.W - 24);
  const winLen = (textEndU - textStartU) / g.uPerLen;
  return { btnInset, chipH, chipW, iconU, textStartU, textEndU, btnU0, btnU1, winLen };
});

// Measure rendered text to keep the caret on the curve and scroll long
// values along the arc, exactly like a native input would.
watchEffect(
  () => {
    void fontTick.value;

    if (btnMeasureRef.value) {
      const bw = btnMeasureRef.value.getComputedTextLength();
      if (Math.abs(btnTextW.value - bw) > 0.5) btnTextW.value = bw;
    }

    const g = geom.value;
    const l = layout.value;
    if (!g || !l) return;

    const textEl = textRef.value;
    const caret = Math.min(caretIndex.value, display.value.length);
    let caretLen = 0;
    let totalLen = 0;
    if (textEl && display.value.length) {
      try {
        totalLen = textEl.getSubStringLength(0, display.value.length);
        caretLen = caret > 0 ? textEl.getSubStringLength(0, caret) : 0;
      } catch {
        totalLen = 0;
        caretLen = 0;
      }
    }
    let next = scrollRef;
    if (caretLen - next > l.winLen - 2) next = caretLen - l.winLen + 2;
    if (caretLen - next < 0) next = caretLen;
    if (totalLen - next < l.winLen) next = Math.max(0, totalLen - l.winLen);
    next = Math.max(0, next);
    if (Math.abs(next - scrollRef) > 0.5) {
      scrollRef = next;
      scrollLen.value = next;
    }
    caretU.value = l.textStartU + (caretLen - next) * g.uPerLen;
  },
  { flush: 'post' }
);

onMounted(() => {
  const el = rootRef.value;
  if (el) {
    ro = new ResizeObserver(entries => {
      const cw = entries[0]?.contentRect?.width ?? el.clientWidth;
      w.value = Math.round(cw);
    });
    ro.observe(el);
  }

  // Re-measure once webfonts finish loading
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      fontTick.value += 1;
    });
  }
});

onUnmounted(() => {
  ro?.disconnect();
});

const commitValue = (v: string) => {
  if (props.value === undefined) innerValue.value = v;
  emit('change', v);
};

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  commitValue(target.value);
  caretIndex.value = target.selectionStart ?? target.value.length;
};

const handleSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  caretIndex.value = target.selectionStart ?? target.value.length;
};

const handleSubmit = () => {
  emit('submit', val.value);
};

// Click on the curve: focus the hidden input and drop the caret on the
// character closest to the click, measured in arc length.
const handleSurfaceClick = (e: MouseEvent) => {
  const input = inputRef.value;
  if (!input) return;
  let idx = display.value.length;
  const svg = svgRef.value;
  const g = geom.value;
  const l = layout.value;
  const textEl = textRef.value;
  if (svg && g && l && textEl && display.value.length) {
    try {
      const ctm = svg.getScreenCTM();
      if (!ctm) throw new Error('missing screen CTM');
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      const target = scrollRef + (g.uFromPoint(pt.x, pt.y) - l.textStartU) / g.uPerLen;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= display.value.length; i++) {
        const li = i === 0 ? 0 : textEl.getSubStringLength(0, i);
        const d = Math.abs(li - target);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      idx = best;
    } catch {
      idx = display.value.length;
    }
  }
  input.focus();
  try {
    input.setSelectionRange(idx, idx);
  } catch {
    /* selection API unavailable for this input type */
  }
  caretIndex.value = idx;
};

const handleButtonKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleSubmit();
  }
};

const safeType = computed(() => (SELECTABLE_TYPES.includes(props.type) ? props.type : 'text'));
const inputModeValue = computed<'email' | 'decimal' | undefined>(() =>
  props.type === 'email' ? 'email' : props.type === 'number' ? 'decimal' : undefined
);

const svgStyle = computed<CSSProperties | undefined>(() => {
  const shadow = SHADOWS[props.shadowSize];
  if (!shadow) return undefined;
  return { filter: `drop-shadow(0 ${shadow[0]}px ${shadow[1]}px ${hexToRgba(shColor.value, shadow[2])})` };
});

const rootStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}));

const content = computed<SvgContent | null>(() => {
  const g = geom.value;
  const l = layout.value;
  if (!g || !l) return null;

  const T = props.height;
  const vBase = props.fontSize * 0.34;
  const scrollU = scrollLen.value * g.uPerLen;
  const bandPath = bentRectPath(g, 0, g.W, -T / 2, T / 2, props.cornerRadius);
  const layoutPathD = bentLinePath(g, l.textStartU - scrollU, g.W, vBase);
  const clipPathD = bentRectPath(g, l.textStartU - 6, l.textEndU + 8, -T / 2, T / 2, 0);

  const chipFill = props.iconColor || accentColor.value;
  const { chipW, chipH } = l;
  const ew = chipW * 0.5;
  const eh = chipH * 0.5;
  const sw = Math.max(1.1, chipH * 0.075);
  const [ix, iy] = g.point(l.iconU, 0);
  const iconAngle = g.angleAt(l.iconU);

  const [caretX, caretY] = g.point(caretU.value, 0);
  const caretAngle = g.angleAt(caretU.value);
  const caretH = Math.min(T * 0.58, props.fontSize * 1.45);

  const btnH = T - l.btnInset * 2;
  const buttonPath = props.showButton
    ? bentRectPath(
        g,
        l.btnU0,
        l.btnU1,
        -T / 2 + l.btnInset,
        T / 2 - l.btnInset,
        Math.min(props.cornerRadius * 0.72, btnH / 2)
      )
    : '';
  const buttonTextPathD = props.showButton ? bentLinePath(g, l.btnU0, l.btnU1, vBase) : '';

  return {
    vBase,
    bandPath,
    layoutPathD,
    clipPathD,
    chipFill,
    chipW,
    chipH,
    ew,
    eh,
    sw,
    ix,
    iy,
    iconAngle,
    caretX,
    caretY,
    caretAngle,
    caretH,
    buttonPath,
    buttonTextPathD
  };
});
</script>

<template>
  <form
    ref="rootRef"
    class="block relative m-0 w-full max-w-full"
    :style="rootStyle"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <template v-if="geom && content">
      <svg
        ref="svgRef"
        class="block w-full h-auto overflow-visible [&_text]:font-[inherit] cursor-text select-none [-webkit-tap-highlight-color:transparent]"
        :width="geom.W"
        :height="round2(geom.svgH)"
        :viewBox="`0 0 ${geom.W} ${round2(geom.svgH)}`"
        :style="svgStyle"
        @pointerdown.prevent
        @click="handleSurfaceClick"
      >
        <defs>
          <clipPath :id="clipId">
            <path :d="content.clipPathD" />
          </clipPath>
        </defs>

        <path
          class="opacity-0 transition-opacity duration-250 ease-in-out"
          :class="{ 'opacity-[0.28]': focused }"
          :d="content.bandPath"
          fill="none"
          :stroke="accentColor"
          :stroke-width="borderWidth + 6"
        />
        <path :d="content.bandPath" :fill="bgColor" :stroke="strokeColor" :stroke-width="borderWidth" />

        <path :id="layoutPathId" :d="content.layoutPathD" fill="none" />

        <g
          v-if="showIcon"
          :transform="`translate(${round2(content.ix)} ${round2(content.iy)}) rotate(${round2(content.iconAngle)})`"
          aria-hidden="true"
        >
          <slot name="icon">
            <rect
              :x="-content.chipW / 2"
              :y="-content.chipH / 2"
              :width="content.chipW"
              :height="content.chipH"
              :rx="content.chipH * 0.27"
              :fill="content.chipFill"
            />
            <rect
              :x="-content.ew / 2"
              :y="-content.eh / 2"
              :width="content.ew"
              :height="content.eh"
              :rx="1.4"
              fill="none"
              stroke="#ffffff"
              :stroke-width="content.sw"
              stroke-linejoin="round"
            />
            <path
              :d="`M ${round2(-content.ew / 2)} ${round2(-content.eh / 2 + content.sw * 0.4)} L 0 ${round2(content.eh * 0.14)} L ${round2(content.ew / 2)} ${round2(-content.eh / 2 + content.sw * 0.4)}`"
              fill="none"
              stroke="#ffffff"
              :stroke-width="content.sw"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
          </slot>
        </g>

        <g :clip-path="`url(#${clipId})`">
          <text
            ref="textRef"
            :style="{ fontSize: `${fontSize}px`, fontWeight: 500 }"
            :fill="fgColor"
            xml:space="preserve"
            aria-hidden="true"
          >
            <textPath :href="`#${layoutPathId}`">{{ display }}</textPath>
          </text>
          <text
            v-if="!display && placeholder"
            :style="{ fontSize: `${fontSize}px`, fontWeight: 500 }"
            :fill="phColor"
            xml:space="preserve"
            aria-hidden="true"
          >
            <textPath :href="`#${layoutPathId}`">{{ placeholder }}</textPath>
          </text>
          <g
            v-if="focused"
            :key="`${display}-${Math.min(caretIndex, display.length)}`"
            :transform="`translate(${round2(content.caretX)} ${round2(content.caretY)}) rotate(${round2(content.caretAngle)})`"
          >
            <line
              :y1="-content.caretH / 2"
              :y2="content.caretH / 2"
              :stroke="fgColor"
              stroke-width="1.5"
              stroke-linecap="round"
            >
              <animate attributeName="opacity" values="1;0" dur="1.06s" calcMode="discrete" repeatCount="indefinite" />
            </line>
          </g>
        </g>

        <g
          v-if="showButton"
          class="group outline-none cursor-pointer"
          role="button"
          tabindex="0"
          :aria-label="buttonText"
          @click.stop="handleSubmit"
          @pointerdown.stop
          @keydown="handleButtonKeydown"
        >
          <path
            class="group-active:brightness-[0.94] group-focus-visible:brightness-[1.18] group-hover:brightness-[1.12] transition-[filter,opacity] duration-200 ease-in-out"
            :d="content.buttonPath"
            :fill="accentColor"
          />
          <path :id="buttonPathId" :d="content.buttonTextPathD" fill="none" />
          <text
            :fill="btnFgColor"
            text-anchor="middle"
            class="pointer-events-none"
            :style="{ fontSize: `${fontSize}px`, fontWeight: 600 }"
          >
            <textPath :href="`#${buttonPathId}`" startOffset="50%">{{ buttonText }}</textPath>
          </text>
        </g>

        <text
          ref="btnMeasureRef"
          :style="{ fontSize: `${fontSize}px`, fontWeight: 600 }"
          x="-9999"
          y="-9999"
          visibility="hidden"
          aria-hidden="true"
        >
          {{ buttonText }}
        </text>
      </svg>
    </template>

    <input
      ref="inputRef"
      class="absolute inset-0 bg-transparent opacity-0 m-0 p-0 border-0 outline-none w-full h-full text-transparent text-base caret-transparent pointer-events-none"
      :type="safeType"
      :inputmode="inputModeValue"
      :name="name"
      :value="val"
      @input="handleInputChange"
      @select="handleSelect"
      @keyup="handleSelect"
      @focus="focused = true"
      @blur="focused = false"
      :aria-label="ariaLabel || placeholder || 'Curved input'"
      autocomplete="off"
      autocapitalize="none"
      autocorrect="off"
      :spellcheck="false"
    />
  </form>
</template>
