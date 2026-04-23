"use client";

import type { SubjectId } from "@/data/subjects";

/* Compact mini-icon shown in subject pickers (onboarding step 0,
   settings subject row, rewards subject tabs). Each subject gets a
   distinct illustration that hints at the subject's theme so users
   recognize the option visually, not just by the gold glyph fallback.

   Designed to render inside a 36–56px tile (the parent controls
   bg/border). The SVG has no internal padding so it fills the tile. */
export default function SubjectIcon({
  subjectId,
  size = 32,
}: {
  subjectId: SubjectId;
  size?: number;
}) {
  const STROKE = "#1A1A2E";
  const W = 1.6;

  if (subjectId === "space") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        {/* Sun behind */}
        <circle cx="22" cy="22" r="9" fill="#FCD34D" stroke={STROKE} strokeWidth={W} />
        {/* Saturn-like planet with ring */}
        <circle cx="42" cy="40" r="13" fill="#F97316" stroke={STROKE} strokeWidth={W} />
        <ellipse cx="42" cy="40" rx="22" ry="5" fill="none" stroke="#D4AF37" strokeWidth="2" transform="rotate(-18 42 40)" />
        {/* Tiny stars */}
        <path d="M 10 10 L 11 13 L 14 14 L 11 15 L 10 18 L 9 15 L 6 14 L 9 13 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="0.5" />
        <path d="M 54 14 L 55 16 L 57 17 L 55 18 L 54 20 L 53 18 L 51 17 L 53 16 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="0.5" />
      </svg>
    );
  }

  if (subjectId === "heritage") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        {/* Sandy sky */}
        <rect width="64" height="64" rx="6" fill="#FFF7DC" />
        {/* Sun */}
        <circle cx="50" cy="14" r="7" fill="#FCD34D" stroke={STROKE} strokeWidth={W} />
        {/* Mosque (left): main body + dome + minaret */}
        <rect x="6" y="38" width="22" height="18" fill="white" stroke={STROKE} strokeWidth={W} />
        <path d="M 8 38 Q 8 26 17 22 Q 26 26 26 38 Z" fill="white" stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
        <line x1="17" y1="22" x2="17" y2="14" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="17" cy="13" r="1.5" fill="#D4AF37" stroke={STROKE} strokeWidth="0.6" />
        {/* Burj Khalifa (right): tapered stepped tower */}
        <path d="M 36 56 L 36 50 L 39 50 L 39 42 L 42 42 L 42 32 L 45 32 L 45 22 L 48 22 L 48 14 L 51 14 L 51 22 L 54 22 L 54 32 L 57 32 L 57 42 L 60 42 L 60 56 Z" fill="#A8B8C8" stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
        {/* Sand at base */}
        <rect x="0" y="56" width="64" height="8" fill="#E8C879" stroke={STROKE} strokeWidth={W} />
      </svg>
    );
  }

  // nature (placeholder; subject not yet enabled)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="6" fill="#CFF7EE" />
      {/* Mountain */}
      <path d="M 4 56 L 22 28 L 32 40 L 44 22 L 60 56 Z" fill="#0E8C6B" stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
      {/* Snow cap */}
      <path d="M 22 28 L 26 33 Q 22 31 19 35 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      <path d="M 44 22 L 49 28 Q 44 26 40 30 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      {/* Sun */}
      <circle cx="14" cy="14" r="6" fill="#FCD34D" stroke={STROKE} strokeWidth={W} />
      {/* Ground */}
      <rect x="0" y="56" width="64" height="8" fill="#16A34A" stroke={STROKE} strokeWidth={W} />
    </svg>
  );
}
