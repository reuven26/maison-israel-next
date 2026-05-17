import Link from 'next/link'
import type { Locale } from '@/i18n/config'

interface FooterProps {
  locale: Locale
  messages: Record<string, any>
}

export default function Footer({ locale, messages }: FooterProps) {
  const f = messages.footer
  const isRTL = locale === 'he'

  const destinations = [
    ['Tel Aviv', `/${locale}/villes/tel-aviv`],
    [locale === 'he' ? 'ירושלים' : locale === 'en' ? 'Jerusalem' : 'Jérusalem', `/${locale}/villes/jerusalem`],
    ['Herzliya Pituah', `/${locale}/villes/herzliya-pituah`],
    [locale === 'he' ? 'נתניה' : 'Netanya', `/${locale}/villes/netanya`],
    ['Neve Tzedek', `/${locale}/quartiers/neve-tzedek`],
    ['Rothschild', `/${locale}/quartiers/rothschild`],
  ]

  const services = [
    [f.purchase, `/${locale}/services`],
    [f.rental, `/${locale}/services`],
    [f.investment, `/${locale}/guides`],
    [f.aliyah, `/${locale}/aliyah`],
    [f.faq, `/${locale}/faq`],
    [f.about, `/${locale}/about`],
  ]

  return (
    <footer style={{ background: '#0A0A0B', color: 'rgba(255,255,255,0.7)', padding: '4rem 2rem 2rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#C8A96E', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>MAISON</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>ISRAËL</div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '280px' }}>{f.tagline}</p>
          </div>

          {/* Destinations */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C8A96E', marginBottom: '1.2rem' }}>{f.destinations}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {destinations.map(([label, href]) => (
                <li key={href}><Link href={href} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C8A96E', marginBottom: '1.2rem' }}>{f.services}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {services.map(([label, href]) => (
                <li key={label}><Link href={href} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C8A96E', marginBottom: '1.2rem' }}>{f.contact_title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              <p>📍 12 {locale === 'he' ? 'שד׳ רוטשילד, תל אביב' : 'Boulevard Rothschild, Tel Aviv'}</p>
              <p>📞 <a href="tel:+972555002640" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+972 55 500 2640</a></p>
              <p>✉️ <a href="mailto:contact@maison-israel.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>contact@maison-israel.com</a></p>
              <p>🕐 {f.hours}</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Maison Israël. {f.rights}
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href={`/${locale}/mentions-legales`} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{f.legal}</Link>
            <Link href={`/${locale}/confidentialite`} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{f.privacy}</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp sticky */}
      <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: '2rem', right: isRTL ? 'auto' : '2rem', left: isRTL ? '2rem' : 'auto',
          background: '#25D366', color: '#fff',
          width: '56px', height: '56px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          zIndex: 999, textDecoration: 'none', fontSize: '1.5rem',
        }}>
        💬
      </a>
    </footer>
  )
}
