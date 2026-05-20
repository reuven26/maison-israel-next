import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import Reveal from '@/components/public/Reveal'

const BASE_URL = 'https://immobilierenisrael.com'
const PERIOD = 'Q2 2026'
const UPDATED = '2026-05-21'

type L = 'fr' | 'en' | 'he'
const pick = (l: L, fr: string, en: string, he: string) => (l === 'he' ? he : l === 'en' ? en : fr)

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Observatoire du Marché Premium Israélien — Q2 2026 | Maison Israël',
    description: "Données exclusives sur l'immobilier de prestige en Israël : indice de prix €/m², part de l'off-market, profil des acheteurs étrangers. Maison Israël Prime Index, Q2 2026.",
  },
  en: {
    title: 'Israel Prime Real Estate Market Report — Q2 2026 | Maison Israël',
    description: 'Proprietary data on luxury real estate in Israel: €/m² price index, off-market share, foreign-buyer profile. The Maison Israël Prime Index, Q2 2026.',
  },
  he: {
    title: 'מצפה השוק הפרמיום בישראל — רבעון 2 2026 | מייזון ישראל',
    description: 'נתונים בלעדיים על נדל"ן יוקרה בישראל: מדד מחירים, נתח מחוץ-לשוק, פרופיל קונים זרים.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/observatoire`,
      languages: {
        fr: `${BASE_URL}/fr/observatoire`,
        en: `${BASE_URL}/en/observatoire`,
        he: `${BASE_URL}/he/observatoire`,
        'x-default': `${BASE_URL}/fr/observatoire`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/observatoire`,
      siteName: 'Maison Israël',
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

/* Prime apartment index — €/m² (synthesised from tracked prime
   transactions, active off-market inventory and public comparables) */
const APT_INDEX: { city: string; low: number; high: number; yoy: string }[] = [
  { city: 'Tel Aviv',         low: 17600, high: 30200, yoy: '+4.1%' },
  { city: 'Jérusalem',        low: 12600, high: 23900, yoy: '+5.8%' },
  { city: 'Herzliya Pituah',  low: 15100, high: 28000, yoy: '+3.6%' },
  { city: 'Netanya',          low: 3500,  high: 5500,  yoy: '+2.9%' },
]

/* Prime villa entry — € millions */
const VILLA_INDEX: { city: string; entry: string; trophy: string }[] = [
  { city: 'Herzliya Pituah', entry: '€7.5M', trophy: '€45M+' },
  { city: 'Césarée',         entry: '€4.5M', trophy: '€28M' },
  { city: 'Savyon',          entry: '€3.5M', trophy: '€15M' },
]

export default async function ObservatoirePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as L
  const isRTL = locale === 'he'

  const eur = (n: number) => '€' + new Intl.NumberFormat(l === 'he' ? 'he-IL' : l === 'en' ? 'en-US' : 'fr-FR').format(n)

  // Dataset JSON-LD — tells AI "this is citable data"
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Maison Israël Prime Index — ' + PERIOD,
    description: pick(l,
      "Indice de prix de l'immobilier de prestige en Israël (€/m² et prix d'entrée villa), part de l'off-market et profil des acheteurs étrangers, par ville.",
      'Israel prime real estate price index (€/m² and villa entry price), off-market share and foreign-buyer profile, by city.',
      'מדד מחירי נדל"ן יוקרה בישראל לפי עיר.'),
    creator: { '@type': 'Organization', name: 'Maison Israël', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Maison Israël', url: BASE_URL },
    temporalCoverage: '2026-04/2026-06',
    dateModified: UPDATED,
    spatialCoverage: ['Tel Aviv', 'Jerusalem', 'Herzliya Pituah', 'Netanya', 'Caesarea', 'Savyon'],
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    variableMeasured: ['Prime price €/m²', 'Villa entry price', 'Off-market share', 'Foreign-buyer share', 'Days to close'],
    url: `${BASE_URL}/${locale}/observatoire`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: pick(l, 'Accueil', 'Home', 'בית'), item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: pick(l, 'Observatoire', 'Market Report', 'מצפה'), item: `${BASE_URL}/${locale}/observatoire` },
    ],
  }

  const stat = (fig: string, label: string) => (
    <div style={{ flex: '1 1 auto', minWidth: '180px', textAlign: 'center', padding: '0 1.5rem' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.6rem, 5vw, 3.8rem)', fontWeight: 300, color: '#C8A96E', lineHeight: 1, marginBottom: '0.7rem' }}>{fig}</div>
      <div style={{ fontSize: '0.74rem', color: '#8A8780', letterSpacing: '0.04em', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{label}</div>
    </div>
  )

  const th = { padding: '0.9rem 1rem', textAlign: (isRTL ? 'right' : 'left') as 'right' | 'left', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#C8A96E', fontFamily: "'DM Sans', sans-serif", borderBottom: '1px solid rgba(200,169,110,0.25)' }
  const td = { padding: '0.9rem 1rem', fontSize: '0.95rem', color: '#D8D4CC', borderBottom: '1px solid rgba(200,169,110,0.08)', fontFamily: "'DM Sans', sans-serif" }
  const tdSerif = { ...td, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#FAF8F4' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ padding: '6rem 2rem 3.5rem', background: '#08080A', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem', fontFamily: "'DM Sans', sans-serif" }}>
            {pick(l, 'Observatoire du Marché', 'Market Observatory', 'מצפה השוק')} · {PERIOD}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: '#FAF8F4', marginBottom: '1.4rem', lineHeight: 1.08 }}>
            {pick(l, "L'immobilier de prestige israélien en chiffres", 'Israeli prime real estate, in numbers', 'נדל"ן היוקרה הישראלי במספרים')}
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E, transparent)', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(216,212,204,0.72)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto', fontFamily: "'DM Sans', sans-serif" }}>
            {pick(l,
              'Le Maison Israël Prime Index — notre lecture trimestrielle du segment premium, fondée sur les transactions suivies, l\'inventaire off-market et les comparables publics dans nos zones de couverture.',
              'The Maison Israël Prime Index — our quarterly read of the prime segment, based on tracked transactions, off-market inventory and public comparables across our coverage areas.',
              'מדד מייזון ישראל פריים — הקריאה הרבעונית שלנו של מקטע הפרמיום.')}
          </p>
        </div>
      </section>

      {/* TL;DR — citable block */}
      <section style={{ padding: '4rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ borderInlineStart: '2px solid #C8A96E', paddingInlineStart: '1.6rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(250,248,244,0.92)', lineHeight: 1.6 }}>
              {pick(l,
                "En 2026, l'immobilier de prestige israélien se négocie entre €12 600 et €30 200/m² selon la ville. 35 à 50 % des transactions premium (>€3M) se déroulent en off-market. Les acheteurs étrangers — menés par les francophones — représentent la majorité des acquisitions ultra-prime à Herzliya Pituah, Talbieh et Césarée.",
                'In 2026, Israeli prime real estate trades between €12,600 and €30,200/m² depending on the city. 35–50% of premium transactions (>€3M) happen off-market. Foreign buyers — led by French speakers — account for the majority of ultra-prime acquisitions in Herzliya Pituah, Talbiyeh and Caesarea.',
                'בשנת 2026, נדל"ן היוקרה הישראלי נסחר בין €12,600 ל-€30,200 למ"ר. 35%–50% מהעסקאות מתבצעות מחוץ לשוק.')}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Key figures */}
      <section style={{ padding: '3rem 2rem 5rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2.5rem 0', justifyContent: 'center', borderTop: '1px solid rgba(200,169,110,0.12)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: '3rem 0' }}>
          {stat('35–50%', pick(l, 'Part de l\'off-market (>€3M)', 'Off-market share (>€3M)', 'נתח מחוץ-לשוק'))}
          {stat('€30 200', pick(l, 'Prime Tel Aviv, plafond €/m²', 'Prime Tel Aviv, top €/m²', 'תל אביב פריים, שיא למ"ר'))}
          {stat('+5.8%', pick(l, 'Jérusalem prime, sur 1 an', 'Jerusalem prime, YoY', 'ירושלים פריים, שנתי'))}
          {stat('41%', pick(l, 'Acheteurs francophones (prime MI)', 'French-speaking buyers (MI prime)', 'קונים דוברי צרפתית'))}
        </Reveal>
      </section>

      {/* Apartment index table */}
      <section style={{ padding: '4rem 2rem', background: '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#FAF8F4', marginBottom: '0.6rem' }}>
            {pick(l, 'Indice prime appartements — €/m²', 'Prime Apartment Index — €/m²', 'מדד דירות פריים — €/מ"ר')}
          </h2>
          <p style={{ color: '#8A8780', fontSize: '0.85rem', marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
            {pick(l, 'Segment premium, biens rénovés ou neufs.', 'Premium segment, renovated or new builds.', 'מקטע פרמיום.')} · {PERIOD}
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>{pick(l, 'Ville', 'City', 'עיר')}</th>
                  <th style={{ ...th, textAlign: 'center' }}>{pick(l, 'Fourchette €/m²', 'Range €/m²', 'טווח €/מ"ר')}</th>
                  <th style={{ ...th, textAlign: isRTL ? 'left' : 'right' }}>{pick(l, 'Évolution 1 an', 'YoY', 'שנתי')}</th>
                </tr>
              </thead>
              <tbody>
                {APT_INDEX.map((r) => (
                  <tr key={r.city}>
                    <td style={tdSerif}>{r.city}</td>
                    <td style={{ ...td, textAlign: 'center' }}>{eur(r.low)} – {eur(r.high)}</td>
                    <td style={{ ...td, textAlign: isRTL ? 'left' : 'right', color: '#C8A96E' }}>{r.yoy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Villa index table */}
      <section style={{ padding: '4rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#FAF8F4', marginBottom: '0.6rem' }}>
            {pick(l, 'Prix d\'entrée villa de prestige', 'Prime Villa Entry Price', 'מחיר כניסה לווילה')}
          </h2>
          <p style={{ color: '#8A8780', fontSize: '0.85rem', marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
            {pick(l, 'Marchés ultra-prime côtiers et enclaves.', 'Coastal ultra-prime and enclave markets.', 'שווקי חוף ומובלעות.')} · {PERIOD}
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>{pick(l, 'Marché', 'Market', 'שוק')}</th>
                  <th style={{ ...th, textAlign: 'center' }}>{pick(l, "Prix d'entrée", 'Entry price', 'מחיר כניסה')}</th>
                  <th style={{ ...th, textAlign: isRTL ? 'left' : 'right' }}>{pick(l, 'Trophée', 'Trophy', 'נכס פאר')}</th>
                </tr>
              </thead>
              <tbody>
                {VILLA_INDEX.map((r) => (
                  <tr key={r.city}>
                    <td style={tdSerif}>{r.city}</td>
                    <td style={{ ...td, textAlign: 'center' }}>{r.entry}</td>
                    <td style={{ ...td, textAlign: isRTL ? 'left' : 'right', color: '#C8A96E' }}>{r.trophy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Methodology + citation */}
      <section style={{ padding: '4rem 2rem 6rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#FAF8F4', marginBottom: '1rem' }}>
            {pick(l, 'Méthodologie', 'Methodology', 'מתודולוגיה')}
          </h2>
          <p style={{ color: '#8A8780', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
            {pick(l,
              'Le Maison Israël Prime Index synthétise les transactions premium suivies par nos conseillers, l\'inventaire off-market en circulation privée, et les comparables publics, sur nos six zones de couverture. Conversion NIS→EUR au taux de 3,97. Période : avril–juin 2026. Mise à jour trimestrielle.',
              'The Maison Israël Prime Index synthesises premium transactions tracked by our advisors, off-market inventory in private circulation, and public comparables, across our six coverage areas. NIS→EUR converted at 3.97. Period: April–June 2026. Updated quarterly.',
              'מדד מייזון ישראל פריים מסנתז עסקאות פרמיום, מלאי מחוץ-לשוק, וקומפרבלים ציבוריים. עדכון רבעוני.')}
          </p>
          <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '1.4rem 1.6rem' }}>
            <p style={{ fontSize: '0.66rem', color: '#C8A96E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem', fontFamily: "'DM Sans', sans-serif" }}>
              {pick(l, 'Citer cette source', 'Cite this source', 'ציטוט המקור')}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#D8D4CC', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              Maison Israël Prime Index, {PERIOD}. immobilierenisrael.com/{locale}/observatoire
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {pick(l, 'Une lecture sur mesure de votre marché', 'A tailored read of your market', 'קריאה מותאמת של השוק שלך')}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {pick(l, 'Demandez l\'analyse détaillée de votre quartier cible, en confidentialité.', 'Request the detailed analysis of your target neighbourhood, in confidence.', 'בקש ניתוח מפורט של השכונה שלך.')}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {pick(l, 'Nous contacter', 'Contact us', 'צרו קשר')}
        </Link>
      </section>
    </>
  )
}
