import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 15 },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const cardFlip: Variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    rotateY: direction < 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const pulseGlow: Variants = {
  idle: {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(212, 175, 55, 0)",
  },
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(206, 17, 38, 0.4)",
      "0 0 0 12px rgba(206, 17, 38, 0)",
      "0 0 0 0 rgba(206, 17, 38, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const confettiPiece: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0 },
  visible: (i: number) => ({
    opacity: [1, 1, 0],
    y: [0, 300 + Math.random() * 200],
    x: [0, (Math.random() - 0.5) * 400],
    scale: [0, 1, 0.5],
    rotate: [0, Math.random() * 720],
    transition: {
      duration: 2 + Math.random(),
      delay: i * 0.02,
      ease: "easeOut",
    },
  }),
};

export const duneWipe: Variants = {
  initial: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
  },
  exit: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};
