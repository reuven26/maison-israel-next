'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Bien } from '@/types'

interface Props {
  bien: Bien
  locale: string
  messages: Record<string, any>
}

// Signature luxury easing — slow, soft exit
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function PropertyCard({ bien, locale, messages }: Props) {
  const p = messages.properties
  const isRTL = locale === 'he'

  // Build full image array: main + gallery
  const allImages = [
    bien.image_principale,
    ...((bien.images ?? []).filter((img: string) => img && img !== bien.image_principale)),
  ].filter(Boolean)

  const [idx, setIdx] = useState(0)
  const [hovered, setHovered] = useState(false)

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    setIdx((i) => (i - 1 + allImages.length) % allImages.length)
  }
  function next(e: React.MouseEvent) {
    e.preventDefault()
    setIdx((i) => (i + 1) % allImages.length)
  }

  // Status label — thin text, no colored pill (quiet luxury)
  const statusLabel =
    bien.statut && bien.statut !== 'actif'
      ? p[`status_${bien.statut}`] ?? bien.statut
      : null

  // Eyebrow: quartier/ville · type
  const place = bien.quartier || bien.ville
  const eyebrow = [place, bien.type].filter(Boolean).join(' · ')

  // Refined price — fall back to "on request" for ultra-prime
  const priceOnRequest =
    locale === 'he' ? 'מחיר לפי בקשה' : locale === 'en' ? 'Price on request' : 'Prix sur demande'
  const priceText = bien.prix_display && bien.prix_display.trim() ? bien.prix_display : priceOnRequest

  return (
    <Link
      href={`/${locale}/projets/${bien.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — portrait 4:5, editorial */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 5', background: '#16171A' }}>
        {allImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={bien.nom}
            loading="lazy"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: i === idx ? 1 : 0,
              transition: `opacity 0.7s ${EASE}, transform 1.2s ${EASE}`,
              transform: hovered && i === idx ? 'scale(1.045)' : 'scale(1)',
            }}
          />
        ))}

        {/* Veil — lightens slightly on hover */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(180deg, rgba(8,8,10,0.05) 0%, transparent 35%, transparent 55%, rgba(8,8,10,0.45) 100%)',
            opacity: hovered ? 0.7 : 1,
            transition: `opacity 0.8s ${EASE}`,
          }}
        />

        {/* Badge — thin text label, no colored pill */}
        {(bien.badge || statusLabel) && (
          <div style={{ position: 'absolute', top: 18, [isRTL ? 'right' : 'left']: 18, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 7, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
            {bien.badge && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FAF8F4',
                background: 'rgba(8,8,10,0.4)', backdropFilter: 'blur(10px)',
                padding: '6px 12px', border: '1px solid rgba(212,184,136,0.3)',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C8A96E' }} />
                {bien.badge}
              </span>
            )}
            {statusLabel && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.85)',
                background: 'rgba(8,8,10,0.4)', backdropFilter: 'blur(10px)',
                padding: '6px 12px',
              }}>
                {statusLabel}
              </span>
            )}
          </div>
        )}

        {/* Nav arrows — refined, appear on hover only */}
        {allImages.length > 1 && hovered && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              style={{
                position: 'absolute', [isRTL ? 'right' : 'left']: 16, top: '50%', transform: 'translateY(-50%)',
                zIndex: 3, width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(8,8,10,0.45)', border: '1px solid rgba(212,184,136,0.25)',
                color: '#FAF8F4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)', transition: `background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.9)'; e.currentTarget.style.borderColor = 'transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(8,8,10,0.45)'; e.currentTarget.style.borderColor = 'rgba(212,184,136,0.25)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={isRTL ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} /></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              style={{
                position: 'absolute', [isRTL ? 'left' : 'right']: 16, top: '50%', transform: 'translateY(-50%)',
                zIndex: 3, width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(8,8,10,0.45)', border: '1px solid rgba(212,184,136,0.25)',
                color: '#FAF8F4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)', transition: `background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.9)'; e.currentTarget.style.borderColor = 'transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(8,8,10,0.45)'; e.currentTarget.style.borderColor = 'rgba(212,184,136,0.25)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={isRTL ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} /></svg>
            </button>
          </>
        )}

        {/* Image progress — thin bars */}
        {allImages.length > 1 && (
          <div style={{ position: 'absolute', bottom: 16, [isRTL ? 'left' : 'right']: 18, zIndex: 3, display: 'flex', gap: 5 }}>
            {allImages.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 18 : 6, height: 1.5,
                background: i === idx ? '#C8A96E' : 'rgba(250,248,244,0.4)',
                transition: `all 0.5s ${EASE}`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Card body — rises 8px on hover */}
      <div
        style={{
          padding: '22px 2px 28px', direction: isRTL ? 'rtl' : 'ltr',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: `transform 0.8s ${EASE}`,
        }}
      >
        {/* Eyebrow — gold, location · type */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.24em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '12px',
        }}>
          {eyebrow}
        </div>

        {/* Name — serif display */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400,
          color: '#FAF8F4', lineHeight: 1.15, marginBottom: '12px',
        }}>
          {bien.nom}
        </div>

        {/* Gold filet — grows on hover */}
        <div style={{
          width: hovered ? 44 : 24, height: 1,
          background: 'linear-gradient(90deg, #C8A96E, rgba(200,169,110,0.3))',
          marginBottom: '14px',
          transition: `width 0.8s ${EASE}`,
        }} />

        {/* Specs — caption */}
        <div style={{
          display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', letterSpacing: '0.04em',
          color: '#8A8780', marginBottom: '16px',
        }}>
          {bien.pieces && <span>{bien.pieces} {p.rooms}</span>}
          {bien.pieces && bien.surface && <span style={{ color: 'rgba(200,169,110,0.35)' }}>·</span>}
          {bien.surface && <span>{bien.surface} {p.surface}</span>}
        </div>

        {/* Price — serif, light weight (never bold sans) */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300,
          color: '#FAF8F4', letterSpacing: '0.01em',
        }}>
          {priceText}
        </div>
      </div>
    </Link>
  )
}
