import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import ContactFormClient from '@/components/public/ContactFormClient'

const BASE_URL = 'https://luxuryisraelrealestate.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const canonical = `${BASE_URL}/${locale}/contact`
  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: 'Contact — Conseiller Immobilier Francophone en Israël',
      description: 'Contactez nos conseillers francophones pour votre projet immobilier en Israël : achat, investissement, Aliyah. Réponse sous 24h à Tel Aviv, Jérusalem, Netanya.',
    },
    en: {
      title: 'Contact — Your Real Estate Advisor in Israel',
      description: 'Contact our advisors for your real estate project in Israel: purchase, investment, Aliyah. Response within 24h in Tel Aviv, Jerusalem, Netanya.',
    },
    he: {
      title: 'צור קשר — יועץ הנדל"ן שלך בישראל',
      description: 'צרו קשר עם היועצים שלנו לפרויקט הנדל"ן בישראל: רכישה, השקעה, עלייה. מענה תוך 24 שעות בתל אביב, ירושלים ונתניה.',
    },
  }
  const m = meta[locale] ?? meta.fr
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: {
        fr: `${BASE_URL}/fr/contact`,
        en: `${BASE_URL}/en/contact`,
        he: `${BASE_URL}/he/contact`,
        'x-default': `${BASE_URL}/fr/contact`,
      },
    },
  }
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte un appartement à Tel Aviv en 2026 ?",
      acceptedAnswer: { "@type": "Answer", text: "À Tel Aviv, les prix varient de 12 000 à 35 000 €/m² selon le quartier. Rothschild et Neve Tzedek sont les quartiers les plus chers (25 000–35 000 €/m²), tandis que Ramat Aviv et Florentin restent plus accessibles (13 000–18 000 €/m²)." },
    },
    {
      "@type": "Question",
      name: "Quels sont les frais d’achat immobilier en Israël pour un Français ?",
      acceptedAnswer: { "@type": "Answer", text: "En tant que non-résident, comptez 12 à 15 % de frais au-delà du prix d’achat : taxe d’achat (Mas Rechisha) de 8 à 10 %, honoraires d’avocat de 1,5 à 2 %, commission d’agence de 2 %, et frais techniques de 0,5 à 1 %. Un Oleh Hadash bénéficie d’un taux réduit à 0,5 % puis 5 %." },
    },
    {
      "@type": "Question",
      name: "Peut-on acheter un bien immobilier en Israël avant de faire son Aliyah ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, c’est possible mais fiscalement moins avantageux. Acheter avant l’Aliyah vous soumet à la taxe d’achat non-résident (8–10 %). En attendant d’avoir votre Teoudat Oleh avant l’achat de votre résidence principale, vous pouvez économiser jusqu’à 100 000 € sur un bien à 1,5 M€." },
    },
    {
      "@type": "Question",
      name: "Quelle ville en Israël est la plus recommandée pour les Français ?",
      acceptedAnswer: { "@type": "Answer", text: "Netanya est la capitale francophone d’Israël, avec une très forte communauté, des écoles françaises et des prix accessibles (5 500–14 000 €/m²). Jérusalem attire les familles pratiquantes. Tel Aviv convient aux actifs et entrepreneurs. Herzliya Pituah est l’option premium pour le très haut de gamme." },
    },
    {
      "@type": "Question",
      name: "Quel est le rendement locatif de l’immobilier en Israël ?",
      acceptedAnswer: { "@type": "Answer", text: "Le ROI locatif moyen en Israël se situe entre 3,5 % et 7 % selon la ville, avec des pics jusqu’à 8 % en location saisonnière à Tel Aviv. Netanya et Jérusalem offrent les meilleurs rendements pour des tickets d’entrée plus accessibles." },
    },
    {
      "@type": "Question",
      name: "Faut-il un avocat pour acheter en Israël ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, un avocat israélien est indispensable. En Israël, contrairement à la France, il n’y a pas de notaire : l’avocat sécurise la transaction, vérifie les titres de propriété, rédige le contrat et procède à l’enregistrement au cadastre (Tabu). Ne signez jamais un Zikaron Dvarim (pré-contrat) sans avocat." },
    },
    {
      "@type": "Question",
      name: "Comment financer un achat immobilier en Israël depuis la France ?",
      acceptedAnswer: { "@type": "Answer", text: "Les banques israéliennes financent jusqu’à 50 % du prix d’achat pour les non-résidents et jusqu’à 75 % pour les résidents. Les taux en 2026 oscillent entre 4,2 % et 5,6 %. Certains acheteurs combinent un crédit israélien avec un crédit hypothécaire français sur un bien existant." },
    },
    {
      "@type": "Question",
      name: "Maison Israël propose-t-elle des biens en off-market ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui. 30 à 40 % des transactions de prestige en Israël se font désormais hors marché public. Maison Israël donne accès à un portefeuille confidentiel de biens off-market à Tel Aviv, Herzliya Pituah et Jérusalem, non publiés sur les portails immobiliers." },
    },
    {
      "@type": "Question",
      name: "Quelle est la fiscalité des loyers israéliens pour un Français ?",
      acceptedAnswer: { "@type": "Answer", text: "En Israël, trois régimes existent : exonération sous ~5 654 ILS/mois, forfait à 10 % sur le loyer brut, ou régime réel. En France, ces revenus sont imposables mais la convention fiscale de 1995 prévoit un crédit d’impôt évitant la double imposition. Les revenus s’ajoutent cependant à votre taux marginal français." },
    },
    {
      "@type": "Question",
      name: "Maison Israël accompagne-t-elle les projets d’Aliyah ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui. Maison Israël propose un accompagnement complet coordonnant Aliyah et acquisition immobilière : calendrier sur 18 mois, mise en relation avec l’Agence Juive et le Consistoire, sélection du quartier en fonction du profil familial, et accès aux avantages fiscaux Oleh Hadash." },
    },
  ],
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const c = messages.contact
  const isRTL = locale === 'he'

  const details = [
    { icon: '📍', label: c.address_label, content: c.address },
    { icon: '📞', label: c.phone_label, content: '+972 55 500 2640' },
    { icon: '✉️', label: c.email_label, content: 'reouvenbenchetrit1@gmail.com' },
    { icon: '🕐', label: c.hours_label, content: c.hours },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Concierge hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '5rem', background: '#08080A', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.4rem', fontFamily: "'DM Sans', sans-serif" }}>
            {locale === 'he' ? 'קונסיירז׳ פרטי' : locale === 'en' ? 'Private Concierge' : 'Conciergerie privée'}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: '#FAF8F4', fontWeight: 300, lineHeight: 1.05, marginBottom: '1.6rem' }}>
            {locale === 'he' ? 'נתחיל בשיחה' : locale === 'en' ? 'Let us begin with a conversation' : 'Commençons par une conversation'}
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E, transparent)', margin: '0 auto 1.6rem' }} />
          <p style={{ color: 'rgba(216,212,204,0.7)', fontSize: '1.02rem', lineHeight: 1.85, fontFamily: "'DM Sans', sans-serif" }}>
            {locale === 'he'
              ? 'ללא טפסים אינסופיים. שיחה דיסקרטית אחת כדי להבין את הבריף שלכם — ואז אנו מטפלים בשאר.'
              : locale === 'en'
              ? 'No endless forms. One discreet conversation to understand your brief — then we handle the rest, in confidence.'
              : "Pas de formulaires interminables. Un échange discret pour comprendre votre projet — nous nous occupons du reste, en toute confidentialité."}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="grid-contact">
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.9rem', fontWeight: 300, color: '#FAF8F4', marginBottom: '2rem' }}>{c.coords}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {details.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: 36, height: 36, flexShrink: 0, border: '1px solid rgba(200,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '0.4rem', fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div style={{ fontSize: '0.92rem', color: '#D8D4CC', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* WhatsApp direct line */}
            <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginTop: '2.4rem', border: '1px solid rgba(200,169,110,0.35)', color: '#C8A96E', padding: '0.8rem 1.6rem', textDecoration: 'none', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he' ? 'שיחה ישירה בוואטסאפ' : locale === 'en' ? 'Direct WhatsApp line' : 'Ligne directe WhatsApp'}
            </a>
          </div>
          <ContactFormClient locale={locale} messages={messages} />
        </div>
      </section>

      <ContactProcess locale={locale} />
    </>
  )
}

function ContactProcess({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const C = {
    fr: {
      eyebrow: 'Notre processus',
      title: 'Ce qui se passe après votre message',
      steps: [
        { n: '01', t: 'Premier appel sous 24 h', d: "Un conseiller francophone vous rappelle pour comprendre votre projet : zone, budget, calendrier, profil familial, fiscalité. Cet échange dure 20 à 40 minutes et reste strictement confidentiel." },
        { n: '02', t: 'Cadrage stratégique', d: "Nous formalisons votre brief : critères prioritaires, scénarios fiscaux (Aliyah, non-résident, structure), arbitrage entre les villes et les quartiers. Vous recevez une note écrite sous une semaine." },
        { n: '03', t: 'Accès au portefeuille', d: "Nous vous présentons des biens diffusés et off-market correspondant à votre brief. Visites organisées sur place ou à distance par Zoom haute définition, avec un conseiller dédié." },
        { n: '04', t: 'Négociation et clôture', d: "Nous coordonnons l’offre, la due diligence, l’avocat israélien, la fiscalité, le transfert de fonds et la remise des clés. Vous gardez un seul interlocuteur du premier appel à la signature." },
      ],
    },
    en: {
      eyebrow: 'Our process',
      title: 'What happens after your message',
      steps: [
        { n: '01', t: 'First call within 24h', d: 'A French- or English-speaking advisor calls you back to understand your project: area, budget, timeline, family profile, taxation. The exchange lasts 20 to 40 minutes and remains strictly confidential.' },
        { n: '02', t: 'Strategic framing', d: 'We formalize your brief: priority criteria, tax scenarios (Aliyah, non-resident, structure), arbitrage between cities and neighborhoods. You receive a written note within a week.' },
        { n: '03', t: 'Portfolio access', d: 'We present listed and off-market properties matching your brief. Visits organized on site or remotely via high-definition Zoom, with a dedicated advisor.' },
        { n: '04', t: 'Negotiation and closing', d: 'We coordinate the offer, due diligence, Israeli lawyer, taxation, fund transfer and key handover. You keep one single contact from the first call to the signature.' },
      ],
    },
    he: {
      eyebrow: 'התהליך שלנו',
      title: 'מה קורה לאחר ההודעה שלכם',
      steps: [
        { n: '01', t: 'שיחה ראשונה תוך 24 שעות', d: 'יועץ דובר צרפתית או אנגלית מתקשר אליכם כדי להבין את הפרויקט: אזור, תקציב, לוח זמנים, פרופיל משפחתי ומיסוי. השיחה נמשכת 20 עד 40 דקות ונשמרת בסודיות מלאה.' },
        { n: '02', t: 'מסגור אסטרטגי', d: 'אנו מנסחים את הבריף שלכם: קריטריונים מועדפים, תרחישי מיסוי (עלייה, תושב חוץ, מבנה), בחירה בין ערים ושכונות. אתם מקבלים מסמך כתוב תוך שבוע.' },
        { n: '03', t: 'גישה לתיק', d: 'אנו מציגים בפניכם נכסים פתוחים ונכסים מחוץ לשוק שתואמים לבריף. ביקורים מאורגנים במקום או מרחוק בזום באיכות גבוהה, עם יועץ ייעודי.' },
        { n: '04', t: 'משא ומתן וסגירה', d: 'אנו מתאמים את ההצעה, בדיקת הנאותות, עורך דין ישראלי, מיסוי, העברת כספים ומסירת מפתחות. נשמר איש קשר אחד מהשיחה הראשונה ועד החתימה.' },
      ],
    },
  }
  const c = C[(locale as keyof typeof C)] ?? C.fr

  return (
    <section style={{ background: '#0A0A0B', padding: '5rem clamp(1.5rem,5vw,3rem) 6rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>{c.eyebrow}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#FAFAF9', fontWeight: 300, lineHeight: 1.2 }}>{c.title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.6rem' }}>
          {c.steps.map(s => (
            <div key={s.n} style={{ background: '#111214', border: '1px solid rgba(200,169,110,0.12)', padding: '1.8rem 1.5rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1, marginBottom: '1rem' }}>{s.n}</p>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAFAF9', marginBottom: '0.7rem', fontWeight: 500 }}>{s.t}</h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#8A8B91', lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
