'use client'

import { useMemo, useState } from 'react'
import LeadStatusSelect from '@/components/admin/LeadStatusSelect'

interface Lead {
  id: string
  nom: string | null
  email: string | null
  telephone: string | null
  message: string | null
  statut: string
  source: string | null
  created_at: string
  biens?: { nom: string | null } | null
}

const statusColors: Record<string, string> = {
  nouveau: '#F59E0B', contacte: '#3B82F6', qualifie: '#8B5CF6',
  converti: '#22C55E', ferme: '#6B7280',
}

const inputStyle: React.CSSProperties = {
  padding: '0.6rem 0.9rem',
  background: '#1E1E22',
  border: '1px solid rgba(200,169,110,0.2)',
  color: '#fff', fontSize: '0.85rem', outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
}

function toWhatsApp(tel: string) {
  const digits = tel.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}`
}

function exportCsv(rows: Lead[]) {
  const headers = ['Nom', 'Email', 'Téléphone', 'Bien', 'Message', 'Statut', 'Source', 'Date']
  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v)
    return `"${s.replace(/"/g, '""')}"`
  }
  const lines = [
    headers.join(','),
    ...rows.map(l => [
      l.nom, l.email, l.telephone, l.biens?.nom, l.message,
      l.statut, l.source, new Date(l.created_at).toLocaleString('fr-FR'),
    ].map(esc).join(',')),
  ]
  // BOM pour qu'Excel lise l'UTF-8 (accents) correctement
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [q, setQ] = useState('')
  const [statut, setStatut] = useState('')
  const [openMsg, setOpenMsg] = useState<Lead | null>(null)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return leads.filter(l => {
      if (statut && l.statut !== statut) return false
      if (!term) return true
      return [l.nom, l.email, l.telephone, l.message, l.biens?.nom]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(term))
    })
  }, [leads, q, statut])

  return (
    <div>
      {/* Barre d'outils */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          style={{ ...inputStyle, flex: '1 1 220px', minWidth: '180px' }}
          placeholder="Rechercher (nom, email, téléphone, message)…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select style={inputStyle} value={statut} onChange={e => setStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          {Object.keys(statusColors).map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
          ))}
        </select>
        {(q || statut) && (
          <button
            type="button"
            onClick={() => { setQ(''); setStatut('') }}
            style={{ ...inputStyle, cursor: 'pointer', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)', background: 'transparent' }}
          >
            Réinitialiser
          </button>
        )}
        <button
          type="button"
          onClick={() => exportCsv(filtered)}
          disabled={filtered.length === 0}
          style={{
            ...inputStyle, cursor: filtered.length ? 'pointer' : 'default',
            color: '#0A0A0B', background: filtered.length ? '#C8A96E' : 'rgba(200,169,110,0.4)',
            border: 'none', fontWeight: 600, letterSpacing: '0.05em',
            marginLeft: 'auto',
          }}
        >
          ⬇ Export CSV ({filtered.length})
        </button>
      </div>

      <div className="admin-table-wrap" style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
              {['Contact', 'Email', 'Téléphone', 'Bien concerné', 'Message', 'Statut', 'Date'].map(h => (
                <th key={h} style={{ padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontWeight: 500, color: '#fff', fontSize: '0.9rem' }}>{lead.nom}</div>
                  {lead.source && <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>via {lead.source}</div>}
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  {lead.email
                    ? <a href={`mailto:${lead.email}`} style={{ color: '#C8A96E', fontSize: '0.85rem', textDecoration: 'none' }}>{lead.email}</a>
                    : '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {lead.telephone ? (
                    <span style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <a href={`tel:${lead.telephone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.telephone}</a>
                      <a href={toWhatsApp(lead.telephone)} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ color: '#25D366', textDecoration: 'none', fontSize: '0.95rem' }}>✆</a>
                    </span>
                  ) : '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  {lead.biens?.nom ?? '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem', maxWidth: '220px' }}>
                  {lead.message ? (
                    <button
                      type="button"
                      onClick={() => setOpenMsg(lead)}
                      title="Lire le message complet"
                      style={{
                        background: 'none', border: 'none', padding: 0, textAlign: 'left',
                        color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', cursor: 'pointer',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        maxWidth: '200px', display: 'block', fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {lead.message}
                    </button>
                  ) : '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <LeadStatusSelect leadId={lead.id} currentStatut={lead.statut} />
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
                  {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                  {leads.length === 0
                    ? "Aucun lead pour l'instant. Les demandes de contact apparaîtront ici."
                    : 'Aucun lead ne correspond à votre recherche.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal message complet */}
      {openMsg && (
        <div
          onClick={() => setOpenMsg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#141416', border: '1px solid rgba(200,169,110,0.25)',
              maxWidth: '560px', width: '100%', maxHeight: '80vh', overflow: 'auto',
              padding: '2rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#fff' }}>{openMsg.nom}</div>
                <div style={{ fontSize: '0.8rem', color: '#C8A96E' }}>{openMsg.email}</div>
              </div>
              <button
                onClick={() => setOpenMsg(null)}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 32, height: 32, cursor: 'pointer' }}
              >×</button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {openMsg.message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
