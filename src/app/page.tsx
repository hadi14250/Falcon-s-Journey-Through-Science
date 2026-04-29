"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import Companion from "@/components/mascot/Companion";
import LessonButton from "@/components/lesson/LessonButton";
import NamePrompt from "@/components/onboarding/NamePrompt";
import { useGameStore } from "@/lib/store";
import { companions } from "@/data/companions";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";

/* === Landing page ======================================================
   Same souq / lesson-complete grammar as the rest of the app:
   - Slim header card up top with the EN/AR brand title pair
   - Hero cream card holding the companion + title + Sheikh Zayed quote
   - Sticky bottom CTA bar with the green Yalla button
   No more desert parallax, no sun, no scattered stars — that scene didn't
   match the rest of the app and made the first impression feel like a
   different product. h-dvh fixed-page layout, no scroll. */
export default function LandingPage() {
  const { navigate } = useRouteTransition();
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { student } = useGameStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    if (!mounted) return;
    if (student.name.trim()) {
      navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" });
    } else {
      setShowNamePrompt(true);
    }
  };

  const studentName = mounted ? student.name : "";
  const companion = mounted
    ? companions.find((c) => c.id === student.companionId) ?? companions[0]
    : companions[0];
  const animal = companion.animal.split(" ").pop()?.toLowerCase() ?? "";

  return (
    <div className="h-dvh bg-[var(--color-lesson-bg)] flex flex-col overflow-hidden">
      {/* === Page header === */}
      <div className="shrink-0 px-4 pt-3 pb-2 border-b border-[#E5D9B8] bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <h1 className="font-heading font-bold text-base text-[#1A1A2E] leading-none flex items-center gap-1.5">
            <KhaleejiStar size={12} />
            Falcon&apos;s Journey
          </h1>
          <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-left" dir="rtl">
            رحلة الصقر عبر العلوم
          </p>
        </div>
        <SaduBand className="mt-2.5 max-w-md md:max-w-2xl mx-auto opacity-90" height={10} variant="prominent" />
      </div>

      {/* === Hero card === */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-3">
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
          {/* Soft radial glow behind the companion */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(212,175,55,0.20), transparent 60%)",
            }}
          />

          <div className="relative px-5 pt-6 pb-5 flex flex-col items-center">
            {/* Companion floating in */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ y: [0, -6, 0], scale: 1, opacity: 1 }}
              transition={{
                y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 200, damping: 16, delay: 0.15 },
                opacity: { duration: 0.3, delay: 0.15 },
              }}
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
            >
              <Companion size="md" mood="idle" hideHappyStar />
            </motion.div>

            {/* Brand title pair */}
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#1A1A2E] leading-tight">
                Falcon&apos;s Journey
              </h2>
              <p className="font-body text-base md:text-xl font-bold text-[#B8862E] mt-1.5" dir="rtl">
                رحلة الصقر عبر العلوم
              </p>
            </motion.div>

            {/* Subtitle line */}
            <motion.p
              className="mt-3 font-body text-sm md:text-base text-[#1A1A2E]/75 leading-snug text-center max-w-xs md:max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Join {companion.name} the {animal} on an adventure through our Solar System!
            </motion.p>

            {/* Sheikh Zayed quote — souq mini-card */}
            <motion.figure
              className="relative mt-4 w-full max-w-md bg-white border-2 border-[#1A1A2E] rounded-2xl px-4 py-3"
              style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-[#B8862E] leading-none flex items-center gap-1.5">
                <span
                  className="inline-flex items-stretch w-5 h-2.5 border border-[#1A1A2E]/70 overflow-hidden align-middle"
                  aria-hidden="true"
                >
                  <span className="block w-1.5 h-full bg-[#CE1126]" />
                  <span className="flex-1 flex flex-col">
                    <span className="flex-1 bg-[#009639]" />
                    <span className="flex-1 bg-white" />
                    <span className="flex-1 bg-[#1A1A2E]" />
                  </span>
                </span>
                Sheikh Zayed · الشيخ زايد
              </p>
              <p className="font-body italic text-[13px] md:text-sm text-[#1A1A2E] leading-snug mt-1.5">
                &ldquo;The first lesson we learn is to take care of our country.&rdquo;
              </p>
              <p
                className="font-body leading-snug mt-1.5 text-right"
                dir="rtl"
                style={{ fontSize: "12px", color: "#B8862E" }}
              >
                إنّ أولَ درسٍ نتعلّمه هو الاهتمامُ بوطننا
              </p>
            </motion.figure>
          </div>
        </motion.div>
      </div>

      {/* === Sticky bottom CTA bar === */}
      <div
        className="shrink-0 px-4 pt-3 w-full bg-gradient-to-t from-[var(--color-lesson-bg)] via-[var(--color-lesson-bg)] to-transparent z-20"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <motion.div
          className="max-w-md md:max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <LessonButton variant="primary" size="lg" fullWidth onClick={handleStart}>
            <span>{studentName ? "Continue Journey" : "Start Your Journey"}</span>
            <span className="opacity-80 ml-2" dir="rtl">
              {studentName ? "تابع الرحلة" : "ابدأ"}
            </span>
          </LessonButton>
        </motion.div>
      </div>

      {/* Name prompt modal — kept mounted on submit so the landing isn't
          briefly visible between unmount and route change. */}
      <AnimatePresence>
        {showNamePrompt && (
          <NamePrompt
            onComplete={() => {
              navigate("/map", { label: "Unrolling the Map", labelAr: "نفتح الخريطة" });
            }}
            onClose={() => setShowNamePrompt(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
