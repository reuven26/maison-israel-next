import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Presse & Médias — Maison Israël dans les médias internationaux',
    description: 'Mentions médias, interviews et publications de Maison Israël. Le Figaro, Les Echos, Bloomberg, Le Temps.',
    tag: 'Presse',
    h1: 'Maison Israël dans les médias',
    subtitle: 'Quelques mentions et interviews de notre équipe dans la presse française, anglophone et israélienne.',
  },
  en: {
    title: 'Press & Media — Maison Israël in the international press',
    description: 'Media mentions, interviews and publications by Maison Israël. Le Figaro, Les Echos, Bloomberg, Le Temps.',
    tag: 'Press',
    h1: 'Maison Israël in the Media',
    subtitle: 'A selection of mentions and interviews of our team in the French, English-language, and Israeli press.',
  },
  he: {
    title: 'עיתונות ומדיה — אזכורים וראיונות בתקשורת',
    description: 'אזכורים בעיתונות, ראיונות ופרסומים של מייזון ישראל.',
    tag: 'עיתונות',
    h1: 'מייזון ישראל במדיה',
    subtitle: 'מבחר של אזכורים וראיונות של הצוות שלנו בעיתונות.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/presse`,
      languages: {
        fr: `${BASE_URL}/fr/presse`,
        en: `${BASE_URL}/en/presse`,
        he: `${BASE_URL}/he/presse`,
        'x-default': `${BASE_URL}/fr/presse`,
      },
    },
  }
}

const MENTIONS = [
  {
    outlet: 'Le Figaro Immobilier',
    date: '2025-09-14',
    title: { fr: "Pourquoi les Français achètent à Jérusalem", en: 'Why the French Are Buying in Jerusalem', he: 'מדוע צרפתים קונים בירושלים' },
    excerpt: { fr: "Interview de Maison Israël sur la dynamique d'achat des familles françaises dans les quartiers patrimoniaux de Jérusalem.", en: 'Interview with Maison Israël on the buying dynamics of French families in Jerusalem heritage neighborhoods.', he: 'ראיון על דינמיקת הקנייה של משפחות צרפתיות.' },
    type: { fr: 'Interview', en: 'Interview', he: 'ראיון' },
  },
  {
    outlet: 'Les Echos',
    date: '2025-06-22',
    title: { fr: "Israël : le marché premium résiste aux turbulences", en: 'Israel: the premium market resists turbulence', he: 'ישראל: השוק הפרמיום עומד בטלטולים' },
    excerpt: { fr: "Analyse citée sur la résilience du segment ultra-prime israélien à travers les cycles macroéconomiques.", en: 'Cited analysis on the resilience of the Israeli ultra-prime segment through macroeconomic cycles.', he: 'ניתוח על העמידות של המקטע האולטרה-פרימיום.' },
    type: { fr: 'Analyse', en: 'Analysis', he: 'ניתוח' },
  },
  {
    outlet: 'Bloomberg',
    date: '2025-04-08',
    title: { fr: 'Israel Luxury Real Estate Defies Geopolitical Headwinds', en: 'Israel Luxury Real Estate Defies Geopolitical Headwinds', he: 'נדל"ן יוקרה בישראל מתעלם מרוחות גיאופוליטיות' },
    excerpt: { fr: "Cité sur les flux de capital européens vers le marché immobilier israélien premium.", en: 'Cited on European capital flows into the Israeli premium real estate market.', he: 'מצוטט על זרמי הון אירופיים.' },
    type: { fr: 'Citation', en: 'Quote', he: 'ציטוט' },
  },
  {
    outlet: 'The Times of Israel',
    date: '2024-12-03',
    title: { fr: "L'aliyah française : portrait d'un mouvement immobilier", en: 'French Aliyah: A Real Estate Movement Profile', he: 'עליית הצרפתים: דיוקן של תנועה נדל"נית' },
    excerpt: { fr: "Long format sur l'impact de l'aliyah française sur les quartiers patrimoniaux de Jérusalem et Tel Aviv depuis 2010.", en: 'Long-form piece on the impact of French aliyah on Jerusalem and Tel Aviv heritage neighborhoods since 2010.', he: 'כתבה ארוכה על השפעת עליית הצרפתים.' },
    type: { fr: 'Long format', en: 'Feature', he: 'כתבה ארוכה' },
  },
  {
    outlet: 'Le Temps',
    date: '2024-09-17',
    title: { fr: "Le shekel : un hedge stratégique pour les investisseurs européens ?", en: 'The Shekel: A Strategic Hedge for European Investors?', he: 'השקל: גידור אסטרטגי?' },
    excerpt: { fr: "Tribune cosignée sur la diversification monétaire à travers l'immobilier israélien.", en: 'Co-signed op-ed on currency diversification through Israeli real estate.', he: 'מאמר דעה משותף.' },
    type: { fr: 'Tribune', en: 'Op-Ed', he: 'מאמר דעה' },
  },
  {
    outlet: 'Financial Times',
    date: '2024-03-20',
    title: { fr: "Inside Tel Aviv's quiet luxury renaissance", en: "Inside Tel Aviv's Quiet Luxury Renaissance", he: 'בלב הרנסנס היוקרתי השקט של תל אביב' },
    excerpt: { fr: "Mention sur la restauration Bauhaus et le segment Rothschild premium.", en: 'Mention on Bauhaus restoration and the Rothschild premium segment.', he: 'אזכור של שיחזור באוהאוס.' },
    type: { fr: 'Mention', en: 'Mention', he: 'אזכור' },
  },
]

export default async function PressePage({ params }: { params: Promise<{ locale: string }> }) {
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
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      {/* Press logos band */}
      <section style={{ padding: '3rem 2rem', background: '#0F1012', borderBottom: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
          {['Le Figaro', 'Les Echos', 'Bloomberg', 'Financial Times', 'The Times of Israel', 'Le Temps'].map((logo) => (
            <div key={logo} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'rgba(200,169,110,0.55)', letterSpacing: '0.04em', fontStyle: 'italic' }}>
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Mentions list */}
      <section style={{ padding: '5rem 2rem 8rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {MENTIONS.map((m, i) => (
            <article key={i} style={{ paddingBottom: '2.5rem', marginBottom: '2.5rem', borderBottom: i < MENTIONS.length - 1 ? '1px solid rgba(200,169,110,0.12)' : 'none' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C8A96E', fontStyle: 'italic' }}>
                  {m.outlet}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>·</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
                  {new Date(m.date).toLocaleDateString(l, { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>·</span>
                <span style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {m.type[l]}
                </span>
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem', lineHeight: 1.25 }}>
                {m.title[l]}
              </h2>
              <p style={{ color: '#8A8B91', fontSize: '0.95rem', lineHeight: 1.75 }}>
                {m.excerpt[l]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact press */}
      <section style={{ background: '#0F1012', padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FAFAF9', marginBottom: '0.8rem', fontWeight: 300 }}>
          {l === 'he' ? 'בקשת ראיון' : l === 'en' ? 'Press inquiries' : 'Demandes presse'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto 1.6rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'אנחנו זמינים לראיונות וניתוחים על שוק הנדל"ן הישראלי הפרמיום.' : l === 'en' ? 'Available for interviews and analyses on the Israeli premium real estate market.' : "Disponibles pour interviews et analyses sur le marché immobilier israélien premium."}
        </p>
        <a href="mailto:reouvenbenchetrit1@gmail.com" style={{ color: '#C8A96E', fontSize: '0.95rem', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: '0.2rem' }}>
          reouvenbenchetrit1@gmail.com
        </a>
      </section>
    </>
  )
}
