import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteBienButton from '@/components/admin/DeleteBienButton'
import type { Bien } from '@/types'

export default async function AdminBiens() {
  const supabase = await createClient()
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    actif: '#22C55E', vendu: '#EF4444', sous_compromis: '#F59E0B', loue: '#3B82F6'
  }
  const statusLabels: Record<string, string> = {
    actif: 'Actif', vendu: 'Vendu', sous_compromis: 'Compromis', loue: 'Loué'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>Biens</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {biens?.length ?? 0} propriété{(biens?.length ?? 0) > 1 ? 's' : ''} au total
          </p>
        </div>
        <Link href="/admin/biens/new" style={{
          background: '#C8A96E', color: '#0A0A0B',
          padding: '0.7rem 1.5rem',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          textDecoration: 'none', fontWeight: 600,
        }}>
          + Ajouter un bien
        </Link>
      </div>

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
            {biens && biens.length > 0 ? biens.map((bien: Bien) => (
              <tr key={bien.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.2rem' }}>
                  <img src={bien.image_principale} alt={bien.nom} style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
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
                  <span style={{
                    fontSize: '0.65rem', padding: '0.3rem 0.7rem',
                    background: `${statusColors[bien.statut]}20`,
                    color: statusColors[bien.statut],
                    border: `1px solid ${statusColors[bien.statut]}40`,
                  }}>
                    {statusLabels[bien.statut]}
                  </span>
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
                  Aucun bien pour l'instant. <Link href="/admin/biens/new" style={{ color: '#C8A96E' }}>Ajouter le premier</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
