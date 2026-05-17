'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#C8A96E', letterSpacing: '0.15em' }}>MAISON</div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>ISRAËL · ADMIN</div>
        </div>

        {/* Card */}
        <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.15)', padding: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 400 }}>
            Connexion
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
            Accès réservé aux administrateurs
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.8rem 1rem',
                  background: '#1E1E22', border: '1px solid rgba(200,169,110,0.2)',
                  color: '#fff', fontSize: '0.9rem', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.8rem 1rem',
                  background: '#1E1E22', border: '1px solid rgba(200,169,110,0.2)',
                  color: '#fff', fontSize: '0.9rem', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '0.8rem 1rem', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(200,169,110,0.5)' : '#C8A96E',
                color: '#0A0A0B', border: 'none', cursor: loading ? 'wait' : 'pointer',
                padding: '0.9rem', fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                fontWeight: 600, marginTop: '0.5rem',
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          Maison Israël · Panneau d'administration sécurisé
        </p>
      </div>
    </div>
  )
}
