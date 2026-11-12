'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'

interface NavbarProps {
  locale: Locale
  messages: Record<string, any>
}

export default function Navbar({ locale, messages }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const nav = messages.nav
  const isRTL = locale === 'he'

  const quartiersLabel = locale === 'he' ? 'שכונות' : locale === 'en' ? 'Neighborhoods' : 'Quartiers'
  const offMarketLabel = locale === 'he' ? 'מחוץ לשוק' : 'Off-Market'

  // Navigation épurée : on ne garde que l'essentiel en haut.
  // Quartiers, Clientèle, Journal et Le Cercle vivent dans le footer.
  const navLinks = [
    { href: `/${locale}/projets`, label: nav.properties },
    { href: `/${locale}/off-market`, label: offMarketLabel },
    { href: `/${locale}/contact`, label: nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll() // état correct dès le montage (rechargement en milieu de page)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLocale(newLocale: string) {
    // Replace current locale in path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    router.push(newPath)
  }

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

  const langLabels: Record<string, string> = { fr: 'FR', en: 'EN', he: 'עב' }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled || !isHome ? 'rgba(10,10,11,0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.15)' : 'none',
        padding: scrolled ? '0.8rem 2rem' : '1.5rem 2rem',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, color: '#FAFAF9', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Maison <span style={{ color: '#C8A96E' }}>Israël</span>
              </span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem', fontWeight: 300, color: 'rgba(200,169,110,0.5)', letterSpacing: isRTL ? '0.1em' : '0.28em', textTransform: 'uppercase' }}>
                {isRTL ? 'ראובן בנשטרית' : locale === 'en' ? 'by Reuven Benchetrit' : 'par Reuven Benchetrit'}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul style={{ gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="hidden md:flex">
            {navLinks.map(link => (
              <li key={link.href} style={{ position: 'relative' }}>
                <Link href={link.href} style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '0.68rem',
                  letterSpacing: isRTL ? '0' : '0.26em', textTransform: isRTL ? 'none' : 'uppercase',
                  color: pathname.startsWith(link.href) ? '#C8A96E' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none', transition: 'color 0.3s',
                  paddingBottom: '4px',
                  borderBottom: pathname.startsWith(link.href) ? '1px solid #C8A96E' : '1px solid transparent',
                }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Language switcher */}
            <div style={{ gap: '0.3rem' }} className="hidden md:flex">
              {locales.map(l => (
                <button key={l} onClick={() => switchLocale(l)} style={{
                  background: l === locale ? 'rgba(200,169,110,0.2)' : 'transparent',
                  border: l === locale ? '1px solid rgba(200,169,110,0.5)' : '1px solid rgba(255,255,255,0.15)',
                  color: l === locale ? '#C8A96E' : 'rgba(255,255,255,0.5)',
                  padding: '0.25rem 0.5rem', cursor: 'pointer',
                  fontSize: '0.65rem', letterSpacing: '0.05em',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: l === locale ? 600 : 400,
                  transition: 'all 0.2s',
                }}>
                  {langLabels[l]}
                </button>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer" style={{
              alignItems: 'center', gap: '0.4rem',
              border: '1px solid rgba(200,169,110,0.35)',
              color: '#C8A96E', padding: '0.55rem 1rem',
              textDecoration: 'none', fontSize: '0.7rem',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.3s',
            }} className="hidden md:flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8A96E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>

            {/* Contact CTA */}
            <Link href={`/${locale}/contact`} style={{
              fontFamily: 'Jost, sans-serif', fontSize: '0.64rem',
              letterSpacing: isRTL ? '0' : '0.24em',
              textTransform: isRTL ? 'none' : 'uppercase',
              color: '#C8A96E', background: 'transparent',
              border: '1px solid rgba(200,169,110,0.55)',
              padding: '0.62rem 1.5rem', textDecoration: 'none',
              fontWeight: 400, transition: 'all 0.4s var(--ease-luxe)',
            }} className="hidden md:block">
              {nav.consultation}
            </Link>

            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
              className="md:hidden">
              <div style={{ width: 24, height: 2, background: '#C8A96E', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <div style={{ width: 24, height: 2, background: '#C8A96E', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <div style={{ width: 24, height: 2, background: '#C8A96E', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(10,10,11,0.98)',
          zIndex: 999, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', gap: '2rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#fff', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
          {/* Language switcher mobile */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {locales.map(l => (
              <button key={l} onClick={() => { switchLocale(l); setMenuOpen(false) }} style={{
                background: l === locale ? '#C8A96E' : 'transparent',
                border: '1px solid rgba(200,169,110,0.4)',
                color: l === locale ? '#0A0A0B' : '#C8A96E',
                padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile bottom tab bar — glassmorphism, thumb-friendly */}
      <nav className="mobile-tab-bar" style={{ direction: isRTL ? 'rtl' : 'ltr' }} aria-label="Mobile navigation">
        {[
          { href: `/${locale}`, label: locale === 'he' ? 'בית' : locale === 'en' ? 'Home' : 'Accueil', exact: true,
            icon: <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" /> },
          { href: `/${locale}/projets`, label: nav.properties,
            icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> },
          { href: `/${locale}/quartiers`, label: quartiersLabel,
            icon: <><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> },
          { href: `/${locale}/contact`, label: nav.contact,
            icon: <><rect x="2" y="4" width="20" height="16" rx="1" /><path d="M22 6l-10 7L2 6" /></> },
        ].map((item) => {
          const active = item.exact ? (pathname === item.href || pathname === `${item.href}/`) : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className="mobile-tab" style={{ color: active ? '#C8A96E' : 'rgba(250,248,244,0.55)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
