import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Article } from '@/types'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { alternatesFor, clip } from '@/lib/seo'
import { getMessages } from '@/i18n'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const supabase = await createClient()
  const { data: article } = await supabase
    .from('articles')
    .select('titre, extrait, image')
    .eq('slug', slug)
    .eq('statut', 'publie')
    .single()
  if (!article) return {}
  const description = clip(article.extrait || '')
  const alt = alternatesFor(locale, `/guides/${slug}`)
  return {
    title: article.titre,
    description,
    alternates: alt,
    openGraph: {
      type: 'article',
      title: article.titre,
      description,
      url: alt.canonical,
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const messages = await getMessages(locale as Locale)
  const g = messages.guides
  const isRTL = locale === 'he'

  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('statut', 'publie')
    .single()

  if (!article) notFound()

  const { data: related } = await supabase
    .from('articles')
    .select('id, slug, titre, extrait, image, categorie, date_publication')
    .eq('statut', 'publie')
    .neq('slug', slug)
    .limit(3)

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(
      locale === 'he' ? 'he-IL' : locale === 'en' ? 'en-GB' : 'fr-FR',
      { day: 'numeric', month: 'long', year: 'numeric' }
    )
  }

  const paragraphs = (article.contenu || '').split('\n').filter((p: string) => p.trim().length > 0)

  return (
    <>
      {/* HERO with full-width image */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        {article.image ? (
          <img
            src={article.image}
            alt={article.titre}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0A0B 0%, #1a1a2e 50%, #0A0A0B 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.3) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px', padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ display: 'inline-block', background: '#C8A96E', color: '#0A0A0B', padding: '0.25rem 0.8rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            {article.categorie}
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem' }}>
            {article.titre}
          </h1>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {article.auteur && (
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                {article.auteur}
              </span>
            )}
            {article.date_publication && (
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                {g.published_on} {formatDate(article.date_publication)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT + SIDEBAR */}
      <section style={{ padding: '4rem 2rem 6rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '4rem', alignItems: 'start' }}>

          {/* Main content */}
          <article>
            {article.extrait && (
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#D4D5D8', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic', borderLeft: isRTL ? 'none' : '3px solid #C8A96E', borderRight: isRTL ? '3px solid #C8A96E' : 'none', paddingLeft: isRTL ? '0' : '1.5rem', paddingRight: isRTL ? '1.5rem' : '0' }}>
                {article.extrait}
              </p>
            )}
            <div style={{ background: '#111214', padding: '3rem', border: '1px solid rgba(200,169,110,0.1)' }}>
              {paragraphs.map((para: string, i: number) => (
                <p key={i} style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1rem' }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {article.tags.map((tag: string) => (
                  <span key={tag} style={{ background: 'rgba(200,169,110,0.1)', color: '#C8A96E', padding: '0.3rem 0.8rem', fontSize: '0.75rem', border: '1px solid rgba(200,169,110,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back link */}
            <div style={{ marginTop: '3rem' }}>
              <Link href={`/${locale}/guides`} style={{ color: '#C8A96E', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                ← {g.title}
              </Link>
            </div>
          </article>

          {/* Sidebar: Related */}
          <aside style={{ position: 'sticky', top: '120px' }}>
            {related && related.length > 0 && (
              <div>
                <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.25em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
                  {locale === 'he' ? 'מאמרים קשורים' : locale === 'en' ? 'Related articles' : 'Articles similaires'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {related.map((rel: any) => (
                    <Link
                      key={rel.id}
                      href={`/${locale}/guides/${rel.slug}`}
                      style={{ textDecoration: 'none', display: 'flex', gap: '1rem', background: '#111214', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.1)' }}
                    >
                      {rel.image && (
                        <img
                          src={rel.image}
                          alt={rel.titre}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', flexShrink: 0 }}
                        />
                      )}
                      <div style={{ padding: '0.8rem 0.8rem 0.8rem 0', flex: 1 }}>
                        <div style={{ fontSize: '0.6rem', color: '#C8A96E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                          {rel.categorie}
                        </div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#D4D5D8', lineHeight: 1.3 }}>
                          {rel.titre}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA box */}
            <div style={{ background: '#0A0A0B', padding: '2rem', marginTop: '2rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.8rem', fontWeight: 300 }}>
                {messages.cta_band.title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {messages.cta_band.subtitle}
              </p>
              <Link href={`/${locale}/contact`} style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.8rem 1.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
                {messages.cta_band.button}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
