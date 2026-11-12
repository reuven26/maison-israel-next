'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Deux effets au scroll, légers et sûrs :
 *  1. Révélation des images (clip-path + fondu) quand elles entrent à l'écran.
 *     → uniquement les images situées sous la ligne de flottaison (le hero/LCP
 *       n'est jamais masqué, pour préserver la performance).
 *  2. Titres animés mot par mot (cascade) sur les titres de section en texte
 *     simple (les titres contenant du balisage, ex. <em>, sont laissés intacts).
 *
 * Inactif si l'utilisateur préfère les animations réduites.
 */
export default function ScrollReveals() {
  const pathname = usePathname()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    let io: IntersectionObserver
    let onImgScroll: (() => void) | null = null
    // léger délai pour laisser le nouveau contenu se peindre après navigation
    const t = window.setTimeout(() => {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('fx-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    // ── 1. Titres en cascade ───────────────────────────────
    const titles = Array.from(document.querySelectorAll<HTMLElement>('.section-title-dark'))
    for (const h of titles) {
      if (h.dataset.fx || h.childElementCount > 0) continue // garde le balisage intact
      const text = h.textContent ?? ''
      if (!text.trim()) continue
      const parts = text.split(/(\s+)/)
      h.textContent = ''
      let i = 0
      for (const part of parts) {
        if (part.trim() === '') {
          h.appendChild(document.createTextNode(part))
        } else {
          const span = document.createElement('span')
          span.className = 'fx-word'
          span.textContent = part
          span.style.transitionDelay = `${i * 0.045}s`
          h.appendChild(span)
          i++
        }
      }
      h.dataset.fx = '1'
      h.classList.add('fx-title')
      io.observe(h)
    }

    // ── 2. Révélation des images sous la ligne de flottaison ─
    const vh = window.innerHeight
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
    for (const img of imgs) {
      if (img.dataset.fx || img.closest('nav, footer, [data-no-fx]')) continue
      const r = img.getBoundingClientRect()
      // ignore : déjà visible (hero/au-dessus de la ligne) ou trop petit (icônes/logos)
      if (r.top < vh * 0.9) continue
      if (Math.max(r.width, img.naturalWidth) < 130) continue
      img.dataset.fx = '1'
      img.classList.add('fx-img')
    }

    // Révélation déterministe : une image est dévoilée dès qu'elle entre dans le
    // viewport (au scroll). Plus fiable que l'IntersectionObserver seul, qui
    // pouvait laisser certaines images masquées.
    onImgScroll = () => {
      const h = window.innerHeight
      document.querySelectorAll<HTMLElement>('.fx-img:not(.fx-in)').forEach((el) => {
        if (el.getBoundingClientRect().top < h * 0.94) el.classList.add('fx-in')
      })
    }
    onImgScroll()
    window.addEventListener('scroll', onImgScroll, { passive: true })
    window.addEventListener('resize', onImgScroll)
    }, 120)

    return () => {
      window.clearTimeout(t)
      io?.disconnect()
      if (onImgScroll) {
        window.removeEventListener('scroll', onImgScroll)
        window.removeEventListener('resize', onImgScroll)
      }
    }
  }, [pathname])

  return (
    <style>{`
      .fx-title .fx-word {
        display: inline-block;
        opacity: 0;
        transform: translateY(0.5em);
        transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1);
        will-change: opacity, transform;
      }
      .fx-title.fx-in .fx-word { opacity: 1; transform: none; }

      .fx-img {
        clip-path: inset(0 0 100% 0);
        opacity: 0;
        transition: clip-path 1.05s cubic-bezier(.22,1,.36,1), opacity 1.05s cubic-bezier(.22,1,.36,1);
        will-change: clip-path, opacity;
      }
      .fx-img.fx-in { clip-path: inset(0 0 0 0); opacity: 1; }
    `}</style>
  )
}
