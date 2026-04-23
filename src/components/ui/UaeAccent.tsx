"use client";

/* === UaeAccent: a horizontal Sadu-style band ===
   Used as a decorative strip inside section cards and headers.

   Implementation note: we use a CSS background-image with a small SVG data
   URL so the pattern TILES at its natural size. Older versions used an SVG
   <pattern> with preserveAspectRatio="none" which stretches the motifs and
   looks ugly on wide screens. */

const PROMINENT_TILE = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='40' height='16' viewBox='0 0 40 16'>
  <polyline points='0,3 10,1 20,3 30,1 40,3' fill='none' stroke='#CE1126' stroke-width='1.2'/>
  <polygon points='20,4 30,8 20,12 10,8' fill='none' stroke='#D4AF37' stroke-width='1.2'/>
  <polygon points='20,6 26,8 20,10 14,8' fill='#D4AF37' fill-opacity='0.85'/>
  <polyline points='0,13 10,15 20,13 30,15 40,13' fill='none' stroke='#CE1126' stroke-width='1.2'/>
  <circle cx='2' cy='8' r='1.2' fill='#009639'/>
  <circle cx='38' cy='8' r='1.2' fill='#009639'/>
  <circle cx='20' cy='2' r='0.7' fill='#1A1A2E'/>
  <circle cx='20' cy='14' r='0.7' fill='#1A1A2E'/>
</svg>
`).replace(/%0A/g, "");

const DEFAULT_TILE = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='24' height='10' viewBox='0 0 24 10'>
  <polyline points='0,8 6,2 12,8 18,2 24,8' fill='none' stroke='#CE1126' stroke-width='1'/>
  <polygon points='12,2 16,5 12,8 8,5' fill='#D4AF37'/>
  <circle cx='2' cy='5' r='0.9' fill='#009639'/>
  <circle cx='22' cy='5' r='0.9' fill='#009639'/>
</svg>
`).replace(/%0A/g, "");

export function SaduBand({
  className = "",
  height = 10,
  variant = "default",
}: {
  className?: string;
  height?: number;
  variant?: "default" | "prominent";
}) {
  const isProminent = variant === "prominent";
  const tile = isProminent ? PROMINENT_TILE : DEFAULT_TILE;
  // Tile size in CSS px — we want the visible band to render the motif at its
  // natural aspect ratio scaled to the requested height. So the CSS tile width
  // equals: (svg natural width / svg natural height) × height.
  const naturalAspect = isProminent ? 40 / 16 : 24 / 10;
  const tileWidth = Math.round(height * naturalAspect);

  return (
    <div
      className={className}
      role="presentation"
      style={{
        height: `${height}px`,
        width: "100%",
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${tile}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: `${tileWidth}px ${height}px`,
      }}
      aria-hidden="true"
    />
  );
}

/* Khaleeji 8-point gold star — small decorative accent */
export function KhaleejiStar({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z"
        fill="#D4AF37"
        stroke="#1A1A2E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="#FFE9A8" />
    </svg>
  );
}

/* Tiny gold corner ornament — like an Arabic-script flourish */
export function CornerFlourish({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M2 2 Q 16 4 18 14 Q 22 10 30 8" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="3" cy="3" r="2" fill="#D4AF37" stroke="#1A1A2E" strokeWidth="1" />
      <circle cx="18" cy="14" r="1.5" fill="#CE1126" />
    </svg>
  );
}
