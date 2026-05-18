import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://immobilierenisrael.com'

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
        logo: `${BASE_URL}/logo.png`,
        image: `${BASE_URL}/og-image.jpg`,
        telephone: '+972-3-724-8963',
        email: 'contact@immobilierenisrael.com',
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
        ],
        priceRange: '€€€€',
        currenciesAccepted: 'EUR, USD, ILS',
        knowsLanguage: ['fr', 'en', 'he'],
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
