/* ─────────────────────────────────────────────────────────
   PROPERTY TYPES — Type-specific landing pages
   Each page captures searches like "penthouse Tel Aviv",
   "villa Israël", etc., and shows live matching inventory.
   ───────────────────────────────────────────────────────── */

export interface PropertyType {
  slug: string                                    // URL slug
  dbTypes: string[]                                // matches biens.type values (multiple variants)

  names: { fr: string; en: string; he: string }
  tagline: { fr: string; en: string; he: string }

  seoTitle: { fr: string; en: string; he: string }
  metaDescription: { fr: string; en: string; he: string }
  h1: { fr: string; en: string; he: string }

  hero: string

  intro: { fr: string; en: string; he: string }

  sections: {
    title: { fr: string; en: string; he: string }
    body: { fr: string; en: string; he: string }
  }[]

  facts: {
    priceRange: string
    typicalSize: { fr: string; en: string; he: string }
    bestNeighborhoods: { fr: string; en: string; he: string }
  }

  faq: { q: { fr: string; en: string; he: string }; a: { fr: string; en: string; he: string } }[]

  relatedArticles?: string[]
  relatedQuartiers?: string[]
}

export const PROPERTY_TYPES: PropertyType[] = [
  /* ────────────────────────── PENTHOUSES */
  {
    slug: 'penthouses',
    dbTypes: ['Penthouse', 'penthouse', 'Pent-house', 'Duplex penthouse'],
    names: { fr: 'Penthouses', en: 'Penthouses', he: 'פנטהאוזים' },
    tagline: {
      fr: 'Les derniers étages des meilleures adresses',
      en: 'The top floors of the best addresses',
      he: 'הקומות העליונות של הכתובות הטובות ביותר',
    },
    seoTitle: {
      fr: 'Penthouses de Prestige en Israël — Tel Aviv, Jérusalem | Maison Israël',
      en: 'Luxury Penthouses in Israel — Tel Aviv, Jerusalem | Maison Israël',
      he: 'פנטהאוזים יוקרתיים בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Penthouses de prestige en Israël — Tel Aviv (Rothschild, Sarona, Park Tzameret), Jérusalem (Mamilla), Herzliya Pituah. Inventaire curaté.",
      en: 'Luxury penthouses in Israel — Tel Aviv (Rothschild, Sarona, Park Tzameret), Jerusalem (Mamilla), Herzliya Pituah. Curated inventory.',
      he: 'פנטהאוזים יוקרתיים בישראל — תל אביב, ירושלים, הרצליה פיתוח.',
    },
    h1: {
      fr: 'Penthouses de Prestige en Israël',
      en: 'Luxury Penthouses in Israel',
      he: 'פנטהאוזים יוקרתיים בישראל',
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Les penthouses du marché premium israélien forment un segment particulier — l'intersection du vertical, du contemporain, et du trophée. À Tel Aviv, ils se concentrent dans les tours de Park Tzameret et Sarona (W Residences, Akirov, Meier), sur le front de mer, et sur Rothschild dans les nouvelles boutiques. À Jérusalem, ils se concentrent à Mamilla et dans quelques boutiques de la Colonie Allemande. À Herzliya, ils prennent la forme de duplex aux étages supérieurs des résidences de Galei Tchelet. Ces propriétés constituent la part la plus liquide et la plus internationalement recherchée du marché israélien.",
      en: "Penthouses in the Israeli premium market form a distinct segment — the intersection of vertical, contemporary, and trophy. In Tel Aviv, they concentrate in the Park Tzameret and Sarona towers (W Residences, Akirov, Meier), on the seafront, and on Rothschild in newer boutique buildings. In Jerusalem, they concentrate in Mamilla and a handful of German Colony boutiques. In Herzliya, they take the form of upper-floor duplexes in Galei Tchelet residences. These properties constitute the most liquid and internationally-coveted part of the Israeli market.",
      he: 'פנטהאוזים בשוק הפרמיום הישראלי מהווים מקטע מובחן.',
    },
    sections: [
      {
        title: { fr: 'Le produit', en: 'The Product', he: 'המוצר' },
        body: {
          fr: "Un penthouse premium en Israël combine typiquement : 200 à 600 m² de surface, des terrasses privées de 50 à 200 m², une vue dégagée (mer, ville, ou parc), un parking sécurisé en sous-sol, et — dans les meilleurs cas — la conciergerie complète et l'accès aux services partagés. Les penthouses trophées de Park Tzameret incluent des piscines privées sur terrasse, chose rare ailleurs dans le pays.",
          en: 'A premium Israeli penthouse typically combines: 200 to 600 m² floor area, private terraces of 50 to 200 m², open views (sea, city, or park), secure underground parking, and — in the best cases — full concierge and shared-service access. Park Tzameret trophy penthouses include private rooftop pools, rare elsewhere in the country.',
          he: 'פנטהאוז פרמיום ישראלי משלב בדרך כלל: 200–600 מ"ר, מרפסות פרטיות.',
        },
      },
      {
        title: { fr: 'Les meilleures adresses', en: 'The Best Addresses', he: 'הכתובות הטובות ביותר' },
        body: {
          fr: "**Tel Aviv**: les tours de Park Tzameret (Akirov, W Residences, Meier on Rothschild) dominent. Le front de mer Hayarkon offre des penthouses anciens repensés avec vue Méditerranée. **Jérusalem**: Mamilla, particulièrement les résidences Waldorf-Astoria. **Herzliya Pituah**: les duplex aux étages supérieurs des résidences Galei Tchelet. **Césarée**: les penthouses sont plus rares mais existent dans les sections 13 et 14.",
          en: "**Tel Aviv**: Park Tzameret towers (Akirov, W Residences, Meier on Rothschild) dominate. The Hayarkon seafront offers reimagined older penthouses with Mediterranean views. **Jerusalem**: Mamilla, particularly Waldorf-Astoria residences. **Herzliya Pituah**: upper-floor duplexes in Galei Tchelet residences. **Caesarea**: penthouses are rarer but exist in sections 13 and 14.",
          he: 'תל אביב: מגדלי פארק צמרת. ירושלים: ממילא. הרצליה פיתוח: דופלקסים בגלי תכלת.',
        },
      },
      {
        title: { fr: 'Liquidité et rendement', en: 'Liquidity and Yield', he: 'נזילות ותשואה' },
        body: {
          fr: "Les penthouses sont la classe d'actif la plus liquide du marché premium israélien. Un penthouse correctement positionné à Park Tzameret ou Mamilla se négocie typiquement en quatre à six mois. Les rendements bruts sur location longue : 2,8 à 3,8 %. Les locations courtes (Mamilla, front de mer Tel Aviv) peuvent atteindre 5 à 7 % brut avec une gestion professionnelle.",
          en: 'Penthouses are the most liquid asset class in the Israeli premium market. A correctly-positioned Park Tzameret or Mamilla penthouse typically transacts in four to six months. Long-term rental gross yields: 2.8 to 3.8%. Short-term rentals (Mamilla, Tel Aviv seafront) can reach 5 to 7% gross with professional management.',
          he: 'פנטהאוזים הם הנכס הנזיל ביותר בשוק הפרמיום הישראלי.',
        },
      },
    ],
    facts: {
      priceRange: '$3M – $30M+',
      typicalSize: { fr: '200–600 m²', en: '200–600 m²', he: '200–600 מ״ר' },
      bestNeighborhoods: {
        fr: 'Park Tzameret, Sarona, Rothschild, Mamilla, Galei Tchelet',
        en: 'Park Tzameret, Sarona, Rothschild, Mamilla, Galei Tchelet',
        he: 'פארק צמרת, שרונה, רוטשילד, ממילא, גלי תכלת',
      },
    },
    faq: [
      {
        q: { fr: 'Quel est le prix typique d\'un penthouse à Tel Aviv ?', en: 'What is a typical Tel Aviv penthouse price?', he: 'מהו מחיר פנטהאוז טיפוסי בתל אביב?' },
        a: {
          fr: 'À Park Tzameret ou Sarona pour un penthouse standard de 300 m² : 5 à 10 millions de dollars. Pour les étages trophées avec piscine privée : 12 à 25 millions de dollars. Sur Rothschild restauré : 4 à 12 millions de dollars.',
          en: 'In Park Tzameret or Sarona for a standard 300 m² penthouse: $5–10M. For trophy floors with private pool: $12–25M. On restored Rothschild: $4–12M.',
          he: 'בפארק צמרת או שרונה: 5–10 מיליון $.',
        },
      },
      {
        q: { fr: 'Y a-t-il une conciergerie ?', en: 'Is there concierge service?', he: 'האם יש שירות קונסיירז\'?' },
        a: {
          fr: 'Dans la plupart des résidences premium oui — Akirov, W, Meier, Waldorf-Astoria Mamilla incluent une conciergerie complète niveau hôtelier, parking sécurisé, et souvent gym et piscine partagées.',
          en: 'In most premium residences yes — Akirov, W, Meier, Waldorf-Astoria Mamilla include full hotel-grade concierge, secure parking, and often shared gym and pool.',
          he: 'ברוב הדירות הפרמיום כן.',
        },
      },
      {
        q: { fr: 'Les penthouses sont-ils adaptés aux locations courtes ?', en: 'Are penthouses suited to short-term rental?', he: 'האם פנטהאוזים מתאימים להשכרה קצרת טווח?' },
        a: {
          fr: 'Particulièrement bien à Mamilla et sur le front de mer Tel Aviv, où la demande touristique haut de gamme est continue. Park Tzameret est moins adapté (les copropriétés y restreignent souvent les locations courtes).',
          en: 'Particularly well in Mamilla and on the Tel Aviv seafront, where high-end tourist demand is continuous. Park Tzameret is less suited (HOAs often restrict short rentals).',
          he: 'במיוחד בממילא ובחזית הים של תל אביב.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv', 'tel-aviv-vs-jerusalem-investissement'],
    relatedQuartiers: ['sarona', 'rothschild', 'mamilla'],
  },

  /* ────────────────────────── VILLAS */
  {
    slug: 'villas',
    dbTypes: ['Villa', 'villa', 'Maison', 'house', 'Maison individuelle'],
    names: { fr: 'Villas', en: 'Villas', he: 'וילות' },
    tagline: {
      fr: 'Maisons individuelles et villas contemporaines',
      en: 'Single-family houses and contemporary villas',
      he: 'בתים פרטיים ווילות עכשוויות',
    },
    seoTitle: {
      fr: 'Villas de Prestige en Israël — Herzliya, Césarée, Jérusalem | Maison Israël',
      en: 'Luxury Villas in Israel — Herzliya, Caesarea, Jerusalem | Maison Israël',
      he: 'וילות יוקרה בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Villas de prestige en Israël — Herzliya Pituah, Césarée, Jérusalem (Talbieh, Colonie Allemande). Terrains larges, architecture contemporaine ou patrimoniale.',
      en: 'Luxury villas in Israel — Herzliya Pituah, Caesarea, Jerusalem (Talbiyeh, German Colony). Large lots, contemporary or heritage architecture.',
      he: 'וילות יוקרה בישראל — הרצליה פיתוח, קיסריה, ירושלים.',
    },
    h1: {
      fr: 'Villas de Prestige en Israël',
      en: 'Luxury Villas in Israel',
      he: 'וילות יוקרה בישראל',
    },
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "La villa — maison individuelle sur terrain privé — reste l'archétype du luxe en Israël. Le segment se concentre dans deux géographies principales : la côte (Herzliya Pituah, Césarée) avec ses villas contemporaines à piscine privée, et Jérusalem (Talbieh, Baka, Colonie Allemande) avec ses maisons mandataires et templières restaurées. Deux philosophies, deux profils acheteurs, mais une même rareté structurelle : l'offre est essentiellement finie, et toute nouvelle construction passe par démolition ou par les programmes contrôlés de Césarée.",
      en: 'The villa — single-family house on private land — remains the archetypal Israeli luxury asset. The segment concentrates in two main geographies: the coast (Herzliya Pituah, Caesarea) with its contemporary villas and private pools, and Jerusalem (Talbiyeh, Baka, German Colony) with its restored Mandate and Templer houses. Two philosophies, two buyer profiles, but the same structural scarcity: supply is essentially finite, and any new construction goes through teardown or the controlled Caesarea programmes.',
      he: 'הוילה — בית פרטי על קרקע פרטית — נשארת ארכיטיפ היוקרה הישראלי.',
    },
    sections: [
      {
        title: { fr: 'Villas côtières (Herzliya, Césarée)', en: 'Coastal Villas (Herzliya, Caesarea)', he: 'וילות חוף' },
        body: {
          fr: "Le segment ultra-prime : terrains de 500 à 2 500 m², villas contemporaines de 400 à 1 500 m², architecture cubique blanche, piscines privées presque universelles, jardins matures. À Herzliya Pituah, les rues Galei Tchelet et HaShunit dominent. À Césarée, les sections autour du golf et Césarée Aleph. Tarification en dollars : 5 à 50 millions selon le sous-marché.",
          en: 'The ultra-prime segment: lots of 500 to 2,500 m², contemporary villas of 400 to 1,500 m², white cubic architecture, almost-universal private pools, mature gardens. In Herzliya Pituah, Galei Tchelet and HaShunit dominate. In Caesarea, sections around the golf and Caesarea Aleph. Dollar pricing: $5M to $50M depending on submarket.',
          he: 'המקטע האולטרה-פרימיום: מגרשים של 500–2,500 מ"ר.',
        },
      },
      {
        title: { fr: 'Villas patrimoniales (Jérusalem)', en: 'Heritage Villas (Jerusalem)', he: 'וילות מורשת (ירושלים)' },
        body: {
          fr: "Une catégorie différente : maisons mandataires en pierre des années 1920-1940 à Talbieh et Réhavia, maisons templières du XIXᵉ siècle dans la Colonie Allemande et à Baka. Surfaces typiquement de 250 à 600 m² sur des terrains plus petits qu'à la côte, mais avec une profondeur patrimoniale et une appartenance architecturale qui ne se trouvent nulle part ailleurs en Israël. Les protections patrimoniales encadrent strictement les rénovations.",
          en: 'A different category: 1920s–1940s Mandate stone houses in Talbiyeh and Rehavia, 19th-century Templer houses in the German Colony and Baka. Surface typically 250 to 600 m² on smaller lots than the coast, but with heritage depth and architectural belonging found nowhere else in Israel. Heritage protections strictly govern renovations.',
          he: 'קטגוריה שונה: בתי אבן מתקופת המנדט בטלביה.',
        },
      },
      {
        title: { fr: 'Le marché de la construction sur mesure', en: 'The Custom-Build Market', he: 'שוק הבנייה המותאמת' },
        body: {
          fr: "Pour les acheteurs voulant construire leur propre villa, deux options : démolir et reconstruire à Herzliya Pituah (parcelles libres essentiellement épuisées), ou acquérir un terrain dans les nouvelles sections de Césarée à travers la Caesarea Development Corporation. C'est la seule option de construction véritablement neuve disponible en Israël aujourd'hui dans le segment ultra-prime.",
          en: 'For buyers wanting to build their own villa, two options: teardown-rebuild in Herzliya Pituah (free parcels essentially exhausted), or acquire land in newer Caesarea sections through the Caesarea Development Corporation. This is the only genuinely new construction option available in Israel today in the ultra-prime segment.',
          he: 'לקונים הרוצים לבנות וילה משלהם, שתי אפשרויות.',
        },
      },
    ],
    facts: {
      priceRange: '$3M – $50M+',
      typicalSize: { fr: '300–1 500 m²', en: '300–1,500 m²', he: '300–1,500 מ״ר' },
      bestNeighborhoods: {
        fr: 'Galei Tchelet, Nof Yam, HaShunit, Césarée Aleph, Talbieh, Baka',
        en: 'Galei Tchelet, Nof Yam, HaShunit, Caesarea Aleph, Talbiyeh, Baka',
        he: 'גלי תכלת, נוף ים, השונית, קיסריה א׳, טלביה',
      },
    },
    faq: [
      {
        q: { fr: 'Combien de temps pour trouver la bonne villa ?', en: 'How long to find the right villa?', he: 'כמה זמן לוקח למצוא וילה?' },
        a: {
          fr: 'Sur la côte (Herzliya, Césarée) : 4–9 mois pour un brief réaliste, 9–18 mois pour un actif trophée. À Jérusalem (Talbieh, Colonie Allemande) : 6–12 mois minimum, souvent à travers des introductions off-market développées sur plusieurs années.',
          en: 'Coastal (Herzliya, Caesarea): 4–9 months for a realistic brief, 9–18 months for a trophy asset. Jerusalem (Talbiyeh, German Colony): 6–12 months minimum, often through off-market introductions developed over years.',
          he: 'בחוף: 4–9 חודשים.',
        },
      },
      {
        q: { fr: 'Puis-je construire une nouvelle villa ?', en: 'Can I build a new villa?', he: 'האם אפשר לבנות וילה חדשה?' },
        a: {
          fr: 'À Herzliya Pituah uniquement par démolition-reconstruction (très contraint). À Césarée, à travers les programmes de libération de terrains, sous des directives architecturales strictes. C\'est la voie principale en 2026 pour une construction véritablement neuve.',
          en: 'Herzliya Pituah only via teardown-rebuild (very constrained). Caesarea through lot release programmes, under strict architectural guidelines. This is the main path in 2026 for genuinely new construction.',
          he: 'בהרצליה פיתוח רק על ידי הריסה ובנייה מחדש.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime', 'proprietes-off-market-israel-luxe'],
    relatedQuartiers: ['galei-tchelet', 'nof-yam', 'caesarea-aleph', 'talbieh'],
  },

  /* ────────────────────────── MAISONS MANDATAIRES */
  {
    slug: 'maisons-mandataires',
    dbTypes: ['Maison mandataire', 'Maison templière', 'Heritage', 'Mandate house'],
    names: { fr: 'Maisons Mandataires', en: 'Mandate-Era Houses', he: 'בתי תקופת המנדט' },
    tagline: {
      fr: "Le patrimoine architectural d'Israël",
      en: "Israel's architectural heritage",
      he: 'המורשת האדריכלית של ישראל',
    },
    seoTitle: {
      fr: 'Maisons Mandataires & Templières en Israël | Maison Israël',
      en: 'Mandate & Templer Heritage Houses in Israel | Maison Israël',
      he: 'בתי מנדט וטמפלרים בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Maisons mandataires (1920-1940) et templières (XIXᵉ) à Jérusalem et Tel Aviv. Talbieh, Colonie Allemande, Neve Tzedek. Patrimoine architectural protégé.",
      en: "Mandate (1920s–1940s) and Templer (19th c.) houses in Jerusalem and Tel Aviv. Talbiyeh, German Colony, Neve Tzedek. Protected architectural heritage.",
      he: 'בתי מנדט וטמפלרים בירושלים ותל אביב.',
    },
    h1: {
      fr: "Maisons Mandataires et Templières — Le patrimoine en pierre",
      en: 'Mandate and Templer Houses — Heritage in Stone',
      he: 'בתי מנדט וטמפלרים — מורשת באבן',
    },
    hero: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Les maisons mandataires et templières constituent la couche architecturale la plus rare et la plus protégée d'Israël. Construites pour la plupart entre 1870 et 1948, ces propriétés en pierre incarnent une époque où Jérusalem et Tel Aviv n'étaient pas encore les villes que nous connaissons. Aujourd'hui, elles sont classées, leur extérieur protégé, et leur turnover annuel se compte en dizaines de transactions à travers tout le pays. Pour un acheteur en quête de patrimoine, de profondeur architecturale, et d'un actif que la nouvelle construction ne peut pas répliquer, c'est la catégorie de référence.",
      en: "Mandate and Templer houses constitute the rarest and most protected architectural layer in Israel. Built mostly between 1870 and 1948, these stone properties embody an era when Jerusalem and Tel Aviv were not yet the cities we know. Today, they are listed, their exteriors protected, and their annual turnover counts in tens of transactions across the entire country. For a buyer seeking heritage, architectural depth, and an asset that new construction cannot replicate, this is the reference category.",
      he: 'בתי מנדט וטמפלרים מהווים את השכבה האדריכלית הנדירה והמוגנת ביותר בישראל.',
    },
    sections: [
      {
        title: { fr: 'Talbieh — Le quartier mandataire de référence', en: 'Talbiyeh — The Reference Mandate Quarter', he: 'טלביה — רובע המנדט של ייחוס' },
        body: {
          fr: "Construit par des familles arabes prospères entre 1920 et 1940, Talbieh à Jérusalem détient la plus grande concentration de villas mandataires intactes. Trois ou quatre étages de calcaire taillé, ferronnerie d'origine, cours intérieures, sols en mosaïque, plafonds hauts. Les rues Hovevei Zion, Disraeli, Marcus, Pinsker sont entièrement protégées. Inventaire annuel : 1–3 transactions véritablement premium.",
          en: "Built by prosperous Arab families between 1920 and 1940, Talbiyeh in Jerusalem holds the largest concentration of intact Mandate villas. Three or four storeys of cut limestone, original ironwork, interior courtyards, mosaic floors, high ceilings. Streets like Hovevei Zion, Disraeli, Marcus, and Pinsker are entirely protected. Annual inventory: 1–3 genuinely premium transactions.",
          he: 'נבנתה על ידי משפחות ערביות אמידות.',
        },
      },
      {
        title: { fr: 'La Colonie Allemande — Les maisons templières', en: 'German Colony — Templer Houses', he: 'המושבה הגרמנית — בתי הטמפלרים' },
        body: {
          fr: "Fondée en 1873 par des colons protestants allemands, la Colonie Allemande à Jérusalem conserve une cinquantaine de maisons templières authentiques. Construction en pierre, toits de tuiles inclinés, jardins clos, dimensions familiales (250-450 m²). La rue Cremieux est l'adresse la plus convoitée. Restaurations contrôlées par les autorités patrimoniales.",
          en: 'Founded in 1873 by German Protestant settlers, the German Colony in Jerusalem retains about fifty authentic Templer houses. Stone construction, pitched tile roofs, enclosed gardens, family scale (250–450 m²). Cremieux Street is the most coveted address. Renovations controlled by heritage authorities.',
          he: 'נוסדה ב-1873 על ידי מתיישבים פרוטסטנטים גרמנים.',
        },
      },
      {
        title: { fr: 'Neve Tzedek et Jaffa', en: 'Neve Tzedek and Jaffa', he: 'נווה צדק ויפו' },
        body: {
          fr: "À Tel Aviv, les maisons templières et arabes pré-1900 se concentrent à Neve Tzedek (le premier quartier juif hors des murs de Jaffa, fondé en 1887) et dans la Vieille Jaffa. Petites en surface (90-280 m²), souvent imbriquées dans des îlots restaurés, avec un caractère méditerranéen distinct du calcaire jérusalémite. Le sous-marché le plus distinctif de Tel Aviv.",
          en: "In Tel Aviv, pre-1900 Templer and Arab houses concentrate in Neve Tzedek (the first Jewish neighbourhood outside the walls of Jaffa, founded in 1887) and in Old Jaffa. Small in surface (90–280 m²), often interlocked in restored blocks, with a Mediterranean character distinct from Jerusalem limestone. Tel Aviv's most distinctive submarket.",
          he: 'בתל אביב, הבתים הטמפלרים והערביים מרוכזים בנווה צדק.',
        },
      },
      {
        title: { fr: 'Acheter une maison patrimoniale', en: 'Buying a Heritage House', he: 'רכישת בית מורשת' },
        body: {
          fr: "Trois considérations particulières : (1) l'état structurel doit être évalué par un architecte spécialisé patrimoine — les ravalements coûtent 30-50 % de plus qu'une construction neuve équivalente ; (2) les rénovations intérieures sont possibles mais encadrées (volumes, ouvertures, matériaux) ; (3) la chaîne de titre peut être complexe sur les propriétés issues de successions arabes pré-1948, à traiter par un avocat spécialisé.",
          en: 'Three particular considerations: (1) structural state must be assessed by a heritage-specialist architect — restorations cost 30–50% more than equivalent new construction; (2) interior renovations are possible but governed (volumes, openings, materials); (3) the title chain can be complex on properties from pre-1948 Arab estates, to be handled by a specialised lawyer.',
          he: 'שלוש שיקולים מיוחדים.',
        },
      },
    ],
    facts: {
      priceRange: '$2.5M – $30M',
      typicalSize: { fr: '90–600 m²', en: '90–600 m²', he: '90–600 מ״ר' },
      bestNeighborhoods: {
        fr: 'Talbieh, Colonie Allemande, Yemin Moshe, Neve Tzedek, Jaffa, Baka',
        en: 'Talbiyeh, German Colony, Yemin Moshe, Neve Tzedek, Jaffa, Baka',
        he: 'טלביה, המושבה הגרמנית, ימין משה, נווה צדק',
      },
    },
    faq: [
      {
        q: { fr: 'Les maisons mandataires gardent-elles leur valeur ?', en: 'Do Mandate houses hold value?', he: 'האם בתי המנדט שומרים על ערכם?' },
        a: {
          fr: 'Mieux que toute autre catégorie. La rareté structurelle, les protections patrimoniales, et la profondeur de la demande internationale créent une dynamique de prix particulièrement stable. Les transactions à Talbieh sur 20 ans montrent une appréciation moyenne supérieure à 6 % par an, avec une volatilité minimale.',
          en: 'Better than any other category. Structural scarcity, heritage protections, and depth of international demand create a particularly stable price dynamic. Talbiyeh transactions over 20 years show average appreciation above 6% annually with minimal volatility.',
          he: 'טוב יותר מכל קטגוריה אחרת.',
        },
      },
      {
        q: { fr: 'Quel est le budget rénovation typique ?', en: 'What is the typical renovation budget?', he: 'מהו תקציב השיפוץ הטיפוסי?' },
        a: {
          fr: "Pour une maison mandataire à Talbieh ou Colonie Allemande nécessitant restauration complète : 1 à 3 millions de NIS par 100 m² selon la profondeur de l'intervention. Un cabinet d'architectes spécialisé patrimoine est indispensable. Comptez 12-24 mois de travaux.",
          en: 'For a Mandate house in Talbiyeh or German Colony requiring full restoration: 1 to 3 million NIS per 100 m² depending on intervention depth. A heritage-specialist architecture firm is essential. Plan 12–24 months of works.',
          he: '1–3 מיליון ₪ ל-100 מ"ר.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem', 'investisseurs-internationaux-jerusalem-immobilier-luxe'],
    relatedQuartiers: ['talbieh', 'colonie-allemande', 'neve-tzedek', 'yemin-moshe'],
  },

  /* ────────────────────────── BORD DE MER */
  {
    slug: 'bord-de-mer',
    dbTypes: ['Bord de mer', 'Seafront', 'Sea view', 'Front de mer'],
    names: { fr: 'Propriétés Bord de Mer', en: 'Seafront Properties', he: 'נכסי חוף ים' },
    tagline: {
      fr: 'La Méditerranée comme vue principale',
      en: 'The Mediterranean as the main view',
      he: 'הים התיכון כנוף ראשי',
    },
    seoTitle: {
      fr: 'Immobilier Bord de Mer en Israël — Tel Aviv, Herzliya | Maison Israël',
      en: 'Seafront Real Estate in Israel — Tel Aviv, Herzliya | Maison Israël',
      he: 'נדל"ן חוף ים בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Propriétés bord de mer en Israël — Herzliya Pituah (Galei Tchelet), front de mer Tel Aviv, Césarée. Penthouses et villas avec vue mer panoramique.',
      en: 'Seafront properties in Israel — Herzliya Pituah (Galei Tchelet), Tel Aviv seafront, Caesarea. Penthouses and villas with panoramic sea views.',
      he: 'נכסי חוף ים בישראל — הרצליה פיתוח, חוף תל אביב, קיסריה.',
    },
    h1: {
      fr: 'Propriétés Bord de Mer en Israël',
      en: 'Seafront Properties in Israel',
      he: 'נכסי חוף ים בישראל',
    },
    hero: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Israël a 273 kilomètres de côte méditerranéenne, mais le frontage premium se réduit à trois sous-marchés : Herzliya Pituah (Galei Tchelet et son extension nord), le front de mer Tel Aviv (Hayarkon et Herbert Samuel), et Césarée (Aleph et son ouverture sur la mer). Au-delà de ces trois géographies, la côte ne porte pas de marché luxe au sens strict. Pour les acheteurs internationaux dont la vue mer est la proposition principale, l'inventaire pertinent est étroit, étroitement détenu, et largement off-market.",
      en: 'Israel has 273 kilometres of Mediterranean coast, but premium frontage narrows to three submarkets: Herzliya Pituah (Galei Tchelet and its northern extension), the Tel Aviv seafront (Hayarkon and Herbert Samuel), and Caesarea (Aleph and its sea opening). Beyond these three geographies, the coast does not carry a luxury market in the strict sense. For international buyers for whom the sea view is the central proposition, relevant inventory is narrow, tightly held, and largely off-market.',
      he: 'לישראל יש 273 קילומטרים של חוף ים תיכוני, אבל החזית הפרמיום מצטמצמת לשלושה תת-שווקים.',
    },
    sections: [
      {
        title: { fr: 'Herzliya Pituah — Le frontage absolu', en: 'Herzliya Pituah — The Absolute Frontage', he: 'הרצליה פיתוח — החזית המוחלטת' },
        body: {
          fr: "La rue Galei Tchelet, avec une douzaine de villas ayant accès direct à la mer, détient le sommet absolu du marché immobilier israélien. Tarification en dollars de 20 à 50+ millions. Les rues immédiatement parallèles (Wingate, HaShunit) offrent des vues mer depuis les étages supérieurs sans le frontage direct, à des tarifications nettement plus accessibles (8 à 18 millions de dollars).",
          en: "Galei Tchelet street, with a dozen villas offering direct sea access, holds the absolute top of the Israeli real estate market. Dollar pricing of $20–50M+. Immediately parallel streets (Wingate, HaShunit) offer sea views from upper floors without direct frontage, at notably more accessible pricing ($8–18M).",
          he: 'רחוב גלי תכלת, עם תריסר וילות עם גישה ישירה לים.',
        },
      },
      {
        title: { fr: 'Front de mer Tel Aviv', en: 'Tel Aviv Seafront', he: 'חוף הים של תל אביב' },
        body: {
          fr: "La bande Hayarkon et Herbert Samuel constitue le sous-marché urbain de bord de mer. Produit principalement vertical : penthouses dans les nouvelles boutiques (David Promenade, Hayarkon 96), grands appartements dans les immeubles plus anciens en cours de redéveloppement. Tarification : 100 000 à 180 000 NIS/m² pour les étages premium. Liquidité de location courte-durée la plus forte du pays.",
          en: 'The Hayarkon and Herbert Samuel strip constitutes the urban seafront submarket. Mostly vertical product: penthouses in new boutique buildings (David Promenade, Hayarkon 96), large apartments in older buildings undergoing redevelopment. Pricing: 100,000 to 180,000 NIS/m² for premium floors. Highest short-term rental liquidity in the country.',
          he: 'רצועת הירקון והרברט סמואל מהווה את התת-שוק העירוני של חוף הים.',
        },
      },
      {
        title: { fr: 'Césarée — Le luxe horizontal côtier', en: 'Caesarea — Horizontal Coastal Luxury', he: 'קיסריה — יוקרת חוף אופקית' },
        body: {
          fr: "Césarée Aleph compte plusieurs rues avec vue mer directe ou semi-directe, avec une typologie radicalement différente des autres sous-marchés côtiers : villas individuelles, grands terrains, faible densité, environnement de golf. Pour les acheteurs voulant le frontage mer sans la densité urbaine de Tel Aviv, ni la concentration sociale de Galei Tchelet, c'est le seul équivalent en Israël.",
          en: "Caesarea Aleph has several streets with direct or semi-direct sea views, with a radically different typology from other coastal submarkets: individual villas, large lots, low density, golf environment. For buyers wanting sea frontage without the urban density of Tel Aviv or the social concentration of Galei Tchelet, this is the only equivalent in Israel.",
          he: 'קיסריה א׳ כוללת מספר רחובות עם נוף לים ישיר.',
        },
      },
    ],
    facts: {
      priceRange: '$5M – $50M+',
      typicalSize: { fr: '180–1 500 m²', en: '180–1,500 m²', he: '180–1,500 מ״ר' },
      bestNeighborhoods: {
        fr: 'Galei Tchelet, Tel Aviv front de mer (Hayarkon), Césarée Aleph bord de mer',
        en: 'Galei Tchelet, Tel Aviv seafront (Hayarkon), Caesarea Aleph seafront',
        he: 'גלי תכלת, חוף תל אביב, קיסריה א׳',
      },
    },
    faq: [
      {
        q: { fr: 'Quelle est la différence de prix entre vue mer directe et vue mer latérale ?', en: 'Direct vs lateral sea view price difference?', he: 'הפרש מחיר בין נוף ישיר ללטרלי?' },
        a: {
          fr: "À Tel Aviv et Herzliya Pituah, le frontage mer direct commande une prime de 40 à 80 % par rapport à un bien équivalent avec vue mer latérale ou partielle. C'est l'un des écarts de prix les plus importants du marché.",
          en: 'In Tel Aviv and Herzliya Pituah, direct sea frontage commands a 40 to 80% premium over an equivalent property with lateral or partial sea view. One of the largest price gaps in the market.',
          he: 'בתל אביב ובהרצליה פיתוח, חזית ים ישירה גובה פרמיה של 40%–80%.',
        },
      },
      {
        q: { fr: 'Les locations courtes sont-elles autorisées sur le front de mer ?', en: 'Are short rentals allowed on the seafront?', he: 'האם השכרות קצרות מותרות בחוף?' },
        a: {
          fr: 'À Tel Aviv, oui dans la plupart des cas — c\'est même un facteur de prix. À Herzliya Pituah et Césarée, beaucoup de copropriétés et règlements de quartier restreignent ou interdisent les locations courtes pour préserver le caractère résidentiel.',
          en: 'In Tel Aviv, yes in most cases — it is even a price factor. In Herzliya Pituah and Caesarea, many HOAs and neighbourhood regulations restrict or prohibit short rentals to preserve residential character.',
          he: 'בתל אביב, כן ברוב המקרים.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime', 'meilleurs-quartiers-luxe-tel-aviv'],
    relatedQuartiers: ['galei-tchelet', 'caesarea-aleph', 'nof-yam'],
  },
]

export function getPropertyTypeBySlug(slug: string): PropertyType | undefined {
  return PROPERTY_TYPES.find((p) => p.slug === slug)
}
