import { ROMAN, type TarotCard } from "@/lib/tarot";

// 카드마다 고유한 상징을 단순한 도형으로 그린다 (100x100 좌표계)
export function CardSymbol({ no, color }: { no: number; color: string }) {
  const s = { stroke: color, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const f = { fill: color };
  const rays = (cx: number, cy: number, r1: number, r2: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return <line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} {...s} />;
    });
  const star = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.42 : r;
      return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
    }).join(" ");
    return <polygon points={pts} {...f} />;
  };

  switch (no) {
    case 0: // 바보: 절벽 끝의 발걸음과 해
      return (<g><circle cx="72" cy="28" r="10" {...s} /><path d="M10 80 H55 L62 95" {...s} /><path d="M40 72 l8 -18 l8 18 M48 54 v-10" {...s} /><circle cx="48" cy="38" r="5" {...f} /></g>);
    case 1: // 마법사: 무한대와 지팡이
      return (<g><path d="M30 30 C20 20 20 40 30 30 C40 20 60 40 70 30 C80 20 80 40 70 30 C60 20 40 40 30 30Z" {...s} /><line x1="50" y1="45" x2="50" y2="90" {...s} /><circle cx="50" cy="45" r="4" {...f} /></g>);
    case 2: // 여사제: 두 기둥과 초승달
      return (<g><rect x="18" y="25" width="10" height="65" {...s} /><rect x="72" y="25" width="10" height="65" {...s} /><path d="M58 40 a14 14 0 1 1 -10 -20 a10 10 0 1 0 10 20Z" {...f} /></g>);
    case 3: // 여황제: 밀 이삭과 원
      return (<g><circle cx="50" cy="35" r="14" {...s} /><path d="M50 50 V92 M50 62 l-10 -8 M50 62 l10 -8 M50 74 l-10 -8 M50 74 l10 -8" {...s} /></g>);
    case 4: // 황제: 왕관과 옥좌
      return (<g><path d="M28 40 L36 22 L50 34 L64 22 L72 40Z" {...s} /><rect x="30" y="50" width="40" height="40" {...s} /><line x1="30" y1="66" x2="70" y2="66" {...s} /></g>);
    case 5: // 교황: 세 겹 십자
      return (<g><line x1="50" y1="15" x2="50" y2="90" {...s} /><line x1="38" y1="28" x2="62" y2="28" {...s} /><line x1="34" y1="40" x2="66" y2="40" {...s} /><line x1="30" y1="52" x2="70" y2="52" {...s} /></g>);
    case 6: // 연인: 겹친 두 마음
      return (<g><path d="M38 70 C15 52 22 30 38 40 C54 30 61 52 38 70Z" {...s} /><path d="M62 70 C39 52 46 30 62 40 C78 30 85 52 62 70Z" {...s} />{star(50, 18, 7)}</g>);
    case 7: // 전차: 바퀴 달린 수레
      return (<g><rect x="25" y="35" width="50" height="30" rx="4" {...s} /><circle cx="33" cy="75" r="9" {...s} /><circle cx="67" cy="75" r="9" {...s} />{star(50, 22, 8)}</g>);
    case 8: // 힘: 사자 갈기와 무한대
      return (<g><circle cx="50" cy="60" r="14" {...s} />{rays(50, 60, 18, 28, 14)}<path d="M38 22 C32 16 32 28 38 22 C44 16 56 28 62 22 C68 16 68 28 62 22 C56 16 44 28 38 22Z" {...s} /></g>);
    case 9: // 은둔자: 등불
      return (<g><line x1="50" y1="12" x2="50" y2="28" {...s} /><path d="M38 28 H62 L58 62 H42Z" {...s} />{star(50, 44, 9)}<line x1="44" y1="62" x2="44" y2="90" {...s} /></g>);
    case 10: // 운명의 수레바퀴
      return (<g><circle cx="50" cy="52" r="32" {...s} /><circle cx="50" cy="52" r="10" {...s} />{rays(50, 52, 10, 32, 8)}</g>);
    case 11: // 정의: 저울
      return (<g><line x1="50" y1="15" x2="50" y2="88" {...s} /><line x1="22" y1="30" x2="78" y2="30" {...s} /><path d="M14 55 L22 30 L30 55Z M70 55 L78 30 L86 55Z" {...s} /><line x1="36" y1="88" x2="64" y2="88" {...s} /></g>);
    case 12: // 매달린 사람: 거꾸로 선 삼각과 후광
      return (<g><line x1="20" y1="18" x2="80" y2="18" {...s} /><line x1="50" y1="18" x2="50" y2="40" {...s} /><path d="M35 40 H65 L50 70Z" {...s} /><circle cx="50" cy="80" r="9" {...f} /></g>);
    case 13: // 죽음: 지는 해와 장미
      return (<g><path d="M10 70 H90" {...s} /><path d="M30 70 a20 20 0 0 1 40 0" {...s} /><circle cx="50" cy="40" r="6" {...f} /><path d="M50 46 V58 M44 52 H56" {...s} /></g>);
    case 14: // 절제: 두 잔 사이의 물줄기
      return (<g><path d="M20 30 H40 L36 50 H24Z M60 55 H80 L76 75 H64Z" {...s} /><path d="M38 45 C50 50 55 55 64 60" {...s} />{star(50, 20, 6)}</g>);
    case 15: // 악마: 사슬
      return (<g><ellipse cx="35" cy="45" rx="12" ry="8" {...s} /><ellipse cx="50" cy="55" rx="12" ry="8" {...s} /><ellipse cx="65" cy="65" rx="12" ry="8" {...s} /><path d="M30 20 L38 32 M70 20 L62 32" {...s} /></g>);
    case 16: // 탑: 번개 맞은 탑
      return (<g><path d="M35 90 V35 H65 V90" {...s} /><path d="M32 35 L50 20 L68 35" {...s} /><path d="M78 8 L60 32 H70 L54 52" {...s} /></g>);
    case 17: // 별
      return (<g>{star(50, 40, 22)}{star(22, 70, 7)}{star(78, 70, 7)}{star(50, 82, 6)}</g>);
    case 18: // 달
      return (<g><path d="M62 22 a26 26 0 1 0 0 52 a20 20 0 1 1 0 -52Z" {...f} /><path d="M15 90 Q30 80 45 90 T75 90 T95 90" {...s} /></g>);
    case 19: // 태양
      return (<g><circle cx="50" cy="50" r="16" {...f} />{rays(50, 50, 22, 36, 12)}</g>);
    case 20: // 심판: 나팔과 빛
      return (<g><path d="M20 70 L65 35 L72 45 L30 78Z" {...s} /><path d="M65 35 L84 22 L86 52 L72 45" {...s} />{rays(80, 30, 10, 16, 6)}</g>);
    case 21: // 세계: 월계관
      return (<g><ellipse cx="50" cy="52" rx="24" ry="34" {...s} /><ellipse cx="50" cy="52" rx="16" ry="26" {...s} />{star(50, 52, 9)}</g>);
    default:
      return null;
  }
}

export function CardFace({ card, reversed, accent, width = 120 }: { card: TarotCard; reversed: boolean; accent: string; width?: number }) {
  return (
    <svg viewBox="0 0 120 200" width={width} height={(width * 200) / 120} role="img" aria-label={`${card.name}${reversed ? " 역방향" : ""}`}>
      <rect x="2" y="2" width="116" height="196" rx="10" fill="#fbf6ea" stroke={accent} strokeWidth="3" />
      <rect x="9" y="9" width="102" height="182" rx="6" fill="none" stroke={accent} strokeOpacity="0.45" />
      <text x="60" y="30" textAnchor="middle" fontSize="13" fill={accent} fontWeight="700">{ROMAN[card.no]}</text>
      <g transform={reversed ? "rotate(180 60 100)" : undefined}>
        <g transform="translate(10 50)">
          <CardSymbol no={card.no} color={accent} />
        </g>
      </g>
      <text x="60" y="172" textAnchor="middle" fontSize="15" fill="#2a2338" fontWeight="700">{card.name}</text>
      <text x="60" y="186" textAnchor="middle" fontSize="8.5" fill="#6b6280">{card.en}{reversed ? " · 역" : ""}</text>
    </svg>
  );
}

export function CardBack({ width = 60, accent = "#d4af37" }: { width?: number; accent?: string }) {
  return (
    <svg viewBox="0 0 120 200" width={width} height={(width * 200) / 120} aria-hidden>
      <rect x="2" y="2" width="116" height="196" rx="10" fill="#1a1430" stroke={accent} strokeWidth="3" />
      <rect x="12" y="12" width="96" height="176" rx="6" fill="none" stroke={accent} strokeOpacity="0.5" />
      <circle cx="60" cy="100" r="30" fill="none" stroke={accent} strokeOpacity="0.8" strokeWidth="2" />
      <path d="M60 70 L68 100 L60 130 L52 100Z M30 100 L60 92 L90 100 L60 108Z" fill={accent} fillOpacity="0.7" />
    </svg>
  );
}
