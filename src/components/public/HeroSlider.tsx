'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Parallax from '@/components/public/Parallax'

const L10N: Record<string, { city: string; labels: string[] }> = {
  fr: {
    city: 'Jérusalem',
    labels: ['Résidence de Prestige', 'Architecture & Raffinement', 'Exclusivité & Élégance'],
  },
  en: {
    city: 'Jerusalem',
    labels: ['Distinguished Residence', 'Architecture & Refinement', 'Exclusivity & Elegance'],
  },
  he: {
    city: 'ירושלים',
    labels: ['דירת יוקרה', 'אדריכלות ועידון', 'בלעדיות ואלגנטיות'],
  },
}

const SLIDE_SRCS = ['/hero/slide1.jpg', '/hero/slide2.jpg', '/hero/slide3.jpg']

export default function HeroSlider({
  locale = 'fr',
  initialImages,
}: {
  locale?: string
  /** Hero images fetched server-side (site_settings → key "hero"). Falls back to bundled slides. */
  initialImages?: string[]
}) {
  const loc = (locale in L10N ? locale : 'fr') as keyof typeof L10N
  const srcs = initialImages && initialImages.length ? initialImages : SLIDE_SRCS
  const SLIDES = srcs.map((src, i) => ({
    src,
    city: L10N[loc].city,
    label: L10N[loc].labels[i % L10N[loc].labels.length],
  }))

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (SLIDES.length < 2) return
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [SLIDES.length])

  return (
    <>
      {/* Slides — real <img> via next/image so the LCP image is discoverable in the
          initial HTML and auto-served as AVIF/WebP. First slide is priority.
          Couche parallaxe : les images se déplacent en profondeur au scroll. */}
      <Parallax speed={0.18}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.8s ease',
              animation: i === current ? 'sliderZoom 8s ease-in-out forwards' : 'none',
            }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}
      </Parallax>

      {/* Bottom: city label + progress dots */}
      <div style={{
        position: 'absolute', bottom: '2.2rem', left: '3rem',
        zIndex: 5, display: 'flex', alignItems: 'center', gap: '2rem',
      }}>
        {/* City name */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(200,169,110,0.6)', textTransform: 'uppercase', marginBottom: '3px' }}>
            {SLIDES[current].label}
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>
            {SLIDES[current].city}
          </div>
        </div>

        {/* Progress bars */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 6,
                height: 2,
                background: i === current ? '#C8A96E' : 'rgba(200,169,110,0.28)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.5s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sliderZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.07); }
        }
      `}</style>
    </>
  )
}
