/* 404 globale — routes hors locale. Style autonome (le layout racine ne rend pas de <html>). */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <div style={{
          minHeight: '100vh', background: '#0A0A0B',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '2rem', fontFamily: 'Georgia, serif',
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.2rem', fontFamily: 'system-ui, sans-serif' }}>
            Maison Israël
          </p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 400, color: '#FAF8F4', margin: '0 0 1rem', lineHeight: 1.15 }}>
            Page introuvable
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '440px', lineHeight: 1.7, margin: '0 0 2.2rem' }}>
            Cette adresse n&apos;existe pas — comme les meilleures propriétés, elle est peut-être off-market.
            <br />
            This page could not be found.
          </p>
          <a href="/fr" style={{
            background: '#C8A96E', color: '#0A0A0B', padding: '1rem 2.4rem',
            fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 600, fontFamily: 'system-ui, sans-serif',
          }}>
            Retour à l&apos;accueil
          </a>
        </div>
      </body>
    </html>
  )
}
