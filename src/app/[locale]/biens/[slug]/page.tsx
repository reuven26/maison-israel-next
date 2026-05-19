import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import { createClient } from '@/lib/supabase/server'
import type { Bien } from '@/types'
import PropertyCard from '@/components/public/PropertyCard'
import { PROPERTY_TYPES, getPropertyTypeBySlug } from '@/data/property-types'
import { getArticleBySlug } from '@/data/journal-articles'
import { getQuartierBySlug } from '@/data/quartiers'
import { renderMarkdown } from '@/lib/markdown'

const BASE_URL = 'https://immobilierenisrael.com'

export async function generateStaticParams() {
  return PROPERTY_TYPES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = getPropertyTypeBySlug(slug)
  if (!t) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: t.seoTitle[l],
    description: t.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/biens/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/biens/${slug}`,
        en: `${BASE_URL}/en/biens/${slug}`,
        he: `${BASE_URL}/he/biens/${slug}`,
        'x-default': `${BASE_URL}/fr/biens/${slug}`,
      },
    },
    openGraph: {
      title: t.seoTitle[l],
      description: t.metaDescription[l],
      url: `${BASE_URL}/${locale}/biens/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: [{ url: t.hero, alt: t.names[l] }],
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

export default async function PropertyTypePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = getPropertyTypeBySlug(slug)
  if (!t) notFound()

  const messages = await getMessages(locale as Locale)
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Fetch matching live inventory
  const supabase = await createClient()
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .in('type', t.dbTypes)
    .eq('statut', 'actif')
    .eq('off_market', false)
    .order('created_at', { ascending: false })
    .limit(9)

  const relatedQuartiers = (t.relatedQuartiers ?? [])
    .map((s) => getQuartierBySlug(s))
    .filter((x): x is NonNullable<typeof x> => !!x)
  const relatedArticles = (t.relatedArticles ?? [])
    .map((s) => getArticleBySlug(s))
    .filter((x): x is NonNullable<typeof x> => !!x)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: l === 'he' ? 'סוגי נכסים' : l === 'en' ? 'Property Types' : 'Types de biens', item: `${BASE_URL}/${locale}/biens` },
      { '@type': 'ListItem', position: 3, name: t.names[l], item: `${BASE_URL}/${locale}/biens/${slug}` },
    ],
  }

  const faqSchema = t.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[l],
      acceptedAnswer: { '@type': 'Answer', text: f.a[l] },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '440px', overflow: 'hidden', background: '#0A0A0B' }}>
        <img src={t.hero} alt={t.names[l]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.4) 0%, rgba(10,10,11,0.9) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1.2rem' }}>
            {l === 'he' ? 'סוג נכס' : l === 'en' ? 'Property Type' : 'Type de bien'}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            {t.h1[l]}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.2rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontStyle: 'italic', maxWidth: '660px', fontFamily: 'Cormorant Garamond, serif' }}>
            {t.tagline[l]}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.32rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.85, fontStyle: 'italic' }}>
            {t.intro[l]}
          </p>
        </div>
      </section>

      {/* Facts */}
      <section style={{ padding: '0 2rem 5rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(200,169,110,0.06)', padding: '2.5rem', borderTop: '1px solid rgba(200,169,110,0.25)', borderBottom: '1px solid rgba(200,169,110,0.25)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { label: l === 'he' ? 'טווח מחיר' : l === 'en' ? 'Price Range' : 'Fourchette', value: t.facts.priceRange },
              { label: l === 'he' ? 'גודל טיפוסי' : l === 'en' ? 'Typical Size' : 'Surface typique', value: t.facts.typicalSize[l] },
              { label: l === 'he' ? 'שכונות מובילות' : l === 'en' ? 'Best Neighborhoods' : 'Meilleurs quartiers', value: t.facts.bestNeighborhoods[l] },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {f.label}
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: '#FAFAF9', lineHeight: 1.4 }}>
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section style={{ padding: '3rem 2rem 5rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {t.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300, marginBottom: '1.2rem' }}>
                {s.title[l]}
              </h2>
              {renderMarkdown(s.body[l])}
            </div>
          ))}
        </div>
      </section>

      {/* Live inventory */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              {l === 'he' ? 'מלאי נוכחי' : l === 'en' ? 'Current Inventory' : 'Inventaire actuel'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9' }}>
              {l === 'he' ? `${t.names[l]} זמינים` : l === 'en' ? `Available ${t.names[l]}` : `${t.names[l]} disponibles`}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '1rem auto 0' }} />
          </div>
          {biens && biens.length > 0 ? (
            <div className="grid-properties">
              {biens.map((b: Bien) => (
                <PropertyCard key={b.id} bien={b} locale={locale} messages={messages} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#111214', maxWidth: '600px', margin: '0 auto', border: '1px solid rgba(200,169,110,0.12)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', marginBottom: '0.8rem', fontWeight: 300 }}>
                {l === 'he' ? 'המלאי הציבורי מוגבל כרגע' : l === 'en' ? 'Public inventory limited at present' : "L'inventaire public est limité actuellement"}
              </p>
              <p style={{ color: '#8A8B91', fontSize: '0.92rem', marginBottom: '1.6rem', maxWidth: '440px', margin: '0 auto 1.6rem', lineHeight: 1.7 }}>
                {l === 'he' ? 'רוב הנכסים בקטגוריה זו מתבצעים מחוץ לשוק.' : l === 'en' ? 'Most properties in this category transact off-market.' : 'La plupart des biens de cette catégorie se négocient off-market.'}
              </p>
              <Link href={`/${locale}/off-market`} style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.9rem 2.2rem', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>
                {l === 'he' ? 'תיק מחוץ-לשוק' : l === 'en' ? 'Off-Market Portfolio' : 'Portfolio off-market'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {t.faq.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '2.5rem' }}>
              {l === 'he' ? 'שאלות נפוצות' : l === 'en' ? 'Frequently Asked Questions' : 'Questions fréquentes'}
            </h2>
            {t.faq.map((f, i) => (
              <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < t.faq.length - 1 ? '1px solid rgba(200,169,110,0.12)' : 'none' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {f.q[l]}
                </h3>
                <p style={{ color: '#8A8B91', fontSize: '0.98rem', lineHeight: 1.8 }}>
                  {f.a[l]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related quartiers */}
      {relatedQuartiers.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
              {l === 'he' ? 'איפה' : l === 'en' ? 'Where' : 'Où'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {relatedQuartiers.map((q) => (
                <Link key={q.slug} href={`/${locale}/quartiers/${q.city}/${q.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#141416', padding: '1.6rem', borderBottom: '2px solid #C8A96E' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.3rem' }}>
                    {q.names[l]}
                  </h3>
                  <p style={{ color: '#8A8B91', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {q.tagline[l]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
              {l === 'he' ? 'המשך לקרוא' : l === 'en' ? 'Further Reading' : 'À lire ensuite'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {relatedArticles.map((a) => (
                <Link key={a.slug} href={`/${locale}/journal/${a.slug}`} style={{ textDecoration: 'none' }} className="seo-card">
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: '1rem' }}>
                    <img src={a.image} alt={a.imageAlt[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#FAFAF9', lineHeight: 1.3 }}>
                    {a.h1[l]}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? `מחפש ${t.names[l]}?` : l === 'en' ? `Searching for ${t.names[l]}?` : `Une recherche de ${t.names[l]} ?`}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'בריף פרטי, גישה למחוץ-לשוק.' : l === 'en' ? 'Private brief, off-market access.' : 'Brief privé, accès off-market.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Discuss in confidence' : 'Échanger en confidentialité'}
        </Link>
      </section>

      <style>{`.seo-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}
