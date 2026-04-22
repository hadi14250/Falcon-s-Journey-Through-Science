import type { SubjectId } from "./subjects";

export interface BadgeData {
  id: string;
  subjectId: SubjectId;
  name: string;
  nameAr: string;
  description: string;
  levelId: number;
  theme: {
    gradient: [string, string];
    accent: string;
  };
}

/* === Space subject badges (legacy: previously `badge-level-N`).
   Kept under both ids for back-compat with already-persisted users —
   the store v3 migration leaves old `badge-level-N` ids in place
   under `subjectProgress.space.unlockedBadges`. New completions
   write `badge-space-N`. The lookup tolerates both. */
const spaceBadges: BadgeData[] = [
  {
    id: "badge-space-1",
    subjectId: "space",
    name: "Sun Seeker",
    nameAr: "مستكشف الشمس",
    description: "You learned about our amazing star, the Sun!",
    levelId: 1,
    theme: { gradient: ["#F59E0B", "#DC2626"], accent: "#FCD34D" },
  },
  {
    id: "badge-space-2",
    subjectId: "space",
    name: "Moon Walker",
    nameAr: "رائد القمر",
    description: "You explored Earth and Moon: day, night, and lunar phases!",
    levelId: 2,
    theme: { gradient: ["#94A3B8", "#475569"], accent: "#E2E8F0" },
  },
  {
    id: "badge-space-3",
    subjectId: "space",
    name: "Planet Explorer",
    nameAr: "مستكشف الكواكب",
    description: "You discovered Mercury, Venus, and Mars: the inner planets!",
    levelId: 3,
    theme: { gradient: ["#EF4444", "#B91C1C"], accent: "#FCA5A5" },
  },
  {
    id: "badge-space-4",
    subjectId: "space",
    name: "Asteroid Dodger",
    nameAr: "بطلُ الكويكبات",
    description: "You navigated the rocky Asteroid Belt!",
    levelId: 4,
    theme: { gradient: ["#78716C", "#44403C"], accent: "#D6D3D1" },
  },
  {
    id: "badge-space-5",
    subjectId: "space",
    name: "Gas Giant Guide",
    nameAr: "سيد العمالقة",
    description: "You met the giant outer planets of our solar system!",
    levelId: 5,
    theme: { gradient: ["#8B5CF6", "#4C1D95"], accent: "#C4B5FD" },
  },
  {
    id: "badge-space-6",
    subjectId: "space",
    name: "Hope Pioneer",
    nameAr: "رائد الأمل",
    description: "You completed the Hope Probe mission, just like the UAE reached Mars!",
    levelId: 6,
    theme: { gradient: ["#009639", "#CE1126"], accent: "#D4AF37" },
  },
];

/* === UAE Heritage subject badges (one per emirate) === */
const heritageBadges: BadgeData[] = [
  {
    id: "badge-heritage-1",
    subjectId: "heritage",
    name: "Capital Explorer",
    nameAr: "مستكشف العاصمة",
    description: "You explored Abu Dhabi, the capital of the UAE!",
    levelId: 1,
    theme: { gradient: ["#D4AF37", "#B8862E"], accent: "#FCD34D" },
  },
  {
    id: "badge-heritage-2",
    subjectId: "heritage",
    name: "Sky Climber",
    nameAr: "متسلق السماء",
    description: "You discovered Dubai and the world's tallest building!",
    levelId: 2,
    theme: { gradient: ["#3B82F6", "#1E3A8A"], accent: "#7AC4FF" },
  },
  {
    id: "badge-heritage-3",
    subjectId: "heritage",
    name: "Culture Keeper",
    nameAr: "حافظ الثقافة",
    description: "You discovered Sharjah, the cultural capital of the Arab world!",
    levelId: 3,
    theme: { gradient: ["#8B5CF6", "#5B21B6"], accent: "#C4B5FD" },
  },
  {
    id: "badge-heritage-4",
    subjectId: "heritage",
    name: "Dhow Builder",
    nameAr: "بنّاء الداو",
    description: "You learned about Ajman and the world's biggest dhow yard!",
    levelId: 4,
    theme: { gradient: ["#F97316", "#9A3412"], accent: "#FDBA74" },
  },
  {
    id: "badge-heritage-5",
    subjectId: "heritage",
    name: "Lagoon Explorer",
    nameAr: "مستكشف البحيرات",
    description: "You explored the calm lagoons of Umm Al Quwain!",
    levelId: 5,
    theme: { gradient: ["#0E8C6B", "#064E3B"], accent: "#67E8F9" },
  },
  {
    id: "badge-heritage-6",
    subjectId: "heritage",
    name: "Mountain Climber",
    nameAr: "متسلّق الجبال",
    description: "You climbed Jebel Jais, the tallest mountain in the UAE!",
    levelId: 6,
    theme: { gradient: ["#A8826B", "#5C4510"], accent: "#FCD7AB" },
  },
  {
    id: "badge-heritage-7",
    subjectId: "heritage",
    name: "Coast Guardian",
    nameAr: "حارس الساحل",
    description: "You discovered Fujairah and the UAE's oldest mosque!",
    levelId: 7,
    theme: { gradient: ["#22D3EE", "#0E8C6B"], accent: "#A7F3D0" },
  },
];

export const badges: BadgeData[] = [...spaceBadges, ...heritageBadges];

export const badgesBySubject: Record<SubjectId, BadgeData[]> = {
  space: spaceBadges,
  heritage: heritageBadges,
  nature: [],
};

export function getBadgesForSubject(subjectId: SubjectId): BadgeData[] {
  return badgesBySubject[subjectId] ?? [];
}

/* Badge id resolver. Tolerates both new (`badge-{subject}-N`) and legacy
   (`badge-level-N` from pre-v3 stores) ids so saved progress still maps
   to the right BadgeData. */
export function findBadgeById(id: string): BadgeData | undefined {
  const direct = badges.find((b) => b.id === id);
  if (direct) return direct;
  // Legacy id like "badge-level-3" → map to "badge-space-3"
  const legacyMatch = id.match(/^badge-level-(\d+)$/);
  if (legacyMatch) {
    return badges.find((b) => b.subjectId === "space" && b.levelId === Number(legacyMatch[1]));
  }
  return undefined;
}
