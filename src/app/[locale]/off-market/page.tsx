import type { Locale } from '@/i18n/config'
import OffMarketGate from '@/components/public/OffMarketGate'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default async function OffMarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isRTL = locale === 'he'

  return <OffMarketGate locale={locale} isRTL={isRTL} />
}
