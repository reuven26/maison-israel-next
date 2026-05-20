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
  ]

  /* ── Column 5 — Resources & Trust ──── */
  const resources: [string, string][] = [
    ['Journal', `/${l}/journal`],
    [locale === 'he' ? 'סוגי נכסים' : locale === 'en' ? 'Property Types' : 'Types de biens', `/${l}/biens`],
    [locale === 'he' ? 'הצוות שלנו' : locale === 'en' ? 'Our Team' : 'Notre équipe', `/${l}/equipe`],
    [locale === 'he' ? 'השיטה שלנו' : locale === 'en' ? 'Our Method' : 'Notre méthode', `/${l}/notre-methode`],
    [locale === 'he' ? 'אודות' : locale === 'en' ? 'About' : 'À propos', `/${l}/about`],
    [locale === 'he' ? 'המלצות' : locale === 'en' ? 'Testimonials' : 'Témoignages', `/${l}/temoignages`],
  ]

  const colHeading = (txt: string) => (
    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: '#C8A96E', marginBottom: '1.1rem', fontWeight: 400, letterSpacing: '0.02em' }}>{txt}</h4>
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
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '1.5rem' }}>
              {locale === 'he' ? 'נדל"ן יוקרה · ישראל' : locale === 'en' ? 'Luxury Real Estate · Israel' : 'Immobilier de Prestige · Israël'}
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '300px', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>
              {f?.tagline ?? (locale === 'he' ? 'מלווה משקיעים בינלאומיים בנדל"ן ישראלי מאז 2009.' : locale === 'en' ? 'Supporting international investors in Israeli real estate since 2009.' : "Accompagnons les investisseurs internationaux en immobilier israélien depuis 2009.")}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="tel:+972555002640" style={{ color: '#C8A96E', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em' }}>+972 55 500 2640</a>
              <a href="mailto:contact@maison-israel.com" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>contact@maison-israel.com</a>
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
          <div style={{ display: 'flex', gap: '1.5rem' }}>
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
          width: '56px', height: '56px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          zIndex: 999, textDecoration: 'none', fontSize: '1.5rem',
        }}>
        💬
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
