'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function EditorialImageManager({ initialImage }: { initialImage: string }) {
  const [image, setImage] = useState<string>(initialImage)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    setSaved(false)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `editorial/${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
    if (upErr) {
      setError('Erreur upload: ' + upErr.message)
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
      setImage(urlData.publicUrl)
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: sErr } = await supabase
      .from('site_settings')
      .upsert({ key: 'editorial', value: { home_editorial: image }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (sErr) setError(sErr.message)
    else setSaved(true)
    setSaving(false)
  }

  const card = { background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }

  return (
    <div style={{ maxWidth: '760px', marginTop: '3rem' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '0.3rem' }}>
        Image éditoriale (section « Depuis 2009 »)
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        La grande image verticale à côté du texte de présentation sur la page d&apos;accueil.
      </p>

      <div style={{ ...card, display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="Aperçu éditorial"
          style={{ width: 180, height: 240, objectFit: 'cover', borderRadius: 3, background: '#000', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 220 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
            id="editorial-upload"
          />
          <label
            htmlFor="editorial-upload"
            style={{
              display: 'inline-block',
              background: 'rgba(200,169,110,0.12)',
              border: '1px solid rgba(200,169,110,0.3)',
              color: '#C8A96E',
              padding: '0.7rem 1.2rem',
              fontSize: '0.85rem',
              cursor: uploading ? 'wait' : 'pointer',
              borderRadius: 3,
            }}
          >
            {uploading ? '⏳ Upload…' : '📎 Changer l’image'}
          </label>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.6rem' }}>
            Format vertical recommandé (portrait, ratio 3/4). JPG/PNG.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              onClick={save}
              disabled={saving || uploading}
              style={{
                background: '#C8A96E', color: '#0A0A0B', border: 'none',
                padding: '0.75rem 1.8rem', fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer',
                borderRadius: 3,
              }}
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            {saved && <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>✓ Enregistré</span>}
            {error && <span style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
