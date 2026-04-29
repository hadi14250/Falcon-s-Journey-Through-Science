"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Companion from "@/components/mascot/Companion";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";

/* === Streak celebration =================================================
   Brief, centered overlay that pops up when the player gets a 3/5/7/10
   in-a-row streak of correct answers in a lesson. Tier-aware: bigger
   streaks get richer visual treatment. The number itself is the hero —
   not the "in a row!" label. Auto-dismisses so it doesn't block flow.

   Used by `LessonShell` — the shell decides when to show this and feeds
   the streak count in. Auto-fires `onDismiss` after `durationMs` so the
   shell can move on to the regular feedback sheet.

   Pass-1 ships the on-brand visual rework + entry motion. Tier escalation
   (extra particles, glow pulse, screen pulse, audio gain, haptics) is
   gated behind tier.intensity checks that all currently render the same
   t1 treatment — pass-2 turns them on.
   ====================================================================== */

interface StreakCelebrationProps {
  show: boolean;
  streak: number; // 3, 5, 7, 10, …
  durationMs?: number;
  onDismiss: () => void;
}

interface StreakTier {
  intensity: 1 | 2 | 3;
  copy: { bigEn: string; bigAr: string; subEn: string; subAr: string };
  particleCount: number;
  flankingStars: number;       // 0 / 2 / 3 — visual emphasis around the number
  glowPulse: boolean;          // gold box-shadow animation on entry (t2+)
  screenPulse: boolean;        // backdrop dim flash on entry (t3 only)
  cardShake: boolean;          // T2-only: card wiggles on impact
  cardScaleBoost: number;      // 1.0 baseline, T3 = 1.1 (card lands bigger)
  fireGradient: boolean;       // T3-only: streak number is fiery orange-red
  confetti: boolean;           // T3-only: confetti rains from top
}

/* Tiered config: keep tier boundaries here so they can be tuned without
   chasing them through render code. Pass-1 renders all tiers identically
   in practice (intensity gates are no-ops for now), but the structure is
   ready for pass-2 to flip on. */
function getStreakTier(streak: number): StreakTier {
  if (streak >= 10) {
    return {
      intensity: 3,
      copy: {
        bigEn: "in a row!",
        bigAr: "متتالية!",
        subEn: "You're on fire, mashallah!",
        subAr: "ما شاء الله، إنجاز رائع!",
      },
      particleCount: 24,
      flankingStars: 3,
      glowPulse: true,
      screenPulse: true,
      cardShake: false,
      cardScaleBoost: 1.1,
      fireGradient: true,
      confetti: true,
    };
  }
  if (streak >= 7) {
    return {
      intensity: 3,
      copy: {
        bigEn: "in a row!",
        bigAr: "متتالية!",
        subEn: "Unstoppable!",
        subAr: "لا يوقفك شيء!",
      },
      particleCount: 24,
      flankingStars: 3,
      glowPulse: true,
      screenPulse: true,
      cardShake: false,
      cardScaleBoost: 1.1,
      fireGradient: true,
      confetti: true,
    };
  }
  if (streak >= 5) {
    return {
      intensity: 2,
      copy: {
        bigEn: "in a row!",
        bigAr: "متتالية!",
        subEn: "Incredible streak, battal!",
        subAr: "سلسلة رائعة، بطل!",
      },
      particleCount: 18,
      flankingStars: 2,
      glowPulse: true,
      screenPulse: false,
      cardShake: true,
      cardScaleBoost: 1.0,
      fireGradient: false,
      confetti: false,
    };
  }
  // 3 (default trigger)
  return {
    intensity: 1,
    copy: {
      bigEn: "in a row!",
      bigAr: "متتالية!",
      subEn: "You're on a roll!",
      subAr: "أحسنت، استمر!",
    },
    particleCount: 12,
    flankingStars: 0,
    glowPulse: false,
    screenPulse: false,
    cardShake: false,
    cardScaleBoost: 1.0,
    fireGradient: false,
    confetti: false,
  };
}

export default function StreakCelebration({
  show,
  streak,
  durationMs = 3000,
  onDismiss,
}: StreakCelebrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const tier = useMemo(() => getStreakTier(streak), [streak]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [show, durationMs, onDismiss]);

  // Haptic feedback on entry — tier-shaped pattern. Skipped under reduced
  // motion (vibration is a motion cue) and on platforms without the API
  // (iOS Safari does not implement Vibration; this is a no-op there).
  useEffect(() => {
    if (!show || prefersReducedMotion) return;
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    const patterns: Record<1 | 2 | 3, number[]> = {
      1: [30],
      2: [30, 50, 30],
      3: [30, 50, 30, 60, 60],
    };
    navigator.vibrate(patterns[tier.intensity]);
  }, [show, tier.intensity, prefersReducedMotion]);

  // Particle layout — pre-compute angles so they're stable across re-renders.
  // Reduced-motion: zero particles (no burst animation at all).
  const particles = useMemo(() => {
    const count = prefersReducedMotion ? 0 : tier.particleCount;
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      // Random-ish travel distance for organic feel, deterministic per index.
      const distance = 140 + ((i * 37) % 60);
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotate: (i * 47) % 360,
      };
    });
  }, [tier.particleCount, prefersReducedMotion]);

  // Confetti pieces (tier 3 only, no reduced-motion). Each piece falls from
  // above the viewport with random horizontal drift + spin. Deterministic
  // per index for stability.
  const confetti = useMemo(() => {
    if (!tier.confetti || prefersReducedMotion) return [];
    const COUNT = 30;
    const colors = ["#D4AF37", "#FFC93C", "#FF6B35", "#CE1126", "#009639"];
    return Array.from({ length: COUNT }).map((_, i) => ({
      startXPercent: ((i * 37) % 100), // 0..99 across viewport width
      drift: ((i * 53) % 80) - 40,     // ±40px horizontal drift
      delay: (i % 8) * 0.06,           // staggered launch
      rotateEnd: ((i * 71) % 720) - 360, // -360..360 deg total spin
      color: colors[i % colors.length],
      width: 6 + (i % 3) * 2,          // 6 / 8 / 10 px wide
      height: 10 + (i % 4) * 2,        // 10 / 12 / 14 / 16 px tall
    }));
  }, [tier.confetti, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Higher z than the feedback sheet (z-40) so it pops on top.
          // Pointer-events ARE captured here: while the celebration is up
          // we want to swallow taps on the underlying lesson UI so the user
          // can't double-fire the Check button and farm extra streak counts.
          // The celebration auto-dismisses on its own timer, so blocking
          // input for ~1.7s is harmless.
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Subtle dim backdrop. On tier 3 (and not reduced-motion), it
              briefly flashes brighter on entry for a soft impact feel. */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={
              tier.screenPulse && !prefersReducedMotion
                ? { opacity: [0, 1.0, 0.6, 1.0] } // dim → flash → settle → final
                : { opacity: 1 }
            }
            exit={{ opacity: 0 }}
            transition={
              tier.screenPulse && !prefersReducedMotion
                ? { duration: 0.45, times: [0, 0.4, 0.6, 1], ease: "easeOut" }
                : undefined
            }
          />

          {/* Radial sunburst — recolored to gold to match the rest of the app.
              Static angle (no rotation animation) so it reads as composed
              rather than spinning. Hidden under reduced-motion. */}
          {!prefersReducedMotion && (
            <motion.svg
              className="absolute pointer-events-none"
              width="520"
              height="520"
              viewBox="0 0 520 520"
              aria-hidden="true"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.35 }}
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
                    stroke="#D4AF37"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.svg>
          )}

          {/* Particle burst — KhaleejiStars exploding from card center.
              Each star travels outward + fades over 600ms. */}
          {particles.length > 0 && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              aria-hidden="true"
            >
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0, 1, 0.8],
                    opacity: [0, 1, 0],
                    rotate: p.rotate,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    times: [0, 0.4, 1],
                    delay: 0.05,
                  }}
                >
                  <KhaleejiStar size={14} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Confetti rain — tier 3 only. Falls from above the viewport,
              drifts horizontally, spins, fades out before landing. Sits
              on z-70 so it falls IN FRONT of the card. */}
          {confetti.length > 0 && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ zIndex: 70 }}
              aria-hidden="true"
            >
              {confetti.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-sm"
                  style={{
                    left: `${c.startXPercent}%`,
                    top: 0,
                    width: `${c.width}px`,
                    height: `${c.height}px`,
                    backgroundColor: c.color,
                  }}
                  initial={{ y: -30, x: 0, rotate: 0, opacity: 0 }}
                  animate={{
                    y: "100vh",
                    x: c.drift,
                    rotate: c.rotateEnd,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    ease: [0.4, 0, 0.6, 1],
                    delay: c.delay,
                    opacity: { times: [0, 0.1, 0.85, 1], duration: 2.6, delay: c.delay },
                  }}
                />
              ))}
            </div>
          )}

          {/* Gold glow halo behind the card on tier 2+. Sits below the card
              in z-order; pulses on entry then settles to a soft sustained
              glow until exit. Disabled under reduced-motion. */}
          {tier.glowPulse && !prefersReducedMotion && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "min(420px, 90vw)",
                height: "min(420px, 90vw)",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.25) 35%, rgba(212,175,55,0) 70%)",
                filter: "blur(20px)",
              }}
              aria-hidden="true"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: [0.6, 1.15, 1.0],
                opacity: [0, 1, 0.6],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                times: [0, 0.45, 1],
              }}
            />
          )}

          {/* Card. Tier-2 adds a shake (rotate oscillation) on impact;
              tier-3 lands at a larger final scale (cardScaleBoost). */}
          <motion.div
            className="relative bg-gradient-to-b from-[#FFFCEF] to-[#FFF1DC] border-2 border-[#1A1A2E] rounded-3xl pt-0 pb-6 max-w-sm w-[90%] text-center pointer-events-auto"
            style={{
              boxShadow: "0 6px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { scale: 0.85, opacity: 0, rotate: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : tier.cardShake
                  ? {
                      // Tier-2: settle to scale 1, then immediately wiggle.
                      scale: tier.cardScaleBoost,
                      opacity: 1,
                      rotate: [0, -3, 3, -2, 2, 0],
                    }
                  : {
                      scale: tier.cardScaleBoost,
                      opacity: 1,
                      rotate: 0,
                    }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { scale: 0.85, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.18 }
                : tier.cardShake
                  ? {
                      scale: { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] },
                      opacity: { duration: 0.42 },
                      rotate: { delay: 0.42, duration: 0.5, ease: "easeOut" },
                    }
                  : { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {/* Sadu band capping the top edge — strongest "this is the same
                app" cue. Wrapped in its own rounded-top clipper so it hugs
                the card's curve without forcing overflow-hidden on the whole
                card (which would chop the companion's head). */}
            <div className="rounded-t-3xl overflow-hidden">
              <SaduBand variant="prominent" height={12} />
            </div>

            {/* Companion — single hop on entry, not infinite loop.
                Looping bounce reads as "still loading"; this should read as
                "celebrating then settling." */}
            <motion.div
              className="flex justify-center -mt-6 mb-1"
              initial={{ y: -32, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { y: 0, opacity: 1 }
                  : { y: [-32, -12, 0, -8, 0], opacity: 1 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.18 }
                  : {
                      y: {
                        duration: 0.7,
                        ease: "easeOut",
                        times: [0, 0.4, 0.7, 0.85, 1],
                      },
                      opacity: { duration: 0.25 },
                    }
              }
            >
              <Companion size="md" mood="happy" hideHappyStar />
            </motion.div>

            {/* HERO STREAK NUMBER — the visual anchor. Optional flanking
                stars on tier 2+ (currently 0 stars on tier 1). */}
            <div className="relative flex items-center justify-center gap-3 mt-1 px-6">
              {/* Crown star above the number on tier 3 (3-star treatment). */}
              {tier.flankingStars >= 3 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: "-32px" }}
                  initial={{ scale: 0, y: -10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                >
                  <KhaleejiStar size={40} />
                </motion.div>
              )}

              {tier.flankingStars > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                >
                  <KhaleejiStar size={22} />
                </motion.div>
              )}

              <motion.div
                className="font-heading font-bold leading-none"
                style={{
                  fontSize: "88px",
                  background: tier.fireGradient
                    ? "linear-gradient(180deg, #FFC93C 0%, #FF6B35 50%, #C9302E 100%)"
                    : "linear-gradient(180deg, #D4AF37 0%, #B8862E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 2px 0 rgba(184,134,46,0.15)",
                }}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { scale: [0, 1.15, 1], opacity: 1 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.18, delay: 0.1 }
                    : {
                        delay: 0.18,
                        duration: 0.5,
                        ease: "easeOut",
                        times: [0, 0.6, 1],
                      }
                }
              >
                {streak}
              </motion.div>

              {tier.flankingStars > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                >
                  <KhaleejiStar size={22} />
                </motion.div>
              )}
            </div>

            {/* "in a row!" labels — small, sits under the hero number. */}
            <motion.h2
              className="font-heading font-bold text-lg text-[#1A1A2E] mt-1 leading-none uppercase tracking-wide"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {tier.copy.bigEn}
            </motion.h2>
            <motion.p
              className="font-body text-sm font-bold text-[#1A1A2E]/70 mt-0.5 leading-none"
              dir="rtl"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {tier.copy.bigAr}
            </motion.p>

            {/* Sub-copy / encouragement */}
            <motion.p
              className="font-body text-base text-[#1A1A2E] mt-3 leading-snug px-6"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {tier.copy.subEn}
            </motion.p>
            <motion.p
              className="font-body text-sm text-[#B8862E] mt-1 leading-snug px-6"
              dir="rtl"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {tier.copy.subAr}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
