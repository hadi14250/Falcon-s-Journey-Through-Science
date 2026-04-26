"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { useGameStore, useCurrentSubjectProgress } from "@/lib/store";
import { humanSrcFor } from "@/data/shop";
import { badges, getBadgesForSubject, findBadgeById } from "@/data/badges";
import { getLevelsForSubject } from "@/data/levels";
import { subjectsById, subjects, type SubjectId } from "@/data/subjects";
import LessonButton from "@/components/lesson/LessonButton";
import SaduPattern from "@/components/patterns/SaduPattern";
import GrainTexture from "@/components/patterns/GrainTexture";
import ArabesqueBorder from "@/components/patterns/ArabesqueBorder";
import FalconCrest from "@/components/ui/FalconCrest";
import BadgeMedallion from "@/components/ui/BadgeMedallion";
import SubjectIcon from "@/components/ui/SubjectIcon";
import dynamic from "next/dynamic";

/* Lazy-load the 3D trophy scene so React Three Fiber + drei are only
   pulled in when the certificate is actually shown (subject complete). */
const TrophyScene = dynamic(() => import("@/components/three/TrophyScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] md:h-[440px] rounded-2xl bg-[#0F0F23] border-2 border-[#1A1A2E] flex items-center justify-center">
      <p className="text-[#FFD96B] font-heading animate-pulse">Loading 3D trophy…</p>
    </div>
  ),
});
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import { ArrowLeft, ChevronRight, X } from "lucide-react";

const motivationalMessages = [
  { min: 0, max: 0, en: "Start your journey to earn badges!", ar: "ابدأْ رحلتَك واجمعِ الشارات!" },
  { min: 1, max: 2, en: "Great start! Keep exploring the solar system!", ar: "بدايةٌ ممتازة، واصلِ الاستكشاف!" },
  { min: 3, max: 4, en: "You're halfway there! The stars await!", ar: "وصلتَ إلى المنتصف، النجومُ بانتظارِك!" },
  { min: 5, max: 5, en: "Almost there! One more level to master!", ar: "اقتربتَ من الإنجاز، مستوى واحد فقط!" },
  { min: 6, max: 6, en: "Mashallah! You've mastered the solar system!", ar: "ما شاء الله، أتقنتَ الرحلةَ كاملةً!" },
];

function getMessage(count: number) {
  return motivationalMessages.find((m) => count >= m.min && count <= m.max) ?? motivationalMessages[0];
}

/* === Section card primitive — souq grammar:
   white surface, dark 2px border, gold bottom shadow, EN+AR stacked
   left-aligned title, prominent Sadu band underline. === */
function SectionCard({
  title,
  titleAr,
  children,
  delay = 0,
}: {
  title?: string;
  titleAr?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      className="relative bg-white rounded-3xl border-2 border-[#1A1A2E] p-5 mb-5"
      style={{ boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {title && (
        <>
          <div className="flex items-baseline justify-between mb-1 gap-2">
            <h2 className="font-heading font-bold text-base md:text-lg text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              {title}
            </h2>
            {titleAr && (
              <p className="font-body font-bold text-sm text-[#B8862E] leading-none text-left">
                {titleAr}
              </p>
            )}
          </div>
          <SaduBand className="mt-2 mb-3 opacity-90" height={10} variant="prominent" />
        </>
      )}
      {children}
    </motion.section>
  );
}

/* === Eye icon — closed when locked, open while previewing.
       Used by the trophy and certificate "hold to peek" UI. === */
function EyeIcon({ open, className = "w-6 h-6" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          {/* Open eye: outer almond + iris */}
          <path d="M 1.5 12 C 4.5 5.5, 19.5 5.5, 22.5 12 C 19.5 18.5, 4.5 18.5, 1.5 12 Z" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </>
      ) : (
        <>
          {/* Closed eye: arched lash + diagonal slash */}
          <path d="M 2 14 C 5 9, 19 9, 22 14" />
          <line x1="4" y1="16" x2="6" y2="18" />
          <line x1="20" y1="16" x2="18" y2="18" />
          <line x1="12" y1="17" x2="12" y2="19.5" />
          <line x1="3" y1="3" x2="21" y2="21" opacity="0.55" />
        </>
      )}
    </svg>
  );
}

/* === Badge tile — souq grammar:
   white card, dark border, gold bottom shadow. Unlocked tiles get the
   subtle gold-ring selected treatment when hovered/focused; the green
   check medallion is not used here (the medallion itself signals "earned").
   Locked tiles are tappable so they can show a teaser modal. === */
function BadgeTile({
  badge,
  unlocked,
  isNext,
  onClick,
}: {
  badge: typeof badges[number];
  unlocked: boolean;
  /* True only for the single locked badge that's immediately
     unlock-able (the next step in the linear progression). Gets a
     gold border + pulsing glow ring + "NEXT" tag so users see their
     immediate goal in context within the grid itself. */
  isNext?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 bg-white cursor-pointer ${
        isNext ? "border-[#D4AF37]" : "border-[#1A1A2E]"
      }`}
      style={{
        boxShadow: isNext
          ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.55)"
          : "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
      whileTap={{ scale: 0.97 }}
      aria-label={
        isNext
          ? `Next badge: ${badge.name}`
          : unlocked
            ? `Badge: ${badge.name}`
            : `Locked badge: ${badge.name}`
      }
    >
      {/* Pulsing gold ring behind the next-available tile */}
      {isNext && (
        <motion.div
          className="absolute inset-0 -inset-x-1 -inset-y-1 rounded-2xl border-2 border-[#FFD96B] pointer-events-none"
          animate={{ scale: [1, 1.06, 1], opacity: [0.65, 0, 0.65] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <BadgeMedallion badge={badge} unlocked={unlocked} size={72} />
      </div>
      {/* Fixed-height label container — reserves room for two lines so
          tiles whose names wrap (e.g. "Capital Explorer") stay the
          same total height as tiles whose names don't (e.g. "Sky
          Climber"). Keeps the grid rows aligned. */}
      <p
        className={`text-[11px] md:text-xs font-heading font-bold leading-tight text-center min-h-[2.4em] flex items-center justify-center ${
          unlocked ? "text-[#1A1A2E]" : isNext ? "text-[#1A1A2E]" : "text-[#1A1A2E]/45"
        }`}
      >
        {badge.name}
      </p>
      {/* Level # ribbon — top-left corner */}
      <div
        className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-md border-2 font-heading font-bold text-[9px] leading-none"
        style={
          unlocked
            ? {
                background: "#FFE48A",
                borderColor: "#1A1A2E",
                color: "#1A1A2E",
                boxShadow: "0 1px 0 #B8862E",
              }
            : {
                background: "#EDE3CA",
                borderColor: "#8A8270",
                color: "#5C5444",
                boxShadow: "0 1px 0 #B0A075",
              }
        }
      >
        Lv {badge.levelId}
      </div>
      {/* "NEXT" tag — top-right corner, only on the next-available tile */}
      {isNext && (
        <div
          className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md border-2 border-[#1A1A2E] bg-[#FFD96B] text-[#1A1A2E] font-heading font-bold text-[9px] uppercase tracking-wider leading-none"
          style={{ boxShadow: "0 1px 0 #B8862E" }}
        >
          Next
        </div>
      )}
    </motion.button>
  );
}

export default function RewardsPage() {
  const { navigate } = useRouteTransition();
  const { student, dirhams, dirhamsEarnedAllTime, equipped, currentSubject, setCurrentSubject, subjectProgress, unlockEverything } = useGameStore();
  const { unlockedBadges, totalXP, completedLevels, currentLevel } = useCurrentSubjectProgress();
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  // "Press and hold to preview" — toggles whether the lock overlay is hidden
  // on the locked trophy and certificate so the player can sneak a peek.
  const [previewTrophy, setPreviewTrophy] = useState(false);
  const [previewCert, setPreviewCert] = useState(false);
  // Track input modality so the affordance label adapts: HOLD TO PEEK on
  // touch (where you must press), HOVER TO PEEK on mouse (more natural).
  // Default to touch so SSR + first paint don't flash the wrong label.
  const [isMouseInput, setIsMouseInput] = useState(false);
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setIsMouseInput(true);
      else if (e.pointerType === "touch") setIsMouseInput(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("pointermove", onPointer);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  /* Hover-to-peek for mouse users — onPointerEnter/Leave filtered to
     pointerType==="mouse" so touch users don't accidentally trigger
     it via touch->mouse compatibility events. */
  const startHover =
    (setter: (v: boolean) => void) => (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      setter(true);
    };
  const endHover =
    (setter: (v: boolean) => void) => (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      setter(false);
    };

  /* Press-and-hold to view, on every input.
     Touch quirk: if we capture the pointer or preventDefault on pointerdown,
     the browser can't scroll when the user drags. So on touch we leave the
     gesture uncaptured and instead arm a short delay — only after ~140ms of
     stationary press do we activate "preview". Any movement before that
     cancels (it was a scroll). After activation, finger lift / move-off /
     scroll all release. */
  const holdRef = {
    current: null as null | {
      x: number;
      y: number;
      armTimeout: ReturnType<typeof setTimeout> | null;
      activated: boolean;
      setter: (v: boolean) => void;
    },
  };
  const cancelHold = () => {
    const h = holdRef.current;
    if (!h) return;
    if (h.armTimeout) clearTimeout(h.armTimeout);
    if (h.activated) h.setter(false);
    holdRef.current = null;
  };
  const startHold =
    (setter: (v: boolean) => void) => (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        setter(true);
        holdRef.current = { x: e.clientX, y: e.clientY, armTimeout: null, activated: true, setter };
        return;
      }
      // Touch: don't capture, don't preventDefault — let scroll work.
      // Arm the preview after a short hold so brief taps that turn into
      // scrolls don't flash the preview on.
      const startX = e.clientX;
      const startY = e.clientY;
      holdRef.current = {
        x: startX,
        y: startY,
        activated: false,
        setter,
        armTimeout: setTimeout(() => {
          if (holdRef.current && !holdRef.current.activated) {
            holdRef.current.activated = true;
            setter(true);
          }
        }, 140),
      };
    };
  const moveHold = (e: React.PointerEvent<HTMLElement>) => {
    const h = holdRef.current;
    if (!h) return;
    // If finger moves before activation it's a scroll — cancel.
    // If it moves after activation, also release (user is scrolling away).
    if (Math.hypot(e.clientX - h.x, e.clientY - h.y) > 10) cancelHold();
  };
  const endHold = () => {
    cancelHold();
  };
  // Safety net: if any pointer is released anywhere (e.g. finger lifts off
  // the page, a hold-to-peek button fades mid-drag, or the window loses
  // focus), make sure we drop preview mode so it can't get stuck "on".
  useEffect(() => {
    if (!previewTrophy && !previewCert) return;
    let cancelled = false;
    const release = () => {
      if (cancelled) return;
      setPreviewTrophy(false);
      setPreviewCert(false);
    };
    const id = window.requestAnimationFrame(() => {
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", release);
      window.addEventListener("mouseup", release);
      window.addEventListener("touchend", release);
      window.addEventListener("touchcancel", release);
      window.addEventListener("blur", release);
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("mouseup", release);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
      window.removeEventListener("blur", release);
    };
  }, [previewTrophy, previewCert]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedBadgeData = selectedBadge ? findBadgeById(selectedBadge) : null;

  // Active-subject badges (filters the grid below)
  const subjectBadges = getBadgesForSubject(currentSubject);
  const subjectBadgeCount = subjectBadges.filter((b) =>
    unlockedBadges.includes(b.id) ||
    // back-compat with legacy "badge-level-N" ids on the space subject
    (b.subjectId === "space" && unlockedBadges.includes(`badge-level-${b.levelId}`))
  ).length;
  const badgeCount = subjectBadgeCount;
  const allComplete = badgeCount === subjectBadges.length;
  const message = getMessage(badgeCount);
  const progressPercent = subjectBadges.length > 0 ? (badgeCount / subjectBadges.length) * 100 : 0;
  const nextBadge = subjectBadges.find((b) =>
    !unlockedBadges.includes(b.id) &&
    !(b.subjectId === "space" && unlockedBadges.includes(`badge-level-${b.levelId}`))
  );
  const dirhamsSpent = Math.max(0, dirhamsEarnedAllTime - dirhams);

  // Total badges across ALL subjects (for the eyebrow stat)
  const totalBadgesAcrossAll = subjects.reduce((sum, s) => {
    const subBadges = getBadgesForSubject(s.id);
    const subUnlocked = subjectProgress[s.id]?.unlockedBadges ?? [];
    return sum + subBadges.filter((b) =>
      subUnlocked.includes(b.id) ||
      (s.id === "space" && subUnlocked.includes(`badge-level-${b.levelId}`))
    ).length;
  }, 0);
  const totalBadgesPossible = subjects.reduce((sum, s) => sum + getBadgesForSubject(s.id).length, 0);
  // XP earned by the player so far across every subject (current XP).
  const totalXPAcrossAll = subjects.reduce(
    (sum, s) => sum + (subjectProgress[s.id]?.totalXP ?? 0),
    0
  );
  // The maximum XP possible if the player completed every level of every subject.
  // Shown on the Master Explorer certificate so the number reads as a final
  // grand total, not the player's running tally.
  const totalXPPossible = subjects.reduce(
    (sum, s) => sum + getLevelsForSubject(s.id).reduce((s2, lv) => s2 + lv.xpReward, 0),
    0
  );
  // True only when EVERY badge across EVERY enabled subject is unlocked.
  // Trophy + certificate gate on this so they reward finishing the whole app,
  // not just one subject. Subjects with zero badges (e.g. unfinished placeholders)
  // are excluded from the requirement so they don't make it impossible.
  const allSubjectsComplete =
    totalBadgesPossible > 0 && totalBadgesAcrossAll === totalBadgesPossible;

  // Helper for the per-subject tabs
  const handleSubjectTab = (id: SubjectId) => {
    if (id !== currentSubject) setCurrentSubject(id);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-dvh bg-[var(--color-lesson-bg)]">
      <SaduPattern opacity={0.05} className="fixed inset-0 pointer-events-none z-[1]" />

      {/* Top bar with Sadu accent */}
      <div className="sticky top-0 z-30 bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b border-[#E5D9B8]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
            className="w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
            aria-label="Back to map"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-lg sm:text-xl text-[#1A1A2E] leading-none flex items-center gap-1.5 whitespace-nowrap">
              <KhaleejiStar size={12} />
              Rewards Room
            </h1>
            <p className="font-body text-sm sm:text-base font-bold text-[#B8862E] leading-none mt-1 text-left">
              قاعةُ الجوائز
            </p>
          </div>
          {/* XP + badges + avatar block.
                MOBILE (<md): hidden here, rendered as a thin status
                  strip below the SaduBand so the cramped header
                  has only [back arrow] + [title].
                DESKTOP (md+): inline in the header (room available). */}
          <div className="hidden md:flex items-center gap-2">
            <div className="text-right">
              <p className="text-[#B8862E] font-heading font-bold text-base leading-none">
                {totalXP}
                <span className="text-xs ml-0.5">XP</span>
              </p>
              <p className="text-[10px] font-body text-[#1A1A2E]/55 leading-none mt-0.5">
                {totalBadgesAcrossAll}/{totalBadgesPossible} badges
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#1A1A2E] bg-[#FFF1DC] flex items-center justify-center"
              style={{ boxShadow: "0 3px 0 #C9B58A" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={humanSrcFor(student.avatarId, equipped.human)}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            {/* DEV-ONLY debug control — gated by NODE_ENV. In `next build`
                production, this branch is removed by React tree-shaking and
                does not appear in the bundle. The hazard-stripe pattern + DEBUG
                tag make it visually unmistakable as a debug-only control so
                screenshots/demos can't confuse it with a real CTA. */}
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={() => unlockEverything()}
                className="relative flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-1 rounded-md text-[#1A1A2E]"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #FFD96B 0 6px, #1A1A2E 6px 10px, #FFD96B 10px 16px)",
                  border: "2px dashed #1A1A2E",
                  boxShadow: "0 2px 0 #1A1A2E",
                }}
                title="Dev-only: unlock all badges & levels. Hidden in production builds."
              >
                <span className="bg-white/95 px-1.5 py-0.5 rounded-sm border border-[#1A1A2E] leading-none">
                  DEBUG
                </span>
                <span className="text-white drop-shadow-[0_1px_0_#1A1A2E]">
                  Unlock All
                </span>
              </button>
            )}
          </div>
        </div>
        <SaduBand className="mt-2.5 opacity-90" height={12} variant="prominent" />
        {/* MOBILE-only status strip — sits just under the SaduBand and
            holds the avatar + XP + badges info that we pulled out of
            the cramped header. Hidden on md+ where the header has
            room to show this inline. */}
        <div className="md:hidden mt-2 max-w-[1200px] mx-auto flex items-center justify-end gap-2">
          <div className="text-right">
            <p className="text-[#B8862E] font-heading font-bold text-base leading-none">
              {totalXP}
              <span className="text-xs ml-0.5">XP</span>
            </p>
            <p className="text-[10px] font-body text-[#1A1A2E]/55 leading-none mt-0.5">
              {totalBadgesAcrossAll}/{totalBadgesPossible} badges
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[#1A1A2E] bg-[#FFF1DC] flex items-center justify-center"
            style={{ boxShadow: "0 2px 0 #C9B58A" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={humanSrcFor(student.avatarId, equipped.human)}
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 py-5">
        {/* === DESKTOP TOP ROW (lg+) — Journey Progress (60%) +
            Treasury (40%) side-by-side. On mobile they stack as
            before. The grid wrapper opens here and closes after the
            Treasury card so subject tabs / badges below stay full
            width. SectionCard's `mb-5` is stripped on the right card
            so it doesn't push the column taller than the left. === */}
        <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6 lg:items-stretch lg:[&>*]:mb-0 lg:mb-5">
        <SectionCard delay={0} title="Journey Progress" titleAr="تقدم الرحلة">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-[#1A1A2E]/70">{message.en}</span>
            <span className="font-heading font-bold text-lg text-[#B8862E]">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <p className="text-xs font-body text-[#1A1A2E]/50 mb-3" dir="rtl">{message.ar}</p>

          {/* Progress bar — duo green */}
          <div
            className="relative h-4 bg-[#EDE3CA] rounded-full overflow-hidden border-2 border-[#1A1A2E]"
            style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.05)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: allComplete
                  ? "linear-gradient(90deg, #FFD96B, #D4AF37, #009639)"
                  : "linear-gradient(90deg, #FFD96B, #D4AF37)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
            {/* Milestone dots */}
            {subjectBadges.map((_, i) => {
              const pct = ((i + 1) / subjectBadges.length) * 100;
              const left = Math.min(pct, 98);
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full border border-[#1A1A2E]"
                  style={{
                    left: `${left}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: i < badgeCount ? "#1A1A2E" : "rgba(0,0,0,0.1)",
                  }}
                />
              );
            })}
          </div>
        </SectionCard>

        {/* === Treasury — current dirham balance + Souq entry === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative bg-white rounded-3xl border-2 border-[#1A1A2E] p-4 mb-5 lg:h-full lg:flex lg:items-center"
          style={{ boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
        >
          {/* Treasury layout (mobile + desktop): icon (left) + treasury
              text (middle, flex-1) + Visit the Souq button (right,
              hugs content). One row at all viewports — fits cleanly
              even on narrow phones since the button is short. */}
          <div className="flex items-center gap-3 sm:gap-4 lg:w-full">
            <motion.div
              className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-[#1A1A2E]"
              style={{
                background: "radial-gradient(circle at 30% 25%, #FFE48A, #D4AF37)",
                boxShadow: "0 3px 0 #8B6914, inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/uae-dirham.webp"
                alt=""
                width={44}
                height={44}
                style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }}
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-heading uppercase tracking-wider text-[#1A1A2E]/55 leading-none">
                Treasury
              </p>
              <p className="font-body text-xs font-bold text-[#B8862E] leading-none mt-1 text-left">
                الخزينةُ
              </p>
              <p className="text-[10px] font-body text-[#1A1A2E]/55 leading-none mt-2 uppercase tracking-wider">
                Current balance
              </p>
              <p className="font-heading font-bold text-3xl md:text-4xl text-[#1A1A2E] leading-none mt-1">
                {dirhams}
                <span className="text-sm font-body text-[#1A1A2E]/55 ml-1.5">dirhams</span>
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                <p className="text-[11px] font-body text-[#1A1A2E]/50 leading-snug">
                  Earned through play: <span className="font-heading text-[#1A1A2E]/75">{dirhamsEarnedAllTime}</span>
                </p>
                {dirhamsSpent > 0 && (
                  <p className="text-[11px] font-body text-[#1A1A2E]/50 leading-snug">
                    Spent: <span className="font-heading text-[#1A1A2E]/75">{dirhamsSpent}</span>
                  </p>
                )}
                {/* Surface the welcome-bonus origin while it's still
                    holding most/all of the balance — clarifies how the
                    counter has dirhams when "earned through play" is 0. */}
                {dirhamsEarnedAllTime === 0 && dirhamsSpent === 0 && dirhams > 0 && (
                  <p className="text-[11px] font-body text-[#B8862E] leading-snug">
                    Includes welcome bonus
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate("/souq", { label: "Opening the Souq", labelAr: "نفتح السوق" })}
              className="shrink-0 bg-[var(--color-duo-green)] text-[#1A1A2E] px-3 sm:px-4 py-2.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-duo-green-dark)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 sm:gap-2"
              style={{ boxShadow: "0 3px 0 var(--color-duo-green-dark)" }}
            >
              {/* Short label on phone (Souq), full label on sm+ */}
              <span className="sm:hidden">Souq</span>
              <span className="hidden sm:inline">Visit the Souq</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
        </div>
        {/* === END DESKTOP TOP ROW === */}


        {/* === Subject tabs (filter the grid below by subject).
            Scrollbar hidden — strip stays clean and users swipe to
            reveal overflow tabs. mb is bumped slightly so the next
            section breathes below the strip. === */}
        <div
          className="mb-4 flex gap-2 overflow-x-auto overflow-y-visible -mx-1 px-1 pb-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {subjects.map((s) => {
            const isActive = currentSubject === s.id;
            const disabled = !s.enabled;
            return (
              <button
                key={s.id}
                onClick={() => !disabled && handleSubjectTab(s.id)}
                disabled={disabled}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border-2 font-heading font-bold text-xs transition-all active:scale-95 ${
                  disabled
                    ? "border-[#E5D9B8] bg-white/40 text-[#1A1A2E]/40 opacity-60 cursor-not-allowed"
                    : isActive
                      ? "border-[#1A1A2E] bg-[#FFF1DC] text-[#1A1A2E] cursor-pointer"
                      : "border-[#1A1A2E]/40 bg-white text-[#1A1A2E]/75 hover:bg-[#FFF8E6] hover:border-[#1A1A2E] hover:scale-[1.04] cursor-pointer"
                }`}
                style={{
                  boxShadow: disabled
                    ? "0 2px 0 #C9B58A"
                    : isActive
                      ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.55)"
                      : "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
                }}
                aria-pressed={isActive}
              >
                <SubjectIcon subjectId={s.id} size={18} />
                {s.name}
              </button>
            );
          })}
        </div>

        {/* === Badges grid (filtered to current subject) === */}
        <SectionCard
          title={`${subjectsById[currentSubject]?.name ?? ""} Badges`}
          titleAr={`شارات ${subjectsById[currentSubject]?.nameAr ?? ""}`}
          delay={0.15}
        >
          {subjectBadges.length === 0 ? (
            <p className="font-body text-sm text-[#1A1A2E]/55 text-center py-6">
              Coming soon · قريبًا
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2.5">
              {subjectBadges.map((badge) => {
                const unlocked =
                  unlockedBadges.includes(badge.id) ||
                  (badge.subjectId === "space" && unlockedBadges.includes(`badge-level-${badge.levelId}`));
                return (
                  <div key={badge.id} className="basis-[calc(33.333%-7px)] md:basis-[calc(25%-8px)] lg:basis-[calc(14.285%-9px)]">
                    <BadgeTile
                      badge={badge}
                      unlocked={unlocked}
                      isNext={!unlocked && nextBadge?.id === badge.id}
                      onClick={() => setSelectedBadge(badge.id)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* (Old "Next badge" teaser card was removed — the grid now
            highlights the next-available badge inline with a gold
            border + pulsing ring + "NEXT" tag, so the duplicate
            teaser strip became redundant.) */}

        {/* === DESKTOP TROPHY+CERTIFICATE PAIR (lg+) — 50/50 grid.
            items-stretch so both columns share the row height (they
            naturally differ — cert is taller than the 3D scene), and
            the trophy column gets lg:h-full + flex so its scene fills
            the full height. === */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-stretch lg:[&>*]:mb-0 lg:mb-5">
        {/* === 3D Trophy Scene — always visible (locked subjects show a
              dimmed overlay so it reads as "preview"). === */}
        <motion.div
          className="relative mb-5 lg:h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          /* Hover handlers attached HERE on the never-vanishing parent
             (not the overlay below, which toggles its own pointer-
             events off when previewing — that caused an enter→leave
             feedback loop on desktop). */
          {...(allSubjectsComplete
            ? {}
            : {
                onPointerEnter: startHover(setPreviewTrophy),
                onPointerLeave: endHover(setPreviewTrophy),
              })}
        >
          <TrophyScene />
          {!allSubjectsComplete && (
            <>
              <div
                className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center bg-black/75 backdrop-blur-md px-4 text-center transition-opacity duration-200 cursor-pointer select-none ${
                  previewTrophy ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  /* Browser-native vertical scroll always wins on touch. */
                  touchAction: "pan-y",
                }}
                onPointerDown={startHold(setPreviewTrophy)}
                onPointerMove={moveHold}
                onPointerUp={endHold}
                onPointerCancel={endHold}
                onContextMenu={(e) => e.preventDefault()}
                role="button"
                tabIndex={0}
                aria-label={isMouseInput ? "Hover to preview the trophy" : "Press and hold to preview the trophy"}
              >
                <EyeIcon open={false} className="w-10 h-10 text-[#FFD96B] mb-2" />
                <p className="text-[#FFD96B] font-heading font-bold text-sm tracking-wider uppercase">
                  Trophy Locked
                </p>
                <p className="text-[#FFE9A8]/85 font-body text-xs mt-1">
                  Earn all {totalBadgesPossible} badges across every subject
                </p>
                <p className="text-[#FFE9A8]/70 font-body text-xs mt-1">
                  {totalBadgesAcrossAll} / {totalBadgesPossible} so far
                </p>
                <p className="text-[#FFE9A8]/60 font-body text-xs mt-1" dir="rtl">
                  أكمل جميع المواضيع لتفتح الكأس
                </p>
              </div>
              {/* Tap-to-peek pill (touch) / hold-to-peek (mouse) — sits OUTSIDE
                  the panel, always tappable. No `touch-none` so a swipe that
                  starts on the pill still scrolls the page. */}
              <button
                type="button"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 bg-[#1A1A2E] text-[#FFD96B] border-2 border-[#FFD96B] rounded-full px-3 py-1.5 font-heading font-bold text-[11px] uppercase tracking-wider shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(0,0,0,0.4)] select-none"
                style={{
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  touchAction: "pan-y",
                }}
                onPointerDown={startHold(setPreviewTrophy)}
                onPointerMove={moveHold}
                onPointerUp={endHold}
                onPointerCancel={endHold}
                onContextMenu={(e) => e.preventDefault()}
                aria-label={isMouseInput ? "Hover the trophy area to peek" : "Press and hold to peek the trophy"}
              >
                <EyeIcon open={previewTrophy} className="w-4 h-4" />
                {isMouseInput ? "Hover to peek" : "Hold to peek"}
              </button>
            </>
          )}
        </motion.div>

        {/* === Master Explorer Certificate — always visible; locked when not complete === */}
        {true && (
          // Outer wrapper does NOT clip so the "Hold to peek" pill at -bottom-3 is visible.
          // Hover handlers attached HERE on the never-vanishing wrapper
          // (not the locked overlay below, which toggles its own pointer-
          // events off when previewing — that caused a feedback loop).
          <div
            className="relative mb-5"
            {...(allSubjectsComplete
              ? {}
              : {
                  onPointerEnter: startHover(setPreviewCert),
                  onPointerLeave: endHover(setPreviewCert),
                })}
          >
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2 border-[#1A1A2E]"
            style={{ boxShadow: "0 6px 0 #8B6914" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          >
            {/* Aged-paper background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-100" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold-light/30 via-gold/20 to-gold-dark/30" />
            <GrainTexture opacity={0.18} />
            <div className="absolute inset-0 opacity-15">
              <SaduPattern opacity={0.5} />
            </div>

            {/* Decorative double border */}
            <div className="absolute inset-2 md:inset-3 border-2 md:border-[3px] border-[#8B6914]/60 rounded-2xl pointer-events-none" />
            <div className="absolute inset-3.5 md:inset-5 border border-[#8B6914]/40 rounded-xl pointer-events-none" />

            {/* Corner ornaments */}
            {(
              [
                { top: 8, left: 8, deg: 0 },
                { top: 8, right: 8, deg: 90 },
                { bottom: 8, left: 8, deg: 270 },
                { bottom: 8, right: 8, deg: 180 },
              ] as const
            ).map((pos, i) => {
              const { deg, ...rest } = pos;
              return (
                <svg
                  key={i}
                  className="absolute w-7 h-7 md:w-12 md:h-12 text-[#8B6914]/70 pointer-events-none"
                  viewBox="0 0 40 40"
                  style={{ ...rest, transform: `rotate(${deg}deg)` }}
                  aria-hidden="true"
                >
                  <path d="M0,0 L20,0 Q12,8 4,12 L0,20 Z" fill="currentColor" />
                  <circle cx="6" cy="6" r="1.8" fill="#5C4510" />
                  <path d="M3 15 Q11 11 15 3" stroke="#5C4510" strokeWidth="0.6" fill="none" />
                </svg>
              );
            })}

            <div className="relative p-4 md:p-9 text-center">
              <motion.div
                className="mx-auto mb-2 md:mb-3 relative"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="md:hidden mx-auto" style={{ width: 60, height: 60 }}>
                  <FalconCrest size={60} />
                </div>
                <div className="hidden md:block">
                  <FalconCrest size={100} />
                </div>
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,217,107,0.4) 0%, transparent 60%)",
                    filter: "blur(20px)",
                  }}
                />
              </motion.div>

              <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-heading font-bold text-[#1A1A2E]/60 mb-1">
                Certificate of Achievement
              </p>
              <ArabesqueBorder className="opacity-40 my-1.5 md:my-2" />
              <h3 className="text-lg md:text-3xl font-heading font-bold text-[#1A1A2E]">
                Master Explorer
              </h3>
              <p className="text-sm md:text-lg font-body text-[#1A1A2E]/70 mt-0.5" dir="rtl">
                مستكشفٌ ماهر
              </p>

              <p className="text-[#1A1A2E]/80 font-body text-xs md:text-sm mt-2 md:mt-3 italic">
                This certifies that
              </p>
              <p className="text-base md:text-2xl font-heading font-bold text-[#1A1A2E] mt-0.5">
                {student.name || "Young Explorer"}
              </p>
              <p className="text-[#1A1A2E]/80 font-body text-xs md:text-sm mt-2 md:mt-3 max-w-md mx-auto leading-snug md:leading-relaxed">
                has completed every level across every subject of Falcon&apos;s Journey
                {" "}and earned all {totalBadgesPossible} badges.
              </p>
              <p className="text-[#1A1A2E]/60 font-body text-[10px] md:text-xs mt-1 md:mt-2" dir="rtl">
                أكملَ جميعَ المستويات وحصلَ على كلِّ الشارات. ما شاء الله!
              </p>

              {/* UAE National Day reference */}
              <div className="mt-2 md:mt-3 inline-flex items-center gap-1.5 md:gap-2 bg-white/60 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-[#1A1A2E]/15">
                <svg width="12" height="8" viewBox="0 0 22 14" aria-hidden="true" className="md:w-4 md:h-[11px]">
                  {/* fly side: green / white / black horizontal stripes */}
                  <rect x="6" width="16" height="4.66" y="0" fill="#009639" />
                  <rect x="6" width="16" height="4.66" y="4.66" fill="white" />
                  <rect x="6" width="16" height="4.66" y="9.32" fill="#1A1A2E" />
                  {/* red hoist on the LEFT */}
                  <rect width="6" height="14" fill="#CE1126" />
                </svg>
                <p className="text-[8px] md:text-[10px] tracking-wider uppercase font-heading font-bold text-[#1A1A2E]/70">
                  In the spirit of UAE National Day · Dec 2
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-5 mt-3 md:mt-5">
                <div className="text-center">
                  <p className="text-base md:text-2xl font-heading font-bold text-[#1A1A2E]">{totalXPPossible}</p>
                  <p className="text-[9px] md:text-[10px] tracking-wider uppercase font-body text-[#1A1A2E]/60">Total XP</p>
                </div>
                <div className="w-px h-7 md:h-10 bg-[#1A1A2E]/20" />
                <div className="text-center">
                  <p className="text-base md:text-2xl font-heading font-bold text-[#1A1A2E]">{totalBadgesPossible}/{totalBadgesPossible}</p>
                  <p className="text-[9px] md:text-[10px] tracking-wider uppercase font-body text-[#1A1A2E]/60">Badges</p>
                </div>
              </div>

              {/* Faux-handwritten signature line */}
              <div className="mt-3 md:mt-6 flex flex-col items-center gap-0.5 md:gap-1">
                <svg className="w-32 md:w-44 h-5 md:h-8 text-[#1A1A2E]/80" viewBox="0 0 180 32" aria-hidden="true">
                  <path
                    d="M5,22 Q15,8 25,18 Q35,28 50,14 Q60,4 75,16 Q88,26 100,12 Q115,2 130,18 Q145,28 160,14 Q170,8 175,18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="w-32 md:w-44 h-px bg-[#1A1A2E]/40" />
                <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-heading font-bold text-[#1A1A2E]/60">
                  Falcon Council of Discovery
                </p>
                <p className="text-[9px] md:text-[10px] font-body text-[#1A1A2E]/50" dir="rtl">
                  مجلسُ الصقرِ للاستكشاف
                </p>
              </div>
            </div>
            {!allSubjectsComplete && (
              <>
                {/* Graduated locked overlay — instead of one flat dim
                    over everything, mask the dim with a vertical
                    gradient so the TOP of the cert (frame + falcon
                    crest + "Master Explorer" + the player's name)
                    stays sharp and visible, and only the BOTTOM
                    (body paragraph + stats + signature + seal) is
                    blurred & dimmed. Goal: the user instantly sees
                    "this certificate has MY name on it" while the
                    locked content below keeps the motivation. */}
                <div
                  className={`absolute inset-0 rounded-3xl cursor-pointer select-none transition-opacity duration-200 ${
                    previewCert ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                  style={{
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                    touchAction: "pan-y",
                    /* Heavy dark + blur, masked so it ramps in from
                       40% downward — top stays clear. */
                    background: "rgba(0,0,0,0.72)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, transparent 36%, rgba(0,0,0,0.85) 50%, black 64%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, transparent 36%, rgba(0,0,0,0.85) 50%, black 64%)",
                  }}
                  onPointerDown={startHold(setPreviewCert)}
                  onPointerMove={moveHold}
                  onPointerUp={endHold}
                  onPointerCancel={endHold}
                  onContextMenu={(e) => e.preventDefault()}
                  role="button"
                  tabIndex={0}
                  aria-label={isMouseInput ? "Hover the certificate to preview" : "Press and hold to preview the certificate"}
                />
                {/* Locked-state copy — pinned to the bottom 60% where
                    the dim is darkest, so it sits over the blurred
                    content and reads cleanly. Pointer-events forwarded
                    via the surrounding overlay above. */}
                <div
                  className={`absolute left-0 right-0 bottom-0 top-[58%] flex flex-col items-center justify-center rounded-b-3xl px-4 text-center pointer-events-none transition-opacity duration-200 ${
                    previewCert ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <EyeIcon open={false} className="w-10 h-10 text-[#FFD96B] mb-1.5" />
                  <p className="text-[#FFD96B] font-heading font-bold text-sm md:text-base tracking-wider uppercase">
                    Certificate Locked
                  </p>
                  <p className="text-[#FFE9A8]/90 font-body text-xs md:text-sm mt-1">
                    Earn all {totalBadgesPossible} badges across every subject
                  </p>
                  <p className="text-[#FFE9A8]/70 font-body text-xs mt-1">
                    {totalBadgesAcrossAll} / {totalBadgesPossible} so far
                  </p>
                  <p className="text-[#FFE9A8]/60 font-body text-[11px] mt-1" dir="rtl">
                    أكمل جميع المواضيع لتفتح الشهادة
                  </p>
                </div>
              </>
            )}
          </motion.div>
          {/* Hold-to-peek pill sits OUTSIDE the cert (which has overflow-hidden)
              so it isn't clipped. Positioned against the outer wrapper. */}
          {!allSubjectsComplete && (
            <button
              type="button"
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 bg-[#1A1A2E] text-[#FFD96B] border-2 border-[#FFD96B] rounded-full px-3 py-1.5 font-heading font-bold text-[11px] uppercase tracking-wider shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(0,0,0,0.4)] select-none"
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                touchAction: "pan-y",
              }}
              onPointerDown={startHold(setPreviewCert)}
              onPointerMove={moveHold}
              onPointerUp={endHold}
              onPointerCancel={endHold}
              onContextMenu={(e) => e.preventDefault()}
              aria-label={isMouseInput ? "Hover the certificate area to peek" : "Press and hold to peek the certificate"}
            >
              <EyeIcon open={previewCert} className="w-4 h-4" />
              {isMouseInput ? "Hover to peek" : "Hold to peek"}
            </button>
          )}
          </div>
        )}
        </div>
        {/* === END DESKTOP TROPHY+CERTIFICATE PAIR === */}

        <div className="mt-2">
          <LessonButton variant="primary" size="lg" fullWidth onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}>
            Back to Map
          </LessonButton>
        </div>
      </div>

      {/* === Badge detail modal === */}
      <AnimatePresence>
        {selectedBadgeData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              className="relative bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl border-2 border-[#1A1A2E] overflow-hidden"
              style={{ boxShadow: "0 6px 0 #C9B58A" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button — top-right, souq grammar */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                style={{ boxShadow: "0 2px 0 #C9B58A" }}
                aria-label="Close badge"
              >
                <X className="w-4 h-4 text-[#1A1A2E]" />
              </button>

              {(() => {
                const isUnlocked = unlockedBadges.includes(selectedBadgeData.id);
                return (
                  <>
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        background: isUnlocked
                          ? `radial-gradient(circle at 50% 30%, ${selectedBadgeData.theme.gradient[0]}, transparent 70%)`
                          : "none",
                      }}
                    />

                    <div className="relative z-10">
                      {/* Medallion — same large version of the tile medallion */}
                      <motion.div
                        className="mx-auto mb-4 flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.1 }}
                        style={{ width: 110, height: 110 }}
                      >
                        <BadgeMedallion
                          badge={selectedBadgeData}
                          unlocked={isUnlocked}
                          size={110}
                        />
                      </motion.div>

                      <h3 className="text-2xl font-heading font-bold text-center text-[#1A1A2E]">
                        {isUnlocked ? selectedBadgeData.name : "Locked Badge"}
                      </h3>
                      <p
                        className="text-base font-body font-bold text-center mt-1 text-[#B8862E]"
                      >
                        {isUnlocked ? selectedBadgeData.nameAr : "شارة مغلقة"}
                      </p>

                      <ArabesqueBorder className="opacity-50 my-3" />

                      {/* Whether THIS badge's level is the one they can play
                          right now. If they tapped a far-future locked badge
                          (e.g. Level 6 while on Level 2), we tell them which
                          level they actually need to clear next. */}
                      {(() => {
                        const targetLevelId = selectedBadgeData.levelId;
                        const isPlayableNow = targetLevelId <= currentLevel;
                        return (
                          <>
                            <p className="text-center font-body text-[#1A1A2E]/75 text-sm leading-snug">
                              {isUnlocked
                                ? selectedBadgeData.description
                                : isPlayableNow
                                  ? `Finish Level ${targetLevelId} to earn the "${selectedBadgeData.name}" badge.`
                                  : `First, finish Level ${currentLevel} to keep climbing toward this badge.`}
                            </p>

                            <div className="flex items-center justify-center gap-3 mt-3">
                              <span className="text-xs font-body text-[#1A1A2E]/50">
                                Level {targetLevelId}
                              </span>
                              <span className="text-[#B8862E] font-heading font-bold">
                                +100 XP
                              </span>
                            </div>

                            <div className="mt-5 flex flex-col gap-2">
                              {!isUnlocked && (
                                <LessonButton
                                  variant="primary"
                                  size="md"
                                  fullWidth
                                  onClick={() => {
                                    setSelectedBadge(null);
                                    navigate(`/level/${currentLevel}`, { label: `Preparing Level ${currentLevel}`, labelAr: `نُجهِّز المستوى ${currentLevel}` });
                                  }}
                                >
                                  {isPlayableNow
                                    ? `Finish Level ${targetLevelId}`
                                    : `Finish Level ${currentLevel} first`}
                                </LessonButton>
                              )}
                              <LessonButton
                                variant={isUnlocked ? "primary" : "neutral"}
                                size="md"
                                fullWidth
                                onClick={() => setSelectedBadge(null)}
                              >
                                Close
                              </LessonButton>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
