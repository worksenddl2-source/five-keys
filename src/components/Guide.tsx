import type { Temperament } from "@/lib/profile";
import type { Mood } from "@/lib/reading";

const ROBE: Record<Temperament | "none", string> = { NT: "#5b3fc4", NF: "#1f7f86", SJ: "#a8701f", SP: "#b8331f", none: "#55606f" };

// 기질별 안내자: 같은 망토 실루엣에 손에 든 물건이 다르다
export default function Guide({ temperament, mood, glow, size = 180 }: { temperament: Temperament | null; mood: Mood; glow: string; size?: number }) {
  const key = temperament ?? "none";
  const robe = ROBE[key];
  const eye = mood === "dark" ? "#ff6a4d" : glow;
  const id = `guide-${key}-${mood}`;
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" className="float" aria-hidden>
      <defs>
        <radialGradient id={`${id}-aura`}>
          <stop offset="0" stopColor={glow} stopOpacity={mood === "dark" ? 0.7 : 0.45} />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-robe`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={robe} />
          <stop offset="1" stopColor="#0b0b14" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="110" r="100" fill={`url(#${id}-aura)`} className="pulse" />
      <path d="M100 52 C64 52 54 92 56 120 L34 230 H166 L144 120 C146 92 136 52 100 52Z" fill={`url(#${id}-robe)`} />
      <path d="M100 40 C70 40 58 70 60 104 C74 92 126 92 140 104 C142 70 130 40 100 40Z" fill={robe} />
      <ellipse cx="100" cy="98" rx="30" ry="26" fill="#07070c" />
      {mood === "bright" ? (
        <g stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M86 98 Q90 92 94 98" />
          <path d="M106 98 Q110 92 114 98" />
        </g>
      ) : mood === "dusk" ? (
        <g stroke={eye} strokeWidth="3" strokeLinecap="round">
          <line x1="85" y1="98" x2="94" y2="98" />
          <line x1="106" y1="98" x2="115" y2="98" />
        </g>
      ) : (
        <g fill={eye} className="pulse">
          <path d="M84 96 L95 99 L84 101Z" />
          <path d="M116 96 L105 99 L116 101Z" />
        </g>
      )}
      {key === "NT" && (
        <g stroke={glow} strokeWidth="2.5" fill="none">
          <circle cx="100" cy="162" r="20" />
          <ellipse cx="100" cy="162" rx="20" ry="7" />
          <ellipse cx="100" cy="162" rx="7" ry="20" />
        </g>
      )}
      {key === "NF" && <path d="M110 145 a20 20 0 1 0 0 36 a15 15 0 1 1 0 -36Z" fill={glow} />}
      {key === "SJ" && (
        <g>
          <line x1="100" y1="132" x2="100" y2="142" stroke={glow} strokeWidth="3" />
          <path d="M86 142 H114 L110 178 H90Z" fill={glow} fillOpacity="0.9" />
          <circle cx="100" cy="160" r="6" fill="#fff" className="pulse" />
        </g>
      )}
      {key === "SP" && (
        <path className="flicker" style={{ transformOrigin: "100px 182px" }} d="M100 182 C82 170 92 152 88 138 C100 150 104 140 102 128 C120 146 118 172 100 182Z" fill={glow} />
      )}
      {key === "none" && <circle cx="100" cy="162" r="18" fill={glow} fillOpacity="0.5" className="pulse" />}
    </svg>
  );
}
