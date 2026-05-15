export type Deck = {
  id: string;
  title: string;
  emoji: string;
  tint: string; // tailwind bg class for icon
  total: number;
  due: number;
  mastered: number; // 0-100
  lastReviewed: string;
};

export type Flashcard = {
  id: string;
  deckId: string;
  question: string;
  answer: string;
};

export const decks: Deck[] = [
  {
    id: "mol-bio",
    title: "Molecular Biology",
    emoji: "🧬",
    tint: "bg-blue-100",
    total: 128,
    due: 12,
    mastered: 65,
    lastReviewed: "Today",
  },
  {
    id: "art-history",
    title: "Art History 101",
    emoji: "🏛️",
    tint: "bg-orange-100",
    total: 89,
    due: 30,
    mastered: 20,
    lastReviewed: "Yesterday",
  },
  {
    id: "react-patterns",
    title: "React Design Patterns",
    emoji: "⚛️",
    tint: "bg-cyan-100",
    total: 64,
    due: 0,
    mastered: 100,
    lastReviewed: "3 days ago",
  },
  {
    id: "spanish",
    title: "Spanish Vocabulary",
    emoji: "🇪🇸",
    tint: "bg-rose-100",
    total: 240,
    due: 18,
    mastered: 42,
    lastReviewed: "Today",
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "c1",
    deckId: "mol-bio",
    question: "What is the primary function of the Mitochondria in cellular respiration?",
    answer:
      "Mitochondria produce ATP through oxidative phosphorylation — the cell's main energy currency.",
  },
  {
    id: "c2",
    deckId: "mol-bio",
    question: "What process do ribosomes carry out?",
    answer: "Translation — synthesizing proteins from mRNA templates.",
  },
  {
    id: "c3",
    deckId: "mol-bio",
    question: "Define DNA replication.",
    answer:
      "The semi-conservative process of duplicating DNA so each daughter strand contains one parent and one new strand.",
  },
];

export const stats = {
  streak: 12,
  longestStreak: 28,
  cardsReviewedToday: 42,
  cardsReviewedTotal: 1840,
  studyDays: 56,
  weekly: [12, 24, 18, 32, 28, 40, 42], // Mon..Sun
};

export const profile = {
  name: "Aarav",
  email: "aarav@pika.app",
  plan: "Free",
  referralCode: "PIKA-AARAV",
  referrals: 2,
};
