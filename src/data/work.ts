export type WorkPiece = {
  slug: string;
  brand: string;
  title: string;
  role: string;
  year: number;
  /** Vimeo ID — swap with real IDs once Rob confirms. */
  vimeoId?: string;
  /** In-tile duration label shown as timecode. */
  duration: string;
  /** Ambient poster gradient (mono/typographic — no stock imagery). */
  tone: "warm" | "cool" | "amber" | "smoke";
};

export const work: WorkPiece[] = [
  {
    slug: "mcdonalds-national",
    brand: "McDonald's",
    title: "National Brand Campaign",
    role: "Composer · Audio Director · Mix",
    year: 2025,
    duration: "00:00:60:00",
    tone: "amber",
  },
  {
    slug: "walmart-worldcup",
    brand: "Walmart Canada",
    title: "FIFA World Cup 2026",
    role: "Composer · Audio Director",
    year: 2026,
    duration: "00:00:30:00",
    tone: "warm",
  },
  {
    slug: "hyundai-launch",
    brand: "Hyundai",
    title: "Vehicle Launch Spot",
    role: "Score · Sound Design · Mix",
    year: 2024,
    duration: "00:00:45:00",
    tone: "cool",
  },
  {
    slug: "kia-broadcast",
    brand: "Kia",
    title: "Broadcast Campaign",
    role: "Composer · Voice Direction",
    year: 2024,
    duration: "00:00:30:00",
    tone: "smoke",
  },
  {
    slug: "ricola-voice",
    brand: "Ricola",
    title: "Keep Your Voice in the Game",
    role: "Composer · Audio Director",
    year: 2026,
    duration: "00:00:30:00",
    tone: "amber",
  },
  {
    slug: "mistletoe-murders",
    brand: "Hallmark · Lionsgate",
    title: "Mistletoe Murders (Series)",
    role: "Score — with Ryan McLarnon",
    year: 2024,
    duration: "00:44:00:00",
    tone: "cool",
  },
];
