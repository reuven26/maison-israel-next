import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, isRTL, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import '../globals.css'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Maison Israël — Immobilier de Prestige',
    en: 'Maison Israël — Luxury Real Estate',
    he: 'מייזון ישראל — נדל"ן יוקרה',
  }
  return {
    title: titles[locale] ?? titles.fr,
    description: 'Luxury real estate specialist in Israel.',
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
        <Navbar locale={locale as Locale} messages={messages} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer locale={locale as Locale} messages={messages} />
      </body>
    </html>
  )
}
