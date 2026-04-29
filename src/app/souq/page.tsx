"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Lock } from "lucide-react";
import { useGameStore } from "@/lib/store";
import {
  shopItems,
  itemsForTarget,
  companionSrcFor,
  humanSrcFor,
  type ShopItem,
  type ItemTarget,
} from "@/data/shop";
import { enabledCompanions } from "@/data/companions";
import { avatars } from "@/data/avatars";

/* Avatars whose new variant set lives in /public/humans/{plain,flag,scarf,balloon}/{id}.svg.
   Mirror of the same set in AvatarSvg.tsx — both files filter the same ids. */
const NEW_HUMAN_IDS_FOR_SOUQ = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
import LessonButton from "@/components/lesson/LessonButton";
import SaduPattern from "@/components/patterns/SaduPattern";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import CoinPill from "@/components/ui/CoinPill";
import AvatarLightbox from "@/components/profile/AvatarLightbox";
import Hint3DOverlay from "@/components/profile/Hint3DOverlay";
import { getAvatarModel3D } from "@/components/profile/avatarModels3D";
import { fmtNumber } from "@/lib/numerals";
import { sounds } from "@/lib/sounds";

/* === Tabs (For You / For Your Companion) ============================= */
function TargetTabs({
  active,
  onChange,
}: {
  active: ItemTarget;
  onChange: (t: ItemTarget) => void;
}) {
  /* Two short labels — no Arabic inline, no long words. The Arabic name for
     the target is communicated everywhere else (item names, headings); the
     tab is just a quick switch so it stays compact. */
  const tabs: { id: ItemTarget; label: string; icon: React.ReactNode }[] = [
    {
      id: "human",
      label: "You",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      id: "companion",
      label: "Companion",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="6" cy="11" r="2" />
          <circle cx="10" cy="6" r="2" />
          <circle cx="14" cy="6" r="2" />
          <circle cx="18" cy="11" r="2" />
          <path d="M9 19c0-3 1.5-5 3-5s3 2 3 5-1.5 3-3 3-3 0-3-3z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="relative grid grid-cols-2 gap-1 p-1 bg-white border-2 border-[#1A1A2E] rounded-2xl"
      style={{ boxShadow: "0 3px 0 #C9B58A" }}
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl transition-colors min-w-0 ${
              isActive
                ? "text-[#1A1A2E]"
                : "text-[#1A1A2E]/55 hover:text-[#1A1A2E]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="tab-active"
                className="absolute inset-0 rounded-xl bg-[#FFE48A]"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 0 #C9B58A" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
              {t.icon}
              <span className="font-heading font-bold text-xs md:text-sm uppercase tracking-wider">
                {t.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* === Stage — always-visible live preview ===========================
   Renders one image (the active variant). The page-level preload effect
   runs img.decode() on every variant when the souq mounts, so swapping
   between variants is near-instant from cache. */
function HumanStage({
  avatarId,
  previewItemId,
}: {
  avatarId: number;
  previewItemId: string | null;
}) {
  // Use the shared resolver so new variants (glasses, etc.) work here too.
  const isNew = NEW_HUMAN_IDS_FOR_SOUQ.has(avatarId);
  const activeSrc = isNew
    ? humanSrcFor(avatarId, previewItemId)
    : previewItemId === "uae-flag"
      ? `/avatars/${avatarId}-flag.svg`
      : `/avatars/${avatarId}.svg`;
  /* Only the active variant is mounted. The page-level preload effect runs
     img.decode() on every variant when the souq mounts, so the browser
     keeps each image's decoded bitmap warm in memory — mounting one is
     near-instant from cache. */
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeSrc}
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "contain",
          objectPosition: "center center",
        }}
        draggable={false}
      />
    </div>
  );
}

function CompanionStage({
  previewItemId,
  overrideCompanionId,
  fallbackCompanionId,
}: {
  previewItemId: string | null;
  overrideCompanionId?: string;
  /* The saved companion id, used when no override is set. */
  fallbackCompanionId: string;
}) {
  const companionId = overrideCompanionId ?? fallbackCompanionId;
  // Use the shared resolver so new variants (and their non-svg
  // extensions, like the glasses PNG) automatically work here too.
  const src = companionSrcFor(companionId, previewItemId);
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Idle bob lives on a static parent so it never restarts on swap. */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* === Item tile in the rail ========================================= */
function ItemTile({
  item,
  selected,
  owned,
  equipped,
  affordable,
  arabicNumerals,
  onClick,
}: {
  item: ShopItem;
  selected: boolean;
  owned: boolean;
  equipped: boolean;
  affordable: boolean;
  arabicNumerals: boolean;
  onClick: () => void;
}) {
  // Border color reflects state hierarchy: selected (gold) > owned (gold-tan)
  // > affordable (cream) > unaffordable (cream + dimmed). Owned now reads
  // distinctly from a generic-affordable tile so the user sees "I have this".
  const borderClass = selected
    ? "border-[#D4AF37]"
    : owned
      ? "border-[#C9B58A]"
      : "border-[#E5D9B8]";

  // Unaffordable tiles dim the whole tile (icon + name + chip) so the
  // out-of-reach state reads at a glance, not just from a small lock icon.
  const tileOpacityClass = !affordable && !owned && !equipped
    ? "opacity-60"
    : "";

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative w-full h-[140px] md:h-[170px] flex flex-col items-center gap-1 p-1.5 md:p-2.5 rounded-2xl border-2 bg-white transition-colors ${borderClass} ${tileOpacityClass}`}
      style={{
        boxShadow: selected
          ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.5)"
          : "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
      aria-label={`${item.name}, ${item.price} dirhams`}
      aria-pressed={selected}
    >
      {/* Icon plate — flex-1 inside the fixed-height tile so the plate
          adapts to whatever vertical space remains after name+chip. */}
      <div
        className="relative w-full flex-1 min-h-0 rounded-xl bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border border-[#E5D9B8] flex items-center justify-center p-2 overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/shop/${item.icon}`}
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}
          draggable={false}
        />
      </div>

      {/* Name */}
      <p className="w-full text-center font-heading font-bold text-[10px] md:text-sm text-[#1A1A2E] leading-tight px-0.5 line-clamp-2 min-h-[2.2em]">
        {item.name}
      </p>

      {/* State chip — equipped/owned/price/locked. Fixed height so swapping
          between variants (Check icon, text-only, dirham img) can't change
          the chip's pixel height and ripple to the icon plate above. */}
      <div
        className={`h-6 flex items-center gap-1 px-2 rounded-full ${
          equipped
            ? "bg-[#DFF5E6] border border-[#009639] text-[#00702A]"
            : owned
              ? "bg-[#EDE3CA] border border-[#C9B58A] text-[#8B6914]"
              : affordable
                ? "bg-[#FFFCEF] border border-[#1A1A2E]/15 text-[#1A1A2E]"
                : "bg-[#FFE4E6] border border-[#B40D20]/30 text-[#B40D20]"
        }`}
      >
        {equipped ? (
          <>
            <Check className="w-3 h-3" strokeWidth={3} />
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
              On
            </span>
          </>
        ) : owned ? (
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            Owned
          </span>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uae-dirham.webp" alt="" width={14} height={14} />
            <span className="font-heading font-bold text-xs">
              {fmtNumber(item.price, arabicNumerals)}
            </span>
            {/* Larger lock on unaffordable items so the "out of reach" state
                is unmistakable at the chip level too, not just via opacity. */}
            {!affordable && <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />}
          </>
        )}
      </div>
    </motion.button>
  );
}

/* === Plain look "remove preview" tile (unstyled, doubles as Take Off) === */
function PlainTile({
  selected,
  onClick,
  isCurrentlyEquipped,
}: {
  selected: boolean;
  onClick: () => void;
  /* When true it means the player has nothing equipped — tile reads as "current". */
  isCurrentlyEquipped: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative w-full h-[140px] md:h-[170px] flex flex-col items-center gap-1 p-1.5 md:p-2.5 rounded-2xl border-2 bg-white transition-colors ${
        selected ? "border-[#D4AF37]" : "border-[#E5D9B8]"
      }`}
      style={{
        boxShadow: selected
          ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.5)"
          : "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
      aria-pressed={selected}
      aria-label="Plain look"
    >
      <div
        className="relative w-full flex-1 min-h-0 rounded-xl bg-gradient-to-b from-[#FFFCEF] to-[#EDE3CA] border border-[#E5D9B8] flex items-center justify-center p-2 overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
      >
        <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="#FFFCEF" stroke="#1A1A2E" strokeWidth="2.5" />
          <path
            d="M 18 32 L 46 32"
            stroke="#1A1A2E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2 4"
            opacity="0.55"
          />
        </svg>
      </div>
      <p className="w-full text-center font-heading font-bold text-[10px] md:text-sm text-[#1A1A2E] leading-tight px-0.5 line-clamp-2 min-h-[2.2em]">
        Plain Look
      </p>
      <div
        className={`h-6 flex items-center px-2 rounded-full border ${
          isCurrentlyEquipped
            ? "bg-[#DFF5E6] border-[#009639] text-[#00702A]"
            : "bg-[#EDE3CA] border-[#C9B58A] text-[#8B6914]"
        }`}
      >
        <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
          {isCurrentlyEquipped ? "On" : "Free"}
        </span>
      </div>
    </motion.button>
  );
}

/* === Human swatch grid (only shown on the You tab) ====================
   Mirrors CompanionSwatchRow. 4 cols, fits 4-12 humans cleanly. Each
   swatch shows the avatar's PLAIN variant (so the picker advertises the
   character, not the player's loadout). */
/* === Scrollable swatch rail with arrow buttons ===
   Wraps a horizontally-scrolling row of swatches with left/right arrow
   buttons that scroll the rail by ~80% on each tap. Buttons hide when
   the rail is at its scroll edge. Auto-scrolls the staged swatch into
   view when it changes. */
function ScrollableSwatchRail({
  children,
  stagedKey,
}: {
  children: React.ReactNode;
  /* Anything string-y that changes when the staged item changes. Used
     to trigger the auto-scroll-into-view effect. */
  stagedKey: string | number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateButtons = () => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  // Auto-scroll the staged swatch into view as it changes.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const staged = el.querySelector<HTMLElement>("[data-staged='true']");
    if (!staged) return;
    const center = staged.offsetLeft + staged.offsetWidth / 2;
    el.scrollTo({ left: center - el.clientWidth / 2, behavior: "smooth" });
    // Buttons may need to update after auto-scroll.
    setTimeout(updateButtons, 350);
  }, [stagedKey]);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-md flex items-center gap-1">
      {/* Left arrow */}
      <button
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        aria-label="Scroll left"
        className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-opacity ${
          canLeft
            ? "bg-white border-[#1A1A2E] text-[#1A1A2E] hover:scale-105 active:scale-95"
            : "bg-[#EDE3CA] border-[#C9B58A] text-[#1A1A2E]/30 cursor-not-allowed"
        }`}
        style={canLeft ? { boxShadow: "0 2px 0 #C9B58A" } : undefined}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={3} />
      </button>

      {/* Rail */}
      <div
        ref={railRef}
        className="flex-1 min-w-0 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-center gap-1.5 px-1 py-1">{children}</div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        aria-label="Scroll right"
        className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-opacity ${
          canRight
            ? "bg-white border-[#1A1A2E] text-[#1A1A2E] hover:scale-105 active:scale-95"
            : "bg-[#EDE3CA] border-[#C9B58A] text-[#1A1A2E]/30 cursor-not-allowed"
        }`}
        style={canRight ? { boxShadow: "0 2px 0 #C9B58A" } : undefined}
      >
        <ChevronRight className="w-4 h-4" strokeWidth={3} />
      </button>
    </div>
  );
}

function HumanSwatchRow({
  stagedAvatarId,
  actualAvatarId,
  onPick,
}: {
  stagedAvatarId: number;
  actualAvatarId: number;
  onPick: (id: number) => void;
}) {
  return (
    <ScrollableSwatchRail stagedKey={stagedAvatarId}>
      {avatars.map((a) => {
        const isStaged = a.id === stagedAvatarId;
        const isActual = a.id === actualAvatarId;
        const src = NEW_HUMAN_IDS_FOR_SOUQ.has(a.id)
          ? `/humans/plain/${a.id}.png`
          : `/avatars/${a.id}.svg`;
        return (
          // Outer wrapper — no overflow-hidden so the active-checkmark badge
          // can bleed past the swatch edge. The inner button keeps its own
          // clip so the avatar image still respects the rounded border.
          <div
            key={a.id}
            data-staged={isStaged ? "true" : undefined}
            className="relative shrink-0"
          >
            <motion.button
              onClick={() => onPick(a.id)}
              whileTap={{ scale: 0.92 }}
              className={`relative rounded-xl overflow-hidden border-2 bg-[#FFF1DC] flex items-center justify-center ${
                isStaged ? "border-[#D4AF37]" : "border-[#E5D9B8]"
              }`}
              style={{
                /* Same scale-with-viewport pattern as the stage box.
                   Floor 40px (iPhone SE), ceiling 64px (desktop), grows
                   on tall phones to absorb leftover column space. */
                width: "min(max(40px, calc(100dvh / 16)), 56px)",
                height: "min(max(40px, calc(100dvh / 16)), 56px)",
                boxShadow: isStaged
                  ? "0 2px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.5)"
                  : "0 2px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              aria-label={`Try on ${a.name}`}
              aria-pressed={isStaged}
              title={a.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.button>
            {isActual && (
              <span
                className="pointer-events-none absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center z-10"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
                aria-label="Your current selection"
              >
                <Check className="w-3 h-3 text-white" strokeWidth={4} />
              </span>
            )}
          </div>
        );
      })}
    </ScrollableSwatchRail>
  );
}

/* === Equip Avatar pill — same pattern as Equip Companion pill ======== */
function EquipAvatarPill({
  visible,
  onEquip,
}: {
  visible: boolean;
  onEquip: () => void;
}) {
  return (
    <button
      onClick={onEquip}
      disabled={!visible}
      aria-hidden={!visible}
      className="flex items-center gap-1 bg-[var(--color-duo-green)] text-[#1A1A2E] px-2.5 py-1 rounded-full font-heading font-bold text-[10px] uppercase tracking-wider border-2 border-[var(--color-duo-green-dark)] active:scale-95 transition-all"
      style={{
        boxShadow: "0 2px 0 var(--color-duo-green-dark)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Check className="w-3 h-3" strokeWidth={3} />
      Equip Explorer
    </button>
  );
}

function CompanionSwatchRow({
  stagedCompanionId,
  actualCompanionId,
  onPick,
}: {
  stagedCompanionId: string;
  actualCompanionId: string;
  onPick: (id: string) => void;
}) {
  return (
    <ScrollableSwatchRail stagedKey={stagedCompanionId}>
      {enabledCompanions.map((c) => {
        const isStaged = c.id === stagedCompanionId;
        const isActual = c.id === actualCompanionId;
        return (
          // Outer wrapper — no overflow-hidden so the active-checkmark badge
          // can bleed past the swatch edge. The inner button keeps its own
          // clip so the companion image still respects the rounded border.
          <div
            key={c.id}
            data-staged={isStaged ? "true" : undefined}
            className="relative shrink-0"
          >
            <motion.button
              onClick={() => onPick(c.id)}
              whileTap={{ scale: 0.92 }}
              className={`relative rounded-xl overflow-hidden border-2 bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] flex items-center justify-center ${
                isStaged ? "border-[#D4AF37]" : "border-[#E5D9B8]"
              }`}
              style={{
                /* Same scale-with-viewport pattern as the stage box +
                   human swatch. Floor 40px, ceiling 64px. */
                width: "min(max(40px, calc(100dvh / 16)), 56px)",
                height: "min(max(40px, calc(100dvh / 16)), 56px)",
                boxShadow: isStaged
                  ? "0 2px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.5)"
                  : "0 2px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              aria-label={`Try on ${c.name}`}
              aria-pressed={isStaged}
              title={c.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/companions/plain/${c.id}.svg`}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.button>
            {isActual && (
              <span
                className="pointer-events-none absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center z-10"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
                aria-label="Your current companion"
              >
                <Check className="w-3 h-3 text-white" strokeWidth={4} />
              </span>
            )}
          </div>
        );
      })}
    </ScrollableSwatchRail>
  );
}

/* === Inline pill — sits next to the swatches when previewing a companion
   that isn't currently saved. Single tap commits the swap.
   The pill is always rendered (so the row's height stays constant and the
   centered stage above doesn't shift), just visually hidden + non-interactive
   when the player isn't previewing a different companion. */
function MakeMinePill({
  visible,
  onMakeMine,
}: {
  visible: boolean;
  onMakeMine: () => void;
}) {
  return (
    <button
      onClick={onMakeMine}
      disabled={!visible}
      aria-hidden={!visible}
      className="flex items-center gap-1 bg-[var(--color-duo-green)] text-[#1A1A2E] px-2.5 py-1 rounded-full font-heading font-bold text-[10px] uppercase tracking-wider border-2 border-[var(--color-duo-green-dark)] active:scale-95 transition-all"
      style={{
        boxShadow: "0 2px 0 var(--color-duo-green-dark)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Check className="w-3 h-3" strokeWidth={3} />
      Equip Companion
    </button>
  );
}

/* === Bought toast =================================================== */
function BoughtToast({ show, name }: { show: boolean; name: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-2 bg-[#009639] text-white px-4 py-2 rounded-full border-2 border-[#00702A] font-heading text-sm"
          style={{ boxShadow: "0 4px 0 #00702A" }}
          initial={{ opacity: 0, y: -20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <Check className="w-4 h-4" strokeWidth={3} />
          Bought! <span className="opacity-75 font-body text-xs">{name}</span>
          <span className="opacity-70 text-[10px]" dir="rtl">تم الشراء</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* === Page ============================================================ */
export default function SouqPage() {
  const { navigate } = useRouteTransition();
  const {
    student,
    dirhams,
    ownedItems,
    equipped,
    arabicNumerals,
    buyItem,
    equipItem,
    unequipItem,
    addDirhams,
    setStudent,
    souqHintDismissed,
    dismissSouqHint,
  } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<ItemTarget>("human");
  /* Per-tab preview selection. Independent of what's equipped — null means
     "show plain look". When the user enters/switches tabs we sync this to
     whatever they currently have equipped so the stage matches reality. */
  const [previewHuman, setPreviewHuman] = useState<string | null>(null);
  const [previewCompanion, setPreviewCompanion] = useState<string | null>(null);
  /* Which companion is being previewed in the stage. Independent of
     student.companionId — null/undefined means "show the saved one". */
  const [previewCompanionId, setPreviewCompanionId] = useState<string | null>(null);
  /* Same idea for the human picker — null means "show the saved avatar". */
  const [previewAvatarId, setPreviewAvatarId] = useState<number | null>(null);
  /* Big-view lightbox for the character on stage. Always reflects the
     CURRENT preview state when opened — i.e. the avatar/companion + item
     the user is previewing right now (not what's saved/equipped). Try-
     before-you-buy applies to the 3D view too. */
  const [souqLightboxOpen, setSouqLightboxOpen] = useState(false);
  // Removed: purchaseFlash state (was used to pulse the inline dirham pill).
  // The shared <CoinPill /> animates on value change automatically — no
  // external trigger needed. Buy / dev-add now just mutate dirhams in the
  // store and the pill reacts.
  const [boughtToast, setBoughtToast] = useState<{ show: boolean; name: string }>({
    show: false,
    name: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Asset preloading is handled globally by AssetPreloader (mounted in the
     root SettingsProvider). By the time the user navigates to /souq the
     companion + human variants + shop icons are already in the browser's
     image cache. No duplicate fetch needed here. */

  // Initial sync — once the persisted store has hydrated, mirror the actual
  // equipped state into the preview slot so the stage opens on what's worn.
  useEffect(() => {
    if (mounted) {
      setPreviewHuman(equipped.human);
      setPreviewCompanion(equipped.companion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const humanItems = useMemo(() => itemsForTarget("human"), []);
  const companionItems = useMemo(() => itemsForTarget("companion"), []);

  if (!mounted) return null;

  const isHuman = tab === "human";
  const previewId = isHuman ? previewHuman : previewCompanion;
  const equippedId = isHuman ? equipped.human : equipped.companion;
  const items = isHuman ? humanItems : companionItems;
  const previewItem = previewId ? shopItems.find((i) => i.id === previewId) ?? null : null;

  const owned = previewItem ? ownedItems.includes(previewItem.id) : false;
  const isEquipped = previewItem ? equippedId === previewItem.id : equippedId === null;
  const affordable = previewItem ? dirhams >= previewItem.price : true;

  /* === Lightbox big-view props ===
     Resolves the (avatar, item) the user is CURRENTLY previewing on the
     stage — not what's saved/equipped. Try-before-you-buy applies to the
     3D view too: tap a different item, open the lightbox, see how it
     looks in 3D. The 3D registry lookup uses the same previewed item id. */
  const lightboxAvatarId = previewAvatarId ?? student.avatarId;
  const lightboxCompanionId = previewCompanionId ?? student.companionId;
  const lightboxAvatar = avatars.find((a) => a.id === lightboxAvatarId);
  const lightboxCompanion = enabledCompanions.find(
    (c) => c.id === lightboxCompanionId
  );
  const lightbox3DUrl = isHuman
    ? getAvatarModel3D(lightboxAvatarId, previewHuman)
    : null; // No companion 3D models registered yet — extend the registry to add them.

  const setPreview = (id: string | null) => {
    if (isHuman) setPreviewHuman(id);
    else setPreviewCompanion(id);
    sounds.tap();
    // First time the player picks an actual item, dismiss the onboarding
    // hint forever. Picking "Plain Look" (null) doesn't count — they may
    // not have grasped the interaction yet.
    if (id !== null && !souqHintDismissed) {
      dismissSouqHint();
    }
    // Tapping "Plain Look" while something is equipped = immediate take-off.
    // The tile's only purpose is to clear the slot, so do it in one step
    // instead of forcing the user to also tap a CTA labeled "Take Off".
    if (id === null && equippedId !== null) {
      unequipItem(tab);
    }
  };

  const handleBuy = () => {
    if (!previewItem) return;
    const ok = buyItem(previewItem.id, previewItem.price);
    if (ok) {
      equipItem(previewItem.target, previewItem.id);
      setBoughtToast({ show: true, name: previewItem.name });
      setTimeout(() => setBoughtToast({ show: false, name: "" }), 1600);
      sounds.complete();
    }
  };

  const handleWear = () => {
    if (!previewItem) return;
    equipItem(previewItem.target, previewItem.id);
    sounds.matchPair();
  };

  const handleTakeOff = () => {
    unequipItem(tab);
    if (isHuman) setPreviewHuman(null);
    else setPreviewCompanion(null);
    sounds.tap();
  };

  return (
    <div className="relative h-dvh bg-[var(--color-lesson-bg)] flex flex-col overflow-hidden overflow-x-hidden">
      <SaduPattern opacity={0.05} className="fixed inset-0 pointer-events-none z-[1]" />

      {/* === Sticky header === */}
      <div className="sticky top-0 z-30 bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b border-[#E5D9B8]">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
            className="w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: "0 3px 0 #C9B58A" }}
            aria-label="Back to map"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-xl text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              The Souq
            </h1>
            {/* Arabic bumped up to read at roughly the same visual size as
                the English title. text-left so it sits under the EN line
                instead of right-aligning under `dir`. */}
            <p className="text-base font-body font-bold text-[#B8862E] leading-none mt-1 text-left">
              السوق
            </p>
          </div>
          {/* Dirham balance — zero state expands into a tap-to-play CTA
              that links to the map. Otherwise: shared CoinPill with count
              animation on change (handles the purchaseFlash pulse too). */}
          {dirhams === 0 ? (
            <motion.button
              onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}
              className="flex items-center gap-1.5 bg-[#FFF7DC] border-2 border-[#D4AF37] rounded-full pl-2 pr-3 py-1 active:scale-95 transition-transform"
              style={{ boxShadow: "0 3px 0 #B8862E" }}
              transition={{ duration: 0.4 }}
              aria-label="Earn dirhams by playing"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/uae-dirham.webp" alt="" width={18} height={18} />
              <span className="font-heading font-bold text-[10px] uppercase tracking-wider text-[#1A1A2E] leading-none">
                Earn by playing
              </span>
            </motion.button>
          ) : (
            <CoinPill
              value={dirhams}
              size="lg"
              formatNumber={(n) => fmtNumber(n, arabicNumerals)}
            />
          )}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={() => addDirhams(1000)}
              className="bg-[#CE1126] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-[#1A1A2E]"
              title="Dev: add 1000 dirhams"
            >
              +1k
            </button>
          )}
        </div>
        <SaduBand className="mt-2.5 opacity-90" height={12} variant="prominent" />
      </div>

      {/* === Tabs === */}
      <div className="px-4 pt-2 shrink-0">
        <div className="max-w-2xl mx-auto">
          <TargetTabs active={tab} onChange={setTab} />
        </div>
      </div>


      {/* === Desktop two-column wrapper (>= lg). Below lg, this is a no-op
            and the children render in their existing single-column flow. ===
            Left column (40%): preview + name + char carousel (sticky)
            Right column (60%): the new ItemGrid (replaces the rail at lg+) */}
      <div className="flex-1 min-h-0 flex flex-col lg:overflow-y-auto lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start lg:max-w-[1200px] lg:mx-auto lg:w-full lg:px-6 lg:pt-3">
      {/* === Stage region — clean visual hierarchy:
            1. Character card (just the art, on cream)
            2. Name label below the card (EN + AR centered)
            3. Compact horizontal swatch row + Equip pill on its own line
            Nothing overlaps, each thing has its own vertical slot. === */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-start px-3 pt-3 pb-4 gap-2.5 lg:flex-none lg:min-h-0 lg:px-0 lg:pt-0 lg:pb-0 lg:sticky lg:top-3">
        {/* Character card — proper square hero. */}
        <div
          // Tap the stage → open the lightbox big-view. role=button + Enter
          // keyboard handler so it's accessible. cursor-pointer because the
          // tile reads as static otherwise. Opens with whichever character
          // + previewed item is currently being shown on stage.
          role="button"
          tabIndex={0}
          onClick={() => setSouqLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSouqLightboxOpen(true);
            }
          }}
          aria-label="View character in big mode"
          className="group shrink-0 lg:w-[320px] rounded-3xl bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border-2 border-[#1A1A2E] overflow-hidden relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          style={{
            /* Box scales with viewport height so it absorbs leftover
               column space on tall phones, but is capped by the space
               actually available after reserving room for the rest of
               the chrome (header + tabs + name + swatch row + item rail
               + CTA bar ≈ 480px). Floor 176px keeps it iPhone SE
               friendly; ceiling 320px keeps it sane on desktop. */
            width: "min(max(140px, calc(100dvh - 640px)), 320px)",
            aspectRatio: "1 / 1",
            boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        >
          {isHuman ? (
            <HumanStage
              avatarId={previewAvatarId ?? student.avatarId}
              previewItemId={previewHuman}
            />
          ) : (
            <CompanionStage
              previewItemId={previewCompanion}
              overrideCompanionId={previewCompanionId ?? undefined}
              fallbackCompanionId={student.companionId}
            />
          )}
          {/* "Tap for 3D" caption overlay in the top-left when the current
              preview combo has a registered 3D model. */}
          {lightbox3DUrl && <Hint3DOverlay />}
        </div>

        {/* Name label */}
        {(() => {
          const named = isHuman
            ? avatars.find((a) => a.id === (previewAvatarId ?? student.avatarId))
            : enabledCompanions.find(
                (c) => c.id === (previewCompanionId ?? student.companionId)
              );
          if (!named) return null;
          return (
            <div className="text-center">
              <p className="font-heading font-bold text-base text-[#1A1A2E] leading-none">
                {named.name}
              </p>
              <p className="font-body text-xs text-[#B8862E] mt-1 leading-none">
                {named.nameAr}
              </p>
            </div>
          );
        })()}

        {/* Swatch grid + Equip pill — stacked vertically. Grid wraps to 2
            rows so all characters are visible without scrolling. The pill
            sits below; opacity-only toggle keeps the slot's height stable.
            Desktop: same width cap as mobile so the swatches don't sprawl. */}
        <div className="flex flex-col items-center gap-2 w-full max-w-md lg:max-w-none">
          {isHuman && avatars.length > 1 && (
            <>
              <HumanSwatchRow
                stagedAvatarId={previewAvatarId ?? student.avatarId}
                actualAvatarId={student.avatarId}
                onPick={(id) => {
                  setPreviewAvatarId(id === student.avatarId ? null : id);
                  sounds.tap();
                }}
              />
              <EquipAvatarPill
                visible={
                  previewAvatarId !== null &&
                  previewAvatarId !== student.avatarId
                }
                onEquip={() => {
                  if (previewAvatarId === null) return;
                  setStudent(student.name, previewAvatarId, student.companionId);
                  setPreviewAvatarId(null);
                  sounds.complete();
                }}
              />
            </>
          )}
          {!isHuman && enabledCompanions.length > 1 && (
            <>
              <CompanionSwatchRow
                stagedCompanionId={previewCompanionId ?? student.companionId}
                actualCompanionId={student.companionId}
                onPick={(id) => {
                  setPreviewCompanionId(id === student.companionId ? null : id);
                  sounds.tap();
                }}
              />
              <MakeMinePill
                visible={
                  !!previewCompanionId &&
                  previewCompanionId !== student.companionId
                }
                onMakeMine={() => {
                  if (!previewCompanionId) return;
                  setStudent(student.name, student.avatarId, previewCompanionId);
                  setPreviewCompanionId(null);
                  sounds.complete();
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* === Item rail (mobile + tablet only) —
           Phone: horizontal scroll showing ~3 fixed-width tiles at a time
                  (arrows + scroll mirror the avatar swatch row).
           Tablet (md+): all tiles laid out flat in one row, no scroll.
           Desktop (lg+): hidden — replaced by the right-column ItemGrid below. */}
      <div className="px-3 pb-2 shrink-0 h-[156px] md:h-[186px] lg:hidden">
        <div className="max-w-2xl mx-auto h-full flex items-center justify-center">
          {/* Phone-only scrolling rail */}
          <div className="md:hidden w-full">
            <ScrollableSwatchRail stagedKey={previewId ?? "__plain__"}>
              <div
                data-staged={previewId === null ? "true" : undefined}
                style={{ width: 95 }}
                className="shrink-0"
              >
                <PlainTile
                  selected={previewId === null}
                  onClick={() => setPreview(null)}
                  isCurrentlyEquipped={equippedId === null}
                />
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  data-staged={previewId === item.id ? "true" : undefined}
                  style={{ width: 95 }}
                  className="shrink-0"
                >
                  <ItemTile
                    item={item}
                    selected={previewId === item.id}
                    owned={ownedItems.includes(item.id)}
                    equipped={equippedId === item.id}
                    affordable={dirhams >= item.price}
                    arabicNumerals={arabicNumerals}
                    onClick={() => setPreview(item.id)}
                  />
                </div>
              ))}
            </ScrollableSwatchRail>
          </div>

          {/* Desktop+ flat row */}
          <div className="hidden md:flex w-full items-center justify-center gap-2">
            <div style={{ width: 130 }} className="shrink-0">
              <PlainTile
                selected={previewId === null}
                onClick={() => setPreview(null)}
                isCurrentlyEquipped={equippedId === null}
              />
            </div>
            {items.map((item) => (
              <div key={item.id} style={{ width: 130 }} className="shrink-0">
                <ItemTile
                  item={item}
                  selected={previewId === item.id}
                  owned={ownedItems.includes(item.id)}
                  equipped={equippedId === item.id}
                  affordable={dirhams >= item.price}
                  arabicNumerals={arabicNumerals}
                  onClick={() => setPreview(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Desktop item grid (lg+ only). Reuses ItemTile + PlainTile.
            Tile widths flex to fill the column instead of fixed 130px.
            "Tap an item above to try it on" hint sits underneath here on
            desktop; the bottom-CTA-bar version becomes lg:hidden. === */}
      <div className="hidden lg:block lg:pb-6">
        <div className="grid grid-cols-3 gap-3">
          <PlainTile
            selected={previewId === null}
            onClick={() => setPreview(null)}
            isCurrentlyEquipped={equippedId === null}
          />
          {items.map((item) => (
            <ItemTile
              key={item.id}
              item={item}
              selected={previewId === item.id}
              owned={ownedItems.includes(item.id)}
              equipped={equippedId === item.id}
              affordable={dirhams >= item.price}
              arabicNumerals={arabicNumerals}
              onClick={() => setPreview(item.id)}
            />
          ))}
        </div>
        {!previewItem && !souqHintDismissed && (
          <div className="mt-4 text-center font-body text-sm text-[#1A1A2E]/55">
            Tap an item above to try it on.
          </div>
        )}
      </div>

      </div>{/* /lg:grid wrapper opened above */}

      {/* === Bottom CTA bar — fixed-height container so the button slot
            never resizes when its label/state changes. The actual button
            inside is `h-full` and renders one of several variants. === */}
      <div
        className="shrink-0 z-20 bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm border-t-2 border-[#E5D9B8] px-4 pt-2 pb-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-2xl lg:max-w-[1200px] mx-auto">
          <div className="h-[58px] flex items-center">
            {previewItem ? (
              <CtaForItem
                item={previewItem}
                owned={owned}
                isEquipped={isEquipped}
                affordable={affordable}
                dirhams={dirhams}
                arabicNumerals={arabicNumerals}
                onBuy={handleBuy}
                onWear={handleWear}
                onTakeOff={handleTakeOff}
              />
            ) : !souqHintDismissed ? (
              <div className="w-full text-center font-body text-sm text-[#1A1A2E]/55 lg:hidden">
                Tap an item above to try it on.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <BoughtToast show={boughtToast.show} name={boughtToast.name} />

      <AnimatePresence>
        {souqLightboxOpen && isHuman && lightboxAvatar && (
          <AvatarLightbox
            key="souq-lightbox-human"
            src={humanSrcFor(lightboxAvatarId, previewHuman)}
            name={lightboxAvatar.name}
            nameAr={lightboxAvatar.nameAr}
            onClose={() => setSouqLightboxOpen(false)}
            model3DUrl={lightbox3DUrl}
          />
        )}
        {souqLightboxOpen && !isHuman && lightboxCompanion && (
          <AvatarLightbox
            key="souq-lightbox-companion"
            src={companionSrcFor(lightboxCompanionId, previewCompanion)}
            name={lightboxCompanion.name}
            nameAr={lightboxCompanion.nameAr}
            onClose={() => setSouqLightboxOpen(false)}
            model3DUrl={null}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* === CTA reflects the selected item's state ========================== */
function CtaForItem({
  item,
  owned,
  isEquipped,
  affordable,
  dirhams,
  arabicNumerals,
  onBuy,
  onWear,
  onTakeOff,
}: {
  item: ShopItem;
  owned: boolean;
  isEquipped: boolean;
  affordable: boolean;
  dirhams: number;
  arabicNumerals: boolean;
  onBuy: () => void;
  onWear: () => void;
  onTakeOff: () => void;
}) {
  if (isEquipped) {
    return (
      <LessonButton variant="neutral" size="lg" fullWidth onClick={onTakeOff}>
        Take Off
      </LessonButton>
    );
  }
  if (owned) {
    return (
      <LessonButton variant="primary" size="lg" fullWidth onClick={onWear}>
        Wear It
      </LessonButton>
    );
  }
  if (affordable) {
    return (
      <LessonButton variant="primary" size="lg" fullWidth onClick={onBuy}>
        <span className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uae-dirham.webp" alt="" width={18} height={18} />
          Buy for {fmtNumber(item.price, arabicNumerals)}
        </span>
      </LessonButton>
    );
  }
  return (
    <LessonButton variant="neutral" size="lg" fullWidth disabled>
      <Lock className="w-4 h-4" />
      Need {fmtNumber(item.price - dirhams, arabicNumerals)} more
    </LessonButton>
  );
}
