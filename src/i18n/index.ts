import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import zhCN from '../locales/zh-CN.json';

export type SupportedLocale = 'en' | 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-CN': zhCN,
  },
});

function getInitialLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') return 'en';

  // Check URL param first (?lang=zh-CN)
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam === 'zh-CN' || langParam === 'en') {
    return langParam as SupportedLocale;
  }

  // Check browser language
  const navLang = navigator.language;
  if (navLang.startsWith('zh')) {
    return 'zh-CN';
  }

  return 'en';
}

export default i18n;
