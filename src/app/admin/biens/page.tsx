import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BiensTable from '@/components/admin/BiensTable'
import type { Bien } from '@/types'

export default async function AdminBiens() {
  const supabase = await createClient()
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .order('created_at', { ascending: false })

  const list = (biens ?? []) as Bien[]
  const activeCount = list.filter(b => b.statut === 'actif').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>Biens</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {list.length} propriété{list.length > 1 ? 's' : ''} · {activeCount} active{activeCount > 1 ? 's' : ''}
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

      <BiensTable biens={list} />
    </div>
  )
}
