import Link from 'next/link'
import type { LandingPage } from '@/data/services-clientele'
import { renderMarkdown } from '@/lib/markdown'
import { getQuartierBySlug } from '@/data/quartiers'
import { getArticleBySlug } from '@/data/journal-articles'

interface Props {
  page: LandingPage
  locale: string
}

export default function SeoLandingPage({ page, locale }: Props) {
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  const relatedQuartiers = (page.relatedQuartiers ?? [])
    .map((slug) => getQuartierBySlug(slug))
    .filter((x): x is NonNullable<typeof x> => !!x)
  const relatedArticles = (page.relatedArticles ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((x): x is NonNullable<typeof x> => !!x)

  return (
    <>
      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '440px', overflow: 'hidden', background: '#0A0A0B' }}>
        <img src={page.hero} alt={page.names[l]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.42 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.92) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1.2rem' }}>
            {page.category === 'service' ? (l === 'he' ? 'שירות' : l === 'en' ? 'Service' : 'Service') : (l === 'he' ? 'לקוחות' : l === 'en' ? 'Clientele' : 'Clientèle')}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.1, maxWidth: '900px', marginBottom: '1.2rem' }}>
            {page.h1[l]}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontStyle: 'italic', maxWidth: '660px', fontFamily: 'Cormorant Garamond, serif' }}>
            {page.tagline[l]}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.85, fontStyle: 'italic', textAlign: isRTL ? 'right' : 'left' }}>
            {page.intro[l]}
          </p>
        </div>
      </section>

      {/* Sections */}
      <section style={{ padding: '3rem 2rem 5rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {page.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300, marginBottom: '1.2rem' }}>
                {s.title[l]}
              </h2>
              {renderMarkdown(s.body[l])}
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      {page.process && page.process.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                {l === 'he' ? 'תהליך' : l === 'en' ? 'Process' : 'Notre processus'}
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9' }}>
                {l === 'he' ? 'איך אנו עובדים' : l === 'en' ? 'How we work' : 'Comment nous travaillons'}
              </h2>
              <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '1rem auto 0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {page.process.map((step, i) => (
                <div key={i} style={{ position: 'relative', padding: '0 1rem' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: 'rgba(200,169,110,0.4)', fontWeight: 300, lineHeight: 1, marginBottom: '1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                    {step.title[l]}
                  </h3>
                  <p style={{ color: '#8A8B91', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {step.desc[l]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faq.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '2.5rem' }}>
              {l === 'he' ? 'שאלות נפוצות' : l === 'en' ? 'Frequently Asked Questions' : 'Questions fréquentes'}
            </h2>
            <div>
              {page.faq.map((f, i) => (
                <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < page.faq.length - 1 ? '1px solid rgba(200,169,110,0.12)' : 'none' }}>
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

      {/* Related quartiers */}
      {relatedQuartiers.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem', textAlign: 'center' }}>
              {l === 'he' ? 'שכונות רלוונטיות' : l === 'en' ? 'Relevant neighborhoods' : 'Quartiers concernés'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '2.5rem' }}>
              {l === 'he' ? 'איפה אנחנו פועלים' : l === 'en' ? 'Where we work' : 'Où nous opérons'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {relatedQuartiers.map((q) => (
                <Link key={q.slug} href={`/${locale}/quartiers/${q.city}/${q.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#141416', padding: '1.8rem', borderBottom: '2px solid #C8A96E' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.4rem' }}>
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
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
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
          {page.ctaHeadline[l]}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '540px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {page.ctaSubtitle[l]}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
        </Link>
      </section>

      <style>{`.seo-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}
