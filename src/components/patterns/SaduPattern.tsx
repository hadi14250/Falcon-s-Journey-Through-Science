"use client";

interface SaduPatternProps {
  className?: string;
  opacity?: number;
  animate?: boolean;
}

export default function SaduPattern({
  className = "",
  opacity = 0.08,
  animate = false,
}: SaduPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="sadu-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Sadu weaving geometric pattern */}
            {/* Horizontal zigzag */}
            <polyline
              points="0,15 15,0 30,15 45,0 60,15"
              fill="none"
              stroke="#CE1126"
              strokeWidth="1.5"
            />
            <polyline
              points="0,45 15,30 30,45 45,30 60,45"
              fill="none"
              stroke="#CE1126"
              strokeWidth="1.5"
            />
            {/* Diamond shapes */}
            <polygon
              points="30,15 45,30 30,45 15,30"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            {/* Center dot */}
            <circle cx="30" cy="30" r="2" fill="#009639" />
            {/* Small triangles */}
            <polygon points="15,15 22,15 15,22" fill="#CE1126" opacity="0.5" />
            <polygon points="45,15 45,22 38,15" fill="#CE1126" opacity="0.5" />
            <polygon points="15,45 22,45 15,38" fill="#009639" opacity="0.5" />
            <polygon points="45,45 45,38 38,45" fill="#009639" opacity="0.5" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#sadu-pattern)"
          style={
            animate
              ? {
                  animation: "sadu-drift 20s linear infinite",
                }
              : undefined
          }
        />
      </svg>
    </div>
  );
}
