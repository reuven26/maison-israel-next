import type { Locale } from './config'

const messages = {
  fr: () => import('./messages/fr.json').then(m => m.default),
  en: () => import('./messages/en.json').then(m => m.default),
  he: () => import('./messages/he.json').then(m => m.default),
}

export async function getMessages(locale: Locale) {
  return messages[locale]?.() ?? messages.fr()
}

type Messages = typeof import('./messages/fr.json')

// Dot-notation key resolver
export type TranslationKey = string

export function t(messages: Record<string, any>, key: string): string {
  const parts = key.split('.')
  let result: any = messages
  for (const part of parts) {
    result = result?.[part]
  }
  return typeof result === 'string' ? result : key
}
