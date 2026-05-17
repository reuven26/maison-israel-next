'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteBienButton({ id, nom }: { id: string; nom: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Supprimer "${nom}" ? Cette action est irréversible.`)) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('biens').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} style={{
      background: 'none', border: 'none', cursor: loading ? 'wait' : 'pointer',
      fontSize: '0.8rem', color: '#EF4444', padding: 0,
    }}>
      {loading ? '...' : 'Supprimer'}
    </button>
  )
}
