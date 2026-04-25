"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { useGameStore, useCurrentSubjectProgress } from "@/lib/store";
import { humanSrcFor } from "@/data/shop";
import { fmtNumber } from "@/lib/numerals";
import { getLevelsForSubject } from "@/data/levels";
import { subjectsById } from "@/data/subjects";

/* Per-subject map page tint. Space keeps the original cream→starfield;
   Heritage uses a warmer cream→gold sky to evoke the Gulf at sunset;
   Nature uses a cream→teal coastal sky. */
const MAP_BACKGROUNDS: Record<string, string> = {
  space: "linear-gradient(to top, #FFF8E6 0%, #FFF8E6 35%, #E6F3FA 60%, #B8D8E8 78%, #2D2D5A 100%)",
  city: "linear-gradient(to top, #FFF8E6 0%, #FFF8E6 30%, #FFE9A8 55%, #F5C842 78%, #B8862E 100%)",
  coast: "linear-gradient(to top, #FFF8E6 0%, #FFF8E6 30%, #CFF7EE 55%, #67E8F9 78%, #0E8C6B 100%)",
};
import LevelNode from "./LevelNode";
import Sticker from "@/components/lesson/Sticker";
import Companion from "@/components/mascot/Companion";
import MapDuoCard from "./MapDuoCard";
import MapTour from "./MapTour";
import HeritageBackdrop from "./HeritageBackdrop";
import SpaceBackdrop from "./SpaceBackdrop";
import SettingsModal from "@/components/ui/SettingsModal";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import SaduPattern from "@/components/patterns/SaduPattern";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* === Vertical curved path connector between two stacked nodes === */
function PathConnector({
  fromLeft,
  completed,
}: {
  fromLeft: boolean;
  completed: boolean;
}) {
  // Curve from one node center to the next, gentle S-curve
  const d = fromLeft
    ? "M 65 0 C 65 22, 35 22, 35 50"
    : "M 35 0 C 35 22, 65 22, 65 50";

  return (
    <div className="h-20 md:h-16 w-full -my-1 relative z-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          // Soft gold glow halo behind the entire path so it lights up
          // against the dim vignetted backdrop. Small radius so it
          // doesn't bleed onto neighboring nodes; just enough to lift
          // the trail off the background.
          filter: "drop-shadow(0 0 4px rgba(255, 217, 107, 0.55))",
        }}
      >
        {/* Brighter dashed trail (gold-cream instead of beige), so the
            path reads as a "lit road" leading to the next node. */}
        <path
          d={d}
          fill="none"
          stroke="#FFE9A8"
          strokeWidth="3"
          strokeDasharray="3 4"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* Solid gold overlay if completed — fully bright + thicker
            to read as "you've walked this trail". */}
        {completed && (
          <path
            d={d}
            fill="none"
            stroke="#FFD96B"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="1"
          />
        )}
      </svg>
    </div>
  );
}

/* === Hope Probe orbiting Mars (the small ambient corner widget) === */
function HopeProbeOrbit({ size = 140 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" width={size} height={size} viewBox="0 0 140 140">
        {/* Mars sticker-style */}
        <circle cx="70" cy="70" r="36" fill="#EF4444" stroke="#1A1A2E" strokeWidth="2.5" />
        <ellipse cx="58" cy="62" rx="8" ry="5" fill="#B91C1C" />
        <ellipse cx="80" cy="78" rx="6" ry="4" fill="#B91C1C" />
        <path d="M 50 48 Q 70 44 90 48 Q 80 54 60 54 Z" fill="white" stroke="#1A1A2E" strokeWidth="1.5" />
        {/* Orbit ring */}
        <ellipse cx="70" cy="70" rx="60" ry="20" fill="none" stroke="#1A1A2E" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" transform="rotate(-15 70 70)" />
      </svg>
      {/* Orbiting probe */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "50%",
            marginLeft: "-18px",
            width: 36,
            height: 26,
            transform: "rotate(-15deg)",
          }}
        >
          <svg width="36" height="26" viewBox="0 0 36 26" aria-label="Hope Probe">
            <rect x="13" y="9" width="10" height="8" fill="#D4AF37" stroke="#1A1A2E" strokeWidth="1.5" rx="1" />
            <rect x="2" y="10" width="10" height="6" fill="#3B82F6" stroke="#1A1A2E" strokeWidth="1.2" rx="0.5" />
            <rect x="24" y="10" width="10" height="6" fill="#3B82F6" stroke="#1A1A2E" strokeWidth="1.2" rx="0.5" />
            <line x1="18" y1="9" x2="18" y2="3" stroke="#1A1A2E" strokeWidth="1.5" />
            <circle cx="18" cy="2" r="1.6" fill="#D4AF37" stroke="#1A1A2E" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function JourneyMap() {
  const router = useRouter();
  const { navigate } = useRouteTransition();
  const { student, arabicNumerals, equipped, currentSubject, tourComplete } = useGameStore();
  const { currentLevel, completedLevels, totalXP } = useCurrentSubjectProgress();
  const levels = getLevelsForSubject(currentSubject);
  const maxXP = levels.length * 100;
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  // One-shot toast shown when the tour is dismissed (skip OR finish),
  // pointing the user to settings if they want to see it again.
  const [tourEndedToast, setTourEndedToast] = useState(false);
  const currentLevelRef = useRef<HTMLDivElement>(null);
  // Bubble position above the current level node, computed in viewport
  // coordinates and clamped horizontally so it never overflows the
  // screen edges (the node may be at the far left/right of the climb).
  // X-shift (in px) applied to the camel+bubble stack so the bubble
  // never overflows the viewport. Camel stays centered above the node
  // visually because the bubble is offset INSIDE the stack, not the
  // stack itself — so the bubble can shift to fit the screen while
  // the camel stays put. See the JSX block below for details.
  const [bubbleShiftX, setBubbleShiftX] = useState(0);
  // Refs the spotlight tour reaches into to highlight elements.
  const xpBarRef = useRef<HTMLDivElement>(null);
  const trophyButtonRef = useRef<HTMLButtonElement>(null);
  const dirhamsCardRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  // Stable target bag passed to the tour. Refs themselves don't change
  // identity, so this memo never invalidates after first render — which
  // means the tour's own polling effect won't keep restarting.
  const tourTargets = useMemo(
    () => ({
      currentLevel: currentLevelRef as React.RefObject<HTMLElement | null>,
      xp: xpBarRef as React.RefObject<HTMLElement | null>,
      dirhams: dirhamsCardRef as React.RefObject<HTMLElement | null>,
      trophy: trophyButtonRef as React.RefObject<HTMLElement | null>,
      profile: profileButtonRef as React.RefObject<HTMLElement | null>,
    }),
    []
  );

  // Trigger the spotlight tour once on first map visit (after onboarding
  // has set student.name). Persists `tourComplete=true` on dismiss.
  useEffect(() => {
    if (mounted && !tourComplete && student.name) {
      const t = setTimeout(() => setShowTour(true), 900);
      return () => clearTimeout(t);
    }
  }, [mounted, tourComplete, student.name]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to current level
  useEffect(() => {
    if (mounted && currentLevelRef.current) {
      setTimeout(() => {
        currentLevelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 800);
    }
  }, [mounted]);

  // Measure the current node's screen position to compute how many
  // pixels we need to shift the bubble horizontally so it stays in
  // viewport. Pure horizontal — vertical position is handled by CSS
  // (flex column), so the bubble is guaranteed to sit ABOVE the
  // camel with no overlap regardless of its rendered height.
  useEffect(() => {
    if (!mounted || showTour) {
      setBubbleShiftX(0);
      return;
    }
    const BUBBLE_WIDTH = 180;
    const SAFE_INSET = 8;

    const measure = () => {
      const node = currentLevelRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const nodeCenterX = r.left + r.width / 2;
      const bubbleIdealLeft = nodeCenterX - BUBBLE_WIDTH / 2;
      const minLeft = SAFE_INSET;
      const maxLeft = window.innerWidth - BUBBLE_WIDTH - SAFE_INSET;
      const clampedLeft = Math.max(minLeft, Math.min(bubbleIdealLeft, maxLeft));
      setBubbleShiftX(clampedLeft - bubbleIdealLeft);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [mounted, showTour, currentSubject]);

  // Decorative stars seeded per slot — only used in the upper "space" portion
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        left: seededRandom(i * 3 + 1) * 100,
        top: seededRandom(i * 3 + 2) * 100,
        size: 1 + Math.floor(seededRandom(i * 3 + 3) * 3),
        delay: seededRandom(i * 3 + 4) * 4,
      })),
    []
  );

  const handleNodeClick = (levelId: number) => {
    if (levelId <= currentLevel) {
      navigate(`/level/${levelId}`, {
        label: `Preparing Level ${levelId}`,
        labelAr: `نُجهِّز المستوى ${levelId}`,
      });
    }
  };

  // Reversed for path layout (Level 6 at top → Level 1 at bottom)
  const reversedLevels = useMemo(() => [...levels].reverse(), [levels]);

  // Subject-aware page background
  const mapBiome = subjectsById[currentSubject]?.mapBiome ?? "space";
  const mapBackground = MAP_BACKGROUNDS[mapBiome];
  const showStarfield = mapBiome === "space";

  const xpPercent = Math.min(100, (totalXP / maxXP) * 100);

  return (
    <div className="relative min-h-dvh bg-[var(--color-lesson-bg)] overflow-x-hidden">
      {/* === Subject-aware background gradient. Skipped on Heritage
              and Space because each renders its own richer gradient
              inside its dedicated backdrop component. === */}
      {mapBiome !== "city" && mapBiome !== "space" && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: mapBackground }}
        />
      )}

      {/* Space subject: full-page cinematic backdrop component. Mirrors
          the Heritage treatment with parallax + sticker-based scenery
          (sun, Saturn, Hope Probe orbiting Mars, Earth+Moon, comet,
          Jupiter, asteroid belt, rocket, telescope) across a 250vh
          canvas, scrolling at 0.4× page speed. */}
      {mounted && mapBiome === "space" && <SpaceBackdrop />}

      {/* Heritage subject: full-page cinematic backdrop component.
          Replaces the older 3-layer inline scene with a layered scene
          that fills the whole climb — desert at the bottom, oasis in
          the middle, sunset city skyline at the top. */}
      {mounted && mapBiome === "city" && <HeritageBackdrop />}

      {/* Nature subject placeholder: mangrove silhouettes (subject not yet enabled) */}
      {mounted && mapBiome === "coast" && (
        <div className="fixed top-[8vh] left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 800 80" preserveAspectRatio="xMidYMin slice" className="w-full h-24 opacity-40">
            <path d="M 0 80 Q 60 60 120 70 Q 180 50 240 70 Q 300 55 360 70 Q 420 60 480 70 Q 540 55 600 70 Q 660 60 720 70 Q 760 65 800 70 L 800 80 Z" fill="#0E8C6B" />
          </svg>
        </div>
      )}

      {/* === TOP BAR — XP progress + avatar, with Sadu accent band beneath === */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 pb-2 bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            ref={profileButtonRef}
            onClick={() => navigate("/profile", { label: "Opening Your Profile", labelAr: "نفتح ملفك" })}
            className="shrink-0 w-11 h-11 rounded-xl overflow-hidden border-2 border-[#1A1A2E] bg-[#FFF1DC] flex items-center justify-center"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
            aria-label="View profile"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={humanSrcFor(student.avatarId, equipped.human)}
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          </button>

          {/* XP bar — lesson grammar (white tile + bottom shadow) */}
          <div
            ref={xpBarRef}
            className="flex-1 relative h-9 bg-white rounded-full border-2 border-[#1A1A2E] overflow-hidden"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #FFD96B 0%, #D4AF37 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
                  fill="#D4AF37"
                  stroke="#1A1A2E"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-heading font-bold text-sm text-[#1A1A2E]">
                {fmtNumber(totalXP, arabicNumerals)} <span className="opacity-50">/ {fmtNumber(maxXP, arabicNumerals)} XP</span>
              </span>
            </div>
          </div>

          {/* Souq entry has moved to the bottom Duo Card. Rewards stays here
              since it lives at /rewards (badges + treasury + trophy room). */}

          {/* Rewards button */}
          <button
            ref={trophyButtonRef}
            onClick={() => navigate("/rewards", { label: "Polishing Your Trophies", labelAr: "نُلمِّع جوائزك" })}
            className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
            aria-label="View rewards"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="#FCD34D" />
            </svg>
          </button>

          {/* Settings — moved into the top bar since the floating gear collides
              with the bottom Duo Card. */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
            aria-label="Open settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
        {/* Sadu accent band under the top bar */}
        <SaduBand className="mt-2.5 opacity-90" height={12} variant="prominent" />
      </motion.div>

      {/* Backdrop dim wash: a single uniform dark veil over the WHOLE
          backdrop (fixed to viewport, full coverage). Pushes the entire
          scenery layer back and lets the level nodes — rendered on top
          of this layer — read as the foreground hero. No radial focus
          trick, just one flat mask so the dimming is consistent
          everywhere. */}
      {mounted && (mapBiome === "city" || mapBiome === "space") && (
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          aria-hidden="true"
          style={{ background: "rgba(10, 8, 22, 0.65)" }}
        />
      )}

      {/* Subtle Sadu pattern overlay across the cream area (very faint) */}
      <SaduPattern opacity={0.05} className="fixed inset-0 pointer-events-none z-[1]" />

      {/* === MAIN CONTENT — vertical path === */}
      {/* Bottom padding accounts for the sticky Duo Card so the path
          doesn't get hidden underneath. */}
      <div className="relative z-10 pt-28 pb-40 px-5 max-w-md mx-auto">
        {/* === MISSION HEADER CARD — souq grammar:
              white tile, dark border, gold bottom shadow, KhaleejiStar + EN/AR
              title pair, Sadu band underline. Hope Probe sits inside as the
              destination showcase, framed instead of floating. === */}
        {/* Mission card removed — was reading as "noisy hero" rather
            than orienting the player. The map's own scenery + level
            nodes are doing the storytelling now. */}

        {/* Vertical zigzag stack of level nodes.
            `isTourTarget` decides which node carries the tour
            spotlight ref: normally the in-progress level, but when
            EVERY level is completed (so currentLevel runs past the
            last id), fall back to level.id === 1 so the tour still
            has somewhere meaningful to point. */}
        <div className="flex flex-col items-stretch">
          {reversedLevels.map((level, ri) => {
            const originalIndex = levels.length - 1 - ri;
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = level.id === currentLevel;
            const isLocked = level.id > currentLevel;
            const allCompleted = completedLevels.length === levels.length;
            const isTourTarget = isCurrent || (allCompleted && level.id === 1);
            const alignLeft = originalIndex % 2 === 0;

            const showConnector = ri > 0;
            // The connector visually goes FROM the row above (previous in display)
            // TO this row. The previous row aligns based on its own originalIndex.
            // PathConnector's `fromLeft=true` means the curve STARTS on the right
            // side at the top and ENDS on the left at the bottom — i.e. when the
            // previous row is on the RIGHT (its alignLeft=false → odd originalIndex).
            const prevOriginalIndex = originalIndex + 1;
            const prevAlignedLeft = prevOriginalIndex % 2 === 0;
            const connectorFromLeft = !prevAlignedLeft;
            const connectorCompleted = completedLevels.includes(level.id);

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + ri * 0.07 }}
              >
                {showConnector && (
                  <PathConnector fromLeft={connectorFromLeft} completed={connectorCompleted} />
                )}
                <div className={`flex ${alignLeft ? "justify-start" : "justify-end"}`}>
                  <div
                    ref={isTourTarget ? currentLevelRef : undefined}
                    className="relative inline-block"
                  >
                    {/* Companion bubble for the current level. Hidden while
                        the spotlight tour is running so we don't have two
                        companions on screen at once. */}
                    {isCurrent && !showTour && (
                      <motion.div
                        className="absolute bottom-full mb-2 z-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        {/* Bubble first (above), then camel — flex column
                            stacks them vertically, CSS guarantees no
                            overlap. The bubble's horizontal position is
                            shifted via translateX (computed in JS) to keep
                            it inside the viewport on phone, while the
                            camel below stays centered above the node. */}
                        <div
                          className="relative mb-3 w-[180px] bg-white rounded-2xl px-4 py-2.5 border-2 border-[#1A1A2E]"
                          style={{
                            boxShadow:
                              "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
                            transform: `translateX(${bubbleShiftX}px)`,
                          }}
                        >
                          <p className="text-sm font-body font-bold text-[#1A1A2E] text-center leading-snug">
                            {student.name
                              ? `Yallah ${student.name}, let's explore ${level.title}!`
                              : `Yallah, let's explore ${level.title}!`}
                          </p>
                          {/* Arrow tail — sits at the bottom-center of the
                              bubble. Compensated for bubbleShiftX so it
                              points at the camel below, even when the
                              bubble has been shifted to fit viewport. */}
                          <div
                            className="absolute w-3 h-3 bg-white border-b-2 border-r-2 border-[#1A1A2E]"
                            style={{
                              bottom: -8,
                              left: "50%",
                              transform: `translateX(calc(-50% - ${bubbleShiftX}px)) rotate(45deg)`,
                            }}
                          />
                        </div>
                        <Companion size="sm" mood="idle" hovering />
                      </motion.div>
                    )}
                    <LevelNode
                      level={level}
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      isLocked={isLocked}
                      onClick={() => handleNodeClick(level.id)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer decoration removed — the bottom Duo Card carries the
            visual anchor; doubling up was creating clutter. */}
      </div>

      {/* === Sticky Duo Card — anchors the bottom + always-visible Souq entry === */}
      <MapDuoCard cardRef={dirhamsCardRef} />

      {/* === First-visit spotlight tour === */}
      {showTour && (
        <MapTour
          targets={tourTargets}
          onDone={() => {
            setShowTour(false);
            setTourEndedToast(true);
            window.setTimeout(() => setTourEndedToast(false), 4500);
          }}
        />
      )}

      {/* Tour-ended toast — fires once whenever the tour is skipped or
          completed. Auto-dismisses after 4.5s. Tells the user where to
          replay it from. */}
      <AnimatePresence>
        {tourEndedToast && (
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 z-[55] pointer-events-none"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)" }}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              className="bg-white border-2 border-[#1A1A2E] rounded-2xl px-4 py-2.5 flex items-center gap-2 max-w-[90vw]"
              style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)" }}
            >
              <span className="text-base">💡</span>
              <p className="font-body text-xs text-[#1A1A2E] leading-snug">
                You can replay the tour anytime from{" "}
                <span className="font-bold">Settings → Help</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings modal (opened from the gear button in the top bar) */}
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
