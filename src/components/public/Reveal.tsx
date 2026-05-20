'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  /** Delay in ms before the reveal animation starts (for staggering) */
  delay?: number
  /** Vertical translation distance in px */
  distance?: number
  /** Animation duration in ms */
  duration?: number
  as?: 'div' | 'section' | 'span' | 'li'
  style?: CSSProperties
  className?: string
}

/**
 * Scroll-triggered reveal — fade + soft upward translation.
 * Signature "quiet luxury" motion: slow, no bounce, no slide.
 * Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 28,
  duration = 1400,
  as = 'div',
  style,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion → show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Tag = as as any

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms var(--ease-luxe) ${delay}ms, transform ${duration}ms var(--ease-luxe) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
