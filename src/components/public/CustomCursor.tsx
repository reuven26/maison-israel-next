'use client'

import { useEffect } from 'react'

/**
 * Curseur personnalisé (desktop uniquement) : un anneau doré qui suit la souris
 * avec une légère inertie et grossit au survol des liens, boutons et images.
 * Inactif sur tactile et si l'utilisateur préfère les animations réduites.
 */
export default function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const ring = document.createElement('div')
    ring.setAttribute('aria-hidden', 'true')
    ring.id = 'mi-cursor'
    document.body.appendChild(ring)

    const dot = document.createElement('div')
    dot.setAttribute('aria-hidden', 'true')
    dot.id = 'mi-cursor-dot'
    document.body.appendChild(dot)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let visible = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (!visible) {
        visible = true
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
      const t = e.target as HTMLElement | null
      const interactive = !!t && !!t.closest('a, button, [role="button"], input, textarea, select, [data-cursor], img')
      ring.classList.toggle('mi-cursor--hover', interactive)
    }
    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    let rafId = 0
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    document.body.classList.add('mi-cursor-on')

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.body.classList.remove('mi-cursor-on')
      ring.remove()
      dot.remove()
    }
  }, [])

  return (
    <style>{`
      .mi-cursor-on, .mi-cursor-on a, .mi-cursor-on button { cursor: none; }
      .mi-cursor-on input, .mi-cursor-on textarea, .mi-cursor-on select { cursor: text; }
      #mi-cursor {
        position: fixed; top: 0; left: 0; z-index: 99999;
        width: 34px; height: 34px; margin: -17px 0 0 -17px;
        border: 1px solid rgba(200,169,110,0.85); border-radius: 50%;
        pointer-events: none; opacity: 0;
        transition: opacity .3s ease, width .25s ease, height .25s ease,
                    margin .25s ease, background-color .25s ease, border-color .25s ease;
        will-change: transform;
      }
      #mi-cursor.mi-cursor--hover {
        width: 56px; height: 56px; margin: -28px 0 0 -28px;
        background: rgba(200,169,110,0.12); border-color: rgba(200,169,110,0.9);
      }
      #mi-cursor-dot {
        position: fixed; top: 0; left: 0; z-index: 99999;
        width: 5px; height: 5px; margin: -2.5px 0 0 -2.5px;
        background: #C8A96E; border-radius: 50%;
        pointer-events: none; opacity: 0; transition: opacity .3s ease;
        will-change: transform;
      }
      @media (hover: none), (pointer: coarse) { #mi-cursor, #mi-cursor-dot { display: none; } }
    `}</style>
  )
}
