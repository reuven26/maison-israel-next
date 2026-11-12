import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CLIENTELE, getClienteleBySlug } from '@/data/services-clientele'
import SeoLandingPage from '@/components/public/SeoLandingPage'

const BASE_URL = 'https://luxuryisraelrealestate.com'

export async function generateStaticParams() {
  return CLIENTELE.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const c = getClienteleBySlug(slug)
  if (!c) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: c.seoTitle[l],
    description: c.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/clientele/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/clientele/${slug}`,
        en: `${BASE_URL}/en/clientele/${slug}`,
        he: `${BASE_URL}/he/clientele/${slug}`,
        'x-default': `${BASE_URL}/fr/clientele/${slug}`,
      },
    },
    openGraph: {
      title: c.seoTitle[l],
      description: c.metaDescription[l],
      url: `${BASE_URL}/${locale}/clientele/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: [{ url: c.hero, alt: c.names[l] }],
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

export default async function ClienteleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const c = getClienteleBySlug(slug)
  if (!c) notFound()

  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: l === 'he' ? 'לקוחות' : l === 'en' ? 'Clientele' : 'Clientèle', item: `${BASE_URL}/${locale}/clientele` },
      { '@type': 'ListItem', position: 3, name: c.names[l], item: `${BASE_URL}/${locale}/clientele/${slug}` },
    ],
  }

  const faqSchema = c.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[l],
      acceptedAnswer: { '@type': 'Answer', text: f.a[l] },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <SeoLandingPage page={c} locale={locale} />
    </>
  )
}
