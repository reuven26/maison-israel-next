'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function HeroManager({ initialImages }: { initialImages: string[] }) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    setError('')
    setSaved(false)
    const supabase = createClient()
    const newUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setProgress(`${i + 1} / ${files.length} — ${file.name}`)
      const ext = file.name.split('.').pop()
      const fileName = `hero/${Date.now()}-${i}.${ext}`
      const { error: upErr } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
      if (upErr) {
        setError('Erreur upload: ' + upErr.message)
      } else {
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        newUrls.push(urlData.publicUrl)
      }
    }

    setImages(prev => [...prev, ...newUrls])
    setUploading(false)
    setProgress('')
    if (fileRef.current) fileRef.current.value = ''
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length) return
    const arr = [...images]
    const [m] = arr.splice(from, 1)
    arr.splice(to, 0, m)
    setImages(arr)
    setSaved(false)
  }

  function remove(idx: number) {
    setImages(prev => prev.filter((_, i) => i !== idx))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: sErr } = await supabase
      .from('site_settings')
      .upsert({ key: 'hero', value: { images }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (sErr) {
      setError(sErr.message)
    } else {
      setSaved(true)
    }
    setSaving(false)
  }

  const card = {
    background: '#141416',
    border: '1px solid rgba(200,169,110,0.1)',
    padding: '1.5rem',
  }
  const btn = (bg: string, color: string) => ({
    background: bg, color, border: 'none', cursor: 'pointer',
    padding: '0.5rem 0.8rem', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif',
    letterSpacing: '0.05em', borderRadius: 3, transition: 'opacity 0.2s',
  })

  return (
    <div style={{ maxWidth: '760px' }}>
      {/* Upload */}
      <div style={{ ...card, marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>
          Ajouter des photos
        </h2>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: 'none' }}
          id="hero-upload"
        />
        <label
          htmlFor="hero-upload"
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
          {uploading ? `⏳ Upload… ${progress}` : '📎 Uploader des images depuis votre ordinateur'}
        </label>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.6rem' }}>
          Formats JPG/PNG. Vous pouvez sélectionner plusieurs fichiers à la fois.
        </p>
      </div>

      {/* Current images */}
      <div style={{ ...card, marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}>
          Diaporama actuel ({images.length})
        </h2>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1.2rem' }}>
          Le diaporama défile dans cet ordre. La 1ère image s&apos;affiche au chargement.
        </p>

        {images.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', padding: '1rem 0' }}>
            Aucune image. Uploadez-en au moins une ci-dessus.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {images.map((url, idx) => (
            <div
              key={url + idx}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: '#1E1E22', padding: '0.7rem', border: '1px solid rgba(200,169,110,0.08)',
              }}
            >
              <span style={{
                fontSize: '0.7rem', color: '#C8A96E', width: 22, textAlign: 'center',
                background: 'rgba(200,169,110,0.1)', borderRadius: 3, padding: '2px 0',
              }}>{idx + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Hero ${idx + 1}`}
                style={{ width: 120, height: 68, objectFit: 'cover', borderRadius: 3, flexShrink: 0, background: '#000' }}
              />
              <span style={{
                flex: 1, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{url.split('/').pop()}</span>
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button onClick={() => move(idx, idx - 1)} disabled={idx === 0}
                  style={{ ...btn('#2A2B2F', idx === 0 ? '#555' : '#fff'), cursor: idx === 0 ? 'default' : 'pointer' }} title="Monter">↑</button>
                <button onClick={() => move(idx, idx + 1)} disabled={idx === images.length - 1}
                  style={{ ...btn('#2A2B2F', idx === images.length - 1 ? '#555' : '#fff'), cursor: idx === images.length - 1 ? 'default' : 'pointer' }} title="Descendre">↓</button>
                <button onClick={() => remove(idx)} style={btn('rgba(248,113,113,0.12)', '#f87171')} title="Supprimer">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={save}
          disabled={saving || uploading}
          style={{
            background: '#C8A96E', color: '#0A0A0B', border: 'none',
            padding: '0.85rem 2rem', fontSize: '0.85rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer',
            borderRadius: 3,
          }}
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {saved && <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>✓ Enregistré — le site est à jour</span>}
        {error && <span style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</span>}
      </div>
    </div>
  )
}
