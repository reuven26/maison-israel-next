import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteBienButton from '@/components/admin/DeleteBienButton'
import type { Bien } from '@/types'

export default async function AdminOffMarket() {
  const supabase = await createClient()

  // All biens — to show which ones are off-market and allow toggling
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .order('created_at', { ascending: false })

  const offMarket = (biens ?? []).filter((b: Bien) => b.off_market)
  const others    = (biens ?? []).filter((b: Bien) => !b.off_market)

  const statusColors: Record<string, string> = {
    actif: '#22C55E', vendu: '#EF4444', sous_compromis: '#F59E0B', loue: '#3B82F6',
  }
  const statusLabels: Record<string, string> = {
    actif: 'Actif', vendu: 'Vendu', sous_compromis: 'Compromis', loue: 'Loué',
  }

  const rowStyle = (isOff: boolean) => ({
    display: 'grid',
    gridTemplateColumns: '60px 1fr 120px 100px 80px 120px',
    gap: '0',
    borderBottom: '1px solid rgba(200,169,110,0.07)',
    alignItems: 'center',
    background: isOff ? 'rgba(200,169,110,0.04)' : 'transparent',
  })

  const cellStyle = {
    padding: '1rem',
    fontSize: '0.83rem',
    color: 'rgba(255,255,255,0.75)',
  }

  function BienRow({ bien }: { bien: Bien }) {
    return (
      <div style={rowStyle(bien.off_market)}>
        {/* Thumb */}
        <div style={{ padding: '0.8rem' }}>
          <img
            src={bien.image_principale}
            alt={bien.nom}
            style={{ width: 44, height: 36, objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Name */}
        <div style={{ ...cellStyle, padding: '0.8rem 1rem' }}>
          <div style={{ color: '#FAFAF9', fontWeight: 500, marginBottom: '2px' }}>{bien.nom}</div>
          <div style={{ fontSize: '0.75rem', color: '#8A8B91' }}>
            {bien.quartier ? `${bien.quartier} · ` : ''}{bien.ville} · {bien.type}
          </div>
        </div>
        {/* Prix */}
        <div style={cellStyle}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C8A96E' }}>
            {bien.prix_display}
          </span>
        </div>
        {/* Statut */}
        <div style={cellStyle}>
          <span style={{
            background: statusColors[bien.statut] + '22',
            color: statusColors[bien.statut],
            padding: '3px 8px', fontSize: '0.7rem',
            fontWeight: 600, letterSpacing: '0.08em',
          }}>
            {statusLabels[bien.statut]}
          </span>
        </div>
        {/* Off Market badge */}
        <div style={{ ...cellStyle, textAlign: 'center' }}>
          {bien.off_market ? (
            <span style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E', padding: '3px 8px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em' }}>
              🔒 PRIVÉ
            </span>
          ) : (
            <span style={{ color: '#2A2B2F', fontSize: '0.75rem' }}>—</span>
          )}
        </div>
        {/* Actions */}
        <div style={{ ...cellStyle, display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', paddingRight: '1rem' }}>
          <Link href={`/admin/biens/${bien.id}`} style={{
            background: 'rgba(200,169,110,0.1)', color: '#C8A96E',
            padding: '0.35rem 0.8rem', fontSize: '0.7rem',
            textDecoration: 'none', letterSpacing: '0.05em',
          }}>
            Éditer
          </Link>
          <DeleteBienButton id={bien.id} nom={bien.nom} />
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff' }}>
              Off Market
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
            <strong style={{ color: '#C8A96E' }}>{offMarket.length}</strong> bien{offMarket.length > 1 ? 's' : ''} dans le portefeuille privé
            {' · '}
            <strong style={{ color: 'rgba(255,255,255,0.5)' }}>{others.length}</strong> non listés
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link href="/admin/biens/new" style={{
            background: '#C8A96E', color: '#0A0A0B',
            padding: '0.7rem 1.5rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 600,
          }}>
            + Nouveau bien
          </Link>
          <Link href="/fr/off-market" target="_blank" style={{
            border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E',
            padding: '0.7rem 1.2rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            textDecoration: 'none',
          }}>
            ↗ Voir la page
          </Link>
        </div>
      </div>

      {/* Info banner */}
      <div style={{
        background: 'rgba(200,169,110,0.05)',
        border: '1px solid rgba(200,169,110,0.15)',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ fontSize: '0.82rem', color: '#8A8B91' }}>
          Pour ajouter un bien au portefeuille Off Market, éditez-le et activez le toggle{' '}
          <strong style={{ color: '#C8A96E' }}>"Portefeuille Off Market"</strong>{' '}
          dans la section "Informations générales".
        </p>
      </div>

      {/* Off Market section */}
      {offMarket.length > 0 && (
        <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.2)', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(200,169,110,0.12)', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(200,169,110,0.04)' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C8A96E', textTransform: 'uppercase' }}>
              🔒 Dans le portefeuille privé ({offMarket.length})
            </span>
          </div>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 100px 80px 120px', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '0' }}>
            {['', 'Bien', 'Prix', 'Statut', 'Accès', 'Actions'].map(h => (
              <div key={h} style={{ padding: '0.7rem 1rem', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8A8B91', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {offMarket.map((bien: Bien) => <BienRow key={bien.id} bien={bien} />)}
        </div>
      )}

      {/* Other biens — can be added */}
      <div style={{ background: '#141416', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(200,169,110,0.07)' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#8A8B91', textTransform: 'uppercase' }}>
            Autres biens — non listés en Off Market ({others.length})
          </span>
        </div>
        {others.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#4A4B50', fontSize: '0.85rem' }}>
            Tous vos biens sont dans le portefeuille Off Market.
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 100px 80px 120px', borderBottom: '1px solid rgba(200,169,110,0.07)' }}>
              {['', 'Bien', 'Prix', 'Statut', 'Accès', 'Actions'].map(h => (
                <div key={h} style={{ padding: '0.7rem 1rem', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8A8B91', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {others.map((bien: Bien) => <BienRow key={bien.id} bien={bien} />)}
          </>
        )}
      </div>
    </div>
  )
}
