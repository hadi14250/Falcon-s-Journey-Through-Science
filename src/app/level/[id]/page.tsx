"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { AnimatePresence } from "framer-motion";
import { getLevelsForSubject } from "@/data/levels";
import { getLessonForSubject } from "@/data/lessons";
import { useGameStore, useCurrentSubjectProgress } from "@/lib/store";
import HurrIntro from "@/components/level/HurrIntro";
import LessonShell, { type LessonResult } from "@/components/lesson/LessonShell";
import LessonComplete from "@/components/lesson/LessonComplete";

type Phase = "intro" | "lesson" | "complete";

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const levelId = parseInt(id, 10);
  const router = useRouter();
  const { navigate } = useRouteTransition();
  const { completeLevel, student, currentSubject } = useGameStore();
  const { currentLevel, completedLevels } = useCurrentSubjectProgress();
  const levels = getLevelsForSubject(currentSubject);
  const level = levels.find((l) => l.id === levelId);
  const lesson = getLessonForSubject(currentSubject, levelId);

  const [phase, setPhase] = useState<Phase>("intro");
  const [lessonResult, setLessonResult] = useState<LessonResult | null>(null);
  const [lessonKey, setLessonKey] = useState(0); // bump to remount LessonShell on retry
  const isLocked = level ? levelId > currentLevel : false;
  // Snapshot whether this level was already completed BEFORE this attempt.
  // Captured once at mount so the LessonComplete chip stays accurate even
  // after `completeLevel` adds it to the array on the current attempt.
  const [wasReplay] = useState<boolean>(() => completedLevels.includes(levelId));

  // Redirect if level is locked — must be in useEffect, not during render
  useEffect(() => {
    if (isLocked) {
      router.push("/map");
    }
  }, [isLocked, router]);

  // Captures the outcome of completeLevel (perfect-clear bonus, etc.) so the
  // LessonComplete card can show the right copy.
  const [completionOutcome, setCompletionOutcome] = useState<{
    perfectBonus: number;
    isFirstPerfect: boolean;
  }>({ perfectBonus: 0, isFirstPerfect: false });

  const handleLessonComplete = useCallback(
    (result: LessonResult) => {
      setLessonResult(result);
      // Compute XP: full reward if passed (didn't run out of hearts), partial if not
      if (level) {
        const xpEarned = result.passed
          ? level.xpReward
          : Math.round(level.xpReward * (result.correct / Math.max(result.total, 1)));
        // Dirham reward: 5 base + 5 bonus for ≥90% accuracy (mastery push).
        const accuracy = result.total > 0 ? result.correct / result.total : 0;
        const dirhamsEarned = result.passed ? (accuracy >= 0.9 ? 20 : 10) : 0;
        if (result.passed) {
          const outcome = completeLevel(
            levelId,
            result.correct,
            xpEarned,
            dirhamsEarned,
            result.heartsLeft,
          );
          setCompletionOutcome(outcome);
        } else {
          setCompletionOutcome({ perfectBonus: 0, isFirstPerfect: false });
        }
      }
      setPhase("complete");
    },
    [level, levelId, completeLevel]
  );

  const handleReplay = useCallback(() => {
    setLessonResult(null);
    setLessonKey((k) => k + 1);
    setPhase("lesson");
  }, []);

  if (!level || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-beige">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-desert-night">Level not found</h1>
          <button
            onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
            className="mt-4 text-uae-red font-heading underline"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting locked levels
  if (isLocked) {
    return null;
  }

  // Intro / lesson / complete all paint their own cream surface — no biome
  // wrapper. Keeps the visual grammar consistent across the whole flow.
  if (phase === "intro") {
    /* Substitute the {userName} placeholder so per-level dialogue
       config can address the player by name. If the level data
       doesn't include a placeholder, fall back to prepending the
       name at the start of the line (legacy behavior). */
    const substituteName = (s: string) => {
      if (!student.name) return s.replace(/\s*[,،]?\s*\{userName\}/g, "").trim();
      if (s.includes("{userName}")) return s.replace(/\{userName\}/g, student.name);
      return `${student.name}, ${s}`;
    };
    return (
      <AnimatePresence mode="wait">
        <HurrIntro
          key="intro"
          levelId={levelId}
          subjectId={currentSubject}
          totalLevels={levels.length}
          title={level.title}
          titleAr={level.titleAr}
          hurrLine={substituteName(level.hurrIntroLine)}
          hurrLineAr={level.hurrIntroLineAr ? substituteName(level.hurrIntroLineAr) : undefined}
          ctaText={level.ctaText}
          ctaTextAr={level.ctaTextAr}
          onContinue={() => setPhase("lesson")}
          onBack={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
        />
      </AnimatePresence>
    );
  }

  if (phase === "lesson") {
    return (
      <LessonShell
        key={lessonKey}
        exercises={lesson.exercises}
        onComplete={handleLessonComplete}
        onQuit={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
      />
    );
  }

  if (phase === "complete" && lessonResult) {
    const accuracy = lessonResult.total > 0 ? lessonResult.correct / lessonResult.total : 0;
    const dirhamsEarned = lessonResult.passed ? (accuracy >= 0.9 ? 20 : 10) : 0;
    return (
      <LessonComplete
        levelId={levelId}
        result={lessonResult}
        xpEarned={
          lessonResult.passed
            ? level.xpReward
            : Math.round(level.xpReward * (lessonResult.correct / Math.max(lessonResult.total, 1)))
        }
        dirhamsEarned={dirhamsEarned}
        isReplay={wasReplay}
        perfectBonus={completionOutcome.perfectBonus}
        isFirstPerfect={completionOutcome.isFirstPerfect}
        badgeName={level.badge.name}
        badgeNameAr={level.badge.nameAr}
        onReplay={handleReplay}
      />
    );
  }

  return null;
}
