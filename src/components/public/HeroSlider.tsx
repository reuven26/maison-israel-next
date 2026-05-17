'use client'

import { useState, useEffect } from 'react'

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=2200&auto=format&fit=crop&q=85',
    city: 'Tel Aviv',
    label: 'La Ville Blanche',
  },
  {
    src: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=2200&auto=format&fit=crop&q=85',
    city: 'Jérusalem',
    label: 'Éternelle & Intemporelle',
  },
  {
    src: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=2200&auto=format&fit=crop&q=85',
    city: 'Tel Aviv',
    label: 'Front de Mer',
  },
  {
    src: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=2200&auto=format&fit=crop&q=85',
    city: 'Jérusalem',
    label: 'Vieille Ville',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2200&auto=format&fit=crop&q=85',
    city: 'Herzliya Pituah',
    label: 'Résidences de Prestige',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.8s ease',
            animation: i === current ? 'sliderZoom 8s ease-in-out forwards' : 'none',
          }}
        />
      ))}

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
