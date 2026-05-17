'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function slugify(str: string) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

const CATEGORIES = ['Marché', 'Fiscalité', 'Quartiers', 'Aliyah', 'Investissement', 'Lifestyle', 'Actualités']

export default function ArticleForm({ initialData }: { initialData?: any }) {
  const isEdit = !!initialData?.id
  const router = useRouter()
  const [form, setForm] = useState({
    titre: initialData?.titre ?? '',
    slug: initialData?.slug ?? '',
    sous_titre: initialData?.sous_titre ?? '',
    auteur: initialData?.auteur ?? 'Équipe Maison Israël',
    categorie: initialData?.categorie ?? 'Marché',
    contenu: initialData?.contenu ?? '',
    extrait: initialData?.extrait ?? '',
    image: initialData?.image ?? '',
    statut: initialData?.statut ?? 'brouillon',
    tags: (initialData?.tags ?? []).join(', '),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(field: string, value: string) {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'titre' && !isEdit) updated.slug = slugify(value)
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      date_publication: form.statut === 'publie' ? new Date().toISOString() : null,
    }
    let result
    if (isEdit) {
      result = await supabase.from('articles').update(payload).eq('id', initialData.id)
    } else {
      result = await supabase.from('articles').insert([payload])
    }
    if (result.error) { setError(result.error.message); setSaving(false) }
    else { setSuccess(true); setTimeout(() => router.push('/admin/articles'), 1000) }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#1E1E22', border: '1px solid rgba(200,169,110,0.2)',
    color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'DM Sans, sans-serif',
  }
  const labelStyle = {
    display: 'block', fontSize: '0.65rem', color: '#C8A96E',
    letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '0.4rem',
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-article-form">
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={labelStyle}>Titre *</label>
              <input style={inputStyle} value={form.titre} onChange={e => handleChange('titre', e.target.value)} required placeholder="Titre de l'article" />
            </div>
            <div>
              <label style={labelStyle}>Sous-titre</label>
              <input style={inputStyle} value={form.sous_titre} onChange={e => handleChange('sous_titre', e.target.value)} placeholder="Sous-titre accrocheur" />
            </div>
            <div>
              <label style={labelStyle}>Extrait</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.extrait} onChange={e => handleChange('extrait', e.target.value)} placeholder="Résumé en 2-3 phrases..." />
            </div>
            <div>
              <label style={labelStyle}>Contenu *</label>
              <textarea style={{ ...inputStyle, minHeight: '400px', resize: 'vertical' }} value={form.contenu} onChange={e => handleChange('contenu', e.target.value)} required placeholder="Contenu HTML ou texte de l'article..." />
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>HTML accepté pour la mise en forme</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff' }}>Publication</h2>
            <div>
              <label style={labelStyle}>Statut</label>
              <select style={inputStyle} value={form.statut} onChange={e => handleChange('statut', e.target.value)}>
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Catégorie</label>
              <select style={inputStyle} value={form.categorie} onChange={e => handleChange('categorie', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Auteur</label>
              <input style={inputStyle} value={form.auteur} onChange={e => handleChange('auteur', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Slug URL</label>
              <input style={inputStyle} value={form.slug} onChange={e => handleChange('slug', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Tags (séparés par virgule)</label>
              <input style={inputStyle} value={form.tags} onChange={e => handleChange('tags', e.target.value)} placeholder="Tel Aviv, investissement, 2025" />
            </div>
            <div>
              <label style={labelStyle}>Image de couverture (URL)</label>
              <input style={inputStyle} value={form.image} onChange={e => handleChange('image', e.target.value)} placeholder="https://..." />
              {form.image && <img src={form.image} alt="" style={{ width: '100%', height: '120px', objectFit: 'cover', marginTop: '0.5rem' }} />}
            </div>
          </div>
        </div>
      </div>

      {error && <div style={{ marginTop: '1.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '1rem', fontSize: '0.85rem' }}>⚠️ {error}</div>}
      {success && <div style={{ marginTop: '1.5rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ADE80', padding: '1rem', fontSize: '0.85rem' }}>✅ Article sauvegardé !</div>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="submit" disabled={saving} style={{ background: saving ? 'rgba(200,169,110,0.5)' : '#C8A96E', color: '#0A0A0B', border: 'none', cursor: 'pointer', padding: '0.9rem 2.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          {saving ? 'Sauvegarde...' : (isEdit ? 'Mettre à jour' : 'Créer l\'article')}
        </button>
        <button type="button" onClick={() => router.push('/admin/articles')} style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.9rem 2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Annuler
        </button>
      </div>
    </form>
  )
}
