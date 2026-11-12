import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META = {
  fr: {
    title: 'Pourquoi choisir Maison Israël — Agence immobilière de luxe en Israël',
    description: 'Sept raisons concrètes de choisir Maison Israël pour acheter ou investir en immobilier de prestige en Israël : portefeuille off-market, conseillers trilingues, expertise fiscale, 350+ transactions depuis 2009.',
    h1: 'Pourquoi choisir Maison Israël',
  },
  en: {
    title: 'Why Choose Maison Israël — Luxury Real Estate Agency in Israel',
    description: 'Seven concrete reasons to choose Maison Israël for buying or investing in luxury Israeli real estate: off-market portfolio, multilingual advisors, tax expertise, 350+ transactions since 2009.',
    h1: 'Why Choose Maison Israël',
  },
  he: {
    title: 'מדוע לבחור במייזון ישראל — סוכנות נדל"ן יוקרה בישראל',
    description: 'שבע סיבות קונקרטיות לבחור במייזון ישראל לרכישת נדל"ן יוקרה בישראל: תיק מחוץ-לשוק, יועצים רב-לשוניים, מומחיות מיסויית.',
    h1: 'מדוע לבחור במייזון ישראל',
  },
} as const

const REASONS = {
  fr: [
    { n: '01', t: 'Un nombre restreint de clients, jamais industriel', d: 'Maison Israël accompagne moins de cent familles par an. Ce choix garantit qu\'un conseiller dédié vous est attribué pour toute la durée de votre projet, du premier appel à la remise des clés.' },
    { n: '02', t: 'Portefeuille off-market de quarante propriétés', d: 'L\'agence maintient un portefeuille privé d\'environ quarante propriétés ultra-prime, de 6 à 45 millions d\'euros, jamais inscrites sur les portails publics. Accès conditionné à un mandat de recherche signé.' },
    { n: '03', t: 'Conseillers trilingues sur le terrain', d: 'Chaque conseiller parle français, hébreu et anglais. Présence physique permanente à Tel Aviv, avec déplacements réguliers à Jérusalem, Herzliya Pituah et Césarée pour les visites privées.' },
    { n: '04', t: 'Expertise fiscale dédiée aux non-résidents et Olim', d: 'Notre expert fiscalité internationale construit le scénario optimal pour chaque famille : taxe d\'achat non-résident vs Olé Hadash, structures Trust ou SCI israélienne, optimisation de la plus-value à la revente.' },
    { n: '05', t: 'Quinze ans de marché, trois cycles traversés', d: 'Fondée en 2009, Maison Israël a accompagné ses clients à travers les cycles 2010-2014, 2015-2019 et 2020-2024. Cette mémoire de marché informe chacun de nos arbitrages.' },
    { n: '06', t: 'Plus de trois cent cinquante transactions signées', d: 'Plus de 350 acquisitions réalisées depuis 2009, dont 60% en off-market sur Tel Aviv. Taux de satisfaction client de 98% mesuré annuellement.' },
    { n: '07', t: 'Une seule promesse, jamais commerciale', d: 'Nous ne facturons jamais d\'honoraires à l\'acheteur sur une transaction où nous représentons aussi le vendeur. Conflit d\'intérêts évité par construction.' },
  ],
  en: [
    { n: '01', t: 'A small client list, never industrial', d: 'Maison Israël supports fewer than one hundred families per year. This choice guarantees that a dedicated advisor is assigned to you for the entire duration of your project, from first call to key handover.' },
    { n: '02', t: 'Off-market portfolio of forty properties', d: 'The agency maintains a private portfolio of approximately forty ultra-prime properties, ranging from €6M to €45M, never listed on public portals. Access conditional on a signed search mandate.' },
    { n: '03', t: 'Trilingual advisors on the ground', d: 'Every advisor speaks French, Hebrew and English. Permanent physical presence in Tel Aviv, with regular travel to Jerusalem, Herzliya Pituah and Caesarea for private viewings.' },
    { n: '04', t: 'Tax expertise dedicated to non-residents and Olim', d: 'Our international tax expert builds the optimal scenario for each family: non-resident purchase tax vs Olé Hadash, Trust or Israeli SCI structures, capital gains optimization at resale.' },
    { n: '05', t: 'Fifteen years of market, three cycles crossed', d: 'Founded in 2009, Maison Israël has accompanied clients through the 2010-2014, 2015-2019 and 2020-2024 cycles. This market memory informs every arbitrage we recommend.' },
    { n: '06', t: 'Over three hundred and fifty transactions signed', d: 'More than 350 acquisitions completed since 2009, including 60% off-market in Tel Aviv. Client satisfaction rate of 98% measured annually.' },
    { n: '07', t: 'One single promise, never commercial', d: 'We never charge a buyer fee on a transaction where we also represent the seller. Conflict of interest avoided by design.' },
  ],
  he: [
    { n: '01', t: 'מספר מצומצם של לקוחות, לעולם לא תעשייתי', d: 'מייזון ישראל מלווה פחות ממאה משפחות בשנה. בחירה זו מבטיחה כי יועץ ייעודי מוקצה לכם לכל משך הפרויקט.' },
    { n: '02', t: 'תיק מחוץ-לשוק של ארבעים נכסים', d: 'הסוכנות מנהלת תיק פרטי של כ-40 נכסים אולטרה-פרימיום, בין 6 ל-45 מיליון אירו, שמעולם לא הופיעו בפורטלים.' },
    { n: '03', t: 'יועצים תלת-לשוניים בשטח', d: 'כל יועץ דובר צרפתית, עברית ואנגלית. נוכחות פיזית קבועה בתל אביב, עם נסיעות סדירות לירושלים, הרצליה פיתוח וקיסריה.' },
    { n: '04', t: 'מומחיות מיסויית ייעודית לתושבי חוץ ועולים', d: 'מומחה המיסוי הבינלאומי שלנו בונה את התרחיש האופטימלי לכל משפחה.' },
    { n: '05', t: 'חמש-עשרה שנות שוק, שלושה מחזורים שעברנו', d: 'נוסדה ב-2009, מייזון ישראל ליוותה לקוחות דרך המחזורים של 2010-2014, 2015-2019 ו-2020-2024.' },
    { n: '06', t: 'מעל שלוש מאות וחמישים עסקאות חתומות', d: 'יותר מ-350 רכישות הושלמו מאז 2009, מתוכן 60% מחוץ לשוק בתל אביב. שיעור שביעות רצון של 98%.' },
    { n: '07', t: 'הבטחה אחת, לעולם לא מסחרית', d: 'אנחנו לעולם לא גובים עמלה מקונה בעסקה שבה אנו מייצגים גם את המוכר.' },
  ],
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in META ? locale : 'fr') as keyof typeof META
  return {
    title: META[l].title,
    description: META[l].description,
    alternates: {
      canonical: `${BASE_URL}/${l}/why-us`,
      languages: {
        fr: `${BASE_URL}/fr/why-us`,
        en: `${BASE_URL}/en/why-us`,
        he: `${BASE_URL}/he/why-us`,
        'x-default': `${BASE_URL}/en/why-us`,
      },
    },
    openGraph: {
      title: META[l].title,
      description: META[l].description,
      url: `${BASE_URL}/${l}/why-us`,
      siteName: 'Maison Israël',
      type: 'website',
    },
  }
}

function ReasonsJsonLd({ items, locale }: { items: ReadonlyArray<{ n: string; t: string; d: string }>; locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: META[locale as keyof typeof META]?.h1 ?? META.en.h1,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.t,
      description: r.d,
    })),
  }
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default async function WhyUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale in META ? locale : 'fr') as keyof typeof META
  const m = META[l]
  const reasons = REASONS[l]
  const isRTL = locale === 'he'

  const intro = {
    fr: "Sept choix qui définissent notre maison — et qui expliquent pourquoi des familles, des investisseurs et des Olim nous confient leurs projets immobiliers en Israël depuis 2009.",
    en: 'Seven choices that define our house — and explain why families, investors and Olim entrust us with their Israeli real estate projects since 2009.',
    he: 'שבע בחירות שמגדירות את הבית שלנו — ומסבירות מדוע משפחות, משקיעים ועולים מפקידים בידינו את פרויקטי הנדל"ן שלהם בישראל מאז 2009.',
  }

  return (
    <>
      <ReasonsJsonLd items={reasons} locale={locale} />

      <div style={{ background: '#0A0A0B', minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* HERO */}
        <section style={{ padding: '9rem clamp(1.5rem,5vw,3rem) 4rem', textAlign: 'center', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.6rem' }}>
              Maison Israël · {locale === 'he' ? 'מאז 2009' : locale === 'en' ? 'Since 2009' : 'Depuis 2009'}
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.15, marginBottom: '1.6rem' }}>
              {m.h1}
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.02rem', fontWeight: 300, color: 'rgba(212,213,216,0.85)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
              {intro[l]}
            </p>
          </div>
        </section>

        {/* REASONS */}
        <section style={{ padding: '4rem clamp(1.5rem,5vw,3rem) 6rem' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            {reasons.map(r => (
              <article key={r.n} style={{ display: 'flex', gap: '2rem', padding: '2rem 0', borderBottom: '1px solid rgba(200,169,110,0.12)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1, minWidth: '60px', flexShrink: 0 }}>{r.n}</p>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 2.6vw, 1.8rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '0.8rem', lineHeight: 1.25 }}>
                    {r.t}
                  </h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.96rem', fontWeight: 300, color: 'rgba(212,213,216,0.82)', lineHeight: 1.8 }}>
                    {r.d}
                  </p>
                </div>
              </article>
            ))}

            {/* CTA */}
            <div style={{ marginTop: '4rem', padding: '3rem 2rem', background: '#111214', border: '1px solid rgba(200,169,110,0.2)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.6rem' }}>
                {locale === 'he' ? 'נדבר על הפרויקט שלכם?' : locale === 'en' ? 'Shall we discuss your project?' : 'Parlons de votre projet ?'}
              </h3>
              <p style={{ color: '#8A8B91', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
                {locale === 'he' ? 'שיחה ראשונה תוך 24 שעות, בדיסקרטיות מלאה.' : locale === 'en' ? 'First call within 24 hours, in full discretion.' : 'Premier appel sous 24 heures, en discrétion totale.'}
              </p>
              <Link href={`/${locale}/contact`} style={{
                display: 'inline-block', background: '#C8A96E', color: '#0A0A0B',
                padding: '0.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none',
              }}>
                {locale === 'he' ? 'יצירת קשר' : locale === 'en' ? 'Get in touch' : 'Nous contacter'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
