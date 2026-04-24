"use client";

import type { ReactNode } from "react";

interface LessonButtonProps {
  variant?: "primary" | "danger" | "neutral";
  size?: "md" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/* Duolingo-style 3D pressable button.
   - bottom-shadow that compresses when pressed
   - sharp uppercase heading font
   - three variants: primary (green), danger (red), neutral (white) */
export default function LessonButton({
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  fullWidth,
  className = "",
  onClick,
  children,
}: LessonButtonProps) {
  const variantClass =
    variant === "primary"
      ? "lesson-btn-primary"
      : variant === "danger"
      ? "lesson-btn-danger"
      : "lesson-btn-neutral";

  const sizeClass =
    size === "lg" ? "px-8 py-4 text-base md:text-lg" : "px-6 py-3 text-sm md:text-base";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`lesson-btn ${variantClass} ${sizeClass} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
