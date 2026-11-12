export const BASE_URL = 'https://luxuryisraelrealestate.com'

export const LOCALES = ['fr', 'en', 'he'] as const

/**
 * Balises hreflang pour un chemin donné (sans locale, sans slash final).
 * Exemple : languagesFor('/villes/tel-aviv')
 * Pour la page d'accueil, passer une chaîne vide.
 */
export function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[l] = `${BASE_URL}/${l}${path}`
  languages['x-default'] = `${BASE_URL}/fr${path}`
  return languages
}

/** Canonical auto-référencé pour la locale courante, plus les hreflang. */
export function alternatesFor(locale: string, path: string) {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: languagesFor(path),
  }
}

/**
 * Tronque une description à `max` caractères en coupant sur un espace.
 * Ne modifie pas un texte déjà assez court.
 */
export function clip(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut
  return `${base.replace(/[,;:\-–]$/, '')}…`
}
