#!/usr/bin/env node
/**
 * i18n coverage checker for vue-bits (en ↔ zh-CN).
 *
 * Reports:
 *   1. locale key parity   — every en leaf key must exist in zh-CN
 *   2. real translation    — zh values still byte-identical to en
 *   3. dynamic lookups     — runtime-composed keys, via scripts/i18n-scan.mjs
 *   4. dead keys           — present in zh-CN but not en
 *   5. code references     — $t()/t() keys used in code but absent from both locales
 *
 * Usage: node scripts/i18n-coverage.mjs [--json] [--limit N]
 */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanSource, walk, underscore, camel, resolveState } from './i18n-scan.mjs';

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

function flatten(obj, prefix = '') {
  const out = new Map();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) for (const [kk, vv] of flatten(v, key)) out.set(kk, vv);
    else out.set(key, v);
  }
  return out;
}
const flatEn = flatten(en);
const flatZh = flatten(zh);

/* ── 1/2/4: locale parity ─────────────────────────────────────────────────── */
const missingInZh = [...flatEn.keys()].filter(k => !flatZh.has(k));
const extraInZh = [...flatZh.keys()].filter(k => !flatEn.has(k));

function looksTranslatable(key, value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v || v.length < 2 || !/[A-Za-z]/.test(v)) return false;
  if (!/\s/.test(v) && v.length < 12) return false; // single short token = a name
  if (key.startsWith('componentNames.') || key.startsWith('optionLabels.')) return false;
  if (!/[.!?]/.test(v) && v.split(/\s+/).length <= 2) return false; // proper noun / tech term
  return true;
}
const identical = [...flatEn.entries()]
  .filter(([k, v]) => flatZh.get(k) === v && looksTranslatable(k, v))
  .map(([k, v]) => ({ key: k, value: v }));

/* ── 3: dynamic lookups ───────────────────────────────────────────────────── */
const src = scanSource(ROOT);

const categoryMissing = src.categories.filter(n => !flatZh.has(`categories.${camel(n)}`)).map(n => `categories.${camel(n)}`);
const componentNameMissing = src.componentNames
  .filter(n => !flatZh.has(`componentNames.${underscore(n)}`))
  .map(n => `componentNames.${underscore(n)}`);
const controlsMissing = src.controls.filter(t => !flatZh.has(`controls.${underscore(t)}`)).map(t => `controls.${underscore(t)}`);
// optionLabels can additionally be SHADOWED: the key exists only as an internal
// node because a sibling label contains a dot (e.g. `elastic` under `elastic.out`).
const optionStates = src.optionLabels.map(l => [l, resolveState(zh, `optionLabels.${l}`).state]);
const optionMissing = optionStates.filter(([, st]) => st === 'missing').map(([l]) => `optionLabels.${l}`);
const optionShadowed = optionStates.filter(([, st]) => st === 'shadowed').map(([l]) => `optionLabels.${l}`);
const propMissing = src.propRows
  .filter(r => !flatZh.has(`propDescs.${r.component}.${r.prop}`))
  .map(r => `propDescs.${r.component}.${r.prop}`);

/* ── 5: keys referenced in code that exist in neither locale ───────────────── */
const VAR_KEY = /(?<![\w$])\$?t\(\s*'([^'\\]+)'/g;
const referencedKeys = new Map();
for (const file of walk(join(ROOT, 'src'), p => p.endsWith('.vue') || p.endsWith('.ts'))) {
  for (const m of readFileSync(file, 'utf8').matchAll(VAR_KEY)) {
    if (!referencedKeys.has(m[1])) referencedKeys.set(m[1], relative(ROOT, file));
  }
}
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
    categories: { total: src.categories.length, missing: categoryMissing },
    componentNames: { total: src.componentNames.length, missing: componentNameMissing },
    controls: { total: src.controls.length, missing: controlsMissing },
    optionLabels: { total: src.optionLabels.length, missing: optionMissing, shadowed: optionShadowed },
    propDescs: { total: src.propRows.length, missing: propMissing }
  },
  code: { referenced: referencedKeys.size, unresolved: unresolvedKeys }
};
const dynamicTotal =
  src.categories.length + src.componentNames.length + src.controls.length + src.optionLabels.length + src.propRows.length;
const dynamicMissing =
  categoryMissing.length + componentNameMissing.length + controlsMissing.length + optionMissing.length + propMissing.length;
report.summary = {
  keyCoverage: report.locale.keyCoverage,
  dynamicTotal,
  dynamicMissing,
  dynamicCoverage: dynamicTotal === 0 ? 100 : +(((dynamicTotal - dynamicMissing) / dynamicTotal) * 100).toFixed(2)
};
report.summary.combinedCoverage = +(
  ((flatEn.size - missingInZh.length + dynamicTotal - dynamicMissing) / (flatEn.size + dynamicTotal)) * 100
).toFixed(2);

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const list = (arr, label) => {
  if (!arr.length) return `  ✓ ${label}: 0`;
  const shown = arr.slice(0, LIMIT);
  return [
    `  ✗ ${label}: ${arr.length}`,
    ...shown.map(x => `      - ${x}`),
    arr.length > LIMIT ? `      … +${arr.length - LIMIT} more` : ''
  ]
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

console.log(`\n[2] dynamic lookups (source-driven)`);
console.log(list(categoryMissing, `categories.* (${src.categories.length} categories)`));
console.log(list(componentNameMissing, `componentNames.* (${src.componentNames.length} subcategories)`));
console.log(list(controlsMissing, `controls.* (${src.controls.length} control titles)`));
console.log(list(optionMissing, `optionLabels.* (${src.optionLabels.length} select options)`));
if (optionShadowed.length) {
  console.log(`  ! shadowed by a dotted sibling key (falls back to English): ${optionShadowed.length}`);
  for (const k of optionShadowed.slice(0, LIMIT)) console.log(`      - ${k}`);
}
console.log(list(propMissing, `propDescs.* (${src.propRows.length} prop rows)`));

console.log(`\n[3] code-referenced keys`);
console.log(`  ${referencedKeys.size} static $t()/t() keys found in src/`);
console.log(list(unresolvedKeys, 'referenced in code but absent from BOTH locales'));
if (src.unresolved.length) {
  console.log(`  ! heuristic option sources: ${src.unresolved.length}`);
  for (const u of src.unresolved) console.log(`      - ${u}`);
}

console.log(`\n──── summary ────`);
console.log(`key coverage      : ${report.locale.keyCoverage}%`);
console.log(`dynamic coverage  : ${report.summary.dynamicCoverage}%  (${dynamicMissing} missing / ${dynamicTotal})`);
console.log(`combined          : ${report.summary.combinedCoverage}%`);
if (optionShadowed.length) console.log(`note              : ${optionShadowed.length} optionLabels fall back to English (key path shadowed by a dotted sibling)`);
