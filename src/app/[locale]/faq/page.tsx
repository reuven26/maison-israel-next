import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Questions Fréquentes — Immobilier en Israël | Maison Israël',
    description: 'Réponses aux questions essentielles sur l\'acquisition immobilière en Israël : fiscalité, off-market, aliyah, financement, processus, quartiers.',
    tag: 'FAQ',
    h1: 'Questions Fréquentes',
    subtitle: 'Les réponses essentielles que nos clients posent en premier. Pour les questions plus spécifiques, contactez notre équipe directement.',
  },
  en: {
    title: 'Frequently Asked Questions — Israeli Real Estate | Maison Israël',
    description: 'Answers to essential questions about Israeli real estate acquisition: taxation, off-market, aliyah, financing, process, neighborhoods.',
    tag: 'FAQ',
    h1: 'Frequently Asked Questions',
    subtitle: 'The essential answers our clients ask first. For more specific questions, contact our team directly.',
  },
  he: {
    title: 'שאלות נפוצות | מייזון ישראל',
    description: 'תשובות לשאלות חיוניות על רכישת נדל"ן בישראל.',
    tag: 'שאלות נפוצות',
    h1: 'שאלות נפוצות',
    subtitle: 'התשובות החיוניות שהלקוחות שלנו שואלים ראשונה.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: {
        fr: `${BASE_URL}/fr/faq`,
        en: `${BASE_URL}/en/faq`,
        he: `${BASE_URL}/he/faq`,
        'x-default': `${BASE_URL}/fr/faq`,
      },
    },
  }
}

interface FaqItem {
  q: { fr: string; en: string; he: string }
  a: { fr: string; en: string; he: string }
}

const SECTIONS: { title: { fr: string; en: string; he: string }; items: FaqItem[] }[] = [
  {
    title: { fr: 'Acquisition par un étranger', en: 'Foreign Acquisition', he: 'רכישה על ידי זרים' },
    items: [
      {
        q: { fr: 'Les ressortissants étrangers peuvent-ils acheter en Israël ?', en: 'Can foreign citizens buy in Israel?', he: 'האם אזרחים זרים יכולים לקנות בישראל?' },
        a: {
          fr: "Oui. Israël n'impose aucune restriction de nationalité sur la propriété immobilière. Les acheteurs étrangers acquièrent la pleine propriété (Tabu) sur la même base légale que les citoyens israéliens, à l'exception de quelques propriétés sur les terres de l'Autorité Israélienne du Foncier où s'applique un bail long.",
          en: 'Yes. Israel imposes no nationality restriction on real estate ownership. Foreign buyers acquire freehold title (Tabu) on the same legal basis as Israeli citizens, with the exception of some properties on Israel Lands Authority land where long leasehold applies.',
          he: 'כן. ישראל אינה מטילה הגבלת אזרחות.',
        },
      },
      {
        q: { fr: "Dois-je être en Israël pour finaliser l'achat ?", en: 'Do I need to be in Israel to complete the purchase?', he: 'האם אני צריך להיות בישראל לסגירה?' },
        a: {
          fr: "Non. La transaction peut être effectuée à distance via une procuration à votre avocat israélien. La plupart des acheteurs étrangers se déplacent pour les visites de propriétés et la signature de compromis, mais pas pour la clôture finale.",
          en: 'No. The transaction can be completed remotely through a power of attorney to your Israeli lawyer. Most foreign buyers travel for property viewings and contract signing, but not for final closing.',
          he: 'לא. ניתן לבצע את העסקה מרחוק.',
        },
      },
      {
        q: { fr: 'Combien de fois dois-je venir en Israël ?', en: 'How many times do I need to come?', he: 'כמה פעמים אני צריך לבוא?' },
        a: {
          fr: 'Une à deux fois est typique : un voyage pour visiter la shortlist (3–5 jours), et parfois un second pour la signature finale.',
          en: 'One to two times is typical: one trip to view the shortlist (3–5 days), and sometimes a second for final signing.',
          he: 'פעם או פעמיים.',
        },
      },
    ],
  },
  {
    title: { fr: 'Fiscalité', en: 'Taxation', he: 'מיסוי' },
    items: [
      {
        q: { fr: "Quelle est la taxe d'achat (Mas Rechisha) pour les non-résidents ?", en: 'What is the purchase tax (Mas Rechisha) for non-residents?', he: 'מהו מס רכישה לתושבי חוץ?' },
        a: {
          fr: "Pour les acheteurs non-résidents : 8 % sur la première portion de valeur (~6 millions de NIS) et 10 % au-dessus. Pas d'exemption de première résidence. Un acheteur planifiant une aliyah peut bénéficier de taux réduits oleh chadash sous certaines conditions.",
          en: 'For non-resident buyers: 8% on the first portion of value (~6 million NIS) and 10% above. No first-home exemption. A buyer planning aliyah may benefit from oleh chadash reduced rates under certain conditions.',
          he: 'לקונים תושבי חוץ: 8% על החלק הראשון, 10% מעל.',
        },
      },
      {
        q: { fr: "Quel est l'impôt sur les plus-values à la revente ?", en: 'What is the capital gains tax on resale?', he: 'מהו מס רווח הון במכירה חוזרת?' },
        a: {
          fr: "L'impôt sur les plus-values (Mas Shevach) s'applique à 25 % sur l'appréciation pour les non-résidents, calculé sur le gain ajusté de l'inflation. Le cadre israélien est raisonnablement généreux pour les détenteurs de longue durée.",
          en: 'Capital gains tax (Mas Shevach) applies at 25% on appreciation for non-residents, calculated on the inflation-adjusted gain. The Israeli framework is reasonably generous to long-term holders.',
          he: 'מס שבח חל ב-25% על העלייה לתושבי חוץ.',
        },
      },
      {
        q: { fr: "Quelle imposition sur le revenu locatif ?", en: 'What is the tax on rental income?', he: 'מהו מס על הכנסה משכירות?' },
        a: {
          fr: "Les non-résidents ont le choix : retenue à la source simplifiée de 10 % sur le revenu locatif brut (sans déductions), ou les taux d'impôt sur le revenu progressifs avec déductions. Le régime à 10 % est généralement préféré pour les locations résidentielles premium.",
          en: 'Non-residents have a choice: simplified 10% withholding on gross rental income (no deductions), or progressive income tax rates with deductions. The 10% regime is generally preferred for premium residential rentals.',
          he: 'תושבי חוץ יכולים לבחור: ניכוי במקור של 10%.',
        },
      },
      {
        q: { fr: "Quels sont les avantages fiscaux pour un oleh chadash ?", en: 'What are the oleh chadash tax benefits?', he: 'מהן הטבות מס לעולה חדש?' },
        a: {
          fr: "Taux réduit de Mas Rechisha sur la résidence principale (souvent 0,5 % jusqu'à un seuil, puis 5 %), exonération de dix ans sur les revenus de source étrangère, exonération sur les plus-values d'actifs étrangers, et exemption sur les pensions étrangères.",
          en: 'Reduced Mas Rechisha on the primary residence (often 0.5% up to a threshold, then 5%), ten-year exemption on foreign-source income, exemption on foreign asset capital gains, and exemption on foreign pensions.',
          he: 'מס רכישה מופחת על דירה ראשונה.',
        },
      },
    ],
  },
  {
    title: { fr: 'Off-Market', en: 'Off-Market', he: 'מחוץ-לשוק' },
    items: [
      {
        q: { fr: 'Quel pourcentage des transactions sont off-market ?', en: 'What percentage of transactions are off-market?', he: 'איזה אחוז מהעסקאות?' },
        a: {
          fr: 'Les estimations de l\'industrie suggèrent 35–50 % dans le segment au-dessus de 12 millions de NIS, avec des concentrations plus élevées à Herzliya Pituah, Césarée, et Talbieh.',
          en: 'Industry estimates suggest 35–50% in the segment above 12 million NIS, with higher concentrations in Herzliya Pituah, Caesarea, and Talbiyeh.',
          he: '35%–50% במקטע מעל 12 מיליון ₪.',
        },
      },
      {
        q: { fr: 'Comment puis-je accéder aux propriétés off-market ?', en: 'How do I access off-market properties?', he: 'איך אגש לנכסים?' },
        a: {
          fr: "À travers une relation avec un conseiller établi dans le sous-marché pertinent. L'inventaire off-market n'est agrégé sur aucune plateforme — c'est un processus de relation, pas de portail.",
          en: 'Through a relationship with an established advisor in the relevant submarket. Off-market inventory is not aggregated on any platform — it is a relationship process, not a portal.',
          he: 'דרך מערכת יחסים עם יועץ מבוסס.',
        },
      },
    ],
  },
  {
    title: { fr: 'Processus & financement', en: 'Process & Financing', he: 'תהליך ומימון' },
    items: [
      {
        q: { fr: "Quel est le coût total de transaction pour un acheteur étranger ?", en: 'What is the total transaction cost for a foreign buyer?', he: 'מהי עלות העסקה הכוללת?' },
        a: {
          fr: "Au-delà du prix d'achat, prévoyez environ 8–11 % en combiné : taxe d'achat (Mas Rechisha), frais légaux, commission de courtage, et frais d'enregistrement. Le Mas Rechisha est le plus gros composant.",
          en: 'Beyond the purchase price, budget approximately 8–11% combined: purchase tax (Mas Rechisha), legal fees, broker commission, and registration costs. Mas Rechisha is the largest component.',
          he: 'מעבר למחיר הרכישה, תכננו כ-8%–11%.',
        },
      },
      {
        q: { fr: 'Combien de temps prend une acquisition typique ?', en: 'How long does a typical acquisition take?', he: 'כמה זמן לוקחת רכישה?' },
        a: {
          fr: 'Du brief initial à la propriété enregistrée au Tabu : 6 à 12 mois pour un brief bien défini et une fourchette réaliste. Les actifs trophées ou les quartiers très contraints peuvent demander 12–18 mois.',
          en: 'From initial brief to registered title in Tabu: 6 to 12 months for a well-defined brief and realistic price range. Trophy assets or highly-constrained neighbourhoods may take 12–18 months.',
          he: 'מהבריף ועד הרישום: 6–12 חודשים.',
        },
      },
      {
        q: { fr: 'Puis-je obtenir un prêt hypothécaire en tant que non-résident ?', en: 'Can I get a mortgage as a non-resident?', he: 'האם אוכל לקבל משכנתא?' },
        a: {
          fr: "Oui. Les banques israéliennes prêtent aux acheteurs étrangers, typiquement jusqu'à 50 % de la valeur du bien, en shekels ou en devises majeures (USD, EUR, GBP). Documentation rigoureuse, 8–14 semaines d'instruction.",
          en: 'Yes. Israeli banks lend to foreign buyers, typically up to 50% LTV, in shekels or major currencies (USD, EUR, GBP). Rigorous documentation, 8–14 weeks of underwriting.',
          he: 'כן. בנקים ישראליים נותנים הלוואות לקונים זרים.',
        },
      },
    ],
  },
  {
    title: { fr: 'Quartiers & marché', en: 'Neighborhoods & Market', he: 'שכונות ושוק' },
    items: [
      {
        q: { fr: 'Tel Aviv ou Jérusalem pour investir ?', en: 'Tel Aviv or Jerusalem for investment?', he: 'תל אביב או ירושלים?' },
        a: {
          fr: "Tel Aviv pour le rendement et la liquidité (2,8–4 % brut). Jérusalem pour la préservation patrimoniale et l'horizon long (1,8–2,8 % brut mais volatilité plus faible). Les clients sophistiqués détiennent souvent les deux.",
          en: 'Tel Aviv for yield and liquidity (2.8–4% gross). Jerusalem for heritage preservation and long horizon (1.8–2.8% gross but lower volatility). Sophisticated clients often hold both.',
          he: 'תל אביב לתשואה. ירושלים לשימור.',
        },
      },
      {
        q: { fr: 'Quels sont les quartiers les plus chers d\'Israël ?', en: 'What are the most expensive neighborhoods in Israel?', he: 'מהן השכונות היקרות ביותר?' },
        a: {
          fr: "Galei Tchelet à Herzliya Pituah détient le sommet absolu ($20–50M+ pour villa bord de mer). Suivent Park Tzameret et Sarona à Tel Aviv (penthouses trophées 150 000–180 000 NIS/m²), puis Talbieh à Jérusalem et Césarée Aleph.",
          en: 'Galei Tchelet in Herzliya Pituah holds the absolute top ($20–50M+ for seafront villas). Then Park Tzameret and Sarona in Tel Aviv (trophy penthouses 150–180k NIS/m²), then Talbiyeh in Jerusalem and Caesarea Aleph.',
          he: 'גלי תכלת בהרצליה פיתוח.',
        },
      },
    ],
  },
]

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Flatten all items for FAQPage schema
  const allItems = SECTIONS.flatMap((s) => s.items)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((it) => ({
      '@type': 'Question',
      name: it.q[l],
      acceptedAnswer: { '@type': 'Answer', text: it.a[l] },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

      {SECTIONS.map((section, sIdx) => (
        <section key={sIdx} style={{ padding: sIdx === 0 ? '5rem 2rem 4rem' : '3rem 2rem 4rem', background: sIdx % 2 === 0 ? '#0A0A0B' : '#0F1012', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 300, color: '#C8A96E', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
              {section.title[l]}
            </h2>
            {section.items.map((it, i) => (
              <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < section.items.length - 1 ? '1px solid rgba(200,169,110,0.08)' : 'none' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {it.q[l]}
                </h3>
                <p style={{ color: '#8A8B91', fontSize: '0.98rem', lineHeight: 1.85 }}>
                  {it.a[l]}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? 'יש לכם שאלה ספציפית?' : l === 'en' ? 'A specific question?' : 'Une question plus spécifique ?'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'הצוות שלנו זמין להיכרות ישירה.' : l === 'en' ? 'Our team is available by direct introduction.' : 'Notre équipe est disponible par introduction directe.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
        </Link>
      </section>
    </>
  )
}
