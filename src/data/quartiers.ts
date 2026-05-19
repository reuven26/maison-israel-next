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

  /* ────────────────────────── COLONIE ALLEMANDE (Jerusalem) */
  {
    slug: 'colonie-allemande',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Colonie Allemande',
    names: { fr: 'Colonie Allemande', en: 'German Colony', he: 'המושבה הגרמנית' },
    tagline: {
      fr: 'Le Jérusalem francophone',
      en: "Jerusalem's Franco-Anglo heart",
      he: 'הלב הצרפתי-אנגלי של ירושלים',
    },
    seoTitle: {
      fr: 'Colonie Allemande, Jérusalem — Maisons en pierre | Maison Israël',
      en: 'German Colony, Jerusalem — Stone Houses & Apartments | Maison Israël',
      he: 'המושבה הגרמנית, ירושלים — בתי אבן | מייזון ישראל',
    },
    metaDescription: {
      fr: "La Colonie Allemande (Emek Refaim) — quartier templier du XIXᵉ siècle devenu le cœur francophone de Jérusalem. Maisons en pierre, cafés, communauté française établie.",
      en: 'The German Colony (Emek Refaim) — 19th-century Templer quarter, now the Franco-Anglo heart of Jerusalem. Stone houses, cafés, established French community.',
      he: 'המושבה הגרמנית — שכונה טמפלרית מהמאה ה-19, כיום הלב הצרפתי-אנגלי של ירושלים.',
    },
    h1: {
      fr: 'Colonie Allemande — Le Jérusalem des familles francophones',
      en: 'German Colony — The Jerusalem of French and Anglo Families',
      he: 'המושבה הגרמנית — ירושלים של משפחות צרפתיות ואנגליות',
    },
    hero: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "La Colonie Allemande — connue des locaux simplement comme HaMoshava — a été fondée par des colons templiers en 1873 et conserve la seule concentration significative de maisons européennes pré-étatiques dans la ville. La rue Cremieux est l'adresse la plus convoitée ; HaTzfira et Lloyd George suivent.",
      en: 'The German Colony — known to locals simply as HaMoshava — was founded by Templer settlers in 1873 and retains the only meaningful concentration of pre-state European houses in the city. Cremieux Street is the most coveted address; HaTzfira and Lloyd George follow.',
      he: 'המושבה הגרמנית נוסדה על ידי מתיישבים טמפלרים ב-1873 ושומרת על הריכוז המשמעותי היחיד של בתים אירופיים טרום-מדינתיים בעיר.',
    },
    sections: [
      {
        title: { fr: 'Le quartier français de Jérusalem', en: 'Jerusalem\'s French Quarter', he: 'הרובע הצרפתי של ירושלים' },
        body: {
          fr: "C'est le quartier qui a le plus absorbé la migration juive française des deux dernières décennies. Boulangeries, pédiatres francophones, et tables de Shabbat qui alternent entre français et anglais sont maintenant une texture définissant le quartier. Le résultat est une communauté qui se sent simultanément profondément israélienne et entièrement internationale.",
          en: 'This is the neighbourhood that has most absorbed the French Jewish migration of the past two decades. Boulangeries, French-speaking pediatricians, and Shabbat tables that switch between French and English are now a defining texture of the quarter. The result is a community that feels simultaneously deeply Israeli and entirely international.',
          he: 'זוהי השכונה שספגה את ההגירה היהודית הצרפתית בשני העשורים האחרונים. מאפיות, רופאי ילדים דוברי צרפתית, ושולחנות שבת שמתחלפים בין צרפתית לאנגלית.',
        },
      },
      {
        title: { fr: 'Deux types de biens', en: 'Two Property Categories', he: 'שתי קטגוריות נכסים' },
        body: {
          fr: "Les propriétés ici se divisent en deux catégories : les maisons templières originales, rares et étroitement détenues, et les bâtiments boutiques plus récents sur les rues latérales. Les deux performent bien. Les maisons templières restaurées sur Cremieux ou Emek Refaim restent les actifs patrimoniaux les plus recherchés.",
          en: 'Property here divides into two categories: original Templer houses, which are rare and tightly held, and newer boutique buildings on the side streets. Both perform well. Restored Templer houses on Cremieux or Emek Refaim remain the most coveted heritage assets.',
          he: 'הנכסים מתחלקים לשתי קטגוריות: בתי טמפלרים מקוריים, ובניינים בוטיק חדשים יותר ברחובות הצדדיים.',
        },
      },
    ],
    facts: {
      priceRange: '50,000–80,000 ₪/m²',
      typicalSize: { fr: '130–320 m²', en: '130–320 m²', he: '130–320 מ״ר' },
      architecture: { fr: 'Maisons templières + boutiques', en: 'Templer houses + boutique builds', he: 'בתי טמפלרים + בניינים בוטיק' },
      buyerProfile: { fr: 'Familles francophones, aliyah, anglos', en: 'French families, aliyah buyers, Anglos', he: 'משפחות צרפתיות, עולים' },
    },
    adjacent: ['rehavia', 'baka', 'old-katamon'],
    faq: [
      {
        q: { fr: 'Pourquoi la communauté française y est-elle si présente ?', en: 'Why is the French community so strong here?', he: 'מדוע הקהילה הצרפתית כה חזקה?' },
        a: {
          fr: "Trois décennies d'accumulation. Les premières familles françaises se sont installées dans la Colonie Allemande dans les années 1990, suivies par une vague continue post-2000. La densité des services en français — synagogues, écoles, médecins, commerces — est aujourd'hui auto-renforçante.",
          en: 'Three decades of accumulation. The first French families settled in the German Colony in the 1990s, followed by a continuous wave post-2000. The density of French-language services — synagogues, schools, doctors, shops — is now self-reinforcing.',
          he: 'שלושה עשורים של הצטברות.',
        },
      },
      {
        q: { fr: 'Le quartier est-il bon pour les familles avec enfants ?', en: 'Is it good for families with children?', he: 'האם השכונה טובה למשפחות עם ילדים?' },
        a: {
          fr: 'Oui, particulièrement. Bonnes écoles, synagogues multiples, parcs, et une communauté dense de familles francophones. C\'est le choix par défaut pour les acheteurs aliyah avec enfants d\'âge scolaire.',
          en: 'Yes, particularly. Good schools, multiple synagogues, parks, and a dense community of French-speaking families. This is the default choice for aliyah buyers with school-age children.',
          he: 'כן, במיוחד. בתי ספר טובים, בתי כנסת רבים, פארקים.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem', 'investisseurs-internationaux-jerusalem-immobilier-luxe'],
  },

  /* ────────────────────────── MAMILLA (Jerusalem) */
  {
    slug: 'mamilla',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Mamilla',
    names: { fr: 'Mamilla', en: 'Mamilla', he: 'ממילא' },
    tagline: {
      fr: 'Le seul quartier de luxe en construction neuve de Jérusalem',
      en: "Jerusalem's only new-build luxury district",
      he: 'מחוז היוקרה היחיד בבנייה חדשה של ירושלים',
    },
    seoTitle: {
      fr: 'Mamilla, Jérusalem — Résidences Waldorf-Astoria | Maison Israël',
      en: 'Mamilla, Jerusalem — Waldorf-Astoria Residences | Maison Israël',
      he: 'ממילא, ירושלים — מגדלי ולדורף אסטוריה | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Mamilla — adjacent à la Vieille Ville, le seul district de luxe contemporain de Jérusalem. Résidences Waldorf-Astoria, conciergerie, accès direct à la porte de Jaffa.',
      en: "Mamilla — adjacent to the Old City, Jerusalem's only contemporary luxury district. Waldorf-Astoria Residences, concierge, direct access to Jaffa Gate.",
      he: 'ממילא — סמוך לעיר העתיקה, מחוז היוקרה העכשווי היחיד של ירושלים.',
    },
    h1: {
      fr: 'Mamilla — Le luxe moderne au pied de la Vieille Ville',
      en: 'Mamilla — Modern Luxury at the Old City Gates',
      he: 'ממילא — יוקרה מודרנית בשערי העיר העתיקה',
    },
    hero: 'https://images.unsplash.com/photo-1602936169595-c2c5b9b4ad94?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Mamilla est le seul véritable district de luxe en construction neuve de Jérusalem. Développé par étapes à partir de la fin des années 1990, ancré par l'hôtel Mamilla et le Waldorf-Astoria, il offre ce qu'aucun autre quartier de la ville ne peut : des appartements contemporains clé en main avec service de conciergerie, parking sécurisé, et accès direct à pied à la Vieille Ville et à la porte de Jaffa.",
      en: "Mamilla is Jerusalem's only credible new-build luxury district. Developed in stages from the late 1990s, anchored by the Mamilla Hotel and the Waldorf-Astoria, it offers what no other quarter of the city can: contemporary turnkey apartments with concierge service, secure parking, and direct walking access to the Old City and Jaffa Gate.",
      he: 'ממילא היא מחוז היוקרה היחיד בבנייה חדשה האמין של ירושלים.',
    },
    sections: [
      {
        title: { fr: 'Le produit Mamilla', en: 'The Mamilla Product', he: 'המוצר של ממילא' },
        body: {
          fr: "Le profil acheteur est distinctif — principalement latino-américain, nord-américain, et russe, utilisant souvent la propriété plusieurs mois par an. Les niveaux de service sont aux standards hôteliers internationaux. La liquidité de revente est la plus forte du marché premium de Jérusalem.",
          en: 'The buyer profile is distinctive — predominantly Latin American, North American, and Russian, often using the property for several months a year. Service levels are international hotel standard. Resale liquidity is the strongest in the prime market.',
          he: 'פרופיל הקונה ייחודי — בעיקר לטינו-אמריקאי, צפון-אמריקאי, ורוסי.',
        },
      },
      {
        title: { fr: 'Pourquoi choisir Mamilla', en: 'Why Choose Mamilla', he: 'מדוע לבחור בממילא' },
        body: {
          fr: "Si la priorité d'un acheteur est lock-and-leave — propriété sécurisée, sans entretien, prête à recevoir à tout moment — Mamilla est presque toujours la bonne réponse. Pour les acheteurs avec un agenda voyageant, c'est l'option la plus pratique sans sacrifier le prestige.",
          en: "If a buyer's priority is lock-and-leave — secure, low-maintenance, ready-to-receive at any moment — Mamilla is almost always the right answer. For buyers with travelling schedules, this is the most practical option without sacrificing prestige.",
          he: 'אם העדיפות היא נעל-ועזוב — ממילא היא כמעט תמיד התשובה הנכונה.',
        },
      },
    ],
    facts: {
      priceRange: '75,000–110,000 ₪/m²',
      typicalSize: { fr: '90–280 m²', en: '90–280 m²', he: '90–280 מ״ר' },
      architecture: { fr: 'Résidences contemporaines avec conciergerie', en: 'Contemporary serviced residences', he: 'דירות מגורים עכשוויות' },
      buyerProfile: { fr: 'Acheteurs internationaux, résidence secondaire', en: 'International, second-home buyers', he: 'בינלאומיים, בית שני' },
    },
    adjacent: ['yemin-moshe', 'talbieh'],
    faq: [
      {
        q: { fr: 'Y a-t-il des services de conciergerie ?', en: 'Are there concierge services?', he: 'האם יש שירותי קונסיירז\'?' },
        a: {
          fr: 'Oui, les résidences Waldorf-Astoria et David\'s Village offrent une conciergerie complète de niveau hôtelier, parking sécurisé, et accès aux services de l\'hôtel.',
          en: 'Yes. Waldorf-Astoria Residences and David\'s Village offer full hotel-grade concierge, secure parking, and access to hotel services.',
          he: 'כן, ולדורף ודייוויד\'ס וילג\' מציעים שירותי קונסיירז\' מלאים.',
        },
      },
      {
        q: { fr: 'Quelle est la liquidité de revente ?', en: 'What is the resale liquidity?', he: 'מהי הנזילות למכירה חוזרת?' },
        a: {
          fr: 'La plus forte du marché premium de Jérusalem. Les appartements Mamilla bien positionnés se négocient typiquement en 3–6 mois, contre 6–12 mois pour Talbieh ou Réhavia.',
          en: 'The strongest in prime Jerusalem. Well-positioned Mamilla apartments typically transact in 3–6 months, vs. 6–12 months for Talbiyeh or Rehavia.',
          he: 'הגבוהה ביותר בשוק הפרמיום של ירושלים.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem', 'investisseurs-internationaux-jerusalem-immobilier-luxe'],
  },

  /* ────────────────────────── YEMIN MOSHE (Jerusalem) */
  {
    slug: 'yemin-moshe',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Yemin Moshe',
    names: { fr: 'Yemin Moshe', en: 'Yemin Moshe', he: 'ימין משה' },
    tagline: {
      fr: 'Le quartier des collectionneurs',
      en: 'The collectors\' quarter',
      he: 'שכונת האספנים',
    },
    seoTitle: {
      fr: 'Yemin Moshe, Jérusalem — Maisons d\'artistes vue Vieille Ville | Maison Israël',
      en: 'Yemin Moshe, Jerusalem — Artist Houses, Old City Views | Maison Israël',
      he: 'ימין משה, ירושלים — בתי אמנים עם נוף לעיר העתיקה',
    },
    metaDescription: {
      fr: "Yemin Moshe — le quartier piétonnier d'artistes qui descend du moulin Montefiore vers la Vieille Ville. Vues uniques, 120 propriétés au total.",
      en: 'Yemin Moshe — the pedestrian artists\' quarter descending from Montefiore Windmill toward the Old City. Unique views, 120 properties total.',
      he: 'ימין משה — שכונת אמנים הולכי רגל היורדת מטחנת מונטיפיורי לעיר העתיקה.',
    },
    h1: {
      fr: 'Yemin Moshe — La vue la plus rare de Jérusalem',
      en: 'Yemin Moshe — Jerusalem\'s Rarest View',
      he: 'ימין משה — הנוף הנדיר ביותר של ירושלים',
    },
    hero: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Yemin Moshe est le petit quartier des artistes qui descend du moulin de Montefiore vers les murs de la Vieille Ville. Il y a peut-être 120 propriétés au total. Le quartier est piétonnier uniquement, les vues sont inégalées, et l'inventaire tourne peut-être une ou deux fois par an.",
      en: 'Yemin Moshe is the small artists\' quarter that descends from the Montefiore Windmill toward the Old City walls. There are perhaps 120 properties in total. The neighbourhood is pedestrian-only, the views are unmatched, and inventory turns over perhaps once or twice a year.',
      he: 'ימין משה היא שכונת האמנים הקטנה היורדת מטחנת מונטיפיורי לעבר חומות העיר העתיקה.',
    },
    sections: [
      {
        title: { fr: 'Un marché de collectionneurs', en: 'A Collector\'s Market', he: 'שוק של אספנים' },
        body: {
          fr: "C'est un quartier de collectionneurs. Les acheteurs ici ne cherchent pas principalement le rendement ou la commodité ; ils achètent une relation historique et visuelle spécifique avec la Vieille Ville. La tarification reflète cela. Les transactions sont rares et silencieuses.",
          en: "This is a collector's neighbourhood. Buyers here are not primarily seeking yield or convenience; they are buying a specific historical and visual relationship to the Old City. Pricing reflects that. Transactions are rare and quiet.",
          he: 'זוהי שכונת אספנים. הקונים כאן לא מחפשים בעיקר תשואה.',
        },
      },
      {
        title: { fr: 'La rareté absolue', en: 'Absolute Scarcity', he: 'נדירות מוחלטת' },
        body: {
          fr: "Avec environ 120 propriétés totales et un turnover annuel de zéro à trois transactions, Yemin Moshe est statistiquement le plus rare des sous-marchés premium de Jérusalem. Les protections patrimoniales empêchent toute construction nouvelle ; le quartier ne grandira jamais.",
          en: 'With approximately 120 total properties and annual turnover of zero to three transactions, Yemin Moshe is statistically the rarest of Jerusalem\'s prime submarkets. Heritage protections prevent any new construction; the neighbourhood will never grow.',
          he: 'עם כ-120 נכסים בסך הכל וטורנובר שנתי של 0–3 עסקאות.',
        },
      },
    ],
    facts: {
      priceRange: '70,000–110,000 ₪/m²',
      typicalSize: { fr: '80–250 m²', en: '80–250 m²', he: '80–250 מ״ר' },
      architecture: { fr: 'Maisons en pierre, ruelles piétonnes', en: 'Stone houses, pedestrian lanes', he: 'בתי אבן, סמטאות הולכי רגל' },
      buyerProfile: { fr: 'Collectionneurs, mécènes, artistes', en: 'Collectors, patrons, artists', he: 'אספנים' },
    },
    adjacent: ['mamilla', 'talbieh'],
    faq: [
      {
        q: { fr: 'Y a-t-il du parking ?', en: 'Is there parking?', he: 'האם יש חנייה?' },
        a: {
          fr: 'Le quartier est piétonnier. Le parking est dans une structure souterraine accessible depuis Hebron Road. C\'est une contrainte importante à comprendre avant d\'acheter.',
          en: 'The neighbourhood is pedestrian-only. Parking is in an underground structure accessed from Hebron Road. This is an important constraint to understand before buying.',
          he: 'השכונה הולכי רגל בלבד. החנייה במבנה תת-קרקעי.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem'],
  },

  /* ────────────────────────── BAKA (Jerusalem) */
  {
    slug: 'baka',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Baka',
    names: { fr: 'Baka', en: 'Baka', he: 'בקעה' },
    tagline: {
      fr: 'La meilleure valeur premium de Jérusalem',
      en: "Jerusalem's best premium value",
      he: 'הערך הפרמיום הטוב ביותר של ירושלים',
    },
    seoTitle: {
      fr: 'Baka, Jérusalem — Maisons avec jardin et appartements | Maison Israël',
      en: 'Baka, Jerusalem — Houses with Gardens & Apartments | Maison Israël',
      he: 'בקעה, ירושלים — בתים עם גינות ודירות | מייזון ישראל',
    },
    metaDescription: {
      fr: "Baka — quartier verdoyant au sud avec maisons templières restaurées, jardins et une forte communauté olim anglophone. Meilleure valeur premium de Jérusalem.",
      en: "Baka — leafy southern quarter with restored Templer houses, gardens, and a strong Anglo olim community. Jerusalem's best premium value.",
      he: 'בקעה — שכונה ירוקה בדרום עם בתי טמפלרים משוחזרים, גינות, וקהילת עולים אנגלית חזקה.',
    },
    h1: {
      fr: 'Baka — Espace, jardins, et valeur dans le Jérusalem premium',
      en: 'Baka — Space, Gardens, and Value in Premium Jerusalem',
      he: 'בקעה — מרחב, גינות וערך בירושלים הפרמיום',
    },
    hero: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Baka est le plus méridional des quartiers premium et le plus architecturalement varié. Une poignée de maisons templières restaurées côtoient des bâtiments mandataires et des constructions infill des années 1990. Le quartier a un caractère olim, jeune et anglophone marqué.",
      en: 'Baka is the southernmost of the prime quarters and the most architecturally varied. A handful of restored Templer houses sit alongside Mandate buildings and 1990s infill. The neighbourhood has a markedly young, English-speaking olim character.',
      he: 'בקעה היא הדרומית ביותר מבין השכונות הפרמיום והמגוונת ביותר אדריכלית.',
    },
    sections: [
      {
        title: { fr: 'Valeur et espace', en: 'Value and Space', he: 'ערך ומרחב' },
        body: {
          fr: "Pour les acheteurs privilégiant l'espace et le jardin sur la centralité, Baka offre la meilleure valeur dans le segment premium. Les maisons avec jardins privés — rares ailleurs à Jérusalem — sont accessibles ici à des prix significativement inférieurs à ceux de Talbieh ou de la Colonie Allemande.",
          en: 'For buyers prioritising space and garden over centrality, Baka offers the best value in the prime tier. Houses with private gardens — rare elsewhere in Jerusalem — are accessible here at prices significantly below Talbiyeh or the German Colony.',
          he: 'לקונים המעדיפים מרחב וגינה על מרכזיות.',
        },
      },
    ],
    facts: {
      priceRange: '35,000–60,000 ₪/m²',
      typicalSize: { fr: '110–350 m²', en: '110–350 m²', he: '110–350 מ״ר' },
      architecture: { fr: 'Mélange templier, mandat, contemporain', en: 'Mix of Templer, Mandate, contemporary', he: 'תערובת טמפלרים, מנדט, עכשווי' },
      buyerProfile: { fr: 'Familles anglophones, olim, valeur', en: 'Anglo families, olim, value buyers', he: 'משפחות אנגליות, עולים' },
    },
    adjacent: ['colonie-allemande', 'old-katamon'],
    faq: [
      {
        q: { fr: 'Baka convient-il aux familles avec enfants ?', en: 'Is Baka good for families?', he: 'האם בקעה מתאימה למשפחות?' },
        a: {
          fr: 'Oui, c\'est un de ses points forts. Bonnes écoles, parcs, et une forte communauté olim avec beaucoup d\'enfants d\'âge scolaire. Particulièrement populaire chez les familles anglophones.',
          en: 'Yes, this is one of its strengths. Good schools, parks, and a strong olim community with many school-age children. Particularly popular among Anglo families.',
          he: 'כן, זה אחד מהיתרונות.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem'],
  },

  /* ────────────────────────── OLD KATAMON (Jerusalem) */
  {
    slug: 'old-katamon',
    city: 'jerusalem',
    dbVille: 'Jérusalem',
    dbQuartier: 'Katamon',
    names: { fr: 'Vieux Katamon', en: 'Old Katamon', he: 'קטמון הישנה' },
    tagline: {
      fr: 'La valeur montante de Jérusalem',
      en: 'Jerusalem\'s rising address',
      he: 'הכתובת העולה של ירושלים',
    },
    seoTitle: {
      fr: 'Vieux Katamon, Jérusalem — Appartements et Maisons | Maison Israël',
      en: 'Old Katamon, Jerusalem — Apartments and Houses | Maison Israël',
      he: 'קטמון הישנה, ירושלים — דירות ובתים',
    },
    metaDescription: {
      fr: 'Vieux Katamon — entre Réhavia et la Colonie Allemande, en pleine revalorisation. Familles francophones et américaines, rues calmes.',
      en: 'Old Katamon — between Rehavia and the German Colony, in active repricing. French and American families, quiet streets.',
      he: 'קטמון הישנה — בין רחביה למושבה הגרמנית.',
    },
    h1: {
      fr: 'Vieux Katamon — Le quartier le plus dynamique de Jérusalem',
      en: 'Old Katamon — Jerusalem\'s Most Dynamic Submarket',
      he: 'קטמון הישנה — תת-השוק הדינמי ביותר של ירושלים',
    },
    hero: 'https://images.unsplash.com/photo-1583098945043-eed40dabb74e?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Vieux Katamon se trouve entre Réhavia et la Colonie Allemande, et partage des caractéristiques des deux. C'est résidentiel, verdoyant, et de plus en plus favorisé par les jeunes familles françaises et américaines qui trouvent Talbieh prohibitivement rare et la Colonie Allemande légèrement trop commerciale.",
      en: 'Old Katamon sits between Rehavia and the German Colony, and shares characteristics of both. It is residential, leafy, and increasingly favoured by younger French and American families who find Talbiyeh prohibitively scarce and the German Colony slightly too commercial.',
      he: 'קטמון הישנה ממוקמת בין רחביה למושבה הגרמנית.',
    },
    sections: [
      {
        title: { fr: 'La revalorisation', en: 'The Repricing', he: 'התמחור מחדש' },
        body: {
          fr: "C'est aussi le quartier le plus susceptible de surprendre les acheteurs avec une appréciation récente forte. Des rues comme Kovshei Katamon et San Martin ont vu une revalorisation significative depuis 2020. Pour les acheteurs avec un horizon de 5–10 ans, c'est un des paris les plus intéressants à Jérusalem.",
          en: 'It is also the neighbourhood most likely to surprise buyers with strong recent appreciation. Streets like Kovshei Katamon and San Martin have seen meaningful repricing since 2020. For buyers with a 5–10 year horizon, this is one of the most interesting bets in Jerusalem.',
          he: 'גם השכונה שסביר להפתיע קונים עם עליות מחיר חזקות לאחרונה.',
        },
      },
    ],
    facts: {
      priceRange: '40,000–65,000 ₪/m²',
      typicalSize: { fr: '110–300 m²', en: '110–300 m²', he: '110–300 מ״ר' },
      architecture: { fr: 'Mandat + années 50, en cours de rénovation', en: 'Mandate + 1950s, undergoing renovation', he: 'מנדט + שנות ה-50' },
      buyerProfile: { fr: 'Jeunes familles français/américaines', en: 'Younger French/American families', he: 'משפחות צעירות צרפתיות/אמריקאיות' },
    },
    adjacent: ['rehavia', 'colonie-allemande', 'baka'],
    faq: [
      {
        q: { fr: 'Vieux Katamon ou Colonie Allemande ?', en: 'Old Katamon or German Colony?', he: 'קטמון הישנה או המושבה הגרמנית?' },
        a: {
          fr: 'Colonie Allemande pour le caractère commercial et la communauté francophone établie. Vieux Katamon pour les rues plus calmes, les prix plus accessibles, et le potentiel d\'appréciation.',
          en: 'German Colony for commercial character and established French community. Old Katamon for quieter streets, more accessible prices, and appreciation potential.',
          he: 'המושבה הגרמנית לאופי המסחרי. קטמון הישנה לרחובות שקטים.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem'],
  },

  /* ────────────────────────── OLD NORTH (Tel Aviv) */
  {
    slug: 'old-north',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Old North',
    names: { fr: 'Nord Ancien', en: 'Old North', he: 'הצפון הישן' },
    tagline: {
      fr: 'Le Tel Aviv résidentiel des familles',
      en: 'Residential Tel Aviv for families',
      he: 'תל אביב המגורית של משפחות',
    },
    seoTitle: {
      fr: 'Nord Ancien, Tel Aviv — Appartements familiaux de prestige | Maison Israël',
      en: 'Old North, Tel Aviv — Family Premium Apartments | Maison Israël',
      he: 'הצפון הישן, תל אביב — דירות יוקרה למשפחות',
    },
    metaDescription: {
      fr: "Le Nord Ancien (Tzafon HaYashan) — la moitié calme et familiale du centre de Tel Aviv. Bauhaus restauré, parcs, écoles, marché locatif profond.",
      en: 'The Old North (Tzafon HaYashan) — the quiet, family-friendly half of central Tel Aviv. Restored Bauhaus, parks, schools, deep rental market.',
      he: 'הצפון הישן — המחצית השקטה והמשפחתית של מרכז תל אביב.',
    },
    h1: {
      fr: 'Nord Ancien — Le Tel Aviv résidentiel discret',
      en: 'Old North — Tel Aviv\'s Quiet Residential Heart',
      he: 'הצפון הישן — לב המגורים השקט של תל אביב',
    },
    hero: 'https://images.unsplash.com/photo-1546412414-e1885e51cfa5?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Le Nord Ancien est la moitié plus calme du centre de Tel Aviv. Développé dans les années 1930 et 1940, le quartier s'étend approximativement du Yarkon au nord jusqu'à Arlozorov, et de la mer à Ibn Gvirol. Le caractère est résidentiel, verdoyant, et résolument moins performatif que Rothschild ou le front de mer.",
      en: 'The Old North is the quieter half of central Tel Aviv. Developed in the 1930s and 1940s, the neighbourhood stretches roughly from the Yarkon River south to Arlozorov, and from the sea inland to Ibn Gvirol. The character is residential, leafy, and decidedly less performative than Rothschild or the seafront.',
      he: 'הצפון הישן הוא החצי השקט יותר של מרכז תל אביב.',
    },
    sections: [
      {
        title: { fr: 'Le quartier des familles établies', en: 'Established Families\' Neighbourhood', he: 'שכונת המשפחות המבוססות' },
        body: {
          fr: "C'est le quartier où les familles locales avec de l'argent habitent depuis des générations. Les rues — Hey BeIyar, Shlomo HaMelech, Pinkas — portent une qualité établie et légèrement discrète. Pour les familles internationales avec des enfants d'âge scolaire, le Nord Ancien offre la proximité aux bonnes écoles et un rythme quotidien plus proche du Paris résidentiel que d'une ville touristique.",
          en: 'This is the neighbourhood that local families with money have lived in for generations. The streets — Hey BeIyar, Shlomo HaMelech, Pinkas — carry an established, slightly understated quality. For international buyers with school-age children, the Old North offers proximity to good schools and a daily rhythm closer to residential Paris than to a tourist city.',
          he: 'זוהי השכונה שמשפחות מקומיות אמידות גרות בה דורות.',
        },
      },
    ],
    facts: {
      priceRange: '60,000–95,000 ₪/m²',
      typicalSize: { fr: '90–280 m²', en: '90–280 m²', he: '90–280 מ״ר' },
      architecture: { fr: 'Bauhaus restauré + années 50 + boutique récent', en: 'Restored Bauhaus + 1950s + recent boutique', he: 'באוהאוס משוחזר' },
      buyerProfile: { fr: 'Familles internationales, professionnels', en: 'International families, professionals', he: 'משפחות בינלאומיות' },
    },
    adjacent: ['rothschild', 'sarona'],
    faq: [
      {
        q: { fr: 'Pourquoi choisir le Nord Ancien plutôt que Rothschild ?', en: 'Why Old North over Rothschild?', he: 'מדוע הצפון הישן ולא רוטשילד?' },
        a: {
          fr: 'Pour les familles avec enfants : proximité aux écoles, plus de calme, moins d\'activité touristique. Pour les pied-à-terre : Rothschild reste plus pratique. Pour les baux longs : le Nord Ancien offre des locataires plus stables.',
          en: 'For families with children: proximity to schools, quieter, less tourist activity. For pied-à-terre: Rothschild remains more practical. For long-term rentals: Old North offers more stable tenants.',
          he: 'למשפחות עם ילדים: קרבה לבתי ספר, שקט יותר.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv', 'tel-aviv-vs-jerusalem-investissement'],
  },

  /* ────────────────────────── SARONA / PARK TZAMERET (Tel Aviv) */
  {
    slug: 'sarona',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Sarona',
    names: { fr: 'Sarona / Park Tzameret', en: 'Sarona / Park Tzameret', he: 'שרונה / פארק צמרת' },
    tagline: {
      fr: 'Le luxe contemporain de Tel Aviv',
      en: 'Tel Aviv\'s contemporary luxury',
      he: 'היוקרה העכשווית של תל אביב',
    },
    seoTitle: {
      fr: 'Sarona Park Tzameret, Tel Aviv — Tours W, Akirov, Meier | Maison Israël',
      en: 'Sarona Park Tzameret, Tel Aviv — W, Akirov, Meier Towers | Maison Israël',
      he: 'שרונה פארק צמרת, תל אביב — מגדלי W, אקירוב, מאייר',
    },
    metaDescription: {
      fr: 'Sarona et Park Tzameret — l\'énoncé de luxe moderne de Tel Aviv. Tours W Residences, Akirov, Meier, Sea One. Conciergerie hôtelière, parking sécurisé.',
      en: 'Sarona and Park Tzameret — Tel Aviv\'s modern luxury statement. W Residences, Akirov, Meier, Sea One towers. Hotel concierge, secure parking.',
      he: 'שרונה ופארק צמרת — הצהרת היוקרה המודרנית של תל אביב.',
    },
    h1: {
      fr: 'Sarona & Park Tzameret — Le sommet du Tel Aviv contemporain',
      en: 'Sarona & Park Tzameret — The Peak of Contemporary Tel Aviv',
      he: 'שרונה ופארק צמרת — הפסגה של תל אביב העכשווית',
    },
    hero: 'https://images.unsplash.com/photo-1565530995-9bf3a5c40bcd?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Si Rothschild est le Tel Aviv patrimonial, Sarona et Park Tzameret sont son énoncé de luxe moderne. Les deux développements représentent le seul véritable cluster de construction neuve ultra-premium de la ville. Le produit est reconnaissable à n'importe quel acheteur international : tours de verre et de pierre, conciergerie complète, parking sécurisé, salles de sport et piscines privées, vues panoramiques.",
      en: "If Rothschild is heritage Tel Aviv, Sarona and Park Tzameret are its modern luxury statement. The two developments together represent the city's only true cluster of ultra-prime new construction. The product is recognisable to any international buyer: glass and stone towers, full concierge service, secure parking, private gyms and pools, panoramic views.",
      he: 'אם רוטשילד היא תל אביב המורשת, שרונה ופארק צמרת הם הצהרת היוקרה המודרנית שלה.',
    },
    sections: [
      {
        title: { fr: 'Les bâtiments trophées', en: 'The Trophy Buildings', he: 'הבניינים הטרופי' },
        body: {
          fr: "Les Akirov Towers, Meier on Rothschild, le développement Sea One, et le W Residences ancrent ce segment. Le profil acheteur est nettement différent des quartiers patrimoniaux. Plus israélien, plus high-net-worth domestique, et une composante significative de l'économie technologique israélienne. La tarification au sommet de ce segment dépasse maintenant 150 000 NIS/m².",
          en: 'The Akirov Towers, Meier on Rothschild, the Sea One development, and the W Residences anchor this segment. The buyer profile is markedly different from the heritage quarters — more Israeli, more domestic high-net-worth, and a significant component from the Israeli technology economy. Pricing at the top now exceeds 150,000 NIS per m².',
          he: 'מגדלי אקירוב, מאייר על רוטשילד, סי וואן, ו-W מציבים את העוגן של המקטע.',
        },
      },
    ],
    facts: {
      priceRange: '95,000–180,000 ₪/m²',
      typicalSize: { fr: '120–500 m²', en: '120–500 m²', he: '120–500 מ״ר' },
      architecture: { fr: 'Tours contemporaines avec services complets', en: 'Contemporary towers, full-service', he: 'מגדלים עכשוויים' },
      buyerProfile: { fr: 'Tech israélienne, HNW domestique, internationaux', en: 'Israeli tech, domestic HNW, international', he: 'הטק הישראלי' },
    },
    adjacent: ['rothschild', 'old-north'],
    faq: [
      {
        q: { fr: 'Quelle est la différence entre Sarona et Park Tzameret ?', en: 'Sarona vs Park Tzameret?', he: 'מה ההבדל?' },
        a: {
          fr: 'Park Tzameret est plus établi et dominé par les Akirov Towers. Sarona est plus récent, mixant résidentiel et commerces haut de gamme avec le complexe Sarona Market. Les deux fonctionnent au même niveau de prix.',
          en: 'Park Tzameret is more established and dominated by Akirov Towers. Sarona is newer, mixing residential and high-end retail with the Sarona Market complex. Both operate at the same price tier.',
          he: 'פארק צמרת מבוסס יותר. שרונה חדש יותר.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv'],
  },

  /* ────────────────────────── JAFFA (Tel Aviv) */
  {
    slug: 'jaffa',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Jaffa',
    names: { fr: 'Vieille Jaffa', en: 'Old Jaffa', he: 'יפו העתיקה' },
    tagline: {
      fr: 'Le patrimoine arabe restauré',
      en: 'Restored Arab heritage',
      he: 'מורשת ערבית משוחזרת',
    },
    seoTitle: {
      fr: 'Vieille Jaffa, Tel Aviv — Maisons en pierre vue mer | Maison Israël',
      en: 'Old Jaffa, Tel Aviv — Stone Houses with Sea Views | Maison Israël',
      he: 'יפו העתיקה, תל אביב — בתי אבן עם נוף לים',
    },
    metaDescription: {
      fr: 'Vieille Jaffa — les maisons arabes en pierre du vieux port, restaurées avec soin. Architecture profonde, lumière, et relation unique à la mer.',
      en: 'Old Jaffa — the Arab stone houses of the old port, carefully restored. Architectural depth, light, and a unique relationship to the sea.',
      he: 'יפו העתיקה — בתי האבן הערביים של הנמל הישן.',
    },
    h1: {
      fr: 'Vieille Jaffa — Le patrimoine méditerranéen de Tel Aviv',
      en: 'Old Jaffa — Tel Aviv\'s Mediterranean Heritage',
      he: 'יפו העתיקה — המורשת הים-תיכונית של תל אביב',
    },
    hero: 'https://images.unsplash.com/photo-1525252312-77b67c9b8ddd?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "La Vieille Jaffa est en transformation longue et prudente depuis plus de deux décennies. Les maisons en pierre arabes du vieux port — autrefois sous-évaluées et démodées — sont maintenant parmi les propriétés patrimoniales les plus convoitées du grand Tel Aviv.",
      en: 'Old Jaffa has been in a long, careful transformation for over two decades. The Arab stone houses of the old port city — once underpriced and unfashionable — are now among the most coveted heritage properties in greater Tel Aviv.',
      he: 'יפו העתיקה עוברת טרנספורמציה ארוכה וזהירה כבר יותר משני עשורים.',
    },
    sections: [
      {
        title: { fr: 'Un quartier authentiquement mixte', en: 'A Genuinely Mixed Neighborhood', he: 'שכונה מעורבת אמיתית' },
        body: {
          fr: "Le quartier reste authentiquement mixte, ce qui fait partie de son caractère. Les développements boutiques le long du port et dans la vieille ville restaurée côtoient une ville arabe vivante. Pour les acheteurs qui valorisent la profondeur architecturale, la lumière, et une relation à la mer que le front de mer de Tel Aviv ne peut pas offrir, Jaffa est de plus en plus la réponse.",
          en: 'The neighbourhood remains genuinely mixed, which is part of its character. The boutique developments along the port and within the restored old city sit alongside a working Arab town. For buyers who value architectural depth, light, and a relationship to the sea that the Tel Aviv beachfront cannot offer, Jaffa is increasingly the answer.',
          he: 'השכונה נשארת מעורבת אמיתית, וזה חלק מהאופי שלה.',
        },
      },
    ],
    facts: {
      priceRange: '60,000–140,000 ₪/m²',
      typicalSize: { fr: '70–280 m²', en: '70–280 m²', he: '70–280 מ״ר' },
      architecture: { fr: 'Maisons en pierre arabes restaurées', en: 'Restored Arab stone houses', he: 'בתי אבן ערביים משוחזרים' },
      buyerProfile: { fr: 'Internationaux, collectionneurs d\'art, architectes', en: 'International, art collectors, architects', he: 'בינלאומיים, אספני אמנות' },
    },
    adjacent: ['neve-tzedek', 'rothschild'],
    faq: [
      {
        q: { fr: 'Jaffa est-il sûr ?', en: 'Is Jaffa safe?', he: 'האם יפו בטוחה?' },
        a: {
          fr: "La vieille ville restaurée et le port sont tout à fait sûrs, comparables à n'importe quel quartier de Tel Aviv. Comme dans tout quartier mixte en transformation, il est utile d'avoir un conseiller local qui connaît les sous-zones précises.",
          en: 'The restored old city and port are entirely safe, comparable to any Tel Aviv neighbourhood. As with any mixed neighbourhood in transformation, having a local advisor familiar with the specific micro-zones is useful.',
          he: 'העיר העתיקה המשוחזרת והנמל בטוחים לחלוטין.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv'],
  },

  /* ────────────────────────── RAMAT AVIV (Tel Aviv) */
  {
    slug: 'ramat-aviv',
    city: 'tel-aviv',
    dbVille: 'Tel Aviv',
    dbQuartier: 'Ramat Aviv',
    names: { fr: 'Ramat Aviv Gimel', en: 'Ramat Aviv Gimel', he: 'רמת אביב ג׳' },
    tagline: {
      fr: 'La banlieue résidentielle de Tel Aviv',
      en: 'Tel Aviv\'s family suburb',
      he: 'הפרבר המשפחתי של תל אביב',
    },
    seoTitle: {
      fr: 'Ramat Aviv Gimel, Tel Aviv — Appartements familiaux | Maison Israël',
      en: 'Ramat Aviv Gimel, Tel Aviv — Family Apartments | Maison Israël',
      he: 'רמת אביב ג׳, תל אביב — דירות משפחתיות',
    },
    metaDescription: {
      fr: 'Ramat Aviv Gimel — au nord du Yarkon, la réponse résidentielle familiale au centre de Tel Aviv. Grands appartements, écoles internationales.',
      en: 'Ramat Aviv Gimel — north of the Yarkon, the family residential answer to central Tel Aviv. Spacious apartments, international schools.',
      he: 'רמת אביב ג׳ — מצפון לירקון.',
    },
    h1: {
      fr: 'Ramat Aviv Gimel — Espace et écoles au nord de Tel Aviv',
      en: 'Ramat Aviv Gimel — Space and Schools North of Tel Aviv',
      he: 'רמת אביב ג׳ — מרחב ובתי ספר מצפון לתל אביב',
    },
    hero: 'https://images.unsplash.com/photo-1559099262-aef34a78f4cf?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Au nord du Yarkon, Ramat Aviv Gimel est la réponse résidentielle familiale au centre de Tel Aviv. Le quartier est suburbain en échelle, ancré par l'Université de Tel Aviv, et caractérisé par des appartements et maisons plus grandes que ce que Tel Aviv centrale offre typiquement.",
      en: 'North of the Yarkon, Ramat Aviv Gimel is the family residential answer to central Tel Aviv. The neighbourhood is suburban in scale, anchored by Tel Aviv University, and characterised by larger apartments and townhouses than central Tel Aviv typically offers.',
      he: 'מצפון לירקון, רמת אביב ג׳ היא התשובה המשפחתית-מגורית למרכז תל אביב.',
    },
    sections: [
      {
        title: { fr: 'Pour les familles en relocalisation', en: 'For Relocating Families', he: 'למשפחות בהעתקה' },
        body: {
          fr: "C'est le choix pour les familles internationales en relocalisation avec plusieurs enfants, ou pour les acheteurs qui veulent la proximité de Tel Aviv sans la densité du centre-ville. La base d'acheteurs est fortement israélienne, avec une composante française et américaine significative attirée par les écoles internationales à proximité.",
          en: 'This is the choice for international families relocating with multiple children, or for buyers who want Tel Aviv proximity without the density of the city centre. The buyer base is heavily Israeli, with a meaningful French and American component drawn by the international schools nearby.',
          he: 'זו הבחירה למשפחות בינלאומיות בהעתקה.',
        },
      },
    ],
    facts: {
      priceRange: '35,000–60,000 ₪/m²',
      typicalSize: { fr: '120–350 m²', en: '120–350 m²', he: '120–350 מ״ר' },
      architecture: { fr: 'Appartements années 1980-2010, townhouses', en: '1980s–2010s apartments, townhouses', he: 'דירות שנות ה-80–2010' },
      buyerProfile: { fr: 'Familles avec enfants, expats, universitaires', en: 'Families with children, expats, academics', he: 'משפחות עם ילדים, שוהים זרים' },
    },
    adjacent: ['old-north'],
    faq: [
      {
        q: { fr: 'Y a-t-il des écoles internationales ?', en: 'Are there international schools?', he: 'האם יש בתי ספר בינלאומיים?' },
        a: {
          fr: 'Oui. La proximité de l\'École Internationale et de plusieurs établissements bilingues est un des principaux moteurs de la demande des familles francophones et anglophones dans le quartier.',
          en: 'Yes. Proximity to the International School and several bilingual establishments is one of the main drivers of demand from French- and English-speaking families in the neighbourhood.',
          he: 'כן.',
        },
      },
    ],
    relatedArticles: ['meilleurs-quartiers-luxe-tel-aviv'],
  },

  /* ────────────────────────── NOF YAM (Herzliya Pituah) */
  {
    slug: 'nof-yam',
    city: 'herzliya-pituah',
    dbVille: 'Herzliya Pituah',
    dbQuartier: 'Nof Yam',
    names: { fr: 'Nof Yam', en: 'Nof Yam', he: 'נוף ים' },
    tagline: {
      fr: 'L\'ultra-premium en vue de mer',
      en: 'Sea-view ultra-prime',
      he: 'אולטרה-פרמיום עם נוף לים' },
    seoTitle: {
      fr: 'Nof Yam, Herzliya Pituah — Villas vue mer | Maison Israël',
      en: 'Nof Yam, Herzliya Pituah — Sea View Villas | Maison Israël',
      he: 'נוף ים, הרצליה פיתוח — וילות עם נוף לים',
    },
    metaDescription: {
      fr: 'Nof Yam — sous-quartier d\'Herzliya Pituah avec villas contemporaines vue mer. Discrétion absolue, transactions off-market.',
      en: 'Nof Yam — Herzliya Pituah sub-neighborhood with contemporary sea-view villas. Absolute discretion, off-market transactions.',
      he: 'נוף ים — תת-שכונה של הרצליה פיתוח עם וילות עכשוויות עם נוף לים.',
    },
    h1: {
      fr: 'Nof Yam — Le luxe avec vue sur la Méditerranée',
      en: 'Nof Yam — Mediterranean Sea-View Luxury',
      he: 'נוף ים — יוקרה עם נוף לים התיכון',
    },
    hero: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Nof Yam est le sous-quartier nord d'Herzliya Pituah, caractérisé par des villas contemporaines avec vues sur la Méditerranée. Plus calme que la pointe sud, il attire des familles établies et des family offices recherchant la discrétion sans sacrifier la proximité de la mer.",
      en: "Nof Yam is the northern sub-neighbourhood of Herzliya Pituah, characterised by contemporary villas with Mediterranean sea views. Quieter than the southern point, it attracts established families and family offices seeking discretion without sacrificing sea proximity.",
      he: 'נוף ים היא התת-שכונה הצפונית של הרצליה פיתוח.',
    },
    sections: [
      {
        title: { fr: 'Le profil acheteur', en: 'The Buyer Profile', he: 'פרופיל הקונה' },
        body: {
          fr: "Plus établi et plus discret que Galei Tchelet. Les familles dynastiques israéliennes, les fondateurs technologiques, et un nombre croissant d'acheteurs européens — particulièrement français et belges — composent la majorité des transactions. Le turnover est faible ; les propriétés restent typiquement entre quinze et trente ans dans la même famille.",
          en: 'More established and more discreet than Galei Tchelet. Israeli dynastic families, technology founders, and a growing number of European buyers — particularly French and Belgian — make up the majority of transactions. Turnover is low; properties typically remain in the same family for fifteen to thirty years.',
          he: 'מבוסס ודיסקרטי יותר מגלי תכלת.',
        },
      },
    ],
    facts: {
      priceRange: '$6M – $25M',
      typicalSize: { fr: '450–900 m²', en: '450–900 m²', he: '450–900 מ״ר' },
      architecture: { fr: 'Villas contemporaines avec piscine', en: 'Contemporary villas with pools', he: 'וילות עכשוויות עם בריכות' },
      buyerProfile: { fr: 'Familles établies, tech, européens', en: 'Established families, tech, Europeans', he: 'משפחות מבוססות, טק' },
    },
    adjacent: ['galei-tchelet', 'hashunit'],
    faq: [
      {
        q: { fr: 'Nof Yam ou Galei Tchelet ?', en: 'Nof Yam or Galei Tchelet?', he: 'נוף ים או גלי תכלת?' },
        a: {
          fr: 'Galei Tchelet pour le frontage mer direct et le prestige absolu. Nof Yam pour les vues mer depuis l\'étage supérieur, plus de discrétion, et des prix typiquement 30–50 % inférieurs.',
          en: 'Galei Tchelet for direct sea frontage and absolute prestige. Nof Yam for sea views from upper floors, more discretion, and prices typically 30–50% lower.',
          he: 'גלי תכלת לחזית ים ישירה. נוף ים לדיסקרטיות.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime', 'proprietes-off-market-israel-luxe'],
  },

  /* ────────────────────────── HASHUNIT (Herzliya Pituah) */
  {
    slug: 'hashunit',
    city: 'herzliya-pituah',
    dbVille: 'Herzliya Pituah',
    dbQuartier: "Sha'ar HaYam",
    names: { fr: 'HaShunit / Sha\'ar HaYam', en: 'HaShunit / Sha\'ar HaYam', he: 'השונית / שער הים' },
    tagline: {
      fr: 'Le centre résidentiel d\'Herzliya Pituah',
      en: 'Herzliya Pituah\'s residential core',
      he: 'הגרעין המגורי של הרצליה פיתוח',
    },
    seoTitle: {
      fr: 'HaShunit, Herzliya Pituah — Villas haut de gamme | Maison Israël',
      en: 'HaShunit, Herzliya Pituah — High-End Villas | Maison Israël',
      he: 'השונית, הרצליה פיתוח — וילות יוקרה',
    },
    metaDescription: {
      fr: 'HaShunit et Sha\'ar HaYam — le cœur résidentiel d\'Herzliya Pituah. Villas contemporaines, jardins privés, communauté établie.',
      en: 'HaShunit and Sha\'ar HaYam — the residential heart of Herzliya Pituah. Contemporary villas, private gardens, established community.',
      he: 'השונית ושער הים — הלב המגורי של הרצליה פיתוח.',
    },
    h1: {
      fr: 'HaShunit & Sha\'ar HaYam — Le cœur d\'Herzliya Pituah',
      en: 'HaShunit & Sha\'ar HaYam — The Heart of Herzliya Pituah',
      he: 'השונית ושער הים — הלב של הרצליה פיתוח',
    },
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "HaShunit et le secteur Sha'ar HaYam forment le cœur résidentiel d'Herzliya Pituah. Les villas contemporaines de grand standing avec jardins privés et piscines y sont la norme. Calme et discrétion assurés, sans le prix de Galei Tchelet.",
      en: "HaShunit and the Sha'ar HaYam sector form the residential heart of Herzliya Pituah. High-end contemporary villas with private gardens and pools are standard. Calm and discretion guaranteed, without the Galei Tchelet pricing.",
      he: 'השונית ושער הים מהווים את הלב המגורי של הרצליה פיתוח.',
    },
    sections: [
      {
        title: { fr: 'L\'environnement bâti', en: 'The Built Environment', he: 'הסביבה הבנויה' },
        body: {
          fr: "Les terrains sont typiquement de 500 à 1 200 m². Les villas modernes (souvent reconstruites au cours des dix à quinze dernières années) dominent, avec une architecture contemporaine blanche, des volumes ouverts, et des aménagements paysagers matures. Pour les familles internationales recherchant un environnement diplomatique-tier sans le prix absolu de la pointe de mer, c'est le choix par défaut.",
          en: 'Lots are typically 500 to 1,200 m². Modern villas (often rebuilt in the past ten to fifteen years) dominate, with contemporary white architecture, open volumes, and mature landscaping. For international families seeking a diplomatic-tier environment without the absolute pricing of the seafront, this is the default choice.',
          he: 'המגרשים בדרך כלל 500–1,200 מ"ר.',
        },
      },
    ],
    facts: {
      priceRange: '$5M – $12M',
      typicalSize: { fr: '400–800 m²', en: '400–800 m²', he: '400–800 מ״ר' },
      architecture: { fr: 'Villas contemporaines récentes', en: 'Recent contemporary villas', he: 'וילות עכשוויות חדשות' },
      buyerProfile: { fr: 'Familles internationales, diplomatie', en: 'International families, diplomatic', he: 'משפחות בינלאומיות' },
    },
    adjacent: ['galei-tchelet', 'nof-yam'],
    faq: [
      {
        q: { fr: 'Y a-t-il une école internationale à proximité ?', en: 'Are there international schools nearby?', he: 'האם יש בית ספר בינלאומי?' },
        a: {
          fr: 'Oui, l\'American International School est dans le quartier, ce qui en fait un choix particulièrement adapté aux familles internationales en relocalisation.',
          en: 'Yes, the American International School is in the neighbourhood, making it a particularly suitable choice for relocating international families.',
          he: 'כן, בית הספר הבינלאומי האמריקאי בשכונה.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime'],
  },

  /* ────────────────────────── CAESAREA ALEPH */
  {
    slug: 'caesarea-aleph',
    city: 'caesarea',
    dbVille: 'Césarée',
    dbQuartier: 'Caesarea Aleph',
    names: { fr: 'Césarée Aleph', en: 'Caesarea Aleph', he: 'קיסריה א\'' },
    tagline: {
      fr: 'Le cœur de prestige de Césarée',
      en: 'The prestige core of Caesarea',
      he: 'גרעין היוקרה של קיסריה',
    },
    seoTitle: {
      fr: 'Césarée Aleph — Villas avec front de golf et de mer | Maison Israël',
      en: 'Caesarea Aleph — Golf and Sea Front Villas | Maison Israël',
      he: 'קיסריה א׳ — וילות עם חזית גולף וים',
    },
    metaDescription: {
      fr: 'Césarée Aleph — la section originale de Césarée, autour du terrain de golf. Villas générationnelles, communauté française et israélienne établie.',
      en: 'Caesarea Aleph — the original Caesarea section, surrounding the golf course. Generational villas, established French and Israeli community.',
      he: 'קיסריה א׳ — החלק המקורי של קיסריה.',
    },
    h1: {
      fr: 'Césarée Aleph — Le golf, la mer, et l\'héritage Rothschild',
      en: 'Caesarea Aleph — Golf, Sea, and the Rothschild Legacy',
      he: 'קיסריה א׳ — גולף, ים, ומורשת רוטשילד',
    },
    hero: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Césarée Aleph est la section originale de Césarée, fondée dans sa forme moderne dans les années 1950 à travers le partenariat entre la famille Rothschild et l'État d'Israël. La section entoure le terrain de golf et inclut les rues les plus proches de la mer. C'est le cœur de prestige de la communauté.",
      en: 'Caesarea Aleph is the original section of Caesarea, founded in its modern form in the 1950s through the partnership between the Rothschild family and the State of Israel. The section surrounds the golf course and includes the streets closest to the sea. It is the prestige core of the community.',
      he: 'קיסריה א׳ היא החלק המקורי של קיסריה.',
    },
    sections: [
      {
        title: { fr: 'L\'architecture et les terrains', en: 'Architecture and Lots', he: 'אדריכלות ומגרשים' },
        body: {
          fr: "Les terrains sont parmi les plus grands d'Israël — typiquement 1 000 à 2 500 m² — et le code d'urbanisme priorise les jardins, les arbres matures, et la confidentialité visuelle. Le résultat est un environnement bâti qui se sent plus proche de la Côte d'Azur que de la plupart des banlieues israéliennes.",
          en: 'Lots are among the largest in Israel — typically 1,000 to 2,500 m² — and the planning code prioritises gardens, mature trees, and visual privacy. The result is a built environment that feels closer to the French Riviera than to most Israeli suburbs.',
          he: 'המגרשים מהגדולים בישראל — בדרך כלל 1,000–2,500 מ"ר.',
        },
      },
      {
        title: { fr: 'La communauté française', en: 'The French Community', he: 'הקהילה הצרפתית' },
        body: {
          fr: "La présence française à Césarée a été particulièrement notable. La combinaison de faible densité, environnement sécurisé, golf, mer, et le caractère véritablement discret de la communauté a attiré une migration française ultra-high-net-worth significative, tant pour des résidences principales que des résidences secondaires.",
          en: 'The French presence in Caesarea has been particularly notable. The combination of low density, secure environment, golf, sea, and the genuinely understated character of the community has attracted significant French ultra-high-net-worth migration, both for primary residences and second homes.',
          he: 'הנוכחות הצרפתית בקיסריה הייתה משמעותית במיוחד.',
        },
      },
    ],
    facts: {
      priceRange: '$5M – $30M',
      typicalSize: { fr: '500–1 200 m²', en: '500–1,200 m²', he: '500–1,200 מ״ר' },
      architecture: { fr: 'Villas contemporaines, terrains 1 000-2 500 m²', en: 'Contemporary villas, 1,000–2,500 m² lots', he: 'וילות עכשוויות' },
      buyerProfile: { fr: 'Familles établies israéliennes, français UHNW', en: 'Established Israeli families, French UHNW', he: 'משפחות מבוססות' },
    },
    adjacent: ['golf-quarter'],
    faq: [
      {
        q: { fr: 'Combien de temps pour rejoindre Tel Aviv ?', en: 'How long to Tel Aviv?', he: 'כמה זמן לתל אביב?' },
        a: {
          fr: 'Quarante à soixante minutes selon le trafic. C\'est un seuil significatif — Césarée n\'est pas un quartier-dortoir de Tel Aviv, c\'est une communauté autonome.',
          en: 'Forty to sixty minutes depending on traffic. This is a meaningful threshold — Caesarea is not a Tel Aviv commuter neighborhood, it is a self-contained community.',
          he: '40–60 דקות תלוי בעומס.',
        },
      },
      {
        q: { fr: 'Le golf est-il important pour la valeur ?', en: 'Does golf affect property value?', he: 'האם הגולף משפיע על הערך?' },
        a: {
          fr: 'Significativement. Les villas avec front de golf commandent une prime de 20-40 % par rapport aux propriétés équivalentes sans cette vue. C\'est un des rares quartiers en Israël où le golf est un facteur de prix.',
          en: 'Significantly. Golf-frontage villas command a 20–40% premium over equivalent properties without the view. This is one of the few Israeli neighborhoods where golf is a pricing factor.',
          he: 'משמעותית. וילות עם חזית גולף שוות 20%–40% יותר.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime', 'proprietes-off-market-israel-luxe'],
  },

  /* ────────────────────────── GOLF QUARTER (Caesarea) */
  {
    slug: 'golf-quarter',
    city: 'caesarea',
    dbVille: 'Césarée',
    dbQuartier: 'Caesarea Golf',
    names: { fr: 'Quartier du Golf', en: 'Golf Quarter', he: 'רובע הגולף' },
    tagline: {
      fr: 'Architecture contemporaine sur le parcours',
      en: 'Contemporary architecture on the course',
      he: 'אדריכלות עכשווית על המסלול',
    },
    seoTitle: {
      fr: 'Quartier du Golf, Césarée — Villas modernes sur le parcours | Maison Israël',
      en: 'Golf Quarter, Caesarea — Modern Villas on the Course | Maison Israël',
      he: 'רובע הגולף, קיסריה — וילות מודרניות',
    },
    metaDescription: {
      fr: 'Le Quartier du Golf à Césarée — sections 13 et 14, les villas contemporaines les plus ambitieuses d\'Israël sur le parcours du golf.',
      en: 'Caesarea Golf Quarter — sections 13 and 14, Israel\'s most ambitious contemporary villas on the golf course.',
      he: 'רובע הגולף בקיסריה — חלקים 13 ו-14.',
    },
    h1: {
      fr: 'Quartier du Golf — Le Césarée contemporain',
      en: 'Golf Quarter — Contemporary Caesarea',
      he: 'רובע הגולף — קיסריה העכשווית',
    },
    hero: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Les sections plus récentes de Césarée — particulièrement Césarée 13 et 14 — ont produit une partie de l'architecture résidentielle contemporaine la plus ambitieuse d'Israël. Le quartier offre quelque chose qu'Herzliya Pituah ne peut pas : des opportunités significatives de construction neuve sur terrains non développés.",
      en: 'The newer sections of Caesarea — particularly Caesarea 13 and 14 — have produced some of the most ambitious contemporary residential architecture in Israel. The quarter offers something Herzliya Pituah cannot: meaningful new construction opportunities on undeveloped lots.',
      he: 'החלקים החדשים יותר של קיסריה — במיוחד 13 ו-14 — הפיקו חלק מהאדריכלות המגורית העכשווית השאפתנית ביותר בישראל.',
    },
    sections: [
      {
        title: { fr: 'Construction neuve', en: 'New Construction', he: 'בנייה חדשה' },
        body: {
          fr: "La Caesarea Development Corporation libère périodiquement des terrains dans les nouvelles sections sous des directives architecturales contrôlées. Pour les acheteurs qui veulent construire leur résidence selon leurs propres spécifications — chose impossible à Herzliya Pituah désormais bâti à pleine capacité — Césarée reste l'option principale en Israël.",
          en: 'The Caesarea Development Corporation periodically releases lots in newer sections under controlled architectural guidelines. For buyers who want to build their residence to their own specifications — impossible in Herzliya Pituah now built to full capacity — Caesarea remains the primary option in Israel.',
          he: 'תאגיד פיתוח קיסריה משחרר מדי פעם מגרשים בחלקים החדשים.',
        },
      },
    ],
    facts: {
      priceRange: '$4M – $20M',
      typicalSize: { fr: '500–1 500 m²', en: '500–1,500 m²', he: '500–1,500 מ״ר' },
      architecture: { fr: 'Construction neuve contemporaine', en: 'New-build contemporary', he: 'בנייה חדשה עכשווית' },
      buyerProfile: { fr: 'Acheteurs construisant sur mesure', en: 'Custom-build buyers', he: 'קונים הבונים מותאם' },
    },
    adjacent: ['caesarea-aleph'],
    faq: [
      {
        q: { fr: 'Puis-je acheter un terrain et construire ?', en: 'Can I buy land and build?', he: 'האם אפשר לקנות מגרש ולבנות?' },
        a: {
          fr: 'Oui, à travers les programmes de libération de la Caesarea Development Corporation. Le processus implique des directives architecturales strictes et un calendrier de construction défini. C\'est l\'option de construction sur mesure la plus accessible en Israël.',
          en: 'Yes, through the Caesarea Development Corporation\'s release programmes. The process involves strict architectural guidelines and a defined construction timeline. It is the most accessible custom-build option in Israel.',
          he: 'כן, דרך תוכניות השחרור של תאגיד הפיתוח.',
        },
      },
    ],
    relatedArticles: ['herzliya-pituah-caesarea-ultra-prime'],
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
