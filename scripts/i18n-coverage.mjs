#!/usr/bin/env node
/**
 * i18n coverage checker for vue-bits (en ↔ zh-CN).
 *
 * Reports four things:
 *   1. key parity      — every en leaf key must exist in zh-CN
 *   2. real translation — zh values that are byte-identical to en (candidates for "not translated")
 *   3. dynamic lookups  — keys built at runtime from source strings:
 *        controls.<Title_With_Underscores>      (Preview* `title="..."`)
 *        propDescs.<Component>.<propName>       (each demo's PropsTable rows)
 *        componentNames.<Name_With_Underscores> (every Category subcategory)
 *        categories.<camelCase>                 (every Category)
 *        optionLabels.<Label>                   (PreviewSelect string options)
 *   4. extras          — keys present in zh-CN but not in en (dead keys)
 *
 * Usage: node scripts/i18n-coverage.mjs [--json] [--limit N]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const LOCALES = join(ROOT, 'src/locales');
const args = process.argv.slice(2);
const AS_JSON = args.includes('--json');
const LIMIT = (() => {
  const i = args.indexOf('--limit');
  return i >= 0 ? Number(args[i + 1]) || 40 : 40;
})();

const en = JSON.parse(readFileSync(join(LOCALES, 'en.json'), 'utf8'));
const zh = JSON.parse(readFileSync(join(LOCALES, 'zh-CN.json'), 'utf8'));

/* ── helpers ──────────────────────────────────────────────────────────────── */
function flatten(obj, prefix = '') {
  const out = new Map();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [kk, vv] of flatten(v, key)) out.set(kk, vv);
    } else {
      out.set(key, v);
    }
  }
  return out;
}
const flatEn = flatten(en);
const flatZh = flatten(zh);

const has = (map, key) => map.has(key);
const ctrlKey = title => `controls.${String(title).replace(/\s+/g, '_')}`;

function walk(dir, filter = () => true) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p, filter));
    else if (filter(p)) out.push(p);
  }
  return out;
}

/* ── 1/2/4: locale parity ─────────────────────────────────────────────────── */
const missingInZh = [...flatEn.keys()].filter(k => !has(flatZh, k));
const extraInZh = [...flatZh.keys()].filter(k => !has(flatEn, k));

// Values that are translatable sentences but still byte-identical to English.
// Brand names / identifiers / code-ish values are expected to match.
const IDENTICAL_OK = /^(?:[\w.@+\-/ ]*)$/;
function looksTranslatable(key, value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v || v.length < 2) return false;
  if (!/[A-Za-z]/.test(v)) return false; // numbers/symbols only
  if (!/\s/.test(v) && v.length < 12) return false; // single short token = probably a name
  if (key.startsWith('componentNames.') || key.startsWith('optionLabels.')) return false;
  if (/^[{A-Za-z0-9_ .\-+/]*$/.test(v) && IDENTICAL_OK.test(v) && !/[.!?]/.test(v) && v.split(/\s+/).length <= 2) {
    // short phrase with no sentence punctuation: usually a proper noun / tech term
    return false;
  }
  return true;
}
const identical = [...flatEn.entries()]
  .filter(([k, v]) => flatZh.get(k) === v && looksTranslatable(k, v))
  .map(([k, v]) => ({ key: k, value: v }));

/* ── 3: dynamic lookups ───────────────────────────────────────────────────── */
// categories / subcategories
const categoriesSrc = readFileSync(join(ROOT, 'src/constants/Categories.ts'), 'utf8');
const categoryNames = [...categoriesSrc.matchAll(/\bname:\s*'([^']+)'/g)].map(m => m[1]);
const camel = s => s.charAt(0).toLowerCase() + s.slice(1).replace(/\s+(.)/g, (_, c) => c.toUpperCase());

const categoryMissing = categoryNames.filter(n => !flatZh.has(`categories.${camel(n)}`)).map(n => `categories.${camel(n)}`);

// every subcategory listed inside CATEGORIES[].subcategories
const subcategories = [];
for (const block of categoriesSrc.split(/name:\s*'/).slice(1)) {
  const subBlock = block.match(/subcategories:\s*\[([\s\S]*?)\]/);
  if (!subBlock) continue;
  for (const m of subBlock[1].matchAll(/'([^']+)'/g)) subcategories.push(m[1]);
}
const componentNameMissing = [...new Set(subcategories)]
  .filter(s => !flatZh.has(`componentNames.${s.replace(/\s+/g, '_')}`))
  .map(s => `componentNames.${s.replace(/\s+/g, '_')}`);

// demo files: control titles, prop rows, select options
const demoFiles = walk(join(ROOT, 'src/demo'), p => p.endsWith('.vue'));
const controlTitles = new Set();
const optionLabels = new Set();
const propRows = []; // {component, prop}

for (const file of demoFiles) {
  const src = readFileSync(file, 'utf8');
  const component =
    (src.match(/component-name="([^"]+)"/) || [])[1] || basename(file).replace(/Demo\.vue$/, '');

  // Preview* title="..." (sliders, switches, inputs, color pickers, selects)
  for (const m of src.matchAll(/<Preview[A-Za-z]*\b[^>]*?\btitle="([^"]+)"/g)) controlTitles.add(m[1]);
  // PreviewSelect / PreviewInput option labels
  for (const m of src.matchAll(/<Preview(?:Select|Input)\b[^>]*?:options="\[([^\]]*)\]"/g)) {
    for (const o of m[1].matchAll(/'([^']+)'/g)) optionLabels.add(o[1]);
  }
  for (const m of src.matchAll(/<PreviewSelect\b[^>]*?:options="\[([^\]]*)\]"/g)) {
    for (const o of m[1].matchAll(/'([^']+)'/g)) optionLabels.add(o[1]);
  }
  // PropRow entries inside the `props` array
  const propsBlock = src.match(/const props\s*(?::[^=]+)?=\s*\[([\s\S]*?)\n\];/);
  if (propsBlock) {
    for (const m of propsBlock[1].matchAll(/name:\s*'([^']+)'/g)) propRows.push({ component, prop: m[1] });
  }
}

const controlsMissing = [...controlTitles].filter(t => !flatZh.has(ctrlKey(t))).map(ctrlKey);
const optionMissing = [...optionLabels].filter(l => !flatZh.has(`optionLabels.${l}`)).map(l => `optionLabels.${l}`);
const propMissing = propRows.filter(r => !flatZh.has(`propDescs.${r.component}.${r.prop}`)).map(r => `propDescs.${r.component}.${r.prop}`);

const untranslatedControls = [...controlTitles].filter(t => flatZh.has(ctrlKey(t)) && flatZh.get(ctrlKey(t)) === en.controls?.[ctrlKey(t).slice('controls.'.length)]);
const untranslatedOptions = [...optionLabels].filter(l => flatZh.get(`optionLabels.${l}`) === l);

/* ── 5: keys referenced in code that exist in neither locale ───────────────── */
const VAR_KEY = /(?<![\w$])\$?t\(\s*'([^'\\]+)'/g;
const referencedKeys = new Map(); // key -> file
for (const file of walk(join(ROOT, 'src'), p => p.endsWith('.vue') || p.endsWith('.ts'))) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(VAR_KEY)) {
    if (!referencedKeys.has(m[1])) referencedKeys.set(m[1], relative(ROOT, file));
  }
}
// dynamic namespaces referenced as t(`prefix.${...}`) are checked by section 3 instead
const unresolvedKeys = [...referencedKeys.entries()]
  .filter(([k]) => !flatEn.has(k) && !flatZh.has(k))
  .map(([k, f]) => `${k}  (${f})`);

/* ── report ───────────────────────────────────────────────────────────────── */
const report = {
  locale: {
    enLeaves: flatEn.size,
    zhLeaves: flatZh.size,
    keyCoverage: flatEn.size === 0 ? 100 : +(((flatEn.size - missingInZh.length) / flatEn.size) * 100).toFixed(2),
    missingInZh,
    identicalToEnglish: identical,
    extraInZh
  },
  dynamic: {
    categories: { total: categoryNames.length, missing: categoryMissing },
    componentNames: { total: new Set(subcategories).size, missing: componentNameMissing },
    controls: { total: controlTitles.size, missing: controlsMissing, untranslated: untranslatedControls },
    optionLabels: { total: optionLabels.size, missing: optionMissing, untranslated: untranslatedOptions },
    propDescs: { total: propRows.length, missing: propMissing }
  },
  code: { referenced: referencedKeys.size, unresolved: unresolvedKeys }
};
report.summary = {
  keyCoverage: report.locale.keyCoverage,
  dynamicTotal:
    categoryNames.length + new Set(subcategories).size + controlTitles.size + optionLabels.size + propRows.length,
  dynamicMissing:
    categoryMissing.length + componentNameMissing.length + controlsMissing.length + optionMissing.length + propMissing.length
};
report.summary.dynamicCoverage =
  report.summary.dynamicTotal === 0
    ? 100
    : +(((report.summary.dynamicTotal - report.summary.dynamicMissing) / report.summary.dynamicTotal) * 100).toFixed(2);

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const list = (arr, label) => {
  if (!arr.length) return `  ✓ ${label}: 0`;
  const shown = arr.slice(0, LIMIT);
  return [`  ✗ ${label}: ${arr.length}`, ...shown.map(x => `      - ${x}`), arr.length > LIMIT ? `      … +${arr.length - LIMIT} more` : '']
    .filter(Boolean)
    .join('\n');
};

console.log('════ i18n coverage · vue-bits ════');
console.log(`\n[1] locale key parity`);
console.log(`  en leaves ${flatEn.size} · zh leaves ${flatZh.size} · coverage ${report.locale.keyCoverage}%`);
console.log(list(missingInZh, 'missing in zh-CN'));
console.log(`  ! identical to English (candidates): ${identical.length}`);
for (const i of identical.slice(0, LIMIT)) console.log(`      - ${i.key} = ${JSON.stringify(i.value)}`);
console.log(`  ! extra keys in zh-CN (dead): ${extraInZh.length}`);
for (const k of extraInZh.slice(0, 10)) console.log(`      - ${k}`);

console.log(`\n[2] dynamic lookups (source-driven)`);
console.log(list(categoryMissing, `categories.* (${categoryNames.length} categories)`));
console.log(list(componentNameMissing, `componentNames.* (${new Set(subcategories).size} subcategories)`));
console.log(list(controlsMissing, `controls.* (${controlTitles.size} control titles)`));
console.log(list(optionMissing, `optionLabels.* (${optionLabels.size} select options)`));
console.log(list(propMissing, `propDescs.* (${propRows.length} prop rows)`));

console.log(`\n[3] code-referenced keys`);
console.log(`  ${referencedKeys.size} static $t()/t() keys found in src/`);
console.log(list(unresolvedKeys, 'referenced in code but absent from BOTH locales'));

console.log(`\n──── summary ────`);
console.log(`key coverage      : ${report.locale.keyCoverage}%`);
console.log(`dynamic coverage  : ${report.summary.dynamicCoverage}%  (${report.summary.dynamicMissing} missing / ${report.summary.dynamicTotal})`);
console.log(`combined          : ${(
  ((report.locale.enLeaves - missingInZh.length + report.summary.dynamicTotal - report.summary.dynamicMissing) /
    (report.locale.enLeaves + report.summary.dynamicTotal)) *
  100
).toFixed(2)}%`);
