'use client'

import { useMemo, useState } from 'react'
import { optImg } from '@/lib/img'
import Link from 'next/link'
import DeleteBienButton from '@/components/admin/DeleteBienButton'
import type { Bien } from '@/types'

const statusColors: Record<string, string> = {
  actif: '#22C55E', vendu: '#EF4444', sous_compromis: '#F59E0B', loue: '#3B82F6',
}
const statusLabels: Record<string, string> = {
  actif: 'Actif', vendu: 'Vendu', sous_compromis: 'Compromis', loue: 'Loué',
}

const inputStyle: React.CSSProperties = {
  padding: '0.6rem 0.9rem',
  background: '#1E1E22',
  border: '1px solid rgba(200,169,110,0.2)',
  color: '#fff', fontSize: '0.85rem', outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
}

export default function BiensTable({ biens }: { biens: Bien[] }) {
  const [q, setQ] = useState('')
  const [statut, setStatut] = useState('')
  const [ville, setVille] = useState('')

  const villes = useMemo(
    () => Array.from(new Set(biens.map(b => b.ville).filter(Boolean))).sort(),
    [biens],
  )

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return biens.filter(b => {
      if (statut && b.statut !== statut) return false
      if (ville && b.ville !== ville) return false
      if (!term) return true
      return [b.nom, b.quartier, b.ville, b.reference, b.type]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(term))
    })
  }, [biens, q, statut, ville])

  return (
    <div>
      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        <input
          style={{ ...inputStyle, flex: '1 1 220px', minWidth: '180px' }}
          placeholder="Rechercher (nom, quartier, réf.)…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select style={inputStyle} value={statut} onChange={e => setStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select style={inputStyle} value={ville} onChange={e => setVille(e.target.value)}>
          <option value="">Toutes les villes</option>
          {villes.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        {(q || statut || ville) && (
          <button
            type="button"
            onClick={() => { setQ(''); setStatut(''); setVille('') }}
            style={{ ...inputStyle, cursor: 'pointer', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)', background: 'transparent' }}
          >
            Réinitialiser
          </button>
        )}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginBottom: '0.8rem' }}>
        {filtered.length} / {biens.length} bien{biens.length > 1 ? 's' : ''}
      </p>

      <div className="admin-table-wrap" style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
              {['Image', 'Propriété', 'Ville', 'Prix', 'Surface', 'Statut', 'Actions'].map(h => (
                <th key={h} style={{ padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(bien => (
              <tr key={bien.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1rem 1.2rem' }}>
                  {bien.image_principale
                    ? <img src={optImg(bien.image_principale, 128, 60)} alt={bien.nom} loading="lazy" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                    : <div style={{ width: '60px', height: '40px', background: '#1E1E22' }} />}
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontWeight: 500, color: '#fff', fontSize: '0.9rem' }}>{bien.nom}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>{bien.type}</div>
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {bien.quartier ? `${bien.quartier}, ` : ''}{bien.ville}
                </td>
                <td style={{ padding: '1rem 1.2rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C8A96E' }}>
                  {bien.prix_display}
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {bien.surface} m²
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '0.65rem', padding: '0.3rem 0.7rem',
                      background: `${statusColors[bien.statut]}20`,
                      color: statusColors[bien.statut],
                      border: `1px solid ${statusColors[bien.statut]}40`,
                    }}>
                      {statusLabels[bien.statut]}
                    </span>
                    {bien.masque && (
                      <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        ⦸ Masqué
                      </span>
                    )}
                    {bien.off_market && (
                      <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'rgba(200,169,110,0.12)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Off-market
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Link href={`/admin/biens/${bien.id}`} style={{ fontSize: '0.8rem', color: '#C8A96E', textDecoration: 'none' }}>Modifier</Link>
                    <Link href={`/projets/${bien.slug}`} target="_blank" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Voir ↗</Link>
                    <DeleteBienButton id={bien.id} nom={bien.nom} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                  {biens.length === 0
                    ? <>Aucun bien pour l'instant. <Link href="/admin/biens/new" style={{ color: '#C8A96E' }}>Ajouter le premier</Link></>
                    : 'Aucun bien ne correspond à votre recherche.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
