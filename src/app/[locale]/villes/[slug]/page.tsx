import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import CityMap from '@/components/public/CityMap'

export const revalidate = 60

const CITY_DATA: Record<string, {
  nom: { fr: string; en: string; he: string }
  img: string
  desc: { fr: string; en: string; he: string }
  population: string
  prix_m2: string
  dbVille: string
  neighborhoods: { name: string; desc: { fr: string; en: string; he: string } }[]
}> = {
  'tel-aviv': {
    nom: { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop&q=80',
    desc: {
      fr: "Tel Aviv est la métropole cosmopolite d'Israël, mêlant architecture Bauhaus classée à l'UNESCO, plages méditerranéennes et une scène tech de niveau mondial. Le marché immobilier y est l'un des plus dynamiques du Moyen-Orient.",
      en: "Tel Aviv is Israel's cosmopolitan metropolis, blending UNESCO-listed Bauhaus architecture, Mediterranean beaches and a world-class tech scene. Its real estate market is one of the most dynamic in the Middle East.",
      he: "תל אביב היא המטרופולין הקוסמופוליטית של ישראל, המשלבת אדריכלות באוהאוס רשומה ביונסק\"ו, חופים ים-תיכוניים וסצנת טכנולוגיה ברמה עולמית. שוק הנדל\"ן שלה הוא מהדינמיים במזרח התיכון.",
    },
    population: '460 000',
    prix_m2: '25 000 – 40 000 ₪',
    dbVille: 'Tel Aviv',
    neighborhoods: [
      {
        name: 'Neve Tzedek',
        desc: {
          fr: "Quartier historique bohème avec ses ruelles colorées et ses galeries d'art. Très prisé des acheteurs étrangers.",
          en: "Historic bohemian neighbourhood with colourful lanes and art galleries. Highly sought after by foreign buyers.",
          he: "שכונה בוהמית היסטורית עם סמטאות צבעוניות וגלריות אמנות. מבוקשת מאוד על ידי קונים זרים.",
        },
      },
      {
        name: 'Florentin',
        desc: {
          fr: "Quartier branché en pleine gentrification, mêlant street art, restaurants tendance et lofts industriels.",
          en: "Trendy neighbourhood in full gentrification, blending street art, fashionable restaurants and industrial lofts.",
          he: "שכונה טרנדית בתהליך ג'נטריפיקציה, המשלבת אמנות רחוב, מסעדות אופנתיות ולופטים תעשייתיים.",
        },
      },
      {
        name: 'Rothschild',
        desc: {
          fr: "Le boulevard le plus emblématique de Tel Aviv, bordé d'immeubles Bauhaus et de cafés chics. Standing maximal.",
          en: "Tel Aviv's most iconic boulevard, lined with Bauhaus buildings and chic cafés. Maximum prestige.",
          he: "הבולוואר האיקוני ביותר של תל אביב, המוקף בבניינים בסגנון באוהאוס ובתי קפה שיקיים. יוקרה מרבית.",
        },
      },
      {
        name: 'Old North',
        desc: {
          fr: "Quartier résidentiel calme et familial, proche de la mer. Idéal pour une résidence principale ou locative.",
          en: "Quiet, family-friendly residential neighbourhood near the sea. Ideal for a main residence or rental.",
          he: "שכונה שקטה ומשפחתית, קרובה לים. אידיאלית למגורים ראשיים או להשכרה.",
        },
      },
    ],
  },
  'jerusalem': {
    nom: { fr: 'Jérusalem', en: 'Jerusalem', he: 'ירושלים' },
    img: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=1600&auto=format&fit=crop&q=80',
    desc: {
      fr: "Jérusalem, ville sainte de trois religions, offre un marché immobilier unique alliant investissement patrimonial et valeur spirituelle. Les propriétés de la Vieille Ville et des quartiers rénovés sont particulièrement recherchées.",
      en: "Jerusalem, holy city of three religions, offers a unique real estate market combining heritage investment and spiritual value. Properties in the Old City and renovated neighbourhoods are particularly sought after.",
      he: "ירושלים, עיר הקודש לשלוש דתות, מציעה שוק נדל\"ן ייחודי המשלב השקעה מורשת וערך רוחני. נכסים בעיר העתיקה ובשכונות מחודשות מבוקשים במיוחד.",
    },
    population: '970 000',
    prix_m2: '18 000 – 32 000 ₪',
    dbVille: 'Jérusalem',
    neighborhoods: [
      {
        name: 'Réhavia',
        desc: {
          fr: "Quartier verdoyant et bourgeois, résidence historique d'intellectuels et de diplomates. Architecture du Mandat britannique.",
          en: "Leafy, affluent neighbourhood, historically home to intellectuals and diplomats. British Mandate architecture.",
          he: "שכונה ירוקה ואמידה, בית היסטורי לאינטלקטואלים ולדיפלומטים. אדריכלות מתקופת המנדט הבריטי.",
        },
      },
      {
        name: 'German Colony',
        desc: {
          fr: "Ancienne colonie allemande du XIXe siècle, aujourd'hui quartier chic aux magnifiques maisons en pierre.",
          en: "Former 19th-century German colony, now a chic neighbourhood with magnificent stone houses.",
          he: "מושבה גרמנית לשעבר מהמאה ה-19, כיום שכונה שיקית עם בתי אבן מפוארים.",
        },
      },
      {
        name: 'Musrara',
        desc: {
          fr: "Quartier artistique en pleine transformation, entre la Vieille Ville et Méa Shéarim. Valeur montante.",
          en: "Artistic neighbourhood undergoing transformation, between the Old City and Mea Shearim. Rising value.",
          he: "שכונה אמנותית בתהליך שינוי, בין העיר העתיקה למאה שערים. ערך עולה.",
        },
      },
      {
        name: 'Talbiyeh',
        desc: {
          fr: "Résidences du Mandat, calme absolu, vue sur le Teddy Park. Les adresses les plus prisées de Jérusalem.",
          en: "Mandate-era residences, absolute calm, views over Teddy Park. Jerusalem's most coveted addresses.",
          he: "מגורי המנדט, שקט מוחלט, נוף לפארק טדי. הכתובות הנחשקות ביותר בירושלים.",
        },
      },
    ],
  },
  'herzliya-pituah': {
    nom: { fr: 'Herzliya Pituah', en: 'Herzliya Pituah', he: 'הרצליה פיתוח' },
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80',
    desc: {
      fr: "Herzliya Pituah est le quartier diplomatique et résidentiel le plus exclusif d'Israël, souvent surnommé le « Beverly Hills israélien ». Villas de prestige, ambassades, et proximité de la mer en font la destination ultime de l'ultra-luxe.",
      en: "Herzliya Pituah is Israel's most exclusive diplomatic and residential neighbourhood, often dubbed the 'Israeli Beverly Hills'. Prestigious villas, embassies, and proximity to the sea make it the ultimate ultra-luxury destination.",
      he: "הרצליה פיתוח היא השכונה הדיפלומטית והמגורים הבלעדית ביותר בישראל, המכונה לעתים קרובות 'הביוורלי הילס הישראלי'. וילות יוקרתיות, שגרירויות וקרבה לים הופכות אותה ליעד היוקרה האולטימטיבי.",
    },
    population: '95 000',
    prix_m2: '30 000 – 65 000 ₪',
    dbVille: 'Herzliya Pituah',
    neighborhoods: [
      {
        name: 'Pointe de Herzliya',
        desc: {
          fr: "Front de mer exclusif avec marina de prestige, restaurants étoilés et appartements de grand luxe avec vue mer.",
          en: "Exclusive seafront with prestige marina, starred restaurants and grand luxury apartments with sea views.",
          he: "חזית ים בלעדית עם מרינה יוקרתית, מסעדות כוכבים ודירות יוקרה עם נוף לים.",
        },
      },
      {
        name: 'Quartier des Ambassades',
        desc: {
          fr: "Zone résidentielle verdoyante abritant ambassades et résidences de hauts fonctionnaires. Sécurité maximale.",
          en: "Leafy residential area housing embassies and senior officials' residences. Maximum security.",
          he: "אזור מגורים ירוק המארח שגרירויות ומגורי בכירים. אבטחה מרבית.",
        },
      },
      {
        name: "Sha'ar HaYam",
        desc: {
          fr: "Villas contemporaines de grand standing avec jardins privés et piscines. Calme et discrétion assurés.",
          en: "High-end contemporary villas with private gardens and pools. Calm and discretion guaranteed.",
          he: "וילות עכשוויות ברמה גבוהה עם גינות פרטיות ובריכות. שקט ושיקול דעת מובטחים.",
        },
      },
      {
        name: 'Herzliya B',
        desc: {
          fr: "Secteur résidentiel familial en bordure du parc HaYarkon prolongé. Appartements spacieux et accès rapide à Tel Aviv.",
          en: "Family residential area bordering the extended HaYarkon Park. Spacious apartments and quick access to Tel Aviv.",
          he: "אזור מגורים משפחתי בגבול פארק הירקון המורחב. דירות מרווחות וגישה מהירה לתל אביב.",
        },
      },
    ],
  },
  'netanya': {
    nom: { fr: 'Netanya', en: 'Netanya', he: 'נתניה' },
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80',
    desc: {
      fr: "Netanya, surnommée la « Riviera israélienne », est la capitale française d'Israël avec la plus forte concentration de Français au mètre carré. Falaises méditerranéennes, plages de sable fin et prix encore accessibles en font une destination d'investissement idéale.",
      en: "Netanya, nicknamed the 'Israeli Riviera', is Israel's French capital with the highest concentration of French speakers per square metre. Mediterranean cliffs, fine sandy beaches and still-accessible prices make it an ideal investment destination.",
      he: "נתניה, המכונה 'הריביירה הישראלית', היא הבירה הצרפתית של ישראל עם הריכוז הגבוה ביותר של דוברי צרפתית. צוקים ים-תיכוניים, חופי חול ומחירים נגישים עדיין הופכים אותה ליעד השקעה אידיאלי.",
    },
    population: '230 000',
    prix_m2: '14 000 – 22 000 ₪',
    dbVille: 'Netanya',
    neighborhoods: [
      {
        name: 'Centre-Ville',
        desc: {
          fr: "Cœur animé de Netanya, commerces, restaurants et accès direct à la plage. Parfait pour la location saisonnière.",
          en: "Lively heart of Netanya, shops, restaurants and direct beach access. Perfect for seasonal rental.",
          he: "לב הפעילות של נתניה, חנויות, מסעדות וגישה ישירה לחוף. מושלם להשכרה עונתית.",
        },
      },
      {
        name: 'Ir Yamim',
        desc: {
          fr: "Quartier résidentiel en bord de mer avec vue panoramique sur la Méditerranée. Appartements de très bon standing.",
          en: "Seafront residential neighbourhood with panoramic views over the Mediterranean. Very good quality apartments.",
          he: "שכונת מגורים בחזית הים עם נוף פנורמי על הים התיכון. דירות באיכות גבוהה מאוד.",
        },
      },
      {
        name: 'Poleg',
        desc: {
          fr: "Zone résidentielle calme avec accès à la plage de Poleg. Idéale pour les familles recherchant l'espace.",
          en: "Quiet residential area with access to Poleg beach. Ideal for families seeking space.",
          he: "אזור מגורים שקט עם גישה לחוף פולג. אידיאלי למשפחות המחפשות מרחב.",
        },
      },
      {
        name: 'Kikar HaAtzmaut',
        desc: {
          fr: "Place de l'Indépendance, symbole de la ville, entourée de cafés et de la promenade en bord de falaise.",
          en: "Independence Square, symbol of the city, surrounded by cafés and the clifftop promenade.",
          he: "כיכר העצמאות, סמל העיר, מוקף בתי קפה ובטיילת לאורך הצוק.",
        },
      },
    ],
  },
}

export default async function VillePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const messages = await getMessages(locale as Locale)
  const v = messages.villes
  const m = messages
  const isRTL = locale === 'he'

  const cityData = CITY_DATA[slug]
  if (!cityData) notFound()

  const lang = locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr'
  const cityName = cityData.nom[lang as keyof typeof cityData.nom]
  const cityDesc = cityData.desc[lang as keyof typeof cityData.desc]

  const supabase = await createClient()
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .eq('ville', cityData.dbVille)
    .eq('statut', 'actif')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        <img
          src={cityData.img}
          alt={cityName}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.2) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', padding: '0 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
            {m.destinations.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', fontWeight: 300, marginBottom: '1rem' }}>
            {cityName}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
        </div>
      </div>

      {/* DESCRIPTION + KEY FACTS */}
      <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, fontStyle: 'italic' }}>
              {cityDesc}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                label: locale === 'he' ? 'אוכלוסייה' : locale === 'en' ? 'Population' : 'Population',
                value: cityData.population,
              },
              {
                label: locale === 'he' ? 'מחיר ממוצע/מ"ר' : locale === 'en' ? 'Average price/sqm' : 'Prix moyen/m²',
                value: cityData.prix_m2,
              },
              {
                label: locale === 'he' ? 'נכסים זמינים' : locale === 'en' ? 'Available properties' : 'Biens disponibles',
                value: `${biens?.length ?? 0}`,
              },
            ].map((stat) => (
              <div key={stat.label} style={{ borderBottom: '1px solid rgba(200,169,110,0.2)', paddingBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.4rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#fff', fontWeight: 300 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section style={{ padding: '6rem 2rem', background: '#111214', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {v.properties_tag}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#FAFAF9', marginBottom: '1rem' }}>
              {v.properties_title}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>

          {!biens?.length ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#8A8B91', marginBottom: '1.5rem' }}>
                {m.properties.none_title}
              </p>
              <Link href={`/${locale}/projets`} style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.9rem 2.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
                {m.featured.all}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid-properties">
                {biens.map((bien: Bien) => (
                  <Link key={bien.id} href={`/${locale}/projets/${bien.slug}`} className="pcard">
                    <div className="pcard-img-wrap">
                      <img src={bien.image_principale} alt={bien.nom} className="pcard-img" />
                      <div className="pcard-overlay" />
                      {bien.badge && (
                        <div className="pcard-badges">
                          <span className="pbadge pbadge-gold">{bien.badge}</span>
                        </div>
                      )}
                    </div>
                    <div className="pcard-body" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                      <div className="pcard-city">{bien.quartier ? `${bien.quartier} · ${bien.ville}` : bien.ville}</div>
                      <div className="pcard-name">{bien.nom}</div>
                      <div className="pcard-specs">
                        <span>{bien.type}</span><span>·</span>
                        <span>{bien.surface} {m.properties.surface}</span>
                        {bien.pieces && <><span>·</span><span>{bien.pieces} {m.properties.rooms}</span></>}
                      </div>
                      <div className="pcard-price-row">
                        <div className="pcard-price">{bien.prix_display}</div>
                        {bien.roi && <div className="pcard-roi">{m.properties.yield} {bien.roi}</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link href={`/${locale}/projets`} style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.9rem 2.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
                  {m.featured.all}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {v.neighborhoods_tag}
            </p>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {cityData.neighborhoods.map((nb) => (
              <div key={nb.name} style={{ background: '#141416', padding: '2rem', borderBottom: '2px solid #C8A96E' }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {nb.name}
                </h4>
                <p style={{ color: '#8A8B91', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {nb.desc[lang as keyof typeof nb.desc]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP */}
      <section style={{ padding: '6rem 2rem', background: '#111214', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.8rem' }}>
              {locale === 'he' ? 'מפת השכונות' : locale === 'en' ? 'Neighbourhood Map' : 'Carte des Quartiers'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.8rem' }}>
              {locale === 'he' ? `גלו את ${cityName}` : locale === 'en' ? `Explore ${cityName}` : `Explorer ${cityName}`}
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto' }} />
          </div>

          <CityMap
            slug={slug}
            neighborhoods={cityData.neighborhoods}
            lang={lang}
            isRTL={isRTL}
          />

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.75rem', color: '#8A8B91', letterSpacing: '0.05em' }}>
            {locale === 'he' ? 'לחץ על סמן לפרטים על השכונה' : locale === 'en' ? 'Click a marker for neighbourhood details' : 'Cliquez sur un marqueur pour les détails du quartier'}
          </p>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: '#C8A96E', padding: '4rem 2rem', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0A0A0B', marginBottom: '1rem', fontWeight: 400 }}>
          {v.cta_title}
        </h2>
        <p style={{ color: 'rgba(10,10,11,0.7)', maxWidth: '500px', margin: '0 auto 2rem' }}>{m.cta_band.subtitle}</p>
        <Link href={`/${locale}/contact`} style={{ background: '#0A0A0B', color: '#C8A96E', padding: '1rem 3rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: isRTL ? '0' : '0.2em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-block' }}>
          {m.cta_band.button}
        </Link>
      </section>
    </>
  )
}
