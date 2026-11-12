'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const THEMES = [
  { id: 'immobilier', fr: 'Immobilier', en: 'Real Estate', he: 'נדל"ן' },
  { id: 'economie', fr: 'Économie israélienne', en: 'Israeli Economy', he: 'כלכלה ישראלית' },
  { id: 'evenements', fr: 'Événements exclusifs', en: 'Exclusive Events', he: 'אירועים בלעדיים' },
  { id: 'lifestyle', fr: 'Lifestyle & Luxe', en: 'Lifestyle & Luxury', he: 'לייפסטייל ויוקרה' },
]

const T = {
  fr: {
    namePh: 'Votre nom', emailPh: 'votre@email.com', phonePh: 'Téléphone (optionnel)',
    interests: 'Vos centres d’intérêt', send: 'Rejoindre Le Cercle', sending: 'Inscription…',
    okTitle: 'Bienvenue dans Le Cercle', okSub: 'Votre inscription est confirmée. Vous recevrez nos prochaines communications privées.',
    already: 'Vous êtes déjà inscrit à Le Cercle.', error: 'Une erreur est survenue. Réessayez.',
    consent: 'J’accepte de recevoir les communications de Maison Israël. Désinscription à tout moment.',
  },
  en: {
    namePh: 'Your name', emailPh: 'your@email.com', phonePh: 'Phone (optional)',
    interests: 'Your interests', send: 'Join The Circle', sending: 'Subscribing…',
    okTitle: 'Welcome to The Circle', okSub: 'Your subscription is confirmed. You will receive our next private communications.',
    already: 'You are already a member of The Circle.', error: 'Something went wrong. Please retry.',
    consent: 'I agree to receive communications from Maison Israël. Unsubscribe anytime.',
  },
  he: {
    namePh: 'השם שלך', emailPh: 'your@email.com', phonePh: 'טלפון (אופציונלי)',
    interests: 'תחומי העניין שלך', send: 'הצטרפו למעגל', sending: 'נרשם…',
    okTitle: 'ברוכים הבאים למעגל', okSub: 'ההרשמה אושרה. תקבלו את ההודעות הפרטיות הבאות שלנו.',
    already: 'אתם כבר רשומים למעגל.', error: 'אירעה שגיאה. נסו שוב.',
    consent: 'אני מסכים לקבל הודעות ממייזון ישראל. ניתן לבטל בכל עת.',
  },
} as const

export default function ClubForm({ locale = 'fr' }: { locale?: string }) {
  const lang = (locale in T ? locale : 'fr') as keyof typeof T
  const t = T[lang]
  const isRTL = locale === 'he'

  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [interets, setInterets] = useState<string[]>(THEMES.map(x => x.id))
  const [consent, setConsent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState<false | 'ok' | 'already'>(false)
  const [error, setError] = useState('')

  function toggle(id: string) {
    setInterets(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !consent) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('subscribers').insert([{
      nom: nom || null, email: email.toLowerCase().trim(),
      telephone: telephone || null, interets, source: `club-${locale}`,
    }])
    setLoading(false)
    if (err) {
      if (err.code === '23505') setDone('already') // unique violation = déjà inscrit
      else setError(t.error)
    } else {
      setDone('ok')
    }
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1.1rem',
    border: '1px solid rgba(200,169,110,0.2)', background: '#111214',
    fontSize: '0.95rem', outline: 'none', color: '#D4D5D8',
    fontFamily: 'DM Sans, sans-serif',
    textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr',
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 2rem', background: '#111214', border: '1px solid rgba(200,169,110,0.25)' }}>
        <div style={{ fontSize: '2.6rem', marginBottom: '1rem' }}>{done === 'ok' ? '🥂' : '✓'}</div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', marginBottom: '0.6rem' }}>
          {done === 'ok' ? t.okTitle : t.already}
        </h3>
        {done === 'ok' && <p style={{ color: '#8A8B91', maxWidth: '380px', margin: '0 auto' }}>{t.okSub}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <input style={input} value={nom} onChange={e => setNom(e.target.value)} placeholder={t.namePh} />
      <input type="email" required style={input} value={email} onChange={e => setEmail(e.target.value)} placeholder={t.emailPh} />
      <input style={input} value={telephone} onChange={e => setTelephone(e.target.value)} placeholder={t.phonePh} />

      <div>
        <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '0.7rem' }}>
          {t.interests}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {THEMES.map(theme => {
            const active = interets.includes(theme.id)
            return (
              <button type="button" key={theme.id} onClick={() => toggle(theme.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 0.9rem', cursor: 'pointer', textAlign: isRTL ? 'right' : 'left',
                background: active ? 'rgba(200,169,110,0.12)' : 'transparent',
                border: `1px solid ${active ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.12)'}`,
                color: active ? '#C8A96E' : 'rgba(255,255,255,0.6)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', transition: 'all 0.2s',
              }}>
                <span>{active ? '◉' : '○'}</span>
                <span>{theme[lang]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: '#8A8B91', cursor: 'pointer', lineHeight: 1.5 }}>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#C8A96E', flexShrink: 0 }} />
        <span>{t.consent}</span>
      </label>

      {error && <p style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</p>}

      <button type="submit" disabled={loading || !consent} style={{
        background: loading || !consent ? 'rgba(200,169,110,0.5)' : '#C8A96E',
        color: '#0A0A0B', border: 'none', cursor: loading || !consent ? 'not-allowed' : 'pointer',
        padding: '1rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem',
        letterSpacing: isRTL ? '0' : '0.18em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600,
      }}>
        {loading ? t.sending : t.send}
      </button>
    </form>
  )
}
