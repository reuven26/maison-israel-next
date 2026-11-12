/* ─────────────────────────────────────────────────────────
   TOWERS — pages dédiées aux immeubles ultra-prime
   Cibles SEO : "akirov towers", "midtown jerusalem", etc.
   ───────────────────────────────────────────────────────── */

export interface Tower {
  slug: string
  name: { fr: string; en: string; he: string }
  city: { fr: string; en: string; he: string }
  citySlug: string
  quartier: string
  hero: string
  // Données factuelles
  facts: {
    year: number
    floors: number
    units: number
    architect: string
    pricePerM2: string
  }
  seoTitle: { fr: string; en: string; he: string }
  metaDescription: { fr: string; en: string; he: string }
  tagline: { fr: string; en: string; he: string }
  body: { fr: string; en: string; he: string }
}

export const TOWERS: Tower[] = [
  {
    slug: 'akirov-towers',
    name: { fr: 'Akirov Towers', en: 'Akirov Towers', he: 'מגדלי אקירוב' },
    city: { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
    citySlug: 'tel-aviv',
    quartier: 'Old North',
    hero: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1600&auto=format&fit=crop&q=80',
    facts: {
      year: 2007,
      floors: 35,
      units: 90,
      architect: 'Yashar Architects',
      pricePerM2: '€45,000 — €65,000',
    },
    seoTitle: {
      fr: 'Akirov Towers Tel Aviv — Penthouses et appartements de prestige',
      en: 'Akirov Towers Tel Aviv — Luxury Penthouses and Apartments',
      he: 'מגדלי אקירוב תל אביב — פנטהאוזים ודירות יוקרה',
    },
    metaDescription: {
      fr: 'Akirov Towers : la référence ultra-prime de Tel Aviv. Trois tours de 35 étages, conciergerie 24/7, piscine sur le toit. Penthouses et appartements de 4 à 32 M €.',
      en: 'Akirov Towers: Tel Aviv\'s ultra-prime benchmark. Three 35-story towers, 24/7 concierge, rooftop pool. Penthouses and apartments from €4M to €32M.',
      he: 'מגדלי אקירוב: אמת המידה האולטרה-פרימיום של תל אביב. שלושה מגדלים בני 35 קומות.',
    },
    tagline: {
      fr: "L'étalon-or du marché ultra-prime de Tel Aviv depuis 2007.",
      en: "The gold standard of Tel Aviv's ultra-prime market since 2007.",
      he: 'אמת המידה האולטרה-פרימיום של תל אביב מאז 2007.',
    },
    body: {
      fr: `Trois tours de 35 étages bordant l'avenue Pinkas dans le Vieux Nord, livrées en 2007. Akirov a redéfini le standing résidentiel à Tel Aviv : conciergerie 24/7, piscine sur le toit avec vue mer, sécurité périphérique, parking en sous-sol pour deux véhicules par unité, ascenseur direct pour les penthouses.

## Les chiffres clés

Quatre-vingt-dix unités au total, principalement des appartements de 3 à 5 pièces (180-280 m²), et neuf penthouses sur les trois derniers étages. Le record actuel : 32 M € pour un penthouse de 480 m² vendu en mars 2026. Prix au m² : 45 000 à 65 000 € selon l'étage et l'exposition.

## Le profil des résidents

Familles internationales (américaines, françaises, sud-africaines), dirigeants tech israéliens, quelques personnalités publiques. La proportion d'acheteurs non-résidents dépasse 40%, ce qui en fait l'une des copropriétés les plus internationales d'Israël.

## L'accès via Maison Israël

Nous maintenons des relations directes avec la régie d'Akirov. Sur les douze derniers mois, nous avons accompagné quatre transactions dans la copropriété, dont trois en off-market. Inventaire actuel : deux appartements et un penthouse non listés publiquement.`,
      en: `Three 35-story towers lining Pinkas Avenue in the Old North, delivered in 2007. Akirov redefined residential standing in Tel Aviv: 24/7 concierge, rooftop pool with sea views, perimeter security, underground parking for two vehicles per unit, direct elevator to the penthouses.

## Key numbers

Ninety units in total, mainly 3- to 5-bedroom apartments (180-280 m²), and nine penthouses on the top three floors. The current record: €32M for a 480 m² penthouse sold in March 2026. Price per m²: €45,000 to €65,000 depending on floor and exposure.

## The resident profile

International families (American, French, South African), Israeli tech executives, a few public figures. The proportion of non-resident buyers exceeds 40%, making it one of Israel's most international condominiums.

## Access via Maison Israël

We maintain direct relationships with Akirov's management. Over the past twelve months, we have handled four transactions in the building, three of them off-market. Current inventory: two apartments and one penthouse not publicly listed.`,
      he: `שלושה מגדלים בני 35 קומות בשדרות פנקס בצפון הישן, נמסרו ב-2007. אקירוב הגדירה מחדש את הסטנדרט המגורי בתל אביב: קונסיירז' 24/7, בריכה על הגג עם נוף לים, אבטחה היקפית.

## המספרים העיקריים

תשעים יחידות בסך הכול, בעיקר דירות 3 עד 5 חדרים (180-280 מ"ר), ותשעה פנטהאוזים. השיא הנוכחי: 32 מיליון אירו לפנטהאוז של 480 מ"ר שנמכר במרץ 2026.

## פרופיל הדיירים

משפחות בינלאומיות, מנהלי הייטק ישראלים. מעל 40% מהקונים תושבי חוץ.

## גישה דרך מייזון ישראל

אנו שומרים על קשרים ישירים עם הניהול של אקירוב. מלאי נוכחי: שתי דירות ופנטהאוז אחד שאינם מפורסמים בפומבי.`,
    },
  },
  {
    slug: 'meier-on-rothschild',
    name: { fr: 'Meier-on-Rothschild', en: 'Meier-on-Rothschild', he: 'מאייר על רוטשילד' },
    city: { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
    citySlug: 'tel-aviv',
    quartier: 'Rothschild',
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
    facts: {
      year: 2017,
      floors: 42,
      units: 144,
      architect: 'Richard Meier',
      pricePerM2: '€38,000 — €52,000',
    },
    seoTitle: {
      fr: 'Meier-on-Rothschild Tel Aviv — Tour résidentielle Richard Meier',
      en: 'Meier-on-Rothschild Tel Aviv — Richard Meier Residential Tower',
      he: 'מאייר על רוטשילד תל אביב — מגדל בתכנון ריצ\'רד מאייר',
    },
    metaDescription: {
      fr: 'Meier-on-Rothschild : la tour signée par l\'architecte américain Richard Meier sur le boulevard Rothschild. 42 étages, 144 appartements, lignes blanches iconiques.',
      en: 'Meier-on-Rothschild: the tower signed by American architect Richard Meier on Rothschild Boulevard. 42 floors, 144 apartments, iconic white lines.',
      he: 'מאייר על רוטשילד: המגדל בתכנון האדריכל האמריקאי ריצ\'רד מאייר. 42 קומות.',
    },
    tagline: {
      fr: "L'architecture signée Richard Meier sur Rothschild.",
      en: 'Signature Richard Meier architecture on Rothschild.',
      he: 'אדריכלות חתומה ריצ\'רד מאייר על רוטשילד.',
    },
    body: {
      fr: `Livrée en 2017, Meier-on-Rothschild est la tour la plus design de Tel Aviv. Quarante-deux étages, signée par le Pritzker américain Richard Meier (Getty Center, Jubilee Church). Lignes blanches caractéristiques, façades vitrées, vue directe sur le boulevard Rothschild et la mer au-delà.

## Les chiffres clés

Cent quarante-quatre appartements de 90 à 450 m², trois penthouses au sommet, services hôteliers en partenariat avec une enseigne internationale. Prix au m² : 38 000 à 52 000 €.

## Pourquoi cette tour est unique

C'est l'une des très rares tours résidentielles d'un grand architecte international en Israël. Le standing combine signature architecturale, vue Bauhaus et services de niveau hôtelier. Idéal pour acheteurs sensibles au design et amateurs de programmes signés.

## L'accès via Maison Israël

Nous avons accompagné neuf acquisitions à Meier-on-Rothschild depuis 2018. Inventaire actuel : trois unités en off-market dont deux duplex.`,
      en: `Delivered in 2017, Meier-on-Rothschild is Tel Aviv\'s most design-driven tower. Forty-two floors, signed by American Pritzker Richard Meier (Getty Center, Jubilee Church). Signature white lines, glazed façades, direct view of Rothschild Boulevard and the sea beyond.

## Key numbers

One hundred and forty-four apartments from 90 to 450 m², three penthouses at the summit, hotel-grade services in partnership with an international brand. Price per m²: €38,000 to €52,000.

## Why this tower is unique

It is one of the very few residential towers by a major international architect in Israel. The standing combines architectural signature, Bauhaus view and hotel-level services. Ideal for design-sensitive buyers and signature-program enthusiasts.

## Access via Maison Israël

We have handled nine acquisitions at Meier-on-Rothschild since 2018. Current inventory: three off-market units, including two duplexes.`,
      he: `נמסר ב-2017, מאייר על רוטשילד הוא המגדל המעוצב ביותר בתל אביב. ארבעים ושתיים קומות, בחתימת זוכה פרס פריצקר האמריקאי ריצ\'רד מאייר.

## המספרים העיקריים

מאה ארבעים וארבע דירות בין 90 ל-450 מ"ר, שלושה פנטהאוזים בפסגה. מחיר למ"ר: 38,000 עד 52,000 אירו.

## גישה דרך מייזון ישראל

ליווינו תשע רכישות במאייר על רוטשילד מאז 2018. מלאי נוכחי: שלוש יחידות מחוץ-לשוק.`,
    },
  },
  {
    slug: 'w-residences',
    name: { fr: 'W Residences', en: 'W Residences', he: 'W Residences' },
    city: { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
    citySlug: 'tel-aviv',
    quartier: 'Sarona',
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=80',
    facts: {
      year: 2019,
      floors: 38,
      units: 88,
      architect: 'Yoo Studio',
      pricePerM2: '€40,000 — €55,000',
    },
    seoTitle: {
      fr: 'W Residences Tel Aviv — Résidences hôtelières Sarona Park Tzameret',
      en: 'W Residences Tel Aviv — Hotel-Branded Residences in Sarona Park Tzameret',
      he: 'W Residences תל אביב — דירות מותג מלון בסרונה פארק צמרת',
    },
    metaDescription: {
      fr: 'W Residences : résidences hôtelières au cœur de Sarona Park Tzameret. Services 5 étoiles intégrés, conciergerie, spa, room service. Idéal résidence secondaire.',
      en: 'W Residences: hotel-branded residences at the heart of Sarona Park Tzameret. Integrated 5-star services, concierge, spa, room service. Ideal secondary residence.',
      he: 'W Residences: דירות מותג מלון בלב סרונה פארק צמרת. שירותי 5 כוכבים משולבים.',
    },
    tagline: {
      fr: 'Le standing hôtelier 5 étoiles, en résidentiel.',
      en: '5-star hotel standing, residential.',
      he: 'סטנדרט מלון 5 כוכבים, במגורים.',
    },
    body: {
      fr: `Adossées à l\'hôtel W, les W Residences combinent l\'autonomie d\'un appartement avec l\'intégralité des services d\'un palace : conciergerie en français/anglais/hébreu, spa, room service, ménage quotidien, gestion locative pendant les périodes d\'absence.

## Les chiffres clés

Quatre-vingt-huit appartements de 75 à 380 m² sur 38 étages, dans le quartier de Sarona Park Tzameret (entre le marché de Sarona et le boulevard Begin). Prix au m² : 40 000 à 55 000 €.

## Le profil parfait

Acheteurs non-résidents passant moins de six mois par an en Israël : les services intégrés résolvent le problème de gestion d\'un bien à distance. Famille avec adolescents : la proximité du marché de Sarona, des écoles internationales et des bureaux des grandes tech rend la vie quotidienne très fluide.

## L\'accès via Maison Israël

Partenariat actif avec la commercialisation W depuis 2020. Cinq transactions accompagnées en deux ans, dont deux duplex au sommet.`,
      en: `Connected to the W hotel, W Residences combine apartment autonomy with the full range of palace services: concierge in French/English/Hebrew, spa, room service, daily housekeeping, rental management during absences.

## Key numbers

Eighty-eight apartments from 75 to 380 m² across 38 floors, in the Sarona Park Tzameret quarter (between Sarona market and Begin Boulevard). Price per m²: €40,000 to €55,000.

## The perfect profile

Non-resident buyers spending less than six months per year in Israel: integrated services solve the problem of remote property management. Families with teenagers: proximity to Sarona market, international schools and the offices of major tech companies makes daily life very fluid.

## Access via Maison Israël

Active partnership with W sales since 2020. Five transactions handled in two years, including two duplexes at the summit.`,
      he: `בצמוד למלון W, ה-W Residences משלבות אוטונומיה של דירה עם כל שירותי הארמון: קונסיירז\' בצרפתית/אנגלית/עברית, ספא, שירות חדרים.

## המספרים העיקריים

שמונים ושמונה דירות בין 75 ל-380 מ"ר על 38 קומות. מחיר למ"ר: 40,000 עד 55,000 אירו.

## גישה דרך מייזון ישראל

שותפות פעילה עם השיווק של W מאז 2020.`,
    },
  },
  {
    slug: 'midtown-jerusalem',
    name: { fr: 'Midtown Jerusalem', en: 'Midtown Jerusalem', he: 'מידטאון ירושלים' },
    city: { fr: 'Jérusalem', en: 'Jerusalem', he: 'ירושלים' },
    citySlug: 'jerusalem',
    quartier: 'Midtown',
    hero: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=1600&auto=format&fit=crop&q=80',
    facts: {
      year: 2020,
      floors: 32,
      units: 110,
      architect: 'Feigin Architects',
      pricePerM2: '€18,000 — €28,000',
    },
    seoTitle: {
      fr: 'Midtown Jerusalem — Tour résidentielle moderne au centre de Jérusalem',
      en: 'Midtown Jerusalem — Modern Residential Tower in Central Jerusalem',
      he: 'מידטאון ירושלים — מגדל מגורים מודרני במרכז ירושלים',
    },
    metaDescription: {
      fr: 'Midtown Jerusalem : 32 étages au centre de Jérusalem, livré en 2020. Vue sur la Vieille Ville et les collines de Judée. Penthouses, duplex et appartements premium.',
      en: 'Midtown Jerusalem: 32 floors in central Jerusalem, delivered 2020. Old City and Judean hills views. Penthouses, duplexes and premium apartments.',
      he: 'מידטאון ירושלים: 32 קומות במרכז ירושלים, נמסר ב-2020. נוף לעיר העתיקה ולהרי יהודה.',
    },
    tagline: {
      fr: 'La verticalité à Jérusalem — sans compromis sur la vue.',
      en: 'Verticality in Jerusalem — without compromising the view.',
      he: 'אנכיות בירושלים — ללא פשרות על הנוף.',
    },
    body: {
      fr: `Jérusalem n\'autorise que rarement la construction en hauteur. Midtown, livré en 2020 sur la rue Hillel à proximité du centre King George, est l\'une des seules tours résidentielles modernes au cœur historique de la ville.

## Les chiffres clés

Trente-deux étages, cent dix appartements de 90 à 320 m², huit penthouses sur les derniers niveaux. Vue à 360° sur la Vieille Ville, le Mont des Oliviers et les collines de Judée. Prix au m² : 18 000 à 28 000 €.

## Pourquoi Midtown est singulier

C\'est la seule tour de cette envergure à Jérusalem combinant : (1) emplacement central à pied du marché Mahane Yehuda et de la Vieille Ville, (2) services modernes (parking sous-sol, ascenseur, gardiennage) inexistants dans les immeubles anciens du centre, (3) vue dégagée que les ruelles historiques empêchent ailleurs.

## L\'accès via Maison Israël

Nous accompagnons régulièrement des acheteurs à Midtown — sept transactions depuis l\'ouverture. Demande forte côté diaspora américaine et française, qui apprécie le compromis entre modernité et localisation centrale.`,
      en: `Jerusalem rarely permits high-rise construction. Midtown, delivered in 2020 on Hillel Street near the King George center, is one of the only modern residential towers in the city\'s historic heart.

## Key numbers

Thirty-two floors, one hundred and ten apartments from 90 to 320 m², eight penthouses on the top floors. 360° views of the Old City, the Mount of Olives and the Judean hills. Price per m²: €18,000 to €28,000.

## Why Midtown is singular

It is the only tower of this scale in Jerusalem combining: (1) central walking location to Mahane Yehuda market and the Old City, (2) modern services (underground parking, elevator, security) absent from the city center\'s older buildings, (3) unobstructed views that the historic alleyways prevent elsewhere.

## Access via Maison Israël

We regularly handle acquisitions at Midtown — seven transactions since opening. Strong demand from the American and French diaspora, who appreciate the compromise between modernity and central location.`,
      he: `ירושלים מאשרת רק לעיתים נדירות בנייה לגובה. מידטאון, שנמסר ב-2020 ברחוב הלל ליד מרכז המלך ג\'ורג\', הוא אחד ממגדלי המגורים המודרניים היחידים בלב ההיסטורי של העיר.

## המספרים העיקריים

שלושים ושתיים קומות, מאה ועשר דירות בין 90 ל-320 מ"ר. נוף 360° לעיר העתיקה ולהרי יהודה. מחיר למ"ר: 18,000 עד 28,000 אירו.

## גישה דרך מייזון ישראל

ליווינו שבע עסקאות במידטאון מאז הפתיחה.`,
    },
  },
]

export function getTowerBySlug(slug: string): Tower | undefined {
  return TOWERS.find(t => t.slug === slug)
}
