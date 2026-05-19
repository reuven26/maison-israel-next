import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import { createClient } from '@/lib/supabase/server'
import type { Bien } from '@/types'
import PropertyCard from '@/components/public/PropertyCard'
import {
  getQuartierBySlug,
  getAdjacentQuartiers,
  QUARTIERS,
} from '@/data/quartiers'
import { getArticleBySlug } from '@/data/journal-articles'
import { renderMarkdown } from '@/lib/markdown'

const BASE_URL = 'https://immobilierenisrael.com'

export async function generateStaticParams() {
  return QUARTIERS.map((q) => ({ city: q.city, slug: q.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; city: string; slug: string }> }): Promise<Metadata> {
  const { locale, city, slug } = await params
  const q = getQuartierBySlug(slug, city)
  if (!q) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: q.seoTitle[l],
    description: q.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quartiers/${city}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/quartiers/${city}/${slug}`,
        en: `${BASE_URL}/en/quartiers/${city}/${slug}`,
        he: `${BASE_URL}/he/quartiers/${city}/${slug}`,
        'x-default': `${BASE_URL}/fr/quartiers/${city}/${slug}`,
      },
    },
    openGraph: {
      title: q.seoTitle[l],
      description: q.metaDescription[l],
      url: `${BASE_URL}/${locale}/quartiers/${city}/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: [{ url: q.hero, alt: q.names[l] }],
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

export default async function QuartierPage({ params }: { params: Promise<{ locale: string; city: string; slug: string }> }) {
  const { locale, city, slug } = await params
  const q = getQuartierBySlug(slug, city)
  if (!q) notFound()

  const messages = await getMessages(locale as Locale)
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'
  const m = messages

  // Fetch properties matching this quartier
  const supabase = await createClient()
  let query = supabase.from('biens').select('*').eq('ville', q.dbVille).eq('statut', 'actif').eq('off_market', false)
  if (q.dbQuartier) query = query.eq('quartier', q.dbQuartier)
  const { data: biens } = await query.order('created_at', { ascending: false }).limit(6)

  const adjacent = getAdjacentQuartiers(q)
  const relatedArticles = (q.relatedArticles ?? [])
    .map((s) => getArticleBySlug(s))
    .filter((x): x is NonNullable<typeof x> => !!x)

  // Place + Breadcrumb JSON-LD
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${q.names[l]}, ${q.city === 'tel-aviv' ? 'Tel Aviv' : q.city === 'jerusalem' ? 'Jerusalem' : q.city === 'herzliya-pituah' ? 'Herzliya Pituah' : 'Caesarea'}`,
    description: q.metaDescription[l],
    address: {
      '@type': 'PostalAddress',
      addressLocality: q.dbVille,
      addressCountry: 'IL',
    },
    image: q.hero,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: l === 'he' ? 'שכונות' : l === 'en' ? 'Neighborhoods' : 'Quartiers', item: `${BASE_URL}/${locale}/quartiers` },
      { '@type': 'ListItem', position: 3, name: q.names[l], item: `${BASE_URL}/${locale}/quartiers/${city}/${slug}` },
    ],
  }

  const faqSchema = q.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: q.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[l],
      acceptedAnswer: { '@type': 'Answer', text: f.a[l] },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        <img src={q.hero} alt={q.names[l]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.2) 60%)' }} />

        <div style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1rem' }}>
            {q.city === 'tel-aviv' ? 'Tel Aviv' : q.city === 'jerusalem' ? (l === 'he' ? 'ירושלים' : l === 'en' ? 'Jerusalem' : 'Jérusalem') : q.city === 'herzliya-pituah' ? 'Herzliya Pituah' : 'Caesarea'} · {l === 'he' ? 'שכונה' : l === 'en' ? 'Neighborhood' : 'Quartier'}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.05 }}>
            {q.names[l]}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontStyle: 'italic', maxWidth: '720px', margin: '0 auto 1.4rem', fontFamily: 'Cormorant Garamond, serif' }}>
            {q.tagline[l]}
          </p>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
        </div>
      </section>

      {/* Breadcrumb */}
      <nav style={{ background: '#0A0A0B', padding: '1.4rem 2rem', borderBottom: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', fontSize: '0.75rem', color: '#8A8B91' }}>
          <Link href={`/${locale}`} style={{ color: '#8A8B91', textDecoration: 'none' }}>{l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil'}</Link>
          <span style={{ margin: '0 0.7rem', color: 'rgba(200,169,110,0.4)' }}>·</span>
          <Link href={`/${locale}/villes/${q.city}`} style={{ color: '#8A8B91', textDecoration: 'none' }}>
            {q.city === 'jerusalem' ? (l === 'he' ? 'ירושלים' : l === 'en' ? 'Jerusalem' : 'Jérusalem') : q.city === 'tel-aviv' ? 'Tel Aviv' : q.city === 'herzliya-pituah' ? 'Herzliya Pituah' : 'Caesarea'}
          </Link>
          <span style={{ margin: '0 0.7rem', color: 'rgba(200,169,110,0.4)' }}>·</span>
          <span style={{ color: '#C8A96E' }}>{q.names[l]}</span>
        </div>
      </nav>

      {/* Intro + Facts */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '4rem', alignItems: 'start' }} className="quartier-intro-grid">
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.85, fontStyle: 'italic' }}>
              {q.intro[l]}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', borderLeft: isRTL ? 'none' : '1px solid rgba(200,169,110,0.2)', borderRight: isRTL ? '1px solid rgba(200,169,110,0.2)' : 'none', paddingLeft: isRTL ? '0' : '2rem', paddingRight: isRTL ? '2rem' : '0' }}>
            {[
              { label: l === 'he' ? 'טווח מחיר' : l === 'en' ? 'Price Range' : 'Fourchette de prix', value: q.facts.priceRange },
              { label: l === 'he' ? 'גודל טיפוסי' : l === 'en' ? 'Typical Size' : 'Surface typique', value: q.facts.typicalSize[l] },
              { label: l === 'he' ? 'אדריכלות' : l === 'en' ? 'Architecture' : 'Architecture', value: q.facts.architecture[l] },
              { label: l === 'he' ? 'פרופיל קונה' : l === 'en' ? 'Buyer Profile' : 'Profil acheteur', value: q.facts.buyerProfile[l] },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
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

      {/* Long-form sections */}
      <section style={{ padding: '4rem 2rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {q.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300, marginBottom: '1.2rem' }}>
                {s.title[l]}
              </h2>
              {renderMarkdown(s.body[l])}
            </div>
          ))}
        </div>
      </section>

      {/* Available properties */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              {l === 'he' ? 'מלאי' : l === 'en' ? 'Inventory' : 'Inventaire'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.8rem' }}>
              {l === 'he' ? `נכסים זמינים ב${q.names[l]}` : l === 'en' ? `Available in ${q.names[l]}` : `Disponibles à ${q.names[l]}`}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>

          {biens && biens.length > 0 ? (
            <div className="grid-properties">
              {biens.map((b: Bien) => (
                <PropertyCard key={b.id} bien={b} locale={locale} messages={m} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#111214', border: '1px solid rgba(200,169,110,0.12)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#FAFAF9', marginBottom: '0.8rem', fontWeight: 300 }}>
                {l === 'he' ? `המלאי הציבורי ב${q.names[l]} מוגבל כרגע` : l === 'en' ? `Public inventory in ${q.names[l]} is limited at present` : `L'inventaire public à ${q.names[l]} est limité actuellement`}
              </p>
              <p style={{ color: '#8A8B91', fontSize: '0.95rem', marginBottom: '1.6rem', maxWidth: '480px', margin: '0 auto 1.6rem', lineHeight: 1.7 }}>
                {l === 'he' ? 'רוב העסקאות בשכונה זו מתבצעות מחוץ לשוק. אנו מטפלים בבקשות באופן פרטי.' : l === 'en' ? 'Most transactions in this neighbourhood happen off-market. We handle enquiries privately.' : 'La plupart des transactions dans ce quartier se déroulent off-market. Nous traitons les demandes en privé.'}
              </p>
              <Link href={`/${locale}/off-market`} style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.9rem 2.2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginRight: '0.6rem' }}>
                {l === 'he' ? 'תיק מחוץ לשוק' : l === 'en' ? 'Off-Market Portfolio' : 'Portfolio off-market'}
              </Link>
              <Link href={`/${locale}/contact`} style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.9rem 2.2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
                {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Adjacent neighborhoods */}
      {adjacent.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem', textAlign: 'center' }}>
              {l === 'he' ? 'גם בסביבה' : l === 'en' ? 'Also nearby' : 'Également à proximité'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '3rem' }}>
              {l === 'he' ? 'שכונות סמוכות' : l === 'en' ? 'Adjacent Neighborhoods' : 'Quartiers voisins'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`, gap: '1.5rem' }}>
              {adjacent.map((adj) => (
                <Link key={adj.slug} href={`/${locale}/quartiers/${adj.city}/${adj.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#141416', padding: '2rem', borderBottom: '2px solid #C8A96E', transition: 'transform 0.3s' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.5rem' }}>
                    {adj.names[l]}
                  </h3>
                  <p style={{ color: '#8A8B91', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {adj.tagline[l]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {q.faq.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '2.5rem' }}>
              {l === 'he' ? 'שאלות נפוצות' : l === 'en' ? 'Frequently Asked Questions' : 'Questions fréquentes'}
            </h2>
            <div>
              {q.faq.map((f, i) => (
                <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < q.faq.length - 1 ? '1px solid rgba(200,169,110,0.12)' : 'none' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                    {f.q[l]}
                  </h3>
                  <p style={{ color: '#8A8B91', fontSize: '0.98rem', lineHeight: 1.8 }}>
                    {f.a[l]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Journal Articles */}
      {relatedArticles.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
              {l === 'he' ? 'המשך לקרוא' : l === 'en' ? 'Further Reading' : 'À lire ensuite'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {relatedArticles.map((a) => (
                <Link key={a.slug} href={`/${locale}/journal/${a.slug}`} style={{ textDecoration: 'none' }} className="journal-card">
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: '1rem' }}>
                    <img src={a.image} alt={a.imageAlt[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                  </div>
                  <p style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {a.category[l]}
                  </p>
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
          {l === 'he' ? `מחפש ב${q.names[l]}?` : l === 'en' ? `Searching in ${q.names[l]}?` : `Une recherche à ${q.names[l]} ?`}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '500px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'בריף פרטי, אינוונטר ממוין, גישה למחוץ-לשוק. הצוות שלנו זמין להיכרות ישירה.' : l === 'en' ? 'Private brief, curated inventory, off-market access. Our team is available by direct introduction.' : "Brief privé, inventaire curaté, accès off-market. Notre équipe est disponible par introduction directe."}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Discuss in confidence' : 'Échanger en confidentialité'}
        </Link>
      </section>

      <style>{`
        .journal-card:hover img { transform: scale(1.04); }
        @media (max-width: 768px) {
          .quartier-intro-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .quartier-intro-grid > div:last-child { border: none !important; padding: 0 !important; }
        }
      `}</style>
    </>
  )
}
