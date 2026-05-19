import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const s = messages.services
  const isRTL = locale === 'he'

  const services = [
    {
      icon: '⌂',
      title: locale === 'he' ? 'רכישת נדל"ן' : locale === 'en' ? 'Property Purchase' : 'Achat immobilier',
      desc: locale === 'he'
        ? 'ליווי מלא מחיפוש ועד חתימה, בחירה מותאמת לצרכים שלך.'
        : locale === 'en'
        ? 'Full support from search to signing, tailored to your needs.'
        : "Accompagnement de A à Z, de la recherche à la signature, sur mesure.",
      bullets: locale === 'he'
        ? ['חיפוש נכסים מותאם אישית', 'ליווי במשא ומתן', 'בדיקות משפטיות ומשכנתאות', 'ייעוץ לאחר המכירה']
        : locale === 'en'
        ? ['Personalised property search', 'Negotiation support', 'Legal and mortgage checks', 'Post-sale advice']
        : ['Recherche sur mesure de biens', 'Accompagnement à la négociation', 'Vérifications juridiques et financières', 'Conseil post-acquisition'],
    },
    {
      icon: '◈',
      title: locale === 'he' ? 'השקעות נדל"ן' : locale === 'en' ? 'Property Investment' : 'Investissement locatif',
      desc: locale === 'he'
        ? 'ניתוח תשואה, ניהול שכירות ואופטימיזציה פיסקלית.'
        : locale === 'en'
        ? 'Yield analysis, rental management and fiscal optimisation.'
        : "Analyse ROI, gestion locative complète, optimisation fiscale.",
      bullets: locale === 'he'
        ? ['ניתוח תשואה ו-ROI', 'ניהול נכסים להשכרה', 'ייעוץ פיסקלי ומיסוי', 'מעקב שוטף ודיווחים']
        : locale === 'en'
        ? ['Yield and ROI analysis', 'Rental property management', 'Tax and fiscal advice', 'Ongoing monitoring and reports']
        : ['Analyse rendement et ROI', 'Gestion locative complète', 'Conseil fiscal et imposition', 'Suivi régulier et rapports'],
    },
    {
      icon: '✈',
      title: locale === 'he' ? 'עלייה לישראל' : locale === 'en' ? 'Aliyah Support' : 'Aliyah',
      desc: locale === 'he'
        ? 'ליווי מלא לקליטה בישראל וסיוע ממשלתי.'
        : locale === 'en'
        ? 'Full support for settling in Israel and government aid guidance.'
        : "Accompagnement installation en Israël, aides gouvernementales.",
      bullets: locale === 'he'
        ? ['הכנה לפני העלייה', 'זכויות ממשלתיות ומענקים', 'רכישת דירה ראשונה', 'הכרת הסביבה החדשה']
        : locale === 'en'
        ? ['Pre-aliyah preparation', 'Government entitlements and grants', 'First property purchase', 'Local orientation']
        : ['Préparation avant aliyah', 'Droits gouvernementaux et aides', 'Achat première propriété', 'Orientation locale'],
    },
    {
      icon: '◆',
      title: locale === 'he' ? 'ניהול עושר' : locale === 'en' ? 'Wealth Management' : 'Gestion de patrimoine',
      desc: locale === 'he'
        ? 'ייעוץ, אופטימיזציה פיסקלית והעברה בין-דורית.'
        : locale === 'en'
        ? 'Advisory, fiscal optimisation and intergenerational transfer.'
        : "Conseil, optimisation fiscale, transmission intergénérationnelle.",
      bullets: locale === 'he'
        ? ['אסטרטגיית פורטפוליו', 'אופטימיזציה פיסקלית', 'תכנון העברת נכסים', 'ניטור שוטף']
        : locale === 'en'
        ? ['Portfolio strategy', 'Fiscal optimisation', 'Asset transfer planning', 'Ongoing monitoring']
        : ['Stratégie de portefeuille', 'Optimisation fiscale', 'Planification de transmission', 'Suivi continu'],
    },
  ]

  const steps = [
    {
      num: '01',
      title: locale === 'he' ? 'ייעוץ ראשוני' : locale === 'en' ? 'Initial consultation' : 'Consultation initiale',
      desc: locale === 'he' ? 'הבנת הצרכים, המטרות ותקציב הפרויקט שלך.' : locale === 'en' ? 'Understanding your needs, goals and project budget.' : 'Compréhension de vos besoins, objectifs et budget.',
    },
    {
      num: '02',
      title: locale === 'he' ? 'אסטרטגיה מותאמת' : locale === 'en' ? 'Tailored strategy' : 'Stratégie sur mesure',
      desc: locale === 'he' ? 'בניית תוכנית פעולה מותאמת אישית לפרופיל שלך.' : locale === 'en' ? 'Building a personalised action plan for your profile.' : 'Élaboration d\'un plan d\'action personnalisé selon votre profil.',
    },
    {
      num: '03',
      title: locale === 'he' ? 'בחירת נכסים' : locale === 'en' ? 'Property selection' : 'Sélection des biens',
      desc: locale === 'he' ? 'מצגת נכסים מוכנים מראש ותואמים לקריטריונים שלך.' : locale === 'en' ? 'Presentation of pre-selected properties matching your criteria.' : 'Présentation de biens présélectionnés correspondant à vos critères.',
    },
    {
      num: '04',
      title: locale === 'he' ? 'ניהול המשא ומתן' : locale === 'en' ? 'Negotiation management' : 'Gestion de la négociation',
      desc: locale === 'he' ? 'ייצוג ניסיוני מטעמך לקבלת המחיר הטוב ביותר.' : locale === 'en' ? 'Expert representation on your behalf to secure the best price.' : 'Représentation experte pour obtenir les meilleures conditions.',
    },
    {
      num: '05',
      title: locale === 'he' ? 'סגירה ומעקב' : locale === 'en' ? 'Closing & follow-up' : 'Finalisation & suivi',
      desc: locale === 'he' ? 'ליווי בחתימה, רישום ושירות לאחר המכירה.' : locale === 'en' ? 'Support at signing, registration and ongoing after-sale service.' : 'Accompagnement à la signature, enregistrement et service après-vente.',
    },
  ]

  const testimonials = [
    {
      quote: locale === 'he'
        ? '"הצוות של מייזון ישראל הפך את חלום הדירה בתל אביב למציאות. מקצועיות ואמינות ברמה הגבוהה ביותר."'
        : locale === 'en'
        ? '"The Maison Israël team turned our dream of a Tel Aviv apartment into reality. Professionalism and reliability at the highest level."'
        : '"L\'équipe de Maison Israël a transformé notre rêve d\'appartement à Tel Aviv en réalité. Professionnalisme et fiabilité au plus haut niveau."',
      author: 'Marc & Isabelle D.',
      location: locale === 'he' ? 'פריז → תל אביב' : locale === 'en' ? 'Paris → Tel Aviv' : 'Paris → Tel Aviv',
    },
    {
      quote: locale === 'he'
        ? '"ההשקעה שלי בהרצליה פיתוח הניבה תשואה של 5.2% בשנה הראשונה. ממליץ בחום."'
        : locale === 'en'
        ? '"My investment in Herzliya Pituah yielded a 5.2% return in the first year. Highly recommended."'
        : '"Mon investissement à Herzliya Pituah a généré 5,2% de rendement la première année. Je recommande vivement."',
      author: 'Jean-Pierre L.',
      location: locale === 'he' ? 'ליון → הרצליה פיתוח' : locale === 'en' ? 'Lyon → Herzliya Pituah' : 'Lyon → Herzliya Pituah',
    },
    {
      quote: locale === 'he'
        ? '"תהליך העלייה שלנו היה חלק בהרבה הודות לתמיכה המלאה של מייזון ישראל בכל שלב."'
        : locale === 'en'
        ? '"Our aliyah process was so much smoother thanks to Maison Israël\'s full support at every step."'
        : '"Notre processus d\'aliyah a été tellement plus serein grâce à l\'accompagnement de Maison Israël à chaque étape."',
      author: 'Sophie & David K.',
      location: locale === 'he' ? 'בריסל → ירושלים' : locale === 'en' ? 'Brussels → Jerusalem' : 'Bruxelles → Jérusalem',
    },
  ]

  return (
    <>
      {/* HERO */}
      <div style={{
        paddingTop: '120px',
        background: '#0A0A0B',
        paddingBottom: '5rem',
        textAlign: 'center',
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12,
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
            {s.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 300, marginBottom: '1rem' }}>
            {s.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '550px', margin: '0 auto' }}>{s.subtitle}</p>
        </div>
      </div>

      {/* SERVICE CARDS */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
            {services.map((svc) => (
              <div key={svc.title} style={{ background: '#141416', borderTop: '3px solid #C8A96E', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#C8A96E', marginBottom: '1.2rem' }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#fff', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {svc.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{svc.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {svc.bullets.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      <span style={{ color: '#C8A96E', flexShrink: 0, marginTop: '0.1rem' }}>✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: '6rem 2rem', background: '#111214', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {s.process_title}
            </p>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '56px', height: '56px', border: '1px solid #C8A96E',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C8A96E',
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.4rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ color: '#8A8B91', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t) => (
              <div key={t.author} style={{ background: '#141416', padding: '2rem', borderBottom: '2px solid #C8A96E' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  {t.quote}
                </p>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>{t.author}</div>
                  <div style={{ fontSize: '0.75rem', color: '#C8A96E', marginTop: '0.2rem' }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service deep-dives */}
      <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              {locale === 'he' ? 'מבט מעמיק' : locale === 'en' ? 'Deep Dives' : 'Approfondir'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.8rem' }}>
              {locale === 'he' ? 'השירותים שלנו בפירוט' : locale === 'en' ? 'Our Services in Detail' : 'Nos services en détail'}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { slug: 'recherche-personnalisee', titleFr: 'Recherche Personnalisée', titleEn: 'Private Search', titleHe: 'חיפוש פרטי', descFr: 'Un brief, un conseiller, un accès off-market.', descEn: 'A brief, an advisor, off-market access.', descHe: 'בריף, יועץ, גישה.' },
              { slug: 'off-market', titleFr: 'Accès Off-Market', titleEn: 'Off-Market Access', titleHe: 'גישה למחוץ-לשוק', descFr: '35–50 % des transactions premium sont invisibles.', descEn: '35–50% of premium transactions are invisible.', descHe: '35%–50% מהעסקאות בלתי נראות.' },
              { slug: 'estimation', titleFr: 'Estimation & Valorisation', titleEn: 'Valuation', titleHe: 'הערכה', descFr: 'Vente, succession, refinancement, achat.', descEn: 'Sale, estate, refinancing, purchase.', descHe: 'מכירה, ירושה, מימון.' },
              { slug: 'conseil-investissement', titleFr: 'Conseil en Investissement', titleEn: 'Investment Advisory', titleHe: 'ייעוץ השקעות', descFr: "L'immobilier israélien comme classe d'actif.", descEn: 'Israeli real estate as an asset class.', descHe: 'נדל"ן ישראלי כסוג נכס.' },
            ].map((s) => (
              <Link key={s.slug} href={`/${locale}/services/${s.slug}`} style={{ textDecoration: 'none', background: '#141416', padding: '2rem', display: 'block', borderBottom: '2px solid #C8A96E', transition: 'transform 0.3s' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.6rem' }}>
                  {locale === 'he' ? s.titleHe : locale === 'en' ? s.titleEn : s.titleFr}
                </h3>
                <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {locale === 'he' ? s.descHe : locale === 'en' ? s.descEn : s.descFr}
                </p>
                <span style={{ color: '#C8A96E', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                  {locale === 'he' ? 'גלה ←' : locale === 'en' ? 'Discover →' : 'Découvrir →'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0A0A0B', marginBottom: '1rem', fontWeight: 400 }}>
          {messages.cta_band.title}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.7)', maxWidth: '500px', margin: '0 auto 2rem' }}>{messages.cta_band.subtitle}</p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 3rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {messages.cta_band.button}
        </Link>
      </section>
    </>
  )
}
