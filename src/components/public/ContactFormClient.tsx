'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'

interface Props {
  locale: string
  messages: Record<string, any>
}

function ContactFormInner({ locale, messages }: Props) {
  const searchParams = useSearchParams()
  const bienParam = searchParams.get('bien')
  const c = messages.contact
  const isRTL = locale === 'he'

  const [form, setForm] = useState({
    nom: '', email: '', telephone: '',
    message: bienParam ? (isRTL ? `מתעניין ב: ${bienParam}` : locale === 'en' ? `Interested in: ${bienParam}` : `Je suis intéressé par : ${bienParam}`) : ''
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem',
    border: '1px solid rgba(200,169,110,0.2)', background: '#111214',
    fontSize: '0.9rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', color: '#D4D5D8',
    textAlign: isRTL ? 'right' as const : 'left' as const,
    direction: isRTL ? 'rtl' as const : 'ltr' as const,
  }
  const labelStyle = {
    display: 'block', fontSize: '0.65rem', color: '#C8A96E',
    letterSpacing: isRTL ? '0' : '0.15em',
    textTransform: isRTL ? 'none' as const : 'uppercase' as const,
    marginBottom: '0.4rem',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.from('leads').insert([{
      nom: form.nom, email: form.email,
      telephone: form.telephone || null,
      message: form.message || null,
      source: `site-${locale}`,
    }])
    if (error) { setError(c.error ?? 'Error'); setLoading(false) }
    else setSent(true)
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: '#111214', border: '1px solid rgba(200,169,110,0.2)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', marginBottom: '0.5rem' }}>{c.sent_title}</h3>
        <p style={{ color: '#8A8B91' }}>{c.sent_sub}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{c.name} *</label>
          <input style={inputStyle} value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} required placeholder={c.name_ph} />
        </div>
        <div>
          <label style={labelStyle}>{c.email} *</label>
          <input type="email" style={inputStyle} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder={c.email_ph} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>{c.phone}</label>
        <input style={inputStyle} value={form.telephone} onChange={e => setForm(p => ({ ...p, telephone: e.target.value }))} placeholder={c.phone_ph} />
      </div>
      <div>
        <label style={labelStyle}>{c.message}</label>
        <textarea style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder={c.message_ph} />
      </div>
      {error && <p style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</p>}
      <button type="submit" disabled={loading} style={{
        background: loading ? 'rgba(200,169,110,0.6)' : '#C8A96E',
        color: '#0A0A0B', border: 'none', cursor: loading ? 'wait' : 'pointer',
        padding: '0.9rem', fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.15em',
        textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600,
      }}>
        {loading ? c.sending : c.send}
      </button>
      <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center' }}>{c.guarantee}</p>
    </form>
  )
}

export default function ContactFormClient(props: Props) {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>}>
      <ContactFormInner {...props} />
    </Suspense>
  )
}
