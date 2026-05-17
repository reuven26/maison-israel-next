'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Bien } from '@/types'

const VILLES = ['Tel Aviv', 'Jérusalem', 'Herzliya Pituah', 'Netanya', 'Caesarea', 'Ramat Gan', 'Haïfa', 'Autre']
const TYPES = ['Appartement', 'Penthouse', 'Villa', 'Duplex', 'Studio', 'Loft', 'Maison', 'Terrain', 'Commerce']
const STATUTS = [
  { value: 'actif', label: 'Disponible' },
  { value: 'sous_compromis', label: 'Sous compromis' },
  { value: 'vendu', label: 'Vendu' },
  { value: 'loue', label: 'Loué' },
]

// Taux de change approximatifs (mis à jour manuellement)
const NIS_TO_EUR_RATE = 3.97   // 1 EUR = 3.97 NIS
const NIS_TO_USD_RATE = 3.65   // 1 USD = 3.65 NIS

function nisToEur(nis: number) { return Math.round(nis / NIS_TO_EUR_RATE) }
function nisToUsd(nis: number) { return Math.round(nis / NIS_TO_USD_RATE) }
function fmtNis(n: number) { return '₪ ' + new Intl.NumberFormat('fr-FR').format(n) }
function fmtEur(n: number) { return new Intl.NumberFormat('fr-FR').format(n) + ' €' }
function fmtUsd(n: number) { return '$ ' + new Intl.NumberFormat('en-US').format(n) }

function slugify(str: string) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface Props {
  initialData?: Partial<Bien>
}

export default function BienForm({ initialData }: Props) {
  const isEdit = !!initialData?.id
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    nom: initialData?.nom ?? '',
    slug: initialData?.slug ?? '',
    ville: initialData?.ville ?? 'Tel Aviv',
    quartier: initialData?.quartier ?? '',
    type: initialData?.type ?? 'Appartement',
    surface: initialData?.surface ?? 100,
    pieces: initialData?.pieces ?? 3,
    prix: initialData?.prix ?? 3800000,
    prix_display: initialData?.prix_display ?? '',
    badge: initialData?.badge ?? '',
    roi: initialData?.roi ?? '',
    image_principale: initialData?.image_principale ?? '',
    images: initialData?.images ?? [] as string[],
    description: initialData?.description ?? '',
    caracteristiques: (initialData?.caracteristiques ?? []).join('\n'),
    statut: initialData?.statut ?? 'actif',
    reference: initialData?.reference ?? '',
    off_market: initialData?.off_market ?? false,
  })

  const [uploading, setUploading] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  function handleChange(field: string, value: string | number) {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'nom' && !isEdit) {
        updated.slug = slugify(value as string)
      }
      if (field === 'prix') {
        const nis = Number(value)
        if (!isNaN(nis) && nis > 0) {
          updated.prix_display = fmtNis(nis)
        }
      }
      return updated
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `biens/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (error) {
      setError('Erreur upload: ' + error.message)
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
      handleChange('image_principale', urlData.publicUrl)
    }
    setUploading(false)
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploadingGallery(true)
    setUploadProgress(`0 / ${files.length}`)
    const supabase = createClient()
    const newUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress(`${i + 1} / ${files.length} — ${file.name}`)
      const ext = file.name.split('.').pop()
      const fileName = `biens/gallery-${Date.now()}-${i}.${ext}`
      const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
      if (!error) {
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        newUrls.push(urlData.publicUrl)
      }
    }

    setForm(prev => ({ ...prev, images: [...prev.images, ...newUrls] }))
    setUploadingGallery(false)
    setUploadProgress('')
    // Reset input so same files can be re-selected
    if (galleryInputRef.current) galleryInputRef.current.value = ''
  }

  function addGalleryUrl(url: string) {
    if (!url.trim()) return
    setForm(prev => ({ ...prev, images: [...prev.images, url.trim()] }))
  }

  function removeGalleryImage(idx: number) {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= form.images.length) return
    const imgs = [...form.images]
    const [moved] = imgs.splice(from, 1)
    imgs.splice(to, 0, moved)
    setForm(prev => ({ ...prev, images: imgs }))
  }

  function setAsMain(url: string) {
    handleChange('image_principale', url)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const payload = {
      ...form,
      surface: Number(form.surface),
      pieces: Number(form.pieces) || null,
      prix: Number(form.prix),
      caracteristiques: form.caracteristiques.split('\n').map(s => s.trim()).filter(Boolean),
      statut: form.statut as Bien['statut'],
    }

    let result
    if (isEdit) {
      result = await supabase.from('biens').update(payload).eq('id', initialData!.id!)
    } else {
      result = await supabase.from('biens').insert([payload])
    }

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/admin/biens'), 1000)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#1E1E22', border: '1px solid rgba(200,169,110,0.2)',
    color: '#fff', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
  }
  const labelStyle = {
    display: 'block', fontSize: '0.65rem', color: '#C8A96E',
    letterSpacing: '0.15em', textTransform: 'uppercase' as const,
    marginBottom: '0.4rem',
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid-bien-form">

          {/* Colonne 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Informations générales</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Nom du bien *</label>
                  <input style={inputStyle} value={form.nom} onChange={e => handleChange('nom', e.target.value)} required placeholder="ex: Penthouse Neve Tzedek" />
                </div>

                <div>
                  <label style={labelStyle}>Slug URL *</label>
                  <input style={inputStyle} value={form.slug} onChange={e => handleChange('slug', e.target.value)} required placeholder="penthouse-neve-tzedek" />
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>URL: /projets/{form.slug || '...'}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Ville *</label>
                    <select style={inputStyle} value={form.ville} onChange={e => handleChange('ville', e.target.value)}>
                      {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Quartier</label>
                    <input style={inputStyle} value={form.quartier} onChange={e => handleChange('quartier', e.target.value)} placeholder="ex: Neve Tzedek" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Type *</label>
                    <select style={inputStyle} value={form.type} onChange={e => handleChange('type', e.target.value)}>
                      {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Statut *</label>
                    <select style={inputStyle} value={form.statut} onChange={e => handleChange('statut', e.target.value)}>
                      {STATUTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* OFF MARKET toggle */}
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, off_market: !prev.off_market }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    width: '100%', padding: '1rem 1.2rem',
                    background: form.off_market ? 'rgba(200,169,110,0.08)' : '#1A1B1E',
                    border: `1px solid ${form.off_market ? 'rgba(200,169,110,0.5)' : 'rgba(200,169,110,0.15)'}`,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, flexShrink: 0,
                    background: form.off_market ? '#C8A96E' : '#2A2B2F',
                    position: 'relative', transition: 'background 0.25s',
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: form.off_market ? 23 : 3,
                      width: 18, height: 18, borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.25s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={form.off_market ? '#C8A96E' : '#4A4B50'} strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: form.off_market ? '#C8A96E' : '#8A8B91', fontFamily: 'DM Sans, sans-serif' }}>
                        Portefeuille Off Market
                      </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#4A4B50', marginTop: '2px', fontFamily: 'DM Sans, sans-serif' }}>
                      {form.off_market
                        ? 'Ce bien apparaît dans la section privée Off Market'
                        : 'Activer pour ajouter à la section privée Off Market'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Surfaces & prix */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Prix & surfaces</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Surface (m²) *</label>
                    <input type="number" style={inputStyle} value={form.surface} onChange={e => handleChange('surface', Number(e.target.value))} required min="1" />
                  </div>
                  <div>
                    <label style={labelStyle}>Pièces</label>
                    <input type="number" style={inputStyle} value={form.pieces} onChange={e => handleChange('pieces', Number(e.target.value))} min="0" />
                  </div>
                </div>

                {/* Prix NIS — champ principal */}
                <div>
                  <label style={labelStyle}>Prix en ₪ NIS *</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C8A96E', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', pointerEvents: 'none' }}>₪</span>
                    <input
                      type="number"
                      style={{ ...inputStyle, paddingLeft: '28px' }}
                      value={form.prix}
                      onChange={e => handleChange('prix', Number(e.target.value))}
                      required min="0"
                      placeholder="3 800 000"
                    />
                  </div>
                </div>

                {/* Conversions automatiques */}
                {form.prix > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div style={{ background: '#0A0A0B', border: '1px solid rgba(200,169,110,0.12)', padding: '0.9rem 1rem', borderRadius: 0 }}>
                      <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8A8B91', textTransform: 'uppercase', marginBottom: '4px' }}>Équivalent EUR</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C8A96E' }}>{fmtEur(nisToEur(form.prix))}</div>
                      <div style={{ fontSize: '0.65rem', color: '#4A4B50', marginTop: '2px' }}>taux : 1 € = {NIS_TO_EUR_RATE} ₪</div>
                    </div>
                    <div style={{ background: '#0A0A0B', border: '1px solid rgba(200,169,110,0.12)', padding: '0.9rem 1rem', borderRadius: 0 }}>
                      <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8A8B91', textTransform: 'uppercase', marginBottom: '4px' }}>Équivalent USD</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C8A96E' }}>{fmtUsd(nisToUsd(form.prix))}</div>
                      <div style={{ fontSize: '0.65rem', color: '#4A4B50', marginTop: '2px' }}>taux : 1 $ = {NIS_TO_USD_RATE} ₪</div>
                    </div>
                  </div>
                )}

                {/* Prix affiché (éditable) */}
                <div>
                  <label style={labelStyle}>Prix affiché sur le site</label>
                  <input
                    style={inputStyle}
                    value={form.prix_display}
                    onChange={e => handleChange('prix_display', e.target.value)}
                    placeholder="₪ 3 800 000"
                  />
                  <div style={{ fontSize: '0.68rem', color: '#4A4B50', marginTop: '4px' }}>
                    Généré automatiquement · modifiable librement
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Badge</label>
                    <input style={inputStyle} value={form.badge} onChange={e => handleChange('badge', e.target.value)} placeholder="Exclusivité, Coup de cœur..." />
                  </div>
                  <div>
                    <label style={labelStyle}>ROI</label>
                    <input style={inputStyle} value={form.roi} onChange={e => handleChange('roi', e.target.value)} placeholder="4.5%" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Référence interne</label>
                  <input style={inputStyle} value={form.reference} onChange={e => handleChange('reference', e.target.value)} placeholder="MI-001" />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Image principale */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Image principale</h2>

              {form.image_principale && (
                <img src={form.image_principale} alt="preview" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }} />
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>URL de l'image</label>
                  <input style={inputStyle} value={form.image_principale} onChange={e => handleChange('image_principale', e.target.value)} placeholder="https://..." />
                </div>
                <div style={{ textAlign: 'center', padding: '0.5rem 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>— ou —</div>
                <div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      width: '100%', padding: '0.75rem',
                      border: '1px dashed rgba(200,169,110,0.3)',
                      background: 'transparent', color: '#C8A96E',
                      cursor: uploading ? 'wait' : 'pointer',
                      fontSize: '0.8rem',
                    }}>
                    {uploading ? 'Upload en cours...' : '📎 Uploader depuis votre ordinateur'}
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Description & caractéristiques</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Description *</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
                    value={form.description}
                    onChange={e => handleChange('description', e.target.value)}
                    required
                    placeholder="Description complète du bien..."
                  />
                </div>
                <div>
                  <label style={labelStyle}>Caractéristiques (une par ligne)</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                    value={form.caracteristiques}
                    onChange={e => handleChange('caracteristiques', e.target.value)}
                    placeholder={"Vue mer 180°\nTerrasse 80m²\nDomotique complète\nParking x2"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GALERIE — pleine largeur */}
        <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>
                Galerie photos
                {form.images.length > 0 && (
                  <span style={{ marginLeft: '0.8rem', fontSize: '0.8rem', color: '#C8A96E', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
                    {form.images.length} photo{form.images.length > 1 ? 's' : ''}
                  </span>
                )}
              </h2>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}>
                Cliquez sur une image pour l'agrandir · ⭐ pour définir en principale · ← → pour réordonner
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              {uploadingGallery && (
                <span style={{ fontSize: '0.78rem', color: '#C8A96E' }}>
                  ⏳ {uploadProgress}
                </span>
              )}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploadingGallery}
                style={{
                  padding: '0.6rem 1.4rem',
                  background: uploadingGallery ? 'rgba(200,169,110,0.3)' : '#C8A96E',
                  color: '#0A0A0B', border: 'none',
                  cursor: uploadingGallery ? 'wait' : 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
                  fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {uploadingGallery ? 'Upload...' : '＋ Ajouter des photos'}
              </button>
            </div>
          </div>

          {/* URL manuelle */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.6rem' }}>
            <input
              id="gallery-url-input"
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Ou coller une URL directement..."
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const input = e.currentTarget
                  addGalleryUrl(input.value)
                  input.value = ''
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('gallery-url-input') as HTMLInputElement
                if (input) { addGalleryUrl(input.value); input.value = '' }
              }}
              style={{
                padding: '0.75rem 1.2rem',
                border: '1px solid rgba(200,169,110,0.3)',
                background: 'transparent', color: '#C8A96E',
                cursor: 'pointer', fontSize: '0.8rem',
                whiteSpace: 'nowrap',
              }}
            >
              Ajouter
            </button>
          </div>

          {/* Grid galerie */}
          {form.images.length === 0 ? (
            <div style={{
              border: '1px dashed rgba(200,169,110,0.15)',
              padding: '3rem',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.85rem',
            }}>
              Aucune photo dans la galerie — uploadez des fichiers ou collez des URLs ci-dessus
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '8px',
            }}>
              {form.images.map((url, idx) => (
                <div key={idx} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#0A0A0B', cursor: 'pointer' }}>
                  <img
                    src={url}
                    alt={`Photo ${idx + 1}`}
                    onClick={() => setLightbox(url)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Overlay actions */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(10,10,11,0)',
                    transition: 'background 0.2s',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,10,11,0.65)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,11,0)')}
                  >
                    {/* Top row: move + delete */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); moveImage(idx, idx - 1) }}
                          disabled={idx === 0}
                          title="Déplacer à gauche"
                          style={{ width: 24, height: 24, background: 'rgba(0,0,0,0.6)', border: 'none', color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: idx === 0 ? 'default' : 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >←</button>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); moveImage(idx, idx + 1) }}
                          disabled={idx === form.images.length - 1}
                          title="Déplacer à droite"
                          style={{ width: 24, height: 24, background: 'rgba(0,0,0,0.6)', border: 'none', color: idx === form.images.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: idx === form.images.length - 1 ? 'default' : 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >→</button>
                      </div>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); removeGalleryImage(idx) }}
                        title="Supprimer"
                        style={{ width: 24, height: 24, background: 'rgba(239,68,68,0.8)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >×</button>
                    </div>
                    {/* Bottom: set as main */}
                    <div style={{ padding: '6px' }}>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setAsMain(url) }}
                        title="Définir comme image principale"
                        style={{
                          width: '100%', padding: '3px 0',
                          background: url === form.image_principale ? '#C8A96E' : 'rgba(200,169,110,0.2)',
                          border: '1px solid rgba(200,169,110,0.5)',
                          color: url === form.image_principale ? '#0A0A0B' : '#C8A96E',
                          cursor: 'pointer', fontSize: '10px', letterSpacing: '0.05em',
                          fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                        }}
                      >
                        {url === form.image_principale ? '★ Principale' : '☆ Principale'}
                      </button>
                    </div>
                  </div>
                  {/* Badge index */}
                  <div style={{
                    position: 'absolute', top: 6, left: 6,
                    background: 'rgba(0,0,0,0.6)',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '10px', padding: '1px 5px',
                    fontFamily: 'DM Sans, sans-serif',
                    pointerEvents: 'none',
                  }}>
                    {idx + 1}
                  </div>
                  {url === form.image_principale && (
                    <div style={{
                      position: 'absolute', bottom: 32, right: 6,
                      background: '#C8A96E', color: '#0A0A0B',
                      fontSize: '9px', padding: '2px 5px',
                      fontFamily: 'DM Sans, sans-serif', fontWeight: 700,
                      pointerEvents: 'none',
                    }}>
                      PRINCIPALE
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{ marginTop: '1.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{ marginTop: '1.5rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ADE80', padding: '1rem', fontSize: '0.85rem' }}>
            ✅ Bien {isEdit ? 'modifié' : 'créé'} avec succès ! Redirection...
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" disabled={saving || success} style={{
            background: saving ? 'rgba(200,169,110,0.5)' : '#C8A96E',
            color: '#0A0A0B', border: 'none', cursor: saving ? 'wait' : 'pointer',
            padding: '0.9rem 2.5rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            {saving ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Créer le bien')}
          </button>
          <button type="button" onClick={() => router.push('/admin/biens')} style={{
            border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
            padding: '0.9rem 2rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Annuler
          </button>
        </div>
      </form>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt="Vue agrandie"
            style={{ maxWidth: '92vw', maxHeight: '92vh', objectFit: 'contain' }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: 40, height: 40, fontSize: '1.2rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>
      )}
    </>
  )
}
