import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES, getServiceBySlug } from '@/data/services-clientele'
import SeoLandingPage from '@/components/public/SeoLandingPage'

const BASE_URL = 'https://luxuryisraelrealestate.com'

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) return {}
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  return {
    title: s.seoTitle[l],
    description: s.metaDescription[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/services/${slug}`,
        en: `${BASE_URL}/en/services/${slug}`,
        he: `${BASE_URL}/he/services/${slug}`,
        'x-default': `${BASE_URL}/fr/services/${slug}`,
      },
    },
    openGraph: {
      title: s.seoTitle[l],
      description: s.metaDescription[l],
      url: `${BASE_URL}/${locale}/services/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: [{ url: s.hero, alt: s.names[l] }],
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 3600

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) notFound()

  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'

  // Service + Breadcrumb + FAQ JSON-LD
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.names[l],
    description: s.metaDescription[l],
    provider: { '@type': 'RealEstateAgent', name: 'Maison Israël', url: BASE_URL },
    areaServed: { '@type': 'Country', name: 'Israel' },
    image: s.hero,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'he' ? 'בית' : l === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: l === 'he' ? 'שירותים' : 'Services', item: `${BASE_URL}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: s.names[l], item: `${BASE_URL}/${locale}/services/${slug}` },
    ],
  }

  const faqSchema = s.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[l],
      acceptedAnswer: { '@type': 'Answer', text: f.a[l] },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <SeoLandingPage page={s} locale={locale} />
    </>
  )
}
