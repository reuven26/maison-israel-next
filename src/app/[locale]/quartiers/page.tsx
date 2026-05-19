import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { QUARTIERS } from '@/data/quartiers'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; h1: string; tag: string; subtitle: string }> = {
  fr: {
    title: 'Quartiers de Luxe en Israël — Talbieh, Neve Tzedek, Rothschild | Maison Israël',
    description: 'Découvrez les quartiers premium d\'Israël : Talbieh, Réhavia, Neve Tzedek, Rothschild, Galei Tchelet. Inventaire curaté par nos conseillers.',
    tag: 'Quartiers',
    h1: 'Les Quartiers Premium d\'Israël',
    subtitle: 'Une géographie de l\'excellence — de Talbieh à Galei Tchelet, les adresses qui définissent le luxe israélien.',
  },
  en: {
    title: 'Luxury Neighborhoods in Israel — Talbiyeh, Neve Tzedek, Rothschild | Maison Israël',
    description: "Discover Israel's prime quarters: Talbiyeh, Rehavia, Neve Tzedek, Rothschild, Galei Tchelet. Inventory curated by our advisors.",
    tag: 'Neighborhoods',
    h1: "Israel's Premium Neighborhoods",
    subtitle: 'A geography of excellence — from Talbiyeh to Galei Tchelet, the addresses that define Israeli luxury.',
  },
  he: {
    title: 'שכונות יוקרה בישראל — טלביה, נווה צדק, רוטשילד | מייזון ישראל',
    description: 'גלה את השכונות הפרמיום של ישראל.',
    tag: 'שכונות',
    h1: 'השכונות הפרמיום של ישראל',
    subtitle: 'גיאוגרפיה של מצוינות — מטלביה לגלי תכלת.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/quartiers`,
      languages: {
        fr: `${BASE_URL}/fr/quartiers`,
        en: `${BASE_URL}/en/quartiers`,
        he: `${BASE_URL}/he/quartiers`,
        'x-default': `${BASE_URL}/fr/quartiers`,
      },
    },
  }
}

const CITY_LABELS: Record<string, { fr: string; en: string; he: string }> = {
  jerusalem: { fr: 'Jérusalem', en: 'Jerusalem', he: 'ירושלים' },
  'tel-aviv': { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
  'herzliya-pituah': { fr: 'Herzliya Pituah', en: 'Herzliya Pituah', he: 'הרצליה פיתוח' },
  caesarea: { fr: 'Césarée', en: 'Caesarea', he: 'קיסריה' },
}

export default async function QuartiersIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Group by city
  const grouped = QUARTIERS.reduce<Record<string, typeof QUARTIERS>>((acc, q) => {
    if (!acc[q.city]) acc[q.city] = []
    acc[q.city].push(q)
    return acc
  }, {})

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
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {Object.entries(grouped).map(([city, quartiers], idx) => (
            <div key={city} style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(200,169,110,0.15)', paddingBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300 }}>
                  {CITY_LABELS[city]?.[l] ?? city}
                </h2>
                <Link href={`/${locale}/villes/${city}`} style={{ color: '#C8A96E', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
                  {l === 'he' ? 'סקירת העיר' : l === 'en' ? 'City overview' : 'Vue de la ville'} →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {quartiers.map((q) => (
                  <Link key={q.slug} href={`/${locale}/quartiers/${q.city}/${q.slug}`} style={{ textDecoration: 'none' }} className="quartier-card">
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
                      <img src={q.hero} alt={q.names[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.6) 100%)' }} />
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.4rem' }}>
                      {q.names[l]}
                    </h3>
                    <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                      {q.tagline[l]}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                      {q.facts.priceRange}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`.quartier-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}
