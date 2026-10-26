import type { Season, Temperament } from "./profile";
import type { Mood } from "./reading";

export interface Theme {
  skyTop: string;
  skyBottom: string;
  ground: string;
  glow: string;
  accent: string;
  card: string;
  ink: string;
  sub: string;
  stars: boolean;
  fog: number;
  label: string;
}

type Key = Temperament | "none";

// 기질별 기본 색 (밝음 / 황혼 / 어둠)
const PALETTE: Record<Key, Record<Mood, [string, string, string, string]>> = {
  NT: { bright: ["#b9a8ff", "#f3eaff", "#7d68c9", "#4a2fa8"], dusk: ["#1c1440", "#8a5fb5", "#2c1f52", "#d9c8ff"], dark: ["#06040f", "#1d1433", "#0b0718", "#a996e6"] },
  NF: { bright: ["#8fe0e0", "#eefcf8", "#4fa9a3", "#0f5e63"], dusk: ["#0f2a3e", "#5a9aa8", "#143447", "#bff0ea"], dark: ["#020a10", "#0d2230", "#03121b", "#7fc8c4"] },
  SJ: { bright: ["#ffd78f", "#fff6e2", "#c9a05a", "#7a4a0c"], dusk: ["#2d1d12", "#c98a4b", "#3a2616", "#ffd9a0"], dark: ["#0b0704", "#2a1b0f", "#100a05", "#e2b678"] },
  SP: { bright: ["#ffab8f", "#fff0e6", "#d9705a", "#8a2412"], dusk: ["#2e0f1c", "#d9654a", "#3d1420", "#ffc3a8"], dark: ["#0e0306", "#2e0a10", "#140407", "#ff8f73"] },
  none: { bright: ["#c4d0de", "#f5f7fa", "#8b99ab", "#2e3a4a"], dusk: ["#1b2230", "#7d8aa0", "#232b3a", "#dbe3ef"], dark: ["#05070b", "#171c26", "#080a10", "#aeb9ca"] },
};

const MOOD_NAME: Record<Mood, string> = { bright: "밝음", dusk: "황혼", dark: "어둠" };
const SEASON_NAME: Record<Season, string> = { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" };

export function themeFor(t: Temperament | null, mood: Mood, season: Season): Theme {
  const [skyTop, skyBottom, ground, accent] = PALETTE[t ?? "none"][mood];
  const light = mood === "bright";
  return {
    skyTop,
    skyBottom,
    ground,
    glow: light ? "#fff8d6" : mood === "dusk" ? "#ffe2b0" : "#cfd6ff",
    accent,
    card: light ? "rgba(255,255,255,0.8)" : "rgba(10,8,20,0.62)",
    ink: light ? "#1b1726" : "#f4f1ff",
    sub: light ? "#4d4760" : "rgba(244,241,255,0.68)",
    stars: !light,
    fog: mood === "dark" ? 0.45 : 0,
    label: `${SEASON_NAME[season]} · ${MOOD_NAME[mood]}`,
  };
}
