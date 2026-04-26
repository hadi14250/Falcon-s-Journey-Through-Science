"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* === SpaceBackdrop ===================================================
   Parallax cinematic backdrop for the Space subject map.

   Same craft level as HeritageBackdrop: hand-composed scenery in
   layers (foreground / midground / background), varied scales, rhythm
   of busy → quiet → busy, no floating stickers, no movement other
   than the parallax wrapper.

   The journey arc, bottom → top of the 250vh canvas:
     0-25vh:    EARTH LAUNCHPAD — dark Earth-curve horizon, city
                lights along the curve, atmospheric glow fading up,
                designed launch tower silhouette (Heritage's cacti
                equivalent)
     25-60vh:   INNER SYSTEM — close large Earth+Moon on one side,
                far smaller Mars on the other, faint orbital arc
                between them, Sun shrunk in the corner
     60-110vh:  GAS GIANTS CLOSE ENCOUNTER — large dominant Saturn
                (rings with Cassini gap + ring shadow on planet),
                Jupiter cropped at the edge with one Galilean moon
                silhouetted across it
     110-180vh: OUTER DARK — quiet deep space, a few flagship stars,
                a small distant Neptune dot, a thin tapered comet
                streak drawn carefully
     180-220vh: DEEP COSMOS — hand-composed spiral galaxy as the hero,
                a structured nebula with tendrils + pillars beside it,
                distant galaxy smudges scattered around
     220-250vh: pure black space (room above)

   Connective tissue: multiple faint orbital arcs at different angles
   crossing the canvas, implying a 3D solar system from the inside.

   Reduced-motion: parallax disabled, scenery still renders.
   ================================================================= */

export default function SpaceBackdrop() {
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (v) => (reduced ? 0 : -v * 0.4));

  // Static scattered stars across the upper space band.
  const stars = Array.from({ length: 110 }).map((_, i) => {
    const seed = (i * 1664525 + 1013904223) & 0x7fffffff;
    const x = (seed % 1000) / 10;
    const y = 18 + ((seed >> 8) % 800) / 10;
    const size = 0.6 + ((seed >> 16) % 18) / 10;
    const op = 0.35 + ((seed >> 20) % 60) / 100;
    return { x, y, size, op };
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ y: parallaxY, height: "250vh" }}
      >
        {/* === Master vertical gradient.
            Bottom band is warm Earth atmosphere fading to deep space
            quickly, then night-side hues all the way up to near-black. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              #1A1A2E 0%,
              #243056 8%,
              #2D3F7A 14%,
              #3A3A78 22%,
              #2D2A5E 38%,
              #1A1A3E 55%,
              #0F0F23 75%,
              #060612 92%,
              #030308 100%)`,
          }}
        />

        {/* === STATIC FAR STAR FIELD (no animation) === */}
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.op,
            }}
          />
        ))}

        {/* ============================================================
            BOTTOM (0-25vh) — EARTH LAUNCHPAD
            Dark Earth-curve horizon at the very bottom with city lights
            twinkling along it; atmosphere band fading from cream-blue
            at the curve up to deep space. Designed launch-tower
            silhouette at one edge as the foreground anchor.
            ============================================================ */}
        <svg
          viewBox="0 0 1600 360"
          preserveAspectRatio="xMidYEnd slice"
          className="absolute left-0 right-0 w-full"
          style={{ bottom: 0, height: "25vh" }}
          aria-hidden="true"
        >
          <defs>
            {/* Atmospheric haze along the Earth's limb */}
            <linearGradient id="atm" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5C8AC8" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#7AA8E0" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#3A4A8C" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1A1A3E" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="earth-night" cx="50%" cy="120%" r="80%">
              <stop offset="0%" stopColor="#0E1F48" />
              <stop offset="60%" stopColor="#060A1F" />
              <stop offset="100%" stopColor="#020308" />
            </radialGradient>
          </defs>

          {/* Atmosphere haze across the whole horizon */}
          <rect x="0" y="0" width="1600" height="360" fill="url(#atm)" />

          {/* Earth curve — wide arc curving up gently from below the
              bottom edge, taking ~25% of the screen height. The curve
              is generous so it reads as a planet, not a hill. */}
          <path
            d="M -200 360 Q 800 220 1800 360 Z"
            fill="url(#earth-night)"
          />

          {/* City lights twinkling along the curve — tiny gold and
              warm-white pinpricks following the planet's surface */}
          <g fill="#FFD96B" opacity="0.92">
            {[
              [120, 322], [180, 312], [220, 304], [280, 295], [340, 287],
              [410, 278], [490, 270], [560, 264], [640, 259], [720, 255],
              [800, 253], [880, 255], [960, 259], [1040, 264], [1120, 270],
              [1200, 278], [1270, 287], [1340, 295], [1410, 304], [1470, 312],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1.1} />
            ))}
          </g>
          {/* A few brighter "city cluster" lights */}
          <g fill="#FFFCEF" opacity="0.85">
            <circle cx="380" cy="284" r="2.2" />
            <circle cx="720" cy="256" r="2.4" />
            <circle cx="1040" cy="262" r="2" />
            <circle cx="1340" cy="293" r="2" />
          </g>

          {/* === LAUNCH TOWER SILHOUETTE — the Heritage-cactus
              equivalent foreground anchor. Sits on the Earth curve,
              left of center. A composed launch pad with the long
              vertical tower, lattice gantry arms, and a small flame
              halo at the base. Same navy silhouette tone the cacti
              and skyline use. */}
          <g transform="translate(220 244)" fill="#0A0A1A">
            {/* Pad base trapezoid */}
            <path d="M -28 30 L 28 30 L 22 38 L -22 38 Z" />
            {/* Main tower trunk */}
            <rect x="-3" y="-78" width="6" height="108" />
            {/* Lattice support beams (diagonals) */}
            <line x1="-3" y1="-72" x2="-12" y2="-58" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="-12" y1="-58" x2="-3" y2="-44" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="-3" y1="-44" x2="-12" y2="-30" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="-12" y1="-30" x2="-3" y2="-16" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="-3" y1="-16" x2="-12" y2="-2" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="3" y1="-72" x2="12" y2="-58" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="12" y1="-58" x2="3" y2="-44" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="3" y1="-44" x2="12" y2="-30" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="12" y1="-30" x2="3" y2="-16" stroke="#0A0A1A" strokeWidth="1.2" />
            <line x1="3" y1="-16" x2="12" y2="-2" stroke="#0A0A1A" strokeWidth="1.2" />
            {/* Tower vertical sides */}
            <line x1="-12" y1="-78" x2="-12" y2="-2" stroke="#0A0A1A" strokeWidth="1.4" />
            <line x1="12" y1="-78" x2="12" y2="-2" stroke="#0A0A1A" strokeWidth="1.4" />
            {/* Gantry arms reaching out at two heights */}
            <rect x="12" y="-58" width="22" height="3" />
            <rect x="-34" y="-30" width="22" height="3" />
            <rect x="12" y="-30" width="22" height="3" />
            {/* Top spire + tiny gold beacon */}
            <line x1="0" y1="-78" x2="0" y2="-92" stroke="#0A0A1A" strokeWidth="1.6" />
            <circle cx="0" cy="-93" r="1.8" fill="#D4AF37" />
            {/* Faint warm glow at the launch base */}
            <ellipse rx="36" ry="6" cy="36" fill="#FFB660" opacity="0.35" />
            <ellipse rx="20" ry="3" cy="36" fill="#FFFCEF" opacity="0.5" />
          </g>

          {/* A second smaller satellite dish silhouette on the right,
              sitting on the Earth curve — completes the launch site */}
          <g transform="translate(1380 264)" fill="#0A0A1A">
            <rect x="-2" y="-2" width="4" height="36" />
            {/* Dish — cup pointing up-right */}
            <path d="M -16 -8 Q -16 -22 4 -24 Q 22 -22 22 -8 Q 16 -2 4 -2 Q -10 -2 -16 -8 Z" />
            <circle cx="4" cy="-13" r="2" />
            {/* Base */}
            <path d="M -6 34 L 6 34 L 4 38 L -4 38 Z" />
          </g>
        </svg>

        {/* ============================================================
            LOWER-MID (~30-55vh) — INNER SYSTEM
            Close large Earth+Moon on the LEFT (full-color, near the
            viewer — feels personal). Far smaller Mars on the RIGHT.
            Faint orbital arc connecting them (the implied Hope Probe
            journey). The Sun is shrunk to a small distant disc in the
            corner, no longer the giant horizon star.
            ============================================================ */}
        {/* === EARTH (close, large) — left side ~28vh */}
        <svg
          className="absolute"
          style={{ top: "30vh", left: "8%", width: 130, height: 130 }}
          viewBox="0 0 240 240"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="is-earth" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#9AC8F5" />
              <stop offset="55%" stopColor="#3D7DC8" />
              <stop offset="100%" stopColor="#0E1F48" />
            </radialGradient>
          </defs>
          <g transform="translate(120 120)">
            <circle r="100" fill="url(#is-earth)" />
            <path d="M -50 -25 Q -25 -46 8 -35 Q 27 -23 15 0 Q -8 18 -35 15 Q -57 0 -50 -25 Z" fill="#3D8C5A" opacity="0.92" />
            <path d="M 18 -6 Q 50 -15 65 10 Q 58 32 27 32 Q 12 20 18 -6 Z" fill="#3D8C5A" opacity="0.92" />
            <path d="M -32 42 Q -8 35 18 50 Q 13 65 -18 63 Z" fill="#3D8C5A" opacity="0.9" />
            <ellipse rx="35" ry="5" cy="-65" fill="#FFFCEF" opacity="0.45" />
            <ellipse rx="46" ry="6" cx="-10" cy="68" fill="#FFFCEF" opacity="0.4" />
            <ellipse rx="25" ry="3" cx="40" cy="-33" fill="#FFFCEF" opacity="0.35" />
            <circle r="100" fill="#020410" opacity="0.45" cx="32" cy="32" />
          </g>
        </svg>

        {/* === MOON beside Earth, upper-right of it */}
        <svg
          className="absolute"
          style={{ top: "26vh", left: "26%", width: 50, height: 50 }}
          viewBox="0 0 80 80"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="is-moon" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFCEF" />
              <stop offset="100%" stopColor="#7A7468" />
            </radialGradient>
          </defs>
          <g transform="translate(40 40)">
            <circle r="32" fill="url(#is-moon)" />
            <circle cx="-7" cy="-9" r="5" fill="#3F3A2E" opacity="0.55" />
            <circle cx="9" cy="2" r="3.5" fill="#3F3A2E" opacity="0.5" />
            <ellipse rx="8" ry="2.5" cx="-2" cy="12" fill="#3F3A2E" opacity="0.5" />
            <circle cx="12" cy="-12" r="2" fill="#3F3A2E" opacity="0.55" />
            <circle r="32" fill="#1A1810" opacity="0.4" cx="9" cy="9" />
          </g>
        </svg>

        {/* === DISTANT SUN top-right */}
        <svg
          className="absolute"
          style={{ top: "20vh", right: "6%", width: 90, height: 90 }}
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="is-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFCEF" />
              <stop offset="50%" stopColor="#FFD96B" />
              <stop offset="100%" stopColor="#E8862E" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <g transform="translate(80 80)">
            <circle r="60" fill="none" stroke="#FFD96B" strokeWidth="1.2" opacity="0.18" />
            <circle r="48" fill="none" stroke="#FFD96B" strokeWidth="2" opacity="0.25" />
            <circle r="32" fill="url(#is-sun)" />
            <circle r="11" fill="#FFFCEF" opacity="0.7" cx="-5" cy="-6" />
          </g>
        </svg>

        {/* === MERCURY — small, far left, lower */}
        <svg
          className="absolute"
          style={{ top: "47vh", left: "4%", width: 38, height: 38 }}
          viewBox="0 0 60 60"
          aria-hidden="true"
        >
          <g transform="translate(30 30)">
            <circle r="22" fill="#9A8B7A" />
            <circle r="22" fill="#5C4F42" opacity="0.4" cx="5" cy="5" />
            <circle cx="-7" cy="-5" r="3.5" fill="#5C4F42" opacity="0.65" />
            <circle cx="6" cy="-3" r="2.5" fill="#5C4F42" opacity="0.6" />
            <circle cx="-2" cy="6" r="2.5" fill="#5C4F42" opacity="0.55" />
          </g>
        </svg>

        {/* === VENUS — pale gold, mid-band, slight right of center */}
        <svg
          className="absolute"
          style={{ top: "44vh", left: "55%", width: 70, height: 70 }}
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <g transform="translate(60 60)">
            <circle r="48" fill="#E8C879" />
            <circle r="48" fill="#A87A2E" opacity="0.32" cx="8" cy="8" />
            <ellipse rx="44" ry="5" cy="-20" fill="#FFFCEF" opacity="0.4" />
            <ellipse rx="44" ry="6" cy="-6" fill="#FFE9A8" opacity="0.5" />
            <ellipse rx="44" ry="5" cy="12" fill="#FFFCEF" opacity="0.35" />
            <ellipse rx="44" ry="4" cy="26" fill="#A87A2E" opacity="0.4" />
            <circle r="48" fill="#5C3F1A" opacity="0.3" cx="12" cy="12" />
          </g>
        </svg>

        {/* === MARS — far right, lower */}
        <svg
          className="absolute"
          style={{ top: "52vh", right: "10%", width: 80, height: 80 }}
          viewBox="0 0 140 140"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="is-mars" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E8856A" />
              <stop offset="100%" stopColor="#5C2010" />
            </radialGradient>
          </defs>
          <g transform="translate(70 70)">
            <circle r="56" fill="url(#is-mars)" />
            <ellipse rx="20" ry="5" cy="-46" fill="#FFFCEF" opacity="0.85" />
            <ellipse rx="14" ry="4" cy="48" fill="#FFFCEF" opacity="0.78" />
            <circle cx="-10" cy="6" r="9" fill="#7C2E1A" opacity="0.7" />
            <circle cx="-10" cy="6" r="3" fill="#3F1A0E" opacity="0.55" />
            <ellipse rx="22" ry="4" cx="-2" cy="20" fill="#7C2E1A" opacity="0.55" />
            <circle cx="18" cy="-6" r="6" fill="#7C2E1A" opacity="0.65" />
            <circle r="56" fill="#3F1A0E" opacity="0.42" cx="14" cy="14" />
          </g>
        </svg>

        {/* === JUPITER — full planet on the LEFT side at ~75vh.
            Standalone small SVG positioned with CSS percentages so it
            sits at the same screen position on phone and laptop. */}
        <svg
          className="absolute"
          style={{ top: "72vh", left: "6%", width: 130, height: 130 }}
          viewBox="0 0 240 240"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="gg-jup" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#F5C99A" />
              <stop offset="60%" stopColor="#C88A5A" />
              <stop offset="100%" stopColor="#3A1F12" />
            </radialGradient>
            <clipPath id="jup-clip">
              <circle r="100" cx="120" cy="120" />
            </clipPath>
          </defs>
          <g transform="translate(120 120)">
            <circle r="100" fill="url(#gg-jup)" />
            <g clipPath="url(#jup-clip)" transform="translate(-120 -120)">
              <g transform="translate(120 120)">
                <ellipse rx="100" ry="6" cy="-52" fill="#A86A3A" opacity="0.6" />
                <ellipse rx="100" ry="9" cy="-32" fill="#E8B07A" opacity="0.55" />
                <ellipse rx="100" ry="6" cy="-14" fill="#A86A3A" opacity="0.55" />
                <ellipse rx="100" ry="12" cy="6" fill="#7A4A2E" opacity="0.5" />
                <ellipse rx="100" ry="8" cy="28" fill="#E8B07A" opacity="0.55" />
                <ellipse rx="100" ry="5" cy="46" fill="#A86A3A" opacity="0.5" />
                <ellipse rx="100" ry="9" cy="62" fill="#7A4A2E" opacity="0.5" />
                <ellipse rx="16" ry="8" cx="22" cy="18" fill="#C9482E" opacity="0.92" />
                <ellipse rx="11" ry="5" cx="22" cy="18" fill="#FFB660" opacity="0.45" />
              </g>
            </g>
            <circle r="100" fill="#1A0A05" opacity="0.4" cx="32" cy="32" />
          </g>
        </svg>

        {/* === SATURN — RIGHT side at ~88vh, with detailed ring system */}
        <svg
          className="absolute"
          style={{ top: "85vh", right: "5%", width: 200, height: 130 }}
          viewBox="0 0 380 240"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="gg-sat" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#F5DC9A" />
              <stop offset="60%" stopColor="#C9A052" />
              <stop offset="100%" stopColor="#5A3A1A" />
            </radialGradient>
          </defs>
          <g transform="translate(190 120)">
            <g transform="rotate(-22)">
              <ellipse rx="180" ry="34" fill="none" stroke="#E8C879" strokeWidth="4" opacity="0.85" />
              <ellipse rx="160" ry="30" fill="none" stroke="#1A1A2E" strokeWidth="1.6" opacity="0.85" />
              <ellipse rx="148" ry="28" fill="none" stroke="#FFD96B" strokeWidth="8" opacity="0.9" />
              <ellipse rx="130" ry="25" fill="none" stroke="#A8843A" strokeWidth="3.5" opacity="0.7" />
              <ellipse rx="118" ry="22" fill="none" stroke="#7A5A2E" strokeWidth="2" opacity="0.55" />
            </g>
            <circle r="80" fill="url(#gg-sat)" />
            <ellipse rx="80" ry="5" cy="-32" fill="#A88040" opacity="0.5" />
            <ellipse rx="80" ry="7" cy="-15" fill="#E8C879" opacity="0.55" />
            <ellipse rx="80" ry="6" cy="0" fill="#7A5A2E" opacity="0.5" />
            <ellipse rx="80" ry="8" cy="20" fill="#E8C879" opacity="0.55" />
            <ellipse rx="80" ry="5" cy="40" fill="#A88040" opacity="0.5" />
            <g transform="rotate(-22)" style={{ clipPath: "circle(80px at 0 0)" }}>
              <ellipse rx="84" ry="4" fill="#0A0508" opacity="0.55" cy="0" />
            </g>
            <circle r="80" fill="#2A1810" opacity="0.4" cx="20" cy="20" />
            <g transform="rotate(-22)">
              <path d="M -180 0 Q -180 0 -80 0" stroke="#E8C879" strokeWidth="4" fill="none" opacity="0.85" />
              <path d="M 80 0 Q 180 0 180 0" stroke="#E8C879" strokeWidth="4" fill="none" opacity="0.85" />
              <path d="M -148 0 Q -148 0 -80 0" stroke="#FFD96B" strokeWidth="8" fill="none" opacity="0.9" />
              <path d="M 80 0 Q 148 0 148 0" stroke="#FFD96B" strokeWidth="8" fill="none" opacity="0.9" />
            </g>
          </g>
        </svg>

        {/* === Galilean moon — small dark disc near Jupiter */}
        <svg
          className="absolute"
          style={{ top: "76vh", left: "20%", width: 22, height: 22 }}
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16 16)">
            <circle r="12" fill="#1F1208" opacity="0.95" />
            <path d="M 8 -10 Q 14 0 8 10 Q 10 0 8 -10 Z" fill="#FFD96B" opacity="0.6" />
          </g>
        </svg>

        {/* ============================================================
            ASTEROID BELT (~112vh) — small dense cluster, planet-sized
            (~150px wide), centered. Each asteroid is hand-drawn with
            its own irregular polygon shape, crater divots, and
            light/shadow. Reads as a tight rocky cluster, not a row of
            beads spanning the screen.
            ============================================================ */}
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ top: "112vh", left: "50%", transform: "translateX(-50%)", width: 150, height: 150 }}
          aria-hidden="true"
        >
          {(() => {
            // 8 asteroids packed into a small cluster within viewBox
            // 0..200. Each has its own polygon, scale, rotation,
            // position. Center of mass around (100, 100).
            const rocks = [
              { x: 60,  y: 88,  s: 1.0, r: 12,  shape: "lump" },
              { x: 92,  y: 70,  s: 0.7, r: -32, shape: "chunk" },
              { x: 122, y: 92,  s: 1.3, r: 5,   shape: "potato" },
              { x: 78,  y: 118, s: 0.8, r: 60,  shape: "lump" },
              { x: 110, y: 130, s: 1.0, r: -18, shape: "chunk" },
              { x: 142, y: 120, s: 0.85, r: 42, shape: "potato" },
              { x: 145, y: 70,  s: 0.6, r: -8,  shape: "lump" },
              { x: 50,  y: 130, s: 0.65, r: 22, shape: "chunk" },
            ];
            const SHAPES: Record<string, string> = {
              lump: "M -14 -2 L -10 -10 L -2 -13 L 7 -11 L 13 -5 L 14 4 L 9 11 L -2 13 L -11 9 Z",
              chunk: "M -12 -7 L -6 -13 L 5 -11 L 13 -3 L 14 7 L 7 14 L -5 13 L -13 5 Z",
              potato: "M -15 0 L -12 -8 L -3 -11 L 8 -8 L 14 -2 L 15 6 L 8 13 L -3 14 L -12 8 Z",
            };
            return rocks.map((rock, i) => (
              <g
                key={i}
                transform={`translate(${rock.x} ${rock.y}) scale(${rock.s}) rotate(${rock.r})`}
              >
                <path d={SHAPES[rock.shape]} fill="#7A6A55" />
                <path
                  d={SHAPES[rock.shape]}
                  fill="#C9B594"
                  opacity="0.5"
                  transform="translate(-1.5 -1.5) scale(0.7)"
                />
                <path
                  d={SHAPES[rock.shape]}
                  fill="#3A2F1F"
                  opacity="0.55"
                  transform="translate(3 3) scale(0.85)"
                />
                <circle cx="-4" cy="-1" r="1.6" fill="#3A2F1F" opacity="0.7" />
                <circle cx="3" cy="2" r="1.1" fill="#3A2F1F" opacity="0.6" />
              </g>
            ));
          })()}
        </svg>

        {/* ============================================================
            UPPER (~125-175vh) — OUTER DARK
            Mostly empty, quiet space. A small distant Neptune-blue
            dot far in the corner. A long thin tapered comet streak
            crossing the canvas (drawn carefully — head + tapered
            tail with a soft glow, not a sticker).
            ============================================================ */}
        {/* Distant Neptune dot, hand-drawn */}
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ top: "130vh", right: "10%", width: 110, height: 110 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="nep-far" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#9ABCE8" />
              <stop offset="60%" stopColor="#3D5DA8" />
              <stop offset="100%" stopColor="#0E1F48" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="42" fill="url(#nep-far)" opacity="0.92" />
          {/* Atmosphere bands */}
          <ellipse rx="42" ry="3" cx="100" cy="92" fill="#9ABCE8" opacity="0.45" />
          <ellipse rx="42" ry="4" cx="100" cy="106" fill="#1F3A7C" opacity="0.55" />
          {/* Dark spot */}
          <ellipse rx="11" ry="5" cx="94" cy="100" fill="#0E1F48" opacity="0.85" />
          {/* Limb shade */}
          <circle cx="108" cy="108" r="42" fill="#0A1230" opacity="0.4" />
        </svg>

        {/* Comet streak — long tapered light, head as a bright dot,
            tail thinning as it goes back. Slightly tilted across the
            band like it's mid-flight. */}
        <svg
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ top: "150vh", left: "10%", width: "55%", height: 100 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="comet-tail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFCEF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFE9A8" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#FFFCEF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFCEF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g transform="translate(0 100) rotate(-8)">
            {/* Outer soft tail (wide) */}
            <path
              d="M 0 0 Q 350 -2 720 0 Q 720 6 350 6 Q 0 6 0 0 Z"
              fill="url(#comet-tail)"
              opacity="0.4"
            />
            {/* Inner sharper tail (narrow) */}
            <path
              d="M 80 0 Q 400 -1 720 0 Q 720 3 400 3 Q 80 3 80 0 Z"
              fill="url(#comet-tail)"
              opacity="0.85"
            />
            {/* Comet head — bright nucleus with halo */}
            <circle cx="720" cy="0" r="11" fill="#FFFCEF" opacity="0.35" />
            <circle cx="720" cy="0" r="6" fill="#FFFCEF" />
            <circle cx="720" cy="0" r="3" fill="#FFE9A8" />
          </g>
        </svg>

        {/* ============================================================
            DEEP COSMOS (~180-220vh) — SPIRAL GALAXY + NEBULA
            The "destination" at the top of the climb. Hand-composed
            spiral galaxy as the centerpiece (bigger and more carefully
            drawn than the previous version). Beside it, a designed
            nebula with TENDRILS and PILLAR shapes (Eagle-Nebula style),
            not just a soft circle. A few faint distant galaxy smudges
            scattered around for depth.
            ============================================================ */}

        {/* Distant galaxy smudges (background depth) */}
        {[
          { top: "182vh", left: "8%", w: 70, op: 0.45, rot: -15 },
          { top: "192vh", left: "82%", w: 55, op: 0.35, rot: 28 },
          { top: "215vh", left: "12%", w: 48, op: 0.4, rot: 8 },
          { top: "224vh", right: "14%", w: 60, op: 0.32, rot: -22 },
        ].map((g, i) => (
          <div
            key={`smudge-${i}`}
            className="absolute rounded-full"
            style={{
              top: g.top,
              ...(g.left ? { left: g.left } : { right: g.right }),
              width: g.w,
              height: g.w * 0.4,
              transform: `rotate(${g.rot}deg)`,
              background:
                "radial-gradient(ellipse, rgba(232,216,255,0.85), rgba(132,90,236,0.25) 60%, transparent 100%)",
              opacity: g.op,
            }}
          />
        ))}

        {/* === STRUCTURED NEBULA — left side, with tendrils + pillars === */}
        <svg
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ top: "188vh", left: "4%", width: 360, height: 300 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="neb-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC8F0" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#9A6ECF" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#5B4B8A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="neb-warm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#E8856A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3A1F4F" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer purple glow */}
          <ellipse cx="300" cy="250" rx="280" ry="200" fill="url(#neb-glow)" />
          {/* Inner warm glow */}
          <ellipse cx="280" cy="280" rx="180" ry="140" fill="url(#neb-warm)" />
          {/* Tendrils — long curved strokes flowing through the nebula */}
          <g
            stroke="#FFC8F0"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
            opacity="0.32"
          >
            <path d="M 80 380 Q 200 300 300 280 Q 400 260 520 200" />
            <path d="M 120 420 Q 240 360 360 320 Q 460 290 540 250" />
          </g>
          {/* Pillar shapes — vertical structured columns rising from
              the bottom edge, like the Eagle Nebula's Pillars of
              Creation. Drawn as soft tapered shapes with a darker
              core for depth. */}
          <g opacity="0.7">
            {/* Pillar 1 (tallest) */}
            <path
              d="M 200 480 Q 195 380 215 280 Q 225 240 220 220 L 240 220 Q 245 250 240 290 Q 232 380 235 480 Z"
              fill="#5B3F8A"
            />
            <path
              d="M 210 480 Q 207 380 222 280 Q 230 250 225 240 L 232 240 Q 238 260 232 290 Q 225 380 228 480 Z"
              fill="#3A2A6E"
              opacity="0.7"
            />
            {/* Pillar 2 (mid) */}
            <path
              d="M 290 480 Q 285 410 295 340 Q 300 305 295 290 L 312 290 Q 318 310 312 340 Q 305 410 308 480 Z"
              fill="#5B3F8A"
            />
            {/* Pillar 3 (shortest) */}
            <path
              d="M 360 480 Q 358 430 365 380 Q 370 358 366 348 L 378 348 Q 384 360 378 380 Q 372 430 374 480 Z"
              fill="#5B3F8A"
            />
          </g>
          {/* Bright newborn stars embedded in the nebula */}
          <g fill="#FFFCEF">
            <circle cx="220" cy="220" r="2" opacity="0.95" />
            <circle cx="295" cy="295" r="1.6" opacity="0.85" />
            <circle cx="370" cy="350" r="1.4" opacity="0.85" />
            <circle cx="450" cy="240" r="2" opacity="0.95" />
            <circle cx="160" cy="320" r="1.6" opacity="0.8" />
            <circle cx="380" cy="260" r="1.6" opacity="0.85" />
          </g>
          {/* Soft star halos on the brightest two */}
          <circle cx="220" cy="220" r="6" fill="#FFFCEF" opacity="0.25" />
          <circle cx="450" cy="240" r="6" fill="#FFFCEF" opacity="0.25" />
        </svg>

        {/* === SPIRAL GALAXY — centerpiece on the right, the climb's
            destination point. Bigger than before, with two full spiral
            arms drawn as sweeping bezier strokes, a bright bulge,
            and embedded star clusters along the arms. */}
        <svg
          viewBox="0 0 700 500"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ top: "192vh", right: "2%", width: 480, height: 340 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="gx2-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFCEF" stopOpacity="1" />
              <stop offset="22%" stopColor="#FFE9A8" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#C99AE8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5B4B8A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gx2-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8D8FF" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#9A6ECF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#5B4B8A" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g transform="rotate(-22 350 250)">
            {/* Outer halo */}
            <ellipse cx="350" cy="250" rx="340" ry="98" fill="url(#gx2-halo)" />

            {/* Spiral arm 1 — top-right curling counterclockwise */}
            <path
              d="M 640 200 Q 510 150 390 220 Q 310 260 270 310 Q 235 350 215 365"
              fill="none"
              stroke="#E8D8FF"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.32"
            />
            <path
              d="M 640 200 Q 510 150 390 220 Q 310 260 270 310 Q 235 350 215 365"
              fill="none"
              stroke="#FFFCEF"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.55"
            />

            {/* Spiral arm 2 — bottom-left curling clockwise */}
            <path
              d="M 60 290 Q 190 350 320 280 Q 400 240 440 190 Q 475 150 495 135"
              fill="none"
              stroke="#E8D8FF"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.32"
            />
            <path
              d="M 60 290 Q 190 350 320 280 Q 400 240 440 190 Q 475 150 495 135"
              fill="none"
              stroke="#FFFCEF"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.55"
            />

            {/* Mid disc */}
            <ellipse cx="350" cy="250" rx="220" ry="60" fill="url(#gx2-core)" opacity="0.7" />
            {/* Inner bulge */}
            <ellipse cx="350" cy="250" rx="100" ry="34" fill="url(#gx2-core)" />
            {/* Bright core */}
            <ellipse cx="350" cy="250" rx="36" ry="18" fill="#FFFCEF" opacity="0.9" />
            <ellipse cx="350" cy="250" rx="18" ry="9" fill="#FFFCEF" />

            {/* Embedded star clusters along the arms */}
            {[
              [215, 365, 1.6], [260, 320, 1.4], [310, 270, 1.2],
              [400, 222, 1.2], [475, 175, 1.4], [555, 165, 1.6],
              [610, 195, 1.2], [115, 320, 1.4], [180, 335, 1.2],
              [255, 290, 1.0], [330, 270, 1.0], [410, 200, 1.0],
              [475, 165, 1.2], [515, 145, 1.4],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFCEF" opacity={0.85} />
            ))}
          </g>
        </svg>

        {/* ============================================================
            FLAGSHIP STARS scattered across the canvas — a few brighter
            "lit beacon" stars with halos, like the gold beacons on the
            Dubai skyline. Drawn larger and brighter than the bulk star
            field so they punctuate the composition.
            ============================================================ */}
        {[
          { top: "32vh", left: "12%", size: 3 },
          { top: "108vh", left: "8%", size: 3.5 },
          { top: "138vh", left: "62%", size: 3 },
          { top: "168vh", right: "18%", size: 3.5 },
          { top: "200vh", left: "44%", size: 3 },
          { top: "232vh", right: "32%", size: 3.5 },
        ].map((b, i) => (
          <div
            key={`beacon-${i}`}
            className="absolute rounded-full"
            style={{
              top: b.top,
              ...(b.left ? { left: b.left } : { right: b.right }),
              width: b.size,
              height: b.size,
              background: "#FFFCEF",
              boxShadow: "0 0 6px 2px rgba(255, 252, 239, 0.6)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
