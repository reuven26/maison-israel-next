import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'

const BASE_URL = 'https://immobilierenisrael.com'

const villes = ['tel-aviv', 'jerusalem', 'netanya', 'herzliya-pituah', 'caesarea', 'sde-dov', 'neve-tzedek', 'rothschild']

const staticPaths = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/projets', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
]

const blogArticles = [
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

  for (const ville of villes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/villes/${ville}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: alternates(`/villes/${ville}`),
      })
    }
  }

  for (const slug of blogArticles) {
    entries.push({
      url: `${BASE_URL}/fr/guides/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  return entries
}
