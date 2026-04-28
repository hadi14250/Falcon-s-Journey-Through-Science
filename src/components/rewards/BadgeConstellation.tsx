"use client";

import { motion } from "framer-motion";
import { badges } from "@/data/badges";
import Badge from "@/components/ui/Badge";

interface BadgeConstellationProps {
  unlockedBadges: string[];
  onSelect: (id: string) => void;
}

/* ---- Desktop: orbital constellation
       Sun (Lvl 1) sits at center, the other 5 badges array on concentric arcs.
       Connector dotted lines link the Sun to each, evoking a Solar System map. ---- */

// Polar coords for each badge: angle in deg (0 = right, going CCW), radius from center.
// Center is the level-1 Sun, so it sits at (0,0).
const positions: Array<{ levelId: number; angle: number; radius: number }> = [
  { levelId: 1, angle: 0, radius: 0 },     // Sun (center)
  { levelId: 2, angle: 200, radius: 130 }, // Earth/Moon (lower-left)
  { levelId: 3, angle: 330, radius: 150 }, // Inner planets (upper-right)
  { levelId: 4, angle: 110, radius: 175 }, // Asteroids (upper-left)
  { levelId: 5, angle: 30, radius: 215 },  // Gas giants (right)
  { levelId: 6, angle: 250, radius: 240 }, // Hope Probe (lower)
];

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  const r3 = (n: number) => Math.round(n * 1000) / 1000;
  return { x: r3(Math.cos(a) * radius), y: r3(Math.sin(a) * radius) };
}

export default function BadgeConstellation({
  unlockedBadges,
  onSelect,
}: BadgeConstellationProps) {
  const sun = badges.find((b) => b.levelId === 1);
  const sunPos = polar(0, 0);

  return (
    <div className="relative">
      {/* ============ DESKTOP CONSTELLATION ============ */}
      <div
        className="hidden md:flex items-center justify-center relative w-full"
        style={{ height: 560 }}
        aria-label="Badge constellation"
      >
        {/* Concentric orbit rings (decorative) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="-300 -280 600 560"
        >
          {[100, 160, 220, 270].map((r, i) => (
            <circle
              key={i}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="rgba(212,175,55,0.15)"
              strokeWidth="0.6"
              strokeDasharray="3 4"
            />
          ))}

          {/* Connector lines from Sun to each badge */}
          {positions.slice(1).map((p) => {
            const { x, y } = polar(p.angle, p.radius);
            return (
              <line
                key={p.levelId}
                x1={sunPos.x}
                y1={sunPos.y}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="0.7"
                strokeDasharray="2 3"
              />
            );
          })}

          {/* Tiny floating stars */}
          {Array.from({ length: 30 }).map((_, i) => {
            const a = (i * 137.5 * Math.PI) / 180;
            const r = 50 + (i * 11) % 240;
            const r3 = (n: number) => Math.round(n * 1000) / 1000;
            const x = r3(Math.cos(a) * r);
            const y = r3(Math.sin(a) * r);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 5 === 0 ? 1.4 : 0.7}
                fill="white"
                opacity={0.3 + (i % 4) * 0.12}
              />
            );
          })}
        </svg>

        {/* Slowly rotating outer ring (visual polish) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 540, height: 540 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="-270 -270 540 540" className="w-full h-full">
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const r3 = (n: number) => Math.round(n * 1000) / 1000;
              return (
                <circle
                  key={i}
                  cx={r3(Math.cos(a) * 260)}
                  cy={r3(Math.sin(a) * 260)}
                  r="0.8"
                  fill="rgba(212,175,55,0.4)"
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Badges positioned by polar coords. Center = the parent flexbox center. */}
        {positions.map((p) => {
          const badge = badges.find((b) => b.levelId === p.levelId);
          if (!badge) return null;
          const { x, y } = polar(p.angle, p.radius);
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + p.levelId * 0.1, type: "spring", stiffness: 180 }}
            >
              <Badge
                name={badge.name}
                nameAr={badge.nameAr}
                unlocked={unlocked}
                levelId={badge.levelId}
                gradient={badge.theme.gradient}
                accent={badge.theme.accent}
                onClick={() => unlocked && onSelect(badge.id)}
              />
            </motion.div>
          );
        })}

        {/* Soft glow behind the Sun (level 1) */}
        {sun && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: 220,
              height: 220,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(252,211,77,0.25) 0%, rgba(245,158,11,0.10) 35%, transparent 65%)",
              filter: "blur(20px)",
            }}
          />
        )}
      </div>

      {/* ============ MOBILE FALLBACK GRID ============ */}
      <div className="md:hidden grid grid-cols-3 gap-4">
        {badges.map((badge, i) => {
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Badge
                name={badge.name}
                nameAr={badge.nameAr}
                unlocked={unlocked}
                levelId={badge.levelId}
                gradient={badge.theme.gradient}
                accent={badge.theme.accent}
                onClick={() => unlocked && onSelect(badge.id)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
