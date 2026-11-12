import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { JOURNAL_ARTICLES } from '@/data/journal-articles'
import { QUARTIERS } from '@/data/quartiers'
import { SERVICES, CLIENTELE } from '@/data/services-clientele'
import { PROPERTY_TYPES } from '@/data/property-types'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const villes = ['tel-aviv', 'jerusalem', 'netanya', 'herzliya-pituah', 'caesarea', 'savyon']

const staticTrustPaths = ['/equipe', '/notre-methode', '/biens', '/temoignages', '/presse', '/faq']

const staticPaths = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/projets', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/quartiers', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/observatoire', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/off-market', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/journal', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/clientele', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
]

const legacyGuides = [
  'prix-immobilier-israel-2026',
  'aliyah-immobilier-guide-complet',
  'fiscalite-immobilier-israel-francais',
]

function alternates(path: string) {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = `${BASE_URL}/${l}${path}`
  languages['x-default'] = `${BASE_URL}/${defaultLocale}${path}`
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Static pages × locales
  for (const { path, priority, changeFrequency } of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: alternates(path),
      })
    }
  }

  // City pages
  for (const ville of villes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/villes/${ville}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: alternates(`/villes/${ville}`),
      })
    }
  }

  // Neighborhood pages (highest-intent SEO assets)
  for (const q of QUARTIERS) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/quartiers/${q.city}/${q.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.88,
        alternates: alternates(`/quartiers/${q.city}/${q.slug}`),
      })
    }
  }

  // Trust pages
  for (const path of staticTrustPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.78,
        alternates: alternates(path),
      })
    }
  }

  // Property type sub-pages
  for (const t of PROPERTY_TYPES) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/biens/${t.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: alternates(`/biens/${t.slug}`),
      })
    }
  }

  // Service sub-pages
  for (const s of SERVICES) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${s.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.82,
        alternates: alternates(`/services/${s.slug}`),
      })
    }
  }

  // Clientele sub-pages
  for (const c of CLIENTELE) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/clientele/${c.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.82,
        alternates: alternates(`/clientele/${c.slug}`),
      })
    }
  }

  // Journal articles
  for (const article of JOURNAL_ARTICLES) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/journal/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternates(`/journal/${article.slug}`),
      })
    }
  }

  // Legacy guides (kept for SEO equity)
  for (const slug of legacyGuides) {
    entries.push({
      url: `${BASE_URL}/fr/guides/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
