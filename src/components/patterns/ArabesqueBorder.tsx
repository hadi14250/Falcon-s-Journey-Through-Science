"use client";

interface ArabesqueBorderProps {
  className?: string;
}

export default function ArabesqueBorder({ className = "" }: ArabesqueBorderProps) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 20"
        className="w-full h-5"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id="arabesque-border"
            x="0"
            y="0"
            width="40"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star motif */}
            <path
              d="M20,2 L23,8 L30,8 L25,12 L27,19 L20,15 L13,19 L15,12 L10,8 L17,8 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Connecting arcs */}
            <path
              d="M0,10 Q10,0 20,10 Q30,20 40,10"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="400" height="20" fill="url(#arabesque-border)" />
      </svg>
    </div>
  );
}
