import type { Metadata } from 'next'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const COPY = {
  fr: {
    title: 'Mentions légales',
    metaTitle: 'Mentions légales',
    updated: 'Dernière mise à jour : mai 2026',
    sections: [
      { h: 'Éditeur du site', p: 'Le présent site luxuryisraelrealestate.com est édité par Maison Israël, agence de conseil en immobilier de prestige opérant en Israël. Pour toute question, contactez-nous via la page Contact du site.' },
      { h: 'Directeur de la publication', p: 'Le directeur de la publication est le représentant légal de Maison Israël.' },
      { h: 'Hébergement', p: 'Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.' },
      { h: 'Propriété intellectuelle', p: 'L’ensemble des contenus présents sur ce site (textes, photographies, logos, éléments graphiques) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.' },
      { h: 'Responsabilité', p: 'Les informations diffusées sur ce site sont fournies à titre indicatif. Les caractéristiques et prix des biens présentés sont susceptibles d’évoluer et ne constituent pas une offre contractuelle. Maison Israël ne saurait être tenue responsable d’éventuelles erreurs ou omissions.' },
      { h: 'Liens externes', p: 'Ce site peut contenir des liens vers des sites tiers. Maison Israël n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.' },
      { h: 'Droit applicable', p: 'Les présentes mentions légales sont régies par le droit applicable en Israël. Tout litige relève de la compétence des tribunaux compétents.' },
    ],
  },
  en: {
    title: 'Legal Notice',
    metaTitle: 'Legal Notice',
    updated: 'Last updated: May 2026',
    sections: [
      { h: 'Site Publisher', p: 'This website luxuryisraelrealestate.com is published by Maison Israël, a luxury real estate advisory firm operating in Israel. For any question, please reach us via the Contact page.' },
      { h: 'Publication Director', p: 'The publication director is the legal representative of Maison Israël.' },
      { h: 'Hosting', p: 'The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States.' },
      { h: 'Intellectual Property', p: 'All content on this site (texts, photographs, logos, graphic elements) is protected by intellectual property law. Any reproduction, representation or distribution, in whole or in part, without prior written authorization is prohibited.' },
      { h: 'Liability', p: 'Information on this site is provided for guidance only. The characteristics and prices of the properties shown may change and do not constitute a contractual offer. Maison Israël cannot be held liable for any errors or omissions.' },
      { h: 'External Links', p: 'This site may contain links to third-party websites. Maison Israël has no control over these sites and disclaims any responsibility for their content.' },
      { h: 'Applicable Law', p: 'This legal notice is governed by the law applicable in Israel. Any dispute falls under the jurisdiction of the competent courts.' },
    ],
  },
  he: {
    title: 'הצהרה משפטית',
    metaTitle: 'הצהרה משפטית',
    updated: 'עודכן לאחרונה: מאי 2026',
    sections: [
      { h: 'מפעיל האתר', p: 'אתר זה luxuryisraelrealestate.com מופעל על ידי מייזון ישראל, חברת ייעוץ נדל"ן יוקרה הפועלת בישראל. לכל שאלה, ניתן לפנות אלינו דרך עמוד יצירת הקשר.' },
      { h: 'אחראי הפרסום', p: 'אחראי הפרסום הוא הנציג המשפטי של מייזון ישראל.' },
      { h: 'אחסון', p: 'האתר מאוחסן על ידי Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, ארצות הברית.' },
      { h: 'קניין רוחני', p: 'כל התכנים באתר זה (טקסטים, תצלומים, לוגואים, אלמנטים גרפיים) מוגנים בזכויות קניין רוחני. כל שכפול, הצגה או הפצה, מלאה או חלקית, ללא אישור בכתב מראש — אסורים.' },
      { h: 'אחריות', p: 'המידע באתר זה ניתן למטרות הכוונה בלבד. מאפייני הנכסים והמחירים עשויים להשתנות ואינם מהווים הצעה חוזית. מייזון ישראל אינה אחראית לטעויות או השמטות.' },
      { h: 'קישורים חיצוניים', p: 'אתר זה עשוי לכלול קישורים לאתרי צד שלישי. למייזון ישראל אין שליטה על אתרים אלו והיא אינה אחראית לתוכנם.' },
      { h: 'דין חל', p: 'הצהרה משפטית זו כפופה לדין החל בישראל. כל מחלוקת נתונה לסמכות בתי המשפט המוסמכים.' },
    ],
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in COPY ? locale : 'fr') as keyof typeof COPY
  return {
    title: COPY[l].metaTitle,
    description: COPY[l].title,
    alternates: { canonical: `${BASE_URL}/${l}/mentions-legales` },
    robots: { index: false, follow: true },
  }
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = (locale in COPY ? locale : 'fr') as keyof typeof COPY
  const c = COPY[l]
  const isRTL = locale === 'he'

  return (
    <div style={{ background: '#0A0A0B', minHeight: '100vh', padding: '9rem 1.5rem 5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <article style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem,6vw,3.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.6rem' }}>
          {c.title}
        </h1>
        <p style={{ fontSize: '0.78rem', color: '#8A8B91', marginBottom: '3rem' }}>{c.updated}</p>

        {c.sections.map(s => (
          <section key={s.h} style={{ marginBottom: '2.2rem' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C8A96E', marginBottom: '0.7rem' }}>{s.h}</h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,213,216,0.85)', lineHeight: 1.75 }}>{s.p}</p>
          </section>
        ))}
      </article>
    </div>
  )
}
