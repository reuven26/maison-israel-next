export const locales = ['fr', 'en', 'he'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'fr'
export const rtlLocales: Locale[] = ['he']

export function isRTL(locale: Locale) {
  return rtlLocales.includes(locale)
}
