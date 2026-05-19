import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { PROPERTY_TYPES } from '@/data/property-types'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Types de Biens — Penthouses, Villas, Patrimoine | Maison Israël',
    description: 'Explorez l\'immobilier de prestige en Israël par type — penthouses, villas, maisons mandataires, propriétés bord de mer.',
    tag: 'Types de biens',
    h1: 'Explorer par type de propriété',
    subtitle: 'Chaque catégorie a sa géographie, son profil acheteur, et sa logique de valeur.',
  },
  en: {
    title: 'Property Types — Penthouses, Villas, Heritage | Maison Israël',
    description: 'Explore Israeli luxury real estate by type — penthouses, villas, Mandate heritage houses, seafront properties.',
    tag: 'Property types',
    h1: 'Explore by Property Type',
    subtitle: 'Each category has its own geography, buyer profile, and value logic.',
  },
  he: {
    title: 'סוגי נכסים | מייזון ישראל',
    description: 'גלה את הנדל"ן היוקרתי בישראל לפי סוג.',
    tag: 'סוגי נכסים',
    h1: 'גלה לפי סוג נכס',
    subtitle: 'לכל קטגוריה יש גיאוגרפיה, פרופיל קונה והגיון ערך משלה.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/biens`,
      languages: {
        fr: `${BASE_URL}/fr/biens`,
        en: `${BASE_URL}/en/biens`,
        he: `${BASE_URL}/he/biens`,
        'x-default': `${BASE_URL}/fr/biens`,
      },
    },
  }
}

export default async function BiensIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  return (
    <>
      <div style={{ paddingTop: '80px' }} />
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.1 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem 8rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {PROPERTY_TYPES.map((t) => (
            <Link key={t.slug} href={`/${locale}/biens/${t.slug}`} style={{ textDecoration: 'none' }} className="seo-card">
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}>
                <img src={t.hero} alt={t.names[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.6) 100%)' }} />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.5rem' }}>
                {t.names[l]}
              </h2>
              <p style={{ color: '#8A8B91', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                {t.tagline[l]}
              </p>
              <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                {t.facts.priceRange}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <style>{`.seo-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}
