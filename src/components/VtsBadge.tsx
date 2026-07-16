export default function VtsBadge({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="drop-shadow-[0_0_14px_rgba(255,107,53,0.5)]"
      viewBox="0 0 220 220"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <filter id="navrough" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves={2} seed={9} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={6} />
        </filter>
      </defs>
      <g filter="url(#navrough)">
        <path
          d="M132 30 C170 24 208 54 214 96 C220 136 200 156 212 188 C222 214 194 228 170 220 C160 216 160 204 146 204 C118 204 100 228 76 216 C54 204 58 178 44 160 C30 142 42 114 62 100 C78 88 74 66 100 48 C112 40 122 34 132 30 Z"
          fill="var(--flame)"
          opacity={0.85}
        />
        <polygon points="110,16 189,58 189,146 110,190 31,146 31,58" fill="none" stroke="var(--paper)" strokeWidth={6} />
      </g>
      <text
        x="110"
        y="128"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight={900}
        fontSize={82}
        fill="var(--paper)"
        stroke="var(--ink-black)"
        strokeWidth={5}
        paintOrder="stroke"
      >
        VTS
      </text>
    </svg>
  );
}
