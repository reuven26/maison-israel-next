'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Bien } from '@/types'
import { AMENITIES, AmenityIcon } from '@/lib/amenities'
import { optImg } from '@/lib/img'

const VILLES = ['Tel Aviv', 'Jérusalem', 'Herzliya Pituah', 'Netanya', 'Caesarea', 'Hadera', 'Ramat Gan', 'Haïfa', 'Autre']
const TYPES = ['Appartement', 'Immeuble', 'Penthouse', 'Villa', 'Duplex', 'Studio', 'Loft', 'Maison', 'Terrain', 'Commerce']
const STATUTS = [
  { value: 'actif', label: 'Disponible' },
  { value: 'sous_compromis', label: 'Sous compromis' },
  { value: 'vendu', label: 'Vendu' },
  { value: 'loue', label: 'Loué' },
]

// Taux de secours (utilisés si l'API de taux du jour est indisponible)
const FALLBACK_EUR_RATE = 3.97   // 1 EUR ≈ 3.97 NIS
const FALLBACK_USD_RATE = 3.65   // 1 USD ≈ 3.65 NIS

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
  const planInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    nom: initialData?.nom ?? '',
    nom_en: initialData?.nom_en ?? '',
    nom_he: initialData?.nom_he ?? '',
    slug: initialData?.slug ?? '',
    ville: initialData?.ville ?? 'Tel Aviv',
    quartier: initialData?.quartier ?? '',
    type: initialData?.type ?? 'Appartement',
    surface: initialData?.surface ?? 100,
    surface_exterieure: initialData?.surface_exterieure ?? '',
    pieces: initialData?.pieces ?? 3,
    prix: initialData?.prix ?? 3800000,
    prix_display: initialData?.prix_display ?? '',
    badge: initialData?.badge ?? '',
    roi: initialData?.roi ?? '',
    image_principale: initialData?.image_principale ?? '',
    images: initialData?.images ?? [] as string[],
    plan: initialData?.plan ?? '',
    description: initialData?.description ?? '',
    description_en: initialData?.description_en ?? '',
    description_he: initialData?.description_he ?? '',
    caracteristiques: (initialData?.caracteristiques ?? []).join('\n'),
    statut: initialData?.statut ?? 'actif',
    reference: initialData?.reference ?? '',
    off_market: initialData?.off_market ?? false,
    masque: initialData?.masque ?? false,
  })

  const [uploading, setUploading] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadingPlan, setUploadingPlan] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Taux de change — récupérés en direct au chargement (repli sur les valeurs fixes)
  const [rates, setRates] = useState<{ eur: number; usd: number; live: boolean; date: string }>({
    eur: FALLBACK_EUR_RATE, usd: FALLBACK_USD_RATE, live: false, date: '',
  })
  useEffect(() => {
    let cancelled = false
    fetch('https://open.er-api.com/v6/latest/ILS')
      .then(r => r.json())
      .then(d => {
        if (cancelled || d?.result !== 'success' || !d.rates) return
        const eur = d.rates.EUR ? 1 / d.rates.EUR : FALLBACK_EUR_RATE
        const usd = d.rates.USD ? 1 / d.rates.USD : FALLBACK_USD_RATE
        const date = d.time_last_update_utc ? new Date(d.time_last_update_utc).toLocaleDateString('fr-FR') : ''
        setRates({ eur, usd, live: true, date })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const nisToEur = (nis: number) => Math.round(nis / rates.eur)
  const nisToUsd = (nis: number) => Math.round(nis / rates.usd)

  // « Prix sur demande » : déduit, à l'édition, d'un prix affiché vide
  const [surDemande, setSurDemande] = useState(isEdit ? !(initialData?.prix_display ?? '').trim() : false)
  function toggleSurDemande() {
    setSurDemande(prev => {
      const next = !prev
      setForm(f => ({ ...f, prix_display: next ? '' : (f.prix ? fmtNis(Number(f.prix)) : '') }))
      return next
    })
  }

  function handleChange(field: string, value: string | number) {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'nom' && !isEdit) {
        updated.slug = slugify(value as string)
      }
      if (field === 'prix' && !surDemande) {
        const nis = Number(value)
        if (!isNaN(nis) && nis > 0) {
          updated.prix_display = fmtNis(nis)
        }
      }
      return updated
    })
  }

  // Recopie le texte FR dans le champ EN/HE (point de départ pour la traduction)
  function copyFr(from: 'nom' | 'description', to: string) {
    setForm(prev => ({ ...prev, [to]: prev[from] }))
  }

  // Ajoute un équipement à la liste des caractéristiques (évite les doublons)
  function toggleAmenity(label: string) {
    setForm(prev => {
      const lines = prev.caracteristiques.split('\n').map(s => s.trim()).filter(Boolean)
      const exists = lines.some(l => l.toLowerCase() === label.toLowerCase())
      const next = exists
        ? lines.filter(l => l.toLowerCase() !== label.toLowerCase())
        : [...lines, label]
      return { ...prev, caracteristiques: next.join('\n') }
    })
  }
  function hasAmenity(label: string) {
    return form.caracteristiques.split('\n').map(s => s.trim().toLowerCase()).includes(label.toLowerCase())
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `biens/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
    if (error) {
      setError('Erreur upload: ' + error.message)
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
      handleChange('image_principale', urlData.publicUrl)
    }
    setUploading(false)
  }

  async function handlePlanUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPlan(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `biens/plans/plan-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
    if (error) {
      setError('Erreur upload plan : ' + error.message)
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
      handleChange('plan', urlData.publicUrl)
    }
    setUploadingPlan(false)
    if (planInputRef.current) planInputRef.current.value = ''
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
      const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true, cacheControl: '31536000' })
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

    // Vérifie l'unicité du slug (deux biens ne peuvent pas partager la même URL)
    const { data: clash } = await supabase
      .from('biens').select('id').eq('slug', form.slug).limit(1).maybeSingle()
    if (clash && clash.id !== initialData?.id) {
      setError(`Le slug « ${form.slug} » est déjà utilisé par un autre bien. Choisissez-en un autre.`)
      setSaving(false)
      return
    }

    const payload = {
      ...form,
      surface: Number(form.surface),
      surface_exterieure: form.surface_exterieure === '' || form.surface_exterieure == null ? null : Number(form.surface_exterieure),
      plan: form.plan || null,
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
      const msg = result.error.message ?? ''
      const isMissingCol = /column .* does not exist|schema cache|nom_en|nom_he|description_en|description_he/i.test(msg)
      setError(
        isMissingCol
          ? "Les colonnes de traduction (nom_en, nom_he, description_en, description_he) n'existent pas encore dans la base. Exécutez la migration SQL dans Supabase, puis réessayez. (Détail : " + msg + ')'
          : msg,
      )
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
  const copyBtnStyle: React.CSSProperties = {
    background: 'transparent', border: '1px solid rgba(200,169,110,0.3)',
    color: '#C8A96E', fontSize: '0.6rem', padding: '2px 7px', cursor: 'pointer',
    letterSpacing: '0.05em', textTransform: 'uppercase',
    fontFamily: 'DM Sans, sans-serif',
  }
  const labelRow = (text: string, onCopy?: () => void): React.ReactNode => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
      <span style={{ ...labelStyle, marginBottom: 0 }}>{text} <span style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'none', letterSpacing: 0 }}>— optionnel</span></span>
      {onCopy && <button type="button" onClick={onCopy} style={copyBtnStyle}>↤ Copier FR</button>}
    </div>
  )
  const counter = (val: string): React.ReactNode => (
    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem', textAlign: 'right' }}>
      {val.length} caractère{val.length > 1 ? 's' : ''}
    </div>
  )

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
                  <label style={labelStyle}>Nom du bien (FR) *</label>
                  <input style={inputStyle} value={form.nom} onChange={e => handleChange('nom', e.target.value)} required placeholder="ex: Penthouse Neve Tzedek" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    {labelRow('Nom (EN)', () => copyFr('nom', 'nom_en'))}
                    <input style={inputStyle} value={form.nom_en} onChange={e => handleChange('nom_en', e.target.value)} placeholder="ex: Neve Tzedek Penthouse" />
                  </div>
                  <div>
                    {labelRow('Nom (HE)', () => copyFr('nom', 'nom_he'))}
                    <input style={inputStyle} value={form.nom_he} onChange={e => handleChange('nom_he', e.target.value)} placeholder="פנטהאוז נווה צדק" dir="rtl" />
                  </div>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '-0.6rem' }}>
                  Si laissé vide, le nom FR sera utilisé sur les versions EN/HE du site.
                </p>

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

                {/* MASQUER toggle — retire le bien de toutes les listes publiques */}
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, masque: !prev.masque }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    width: '100%', padding: '1rem 1.2rem',
                    background: form.masque ? 'rgba(239,68,68,0.08)' : '#1A1B1E',
                    border: `1px solid ${form.masque ? 'rgba(239,68,68,0.5)' : 'rgba(200,169,110,0.15)'}`,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, flexShrink: 0,
                    background: form.masque ? '#EF4444' : '#2A2B2F',
                    position: 'relative', transition: 'background 0.25s',
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: form.masque ? 23 : 3,
                      width: 18, height: 18, borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.25s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={form.masque ? '#EF4444' : '#4A4B50'} strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: form.masque ? '#EF4444' : '#8A8B91', fontFamily: 'DM Sans, sans-serif' }}>
                        Masquer du site
                      </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#4A4B50', marginTop: '2px', fontFamily: 'DM Sans, sans-serif' }}>
                      {form.masque
                        ? 'Ce bien est invisible sur le site (conservé en back-office)'
                        : 'Activer pour retirer ce bien des résultats publics'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Surfaces & prix */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Prix & surfaces</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Surface (m²) *</label>
                    <input type="number" style={inputStyle} value={form.surface} onChange={e => handleChange('surface', Number(e.target.value))} required min="1" />
                  </div>
                  <div>
                    <label style={labelStyle}>Surface ext. (m²)</label>
                    <input type="number" style={inputStyle} value={form.surface_exterieure} onChange={e => handleChange('surface_exterieure', e.target.value)} min="0" placeholder="terrasse, jardin…" />
                  </div>
                  <div>
                    <label style={labelStyle}>Pièces</label>
                    <input type="number" style={inputStyle} value={form.pieces} onChange={e => handleChange('pieces', Number(e.target.value))} min="0" />
                  </div>
                </div>

                {/* Prix NIS — champ principal */}
                <div>
                  <label style={labelStyle}>Prix en ₪ NIS {surDemande ? '(interne — non affiché)' : '*'}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C8A96E', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', pointerEvents: 'none' }}>₪</span>
                    <input
                      type="number"
                      style={{ ...inputStyle, paddingLeft: '28px' }}
                      value={form.prix}
                      onChange={e => handleChange('prix', Number(e.target.value))}
                      required={!surDemande} min="0"
                      placeholder="3 800 000"
                    />
                  </div>
                </div>

                {/* Conversions automatiques */}
                {form.prix > 0 && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div style={{ background: '#0A0A0B', border: '1px solid rgba(200,169,110,0.12)', padding: '0.9rem 1rem', borderRadius: 0 }}>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8A8B91', textTransform: 'uppercase', marginBottom: '4px' }}>Équivalent EUR</div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C8A96E' }}>{fmtEur(nisToEur(form.prix))}</div>
                        <div style={{ fontSize: '0.65rem', color: '#4A4B50', marginTop: '2px' }}>taux : 1 € = {rates.eur.toFixed(2)} ₪</div>
                      </div>
                      <div style={{ background: '#0A0A0B', border: '1px solid rgba(200,169,110,0.12)', padding: '0.9rem 1rem', borderRadius: 0 }}>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8A8B91', textTransform: 'uppercase', marginBottom: '4px' }}>Équivalent USD</div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C8A96E' }}>{fmtUsd(nisToUsd(form.prix))}</div>
                        <div style={{ fontSize: '0.65rem', color: '#4A4B50', marginTop: '2px' }}>taux : 1 $ = {rates.usd.toFixed(2)} ₪</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: rates.live ? '#6B8E6B' : '#8A6B4A', marginTop: '2px' }}>
                      {rates.live
                        ? `● Taux du jour${rates.date ? ' · ' + rates.date : ''} (mis à jour automatiquement)`
                        : '○ Taux indicatifs (API indisponible) — vérifiez avant publication'}
                    </div>
                  </>
                )}

                {/* Toggle : Prix sur demande */}
                <button
                  type="button"
                  onClick={toggleSurDemande}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    width: '100%', padding: '0.9rem 1.2rem',
                    background: surDemande ? 'rgba(200,169,110,0.08)' : '#1A1B1E',
                    border: `1px solid ${surDemande ? 'rgba(200,169,110,0.5)' : 'rgba(200,169,110,0.15)'}`,
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ width: 44, height: 24, borderRadius: 12, flexShrink: 0, background: surDemande ? '#C8A96E' : '#2A2B2F', position: 'relative', transition: 'background 0.25s' }}>
                    <div style={{ position: 'absolute', top: 3, left: surDemande ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: surDemande ? '#C8A96E' : '#8A8B91', fontFamily: 'DM Sans, sans-serif' }}>
                      Prix sur demande
                    </span>
                    <p style={{ fontSize: '0.7rem', color: '#4A4B50', marginTop: '2px', fontFamily: 'DM Sans, sans-serif' }}>
                      {surDemande ? 'Le site affiche « Prix sur demande » au lieu du montant' : 'Activer pour masquer le montant sur le site'}
                    </p>
                  </div>
                </button>

                {/* Prix affiché (éditable) */}
                <div>
                  <label style={labelStyle}>Prix affiché sur le site</label>
                  <input
                    style={{ ...inputStyle, opacity: surDemande ? 0.5 : 1, cursor: surDemande ? 'not-allowed' : 'text' }}
                    value={surDemande ? '' : form.prix_display}
                    onChange={e => handleChange('prix_display', e.target.value)}
                    placeholder={surDemande ? 'Prix sur demande' : '₪ 3 800 000'}
                    disabled={surDemande}
                  />
                  <div style={{ fontSize: '0.68rem', color: '#4A4B50', marginTop: '4px' }}>
                    {surDemande ? 'Champ désactivé — le site affichera « Prix sur demande »' : 'Généré automatiquement · modifiable librement'}
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
                <img src={optImg(form.image_principale, 640, 65)} alt="preview" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }} />
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

            {/* Plan d'étage */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Plan d'étage</h2>

              {form.plan && (
                <div style={{ marginBottom: '1rem' }}>
                  {/\.pdf($|\?)/i.test(form.plan) ? (
                    <a href={form.plan} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#C8A96E', textDecoration: 'none', fontSize: '0.85rem', border: '1px solid rgba(200,169,110,0.3)', padding: '0.6rem 1rem' }}>
                      📄 Voir le plan (PDF)
                    </a>
                  ) : (
                    <img src={optImg(form.plan, 640, 70)} alt="plan" style={{ width: '100%', maxHeight: '240px', objectFit: 'contain', background: '#0A0A0B', border: '1px solid rgba(200,169,110,0.1)' }} />
                  )}
                  <button type="button" onClick={() => handleChange('plan', '')} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '0.75rem' }}>
                    ✕ Retirer le plan
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>URL du plan</label>
                  <input style={inputStyle} value={form.plan} onChange={e => handleChange('plan', e.target.value)} placeholder="https://..." />
                </div>
                <div style={{ textAlign: 'center', padding: '0.5rem 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>— ou —</div>
                <div>
                  <input ref={planInputRef} type="file" accept="image/*,application/pdf" onChange={handlePlanUpload} style={{ display: 'none' }} />
                  <button type="button" onClick={() => planInputRef.current?.click()}
                    disabled={uploadingPlan}
                    style={{
                      width: '100%', padding: '0.75rem',
                      border: '1px dashed rgba(200,169,110,0.3)',
                      background: 'transparent', color: '#C8A96E',
                      cursor: uploadingPlan ? 'wait' : 'pointer',
                      fontSize: '0.8rem',
                    }}>
                    {uploadingPlan ? 'Upload en cours...' : '📐 Importer un plan (image ou PDF)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Description & caractéristiques</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Description (FR) *</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
                    value={form.description}
                    onChange={e => handleChange('description', e.target.value)}
                    required
                    placeholder="Description complète du bien..."
                  />
                </div>
                <div>
                  {labelRow('Description (EN)', () => copyFr('description', 'description_en'))}
                  <textarea
                    style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                    value={form.description_en}
                    onChange={e => handleChange('description_en', e.target.value)}
                    placeholder="English description (optional — French is used as fallback)"
                  />
                  {counter(form.description_en)}
                </div>
                <div>
                  {labelRow('Description (HE)', () => copyFr('description', 'description_he'))}
                  <textarea
                    style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                    value={form.description_he}
                    onChange={e => handleChange('description_he', e.target.value)}
                    placeholder="תיאור בעברית (אופציונלי)"
                    dir="rtl"
                  />
                  {counter(form.description_he)}
                </div>
                <div>
                  <label style={labelStyle}>Caractéristiques (une par ligne)</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                    value={form.caracteristiques}
                    onChange={e => handleChange('caracteristiques', e.target.value)}
                    placeholder={"Vue mer 180°\nTerrasse 80m²\nDomotique complète\nParking x2"}
                  />
                  {/* Palette d'équipements — clic pour ajouter/retirer (icône affichée sur la fiche publique) */}
                  <p style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '1rem 0 0.6rem' }}>
                    Équipements rapides
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {AMENITIES.map(a => {
                      const active = hasAmenity(a.labels.fr)
                      return (
                        <button
                          key={a.key}
                          type="button"
                          onClick={() => toggleAmenity(a.labels.fr)}
                          title={active ? 'Retirer' : 'Ajouter'}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.35rem 0.7rem',
                            background: active ? 'rgba(200,169,110,0.18)' : '#1A1B1E',
                            border: `1px solid ${active ? 'rgba(200,169,110,0.6)' : 'rgba(200,169,110,0.18)'}`,
                            color: active ? '#E8D5A3' : '#8A8B91',
                            cursor: 'pointer', fontSize: '0.72rem',
                            fontFamily: 'DM Sans, sans-serif',
                            transition: 'all 0.15s',
                          }}
                        >
                          <AmenityIcon paths={a.paths} size={15} />
                          {a.labels.fr}
                        </button>
                      )
                    })}
                  </div>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.6rem' }}>
                    Astuce : tu peux aussi taper du texte libre (ex. « Vue mer 180° ») — l&apos;icône est détectée automatiquement par mot-clé.
                  </p>
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
                    src={optImg(url, 384, 60)}
                    alt={`Photo ${idx + 1}`}
                    loading="lazy"
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
            src={optImg(lightbox, 1920, 78)}
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
