'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const STATUTS = [
  { value: 'nouveau', label: 'Nouveau', color: '#F59E0B' },
  { value: 'contacte', label: 'Contacté', color: '#3B82F6' },
  { value: 'qualifie', label: 'Qualifié', color: '#8B5CF6' },
  { value: 'converti', label: 'Converti', color: '#22C55E' },
  { value: 'ferme', label: 'Fermé', color: '#6B7280' },
]

export default function LeadStatusSelect({ leadId, currentStatut }: { leadId: string; currentStatut: string }) {
  const [statut, setStatut] = useState(currentStatut)
  const router = useRouter()
  const current = STATUTS.find(s => s.value === statut)

  async function handleChange(newStatut: string) {
    setStatut(newStatut)
    const supabase = createClient()
    await supabase.from('leads').update({ statut: newStatut }).eq('id', leadId)
    router.refresh()
  }

  return (
    <select
      value={statut}
      onChange={e => handleChange(e.target.value)}
      style={{
        background: `${current?.color}20`,
        border: `1px solid ${current?.color}40`,
        color: current?.color,
        padding: '0.3rem 0.6rem',
        fontSize: '0.75rem',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {STATUTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
    </select>
  )
}
