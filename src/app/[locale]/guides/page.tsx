import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Article } from '@/types'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/seo'
import { getMessages } from '@/i18n'

export const revalidate = 60

const GUIDES_META = {
  fr: {
    title: 'Guides immobiliers en Israël',
    description: "Guides pratiques pour acheter, investir et vous installer en Israël : fiscalité, prix immobiliers, aliyah.",
  },
  en: {
    title: 'Real estate guides for Israel',
    description: 'Practical guides to buying, investing and settling in Israel: taxes, property prices, aliyah.',
  },
  he: {
    title: 'מדריכי נדל"ן בישראל',
    description: 'מדריכים מעשיים לרכישה, השקעה והתיישבות בישראל: מיסוי, מחירי נדל"ן ועלייה.',
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = (locale === 'en' || locale === 'he' ? locale : 'fr') as keyof typeof GUIDES_META
  return { ...GUIDES_META[lang], alternates: alternatesFor(locale, '/guides') }
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const g = messages.guides
  const isRTL = locale === 'he'

  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('statut', 'publie')
    .order('date_publication', { ascending: false })

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(locale === 'he' ? 'he-IL' : locale === 'en' ? 'en-GB' : 'fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  }

  return (
    <>
      {/* HERO */}
      <div style={{
        paddingTop: '120px',
        background: '#0A0A0B',
        paddingBottom: '5rem',
        textAlign: 'center',
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1,
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
            {g.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 300, marginBottom: '1rem' }}>
            {g.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>{g.subtitle}</p>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <section className="section-pad" style={{ background: '#0A0A0B', minHeight: '60vh', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {!articles?.length ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: '#C8A96E', marginBottom: '1.5rem' }}>✦</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#FAFAF9', marginBottom: '1rem' }}>{g.no_articles}</p>
              <Link href={`/${locale}/contact`} style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.9rem 2.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
                {messages.hero.cta_consult}
              </Link>
            </div>
          ) : (
            <div className="grid-properties">
              {articles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/guides/${article.slug}`}
                  className="pcard"
                >
                  <div className="pcard-img-wrap" style={{ aspectRatio: '16/9', height: 'auto' }}>
                    {article.image ? (
                      <img src={article.image} alt={article.titre} className="pcard-img" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #111214 0%, #1C1D20 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: '#C8A96E', opacity: 0.3 }}>✦</span>
                      </div>
                    )}
                    <div className="pcard-overlay" />
                    <div className="pcard-badges">
                      <span className="pbadge pbadge-gold">{article.categorie}</span>
                    </div>
                  </div>
                  <div className="pcard-body" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                    <h3 className="pcard-name" style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{article.titre}</h3>
                    {article.extrait && (
                      <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {article.extrait}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: '1rem' }}>
                      {article.date_publication && (
                        <span style={{ fontSize: '0.75rem', color: '#4A4B50' }}>
                          {formatDate(article.date_publication)}
                        </span>
                      )}
                      <span style={{ fontSize: '0.75rem', color: '#C8A96E', fontWeight: 500 }}>
                        {g.read_more} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
