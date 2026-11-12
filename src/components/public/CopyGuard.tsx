'use client'

import { useEffect } from 'react'

/**
 * Dissuasion anti-copie sur le site public :
 *  - désactive la sélection de texte, le copier/couper, le clic droit,
 *    le glisser-déposer et le menu contextuel sur images.
 *  - laisse les champs de saisie (input, textarea, formulaires) fonctionnels.
 *
 * NB : c'est un garde-fou, pas une protection absolue — le HTML reste lisible
 * par « afficher la source », les robots et les lecteurs. Il décourage
 * simplement la copie casual du contenu et des photos.
 */
export default function CopyGuard() {
  useEffect(() => {
    const allowed = (e: Event) => {
      const t = e.target as HTMLElement | null
      return !!t && !!t.closest('input, textarea, select, [contenteditable="true"]')
    }
    const block = (e: Event) => {
      if (allowed(e)) return
      e.preventDefault()
    }
    const events = ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart']
    events.forEach((ev) => document.addEventListener(ev, block))
    return () => events.forEach((ev) => document.removeEventListener(ev, block))
  }, [])

  return (
    <style>{`
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      input, textarea, select, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      img { -webkit-user-drag: none; user-drag: none; }
    `}</style>
  )
}
