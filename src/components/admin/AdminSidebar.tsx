'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: '◈' },
  { href: '/admin/hero', label: "Page d'accueil", icon: '🖼️' },
  { href: '/admin/biens', label: 'Biens', icon: '🏠' },
  { href: '/admin/off-market', label: 'Off Market', icon: '🔒', gold: true },
  { href: '/admin/articles', label: 'Articles', icon: '📝' },
  { href: '/admin/leads', label: 'Leads', icon: '👥' },
  { href: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Close sidebar when route changes (mobile nav)
  useEffect(() => { setOpen(false) }, [pathname])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
        style={{
          display: 'none',
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 100,
          background: '#141416',
          border: '1px solid rgba(200,169,110,0.2)',
          color: '#C8A96E',
          width: '42px',
          height: '42px',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.2rem',
          borderRadius: '4px',
        }}
        className="admin-hamburger"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 49,
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C8A96E', letterSpacing: '0.15em' }}>MAISON</div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>ISRAËL · ADMIN</div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map(item => {
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                background: isActive ? 'rgba(200,169,110,0.1)' : 'transparent',
                borderLeft: isActive ? '2px solid #C8A96E' : '2px solid transparent',
                color: isActive ? '#C8A96E' : (item.gold ? 'rgba(200,169,110,0.7)' : 'rgba(255,255,255,0.6)'),
                fontSize: '0.85rem',
                transition: 'all 0.2s',
              }}>
                <span>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.gold && !isActive && (
                  <span style={{ fontSize: '8px', letterSpacing: '0.15em', background: 'rgba(200,169,110,0.15)', color: '#C8A96E', padding: '2px 6px', borderRadius: 2 }}>PRIVÉ</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0', textDecoration: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            <span>↗</span><span>Voir le site</span>
          </Link>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', padding: '0.6rem 0', width: '100%',
            transition: 'color 0.2s',
          }}>
            <span>⏻</span><span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .admin-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
