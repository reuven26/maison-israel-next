import { createClient } from '@/lib/supabase/server'
import LeadStatusSelect from '@/components/admin/LeadStatusSelect'

export default async function AdminLeads() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('*, biens(nom)')
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    nouveau: '#F59E0B', contacte: '#3B82F6', qualifie: '#8B5CF6',
    converti: '#22C55E', ferme: '#6B7280'
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>Leads</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
          {leads?.length ?? 0} contacts · {leads?.filter((l: any) => l.statut === 'nouveau').length ?? 0} nouveaux
        </p>
      </div>

      {/* Summary badges */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {Object.entries(statusColors).map(([statut, color]) => {
          const count = leads?.filter((l: any) => l.statut === statut).length ?? 0
          return (
            <div key={statut} style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color, fontSize: '1rem', fontFamily: 'Cormorant Garamond, serif' }}>{count}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{statut.replace('_', ' ')}</span>
            </div>
          )
        })}
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
            {leads && leads.length > 0 ? leads.map((lead: any) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontWeight: 500, color: '#fff', fontSize: '0.9rem' }}>{lead.nom}</div>
                  {lead.source && <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>via {lead.source}</div>}
                </td>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <a href={`mailto:${lead.email}`} style={{ color: '#C8A96E', fontSize: '0.85rem', textDecoration: 'none' }}>{lead.email}</a>
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {lead.telephone ? <a href={`tel:${lead.telephone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.telephone}</a> : '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  {lead.biens?.nom ?? '—'}
                </td>
                <td style={{ padding: '1rem 1.2rem', maxWidth: '200px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lead.message || '—'}
                  </p>
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
                  Aucun lead pour l'instant. Les demandes de contact apparaîtront ici.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
