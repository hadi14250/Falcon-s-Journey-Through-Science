"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Companion from "@/components/mascot/Companion";
import LessonButton from "@/components/lesson/LessonButton";
import { SaduBand, KhaleejiStar } from "@/components/ui/UaeAccent";
import type { SubjectId } from "@/data/subjects";

interface HurrIntroProps {
  levelId: number;
  subjectId?: SubjectId;
  /* Total levels for the current subject. Drives the "Level N of M"
     progression label in the header. Optional so existing callers
     don't break — falls back to just "Level N" when omitted. */
  totalLevels?: number;
  title: string;
  titleAr: string;
  /* The Hurr line is the only intro copy shown — the longer `introText`
     was dropped because both said the same thing in two boxes. The prop
     is kept on the interface for back-compat with callers, but unused. */
  introText?: string;
  hurrLine: string;
  /* Optional Arabic dialogue. When provided, the template renders both
     EN + AR (matching the bilingual fun-fact pattern). Falls back to
     EN-only if omitted. Per-level config field — not template-owned. */
  hurrLineAr?: string;
  /* Optional CTA copy override per level. Defaults to the universal
     "Yalla! Let's start" / "يلا!" so existing callers keep working. */
  ctaText?: string;
  ctaTextAr?: string;
  /* Background slot — per-level ambient background. Can be a CSS
     gradient string (e.g. for the Sun = warm radial), a URL to an
     SVG asset, or a JSX node. Rendered behind the scene at low
     opacity so the cream theme still shows through. The slot itself
     is universal; what fills it is per-level. */
  backgroundTheme?: React.ReactNode;
  onContinue: () => void;
  onBack?: () => void;
}

/* === UAE fun-fact band ==================================================
   A small "Did you know?" card that ties each level's topic back to UAE
   space heritage. Each level has a hand-drawn icon that fills the tile
   properly (no tiny lost line work), and the tile sits on a real
   horizontal UAE flag stripe at the bottom so the national hook reads
   at a glance. Falls back to a generic fact + UAE flag for unmapped
   levels. */
type FactKind = "sun" | "earth-moon" | "mars" | "asteroids" | "jupiter" | "probe";

type Fact = { en: string; ar: string; kind: FactKind };

const SPACE_FACTS: Record<number, Fact> = {
  1: {
    en: "The UAE built the Mohammed bin Rashid Solar Park, one of the largest in the world, powered by our Sun.",
    ar: "بنت الإمارات مجمع محمد بن راشد للطاقة الشمسية، أحد أكبر المجمعات في العالم.",
    kind: "sun",
  },
  2: {
    en: "Sheikh Zayed dreamed of space exploration, and astronaut Sultan Al-Neyadi spent 6 months on the ISS orbiting Earth.",
    ar: "حلم الشيخ زايد باستكشاف الفضاء، وقضى رائد الفضاء سلطان النيادي ٦ أشهر على المحطة الدولية.",
    kind: "earth-moon",
  },
  3: {
    en: "The UAE's Hope Probe sent back the first complete picture of Mars's atmosphere, a world first!",
    ar: "أرسل مسبار الأمل الإماراتي أول صورة كاملة للغلاف الجوي للمريخ، إنجاز عالمي أول.",
    kind: "mars",
  },
  4: {
    en: "The UAE's Emirates Mission to the Asteroid Belt will explore 7 asteroids, launching in 2028!",
    ar: "ستستكشف بعثة الإمارات لحزام الكويكبات ٧ كويكبات، وينطلق إطلاقها عام ٢٠٢٨.",
    kind: "asteroids",
  },
  5: {
    en: "Jupiter is so big that 1,300 Earths could fit inside it, and the UAE studies it from telescopes in Al Khatim.",
    ar: "يستوعب كوكب المشتري ١٣٠٠ كوكب أرض داخله، وتدرسه الإمارات من تلسكوبات الختم.",
    kind: "jupiter",
  },
  6: {
    en: "The Hope Probe (Al-Amal) made the UAE the 5th country ever to reach Mars, on the 50th anniversary of the nation.",
    ar: "جعل مسبار الأمل الإمارات خامس دولة تصل إلى المريخ، في الذكرى الخمسين لتأسيس الدولة.",
    kind: "probe",
  },
};

const HERITAGE_FACTS: Record<number, Fact> = {
  1: {
    en: "Abu Dhabi is the capital and the largest emirate, named 'Father of the Gazelle' after the animals that once roamed its sands.",
    ar: "أبوظبي هي العاصمة وأكبر إمارة، واسمها يعني أبا الغزال نسبةً للغزلان التي كانت تجوب رمالها.",
    kind: "sun",
  },
  2: {
    en: "Dubai is home to the Burj Khalifa, the tallest building in the world at 828 metres.",
    ar: "دبي فيها برج خليفة، أطول مبنى في العالم بارتفاع ٨٢٨ مترًا.",
    kind: "earth-moon",
  },
  3: {
    en: "Sharjah was named the cultural capital of the Arab world by UNESCO, and it is the only emirate that touches two seas.",
    ar: "سُمّيت الشارقة عاصمة الثقافة العربية من اليونسكو، وهي الإمارة الوحيدة التي تطلّ على بحرين.",
    kind: "mars",
  },
  4: {
    en: "Ajman is the smallest emirate but it has the world's biggest dhow boat shipyard, built by hand for over 1,000 years.",
    ar: "عجمان هي أصغر إمارة لكنها تضمّ أكبر مقام لبناء سفن الداو الخشبية في العالم.",
    kind: "asteroids",
  },
  5: {
    en: "Umm Al Quwain means 'Mother of Two Powers', because its people were strong on land and on the sea.",
    ar: "أم القيوين تعني أم القوّتين، لأن أهلها كانوا أقوياء في البر والبحر.",
    kind: "jupiter",
  },
  6: {
    en: "Ras Al Khaimah is home to Jebel Jais, the tallest mountain in the UAE at 1,934 metres, where it sometimes snows in winter.",
    ar: "في رأس الخيمة يقع جبل جيس، أعلى جبل في الإمارات بارتفاع ١٩٣٤ مترًا، وأحيانًا تتساقط عليه الثلوج في الشتاء.",
    kind: "probe",
  },
  7: {
    en: "Fujairah is the only emirate fully on the Gulf of Oman, and it has the oldest mosque in the UAE, Al Bidya, built about 575 years ago.",
    ar: "الفجيرة هي الإمارة الوحيدة على خليج عمان، وفيها أقدم مسجد في الإمارات، البدية، الذي بُني قبل نحو ٥٧٥ سنة.",
    kind: "sun",
  },
};

const FACTS_BY_SUBJECT: Record<SubjectId, Record<number, Fact>> = {
  space: SPACE_FACTS,
  heritage: HERITAGE_FACTS,
  nature: {},
};

const FALLBACK_FACT: Fact = {
  en: "The UAE celebrates its space program every year on Space Day, a national source of pride.",
  ar: "تحتفل الإمارات ببرنامجها الفضائي كل عام في يوم الفضاء.",
  kind: "sun",
};

/* Hand-drawn fact icon — each variant fills a 56×56 viewBox properly
   (no tiny line work, no clipping) and uses a warm gold palette. */
function FactIcon({ kind }: { kind: FactKind }) {
  const stroke = "#1A1A2E";
  const fill = "#F5C842";
  const accent = "#B8862E";

  switch (kind) {
    case "sun":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          {/* 8 rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x1 = 28 + Math.cos(a) * 18;
            const y1 = 28 + Math.sin(a) * 18;
            const x2 = 28 + Math.cos(a) * 26;
            const y2 = 28 + Math.sin(a) * 26;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="28" cy="28" r="13" fill={fill} stroke={stroke} strokeWidth="2.5" />
          {/* Smile */}
          <circle cx="24" cy="26" r="1.4" fill={stroke} />
          <circle cx="32" cy="26" r="1.4" fill={stroke} />
          <path d="M23 31 Q28 35 33 31" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "earth-moon":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          {/* Earth */}
          <circle cx="22" cy="32" r="14" fill="#7AC4FF" stroke={stroke} strokeWidth="2.5" />
          <path d="M14 28 Q20 26 26 30 Q22 35 16 33 Z" fill="#16A34A" stroke={stroke} strokeWidth="1.5" />
          <path d="M28 36 Q32 33 34 38 Q30 40 28 38 Z" fill="#16A34A" stroke={stroke} strokeWidth="1.5" />
          {/* Moon */}
          <circle cx="44" cy="18" r="7" fill="#E5E1D2" stroke={stroke} strokeWidth="2" />
          <circle cx="42" cy="17" r="1.5" fill="#A8A48F" />
          <circle cx="46" cy="20" r="1" fill="#A8A48F" />
        </svg>
      );

    case "mars":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          <circle cx="28" cy="28" r="18" fill="#E26E4D" stroke={stroke} strokeWidth="2.5" />
          {/* Polar cap */}
          <path d="M19 16 Q28 12 37 16 Q33 20 28 19 Q23 20 19 16 Z" fill="#FEE2E2" stroke={stroke} strokeWidth="1.5" />
          {/* Craters */}
          <circle cx="22" cy="32" r="2.5" fill="#7F1D1D" opacity="0.65" />
          <circle cx="34" cy="30" r="1.8" fill="#7F1D1D" opacity="0.6" />
          <circle cx="29" cy="38" r="2" fill="#7F1D1D" opacity="0.6" />
        </svg>
      );

    case "asteroids":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          {/* 3 asteroids */}
          <path d="M14 24 L18 20 L24 22 L25 28 L20 32 L14 30 Z" fill="#9CA3AF" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M28 14 L34 12 L40 16 L42 22 L37 27 L30 25 L26 19 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M36 34 L42 32 L46 38 L42 44 L36 42 Z" fill="#9CA3AF" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          {/* Crater pocks */}
          <circle cx="34" cy="20" r="1.5" fill={accent} opacity="0.7" />
          <circle cx="40" cy="38" r="1.2" fill={stroke} opacity="0.6" />
        </svg>
      );

    case "jupiter":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          <defs>
            <clipPath id="jupiter-clip">
              <circle cx="28" cy="28" r="18" />
            </clipPath>
          </defs>
          <circle cx="28" cy="28" r="18" fill="#F5C842" stroke={stroke} strokeWidth="2.5" />
          <g clipPath="url(#jupiter-clip)">
            <rect x="10" y="20" width="36" height="3" fill="#B8862E" />
            <rect x="10" y="27" width="36" height="2" fill="#B8862E" opacity="0.6" />
            <rect x="10" y="32" width="36" height="3" fill="#B8862E" />
            {/* Great red spot */}
            <ellipse cx="32" cy="32" rx="4" ry="2.5" fill="#DC2626" stroke={stroke} strokeWidth="1" />
          </g>
        </svg>
      );

    case "probe":
      return (
        <svg viewBox="0 0 56 56" width="40" height="40" aria-hidden="true">
          {/* Solar panels */}
          <rect x="6" y="22" width="12" height="12" fill="#3B82F6" stroke={stroke} strokeWidth="2" />
          <line x1="10" y1="22" x2="10" y2="34" stroke={stroke} strokeWidth="1" />
          <line x1="14" y1="22" x2="14" y2="34" stroke={stroke} strokeWidth="1" />
          <rect x="38" y="22" width="12" height="12" fill="#3B82F6" stroke={stroke} strokeWidth="2" />
          <line x1="42" y1="22" x2="42" y2="34" stroke={stroke} strokeWidth="1" />
          <line x1="46" y1="22" x2="46" y2="34" stroke={stroke} strokeWidth="1" />
          {/* Body */}
          <rect x="20" y="20" width="16" height="16" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
          {/* Dish */}
          <ellipse cx="28" cy="14" rx="6" ry="3" fill="#E5E1D2" stroke={stroke} strokeWidth="2" />
          <line x1="28" y1="14" x2="28" y2="20" stroke={stroke} strokeWidth="2" />
        </svg>
      );
  }
}

/* === HurrIntro =========================================================
   Level intro screen in the souq / lesson-complete grammar. One cream
   card with the companion + a single short line of intro copy. Header
   has the Level title pair + an X to bail back to the map; sticky CTA
   bar at the bottom for Yalla. h-dvh, no scroll. */
export default function HurrIntro({
  levelId,
  subjectId = "space",
  totalLevels,
  title,
  titleAr,
  hurrLine,
  hurrLineAr,
  ctaText = "Yalla! Let's start",
  ctaTextAr = "يلا!",
  backgroundTheme,
  onContinue,
  onBack,
}: HurrIntroProps) {
  return (
    <motion.div
      className="relative h-dvh bg-[var(--color-lesson-bg)] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* === Universal ambient-background slot.
          Rendered behind everything else with pointer-events:none and
          a low default opacity so the cream theme still reads. Per-
          level content (sun rays, dunes, starfield, etc.) is whatever
          the caller passes via `backgroundTheme`. */}
      {backgroundTheme && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {backgroundTheme}
        </div>
      )}

      {/* === Page header — souq grammar with X close === */}
      <div className="relative z-10 shrink-0 px-4 pt-3 pb-2 border-b border-[#E5D9B8] bg-[var(--color-lesson-bg)]/95 backdrop-blur-sm">
        <div className="max-w-md md:max-w-2xl lg:max-w-[1100px] mx-auto flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-base text-[#1A1A2E] leading-none flex items-center gap-1.5">
              <KhaleejiStar size={12} />
              <span className="truncate">
                Level {levelId}{totalLevels ? ` of ${totalLevels}` : ""} · {title}
              </span>
            </h1>
            <p className="font-body text-sm font-bold text-[#B8862E] leading-none mt-1 text-left truncate" dir="rtl">
              المستوى {levelId}{totalLevels ? ` من ${totalLevels}` : ""} · {titleAr}
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              aria-label="Back to map"
              className="shrink-0 -mt-1 -mr-1 p-1.5 rounded-xl text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:bg-black/5 active:scale-95 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <SaduBand className="mt-2.5 max-w-md md:max-w-2xl lg:max-w-[1100px] mx-auto opacity-90" height={10} variant="prominent" />
      </div>

      {/* (UAE fun-fact band moved BELOW the dialogue per the new
          narrative order: header → character + dialogue → fact → CTA.
          Renders inside the dialogue column so it visually
          integrates with the dialogue card instead of sitting at the
          top like a banner ad.) */}

      {/* === Hero scene — companion + dialogue.
          Mobile: single column (companion above dialogue card).
          Desktop (lg+): two-column composition — companion is the
          visual anchor on the LEFT (much larger), dialogue card on
          the RIGHT with a speech-bubble tail visually connecting
          them. Single composed scene that fits one viewport. === */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-4 py-3">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-8">

          {/* === Companion column — universal slot ===
              Mobile: centered above the dialogue.
              Desktop: anchors the LEFT side, much larger so the eye
              lands on it first.

              Animation system is universal — applies to whichever
              character SVG renders inside:
                - Float bob (Framer y oscillation, existing)
                - Slow "breathe" scale (CSS keyframe on inner div)
                - Tiny periodic head-tilt (CSS keyframe)
                - Hover lift on desktop (scale + minor rotate) */}
          <motion.div
            className="relative shrink-0 flex items-center justify-center lg:flex-[0_0_42%] cursor-pointer group"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ y: [0, -6, 0], scale: 1, opacity: 1 }}
            transition={{
              y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 200, damping: 16, delay: 0.15 },
              opacity: { duration: 0.3, delay: 0.15 },
            }}
            style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))" }}
          >
            {/* Soft radial glow behind the companion */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.30), transparent 60%)",
                transform: "scale(1.4)",
              }}
            />
            <div
              className="relative will-change-transform animate-[hurr-breathe_4s_ease-in-out_infinite,hurr-tilt_7s_ease-in-out_infinite] origin-center transition-transform duration-300 lg:group-hover:scale-110 lg:group-hover:-rotate-3"
            >
              {/* Companion. Always pulls from the store, so the user's
                  chosen profile companion is what renders here. xl on
                  lg+ so the character anchors the scene; md on phone/
                  tablet to stay compact. */}
              <div className="hidden lg:block">
                <Companion size="xl" mood="idle" hideHappyStar />
              </div>
              <div className="lg:hidden">
                <Companion size="md" mood="idle" hideHappyStar />
              </div>
            </div>
          </motion.div>

          {/* === Dialogue + fun-fact column.
              Stacked vertically: dialogue card on top, fun-fact card
              right below. Both share the lg:flex-1 column. */}
          <div className="w-full lg:flex-1 flex flex-col gap-3 lg:gap-4">

            {/* Dialogue card (souq grammar).
                Mobile: full-width below the companion.
                Desktop: top of the right column.
                Speech-bubble tail visually links it to the character
                (left edge tail on lg+, top tail on mobile). */}
            <motion.div
              className="relative border-2 border-[#1A1A2E] rounded-3xl overflow-visible"
              style={{
                background: "linear-gradient(180deg, #FFFCEF 0%, #FFF7DC 70%, #FFE9A8 100%)",
                boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
            >
              <div
                className="lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFCEF] border-l-2 border-t-2 border-[#1A1A2E] rotate-45"
                aria-hidden="true"
              />
              <div
                className="hidden lg:block absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-[#FFFCEF] border-l-2 border-b-2 border-[#1A1A2E] rotate-45"
                aria-hidden="true"
              />

              <div className="relative px-5 py-5 lg:px-7 lg:py-7">
                <motion.p
                  className="font-body text-base md:text-xl lg:text-2xl font-bold text-[#1A1A2E] leading-snug text-center lg:text-left"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {hurrLine}
                </motion.p>
                {hurrLineAr && (
                  <motion.p
                    className="font-body text-sm md:text-base lg:text-lg leading-snug mt-2 text-center lg:text-left"
                    dir="rtl"
                    style={{ color: "#B8862E" }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {hurrLineAr}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* === UAE fun-fact card (P3 — moved here, AFTER dialogue).
                Restyled to match the dialogue card: same border-radius
                (rounded-3xl), same gold drop-shadow (0 5px 0 #C9B58A),
                same 2px navy border, white surface. Reads as a
                sibling of the dialogue, not a banner ad. */}
            {(() => {
              const fact = FACTS_BY_SUBJECT[subjectId]?.[levelId] ?? FALLBACK_FACT;
              return (
                <motion.div
                  className="relative bg-white border-2 border-[#1A1A2E] rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="px-5 py-4 lg:px-6 lg:py-5 flex items-center gap-3 lg:gap-4">
                    {/* Icon tile — same gold inner gradient, slightly
                        larger on desktop to match the bigger dialogue
                        text. */}
                    <div
                      className="shrink-0 relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl border-2 border-[#1A1A2E] overflow-hidden bg-gradient-to-b from-[#FFFCEF] to-[#FFE9A8] flex items-center justify-center"
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)" }}
                    >
                      <FactIcon kind={fact.kind} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-[11px] uppercase tracking-[0.18em] text-[#B8862E] leading-none flex items-center gap-1.5">
                        {/* UAE flag (2:1 ratio, ~16×8) */}
                        <span
                          className="inline-flex items-stretch w-5 h-2.5 border border-[#1A1A2E]/70 overflow-hidden align-middle"
                          aria-hidden="true"
                        >
                          <span className="block w-1.5 h-full bg-[#CE1126]" />
                          <span className="flex-1 flex flex-col">
                            <span className="flex-1 bg-[#009639]" />
                            <span className="flex-1 bg-white" />
                            <span className="flex-1 bg-[#1A1A2E]" />
                          </span>
                        </span>
                        UAE Fun Fact · معلومة إماراتية
                      </p>
                      <p className="font-body text-sm lg:text-[15px] text-[#1A1A2E] leading-snug mt-1.5">
                        {fact.en}
                      </p>
                      <p
                        className="font-body leading-snug mt-1 text-right"
                        dir="rtl"
                        style={{ fontSize: "13px", color: "#B8862E" }}
                      >
                        {fact.ar}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* === Sticky bottom CTA bar.
          Mobile: full-width (preserves the existing tap target).
          Desktop: capped at ~440px and centered so it doesn't read
          as a giant signage strip across a wide viewport. */}
      <div
        className="relative z-20 shrink-0 px-4 pt-3 w-full bg-gradient-to-t from-[var(--color-lesson-bg)] via-[var(--color-lesson-bg)] to-transparent"
        style={{ paddingBottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
      >
        <motion.div
          className="max-w-md md:max-w-2xl lg:max-w-[440px] mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <LessonButton variant="primary" size="lg" fullWidth onClick={onContinue}>
            <span>{ctaText}</span>
            <span className="opacity-80 ml-2" dir="rtl">{ctaTextAr}</span>
          </LessonButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
