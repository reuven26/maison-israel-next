import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: bienCount },
    { count: leadCount },
    { count: articleCount },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('biens').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const { count: newLeadCount } = await supabase
    .from('leads').select('*', { count: 'exact', head: true }).eq('statut', 'nouveau')

  const stats = [
    { label: 'Biens actifs', value: bienCount ?? 0, icon: '🏠', href: '/admin/biens', color: '#C8A96E' },
    { label: 'Leads total', value: leadCount ?? 0, icon: '👥', href: '/admin/leads', color: '#3B82F6' },
    { label: 'Nouveaux leads', value: newLeadCount ?? 0, icon: '🔔', href: '/admin/leads', color: '#F59E0B' },
    { label: 'Articles', value: articleCount ?? 0, icon: '📝', href: '/admin/articles', color: '#22C55E' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.3rem' }}>
          Tableau de bord
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          Vue d'ensemble · {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem', transition: 'border-color 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                <span style={{ fontSize: '0.65rem', color: stat.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Voir tout →</span>
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: stat.color, marginBottom: '0.3rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem' }}>Actions rapides</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href="/admin/biens/new" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: '#C8A96E', textDecoration: 'none', fontSize: '0.85rem', transition: 'background 0.3s' }}>
              <span>+</span> Ajouter un bien
            </Link>
            <Link href="/admin/articles/new" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD', textDecoration: 'none', fontSize: '0.85rem' }}>
              <span>+</span> Nouvel article
            </Link>
            <Link href="/admin/leads" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D', textDecoration: 'none', fontSize: '0.85rem' }}>
              <span>📧</span> Voir les leads
            </Link>
          </div>
        </div>

        {/* Recent leads */}
        <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem' }}>
            Leads récents
          </h2>
          {recentLeads && recentLeads.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {recentLeads.map((lead: any) => (
                <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>{lead.nom}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{lead.email}</div>
                  </div>
                  <span style={{
                    fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: '2px',
                    background: lead.statut === 'nouveau' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                    color: lead.statut === 'nouveau' ? '#FCD34D' : 'rgba(255,255,255,0.4)',
                  }}>
                    {lead.statut}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Aucun lead pour l'instant</p>
          )}
        </div>
      </div>
    </div>
  )
}
