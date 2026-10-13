/**
 * Shared source scanner for the vue-bits i18n tooling.
 *
 * Collects every user-visible string the runtime resolves through vue-i18n
 * dynamic keys, so both the coverage report and the gap worklist agree:
 *
 *   componentNames.<Name_With_Underscores>  sidebar / cards component titles
 *   categories.<camelCase>                  sidebar category titles
 *   controls.<Title_With_Underscores>       Preview* control labels
 *   optionLabels.<Label>                    PreviewSelect / PreviewInput options
 *   propDescs.<Component>.<propName>        props table descriptions
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

export function walk(dir, filter = () => true) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p, filter));
    else if (filter(p)) out.push(p);
  }
  return out;
}

/** `Title With Spaces` -> `Title_With_Spaces` (the key transform used at runtime) */
export const underscore = s => String(s).replace(/\s+/g, '_');
export const camel = s => s.charAt(0).toLowerCase() + s.slice(1).replace(/\s+(.)/g, (_, c) => c.toUpperCase());

/**
 * Escape characters that vue-i18n treats as message syntax but that are plain
 * text in these strings: `@` (linked messages), `|` (plural separator) and
 * `{`/`}` (interpolation). Without this, messages such as
 * `| 属性名 | 类型 |` or `带 @ 前缀` fail to compile and render broken.
 *
 * Valid interpolations (`{count}`, `{name}`) are preserved.
 */
export function escapeIcu(input) {
  if (typeof input !== 'string') return input;
  const keep = [];
  let s = input.replace(/\{([A-Za-z_$][\w$]*)\}/g, m => {
    keep.push(m);
    return `\u0000${keep.length - 1}\u0000`;
  });
  // single pass: a replacement must never be re-scanned by a later rule
  s = s.replace(/[{}@|]/g, ch => ({ '{': "{'{'}", '}': "{'}'}", '@': "{'@'}", '|': "{'|'}" })[ch]);
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[Number(i)]);
  return s;
}

/**
 * How a runtime-composed key resolves inside a vue-i18n message tree.
 *
 * vue-i18n splits keys on `.`, so a label such as `elastic.out` is stored as a
 * NESTED object, which in turn shadows the sibling bare label `elastic`
 * (`optionLabels.elastic` can no longer be a string). Those labels silently fall
 * back to their English text — worth reporting separately instead of pretending
 * they are translated or hiding them as "missing".
 *
 * @returns {{state:'string'|'missing'|'shadowed', value?:string}}
 */
export function resolveState(messages, key) {
  const path = key.split('.');
  let cur = messages;
  for (const p of path) {
    if (!cur || typeof cur !== 'object' || !(p in cur)) return { state: 'missing' };
    cur = cur[p];
  }
  return typeof cur === 'string' ? { state: 'string', value: cur } : { state: 'shadowed' };
}

/** Read one quoted string literal starting at `src[i]` (i points at the quote). */
function readQuoted(src, i, quote) {
  let out = '';
  i += 1;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      out += n === quote ? quote : n === 'n' ? '\n' : n === 't' ? '\t' : n;
      i += 2;
      continue;
    }
    if (c === quote) return { value: out, end: i + 1 };
    out += c;
    i += 1;
  }
  return { value: out, end: i };
}

/** Split an array literal body into top-level items. */
function splitItems(body) {
  const items = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (quote) {
      cur += c;
      if (c === '\\') {
        cur += body[i + 1] ?? '';
        i++;
      } else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c;
      cur += c;
      continue;
    }
    if (c === '[' || c === '{' || c === '(') depth++;
    if (c === ']' || c === '}' || c === ')') depth--;
    if (c === ',' && depth === 0) {
      items.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) items.push(cur);
  return items.map(s => s.trim()).filter(Boolean);
}

/** Labels a PreviewSelect receives from one option item. */
function labelFromItem(item) {
  const str = item.match(/^\s*(['"])((?:\\.|(?!\1).)*)\1\s*$/s);
  if (str) return [str[2].replace(/\\(['"`\\])/g, '$1')];
  const label = item.match(/label\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/s);
  if (label) return [label[2].replace(/\\(['"`\\])/g, '$1')];
  const value = item.match(/value\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/s);
  if (value) return [value[2].replace(/\\(['"`\\])/g, '$1')];
  return [];
}

/** Extract `const NAME = [ ... ]` array bodies, keyed by NAME. */
function collectArrays(src) {
  const arrays = new Map();
  const re = /const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*\[/g;
  let m;
  while ((m = re.exec(src))) {
    const start = re.lastIndex - 1; // at '['
    let depth = 0;
    let quote = null;
    let i = start;
    for (; i < src.length; i++) {
      const c = src[i];
      if (quote) {
        if (c === '\\') i++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') {
        quote = c;
        continue;
      }
      if (c === '[') depth++;
      else if (c === ']') {
        depth--;
        if (depth === 0) break;
      }
    }
    arrays.set(m[1], src.slice(start + 1, i));
  }
  return arrays;
}

export function scanSource(root) {
  const categoriesSrc = readFileSync(join(root, 'src/constants/Categories.ts'), 'utf8');

  const categoryNames = [...categoriesSrc.matchAll(/\bname:\s*'([^']+)'/g)].map(m => m[1]);
  const subcategories = [];
  for (const block of categoriesSrc.split(/name:\s*'/).slice(1)) {
    const sub = block.match(/subcategories:\s*\[([\s\S]*?)\]/);
    if (sub) for (const m of sub[1].matchAll(/'([^']+)'/g)) subcategories.push(m[1]);
  }

  const demoFiles = walk(join(root, 'src/demo'), p => p.endsWith('.vue'));
  const controls = new Map(); // title -> file
  const options = new Map(); // label -> file
  const propRows = []; // { component, prop, en }
  const unresolved = [];

  for (const file of demoFiles) {
    const src = readFileSync(file, 'utf8');
    const component = (src.match(/component-name="([^"]+)"/) || [])[1] || basename(file).replace(/Demo\.vue$/, '');

    for (const m of src.matchAll(/<Preview[A-Za-z]*\b[^>]*?\btitle="([^"]+)"/g)) {
      if (!controls.has(m[1])) controls.set(m[1], file);
    }

    const arrays = collectArrays(src);
    const addOption = label => {
      if (!options.has(label)) options.set(label, file);
    };
    // <Preview* :options="IDENT" />  and  :options="[inline]"
    for (const m of src.matchAll(/<Preview(?:Select|Input)\b[^>]*?:options="([^"]+)"/g)) {
      const ref = m[1].trim();
      if (ref.startsWith('[')) {
        for (const item of splitItems(ref.slice(1, -1))) for (const l of labelFromItem(item)) addOption(l);
      } else if (/^[A-Za-z_$][\w$]*$/.test(ref) && arrays.has(ref)) {
        for (const item of splitItems(arrays.get(ref))) for (const l of labelFromItem(item)) addOption(l);
      } else {
        // computed / keyed source (e.g. `PATTERN_OPTIONS[grid]`): fall back to the
        // union of every array literal in the file so nothing goes untranslated.
        for (const body of arrays.values()) {
          for (const item of splitItems(body)) for (const l of labelFromItem(item)) addOption(l);
        }
        unresolved.push(`options:${ref} (${basename(file)}) -> union of file arrays`);
      }
    }

    // props table rows
    const propsBlock = src.match(/const\s+props\s*(?::[^=]+)?=\s*\[([\s\S]*?)\n\s*\];/);
    if (propsBlock) {
      for (const item of splitItems(propsBlock[1])) {
        const name = item.match(/name\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/s);
        if (!name) continue;
        const desc = item.match(/description\s*:\s*(?:\n\s*)?(['"])((?:\\.|(?!\1).)*)\1/s);
        propRows.push({
          component,
          prop: name[2],
          en: desc ? desc[2].replace(/\\(['"`\\])/g, '$1').replace(/\s+/g, ' ').trim() : null
        });
      }
    }
  }

  return {
    categories: categoryNames,
    componentNames: [...new Set(subcategories)],
    controls: [...controls.keys()],
    optionLabels: [...options.keys()],
    propRows,
    unresolved
  };
}
