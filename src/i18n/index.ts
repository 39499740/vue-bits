import { createI18n } from 'vue-i18n';
import { watch } from 'vue';
import en from '../locales/en.json';
import zhCN from '../locales/zh-CN.json';

export type SupportedLocale = 'en' | 'zh-CN';
const LOCALE_STORAGE_KEY = 'vue-bits-locale';

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-CN': zhCN
  }
});

function getInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam === 'zh-CN' || langParam === 'en') {
    return langParam as SupportedLocale;
  }

  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale === 'zh-CN' || storedLocale === 'en') {
      return storedLocale;
    }
  } catch {
    // Ignore storage access errors and use the default locale.
  }

  return 'en';
}

if (typeof window !== 'undefined') {
  watch(
    i18n.global.locale,
    value => {
      if (value !== 'en' && value !== 'zh-CN') return;
      document.documentElement.lang = value;
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, value);
      } catch {
        // Ignore storage access errors; the URL still identifies explicit changes.
      }
    },
    { immediate: true }
  );
}

export default i18n;
