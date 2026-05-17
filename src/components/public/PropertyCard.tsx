'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Bien } from '@/types'

interface Props {
  bien: Bien
  locale: string
  messages: Record<string, any>
}

const statusColors: Record<string, string> = {
  actif: '#22C55E',
  vendu: '#EF4444',
  sous_compromis: '#F59E0B',
  loue: '#3B82F6',
}

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
    setIdx(i => (i - 1 + allImages.length) % allImages.length)
  }
  function next(e: React.MouseEvent) {
    e.preventDefault()
    setIdx(i => (i + 1) % allImages.length)
  }

  const modeLabel =
    locale === 'en' ? 'FOR SALE' : locale === 'he' ? 'למכירה' : 'À VENDRE'

  return (
    <Link
      href={`/${locale}/projets/${bien.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '380px', background: '#111214' }}>
        {allImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={bien.nom}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 0.5s ease, transform 0.7s ease',
              transform: hovered && i === idx ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.65) 100%)', zIndex: 1 }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {bien.badge && (
            <span style={{ background: '#C8A96E', color: '#0A0A0B', padding: '4px 10px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {bien.badge}
            </span>
          )}
          {bien.statut !== 'actif' && (
            <span style={{ background: statusColors[bien.statut], color: '#fff', padding: '4px 10px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {p[`status_${bien.statut}`] ?? bien.statut}
            </span>
          )}
        </div>

        {/* Nav arrows — shown only if multiple images */}
        {allImages.length > 1 && hovered && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                zIndex: 3, width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(10,10,11,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,11,0.7)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                zIndex: 3, width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(10,10,11,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,11,0.7)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <div style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 3, display: 'flex', gap: 4 }}>
            {allImages.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 16 : 5, height: 2,
                background: i === idx ? '#C8A96E' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 0 24px', direction: isRTL ? 'rtl' : 'ltr', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
        {/* Type + ville header */}
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: '#8A8B91', textTransform: 'uppercase', marginBottom: '8px' }}>
          {modeLabel} {bien.type}
          {bien.ville && <><span style={{ margin: '0 8px', color: 'rgba(200,169,110,0.3)' }}>|</span>{bien.ville.toUpperCase()}</>}
        </div>

        {/* Name */}
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 400, color: '#FAFAF9', marginBottom: '6px', lineHeight: 1.2 }}>
          {bien.nom}
        </div>

        {/* Location */}
        {bien.quartier && (
          <div style={{ fontSize: '12px', color: '#8A8B91', marginBottom: '10px' }}>
            {bien.quartier} · {bien.ville}
          </div>
        )}

        {/* Specs */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#8A8B91', marginBottom: '14px', flexWrap: 'wrap' }}>
          {bien.pieces && (
            <span>{bien.pieces} {p.rooms}</span>
          )}
          {bien.pieces && bien.surface && <span style={{ color: 'rgba(200,169,110,0.3)' }}>•</span>}
          {bien.surface && (
            <span>{bien.surface} {p.surface}</span>
          )}
        </div>

        {/* Price */}
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 500, color: '#FAFAF9' }}>
          {bien.prix_display}
        </div>
      </div>
    </Link>
  )
}
