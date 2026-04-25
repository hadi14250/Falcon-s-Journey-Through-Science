"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { MultipleChoiceExercise as Type } from "@/data/lessons";
import Sticker from "../Sticker";
import LessonButton from "../LessonButton";

interface Props {
  exercise: Type;
  onAnswer: (isCorrect: boolean, detail?: string) => void;
}

/* Souq grammar, but tightly compressed to fit a single phone viewport
   without scroll. Hero card + sticker + question + 4 options + Check
   button must all share the column — so every section uses minimal
   vertical padding. */
export default function MultipleChoiceExercise({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === exercise.correctIndex;
    onAnswer(
      correct,
      correct
        ? exercise.explanation
        : `${exercise.explanation} (Correct answer: ${exercise.options[exercise.correctIndex]})`
    );
  };

  return (
    <div className="h-full flex flex-col max-w-md md:max-w-3xl mx-auto w-full min-h-0">
      {/* Hero card — compact: smaller sticker, tighter padding */}
      <motion.div
        className="relative w-full border-2 border-[#1A1A2E] rounded-2xl overflow-hidden mt-1 shrink-0"
        style={{
          background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
          boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <div className="relative px-3 py-2.5 md:px-6 md:py-6 flex flex-col items-center">
          {exercise.sticker && (
            <div
              className="w-[72px] h-[72px] md:w-[160px] md:h-[160px] rounded-xl md:rounded-2xl bg-white border-2 border-[#1A1A2E] flex items-center justify-center overflow-hidden p-1 md:p-1.5"
              style={{ boxShadow: "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
            >
              <div className="w-[88%] h-[88%]">
                <Sticker name={exercise.sticker} />
              </div>
            </div>
          )}

          <h2 className="font-heading font-bold text-base md:text-2xl text-[#1A1A2E] leading-snug text-center mt-2 md:mt-3">
            {exercise.question}
          </h2>
          {exercise.questionAr && (
            <p
              className="font-body font-bold text-xs md:text-base text-[#B8862E] leading-snug text-center mt-1"
              dir="rtl"
            >
              {exercise.questionAr}
            </p>
          )}
        </div>
      </motion.div>

      {/* Options — flex-1 so the column shares space proportionally; each
          tile uses py-2.5 for compact rows. */}
      <div className="w-full mt-3 flex-1 min-h-0 flex flex-col gap-2 justify-center">
        {exercise.options.map((opt, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`relative w-full px-3 py-2.5 rounded-2xl border-2 text-left flex items-center gap-3 transition active:scale-[0.99] ${
                isSelected
                  ? "border-[#1A1A2E] bg-white"
                  : "border-[#E5D9B8] bg-white/70 hover:bg-white"
              }`}
              style={{
                boxShadow: isSelected
                  ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                  : "0 2px 0 #C9B58A",
              }}
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-md border-2 flex items-center justify-center font-heading font-bold text-sm transition-colors ${
                  isSelected
                    ? "border-[#1A1A2E] bg-[#FFE9A8] text-[#1A1A2E]"
                    : "border-[#C9B58A] bg-white text-[#1A1A2E]/55"
                }`}
              >
                {idx + 1}
              </span>
              <span className="flex-1 font-body text-sm md:text-base text-[#1A1A2E]">
                {opt}
              </span>
              {isSelected && (
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

      <div className="w-full pt-3 shrink-0 mt-auto">
        <LessonButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={selected === null}
          onClick={handleSubmit}
        >
          <span>Check</span>
          <span className="opacity-80 ml-2" dir="rtl">تحقق</span>
        </LessonButton>
      </div>
    </div>
  );
}
