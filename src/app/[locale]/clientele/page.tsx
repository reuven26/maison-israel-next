import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { CLIENTELE } from '@/data/services-clientele'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Notre Clientèle — Investisseurs, Aliyah, Diplomates',
    description: "Nous accompagnons les investisseurs internationaux, les acheteurs aliyah, les diplomates, et les familles internationales en immobilier israélien.",
    tag: 'Clientèle',
    h1: 'Pour qui nous travaillons',
    subtitle: 'Quatre profils distincts. Une seule approche : un brief privé, un conseiller dédié, et un accès à ce qui ne se trouve pas sur les portails.',
  },
  en: {
    title: 'Our Clients — Investors, Aliyah, Diplomats',
    description: 'We support international investors, aliyah buyers, diplomats, and international families in Israeli real estate.',
    tag: 'Clientele',
    h1: 'Who We Work For',
    subtitle: 'Four distinct profiles. One approach: a private brief, a dedicated advisor, and access to what is not on the portals.',
  },
  he: {
    title: 'הלקוחות שלנו — למי אנו משרתים בישראל',
    description: 'אנחנו מלווים משקיעים בינלאומיים, עולים, דיפלומטים, ומשפחות.',
    tag: 'לקוחות',
    h1: 'למי אנחנו עובדים',
    subtitle: 'ארבעה פרופילים מובחנים. גישה אחת.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/clientele`,
      languages: {
        fr: `${BASE_URL}/fr/clientele`,
        en: `${BASE_URL}/en/clientele`,
        he: `${BASE_URL}/he/clientele`,
        'x-default': `${BASE_URL}/fr/clientele`,
      },
    },
  }
}

export default async function ClienteleIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {CLIENTELE.map((c) => (
            <Link key={c.slug} href={`/${locale}/clientele/${c.slug}`} style={{ textDecoration: 'none' }} className="seo-card">
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}>
                <img src={c.hero} alt={c.names[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.6) 100%)' }} />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                {c.names[l]}
              </h2>
              <p style={{ color: '#8A8B91', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                {c.tagline[l]}
              </p>
              <span style={{ color: '#C8A96E', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                {l === 'he' ? 'גלה ←' : l === 'en' ? 'Discover →' : 'Découvrir →'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ClienteleSeo locale={locale} />

      <style>{`.seo-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}

function ClienteleSeo({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const content = {
    fr: {
      title: 'Un accompagnement adapté à chaque profil',
      paras: [
        "Acheter en Israël n'a pas le même sens selon que l'on soit investisseur international, famille en quête de résidence principale, futur Olé préparant son Aliyah ou diplomate en mission. Chaque profil implique des enjeux fiscaux, juridiques et pratiques spécifiques, que nos conseillers francophones maîtrisent depuis 2009.",
        "Pour les investisseurs internationaux, nous identifions les biens au meilleur potentiel de rendement et de valorisation, avec une analyse claire de la fiscalité applicable aux non-résidents. Pour les familles, nous privilégions la qualité de vie : écoles, synagogues, sécurité et environnement. Les Olim Hadashim bénéficient d'un accompagnement dédié, incluant les avantages fiscaux liés à l'Aliyah (taxe d'achat réduite, exonérations).",
        "Diplomates, dirigeants et familles internationales trouvent chez Maison Israël une discrétion absolue et un service sur mesure, du premier contact jusqu'à la remise des clés. Notre connaissance fine du marché israélien et notre réseau off-market nous permettent de répondre aux demandes les plus exigeantes.",
      ],
    },
    en: {
      title: 'Guidance tailored to every profile',
      paras: [
        "Buying in Israel means different things depending on whether you are an international investor, a family seeking a primary residence, a future Olé preparing for Aliyah, or a diplomat on assignment. Each profile involves specific tax, legal and practical considerations that our advisors have mastered since 2009.",
        "For international investors, we identify properties with the best yield and appreciation potential, with a clear analysis of the taxation applicable to non-residents. For families, we prioritize quality of life: schools, synagogues, security and environment. Olim Hadashim benefit from dedicated support, including the tax advantages linked to Aliyah (reduced purchase tax, exemptions).",
        "Diplomats, executives and international families find at Maison Israël absolute discretion and bespoke service, from first contact to handover. Our deep knowledge of the Israeli market and our off-market network allow us to meet the most demanding requirements.",
      ],
    },
    he: {
      title: 'ליווי מותאם לכל פרופיל',
      paras: [
        'רכישה בישראל משמעותה שונה בין משקיע בינלאומי, משפחה המחפשת דירת מגורים, עולה עתידי המתכונן לעלייה, או דיפלומט בשליחות. לכל פרופיל היבטים מיסויים, משפטיים ומעשיים ייחודיים, שהיועצים שלנו שולטים בהם מאז 2009.',
        'עבור משקיעים בינלאומיים, אנו מאתרים נכסים בעלי פוטנציאל התשואה וההשבחה הטוב ביותר, עם ניתוח ברור של המיסוי החל על תושבי חוץ. עבור משפחות, אנו מעדיפים איכות חיים: בתי ספר, בתי כנסת, ביטחון וסביבה. עולים חדשים נהנים מליווי ייעודי, כולל הטבות המס הקשורות לעלייה (מס רכישה מופחת, פטורים).',
        'דיפלומטים, מנהלים ומשפחות בינלאומיות מוצאים במייזון ישראל דיסקרטיות מוחלטת ושירות מותאם אישית, מהמגע הראשון ועד מסירת המפתחות. ההיכרות המעמיקה שלנו עם השוק הישראלי והרשת הפרטית שלנו מאפשרות לנו לענות על הדרישות התובעניות ביותר.',
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
