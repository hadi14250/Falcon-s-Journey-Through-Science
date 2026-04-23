"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/store";
import { companionSrcFor } from "@/data/shop";

export type CompanionMood = "idle" | "happy" | "thinking" | "flying";
export type CompanionSize = "sm" | "md" | "lg" | "xl";

interface Props {
  size?: CompanionSize;
  mood?: CompanionMood;
  className?: string;
  speech?: string;
  /* When true, the companion bobs more dramatically — used on the map node
     to emphasize "I'm hovering above the current level". */
  hovering?: boolean;
  /* Override the equipped item resolution. Useful for souq previews where
     we want to show a specific variant without actually equipping it. */
  overrideItemId?: string | null;
  /* Override the chosen companion id. Useful for souq previews where we
     want to show a different animal without committing the swap. */
  overrideCompanionId?: string;
  /* Suppress the built-in gold star that pops on `mood="happy"`. Lets the
     parent (e.g. profile picker tile) own the celebration star externally
     so it can position/animate it independently of the mascot. */
  hideHappyStar?: boolean;
  /* When true, render the mascot completely static — no bob, no rotate,
     no happy bounce. Used in the profile companion picker where we want
     a still portrait, like the human avatar tiles. */
  noAnimation?: boolean;
}

const sizeMap: Record<CompanionSize, number> = {
  sm: 80,
  md: 120,
  lg: 180,
  xl: 240,
};

/* Static-SVG companion renderer.
   Reads the chosen companion id from the store, resolves the equipped
   companion item to a variant, and renders /public/companions/{variant}/{id}.svg.
   Animation lives at the wrapper level so we don't need per-companion code. */
export default function CompanionImage({
  size = "md",
  mood = "idle",
  noAnimation = false,
  className = "",
  speech,
  hovering = false,
  overrideItemId,
  overrideCompanionId,
  hideHappyStar = false,
}: Props) {
  const { student, equipped } = useGameStore();
  const companionId = overrideCompanionId ?? student.companionId ?? "camel";
  const itemId =
    overrideItemId !== undefined ? overrideItemId : equipped.companion;
  const src = companionSrcFor(companionId, itemId);
  const px = sizeMap[size];

  // Mood-driven animation. `hovering` overrides idle with a bigger, slower bob.
  // Every variant explicitly resets x/y/rotate to 0 so transitioning between
  // moods (happy → idle, etc.) doesn't leave the mascot stuck at a stray
  // rotate value if the prior animation was interrupted mid-loop.
  const motionAnimate = noAnimation
    ? { y: 0, x: 0, rotate: 0 }
    : hovering
      ? { y: [0, -10, 0], rotate: [-2, 2, -2], x: 0 }
      : mood === "idle"
        ? { y: [0, -4, 0], rotate: 0, x: 0 }
        : mood === "happy"
          ? { y: [0, -8, 0], rotate: [0, 5, -5, 0], x: 0 }
          : mood === "flying"
            ? { y: [0, -10, 0], x: [0, 3, -3, 0], rotate: 0 }
            : { y: 0, x: 0, rotate: 0 };
  const motionTransition = noAnimation
    ? undefined
    : hovering
      ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const }
      : mood === "idle"
        ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
        : mood === "happy"
          ? { duration: 0.7, repeat: 2 }
          : mood === "flying"
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
            : undefined;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative mb-2 w-[180px] bg-white rounded-2xl px-4 py-2.5 border-2 border-[#1A1A2E]"
          style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)" }}
        >
          <p className="text-sm font-body font-bold text-[#1A1A2E] text-center leading-snug">
            {speech}
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#1A1A2E] rotate-45" />
        </motion.div>
      )}

      <motion.div
        style={{ width: px, height: px }}
        className="relative"
        animate={motionAnimate}
        transition={motionTransition}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={px}
          height={px}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.18))",
            display: "block",
          }}
        />
      </motion.div>

      {mood === "happy" && !hideHappyStar && (
        <motion.div
          className="absolute -top-2 -right-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37" aria-hidden="true">
            <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9Z" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
