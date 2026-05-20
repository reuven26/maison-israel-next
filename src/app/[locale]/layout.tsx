import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, isRTL, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import '../globals.css'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  fr: {
    title: 'Immobilier en Israël — Penthouses, Villas, Appartements de Prestige | Maison Israël',
    description: "Agence immobilière francophone en Israël depuis 2009. Penthouses Tel Aviv, villas Herzliya Pituah, appartements Jérusalem, Netanya. Accompagnement Aliyah, off-market, ROI 4–7 %.",
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Luxury Real Estate in Israel — Tel Aviv, Jerusalem, Herzliya | Maison Israël',
    description: 'Premium real estate agency in Israel since 2009. Penthouses in Tel Aviv, villas in Herzliya Pituah, apartments in Jerusalem and Netanya. Aliyah support, off-market, ROI 4–7%.',
    ogLocale: 'en_US',
  },
  he: {
    title: 'נדל"ן יוקרה בישראל — תל אביב, ירושלים, הרצליה | מייזון ישראל',
    description: 'סוכנות נדל"ן יוקרה בישראל מאז 2009. פנטהאוזים בתל אביב, וילות בהרצליה פיתוח, דירות בירושלים ונתניה.',
    ogLocale: 'he_IL',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locales.includes(locale as Locale) ? locale : 'fr') as Locale
  const m = META[l]

  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${BASE_URL}/${loc}`
  languages['x-default'] = `${BASE_URL}/fr`

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: m.title, template: `%s | Maison Israël` },
    description: m.description,
    keywords: [
      'immobilier israël', 'immobilier en israël', 'acheter appartement israël',
      'immobilier tel aviv', 'immobilier jerusalem', 'immobilier netanya',
      'immobilier herzliya pituah', 'agence immobilière francophone israël',
      'aliyah immobilier', 'investissement immobilier israël',
    ],
    authors: [{ name: 'Maison Israël' }],
    creator: 'Maison Israël',
    publisher: 'Maison Israël',
    alternates: {
      canonical: `${BASE_URL}/${l}`,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: m.ogLocale,
      url: `${BASE_URL}/${l}`,
      siteName: 'Maison Israël',
      title: m.title,
      description: m.description,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Maison Israël — Immobilier en Israël' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: 'VDCOThFMTXEjFmpzQk35x5uj8chLXjTO_iazr7N0EsI',
      other: {
        'msvalidate.01': '584BA01C63E44AE28D767078C4BAE6C3',
      },
    },
  }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) notFound()

  const messages = await getMessages(locale as Locale)
  const rtl = isRTL(locale as Locale)

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <OrganizationJsonLd locale={locale as Locale} />
        <Navbar locale={locale as Locale} messages={messages} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer locale={locale as Locale} messages={messages} />
      </body>
    </html>
  )
}
