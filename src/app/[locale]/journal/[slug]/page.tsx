import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getArticleBySlug, getRelatedArticles, JOURNAL_ARTICLES } from '@/data/journal-articles'
import { renderMarkdown } from '@/lib/markdown'

const BASE_URL = 'https://immobilierenisrael.com'

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const a = getArticleBySlug(slug)
  if (!a) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: a.seoTitle[l],
    description: a.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/journal/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/journal/${slug}`,
        en: `${BASE_URL}/en/journal/${slug}`,
        he: `${BASE_URL}/he/journal/${slug}`,
        'x-default': `${BASE_URL}/fr/journal/${slug}`,
      },
    },
    openGraph: {
      title: a.seoTitle[l],
      description: a.metaDescription[l],
      url: `${BASE_URL}/${locale}/journal/${slug}`,
      siteName: 'Maison Israël',
      type: 'article',
      publishedTime: a.publishedAt,
      images: [{ url: a.image, alt: a.imageAlt[l] }],
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

export default async function JournalArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const a = getArticleBySlug(slug)
  if (!a) notFound()

  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'
  const related = getRelatedArticles(a, 3)

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.h1[l],
    description: a.metaDescription[l],
    image: a.image,
    datePublished: a.publishedAt,
    dateModified: a.publishedAt,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'Maison Israël',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maison Israël',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${locale}/journal/${slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${BASE_URL}/${locale}/journal` },
      { '@type': 'ListItem', position: 3, name: a.h1[l], item: `${BASE_URL}/${locale}/journal/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '440px', overflow: 'hidden', background: '#0A0A0B' }}>
        <img src={a.image} alt={a.imageAlt[l]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.4) 0%, rgba(10,10,11,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1.2rem' }}>
            {a.category[l]} · {new Date(a.publishedAt).toLocaleDateString(l, { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.1, maxWidth: '900px', marginBottom: '1rem' }}>
            {a.h1[l]}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            {a.readMinutes} {l === 'he' ? 'דקות קריאה' : l === 'en' ? 'min read' : 'min de lecture'}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav style={{ background: '#0A0A0B', padding: '1.4rem 2rem', borderBottom: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: '0.75rem', color: '#8A8B91' }}>
          <Link href={`/${locale}`} style={{ color: '#8A8B91', textDecoration: 'none' }}>
            {l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil'}
          </Link>
          <span style={{ margin: '0 0.7rem', color: 'rgba(200,169,110,0.4)' }}>·</span>
          <Link href={`/${locale}/journal`} style={{ color: '#8A8B91', textDecoration: 'none' }}>
            Journal
          </Link>
          <span style={{ margin: '0 0.7rem', color: 'rgba(200,169,110,0.4)' }}>·</span>
          <span style={{ color: '#C8A96E' }}>{a.category[l]}</span>
        </div>
      </nav>

      {/* Article body */}
      <article style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {renderMarkdown(a.body[l])}
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2.5rem', textAlign: 'center' }}>
              {l === 'he' ? 'המשך לקרוא' : l === 'en' ? 'Continue Reading' : 'Continuer la lecture'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/${locale}/journal/${r.slug}`} style={{ textDecoration: 'none' }} className="journal-card">
                  <div style={{ aspectRatio: '3/2', overflow: 'hidden', marginBottom: '1rem' }}>
                    <img src={r.image} alt={r.imageAlt[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                  </div>
                  <p style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {r.category[l]}
                  </p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, color: '#FAFAF9', lineHeight: 1.25 }}>
                    {r.h1[l]}
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
          {l === 'he' ? 'דיון פרטי על המלאי הנוכחי' : l === 'en' ? 'A Private Conversation About Current Inventory' : 'Un échange confidentiel sur l\'inventaire actuel'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'הצוות שלנו זמין להיכרות ישירה. אין פורטל. אין רשימת תפוצה.' : l === 'en' ? 'Our team is available by direct introduction. No portal. No mailing list.' : 'Notre équipe est disponible par introduction directe. Sans portail, sans liste de diffusion.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
        </Link>
      </section>

      <style>{`
        .journal-card:hover img { transform: scale(1.04); }
        article a:hover { color: #E8C588 !important; }
      `}</style>
    </>
  )
}
