'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const VILLES = [
  'Tel Aviv', 'Jérusalem', 'Herzliya Pituah', 'Netanya',
  'Caesarea', 'Ramat Gan', 'Haïfa', 'Eilat',
]
const TYPES = ['Appartement', 'Penthouse', 'Villa', 'Duplex', 'Studio', 'Loft', 'Maison']
const PIECES = ['1', '2', '3', '4', '5+']
const BUDGETS = [
  { label: '500 000 €',   value: '500000' },
  { label: '750 000 €',   value: '750000' },
  { label: '1 000 000 €', value: '1000000' },
  { label: '1 500 000 €', value: '1500000' },
  { label: '2 000 000 €', value: '2000000' },
  { label: '3 000 000 €', value: '3000000' },
  { label: '5 000 000 €', value: '5000000' },
  { label: 'Sans limite',  value: '' },
]

interface Props {
  locale: string
  isRTL: boolean
}

export default function HeroSearch({ locale, isRTL }: Props) {
  const router = useRouter()

  const tabs = [
    { key: 'acheter',   label: locale === 'he' ? 'לקנות'   : locale === 'en' ? 'Buy'             : 'Acheter' },
    { key: 'louer',     label: locale === 'he' ? 'לשכור'   : locale === 'en' ? 'Rent'            : 'Louer' },
    { key: 'saisonnier',label: locale === 'he' ? 'נופש'    : locale === 'en' ? 'Short-term'      : 'Location saisonnière' },
  ]

  const [tab,      setTab]      = useState('acheter')
  const [ville,    setVille]    = useState('')
  const [budget,   setBudget]   = useState('')
  const [type,     setType]     = useState('')
  const [pieces,   setPieces]   = useState('')
  const [more,     setMore]     = useState(false)

  function handleSearch() {
    const p = new URLSearchParams()
    if (tab)    p.set('mode',   tab)
    if (ville)  p.set('ville',  ville)
    if (budget) p.set('budget', budget)
    if (type)   p.set('type',   type)
    if (pieces) p.set('pieces', pieces)
    router.push(`/${locale}/projets?${p.toString()}`)
  }

  const selectStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#FAFAF9',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    cursor: 'pointer',
    width: '100%',
    padding: 0,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  }

  return (
    <div style={{
      width: '100%',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 3rem' }} className="hero-search-wrap">

        {/* Card */}
        <div style={{
          background: 'rgba(10,10,11,0.82)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(200,169,110,0.18)',
          overflow: 'hidden',
        }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(200,169,110,0.12)' }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding: '0.85rem 1.8rem',
                  background: 'none', border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: tab === t.key ? 600 : 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tab === t.key ? '#C8A96E' : 'rgba(255,255,255,0.45)',
                  borderBottom: tab === t.key ? '2px solid #C8A96E' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Main search row */}
          <div style={{ display: 'flex', alignItems: 'stretch' }} className="hero-search-row">

            {/* Location */}
            <div style={{
              flex: 1, padding: '1rem 1.4rem',
              borderRight: '1px solid rgba(200,169,110,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.62rem', color: '#8A8B91', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  {locale === 'he' ? 'איפה?' : locale === 'en' ? 'Location' : 'Où cherchez-vous ?'}
                </div>
                <select
                  value={ville}
                  onChange={e => setVille(e.target.value)}
                  style={{ ...selectStyle, fontSize: ville ? '0.88rem' : '0.82rem', color: ville ? '#FAFAF9' : 'rgba(255,255,255,0.35)' }}
                >
                  <option value="">{locale === 'he' ? 'כל הערים' : locale === 'en' ? 'All cities' : 'Toutes les villes'}</option>
                  {VILLES.map(v => <option key={v} value={v} style={{ background: '#111214', color: '#fff' }}>{v}</option>)}
                </select>
              </div>
            </div>

            {/* Divider line — visible on desktop */}
            <div style={{ width: '1px', background: 'rgba(200,169,110,0.1)', flexShrink: 0 }} />

            {/* Budget */}
            <div style={{
              flex: 1, padding: '1rem 1.4rem',
              borderRight: '1px solid rgba(200,169,110,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.62rem', color: '#8A8B91', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  {locale === 'he' ? 'תקציב מקסימלי' : locale === 'en' ? 'Max budget' : 'Budget max'}
                </div>
                <select
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  style={{ ...selectStyle, fontSize: budget ? '0.88rem' : '0.82rem', color: budget ? '#FAFAF9' : 'rgba(255,255,255,0.35)' }}
                >
                  <option value="" style={{ background: '#111214' }}>{locale === 'he' ? 'ללא הגבלה' : locale === 'en' ? 'No limit' : 'Sans limite'}</option>
                  {BUDGETS.filter(b => b.value).map(b => (
                    <option key={b.value} value={b.value} style={{ background: '#111214', color: '#fff' }}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              style={{
                padding: '0 2rem',
                background: '#C8A96E',
                border: 'none',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b8975e')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8A96E')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
                fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#0A0A0B', whiteSpace: 'nowrap',
              }} className="search-btn-label">
                {locale === 'he' ? 'חיפוש' : locale === 'en' ? 'Search' : 'Rechercher'}
              </span>
            </button>
          </div>

          {/* Expanded filters */}
          {more && (
            <div style={{
              padding: '1rem 1.4rem',
              borderTop: '1px solid rgba(200,169,110,0.1)',
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
            }} className="hero-search-more">
              {/* Type */}
              <div>
                <div style={{ fontSize: '0.6rem', color: '#8A8B91', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {locale === 'en' ? 'Property type' : 'Type de bien'}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(type === t ? '' : t)}
                      style={{
                        padding: '0.3rem 0.7rem',
                        background: type === t ? '#C8A96E' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${type === t ? '#C8A96E' : 'rgba(200,169,110,0.2)'}`,
                        color: type === t ? '#0A0A0B' : 'rgba(255,255,255,0.6)',
                        fontSize: '0.72rem', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'all 0.15s',
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Pièces */}
              <div>
                <div style={{ fontSize: '0.6rem', color: '#8A8B91', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {locale === 'he' ? 'חדרים' : locale === 'en' ? 'Rooms' : 'Nombre de pièces'}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {PIECES.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPieces(pieces === p ? '' : p)}
                      style={{
                        width: 36, height: 36,
                        background: pieces === p ? '#C8A96E' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${pieces === p ? '#C8A96E' : 'rgba(200,169,110,0.2)'}`,
                        color: pieces === p ? '#0A0A0B' : 'rgba(255,255,255,0.6)',
                        fontSize: '0.8rem', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >{p}</button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => { setVille(''); setBudget(''); setType(''); setPieces('') }}
                  style={{
                    background: 'none', border: 'none',
                    color: '#8A8B91', cursor: 'pointer',
                    fontSize: '0.72rem', letterSpacing: '0.1em',
                    fontFamily: 'DM Sans, sans-serif',
                    textDecoration: 'underline',
                  }}
                >
                  {locale === 'en' ? 'Reset' : 'Réinitialiser'}
                </button>
              </div>
            </div>
          )}

          {/* More criteria toggle */}
          <button
            onClick={() => setMore(m => !m)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              width: '100%', padding: '0.65rem 1.4rem',
              background: 'none', border: 'none',
              borderTop: '1px solid rgba(200,169,110,0.08)',
              color: 'rgba(200,169,110,0.7)',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C8A96E')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,169,110,0.7)')}
          >
            <span>{more
              ? (locale === 'en' ? 'Fewer criteria' : 'Moins de critères')
              : (locale === 'en' ? 'More criteria'  : 'Plus de critères')}
            </span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ transform: more ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-search-wrap { padding: 0 1rem 1.5rem !important; }
          .hero-search-row { flex-direction: column !important; }
          .hero-search-row > div { border-right: none !important; border-bottom: 1px solid rgba(200,169,110,0.1); }
          .hero-search-row > button { width: 100%; justify-content: center; padding: 1rem !important; }
          .hero-search-more { grid-template-columns: 1fr !important; }
          .search-btn-label { display: inline !important; }
        }
      `}</style>
    </div>
  )
}
