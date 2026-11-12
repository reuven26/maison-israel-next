import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META = {
  fr: {
    title: 'Faire son Aliyah en Israël — Guide complet 2026',
    description: "Guide complet pour faire son Aliyah : conditions, démarches, fiscalité Olé Hadash, achat immobilier en Israël. Accompagnement Maison Israël depuis 2009 pour les familles francophones.",
    h1: 'Faire son Aliyah en Israël : le guide complet 2026',
  },
  en: {
    title: 'How to Make Aliyah to Israel — Complete 2026 Guide',
    description: 'Complete guide on how to make Aliyah to Israel: requirements, process, Olé Hadash tax benefits, real estate. Maison Israël has guided diaspora families since 2009.',
    h1: 'How to Make Aliyah to Israel: The Complete 2026 Guide',
  },
  he: {
    title: 'איך לעלות לישראל — המדריך המלא 2026',
    description: 'מדריך מלא לעלייה לישראל: תנאים, תהליך, הטבות מס לעולה חדש, נדל"ן. מייזון ישראל מלווה משפחות מאז 2009.',
    h1: 'איך לעלות לישראל — המדריך המלא 2026',
  },
} as const

const STEPS = {
  en: [
    { name: 'Confirm eligibility', text: 'Verify you meet Israeli citizenship eligibility under the Law of Return: Jewish ancestry up to a grandparent, or conversion through a recognized Jewish authority. Spouses, children and grandchildren of Jewish-born individuals are also eligible.' },
    { name: 'Open a file with The Jewish Agency or Nefesh B\'Nefesh', text: 'Submit your Aliyah application through The Jewish Agency for Israel (Sochnut) or, for North-American applicants, through Nefesh B\'Nefesh. Provide birth certificates, marriage records, proof of Jewish identity, and a background check. Average processing time: 2 to 6 months.' },
    { name: 'Get your Aliyah visa and arrive in Israel', text: 'Once approved, you receive an Aliyah visa (Visa A1 or A2). On arrival at Ben Gurion airport, you become an Israeli citizen and receive your Teoudat Olé (immigrant certificate), Israeli ID (Teoudat Zehut), and immediate financial absorption package (Sal Klita).' },
    { name: 'Activate Olé Hadash tax benefits', text: 'As a new immigrant (Olé Hadash), you receive ten years of tax exemption on foreign-source income, reduced purchase tax (Mas Rechisha) on your first Israeli home (0.5% on the first tier instead of 8%), and various subsidies for housing, Hebrew language courses (Ulpan) and professional retraining.' },
    { name: 'Acquire your primary residence', text: 'Within seven years of your Aliyah, you can use your Olé Hadash status to buy a primary residence at a dramatically reduced purchase tax. A €1.5M apartment, for example, costs around €7,500 in purchase tax for an Olé Hadash versus over €130,000 for a non-resident. Choose your neighborhood carefully: this benefit applies only once.' },
  ],
  fr: [
    { name: 'Vérifier votre éligibilité', text: 'Confirmez votre éligibilité à la citoyenneté israélienne au titre de la Loi du Retour : ascendance juive jusqu\'à un grand-parent, ou conversion par une autorité juive reconnue. Les conjoints, enfants et petits-enfants de personnes nées juives sont également éligibles.' },
    { name: 'Ouvrir un dossier auprès de l\'Agence Juive ou de l\'AMI', text: 'Soumettez votre demande d\'Aliyah via l\'Agence Juive pour Israël (Sochnut) ou, pour les francophones, via l\'AMI (Agence pour l\'Aliyah). Fournissez certificats de naissance, actes de mariage, preuves d\'identité juive et casier judiciaire. Délai moyen : 2 à 6 mois.' },
    { name: 'Obtenir votre visa Aliyah et arriver en Israël', text: 'Une fois approuvé, vous recevez un visa Aliyah (Visa A1 ou A2). À l\'arrivée à Ben Gourion, vous devenez citoyen israélien et recevez votre Teoudat Olé, votre carte d\'identité israélienne (Teoudat Zehut) et votre package d\'absorption financière (Sal Klita).' },
    { name: 'Activer les avantages fiscaux Olé Hadash', text: 'En tant qu\'Olé Hadash, vous bénéficiez de dix ans d\'exonération fiscale sur les revenus de source étrangère, d\'une taxe d\'achat réduite (Mas Rechisha) sur votre première résidence israélienne (0,5% sur la première tranche au lieu de 8%), et de subventions pour le logement, l\'Oulpan et la reconversion professionnelle.' },
    { name: 'Acquérir votre résidence principale', text: 'Dans les sept ans suivant votre Aliyah, vous pouvez utiliser votre statut Olé Hadash pour acheter une résidence principale à une taxe d\'achat très réduite. Un appartement à 1,5 M €, par exemple, coûte environ 7 500 € de taxe d\'achat pour un Olé Hadash contre plus de 130 000 € pour un non-résident. Choisissez bien votre quartier : ce bénéfice ne s\'applique qu\'une seule fois.' },
  ],
  he: [
    { name: 'אמתו את הזכאות', text: 'אמתו את הזכאות לאזרחות ישראלית על פי חוק השבות.' },
    { name: 'פתחו תיק בסוכנות היהודית או בנפש בנפש', text: 'הגישו את בקשת העלייה. זמן טיפול ממוצע: 2 עד 6 חודשים.' },
    { name: 'קבלו ויזת עלייה והגיעו לישראל', text: 'בהגעה לבן גוריון, אתם הופכים לאזרחי ישראל ומקבלים תעודת עולה.' },
    { name: 'הפעילו הטבות מס לעולה חדש', text: 'עשר שנות פטור ממס על הכנסות מחו"ל, מס רכישה מופחת על דירה ראשונה.' },
    { name: 'רכשו את דירת המגורים', text: 'בתוך שבע שנים מהעלייה, ניתן להשתמש במעמד עולה חדש לרכישת דירת מגורים במס רכישה מופחת.' },
  ],
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in META ? locale : 'en') as keyof typeof META
  return {
    title: META[l].title,
    description: META[l].description,
    keywords: locale === 'en' ? ['make aliyah', 'make aliyah to israel', 'how to make aliyah', 'aliyah requirements', 'how to move to israel', 'aliyah real estate', 'ole hadash benefits'] : undefined,
    alternates: {
      canonical: `${BASE_URL}/${l}/make-aliyah-to-israel`,
      languages: {
        fr: `${BASE_URL}/fr/make-aliyah-to-israel`,
        en: `${BASE_URL}/en/make-aliyah-to-israel`,
        he: `${BASE_URL}/he/make-aliyah-to-israel`,
        'x-default': `${BASE_URL}/en/make-aliyah-to-israel`,
      },
    },
    openGraph: {
      title: META[l].title,
      description: META[l].description,
      url: `${BASE_URL}/${l}/make-aliyah-to-israel`,
      siteName: 'Maison Israël',
      type: 'article',
    },
  }
}

function HowToJsonLd({ locale }: { locale: string }) {
  const l = (locale in STEPS ? locale : 'en') as keyof typeof STEPS
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'fr' ? 'Comment faire son Aliyah en Israël' : locale === 'he' ? 'איך לעלות לישראל' : 'How to Make Aliyah to Israel',
    description: META[l as keyof typeof META]?.description ?? META.en.description,
    totalTime: 'P6M',
    step: STEPS[l].map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
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

const CONTENT = {
  en: {
    intro: 'Making Aliyah — immigrating to Israel under the Law of Return — is one of the most consequential decisions a Jewish family can make. This guide consolidates everything you need to know in 2026: who qualifies, how the process works, what tax advantages await, and how real estate fits in. Maison Israël has guided Aliyah families since 2009.',
    eligibilityH: 'Who can make Aliyah?',
    eligibilityP: 'The Law of Return (1950, amended 1970) grants Israeli citizenship to: every Jew (born to a Jewish mother or converted); the child or grandchild of a Jew; and the spouse of any of the above. The proof required is documentary — birth certificates, marriage records, rabbinical confirmation, or a conversion certificate from a recognized authority. Most applications succeed; refusals are rare and usually relate to incomplete documentation.',
    benefitsH: 'Olé Hadash tax benefits in 2026',
    benefitsP: 'New immigrants (Olim Hadashim) receive substantial benefits that last ten years. The most material are: a full income tax exemption on foreign-source income (interest, dividends, rental income, capital gains earned outside Israel); a 10-year exemption from declaring foreign assets to the Israeli tax authority; sharply reduced purchase tax on a first Israeli primary residence (0.5% on the first NIS 1.97M tier vs 8% for non-residents); and entitlement to public health insurance (Bituach Briut Mamlachti) from arrival.',
    realEstateH: 'The real estate angle of Aliyah',
    realEstateP: 'For many Aliyah families, the real estate decision shapes the entire transition. The Olé Hadash purchase-tax benefit applies only to a primary residence acquired within seven years of Aliyah and used once. Strategic question: should you buy before Aliyah (taxed as non-resident, no Olé benefit) or after (taxed as Olé Hadash, with the benefit)? The answer depends on the neighborhood, the property price, your tax residency, and your time horizon. We have built scenarios for over 350 Aliyah families since 2009.',
    cta: 'Speak with a French- or English-speaking Aliyah real estate advisor.',
    ctaBtn: 'Get advice',
  },
  fr: {
    intro: 'Faire son Aliyah — immigrer en Israël au titre de la Loi du Retour — est l\'une des décisions les plus structurantes pour une famille juive. Ce guide regroupe tout ce qu\'il faut savoir en 2026 : qui est éligible, comment se déroule le processus, quels avantages fiscaux attendent l\'Olé Hadash, et comment l\'immobilier s\'inscrit dans le projet. Maison Israël accompagne les familles francophones en Aliyah depuis 2009.',
    eligibilityH: 'Qui peut faire son Aliyah ?',
    eligibilityP: 'La Loi du Retour (1950, amendée 1970) accorde la citoyenneté israélienne à : tout Juif (né d\'une mère juive ou converti) ; l\'enfant ou le petit-enfant d\'un Juif ; et le conjoint d\'une des catégories précédentes. Les preuves requises sont documentaires : actes de naissance, actes de mariage, attestation rabbinique ou certificat de conversion d\'une autorité reconnue. La grande majorité des dossiers aboutit ; les refus sont rares et liés à des dossiers incomplets.',
    benefitsH: 'Les avantages fiscaux Olé Hadash en 2026',
    benefitsP: 'Les nouveaux immigrants (Olim Hadashim) bénéficient d\'avantages substantiels pendant dix ans. Les plus importants : exonération totale de l\'impôt sur le revenu pour les revenus de source étrangère (intérêts, dividendes, loyers, plus-values gagnés hors d\'Israël) ; exonération de déclaration des avoirs étrangers ; taxe d\'achat fortement réduite sur la première résidence principale en Israël (0,5% sur la première tranche de 1,97 M NIS contre 8% pour un non-résident) ; affiliation à la sécurité sociale israélienne (Bituach Briut Mamlachti) dès l\'arrivée.',
    realEstateH: 'L\'angle immobilier de l\'Aliyah',
    realEstateP: 'Pour beaucoup de familles, la décision immobilière structure toute la transition. L\'avantage Olé Hadash sur la taxe d\'achat ne s\'applique qu\'à une résidence principale acquise dans les sept ans suivant l\'Aliyah, et une seule fois. Question stratégique : faut-il acheter avant l\'Aliyah (taxé comme non-résident, sans le bénéfice Olé) ou après (taxé comme Olé Hadash, avec le bénéfice) ? La réponse dépend du quartier, du prix du bien, de votre résidence fiscale et de votre horizon. Nous avons construit des scénarios pour plus de 350 familles en Aliyah depuis 2009.',
    cta: 'Parler à un conseiller immobilier francophone spécialisé Aliyah.',
    ctaBtn: 'Demander conseil',
  },
  he: {
    intro: 'עלייה לישראל היא אחת ההחלטות המשמעותיות ביותר שמשפחה יהודית יכולה לקבל. מדריך זה מאגד את כל מה שצריך לדעת ב-2026.',
    eligibilityH: 'מי יכול לעלות?',
    eligibilityP: 'חוק השבות (1950, תוקן 1970) מעניק אזרחות ישראלית לכל יהודי, לבן או נכד של יהודי, ולבני זוגם.',
    benefitsH: 'הטבות מס לעולה חדש ב-2026',
    benefitsP: 'עולים חדשים מקבלים הטבות משמעותיות במשך עשר שנים: פטור ממס הכנסה על הכנסות מחו"ל, פטור מהצהרה על נכסים זרים, מס רכישה מופחת על דירת מגורים ראשונה.',
    realEstateH: 'הזווית הנדל"נית של העלייה',
    realEstateP: 'עבור משפחות רבות, ההחלטה הנדל"נית מעצבת את כל המעבר. הטבת מס הרכישה לעולה חדש חלה רק על דירת מגורים שנרכשה תוך שבע שנים מהעלייה, ופעם אחת בלבד.',
    cta: 'שיחה עם יועץ נדל"ן המתמחה בעלייה.',
    ctaBtn: 'בקשת ייעוץ',
  },
} as const

export default async function MakeAliyahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale in META ? locale : 'en') as keyof typeof META
  const m = META[l]
  const c = CONTENT[l]
  const steps = STEPS[l]
  const isRTL = locale === 'he'

  return (
    <>
      <HowToJsonLd locale={locale} />

      <div style={{ background: '#0A0A0B', minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* HERO */}
        <section style={{ padding: '9rem clamp(1.5rem,5vw,3rem) 4rem', textAlign: 'center', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.6rem' }}>
              Maison Israël · {locale === 'he' ? 'מאז 2009' : locale === 'en' ? 'Since 2009' : 'Depuis 2009'}
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.15, marginBottom: '1.8rem' }}>
              {m.h1}
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.02rem', fontWeight: 300, color: 'rgba(212,213,216,0.85)', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto' }}>
              {c.intro}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section style={{ padding: '4rem clamp(1.5rem,5vw,3rem) 5rem' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            {/* Eligibility */}
            <article style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1.2rem' }}>{c.eligibilityH}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.98rem', fontWeight: 300, color: 'rgba(212,213,216,0.82)', lineHeight: 1.85 }}>{c.eligibilityP}</p>
            </article>

            {/* Steps */}
            <article style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1.8rem' }}>
                {locale === 'fr' ? 'Les 5 étapes pour faire son Aliyah' : locale === 'he' ? 'חמשת השלבים לעלייה' : 'The 5 Steps to Make Aliyah'}
              </h2>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.8rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#C8A96E', fontWeight: 300, minWidth: '40px', lineHeight: 1, flexShrink: 0 }}>{(i + 1).toString().padStart(2, '0')}</span>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#FAFAF9', fontWeight: 500, marginBottom: '0.5rem' }}>{s.name}</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 300, color: 'rgba(212,213,216,0.78)', lineHeight: 1.75 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </article>

            {/* Benefits */}
            <article style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1.2rem' }}>{c.benefitsH}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.98rem', fontWeight: 300, color: 'rgba(212,213,216,0.82)', lineHeight: 1.85 }}>{c.benefitsP}</p>
            </article>

            {/* Real estate */}
            <article style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1.2rem' }}>{c.realEstateH}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.98rem', fontWeight: 300, color: 'rgba(212,213,216,0.82)', lineHeight: 1.85 }}>{c.realEstateP}</p>
            </article>

            {/* CTA */}
            <div style={{ marginTop: '4rem', padding: '3rem 2rem', background: '#111214', border: '1px solid rgba(200,169,110,0.2)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#FAFAF9', fontWeight: 300, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                {c.cta}
              </p>
              <Link href={`/${locale}/contact`} style={{
                display: 'inline-block', background: '#C8A96E', color: '#0A0A0B',
                padding: '0.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none',
              }}>
                {c.ctaBtn}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
