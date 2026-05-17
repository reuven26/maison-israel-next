import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import ContactFormClient from '@/components/public/ContactFormClient'

const BASE_URL = 'https://immobilierenisrael.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const canonical = `${BASE_URL}/${locale}/contact`
  return {
    alternates: { canonical },
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
    { icon: '✉️', label: c.email_label, content: 'contact@maison-israel.com' },
    { icon: '🕐', label: c.hours_label, content: c.hours },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ paddingTop: '120px', background: '#0A0A0B', paddingBottom: '4rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>{c.tag}</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 300 }}>{c.title}</h1>
      </div>

      <section className="section-pad" style={{ background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="grid-contact">
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#FAFAF9', marginBottom: '2rem' }}>{c.coords}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {details.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9rem', color: '#8A8B91', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactFormClient locale={locale} messages={messages} />
        </div>
      </section>
    </>
  )
}
