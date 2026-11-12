import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import { JOURNAL_ARTICLES } from '@/data/journal-articles'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const PAGE_META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Journal — Immobilier de Luxe en Israël',
    description: "Analyses, guides et perspectives sur l'immobilier de luxe en Israël — Jérusalem, Tel Aviv, Herzliya Pituah, Césarée.",
    tag: 'Journal',
    h1: 'Perspectives sur l\'immobilier de luxe israélien',
    subtitle: "Analyses, guides et observations de marché — écrits avec la même précision que nous appliquons à chaque transaction.",
  },
  en: {
    title: 'Journal — Israeli Luxury Real Estate Insights',
    description: 'Analyses, guides, and perspectives on luxury real estate in Israel — Jerusalem, Tel Aviv, Herzliya Pituah, Caesarea.',
    tag: 'Journal',
    h1: 'Perspectives on Israeli Luxury Real Estate',
    subtitle: 'Analyses, guides, and market observations — written with the same precision we apply to every transaction.',
  },
  he: {
    title: 'יומן — תובנות נדל"ן יוקרה בישראל',
    description: 'ניתוחים, מדריכים ופרספקטיבות על נדל"ן יוקרה בישראל.',
    tag: 'יומן',
    h1: 'פרספקטיבות על נדל"ן יוקרה בישראל',
    subtitle: 'ניתוחים, מדריכים, ותצפיות שוק — כתובים באותה דיוק שאנו מיישמים לכל עסקה.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = PAGE_META[(locale as Locale) || 'fr'] ?? PAGE_META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/journal`,
      languages: {
        fr: `${BASE_URL}/fr/journal`,
        en: `${BASE_URL}/en/journal`,
        he: `${BASE_URL}/he/journal`,
        'x-default': `${BASE_URL}/fr/journal`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/journal`,
      siteName: 'Maison Israël',
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  }
}

export const revalidate = 3600

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const meta = PAGE_META[(locale as Locale) || 'fr'] ?? PAGE_META.fr
  const isRTL = locale === 'he'
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'

  const articles = [...JOURNAL_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

  return (
    <>
      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{
        padding: '6rem 2rem 4rem',
        background: '#0A0A0B',
        borderBottom: '1px solid rgba(200,169,110,0.1)',
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 300,
            color: '#FAFAF9',
            marginBottom: '1.4rem',
            lineHeight: 1.1,
          }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      {/* Featured article */}
      {articles[0] && (
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link href={`/${locale}/journal/${articles[0].slug}`} className="featured-journal-card" style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'center' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                <img src={articles[0].image} alt={articles[0].imageAlt[l]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
                <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: '#C8A96E', color: '#0A0A0B', padding: '4px 10px', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {articles[0].category[l]}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1rem' }}>
                  {new Date(articles[0].publishedAt).toLocaleDateString(l, { year: 'numeric', month: 'long' })} · {articles[0].readMinutes} {l === 'he' ? 'דק׳' : l === 'en' ? 'min read' : 'min de lecture'}
                </p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1rem', lineHeight: 1.15 }}>
                  {articles[0].h1[l]}
                </h2>
                <p style={{ color: '#8A8B91', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.6rem' }}>
                  {articles[0].excerpt[l]}
                </p>
                <span style={{ color: '#C8A96E', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                  {l === 'he' ? 'קרא את המאמר ←' : l === 'en' ? 'Read article →' : "Lire l'article →"}
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section style={{ padding: '4rem 2rem 8rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '2.5rem' }}>
              {l === 'he' ? 'מאמרים נוספים' : l === 'en' ? 'More Articles' : 'Tous les articles'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem 2rem' }}>
              {articles.slice(1).map((a) => (
                <Link key={a.slug} href={`/${locale}/journal/${a.slug}`} style={{ textDecoration: 'none' }} className="journal-card">
                  <div style={{ aspectRatio: '3/2', overflow: 'hidden', position: 'relative', marginBottom: '1.2rem' }}>
                    <img src={a.image} alt={a.imageAlt[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  </div>
                  <p style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    {a.category[l]} · {new Date(a.publishedAt).toLocaleDateString(l, { month: 'short', year: 'numeric' })}
                  </p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.45rem', fontWeight: 400, color: '#FAFAF9', marginBottom: '0.7rem', lineHeight: 1.25 }}>
                    {a.h1[l]}
                  </h3>
                  <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {a.excerpt[l].slice(0, 150)}…
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JournalSeo locale={locale} />

      <style>{`
        .featured-journal-card:hover img { transform: scale(1.04); }
        .journal-card:hover img { transform: scale(1.04); }
        @media (max-width: 768px) {
          .featured-journal-card { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </>
  )
}

function JournalSeo({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const content = {
    fr: {
      title: "Le Journal de l'immobilier israélien",
      paras: [
        "Le Journal de Maison Israël décrypte les tendances du marché immobilier de prestige en Israël : évolution des prix à Tel Aviv, Jérusalem et sur la côte, analyses de quartiers, fiscalité pour les acheteurs étrangers et conseils pratiques pour réussir son acquisition ou son Aliyah.",
        "Nos articles s'appuient sur notre expérience terrain depuis 2009 et sur une veille constante du marché. Vous y trouverez des comparatifs entre villes (Tel Aviv vs Jérusalem), des focus sur les segments ultra-prime comme Herzliya Pituah et Césarée, ainsi que des éclairages sur les opportunités off-market réservées à une clientèle avertie.",
        "Que vous soyez investisseur, futur résident ou simplement curieux du marché israélien, ces analyses vous aident à prendre des décisions éclairées. Pour aller plus loin, nos conseillers francophones restent à votre disposition pour un accompagnement personnalisé.",
      ],
    },
    en: {
      title: 'The Israeli real estate Journal',
      paras: [
        "Maison Israël's Journal decodes the trends of the luxury real estate market in Israel: price movements in Tel Aviv, Jerusalem and along the coast, neighborhood analyses, taxation for foreign buyers, and practical advice to succeed in your acquisition or Aliyah.",
        "Our articles draw on our field experience since 2009 and constant market monitoring. You will find city comparisons (Tel Aviv vs Jerusalem), focuses on ultra-prime segments such as Herzliya Pituah and Caesarea, and insights into off-market opportunities reserved for a discerning clientele.",
        "Whether you are an investor, a future resident, or simply curious about the Israeli market, these analyses help you make informed decisions. To go further, our advisors remain available for personalized guidance.",
      ],
    },
    he: {
      title: 'יומן הנדל"ן הישראלי',
      paras: [
        'היומן של מייזון ישראל מפענח את מגמות שוק נדל"ן היוקרה בישראל: שינויי מחירים בתל אביב, ירושלים ולאורך החוף, ניתוחי שכונות, מיסוי לקונים זרים וטיפים מעשיים להצלחה ברכישה או בעלייה.',
        'המאמרים שלנו מתבססים על ניסיון השטח שלנו מאז 2009 ועל מעקב מתמיד אחר השוק. תמצאו השוואות בין ערים (תל אביב מול ירושלים), התמקדות במגזרים האולטרה-פרימיום כמו הרצליה פיתוח וקיסריה, ותובנות על הזדמנויות מחוץ לשוק השמורות לקהל מבין.',
        'בין אם אתם משקיעים, תושבים עתידיים, או פשוט סקרנים לגבי השוק הישראלי, הניתוחים הללו מסייעים לכם לקבל החלטות מושכלות. להעמקה נוספת, היועצים שלנו עומדים לרשותכם לליווי אישי.',
      ],
    },
  }
  const c = content[(locale as keyof typeof content)] ?? content.fr
  return (
    <section style={{ background: '#0A0A0B', padding: '4rem clamp(1.25rem,5vw,3rem) 5rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.6rem' }}>{c.title}</h2>
        {c.paras.map((para, i) => (
          <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,213,216,0.8)', lineHeight: 1.85, marginBottom: '1.2rem' }}>{para}</p>
        ))}
      </div>
    </section>
  )
}
