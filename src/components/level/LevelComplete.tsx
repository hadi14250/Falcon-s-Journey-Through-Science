"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Companion from "@/components/mascot/Companion";
import Button from "@/components/ui/Button";
import ArabesqueBorder from "@/components/patterns/ArabesqueBorder";
import AvatarSvg from "@/components/ui/AvatarSvg";
import BadgeIcon from "@/components/ui/BadgeIcon";
import { useGameStore } from "@/lib/store";

interface LevelCompleteProps {
  levelId: number;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  badgeName: string;
  badgeNameAr: string;
  darkBg?: boolean;
  onRetry: () => void;
  onReviewCards?: () => void;
}

const UAE_COLORS = ["#CE1126", "#009639", "#FFFFFF", "#D4AF37", "#CE1126", "#009639"];

type ConfettiShape = "rect" | "star" | "falcon" | "dirham";

function DirhamPiece({ size }: { size: number }) {
  const s = size + 22;
  return (
    <img
      src="/uae-dirham.webp"
      alt=""
      width={s}
      height={s}
      style={{ display: "block", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))" }}
    />
  );
}

/* Stylized 8-point gold star confetti piece */
function StarPiece({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
    </svg>
  );
}

/* Tiny falcon silhouette */
function FalconPiece({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 32 14" fill={color} aria-hidden="true">
      <path d="M0,7 Q5,2 10,5 Q14,1 16,7 Q18,1 22,5 Q27,2 32,7 Q27,8 22,7 Q18,9 16,7 Q14,9 10,7 Q5,8 0,7 Z" />
    </svg>
  );
}

function ConfettiPiece({ index, color, shape }: { index: number; color: string; shape: ConfettiShape }) {
  const startX = Math.random() * 100;
  const endX = startX + (Math.random() - 0.5) * 40;
  // Dirhams fall slower so the symbol is actually readable mid-air.
  const duration = shape === "dirham" ? 4.5 + Math.random() * 1.5 : 2 + Math.random() * 1.5;
  const rotateMax = shape === "dirham" ? 360 : 720;
  const size = 8 + Math.random() * 10;

  return (
    <motion.div
      className="absolute top-0"
      style={{ left: `${startX}%` }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0vh", "100vh"],
        x: [0, (endX - startX) * 3],
        opacity: [0, 1, 1, 0],
        rotate: [0, Math.random() * rotateMax],
      }}
      transition={{
        duration,
        delay: index * 0.03,
        ease: "easeOut",
      }}
    >
      {shape === "rect" ? (
        <div
          className="rounded-sm"
          style={{
            width: size,
            height: size * 0.55,
            backgroundColor: color,
          }}
        />
      ) : shape === "star" ? (
        <StarPiece size={size + 2} color={color} />
      ) : shape === "dirham" ? (
        <DirhamPiece size={size} />
      ) : (
        <FalconPiece size={size} color={color} />
      )}
    </motion.div>
  );
}

function XPCounter({ target }: { target: number }) {
  return (
    <motion.span
      className="text-4xl font-heading font-bold text-gold"
      initial={{ scale: 0.5 }}
      animate={{ scale: [0.5, 1.3, 1] }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      +{target} XP
    </motion.span>
  );
}

export default function LevelComplete({
  levelId,
  score,
  totalQuestions,
  xpEarned,
  badgeName,
  badgeNameAr,
  darkBg = false,
  onRetry,
  onReviewCards,
}: LevelCompleteProps) {
  const router = useRouter();
  const { student, currentSubject } = useGameStore();
  const name = student.name;
  const passed = score >= 4;
  const titleColor = darkBg ? "text-white" : "text-desert-night";
  const arabicColor = darkBg ? "text-gold" : "text-gold-dark";

  return (
    <motion.div
      className="h-dvh flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Confetti for high scores — mixed shapes (rect / star / falcon) */}
      {passed && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 50 }).map((_, i) => {
            // 40% rect, 25% star, 20% dirham, 15% falcon
            const r = (i * 7919) % 20;
            const shape: ConfettiShape =
              r < 8 ? "rect" : r < 13 ? "star" : r < 17 ? "dirham" : "falcon";
            const color =
              shape === "star"
                ? "#D4AF37"
                : shape === "falcon"
                ? "#3A2A0A"
                : UAE_COLORS[i % UAE_COLORS.length];
            return (
              <ConfettiPiece
                key={i}
                index={i}
                color={color}
                shape={shape}
              />
            );
          })}
        </div>
      )}

      {/* ---- Scrollable content area (padded to leave room for sticky bar) ---- */}
      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-6 md:pt-10 relative z-10">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4 md:gap-5">
          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`text-2xl md:text-3xl font-heading font-bold ${titleColor}`}>
              {passed ? "Level Complete!" : "Keep Going!"}
            </h1>
            <p className={`text-base md:text-lg font-body mt-1 ${arabicColor}`} dir="rtl">
              {passed ? "أحسنتَ!" : "لا تستسلمْ، حاولْ مجدداً!"}
            </p>
          </motion.div>

          {/* Avatar + Companion */}
          <motion.div
            className="flex items-end gap-3 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.4 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full border-3 border-gold shadow-lg overflow-hidden bg-white shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <AvatarSvg avatarId={student.avatarId} size={56} />
            </motion.div>
            <Companion
              size="sm"
              mood={passed ? "happy" : "thinking"}
              speech={
                passed
                  ? `Mashallah${name ? `, ${name}` : ""}!`
                  : xpEarned > 0
                  ? `+${xpEarned} XP${name ? `, ${name}` : ""}! One more try!`
                  : `Don't give up${name ? `, ${name}` : ""}!`
              }
            />
          </motion.div>

          <ArabesqueBorder />

          {/* Score card */}
          <motion.div
            className="bg-white/90 rounded-2xl shadow-lg p-5 w-full text-center border border-gold/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm font-body text-desert-night/70 mb-1">Your Score</p>
            <p className="text-5xl font-heading font-bold text-desert-night">
              {score}
              <span className="text-2xl text-desert-night/40"> / {totalQuestions}</span>
            </p>

            {/* XP earned */}
            <motion.div
              className="mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <XPCounter target={xpEarned} />
              {!passed && (
                <p className="mt-2 text-xs font-body text-desert-night/60">
                  Get <span className="font-heading font-bold text-uae-red">4/5</span> to earn the badge!
                </p>
              )}
            </motion.div>

            {/* Badge unlock */}
            {passed && (
              <motion.div
                className="mt-5 flex flex-col items-center gap-2 relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              >
                {/* Light rays burst */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(212, 175, 55, 0.4)",
                      "0 0 60px 30px rgba(212, 175, 55, 0)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: 2 }}
                />
                {/* Lens flare sweep — diagonal white streak that crosses the badge */}
                <motion.div
                  className="absolute w-48 h-48 pointer-events-none overflow-hidden rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.3, duration: 1.4, ease: "easeInOut" }}
                >
                  <motion.div
                    className="absolute"
                    style={{
                      width: 220,
                      height: 30,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) rotate(-25deg)",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.0) 65%, transparent 100%)",
                      filter: "blur(2px)",
                    }}
                    initial={{ x: -160 }}
                    animate={{ x: 160 }}
                    transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
                  />
                </motion.div>
                {/* Gold sparks */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  const r = 60 + (i % 3) * 8;
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-gold"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: Math.cos(a) * r,
                        y: Math.sin(a) * r,
                        opacity: [0, 1, 0],
                        scale: [0, 1.4, 0],
                      }}
                      transition={{ delay: 1.4 + i * 0.04, duration: 0.9, ease: "easeOut" }}
                    />
                  );
                })}
                {/* Badge */}
                <motion.div
                  className="w-18 h-18 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-xl"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 12 }}
                >
                  <BadgeIcon levelId={levelId} subjectId={currentSubject} className="w-9 h-9" />
                </motion.div>
                <p className="font-heading font-bold text-desert-night text-sm">{badgeName}</p>
                <p className="text-xs font-body text-gold-dark" dir="rtl">{badgeNameAr}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ---- STICKY BOTTOM BAR — always visible ---- */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 z-50 pt-4 pb-3 px-4 ${
          darkBg
            ? "bg-gradient-to-t from-desert-night via-desert-night/95 to-desert-night/0"
            : "bg-gradient-to-t from-white via-white/95 to-white/0"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {passed ? (
            <div className="flex flex-row gap-2">
              <Button
                variant="primary"
                size="md"
                className="flex-1 text-sm"
                onClick={() => router.push("/map")}
              >
                Back to Map
                <span className="block text-[10px] opacity-80" dir="rtl">العودة</span>
              </Button>
              {levelId < 6 && (
                <Button
                  variant="gold"
                  size="md"
                  className="flex-1 text-sm"
                  onClick={() => router.push(`/level/${levelId + 1}`)}
                >
                  Next Level →
                  <span className="block text-[10px] opacity-80" dir="rtl">تابع</span>
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-row gap-2">
                {onReviewCards && (
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1 text-sm"
                    onClick={onReviewCards}
                  >
                    Review Cards
                    <span className="block text-[10px] opacity-80" dir="rtl">راجع البطاقات</span>
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 text-sm"
                  onClick={onRetry}
                >
                  Try Again
                  <span className="block text-[10px] opacity-80" dir="rtl">حاول مرة أخرى</span>
                </Button>
              </div>
              <button
                onClick={() => router.push("/map")}
                className={`text-xs font-heading underline self-center pt-0.5 ${
                  darkBg ? "text-white/70 hover:text-white" : "text-desert-night/60 hover:text-desert-night"
                }`}
              >
                Back to Map
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
