"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TapImageExercise as Type } from "@/data/lessons";
import Sticker from "../Sticker";
import LessonButton from "../LessonButton";

interface Props {
  exercise: Type;
  onAnswer: (isCorrect: boolean, detail?: string) => void;
}

/* Souq grammar: prompt + image tiles live INSIDE a cream-gradient hero
   card that fills the available column height. Tiles use the souq
   selection-tile pattern with green check medallion on selection. */
export default function TapImageExercise({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === exercise.correctIndex;
    onAnswer(
      correct,
      correct
        ? undefined
        : `The correct answer was: ${exercise.options[exercise.correctIndex].label}`
    );
  };

  return (
    <div className="h-full flex flex-col max-w-md md:max-w-2xl mx-auto w-full min-h-0">
      {/* Hero card — prompt + image grid, fills available column height */}
      <motion.div
        className="relative w-full flex-1 min-h-0 border-2 border-[#1A1A2E] rounded-3xl overflow-hidden mt-2"
        style={{
          background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
          boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative h-full px-4 py-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
          <div className="text-center shrink-0">
            <h2 className="font-heading font-bold text-lg md:text-2xl text-[#1A1A2E] leading-snug">
              {exercise.prompt}
            </h2>
            {exercise.promptAr && (
              <p
                className="font-body font-bold text-sm md:text-base text-[#B8862E] leading-snug mt-1.5"
                dir="rtl"
              >
                {exercise.promptAr}
              </p>
            )}
          </div>

          <div
            className={`grid ${exercise.options.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2.5 md:gap-3.5 w-full shrink-0`}
          >
            {exercise.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`relative aspect-square rounded-2xl border-2 bg-white flex items-center justify-center p-3 md:p-4 transition active:scale-[0.99] ${
                    isSelected ? "border-[#1A1A2E]" : "border-[#E5D9B8] hover:border-[#C9B58A]"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
                      : "0 2px 0 #C9B58A",
                  }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={opt.label}
                >
                  <div className="w-[88%] h-[88%] flex items-center justify-center">
                    <Sticker name={opt.sticker} />
                  </div>
                  {isSelected && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--color-duo-green)] border-2 border-[#1A1A2E] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="w-full pt-3 shrink-0">
        <LessonButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={selected === null}
          onClick={handleSubmit}
        >
          <span>{selected === null ? "Pick one" : "Check"}</span>
          <span className="opacity-80 ml-2" dir="rtl">
            {selected === null ? "اختر" : "تحقق"}
          </span>
        </LessonButton>
      </div>
    </div>
  );
}
