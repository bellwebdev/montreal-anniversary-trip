export type Rating = {
  score: number;
  count?: string;
};

export type ChoiceOption = {
  id: string;
  label: string;
  description?: string;
  /** Search query for a "Get Directions" link. Omit for options that aren't an actual place (e.g. "Skip entirely"). */
  mapQuery?: string;
  /** Google rating snapshot taken at planning time — may drift slightly by trip date. */
  rating?: Rating;
};

export type Choice = {
  id: string;
  prompt: string;
  options: ChoiceOption[];
};

export type ActivityItem =
  | string
  | {
      text: string;
      /** Exact substring of `text` to highlight and link. */
      place: string;
      /** Search query for a "Get Directions" link. */
      mapQuery: string;
    };

export type Section = {
  id: string;
  heading: string;
  items?: ActivityItem[];
  note?: string;
  choice?: Choice;
  anchor?: boolean;
};

export type MealPeriod = "Breakfast" | "Lunch" | "Dinner";

export type MenuItem = {
  name: string;
  original?: string;
  price?: string;
};

export type MenuSection = {
  section: string;
  items: MenuItem[];
};

export type Reservation = {
  venue: string;
  time?: string;
  mapQuery?: string;
  note?: string;
  menu?: MenuSection[];
  rating?: Rating;
};

export type Venue = {
  name: string;
  description?: string;
  mapQuery?: string;
  rating?: Rating;
};

export type MealSlot = {
  period: MealPeriod;
  anchor?: boolean;
  /** Pickable real venue options, synced via /api/choices. Omit for a generic meal with no choice. */
  choice?: Choice;
  /** Plain description shown instead of a choice (e.g. "wander the market and grab whatever looks good"). */
  note?: string;
  /** A single locked-in venue with no picking, shown with a bolded name, rating, and description. */
  venue?: Venue;
  /** A locked-in reservation with no picking — shows the venue and an optional translated menu. */
  reservation?: Reservation;
};

export type Day = {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  vibe?: string;
  isAnniversary?: boolean;
  /** ISO date (YYYY-MM-DD) — nav link stays visible but unclickable until this date arrives. */
  unlockDate?: string;
  sections: Section[];
  meals?: MealSlot[];
};

export const tripDates = "June 25 – June 29";

export function isDayLocked(day: Day) {
  if (!day.unlockDate) return false;
  const today = new Date().toISOString().slice(0, 10);
  return today < day.unlockDate;
}

export const days: Day[] = [
  {
    id: 1,
    date: "June 25",
    title: "Day 1 Exploration",
    subtitle: "Neighborhood Walk",
    vibe: "Casually walk around and explore close by.",
    sections: [
      {
        id: "d1-evening",
        heading: "Evening Plan",
        items: [
          "Arrive and check in",
          "Casually walk around and explore the neighborhood near the AirBnb",
          "Stop by a metro station to check out weekend passes",
        ],
      },
    ],
    meals: [
      {
        period: "Dinner",
        note: "No plan — wander the neighborhood and see what looks good.",
      },
    ],
  },
  {
    id: 2,
    date: "June 26",
    title: "Little Italy + Jean-Talon Market + Old Montréal Evening",
    subtitle: "Markets & Neighborhoods",
    sections: [
      {
        id: "d2-morning",
        heading: "Morning — Little Italy",
        items: ["Wander around Montreal's Little Italy. Explore shops and food authentic to that area"],
      },
      {
        id: "d2-midday",
        heading: "Midday — Jean-Talon Market",
        items: ["Experience Montreal's take on a farmer's market"],
      },
      {
        id: "d2-afternoon",
        heading: "Afternoon/Evening Exploring — Old Montréal",
        items: [
          "A rich repository of history as a port and a maritime, technological, and industrial site.",
          {
            text: "Place Royale (where the City of Montréal was founded)",
            place: "Place Royale",
            mapQuery: "Place Royale, Montreal, QC",
          },
          {
            text: "“The Main” National Historic Site (Saint-Laurent Boulevard)",
            place: "“The Main” National Historic Site",
            mapQuery: "Saint-Laurent Boulevard, Montreal, QC",
          },
          {
            text: "Lachine Canal National Historic Site.",
            place: "Lachine Canal National Historic Site",
            mapQuery: "Lachine Canal National Historic Site, Montreal, QC",
          },
          {
            text: "Clock Tower, was erected between 1919 and 1922 to mark the entrance to the port and commemorate the sailors who were lost at sea during the First World War.",
            place: "Clock Tower",
            mapQuery: "Clock Tower, Old Port of Montreal, QC",
          },
        ],
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
              mapQuery: "Caffè Italia, Montreal, QC",
              rating: { score: 4.7 },
            },
            {
              id: "parma-cafe",
              label: "Parma Café",
              description: "Cozy spot near Jean-Talon Market, great coffee and sandwiches",
              mapQuery: "Parma Café, Montreal, QC",
              rating: { score: 4.4, count: "400+" },
            },
          ],
        },
      },
      {
        period: "Lunch",
        venue: {
          name: "Jean-Talon Market",
          description:
            "Located in the heart of Little Italy, the Jean-Talon Market is one of the biggest in North America. It's open year-round, so Montrealers can discover the expertise of our producers and artisans in summer and winter alike. One of the oldest public markets in Montreal, it was inaugurated in May 1933 with the aim of feeding the local population with fresh, local agri-food products, a mission that is still relevant today.",
          mapQuery: "Jean-Talon Market, Montreal, QC",
          rating: { score: 4.6, count: "32,667" },
        },
      },
      {
        period: "Dinner",
        choice: {
          id: "day2-dinner",
          prompt: "Dinner near the Old Montréal waterfront — pick a spot:",
          options: [
            {
              id: "seasalt",
              label: "SeaSalt",
              description: "Seafood right on the waterfront — oysters, ceviche, lively Old Port patio",
              mapQuery: "SeaSalt, Montreal, QC",
              rating: { score: 4.2 },
            },
            {
              id: "vieux-port-steakhouse",
              label: "Vieux-Port Steakhouse",
              description: "Montreal institution since 1983 — AAA aged beef in a cozy stone-and-fireplace building",
              mapQuery: "Vieux-Port Steakhouse, Montreal, QC",
              rating: { score: 4.4 },
            },
            {
              id: "wing-it",
              label: "Walk around and pick on the fly",
              description: "No plan — see what looks good while wandering the waterfront",
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    date: "June 27",
    title: "Botanical Garden + Flexible Evening",
    subtitle: "Nature Day",
    sections: [
      {
        id: "d3-morning",
        heading: "Morning — Botanical Garden (10:00AM Admission Time)",
        items: [
          "A greenhouse complex full of plants from around the world",
          "A place to conserve endangered plant species",
          "It was designated a National Historic Site of Canada in 2008 as it is considered to be one of the most important botanical gardens in the world due to the extent of its collections and facilities.",
        ],
      },
      {
        id: "d3-post-garden",
        heading: "Post-Botanical Garden",
        choice: {
          id: "day3-post-garden",
          prompt: "What's the move after the gardens?",
          options: [
            { id: "rest-up", label: "Rest up" },
            {
              id: "mont-royal-park",
              label: "Take the trip to Mont Royal Park",
              description: "Before a delicious dinner at Au Pied de Cochon",
              mapQuery: "Mount Royal Park, Montreal, QC",
            },
          ],
        },
      },
    ],
    meals: [
      {
        period: "Breakfast",
        venue: {
          name: "Canard Café",
          description:
            "Located in the heart of three Montreal neighborhoods, Canard Café is a unique space dedicated to specialty coffee lovers. Our mission: to offer ethical, flavorful, and locally sourced coffee in a warm and welcoming atmosphere. Whether you're a fan of latte art, a simple filter coffee, or eager to discover new flavors, our passionate team will guide you.",
          mapQuery: "Canard Café, 4299 Ontario St E, Montreal, Quebec H1V 1K4, Canada",
          rating: { score: 4.5, count: "1,539" },
        },
      },
      {
        period: "Lunch",
        choice: {
          id: "day3-lunch",
          prompt: "Lunch after the Botanical Garden — pick a spot:",
          options: [
            {
              id: "espace-pour-la-vie",
              label: "Espace pour la vie restaurant",
              description: "On-site, vegetarian, seasonal — no need to leave the gardens",
              mapQuery: "Montreal Botanical Garden, Montreal, QC",
              rating: { score: 4.0, count: "1k+" },
            },
            {
              id: "plateau-wander",
              label: "Head to the Plateau and find something that catches our eye",
            },
          ],
        },
      },
      {
        period: "Dinner",
        venue: {
          name: "Au Pied de Cochon",
          description:
            "The Au Pied de Cochon restaurant is where it all began. Passed from one generation to the next, family knowledge contributes to the restaurant's reputation. Constantly evolving, the Pied de Cochon celebrates its 20th anniversary in November 2021. This à la carte restaurant is located in the heart of the Plateau Mont-Royal. Authentic to its Quebec and Canadian roots, the dishes are hearty and comforting. Adopting the style from French brasseries, the chef and his team draw inspiration from local and seasonal products to create a timeless menu.",
          mapQuery: "Au Pied de Cochon, Montreal, QC",
          rating: { score: 4.5, count: "3,743" },
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
        id: "d4-pre-dinner",
        heading: "Pre-dinner day",
        choice: {
          id: "day4-pre-dinner",
          prompt: "How do we want to spend the day before dinner?",
          options: [
            { id: "rest", label: "Catch up on rest" },
            { id: "revisit", label: "Revisit previous areas", description: "Plateau, Old Montreal, Little Italy" },
          ],
        },
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
              mapQuery: "St-Viateur Bagel, Montreal, QC",
              rating: { score: 4.6, count: "8.8k+" },
            },
            {
              id: "fairmount-bagel",
              label: "Fairmount Bagel",
              description: "The oldest bagel shop in Montreal, since 1919",
              mapQuery: "Fairmount Bagel, Montreal, QC",
              rating: { score: 4.4 },
            },
            {
              id: "beautys",
              label: "Beautys Luncheonette",
              description: "Iconic diner since 1942 — try the Beauty Special",
              mapQuery: "Beautys Luncheonette, Montreal, QC",
              rating: { score: 4.1, count: "1.8k+" },
            },
          ],
        },
      },
      {
        period: "Lunch",
        venue: {
          name: "Wherever the wind takes us",
          description:
            "Did anything catch our eye somewhere? If so, let's circle back to something we wanted to try. If not, let's find something new!",
        },
      },
      {
        period: "Dinner",
        anchor: true,
        reservation: {
          venue: "Casavant",
          time: "8:30 PM",
          mapQuery: "Casavant restaurant, Montreal, QC",
          rating: { score: 4.8, count: "400+" },
          note: "Tonight's the big one — our cozy, intimate anniversary dinner. Just show up and enjoy.",
          menu: [
            {
              section: "To Start",
              items: [
                {
                  name: "Autumn bread, flower butter",
                  original: "Pain d'automne, beurre aux fleurs",
                  price: "$9",
                },
                {
                  name: "Asparagus & sucrine lettuce salad, buttermilk vinaigrette",
                  original: "Salade d'asperge & sucrine, vinaigrette au babeurre",
                  price: "$19",
                },
                {
                  name: "Beef tartare, smoked mackerel",
                  original: "Tartare de bœuf, maquereau fumé",
                  price: "$25",
                },
                {
                  name: "Fresh scallops, Pascal's chorizo",
                  original: "Pétoncles frais, chorizo de Pascal",
                  price: "$27",
                },
                {
                  name: "Stuffed morels, green peas & vin jaune",
                  original: "Morilles farcies, pois verts & vin jaune",
                  price: "$25",
                },
                {
                  name: "Tomato tartlet, sardines, Comté & fresh herbs",
                  original: "Tartelette aux tomates, sardines, Comté & fines herbes",
                  price: "$21",
                },
              ],
            },
            {
              section: "Mains",
              items: [
                {
                  name: "Hanger steak, chanterelles, fiddleheads & brown butter",
                  original: "Onglet de bœuf, chanterelles, têtes de violon & beurre noisette",
                  price: "$39",
                },
                {
                  name: "Black paccheri pasta with lobster, tomato bisque & pea shoots",
                  original: "Paccheri neri au homard, bisque tomatée & feuilles de pois",
                  price: "$48",
                },
                {
                  name: "Sea bass à la Grenobloise",
                  original: "Bar à la grenobloise",
                  price: "$33",
                },
                {
                  name: "Duck breast, Quebec asparagus & sea buckthorn",
                  original: "Magret de canard, asperges du Québec & argousier",
                  price: "$38",
                },
              ],
            },
            {
              section: "Dessert",
              items: [
                {
                  name: "Chocolate mousse & black sesame",
                  original: "Mousse au chocolat & sésame noir",
                  price: "$13",
                },
                {
                  name: "Maple cake, sweet clover ice cream",
                  original: "Gâteau à l'érable, glace mélilot",
                  price: "$17",
                },
                {
                  name: "Cheese plate",
                  original: "Assiette de fromages",
                  price: "$9 / $21",
                },
              ],
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
    unlockDate: "2026-06-29",
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
              mapQuery: "Dispatch Coffee, Montreal, QC",
              rating: { score: 4.3 },
            },
            {
              id: "cafe-olimpico",
              label: "Café Olimpico",
              description: "Legendary Mile End espresso bar",
              mapQuery: "Café Olimpico, Montreal, QC",
              rating: { score: 4.7, count: "3k+" },
            },
            {
              id: "la-distributrice",
              label: "La Distributrice",
              description: "Tiny grab-and-go window near Mont-Royal metro — fastest if we're rushing (double-check it's still open before counting on it)",
              mapQuery: "La Distributrice, Montreal, QC",
              rating: { score: 4.7, count: "129" },
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
