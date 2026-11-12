import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const ABOUT_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'À Propos — Notre histoire depuis 2009',
    description: "Maison Israël accompagne les acheteurs internationaux dans l'acquisition d'immobilier de prestige en Israël depuis 2009. Notre histoire, notre méthode, notre engagement.",
  },
  en: {
    title: 'About — Our story since 2009',
    description: 'Maison Israël has supported international buyers in luxury Israeli real estate since 2009. Our story, method, and commitment.',
  },
  he: {
    title: 'אודות — מייזון ישראל מאז 2009',
    description: 'מייזון ישראל מלווה קונים בינלאומיים בנדל"ן יוקרה ישראלי מאז 2009.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = ABOUT_META[(locale as Locale) || 'fr'] ?? ABOUT_META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        fr: `${BASE_URL}/fr/about`,
        en: `${BASE_URL}/en/about`,
        he: `${BASE_URL}/he/about`,
        'x-default': `${BASE_URL}/fr/about`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'Maison Israël',
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const m = messages
  const a = messages.about
  const isRTL = locale === 'he'

  // Équipe alignée avec la page /equipe (source canonique)
  const team = [
    {
      name: 'Réouven Benchetrit',
      role: locale === 'he' ? 'מייסד · יועץ ראשי' : locale === 'en' ? 'Founder · Principal Advisor' : 'Fondateur · Conseiller principal',
      bio: locale === 'he'
        ? 'מייסד מייזון ישראל ב-2009. מומחה בליווי משפחות דוברות צרפתית בעלייה ובהשקעה, עם דגש על ירושלים והרצליה פיתוח. רכז של למעלה מ-200 רכישות עבור לקוחות בינלאומיים.'
        : locale === 'en'
        ? 'Founded Maison Israël in 2009. Specialised in supporting French-speaking families in Aliyah and investment, with focus on Jerusalem (Talbiyeh, German Colony, Rehavia) and Herzliya Pituah. Over 200 acquisitions coordinated for international clients.'
        : "Fondateur de Maison Israël en 2009. Spécialisé dans l'accompagnement des familles francophones en Aliyah et investissement, avec une concentration sur Jérusalem (Talbieh, Colonie Allemande, Réhavia) et Herzliya Pituah. Plus de 200 acquisitions coordonnées pour des clients internationaux.",
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah Cohen',
      role: locale === 'he' ? 'יועצת בכירה · תל אביב' : locale === 'en' ? 'Senior Advisor · Tel Aviv' : 'Conseillère senior · Tel Aviv',
      bio: locale === 'he'
        ? 'מומחית שוק תל אביב מאז 2014. מכסה את נווה צדק, רוטשילד, הצפון הישן והמגדלים הפרימיום (פארק צמרת, סרונה, מאייר). מומחיות מיוחדת בשיחזור באוהאוס.'
        : locale === 'en'
        ? 'Tel Aviv market specialist since 2014. Covers Neve Tzedek, Rothschild, the Old North, and the premium tower segment (Park Tzameret, Sarona, Meier). Particular expertise on Bauhaus restoration. HEC Paris graduate.'
        : "Spécialiste du marché Tel Aviv depuis 2014. Couvre Neve Tzedek, Rothschild, le Nord Ancien, et le segment des tours premium (Park Tzameret, Sarona, Meier). Expertise particulière sur la restauration Bauhaus. Diplômée HEC Paris.",
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'David Levi',
      role: locale === 'he' ? 'יועץ בכיר · אולטרה-פרימיום חוף' : locale === 'en' ? 'Senior Advisor · Ultra-Prime Coastal' : 'Conseiller senior · Ultra-prime côtier',
      bio: locale === 'he'
        ? 'מכסה את הרצליה פיתוח וקיסריה מאז 2011. רשת מבוססת עם family offices ישראליים וקונים UHNW מאירופה ומאמריקה הלטינית. מומחה בעסקאות מחוץ לשוק מעל 10 מיליון דולר.'
        : locale === 'en'
        ? 'Covers Herzliya Pituah and Caesarea since 2011. Established network with Israeli family offices and European and Latin American UHNW buyers. Specialised in off-market transactions above $10M. Corporate finance background (ex-Lazard).'
        : "Couvre Herzliya Pituah et Césarée depuis 2011. Réseau établi avec les family offices israéliens et les acheteurs UHNW européens et latino-américains. Spécialisé dans les transactions off-market au-dessus de 10 M$. Background en finance d'entreprise (ex-Lazard).",
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  ]

  const values = [
    {
      icon: '✦',
      title: locale === 'he' ? 'מומחיות' : locale === 'en' ? 'Expertise' : 'Expertise',
      desc: locale === 'he'
        ? 'למעלה מ-15 שנה של ידע עמוק בשוק הנדל"ן הישראלי, בשלושת הערים המובילות.'
        : locale === 'en'
        ? 'Over 15 years of deep knowledge of the Israeli real estate market across three key cities.'
        : "Plus de 15 ans de connaissance approfondie du marché immobilier israélien, dans trois villes clés.",
    },
    {
      icon: '✦',
      title: locale === 'he' ? 'אמון' : locale === 'en' ? 'Trust' : 'Confiance',
      desc: locale === 'he'
        ? 'שקיפות מלאה, סודיות מוחלטת ויחס אישי בכל שלב של הפרויקט שלך.'
        : locale === 'en'
        ? 'Full transparency, absolute confidentiality and personal attention at every stage of your project.'
        : "Transparence totale, confidentialité absolue et attention personnelle à chaque étape de votre projet.",
    },
    {
      icon: '✦',
      title: locale === 'he' ? 'מצוינות' : locale === 'en' ? 'Excellence' : 'Excellence',
      desc: locale === 'he'
        ? 'סטנדרטים גבוהים בכל עסקה, עם שיעור שביעות רצון לקוחות של 98%.'
        : locale === 'en'
        ? 'Uncompromising standards in every transaction, with a 98% client satisfaction rate.'
        : "Des standards irréprochables dans chaque transaction, avec un taux de satisfaction de 98%.",
    },
  ]

  const timeline = [
    {
      year: '2009',
      event: locale === 'he' ? 'ייסוד מייזון ישראל בתל אביב' : locale === 'en' ? 'Maison Israël founded in Tel Aviv' : 'Fondation de Maison Israël à Tel Aviv',
    },
    {
      year: '2012',
      event: locale === 'he' ? 'הרחבה לשוק ירושלים' : locale === 'en' ? 'Expansion into the Jerusalem market' : 'Expansion sur le marché de Jérusalem',
    },
    {
      year: '2016',
      event: locale === 'he' ? 'פתיחת משרד הרצליה פיתוח' : locale === 'en' ? 'Opening of Herzliya Pituah office' : "Ouverture du bureau à Herzliya Pituah",
    },
    {
      year: '2020',
      event: locale === 'he' ? 'השקת פלטפורמה דיגיטלית' : locale === 'en' ? 'Launch of digital platform' : 'Lancement de la plateforme digitale',
    },
    {
      year: '2024',
      event: locale === 'he' ? 'מעל 350 עסקאות מוצלחות' : locale === 'en' ? 'Over 350 successful transactions' : 'Plus de 350 transactions réalisées',
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12,
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
            {a.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 300, marginBottom: '1rem' }}>
            {a.title}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
        </div>
      </div>

      {/* HISTORY */}
      <section style={{ padding: '6rem 2rem', background: '#111214', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
              {a.history_tag}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              {a.history_title}
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#C8A96E', marginBottom: '1.5rem' }} />
            <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1rem' }}>
              {locale === 'he'
                ? 'מייזון ישראל נוסדה בשנת 2009 על ידי דויד כהן, מתוך תצפית פשוטה: השוק הישראלי המשגשג היה אז סגור-למחצה למשפחות הדיאספורה דוברות הצרפתית, שנעו בין סוכנויות מקומיות ללא ליווי, ויועצים פריזאיים ללא היכרות עם השטח.'
                : locale === 'en'
                ? "Maison Israël was founded in 2009 by David Cohen, born from a simple observation: Israel's booming market was, at the time, half-closed to French-speaking diaspora families, caught between local agencies without follow-up and Parisian advisors without field knowledge."
                : "Maison Israël est née en 2009, fondée par David Cohen, d'un constat simple : le marché israélien en pleine effervescence restait, à l'époque, à demi-fermé aux familles francophones de la diaspora — coincées entre des agences locales sans accompagnement et des conseillers parisiens sans connaissance du terrain."}
            </p>
            <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1rem' }}>
              {locale === 'he'
                ? 'במשך חמש-עשרה שנה, בנינו מודל אחר: מספר מצומצם של לקוחות, יועץ ייעודי לכל פרויקט, גישה ישירה לעסקאות מחוץ לשוק שמעולם לא הופיעו בפורטלים. בית פרטי במקום פלטפורמה.'
                : locale === 'en'
                ? 'For fifteen years, we have built a different model: a small number of clients, a dedicated advisor for every project, and direct access to off-market opportunities that never reach the portals. A private house, not a platform.'
                : "Pendant quinze ans, nous avons construit un modèle différent : un nombre restreint de clients, un conseiller dédié pour chaque projet, et un accès direct à des opportunités off-market qui ne paraissent jamais sur les portails. Une maison privée, pas une plateforme."}
            </p>
            <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1rem' }}>
              {locale === 'he'
                ? 'התל אביב של 2009 לא הייתה התל אביב של היום. אז יזמנו ברוטשילד עת שכונות הבאוהאוס עוד לא הוכרזו על ידי אונסק"ו. ראינו את ירושלים נפתחת ליוקרה. ליווינו את הפיכת קיסריה למובלעת בלעדית. הניסיון הזה — ראיית גלים לפני שהם מגיעים — נשאר הערך הראשון שאנו מציעים.'
                : locale === 'en'
                ? 'The Tel Aviv of 2009 was not the Tel Aviv of today. Back then, we were already active on Rothschild when the Bauhaus quarters had not yet been UNESCO-listed. We saw Jerusalem open up to luxury. We accompanied Caesarea’s transformation into an exclusive enclave. That experience — seeing waves before they arrive — remains the first value we offer.'
                : "Le Tel Aviv de 2009 n'était pas celui d'aujourd'hui. À l'époque, nous étions déjà actifs sur Rothschild quand les quartiers Bauhaus n'avaient pas encore été classés UNESCO. Nous avons vu Jérusalem s'ouvrir au luxe. Nous avons accompagné la transformation de Césarée en enclave exclusive. Cette expérience — voir les vagues avant qu'elles n'arrivent — reste la première valeur que nous offrons."}
            </p>
            <p style={{ color: '#8A8B91', lineHeight: 1.9 }}>
              {locale === 'he'
                ? 'כיום, מייזון ישראל מלווה משפחות, משקיעים, עולים חדשים ודיפלומטים — לרוב לאורך מספר עסקאות, מספר עשורים, מספר דורות.'
                : locale === 'en'
                ? 'Today, Maison Israël supports families, investors, new immigrants and diplomats — often across several transactions, several decades, several generations.'
                : "Aujourd'hui, Maison Israël accompagne des familles, des investisseurs, des Olim Hadashim et des diplomates — souvent sur plusieurs transactions, plusieurs décennies, plusieurs générations."}
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
              alt="Maison Israël bureau"
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: '-1.5rem', [isRTL ? 'left' : 'right']: '-1.5rem',
              background: '#C8A96E', padding: '2rem',
              fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: '#0A0A0B',
              lineHeight: 1, fontWeight: 300,
            }}>
              15+<br />
              <span style={{ fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
                {m.stats.years}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {a.team_tag}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1rem' }}>
              {a.team_title}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem', overflow: 'hidden' }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.6) 0%, transparent 50%)' }} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.3rem' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
                  {member.role}
                </p>
                <p style={{ color: '#8A8B91', lineHeight: 1.7, maxWidth: '300px', margin: '0 auto' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href={`/${locale}/equipe`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E',
              padding: '0.85rem 2rem', textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
              letterSpacing: '0.18em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 500,
              transition: 'all 0.3s',
            }}>
              {locale === 'he' ? 'הכירו את כל הצוות ←' : locale === 'en' ? 'Meet the full team →' : "Voir l'équipe complète →"}
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {a.values_tag}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem' }}>
              {a.values_title}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {values.map((v) => (
              <div key={v.title} style={{ background: '#141416', padding: '2.5rem', borderTop: '2px solid #C8A96E' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#C8A96E', marginBottom: '1rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#fff', fontWeight: 400, marginBottom: '1rem' }}>
                  {v.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '6rem 2rem', background: '#111214', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {a.timeline_tag}
            </p>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', [isRTL ? 'right' : 'left']: '79px', top: 0, bottom: 0, width: '1px', background: '#C8A96E', opacity: 0.3 }} />
            {timeline.map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: i < timeline.length - 1 ? '2.5rem' : 0 }}>
                <div style={{ minWidth: '80px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#C8A96E', fontWeight: 400 }}>
                    {item.year}
                  </div>
                </div>
                <div style={{ flex: 1, paddingTop: '0.3rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8A96E', marginBottom: '0.5rem', marginTop: '0.2rem' }} />
                  <p style={{ color: '#8A8B91', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#0A0A0B', padding: '3rem 2rem', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }} className="grid-stats">
          {[['15+', m.stats.years], ['350+', m.stats.transactions], ['98%', m.stats.satisfaction], ['4', m.stats.offices]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: '#C8A96E', fontWeight: 300 }}>{num}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0A0A0B', marginBottom: '1rem', fontWeight: 400 }}>
          {a.cta_title}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.7)', maxWidth: '500px', margin: '0 auto 2rem' }}>{a.cta_sub}</p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 3rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {a.cta_btn}
        </Link>
      </section>
    </>
  )
}
