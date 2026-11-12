'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const INSTAGRAM_HANDLE = 'luxuryrealestateisrael'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

// Images de fallback (Tel Aviv, Jérusalem, Herzliya) affichées quand le token est expiré
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567606404787-c11b7e90a55b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?w=600&auto=format&fit=crop&q=80',
]

interface Post {
  id: string
  caption: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
}

interface Props {
  locale: string
  messages: Record<string, any>
}

const labels: Record<string, Record<string, string>> = {
  fr: {
    tag: 'Suivez-nous',
    title: 'Sur Instagram',
    subtitle: 'Découvrez nos biens en exclusivité, les plus beaux quartiers d\'Israël et nos actualités.',
    follow: 'Suivre @' + INSTAGRAM_HANDLE,
    view: 'Voir sur Instagram',
  },
  en: {
    tag: 'Follow us',
    title: 'On Instagram',
    subtitle: 'Discover our exclusive listings, the most beautiful neighbourhoods in Israel and our latest news.',
    follow: 'Follow @' + INSTAGRAM_HANDLE,
    view: 'View on Instagram',
  },
  he: {
    tag: 'עקבו אחרינו',
    title: 'באינסטגרם',
    subtitle: 'גלו את הנכסים הבלעדיים שלנו, השכונות היפות בישראל ועדכונים שוטפים.',
    follow: 'עקוב @' + INSTAGRAM_HANDLE,
    view: 'צפה באינסטגרם',
  },
}

export default function InstagramFeed({ locale, messages }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [configured, setConfigured] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isRTL = locale === 'he'
  const l = labels[locale] ?? labels.fr

  // Différé : on ne récupère le flux Instagram que lorsque la section approche
  // du viewport, pour ne pas charger réseau + rendu pendant le chargement initial.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let started = false
    const run = () => {
      if (started) return
      started = true
      fetch('/api/instagram')
        .then(r => r.json())
        .then(data => {
          setPosts(data.posts ?? [])
          setConfigured(data.configured ?? false)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          run()
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '6rem 2rem',
      background: '#0A0A0B',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="instagram-header">
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {l.tag}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#fff', marginBottom: '0.8rem' }}>
              {l.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', maxWidth: '450px', lineHeight: 1.7 }}>
              {l.subtitle}
            </p>
          </div>

          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            border: '1px solid rgba(200,169,110,0.4)',
            color: '#C8A96E', padding: '0.7rem 1.5rem',
            textDecoration: 'none', fontSize: '0.8rem',
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: isRTL ? '0' : '0.1em',
            transition: 'all 0.3s',
          }}>
            <InstagramIcon />
            {l.follow}
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid-instagram">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1', background: '#1E1E22', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : configured && posts.length > 0 ? (
          <div className="grid-instagram">
            {posts.map(post => (
              <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', display: 'block', textDecoration: 'none' }}>
                <img
                  src={post.media_url}
                  alt={post.caption?.slice(0, 80) ?? 'Instagram post'}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: hoveredId === post.id ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(10,10,11,0.75)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  opacity: hoveredId === post.id ? 1 : 0,
                  transition: 'opacity 0.3s',
                  padding: '1rem', textAlign: 'center',
                }}>
                  <InstagramIcon size={28} color="#C8A96E" />
                  {post.caption && (
                    <p style={{ color: '#fff', fontSize: '0.75rem', marginTop: '0.8rem', lineHeight: 1.5, maxWidth: '200px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any }}>
                      {post.caption}
                    </p>
                  )}
                  <span style={{ fontSize: '0.65rem', color: '#C8A96E', marginTop: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l.view}</span>
                </div>
                {post.media_type === 'VIDEO' && (
                  <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.65rem', padding: '0.2rem 0.4rem' }}>▶</div>
                )}
              </a>
            ))}
          </div>
        ) : (
          /* Fallback — token expired / not configured */
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="grid-instagram" style={{ cursor: 'pointer' }}>
              {PLACEHOLDER_IMAGES.map((img, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
                  />
                  {i === 4 && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(10,10,11,0.6)', gap: '12px',
                    }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <InstagramIcon size={26} color="#fff" />
                      </div>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#fff', letterSpacing: '0.05em' }}>@{INSTAGRAM_HANDLE}</span>
                      <span style={{ border: '1px solid rgba(200,169,110,0.5)', color: '#C8A96E', padding: '6px 18px', fontSize: '0.68rem', fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {l.follow}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </a>
        )}

        {/* Bottom CTA */}
        {configured && posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.3s' }}>
              <InstagramIcon size={16} />
              @{INSTAGRAM_HANDLE}
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}

function InstagramIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  )
}
