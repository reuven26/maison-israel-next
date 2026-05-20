/**
 * GuideTldr — extraction-shaped "key takeaway" block for LLM citation.
 * Renders a self-contained, quotable answer near the top of a guide.
 * Pair with FAQPage schema for maximum AI extractability.
 */
export default function GuideTldr({ text, label = "L'essentiel" }: { text: string; label?: string }) {
  return (
    <section style={{ background: '#0A0A0B', padding: '3rem 2rem 0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ borderInlineStart: '2px solid #C8A96E', paddingInlineStart: '1.6rem' }}>
          <p style={{ fontSize: '0.66rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.9rem', fontFamily: "'DM Sans', sans-serif" }}>
            {label}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.25rem, 2.2vw, 1.55rem)', fontWeight: 300, color: 'rgba(250,248,244,0.92)', lineHeight: 1.6, margin: 0 }}>
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
