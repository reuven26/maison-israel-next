import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TOWERS, getTowerBySlug } from '@/data/towers'

const BASE_URL = 'https://luxuryisraelrealestate.com'

export function generateStaticParams() {
  return TOWERS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = getTowerBySlug(slug)
  if (!t) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: t.seoTitle[l],
    description: t.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/towers/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/towers/${slug}`,
        en: `${BASE_URL}/en/towers/${slug}`,
        he: `${BASE_URL}/he/towers/${slug}`,
        'x-default': `${BASE_URL}/en/towers/${slug}`,
      },
    },
    openGraph: {
      title: t.seoTitle[l],
      description: t.metaDescription[l],
      url: `${BASE_URL}/${locale}/towers/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: t.hero ? [{ url: t.hero, alt: t.name[l] }] : undefined,
    },
  }
}

function ApartmentComplexJsonLd({ tower, locale }: { tower: typeof TOWERS[number]; locale: 'fr' | 'en' | 'he' }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: tower.name[locale],
    description: tower.metaDescription[locale],
    image: tower.hero,
    numberOfAccommodationUnits: tower.facts.units,
    address: {
      '@type': 'PostalAddress',
      addressLocality: tower.city[locale],
      addressCountry: 'IL',
    },
    yearBuilt: tower.facts.year,
    floorSize: { '@type': 'QuantitativeValue', unitText: 'square meter' },
    url: `${BASE_URL}/${locale}/towers/${tower.slug}`,
  }
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default async function TowerPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = getTowerBySlug(slug)
  if (!t) notFound()
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  const labels = {
    fr: { year: 'Livraison', floors: 'Étages', units: 'Unités', architect: 'Architecte', priceM2: 'Prix au m²', cta: 'Nous parler de ce programme', back: 'Tous les immeubles' },
    en: { year: 'Delivered', floors: 'Floors', units: 'Units', architect: 'Architect', priceM2: 'Price per m²', cta: 'Speak to us about this building', back: 'All buildings' },
    he: { year: 'נמסר', floors: 'קומות', units: 'יחידות', architect: 'אדריכל', priceM2: 'מחיר למ"ר', cta: 'דברו איתנו על המגדל הזה', back: 'כל המגדלים' },
  }
  const lab = labels[l]

  // Markdown léger : transforme ## titres en <h2>
  function renderBody(md: string) {
    return md.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#FAFAF9', fontWeight: 400, marginTop: '2.5rem', marginBottom: '1rem' }}>{block.replace(/^## /, '')}</h2>
      }
      return <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.98rem', fontWeight: 300, color: 'rgba(212,213,216,0.82)', lineHeight: 1.85, marginBottom: '1.2rem' }}>{block}</p>
    })
  }

  return (
    <>
      <ApartmentComplexJsonLd tower={t} locale={l} />

      <div style={{ background: '#0A0A0B', minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: '60vh', minHeight: '420px', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.hero} alt={t.name[l]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.15) 35%, rgba(10,10,11,0.9) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '3rem', [isRTL ? 'right' : 'left']: 'clamp(1.5rem,5vw,3rem)', color: '#fff', maxWidth: '720px' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {t.city[l]} · {t.quartier}
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '0.8rem' }}>
              {t.name[l]}
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
              {t.tagline[l]}
            </p>
          </div>
        </section>

        {/* FACTS */}
        <section style={{ background: '#111214', padding: '2.5rem clamp(1.5rem,5vw,3rem)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { l: lab.year, v: t.facts.year.toString() },
              { l: lab.floors, v: t.facts.floors.toString() },
              { l: lab.units, v: t.facts.units.toString() },
              { l: lab.architect, v: t.facts.architect },
              { l: lab.priceM2, v: t.facts.pricePerM2 },
            ].map((f, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.4rem' }}>{f.l}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: '#FAFAF9', fontWeight: 400, lineHeight: 1.2 }}>{f.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BODY */}
        <section style={{ padding: '4rem clamp(1.5rem,5vw,3rem) 5rem' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            {renderBody(t.body[l])}

            {/* CTA */}
            <div style={{ marginTop: '3.5rem', padding: '3rem 2rem', background: '#111214', border: '1px solid rgba(200,169,110,0.2)', textAlign: 'center' }}>
              <Link href={`/${locale}/contact?bien=${encodeURIComponent(t.name[l])}`} style={{
                display: 'inline-block', background: '#C8A96E', color: '#0A0A0B',
                padding: '0.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none',
              }}>
                {lab.cta}
              </Link>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href={`/${locale}/towers`} style={{ color: '#8A8B91', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none' }}>
                ← {lab.back}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
