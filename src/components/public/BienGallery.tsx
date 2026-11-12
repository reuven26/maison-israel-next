'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { optImg, hiRes } from '@/lib/img'

interface Props {
  images: string[]
  mainImage: string
  nom: string
}

export default function BienGallery({ images, mainImage, nom }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const openLightbox = (idx: number) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)

  const prev = useCallback(() => {
    setLightboxIdx(i => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIdx(i => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, prev, next])

  // Show first image large + rest as thumbnails
  const first = images[0]
  const rest = images.slice(1)

  return (
    <>
      <div style={{ background: '#0A0A0B', padding: '0 clamp(0.5rem, 2vw, 2.25rem) 2px' }}>
        {/* Mosaic layout: first image big left, up to 4 thumbs right */}
        <div style={{
          maxWidth: '1860px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: rest.length > 0 ? '1fr 1fr' : '1fr',
          gridTemplateRows: rest.length > 1 ? 'clamp(240px, 21vw, 380px) clamp(240px, 21vw, 380px)' : 'clamp(340px, 36vw, 560px)',
          gap: '3px',
        }}
          className="bien-gallery-grid"
        >
          {/* Main image */}
          <div
            style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}
            onClick={() => openLightbox(0)}
          >
            <Image
              src={hiRes(first)}
              alt={`${nom} — 1`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              quality={72}
              style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* Thumbnails grid (up to 4) */}
          {rest.slice(0, 4).map((url, i) => {
            const isLast = i === 3 && images.length > 5
            return (
              <div
                key={i}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={url}
                  alt={`${nom} — ${i + 2}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  quality={68}
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {isLast && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(10,10,11,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '0.4rem',
                  }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#fff', fontWeight: 300 }}>
                      +{images.length - 5}
                    </span>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                      photos
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* "Voir toutes" button if many images */}
        {images.length > 5 && (
          <div style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
            <button
              onClick={() => openLightbox(0)}
              style={{
                background: 'transparent', border: '1px solid rgba(200,169,110,0.35)',
                color: '#C8A96E', padding: '0.55rem 1.8rem',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Voir les {images.length} photos
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.97)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Top bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>
              {nom}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                {lightboxIdx + 1} / {images.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Fermer la galerie"
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', width: 36, height: 36,
                  cursor: 'pointer', fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          </div>

          {/* Main image area */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden', padding: '1rem 5rem',
          }}>
            {/* Pleine résolution optimisée — chargée uniquement à l'ouverture */}
            <img
              src={optImg(images[lightboxIdx], 1920, 78)}
              alt={`${nom} — ${lightboxIdx + 1}`}
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
            />

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                aria-label="Photo précédente"
                style={{
                  position: 'absolute', left: '1rem',
                  top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', width: 48, height: 48,
                  cursor: 'pointer', fontSize: '1.3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >‹</button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); next() }}
                aria-label="Photo suivante"
                style={{
                  position: 'absolute', right: '1rem',
                  top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', width: 48, height: 48,
                  cursor: 'pointer', fontSize: '1.3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >›</button>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{
              display: 'flex', gap: '4px', padding: '0.75rem 1.5rem',
              overflowX: 'auto', flexShrink: 0,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              {images.map((url, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  style={{
                    width: 72, height: 54, flexShrink: 0, cursor: 'pointer', overflow: 'hidden',
                    border: i === lightboxIdx ? '2px solid #C8A96E' : '2px solid transparent',
                    opacity: i === lightboxIdx ? 1 : 0.5,
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={optImg(url, 256, 55)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .bien-gallery-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bien-gallery-grid > *:first-child {
            grid-row: span 1 !important;
            height: 260px;
          }
        }
      `}</style>
    </>
  )
}
