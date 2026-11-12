import type { Metadata } from 'next'
import Link from 'next/link'
import { TOWERS } from '@/data/towers'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META = {
  fr: { title: 'Tours résidentielles de luxe en Israël', description: 'Akirov, Meier-on-Rothschild, W Residences, Midtown Jerusalem : les tours résidentielles ultra-prime suivies par Maison Israël.', h1: 'Tours résidentielles de luxe en Israël', sub: 'Les programmes signés qui ont redéfini le standing résidentiel.' },
  en: { title: 'Luxury Residential Towers in Israel', description: 'Akirov, Meier-on-Rothschild, W Residences, Midtown Jerusalem: the ultra-prime residential towers covered by Maison Israël.', h1: 'Luxury Residential Towers in Israel', sub: 'The signature programs that redefined residential standing.' },
  he: { title: 'מגדלי מגורים יוקרה בישראל — הפרויקטים החתומים', description: 'אקירוב, מאייר על רוטשילד, W Residences, מידטאון ירושלים.', h1: 'מגדלי מגורים יוקרה בישראל', sub: 'הפרויקטים החתומים שהגדירו מחדש את הסטנדרט המגורי.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in META ? locale : 'en') as keyof typeof META
  return {
    title: META[l].title,
    description: META[l].description,
    alternates: {
      canonical: `${BASE_URL}/${l}/towers`,
      languages: {
        fr: `${BASE_URL}/fr/towers`,
        en: `${BASE_URL}/en/towers`,
        he: `${BASE_URL}/he/towers`,
        'x-default': `${BASE_URL}/en/towers`,
      },
    },
  }
}

export default async function TowersIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const m = META[l]
  const isRTL = locale === 'he'

  return (
    <div style={{ background: '#0A0A0B', minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
      <section style={{ padding: '9rem clamp(1.5rem,5vw,3rem) 4rem', textAlign: 'center', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.4rem' }}>
            {locale === 'he' ? 'מגדלים' : locale === 'en' ? 'Towers' : 'Tours'}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem,5vw,3.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.15 }}>{m.h1}</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: 300, color: 'rgba(212,213,216,0.8)', lineHeight: 1.7 }}>{m.sub}</p>
        </div>
      </section>

      <section style={{ padding: '5rem clamp(1.5rem,5vw,3rem)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {TOWERS.map(t => (
            <Link key={t.slug} href={`/${locale}/towers/${t.slug}`} style={{ textDecoration: 'none' }} className="tower-card">
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.hero} alt={t.name[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(10,10,11,0.7) 100%)' }} />
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.4rem' }}>
                {t.city[l]} · {t.quartier}
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.5rem' }}>
                {t.name[l]}
              </h2>
              <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.65, fontStyle: 'italic' }}>
                {t.tagline[l]}
              </p>
              <p style={{ fontSize: '0.72rem', color: '#C8A96E', letterSpacing: '0.15em', marginTop: '0.7rem' }}>
                {t.facts.pricePerM2} {locale === 'he' ? 'למ"ר' : '/ m²'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <style>{`.tower-card:hover img { transform: scale(1.04); }`}</style>
    </div>
  )
}
