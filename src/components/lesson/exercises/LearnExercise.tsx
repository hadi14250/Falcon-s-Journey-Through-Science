"use client";

import { motion } from "framer-motion";
import type { LearnExercise as LearnExerciseType } from "@/data/lessons";
import Sticker from "../Sticker";
import LessonButton from "../LessonButton";

interface Props {
  exercise: LearnExerciseType;
  onContinue: () => void;
}

/* Passive teaching screen — radically simple for Grade 4:
   - One big illustration (souq cream-card frame)
   - One sentence (EN + optional AR)
   - One Continue button locked to the bottom in a sticky CTA bar so its
     position never shifts between learn cards regardless of how much
     headline copy each card has. */
export default function LearnExercise({ exercise, onContinue }: Props) {
  return (
    <div className="h-full flex flex-col max-w-md md:max-w-2xl mx-auto w-full min-h-0">
      {/* Hero card — fills the available column height (flex-1) so the
          card extends from the top of the content area down to the
          Continue button. Illustration + headline center themselves
          INSIDE the card, killing the empty cream gap that used to sit
          between the card and the button on short cards. */}
      <motion.div
        className="relative w-full flex-1 min-h-0 border-2 border-[#1A1A2E] rounded-3xl overflow-hidden mt-2"
        style={{
          background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
          boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative h-full px-4 py-5 flex flex-col items-center justify-center gap-4 overflow-hidden">
          {/* Illustration tile — fixed square so the layout never shifts */}
          <div
            className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-2xl bg-white border-2 border-[#1A1A2E] flex items-center justify-center overflow-hidden p-3 shrink-0"
            style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
          >
            <div className="w-[88%] h-[88%]">
              <Sticker name={exercise.sticker} />
            </div>
          </div>

          {/* Headline — EN + optional AR */}
          <motion.div
            className="text-center px-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading font-bold text-lg md:text-2xl text-[#1A1A2E] leading-snug">
              {exercise.headline}
            </h2>
            {exercise.headlineAr && (
              <p
                className="font-body font-bold text-sm md:text-base text-[#B8862E] leading-snug mt-1.5"
                dir="rtl"
              >
                {exercise.headlineAr}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Sticky-style CTA bar — pinned to the bottom of the column so the
          button's vertical position is the SAME on every learn card, no
          matter how big the illustration or how long the headline. */}
      <div className="w-full pt-3 shrink-0">
        <LessonButton variant="primary" size="lg" fullWidth onClick={onContinue}>
          <span>Continue</span>
          <span className="opacity-80 ml-2" dir="rtl">متابعة</span>
        </LessonButton>
      </div>
    </div>
  );
}
