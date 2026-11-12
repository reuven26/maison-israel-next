import { createClient } from '@/lib/supabase/server'
import LeadsTable from '@/components/admin/LeadsTable'

export default async function AdminLeads() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('*, biens(nom)')
    .order('created_at', { ascending: false })

  const list = (leads ?? []) as any[]

  const statusColors: Record<string, string> = {
    nouveau: '#F59E0B', contacte: '#3B82F6', qualifie: '#8B5CF6',
    converti: '#22C55E', ferme: '#6B7280'
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>Leads</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
          {list.length} contacts · {list.filter(l => l.statut === 'nouveau').length} nouveaux
        </p>
      </div>

      {/* Summary badges */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {Object.entries(statusColors).map(([statut, color]) => {
          const count = list.filter(l => l.statut === statut).length
          return (
            <div key={statut} style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color, fontSize: '1rem', fontFamily: 'Cormorant Garamond, serif' }}>{count}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{statut.replace('_', ' ')}</span>
            </div>
          )
        })}
      </div>

      <LeadsTable leads={list} />
    </div>
  )
}
