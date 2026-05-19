import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Notre Méthode — Comment nous travaillons | Maison Israël',
    description: "La méthode Maison Israël — six étapes du brief privé à la clôture, en confidentialité, avec coordination de votre équipe juridique et fiscale.",
    tag: 'Notre méthode',
    h1: 'Une méthode discrète, structurée, et alignée sur votre horizon',
    subtitle: "Six étapes. Une seule logique : faire moins, mais mieux. Aucune visite inutile, aucune annonce qui ne corresponde pas à votre brief.",
  },
  en: {
    title: 'Our Method — How We Work | Maison Israël',
    description: 'The Maison Israël method — six steps from private brief to closing, with confidentiality and coordination of your legal and tax team.',
    tag: 'Our Method',
    h1: 'A Discreet, Structured Method Aligned With Your Horizon',
    subtitle: 'Six steps. One logic: do less, but better. No unnecessary viewing, no listing that does not match your brief.',
  },
  he: {
    title: 'השיטה שלנו | מייזון ישראל',
    description: 'השיטה של מייזון ישראל.',
    tag: 'השיטה שלנו',
    h1: 'שיטה דיסקרטית, מובנית, ומיושרת עם האופק שלך',
    subtitle: 'שישה שלבים.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/notre-methode`,
      languages: {
        fr: `${BASE_URL}/fr/notre-methode`,
        en: `${BASE_URL}/en/notre-methode`,
        he: `${BASE_URL}/he/notre-methode`,
        'x-default': `${BASE_URL}/fr/notre-methode`,
      },
    },
  }
}

const STEPS = [
  {
    title: { fr: 'Brief privé initial', en: 'Initial Private Brief', he: 'בריף פרטי ראשוני' },
    desc: {
      fr: "Une conversation confidentielle, sans engagement, pour comprendre votre objectif, votre horizon, votre fourchette, et la cohérence avec le marché actuel. À l'issue, nous vous disons honnêtement si nous pouvons vous être utiles — et si oui, à quelles conditions.",
      en: 'A confidential, no-commitment conversation to understand your objective, horizon, price range, and coherence with the current market. We tell you honestly afterward whether we can be useful — and if so, under what conditions.',
      he: 'שיחה סודית, ללא התחייבות.',
    },
  },
  {
    title: { fr: 'Définition du brief', en: 'Brief Definition', he: 'הגדרת הבריף' },
    desc: {
      fr: "Quartier, type, surface, orientation, calendrier d'usage, et philosophie d'investissement. Un brief bien construit filtre 80 % de l'inventaire avant la première visite. Nous prenons le temps qu'il faut sur cette étape parce qu'elle gouverne tout le reste.",
      en: 'Neighborhood, type, surface, orientation, usage schedule, and investment philosophy. A well-constructed brief filters 80% of inventory before the first viewing. We take the time this step needs because it governs everything else.',
      he: 'שכונה, סוג, שטח, אוריינטציה.',
    },
  },
  {
    title: { fr: 'Circulation et présélection', en: 'Circulation and Pre-Selection', he: 'הפצה ובחירה מוקדמת' },
    desc: {
      fr: "Nous circulons votre brief dans notre réseau — conseillers, courtiers, vendeurs directs — anonymement. Nous présélectionnons 5 à 10 propriétés correspondant exactement, dont une majorité en off-market. Vous voyez moins de propriétés, mais les bonnes.",
      en: 'We circulate your brief through our network — advisors, brokers, direct sellers — anonymously. We pre-select 5–10 exactly-matching properties, the majority off-market. You see fewer properties, but the right ones.',
      he: 'אנו מפיצים את הבריף ברשת שלנו — באופן אנונימי.',
    },
  },
  {
    title: { fr: 'Visites concentrées', en: 'Concentrated Viewings', he: 'ביקורים מרוכזים' },
    desc: {
      fr: "Visites organisées sur un seul déplacement en Israël lorsque c'est possible (3–5 jours). Calendrier rythmé, transport organisé, dossier détaillé par propriété. À l'issue, une shortlist de 2–3 propriétés pour la décision finale.",
      en: 'Viewings organised on a single Israel trip when possible (3–5 days). Tight schedule, organised transport, detailed file per property. The result: a 2–3 property shortlist for final decision.',
      he: 'ביקורים מאורגנים על נסיעה אחת לישראל כשאפשר.',
    },
  },
  {
    title: { fr: 'Négociation et offre', en: 'Negotiation and Offer', he: 'משא ומתן והצעה' },
    desc: {
      fr: "Une fois la propriété identifiée, négociation menée par votre conseiller principal en coordination avec votre avocat. Offre écrite, contre-offres, conditions suspensives, calendrier de paiement. Notre intérêt est aligné avec le vôtre : un bon prix d'entrée détermine la performance sur dix ans.",
      en: 'Once the property is identified, negotiation led by your principal advisor in coordination with your lawyer. Written offer, counter-offers, conditions precedent, payment schedule. Our interest is aligned with yours: a good entry price determines ten-year performance.',
      he: 'לאחר זיהוי הנכס, משא ומתן בהובלת היועץ הראשי שלך.',
    },
  },
  {
    title: { fr: 'Clôture et au-delà', en: 'Closing and Beyond', he: 'סגירה ומעבר' },
    desc: {
      fr: "Coordination avec votre avocat pour le contrat, due diligence, paiement échelonné, enregistrement au Tabu. Après la clôture, nous restons disponibles pour la mise en location, la gestion d'entretien, et la déclaration fiscale annuelle. Pour beaucoup de clients, c'est le début d'une relation longue.",
      en: 'Coordination with your lawyer for the contract, due diligence, staged payment, Tabu registration. After closing, we remain available for rental setup, maintenance management, and annual tax filing. For many clients, this is the beginning of a long relationship.',
      he: 'תיאום עם עורך הדין שלך לחוזה, בדיקת נאותות, תשלום שלבי, רישום בטאבו.',
    },
  },
]

const PRINCIPLES = [
  {
    title: { fr: 'Confidentialité absolue', en: 'Absolute Confidentiality', he: 'סודיות מוחלטת' },
    desc: {
      fr: "Aucun nom partagé sans autorisation. Aucune information transmise hors de notre équipe directe. Aucune communication non sollicitée. Votre brief, vos visites, votre acquisition restent votre affaire.",
      en: 'No name shared without authorisation. No information transmitted outside our direct team. No unsolicited communication. Your brief, your viewings, your acquisition remain your business.',
      he: 'אין שם משותף ללא אישור.',
    },
  },
  {
    title: { fr: 'Alignement des intérêts', en: 'Alignment of Interests', he: 'יישור אינטרסים' },
    desc: {
      fr: "Nous sommes payés à la transaction, à un taux fixe, alignés avec la qualité de votre acquisition — pas avec le volume. Nous refusons régulièrement des transactions qui ne nous semblent pas dans votre intérêt.",
      en: 'We are paid on transaction at a fixed rate, aligned with the quality of your acquisition — not the volume. We regularly turn down transactions we do not believe serve your interest.',
      he: 'אנו מתוגמלים בעסקה בשיעור קבוע.',
    },
  },
  {
    title: { fr: 'Coordination, pas substitution', en: 'Coordination, Not Substitution', he: 'תיאום, לא תחליף' },
    desc: {
      fr: "Nous ne remplaçons ni votre avocat, ni votre fiscaliste, ni votre family office. Nous travaillons avec eux. Notre rôle est l'expertise sectorielle et géographique ; la stratégie patrimoniale reste votre équipe principale.",
      en: 'We do not replace your lawyer, your tax advisor, or your family office. We work with them. Our role is sector and geographic expertise; wealth strategy remains your principal team.',
      he: 'אנו לא מחליפים את עורך הדין שלך.',
    },
  },
]

export default async function NotreMethodePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  return (
    <>
      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.15 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '660px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      {/* 6 Steps */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', marginBottom: '3.5rem', alignItems: 'start' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: 'rgba(200,169,110,0.4)', fontWeight: 300, lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {s.title[l]}
                </h2>
                <p style={{ color: '#D4D5D8', fontSize: '1rem', lineHeight: 1.85 }}>
                  {s.desc[l]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: '6rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              {l === 'he' ? 'עקרונות' : l === 'en' ? 'Principles' : 'Principes'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9' }}>
              {l === 'he' ? 'איך אנחנו עובדים' : l === 'en' ? 'How we operate' : 'Comment nous opérons'}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '1rem auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1rem' }}>
                  {p.title[l]}
                </h3>
                <p style={{ color: '#8A8B91', fontSize: '0.95rem', lineHeight: 1.8 }}>
                  {p.desc[l]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? 'נתחיל בשיחה' : l === 'en' ? 'Begin with a conversation' : 'Commencer par une conversation'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'ללא התחייבות. סודי.' : l === 'en' ? 'No commitment. Confidential.' : 'Sans engagement. Confidentiel.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
        </Link>
      </section>
    </>
  )
}
