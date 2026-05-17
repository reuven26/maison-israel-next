'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteArticleButton({ id, titre }: { id: string; titre: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm(`Supprimer "${titre}" ?`)) return
    const supabase = createClient()
    await supabase.from('articles').delete().eq('id', id)
    router.refresh()
  }
  return (
    <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#EF4444' }}>
      Supprimer
    </button>
  )
}
