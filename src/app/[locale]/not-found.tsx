import Link from 'next/link'

/* 404 locale — rendue dans le layout [locale] (navbar + footer présents).
   Le segment ne donne pas accès à la locale ici : texte FR/EN sobre. */
export default function LocaleNotFound() {
  return (
    <section style={{
      minHeight: '70vh', background: '#0A0A0B',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '8rem 2rem 6rem',
    }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.2rem', fontFamily: "'DM Sans', sans-serif" }}>
        404
      </p>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, color: '#FAF8F4', margin: '0 0 1rem', lineHeight: 1.15 }}>
        Page introuvable
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '460px', lineHeight: 1.7, margin: '0 0 2.4rem', fontSize: '0.98rem' }}>
        Cette adresse n&apos;existe pas — comme les meilleures propriétés, elle est peut-être off-market.
        <br />
        This page could not be found.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/fr" style={{ background: '#C8A96E', color: '#0A0A0B', padding: '1rem 2.4rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>
          Accueil
        </Link>
        <Link href="/fr/projets" style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '1rem 2.4rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
          Propriétés
        </Link>
      </div>
    </section>
  )
}
