"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SubjectId } from "@/data/subjects";
import { DEFAULT_SUBJECT_ID, isSubjectId, subjects } from "@/data/subjects";
import { getLevelsForSubject } from "@/data/levels";

/* Equip slots — one item per character at a time. */
export interface EquippedSlots {
  human: string | null;
  companion: string | null;
}

/* Per-subject progress. Each subject has its own level chain, badges,
   and quiz scores. Switching subjects in settings preserves all of
   this so the player can pick back up later. */
export interface SubjectProgress {
  currentLevel: number;
  completedLevels: number[];
  unlockedBadges: string[];
  quizScores: Record<number, number>;
  /* Best hearts ever earned per level. Used to gate the "perfect clear"
     milestone bonus — granted once the first time a player reaches 5/5,
     even on a replay of a previously-cleared level. */
  bestHearts: Record<number, number>;
  /* Levels that have already triggered the perfect-clear bonus, so a
     player can't farm it by replaying after the first 5/5. */
  perfectClears: number[];
  totalXP: number;
}

const blankSubjectProgress = (): SubjectProgress => ({
  currentLevel: 1,
  completedLevels: [],
  unlockedBadges: [],
  quizScores: {},
  bestHearts: {},
  perfectClears: [],
  totalXP: 0,
});

/** Bonus dirhams granted the first time a player perfect-clears (5/5 hearts). */
export const PERFECT_CLEAR_BONUS = 5;
/** Hearts threshold that counts as a perfect clear. Matches LessonShell.TOTAL_HEARTS. */
export const PERFECT_HEARTS = 5;

export interface GameState {
  student: { name: string; avatarId: number; companionId: string };
  /* Which subject the player is currently studying. Drives which level
     curriculum the Map page reads, which lessons LessonShell loads, etc. */
  currentSubject: SubjectId;
  /* Per-subject progress. Always read via `progressFor(currentSubject)`
     in components so the active subject's chain is what's displayed. */
  subjectProgress: Record<SubjectId, SubjectProgress>;
  /* In-game currency — SHARED across subjects. Earned anywhere, spent
     anywhere in the souq. */
  dirhams: number;
  dirhamsEarnedAllTime: number;
  /* Items the player has bought from the Souq — also shared. */
  ownedItems: string[];
  equipped: EquippedSlots;
  soundEnabled: boolean;
  reducedMotion: boolean;
  arabicNumerals: boolean;
  /* True once the player has seen (or skipped) the first-visit map tour.
     Reset to false from the Profile page to replay it. */
  tourComplete: boolean;
  /* True once the player has interacted with any item in the Souq. Used to
     hide the "Tap an item above to try it on" first-time hint. */
  souqHintDismissed: boolean;
  setStudent: (name: string, avatarId: number, companionId?: string) => void;
  setCurrentSubject: (subjectId: SubjectId) => void;
  completeLevel: (
    levelId: number,
    score: number,
    xpEarned: number,
    dirhamsEarned: number,
    heartsLeft: number
  ) => { perfectBonus: number; isFirstPerfect: boolean };
  buyItem: (itemId: string, price: number) => boolean;
  equipItem: (slot: keyof EquippedSlots, itemId: string) => void;
  unequipItem: (slot: keyof EquippedSlots) => void;
  /* Dev-only helper: adds dirhams to the wallet without touching all-time. */
  addDirhams: (amount: number) => void;
  /* Dev-only helper: unlocks every badge and every level across every subject.
     Sets each subject's currentLevel past the last level, fills unlockedBadges,
     and marks each level as completed + perfect-cleared. Used to test the
     all-subjects-complete state of the rewards page (trophy + cert unlocked). */
  unlockEverything: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setArabicNumerals: (enabled: boolean) => void;
  setTourComplete: (complete: boolean) => void;
  dismissSouqHint: () => void;
  resetProgress: () => void;
}

const initialState = {
  student: { name: "", avatarId: 0, companionId: "camel" },
  currentSubject: DEFAULT_SUBJECT_ID as SubjectId,
  subjectProgress: {
    space: blankSubjectProgress(),
    heritage: blankSubjectProgress(),
    nature: blankSubjectProgress(),
  } as Record<SubjectId, SubjectProgress>,
  dirhams: 0,
  dirhamsEarnedAllTime: 0,
  ownedItems: [] as string[],
  equipped: { human: null, companion: null } as EquippedSlots,
  soundEnabled: true,
  reducedMotion: false,
  arabicNumerals: false,
  tourComplete: false,
  souqHintDismissed: false,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      setStudent: (name, avatarId, companionId) =>
        set((state) => ({
          student: {
            name,
            avatarId,
            companionId: companionId ?? state.student.companionId,
          },
        })),
      setCurrentSubject: (subjectId) =>
        set((state) => {
          // If somehow the slot doesn't exist (data integrity), seed it.
          const next = { ...state.subjectProgress };
          if (!next[subjectId]) next[subjectId] = blankSubjectProgress();
          return { currentSubject: subjectId, subjectProgress: next };
        }),
      completeLevel: (levelId, score, xpEarned, dirhamsEarned, heartsLeft) => {
        let outcome = { perfectBonus: 0, isFirstPerfect: false };
        set((state) => {
          const subjectId = state.currentSubject;
          const prev = state.subjectProgress[subjectId] ?? blankSubjectProgress();
          const alreadyCompleted = prev.completedLevels.includes(levelId);
          const completedLevels = alreadyCompleted
            ? prev.completedLevels
            : [...prev.completedLevels, levelId];
          const nextLevelNumber = Math.max(prev.currentLevel, levelId + 1);
          const badgeId = `badge-${subjectId}-${levelId}`;
          const unlockedBadges = prev.unlockedBadges.includes(badgeId)
            ? prev.unlockedBadges
            : [...prev.unlockedBadges, badgeId];

          // Track best-ever hearts per level (for stats / future use).
          const prevBest = prev.bestHearts[levelId] ?? 0;
          const newBest = Math.max(prevBest, heartsLeft);
          const bestHearts =
            newBest > prevBest
              ? { ...prev.bestHearts, [levelId]: newBest }
              : prev.bestHearts;

          // Perfect-clear bonus: first time the player gets 5/5 on this level
          // (works on the original clear OR on a later replay).
          const wasPerfect = heartsLeft >= PERFECT_HEARTS;
          const alreadyPerfect = prev.perfectClears.includes(levelId);
          const isFirstPerfect = wasPerfect && !alreadyPerfect;
          const perfectClears = isFirstPerfect
            ? [...prev.perfectClears, levelId]
            : prev.perfectClears;
          const perfectBonus = isFirstPerfect ? PERFECT_CLEAR_BONUS : 0;
          outcome = { perfectBonus, isFirstPerfect };

          const updated: SubjectProgress = {
            currentLevel: nextLevelNumber,
            completedLevels,
            unlockedBadges,
            bestHearts,
            perfectClears,
            totalXP: alreadyCompleted ? prev.totalXP : prev.totalXP + xpEarned,
            quizScores: { ...prev.quizScores, [levelId]: score },
          };
          // Standard XP/dirhams on first clear; perfect bonus on first 5/5.
          const dirhamsDelta =
            (alreadyCompleted ? 0 : dirhamsEarned) + perfectBonus;
          return {
            subjectProgress: { ...state.subjectProgress, [subjectId]: updated },
            dirhams: state.dirhams + dirhamsDelta,
            dirhamsEarnedAllTime: state.dirhamsEarnedAllTime + dirhamsDelta,
          };
        });
        return outcome;
      },
      buyItem: (itemId, price) => {
        let success = false;
        set((state) => {
          if (state.ownedItems.includes(itemId)) return state;
          if (state.dirhams < price) return state;
          success = true;
          return {
            dirhams: state.dirhams - price,
            ownedItems: [...state.ownedItems, itemId],
          };
        });
        return success;
      },
      equipItem: (slot, itemId) =>
        set((state) => ({
          equipped: { ...state.equipped, [slot]: itemId },
        })),
      unequipItem: (slot) =>
        set((state) => ({
          equipped: { ...state.equipped, [slot]: null },
        })),
      addDirhams: (amount) =>
        set((state) => ({ dirhams: state.dirhams + amount })),
      unlockEverything: () =>
        set((state) => {
          const nextProgress: Record<SubjectId, SubjectProgress> = {
            ...state.subjectProgress,
          };
          let totalXP = 0;
          for (const s of subjects) {
            const subjectId = s.id;
            const levels = getLevelsForSubject(subjectId);
            const ids = levels.map((l) => l.id);
            const subjectXP = levels.reduce((acc, l) => acc + l.xpReward, 0);
            totalXP += subjectXP;
            const bestHearts: Record<number, number> = {};
            ids.forEach((id) => (bestHearts[id] = PERFECT_HEARTS));
            nextProgress[subjectId] = {
              currentLevel: ids.length > 0 ? Math.max(...ids) + 1 : 1,
              completedLevels: ids,
              unlockedBadges: ids.map((id) => `badge-${subjectId}-${id}`),
              quizScores: ids.reduce((acc, id) => {
                acc[id] = 5;
                return acc;
              }, {} as Record<number, number>),
              bestHearts,
              perfectClears: ids,
              totalXP: subjectXP,
            };
          }
          return {
            subjectProgress: nextProgress,
            // Don't change wallet (so shopping flow stays untouched), but bump
            // dirhamsEarnedAllTime so any totals look right.
            dirhamsEarnedAllTime: Math.max(state.dirhamsEarnedAllTime, totalXP),
          };
        }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
      setArabicNumerals: (enabled) => set({ arabicNumerals: enabled }),
      setTourComplete: (complete) => set({ tourComplete: complete }),
      dismissSouqHint: () => set({ souqHintDismissed: true }),
      resetProgress: () =>
        set((state) => ({
          ...initialState,
          // Preserve user preferences through reset
          soundEnabled: state.soundEnabled,
          reducedMotion: state.reducedMotion,
          arabicNumerals: state.arabicNumerals,
        })),
    }),
    {
      name: "falcons-journey-storage",
      version: 6,
      /* Migration history:
         - v0/v1 → v2: split `equippedItem` into `equipped.human/companion`
                       and force companionId to "camel".
         - v2 → v3: introduce `currentSubject` + `subjectProgress`. Old
                    top-level progress fields move into `subjectProgress.space`.
         - v3 → v4: backfill `bestHearts` + `perfectClears` on every subject.
         - v4 → v5: add `tourComplete` (default false so existing players
                    see the spotlight tour once on their next map visit).
         - v5 → v6: add `souqHintDismissed` (default false so existing players
                    see the Souq onboarding hint once). */
      migrate: (persisted: unknown, version: number) => {
        if (!persisted || typeof persisted !== "object") return persisted;
        const s = persisted as Record<string, unknown>;

        // v0/v1 → v2 (preserved from previous migration)
        if (version < 2) {
          const oldEquipped =
            typeof s.equippedItem === "string" ? (s.equippedItem as string) : null;
          s.equipped = { human: oldEquipped, companion: null };
          delete s.equippedItem;
          if (s.student && typeof s.student === "object") {
            (s.student as Record<string, unknown>).companionId = "camel";
          }
        }

        // v2 → v3: lift old top-level progress fields into subjectProgress.space.
        if (version < 3) {
          const spaceProgress: SubjectProgress = {
            currentLevel:
              typeof s.currentLevel === "number" ? (s.currentLevel as number) : 1,
            completedLevels: Array.isArray(s.completedLevels)
              ? (s.completedLevels as number[])
              : [],
            unlockedBadges: Array.isArray(s.unlockedBadges)
              ? (s.unlockedBadges as string[])
              : [],
            quizScores:
              typeof s.quizScores === "object" && s.quizScores !== null
                ? (s.quizScores as Record<number, number>)
                : {},
            bestHearts: {},
            perfectClears: [],
            totalXP: typeof s.totalXP === "number" ? (s.totalXP as number) : 0,
          };
          s.subjectProgress = {
            space: spaceProgress,
            heritage: blankSubjectProgress(),
            nature: blankSubjectProgress(),
          };
          s.currentSubject = isSubjectId(s.currentSubject)
            ? (s.currentSubject as SubjectId)
            : DEFAULT_SUBJECT_ID;
          delete s.currentLevel;
          delete s.completedLevels;
          delete s.unlockedBadges;
          delete s.quizScores;
          delete s.totalXP;
        }

        // v3 → v4: backfill `bestHearts` + `perfectClears` on every subject.
        if (version < 4) {
          const sp = (s.subjectProgress ?? {}) as Record<string, Record<string, unknown>>;
          for (const subjectId of Object.keys(sp)) {
            const sub = sp[subjectId];
            if (!sub.bestHearts || typeof sub.bestHearts !== "object") sub.bestHearts = {};
            if (!Array.isArray(sub.perfectClears)) sub.perfectClears = [];
          }
        }

        // v4 → v5: add `tourComplete`. Default false so existing players
        // see the spotlight tour once on their next map visit.
        if (version < 5) {
          if (typeof s.tourComplete !== "boolean") s.tourComplete = false;
        }

        // v5 → v6: add `souqHintDismissed`. Default false so existing players
        // see the Souq onboarding hint once on their next visit.
        if (version < 6) {
          if (typeof s.souqHintDismissed !== "boolean") s.souqHintDismissed = false;
        }

        return s;
      },
    }
  )
);

/* === Selectors ============================================================
   Components prefer these over reading subjectProgress directly so the
   "current subject" abstraction stays consistent. */

export function useCurrentSubjectProgress(): SubjectProgress {
  return useGameStore(
    (s) => s.subjectProgress[s.currentSubject] ?? blankSubjectProgress()
  );
}

export function useCurrentSubjectId(): SubjectId {
  return useGameStore((s) => s.currentSubject);
}
