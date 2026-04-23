"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Trash2, Eye, Volume2, Languages, Check, Play } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { subjects } from "@/data/subjects";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

/* === Settings modal — souq-grammar reskin ===
   - White tile cards with gold bottom shadow (matches lesson-tile)
   - KhaleejiStar accent on the heading + a Sadu band beneath
   - UAE-green toggles for "on" state (matches the rest of the app's
     "on/equipped" semantics — green dot in souq, green check on map)
   - Reset Progress kept inline; opens a destructive confirm card */

function ToggleSwitch({
  on,
  onChange,
  ariaLabel,
}: {
  on: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full border-2 transition-colors ${
        on
          ? "bg-[var(--color-duo-green)] border-[var(--color-duo-green-dark)]"
          : "bg-[#EDE3CA] border-[#C9B58A]"
      }`}
      style={{ boxShadow: on ? "0 2px 0 var(--color-duo-green-dark)" : "0 2px 0 #B0A075" }}
      aria-label={ariaLabel}
      aria-pressed={on}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white border border-[#1A1A2E]/20 flex items-center justify-center"
        animate={{ left: on ? "20px" : "2px" }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        {on && <Check className="w-3 h-3 text-[#00702A]" strokeWidth={3} />}
      </motion.div>
    </button>
  );
}

function SettingTile({
  icon,
  title,
  description,
  control,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  control: React.ReactNode;
  status?: string;
}) {
  return (
    <div
      className="relative bg-white border-2 border-[#E5D9B8] rounded-2xl px-3 py-2.5 flex items-center gap-3"
      style={{ boxShadow: "0 3px 0 #C9B58A" }}
    >
      <div
        className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] border border-[#E5D9B8] flex items-center justify-center"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-none">
            {title}
          </p>
          {status && (
            <span className="text-[9px] font-heading font-bold uppercase tracking-wider text-[#00702A] leading-none">
              {status}
            </span>
          )}
        </div>
        <p className="text-[11px] font-body text-[#1A1A2E]/55 leading-snug mt-1">
          {description}
        </p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  // Per-field selectors so the modal only re-renders when the fields it
  // actually uses change. Subscribing to the whole store (`useGameStore()`
  // with no selector) made scroll sluggish because unrelated store
  // updates triggered full re-renders of all the modal's tiles.
  const resetProgress = useGameStore((s) => s.resetProgress);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const setReducedMotion = useGameStore((s) => s.setReducedMotion);
  const arabicNumerals = useGameStore((s) => s.arabicNumerals);
  const setArabicNumerals = useGameStore((s) => s.setArabicNumerals);
  const currentSubject = useGameStore((s) => s.currentSubject);
  const setCurrentSubject = useGameStore((s) => s.setCurrentSubject);
  const setTourComplete = useGameStore((s) => s.setTourComplete);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    resetProgress();
    setConfirmReset(false);
    onClose();
    window.location.href = "/";
  };

  /* Switch subject and immediately close the modal so the user sees
     the new subject's map without having to dismiss settings first. */
  const handleSwitchSubject = (id: typeof currentSubject, _displayName: string) => {
    if (id === currentSubject) return;
    setCurrentSubject(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/55 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[var(--color-lesson-bg)] rounded-t-3xl md:rounded-3xl w-full max-w-md shadow-2xl border-2 border-[#1A1A2E] overflow-hidden flex flex-col"
            style={{
              boxShadow: "0 -4px 0 #C9B58A, 0 8px 24px rgba(0,0,0,0.25)",
              maxHeight: "92vh",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — souq grammar */}
            <div className="shrink-0 px-4 pt-3 pb-2 border-b border-[#E5D9B8]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center"
                  style={{ boxShadow: "0 3px 0 #C9B58A" }}
                >
                  <Settings className="w-5 h-5 text-[#1A1A2E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-xl text-[#1A1A2E] leading-none flex items-center gap-1.5">
                    <KhaleejiStar size={12} />
                    Settings
                  </h2>
                  <p className="text-base font-body font-bold text-[#B8862E] leading-none mt-1 text-left">
                    الإعدادات
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  style={{ boxShadow: "0 3px 0 #C9B58A" }}
                  aria-label="Close settings"
                >
                  <X className="w-4 h-4 text-[#1A1A2E]" />
                </button>
              </div>
              <SaduBand className="mt-2.5 opacity-90" height={12} variant="prominent" />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
              {/* === Subject === */}
              <SectionLabel>Subject · الموضوع</SectionLabel>
              <div className="grid grid-cols-1 gap-2">
                {subjects.map((s) => {
                  const isActive = currentSubject === s.id;
                  const disabled = !s.enabled;
                  return (
                    <button
                      key={s.id}
                      onClick={() => !disabled && handleSwitchSubject(s.id, s.name)}
                      disabled={disabled}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-2xl border-2 transition active:scale-[0.99] text-left ${
                        disabled
                          ? "border-[#E5D9B8] bg-white/40 opacity-60 cursor-not-allowed"
                          : isActive
                            ? "border-[#1A1A2E] bg-white"
                            : "border-[#E5D9B8] bg-white/70 hover:bg-white"
                      }`}
                      style={{
                        boxShadow: disabled
                          ? "0 2px 0 #C9B58A"
                          : isActive
                            ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                            : "0 2px 0 #C9B58A",
                      }}
                      aria-label={`${s.name}${disabled ? " (coming soon)" : isActive ? " (active)" : ""}`}
                      aria-pressed={isActive}
                    >
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl border-2 border-[#1A1A2E] flex items-center justify-center overflow-hidden"
                        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)" }}
                        aria-hidden="true"
                      >
                        <SubjectIcon subjectId={s.id} size={36} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-tight">
                          {s.name}
                        </p>
                        <p className="font-body text-[10px] text-[#B8862E] leading-tight" dir="rtl">
                          {s.nameAr}
                        </p>
                        <p className="font-body text-[10px] text-[#1A1A2E]/55 leading-tight mt-0.5">
                          {disabled ? "Coming soon · قريبًا" : s.tagline}
                        </p>
                      </div>
                      {isActive && !disabled && (
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
              <p className="text-[10px] font-body text-[#1A1A2E]/55 px-1 leading-snug">
                Switching subject keeps your progress in each one saved.
              </p>

              {/* === Sound & Motion === */}
              <SectionLabel className="pt-3">Sound &amp; Motion · الصوت والحركة</SectionLabel>
              <SettingTile
                icon={<Volume2 className="w-4 h-4 text-[#B8862E]" strokeWidth={2.5} />}
                title="Sound Effects"
                status={soundEnabled ? "ON" : "OFF"}
                description="Chimes, taps, and celebrations"
                control={
                  <ToggleSwitch
                    on={soundEnabled}
                    onChange={() => setSoundEnabled(!soundEnabled)}
                    ariaLabel="Toggle sound effects"
                  />
                }
              />
              <SettingTile
                icon={<Eye className="w-4 h-4 text-[#B8862E]" strokeWidth={2.5} />}
                title="Reduce Animations"
                status={reducedMotion ? "ON" : "OFF"}
                description="Stops bounces, pulses, and starfield"
                control={
                  <ToggleSwitch
                    on={reducedMotion}
                    onChange={() => setReducedMotion(!reducedMotion)}
                    ariaLabel="Toggle reduced animations"
                  />
                }
              />

              {/* === Display === */}
              <SectionLabel className="pt-2">Display · العرض</SectionLabel>
              <SettingTile
                icon={<Languages className="w-4 h-4 text-[#B8862E]" strokeWidth={2.5} />}
                title="Arabic Numerals"
                status={arabicNumerals ? "ON" : "OFF"}
                description="Show numbers as ٠١٢٣ instead of 0123"
                control={
                  <ToggleSwitch
                    on={arabicNumerals}
                    onChange={() => setArabicNumerals(!arabicNumerals)}
                    ariaLabel="Toggle Arabic numerals"
                  />
                }
              />

              {/* === Help === */}
              <SectionLabel className="pt-2">Help · المساعدة</SectionLabel>
              <div
                className="relative bg-white border-2 border-[#E5D9B8] rounded-2xl px-3 py-2.5 flex items-center gap-3"
                style={{ boxShadow: "0 3px 0 #C9B58A" }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-xl bg-[#FFF8E6] border border-[#E5D9B8] flex items-center justify-center"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
                >
                  <Play className="w-4 h-4 text-[#B8862E]" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-none">
                    Replay Tour
                  </p>
                  <p className="text-[11px] font-body text-[#1A1A2E]/55 leading-snug mt-1">
                    Show the first-visit guide again
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTourComplete(false);
                    onClose();
                  }}
                  className="shrink-0 bg-white border-2 border-[#1A1A2E] text-[#1A1A2E] px-3 py-1.5 rounded-lg font-heading font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
                  style={{ boxShadow: "0 2px 0 #C9B58A" }}
                >
                  Replay
                </button>
              </div>

              {/* === Reset Progress (always inline; confirm is a centered modal) === */}
              <SectionLabel className="pt-2">Danger Zone · منطقة الخطر</SectionLabel>
              <div
                className="relative bg-white border-2 border-[#FFD0D0] rounded-2xl px-3 py-2.5 flex items-center gap-3"
                style={{ boxShadow: "0 3px 0 #F4B0B0" }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-xl bg-[#FFE4E6] border border-[#FFD0D0] flex items-center justify-center"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
                >
                  <Trash2 className="w-4 h-4 text-[#B40D20]" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-none">
                    Reset Progress
                  </p>
                  <p className="text-[11px] font-body text-[#1A1A2E]/55 leading-snug mt-1">
                    Erase XP, badges, dirhams, and outfits
                  </p>
                </div>
                <button
                  onClick={() => setConfirmReset(true)}
                  className="shrink-0 bg-white border-2 border-[#B40D20] text-[#B40D20] px-3 py-1.5 rounded-lg font-heading font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
                  style={{ boxShadow: "0 2px 0 #8E0B19" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>

          {/* === Reset confirm — centered modal so the user never has to scroll. */}
          <AnimatePresence>
            {confirmReset && (
              <motion.div
                key="reset-confirm"
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmReset(false)}
              >
                <motion.div
                  className="bg-[#FFE4E6] border-2 border-[#B40D20] rounded-2xl p-4 max-w-sm w-full"
                  style={{ boxShadow: "0 5px 0 #8E0B19" }}
                  initial={{ scale: 0.85, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#B40D20] flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-[#B40D20]" strokeWidth={2.5} />
                    </div>
                    <p className="font-heading font-bold text-base text-[#B40D20] leading-tight">
                      Are you sure?
                    </p>
                  </div>
                  <p className="text-sm font-body text-[#1A1A2E]/80 leading-snug">
                    You&apos;ll lose all your XP, badges, dirhams, and outfits. This can&apos;t be undone.
                  </p>
                  <p className="text-xs font-body text-[#1A1A2E]/55 leading-snug mt-1.5" dir="rtl">
                    ستفقد كل النقاط والشارات والدراهم والأزياء. لا يمكن التراجع.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="flex-1 bg-white border-2 border-[#1A1A2E] text-[#1A1A2E] py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform"
                      style={{ boxShadow: "0 2px 0 #C9B58A" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-[#B40D20] text-white border-2 border-[#8E0B19] py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform"
                      style={{ boxShadow: "0 2px 0 #8E0B19" }}
                    >
                      Yes, Reset
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-heading uppercase tracking-[0.18em] text-[#B8862E] px-1 ${className}`}
    >
      {children}
    </p>
  );
}

/* Gear button — kept here so existing imports of it from GlobalSettings
   continue to work without other-file changes. */
export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 bg-white border-2 border-[#1A1A2E] rounded-full text-[#1A1A2E] hover:bg-[#FFFCEF] transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
      style={{ boxShadow: "0 3px 0 #C9B58A" }}
      aria-label="Open settings"
    >
      <Settings className="w-5 h-5" />
    </button>
  );
}
