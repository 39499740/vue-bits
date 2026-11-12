import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';
import CategoryLayout from '@/components/layouts/CategoryLayout.vue';

const base = import.meta.env.BASE_URL;

// Sub-path deployments (e.g. https://www.t502.fun/vue-bits/) sit behind a host
// whose only bucket-level error document belongs to another site, so a history
// deep link / refresh would render that other 404 page. Hash history keeps every
// route inside the sub-path (the server only ever has to serve `/vue-bits/`).
// The language parameter deliberately stays in the real query string, giving
// `/vue-bits/?lang=zh-CN#/animations/foo`.
// At the root the previous history mode is kept so local dev is unchanged.
const useHash = base !== '/';
const history = useHash ? createWebHashHistory(base) : createWebHistory(base);

// Minifiers rename imported identifiers, so `grep createWebHashHistory` on the
// production bundle is a false negative (verified 2026-10-13). Property names and
// string literals survive, so expose the resolved mode for the deploy script and
// for post-deploy verification.
if (typeof window !== 'undefined') {
  (window as Window & { __vueBitsRouterMode?: 'hash' | 'history' }).__vueBitsRouterMode = useHash
    ? 'hash'
    : 'history';
}

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/:category/:subcategory',
      component: CategoryLayout,
      children: [
        {
          path: '',
          name: 'category',
          component: CategoryPage
        }
      ]
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage
    }
  ]
});

export default router;
