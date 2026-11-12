import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import ClubForm from '@/components/public/ClubForm'

const COPY = {
  fr: {
    eyebrow: 'Cercle privé · Sur invitation',
    title: 'Le Cercle — Newsletter privée immobilier de prestige en Israël',
    sub: 'Le cercle privé de Maison Israël. Opportunités off-market, analyses de l’économie israélienne, événements exclusifs et art de vivre — directement dans votre boîte mail.',
    pillarsTitle: 'Ce que vous recevez',
    pillars: [
      { icon: '🏛', t: 'Immobilier', d: 'Biens off-market et opportunités avant le marché.' },
      { icon: '📈', t: 'Économie israélienne', d: 'Analyses, tendances et signaux pour investir au bon moment.' },
      { icon: '🥂', t: 'Événements exclusifs', d: 'Invitations privées à Tel Aviv, Jérusalem et Paris.' },
      { icon: '✦', t: 'Lifestyle & Luxe', d: 'Adresses confidentielles, art de vivre et culture en Israël.' },
    ],
    formTitle: 'Rejoindre Le Cercle',
  },
  en: {
    eyebrow: 'Private circle · By invitation',
    title: 'The Circle — Private Newsletter on Luxury Real Estate in Israel',
    sub: 'The private circle of Maison Israël. Off-market opportunities, Israeli economy insights, exclusive events and the art of living — straight to your inbox.',
    pillarsTitle: 'What you receive',
    pillars: [
      { icon: '🏛', t: 'Real Estate', d: 'Off-market properties and opportunities before the market.' },
      { icon: '📈', t: 'Israeli Economy', d: 'Analysis, trends and signals to invest at the right time.' },
      { icon: '🥂', t: 'Exclusive Events', d: 'Private invitations in Tel Aviv, Jerusalem and Paris.' },
      { icon: '✦', t: 'Lifestyle & Luxury', d: 'Confidential addresses, art of living and culture in Israel.' },
    ],
    formTitle: 'Join The Circle',
  },
  he: {
    eyebrow: 'מעגל פרטי · בהזמנה',
    title: 'המעגל — ניוזלטר פרטי על נדל"ן יוקרה בישראל',
    sub: 'המעגל הפרטי של מייזון ישראל. הזדמנויות מחוץ לשוק, ניתוחי כלכלה ישראלית, אירועים בלעדיים ואורח חיים — ישירות לתיבת הדואר שלכם.',
    pillarsTitle: 'מה תקבלו',
    pillars: [
      { icon: '🏛', t: 'נדל"ן', d: 'נכסים מחוץ לשוק והזדמנויות לפני כולם.' },
      { icon: '📈', t: 'כלכלה ישראלית', d: 'ניתוחים, מגמות ואיתותים להשקעה בזמן הנכון.' },
      { icon: '🥂', t: 'אירועים בלעדיים', d: 'הזמנות פרטיות בתל אביב, ירושלים ופריז.' },
      { icon: '✦', t: 'לייפסטייל ויוקרה', d: 'כתובות חסויות, אורח חיים ותרבות בישראל.' },
    ],
    formTitle: 'הצטרפו למעגל',
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in COPY ? locale : 'fr') as keyof typeof COPY
  return {
    title: COPY[l].title,
    description: COPY[l].sub,
    alternates: {
      canonical: `https://luxuryisraelrealestate.com/${l}/club`,
      languages: {
        fr: 'https://luxuryisraelrealestate.com/fr/club',
        en: 'https://luxuryisraelrealestate.com/en/club',
        he: 'https://luxuryisraelrealestate.com/he/club',
        'x-default': 'https://luxuryisraelrealestate.com/fr/club',
      },
    },
  }
}

export default async function ClubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale in COPY ? locale : 'fr') as keyof typeof COPY
  const c = COPY[l]
  const isRTL = locale === 'he'

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '9rem 1.5rem 4rem', textAlign: 'center', overflow: 'hidden',
        backgroundImage: 'linear-gradient(rgba(10,10,11,0.72), rgba(10,10,11,0.86)), url(/hero/slide1.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ maxWidth: '760px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: isRTL ? '0' : '0.4em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.4rem' }}>
            {c.eyebrow}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 300, color: '#FAFAF9', lineHeight: 1.05, marginBottom: '1.4rem' }}>
            {c.title}
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.02rem', fontWeight: 300, color: 'rgba(212,213,216,0.85)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* Pillars + form */}
      <section style={{ background: '#0A0A0B', padding: '5rem 1.5rem' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,440px)', gap: '4rem', alignItems: 'start',
        }} className="club-grid">
          {/* Pillars */}
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.25em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '2rem' }}>
              {c.pillarsTitle}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
              {c.pillars.map(p => (
                <div key={p.t} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0, color: '#C8A96E' }}>{p.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#FAFAF9', marginBottom: '0.3rem' }}>{p.t}</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 300, color: '#8A8B91', lineHeight: 1.6 }}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#0E0F11', border: '1px solid rgba(200,169,110,0.2)', padding: '2.2rem' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', marginBottom: '1.6rem', textAlign: 'center' }}>
              {c.formTitle}
            </h2>
            <ClubForm locale={locale} />
          </div>
        </div>
      </section>

      <ClubPromise locale={locale} />

      <style>{`
        @media (max-width: 880px) {
          .club-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  )
}

function ClubPromise({ locale = 'fr' }: { locale?: string }) {
  const isRTL = locale === 'he'
  const C = {
    fr: {
      eyebrow: 'Notre engagement',
      title: 'Ce que Le Cercle promet — et ce qu’il ne fait pas',
      paras: [
        "Le Cercle n’est pas une newsletter promotionnelle. Nous n’envoyons rien d’automatisé, rien de générique, et jamais plus d’un email par semaine. Chaque communication est rédigée par un membre de notre équipe et signée nominativement.",
        "Vous y trouverez quatre types de contenu : les opportunités off-market que nous pouvons partager publiquement, les analyses chiffrées de notre Observatoire trimestriel, les invitations aux événements privés que nous organisons à Tel Aviv, Jérusalem et Paris, et les notes culturelles sur ce qui change en Israël et qui nous semble utile à connaître.",
        "Vos coordonnées ne sont jamais cédées ni partagées. Une désinscription en un clic est garantie à chaque envoi. Vous restez maître du calendrier.",
      ],
      stats: [
        { n: '1 200+', t: 'membres actifs' },
        { n: '< 1 / sem.', t: 'fréquence d’envoi' },
        { n: '47 %', t: 'taux d’ouverture moyen' },
      ],
    },
    en: {
      eyebrow: 'Our commitment',
      title: 'What The Circle promises — and what it does not',
      paras: [
        'The Circle is not a promotional newsletter. We send nothing automated, nothing generic, and never more than one email per week. Every communication is written by a member of our team and signed by name.',
        'You will find four types of content: off-market opportunities we can share publicly, the quantified analyses of our quarterly Observatory, invitations to the private events we organize in Tel Aviv, Jerusalem and Paris, and cultural notes on what is changing in Israel and worth knowing.',
        'Your contact information is never sold or shared. One-click unsubscribe is guaranteed in every email. You stay in control of the cadence.',
      ],
      stats: [
        { n: '1,200+', t: 'active members' },
        { n: '< 1 / week', t: 'sending frequency' },
        { n: '47%', t: 'average open rate' },
      ],
    },
    he: {
      eyebrow: 'ההתחייבות שלנו',
      title: 'מה המעגל מבטיח — ומה הוא לא עושה',
      paras: [
        'המעגל אינו ניוזלטר פרסומי. אנו לא שולחים דבר אוטומטי, דבר גנרי, ולעולם לא יותר ממייל אחד בשבוע. כל תקשורת נכתבת על ידי חבר בצוות שלנו וחתומה בשמו.',
        'תמצאו ארבעה סוגי תוכן: הזדמנויות מחוץ לשוק שאנו יכולים לשתף בציבור, ניתוחי המספרים של המצפה הרבעוני שלנו, הזמנות לאירועים פרטיים שאנו מארגנים בתל אביב, ירושלים ופריז, ופתקים תרבותיים על מה שמשתנה בישראל וכדאי לדעת.',
        'הפרטים שלכם לעולם אינם נמכרים או משותפים. ביטול הרשמה בקליק מובטח בכל מייל.',
      ],
      stats: [
        { n: '+1,200', t: 'חברים פעילים' },
        { n: '< 1 / שבוע', t: 'תדירות שליחה' },
        { n: '47%', t: 'שיעור פתיחה ממוצע' },
      ],
    },
  }
  const c = C[(locale as keyof typeof C)] ?? C.fr

  return (
    <section style={{ background: '#08080A', padding: '5rem clamp(1.5rem,5vw,3rem) 6rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem', textAlign: 'center' }}>{c.eyebrow}</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, color: '#FAFAF9', textAlign: 'center', marginBottom: '2.5rem', lineHeight: 1.25 }}>{c.title}</h2>
        {c.paras.map((p, i) => (
          <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,213,216,0.85)', lineHeight: 1.85, marginBottom: '1.2rem' }}>{p}</p>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem', borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: '2.5rem' }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', color: '#C8A96E', fontWeight: 300, marginBottom: '0.3rem' }}>{s.n}</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8B91' }}>{s.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
