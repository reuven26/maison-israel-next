import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin — Maison Israël',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Special case: login page doesn't need auth check here (middleware handles it)
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B', fontFamily: 'DM Sans, sans-serif' }}>
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
