"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/data/levels";
import Companion from "@/components/mascot/Companion";
import QuestionHero from "@/components/level/QuestionHero";
import ArabesqueBorder from "@/components/patterns/ArabesqueBorder";
import { sounds } from "@/lib/sounds";
import { useGameStore } from "@/lib/store";
import { CheckCircle2, XCircle, Zap, ChevronRight, Flame, Star, PartyPopper } from "lucide-react";

type Biome = "desert" | "oasis" | "sky" | "clouds" | "stratosphere" | "space";

interface QuizPhaseProps {
  questions: QuizQuestion[];
  darkBg?: boolean;
  biome?: Biome;
  onComplete: (score: number) => void;
}

const PASS_THRESHOLD = 4;

const CORRECT_MESSAGES = [
  "Mashallah!",
  "Amazing!",
  "You got it!",
  "Brilliant!",
  "Keep going!",
];

const WRONG_MESSAGES = [
  "Almost!",
  "Good try!",
  "Let's learn!",
  "Next time!",
];

const OPTION_LETTERS = ["A", "B", "C", "D"];

/* Two alternating warm-neutral themes — content judged on words, not color.
   Positions get distinct shape glyphs so kids associate option-with-shape. */
const OPTION_THEMES = [
  { bg: "#FFF8EC", border: "#E8C879", letterBg: "#B8862E", hoverShadow: "rgba(212,175,55,0.35)" },
  { bg: "#FDF5E6", border: "#D4B26A", letterBg: "#8C6420", hoverShadow: "rgba(140,100,32,0.30)" },
  { bg: "#FFF8EC", border: "#E8C879", letterBg: "#B8862E", hoverShadow: "rgba(212,175,55,0.35)" },
  { bg: "#FDF5E6", border: "#D4B26A", letterBg: "#8C6420", hoverShadow: "rgba(140,100,32,0.30)" },
];


/* ---- Confetti burst for correct ---- */
function ConfettiBurst() {
  const pieces = Array.from({ length: 30 });
  const colors = ["#D4AF37", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const dist = 150 + Math.random() * 100;
        const size = 6 + Math.random() * 8;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-sm"
            style={{
              width: size,
              height: size * 0.6,
              backgroundColor: colors[i % colors.length],
            }}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * dist,
              y: Math.sin((angle * Math.PI) / 180) * dist + 200,
              scale: 0,
              rotate: Math.random() * 720,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ---- Animated big checkmark in feedback ---- */
function BigCheck() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.3, 1] }}
      transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
        <motion.svg viewBox="0 0 50 50" className="w-12 h-12 text-white">
          <motion.path
            d="M12 26 L22 36 L40 16"
            fill="none" stroke="currentColor" strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.svg>
      </div>
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-emerald-400"
        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ---- Animated big X in feedback ---- */
function BigX() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/40">
        <motion.svg viewBox="0 0 50 50" className="w-10 h-10 text-white">
          <motion.path
            d="M16 16 L34 34 M34 16 L16 34"
            fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

/* ---- XP pop that floats up ---- */
function XPPop({ value }: { value: number }) {
  return (
    <motion.div
      className="absolute -top-2 right-2 font-heading font-bold text-gold text-lg pointer-events-none z-20"
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -40, scale: [0.5, 1.2, 1, 0.8] }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      +{value} XP
    </motion.div>
  );
}

export default function QuizPhase({ questions, darkBg = false, biome = "desert", onComplete }: QuizPhaseProps) {
  // Star-chart card style for space-y biomes; frosted-glass for daytime biomes.
  const isStarChart = biome === "space" || biome === "stratosphere";
  const headerText = darkBg ? "text-white/70" : "text-desert-night/60";
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showXPPop, setShowXPPop] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [shakeNonce, setShakeNonce] = useState(0);
  const { student } = useGameStore();

  const question = questions[currentQ];
  const isLastQuestion = currentQ === questions.length - 1;

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(optionIndex);
      const correct = optionIndex === question.correctIndex;
      setIsCorrect(correct);

      // rotate messages so it's not always the same
      setMsgIndex(Math.floor(Math.random() * 999));

      if (correct) {
        const newStreak = streak + 1;
        setScore((prev) => prev + 1);
        setStreak(newStreak);
        setShowXPPop(true);
        setTimeout(() => setShowXPPop(false), 1100);
        // Play sound: streak chime if 3+, otherwise normal correct
        if (newStreak >= 3) {
          sounds.streak();
        } else {
          sounds.correct();
        }
      } else {
        setStreak(0);
        setShakeNonce((n) => n + 1);
        sounds.wrong();
      }
      // Delay feedback modal so option animations play first
      setTimeout(() => setShowFeedback(true), 600);
    },
    [selectedAnswer, question.correctIndex, streak]
  );

  const handleNext = () => {
    setShowFeedback(false);
    sounds.next();
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Hero moment sound before handoff to LevelComplete
        const passed = score >= 4;
        if (passed) {
          sounds.complete();
        } else {
          sounds.fail();
        }
        onComplete(score);
      }
    }, 250);
  };

  // Pick the right message for the feedback modal
  const getCompanionMessage = (): { text: string; mood: "happy" | "thinking" } => {
    if (isLastQuestion && isCorrect) {
      return { text: student.name ? `${student.name}, you're a hero!` : "You're a hero!", mood: "happy" };
    }
    if (isCorrect && streak >= 3) {
      return { text: `${streak}x streak! On fire!`, mood: "happy" };
    }
    if (isCorrect) {
      return { text: CORRECT_MESSAGES[msgIndex % CORRECT_MESSAGES.length], mood: "happy" };
    }
    return { text: WRONG_MESSAGES[msgIndex % WRONG_MESSAGES.length], mood: "thinking" };
  };
  const msg = getCompanionMessage();

  // Warm up AudioContext on first user interaction so iOS/Safari allow playback later
  useEffect(() => {
    const unlock = () => {
      sounds.tap();
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  const xpPerQuestion = 20;

  return (
    <motion.div
      className="h-dvh flex flex-col px-4 pt-4 pb-3 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ---- HEADER ---- */}
      <motion.div
        className="w-full max-w-md mx-auto shrink-0 pt-12 md:pt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <p className={`text-xs md:text-sm font-heading ${headerText}`}>
              Question {currentQ + 1} / {questions.length}
            </p>
            <p className={`text-[10px] md:text-xs font-body ${headerText} opacity-80`}>
              Get {PASS_THRESHOLD} right to pass
              <span className="mx-1" dir="rtl">·</span>
              <span dir="rtl">{`اِجمعْ ${PASS_THRESHOLD} لِتنجحَ`}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <motion.div
                className="relative flex items-center gap-1 bg-orange-100 px-2.5 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4, times: [0, 0.6, 1], ease: "easeOut" }}
                key={streak}
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-heading font-bold text-orange-600">{streak}x</span>
                {/* Gold dust sparkle trail — visible at streak >= 3 */}
                {streak >= 3 && (
                  <span className="absolute inset-0 pointer-events-none overflow-visible">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.span
                        key={`${streak}-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-gold"
                        style={{ left: "100%", top: "50%" }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                          x: 12 + i * 4,
                          y: (i % 2 === 0 ? -1 : 1) * (4 + i),
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0],
                        }}
                        transition={{
                          duration: 1.1,
                          delay: i * 0.08,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </span>
                )}
              </motion.div>
            )}

            <div className="relative flex items-center gap-1.5 bg-gold/15 px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <motion.span
                className="text-sm font-heading font-bold text-gold-dark"
                key={score}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3, times: [0, 0.5, 1] }}
              >
                {score}/{questions.length}
              </motion.span>
              {showXPPop && <XPPop value={xpPerQuestion} />}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-sand-warm/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: streak >= 3
                ? "linear-gradient(90deg, #F59E0B, #EF4444, #F59E0B)"
                : "linear-gradient(90deg, #D4AF37, #F59E0B)",
              backgroundSize: streak >= 3 ? "200% 100%" : "100% 100%",
            }}
            animate={{
              width: `${((currentQ + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100}%`,
              backgroundPosition: streak >= 3 ? ["0% 0%", "100% 0%"] : undefined,
            }}
            transition={
              streak >= 3
                ? { width: { duration: 0.5, ease: "easeOut" }, backgroundPosition: { duration: 1, repeat: Infinity } }
                : { duration: 0.5, ease: "easeOut" }
            }
          />
        </div>
      </motion.div>

      {/* ---- MAIN CONTENT AREA (question + options fills screen) ---- */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 py-4">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -80 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Outer shake wrapper — re-keyed to retrigger shake on each wrong */}
              <motion.div
                key={`shake-${currentQ}-${shakeNonce}`}
                animate={shakeNonce > 0 ? { x: [0, -8, 8, -6, 6, -3, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
              >
              {/* Question card — biome-aware: glass for daytime, star-chart for space */}
              <motion.div
                className={`relative overflow-hidden rounded-3xl mb-3 backdrop-blur-md ${
                  isStarChart
                    ? "border border-gold/30 shadow-2xl"
                    : "border border-gold/30 shadow-xl"
                }`}
                style={{
                  background: isStarChart
                    ? "linear-gradient(160deg, rgba(15,15,35,0.92) 0%, rgba(26,26,46,0.92) 60%, rgba(15,15,35,0.92) 100%)"
                    : "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(255,248,236,0.85) 100%)",
                }}
                initial={{ rotate: -1 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* === Star-chart decorations (only in space biomes) === */}
                {isStarChart && (
                  <>
                    {/* Constellation stars scattered behind text */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 200 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      {[
                        [12, 18], [32, 28], [50, 14], [70, 24], [90, 12],
                        [110, 26], [130, 16], [150, 28], [172, 18], [188, 30],
                        [16, 78], [38, 82], [60, 70], [82, 84], [104, 72],
                        [128, 86], [148, 70], [170, 82], [186, 68],
                      ].map(([x, y], i) => (
                        <g key={i}>
                          <circle cx={x} cy={y} r={i % 4 === 0 ? 0.9 : 0.5} fill="#D4AF37" opacity={0.5 + (i % 3) * 0.15} />
                          {/* Faint connector lines for constellation feel */}
                          {i < 5 && (
                            <line
                              x1={x} y1={y}
                              x2={[32, 50, 70, 90, 110][i]}
                              y2={[28, 14, 24, 12, 26][i]}
                              stroke="#D4AF37"
                              strokeWidth="0.18"
                              opacity="0.25"
                            />
                          )}
                        </g>
                      ))}
                    </svg>

                    {/* Gold corner crosshairs (observation log feel) */}
                    {[
                      { top: 8, left: 8, rotate: 0 },
                      { top: 8, right: 8, rotate: 90 },
                      { bottom: 8, left: 8, rotate: 270 },
                      { bottom: 8, right: 8, rotate: 180 },
                    ].map((pos, i) => {
                      const { rotate, ...rest } = pos;
                      return (
                        <svg
                          key={i}
                          className="absolute w-6 h-6 text-gold/70 pointer-events-none"
                          viewBox="0 0 20 20"
                          style={{ ...rest, transform: `rotate(${rotate}deg)` }}
                          aria-hidden="true"
                        >
                          <path d="M0,0 L8,0 M0,0 L0,8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                          <circle cx="2" cy="2" r="1" fill="currentColor" />
                        </svg>
                      );
                    })}
                  </>
                )}

                {/* === Glass decorations (light biomes) === */}
                {!isStarChart && (
                  <>
                    <motion.div
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-gold/25 to-amber-200/20"
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-uae-red/15 to-red-200/15"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Gold inner border (drawn slightly inset) */}
                    <div className="absolute inset-1.5 rounded-[1.4rem] border border-gold/30 pointer-events-none" />
                  </>
                )}

                {/* Number medallion (top-left) */}
                <motion.div
                  className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 ${
                    isStarChart
                      ? "bg-gradient-to-br from-gold-light to-gold-dark text-desert-night"
                      : "bg-gradient-to-br from-uae-red to-red-700 text-white"
                  }`}
                  style={{
                    boxShadow: isStarChart
                      ? "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 10px rgba(212,175,55,0.4)"
                      : "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 10px rgba(206,17,38,0.4)",
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                >
                  <span className="font-heading font-bold text-base">{currentQ + 1}</span>
                </motion.div>

                {/* Subject illustration */}
                <div className="relative z-10 pt-5 pb-1">
                  <QuestionHero biome={biome} />
                </div>

                {/* Question text */}
                <h2
                  className={`relative z-10 px-5 md:px-6 pb-5 md:pb-6 pt-2 text-center text-base md:text-lg font-heading font-bold leading-snug ${
                    isStarChart ? "text-white" : "text-desert-night"
                  }`}
                >
                  {question.question}
                </h2>
              </motion.div>

              {/* Ornate divider between question and options */}
              <ArabesqueBorder
                className={`mb-3 ${isStarChart ? "opacity-60" : "opacity-50"}`}
              />

              {/* Answer options */}
              <div className="grid gap-2.5">
                {question.options.map((option, idx) => {
                  const theme = OPTION_THEMES[idx];
                  const isThisCorrect = selectedAnswer !== null && idx === question.correctIndex;
                  const isThisWrong = selectedAnswer === idx && !isCorrect;
                  const isFaded = selectedAnswer !== null && !isThisCorrect && !isThisWrong;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`
                        relative w-full p-3 md:p-3.5 rounded-2xl text-left font-body text-sm md:text-base
                        flex items-center gap-3 overflow-hidden border
                        ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}
                        ${isFaded ? "opacity-40" : ""}
                      `}
                      style={{
                        backgroundColor: isThisCorrect
                          ? "#A7F3D0"
                          : isThisWrong
                          ? "#FECACA"
                          : theme.bg,
                        borderColor: isThisCorrect
                          ? "#10B981"
                          : isThisWrong
                          ? "#EF4444"
                          : theme.border,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 6px rgba(140,100,32,0.10)",
                      }}
                      whileHover={
                        selectedAnswer === null
                          ? {
                              scale: 1.03,
                              x: 4,
                              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 20px ${theme.hoverShadow}`,
                            }
                          : undefined
                      }
                      whileTap={selectedAnswer === null ? { scale: 0.97 } : undefined}
                      initial={{ opacity: 0, x: -30 }}
                      animate={
                        isThisWrong
                          ? { opacity: 1, x: [0, -12, 12, -8, 8, -3, 0] }
                          : isThisCorrect
                          ? { opacity: 1, x: 0, scale: [1, 1.04, 1] }
                          : { opacity: 1, x: 0 }
                      }
                      transition={
                        isThisWrong
                          ? { duration: 0.5 }
                          : isThisCorrect
                          ? { duration: 0.5, delay: 0.1 }
                          : { delay: 0.1 + idx * 0.07 }
                      }
                      aria-label={`Option ${OPTION_LETTERS[idx]}: ${option}`}
                    >
                      {/* Coin medallion — gold-rimmed circle, flips on hover */}
                      <motion.span
                        className="relative w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-base shrink-0 text-white"
                        style={{
                          background: isThisCorrect
                            ? "radial-gradient(circle at 30% 25%, #6EE7B7 0%, #10B981 70%, #047857 100%)"
                            : isThisWrong
                            ? "radial-gradient(circle at 30% 25%, #FCA5A5 0%, #EF4444 70%, #B91C1C 100%)"
                            : "radial-gradient(circle at 30% 25%, #FFD96B 0%, #D4AF37 55%, #8B6914 100%)",
                          boxShadow: isThisCorrect || isThisWrong
                            ? "inset 0 1px 0 rgba(255,255,255,0.35), 0 3px 8px rgba(0,0,0,0.15)"
                            : "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 2px rgba(0,0,0,0.20), 0 3px 8px rgba(140,100,32,0.30)",
                        }}
                        animate={
                          isThisCorrect
                            ? { rotateY: [0, 360], scale: [1, 1.12, 1] }
                            : undefined
                        }
                        whileHover={selectedAnswer === null ? { rotateY: 360 } : undefined}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Inner gold rim (decorative ring) */}
                        <span
                          className="absolute inset-1 rounded-full border pointer-events-none"
                          style={{
                            borderColor: isThisCorrect
                              ? "rgba(255,255,255,0.4)"
                              : isThisWrong
                              ? "rgba(255,255,255,0.4)"
                              : "rgba(255,217,107,0.6)",
                          }}
                        />
                        <span
                          className="relative font-heading"
                          style={{
                            color: isThisCorrect || isThisWrong ? "#FFFFFF" : "#3A2A0A",
                            textShadow:
                              isThisCorrect || isThisWrong
                                ? "0 1px 1px rgba(0,0,0,0.25)"
                                : "0 1px 0 rgba(255,255,255,0.4)",
                          }}
                        >
                          {OPTION_LETTERS[idx]}
                        </span>
                      </motion.span>

                      <span className="flex-1 font-body leading-snug text-desert-night">{option}</span>

                      {/* Tiny icon on correct/wrong */}
                      {isThisCorrect && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                        </motion.div>
                      )}
                      {isThisWrong && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                        >
                          <XCircle className="w-6 h-6 text-red-500 fill-red-100" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---- FEEDBACK MODAL (bottom sheet) ---- */}
      <AnimatePresence>
        {showFeedback && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sheet */}
            <motion.div
              className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-5 md:p-6 shadow-2xl ${
                isCorrect
                  ? "bg-gradient-to-b from-emerald-50 to-white border-t-4 border-emerald-400"
                  : "bg-gradient-to-b from-amber-50 to-white border-t-4 border-amber-400"
              }`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            >
              {/* Confetti burst on correct */}
              {isCorrect && <ConfettiBurst />}

              <div className="max-w-md mx-auto relative">
                {/* Companion popup + Big icon */}
                <div className="flex items-end justify-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                    className="shrink-0"
                  >
                    <Companion size="sm" mood={msg.mood} speech={msg.text} />
                  </motion.div>
                  <div className="pb-2">
                    {isCorrect ? <BigCheck /> : <BigX />}
                  </div>
                </div>

                {/* Headline */}
                <motion.div
                  className="text-center mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className={`text-2xl md:text-3xl font-heading font-bold ${isCorrect ? "text-emerald-600" : "text-amber-600"}`}>
                    {isLastQuestion && isCorrect
                      ? "You're a hero!"
                      : isCorrect
                      ? streak >= 3
                        ? `${streak}x Streak!`
                        : "Mashallah!"
                      : "Not quite!"}
                  </h3>
                  <p className={`text-sm font-body mt-0.5 ${isCorrect ? "text-emerald-700/70" : "text-amber-700/70"}`} dir="rtl">
                    {isCorrect ? "أحسنتَ!" : "لا بأس، تابعْ!"}
                  </p>
                </motion.div>

                {/* Explanation */}
                <motion.div
                  className="bg-white rounded-2xl p-3.5 md:p-4 mb-4 border border-gold/20 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base font-body text-desert-night/80 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </motion.div>

                {/* Continue button — FULL WIDTH, BIG, OBVIOUS */}
                <motion.button
                  onClick={handleNext}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg text-white shadow-lg ${
                    isCorrect
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/30"
                      : "bg-gradient-to-r from-uae-red to-red-700 shadow-red-500/30"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  autoFocus
                >
                  {isLastQuestion ? (
                    <>
                      <PartyPopper className="w-5 h-5" />
                      See Results!
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
