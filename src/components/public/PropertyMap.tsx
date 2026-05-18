'use client'

import dynamic from 'next/dynamic'

const PropertyMapInner = dynamic(() => import('./PropertyMapInner'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '420px', background: '#111214', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: '#C8A96E' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(200,169,110,0.3)', borderTopColor: '#C8A96E', animation: 'spin 0.9s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  ),
})

interface Props {
  ville: string
  quartier?: string | null
  locale: string
  isRTL: boolean
}

export default function PropertyMap(props: Props) {
  return <PropertyMapInner {...props} />
}
