import {
  BLOOD,
  MBTI_TYPES,
  SEASON,
  TEMPERAMENT,
  WANDERER,
  eyeLevel,
  luckyNumber,
  relationLine,
  seasonOf,
  temperamentOf,
  type Blood,
  type Season,
  type Temperament,
} from "./profile";
import { ELEMENT_KO, TAROT, type CardElement, type TarotCard } from "./tarot";

export type Mood = "bright" | "dusk" | "dark";

export interface Profile {
  name: string;
  mbti: string | null;
  blood: Blood | null;
  height: number;
  age: number;
}

export interface Drawn {
  card: TarotCard;
  reversed: boolean;
}

export interface Section {
  key: string;
  title: string;
  body: string[];
}

export interface Reading {
  profile: Profile;
  drawn: Drawn[];
  temperament: Temperament | null;
  season: Season;
  mood: Mood;
  harmony: number;
  eye: number;
  lucky: { number: number; item: string; color: string; keyword: string };
  sections: Section[];
}

export const POSITIONS = ["과거", "현재", "미래"];

// 22장을 섞어서 돌려준다. 역방향 확률은 30%
export function shuffleDeck(rand: () => number = Math.random): Drawn[] {
  const deck = TAROT.map((card) => ({ card, reversed: rand() < 0.3 }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function cardScore({ card, reversed }: Drawn) {
  if (card.weight === "light") return reversed ? 0 : 2;
  if (card.weight === "heavy") return reversed ? 0 : -2;
  return reversed ? -1 : 1;
}

// 현재 카드에 두 배 가중치를 두어 화면 분위기를 정한다
function moodOf(drawn: Drawn[]): Mood {
  const score = cardScore(drawn[0]) + cardScore(drawn[1]) * 2 + cardScore(drawn[2]);
  return score >= 3 ? "bright" : score <= -2 ? "dark" : "dusk";
}

const COMPAT: Record<CardElement, Record<CardElement, number>> = {
  fire: { fire: 33, air: 25, earth: 15, water: 8 },
  air: { air: 33, fire: 25, water: 15, earth: 8 },
  water: { water: 33, earth: 25, air: 15, fire: 8 },
  earth: { earth: 33, water: 25, fire: 15, air: 8 },
};

const COLOR: Record<Temperament | "none", string> = { NT: "보라색", NF: "청록색", SJ: "호박색", SP: "다홍색", none: "은회색" };

export function buildReading(profile: Profile, drawn: Drawn[]): Reading {
  const temperament = temperamentOf(profile.mbti);
  const temp = temperament ? TEMPERAMENT[temperament] : WANDERER;
  const type = profile.mbti ? MBTI_TYPES[profile.mbti] : null;
  const season = seasonOf(profile.age);
  const mood = moodOf(drawn);
  const eye = eyeLevel(profile.height);
  const raw = drawn.reduce((sum, d) => sum + COMPAT[temp.element][d.card.element], 0);
  const harmony = Math.min(100, Math.round((raw * 100) / 99));
  const [, present, future] = drawn;
  const cardText = (d: Drawn) => (d.reversed ? d.card.reversed : d.card.upright);
  const cardLabel = (d: Drawn) => `${d.card.name}${d.reversed ? "(역방향)" : ""}`;
  const blood = profile.blood ? BLOOD[profile.blood] : null;

  const moodLine = {
    bright: "카드의 흐름이 밝은 쪽을 가리킵니다. 지금 마음먹은 일을 밀고 나가기 좋은 때입니다.",
    dusk: "빛과 그림자가 섞인 카드가 나왔습니다. 서두르기보다 흐름을 읽으며 한 걸음씩 가는 편이 좋습니다.",
    dark: "무게 있는 카드가 나왔습니다. 어두운 밤일수록 별이 잘 보이듯, 지금 정리한 것이 다음 빛이 됩니다.",
  }[mood];

  const sections: Section[] = [
    {
      key: "summary",
      title: "종합 리딩",
      body: [
        `${profile.name}님은 ${type ? `‘${type.nick}’, ` : ""}${temp.trait} ${temp.name}의 기질을 가졌습니다.`,
        `지금은 ‘${present.card.keyword}’의 카드가 앞에 놓여 있고, 그 너머로 ‘${future.card.keyword}’의 기운이 다가옵니다.`,
        moodLine,
      ],
    },
    ...drawn.map((d, i) => ({
      key: `card-${i}`,
      title: `${POSITIONS[i]} · ${cardLabel(d)}`,
      body: [cardText(d)],
    })),
    {
      key: "temperament",
      title: `기질 · ${profile.mbti ?? "아직 정하지 않음"}`,
      body: [
        type ? `${type.nick}: ${type.line}` : "MBTI를 정하지 않은 채로 왔습니다. 틀에 갇히지 않은 만큼 카드가 더 많은 이야기를 들려줍니다.",
        temp.advice,
      ],
    },
    {
      key: "relation",
      title: `관계 · ${profile.blood ? `${profile.blood}형` : "혈액형 모름"}`,
      body: [
        blood ? `사람을 대할 때는 ${blood.style} 편입니다.` : "정해진 틀 없이 상대에 따라 관계의 모양을 바꿀 줄 압니다.",
        relationLine(temperament),
        "혈액형 이야기는 재미로 보는 관계 스타일입니다.",
      ],
    },
    {
      key: "season",
      title: `인생의 계절 · ${SEASON[season].name}`,
      body: [`${profile.age}세의 ${profile.name}님은 지금 인생의 ${SEASON[season].name}을 지나고 있습니다.`, SEASON[season].line],
    },
    {
      key: "eye",
      title: `내 눈높이의 풍경 · ${eye}cm`,
      body: [
        `같은 하늘도 서 있는 자리마다 조금씩 다르게 보입니다. 배경의 지평선은 ${profile.name}님의 눈높이 ${eye}cm에 맞춰 그렸습니다.`,
        mood === "dark"
          ? "오늘은 고개를 들어 멀리 있는 불빛 하나를 찾아보세요. 방향을 잡는 데 그것이면 충분합니다."
          : "오늘은 평소보다 조금 멀리 보세요. 지나쳤던 기회가 시야에 들어옵니다.",
      ],
    },
    {
      key: "harmony",
      title: `조화 지수 · ${harmony}점`,
      body: [
        `${temp.name}의 기운(${ELEMENT_KO[temp.element]})과 뽑은 카드의 기운(${drawn.map((d) => ELEMENT_KO[d.card.element]).join("·")})을 맞춰 본 점수입니다.`,
        harmony >= 75
          ? "카드의 흐름이 타고난 기질과 잘 맞습니다. 평소 하던 방식대로 밀어붙여도 좋습니다."
          : harmony >= 50
            ? "기질과 카드가 적당히 어긋나 있어 새로운 시도에서 배울 것이 많습니다."
            : "지금 흐름은 평소의 나와 다른 방식을 요구합니다. 낯선 선택이 오히려 답이 될 수 있습니다.",
      ],
    },
  ];

  return {
    profile,
    drawn,
    temperament,
    season,
    mood,
    harmony,
    eye,
    lucky: {
      number: luckyNumber(profile.height, profile.age),
      item: blood?.item ?? "주머니 속 작은 동전",
      color: COLOR[temperament ?? "none"],
      keyword: future.card.keyword,
    },
    sections,
  };
}
