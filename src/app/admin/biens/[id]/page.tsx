import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BienForm from '@/components/admin/BienForm'

export default async function EditBienPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: bien } = await supabase.from('biens').select('*').eq('id', id).single()
  if (!bien) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.3rem' }}>
        Modifier le bien
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>{bien.nom}</p>
      <BienForm initialData={bien} />
    </div>
  )
}
