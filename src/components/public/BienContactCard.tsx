'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const PAYS = [
  'France', 'Belgique', 'Suisse', 'Canada', 'Israël (+972)',
  'États-Unis', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Autre',
]

interface Props {
  bienNom: string
  bienPrix: string
  bienRef?: string | null
  locale: string
  isRTL: boolean
  messages: Record<string, any>
}

export default function BienContactCard({ bienNom, bienPrix, bienRef, locale, isRTL, messages }: Props) {
  const p = messages.properties

  const [form, setForm] = useState({
    civilite: 'M.',
    nom: '',
    prenom: '',
    email: '',
    pays: 'France',
    telephone: '',
    message: locale === 'he'
      ? `מתעניין ב: ${bienNom}`
      : locale === 'en'
      ? `I am interested in: ${bienNom}`
      : `Je suis intéressé(e) par : ${bienNom}`,
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    background: '#1A1B1E',
    border: '1px solid rgba(200,169,110,0.18)',
    color: '#D4D5D8',
    fontSize: '0.85rem',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    direction: isRTL ? 'rtl' : 'ltr',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.62rem',
    color: '#8A8B91',
    letterSpacing: isRTL ? '0' : '0.12em',
    textTransform: isRTL ? 'none' : 'uppercase',
    marginBottom: '0.35rem',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.from('leads').insert([{
      nom: `${form.civilite} ${form.prenom} ${form.nom}`.trim(),
      email: form.email,
      telephone: form.telephone || null,
      message: `[${form.pays}] ${form.message}`,
      source: `bien-${locale}`,
    }])
    if (error) { setError(error.message); setSending(false) }
    else setSent(true)
  }

  return (
    <div style={{ background: '#111214', border: '1px solid rgba(200,169,110,0.15)', color: '#fff', direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* ── Agent block ── */}
      <div style={{ padding: '1.6rem 1.8rem', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <p style={{
          fontSize: '9px', letterSpacing: isRTL ? '0' : '0.28em',
          textTransform: isRTL ? 'none' : 'uppercase',
          color: '#C8A96E', marginBottom: '1.2rem',
        }}>
          {locale === 'he' ? 'הנכס מוצג על ידי:' : locale === 'en' ? 'This property is presented by:' : 'Ce bien vous est présenté par :'}
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          {/* Agent photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 72, height: 72, overflow: 'hidden',
              border: '2px solid rgba(200,169,110,0.3)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80"
                alt="Agent"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            {/* WhatsApp bubble */}
            <a
              href="https://wa.me/972555002640"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute', bottom: -6, right: -6,
                width: 26, height: 26,
                background: '#25D366',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #111214',
              }}
              title="WhatsApp"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* Agent info */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 500, color: '#FAFAF9', marginBottom: '0.2rem' }}>
              {locale === 'he' ? 'צוות מייזון ישראל' : 'Équipe Maison Israël'}
            </p>
            <p style={{ fontSize: '0.72rem', color: '#C8A96E', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
              MAISON ISRAËL
            </p>
            <p style={{ fontSize: '0.72rem', color: '#8A8B91', lineHeight: 1.5 }}>
              Tel Aviv · Jérusalem · Herzliya
            </p>
          </div>
        </div>

        {/* Phone CTA */}
        <a
          href="tel:+972555002640"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            marginTop: '1.2rem',
            background: '#C8A96E',
            color: '#0A0A0B',
            padding: '0.8rem',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          +972 55 500 2640
        </a>
      </div>

      {/* ── Contact form ── */}
      <div style={{ padding: '1.6rem 1.8rem' }}>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.3rem', fontWeight: 400,
          color: '#FAFAF9', marginBottom: '1.4rem',
        }}>
          {locale === 'he' ? 'לצור קשר' : locale === 'en' ? 'Contact us' : 'Pour nous contacter'}
        </p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>✅</div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', marginBottom: '0.4rem' }}>
              {locale === 'he' ? 'תודה!' : locale === 'en' ? 'Thank you!' : 'Merci !'}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#8A8B91' }}>
              {locale === 'he' ? 'ניצור איתך קשר בהקדם' : locale === 'en' ? 'We will get back to you shortly.' : 'Nous vous répondrons très rapidement.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Civilité */}
            <div>
              <label style={labelStyle}>
                {locale === 'he' ? 'פנייה' : locale === 'en' ? 'Title' : 'Civilité'} *
              </label>
              <select style={inputStyle} value={form.civilite} onChange={e => setForm(p => ({ ...p, civilite: e.target.value }))}>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
              </select>
            </div>

            {/* Nom + Prénom */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <div>
                <label style={labelStyle}>{locale === 'he' ? 'שם משפחה' : locale === 'en' ? 'Last name' : 'Nom'} *</label>
                <input
                  style={inputStyle}
                  value={form.nom}
                  onChange={e => setForm(p => ({ ...p, nom: e.target.value }))}
                  required
                  placeholder={locale === 'he' ? 'כהן' : locale === 'en' ? 'Smith' : 'Dupont'}
                />
              </div>
              <div>
                <label style={labelStyle}>{locale === 'he' ? 'שם פרטי' : locale === 'en' ? 'First name' : 'Prénom'} *</label>
                <input
                  style={inputStyle}
                  value={form.prenom}
                  onChange={e => setForm(p => ({ ...p, prenom: e.target.value }))}
                  required
                  placeholder={locale === 'he' ? 'דוד' : locale === 'en' ? 'John' : 'Jean'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                style={inputStyle}
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                placeholder="votre@email.com"
              />
            </div>

            {/* Pays */}
            <div>
              <label style={labelStyle}>{locale === 'he' ? 'מדינה' : locale === 'en' ? 'Country' : 'Pays'} *</label>
              <select style={inputStyle} value={form.pays} onChange={e => setForm(p => ({ ...p, pays: e.target.value }))}>
                {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Téléphone */}
            <div>
              <label style={labelStyle}>{locale === 'he' ? 'טלפון' : locale === 'en' ? 'Phone' : 'Téléphone'}</label>
              <input
                style={inputStyle}
                value={form.telephone}
                onChange={e => setForm(p => ({ ...p, telephone: e.target.value }))}
                placeholder="+33 6 00 00 00 00"
              />
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>{locale === 'he' ? 'הודעה' : locale === 'en' ? 'Message' : 'Indiquez votre message'}</label>
              <textarea
                style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder={locale === 'he' ? 'הודעתכם...' : locale === 'en' ? 'Your message...' : 'Votre message...'}
              />
            </div>

            {error && <p style={{ fontSize: '0.8rem', color: '#F87171' }}>⚠️ {error}</p>}

            <button
              type="submit"
              disabled={sending}
              style={{
                background: sending ? 'rgba(200,169,110,0.5)' : '#C8A96E',
                color: '#0A0A0B', border: 'none',
                padding: '0.85rem',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: isRTL ? '0' : '0.18em',
                textTransform: isRTL ? 'none' : 'uppercase',
                fontWeight: 700,
                cursor: sending ? 'wait' : 'pointer',
                width: '100%',
              }}
            >
              {sending
                ? (locale === 'he' ? 'שולח...' : locale === 'en' ? 'Sending...' : 'Envoi...')
                : (locale === 'he' ? 'שלח פנייה' : locale === 'en' ? 'Send enquiry' : 'Envoyer ma demande')}
            </button>

            {/* Prix + ref recap */}
            <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#8A8B91' }}>{locale === 'en' ? 'Price' : 'Prix'}</span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#E8D5A3' }}>{bienPrix}</span>
              </div>
              {bienRef && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: '#8A8B91' }}>{locale === 'en' ? 'Ref.' : 'Réf.'}</span>
                  <span style={{ color: '#D4D5D8' }}>{bienRef}</span>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
