#!/usr/bin/env node
/**
 * Runtime resolution check for vue-bits i18n.
 *
 * Loads the real vue-i18n instance with the shipped locale files and asserts
 * that every runtime-composed key actually resolves — this catches the class of
 * bug a JSON-level check cannot see (e.g. keys containing `.` are resolved as
 * nested paths by vue-i18n, so a flat `"power3.out"` entry would silently miss).
 *
 * Usage: node scripts/i18n-verify.mjs [--json] [--limit N]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createI18n } from 'vue-i18n';
import { scanSource, underscore, camel, escapeIcu, resolveState } from './i18n-scan.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const args = process.argv.slice(2);
const AS_JSON = args.includes('--json');
const FIX = args.includes('--fix');
const LIMIT = (() => {
  const i = args.indexOf('--limit');
  return i >= 0 ? Number(args[i + 1]) || 30 : 30;
})();

const en = JSON.parse(readFileSync(join(ROOT, 'src/locales/en.json'), 'utf8'));
const zh = JSON.parse(readFileSync(join(ROOT, 'src/locales/zh-CN.json'), 'utf8'));

/* ── optional repair: escape literal @ | { } that break message compilation ── */
if (FIX) {
  const compile = value => {
    const errs = [];
    const orig = console.error;
    console.error = (...a) => errs.push(String(a[0]));
    const probe = createI18n({ legacy: false, locale: 'x', messages: { x: { p: value } } });
    let out = null;
    try {
      out = probe.global.t('p');
    } catch {
      errs.push('throw');
    }
    console.error = orig;
    return errs.length ? null : out;
  };
  let repaired = 0;
  const stillBad = [];
  for (const [name, messages] of [
    ['en', en],
    ['zh-CN', zh]
  ]) {
    const leaves = [];
    (function walk(node, path) {
      for (const [k, v] of Object.entries(node)) {
        const p = [...path, k];
        if (v && typeof v === 'object') walk(v, p);
        else if (typeof v === 'string') leaves.push([node, k, v]);
      }
    })(messages, []);
    for (const [parent, k, value] of leaves) {
      if (!/[{}@|]/.test(value)) continue;
      if (compile(value) !== null) continue;
      const fixed = escapeIcu(value);
      if (compile(fixed) !== null) {
        parent[k] = fixed;
        repaired++;
      } else {
        stillBad.push(`${name}:${k}`);
      }
    }
  }
  writeFileSync(join(ROOT, 'src/locales/en.json'), JSON.stringify(en, null, 2) + '\n');
  writeFileSync(join(ROOT, 'src/locales/zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
  console.log(`--fix: repaired ${repaired} messages` + (stillBad.length ? `; still broken: ${stillBad.join(', ')}` : ''));
}

const i18n = createI18n({ legacy: false, locale: 'zh-CN', fallbackLocale: 'en', messages: { en, 'zh-CN': zh } });

const src = scanSource(ROOT);
const checks = [];
for (const c of src.categories) checks.push(['categories', `categories.${camel(c)}`]);
for (const n of src.componentNames) checks.push(['componentNames', `componentNames.${underscore(n)}`]);
for (const t of src.controls) checks.push(['controls', `controls.${underscore(t)}`]);
for (const l of src.optionLabels) checks.push(['optionLabels', `optionLabels.${l}`]);
for (const r of src.propRows) checks.push(['propDescs', `propDescs.${r.component}.${r.prop}`]);

// resolve against zh-CN only (fallbackLocale is disabled for this probe so a
// missing zh entry is reported even when en would cover it)
i18n.global.fallbackLocale.value = '';
const failures = [];
const shadowed = [];
for (const [kind, key] of checks) {
  const ok = i18n.global.te(key, 'zh-CN');
  const value = ok ? i18n.global.t(key, 'zh-CN') : null;
  if (!ok || value === key || value === null) {
    // a key that exists only as an internal node is shadowed by a dotted sibling
    // label (e.g. `elastic` under `elastic.out`); those fall back to English text
    const state = resolveState(zh, key).state;
    if (state === 'shadowed') shadowed.push({ kind, key });
    else failures.push({ kind, key, resolved: value });
  }
}

const byKind = {};
for (const f of failures) byKind[f.kind] = (byKind[f.kind] || 0) + 1;

if (AS_JSON) {
  console.log(
    JSON.stringify({ total: checks.length, failures: failures.length, shadowed, byKind, detail: failures }, null, 2)
  );
  process.exit(0);
}

console.log(`runtime resolution check · vue-i18n · locale=zh-CN`);
console.log(`  keys probed : ${checks.length}`);
console.log(`  unresolved  : ${failures.length}`);
console.log(`  shadowed    : ${shadowed.length} (falls back to the English label by design)`);
for (const [k, v] of Object.entries(byKind)) console.log(`      ${k}: ${v}`);
for (const f of failures.slice(0, LIMIT)) console.log(`      - [${f.kind}] ${f.key}`);
if (failures.length > LIMIT) console.log(`      … +${failures.length - LIMIT} more`);
