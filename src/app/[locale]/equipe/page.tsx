import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const BASE_URL = 'https://immobilierenisrael.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Notre Équipe — Conseillers en Immobilier de Prestige | Maison Israël',
    description: "Les conseillers de Maison Israël — quinze ans d'expérience dans l'accompagnement des acheteurs internationaux en immobilier israélien.",
    tag: 'Équipe',
    h1: "L'équipe Maison Israël",
    subtitle: "Quinze ans d'expérience, trois langues, un seul objectif : aligner chaque acquisition sur l'horizon long de nos clients.",
  },
  en: {
    title: 'Our Team — Luxury Real Estate Advisors | Maison Israël',
    description: 'The Maison Israël advisors — fifteen years of experience supporting international buyers in Israeli real estate.',
    tag: 'Team',
    h1: 'The Maison Israël Team',
    subtitle: 'Fifteen years of experience, three languages, one objective: aligning each acquisition with our clients\' long horizon.',
  },
  he: {
    title: 'הצוות שלנו | מייזון ישראל',
    description: 'היועצים של מייזון ישראל — חמש עשרה שנים של ניסיון.',
    tag: 'צוות',
    h1: 'הצוות של מייזון ישראל',
    subtitle: 'חמש עשרה שנים של ניסיון, שלוש שפות, מטרה אחת.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/equipe`,
      languages: {
        fr: `${BASE_URL}/fr/equipe`,
        en: `${BASE_URL}/en/equipe`,
        he: `${BASE_URL}/he/equipe`,
        'x-default': `${BASE_URL}/fr/equipe`,
      },
    },
  }
}

const TEAM = [
  {
    slug: 'reouven-benchetrit',
    name: 'Réouven Benchetrit',
    role: { fr: 'Fondateur · Conseiller principal', en: 'Founder · Principal Advisor', he: 'מייסד · יועץ ראשי' },
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
    languages: ['Français', 'English', 'עברית'],
    bio: {
      fr: "Fondateur de Maison Israël en 2009. Spécialisé dans l'accompagnement des familles francophones en aliyah et en investissement, avec une concentration particulière sur Jérusalem (Talbieh, Colonie Allemande, Réhavia) et Herzliya Pituah. A coordonné plus de 200 acquisitions pour des clients internationaux. Basé à Tel Aviv.",
      en: "Founded Maison Israël in 2009. Specialised in supporting French-speaking families in aliyah and investment, with particular focus on Jerusalem (Talbiyeh, German Colony, Rehavia) and Herzliya Pituah. Has coordinated over 200 acquisitions for international clients. Based in Tel Aviv.",
      he: 'מייסד מייזון ישראל ב-2009.',
    },
    specialties: { fr: 'Aliyah · Familles · Jérusalem · Herzliya Pituah', en: 'Aliyah · Families · Jerusalem · Herzliya Pituah', he: 'עלייה · משפחות' },
  },
  {
    slug: 'sarah-cohen',
    name: 'Sarah Cohen',
    role: { fr: 'Conseillère senior · Tel Aviv', en: 'Senior Advisor · Tel Aviv', he: 'יועצת בכירה · תל אביב' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    languages: ['Français', 'English', 'עברית'],
    bio: {
      fr: "Spécialiste du marché Tel Aviv depuis 2014. Couvre Neve Tzedek, Rothschild, le Nord Ancien, et le segment des tours premium (Park Tzameret, Sarona, Meier). A développé une expertise particulière sur la restauration Bauhaus et l'arbitrage entre patrimonial et contemporain. Diplômée HEC Paris.",
      en: 'Tel Aviv market specialist since 2014. Covers Neve Tzedek, Rothschild, the Old North, and the premium tower segment (Park Tzameret, Sarona, Meier). Has developed particular expertise on Bauhaus restoration and the arbitrage between heritage and contemporary. HEC Paris graduate.',
      he: 'מומחית שוק תל אביב מאז 2014.',
    },
    specialties: { fr: 'Tel Aviv · Bauhaus · Tours premium · Investissement locatif', en: 'Tel Aviv · Bauhaus · Premium towers · Rental investment', he: 'תל אביב · באוהאוס' },
  },
  {
    slug: 'david-levi',
    name: 'David Levi',
    role: { fr: 'Conseiller senior · Ultra-prime côtier', en: 'Senior Advisor · Ultra-Prime Coastal', he: 'יועץ בכיר · אולטרה-פרימיום חוף' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    languages: ['Français', 'English', 'עברית', 'Español'],
    bio: {
      fr: "Couvre Herzliya Pituah et Césarée depuis 2011. Réseau établi avec les family offices israéliens et les acheteurs ultra-high-net-worth européens et latino-américains. Spécialisé dans les transactions off-market au-dessus de 10 millions de dollars. Background en finance d'entreprise (ex-Lazard).",
      en: 'Covers Herzliya Pituah and Caesarea since 2011. Established network with Israeli family offices and European and Latin American ultra-high-net-worth buyers. Specialised in off-market transactions above $10M. Corporate finance background (ex-Lazard).',
      he: 'מכסה את הרצליה פיתוח וקיסריה מאז 2011.',
    },
    specialties: { fr: 'Herzliya Pituah · Césarée · Off-market · UHNW', en: 'Herzliya Pituah · Caesarea · Off-market · UHNW', he: 'הרצליה פיתוח · קיסריה' },
  },
  {
    slug: 'rachel-meyer',
    name: 'Rachel Meyer',
    role: { fr: 'Conseillère · Jérusalem patrimoine', en: 'Advisor · Jerusalem Heritage', he: 'יועצת · ירושלים מורשת' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    languages: ['Français', 'English', 'עברית'],
    bio: {
      fr: "Spécialiste des maisons mandataires et templières de Jérusalem. Travaille étroitement avec les autorités patrimoniales et un réseau d'architectes spécialisés en restauration. Couvre Talbieh, Yemin Moshe, Colonie Allemande, Baka. Diplômée en histoire de l'art (Sorbonne).",
      en: "Specialist of Jerusalem Mandate and Templer houses. Works closely with heritage authorities and a network of restoration-specialised architects. Covers Talbiyeh, Yemin Moshe, German Colony, Baka. Art history degree (Sorbonne).",
      he: 'מומחית בבתי מנדט וטמפלרים בירושלים.',
    },
    specialties: { fr: 'Jérusalem patrimoine · Restauration · Maisons templières', en: 'Jerusalem heritage · Restoration · Templer houses', he: 'ירושלים מורשת · שיחזור' },
  },
]

export default async function EquipePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Organization + Person JSON-LD for EEAT
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Maison Israël',
    url: BASE_URL,
    employee: TEAM.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role[l],
      image: member.image,
      knowsLanguage: member.languages,
      description: member.bio[l],
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div style={{ paddingTop: '80px' }} />

      {/* Hero */}
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.1 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section style={{ padding: '5rem 2rem 6rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {TEAM.map((m) => (
            <div key={m.slug} style={{ background: '#0F1012', padding: '2.5rem', borderTop: '2px solid #C8A96E' }}>
              <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.5rem', background: '#1A1A1C' }}>
                <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.55rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.3rem' }}>
                {m.name}
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#C8A96E', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", marginBottom: '1.2rem' }}>
                {m.role[l]}
              </p>
              <p style={{ color: '#D4D5D8', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.4rem' }}>
                {m.bio[l]}
              </p>
              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(200,169,110,0.12)' }}>
                <div style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {l === 'he' ? 'התמחויות' : l === 'en' ? 'Specialties' : 'Spécialités'}
                </div>
                <div style={{ color: '#8A8B91', fontSize: '0.82rem', marginBottom: '0.8rem' }}>
                  {m.specialties[l]}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {l === 'he' ? 'שפות' : l === 'en' ? 'Languages' : 'Langues'}
                </div>
                <div style={{ color: '#8A8B91', fontSize: '0.82rem' }}>
                  {m.languages.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0B', marginBottom: '0.8rem', fontWeight: 400 }}>
          {l === 'he' ? 'איזה יועץ הכי מתאים לבריף שלך?' : l === 'en' ? 'Which advisor fits your brief?' : 'Quel conseiller correspond à votre brief ?'}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.75)', maxWidth: '520px', margin: '0 auto 1.8rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
          {l === 'he' ? 'נכוון אתכם לאדם הנכון בצוות שלנו.' : l === 'en' ? 'We will direct you to the right person on our team.' : 'Nous vous orientons vers la bonne personne de notre équipe.'}
        </p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 2.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {l === 'he' ? 'צרו קשר' : l === 'en' ? 'Contact us' : 'Nous contacter'}
        </Link>
      </section>
    </>
  )
}
