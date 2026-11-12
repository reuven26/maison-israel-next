import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://luxuryisraelrealestate.com'

/**
 * FAQPage JSON-LD — booste la visibilité dans les Rich Snippets Google
 * ET dans les réponses ChatGPT / Perplexity / Gemini (GEO).
 */
export function FaqJsonLd({ items }: { items: Array<{ q: string; a: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
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

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': `${BASE_URL}/#organization`,
        name: 'Maison Israël',
        alternateName: 'Immobilier en Israël',
        description:
          "Agence immobilière de prestige dédiée aux acheteurs et investisseurs francophones en Israël. Penthouses, villas et appartements à Tel Aviv, Herzliya Pituah, Jérusalem et Netanya.",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.svg`,
        image: `${BASE_URL}/og-image.jpg`,
        telephone: '+972-55-500-2640',
        email: 'reouvenbenchetrit1@gmail.com',
        foundingDate: '2009',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '12 Boulevard Rothschild',
          addressLocality: 'Tel Aviv',
          postalCode: '6688306',
          addressCountry: 'IL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 32.0641,
          longitude: 34.772,
        },
        areaServed: [
          { '@type': 'City', name: 'Tel Aviv' },
          { '@type': 'City', name: 'Jérusalem' },
          { '@type': 'City', name: 'Herzliya Pituah' },
          { '@type': 'City', name: 'Netanya' },
          { '@type': 'City', name: 'Césarée' },
          { '@type': 'City', name: 'Savyon' },
        ],
        priceRange: '€€€€',
        currenciesAccepted: 'EUR, USD, ILS',
        knowsLanguage: ['fr', 'en', 'he'],
        slogan: "Un accès discret aux adresses les plus rares d'Israël.",
        knowsAbout: [
          'Luxury real estate Israel',
          'Off-market property',
          'Aliyah real estate',
          'Foreign buyer property acquisition Israel',
          'Mas Rechisha (Israeli purchase tax)',
          'Prime property Jerusalem',
          'Prime property Tel Aviv',
          'Herzliya Pituah villas',
          'Caesarea real estate',
        ],
        // Catalogue d'offres explicite — aide les LLM à comprendre ce que l'agence propose
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Maison Israël — Luxury real estate services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Private property search',
                description: 'Personalized search for luxury properties in Israel, with a dedicated multilingual advisor (French, English, Hebrew) and access to off-market opportunities.',
                serviceType: 'Real estate buyer representation',
                areaServed: ['Tel Aviv', 'Jerusalem', 'Herzliya Pituah', 'Netanya', 'Caesarea', 'Savyon'],
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Off-market property access',
                description: 'Curated portfolio of luxury properties never publicly listed, available to qualified clients after a confidentiality agreement.',
                serviceType: 'Off-market real estate',
                areaServed: ['Tel Aviv', 'Jerusalem', 'Herzliya Pituah', 'Caesarea', 'Savyon'],
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Aliyah real estate guidance',
                description: 'End-to-end support for French-speaking and English-speaking families making Aliyah, including pre-acquisition tax planning, Olé Hadash purchase tax optimization, and post-arrival settlement.',
                serviceType: 'Aliyah relocation real estate',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Investment advisory',
                description: 'Comparative analyses across Israeli prime markets (Tel Aviv, Jerusalem, Herzliya Pituah, Caesarea), yield modeling, capital appreciation forecasting, and tax structuring for international investors.',
                serviceType: 'Real estate investment advisory',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Property valuation',
                description: 'Professional valuation of luxury Israeli properties for acquisition, sale, succession or wealth planning purposes.',
                serviceType: 'Real estate valuation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Transaction coordination',
                description: 'Coordination of the full closing process: Israeli lawyer, due diligence, fund transfer from EUR/USD to ILS, purchase tax filing (Mas Rechisha), and key handover.',
                serviceType: 'Real estate closing services',
              },
            },
          ],
        },
        // Faits clés — uniquement des affirmations vérifiables
        award: [
          'Operating in Israel since 2009',
        ],
        founder: { '@id': `${BASE_URL}/#founder` },
        sameAs: [
          'https://www.instagram.com/luxuryrealestateisrael/',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#founder`,
        name: 'Réouven Benchetrit',
        alternateName: ['Reuven Benchetrit'],
        description:
          locale === 'he'
            ? 'ראובן בנשטרית מייצג לקוחות אמידים ובעלי הון רב בנדל"ן יוקרה בישראל — רכישות, מכירות דיסקרטיות והזדמנויות מחוץ לשוק.'
            : locale === 'en'
            ? 'Reuven Benchetrit represents high net worth and ultra high net worth clients in Israeli luxury real estate — acquisitions, discreet sales and off-market opportunities.'
            : "Reuven Benchetrit représente une clientèle fortunée et ultra-fortunée dans l'immobilier de prestige en Israël — acquisitions, ventes discrètes et opportunités off-market.",
        jobTitle: locale === 'he' ? 'מייסד ויועץ ראשי' : locale === 'en' ? 'Founder & Principal Advisor' : 'Fondateur & Conseiller principal',
        worksFor: { '@id': `${BASE_URL}/#organization` },
        url: `${BASE_URL}/${locale}/equipe`,
        sameAs: [
          'https://www.instagram.com/luxuryrealestateisrael/',
        ],
        knowsLanguage: ['fr', 'en', 'he'],
        knowsAbout: [
          'Luxury real estate Israel',
          'Aliyah property acquisition',
          'Off-market transactions',
          'International buyer advisory',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Maison Israël',
        description: 'Immobilier de prestige en Israël pour francophones.',
        publisher: { '@id': `${BASE_URL}/#organization` },
        inLanguage: locale === 'fr' ? 'fr-FR' : locale === 'he' ? 'he-IL' : 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/${locale}/projets?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
