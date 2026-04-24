"use client";

import { motion } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import LessonButton from "./LessonButton";
import Sticker from "./Sticker";
import Companion from "@/components/mascot/Companion";
import BadgeMedallion from "@/components/ui/BadgeMedallion";
import { useGameStore } from "@/lib/store";
import { shopItems, humanSrcFor } from "@/data/shop";
import { badges } from "@/data/badges";
import { getLevelsForSubject } from "@/data/levels";
import { ChevronRight, X } from "lucide-react";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import type { LessonResult } from "./LessonShell";

interface LessonCompleteProps {
  levelId: number;
  result: LessonResult;
  xpEarned: number;
  dirhamsEarned: number;
  /** True when the player had already completed this level before this attempt.
      In that case, the store does NOT grant XP/dirhams again, and we swap the
      reward chips to a clear kid-friendly "you already collected these" state. */
  isReplay?: boolean;
  /** Bonus dirhams granted by the store for the first 5/5 perfect clear. 0 if none. */
  perfectBonus?: number;
  /** True when this attempt was the player's FIRST 5/5 perfect clear of this level. */
  isFirstPerfect?: boolean;
  badgeName: string;
  badgeNameAr: string;
  onReplay: () => void;
}

const UAE_COLORS = ["#CE1126", "#009639", "#FFFFFF", "#D4AF37", "#FCD34D"];

/* === Confetti shower — page-wide UAE-color confetti for the win moment.
   Mix of stars, ribbons, and dirham coins for variety. */
function ConfettiBlast({ count = 60 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * 100;
        const size = 8 + Math.random() * 8;
        const color = UAE_COLORS[i % UAE_COLORS.length];
        const r = i % 5;
        const shape: "rect" | "star" | "dirham" =
          r === 0 ? "star" : r === 1 ? "dirham" : "rect";
        const dur = shape === "dirham" ? 4.5 + Math.random() * 1.5 : 2 + Math.random() * 1.5;
        const rotateMax = shape === "dirham" ? 360 : 720;
        const dirhamSize = size + 22;
        return (
          <motion.div
            key={i}
            className="absolute top-0"
            style={{ left: `${startX}%` }}
            initial={{ y: -30, opacity: 0, rotate: 0 }}
            animate={{
              y: ["0vh", "100vh"],
              x: [0, (Math.random() - 0.5) * 120],
              opacity: [0, 1, 1, 0],
              rotate: [0, Math.random() * rotateMax],
            }}
            transition={{ duration: dur, delay: i * 0.025, ease: "easeOut" }}
          >
            {shape === "star" ? (
              <svg width={size + 4} height={size + 4} viewBox="0 0 16 16" fill={color}>
                <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
              </svg>
            ) : shape === "dirham" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/uae-dirham.webp"
                alt=""
                width={dirhamSize}
                height={dirhamSize}
                style={{ display: "block", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))" }}
              />
            ) : (
              <div
                style={{
                  width: size,
                  height: size * 0.5,
                  backgroundColor: color,
                  borderRadius: 2,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* === Stat chip — inline reward summary inside the celebration card.
   All three chips are the same size; the parent grid handles equal cell
   widths so nothing stands out by accident. */
function StatChip({
  label,
  value,
  icon,
  accent,
  bg,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
  bg: string;
}) {
  return (
    <motion.div
      className="min-w-0 flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-[#1A1A2E] py-2 px-1"
      style={{
        background: bg,
        boxShadow: "0 2px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
    >
      <div
        className="flex items-center gap-1 font-heading font-bold leading-none text-xl md:text-2xl"
        style={{ color: accent }}
      >
        <span style={{ color: accent }}>{icon}</span>
        {value}
      </div>
      <span className="font-heading uppercase tracking-wider text-[#1A1A2E]/55 text-[8px] md:text-[10px] leading-tight text-center px-0.5">
        {label}
      </span>
    </motion.div>
  );
}

export default function LessonComplete({
  levelId,
  result,
  xpEarned,
  dirhamsEarned,
  isReplay = false,
  perfectBonus = 0,
  isFirstPerfect = false,
  badgeName,
  badgeNameAr,
  onReplay,
}: LessonCompleteProps) {
  const { navigate } = useRouteTransition();
  const { dirhams, ownedItems, equipped, student, currentSubject } = useGameStore();
  const accuracy =
    result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  const passed = result.passed;
  // Match BOTH subject and level — without the subject filter, every
  // heritage clear shows the corresponding space badge (since space
  // badges are listed first and `find` returns the first match).
  const earnedBadge =
    badges.find((b) => b.subjectId === currentSubject && b.levelId === levelId) ??
    badges.find((b) => b.levelId === levelId) ??
    badges[0];
  // Detect "last level of the active subject" so the CTA reads See Rewards
  // instead of Next Level. Avoids the old hardcoded `< 6` that broke for
  // Heritage (7 levels) and any future subject with a different count.
  const subjectLevelIds = getLevelsForSubject(currentSubject).map((l) => l.id);
  const lastLevelId =
    subjectLevelIds.length > 0 ? Math.max(...subjectLevelIds) : levelId;
  const isLastLevel = levelId >= lastLevelId;

  // Resolve the human avatar src so the kid sees themselves celebrating
  // wearing whatever they have equipped right now.
  const humanSrc = humanSrcFor(student.avatarId, equipped.human);

  /* Pick the most useful next item to surface in the teaser:
     - Skip items the player owns AND has equipped (no point showing).
     - Prefer items they own but haven't worn yet ("you own this — wear it").
     - Otherwise: cheapest unowned. */
  const teaserItem = (() => {
    const ownedNotEquipped = shopItems.find(
      (i) =>
        ownedItems.includes(i.id) &&
        equipped.human !== i.id &&
        equipped.companion !== i.id
    );
    if (ownedNotEquipped) return ownedNotEquipped;
    const unowned = shopItems
      .filter((i) => !ownedItems.includes(i.id))
      .sort((a, b) => a.price - b.price);
    return unowned[0] ?? null;
  })();

  /* Resolve the teaser's state into accurate copy. The OLD code lied
     when the player could afford an item — it said "you unlocked it"
     even though they hadn't bought it yet. Now: */
  const teaserState: "owned-not-worn" | "affordable" | "saving" | null = teaserItem
    ? ownedItems.includes(teaserItem.id)
      ? "owned-not-worn"
      : dirhams >= teaserItem.price
        ? "affordable"
        : "saving"
    : null;

  return (
    <div className="relative min-h-dvh bg-[var(--color-lesson-bg)] flex flex-col">
      {passed && <ConfettiBlast />}

      {/* === Page header — souq grammar so the page belongs to the family === */}
      <div className="shrink-0 sticky top-0 z-30 bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b border-[#E5D9B8]">
        <div className="max-w-md md:max-w-2xl mx-auto flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-base text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              Level {levelId} {passed ? "Complete" : "In Progress"}
            </h1>
            <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-left">
              المستوى {levelId} {passed ? "مكتمل" : "غير مكتمل"}
            </p>
          </div>
          <button
            onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
            aria-label="Back to map"
            className="shrink-0 -mt-1 -mr-1 p-1.5 rounded-xl text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SaduBand className="mt-2.5 max-w-md md:max-w-2xl mx-auto opacity-90" height={10} variant="prominent" />
      </div>

      {/* === Hero region — flex-1 absorbs spare space; content centered.
            Single composed celebration card with everything in it. No scroll. === */}
      <div className="flex flex-col items-center justify-start px-4 pt-3 pb-3 gap-3 md:gap-5">
        <motion.div
          className="relative w-full max-w-md md:max-w-2xl border-2 border-[#1A1A2E] rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
            boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          {/* Win sheen + radial glow behind the medallion */}
          {passed && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 25%, rgba(212,175,55,0.32), transparent 55%)",
              }}
            />
          )}

          <div className="relative px-4 md:px-10 pt-3 md:pt-10 pb-3 md:pb-10">
            {/* Hero TRIO — avatar + medallion + companion, all three center-
                aligned and spaced equally. Both characters are floating
                (no frame) and DANCE on the win — alternating bob/tilt that
                loops gently. The medallion sits dead-center. */}
            <div className="grid grid-cols-3 items-end justify-items-center gap-1 md:gap-4">
              {/* Avatar — free-floating, dancing IN SYNC with the companion
                  (same rotate values, same y values — no seesaw). Bigger
                  than the companion since the kid IS the protagonist. */}
              <motion.div
                initial={{ scale: 0, x: 30, opacity: 0 }}
                animate={
                  passed
                    ? {
                        scale: 1,
                        x: 0,
                        opacity: 1,
                        y: [0, -8, 0, -4, 0],
                        rotate: [-3, 3, -3, 3, -3],
                      }
                    : { scale: 1, x: 0, opacity: 1, y: 0, rotate: 0 }
                }
                transition={
                  passed
                    ? {
                        scale: { type: "spring", stiffness: 200, damping: 14, delay: 0.15 },
                        x: { type: "spring", stiffness: 200, damping: 14, delay: 0.15 },
                        opacity: { duration: 0.3, delay: 0.15 },
                        y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                        rotate: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                      }
                    : { type: "spring", stiffness: 200, damping: 14, delay: 0.15 }
                }
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={humanSrc}
                  alt=""
                  className="w-[88px] h-[88px] md:w-[150px] md:h-[150px] object-contain"
                  draggable={false}
                />
              </motion.div>

              {/* Medallion / rocket — dead center, biggest, the win symbol */}
              <motion.div
                initial={{ scale: 0, rotate: -180, y: -10 }}
                animate={
                  passed
                    ? { scale: 1, rotate: 0, y: [0, -4, 0] }
                    : { scale: 1, rotate: 0, y: 0 }
                }
                transition={
                  passed
                    ? {
                        scale: { type: "spring", stiffness: 160, damping: 12, delay: 0.3 },
                        rotate: { type: "spring", stiffness: 160, damping: 12, delay: 0.3 },
                        y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                      }
                    : { type: "spring", stiffness: 160, damping: 12, delay: 0.3 }
                }
                className="mb-1"
              >
                {passed ? (
                  <>
                    <div className="md:hidden">
                      <BadgeMedallion badge={earnedBadge} unlocked size={96} />
                    </div>
                    <div className="hidden md:block">
                      <BadgeMedallion badge={earnedBadge} unlocked size={150} />
                    </div>
                  </>
                ) : (
                  <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px]">
                    <Sticker name="rocket" />
                  </div>
                )}
              </motion.div>

              {/* Companion — synchronized dance with the avatar (same y, same
                  rotate values, same delay). Reads as both characters
                  swaying together, not opposite. */}
              <motion.div
                initial={{ scale: 0, x: -30, opacity: 0 }}
                animate={
                  passed
                    ? {
                        scale: 1,
                        x: 0,
                        opacity: 1,
                        y: [0, -8, 0, -4, 0],
                        rotate: [-3, 3, -3, 3, -3],
                      }
                    : { scale: 1, x: 0, opacity: 1, y: 0, rotate: 0 }
                }
                transition={
                  passed
                    ? {
                        scale: { type: "spring", stiffness: 200, damping: 14, delay: 0.5 },
                        x: { type: "spring", stiffness: 200, damping: 14, delay: 0.5 },
                        opacity: { duration: 0.3, delay: 0.5 },
                        y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                        rotate: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                      }
                    : { type: "spring", stiffness: 200, damping: 14, delay: 0.3 }
                }
              >
                <div className="md:hidden">
                  <Companion
                    size="sm"
                    mood={passed ? "happy" : "thinking"}
                    hideHappyStar
                  />
                </div>
                <div className="hidden md:block">
                  <Companion
                    size="md"
                    mood={passed ? "happy" : "thinking"}
                    hideHappyStar
                  />
                </div>
              </motion.div>
            </div>

            {/* Headline — directly under the trio, no white gap */}
            <motion.div
              className="text-center mt-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2
                className="font-heading font-bold text-2xl md:text-3xl leading-none"
                style={{ color: passed ? "#00702A" : "#B40D20" }}
              >
                {passed ? "Lesson Complete!" : "Keep Going!"}
              </h2>
              <p
                className="font-body text-sm font-bold leading-none mt-1.5"
                style={{ color: passed ? "#00702A" : "#B40D20", opacity: 0.7 }}
              >
                {passed ? "أحسنتَ!" : "لا تستسلمْ!"}
              </p>
              {passed && (
                <div className="mt-3 flex flex-wrap items-stretch justify-center gap-2 md:gap-3">
                  <div
                    className="inline-flex flex-col items-center gap-0.5 px-6 py-2 bg-white border-2 rounded-2xl"
                    style={{
                      borderColor: isReplay ? "#A8A48F" : "#D4AF37",
                      boxShadow: isReplay ? "0 2px 0 #6B6750" : "0 2px 0 #B8862E",
                    }}
                  >
                    <span
                      className="text-[9px] font-heading font-bold uppercase tracking-[0.22em] leading-none"
                      style={{ color: isReplay ? "#6B6750" : "#B8862E" }}
                    >
                      {isReplay ? "You already have this badge" : "Badge Unlocked"}
                    </span>
                    <span className="font-heading font-bold text-sm text-[#1A1A2E] leading-none mt-0.5">
                      {badgeName}
                    </span>
                    <span
                      className="font-body text-[11px] font-bold leading-none mt-0.5"
                      style={{ color: isReplay ? "#6B6750" : "#B8862E" }}
                    >
                      {badgeNameAr}
                    </span>
                  </div>
                  {/* FIRST PERFECT CLEAR — celebratory banner sits next to badge with gap */}
                  {isFirstPerfect && (
                    <motion.div
                      className="inline-flex flex-col items-center gap-0.5 px-5 py-2 bg-white border-2 rounded-2xl"
                      style={{
                        borderColor: "#CE1126",
                        boxShadow: "0 3px 0 #8E0B19",
                      }}
                      initial={{ scale: 0.7, y: 10, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ delay: 0.55, type: "spring", stiffness: 240, damping: 16 }}
                    >
                      <span className="text-[9px] font-heading font-bold uppercase tracking-[0.22em] leading-none text-[#CE1126]">
                        Perfect Clear · 5 / 5 Hearts
                      </span>
                      <span className="font-heading font-bold text-sm text-[#1A1A2E] leading-none mt-0.5">
                        +{perfectBonus} bonus dirhams!
                      </span>
                      <span className="font-body text-[11px] font-bold leading-none mt-0.5 text-[#CE1126]">
                        إنجاز كامل ٥/٥
                      </span>
                    </motion.div>
                  )}
                </div>
              )}
              {passed && isReplay && !isFirstPerfect && (
                <p className="font-body text-[11px] text-[#1A1A2E]/65 mt-2 leading-snug max-w-xs mx-auto">
                  You already played this level, so no new XP or dirhams this time. Practice is still great!
                </p>
              )}
            </motion.div>

            {!passed && (
              <motion.div
                className="mt-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#1A1A2E]/55">
                  Hearts
                </span>
                <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    d="M16 28 C 6 22, 2 14, 5 9 C 8 4, 13 5, 16 9 C 19 5, 24 4, 27 9 C 30 14, 26 22, 16 28 Z"
                    fill="#9CA3AF"
                  />
                </svg>
                <span className="font-heading font-bold text-base text-[#1A1A2E]/55">
                  0 / 5
                </span>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#1A1A2E]/55 ml-2">
                  {accuracy}% correct
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Reward chips row — LIVES OUTSIDE the celebration card so the
            chips have the FULL page width to breathe. The card focuses on
            celebration content; chips are their own dedicated row. */}
        {passed && (
          <motion.div
            className="w-full max-w-md md:max-w-2xl grid grid-cols-3 gap-2.5"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } } }}
          >
            <StatChip
              label={isReplay ? "XP earned" : "XP"}
              value={isReplay ? "✓" : `+${xpEarned}`}
              accent="#B8862E"
              bg={
                isReplay
                  ? "linear-gradient(180deg, #F3EBD4 0%, #E5D9B8 100%)"
                  : "linear-gradient(180deg, #FFFFFF 0%, #FFF7DC 100%)"
              }
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
                </svg>
              }
            />
            <StatChip
              label={
                isReplay
                  ? "Dirhams collected"
                  : dirhamsEarned === 1
                  ? "Dirham"
                  : "Dirhams"
              }
              value={isReplay ? "✓" : `+${dirhamsEarned}`}
              accent="#1A1A2E"
              bg={
                isReplay
                  ? "linear-gradient(180deg, #F3EBD4 0%, #E5D9B8 100%)"
                  : "linear-gradient(180deg, #FFE48A 0%, #F5C842 100%)"
              }
              icon={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/uae-dirham.webp"
                  alt=""
                  width={22}
                  height={22}
                  style={{ display: "inline-block", opacity: isReplay ? 0.5 : 1, filter: isReplay ? "grayscale(0.6)" : undefined }}
                />
              }
            />
            <StatChip
              label={`/ 5`}
              value={result.heartsLeft}
              accent="#B40D20"
              bg="linear-gradient(180deg, #FFFFFF 0%, #FFE4E6 100%)"
              icon={
                <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    d="M16 28 C 6 22, 2 14, 5 9 C 8 4, 13 5, 16 9 C 19 5, 24 4, 27 9 C 30 14, 26 22, 16 28 Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </motion.div>
        )}

        {/* === Souq teaser strip — only on pass + when there's an item to show.
              Compact single line, accurate copy for each state. === */}
        {passed && teaserItem && teaserState && (
          <motion.button
            onClick={() => navigate("/souq", { label: "Opening the Souq", labelAr: "نفتح السوق" })}
            className="relative w-full max-w-md md:max-w-2xl flex items-center gap-3 bg-white border-2 border-[#1A1A2E] rounded-2xl px-3 py-2 text-left active:scale-[0.99] transition-transform"
            style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, type: "spring", stiffness: 220, damping: 18 }}
          >
            <div
              className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border border-[#E5D9B8] flex items-center justify-center p-1.5 overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/shop/${teaserItem.icon}`}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-heading uppercase tracking-wider text-[#B8862E] leading-none">
                {teaserState === "owned-not-worn"
                  ? "You own this"
                  : teaserState === "affordable"
                    ? "Now affordable"
                    : "Saving for"}
              </p>
              <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-tight mt-0.5 truncate">
                {teaserItem.name}
              </p>
              <p className="text-[11px] font-body text-[#1A1A2E]/65 leading-snug">
                {teaserState === "owned-not-worn"
                  ? "Tap to wear it"
                  : teaserState === "affordable"
                    ? "Tap to buy in the Souq"
                    : `Need ${teaserItem.price - dirhams} more dirham${teaserItem.price - dirhams === 1 ? "" : "s"}`}
              </p>
            </div>
            <ChevronRight className="shrink-0 w-5 h-5 text-[#1A1A2E]/55" />
          </motion.button>
        )}
      </div>

      {/* === Sticky bottom action bar === */}
      <div
        className="shrink-0 px-4 pt-3 w-full bg-gradient-to-t from-[var(--color-lesson-bg)] via-[var(--color-lesson-bg)] to-transparent z-20"
        style={{ paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))" }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="max-w-md md:max-w-2xl mx-auto"
        >
          {/* Lesson-complete buttons live side-by-side ONLY here so the page
              fits the viewport without scrolling. The button bar is still
              anchored at the same bottom position as every other page (the
              parent uses the standard sticky-footer layout), so the eye
              doesn't track the buttons up/down between transitions. */}
          {passed ? (
            <div className="grid grid-cols-2 gap-2">
              <LessonButton
                variant="neutral"
                size="lg"
                fullWidth
                onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
              >
                Back to Map
              </LessonButton>
              {!isLastLevel ? (
                <LessonButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate(`/level/${levelId + 1}`, { label: `Preparing Level ${levelId + 1}`, labelAr: `نُجهِّز المستوى ${levelId + 1}` })}
                >
                  Next Level
                </LessonButton>
              ) : (
                <LessonButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate("/rewards", { label: "Polishing Your Trophies", labelAr: "نُلمِّع جوائزك" })}
                >
                  See Rewards
                </LessonButton>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <LessonButton
                variant="neutral"
                size="lg"
                fullWidth
                onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
              >
                Back to Map
              </LessonButton>
              <LessonButton variant="primary" size="lg" fullWidth onClick={onReplay}>
                Try Again
              </LessonButton>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
