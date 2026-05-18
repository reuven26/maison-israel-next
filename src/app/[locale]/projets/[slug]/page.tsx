import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import BienGallery from '@/components/public/BienGallery'
import BienContactCard from '@/components/public/BienContactCard'
import PropertyMap from '@/components/public/PropertyMap'

export const revalidate = 60

export default async function BienPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const messages = await getMessages(locale as Locale)
  const p = messages.properties
  const isRTL = locale === 'he'

  const supabase = await createClient()
  const { data: bien } = await supabase.from('biens').select('*').eq('slug', slug).single()
  if (!bien) notFound()

  const stats = [
    [isRTL ? 'שטח' : (locale === 'en' ? 'Surface' : 'Surface'), `${bien.surface} ${p.surface}`],
    ...(bien.pieces ? [[isRTL ? 'חדרים' : (locale === 'en' ? 'Rooms' : 'Pièces'), `${bien.pieces} ${p.rooms}`]] : []),
    [isRTL ? 'סוג' : (locale === 'en' ? 'Type' : 'Type'), bien.type],
    ...(bien.reference ? [[isRTL ? 'מ"מ' : (locale === 'en' ? 'Ref' : 'Réf.'), bien.reference]] : []),
  ] as [string, string][]

  return (
    <>
      <div style={{ paddingTop: '80px' }} />
      <div style={{ height: '70vh', overflow: 'hidden', position: 'relative' }}>
        <img src={bien.image_principale} alt={bien.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.6) 0%, transparent 50%)' }} />
        {bien.badge && (
          <div style={{ position: 'absolute', top: '2rem', [isRTL ? 'right' : 'left']: '2rem', background: '#C8A96E', color: '#0A0A0B', padding: '0.4rem 1rem', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
            {bien.badge}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '3rem', [isRTL ? 'right' : 'left']: '3rem', color: '#fff', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.75rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '0.5rem' }}>
            {bien.quartier ? `${bien.quartier} · ${bien.ville}` : bien.ville}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: '0.5rem' }}>{bien.nom}</h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#C8A96E' }}>{bien.prix_display}</p>
        </div>
      </div>

      {/* Gallery */}
      {bien.images && bien.images.length > 0 && (
        <BienGallery images={bien.images} mainImage={bien.image_principale} nom={bien.nom} />
      )}

      <section style={{ padding: '4rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid-detail">
          <div>
            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2px', marginBottom: '3rem', background: 'rgba(200,169,110,0.08)' }}>
              {stats.map(([label, value]) => (
                <div key={label} style={{ background: '#111214', padding: '1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '6px' }}>{label}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#FAFAF9' }}>{value}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#FAFAF9', marginBottom: '1rem' }}>{p.description}</h2>
            <p style={{ color: '#8A8B91', lineHeight: 1.9, fontSize: '1rem', marginBottom: '2.5rem' }}>{bien.description}</p>

            {bien.caracteristiques?.length > 0 && (
              <>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#FAFAF9', marginBottom: '1rem' }}>{p.features}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {bien.caracteristiques.map((c: string) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
                      <span style={{ color: '#C8A96E', fontSize: '0.8rem' }}>✦</span>
                      <span style={{ fontSize: '0.9rem', color: '#D4D5D8' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Map — emplacement du bien */}
            <div style={{ marginTop: '3.5rem' }}>
              <PropertyMap
                ville={bien.ville}
                quartier={bien.quartier ?? null}
                locale={locale}
                isRTL={isRTL}
              />
            </div>
          </div>

          {/* Contact card */}
          <div className="detail-contact-card">
            <BienContactCard
              bienNom={bien.nom}
              bienPrix={bien.prix_display}
              bienRef={bien.reference}
              locale={locale}
              isRTL={isRTL}
              messages={messages}
            />
          </div>
        </div>
      </section>
    </>
  )
}
