"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Companion from "@/components/mascot/Companion";

/* === Streak celebration =================================================
   Brief, centered overlay that pops up when the player gets a 3-in-a-row
   or 5-in-a-row streak of correct answers in a lesson. Companion shows up
   excited with a level-appropriate line, then auto-dismisses so it doesn't
   block the lesson flow.

   Used by `LessonShell` — the shell decides when to show this and feeds
   the streak count in. Auto-fires `onDismiss` after the duration so the
   shell can move on to the regular feedback sheet.
   ====================================================================== */

interface StreakCelebrationProps {
  show: boolean;
  streak: number; // 3, 5, 7, 10, …
  durationMs?: number;
  onDismiss: () => void;
}

/* Tiered messaging — bigger streaks get bigger reactions. The line in
   English is the primary, Arabic is the small companion translation. */
function getStreakCopy(streak: number): {
  bigEn: string;
  bigAr: string;
  subEn: string;
  subAr: string;
  emoji: string;
} {
  if (streak >= 10) {
    return {
      bigEn: `${streak} in a row!`,
      bigAr: `${streak} متتالية!`,
      subEn: "You're on fire, mashallah!",
      subAr: "ما شاء الله، إنجاز رائع!",
      emoji: "🔥",
    };
  }
  if (streak >= 7) {
    return {
      bigEn: `${streak} in a row!`,
      bigAr: `${streak} متتالية!`,
      subEn: "Unstoppable!",
      subAr: "لا يوقفك شيء!",
      emoji: "⚡",
    };
  }
  if (streak >= 5) {
    return {
      bigEn: "5 in a row!",
      bigAr: "٥ متتالية!",
      subEn: "Incredible streak, battal!",
      subAr: "سلسلة رائعة، بطل!",
      emoji: "⭐",
    };
  }
  // streak === 3 (default trigger)
  return {
    bigEn: "3 in a row!",
    bigAr: "٣ متتالية!",
    subEn: "You're on a roll!",
    subAr: "أحسنت، استمر!",
    emoji: "✨",
  };
}

export default function StreakCelebration({
  show,
  streak,
  durationMs = 1700,
  onDismiss,
}: StreakCelebrationProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [show, durationMs, onDismiss]);

  const copy = getStreakCopy(streak);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Higher z than the feedback sheet (z-40) so it pops on top, but
          // pointer-events-none so it never blocks taps.
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* dim backdrop, very subtle */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* radial sunburst */}
          <motion.svg
            className="absolute"
            width="520"
            height="520"
            viewBox="0 0 520 520"
            aria-hidden="true"
            initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 0.45, rotate: 60 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {Array.from({ length: 18 }).map((_, i) => {
              const a = (i / 18) * Math.PI * 2;
              const x1 = 260 + Math.cos(a) * 110;
              const y1 = 260 + Math.sin(a) * 110;
              const x2 = 260 + Math.cos(a) * 240;
              const y2 = 260 + Math.sin(a) * 240;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FCD34D"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.svg>

          {/* card */}
          <motion.div
            className="relative bg-white border-2 border-[#1A1A2E] rounded-3xl px-8 pt-5 pb-6 max-w-sm w-[90%] text-center pointer-events-auto"
            style={{ boxShadow: "0 6px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)" }}
            initial={{ scale: 0.7, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          >
            {/* Companion bouncing in from the top of the card */}
            <motion.div
              className="flex justify-center -mt-4 mb-1"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                y: {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.15,
                },
                opacity: { duration: 0.3, delay: 0.1 },
              }}
            >
              <Companion size="md" mood="happy" hideHappyStar />
            </motion.div>

            <motion.div
              className="text-4xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 240, damping: 12 }}
              aria-hidden="true"
            >
              {copy.emoji}
            </motion.div>

            <motion.h2
              className="font-heading font-bold text-2xl text-[#00702A] mt-1 leading-none"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {copy.bigEn}
            </motion.h2>
            <motion.p
              className="font-body text-sm font-bold text-[#00702A]/75 mt-1 leading-none"
              dir="rtl"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {copy.bigAr}
            </motion.p>

            <motion.p
              className="font-body text-base text-[#1A1A2E] mt-3 leading-snug"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {copy.subEn}
            </motion.p>
            <motion.p
              className="font-body text-sm text-[#B8862E] mt-1 leading-snug"
              dir="rtl"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {copy.subAr}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
