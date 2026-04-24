"use client";

import { motion, AnimatePresence } from "framer-motion";
import LessonButton from "./LessonButton";
import Companion from "@/components/mascot/Companion";
import { useGameStore } from "@/lib/store";
import { companions } from "@/data/companions";

interface HeartsOutOverlayProps {
  show: boolean;
  onRetry: () => void;
  onQuit: () => void;
}

export default function HeartsOutOverlay({ show, onRetry, onQuit }: HeartsOutOverlayProps) {
  const companionId = useGameStore((s) => s.student.companionId);
  const companionName = companions.find((c) => c.id === companionId)?.name ?? "Hurr";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/55 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl text-center"
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* Sad-mode companion */}
            <div className="flex justify-center mb-3">
              <Companion size="md" mood="thinking" />
            </div>

            {/* Big broken heart */}
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 32 32"
              className="mx-auto mb-3"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              aria-hidden="true"
            >
              {/* Left half */}
              <motion.path
                d="M 16 28 C 6 22, 2 14, 5 9 C 8 4, 13 5, 16 9 L 14 14 L 18 18 L 14 22 Z"
                fill="#E51A33"
                stroke="#B40D20"
                strokeWidth="1.5"
                strokeLinejoin="round"
                animate={{ x: [-1, -3, -1] }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
              {/* Right half */}
              <motion.path
                d="M 16 9 C 19 5, 24 4, 27 9 C 30 14, 26 22, 16 28 L 18 22 L 14 18 L 18 14 Z"
                fill="#E51A33"
                stroke="#B40D20"
                strokeWidth="1.5"
                strokeLinejoin="round"
                animate={{ x: [1, 3, 1] }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </motion.svg>

            <h2 className="text-2xl font-heading font-bold text-desert-night mb-1">
              Out of hearts!
            </h2>
            <p className="text-base font-body text-desert-night/60 mb-1" dir="rtl">
              فقدتَ جميعَ قلوبِك
            </p>
            <p className="text-sm font-body text-desert-night/70 mt-3 mb-5">
              {`No worries. ${companionName} believes in you. Let's try again!`}
            </p>

            <div className="flex flex-col gap-2.5">
              <LessonButton variant="primary" size="lg" fullWidth onClick={onRetry}>
                Try Again
              </LessonButton>
              <LessonButton variant="neutral" size="md" fullWidth onClick={onQuit}>
                Back to Map
              </LessonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
