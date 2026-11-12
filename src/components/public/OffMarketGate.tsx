'use client'

import { useState, useEffect } from 'react'
import { optImg } from '@/lib/img'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Bien } from '@/types'

// ── Mot de passe à modifier ici ───────────────────────────────────────────────
const OFF_MARKET_PASSWORD = 'ISRAEL2025'
const SESSION_KEY = 'mi-offmarket-unlocked'
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  actif: '#22C55E', vendu: '#EF4444', sous_compromis: '#F59E0B', loue: '#3B82F6',
}

interface Props {
  locale: string
  isRTL: boolean
  variant?: 'full' | 'inline'
}

export default function OffMarketGate({ locale, isRTL, variant = 'inline' }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput]       = useState('')
  const [wrong, setWrong]       = useState(false)
  const [shake, setShake]       = useState(false)
  const [biens, setBiens]       = useState<Bien[]>([])
  const [loading, setLoading]   = useState(false)
  const [lightbox, setLightbox] = useState<Bien | null>(null)

  // Restore session
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') unlock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function unlock() {
    setLoading(true)
    sessionStorage.setItem(SESSION_KEY, '1')
    const supabase = createClient()
    const { data } = await supabase
      .from('biens')
      .select('*')
      .eq('off_market', true)
      .not('masque', 'is', true)
      .order('created_at', { ascending: false })
    setBiens(data ?? [])
    setLoading(false)
    setUnlocked(true)
  }

  function tryPassword(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim().toUpperCase() === OFF_MARKET_PASSWORD) {
      setWrong(false)
      unlock()
    } else {
      setWrong(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setInput('')
    }
  }

  const dir = isRTL ? 'rtl' : 'ltr'

  // ── PASSWORD GATE ───────────────────────────────────────────────────────────
  if (!unlocked) {
    // ── INLINE variant — compact form for embedding within SEO page ──────────
    if (variant === 'inline') {
      return (
        <>
          <style>{`
            @keyframes omShake {
              0%,100%{ transform:translateX(0) }
              20%    { transform:translateX(-8px) }
              40%    { transform:translateX(8px) }
              60%    { transform:translateX(-6px) }
              80%    { transform:translateX(6px) }
            }
            .om-shake { animation: omShake 0.5s ease; }
          `}</style>
          <div style={{ maxWidth: '440px', margin: '0 auto', direction: dir }}>
            <form onSubmit={tryPassword} className={shake ? 'om-shake' : ''}>
              <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
                <input
                  type="password"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setWrong(false) }}
                  placeholder={locale === 'he' ? 'הכנס קוד...' : locale === 'en' ? 'Enter access code…' : "Code d'accès…"}
                  style={{
                    width: '100%', padding: '0.95rem 1.2rem',
                    background: '#111214',
                    border: `1px solid ${wrong ? 'rgba(239,68,68,0.6)' : 'rgba(200,169,110,0.25)'}`,
                    color: '#FAFAF9', fontSize: '0.95rem',
                    fontFamily: 'DM Sans, sans-serif',
                    letterSpacing: '0.2em',
                    outline: 'none', textAlign: 'center',
                    direction: 'ltr',
                  }}
                />
              </div>
              {wrong && (
                <p style={{ fontSize: '0.76rem', color: '#F87171', marginBottom: '0.8rem', textAlign: 'center' }}>
                  {locale === 'he' ? 'קוד שגוי' : locale === 'en' ? 'Incorrect code' : 'Code incorrect'}
                </p>
              )}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '0.95rem',
                  background: '#C8A96E', color: '#0A0A0B',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                }}
              >
                {locale === 'he' ? 'גישה' : locale === 'en' ? 'Unlock portfolio' : 'Déverrouiller le portfolio'}
              </button>
            </form>
          </div>
        </>
      )
    }

    // ── FULL variant — original full-page gate ──────────────────────────────
    return (
      <>
        <style>{`
          @keyframes omShake {
            0%,100%{ transform:translateX(0) }
            20%    { transform:translateX(-8px) }
            40%    { transform:translateX(8px) }
            60%    { transform:translateX(-6px) }
            80%    { transform:translateX(6px) }
          }
          .om-shake { animation: omShake 0.5s ease; }
        `}</style>

        <div style={{
          minHeight: '100vh',
          background: '#0A0A0B',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
          direction: dir,
        }}>
          {/* Decorative lines */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.3))' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '1px', height: '80px', background: 'linear-gradient(to top, transparent, rgba(200,169,110,0.3))' }} />
          </div>

          <div style={{ position: 'relative', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            {/* Lock icon */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                width: 64, height: 64, border: '1px solid rgba(200,169,110,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="0" ry="0"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <p style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {locale === 'he' ? 'גישה פרטית' : locale === 'en' ? 'Private Access' : 'Accès Privé'}
              </p>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 300, color: '#FAFAF9', lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}>
                {locale === 'he' ? 'פורטפוליו' : 'Portefeuille'}<br />
                <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>Off Market</em>
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#8A8B91', lineHeight: 1.7 }}>
                {locale === 'he'
                  ? 'נכסים בלעדיים שאינם מפורסמים לציבור הרחב'
                  : locale === 'en'
                  ? 'Exclusive properties not available to the general public'
                  : 'Biens exclusifs non diffusés au grand public'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={tryPassword} className={shake ? 'om-shake' : ''}>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  type="password"
                  value={input}
                  onChange={e => { setInput(e.target.value); setWrong(false) }}
                  placeholder={locale === 'he' ? 'הכנס סיסמה...' : locale === 'en' ? 'Enter password...' : 'Entrez le mot de passe...'}
                  autoFocus
                  style={{
                    width: '100%', padding: '1rem 1.2rem',
                    background: '#111214',
                    border: `1px solid ${wrong ? 'rgba(239,68,68,0.6)' : 'rgba(200,169,110,0.25)'}`,
                    color: '#FAFAF9', fontSize: '1rem',
                    fontFamily: 'DM Sans, sans-serif',
                    letterSpacing: '0.2em',
                    outline: 'none', textAlign: 'center',
                    direction: 'ltr',
                  }}
                />
              </div>
              {wrong && (
                <p style={{ fontSize: '0.78rem', color: '#F87171', marginBottom: '1rem' }}>
                  {locale === 'he' ? 'סיסמה שגויה' : locale === 'en' ? 'Incorrect password' : 'Mot de passe incorrect'}
                </p>
              )}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '1rem',
                  background: '#C8A96E', color: '#0A0A0B',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                }}
              >
                {locale === 'he' ? 'כניסה' : locale === 'en' ? 'Access' : 'Accéder'}
              </button>
            </form>

            {/* Back */}
            <Link href={`/${locale}`} style={{
              display: 'inline-block', marginTop: '2rem',
              fontSize: '0.72rem', color: '#4A4B50',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              ← {locale === 'he' ? 'חזרה' : locale === 'en' ? 'Back' : 'Retour'}
            </Link>
          </div>
        </div>
      </>
    )
  }

  // ── LOADING ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C8A96E', opacity: 0.6 }}>
          ✦
        </div>
      </div>
    )
  }

  // ── LISTINGS ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div style={{ paddingTop: '80px' }} />

      {/* Header */}
      <div style={{
        background: '#111214', padding: '3rem 3rem 2.5rem',
        borderBottom: '1px solid rgba(200,169,110,0.1)',
        direction: dir,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#C8A96E', textTransform: 'uppercase' }}>
                  {locale === 'he' ? 'פורטפוליו פרטי' : locale === 'en' ? 'Private Portfolio' : 'Portefeuille Privé'}
                </span>
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1 }}>
                {locale === 'he' ? 'נכסים' : locale === 'en' ? 'Off Market' : 'Off Market'}{' '}
                <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>
                  {locale === 'he' ? 'אקסקלוסיביים' : locale === 'en' ? 'Properties' : '& Exclusivités'}
                </em>
              </h1>
            </div>
            <div style={{ fontSize: '12px', color: '#8A8B91', textAlign: isRTL ? 'left' : 'right' }}>
              <strong style={{ color: '#D4D5D8', fontWeight: 500, fontSize: '14px' }}>{biens.length}</strong>{' '}
              {locale === 'he' ? 'נכסים' : locale === 'en' ? 'properties' : 'biens dans le portefeuille'}
              <br />
              <button
                onClick={() => { sessionStorage.removeItem(SESSION_KEY); setUnlocked(false) }}
                style={{ marginTop: '6px', background: 'none', border: 'none', color: '#4A4B50', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}
              >
                {locale === 'he' ? 'התנתק' : locale === 'en' ? 'Log out' : 'Se déconnecter'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer banner */}
      <div style={{
        background: 'rgba(200,169,110,0.06)',
        borderBottom: '1px solid rgba(200,169,110,0.1)',
        padding: '0.9rem 3rem',
        direction: dir,
      }}>
        <p style={{ maxWidth: '1400px', margin: '0 auto', fontSize: '0.78rem', color: '#8A8B91' }}>
          <span style={{ color: '#C8A96E', marginRight: '0.5rem' }}>⚠</span>
          {locale === 'he'
            ? 'מידע זה הינו חסוי. אנא אל תשתף עם גורמים שלישיים.'
            : locale === 'en'
            ? 'This information is confidential. Please do not share with third parties.'
            : 'Ces informations sont confidentielles. Merci de ne pas les diffuser à des tiers.'}
        </p>
      </div>

      {/* Grid */}
      <section style={{ padding: '3rem', background: '#0A0A0B', minHeight: '60vh', direction: dir }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {biens.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: '#C8A96E', marginBottom: '1.5rem', opacity: 0.4 }}>✦</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', marginBottom: '1rem' }}>
                {locale === 'en' ? 'No properties at the moment' : 'Aucun bien pour le moment'}
              </p>
              <p style={{ color: '#8A8B91' }}>
                {locale === 'en' ? 'Contact us to discuss your project' : 'Contactez-nous pour discuter de votre projet'}
              </p>
            </div>
          ) : (
            <div className="grid-properties">
              {biens.map(bien => (
                <div
                  key={bien.id}
                  onClick={() => setLightbox(bien)}
                  className="pcard"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="pcard-img-wrap">
                    <img src={optImg(bien.image_principale, 828, 70)} alt={bien.nom} loading="lazy" className="pcard-img" />
                    <div className="pcard-overlay" />
                    <div className="pcard-badges">
                      {bien.badge && <span className="pbadge pbadge-gold">{bien.badge}</span>}
                      <span style={{
                        background: STATUS_COLORS[bien.statut] ?? '#888',
                        color: '#fff', padding: '4px 10px',
                        fontSize: '9px', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                      }}>
                        {bien.statut === 'actif' ? (locale === 'en' ? 'Available' : 'Disponible')
                          : bien.statut === 'sous_compromis' ? (locale === 'en' ? 'Under offer' : 'Sous compromis')
                          : bien.statut === 'vendu' ? (locale === 'en' ? 'Sold' : 'Vendu')
                          : locale === 'en' ? 'Rented' : 'Loué'}
                      </span>
                    </div>
                    {/* Off-market watermark */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'rgba(10,10,11,0.65)',
                      padding: '6px 12px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C8A96E', textTransform: 'uppercase' }}>
                        Off Market
                      </span>
                    </div>
                  </div>
                  <div className="pcard-body" style={{ direction: dir }}>
                    <div className="pcard-city">{bien.quartier ? `${bien.quartier} · ${bien.ville}` : bien.ville}</div>
                    <div className="pcard-name">{bien.nom}</div>
                    <div className="pcard-specs">
                      <span>{bien.type}</span><span>·</span>
                      <span>{bien.surface} m²</span>
                      {bien.pieces && <><span>·</span><span>{bien.pieces} pièces</span></>}
                    </div>
                    <div className="pcard-price-row">
                      <div className="pcard-price">{bien.prix_display}</div>
                      {bien.roi && <div className="pcard-roi">ROI {bien.roi}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA bottom */}
      <section style={{ background: '#111214', padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', direction: dir }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '1rem' }}>
          {locale === 'en' ? 'Interested?' : 'Vous êtes intéressé ?'}
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1rem' }}>
          {locale === 'he' ? 'צרו קשר' : locale === 'en' ? 'Contact our team' : 'Contactez notre équipe'}
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${locale}/contact`} style={{
            background: '#C8A96E', color: '#0A0A0B', padding: '0.9rem 2.5rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
            fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {locale === 'en' ? 'Contact us' : 'Nous contacter'}
          </Link>
          <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer" style={{
            border: '1px solid rgba(200,169,110,0.35)', color: '#C8A96E',
            padding: '0.9rem 2.5rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            WhatsApp
          </a>
        </div>
      </section>

      {/* Quick-view lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111214', maxWidth: '740px', width: '100%',
              border: '1px solid rgba(200,169,110,0.2)',
              maxHeight: '90vh', overflowY: 'auto',
              direction: dir,
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
              <img src={optImg(lightbox.image_principale, 1080, 75)} alt={lightbox.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.7) 0%, transparent 50%)' }} />
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: 36, height: 36,
                  background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', cursor: 'pointer', fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
              <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {lightbox.quartier ? `${lightbox.quartier} · ${lightbox.ville}` : lightbox.ville}
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#fff', fontWeight: 300 }}>
                  {lightbox.nom}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'rgba(200,169,110,0.06)', marginBottom: '1.5rem' }}>
                {[
                  [locale === 'en' ? 'Price' : 'Prix', lightbox.prix_display],
                  ['Surface', `${lightbox.surface} m²`],
                  ...(lightbox.pieces ? [[locale === 'en' ? 'Rooms' : 'Pièces', `${lightbox.pieces}`]] : []),
                  ...(lightbox.roi ? [['ROI', lightbox.roi]] : []),
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#1A1B1E', padding: '0.8rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#FAFAF9' }}>{val}</div>
                  </div>
                ))}
              </div>

              <p style={{ color: '#8A8B91', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {lightbox.description}
              </p>

              {lightbox.caracteristiques?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {lightbox.caracteristiques.map((c: string) => (
                    <span key={c} style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: '#C8A96E', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link
                  href={`/${locale}/projets/${lightbox.slug}`}
                  style={{
                    flex: 1, textAlign: 'center',
                    background: '#C8A96E', color: '#0A0A0B', padding: '0.85rem',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem',
                    fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  {locale === 'en' ? 'View property' : 'Voir le bien'}
                </Link>
                <a
                  href={`https://wa.me/972555002640?text=${encodeURIComponent(`Je suis intéressé(e) par : ${lightbox.nom}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, textAlign: 'center',
                    border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', padding: '0.85rem',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
