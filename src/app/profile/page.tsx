"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { useGameStore, useCurrentSubjectProgress } from "@/lib/store";
import { getLevelsForSubject } from "@/data/levels";
import { avatars } from "@/data/avatars";
import { companions, enabledCompanions } from "@/data/companions";
import { shopItems, humanSrcFor, companionSrcFor } from "@/data/shop";
import CompanionImage from "@/components/mascot/CompanionImage";
import LessonButton from "@/components/lesson/LessonButton";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import SaduPattern from "@/components/patterns/SaduPattern";
import { ArrowLeft, Check, ChevronDown, Lock } from "lucide-react";

function SavedToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#009639] text-white px-4 py-2 rounded-full shadow-lg font-heading text-sm border-2 border-[#00702A]"
          style={{ boxShadow: "0 4px 0 #00702A" }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <Check className="w-4 h-4" strokeWidth={3} />
          Saved!
          <span className="opacity-80 text-xs" dir="rtl">تم الحفظ</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* === Section card primitive — souq grammar:
   white surface, dark 2px border, gold bottom shadow.
   EN+AR title pair stacked left-aligned (no dir="rtl" — that causes
   right-aligned staggering inside the flex container).  */
function SectionCard({
  title,
  titleAr,
  children,
  delay = 0,
}: {
  title: string;
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
      {children}
    </motion.section>
  );
}

/* === Stat tile (mini-version of LessonComplete's StatTile) === */
function StatTile({
  label,
  value,
  accent,
  iconColor,
  icon,
}: {
  label: string;
  value: string | number;
  accent: string;
  iconColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="bg-white border-2 border-[#1A1A2E] rounded-2xl px-3 py-3 flex flex-col items-center gap-1"
      style={{ boxShadow: "0 3px 0 #C9B58A" }}
    >
      <span className="text-[10px] font-heading uppercase tracking-wider text-[#1A1A2E]/55">
        {label}
      </span>
      <span
        className="font-heading font-bold text-2xl flex items-center gap-1"
        style={{ color: accent }}
      >
        <span style={{ color: iconColor }}>{icon}</span>
        {value}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { navigate } = useRouteTransition();
  const { student, setStudent, equipped, ownedItems, dirhams, currentSubject } = useGameStore();
  const { totalXP, completedLevels, unlockedBadges } = useCurrentSubjectProgress();
  const [name, setName] = useState(student.name);
  const explorerSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToExplorer = useCallback(() => {
    const el = explorerSectionRef.current;
    if (!el) return;
    // Account for the sticky header at the top of the page (~110px including
    // SaduBand) so the banner lands JUST below the header, not behind it
    // and not too far down the page.
    const HEADER_OFFSET = 110;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const [selectedAvatar, setSelectedAvatar] = useState(student.avatarId);
  const [selectedCompanion, setSelectedCompanion] = useState(student.companionId);
  const [mounted, setMounted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    setName(student.name);
    setSelectedAvatar(student.avatarId);
    setSelectedCompanion(student.companionId);
  }, [student.name, student.avatarId, student.companionId]);

  const flash = useCallback(() => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
  }, []);

  const pickAvatar = (id: number) => {
    setSelectedAvatar(id);
    setStudent(name, id, selectedCompanion);
    flash();
  };

  const pickCompanion = (id: string) => {
    setSelectedCompanion(id);
    setStudent(name, selectedAvatar, id);
    flash();
  };

  const saveName = () => {
    setStudent(name, selectedAvatar, selectedCompanion);
    flash();
  };

  if (!mounted) return null;

  const levels = getLevelsForSubject(currentSubject);
  const maxXP = levels.length * 100;

  /* === Section JSX extracted as variables so we can render them in
     two different orders (mobile: single column with new section
     order; desktop lg+: two-column grid with hero left, progress/name/
     wardrobe stacked right). Keeps both layouts in sync without
     duplicating the section bodies. ============================== */

  const heroSection = (
    <motion.button
      type="button"
      onClick={scrollToExplorer}
      className="block w-full text-left bg-white rounded-3xl border-2 border-[#1A1A2E] px-4 pt-5 pb-3 mb-5 lg:mb-0 hover:scale-[1.005] active:scale-[0.99] transition-transform focus:outline-none focus-visible:outline-none"
      style={{ boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Tap to change your explorer or companion"
    >
      {/* === Name block ===
          Mobile: appears AFTER the trio (order-2)
          Desktop: appears AT THE TOP (lg:order-none, top of the column) */}
      <div className="text-center order-2 lg:order-none mt-4 lg:mt-0 lg:mb-4">
        <p className="text-[10px] font-heading uppercase tracking-[0.22em] text-[#1A1A2E]/50">
          Explorer · المستكشف
        </p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A1A2E] leading-none mt-1 truncate">
          {student.name || "Your Name"}
        </h2>
        <p className="text-xs lg:text-sm font-body text-[#1A1A2E]/60 mt-1.5">
          with{" "}
          <span className="font-heading font-bold text-[#B8862E]">
            {companions.find((c) => c.id === selectedCompanion)?.name ?? "Hurr"}
          </span>{" "}
          the{" "}
          {(companions.find((c) => c.id === selectedCompanion)?.animal ?? "Falcon").toLowerCase()}
        </p>
      </div>

      {/* === Trio — human + with-pill + companion ===
          Mobile: side-by-side (flex-row), tiles 110/130px
          Desktop: stacked vertically (lg:flex-col), tiles 220px tall
          to fill the extra column height. Trio is centered + flex-1 so
          it grows to absorb the remaining vertical space between the
          name block (top) and tap-to-change footer (bottom). */}
      <div className="flex flex-row lg:flex-col items-end lg:items-center justify-center gap-3 lg:gap-3 order-1 lg:order-none">
        <motion.div
          key={`hero-h-${selectedAvatar}-${equipped.human}`}
          className="shrink-0 w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[260px] lg:h-[260px] rounded-3xl overflow-hidden border-[3px] border-[#1A1A2E] bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] flex items-center justify-center p-2"
          style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={humanSrcFor(selectedAvatar, equipped.human)}
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </motion.div>

        <div
          className="shrink-0 mb-7 lg:mb-0 px-2 py-0.5 bg-white border-2 border-[#D4AF37] rounded-full font-heading font-bold text-[10px] uppercase tracking-[0.18em] text-[#B8862E]"
          style={{ boxShadow: "0 2px 0 #B8862E" }}
        >
          with
        </div>

        <motion.div
          key={`hero-c-${selectedCompanion}-${equipped.companion}`}
          className="shrink-0 w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[260px] lg:h-[260px] rounded-3xl overflow-hidden border-[3px] border-[#1A1A2E] bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] flex items-center justify-center p-2"
          style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={companionSrcFor(selectedCompanion, equipped.companion)}
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* === Tap-to-change footer — always at the bottom === */}
      <div className="order-3 lg:order-none mt-4 lg:mt-2 pt-3 border-t border-[#E5D9B8] w-full flex items-center justify-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-[0.22em] text-[#B8862E]">
        <ChevronDown className="w-3.5 h-3.5" />
        <span>Tap to change · اضغط للتبديل</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>
    </motion.button>
  );

  const progressSection = (
    <SectionCard title="My Progress" titleAr="تقدمي" delay={0.05}>
      <div className="grid grid-cols-3 gap-2.5">
        <StatTile
          label="XP"
          value={totalXP}
          accent="#B8862E"
          iconColor="#D4AF37"
          icon={
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" stroke="#1A1A2E" strokeWidth="0.8" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
            </svg>
          }
        />
        <StatTile
          label="Levels"
          value={`${completedLevels.length}/${levels.length}`}
          accent="#00702A"
          iconColor="#009639"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M 4 12 L 10 18 L 20 6" />
            </svg>
          }
        />
        <StatTile
          label="Badges"
          value={unlockedBadges.length}
          accent="#B40D20"
          iconColor="#E51A33"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="#1A1A2E" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          }
        />
      </div>

      {/* Mini journey progress strip — one circle per level */}
      <div className="mt-4 flex items-center gap-1.5">
        {levels.map((level, i) => {
          const isDone = completedLevels.includes(level.id);
          const isLast = i === levels.length - 1;
          return (
            <div key={level.id} className="flex items-center gap-1 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-heading font-bold border-2 ${
                  isDone
                    ? "bg-[#009639] text-white border-[#00702A]"
                    : "bg-white text-[#1A1A2E]/40 border-[#C9B58A]"
                }`}
                style={{ boxShadow: isDone ? "0 2px 0 #00702A" : "0 2px 0 #B0A075" }}
              >
                {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : level.id}
              </div>
              {!isLast && (
                <div className={`flex-1 h-1 rounded ${isDone ? "bg-[#D4AF37]" : "bg-[#C9B58A]"}`} />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs font-body text-[#1A1A2E]/55 mt-2">
        Total XP: {totalXP} / {maxXP}
      </p>
    </SectionCard>
  );

  const nameSection = (
    <SectionCard title="My Name" titleAr="اسمي" delay={0.06}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={saveName}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        placeholder="Type your name..."
        maxLength={30}
        className="w-full px-4 py-3 rounded-xl border-2 border-[#1A1A2E] bg-white font-body text-base text-[#1A1A2E] focus:border-[var(--color-duo-green-dark)] outline-none transition-colors"
        style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
      />
      <p className="text-[11px] text-[#1A1A2E]/40 mt-1.5 font-body text-center">
        Press Enter or tap away to save
      </p>
    </SectionCard>
  );

  const wardrobeSection = (
    <SectionCard title="My Wardrobe" titleAr="خزانة ملابسي" delay={0.075}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <p className="font-heading font-bold text-2xl text-[#1A1A2E] leading-none">
              {ownedItems.length}
            </p>
            <p className="font-body text-sm text-[#1A1A2E]/55 leading-none">
              / {shopItems.length} outfits
            </p>
          </div>
          <p className="text-[11px] font-body text-[#1A1A2E]/55 mt-1.5 leading-snug">
            {ownedItems.length === shopItems.length
              ? "Mashallah! You collected them all."
              : ownedItems.length === 0
                ? "Visit the Souq to dress up your explorer."
                : `${shopItems.length - ownedItems.length} more to collect.`}
          </p>
        </div>
        {/* Dirham balance pill — explicit "coins" label so the number
            isn't ambiguous. Uses dirham coin icon + count + label. */}
        <div
          className="shrink-0 flex items-center gap-1.5 bg-white border-2 border-[#1A1A2E] rounded-full px-3 py-1.5"
          style={{ boxShadow: "0 2px 0 #C9B58A" }}
          aria-label={`${dirhams} dirhams (spendable currency)`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uae-dirham.webp" alt="" width={18} height={18} />
          <span className="font-heading font-bold text-sm text-[#1A1A2E]">{dirhams}</span>
          <span className="font-body text-[11px] uppercase tracking-wider text-[#1A1A2E]/60 -ml-0.5">
            coins
          </span>
        </div>
      </div>

      <div className="relative h-3 bg-[#EDE3CA] rounded-full overflow-hidden border border-[#C9B58A]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #FFD96B 0%, #D4AF37 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(ownedItems.length / shopItems.length) * 100}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* Outfit thumbnails with three states:
            - LOCKED (unowned)         → 40% opacity + padlock overlay, not interactive
            - OWNED, NOT EQUIPPED      → full color, cursor-pointer, hover scale, taps → /souq
            - OWNED + EQUIPPED         → full color + green checkmark
          The owned/equipped check compares item.id against equipped[item.target]
          (`human` slot vs `companion` slot). */}
      <div className="flex items-center justify-between gap-1 mt-3">
        {shopItems.map((item) => {
          const owned = ownedItems.includes(item.id);
          const isEquipped = owned && equipped[item.target] === item.id;
          return owned ? (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate("/souq", { label: "Opening the Souq", labelAr: "نفتح السوق" })}
              className="relative flex-1 aspect-square rounded-lg border-2 border-[#1A1A2E] flex items-center justify-center p-1 bg-white cursor-pointer hover:scale-[1.05] transition-transform"
              style={{ boxShadow: "0 2px 0 #C9B58A" }}
              title={`${item.name}${isEquipped ? " (equipped)" : " — tap to manage in the Souq"}`}
              aria-label={`${item.name}${isEquipped ? ", equipped" : ", owned"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/shop/${item.icon}`}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
              {isEquipped && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#009639] border-2 border-white flex items-center justify-center"
                  aria-label="Equipped"
                >
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          ) : (
            <div
              key={item.id}
              className="relative flex-1 aspect-square rounded-lg border-2 border-[#C9B58A] flex items-center justify-center p-1 bg-[#EDE3CA]"
              style={{ boxShadow: "0 2px 0 #B0A075" }}
              title={`${item.name} — locked, visit the Souq to unlock`}
              aria-label={`${item.name}, locked`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/shop/${item.icon}`}
                alt=""
                className="w-full h-full object-contain opacity-40 grayscale"
                draggable={false}
              />
              {/* Padlock overlay — sits in the bottom-right corner,
                  small and subtle but unmistakably "locked". */}
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A2E] border-2 border-white flex items-center justify-center"
                aria-hidden="true"
              >
                <Lock className="w-2 h-2 text-white" strokeWidth={3} />
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/souq", { label: "Opening the Souq", labelAr: "نفتح السوق" })}
        className="mt-4 w-full bg-[var(--color-duo-green)] text-[#1A1A2E] py-2.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-duo-green-dark)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        style={{ boxShadow: "0 3px 0 var(--color-duo-green-dark)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7h18l-1 13H4L3 7z" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        </svg>
        {ownedItems.length === shopItems.length ? "Visit the Souq" : "Shop New Outfits"}
      </button>
    </SectionCard>
  );

  const changeBanner = (
    <div
      ref={explorerSectionRef}
      className="bg-white rounded-2xl border-2 border-[#1A1A2E] px-4 py-3 mb-4 text-center"
      style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
    >
      <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-none flex items-center justify-center gap-1.5">
        <KhaleejiStar size={12} />
        Change Explorer or Companion
      </p>
      <p className="font-body text-xs font-bold text-[#B8862E] leading-none mt-1.5" dir="rtl">
        بدّل المستكشف أو الرفيق
      </p>
    </div>
  );

  const explorerSection = (
    <SectionCard title="Choose Your Explorer" titleAr="اختر شخصيتك" delay={0.1}>
      {/* Mobile: flex-wrap (3-col with last-row centered).
          Desktop (lg+): strict 5-col grid so 10 avatars fit as 5×2. */}
      <div className="flex flex-wrap justify-center gap-2.5 lg:grid lg:grid-cols-5">
        {avatars.map((avatar) => {
          const isSelected = selectedAvatar === avatar.id;
          return (
            <motion.button
              key={avatar.id}
              onClick={() => pickAvatar(avatar.id)}
              className={`relative flex flex-col lg:flex-row items-center lg:justify-center gap-1.5 lg:gap-3 px-2 py-2.5 lg:px-4 lg:py-4 rounded-2xl border-2 bg-white transition-all basis-[calc(33.333%-0.5rem)] max-w-[140px] lg:basis-auto lg:max-w-none lg:w-full cursor-pointer hover:scale-[1.04] hover:border-[#1A1A2E] hover:bg-[#FFE5D9] ${
                isSelected ? "border-[#D4AF37]" : "border-[#1A1A2E]"
              }`}
              style={{
                boxShadow: isSelected
                  ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.55)"
                  : "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Select ${avatar.name}`}
              aria-pressed={isSelected}
            >
              <div className="w-16 h-16 lg:w-24 lg:h-24 shrink-0 rounded-xl overflow-hidden bg-[#FFF1DC] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    isSelected
                      ? humanSrcFor(avatar.id, equipped.human)
                      : `/humans/plain/${avatar.id}.png`
                  }
                  alt=""
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="text-center lg:min-w-0">
                <p className="text-sm lg:text-base font-heading font-bold text-[#1A1A2E] leading-tight">
                  {avatar.name}
                </p>
                <p className="text-[10px] lg:text-xs font-body text-[#B8862E] leading-tight" dir="rtl">
                  {avatar.nameAr}
                </p>
              </div>
              {isSelected && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#009639] border-2 border-white flex items-center justify-center"
                  aria-label="Selected"
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </SectionCard>
  );

  const companionSection = (
    <SectionCard title="Choose Your Companion" titleAr="اختر رفيقك" delay={0.2}>
      {/* Mobile: flex-wrap (3-col with last-row centered).
          Desktop (lg+): strict 5-col grid like Explorer, but with the
          orphan trio (last 3 of 8) centered via col-start-2 on the
          6th tile so the bottom row reads 5×1 + 3-centered. */}
      <div className="flex flex-wrap justify-center gap-2.5 lg:grid lg:grid-cols-5 lg:[&>*:nth-child(6)]:col-start-2">
        {enabledCompanions.map((c) => {
          const isSelected = selectedCompanion === c.id;
          return (
            <motion.button
              key={c.id}
              onClick={() => pickCompanion(c.id)}
              className={`relative flex flex-col lg:flex-row items-center lg:justify-center gap-1.5 lg:gap-3 px-2 py-2.5 lg:px-4 lg:py-4 rounded-2xl border-2 bg-white transition-all basis-[calc(33.333%-0.5rem)] max-w-[140px] lg:basis-auto lg:max-w-none lg:w-full cursor-pointer hover:scale-[1.04] hover:border-[#1A1A2E] hover:bg-[#FFE5D9] ${
                isSelected ? "border-[#D4AF37]" : "border-[#1A1A2E]"
              }`}
              style={{
                boxShadow: isSelected
                  ? "0 4px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.55)"
                  : "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Select ${c.name}`}
              aria-pressed={isSelected}
            >
              {/* Mascot wrapper — same orange-cream rounded box used by
                  the human picker, so companion tiles match the human
                  design exactly. Mobile 64px / desktop 96px box.
                  CompanionImage is rendered at sm/md respectively;
                  noAnimation keeps it fully still in this picker (no
                  bob, no happy bounce) — the celebration star and
                  hover bob remain elsewhere in the app. */}
              <div className="w-16 h-16 lg:hidden shrink-0 rounded-xl overflow-hidden bg-[#FFF1DC] flex items-center justify-center">
                {/* CompanionImage hard-codes 80px on size=sm, so wrap
                    in a scale-down container to fit the 64px box. */}
                <div className="scale-[0.775]">
                  <CompanionImage
                    size="sm"
                    noAnimation
                    hideHappyStar
                    overrideCompanionId={c.id}
                    overrideItemId={isSelected ? equipped.companion : null}
                  />
                </div>
              </div>
              <div className="w-24 h-24 hidden lg:flex shrink-0 rounded-xl overflow-hidden bg-[#FFF1DC] items-center justify-center">
                <CompanionImage
                  size="sm"
                  noAnimation
                  hideHappyStar
                  overrideCompanionId={c.id}
                  overrideItemId={isSelected ? equipped.companion : null}
                />
              </div>
              <div className="text-center lg:min-w-0">
                <p className="text-sm lg:text-base font-heading font-bold text-[#1A1A2E] leading-tight">
                  {c.name}
                </p>
                <p className="text-[10px] lg:text-xs font-body text-[#B8862E] leading-tight" dir="rtl">
                  {c.nameAr}
                </p>
                <p className="text-[10px] lg:text-xs font-body text-[#1A1A2E]/55 leading-tight mt-0.5">
                  {c.animal}
                </p>
              </div>
              {isSelected && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#009639] border-2 border-white flex items-center justify-center"
                  aria-label="Selected"
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      {companions.length > enabledCompanions.length && (
        <p className="text-center text-[11px] font-body text-[#1A1A2E]/45 mt-3 leading-snug">
          More companions coming soon.
        </p>
      )}
    </SectionCard>
  );

  const backButton = (
    <div className="mt-4">
      <LessonButton variant="primary" size="lg" fullWidth onClick={() => navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" })}>
        Back to Map
      </LessonButton>
    </div>
  );

  return (
    <div className="relative min-h-dvh bg-[var(--color-lesson-bg)]">
      <SavedToast show={showSaved} />

      <SaduPattern opacity={0.05} className="fixed inset-0 pointer-events-none z-[1]" />

      {/* Top bar with back button + Sadu accent */}
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
            <h1 className="font-heading font-bold text-xl text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              My Profile
            </h1>
            <p className="font-body text-base font-bold text-[#B8862E] leading-none mt-1 text-left">
              ملفي الشخصي
            </p>
          </div>
        </div>
        <SaduBand className="mt-2.5 opacity-90" height={12} variant="prominent" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 py-5">
        {/* ============================================================
            MOBILE / TABLET (<lg) — single column, matches desktop's
            top-down order so phone and laptop are consistent:
              Hero → Progress → Name → Wardrobe → Change → Explorer → Companion → Back
            ============================================================ */}
        <div className="lg:hidden">
          {heroSection}
          {progressSection}
          {nameSection}
          {wardrobeSection}
          {changeBanner}
          {explorerSection}
          {companionSection}
          {backButton}
        </div>

        {/* ============================================================
            DESKTOP (lg+) — two-column grid:
              LEFT: Hero (sticky)
              RIGHT: Progress / Name / Wardrobe stacked
              BELOW: Change banner + Explorer + Companion + Back (full-width)
            ============================================================ */}
        <div className="hidden lg:block">
          {/* Hero (left) stretches to the FULL height of the right
              column (Progress + Name + Wardrobe stacked). The hero
              button's inner content uses h-full + justify-between so
              the trio anchors at the top and the tap-to-change footer
              stays at the bottom, with the name block centered.
              Avatar tiles scale up via the [&_.hero-tile] selector
              when the parent is stretched. */}
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 items-stretch mb-5">
            {/* Hero column — stretches to match the right column's
                natural height. Inside, the hero button is h-full and
                its trio (avatar+companion) absorbs the extra vertical
                space via flex-1, so the avatars auto-grow/shrink to
                whatever fills the space. No more pixel guessing. */}
            <div className="flex">
              {heroSection}
            </div>
            <div className="[&>section:last-child]:mb-0">
              {progressSection}
              {nameSection}
              {wardrobeSection}
            </div>
          </div>
          {changeBanner}
          {explorerSection}
          {companionSection}
          {backButton}
        </div>
      </div>
    </div>
  );
}
