/* === Subjects ===========================================================
   Top-level "course" the player is studying. Each subject has its own
   levels, badges, and map theme. The player's progress is scoped per
   subject so they can switch back and forth without losing anything.

   Adding a new subject:
   1. Add an entry below.
   2. Create the lesson data at src/data/lessons/{subjectId}.ts
      (export { lessons } where the keys are "level-1", "level-2", ...).
   3. Create the level data at src/data/levels/{subjectId}.ts
      (export { levels: Level[] }).
   4. Wire it into the lookup maps at the bottom of this file. */

export type SubjectId = "space" | "heritage" | "nature";

export interface Subject {
  id: SubjectId;
  /* Display name pair. */
  name: string;
  nameAr: string;
  /* Short tagline shown on subject pickers. */
  tagline: string;
  taglineAr: string;
  /* One-sentence description (used on onboarding subject card). */
  description: string;
  descriptionAr: string;
  /* Number of levels in the subject. Used to size progress bars and
     grids without having to import lesson data everywhere. */
  levelCount: number;
  /* Whether the subject is wired up with content. New subjects start
     `enabled: false` and ship as "Coming Soon" tiles in the picker. */
  enabled: boolean;
  /* Theme color used to tint subject-specific UI accents (icons in the
     picker, the progress bar of the rewards page filtered by subject). */
  themeColor: string;
  /* The biome that frames the subject's map page (shapes the map
     background, the path tiles, and the level node art). */
  mapBiome: "space" | "city" | "coast";
  /* Single-letter or short-glyph icon for compact picker chips. */
  glyph: string;
}

export const subjects: Subject[] = [
  {
    id: "heritage",
    name: "UAE Heritage",
    nameAr: "تراث الإمارات",
    tagline: "The 7 emirates and their landmarks",
    taglineAr: "الإمارات السبع ومعالمها",
    description:
      "Discover the 7 emirates, from Abu Dhabi's Grand Mosque to Fujairah's mountains.",
    descriptionAr:
      "اكتشف الإمارات السبع، من جامع أبوظبي الكبير إلى جبال الفجيرة.",
    levelCount: 7,
    enabled: true,
    themeColor: "#B8862E",
    mapBiome: "city",
    glyph: "◆",
  },
  {
    id: "space",
    name: "Space Exploration",
    nameAr: "استكشاف الفضاء",
    tagline: "Sun, planets, and the Hope Probe",
    taglineAr: "الشمس والكواكب ومسبار الأمل",
    description:
      "Travel from the desert to deep space and meet every planet in our Solar System.",
    descriptionAr:
      "سافر من الصحراء إلى أعماق الفضاء وتعرّف على كل كوكب في نظامنا الشمسي.",
    levelCount: 6,
    enabled: true,
    themeColor: "#4F6BFF",
    mapBiome: "space",
    glyph: "★",
  },
  {
    id: "nature",
    name: "Earth & Nature",
    nameAr: "الأرض والطبيعة",
    tagline: "Mangroves, mountains, and Arabian wildlife",
    taglineAr: "القرم والجبال والحياة البرية العربية",
    description:
      "Explore the deserts, coasts, and mountains of the UAE and the animals that call them home.",
    descriptionAr:
      "استكشف صحاري وسواحل وجبال الإمارات والحيوانات التي تعيش فيها.",
    levelCount: 6,
    enabled: false,
    themeColor: "#0E8C6B",
    mapBiome: "coast",
    glyph: "❀",
  },
];

export const subjectsById: Record<SubjectId, Subject> = subjects.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<SubjectId, Subject>
);

export const enabledSubjects = subjects.filter((s) => s.enabled);

/* Helper: type guard for an unknown string coming from the store / URL. */
export function isSubjectId(value: unknown): value is SubjectId {
  return typeof value === "string" && value in subjectsById;
}

/* Default subject the player lands on if they haven't picked one yet. */
export const DEFAULT_SUBJECT_ID: SubjectId = "heritage";
