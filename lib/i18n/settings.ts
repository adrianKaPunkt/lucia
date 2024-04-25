export const fallbackLng = 'en';
export const languages = ['en', 'de'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

// export const i18nConfig = {
//   locales: ['en-US', 'de', 'fr'],
//   defaultLocale: 'en-US',
// };

// export type Locale = (typeof i18nConfig)['locales'][number];
