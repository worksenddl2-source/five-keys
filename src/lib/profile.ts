import type { CardElement } from "./tarot";

export type Temperament = "NT" | "NF" | "SJ" | "SP";
export type Blood = "A" | "B" | "O" | "AB";
export type Season = "spring" | "summer" | "autumn" | "winter";

export function temperamentOf(mbti: string | null): Temperament | null {
  if (!mbti) return null;
  if (mbti[1] === "N") return mbti[2] === "T" ? "NT" : "NF";
  return mbti[3] === "J" ? "SJ" : "SP";
}

export const TEMPERAMENT: Record<Temperament, { name: string; guide: string; element: CardElement; trait: string; advice: string }> = {
  NT: { name: "분석가", guide: "별을 재는 현자", element: "air", trait: "원리를 파고들고 더 나은 방법을 설계하는", advice: "답을 찾는 속도만큼, 남에게 설명하는 친절도 챙기면 길이 넓어집니다." },
  NF: { name: "외교관", guide: "달빛 시인", element: "water", trait: "의미를 찾고 사람의 마음을 읽어내는", advice: "남의 마음을 살피는 만큼 내 마음에도 같은 다정함을 나눠주세요." },
  SJ: { name: "관리자", guide: "등불지기", element: "earth", trait: "약속을 지키고 주변을 단단히 받쳐주는", advice: "익숙한 길 밖으로 한 걸음만 나가 보면 뜻밖의 즐거움을 만납니다." },
  SP: { name: "탐험가", guide: "불꽃 방랑자", element: "fire", trait: "지금 이 순간을 살고 몸으로 부딪혀 배우는", advice: "타오르는 열정에 작은 계획 하나만 더하면 불꽃이 오래 갑니다." },
};

// 기질을 모를 때 쓰는 안내자
export const WANDERER = { name: "미지", guide: "안개 속 길잡이", element: "air" as CardElement, trait: "아직 스스로를 정의하지 않은 열린", advice: "정해진 틀이 없다는 것은 어디로든 갈 수 있다는 뜻입니다." };

export const MBTI_TYPES: Record<string, { nick: string; line: string }> = {
  INTJ: { nick: "고독한 설계자", line: "멀리 내다보고 큰 그림을 그린 뒤, 조용히 하나씩 실현해 갑니다." },
  INTP: { nick: "끝없는 질문가", line: "‘왜?’라는 질문을 멈추지 않아 남들이 지나친 원리를 발견합니다." },
  ENTJ: { nick: "타고난 지휘관", line: "목표가 정해지면 사람과 자원을 모아 가장 빠른 길을 냅니다." },
  ENTP: { nick: "아이디어 발명가", line: "새로운 가능성을 보면 가만있지 못하고, 토론 속에서 답을 다듬습니다." },
  INFJ: { nick: "조용한 예언자", line: "사람의 속마음을 꿰뚫어 보고, 더 나은 세상을 묵묵히 그립니다." },
  INFP: { nick: "꿈꾸는 중재자", line: "자기만의 가치를 소중히 지키며, 상처받은 마음을 알아봅니다." },
  ENFJ: { nick: "다정한 이끔이", line: "사람들의 가능성을 믿어주고 함께 성장하는 길로 이끕니다." },
  ENFP: { nick: "자유로운 불씨", line: "어디서든 즐거움을 발견하고, 그 열기로 주변을 깨웁니다." },
  ISTJ: { nick: "믿음직한 기록가", line: "한번 맡은 일은 끝까지 해내고, 약속을 무엇보다 무겁게 여깁니다." },
  ISFJ: { nick: "따뜻한 수호자", line: "눈에 띄지 않는 곳에서 주변 사람들을 세심하게 챙깁니다." },
  ESTJ: { nick: "든든한 관리인", line: "질서와 규칙으로 혼란을 정리하고 일을 끝까지 굴러가게 합니다." },
  ESFJ: { nick: "모두의 집사", line: "분위기를 살피고 모두가 편안하도록 자리를 만듭니다." },
  ISTP: { nick: "조용한 장인", line: "손과 머리로 직접 부딪혀 보며 문제를 깔끔하게 해결합니다." },
  ISFP: { nick: "감성 예술가", line: "지금 이 순간의 아름다움을 누구보다 섬세하게 느낍니다." },
  ESTP: { nick: "현장의 승부사", line: "생각보다 몸이 먼저 움직이고, 위기에서 가장 빛납니다." },
  ESFP: { nick: "무대 위의 주인공", line: "어디서든 분위기를 살리고 사람들에게 웃음을 줍니다." },
};

export const BLOOD: Record<Blood, { style: string; item: string }> = {
  A: { style: "배려를 먼저 생각하고 관계를 조심스럽게 쌓아가는", item: "손글씨 메모" },
  B: { style: "마음 가는 대로 솔직하고 자유롭게 다가가는", item: "처음 가보는 골목" },
  O: { style: "넓은 품으로 사람을 모으고 앞장서 챙기는", item: "따뜻한 차 한 잔" },
  AB: { style: "적당한 거리에서 상대를 이해하고 담백하게 지내는", item: "좋아하는 음악 한 곡" },
};

const BLOOD_X_TEMP: Record<Temperament, string> = {
  NT: "말보다 결과로 마음을 보여주는 편이니, 가끔은 고맙다는 한마디를 소리 내어 해보세요.",
  NF: "상대의 감정을 깊이 받아들이는 편이니, 내 감정도 솔직하게 꺼내야 관계가 오래갑니다.",
  SJ: "꾸준함이 가장 큰 매력이라 시간이 갈수록 신뢰가 쌓이는 관계를 만듭니다.",
  SP: "함께 무언가를 해볼 때 가장 가까워지니, 말보다 같이 할 일을 제안해 보세요.",
};

export function relationLine(t: Temperament | null) {
  return t ? BLOOD_X_TEMP[t] : "어떤 사람과도 새롭게 관계의 모양을 만들어갈 수 있습니다.";
}

export function seasonOf(age: number): Season {
  if (age < 20) return "spring";
  if (age < 35) return "summer";
  if (age < 55) return "autumn";
  return "winter";
}

export const SEASON: Record<Season, { name: string; line: string; particle: string }> = {
  spring: { name: "봄", line: "씨앗이 싹을 틔우는 계절입니다. 무엇이든 배워두면 나중에 큰 나무가 됩니다. 실수도 거름이 되는 때입니다.", particle: "꽃잎" },
  summer: { name: "여름", line: "가장 뜨겁게 자라는 계절입니다. 시도한 만큼 가지가 뻗어나가니, 지금 하고 싶은 일을 미루지 마세요.", particle: "반딧불" },
  autumn: { name: "가을", line: "그동안 가꾼 것이 무르익는 계절입니다. 거둘 것을 거두고, 다음 계절을 위해 씨앗을 고르는 지혜가 빛납니다.", particle: "낙엽" },
  winter: { name: "겨울", line: "깊고 고요하게 쌓인 시간이 빛나는 계절입니다. 경험에서 나온 한마디가 누군가의 길을 밝혀줍니다.", particle: "눈송이" },
};

// 키는 평가하지 않고, 눈높이(키의 약 93%)에서 보이는 풍경으로만 쓴다
export function eyeLevel(heightCm: number) {
  return Math.round(heightCm * 0.93);
}

export function luckyNumber(heightCm: number, age: number) {
  const digits = String(heightCm + age).split("").reduce((a, b) => a + Number(b), 0);
  return (digits % 9) + 1;
}
