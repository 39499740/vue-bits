/**
 * Base-path helpers for runtime asset URLs.
 *
 * Bundler-resolved assets (`import x from '@/assets/...'`) are rewritten by Vite
 * automatically. Assets that live in `public/` and are referenced by a plain
 * runtime string (`'/assets/videos/foo.webm'`) are NOT — Vite copies them
 * verbatim and leaves the string alone, so the browser would request them from
 * the domain root instead of the deployment sub-path.
 *
 * Every such string must go through `withBase()` so the app keeps working when
 * it is hosted under a sub-path (`base: '/vue-bits/'`) as well as at the root.
 */

function resolveBase(): string {
  try {
    // Replaced at build time by Vite with the resolved `base` value.
    const value = import.meta.env.BASE_URL;
    return typeof value === 'string' && value.length > 0 ? value : '/';
  } catch {
    // Not running under Vite (plain Node evaluation) — assume root.
    return '/';
  }
}

export const baseUrl: string = resolveBase();

/**
 * Prefixes a root-absolute path with the configured base.
 *
 * - `withBase('/assets/a.png')` → `/vue-bits/assets/a.png` (sub-path build)
 * - `withBase('/assets/a.png')` → `/assets/a.png`         (root build)
 *
 * Non-absolute values (`''`, `https://…`, `data:…`, `#hash`) are returned as-is,
 * so it is safe to wrap optional/empty prop values.
 */
export function withBase(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  return `${baseUrl.replace(/\/+$/, '')}${path}`;
}

export default withBase;
