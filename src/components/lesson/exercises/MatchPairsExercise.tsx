"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MatchPairsExercise as Type } from "@/data/lessons";
import LessonButton from "../LessonButton";
import { KhaleejiStar } from "@/components/ui/UaeAccent";
import { sounds } from "@/lib/sounds";

interface Props {
  exercise: Type;
  onAnswer: (isCorrect: boolean, detail?: string, silent?: boolean) => void;
}

type TileSide = "en" | "ar";
interface Tile {
  id: string;       // unique
  pairId: number;   // ties together en+ar
  side: TileSide;
  label: string;
}

/* Shuffle helper. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchPairsExercise({ exercise, onAnswer }: Props) {
  /* Build two columns:
     - Left = English (shuffled)
     - Right = Arabic (shuffled separately) */
  const { leftTiles, rightTiles } = useMemo(() => {
    const left: Tile[] = exercise.pairs.map((p, i) => ({
      id: `en-${i}`,
      pairId: i,
      side: "en",
      label: p.en,
    }));
    const right: Tile[] = exercise.pairs.map((p, i) => ({
      id: `ar-${i}`,
      pairId: i,
      side: "ar",
      label: p.ar,
    }));
    return { leftTiles: shuffle(left), rightTiles: shuffle(right) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.pairs]);

  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState<{ left: string; right: string } | null>(null);
  const [justMatched, setJustMatched] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const totalPairs = exercise.pairs.length;
  const allMatched = matched.size === totalPairs;

  /* When both sides selected, evaluate the match.
     - Match: collapse the tiles out within 120ms (eye registers the
       green flash but doesn't feel held back).
     - Wrong: red flash for 350ms (long enough to read "that was wrong",
       short enough to not feel stuck).
     - Selection cleared IMMEDIATELY on detection so leftover state can't
       poison the next eval cycle. */
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const leftPair = leftTiles.find((t) => t.id === selectedLeft)?.pairId;
      const rightPair = rightTiles.find((t) => t.id === selectedRight)?.pairId;
      if (leftPair !== undefined && leftPair === rightPair) {
        sounds.matchPair();
        setJustMatched(leftPair);
        setSelectedLeft(null);
        setSelectedRight(null);
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(leftPair));
          setJustMatched(null);
        }, 120);
      } else {
        sounds.wrong();
        setMistakes((m) => m + 1);
        setWrongFlash({ left: selectedLeft, right: selectedRight });
        setSelectedLeft(null);
        setSelectedRight(null);
        setTimeout(() => {
          setWrongFlash(null);
        }, 350);
      }
    }
  }, [selectedLeft, selectedRight, leftTiles, rightTiles]);

  /* During the brief flash windows we no longer DROP taps — we QUEUE
     the most recent tap and apply it when the window closes. The player
     feels "I tapped, my tap took effect" instead of "I tapped, nothing
     happened". */
  const queuedTapRef = useRef<Tile | null>(null);

  useEffect(() => {
    // When both flashes have ended and there's a queued tap, apply it.
    if (justMatched === null && wrongFlash === null && queuedTapRef.current) {
      const queued = queuedTapRef.current;
      queuedTapRef.current = null;
      // Re-fire the click after the flash window so it's processed cleanly.
      handleClickInternal(queued);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justMatched, wrongFlash]);

  const handleClickInternal = (tile: Tile) => {
    if (matched.has(tile.pairId)) return;
    sounds.tap();
    if (tile.side === "en") {
      setSelectedLeft((prev) => (prev === tile.id ? null : tile.id));
    } else {
      setSelectedRight((prev) => (prev === tile.id ? null : tile.id));
    }
  };

  const handleClick = (tile: Tile) => {
    if (matched.has(tile.pairId)) return;
    // During flash windows: queue the tap instead of dropping it.
    if (justMatched !== null || wrongFlash !== null) {
      queuedTapRef.current = tile;
      return;
    }
    sounds.tap();
    if (tile.side === "en") {
      setSelectedLeft(selectedLeft === tile.id ? null : tile.id);
    } else {
      setSelectedRight(selectedRight === tile.id ? null : tile.id);
    }
  };

  const handleContinue = () => {
    // Silent: the celebration card on this screen IS the feedback.
    // No need for the bottom feedback sheet to fire on top of it.
    onAnswer(mistakes === 0, undefined, true);
  };

  const tileVisible = (tile: Tile) => !matched.has(tile.pairId);

  const tileClass = (tile: Tile) => {
    // Fixed minimum height so left & right columns always row-align,
    // regardless of Arabic vs English line-box differences.
    const base = "lesson-tile w-full h-12 md:h-14 px-3 md:px-4 text-center font-heading font-bold text-sm md:text-base flex items-center justify-center";
    if (justMatched === tile.pairId) return `${base} is-correct`;
    if (wrongFlash && (wrongFlash.left === tile.id || wrongFlash.right === tile.id)) {
      return `${base} is-wrong`;
    }
    if (tile.id === selectedLeft || tile.id === selectedRight) {
      return `${base} is-selected`;
    }
    return base;
  };

  return (
    <div className="h-full flex flex-col max-w-md md:max-w-2xl mx-auto w-full min-h-0">
      {/* Prompt card — souq mini-card grammar so it reads as deliberate
          UI instead of floating text the eye can skip past. */}
      <div
        className="mt-2 mb-3 bg-white border-2 border-[#1A1A2E] rounded-2xl px-4 py-3 text-center shrink-0"
        style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
      >
        <h2 className="font-heading font-bold text-base md:text-lg text-[#1A1A2E] leading-snug">
          {exercise.prompt}
        </h2>
        <p className="font-body text-xs md:text-sm font-bold text-[#B8862E] leading-snug mt-1" dir="rtl">
          طابق الكلمات بالعربي
        </p>
        <p className="text-[10px] font-heading uppercase tracking-[0.22em] text-[#1A1A2E]/60 mt-1.5">
          {allMatched ? "All matched! · أحسنتَ" : "Tap a word, then tap its match"}
        </p>
      </div>

      <div className="flex-1 min-h-0 flex items-center overflow-hidden">
        {!allMatched ? (
          <div className="w-full grid grid-cols-2 gap-3 md:gap-4">
            {/* Left column — visible tiles only, animated reflow */}
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {leftTiles.filter(tileVisible).map((tile) => (
                  <motion.button
                    key={tile.id}
                    layout
                    onClick={() => handleClick(tile)}
                    className={tileClass(tile)}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      wrongFlash && (wrongFlash.left === tile.id || wrongFlash.right === tile.id)
                        ? { opacity: 1, scale: 1, x: [0, -6, 6, -3, 3, 0] }
                        : { opacity: 1, scale: 1, x: 0 }
                    }
                    exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.4, layout: { duration: 0.35, ease: "easeOut" } }}
                  >
                    <span>{tile.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            {/* Right column — same */}
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {rightTiles.filter(tileVisible).map((tile) => (
                  <motion.button
                    key={tile.id}
                    layout
                    onClick={() => handleClick(tile)}
                    className={tileClass(tile)}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      wrongFlash && (wrongFlash.left === tile.id || wrongFlash.right === tile.id)
                        ? { opacity: 1, scale: 1, x: [0, -6, 6, -3, 3, 0] }
                        : { opacity: 1, scale: 1, x: 0 }
                    }
                    exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.4, layout: { duration: 0.35, ease: "easeOut" } }}
                    dir="rtl"
                  >
                    <span>{tile.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* === Compact celebration card (no recap — the user already
                 watched each pair light up green as they matched it). === */
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 20 }}
          >
            <div
              className="relative border-2 border-[#1A1A2E] rounded-3xl px-5 py-5 text-center"
              style={{
                background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
                boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 250, damping: 12 }}
                className="inline-block"
              >
                <KhaleejiStar size={44} />
              </motion.div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#00702A] leading-none mt-2">
                {mistakes === 0 ? "Mashallah!" : "Well done!"}
              </h3>
              <p className="font-body text-sm font-bold text-[#00702A]/70 mt-1.5" dir="rtl">
                أحسنتَ!
              </p>
              <p className="font-body text-[12px] text-[#1A1A2E]/65 mt-2">
                {mistakes === 0
                  ? `All ${totalPairs} pairs matched perfectly.`
                  : `${totalPairs} pairs matched · ${mistakes} retr${mistakes === 1 ? "y" : "ies"}.`}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {allMatched && (
        <motion.div
          className="w-full pt-3 shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <LessonButton variant="primary" size="lg" fullWidth onClick={handleContinue}>
            <span>Continue</span>
            <span className="opacity-80 ml-2" dir="rtl">متابعة</span>
          </LessonButton>
        </motion.div>
      )}
    </div>
  );
}
