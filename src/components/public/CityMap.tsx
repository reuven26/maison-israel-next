'use client'

import dynamic from 'next/dynamic'

// Leaflet accesses `window` – must be rendered client-side only
const CityMapInner = dynamic(() => import('./CityMapInner'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '520px',
      background: '#111214',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        color: '#C8A96E',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '2px solid rgba(200,169,110,0.3)',
          borderTopColor: '#C8A96E',
          animation: 'spin 0.9s linear infinite',
        }} />
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Chargement…
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  ),
})

interface Props {
  slug: string
  neighborhoods: { name: string; desc: { fr: string; en: string; he: string } }[]
  lang: string
  isRTL: boolean
}

export default function CityMap(props: Props) {
  return <CityMapInner {...props} />
}
