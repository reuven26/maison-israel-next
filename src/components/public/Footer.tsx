import Link from 'next/link'
import type { Locale } from '@/i18n/config'

interface FooterProps {
  locale: Locale
  messages: Record<string, any>
}

export default function Footer({ locale, messages }: FooterProps) {
  const f = messages.footer
  const isRTL = locale === 'he'
  const l = locale

  /* ── Column 2 — Marchés (cities + top quartiers) ──── */
  const destinations: [string, string][] = [
    ['Tel Aviv', `/${l}/villes/tel-aviv`],
    [locale === 'he' ? 'ירושלים' : locale === 'en' ? 'Jerusalem' : 'Jérusalem', `/${l}/villes/jerusalem`],
    ['Herzliya Pituah', `/${l}/villes/herzliya-pituah`],
    [locale === 'he' ? 'קיסריה' : locale === 'en' ? 'Caesarea' : 'Césarée', `/${l}/villes/caesarea`],
    [locale === 'he' ? 'נתניה' : 'Netanya', `/${l}/villes/netanya`],
    [locale === 'he' ? 'כל השכונות' : locale === 'en' ? 'All neighborhoods' : 'Tous les quartiers', `/${l}/quartiers`],
  ]

  /* ── Column 3 — Quartiers premium ──── */
  const quartiers: [string, string][] = [
    ['Talbieh', `/${l}/quartiers/jerusalem/talbieh`],
    [locale === 'he' ? 'המושבה הגרמנית' : locale === 'en' ? 'German Colony' : 'Colonie Allemande', `/${l}/quartiers/jerusalem/colonie-allemande`],
    ['Neve Tzedek', `/${l}/quartiers/tel-aviv/neve-tzedek`],
    ['Rothschild', `/${l}/quartiers/tel-aviv/rothschild`],
    ['Galei Tchelet', `/${l}/quartiers/herzliya-pituah/galei-tchelet`],
    [locale === 'he' ? 'קיסריה א׳' : 'Caesarea Aleph', `/${l}/quartiers/caesarea/caesarea-aleph`],
  ]

  /* ── Column 4 — Services & Clientèle ──── */
  const servicesLinks: [string, string][] = [
    [locale === 'he' ? 'חיפוש פרטי' : locale === 'en' ? 'Private Search' : 'Recherche personnalisée', `/${l}/services/recherche-personnalisee`],
    [locale === 'he' ? 'מחוץ לשוק' : 'Off-Market', `/${l}/services/off-market`],
    [locale === 'he' ? 'הערכה' : locale === 'en' ? 'Valuation' : 'Estimation', `/${l}/services/estimation`],
    [locale === 'he' ? 'ייעוץ השקעות' : locale === 'en' ? 'Investment Advisory' : 'Conseil investissement', `/${l}/services/conseil-investissement`],
    [locale === 'he' ? 'משקיעים בינלאומיים' : locale === 'en' ? 'International Investors' : 'Investisseurs', `/${l}/clientele/investisseurs-internationaux`],
    [locale === 'he' ? 'עולים' : locale === 'en' ? 'Aliyah buyers' : 'Acheteurs aliyah', `/${l}/clientele/aliyah`],
    [locale === 'he' ? 'לקוחות' : locale === 'en' ? 'Clientele' : 'Clientèle', `/${l}/clientele`],
  ]

  /* ── Column 5 — Resources & Trust ──── */
  const resources: [string, string][] = [
    ['Journal', `/${l}/journal`],
    [locale === 'he' ? 'המעגל' : locale === 'en' ? 'The Circle' : 'Le Cercle', `/${l}/club`],
    [locale === 'he' ? 'מצפה השוק' : locale === 'en' ? 'Market Report' : 'Observatoire', `/${l}/observatoire`],
    [locale === 'he' ? 'סוגי נכסים' : locale === 'en' ? 'Property Types' : 'Types de biens', `/${l}/biens`],
    [locale === 'he' ? 'הצוות שלנו' : locale === 'en' ? 'Our Team' : 'Notre équipe', `/${l}/equipe`],
    [locale === 'he' ? 'השיטה שלנו' : locale === 'en' ? 'Our Method' : 'Notre méthode', `/${l}/notre-methode`],
    [locale === 'he' ? 'אודות' : locale === 'en' ? 'About' : 'À propos', `/${l}/about`],
    [locale === 'he' ? 'המלצות' : locale === 'en' ? 'Testimonials' : 'Témoignages', `/${l}/temoignages`],
  ]

  const colHeading = (txt: string) => (
    <h4 style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.62rem', color: '#C8A96E', marginBottom: '1.3rem', fontWeight: 400, letterSpacing: isRTL ? '0.04em' : '0.34em', textTransform: isRTL ? 'none' : 'uppercase' }}>{txt}</h4>
  )

  const linkStyle = { color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.82rem', lineHeight: 1.6 } as const

  return (
    <footer style={{ background: '#0A0A0B', color: 'rgba(255,255,255,0.7)', padding: '5rem 2rem 2rem', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }} className="footer-grid">

          {/* Brand + tagline */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
              MAISON <span style={{ color: '#C8A96E' }}>ISRAËL</span>
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.6rem' }}>
              {locale === 'he' ? 'נדל"ן יוקרה · ישראל' : locale === 'en' ? 'Luxury Real Estate · Israel' : 'Immobilier de Prestige · Israël'}
            </div>
            <div style={{ fontSize: '0.78rem', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'rgba(250,248,244,0.6)', marginBottom: '1.5rem' }}>
              {locale === 'he' ? 'נוסד ומנוהל על ידי ראובן בנשטרית' : locale === 'en' ? 'Founded and led by Reuven Benchetrit' : 'Fondé et dirigé par Reuven Benchetrit'}
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '300px', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>
              {f?.tagline ?? (locale === 'he' ? 'מלווה משקיעים בינלאומיים בנדל"ן ישראלי מאז 2009.' : locale === 'en' ? 'Supporting international investors in Israeli real estate since 2009.' : "Accompagnons les investisseurs internationaux en immobilier israélien depuis 2009.")}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="tel:+972555002640" style={{ color: '#C8A96E', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em' }}>+972 55 500 2640</a>
              <a href="mailto:reouvenbenchetrit1@gmail.com" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>reouvenbenchetrit1@gmail.com</a>
            </div>
          </div>

          {/* Marchés */}
          <div>
            {colHeading(locale === 'he' ? 'שווקים' : locale === 'en' ? 'Markets' : 'Marchés')}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0, margin: 0 }}>
              {destinations.map(([label, href]) => (
                <li key={href}><Link href={href} style={linkStyle}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quartiers */}
          <div>
            {colHeading(locale === 'he' ? 'שכונות' : locale === 'en' ? 'Neighborhoods' : 'Quartiers')}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0, margin: 0 }}>
              {quartiers.map(([label, href]) => (
                <li key={href}><Link href={href} style={linkStyle}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            {colHeading(locale === 'he' ? 'שירותים' : 'Services')}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0, margin: 0 }}>
              {servicesLinks.map(([label, href]) => (
                <li key={href}><Link href={href} style={linkStyle}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            {colHeading(locale === 'he' ? 'מקורות' : locale === 'en' ? 'Resources' : 'Ressources')}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0, margin: 0 }}>
              {resources.map(([label, href]) => (
                <li key={href}><Link href={href} style={linkStyle}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Address bar */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.12)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: '1.4rem 0', marginBottom: '1.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            12 {locale === 'he' ? 'שדרות רוטשילד, תל אביב' : 'Boulevard Rothschild, Tel Aviv'} · {locale === 'he' ? 'ישראל' : 'Israel'}
          </div>
          <div style={{ color: 'rgba(200,169,110,0.6)' }}>
            {locale === 'he' ? 'ראשון–חמישי 09:00–18:00' : locale === 'en' ? 'Sun–Thu 09:00–18:00' : 'Dimanche–Jeudi 09:00–18:00'}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            © {new Date().getFullYear()} Maison Israël. {f?.rights ?? (locale === 'en' ? 'All rights reserved.' : locale === 'he' ? 'כל הזכויות שמורות.' : 'Tous droits réservés.')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href={`/${l}/best-luxury-real-estate-israel`} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              {locale === 'en' ? 'Best luxury agency in Israel' : locale === 'he' ? 'הסוכנות המובילה בישראל' : 'Meilleure agence en Israël'}
            </Link>
            <Link href={`/${l}/why-us`} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              {locale === 'en' ? 'Why us' : locale === 'he' ? 'למה אנחנו' : 'Pourquoi nous'}
            </Link>
            <Link href={`/${l}/mentions-legales`} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              {f?.legal ?? (locale === 'en' ? 'Legal' : locale === 'he' ? 'משפטי' : 'Mentions légales')}
            </Link>
            <Link href={`/${l}/confidentialite`} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              {f?.privacy ?? (locale === 'en' ? 'Privacy' : locale === 'he' ? 'פרטיות' : 'Confidentialité')}
            </Link>
            <Link href={`/${l}/contact`} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp sticky */}
      <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp" className="wa-float"
        style={{
          position: 'fixed', bottom: '2rem', right: isRTL ? 'auto' : '2rem', left: isRTL ? '2rem' : 'auto',
          background: '#25D366', color: '#fff',
          width: '58px', height: '58px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 22px rgba(37,211,102,0.45)',
          zIndex: 999, textDecoration: 'none',
        }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a18.18 18.18 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
