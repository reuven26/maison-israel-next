import { createClient } from '@/lib/supabase/server'

export default async function AdminSettings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '2rem' }}>Paramètres</h1>

      {/* User info */}
      <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem' }}>Compte administrateur</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.8rem', background: '#1E1E22' }}>
            <span style={{ fontSize: '1.5rem' }}>👤</span>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Email connecté</div>
              <div style={{ color: '#fff', fontSize: '0.9rem' }}>{user?.email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.8rem', background: '#1E1E22' }}>
            <span style={{ fontSize: '1.5rem' }}>🔐</span>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Rôle</div>
              <div style={{ color: '#22C55E', fontSize: '0.9rem' }}>Administrateur</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div style={{ background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.2)', padding: '1.5rem', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C8A96E', marginBottom: '1rem' }}>Infrastructure</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
          <p>✅ <strong style={{ color: '#fff' }}>Base de données</strong> — Supabase PostgreSQL</p>
          <p>✅ <strong style={{ color: '#fff' }}>Authentification</strong> — Supabase Auth (JWT)</p>
          <p>✅ <strong style={{ color: '#fff' }}>Stockage images</strong> — Supabase Storage (bucket: images)</p>
          <p>✅ <strong style={{ color: '#fff' }}>Déploiement</strong> — Vercel (auto-deploy sur push)</p>
          <p>✅ <strong style={{ color: '#fff' }}>Framework</strong> — Next.js 15 App Router</p>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#141416', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          Pour changer votre mot de passe ou inviter un collaborateur, rendez-vous dans votre dashboard Supabase → Authentication → Users
        </div>
      </div>
    </div>
  )
}
