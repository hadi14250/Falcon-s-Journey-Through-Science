"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  primary:
    "bg-gradient-to-b from-red-500 via-uae-red to-red-700 text-white shadow-lg hover:shadow-xl",
  secondary:
    "bg-gradient-to-b from-sand-warm via-sand-warm to-sand-beige text-desert-night border-2 border-gold/60",
  gold:
    "bg-gradient-to-b from-gold-light via-gold to-gold-dark text-desert-night font-semibold shadow-lg hover:shadow-xl",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

/* Inset highlight + bottom shadow gives a tactile 3D-pressable feel.
   Box-shadow stack: top inner highlight, bottom inner shadow, drop shadow. */
const tactileShadow =
  "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.10), 0 6px 12px -4px rgba(0,0,0,0.25)";

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const showShimmer = variant === "gold" || variant === "primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ boxShadow: tactileShadow }}
      whileHover={
        disabled
          ? undefined
          : {
              y: -2,
              scale: 1.03,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 0 rgba(0,0,0,0.10), 0 12px 22px -6px rgba(212, 175, 55, 0.45)",
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              y: 0,
              scale: 0.97,
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.15)",
            }
      }
      className={`
        relative overflow-hidden font-heading font-semibold
        transition-colors duration-200
        focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {/* Periodic shimmer — sweeps across every ~5s on primary/gold */}
      {showShimmer && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 45%, transparent 65%)",
          }}
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
