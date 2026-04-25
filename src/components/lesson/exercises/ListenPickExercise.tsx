"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ListenPickExercise as Type } from "@/data/lessons";
import Sticker from "../Sticker";
import LessonButton from "../LessonButton";

interface Props {
  exercise: Type;
  onAnswer: (isCorrect: boolean, detail?: string) => void;
}

/* Speaker-icon SVG */
function SpeakerIcon({ animating }: { animating: boolean }) {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      {/* Sound waves — animate when playing */}
      <motion.g
        animate={animating ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
        transition={{ duration: 0.8, repeat: animating ? Infinity : 0 }}
      >
        <path d="M 42 22 Q 50 32 42 42" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 47 16 Q 60 32 47 48" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
      </motion.g>
      {/* Speaker body */}
      <path
        d="M 12 22 L 24 22 L 36 12 L 36 52 L 24 42 L 12 42 Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ListenPickExercise({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      // Fallback: just mark as played
      setHasPlayed(true);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(exercise.spoken);
    utter.lang = exercise.spokenLang ?? "en-US";
    utter.rate = 0.85;
    utter.pitch = 1.05;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
    setHasPlayed(true);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === exercise.correctIndex;
    onAnswer(
      correct,
      correct
        ? `Yes! "${exercise.spoken}"`
        : `The answer was "${exercise.options[exercise.correctIndex].label}"`
    );
  };

  return (
    <div className="h-full flex flex-col max-w-md md:max-w-2xl mx-auto w-full min-h-0">
      {/* Hero card — prompt + speaker button + image options, all inside
          one cream-gradient card that fills the column. */}
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
            {!hasPlayed && (
              <p className="font-body text-xs md:text-sm text-[#1A1A2E]/65 mt-1">
                Tap the speaker to hear the word
              </p>
            )}
          </div>

          {/* Big speaker button */}
          <motion.button
            onClick={speak}
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg cursor-pointer shrink-0"
            style={{
              background: "linear-gradient(180deg, #5AAFE6 0%, #3F8AB8 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 0 #2C6488",
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 3, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 0 #2C6488" }}
            animate={isSpeaking ? { scale: [1, 1.06, 1] } : undefined}
            transition={isSpeaking ? { duration: 0.5, repeat: Infinity } : undefined}
            aria-label="Play audio"
          >
            <SpeakerIcon animating={isSpeaking} />
            {isSpeaking && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[#5AAFE6] pointer-events-none"
                animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Image options — souq selection tiles, green check medallion */}
          <div className="grid grid-cols-3 gap-2.5 w-full shrink-0">
            {exercise.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`relative aspect-square rounded-2xl border-2 bg-white flex items-center justify-center p-3 transition active:scale-[0.99] ${
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
          <span>Check</span>
          <span className="opacity-80 ml-2" dir="rtl">تحقق</span>
        </LessonButton>
      </div>
    </div>
  );
}
