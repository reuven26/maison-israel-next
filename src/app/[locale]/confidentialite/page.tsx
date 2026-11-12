import type { Metadata } from 'next'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const COPY = {
  fr: {
    title: 'Politique de confidentialité',
    metaTitle: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : mai 2026',
    sections: [
      { h: 'Responsable du traitement', p: 'Maison Israël est responsable du traitement des données personnelles collectées sur luxuryisraelrealestate.com. Pour toute demande relative à vos données, contactez-nous via la page Contact.' },
      { h: 'Données collectées', p: 'Nous collectons les données que vous nous transmettez volontairement via nos formulaires : nom, adresse e-mail, numéro de téléphone, et les informations relatives à votre projet immobilier. Aucune donnée sensible n’est demandée.' },
      { h: 'Finalité du traitement', p: 'Vos données sont utilisées uniquement pour répondre à vos demandes, vous accompagner dans votre projet immobilier et, si vous y avez consenti, vous adresser nos communications (newsletter Le Cercle). Vos données ne sont jamais revendues à des tiers.' },
      { h: 'Base légale', p: 'Le traitement repose sur votre consentement et sur l’intérêt légitime de Maison Israël à répondre à vos demandes.' },
      { h: 'Durée de conservation', p: 'Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées conformément aux durées légales applicables. Les abonnés à la newsletter peuvent se désinscrire à tout moment.' },
      { h: 'Vos droits', p: 'Conformément à la réglementation applicable (notamment le RGPD pour les résidents de l’UE), vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition au traitement de vos données. Pour exercer ces droits, contactez-nous via la page Contact.' },
      { h: 'Cookies', p: 'Ce site utilise un nombre limité de cookies nécessaires à son bon fonctionnement et, le cas échéant, à la mesure d’audience. Vous pouvez configurer votre navigateur pour refuser les cookies.' },
      { h: 'Sécurité', p: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé.' },
    ],
  },
  en: {
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      { h: 'Data Controller', p: 'Maison Israël is responsible for processing the personal data collected on luxuryisraelrealestate.com. For any request regarding your data, contact us via the Contact page.' },
      { h: 'Data Collected', p: 'We collect the data you voluntarily provide through our forms: name, email address, phone number, and information about your real estate project. No sensitive data is requested.' },
      { h: 'Purpose of Processing', p: 'Your data is used only to respond to your requests, support your real estate project and, if you have consented, send you our communications (The Circle newsletter). Your data is never sold to third parties.' },
      { h: 'Legal Basis', p: 'Processing is based on your consent and on the legitimate interest of Maison Israël in responding to your requests.' },
      { h: 'Retention Period', p: 'Your data is kept for as long as necessary to process your request, then archived in accordance with applicable legal periods. Newsletter subscribers may unsubscribe at any time.' },
      { h: 'Your Rights', p: 'In accordance with applicable regulations (including the GDPR for EU residents), you have the right to access, rectify, erase, restrict and object to the processing of your data. To exercise these rights, contact us via the Contact page.' },
      { h: 'Cookies', p: 'This site uses a limited number of cookies necessary for its proper functioning and, where applicable, for audience measurement. You can configure your browser to refuse cookies.' },
      { h: 'Security', p: 'We implement appropriate technical and organizational measures to protect your data against unauthorized access.' },
    ],
  },
  he: {
    title: 'מדיניות פרטיות',
    metaTitle: 'מדיניות פרטיות',
    updated: 'עודכן לאחרונה: מאי 2026',
    sections: [
      { h: 'בעל הבקרה על המידע', p: 'מייזון ישראל אחראית לעיבוד הנתונים האישיים הנאספים באתר luxuryisraelrealestate.com. לכל בקשה בנוגע לנתונים שלכם, פנו אלינו דרך עמוד יצירת הקשר.' },
      { h: 'נתונים שנאספים', p: 'אנו אוספים את הנתונים שאתם מוסרים מרצונכם דרך הטפסים: שם, כתובת דוא"ל, מספר טלפון ומידע על פרויקט הנדל"ן שלכם. לא נדרשים נתונים רגישים.' },
      { h: 'מטרת העיבוד', p: 'הנתונים שלכם משמשים אך ורק למענה לפניותיכם, לליווי פרויקט הנדל"ן שלכם, ובמידה והסכמתם — למשלוח עדכונים (ניוזלטר המעגל). הנתונים אינם נמכרים לצדדים שלישיים.' },
      { h: 'בסיס חוקי', p: 'העיבוד מבוסס על הסכמתכם ועל האינטרס הלגיטימי של מייזון ישראל להשיב לפניותיכם.' },
      { h: 'תקופת שמירה', p: 'הנתונים נשמרים למשך הזמן הדרוש לטיפול בפנייתכם, ולאחר מכן מאורכבים בהתאם לתקופות החוקיות. מנויי הניוזלטר יכולים לבטל את המנוי בכל עת.' },
      { h: 'הזכויות שלכם', p: 'בהתאם לתקנות החלות (כולל GDPR לתושבי האיחוד האירופי), עומדת לכם הזכות לגישה, תיקון, מחיקה, הגבלה והתנגדות לעיבוד הנתונים. למימוש הזכויות, פנו אלינו דרך עמוד יצירת הקשר.' },
      { h: 'עוגיות', p: 'אתר זה משתמש במספר מצומצם של עוגיות הדרושות לתפקודו התקין ולמדידת קהל. ניתן להגדיר את הדפדפן לדחות עוגיות.' },
      { h: 'אבטחה', p: 'אנו נוקטים באמצעים טכניים וארגוניים מתאימים להגנה על הנתונים שלכם מפני גישה בלתי מורשית.' },
    ],
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = (locale in COPY ? locale : 'fr') as keyof typeof COPY
  return {
    title: COPY[l].metaTitle,
    description: COPY[l].title,
    alternates: { canonical: `${BASE_URL}/${l}/confidentialite` },
    robots: { index: false, follow: true },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
