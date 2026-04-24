"use client";

import { motion, AnimatePresence } from "framer-motion";
import LessonButton from "./LessonButton";
import Companion from "@/components/mascot/Companion";

interface FeedbackSheetProps {
  show: boolean;
  isCorrect: boolean;
  message: string;       // headline, e.g. "Mashallah!" or "Not quite"
  detail?: string;       // optional extra explanation
  onContinue: () => void;
  ctaLabel?: string;
}

/* Slides up from the bottom on answer. Souq grammar: white inner card
   with dark `#1A1A2E` border and gold drop shadow, on a tinted bottom
   bar (cream-gold for correct, warm red for wrong). The status icon
   is a green/red medallion matching the selection-tile family used
   across the rest of the app. */
export default function FeedbackSheet({
  show,
  isCorrect,
  message,
  detail,
  onContinue,
  ctaLabel = "Continue",
}: FeedbackSheetProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          // `exit:` inside transition is a runtime feature framer-motion's
          // public types don't expose; cast through unknown to keep the
          // snappy linear exit while staying typed-clean for the build.
          transition={
            {
              type: "spring",
              stiffness: 320,
              damping: 30,
              exit: { duration: 0.18, ease: "easeIn" },
            } as unknown as import("framer-motion").Transition
          }
        >
          <div
            className={`relative px-4 pt-4 border-t-2 ${
              isCorrect
                ? "bg-[#FFF7DC] border-[#1A1A2E]"
                : "bg-[#FFE4E6] border-[#1A1A2E]"
            }`}
            style={{
              boxShadow: "0 -4px 0 #C9B58A",
              paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            <div className="max-w-md md:max-w-2xl mx-auto">
              {/* Inner white souq mini-card */}
              <div
                className="bg-white border-2 border-[#1A1A2E] rounded-2xl px-3 py-3 flex items-center gap-3"
                style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
              >
                {/* Status medallion — green check / red X, same family as
                    the selection medallion on tile pickers. */}
                <div
                  className={`shrink-0 w-12 h-12 rounded-full border-2 border-[#1A1A2E] flex items-center justify-center ${
                    isCorrect
                      ? "bg-[var(--color-duo-green)]"
                      : "bg-[#B40D20]"
                  }`}
                  style={{
                    boxShadow: isCorrect
                      ? "0 3px 0 var(--color-duo-green-dark), inset 0 1px 0 rgba(255,255,255,0.35)"
                      : "0 3px 0 #7A0917, inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                >
                  <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
                    {isCorrect ? (
                      <motion.path
                        d="M 8 17 L 14 23 L 25 11"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                      />
                    ) : (
                      <motion.g
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.line x1="10" y1="10" x2="22" y2="22" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <motion.line x1="22" y1="10" x2="10" y2="22" stroke="white" strokeWidth="4" strokeLinecap="round" />
                      </motion.g>
                    )}
                  </svg>
                </div>

                {/* Text block — EN headline + AR caption + detail */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-heading font-bold text-lg md:text-xl leading-none ${
                      isCorrect ? "text-[#00702A]" : "text-[#B40D20]"
                    }`}
                  >
                    {message}
                  </h3>
                  <p
                    className="font-body text-xs font-bold leading-none mt-1"
                    style={{ color: isCorrect ? "#00702A" : "#B40D20", opacity: 0.7 }}
                    dir="rtl"
                  >
                    {isCorrect ? "أحسنت!" : "حاول مرة أخرى"}
                  </p>
                  {detail && (
                    <p className="font-body text-[13px] text-[#1A1A2E] leading-snug mt-1.5">
                      {detail}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-3">
                <LessonButton
                  variant={isCorrect ? "primary" : "danger"}
                  size="lg"
                  fullWidth
                  onClick={onContinue}
                >
                  <span>{ctaLabel}</span>
                  <span className="opacity-80 ml-2" dir="rtl">متابعة</span>
                </LessonButton>
              </div>
            </div>

            {/* Companion peek (desktop only, on correct) */}
            {isCorrect && (
              <motion.div
                className="absolute -top-12 right-4 hidden md:block pointer-events-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Companion size="sm" mood="happy" hideHappyStar />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
