export type ChoiceOption = {
  id: string;
  label: string;
  description?: string;
};

export type Choice = {
  id: string;
  prompt: string;
  options: ChoiceOption[];
};

export type Section = {
  id: string;
  heading: string;
  items?: string[];
  note?: string;
  choice?: Choice;
  anchor?: boolean;
};

export type MealPeriod = "Breakfast" | "Lunch" | "Dinner";

export type MealSlot = {
  period: MealPeriod;
  anchor?: boolean;
  /** Pickable real venue options, synced via /api/choices. Omit for a generic meal with no choice. */
  choice?: Choice;
  /** Plain description shown instead of a choice (e.g. "wander the market and grab whatever looks good"). */
  note?: string;
};

export type Day = {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  vibe?: string;
  isAnniversary?: boolean;
  sections: Section[];
  meals?: MealSlot[];
};

export const tripDates = "June 25 – June 29";

export const corePrinciples = [
  "No rushed scheduling",
  "Minimal advance ticket requirements",
  "Transit only when necessary (Metro preferred)",
  "Flexibility based on weather and energy",
  "Focus on atmosphere, food, and shared experience over checklists",
];

export const anchorExperiences = [
  "Botanical Garden",
  "Biodome",
  "Anniversary Day dinner",
];

export const flexibilityNotes = [
  "Extend Little Italy or Jean-Talon Market if desired",
  "Skip the optional museum entirely",
  "Shorten Plateau wandering based on energy",
  "Adjust pacing due to weather or fatigue",
];

export const days: Day[] = [
  {
    id: 1,
    date: "June 25",
    title: "Gentle Arrival + First Impression",
    subtitle: "Arrival Evening",
    vibe: "Easy introduction to the city, no structured sightseeing.",
    sections: [
      {
        id: "d1-evening",
        heading: "Evening Plan",
        items: [
          "Arrive and check in",
          "Light walk in Old Montréal",
          "Explore cobblestone streets and waterfront",
        ],
      },
    ],
    meals: [
      {
        period: "Dinner",
        choice: {
          id: "day1-dinner",
          prompt: "First night in Old Montréal — where should we eat?",
          options: [
            {
              id: "modavie",
              label: "Modavie",
              description: "French/Mediterranean bistro on Saint-Paul St., live jazz most nights",
            },
            {
              id: "bevo",
              label: "Bevo",
              description: "Buzzy, casual Italian — brick walls, no-fuss pizza",
            },
            {
              id: "marche-eclusiers",
              label: "Marché des Éclusiers",
              description: "Waterfront food hall — local vendors, gourmet tacos, shareable bites",
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    date: "June 26",
    title: "Little Italy + Jean-Talon Market + Plateau Evening",
    subtitle: "Markets & Neighborhoods",
    sections: [
      {
        id: "d2-morning",
        heading: "Morning — Little Italy",
        items: ["Slow walk through Italian cafés and bakeries", "Light neighborhood exploration"],
      },
      {
        id: "d2-midday",
        heading: "Midday — Jean-Talon Market",
        items: ["Fresh produce market experience", "Local cheeses, baked goods, and food stalls"],
      },
      {
        id: "d2-afternoon",
        heading: "Afternoon Exploring — Plateau Mont-Royal",
        items: ["Street art and murals", "Small cafés and shops", "Relaxed walking, no fixed route"],
      },
    ],
    meals: [
      {
        period: "Breakfast",
        choice: {
          id: "day2-breakfast",
          prompt: "Little Italy breakfast — pick a spot:",
          options: [
            {
              id: "caffe-italia",
              label: "Caffè Italia",
              description: "Institution since 1956 — espresso, eggs Benedict, cannoli",
            },
            {
              id: "parma-cafe",
              label: "Parma Café",
              description: "Cozy spot near Jean-Talon Market, great coffee and sandwiches",
            },
            {
              id: "antipode",
              label: "Antipode",
              description: "Lively brunch — eggs Benedict, croque tartiflette, shakshuka",
            },
          ],
        },
      },
      {
        period: "Lunch",
        note: "Casual lunch from Jean-Talon Market vendors — wander the stalls and grab whatever looks good.",
      },
      {
        period: "Dinner",
        choice: {
          id: "day2-dinner",
          prompt: "Casual dinner in the Plateau — pick a spot:",
          options: [
            {
              id: "chez-victoire",
              label: "Chez Victoire",
              description: "French-inspired seasonal market cuisine, smoked-meat burger",
            },
            {
              id: "bungalow",
              label: "Bungalow",
              description: "Neighborhood favorite — Québécois, French, and Mediterranean flavors",
            },
            {
              id: "le-ptit-plateau",
              label: "Le P'tit Plateau",
              description: "Cozy regional French bistro with a personal touch",
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    date: "June 27",
    title: "Botanical Garden + Biodome + Flexible Evening",
    subtitle: "Nature Day",
    sections: [
      {
        id: "d3-morning",
        heading: "Morning — Botanical Garden",
        anchor: true,
        items: ["Themed gardens and greenhouses", "Slow walking and photography", "Relaxed exploration"],
      },
      {
        id: "d3-midday",
        heading: "Midday Break",
        items: ["Rest period (no fixed plan)"],
      },
      {
        id: "d3-afternoon",
        heading: "Afternoon — Biodome",
        anchor: true,
        items: [
          "Indoor ecosystems (rainforest, arctic, marine environments)",
          "Immersive but low-effort experience",
        ],
      },
      {
        id: "d3-addon",
        heading: "Optional Add-On (Based on Energy)",
        note: "Choose based on mood:",
        choice: {
          id: "day3-addon",
          prompt: "What sounds good after the Biodome?",
          options: [
            { id: "science", label: "Science center" },
            { id: "arts", label: "Fine arts museum" },
            {
              id: "skip",
              label: "Skip entirely",
              description: "Rest and recharge instead",
            },
          ],
        },
      },
      {
        id: "d3-evening",
        heading: "Evening — Return to Plateau",
        items: ["Relaxed neighborhood walk"],
      },
    ],
    meals: [
      {
        period: "Breakfast",
        choice: {
          id: "day3-breakfast",
          prompt: "Quick breakfast before the Botanical Garden — pick a spot:",
          options: [
            { id: "cafe-replika", label: "Café Replika" },
            { id: "pigeon-cafe", label: "Pigeon Cafe" },
            {
              id: "piel-canela",
              label: "Piel Canela",
              description: "Festive brunch spot — mimosas included",
            },
          ],
        },
      },
      {
        period: "Lunch",
        choice: {
          id: "day3-lunch",
          prompt: "Lunch between the Botanical Garden and Biodome — pick a spot:",
          options: [
            {
              id: "espace-pour-la-vie",
              label: "Espace pour la vie restaurant",
              description: "On-site, vegetarian, seasonal — no need to leave the gardens",
            },
            {
              id: "le-toit-rouge",
              label: "Le Toit Rouge",
              description: "Casual neighborhood spot right between the two attractions",
            },
            {
              id: "helicoptere",
              label: "Hélicoptère",
              description: "If you want a proper sit-down meal — seasonal Hochelaga tasting menu",
            },
          ],
        },
      },
      {
        period: "Dinner",
        choice: {
          id: "day3-dinner",
          prompt: "Back in the Plateau for dinner — pick a spot:",
          options: [
            {
              id: "au-pied-de-cochon",
              label: "Au Pied de Cochon",
              description: "Montreal institution — foie gras and pork, iconic Québécois indulgence",
            },
            {
              id: "rotisserie-la-lune",
              label: "Rôtisserie La Lune",
              description: "Casual rotisserie chicken bistro from the Mon Lapin team",
            },
            {
              id: "barranco",
              label: "Barranco",
              description: "Warm Peruvian spot — ceviche, colorful setting, change of pace",
            },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    date: "June 28",
    title: "Anniversary Day — Spontaneous Exploration + Plateau Bistro Dinner",
    subtitle: "Anniversary Day",
    isAnniversary: true,
    sections: [
      {
        id: "d4-morning",
        heading: "Morning",
        items: ["No schedule"],
      },
      {
        id: "d4-midday",
        heading: "Midday",
        items: ["Free wandering in Plateau or Mile End", "Parks and casual exploration", "Entirely mood-based"],
      },
      {
        id: "d4-afternoon",
        heading: "Afternoon (Optional)",
        note: "Choose based on energy:",
        choice: {
          id: "day4-afternoon",
          prompt: "How do you want to spend the afternoon before our dinner?",
          options: [
            {
              id: "old-montreal",
              label: "Old Montréal walk",
              description: "Cobblestone streets + waterfront",
            },
            {
              id: "mount-royal",
              label: "Mount Royal viewpoint",
              description: "Skyline views",
            },
            {
              id: "rest-recharge",
              label: "Rest and Recharge",
              description: "Head back to the BnB and chill",
            },
          ],
        },
      },
      {
        id: "d4-post",
        heading: "Post-Dinner",
        items: ["Slow walk through Plateau streets"],
      },
    ],
    meals: [
      {
        period: "Breakfast",
        choice: {
          id: "day4-breakfast",
          prompt: "Slow start in Mile End — pick a spot:",
          options: [
            {
              id: "st-viateur-bagel",
              label: "St-Viateur Bagel",
              description: "The original, wood-fired, since 1957",
            },
            {
              id: "fairmount-bagel",
              label: "Fairmount Bagel",
              description: "The oldest bagel shop in Montreal, since 1919",
            },
            {
              id: "beautys",
              label: "Beautys Luncheonette",
              description: "Iconic diner since 1942 — try the Beauty Special",
            },
          ],
        },
      },
      {
        period: "Lunch",
        choice: {
          id: "day4-lunch",
          prompt: "Wherever the wandering takes us — pick a lunch vibe:",
          options: [
            {
              id: "sparrow",
              label: "Sparrow",
              description: "Middle Eastern-leaning brunch — Turkish eggs, shakshuka",
            },
            {
              id: "aux-vivres",
              label: "Aux Vivres",
              description: "Montreal's beloved vegan spot — Golden Pancakes, smoothies",
            },
            {
              id: "falafel-yoni",
              label: "Falafel Yoni",
              description: "Quick falafel counter, great Sabich sandwich",
            },
          ],
        },
      },
      {
        period: "Dinner",
        anchor: true,
        choice: {
          id: "day4-dinner",
          prompt: "Tonight's the big one — our cozy, intimate anniversary dinner. Pick the spot:",
          options: [
            {
              id: "lexpress",
              label: "L'Express",
              description: "Montreal institution since 1980 — classic French bistro, steak tartare",
            },
            {
              id: "casavant",
              label: "Casavant",
              description: "Intimate Art Deco French bistro — beef tartare, seasonal tartelette",
            },
            {
              id: "estelle",
              label: "Estelle",
              description: "Contemporary Plateau bistro — sleek, seasonal, curated wine list",
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    date: "June 29",
    title: "Quiet Exit",
    subtitle: "Departure Morning",
    sections: [
      {
        id: "d5-morning",
        heading: "Slow Morning",
        items: ["Packing", "Departure"],
      },
    ],
    meals: [
      {
        period: "Breakfast",
        choice: {
          id: "day5-breakfast",
          prompt: "Quick coffee before we head out — pick a spot:",
          options: [
            {
              id: "dispatch-coffee",
              label: "Dispatch Coffee",
              description: "Great cold brew and pastries, Plateau location",
            },
            {
              id: "cafe-olimpico",
              label: "Café Olimpico",
              description: "Legendary Mile End espresso bar",
            },
            {
              id: "la-distributrice",
              label: "La Distributrice",
              description: "Tiny grab-and-go window near Mont-Royal metro — fastest if we're rushing",
            },
          ],
        },
      },
    ],
  },
];

export const foodIdentity = {
  intro: "Montréal cuisine is shaped by three core influences:",
  influences: [
    {
      title: "Québécois comfort food",
      points: ["Poutine", "Meat pies", "Traditional rustic dishes"],
    },
    {
      title: "Smoked meat deli culture",
      points: ["Iconic Montreal smoked meat sandwiches"],
    },
    {
      title: "French-inspired restaurant culture",
      points: ["Bistros", "Seasonal cooking", "Wine-focused dining"],
    },
  ],
  closing:
    "Plus strong immigrant food influence including Italian, Middle Eastern, Vietnamese, and Caribbean traditions.",
};

export const finalNotes = [
  "Minimize stress and decision fatigue",
  "Prioritize shared experience over checklist tourism",
  "Allow spontaneous adjustments",
  "Support a meaningful anniversary centerpiece",
  "Keep the focus on presence, not planning",
];

export const finalQuote =
  "The best experiences in Montréal often come from unplanned wandering, café stops, and neighborhood exploration.";
