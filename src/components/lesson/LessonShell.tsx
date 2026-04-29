"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import type { Exercise } from "@/data/lessons";
import HeartRow from "./HeartRow";
import FeedbackSheet from "./FeedbackSheet";
import LearnExercise from "./exercises/LearnExercise";
import TapImageExercise from "./exercises/TapImageExercise";
import TrueFalseExercise from "./exercises/TrueFalseExercise";
import MultipleChoiceExercise from "./exercises/MultipleChoiceExercise";
import MatchPairsExercise from "./exercises/MatchPairsExercise";
import ListenPickExercise from "./exercises/ListenPickExercise";
import HeartsOutOverlay from "./HeartsOutOverlay";
import StreakCelebration from "./StreakCelebration";
import LessonButton from "./LessonButton";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import { fmtNumber } from "@/lib/numerals";
import { useGameStore } from "@/lib/store";
import { sounds } from "@/lib/sounds";

const TOTAL_HEARTS = 5;

const CORRECT_HEADLINES = ["Mashallah!", "Brilliant!", "You got it!", "Amazing!", "Excellent!"];
const WRONG_HEADLINES = ["Not quite", "Almost!", "Try the next one", "Keep going"];

/* Map streak count → audio tier. Mirrors the visual tier in StreakCelebration. */
const streakTier = (streak: number): 1 | 2 | 3 => {
  if (streak >= 7) return 3;
  if (streak >= 5) return 2;
  return 1;
};

export interface LessonResult {
  correct: number;
  total: number;
  heartsLeft: number;
  passed: boolean; // user finished without running out of hearts
}

interface LessonShellProps {
  exercises: Exercise[];
  onComplete: (result: LessonResult) => void;
  onQuit: () => void;
}

export default function LessonShell({ exercises, onComplete, onQuit }: LessonShellProps) {
  const { arabicNumerals } = useGameStore();
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(TOTAL_HEARTS);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    message: string;
    detail?: string;
  }>({ show: false, isCorrect: false, message: "" });
  const [confirmQuit, setConfirmQuit] = useState(false);
  // Consecutive correct-answer counter. Resets on any wrong answer.
  // Triggers a celebration overlay at thresholds (3, 5, 7, 10).
  const [streak, setStreak] = useState(0);
  const [celebration, setCelebration] = useState<{ show: boolean; streak: number }>({
    show: false,
    streak: 0,
  });
  // When the streak overlay is up we defer the feedback sheet so they don't
  // collide visually. Stash the pending feedback here and apply on dismiss.
  const [pendingFeedback, setPendingFeedback] = useState<typeof feedback | null>(null);
  // Dev step jumper visibility — persists across renders via localStorage so
  // hiding it stays hidden even when the lesson re-mounts on retry. SSR-safe:
  // we read localStorage lazily in the initializer and fall back to true.
  const [devNavOpen, setDevNavOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("devNavOpen") !== "0";
  });

  const STREAK_THRESHOLDS = [3, 5, 7, 10];

  const current = exercises[index];
  // Progress = exercises completed, monotonically increasing.
  // Don't add a "+1 while feedback is showing" boost — that causes the bar to
  // jump forward on answer then snap back on Continue before the index advances.
  const progress = (index / exercises.length) * 100;

  /* Back button is enabled ONLY when the current step AND the previous step
     are both 'learn' cards (passive teaching slides with no answer state).
     This lets a kid re-read a fact they skipped past, but never lets them
     go back to a question they already answered (which would game hearts
     and break the "did you pass first try" signal). */
  const canGoBack =
    index > 0 &&
    current?.type === "learn" &&
    exercises[index - 1]?.type === "learn";

  const handleBack = useCallback(() => {
    if (!canGoBack) return;
    sounds.tap();
    setIndex((i) => i - 1);
  }, [canGoBack]);

  /* Called by each interactive exercise after user answers.
     - `silent=true` skips the feedback sheet (useful for exercises that show
       their own in-screen feedback, like MatchPairs).
     For 'learn' screens, advancing is direct (no feedback sheet). */
  const handleAnswer = useCallback(
    (isCorrect: boolean, detail?: string, silent = false) => {
      if (isCorrect) {
        setCorrectCount((c) => c + 1);
        const newStreak = streak + 1;
        setStreak(newStreak);
        const hitThreshold = STREAK_THRESHOLDS.includes(newStreak);

        if (silent) {
          // Advance directly — no feedback sheet, no correct chime
          // (the exercise screen is responsible for its own sound, e.g. matchPair chime)
          sounds.next();
          if (hitThreshold) {
            // Show streak overlay even on silent advance, then move on.
            sounds.streak(streakTier(newStreak));
            setCelebration({ show: true, streak: newStreak });
          }
          if (index + 1 >= exercises.length) {
            sounds.complete();
            onComplete({
              correct: correctCount + 1,
              total: exercises.filter((e) => e.type !== "learn").length,
              heartsLeft: hearts,
              passed: hearts > 0,
            });
          } else {
            setIndex((i) => i + 1);
          }
          return;
        }
        sounds.correct();
        const headline = CORRECT_HEADLINES[Math.floor(Math.random() * CORRECT_HEADLINES.length)];
        const fb = { show: true, isCorrect: true, message: headline, detail };
        if (hitThreshold) {
          // Defer the feedback sheet — celebration first, then sheet on dismiss.
          // Streak chime layers on top of the just-played sounds.correct().
          sounds.streak(streakTier(newStreak));
          setPendingFeedback(fb);
          setCelebration({ show: true, streak: newStreak });
        } else {
          setFeedback(fb);
        }
      } else {
        setHearts((h) => Math.max(0, h - 1));
        // Wrong answer ends the streak.
        setStreak(0);
        if (silent) {
          // Advance directly — no feedback sheet, no wrong buzz
          sounds.next();
          if (index + 1 >= exercises.length) {
            sounds.complete();
            onComplete({
              correct: correctCount,
              total: exercises.filter((e) => e.type !== "learn").length,
              heartsLeft: Math.max(0, hearts - 1),
              passed: hearts - 1 > 0,
            });
          } else {
            setIndex((i) => i + 1);
          }
          return;
        }
        sounds.wrong();
        sounds.heartLoss();
        const headline = WRONG_HEADLINES[Math.floor(Math.random() * WRONG_HEADLINES.length)];
        setFeedback({ show: true, isCorrect: false, message: headline, detail });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, exercises, correctCount, hearts, onComplete, streak]
  );

  /* When the streak celebration auto-dismisses, drop the deferred feedback
     sheet onscreen so the regular continue flow can resume. */
  const handleCelebrationDismiss = useCallback(() => {
    setCelebration((c) => ({ ...c, show: false }));
    if (pendingFeedback) {
      setFeedback(pendingFeedback);
      setPendingFeedback(null);
    }
  }, [pendingFeedback]);

  const handleContinue = useCallback(() => {
    setFeedback((f) => ({ ...f, show: false }));
    sounds.next();
    // brief pause for sheet to slide out, then advance
    setTimeout(() => {
      if (index + 1 >= exercises.length) {
        // Done!
        sounds.complete();
        onComplete({
          correct: correctCount + (feedback.isCorrect ? 0 : 0), // already counted
          total: exercises.filter((e) => e.type !== "learn").length,
          heartsLeft: hearts,
          passed: hearts > 0,
        });
      } else {
        setIndex((i) => i + 1);
      }
    }, 250);
  }, [index, exercises, correctCount, hearts, feedback.isCorrect, onComplete]);

  /* Learn screens advance directly via their own Continue button. */
  const handleLearnContinue = useCallback(() => {
    sounds.next();
    if (index + 1 >= exercises.length) {
      sounds.complete();
      onComplete({
        correct: correctCount,
        total: exercises.filter((e) => e.type !== "learn").length,
        heartsLeft: hearts,
        passed: hearts > 0,
      });
    } else {
      setIndex((i) => i + 1);
    }
  }, [index, exercises, correctCount, hearts, onComplete]);

  /* Hearts hitting 0 triggers overlay. */
  const isOutOfHearts = hearts === 0 && feedback.show && !feedback.isCorrect;

  const handleRestart = () => {
    setIndex(0);
    setHearts(TOTAL_HEARTS);
    setCorrectCount(0);
    setStreak(0);
    setCelebration({ show: false, streak: 0 });
    setPendingFeedback(null);
    setFeedback({ show: false, isCorrect: false, message: "" });
  };

  // Warm up audio on first interaction (iOS quirk)
  useEffect(() => {
    const unlock = () => {
      sounds.tap();
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  // Preload every user-supplied SVG sticker used in this lesson so the
  // browser has them cached before the player advances to that step.
  // Without this, each new step's <img> kicks off its own fetch and
  // shows a blank tile for 100-500ms.
  useEffect(() => {
    const stickerKeys = new Set<string>();
    for (const ex of exercises) {
      if ("sticker" in ex && typeof ex.sticker === "string") {
        stickerKeys.add(ex.sticker);
      }
      if ("options" in ex && Array.isArray(ex.options)) {
        for (const opt of ex.options) {
          if (
            typeof opt === "object" &&
            opt !== null &&
            "sticker" in opt &&
            typeof (opt as { sticker?: unknown }).sticker === "string"
          ) {
            stickerKeys.add((opt as { sticker: string }).sticker);
          }
        }
      }
    }
    // Best-effort fetch — uses fetch with low priority so it doesn't
    // block any visible work. Cached responses make subsequent <img>
    // mounts paint instantly.
    const controller = new AbortController();
    for (const key of stickerKeys) {
      const url = `/stickers/${key}.svg`;
      // We don't know which keys are file-backed vs inline SVGs, so just
      // try every key — the 404s for inline-only stickers are harmless.
      fetch(url, { signal: controller.signal }).catch(() => undefined);
    }
    return () => controller.abort();
  }, [exercises]);

  return (
    <div className="relative h-dvh bg-[var(--color-lesson-bg)] flex flex-col overflow-hidden">
      {/* === DEV-ONLY step jumper (NODE_ENV gated; never visible in prod) === */}
      {/* === DEV-ONLY step jumper — togglable so the user can hide the
            strip while testing the real layout, then bring it back to
            jump steps. Toggle state persists across step renders via
            localStorage so it survives the hot-reload + fresh mounts. === */}
      {process.env.NODE_ENV === "development" && (
        <>
          <button
            onClick={() => {
              const next = !devNavOpen;
              setDevNavOpen(next);
              try {
                window.localStorage.setItem("devNavOpen", next ? "1" : "0");
              } catch {
                /* ignore */
              }
            }}
            className="fixed top-2 right-2 z-[100] w-8 h-8 rounded-full bg-[#1A1A2E] text-[#FFD96B] border-2 border-[#FFD96B] flex items-center justify-center text-xs font-heading font-bold shadow-md active:scale-95"
            title={devNavOpen ? "Hide dev step jumper" : "Show dev step jumper"}
            aria-label="Toggle dev step jumper"
          >
            {devNavOpen ? "×" : "D"}
          </button>
          {devNavOpen && (
            <div className="shrink-0 bg-[#1A1A2E] text-white px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto pr-12">
              <span className="shrink-0 text-[9px] font-heading font-bold uppercase tracking-wider text-[#FFD96B] mr-1">
                Dev:
              </span>
              <button
                onClick={() => {
                  setIndex((i) => Math.max(0, i - 1));
                  setFeedback({ show: false, isCorrect: false, message: "" });
                  setPendingFeedback(null);
                  setCelebration({ show: false, streak: 0 });
                }}
                disabled={index === 0}
                className="shrink-0 px-2 py-0.5 rounded bg-white/15 text-[10px] font-heading font-bold uppercase tracking-wider hover:bg-white/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous step"
              >
                ◀
              </button>
              {exercises.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    setFeedback({ show: false, isCorrect: false, message: "" });
                    setPendingFeedback(null);
                    setCelebration({ show: false, streak: 0 });
                  }}
                  className={`shrink-0 w-6 h-6 rounded text-[10px] font-heading font-bold transition ${
                    i === index
                      ? "bg-[#FFD96B] text-[#1A1A2E]"
                      : "bg-white/15 text-white hover:bg-white/30"
                  }`}
                  title={`Jump to step ${i + 1} (${exercises[i].type})`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  setIndex((i) => Math.min(exercises.length - 1, i + 1));
                  setFeedback({ show: false, isCorrect: false, message: "" });
                  setPendingFeedback(null);
                  setCelebration({ show: false, streak: 0 });
                }}
                disabled={index >= exercises.length - 1}
                className="shrink-0 px-2 py-0.5 rounded bg-white/15 text-[10px] font-heading font-bold uppercase tracking-wider hover:bg-white/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next step"
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}

      {/* ============ HEADER — souq grammar (KhaleejiStar + EN/AR step
            counter + hearts + X close) with progress bar + SaduBand ============ */}
      <div className="shrink-0 px-4 pt-3 pb-2 border-b border-[#E5D9B8] bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm">
        <div className="max-w-md md:max-w-2xl mx-auto flex items-center gap-2">
          {/* Back arrow — ALWAYS rendered (no layout shift between exercise
              types), but only enabled on learn → learn transitions so a kid
              can re-read a fact without being able to retry questions. */}
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            aria-label="Back to previous step"
            aria-disabled={!canGoBack}
            className={`shrink-0 p-1.5 rounded-xl transition ${
              canGoBack
                ? "text-[#B8862E] hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 cursor-pointer"
                : "text-[#1A1A2E]/20 cursor-not-allowed"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-base text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              Step {fmtNumber(index + 1, arabicNumerals)} of {fmtNumber(exercises.length, arabicNumerals)}
            </h2>
            <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-left" dir="rtl">
              الخطوة {fmtNumber(index + 1, arabicNumerals)} من {fmtNumber(exercises.length, arabicNumerals)}
            </p>
          </div>

          <div className="shrink-0">
            <HeartRow total={TOTAL_HEARTS} remaining={hearts} />
          </div>

          <button
            onClick={() => setConfirmQuit(true)}
            className="shrink-0 -mr-1 p-1.5 rounded-xl text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 transition"
            aria-label="Quit lesson"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-md md:max-w-2xl mx-auto mt-2 relative h-3 bg-[#E5D9B8] rounded-full overflow-hidden border border-[#C9B58A]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-duo-green) 0%, var(--color-duo-green-light) 100%)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <SaduBand className="mt-2.5 max-w-md md:max-w-2xl mx-auto opacity-90" height={10} variant="prominent" />
      </div>

      {/* ============ EXERCISE CONTENT ============ */}
      <div
        className="flex-1 flex flex-col min-h-0 px-4 pt-1"
        style={{
          paddingBottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: feedback.show ? 0.45 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex-1 flex flex-col min-h-0 transition-opacity"
          >
            {current?.type === "learn" && (
              <LearnExercise exercise={current} onContinue={handleLearnContinue} />
            )}
            {current?.type === "tap-image" && (
              <TapImageExercise exercise={current} onAnswer={handleAnswer} />
            )}
            {current?.type === "true-false" && (
              <TrueFalseExercise exercise={current} onAnswer={handleAnswer} />
            )}
            {current?.type === "multiple-choice" && (
              <MultipleChoiceExercise exercise={current} onAnswer={handleAnswer} />
            )}
            {current?.type === "match-pairs" && (
              <MatchPairsExercise exercise={current} onAnswer={handleAnswer} />
            )}
            {current?.type === "listen-pick" && (
              <ListenPickExercise exercise={current} onAnswer={handleAnswer} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============ FEEDBACK SHEET ============ */}
      {!isOutOfHearts && (
        <FeedbackSheet
          show={feedback.show}
          isCorrect={feedback.isCorrect}
          message={feedback.message}
          detail={feedback.detail}
          onContinue={handleContinue}
        />
      )}

      {/* ============ STREAK CELEBRATION ============ */}
      <StreakCelebration
        show={celebration.show}
        streak={celebration.streak}
        onDismiss={handleCelebrationDismiss}
      />

      {/* ============ HEARTS OUT OVERLAY ============ */}
      <HeartsOutOverlay
        show={isOutOfHearts}
        onRetry={handleRestart}
        onQuit={onQuit}
      />

      {/* ============ QUIT CONFIRM MODAL — souq slide-up sheet ============ */}
      <AnimatePresence>
        {confirmQuit && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmQuit(false)}
          >
            <motion.div
              className="bg-[var(--color-lesson-bg)] rounded-t-3xl md:rounded-3xl w-full max-w-md shadow-2xl border-2 border-[#1A1A2E] overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 -4px 0 #C9B58A, 0 8px 24px rgba(0,0,0,0.25)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="shrink-0 px-4 pt-3 pb-2 border-b border-[#E5D9B8]">
                <div className="text-center">
                  <h2 className="font-heading font-bold text-lg text-[#1A1A2E] leading-none flex items-center justify-center gap-1.5">
                    <KhaleejiStar size={12} />
                    Quit lesson?
                  </h2>
                  <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-center" dir="rtl">
                    تترك الدرس؟
                  </p>
                </div>
                <SaduBand className="mt-2.5 opacity-90" height={10} variant="prominent" />
              </div>

              {/* Body */}
              <div className="px-4 py-4">
                <div
                  className="bg-white border-2 border-[#1A1A2E] rounded-2xl px-4 py-3"
                  style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                >
                  <p className="font-body text-sm text-[#1A1A2E]/70 text-center leading-snug">
                    Your progress in this lesson won&apos;t be saved.
                  </p>
                  <p className="font-body text-xs text-[#B8862E] text-center leading-snug mt-1" dir="rtl">
                    لن يُحفظ تقدّمك في هذا الدرس.
                  </p>
                </div>
              </div>

              {/* Sticky CTA bar */}
              <div
                className="shrink-0 px-4 pt-3 border-t border-[#E5D9B8]"
                style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
              >
                <div className="flex flex-col gap-2">
                  <LessonButton
                    variant="danger"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      setConfirmQuit(false);
                      onQuit();
                    }}
                  >
                    <span>Yes, Quit</span>
                    <span className="opacity-80 ml-2" dir="rtl">نعم</span>
                  </LessonButton>
                  <LessonButton
                    variant="neutral"
                    size="md"
                    fullWidth
                    onClick={() => setConfirmQuit(false)}
                  >
                    <span>Keep Going</span>
                    <span className="opacity-80 ml-2" dir="rtl">أكمل</span>
                  </LessonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
