"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* === HeritageBackdrop ================================================
   Parallax cinematic backdrop for the UAE Heritage map.

   The backdrop wrapper is 250vh tall (taller than any single viewport)
   and translates UP at ~40% of scroll speed. This creates the depth
   illusion: the climb path scrolls past at 100%, the backdrop drifts
   slowly behind it. Because the backdrop is 250vh tall, we have plenty
   of vertical canvas to put DIFFERENT scenery at different scroll
   positions — the player sees stars + sun at the start, the Dubai
   skyline in the middle, and warm desert dunes with cacti by the
   bottom of the climb.

   Reduced-motion: parallax disabled (backdrop is fully fixed), all
   ambient animations stop, scenery still renders.
   ================================================================= */

export default function HeritageBackdrop() {
  const reduced = useReducedMotion();

  // Parallax: backdrop moves up at 40% of page scroll. So if the page
  // scrolls 1000px, the backdrop only shifts -400px upward, creating
  // the distance illusion. Disabled entirely for reduced-motion.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (v) => (reduced ? 0 : -v * 0.4));

  // Sparse twinkling stars in the dusk band at the top.
  const stars = Array.from({ length: 14 }).map((_, i) => {
    const seed = (i * 1103515245 + 12345) & 0x7fffffff;
    const x = (seed % 1000) / 10;            // 0..100 (% across width)
    const y = ((seed >> 8) % 180) / 10;      // 0..18 (% from top of backdrop)
    const size = 0.7 + ((seed >> 16) % 8) / 10;
    const delay = ((seed >> 20) % 30) / 10;
    return { x, y, size, delay };
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Top-most vignette overlay (rendered AFTER the parallax wrapper
          via JSX order so it sits on top). Soft radial fade: fully
          transparent in the center column where the climb path lives,
          progressively dim toward the screen edges. Pushes the backdrop
          visually back so the level nodes pop forward. Sits at z-1
          inside this fixed container, above the parallax wrapper. */}
      {/* Parallax wrapper: 250vh tall and anchored to the viewport top.
          As the page scrolls, this wrapper translates UP via parallaxY
          but slower than the page. Its extra 150vh of slack means it
          can scroll up well past the viewport before its bottom edge
          would peek above the viewport bottom. */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ y: parallaxY, height: "250vh" }}
      >
        {/* === Master vertical gradient over the full 250vh.
            Reads bottom→top: warm sand cream → golden afternoon → dusk
            amber → deep dusk navy → starfield navy at the very top.
            Because the gradient itself spans the full 250vh, every
            scroll position reveals a different color band. ============ */}
        {/* Master vertical gradient. The bottom transition (cream → warm
            bronze → deep amber) has tighter color stops to imply a sandy
            desert "ground" without needing explicit dune shapes. The
            climb path travels through this band, and the ground feeling
            comes from the gradient itself, not from drawn silhouettes. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              #8B5A1F 0%,
              #B8862E 5%,
              #D4A574 11%,
              #F5C842 22%,
              #FFE9A8 35%,
              #E07B3F 58%,
              #8B3A4A 78%,
              #2D2D5A 92%,
              #1A1A2E 100%)`,
          }}
        />

        {/* === TOP BAND (0-20% of backdrop) — dusk + stars + sun === */}
        <div className="absolute inset-x-0 top-0 h-[20%] overflow-hidden">
          {stars.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y * 5}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
              }}
              animate={reduced ? undefined : { opacity: [0.3, 0.9, 0.3] }}
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 3,
                      delay: s.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          ))}

          {/* Sunset sun with soft pulsing glow */}
          <motion.div
            className="absolute"
            style={{
              top: "55%",
              right: "18%",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%, #FFE9A8 0%, #FFD96B 45%, #E8862E 100%)",
              boxShadow: "0 0 80px 20px rgba(255, 217, 107, 0.45)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      "0 0 80px 20px rgba(255, 217, 107, 0.45)",
                      "0 0 110px 28px rgba(255, 217, 107, 0.6)",
                      "0 0 80px 20px rgba(255, 217, 107, 0.45)",
                    ],
                  }
            }
            transition={
              reduced
                ? undefined
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
          />

          {/* (Hope Probe + Mars moved to SpaceBackdrop — they belong
              with the Space subject, not the UAE Heritage one.) */}
        </div>

        {/* === UPPER MIDDLE (20-50%) — deliberately empty open sky.
            Eye gets a moment of rest as the climb path crosses through. */}

        {/* === LOWER MIDDLE (55-72%) — Wide Dubai skyline panorama,
            designed specifically for this backdrop to stretch edge-to-edge
            of the viewport. Two depth layers: pale Hatta mountain ridge
            (back), navy city silhouette (front). Recognizable landmarks
            from left to right: Old Dubai wind-tower cluster → Marina mid-
            rise → Burj Khalifa (tiered tapered tower) → Dubai Frame →
            Downtown blocks → Burj Al Arab (sail) → Atlantis (twin-tower
            with arch). Tiny gold beacons on tower tops for lit-up dusk. */}
        <svg
          viewBox="0 0 1600 220"
          preserveAspectRatio="xMidYEnd meet"
          className="absolute left-0 right-0 w-full"
          style={{ top: "75vh" }}
          aria-hidden="true"
        >
          {/* Hatta-style mountain range (back layer, low contrast) */}
          <path
            d="M 0 220 L 0 165 L 90 130 L 170 155 L 270 110 L 360 145 L 460 100 L 580 150 L 700 125 L 820 95 L 940 145 L 1060 105 L 1180 145 L 1300 120 L 1420 150 L 1530 125 L 1600 145 L 1600 220 Z"
            fill="#5C2E3F"
            opacity="0.32"
          />

          {/* === Front layer: full Dubai city silhouette, navy fill.
              Buildings extend continuously from x=0 to x=1600 so the
              skyline reads edge-to-edge with no empty gradient bands. */}
          <g fill="#1A1A2E" opacity="0.92">

            {/* === FAR LEFT EXTENSION — extra tall slim modern tower
                anchoring x=0, then more low buildings stepping up to
                the Old Dubai cluster. Ensures the city continues all
                the way to the left viewport edge. */}
            <rect x="-10" y="170" width="22" height="70" />
            {/* Slim antenna spire */}
            <line x1="1" y1="170" x2="1" y2="160" stroke="#1A1A2E" strokeWidth="1.5" />
            <circle cx="1" cy="159" r="1.6" fill="#D4AF37" />
            <rect x="12" y="190" width="20" height="40" />

            {/* === FAR LEFT — Old Dubai / Madinat Jumeirah cluster:
                low buildings + 3 wind tower tops (the square-topped
                shorter towers with little crenellation details) === */}
            <rect x="0" y="195" width="40" height="25" />
            <rect x="40" y="180" width="30" height="40" />
            {/* Wind tower 1 */}
            <rect x="72" y="160" width="14" height="60" />
            <rect x="70" y="158" width="18" height="3" />
            {/* Notched crenellation on top */}
            <rect x="73" y="153" width="3" height="5" />
            <rect x="78" y="153" width="3" height="5" />
            <rect x="83" y="153" width="3" height="5" />
            {/* Two more low buildings + wind tower 2 */}
            <rect x="92" y="185" width="35" height="35" />
            <rect x="129" y="170" width="18" height="50" />
            <rect x="149" y="155" width="14" height="65" />
            <rect x="147" y="153" width="18" height="3" />
            <rect x="150" y="148" width="3" height="5" />
            <rect x="155" y="148" width="3" height="5" />
            <rect x="160" y="148" width="3" height="5" />
            {/* Lower buildings stretching to next cluster */}
            <rect x="167" y="190" width="45" height="30" />
            <rect x="212" y="178" width="28" height="42" />

            {/* === LEFT-CENTER — Marina mid-rise cluster:
                varied modern office tower heights, slim profiles === */}
            <rect x="248" y="155" width="30" height="65" />
            <rect x="278" y="135" width="22" height="85" />
            <rect x="300" y="120" width="28" height="100" />
            {/* Top of tallest in this group */}
            <path d="M 300 120 L 314 110 L 328 120 Z" />
            <rect x="328" y="148" width="24" height="72" />
            <rect x="352" y="160" width="32" height="60" />
            <rect x="384" y="125" width="20" height="95" />
            {/* Antenna on slim tower */}
            <line x1="394" y1="125" x2="394" y2="115" stroke="#1A1A2E" strokeWidth="1.5" />
            <rect x="404" y="155" width="36" height="65" />
            <rect x="440" y="170" width="26" height="50" />
            <rect x="466" y="160" width="32" height="60" />
            <rect x="498" y="180" width="38" height="40" />
            <rect x="536" y="155" width="24" height="65" />
            <rect x="560" y="145" width="30" height="75" />
            <rect x="590" y="170" width="28" height="50" />

            {/* === CENTER — BURJ KHALIFA: tapered tiered silhouette.
                Three setbacks (real Burj has 3 main tiered sections),
                each narrower than the last, plus the spire. === */}
            {/* Wide base */}
            <path d="M 660 220 L 670 180 L 690 180 L 700 220 Z" />
            {/* First setback */}
            <path d="M 670 180 L 675 140 L 685 140 L 690 180 Z" />
            {/* Second setback */}
            <path d="M 675 140 L 678 100 L 682 100 L 685 140 Z" />
            {/* Third setback */}
            <path d="M 678 100 L 679.5 60 L 680.5 60 L 682 100 Z" />
            {/* Top spire */}
            <path d="M 679.5 60 L 680 30 L 680 30 L 680.5 60 Z" />
            {/* Antenna */}
            <line x1="680" y1="30" x2="680" y2="10" stroke="#1A1A2E" strokeWidth="1.5" />
            {/* Tiny gold beacon at the very top */}
            <circle cx="680" cy="9" r="2.2" fill="#D4AF37" />

            {/* Side mid-rise to right of Burj Khalifa */}
            <rect x="710" y="170" width="26" height="50" />
            <rect x="736" y="155" width="22" height="65" />

            {/* === RIGHT OF BURJ — DUBAI FRAME:
                rectangular frame with crossbar at top (the bridge) === */}
            <rect x="780" y="125" width="14" height="95" />
            <rect x="848" y="125" width="14" height="95" />
            <rect x="780" y="125" width="82" height="10" />
            {/* Inner cutout effect via thin lines */}
            <line x1="787" y1="135" x2="787" y2="220" stroke="#1A1A2E" strokeWidth="1" opacity="0.6" />

            {/* Downtown mid-rise cluster between Frame and Burj Al Arab */}
            <rect x="876" y="150" width="32" height="70" />
            <rect x="908" y="135" width="26" height="85" />
            <rect x="934" y="155" width="36" height="65" />
            <path d="M 934 155 L 952 145 L 970 155 Z" />
            <rect x="970" y="170" width="28" height="50" />
            <rect x="998" y="155" width="34" height="65" />
            <rect x="1032" y="175" width="26" height="45" />

            {/* === CENTER-RIGHT — BURJ AL ARAB:
                curved sail silhouette on a small island base === */}
            {/* Island base */}
            <ellipse cx="1090" cy="218" rx="38" ry="3" />
            {/* Sail — curved with the back-mast spine */}
            <path d="M 1062 220 Q 1090 60 1098 50 L 1106 60 Q 1112 80 1118 220 Z" />
            {/* The mast detail at the top */}
            <line x1="1098" y1="50" x2="1098" y2="35" stroke="#1A1A2E" strokeWidth="1.5" />
            {/* Helipad disc at peak */}
            <ellipse cx="1098" cy="60" rx="6" ry="1.5" fill="#1A1A2E" />
            <circle cx="1098" cy="35" r="1.8" fill="#D4AF37" />

            {/* Mid-rise cluster between Burj Al Arab and Atlantis */}
            <rect x="1140" y="160" width="28" height="60" />
            <rect x="1168" y="145" width="22" height="75" />
            <rect x="1190" y="170" width="34" height="50" />
            <rect x="1224" y="155" width="26" height="65" />
            <rect x="1250" y="175" width="30" height="45" />
            <rect x="1280" y="160" width="24" height="60" />

            {/* === FAR RIGHT — ATLANTIS THE PALM:
                twin-tower silhouette with the signature arched gap
                between them === */}
            {/* Left tower of Atlantis */}
            <path d="M 1330 220 L 1330 130 L 1345 110 L 1360 130 L 1360 220 Z" />
            {/* Right tower */}
            <path d="M 1395 220 L 1395 130 L 1410 110 L 1425 130 L 1425 220 Z" />
            {/* Connecting bridge (narrow horizontal between tower tops) */}
            <rect x="1360" y="155" width="35" height="8" />
            {/* Tiny window detail bumps on each tower */}
            <rect x="1342" y="135" width="6" height="4" />
            <rect x="1407" y="135" width="6" height="4" />

            {/* Final mid-rise + low buildings stretching to the right edge */}
            <rect x="1448" y="185" width="38" height="35" />
            <rect x="1486" y="170" width="28" height="50" />
            <rect x="1514" y="180" width="34" height="40" />
            <rect x="1548" y="195" width="32" height="25" />

            {/* === FAR RIGHT EXTENSION — extra slim modern tower
                at the right edge so the city silhouette continues all
                the way to the right viewport edge. */}
            <rect x="1582" y="160" width="20" height="80" />
            <line x1="1592" y1="160" x2="1592" y2="148" stroke="#1A1A2E" strokeWidth="1.5" />
            <circle cx="1592" cy="147" r="1.6" fill="#D4AF37" />

          </g>

          {/* Tiny gold beacon highlights scattered on tower tops —
              gives the "lit-up city at dusk" warmth without coloring
              the silhouettes themselves. Very subtle. */}
          <g fill="#D4AF37" opacity="0.9">
            <circle cx="79" cy="151" r="1.5" />
            <circle cx="156" cy="146" r="1.5" />
            <circle cx="314" cy="108" r="1.8" />
            <circle cx="394" cy="113" r="1.5" />
            <circle cx="575" cy="143" r="1.5" />
            <circle cx="787" cy="123" r="1.5" />
            <circle cx="855" cy="123" r="1.5" />
            <circle cx="952" cy="143" r="1.5" />
            <circle cx="1345" cy="108" r="1.8" />
            <circle cx="1410" cy="108" r="1.8" />
          </g>
        </svg>

        {/* === Foreground desert: 4 cacti + 1 oasis. All in the same
            navy silhouette tone as the skyline above for visual family.
            Spread across the bottom band so the desert doesn't feel
            empty, but centered cluster (oasis + tall cactus + palm
            grove) sits OFF the climb path's center line. ============== */}

        {/* Smaller cactus, far far left, deepest down */}
        <svg
          className="absolute"
          style={{ top: "118vh", left: "3%", width: 50, height: 80, opacity: 0.7 }}
          viewBox="0 0 50 80"
          aria-hidden="true"
        >
          <path
            d="M 22 78 Q 18 78 18 70 L 18 28 Q 18 18 25 14 Q 32 18 32 28 L 32 70 Q 32 78 28 78 Z"
            fill="#2A2244"
          />
          <path
            d="M 32 48 Q 38 48 41 44 Q 44 40 44 32 L 44 24 Q 44 20 41 20 Q 38 20 38 24 L 38 32 Q 38 36 36 38 Q 34 40 32 40 Z"
            fill="#2A2244"
          />
          <line x1="22" y1="32" x2="22" y2="70" stroke="#1A1A2E" strokeWidth="0.6" opacity="0.55" />
          <line x1="28" y1="32" x2="28" y2="70" stroke="#1A1A2E" strokeWidth="0.6" opacity="0.55" />
          <line x1="41" y1="26" x2="41" y2="36" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.55" />
        </svg>

        {/* Tiny cactus, mid-left, between small one and the oasis */}
        <svg
          className="absolute"
          style={{ top: "124vh", left: "22%", width: 35, height: 55, opacity: 0.62 }}
          viewBox="0 0 35 55"
          aria-hidden="true"
        >
          {/* Just trunk — a small barrel cactus with no arms */}
          <path
            d="M 14 53 Q 11 53 11 48 L 11 18 Q 11 10 17.5 8 Q 24 10 24 18 L 24 48 Q 24 53 21 53 Z"
            fill="#2A2244"
          />
          <line x1="14" y1="20" x2="14" y2="48" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.55" />
          <line x1="21" y1="20" x2="21" y2="48" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.55" />
        </svg>

        {/* Mid-right cactus, between left cluster and the big cactus */}
        <svg
          className="absolute"
          style={{ top: "122vh", left: "62%", width: 42, height: 65, opacity: 0.66 }}
          viewBox="0 0 42 65"
          aria-hidden="true"
        >
          {/* Trunk + one short arm */}
          <path
            d="M 18 63 Q 14 63 14 56 L 14 22 Q 14 12 21 10 Q 28 12 28 22 L 28 56 Q 28 63 24 63 Z"
            fill="#2A2244"
          />
          <path
            d="M 28 38 Q 33 38 35 35 Q 37 32 37 26 L 37 20 Q 37 16 35 16 Q 33 16 33 20 L 33 26 Q 33 30 31 32 Q 29 33 28 33 Z"
            fill="#2A2244"
          />
          <line x1="18" y1="24" x2="18" y2="56" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.55" />
          <line x1="24" y1="24" x2="24" y2="56" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.55" />
        </svg>

        {/* Larger 2-armed cactus, far right, deep down */}
        <svg
          className="absolute"
          style={{ top: "115vh", right: "5%", width: 75, height: 110, opacity: 0.78 }}
          viewBox="0 0 75 110"
          aria-hidden="true"
        >
          <path
            d="M 32 108 Q 26 108 26 100 L 26 38 Q 26 22 37 18 Q 48 22 48 38 L 48 100 Q 48 108 42 108 Z"
            fill="#2A2244"
          />
          <path
            d="M 48 60 Q 56 60 60 55 Q 64 50 64 40 L 64 26 Q 64 21 60 21 Q 56 21 56 26 L 56 40 Q 56 46 53 49 Q 50 52 48 52 Z"
            fill="#2A2244"
          />
          <path
            d="M 26 70 Q 18 70 14 66 Q 10 62 10 54 L 10 44 Q 10 39 14 39 Q 18 39 18 44 L 18 54 Q 18 60 21 62 Q 24 64 26 64 Z"
            fill="#2A2244"
          />
          <line x1="32" y1="42" x2="32" y2="100" stroke="#1A1A2E" strokeWidth="0.7" opacity="0.55" />
          <line x1="37" y1="40" x2="37" y2="102" stroke="#1A1A2E" strokeWidth="0.7" opacity="0.55" />
          <line x1="42" y1="42" x2="42" y2="100" stroke="#1A1A2E" strokeWidth="0.7" opacity="0.55" />
          <line x1="60" y1="28" x2="60" y2="48" stroke="#1A1A2E" strokeWidth="0.6" opacity="0.55" />
          <line x1="14" y1="46" x2="14" y2="60" stroke="#1A1A2E" strokeWidth="0.6" opacity="0.55" />
        </svg>

        {/* (Bottom foreground band removed — was reading as
            unrecognizable shapes. Decide on a replacement before
            re-adding anything here.) */}
      </motion.div>

    </div>
  );
}
