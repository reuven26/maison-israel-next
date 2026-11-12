'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

/**
 * Couche parallaxe : l'enfant (typiquement une image de hero) se déplace plus
 * lentement que le scroll, créant une impression de profondeur.
 *
 * À placer comme enfant direct d'un conteneur `position: relative; overflow:
 * hidden` (le hero). La couche est volontairement surdimensionnée (130%) pour
 * ne jamais révéler de bord pendant le déplacement.
 * Désactivé si l'utilisateur préfère les animations réduites.
 */
export default function Parallax({
  children,
  speed = 0.12,
  style,
}: {
  children: ReactNode
  speed?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    let raf = 0
    let ticking = false
    const update = () => {
      ticking = false
      const rect = parent.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return // hors écran
      const max = rect.height * 0.07
      let offset = -rect.top * speed
      offset = Math.max(-max, Math.min(max, offset))
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div
      ref={ref}
      data-no-fx
      style={{
        position: 'absolute',
        top: '-8%',
        left: 0,
        width: '100%',
        height: '116%',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
