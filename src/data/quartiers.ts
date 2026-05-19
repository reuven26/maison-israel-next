/* ─────────────────────────────────────────────────────────
   QUARTIERS — Neighborhood landing pages
   Each page is a dedicated SEO asset targeting specific
   high-intent queries (e.g. "appartement Neve Tzedek").
   ───────────────────────────────────────────────────────── */

export interface Quartier {
  slug: string                                  // /quartiers/[city]/[slug]
  city: 'jerusalem' | 'tel-aviv' | 'herzliya-pituah' | 'caesarea'
  dbVille: string                               // matches biens.ville in Supabase
  dbQuartier?: string                           // matches biens.quartier (optional filter)

  names: { fr: string; en: string; he: string }
  tagline: { fr: string; en: string; he: string }    // short subtitle

  seoTitle: { fr: string; en: string; he: string }
  metaDescription: { fr: string; en: string; he: string }
  h1: { fr: string; en: string; he: string }

  hero: string                                  // hero image URL

  intro: { fr: string; en: string; he: string }
  sections: {
    title: { fr: string; en: string; he: string }
    body: { fr: string; en: string; he: string }
  }[]

  facts: {
    priceRange: string                          // "80,000–130,000 NIS/m²"
    typicalSize: { fr: string; en: string; he: string }
    architecture: { fr: string; en: string; he: string }
    buyerProfile: { fr: string; en: string; he: string }
  }

  adjacent: string[]                            // other quartier slugs
  faq: { q: { fr: string; en: string; he: string }; a: { fr: string; en: string; he: string } }[]
  relatedArticles?: string[]                    // journal slugs
}

export const QUARTIERS: Quartier[] = [
  /* ────────────────────────── TALBIEH (Jerusalem) */
  {
    slug: 'talbieh',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Talbiyeh',
    names: { fr: 'Talbieh', en: 'Talbiyeh', he: 'טלביה' },
    tagline: {
      fr: 'Le quartier le plus discret de Jérusalem',
      en: "Jerusalem's most discreet address",
      he: 'הכתובת הדיסקרטית ביותר של ירושלים',
    },
    seoTitle: {
      fr: 'Talbieh, Jérusalem — Immobilier de Prestige | Maison Israël',
      en: 'Talbiyeh, Jerusalem — Luxury Real Estate | Maison Israël',
      he: 'טלביה, ירושלים — נדל"ן יוקרה | מייזון ישראל',
    },
    metaDescription: {
      fr: "Talbieh, le quartier diplomatique et intellectuel de Jérusalem. Villas mandataires en pierre, rues protégées, transactions discrètes. Inventaire premium.",
      en: "Talbiyeh, Jerusalem's diplomatic and intellectual quarter. Mandate-era stone villas, protected streets, discreet transactions. Curated premium inventory.",
      he: 'טלביה, הרובע הדיפלומטי והאינטלקטואלי של ירושלים. וילות אבן מתקופת המנדט, רחובות מוגנים.',
    },
    h1: {
      fr: 'Talbieh — Le cœur historique du Jérusalem premium',
      en: 'Talbiyeh — The Historic Heart of Premium Jerusalem',
      he: 'טלביה — הלב ההיסטורי של ירושלים הפרמיום',
    },
    hero: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Construit largement entre les années 1920 et 1940 par de riches familles arabes et hérité plus tard comme le cœur résidentiel de la communauté diplomatique et intellectuelle internationale, Talbieh détient aujourd'hui les transactions au mètre carré les plus élevées de Jérusalem.",
      en: 'Built largely between the 1920s and 1940s by wealthy Arab families and later inherited as the residential heart of the international diplomatic and intellectual community, Talbiyeh today holds the highest per-square-metre transactions in Jerusalem.',
      he: 'נבנתה בעיקר בין שנות ה-20 ל-40 על ידי משפחות ערביות אמידות, וירושה מאוחר יותר כלב המגורים של הקהילה הדיפלומטית והאינטלקטואלית הבינלאומית.',
    },
    sections: [
      {
        title: { fr: "L'architecture", en: 'Architecture', he: 'אדריכלות' },
        body: {
          fr: "Villas mandataires de trois et quatre étages en calcaire taillé, souvent avec ferronnerie d'origine et cours intérieures. Des rues comme Hovevei Zion, Disraeli, Marcus et Pinsker sont protégées comme zone patrimoniale, ce qui signifie que les rénovations sont étroitement contrôlées mais les valeurs de revente sont correspondamment isolées.",
          en: "Three- and four-storey Mandate villas of cut limestone, often with original ironwork and interior courtyards. Streets like Hovevei Zion, Disraeli, Marcus, and Pinsker are protected as a heritage zone, which means renovations are tightly controlled but resale values are correspondingly insulated.",
          he: 'וילות מתקופת המנדט בנות שלוש וארבע קומות מאבן גיר חצובה, לעיתים קרובות עם עבודות ברזל מקוריות וחצרות פנימיות.',
        },
      },
      {
        title: { fr: 'Le profil acheteur', en: 'The Buyer Profile', he: 'פרופיל הקונה' },
        body: {
          fr: "Talbieh convient aux acheteurs qui veulent des rues calmes et matures, à distance de marche de la Résidence du Président et de la Vieille Ville, et un quartier où l'ostentation est considérée comme une taxe sur le goût. L'inventaire est mince et presque entièrement off-market.",
          en: "Talbiyeh suits buyers who want quiet, mature streets, walking distance to the President's Residence and the Old City, and a neighbourhood where ostentation is considered a tax on taste. Inventory is thin and almost entirely off-market.",
          he: 'טלביה מתאימה לקונים שרוצים רחובות שקטים ובוגרים, במרחק הליכה ממעון הנשיא והעיר העתיקה.',
        },
      },
      {
        title: { fr: 'Pourquoi Talbieh maintenant', en: 'Why Talbiyeh Now', he: 'מדוע טלביה עכשיו' },
        body: {
          fr: "Le pipeline de propriétés véritablement premium à Talbieh s'amincit. Les protections patrimoniales empêchent toute nouvelle construction significative, et la rotation des familles propriétaires de longue date est lente. Pour les acheteurs avec un horizon générationnel — particulièrement ceux planifiant une aliyah — la rareté structurelle est la thèse d'investissement.",
          en: "The pipeline of genuinely prime Talbiyeh properties is thinning. Heritage protections prevent any significant new construction, and turnover among long-tenured families is slow. For buyers with a generational horizon — particularly those planning aliyah — structural scarcity is the investment thesis.",
          he: 'הצינור של נכסים פרמיום אמיתיים בטלביה מתדלדל. הגנות המורשת מונעות בנייה חדשה משמעותית.',
        },
      },
    ],
    facts: {
      priceRange: '60,000–95,000 ₪/m²',
      typicalSize: {
        fr: '180–450 m²',
        en: '180–450 m²',
        he: '180–450 מ״ר',
      },
      architecture: {
        fr: 'Villas mandataires en pierre, 1920-1940',
        en: 'Mandate-era stone villas, 1920s–1940s',
        he: 'וילות אבן מתקופת המנדט',
      },
      buyerProfile: {
        fr: 'Diplomates, family offices, héritage générationnel',
        en: 'Diplomats, family offices, generational wealth',
        he: 'דיפלומטים, family offices',
      },
    },
    adjacent: ['rehavia', 'colonie-allemande', 'yemin-moshe'],
    faq: [
      {
        q: { fr: 'Pourquoi Talbieh est-il si recherché ?', en: 'Why is Talbiyeh so coveted?', he: 'מדוע טלביה כל כך מבוקשת?' },
        a: {
          fr: "La combinaison d'architecture mandataire authentique, de protections patrimoniales strictes limitant l'offre, et de la proximité de la Vieille Ville et de la Résidence du Président.",
          en: 'The combination of authentic Mandate architecture, strict heritage protections limiting supply, and proximity to the Old City and the President\'s Residence.',
          he: 'השילוב של אדריכלות מנדט אותנטית, הגנות מורשת מחמירות, וקרבה לעיר העתיקה.',
        },
      },
      {
        q: { fr: 'Y a-t-il des restrictions de rénovation ?', en: 'Are there renovation restrictions?', he: 'האם יש מגבלות שיפוץ?' },
        a: {
          fr: 'Oui. Les façades en pierre, les éléments d\'origine et les volumes extérieurs sont protégés. Les rénovations intérieures sont possibles dans des limites définies, généralement avec un architecte spécialisé en patrimoine.',
          en: 'Yes. Stone façades, original elements, and exterior volumes are protected. Interior renovations are possible within defined limits, typically with a heritage-specialist architect.',
          he: 'כן. חזיתות אבן, אלמנטים מקוריים, ונפחים חיצוניים מוגנים.',
        },
      },
      {
        q: { fr: 'Le marché est-il off-market ?', en: 'Is the market off-market?', he: 'האם השוק מחוץ-לשוק?' },
        a: {
          fr: 'Majoritairement. La plupart des transactions premium à Talbieh se déroulent par introduction privée. Les annonces publiques représentent typiquement le segment inférieur ou des propriétés sur le marché depuis longtemps.',
          en: 'Predominantly. Most premium Talbiyeh transactions happen through private introduction. Public listings typically represent the lower segment or properties long on market.',
          he: 'בעיקר. רוב העסקאות בטלביה מתבצעות בהיכרות פרטית.',
        },
      },
    ],
    relatedArticles: ['investisseurs-internationaux-jerusalem-immobilier-luxe', 'meilleurs-quartiers-luxe-jerusalem'],
  },

  /* ────────────────────────── REHAVIA (Jerusalem) */
  {
    slug: 'rehavia',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Réhavia',
    names: { fr: 'Réhavia', en: 'Rehavia', he: 'רחביה' },
    tagline: {
      fr: 'Le Jérusalem des intellectuels',
      en: "Jerusalem's intellectual heart",
      he: 'הלב האינטלקטואלי של ירושלים',
    },
    seoTitle: {
      fr: 'Réhavia, Jérusalem — Appartements de Prestige | Maison Israël',
      en: 'Rehavia, Jerusalem — Premium Apartments | Maison Israël',
      he: 'רחביה, ירושלים — דירות יוקרה | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Réhavia, le quartier verdoyant des juges, écrivains et diplomates de Jérusalem. Bauhaus restauré, rues bordées d\'arbres, centralité parfaite.',
      en: "Rehavia, Jerusalem's leafy neighbourhood of judges, writers and diplomats. Restored Bauhaus, tree-lined streets, perfect centrality.",
      he: 'רחביה, השכונה הירוקה של ירושלים. באוהאוס משוחזר, רחובות עם עצים, מרכזיות מושלמת.',
    },
    h1: {
      fr: 'Réhavia — Élégance résidentielle au cœur de Jérusalem',
      en: 'Rehavia — Residential Elegance in Central Jerusalem',
      he: 'רחביה — אלגנטיות מגורים בלב ירושלים',
    },
    hero: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Réhavia est ce qu'un étranger imagine souvent en pensant à la Jérusalem résidentielle : rues bordées d'arbres tracées dans les années 1920, immeubles d'appartements Bauhaus et de style International, cafés jardin, et une population qui va des juges de la Cour suprême aux écrivains émigrés.",
      en: 'Rehavia is what an outsider often pictures when imagining residential Jerusalem: tree-lined streets laid out in the 1920s, Bauhaus and International Style apartment blocks, garden cafés, and a population that ranges from supreme court justices to émigré writers.',
      he: 'רחביה היא מה שאדם זר מדמיין לעיתים קרובות כשחושב על ירושלים המגורים: רחובות עם עצים, בנייני באוהאוס.',
    },
    sections: [
      {
        title: { fr: "L'avantage de la centralité", en: 'The Centrality Advantage', he: 'יתרון המרכזיות' },
        body: {
          fr: "Réhavia est plus piétonnier que Talbieh et considérablement plus social. Pour les familles avec des enfants d'âge scolaire, la localisation centrale et la densité éducative (Université hébraïque, Gymnasia) est un avantage significatif.",
          en: 'Rehavia is more walkable than Talbiyeh and considerably more social. For families with school-age children, the central location and educational density (Hebrew University, Gymnasia) is a meaningful advantage.',
          he: 'רחביה הולכת רגל יותר מטלביה ויותר חברתית. למשפחות עם ילדים בגיל בית ספר, המיקום המרכזי הוא יתרון משמעותי.',
        },
      },
      {
        title: { fr: "L'architecture Bauhaus", en: 'Bauhaus Architecture', he: 'אדריכלות באוהאוס' },
        body: {
          fr: "Le compromis avec Talbieh est que certains des bâtiments originaux nécessitent un travail significatif. Le marché ici est plus segmenté — un appartement Bauhaus de 200 m² magnifiquement restauré sur Ben Maïmon se négociera bien au-dessus d'un équivalent non restauré à deux rues de là.",
          en: 'The trade-off with Talbiyeh is that some of the original buildings need significant work. The market here is more segmented — a beautifully restored 200 m² Bauhaus apartment on Ben Maimon will trade well above an unrestored equivalent two streets away.',
          he: 'הפשרה היא שחלק מהבניינים המקוריים צריכים עבודה משמעותית.',
        },
      },
    ],
    facts: {
      priceRange: '45,000–75,000 ₪/m²',
      typicalSize: { fr: '120–280 m²', en: '120–280 m²', he: '120–280 מ״ר' },
      architecture: { fr: 'Bauhaus & Style International, 1920-1950', en: 'Bauhaus & International Style, 1920s–1950s', he: 'באוהאוס וסגנון בינלאומי' },
      buyerProfile: { fr: 'Familles, professionnels, acheteurs aliyah', en: 'Families, professionals, aliyah buyers', he: 'משפחות, אנשי מקצוע' },
    },
    adjacent: ['talbieh', 'colonie-allemande'],
    faq: [
      {
        q: { fr: 'Réhavia ou Talbieh ?', en: 'Rehavia or Talbiyeh?', he: 'רחביה או טלביה?' },
        a: {
          fr: 'Talbieh pour la rareté patrimoniale et la discrétion absolue. Réhavia pour la vie quotidienne, la marche, et les écoles. Beaucoup de familles internationales avec enfants choisissent Réhavia.',
          en: 'Talbiyeh for heritage scarcity and absolute discretion. Rehavia for daily life, walkability, and schools. Many international families with children choose Rehavia.',
          he: 'טלביה לנדירות מורשת. רחביה לחיי יומיום ובתי ספר.',
        },
      },
      {
        q: { fr: 'Le marché locatif de Réhavia est-il actif ?', en: 'Is Rehavia\'s rental market active?', he: 'האם שוק השכירות פעיל?' },
        a: {
          fr: "Oui, particulièrement pour les baux longs aux universitaires et professionnels. Les rendements bruts sont typiquement de 2,5–3,5 %.",
          en: 'Yes, particularly for long leases to academics and professionals. Gross yields typically run 2.5–3.5%.',
          he: 'כן, במיוחד להשכרה ארוכת טווח לאקדמאים ואנשי מקצוע.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem', 'investisseurs-internationaux-jerusalem-immobilier-luxe'],
  },

  /* ────────────────────────── NEVE TZEDEK (Tel Aviv) */
  {
    slug: 'neve-tzedek',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Neve Tzedek',
    names: { fr: 'Neve Tzedek', en: 'Neve Tzedek', he: 'נווה צדק' },
    tagline: {
      fr: 'Le premier quartier de Tel Aviv',
      en: "Tel Aviv's first neighborhood",
      he: 'השכונה הראשונה של תל אביב',
    },
    seoTitle: {
      fr: 'Neve Tzedek, Tel Aviv — Maisons et Appartements | Maison Israël',
      en: 'Neve Tzedek, Tel Aviv — Houses & Apartments | Maison Israël',
      he: 'נווה צדק, תל אביב — בתים ודירות | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Neve Tzedek — le quartier le plus distinctif de Tel Aviv. Maisons en pierre du XIXᵉ siècle, ruelles colorées, galeries d\'art. Inventaire curaté.',
      en: 'Neve Tzedek — Tel Aviv\'s most distinctive neighborhood. 19th-century stone houses, colorful lanes, art galleries. Curated inventory.',
      he: 'נווה צדק — השכונה המובחנת ביותר של תל אביב. בתי אבן מהמאה ה-19.',
    },
    h1: {
      fr: 'Neve Tzedek — Le quartier le plus distinctif de Tel Aviv',
      en: 'Neve Tzedek — Tel Aviv\'s Most Distinctive Quarter',
      he: 'נווה צדק — השכונה המובחנת ביותר של תל אביב',
    },
    hero: 'https://images.unsplash.com/photo-1544531586-fbb6cf2ef642?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Neve Tzedek fut le premier quartier juif construit hors des murs de Jaffa, fondé en 1887. Sa redécouverte à la fin des années 1990, et sa lente restauration depuis, a produit ce qui est maintenant le sous-marché de luxe le plus distinctif de la ville.",
      en: 'Neve Tzedek was the first Jewish neighbourhood built outside the walls of Jaffa, founded in 1887. Its rediscovery in the late 1990s, and its slow restoration since, has produced what is now the most distinctive luxury submarket in the city.',
      he: 'נווה צדק הייתה השכונה היהודית הראשונה שנבנתה מחוץ לחומות יפו, שנוסדה ב-1887.',
    },
    sections: [
      {
        title: { fr: 'Architecture intime', en: 'Intimate Architecture', he: 'אדריכלות אינטימית' },
        body: {
          fr: "L'architecture est petite. Maisons en pierre de deux et trois étages avec toits de tuiles inclinés, rues étroites, cours intérieures, et le genre de patine qui ne peut être fabriquée. Il n'y a pas de tours. Il n'y a pas de boulevard. Le quartier est marchable d'un bout à l'autre en quinze minutes.",
          en: 'The architecture is small. Two- and three-storey stone houses with pitched tile roofs, narrow streets, internal courtyards, and the kind of patina that cannot be manufactured. There are no towers. There is no boulevard. The neighbourhood is walkable end-to-end in fifteen minutes.',
          he: 'האדריכלות קטנה. בתי אבן בני שתיים ושלוש קומות עם גגות רעפים משופעים.',
        },
      },
      {
        title: { fr: 'Un marché d\'art, pas un marché de rendement', en: 'An Art Market, Not a Yield Market', he: 'שוק אמנות, לא שוק תשואה' },
        body: {
          fr: "Les acheteurs ici sont principalement internationaux — français, américains, britanniques — et tendent à acquérir une résidence principale ou un pied-à-terre significatif plutôt qu'un investissement. Les propriétés sont trop petites en nombre et trop spécifiques en caractère pour fonctionner comme un marché de rendement. Elles fonctionnent comme un marché d'art.",
          en: 'Buyers here are predominantly international — French, American, British — and tend to be acquiring a primary or significant pied-à-terre rather than an investment. The properties are too small in number and too specific in character to function as a yield market. They function as an art market.',
          he: 'הקונים כאן בעיקר בינלאומיים — צרפתים, אמריקאים, בריטים — ונוטים לרכוש מגורים ראשיים או פיד-א-טר משמעותי.',
        },
      },
    ],
    facts: {
      priceRange: '80,000–130,000 ₪/m²',
      typicalSize: { fr: '90–280 m²', en: '90–280 m²', he: '90–280 מ״ר' },
      architecture: { fr: 'Maisons en pierre, fin XIXᵉ siècle', en: 'Stone houses, late 19th century', he: 'בתי אבן מסוף המאה ה-19' },
      buyerProfile: { fr: 'Acheteurs internationaux, collectionneurs', en: 'International buyers, collectors', he: 'קונים בינלאומיים, אספנים' },
    },
    adjacent: ['rothschild', 'jaffa'],
    faq: [
      {
        q: { fr: 'Pourquoi Neve Tzedek est-il si cher ?', en: 'Why is Neve Tzedek so expensive?', he: 'מדוע נווה צדק כל כך יקרה?' },
        a: {
          fr: "L'offre est sévèrement limitée — environ 200 propriétés de premier ordre au total, dans un quartier protégé sans construction nouvelle possible. La demande internationale est continue.",
          en: 'Supply is severely limited — approximately 200 prime properties total, in a protected neighbourhood with no new construction possible. International demand is continuous.',
          he: 'ההיצע מוגבל חמור — כ-200 נכסים פרמיום בסך הכל, בשכונה מוגנת ללא בנייה חדשה.',
        },
      },
      {
        q: { fr: 'Est-ce un bon quartier pour la location courte ?', en: 'Is it good for short-term rental?', he: 'האם זה טוב להשכרה קצרת טווח?' },
        a: {
          fr: "Oui, mais les rendements totaux restent modestes en raison du prix d'entrée élevé. C'est un actif de détention, pas de yield.",
          en: 'Yes, but total yields remain modest due to the high entry price. This is a holding asset, not a yield play.',
          he: 'כן, אך תשואות נשארות צנועות בשל מחיר הכניסה הגבוה.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv', 'tel-aviv-vs-jerusalem-investissement'],
  },

  /* ────────────────────────── ROTHSCHILD (Tel Aviv) */
  {
    slug: 'rothschild',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Rothschild',
    names: { fr: 'Boulevard Rothschild', en: 'Rothschild Boulevard', he: 'שדרות רוטשילד' },
    tagline: {
      fr: "L'adresse canonique de Tel Aviv",
      en: "Tel Aviv's canonical address",
      he: 'הכתובת הקנונית של תל אביב',
    },
    seoTitle: {
      fr: 'Boulevard Rothschild, Tel Aviv — Bauhaus de Prestige | Maison Israël',
      en: 'Rothschild Boulevard, Tel Aviv — Premium Bauhaus | Maison Israël',
      he: 'שדרות רוטשילד, תל אביב — באוהאוס יוקרה | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Boulevard Rothschild — le cœur Bauhaus de Tel Aviv. Immeubles classés UNESCO, restaurations haut de gamme, marché locatif profond.',
      en: 'Rothschild Boulevard — Tel Aviv\'s Bauhaus heart. UNESCO-listed buildings, premium restorations, deep rental market.',
      he: 'שדרות רוטשילד — לב הבאוהאוס של תל אביב. בניינים מוכרי אונסק"ו.',
    },
    h1: {
      fr: 'Boulevard Rothschild — Le Bauhaus au sommet du marché',
      en: 'Rothschild Boulevard — Bauhaus at the Top of the Market',
      he: 'שדרות רוטשילד — באוהאוס בפסגת השוק',
    },
    hero: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Rothschild est la colonne vertébrale du Bauhaus de Tel Aviv et l'adresse canonique la plus proche que la ville possède. Le boulevard lui-même est large, bordé d'arbres, et nervuré par les immeubles d'appartements Modernistes blancs qui ont valu à la ville sa désignation UNESCO de Ville Blanche.",
      en: "Rothschild is the spine of Bauhaus Tel Aviv and the closest the city has to a single canonical address. The boulevard itself is wide, tree-lined, and ribbed with the white Modernist apartment buildings that earned the city its UNESCO designation as the White City.",
      he: 'רוטשילד היא עמוד השדרה של תל אביב הבאוהאוסית והכתובת הקנונית הקרובה ביותר שיש לעיר.',
    },
    sections: [
      {
        title: { fr: 'La restauration comme produit', en: 'Restoration as Product', he: 'שיחזור כמוצר' },
        body: {
          fr: "L'architecture a été cataloguée, protégée et — dans les meilleurs cas — méticuleusement restaurée. Les immeubles véritablement premium sur Rothschild offrent un produit particulier : des extérieurs Bauhaus des années 1930 avec des intérieurs entièrement contemporains, souvent obtenus par des programmes de rénovation profonds qui ont pris des années.",
          en: 'The architecture has been catalogued, protected, and — in the better cases — meticulously restored. Genuinely prime buildings on Rothschild offer a particular product: 1930s Bauhaus exteriors with completely contemporary interiors, often achieved through deep renovation programmes that took years.',
          he: 'האדריכלות נרשמה, הוגנה, ובמקרים הטובים יותר — שוחזרה בקפדנות.',
        },
      },
      {
        title: { fr: 'La base d\'acheteurs', en: 'The Buyer Base', he: 'בסיס הקונים' },
        body: {
          fr: "La base d'acheteurs de Rothschild est la plus cosmopolite de Tel Aviv. Finance internationale, fondateurs technologiques, collectionneurs d'art, et le niveau supérieur de la classe professionnelle israélienne sont tous présents. Le marché locatif est profond, tant pour les baux longs que pour le haut de gamme du marché à court terme.",
          en: "Rothschild's buyer base is the most cosmopolitan in Tel Aviv. International finance, technology founders, art collectors, and the senior tier of the Israeli professional class are all present. The rental market is deep, both for long lets and for the upper end of the short-term market.",
          he: 'בסיס הקונים של רוטשילד הוא הקוסמופוליטי ביותר בתל אביב.',
        },
      },
    ],
    facts: {
      priceRange: '75,000–120,000 ₪/m²',
      typicalSize: { fr: '90–300 m²', en: '90–300 m²', he: '90–300 מ״ר' },
      architecture: { fr: 'Bauhaus 1930s, restauré', en: 'Bauhaus 1930s, restored', he: 'באוהאוס 1930, משוחזר' },
      buyerProfile: { fr: 'Finance, tech, collectionneurs', en: 'Finance, tech, collectors', he: 'פיננסים, טק, אספנים' },
    },
    adjacent: ['neve-tzedek', 'old-north'],
    faq: [
      {
        q: { fr: 'Quel est le rendement locatif typique ?', en: 'What is the typical rental yield?', he: 'מהי תשואת השכירות הטיפוסית?' },
        a: {
          fr: 'Les baux longs rapportent typiquement 3,0–3,8 % brut sur Rothschild. Les courts termes peuvent atteindre 5–6 % brut sur les unités bien gérées, mais avec plus de variance saisonnière.',
          en: 'Long lets typically yield 3.0–3.8% gross on Rothschild. Short-term can reach 5–6% gross on well-managed units, but with more seasonal variance.',
          he: 'השכרה ארוכה מניבה בדרך כלל 3.0%-3.8% ברוטו על רוטשילד.',
        },
      },
      {
        q: { fr: 'Quels immeubles sont les plus prestigieux ?', en: 'Which buildings are most prestigious?', he: 'אילו בניינים יוקרתיים ביותר?' },
        a: {
          fr: 'Les restaurations méticuleuses entre Allenby et Habima sont au sommet. Les développements boutique récents intégrant le Bauhaus original (Meier on Rothschild) commandent les primes les plus élevées.',
          en: 'Meticulous restorations between Allenby and Habima are at the top. Recent boutique developments integrating original Bauhaus (Meier on Rothschild) command the highest premiums.',
          he: 'השיחזורים הקפדניים בין אלנבי להבימה הם בפסגה.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv', 'tel-aviv-vs-jerusalem-investissement'],
  },

  /* ────────────────────────── GALEI TCHELET (Herzliya Pituah) */
  {
    slug: 'galei-tchelet',
    city: 'herzliya-pituah',
    dbVille: 'Herzliya Pituah',
    dbQuartier: 'Pointe de Herzliya',
    names: { fr: 'Galei Tchelet', en: 'Galei Tchelet', he: 'גלי תכלת' },
    tagline: {
      fr: 'Le sommet absolu du marché israélien',
      en: 'The absolute top of the Israeli market',
      he: 'פסגת השוק הישראלי',
    },
    seoTitle: {
      fr: 'Galei Tchelet, Herzliya Pituah — Villas de Front de Mer | Maison Israël',
      en: 'Galei Tchelet, Herzliya Pituah — Seafront Villas | Maison Israël',
      he: 'גלי תכלת, הרצליה פיתוח — וילות חוף ים | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Galei Tchelet — la rue la plus prestigieuse d\'Israël. Villas trophées avec accès direct à la mer, transactions exclusivement off-market.',
      en: 'Galei Tchelet — Israel\'s most prestigious street. Trophy villas with direct sea access, transactions exclusively off-market.',
      he: 'גלי תכלת — הרחוב היוקרתי ביותר בישראל. וילות פאר עם גישה ישירה לים.',
    },
    h1: {
      fr: 'Galei Tchelet — La rue la plus prestigieuse d\'Israël',
      en: 'Galei Tchelet — Israel\'s Most Prestigious Street',
      he: 'גלי תכלת — הרחוב היוקרתי ביותר בישראל',
    },
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Galei Tchelet, avec son accès direct à la mer depuis une poignée de villas, détient le sommet absolu du marché immobilier israélien. La rue est courte, les propriétés rares, et les transactions presque entièrement off-market.",
      en: 'Galei Tchelet, with direct sea access from a handful of villas, holds the absolute top of the Israeli real estate market. The street is short, the properties rare, and transactions almost entirely off-market.',
      he: 'גלי תכלת, עם גישה ישירה לים מכמה וילות בודדות, מחזיק בפסגה המוחלטת של שוק הנדל"ן הישראלי.',
    },
    sections: [
      {
        title: { fr: 'L\'architecture et les terrains', en: 'Architecture and Lots', he: 'אדריכלות ומגרשים' },
        body: {
          fr: "Les villas sur Galei Tchelet font typiquement 600 à 1 500 m² sur des terrains de 1 000 à 3 000 m². L'architecture est presque exclusivement contemporaine — bâtiments cubiques blancs, larges vitrages, aménagement paysager intégré, piscines privées comme caractéristique quasi universelle.",
          en: 'Villas on Galei Tchelet typically run 600 to 1,500 m² on lots of 1,000 to 3,000 m². The architecture is almost exclusively contemporary — white cubic buildings, large glazing, integrated landscaping, private pools as a near-universal feature.',
          he: 'וילות בגלי תכלת בדרך כלל 600–1,500 מ"ר על מגרשים של 1,000–3,000 מ"ר.',
        },
      },
      {
        title: { fr: 'Tarification', en: 'Pricing', he: 'תמחור' },
        body: {
          fr: "Les villas sur Galei Tchelet se négocient entre 20 et 40 millions de dollars pour les propriétés standards, et au-dessus de 50 millions de dollars pour les actifs trophées avec frontage mer direct. La tarification est établie en dollars, plus que partout ailleurs en Israël.",
          en: 'Galei Tchelet villas trade between $20–40M for standard properties, and above $50M for trophy assets with direct sea frontage. Pricing is established in dollars, more than anywhere else in Israel.',
          he: 'וילות בגלי תכלת נסחרות בין 20–40 מיליון $ לנכסים סטנדרטיים, ומעל 50 מיליון $ לנכסי פאר.',
        },
      },
      {
        title: { fr: 'L\'accès off-market', en: 'Off-Market Access', he: 'גישה מחוץ-לשוק' },
        body: {
          fr: "Presque aucune propriété de Galei Tchelet n'apparaît sur les portails publics. L'accès est strictement par introduction privée à travers des conseillers ayant des relations établies dans la communauté. Les recherches prennent typiquement six à douze mois pour identifier le bon match.",
          en: 'Almost no Galei Tchelet property appears on public portals. Access is strictly through private introduction via advisors with established relationships in the community. Searches typically take six to twelve months to identify the right match.',
          he: 'כמעט אף נכס בגלי תכלת לא מופיע בפורטלים ציבוריים.',
        },
      },
    ],
    facts: {
      priceRange: '$20M – $50M+',
      typicalSize: { fr: '600–1 500 m²', en: '600–1,500 m²', he: '600–1,500 מ״ר' },
      architecture: { fr: 'Villas contemporaines, terrains 1 000-3 000 m²', en: 'Contemporary villas, 1,000–3,000 m² lots', he: 'וילות עכשוויות' },
      buyerProfile: { fr: 'Ultra-high-net-worth, diplomatie, family offices', en: 'Ultra-high-net-worth, diplomatic, family offices', he: 'אולטרה-עשירים, family offices' },
    },
    adjacent: [],
    faq: [
      {
        q: { fr: 'Combien de villas sur Galei Tchelet ?', en: 'How many villas on Galei Tchelet?', he: 'כמה וילות בגלי תכלת?' },
        a: {
          fr: 'La rue compte approximativement quarante villas, dont une douzaine avec frontage mer direct. Le turnover annuel est de zéro à trois transactions.',
          en: 'The street has approximately forty villas, of which about twelve have direct sea frontage. Annual turnover is zero to three transactions.',
          he: 'הרחוב מונה כ-40 וילות, מהן כ-12 עם חזית ים ישירה.',
        },
      },
      {
        q: { fr: 'Combien de temps prend une recherche ?', en: 'How long does a search take?', he: 'כמה זמן לוקח חיפוש?' },
        a: {
          fr: 'Pour un brief sérieux et un acheteur qualifié, six à douze mois sont réalistes. Les propriétés trophées peuvent nécessiter beaucoup plus, souvent à travers des introductions off-market développées au fil du temps.',
          en: 'For a serious brief and qualified buyer, six to twelve months is realistic. Trophy properties may require considerably longer, often through off-market introductions developed over time.',
          he: 'לבריף רציני וקונה מוסמך, 6–12 חודשים סבירים.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime', 'proprietes-off-market-israel-luxe'],
  },
]

export function getQuartierBySlug(slug: string, city?: string): Quartier | undefined {
  if (city) return QUARTIERS.find((q) => q.slug === slug && q.city === city)
  return QUARTIERS.find((q) => q.slug === slug)
}

export function getQuartiersByCity(city: string): Quartier[] {
  return QUARTIERS.filter((q) => q.city === city)
}

export function getAdjacentQuartiers(q: Quartier): Quartier[] {
  return q.adjacent
    .map((slug) => QUARTIERS.find((other) => other.slug === slug))
    .filter((x): x is Quartier => !!x)
}
