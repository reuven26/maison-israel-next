import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import ContactFormClient from '@/components/public/ContactFormClient'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const c = messages.contact
  const isRTL = locale === 'he'

  const details = [
    { icon: '📍', label: c.address_label, content: c.address },
    { icon: '📞', label: c.phone_label, content: '+972 55 500 2640' },
    { icon: '✉️', label: c.email_label, content: 'contact@maison-israel.com' },
    { icon: '🕐', label: c.hours_label, content: c.hours },
  ]

  return (
    <>
      <div style={{ paddingTop: '120px', background: '#0A0A0B', paddingBottom: '4rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>{c.tag}</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 300 }}>{c.title}</h1>
      </div>

      <section className="section-pad" style={{ background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="grid-contact">
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#FAFAF9', marginBottom: '2rem' }}>{c.coords}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {details.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9rem', color: '#8A8B91', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactFormClient locale={locale} messages={messages} />
        </div>
      </section>
    </>
  )
}
