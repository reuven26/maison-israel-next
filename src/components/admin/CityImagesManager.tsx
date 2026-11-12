'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { optImg } from '@/lib/img'

/** Villes affichées dans la mosaïque de l'accueil + les pages /villes. */
const CITIES: { slug: string; label: string }[] = [
  { slug: 'tel-aviv', label: 'Tel Aviv' },
  { slug: 'jerusalem', label: 'Jérusalem' },
  { slug: 'herzliya-pituah', label: 'Herzliya Pituah' },
  { slug: 'caesarea', label: 'Césarée' },
  { slug: 'netanya', label: 'Netanya' },
  { slug: 'savyon', label: 'Savyon' },
]

export default function CityImagesManager({ initial }: { initial: Record<string, string> }) {
  const [imgs, setImgs] = useState<Record<string, string>>(initial)
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const refs = useRef<Record<string, HTMLInputElement | null>>({})

  async function handleUpload(slug: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(slug)
    setError('')
    setSaved(false)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `villes/${slug}-${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
    if (upErr) {
      setError('Erreur upload: ' + upErr.message)
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
      setImgs(prev => ({ ...prev, [slug]: urlData.publicUrl }))
    }
    setUploading(null)
    if (refs.current[slug]) refs.current[slug]!.value = ''
  }

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: sErr } = await supabase
      .from('site_settings')
      .upsert({ key: 'city_images', value: imgs, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (sErr) setError(sErr.message)
    else setSaved(true)
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '880px', marginTop: '3rem' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '0.3rem' }}>
        Images des villes (mosaïque de l&apos;accueil)
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Les 6 vignettes de villes en bas de la page d&apos;accueil (et l&apos;image d&apos;en-tête de chaque page ville).
        Format paysage recommandé. Pensez à <strong>Enregistrer</strong> après vos changements.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {CITIES.map(({ slug, label }) => (
          <div key={slug} style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '0.9rem' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#000', marginBottom: '0.7rem' }}>
              {imgs[slug]
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={optImg(imgs[slug], 384, 60)} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>Image par défaut</div>}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 500 }}>{label}</div>
            <input
              ref={el => { refs.current[slug] = el }}
              type="file" accept="image/*"
              onChange={e => handleUpload(slug, e)}
              disabled={uploading === slug}
              style={{ display: 'none' }}
              id={`city-upload-${slug}`}
            />
            <label
              htmlFor={`city-upload-${slug}`}
              style={{
                display: 'inline-block', background: 'rgba(200,169,110,0.12)',
                border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E',
                padding: '0.5rem 1rem', fontSize: '0.78rem',
                cursor: uploading === slug ? 'wait' : 'pointer', borderRadius: 3,
              }}
            >
              {uploading === slug ? '⏳ Upload…' : '📎 Changer'}
            </label>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          onClick={save}
          disabled={saving || !!uploading}
          style={{
            background: '#C8A96E', color: '#0A0A0B', border: 'none',
            padding: '0.8rem 2rem', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer', borderRadius: 3,
          }}
        >
          {saving ? 'Enregistrement…' : 'Enregistrer les images'}
        </button>
        {saved && <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>✓ Enregistré — visible sur le site sous ~1 min</span>}
        {error && <span style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</span>}
      </div>
    </div>
  )
}
