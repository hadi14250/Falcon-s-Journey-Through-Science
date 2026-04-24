"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import LessonButton from "@/components/lesson/LessonButton";
import { avatars } from "@/data/avatars";
import { enabledCompanions } from "@/data/companions";
import { useGameStore } from "@/lib/store";
import { subjects, DEFAULT_SUBJECT_ID } from "@/data/subjects";
import type { SubjectId } from "@/data/subjects";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface NamePromptProps {
  onComplete: () => void;
  onClose?: () => void;
}

type Step = "subject" | "name" | "avatar" | "companion";
const STEPS: Step[] = ["subject", "name", "avatar", "companion"];

const slideVariants = {
  enter: { x: 30, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -30, opacity: 0 },
};

/* === NamePrompt =========================================================
   Onboarding modal: name → avatar → companion. Slide-up sheet on mobile,
   centered card on desktop. Souq grammar throughout — white tile cards
   with dark border + gold drop shadow, KhaleejiStar accent on the
   header, EN/AR title pair, prominent SaduBand below, green check
   medallion on the selected option (matches Profile / Souq). */
export default function NamePrompt({ onComplete, onClose }: NamePromptProps) {
  const [step, setStep] = useState<Step>("subject");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedCompanion, setSelectedCompanion] = useState(
    enabledCompanions[0]?.id ?? "camel"
  );
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(DEFAULT_SUBJECT_ID);
  const { setStudent, setCurrentSubject } = useGameStore();

  const stepIndex = STEPS.indexOf(step);

  const handleFinish = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCurrentSubject(selectedSubject);
    setStudent(trimmed, selectedAvatar, selectedCompanion);
    onComplete();
  };

  const headerCopy: Record<Step, { en: string; ar: string }> = {
    subject: { en: "What do you want to learn?", ar: "شو تبي تتعلم؟" },
    name: { en: "What's your name?", ar: "شُسمك؟" },
    avatar: { en: "Choose Your Explorer", ar: "اختر شخصيتك" },
    companion: { en: "Choose Your Companion", ar: "اختر رفيقك" },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/55 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[var(--color-lesson-bg)] rounded-t-3xl md:rounded-3xl w-full max-w-md md:max-w-lg shadow-2xl border-2 border-[#1A1A2E] overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 -4px 0 #C9B58A, 0 8px 24px rgba(0,0,0,0.25)",
          maxHeight: "92vh",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        {/* === Header — left: back arrow (steps 2/3) · center: title pair · right: X close === */}
        <div className="shrink-0 px-3 pt-3 pb-2 border-b border-[#E5D9B8]">
          <div className="flex items-center gap-2">
            {step !== "name" ? (
              <button
                onClick={() => setStep(STEPS[stepIndex - 1])}
                aria-label="Back"
                className="shrink-0 p-1.5 rounded-xl text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <span className="shrink-0 w-8" aria-hidden="true" />
            )}

            <div className="flex-1 min-w-0 text-center">
              <h2 className="font-heading font-bold text-lg text-[#1A1A2E] leading-none flex items-center justify-center gap-1.5">
                <KhaleejiStar size={12} />
                {headerCopy[step].en}
              </h2>
              <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-center" dir="rtl">
                {headerCopy[step].ar}
              </p>
            </div>

            {onClose ? (
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 p-1.5 rounded-xl text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 transition"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <span className="shrink-0 w-8" aria-hidden="true" />
            )}
          </div>
          <SaduBand className="mt-2.5 opacity-90" height={10} variant="prominent" />

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mt-2.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? "bg-[#D4AF37] w-8"
                    : i < stepIndex
                      ? "bg-[#D4AF37]/50 w-4"
                      : "bg-[#E5D9B8] w-4"
                }`}
              />
            ))}
          </div>
        </div>

        {/* === Body — fixed canvas height so all 3 steps share one size.
            On mobile we use viewport-relative (60vh); on desktop we cap
            at a fixed 520px. Content top-aligns with consistent padding
            so the selected-preview tile doesn't drift in dead space. === */}
        <div className="flex-1 min-h-[60vh] md:min-h-[520px] px-4 pt-4 pb-3 overflow-hidden flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {/* ---- Step 0: Subject ---- */}
            {step === "subject" && (
              <motion.div
                key="subject"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center"
              >
                <p className="text-center text-[12px] font-body text-[#1A1A2E]/65 mb-3">
                  Pick the subject you want to start with. You can switch any time from Settings.
                </p>
                <div className="grid grid-cols-1 gap-2.5 w-full">
                  {subjects.map((s) => {
                    const isSelected = selectedSubject === s.id;
                    const disabled = !s.enabled;
                    return (
                      <button
                        key={s.id}
                        onClick={() => !disabled && setSelectedSubject(s.id)}
                        disabled={disabled}
                        className={`relative flex items-center gap-3 px-3 py-3 rounded-2xl border-2 transition active:scale-[0.99] text-left ${
                          disabled
                            ? "border-[#E5D9B8] bg-white/40 opacity-60 cursor-not-allowed"
                            : isSelected
                              ? "border-[#1A1A2E] bg-white"
                              : "border-[#E5D9B8] bg-white/70 hover:bg-white"
                        }`}
                        style={{
                          boxShadow: disabled
                            ? "0 2px 0 #C9B58A"
                            : isSelected
                              ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                              : "0 2px 0 #C9B58A",
                        }}
                        aria-label={`${s.name}${disabled ? " (coming soon)" : ""}`}
                        aria-pressed={isSelected}
                      >
                        <div
                          className="shrink-0 w-14 h-14 rounded-xl border-2 border-[#1A1A2E] flex items-center justify-center overflow-hidden"
                          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)" }}
                          aria-hidden="true"
                        >
                          <SubjectIcon subjectId={s.id} size={52} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-tight">
                            {s.name}
                          </p>
                          <p className="font-body text-[11px] text-[#B8862E] leading-tight" dir="rtl">
                            {s.nameAr}
                          </p>
                          <p className="font-body text-[11px] text-[#1A1A2E]/60 leading-tight mt-0.5">
                            {disabled ? "Coming soon · قريبًا" : s.tagline}
                          </p>
                        </div>
                        {isSelected && !disabled && (
                          <span
                            className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-duo-green)] border-2 border-[#1A1A2E] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ---- Step 1: Name ---- */}
            {step === "name" && (() => {
              const heroCompanion =
                enabledCompanions.find((c) => c.id === selectedCompanion) ??
                enabledCompanions[0];
              return (
                <motion.div
                  key="name"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.18 }}
                  className="flex flex-col items-center"
                >
                  {/* Companion hero — fills the cream space, gives the
                      step character, previews the companion concept early. */}
                  <motion.div
                    className="relative mb-4"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ y: [0, -6, 0], scale: 1, opacity: 1 }}
                    transition={{
                      y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 220, damping: 18 },
                      opacity: { duration: 0.3 },
                    }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/companions/plain/${heroCompanion.id}.svg`}
                      alt=""
                      className="w-24 h-24 md:w-32 md:h-32 object-contain"
                      draggable={false}
                    />
                  </motion.div>

                  {/* Speech bubble — points DOWN at the input below */}
                  <div
                    className="relative mb-3 bg-white border-2 border-[#1A1A2E] rounded-2xl px-3 py-1.5"
                    style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                  >
                    <p className="font-heading font-bold text-[13px] text-[#1A1A2E] leading-none">
                      Hi! I&apos;m {heroCompanion.name}
                      <span className="font-body text-[#B8862E] ml-1.5" dir="rtl">
                        مرحبا!
                      </span>
                    </p>
                    {/* tail pointing down */}
                    <span
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#1A1A2E] rotate-45"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Input card — souq grammar */}
                  <div
                    className="w-full bg-white border-2 border-[#1A1A2E] rounded-2xl px-4 py-4"
                    style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                  >
                    <p className="font-body text-sm text-[#1A1A2E]/70 text-center leading-snug">
                      Tell us your name so we can welcome you on every level.
                    </p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep("avatar")}
                      placeholder="Type your name…"
                      maxLength={30}
                      autoFocus
                      className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-[#E5D9B8] bg-[#FFFCEF] font-body text-lg text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:border-[#D4AF37] focus:outline-none transition-colors text-center"
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
                    />
                  </div>
                </motion.div>
              );
            })()}

            {/* ---- Step 2: Avatar ---- */}
            {step === "avatar" && (
              <motion.div
                key="avatar"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18 }}
              >
                {/* Selected preview — bigger so it reads as the hero */}
                <div className="flex justify-center mb-3">
                  <motion.div
                    key={selectedAvatar}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-[#1A1A2E] overflow-hidden bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] p-1.5"
                    style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/humans/plain/${selectedAvatar}.png`}
                      alt=""
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {avatars.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.id;
                    return (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`relative basis-[calc(20%-0.4rem)] md:basis-[calc(20%-0.6rem)] flex flex-col items-center gap-1 md:gap-1.5 p-1.5 md:p-2.5 rounded-2xl border-2 transition active:scale-95 ${
                          isSelected
                            ? "border-[#1A1A2E] bg-white"
                            : "border-[#E5D9B8] bg-white/60 hover:bg-white"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                            : "0 2px 0 #C9B58A",
                        }}
                      >
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border border-[#E5D9B8] p-0.5 md:p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/humans/plain/${avatar.id}.png`}
                            alt=""
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        </div>
                        <span className="text-[9px] md:text-[11px] font-heading font-bold text-[#1A1A2E]/70 leading-none text-center truncate w-full">
                          {avatar.name}
                        </span>
                        {isSelected && (
                          <span
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--color-duo-green)] border-2 border-[#1A1A2E] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ---- Step 3: Companion ---- */}
            {step === "companion" && (
              <motion.div
                key="companion"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18 }}
              >
                {/* Selected preview — mirrors the avatar step (bigger) */}
                <div className="flex justify-center mb-3">
                  <motion.div
                    key={selectedCompanion}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-[#1A1A2E] overflow-hidden bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] p-1.5"
                    style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/companions/plain/${selectedCompanion}.svg`}
                      alt=""
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                <p className="text-center text-[12px] font-body text-[#1A1A2E]/65 mb-2">
                  Your companion guides you through the journey.
                </p>
                <div
                  className={`grid gap-1.5 md:gap-3 ${
                    enabledCompanions.length === 1
                      ? "grid-cols-1 max-w-[180px] mx-auto"
                      : enabledCompanions.length <= 4
                        ? "grid-cols-2 md:grid-cols-4"
                        : "grid-cols-4"
                  }`}
                >
                  {enabledCompanions.map((c) => {
                    const isSelected = selectedCompanion === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCompanion(c.id)}
                        className={`relative flex flex-col items-center gap-1 md:gap-1.5 p-1.5 md:p-2.5 rounded-2xl border-2 transition active:scale-95 ${
                          isSelected
                            ? "border-[#1A1A2E] bg-white"
                            : "border-[#E5D9B8] bg-white/60 hover:bg-white"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                            : "0 2px 0 #C9B58A",
                        }}
                      >
                        {/* Fixed-size tile holding a fixed-size image so the
                            companion can never spill outside the box,
                            regardless of which animal it is. */}
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border border-[#E5D9B8] p-0.5 md:p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/companions/plain/${c.id}.svg`}
                            alt=""
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        </div>
                        <div className="text-center leading-tight w-full min-w-0">
                          <p className="text-[10px] md:text-[12px] font-heading font-bold text-[#1A1A2E] truncate">
                            {c.name}
                          </p>
                          <p className="text-[9px] md:text-[11px] font-body text-[#B8862E] truncate" dir="rtl">
                            {c.nameAr}
                          </p>
                        </div>
                        {isSelected && (
                          <span
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--color-duo-green)] border-2 border-[#1A1A2E] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === Sticky bottom CTA bar === */}
        <div
          className="shrink-0 px-4 pt-3 border-t border-[#E5D9B8] bg-[var(--color-lesson-bg)]"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          {step === "subject" && (
            <LessonButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep("name")}
            >
              <span>Next</span>
              <span className="opacity-80 ml-2" dir="rtl">التالي</span>
            </LessonButton>
          )}
          {step === "name" && (
            <LessonButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep("avatar")}
              disabled={!name.trim()}
            >
              <span>Next</span>
              <span className="opacity-80 ml-2" dir="rtl">التالي</span>
            </LessonButton>
          )}
          {step === "avatar" && (
            <LessonButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep("companion")}
            >
              <span>Next</span>
              <span className="opacity-80 ml-2" dir="rtl">التالي</span>
            </LessonButton>
          )}
          {step === "companion" && (
            <LessonButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleFinish}
            >
              <span>Yalla! Let&apos;s Go</span>
              <span className="opacity-80 ml-2" dir="rtl">يلا نطير!</span>
            </LessonButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
