export type CardElement = "fire" | "water" | "air" | "earth";
export type CardWeight = "light" | "neutral" | "heavy";

export interface TarotCard {
  no: number;
  name: string;
  en: string;
  element: CardElement;
  weight: CardWeight;
  keyword: string; // 정방향 한 단어
  upright: string;
  reversed: string;
}

// 메이저 아르카나 22장. 해석 문장은 모두 이 서비스용으로 직접 작성했다.
export const TAROT: TarotCard[] = [
  { no: 0, name: "바보", en: "The Fool", element: "air", weight: "light", keyword: "새 출발", upright: "계산보다 설렘이 앞서는 시기입니다. 준비가 덜 된 것 같아도 첫발을 떼는 순간 길이 보입니다.", reversed: "들뜬 마음에 발밑을 보지 못할 수 있습니다. 떠나기 전 한 번만 더 짐을 확인하세요." },
  { no: 1, name: "마법사", en: "The Magician", element: "air", weight: "light", keyword: "실행력", upright: "필요한 도구는 이미 손에 있습니다. 생각을 말과 행동으로 옮기면 그대로 현실이 됩니다.", reversed: "재주는 충분하지만 흩어져 있습니다. 한 가지에 힘을 모으면 다시 흐름이 생깁니다." },
  { no: 2, name: "여사제", en: "The High Priestess", element: "water", weight: "neutral", keyword: "직감", upright: "아직 말로 하지 않은 답이 마음속에 있습니다. 조용히 귀 기울이면 직감이 길을 알려줍니다.", reversed: "남의 목소리가 너무 커서 내 마음이 들리지 않습니다. 혼자만의 시간이 필요합니다." },
  { no: 3, name: "여황제", en: "The Empress", element: "earth", weight: "light", keyword: "풍요", upright: "돌본 만큼 자라나는 시기입니다. 사람도 일도 정성을 쏟은 곳에서 열매가 맺힙니다.", reversed: "남을 챙기느라 나를 비워두었습니다. 나를 먼저 채워야 다시 나눌 수 있습니다." },
  { no: 4, name: "황제", en: "The Emperor", element: "fire", weight: "neutral", keyword: "질서", upright: "기준을 세우고 책임을 지는 자리에 섭니다. 단단한 원칙이 주변에 안정을 줍니다.", reversed: "통제하려 할수록 마찰이 커집니다. 힘을 조금 내려놓으면 사람이 따라옵니다." },
  { no: 5, name: "교황", en: "The Hierophant", element: "earth", weight: "neutral", keyword: "배움", upright: "믿을 만한 스승이나 검증된 방법이 도움이 됩니다. 정해진 길을 따르는 것이 지름길입니다.", reversed: "익숙한 규칙이 더는 맞지 않습니다. 나만의 방식을 찾아도 괜찮습니다." },
  { no: 6, name: "연인", en: "The Lovers", element: "air", weight: "light", keyword: "선택", upright: "마음이 통하는 사람, 마음이 가는 길을 만납니다. 진심으로 고른 선택이 후회를 남기지 않습니다.", reversed: "머리와 마음이 다른 곳을 가리킵니다. 서두르지 말고 진짜 원하는 것을 먼저 확인하세요." },
  { no: 7, name: "전차", en: "The Chariot", element: "water", weight: "light", keyword: "전진", upright: "방향이 정해지면 거침없이 나아갑니다. 흔들리는 마음을 다잡는 것이 승리의 열쇠입니다.", reversed: "속도는 빠른데 방향이 흔들립니다. 잠시 멈춰 목적지를 다시 확인하세요." },
  { no: 8, name: "힘", en: "Strength", element: "fire", weight: "light", keyword: "부드러운 힘", upright: "큰소리보다 차분한 인내가 상황을 바꿉니다. 내 안의 두려움도 다정하게 다룰 수 있습니다.", reversed: "참아온 감정이 지쳐 있습니다. 약한 모습을 보여도 괜찮다고 스스로에게 말해주세요." },
  { no: 9, name: "은둔자", en: "The Hermit", element: "earth", weight: "neutral", keyword: "성찰", upright: "혼자 걷는 시간이 답을 줍니다. 작은 등불 하나면 충분히 다음 걸음이 보입니다.", reversed: "혼자 있는 시간이 고립으로 바뀌고 있습니다. 믿을 만한 한 사람에게 먼저 연락해 보세요." },
  { no: 10, name: "운명의 수레바퀴", en: "Wheel of Fortune", element: "fire", weight: "neutral", keyword: "전환점", upright: "흐름이 바뀌는 순간입니다. 뜻밖의 기회가 오면 망설이지 말고 올라타세요.", reversed: "잠시 바퀴가 아래로 내려갑니다. 지나가는 흐름이니 무리하지 말고 때를 기다리세요." },
  { no: 11, name: "정의", en: "Justice", element: "air", weight: "neutral", keyword: "균형", upright: "뿌린 대로 거두는 때입니다. 정직하게 쌓은 것이 공정하게 돌아옵니다.", reversed: "한쪽으로 기운 판단이 있습니다. 상대 입장에서 한 번 더 저울질해 보세요." },
  { no: 12, name: "매달린 사람", en: "The Hanged Man", element: "water", weight: "heavy", keyword: "관점 전환", upright: "멈춤이 손해처럼 느껴지지만 다른 각도로 볼 기회입니다. 거꾸로 보면 답이 보입니다.", reversed: "버티는 것만으로는 바뀌지 않습니다. 놓아야 할 것을 놓아야 다시 움직입니다." },
  { no: 13, name: "죽음", en: "Death", element: "water", weight: "heavy", keyword: "끝과 시작", upright: "한 장이 끝나야 다음 장이 열립니다. 오래된 것을 정리하면 새로운 자리가 생깁니다.", reversed: "끝내야 할 것을 붙잡고 있습니다. 미련을 내려놓는 용기가 필요합니다." },
  { no: 14, name: "절제", en: "Temperance", element: "fire", weight: "light", keyword: "조화", upright: "서로 다른 것을 알맞게 섞어 균형을 만듭니다. 서두르지 않는 꾸준함이 가장 큰 힘입니다.", reversed: "어느 한쪽으로 지나치게 쏠려 있습니다. 생활의 리듬부터 다시 맞춰 보세요." },
  { no: 15, name: "악마", en: "The Devil", element: "earth", weight: "heavy", keyword: "집착", upright: "벗어나고 싶은데 놓지 못하는 것이 있습니다. 그 사슬은 생각보다 느슨하다는 걸 기억하세요.", reversed: "오랫동안 묶여 있던 것에서 풀려나기 시작합니다. 작은 결심이 큰 자유가 됩니다." },
  { no: 16, name: "탑", en: "The Tower", element: "fire", weight: "heavy", keyword: "급변", upright: "예상치 못한 변화가 기존의 틀을 흔듭니다. 무너진 자리에 더 단단한 것을 세울 수 있습니다.", reversed: "변화를 미루느라 긴장이 쌓여 있습니다. 스스로 먼저 바꾸면 충격이 줄어듭니다." },
  { no: 17, name: "별", en: "The Star", element: "air", weight: "light", keyword: "희망", upright: "긴 밤 끝에 별이 뜹니다. 상처가 아물고 다시 꿈을 꿀 수 있는 시기입니다.", reversed: "희망을 잠시 잊고 있습니다. 작은 목표 하나를 이루며 빛을 되찾아 보세요." },
  { no: 18, name: "달", en: "The Moon", element: "water", weight: "heavy", keyword: "불확실", upright: "길이 흐릿하고 마음이 불안합니다. 확실해질 때까지 큰 결정은 미루는 편이 좋습니다.", reversed: "안개가 걷히기 시작합니다. 헷갈리던 일의 진실이 서서히 드러납니다." },
  { no: 19, name: "태양", en: "The Sun", element: "fire", weight: "light", keyword: "성공", upright: "모든 것이 환하게 드러나는 날입니다. 자신감이 가장 큰 행운을 불러옵니다.", reversed: "빛은 있지만 구름이 조금 끼었습니다. 기대를 낮추면 작은 기쁨이 더 크게 다가옵니다." },
  { no: 20, name: "심판", en: "Judgement", element: "fire", weight: "neutral", keyword: "부름", upright: "지나온 시간을 돌아보고 다음 단계로 부름을 받습니다. 미뤄둔 결심을 할 때입니다.", reversed: "스스로를 너무 엄하게 판단하고 있습니다. 과거의 나를 용서해야 앞으로 나아갑니다." },
  { no: 21, name: "세계", en: "The World", element: "earth", weight: "light", keyword: "완성", upright: "한 바퀴를 무사히 돌아 완성에 이릅니다. 그동안의 노력이 온전한 결실로 돌아옵니다.", reversed: "마무리 직전에서 멈춰 있습니다. 마지막 조각 하나만 채우면 됩니다." },
];

export const ELEMENT_KO: Record<CardElement, string> = { fire: "불", water: "물", air: "바람", earth: "흙" };

export const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
