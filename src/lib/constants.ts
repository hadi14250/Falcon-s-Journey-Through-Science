/* Shared game-balance constants. Re-exported from `store.ts` so existing
   callers keep working, but new code should import from here. */

/** Hearts a player starts each lesson with. */
export const TOTAL_HEARTS = 5;

/** Hearts threshold that counts as a perfect clear. */
export const PERFECT_HEARTS = 5;

/** Bonus dirhams granted the first time a player perfect-clears (5/5 hearts). */
export const PERFECT_CLEAR_BONUS = 5;

/** Streak thresholds (consecutive correct) that trigger a celebration overlay. */
export const STREAK_THRESHOLDS: readonly number[] = [3, 5, 7, 10] as const;
