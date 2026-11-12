import Image from 'next/image'

/**
 * Bandeau « Ils parlent de nous » / « As featured in ».
 * Affiche la bande de logos presse (public/press/featured.png) sur un fond
 * clair assorti à l'image, pour un rendu « featured on » net et professionnel.
 */

const LABEL: Record<string, string> = {
  fr: 'Ils parlent de nous',
  en: 'As featured in',
  he: 'מהתקשורת',
}

const ALT: Record<string, string> = {
  fr: 'Maison Israël dans les médias : The New York Times, The Times of Israel, Globes, mako, ynet',
  en: 'Maison Israël in the media: The New York Times, The Times of Israel, Globes, mako, ynet',
  he: 'מייזון ישראל בתקשורת: ניו יורק טיימס, טיימס אוף ישראל, גלובס, mako, ynet',
}

export default function PressStrip({ locale = 'fr' }: { locale?: string }) {
  const isRTL = locale === 'he'
  const label = LABEL[locale] ?? LABEL.fr
  const alt = ALT[locale] ?? ALT.fr

  return (
    <section
      style={{
        background: '#F2F2F2',
        padding: '2.6rem 2rem',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '1150px', margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: isRTL ? '0' : '0.35em',
            textTransform: isRTL ? 'none' : 'uppercase',
            color: '#9A7B3F',
            marginBottom: '1.6rem',
          }}
        >
          {label}
        </p>
        <Image
          src="/press/featured.png"
          alt={alt}
          width={2296}
          height={232}
          sizes="(max-width: 1150px) 100vw, 1100px"
          style={{ width: '100%', maxWidth: '1100px', height: 'auto', margin: '0 auto', display: 'block' }}
        />
      </div>
    </section>
  )
}
