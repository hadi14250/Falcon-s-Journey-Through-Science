"use client";

import { motion } from "framer-motion";

/* Drifting nebula blobs — gives space biomes depth without weighing them down. */
export default function NebulaDrift({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Purple-pink nebula */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          left: "-15%",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 25, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Cyan/blue nebula */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          right: "-10%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.06) 50%, transparent 75%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 30, -10, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Warm gold accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          left: "30%",
          bottom: "5%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 40, -10, 0],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
