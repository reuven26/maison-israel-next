import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import OffMarketGate from '@/components/public/OffMarketGate'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Off-Market — Propriétés de Prestige Hors-Marché en Israël',
    description: "Accédez à notre portfolio off-market — Herzliya Pituah, Talbieh, Tel Aviv, Césarée. Acheteurs qualifiés uniquement, par introduction directe.",
    tag: 'Off-Market',
    h1: 'Le marché qui ne se trouve pas sur les portails',
    subtitle: "35 à 50 % des transactions premium en Israël se déroulent en off-market. Notre portfolio est curaté en continu et disponible aux acheteurs qualifiés par introduction directe.",
  },
  en: {
    title: 'Off-Market — Private Luxury Properties in Israel',
    description: 'Access our off-market portfolio — Herzliya Pituah, Talbiyeh, Tel Aviv, Caesarea. Qualified buyers only, by direct introduction.',
    tag: 'Off-Market',
    h1: 'The Market That Is Not on the Portals',
    subtitle: '35 to 50% of premium transactions in Israel happen off-market. Our portfolio is curated continuously and available to qualified buyers by direct introduction.',
  },
  he: {
    title: 'מחוץ לשוק — נכסי יוקרה פרטיים בישראל',
    description: 'גישה לתיק מחוץ לשוק שלנו.',
    tag: 'מחוץ לשוק',
    h1: 'השוק שלא נמצא בפורטלים',
    subtitle: '35%–50% מהעסקאות הפרמיום בישראל מתבצעות מחוץ לשוק.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/off-market`,
      languages: {
        fr: `${BASE_URL}/fr/off-market`,
        en: `${BASE_URL}/en/off-market`,
        he: `${BASE_URL}/he/off-market`,
        'x-default': `${BASE_URL}/fr/off-market`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/off-market`,
      siteName: 'Maison Israël',
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export default async function OffMarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  return (
    <>
      <div style={{ paddingTop: '80px' }} />

      {/* SEO Hero */}
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.1 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: 1.75, maxWidth: '620px', margin: '1.2rem auto 0' }}>
            {l === 'he'
              ? 'הצוות שלנו ינפיק קוד גישה לאחר שיחה ראשונית קצרה — סודית, ללא התחייבות, בדרך כלל 15–20 דקות.'
              : l === 'en'
              ? 'Our team issues an access code after a brief initial conversation — confidential, no commitment, typically 15–20 minutes.'
              : "Notre équipe émet un code d'accès après une brève conversation initiale — confidentielle, sans engagement, 15–20 minutes."}
          </p>
          {/* Accès au portfolio — mis en avant dès le hero */}
          <div style={{ marginTop: '2.4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/contact`} style={{ background: '#C8A96E', color: '#0A0A0B', padding: '1rem 2.4rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
              {l === 'he' ? 'בקש גישה לתיק' : l === 'en' ? 'Request portfolio access' : "Demander l'accès au portfolio"}
            </Link>
            <a href="#acces-code" style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '1rem 2.4rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              {l === 'he' ? 'יש לך קוד? ←' : l === 'en' ? 'Already have a code? →' : 'Déjà un code ? →'}
            </a>
          </div>
        </div>
      </section>

      {/* Password gate — direct access for returning users */}
      <section id="acces-code" style={{ padding: '4rem 2rem 5rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr', scrollMarginTop: '90px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.78rem', color: '#C8A96E', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>
              {l === 'he' ? 'יש לך קוד? הזן למטה' : l === 'en' ? 'Already have a code? Enter below' : 'Déjà un code ? Saisir ci-dessous'}
            </p>
          </div>
          <OffMarketGate locale={locale} isRTL={isRTL} />
        </div>
      </section>

      {/* Qualification */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300, marginBottom: '1.2rem' }}>
            {l === 'he' ? 'איך אנחנו מסננים קונים' : l === 'en' ? 'How We Qualify Buyers' : 'Comment nous qualifions les acheteurs'}
          </h2>
          <p style={{ color: '#D4D5D8', fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            {l === 'he'
              ? 'הגישה לתיק מחוץ-לשוק שלנו אינה פתוחה. אנו מעריכים כל קונה פוטנציאלי על שלושה קריטריונים: טווח מחיר ריאלי, רצינות לוח הזמנים, וזהות. זה מגן על המוכרים ושומר על איכות מערכות היחסים העתידיות שלנו.'
              : l === 'en'
              ? "Access to our off-market portfolio is not open. We evaluate each potential buyer on three criteria: realistic price range, calendar seriousness, and identity (proof of funds, references, context). This protects sellers and preserves the quality of our future relationships. It is not a commercial policy — it is what allows us to keep receiving the right properties."
              : "L'accès à notre portfolio off-market n'est pas ouvert. Nous évaluons chaque acheteur potentiel sur trois critères : la fourchette de prix réaliste, la sérénité du calendrier, et l'identité (preuve de fonds, références, contexte). Cela protège les vendeurs et préserve la qualité de nos relations futures. Ce n'est pas une politique commerciale — c'est ce qui nous permet de continuer à recevoir les bonnes propriétés."}
          </p>
          <p style={{ color: '#D4D5D8', fontSize: '1rem', lineHeight: 1.85 }}>
            {l === 'he'
              ? 'הזרם מחוץ-לשוק שלנו מתחיל בדרך כלל ב-8 מיליון ₪. הקצוות הגבוהים — וילות פאר בהרצליה פיתוח, בתי מנדט בטלביה — מגיעים מעל 60 מיליון ₪.'
              : l === 'en'
              ? 'Our off-market flow generally begins at 8 million NIS. The upper end — Herzliya Pituah trophy villas, Talbiyeh Mandate houses — reaches above 60 million NIS.'
              : "Notre flux off-market commence généralement à 8 millions de NIS. Le haut de gamme — villas trophées d'Herzliya Pituah, maisons mandataires de Talbieh — dépasse 60 millions de NIS."}
          </p>
        </div>
      </section>

      {/* Why off-market */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '3rem' }}>
            {l === 'he'
              ? 'העסקאות הנדל"ן המבוקשות ביותר בישראל לא קורות בשוק הפתוח. הן קורות בשיחות טלפון בין מתווכים שמכירים זה את זה חמש עשרה שנה.'
              : l === 'en'
              ? "The most desirable property transactions in Israel do not happen on the open market. They happen in phone calls between brokers who have known each other for fifteen years, in dinner conversations in Herzliya Pituah, in handshakes formalised weeks after both sides have already decided."
              : "Les transactions immobilières les plus désirables en Israël ne se déroulent pas sur le marché ouvert. Elles ont lieu dans des appels téléphoniques entre courtiers qui se connaissent depuis quinze ans, dans des conversations à des tables de dîner à Herzliya Pituah, dans des poignées de main formalisées des semaines après que les deux parties ont déjà décidé."}
          </p>

          {/* Three pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                title: { fr: 'Confidentialité', en: 'Confidentiality', he: 'סודיות' },
                desc: {
                  fr: 'Aucune photo publique, aucun voisin curieux, aucune signalisation au marché. La vente reste invisible jusqu\'à la conclusion.',
                  en: 'No public photos, no curious neighbours, no market signalling. The sale remains invisible until conclusion.',
                  he: 'אין תמונות ציבוריות, אין שכנים סקרנים.',
                },
              },
              {
                title: { fr: 'Précision tarifaire', en: 'Pricing Precision', he: 'דיוק תמחור' },
                desc: {
                  fr: 'Une propriété privée se vend à son vrai prix — pas au prix d\'annonce dégradé par la négociation publique.',
                  en: 'A private property sells at its true price — not the listing price eroded by public negotiation.',
                  he: 'נכס פרטי נמכר במחיר האמיתי שלו.',
                },
              },
              {
                title: { fr: 'Sélection', en: 'Counterparty Selection', he: 'בחירת צד' },
                desc: {
                  fr: 'Les vendeurs de propriétés générationnelles se soucient de qui est l\'acheteur. Le prix n\'est rarement le seul critère.',
                  en: 'Sellers of generational properties care about who the buyer is. Price is rarely the only criterion.',
                  he: 'מוכרי נכסים דוריים אכפת להם מי הקונה.',
                },
              },
            ].map((p, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'rgba(200,169,110,0.4)', fontWeight: 300, lineHeight: 1, marginBottom: '0.8rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {p.title[l]}
                </h3>
                <p style={{ color: '#8A8B91', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {p.desc[l]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}
