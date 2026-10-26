import type { Season } from "@/lib/profile";
import type { Mood } from "@/lib/reading";
import type { Theme } from "@/lib/theme";
import { CardSymbol } from "./CardArt";

function seeded(n: number) {
  let x = 7654321;
  return Array.from({ length: n }, () => {
    x = (x * 16807) % 2147483647;
    return x / 2147483647;
  });
}
const R = seeded(300);

const PARTICLE: Record<Season, (i: number, color: string) => React.ReactNode> = {
  spring: (i) => <ellipse rx="5" ry="3" fill="#ffc6d9" opacity="0.85" transform={`rotate(${R[i] * 180})`} />,
  summer: (i) => <circle r={2 + R[i] * 2} fill="#fff59a" className="pulse" />,
  autumn: (i) => <path d="M0 -6 C6 -2 6 4 0 7 C-6 4 -6 -2 0 -6Z" fill={R[i] > 0.5 ? "#e0803a" : "#c9532b"} />,
  winter: () => <circle r="3" fill="#ffffff" opacity="0.9" />,
};

// 결과 배경: 하늘(기질×분위기) · 현재 카드 상징 · 눈높이 지평선(키) · 계절 입자(나이)
export default function Scene({ theme, mood, season, eye, presentCard }: { theme: Theme; mood: Mood; season: Season; eye: number; presentCard: number | null }) {
  // 눈높이가 높을수록 지평선이 화면 위쪽에 놓인다
  const horizon = Math.max(470, Math.min(650, 720 - (eye - 110) * 2.6));
  return (
    <svg className="fixed inset-0 -z-10 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.skyTop} />
          <stop offset="1" stopColor={theme.skyBottom} />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor={theme.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={theme.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#sky)" />
      {theme.stars &&
        Array.from({ length: 70 }, (_, i) => (
          <circle key={i} cx={R[i * 3] * 1200} cy={R[i * 3 + 1] * (horizon - 40)} r={0.6 + R[i * 3 + 2] * 1.5} fill={theme.glow} className="twinkle" style={{ animationDelay: `${(R[i * 3 + 2] * 4).toFixed(2)}s` }} />
        ))}
      <g className="float-slow">
        <circle cx="900" cy="180" r="150" fill="url(#glow)" />
        {presentCard !== null ? (
          <g transform="translate(820 100) scale(1.6)" opacity={mood === "bright" ? 0.35 : 0.75}>
            <CardSymbol no={presentCard} color={mood === "bright" ? theme.accent : theme.glow} />
          </g>
        ) : (
          <circle cx="900" cy="180" r="56" fill={theme.glow} />
        )}
      </g>
      <path d={`M0 ${horizon} Q300 ${horizon - 50} 600 ${horizon - 10} T1200 ${horizon - 20} V800 H0Z`} fill={theme.ground} opacity="0.75" />
      <path d={`M0 ${horizon + 60} Q400 ${horizon + 20} 800 ${horizon + 60} T1200 ${horizon + 50} V800 H0Z`} fill={theme.ground} />
      <line x1="0" y1={horizon} x2="1200" y2={horizon} stroke={theme.glow} strokeOpacity="0.25" strokeDasharray="6 10" />
      {Array.from({ length: 26 }, (_, i) => (
        <g key={i} className="fall" style={{ animationDelay: `${(R[100 + i] * 12).toFixed(2)}s`, animationDuration: `${10 + R[150 + i] * 10}s` }}>
          <g transform={`translate(${R[200 + i] * 1200} -20)`}>{PARTICLE[season](200 + i, theme.glow)}</g>
        </g>
      ))}
      {theme.fog > 0 && <rect className="drift" x="-200" y={horizon - 80} width="1600" height="400" fill={theme.skyBottom} opacity={theme.fog} />}
      {mood === "dark" && <rect width="1200" height="800" fill="url(#vignette)" />}
    </svg>
  );
}
