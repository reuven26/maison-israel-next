import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Votre Conseiller — Reuven Benchetrit',
    description: "Reuven Benchetrit, fondateur de Maison Israël — représentation discrète d'une clientèle fortunée dans l'immobilier de prestige en Israël depuis 2009.",
    tag: 'Votre conseiller',
    h1: 'Reuven Benchetrit',
    subtitle: "Un seul interlocuteur, du premier échange à la remise des clés. Discrétion, clarté stratégique, et un réseau privé bâti sur des relations de longue date.",
  },
  en: {
    title: 'Your Advisor — Reuven Benchetrit',
    description: 'Reuven Benchetrit, founder of Maison Israël — discreet representation of high-net-worth clients in Israeli luxury real estate since 2009.',
    tag: 'Your advisor',
    h1: 'Reuven Benchetrit',
    subtitle: 'A single point of contact, from the first conversation to the handover of keys. Discretion, strategic clarity, and a private network built on long-standing relationships.',
  },
  he: {
    title: 'היועץ שלך — ראובן בנשטרית',
    description: 'ראובן בנשטרית, מייסד מייזון ישראל — ייצוג דיסקרטי של לקוחות אמידים בנדל"ן יוקרה בישראל מאז 2009.',
    tag: 'היועץ שלך',
    h1: 'ראובן בנשטרית',
    subtitle: 'איש קשר אחד, מהשיחה הראשונה ועד מסירת המפתחות. דיסקרטיות, בהירות אסטרטגית ורשת פרטית שנבנתה על קשרים ארוכי שנים.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/equipe`,
      languages: {
        fr: `${BASE_URL}/fr/equipe`,
        en: `${BASE_URL}/en/equipe`,
        he: `${BASE_URL}/he/equipe`,
        'x-default': `${BASE_URL}/fr/equipe`,
      },
    },
  }
}

/* Profil fondateur — contenu factuel uniquement (pas de chiffres non vérifiables) */
const FOUNDER = {
  name: 'Reuven Benchetrit',
  role: { fr: 'Fondateur · Conseiller principal', en: 'Founder · Principal Advisor', he: 'מייסד · יועץ ראשי' },
  languages: ['Français', 'English', 'עברית'],
  bio: {
    fr: [
      "Reuven Benchetrit représente une clientèle fortunée et ultra-fortunée à travers tout Israël. Son travail se distingue par la discrétion, la clarté stratégique et l'accès à un réseau privé bâti au fil de relations de longue date.",
      "Plutôt que de rechercher le volume, Reuven aborde chaque mission avec précision — conseillant ses clients sur les acquisitions, les ventes discrètes et les opportunités off-market qui exigent une négociation réfléchie et une confiance absolue.",
      "Qu'il s'agisse d'orchestrer une acquisition d'envergure ou de positionner discrètement un bien au sein d'un réseau choisi, l'exigence reste la même : une stratégie raffinée, des relations qui comptent, et des résultats obtenus au plus haut niveau.",
    ],
    en: [
      'Reuven Benchetrit represents high net worth and ultra high net worth clients across Israel. His work is defined by discretion, strategic clarity, and access to a private network built through long-standing relationships.',
      'Rather than pursuing volume, Reuven approaches each engagement with precision — advising clients on acquisitions, discreet sales, and off-market opportunities that require thoughtful negotiation and absolute trust.',
      "Whether navigating a significant purchase or quietly positioning a property within a select network, the standard remains the same: refined strategy, meaningful relationships, and results achieved at the highest level.",
    ],
    he: [
      'ראובן בנשטרית מייצג לקוחות אמידים ובעלי הון רב ברחבי ישראל. עבודתו מתאפיינת בדיסקרטיות, בבהירות אסטרטגית ובגישה לרשת פרטית שנבנתה לאורך שנים.',
      'במקום לרדוף אחר כמות, ראובן ניגש לכל משימה בדיוק — מייעץ ברכישות, במכירות דיסקרטיות ובהזדמנויות מחוץ לשוק הדורשות אמון מוחלט.',
      'בין אם מדובר ברכישה משמעותית ובין אם במיקום שקט של נכס ברשת נבחרת — הסטנדרט נשאר זהה: אסטרטגיה מעודנת ותוצאות ברמה הגבוהה ביותר.',
    ],
  },
  specialties: {
    fr: 'Off-market · Acquisitions · Ventes discrètes · Aliyah · Tel Aviv · Jérusalem · Herzliya Pituah · Netanya',
    en: 'Off-market · Acquisitions · Discreet sales · Aliyah · Tel Aviv · Jerusalem · Herzliya Pituah · Netanya',
    he: 'מחוץ לשוק · רכישות · מכירות דיסקרטיות · עלייה · תל אביב · ירושלים · הרצליה פיתוח · נתניה',
  },
}

export default async function EquipePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Person JSON-LD — rattaché à l'entité fondateur du site
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#founder`,
    name: 'Réouven Benchetrit',
    alternateName: ['Reuven Benchetrit'],
    jobTitle: FOUNDER.role[l],
    description: FOUNDER.bio[l][0],
    worksFor: { '@type': 'RealEstateAgent', name: 'Maison Israël', url: BASE_URL },
    knowsLanguage: ['fr', 'en', 'he'],
    sameAs: ['https://www.instagram.com/luxuryrealestateisrael/'],
    url: `${BASE_URL}/${locale}/equipe`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.1 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      {/* Profil fondateur */}
      <section style={{ padding: '5rem 2rem 6rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', background: '#0F1012', padding: 'clamp(2rem, 5vw, 3.5rem)', borderTop: '2px solid #C8A96E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', marginBottom: '2.2rem', flexWrap: 'wrap' }}>
            {/* Monogramme — remplacé par le portrait dès qu'il est fourni */}
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#C8A96E', letterSpacing: '0.05em' }}>RB</span>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.3rem' }}>
                {FOUNDER.name}
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                {FOUNDER.role[l]}
              </p>
            </div>
          </div>

          {FOUNDER.bio[l].map((para, i) => (
            <p key={i} style={{ color: '#D4D5D8', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.2rem' }}>
              {para}
            </p>
          ))}

          <div style={{ paddingTop: '1.4rem', marginTop: '0.6rem', borderTop: '1px solid rgba(200,169,110,0.12)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.4rem' }}>
            <div>
              <div style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {l === 'he' ? 'התמחויות' : l === 'en' ? 'Specialties' : 'Spécialités'}
              </div>
              <div style={{ color: '#8A8B91', fontSize: '0.85rem', lineHeight: 1.7 }}>{FOUNDER.specialties[l]}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {l === 'he' ? 'שפות' : l === 'en' ? 'Languages' : 'Langues'}
              </div>
              <div style={{ color: '#8A8B91', fontSize: '0.85rem' }}>{FOUNDER.languages.join(' · ')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? 'נתחיל בשיחה' : l === 'en' ? 'Let us begin with a conversation' : 'Commençons par une conversation'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'שיחה ראשונית דיסקרטית, ללא התחייבות.' : l === 'en' ? 'A discreet initial conversation, with no commitment.' : 'Un premier échange discret, sans engagement.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact' : 'Nous contacter'}
        </Link>
      </section>
    </>
  )
}
