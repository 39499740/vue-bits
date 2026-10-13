#!/usr/bin/env node
/**
 * Build the translation worklist for vue-bits and split it into batch files.
 *
 *   node scripts/i18n-gap.mjs --out .i18n-work --batches 8
 *   node scripts/i18n-gap.mjs --merge .i18n-work        # apply out-*.json fragments
 *
 * Worklist entry: { key, kind, en, component? }
 *   kind=componentNames|controls|propDescs -> written to BOTH en.json and zh-CN.json
 *   kind=optionLabels                       -> written to zh-CN.json only
 *
 * Batch file shape:  { "entries": [ ...worklist entries... ] }
 * Output fragment:   { "<key>": "<zh translation>", ... }
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanSource, underscore, camel, escapeIcu } from './i18n-scan.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const LOCALES = join(ROOT, 'src/locales');
const args = process.argv.slice(2);
const argVal = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};

const en = JSON.parse(readFileSync(join(LOCALES, 'en.json'), 'utf8'));
const zh = JSON.parse(readFileSync(join(LOCALES, 'zh-CN.json'), 'utf8'));
const has = (o, path) => {
  let cur = o;
  for (const p of path) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return false;
  }
  return true;
};
const setPath = (o, path, value) => {
  let cur = o;
  for (const p of path.slice(0, -1)) {
    if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    cur = cur[p];
  }
  cur[path[path.length - 1]] = value;
};

const src = scanSource(ROOT);
const kindOfPath = key => (key.startsWith('propDescs.') ? 'propDescs' : key.startsWith('controls.') ? 'controls' : key.startsWith('optionLabels.') ? 'optionLabels' : 'componentNames');

/* ── merge mode ───────────────────────────────────────────────────────────── */
if (args.includes('--merge')) {
  const dir = argVal('--merge');
  const fragments = readdirSync(dir).filter(f => /^out-.*\.json$/.test(f));
  let applied = 0;
  const seen = new Set();
  for (const f of fragments) {
    const map = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const [key, value] of Object.entries(map)) {
      if (typeof value !== 'string' || !value.trim()) continue;
      // every fragment key is a zh-CN translation; the English side comes from
      // the worklist so en.json stays the reference locale. escapeIcu keeps
      // literal @ | { } from being parsed as vue-i18n message syntax.
      setPath(zh, key.split('.'), escapeIcu(value));
      applied++;
      seen.add(key);
    }
  }
  // ensure en.json carries the source English for every non-optionLabels key
  const worklist = existsSync(join(dir, 'worklist.json')) ? JSON.parse(readFileSync(join(dir, 'worklist.json'), 'utf8')) : [];
  for (const e of worklist) {
    if (e.kind === 'optionLabels' || typeof e.en !== 'string' || !e.en) continue;
    setPath(en, e.key.split('.'), escapeIcu(e.en));
  }
  writeFileSync(join(LOCALES, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
  writeFileSync(join(LOCALES, 'en.json'), JSON.stringify(en, null, 2) + '\n');
  console.log(`merged ${fragments.length} fragments · ${applied} translations applied · ${seen.size} distinct keys`);
  process.exit(0);
}

/* ── build mode ───────────────────────────────────────────────────────────── */
const entries = [];

for (const name of src.componentNames) {
  const key = `componentNames.${underscore(name)}`;
  if (!has(zh, key.split('.'))) entries.push({ key, kind: 'componentNames', en: name });
}
for (const title of src.controls) {
  const key = `controls.${underscore(title)}`;
  if (!has(zh, key.split('.'))) entries.push({ key, kind: 'controls', en: title });
}
for (const label of src.optionLabels) {
  const key = `optionLabels.${label}`;
  if (!has(zh, key.split('.'))) entries.push({ key, kind: 'optionLabels', en: label });
}
for (const row of src.propRows) {
  const key = `propDescs.${row.component}.${row.prop}`;
  if (!has(zh, key.split('.'))) entries.push({ key, kind: 'propDescs', en: row.en ?? row.prop, component: row.component });
}

// balance batches: propDescs dominate, so spread them across all batches and
// distribute the short-label kinds on top.
const batches = Number(argVal('--batches', 8));
const props = entries.filter(e => e.kind === 'propDescs');
const shorts = entries.filter(e => e.kind !== 'propDescs');
const buckets = Array.from({ length: batches }, () => []);
props.forEach((e, i) => buckets[i % batches].push(e));
shorts.forEach((e, i) => buckets[i % batches].push(e));

const out = argVal('--out', '.i18n-work');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'worklist.json'), JSON.stringify(entries, null, 2) + '\n');
const summary = [];
buckets.forEach((bucket, i) => {
  const name = `batch-${String(i + 1).padStart(2, '0')}.json`;
  writeFileSync(join(out, name), JSON.stringify({ entries: bucket }, null, 2) + '\n');
  const byKind = bucket.reduce((acc, e) => ((acc[e.kind] = (acc[e.kind] || 0) + 1), acc), {});
  summary.push(`${name}: ${bucket.length}  ${JSON.stringify(byKind)}`);
});

console.log(`worklist: ${entries.length} entries -> ${out}/`);
console.log(`  componentNames ${entries.filter(e => e.kind === 'componentNames').length}`);
console.log(`  controls       ${entries.filter(e => e.kind === 'controls').length}`);
console.log(`  optionLabels   ${entries.filter(e => e.kind === 'optionLabels').length}`);
console.log(`  propDescs      ${props.length}`);
console.log(summary.join('\n'));
if (src.unresolved.length) console.log(`! heuristic option sources: ${src.unresolved.length}`);
