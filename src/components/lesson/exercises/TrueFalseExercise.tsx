"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TrueFalseExercise as Type } from "@/data/lessons";
import Sticker from "../Sticker";
import LessonButton from "../LessonButton";

interface Props {
  exercise: Type;
  onAnswer: (isCorrect: boolean, detail?: string) => void;
}

/* Souq grammar: hero card holds the statement; True/False are souq
   selection tiles with green check medallion on selection. */
export default function TrueFalseExercise({ exercise, onAnswer }: Props) {
  const [picked, setPicked] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (picked === null) return;
    const correct = picked === exercise.answer;
    onAnswer(correct, exercise.explanation);
  };

  const Tile = ({
    value,
    label,
    labelAr,
    accent,
    bg,
    icon,
  }: {
    value: boolean;
    label: string;
    labelAr: string;
    accent: string;
    bg: string;
    icon: React.ReactNode;
  }) => {
    const isSelected = picked === value;
    return (
      <motion.button
        onClick={() => setPicked(value)}
        className={`relative flex flex-col items-center justify-center gap-1 py-4 px-2 rounded-2xl border-2 transition active:scale-[0.99] ${
          isSelected
            ? "border-[#1A1A2E]"
            : "border-[#E5D9B8] hover:border-[#C9B58A]"
        }`}
        style={{
          background: bg,
          boxShadow: isSelected
            ? "0 3px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)"
            : "0 2px 0 #C9B58A",
        }}
        whileTap={{ scale: 0.97 }}
        aria-label={label}
      >
        {icon}
        <span className="font-heading font-bold text-base text-[#1A1A2E] leading-none mt-1">
          {label}
        </span>
        <span
          className="font-body text-[11px] font-bold leading-none mt-0.5"
          style={{ color: accent }}
          dir="rtl"
        >
          {labelAr}
        </span>
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
  };

  return (
    <div className="h-full flex flex-col max-w-md md:max-w-3xl mx-auto w-full min-h-0">
      {/* Hero card with the statement */}
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
        <div className="relative h-full px-4 py-4 flex flex-col items-center justify-center gap-3 overflow-hidden">
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.22em] text-[#B8862E] leading-none shrink-0">
            True or False · صح أو خطأ
          </p>

          {exercise.sticker && (
            <motion.div
              className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-2xl bg-white border-2 border-[#1A1A2E] flex items-center justify-center overflow-hidden p-1.5 shrink-0"
              style={{ boxShadow: "0 4px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
            >
              <div className="w-[88%] h-[88%]">
                <Sticker name={exercise.sticker} />
              </div>
            </motion.div>
          )}

          <div className="text-center">
            <h2 className="font-heading font-bold text-lg md:text-2xl text-[#1A1A2E] leading-snug">
              {exercise.statement}
            </h2>
            {exercise.statementAr && (
              <p
                className="font-body font-bold text-sm md:text-base text-[#B8862E] leading-snug mt-1.5"
                dir="rtl"
              >
                {exercise.statementAr}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* True / False tiles — sit directly below the hero card (which
          fills available space). Hero card growing pushes these to the
          bottom naturally, so the Check button below sits at the same
          y-coordinate as the Check button on MultipleChoice. */}
      <div className="w-full mt-3 grid grid-cols-2 gap-3 shrink-0">
        <Tile
          value={true}
          label="True"
          labelAr="صح"
          accent="#00702A"
          bg="linear-gradient(180deg, #FFFFFF 0%, #DFF5E6 100%)"
          icon={
            <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="#DFF5E6" stroke="#009639" strokeWidth="3" />
              <path
                d="M 12 20 L 18 26 L 28 14"
                fill="none"
                stroke="#009639"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Tile
          value={false}
          label="False"
          labelAr="خطأ"
          accent="#B40D20"
          bg="linear-gradient(180deg, #FFFFFF 0%, #FFE4E6 100%)"
          icon={
            <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="#FFE4E6" stroke="#B40D20" strokeWidth="3" />
              <path
                d="M 14 14 L 26 26 M 26 14 L 14 26"
                stroke="#B40D20"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>

      <div className="w-full pt-3 shrink-0">
        <LessonButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={picked === null}
          onClick={handleSubmit}
        >
          <span>Check</span>
          <span className="opacity-80 ml-2" dir="rtl">تحقق</span>
        </LessonButton>
      </div>
    </div>
  );
}
