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

export type Day = {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  vibe?: string;
  isAnniversary?: boolean;
  sections: Section[];
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
          "Optional coffee or dessert stop",
        ],
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
        items: [
          "Coffee and pastry stop",
          "Slow walk through Italian cafés and bakeries",
          "Light neighborhood exploration",
        ],
      },
      {
        id: "d2-midday",
        heading: "Midday — Jean-Talon Market",
        items: [
          "Fresh produce market experience",
          "Local cheeses, baked goods, and food stalls",
          "Casual lunch from vendors",
        ],
      },
      {
        id: "d2-afternoon",
        heading: "Afternoon — Plateau Mont-Royal (Optional Wandering)",
        items: [
          "Street art and murals",
          "Small cafés and shops",
          "Relaxed walking, no fixed route",
        ],
      },
      {
        id: "d2-evening",
        heading: "Evening — Casual Dinner (Plateau Area)",
        note: "Flexible walk-in dinner depending on energy level.",
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
        items: [
          "Themed gardens and greenhouses",
          "Slow walking and photography",
          "Relaxed exploration",
        ],
      },
      {
        id: "d3-midday",
        heading: "Midday Break",
        items: ["Coffee or light snack", "Rest period (no fixed plan)"],
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
            { id: "skip", label: "Skip entirely", description: "Rest and recharge instead" },
          ],
        },
      },
      {
        id: "d3-evening",
        heading: "Evening — Return to Plateau",
        items: ["Casual dinner without reservations", "Relaxed neighborhood walk"],
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
        items: ["No schedule", "Slow start with coffee and light breakfast"],
      },
      {
        id: "d4-midday",
        heading: "Midday",
        items: [
          "Free wandering in Plateau or Mile End",
          "Café stops, bakeries, parks, or casual exploration",
          "Entirely mood-based",
        ],
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
          ],
        },
      },
      {
        id: "d4-evening",
        heading: "Evening — Anniversary Dinner (Fixed)",
        anchor: true,
        items: [
          "Plateau Mont-Royal French/Québécois bistro dinner",
          "Cozy, intimate dining experience",
          "Seasonal cuisine with French influence and Québec ingredients",
        ],
      },
      {
        id: "d4-post",
        heading: "Post-Dinner",
        items: ["Optional slow walk through Plateau streets", "Coffee or dessert if desired"],
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
        items: ["Coffee and packing", "Departure"],
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
