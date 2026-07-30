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
    'zh-CN': zhCN
  }
});

function getInitialLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') return 'en';

  // Only switch language via explicit ?lang= param (set by the language switcher)
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam === 'zh-CN' || langParam === 'en') {
    return langParam as SupportedLocale;
  }

  // Default to English
  return 'en';
}

export default i18n;
