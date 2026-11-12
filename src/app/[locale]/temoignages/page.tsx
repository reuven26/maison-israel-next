import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Témoignages Clients — Acquisitions Immobilières en Israël',
    description: 'Témoignages anonymisés de nos clients internationaux — acquisitions à Jérusalem, Tel Aviv, Herzliya Pituah. Quinze ans d\'accompagnement.',
    tag: 'Témoignages',
    h1: 'Ce que nos clients disent',
    subtitle: 'Témoignages anonymisés sur l\'accompagnement de nos clients. Les noms ont été modifiés à leur demande.',
  },
  en: {
    title: 'Client Testimonials — Israeli Real Estate Acquisitions',
    description: 'Anonymised testimonials from our international clients — acquisitions in Jerusalem, Tel Aviv, Herzliya Pituah. Fifteen years of support.',
    tag: 'Testimonials',
    h1: 'What Our Clients Say',
    subtitle: 'Anonymised testimonials from our clients. Names have been changed at their request.',
  },
  he: {
    title: 'המלצות לקוחות — חוויות אמיתיות של רוכשים',
    description: 'המלצות אנונימיות מלקוחותינו הבינלאומיים.',
    tag: 'המלצות',
    h1: 'מה אומרים הלקוחות שלנו',
    subtitle: 'המלצות אנונימיות מלקוחותינו. שמות שונו לבקשתם.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/temoignages`,
      languages: {
        fr: `${BASE_URL}/fr/temoignages`,
        en: `${BASE_URL}/en/temoignages`,
        he: `${BASE_URL}/he/temoignages`,
        'x-default': `${BASE_URL}/fr/temoignages`,
      },
    },
  }
}

const TESTIMONIALS = [
  {
    id: 1,
    quote: {
      fr: "Nous cherchions une maison mandataire à Talbieh depuis deux ans, sans succès, à travers plusieurs agences. Maison Israël nous a montré trois propriétés en off-market lors d'un seul voyage. Nous avons signé sur la deuxième. Quatre ans plus tard, la propriété a pris 35 % de valeur et notre fille y vit pour ses études.",
      en: "We had been searching for a Mandate house in Talbiyeh for two years, unsuccessfully, through several agencies. Maison Israël showed us three off-market properties on a single trip. We signed on the second one. Four years later, the property has appreciated 35% and our daughter lives there during her studies.",
      he: 'חיפשנו בית מנדט בטלביה שנתיים, ללא הצלחה.',
    },
    author: { fr: 'Famille M.', en: 'Family M.', he: 'משפחת מ.' },
    location: { fr: 'Paris → Jérusalem (Talbieh)', en: 'Paris → Jerusalem (Talbiyeh)', he: 'פריז → ירושלים (טלביה)' },
    year: '2021',
    type: { fr: 'Maison mandataire 320 m²', en: 'Mandate house 320 m²', he: 'בית מנדט 320 מ"ר' },
  },
  {
    id: 2,
    quote: {
      fr: "Acquisition d'un penthouse à Park Tzameret pour notre famille en planification d'aliyah. L'équipe a coordonné l'ensemble du processus depuis New York : avocat fiscal, banque, structuration ante-aliyah. Nous avons emménagé six mois après la clôture, dans une propriété parfaitement préparée. La structuration nous a fait économiser plus de 600 000 NIS en Mas Rechisha grâce au statut oleh chadash appliqué au bon moment.",
      en: "Acquisition of a Park Tzameret penthouse for our family planning aliyah. The team coordinated the entire process from New York: tax lawyer, bank, pre-aliyah structuring. We moved in six months after closing into a perfectly prepared property. The structuring saved us over 600,000 NIS in Mas Rechisha through the oleh chadash status applied at the right time.",
      he: 'רכישת פנטהאוז בפארק צמרת לקראת עלייה.',
    },
    author: { fr: 'M. et Mme R.', en: 'Mr. and Mrs. R.', he: 'מר וגברת ר.' },
    location: { fr: 'New York → Tel Aviv (Park Tzameret)', en: 'New York → Tel Aviv (Park Tzameret)', he: 'ניו יורק → תל אביב' },
    year: '2023',
    type: { fr: 'Penthouse 280 m²', en: 'Penthouse 280 m²', he: 'פנטהאוז 280 מ"ר' },
  },
  {
    id: 3,
    quote: {
      fr: "Recherche d'une villa à Herzliya Pituah pour investissement long terme. Aucun chiffre annoncé sur Galei Tchelet ne correspondait à notre brief réel ; la propriété qui nous a été présentée n'avait jamais été en circulation publique. La transaction s'est faite en confidentialité absolue, à un prix négocié inférieur de 12 % à l'évaluation indépendante.",
      en: "Search for a Herzliya Pituah villa for long-term investment. No advertised price on Galei Tchelet matched our real brief; the property presented to us had never been in public circulation. The transaction happened under absolute confidentiality, at a negotiated price 12% below independent valuation.",
      he: 'חיפוש וילה בהרצליה פיתוח להשקעה ארוכת טווח.',
    },
    author: { fr: 'Famille B.', en: 'Family B.', he: 'משפחת ב.' },
    location: { fr: 'São Paulo → Herzliya Pituah', en: 'São Paulo → Herzliya Pituah', he: 'סאו פאולו → הרצליה פיתוח' },
    year: '2022',
    type: { fr: 'Villa 750 m² vue mer', en: 'Villa 750 m² sea view', he: 'וילה 750 מ"ר נוף לים' },
  },
  {
    id: 4,
    quote: {
      fr: "Maison Israël accompagne notre famille depuis 2014. Nous avons acquis trois propriétés à travers eux : un appartement à Tel Aviv pour notre fils universitaire, une maison à la Colonie Allemande pour les vacances, et plus récemment une villa à Caesarea. Ce qui distingue cette équipe : ils refusent les transactions qui ne nous semblent pas dans notre intérêt. C'est rare.",
      en: 'Maison Israël has supported our family since 2014. We have acquired three properties through them: a Tel Aviv apartment for our university-age son, a German Colony house for holidays, and more recently a Caesarea villa. What distinguishes this team: they decline transactions they do not believe serve our interest. That is rare.',
      he: 'מייזון ישראל מלווה את משפחתנו מאז 2014.',
    },
    author: { fr: 'Famille L.', en: 'Family L.', he: 'משפחת ל.' },
    location: { fr: 'Bruxelles → Tel Aviv, Jérusalem, Césarée', en: 'Brussels → Tel Aviv, Jerusalem, Caesarea', he: 'בריסל' },
    year: '2014 — 2025',
    type: { fr: 'Trois acquisitions sur 10 ans', en: 'Three acquisitions over 10 years', he: 'שלוש רכישות' },
  },
  {
    id: 5,
    quote: {
      fr: "Estimation d'une propriété héritée à Réhavia pour une succession complexe. L'analyse a été détaillée, défendable face à l'administration fiscale, et livrée en sept jours ouvrables. Ce qui aurait pu être un dossier conflictuel entre cohéritiers s'est résolu sur une base objective grâce à leur travail.",
      en: 'Valuation of an inherited Rehavia property for a complex estate. The analysis was detailed, defensible to tax authorities, and delivered in seven business days. What could have been a conflictual file between co-heirs resolved on an objective basis thanks to their work.',
      he: 'הערכת נכס שנירש ברחביה לעזבון מורכב.',
    },
    author: { fr: 'Cabinet d\'avocats parisien', en: 'Parisian law firm', he: 'משרד עורכי דין פריזאי' },
    location: { fr: 'Estimation Réhavia', en: 'Rehavia valuation', he: 'הערכה ברחביה' },
    year: '2024',
    type: { fr: 'Succession / valorisation indépendante', en: 'Estate / independent valuation', he: 'ירושה / הערכה' },
  },
  {
    id: 6,
    quote: {
      fr: "Comme diplomate basé à Tel Aviv pour quatre ans, j'avais besoin d'une villa à Herzliya Pituah avec un standard de réception élevé et une sécurité adaptée. Maison Israël a géré l'ensemble — visites hors heures publiques, évaluation sécurité, coordination avec les services de l'ambassade. Bail signé en trois semaines.",
      en: 'As a diplomat posted to Tel Aviv for four years, I needed a Herzliya Pituah villa with a high reception standard and adapted security. Maison Israël handled everything — viewings outside public hours, security assessment, coordination with embassy services. Lease signed in three weeks.',
      he: 'כדיפלומט המוצב בתל אביב לארבע שנים.',
    },
    author: { fr: 'Diplomate européen', en: 'European diplomat', he: 'דיפלומט אירופי' },
    location: { fr: 'Herzliya Pituah', en: 'Herzliya Pituah', he: 'הרצליה פיתוח' },
    year: '2024',
    type: { fr: 'Location villa 4 ans', en: '4-year villa lease', he: 'שכירת וילה 4 שנים' },
  },
]

export default async function TemoignagesPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <section style={{ padding: '5rem 2rem 8rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2.5rem' }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} style={{ background: '#0F1012', padding: '2.5rem', borderTop: '2px solid #C8A96E', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '1.2rem', right: isRTL ? 'auto' : '1.5rem', left: isRTL ? '1.5rem' : 'auto', fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: 'rgba(200,169,110,0.18)', lineHeight: 1 }}>"</span>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.18rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                {t.quote[l]}
              </p>
              <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(200,169,110,0.12)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.6rem' }}>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#FAFAF9', fontWeight: 500 }}>
                      {t.author[l]}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#C8A96E', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
                      {t.location[l]}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', textAlign: isRTL ? 'left' : 'right' }}>
                    <div>{t.year}</div>
                    <div style={{ marginTop: '0.2rem' }}>{t.type[l]}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? 'הסיפור הבא יכול להיות שלך' : l === 'en' ? 'The next story can be yours' : 'Le prochain dossier peut être le vôtre'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '500px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'שיחה ראשונית סודית, ללא התחייבות.' : l === 'en' ? 'Confidential initial conversation. No commitment.' : 'Conversation initiale confidentielle. Sans engagement.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Begin a conversation' : 'Commencer une conversation'}
        </Link>
      </section>
    </>
  )
}
