"use client";

import { useState } from "react";
import { CardBack, CardFace } from "@/components/CardArt";
import Guide from "@/components/Guide";
import Scene from "@/components/Scene";
import { MBTI_TYPES, TEMPERAMENT, temperamentOf, type Blood } from "@/lib/profile";
import { POSITIONS, buildReading, shuffleDeck, type Drawn, type Profile, type Reading } from "@/lib/reading";
import { themeFor } from "@/lib/theme";

type Stage = "form" | "draw" | "result";

const field = "w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-[var(--gold)]";
const primary = "w-full rounded-xl bg-[var(--gold)] py-3 font-bold text-black disabled:opacity-40";

export default function App() {
  const [stage, setStage] = useState<Stage>("form");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [deck, setDeck] = useState<Drawn[]>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const [reading, setReading] = useState<Reading | null>(null);

  function go(next: Stage) {
    setStage(next);
    window.scrollTo(0, 0);
  }

  function startDraw(p: Profile) {
    setProfile(p);
    setDeck(shuffleDeck());
    setPicked([]);
    go("draw");
  }

  function finish() {
    if (!profile) return;
    setReading(buildReading(profile, picked.map((i) => deck[i])));
    go("result");
  }

  const introTheme = themeFor(null, "dusk", "summer");

  return (
    <main className="relative flex min-h-full flex-1 flex-col">
      {stage === "result" && reading ? (
        <ResultView reading={reading} onRestart={() => go("form")} />
      ) : (
        <>
          <Scene theme={introTheme} mood="dusk" season="summer" eye={150} presentCard={null} />
          <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-16 pt-12 text-center">
            <p className="mb-3 text-sm tracking-[0.35em] text-[var(--gold)]">FIVE KEYS READING</p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              다섯 개의 열쇠로 여는
              <br />
              <span className="text-[var(--gold-bright)]">오늘의 나</span>
            </h1>
            <p className="mt-4 max-w-md text-white/70">MBTI · 혈액형 · 키 · 나이 · 타로 세 장. 다섯 가지를 하나로 엮어 지금의 당신을 읽어드립니다.</p>
            <div className="mt-10 w-full">
              {stage === "form" ? <ProfileForm onDone={startDraw} /> : <DrawTable deck={deck} picked={picked} setPicked={setPicked} onDone={finish} />}
            </div>
          </section>
          <footer className="mt-auto border-t border-white/10 bg-black/60 py-6 text-center text-xs text-white/40">
            재미로 보는 참고용 리딩입니다. 입력한 정보는 저장하거나 전송하지 않습니다.
          </footer>
        </>
      )}
    </main>
  );
}

function ProfileForm({ onDone }: { onDone: (p: Profile) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState<string[]>(["", "", "", ""]);
  const [noMbti, setNoMbti] = useState(false);
  const [blood, setBlood] = useState<Blood | null>(null);
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");

  const questions = ["당신을 뭐라고 부르면 될까요?", "당신의 MBTI는 무엇인가요?", "혈액형을 알려주세요.", "키와 나이를 알려주세요."];
  const mbtiDone = noMbti || mbti.every(Boolean);
  const h = Number(height);
  const a = Number(age);
  const bodyValid = h >= 100 && h <= 230 && a >= 1 && a <= 120;

  function submit() {
    onDone({
      name: name.trim(),
      mbti: noMbti ? null : mbti.join(""),
      blood,
      height: Math.round(h),
      age: Math.round(a),
    });
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-black/55 p-6 text-left backdrop-blur-md">
      <div className="mb-5 flex gap-1.5">
        {questions.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-[var(--gold)]" : "bg-white/15"}`} />
        ))}
      </div>
      <p key={step} className="rise mb-5 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 font-serif text-lg text-[var(--gold-bright)]">
        {questions[step]}
      </p>

      {step === 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) setStep(1);
          }}
          className="flex gap-2"
        >
          <input id="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={20} placeholder="이름 또는 별명" className={field} />
          <button className="shrink-0 rounded-xl bg-[var(--gold)] px-5 font-bold text-black disabled:opacity-40" disabled={!name.trim()}>
            다음
          </button>
        </form>
      )}

      {step === 1 && (
        <div className="space-y-3">
          {[
            ["E", "I", "외향", "내향"],
            ["S", "N", "감각", "직관"],
            ["T", "F", "사고", "감정"],
            ["J", "P", "판단", "인식"],
          ].map(([x, y, xl, yl], i) => (
            <div key={x} className="grid grid-cols-2 gap-2">
              {[
                [x, xl],
                [y, yl],
              ].map(([v, label]) => (
                <button
                  key={v}
                  disabled={noMbti}
                  onClick={() => setMbti(mbti.map((m, j) => (j === i ? v : m)))}
                  className={`rounded-xl border py-2.5 disabled:opacity-30 ${mbti[i] === v && !noMbti ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold-bright)]" : "border-white/15 text-white/80"}`}
                >
                  <b>{v}</b> <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input id="no-mbti" type="checkbox" checked={noMbti} onChange={(e) => setNoMbti(e.target.checked)} /> 잘 모르겠어요
          </label>
          {mbtiDone && !noMbti && (
            <p className="text-sm text-white/70">
              {mbti.join("")} · {MBTI_TYPES[mbti.join("")].nick} ({TEMPERAMENT[temperamentOf(mbti.join(""))!].name})
            </p>
          )}
          <button onClick={() => setStep(2)} disabled={!mbtiDone} className={primary}>
            다음
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-5 gap-2">
          {(["A", "B", "O", "AB"] as Blood[]).map((b) => (
            <button
              key={b}
              onClick={() => {
                setBlood(b);
                setStep(3);
              }}
              className="rounded-xl border border-white/20 py-4 text-lg font-bold text-white hover:bg-white/10"
            >
              {b}
            </button>
          ))}
          <button
            onClick={() => {
              setBlood(null);
              setStep(3);
            }}
            className="rounded-xl border border-white/20 py-4 text-sm text-white/70 hover:bg-white/10"
          >
            모름
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm text-white/70">
              키 (cm)
              <input id="height" inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value.replace(/\D/g, ""))} placeholder="예: 168" className={`${field} mt-1`} />
            </label>
            <label className="text-sm text-white/70">
              나이 (만)
              <input id="age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))} placeholder="예: 29" className={`${field} mt-1`} />
            </label>
          </div>
          <p className="text-xs text-white/50">키는 배경 속 지평선을 내 눈높이에 맞추는 데, 나이는 인생의 계절을 고르는 데 씁니다.</p>
          {(height || age) && !bodyValid && <p className="text-sm text-red-300">키는 100~230cm, 나이는 1~120세 사이로 입력해 주세요.</p>}
          <button onClick={submit} disabled={!bodyValid} className={primary}>
            카드 뽑으러 가기
          </button>
        </div>
      )}

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-white/50 hover:text-white/80">
          ← 이전
        </button>
      )}
    </div>
  );
}

function DrawTable({ deck, picked, setPicked, onDone }: { deck: Drawn[]; picked: number[]; setPicked: (p: number[]) => void; onDone: () => void }) {
  const done = picked.length === 3;
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/15 bg-black/55 p-5 backdrop-blur-md">
      <p className="font-serif text-lg text-[var(--gold-bright)]">
        {done ? "세 장이 모두 모였습니다." : `마음이 가는 카드를 골라주세요 (${picked.length}/3)`}
      </p>
      <p className="mt-1 text-sm text-white/60">첫 장은 과거, 둘째 장은 현재, 셋째 장은 미래를 말해줍니다.</p>

      <div className="mt-5 flex min-h-[150px] justify-center gap-3">
        {POSITIONS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="flip h-[150px] w-[90px]" data-flipped={picked[i] !== undefined}>
              <div className="flip-inner">
                <div className="flip-front grid place-items-center rounded-lg border border-dashed border-white/25 text-xs text-white/40">{label}</div>
                <div className="flip-back">{picked[i] !== undefined && <CardFace card={deck[picked[i]].card} reversed={deck[picked[i]].reversed} accent="#8a6a1f" width={90} />}</div>
              </div>
            </div>
            <span className="text-xs text-white/60">{label}</span>
          </div>
        ))}
      </div>

      {!done && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {deck.map((d, i) => {
            const order = picked.indexOf(i);
            return (
              <button
                key={d.card.no}
                aria-label={`카드 ${i + 1}`}
                disabled={order >= 0}
                onClick={() => setPicked([...picked, i])}
                className="deal transition-transform hover:-translate-y-2 disabled:opacity-20"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <CardBack width={52} />
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        {picked.length > 0 && !done && (
          <button onClick={() => setPicked(picked.slice(0, -1))} className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white/70">
            한 장 되돌리기
          </button>
        )}
        {done && (
          <button onClick={onDone} className={`${primary} rise`}>
            리딩 보기
          </button>
        )}
      </div>
    </div>
  );
}

function ResultView({ reading, onRestart }: { reading: Reading; onRestart: () => void }) {
  const { profile, drawn, temperament, mood, season, eye, lucky, sections, harmony } = reading;
  const theme = themeFor(temperament, mood, season);
  const temp = temperament ? TEMPERAMENT[temperament] : null;
  const [copied, setCopied] = useState("결과 복사하기");
  const MOOD_LINE = {
    bright: "카드가 환하게 웃고 있어요. 오늘은 당신 편입니다.",
    dusk: "빛과 그림자가 함께 있네요. 천천히 읽어볼까요?",
    dark: "조금 어두운 밤이에요. 그래도 길은 분명히 있습니다.",
  };

  function copy() {
    const text = `${profile.name}님의 다섯 열쇠 리딩\n${drawn.map((d, i) => `${POSITIONS[i]}: ${d.card.name}${d.reversed ? "(역)" : ""}`).join(" / ")}\n조화 지수 ${harmony}점 · 행운의 숫자 ${lucky.number}\n${sections[0].body.join(" ")}`;
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied("복사됨"))
      .catch(() => setCopied("복사할 수 없음"))
      .finally(() => setTimeout(() => setCopied("결과 복사하기"), 2000));
  }

  return (
    <>
      <Scene theme={theme} mood={mood} season={season} eye={eye} presentCard={drawn[1].card.no} />
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <button onClick={onRestart} className="text-sm hover:underline" style={{ color: theme.sub }}>
          ← 처음부터 다시
        </button>

        <section className="rise mt-4 flex flex-col items-center text-center">
          <Guide temperament={temperament} mood={mood} glow={theme.glow} size={170} />
          <p className="mt-2 text-xs tracking-[0.3em]" style={{ color: theme.accent }}>
            {theme.label}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold" style={{ color: theme.ink }}>
            {temp ? temp.guide : "안개 속 길잡이"}의 리딩
          </h1>
          <p className="mt-3 rounded-2xl px-5 py-3 font-serif text-lg" style={{ background: theme.card, color: theme.accent }}>
            “{profile.name}님, {MOOD_LINE[mood]}”
          </p>
        </section>

        <section className="rise mt-8 flex justify-center gap-3 sm:gap-6">
          {drawn.map((d, i) => (
            <div key={d.card.no} className="flex flex-col items-center gap-2">
              <CardFace card={d.card} reversed={d.reversed} accent="#8a6a1f" width={104} />
              <span className="rounded-full px-3 py-0.5 text-xs font-bold" style={{ background: theme.card, color: theme.ink }}>
                {POSITIONS[i]}
              </span>
            </div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["조화 지수", `${harmony}점`],
            ["행운의 숫자", String(lucky.number)],
            ["행운의 색", lucky.color],
            ["행운 키워드", lucky.keyword],
          ].map(([k, v]) => (
            <div key={k} className="rise rounded-2xl p-4 text-center backdrop-blur-md" style={{ background: theme.card }}>
              <p className="text-xs" style={{ color: theme.sub }}>
                {k}
              </p>
              <p className="mt-1 font-serif text-xl font-bold" style={{ color: theme.ink }}>
                {v}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6 space-y-4">
          {sections.map((s, i) => (
            <article key={s.key} className="rise rounded-3xl p-6 backdrop-blur-md" style={{ background: theme.card, animationDelay: `${Math.min(i, 8) * 0.06}s` }}>
              <h2 className="font-serif text-xl font-bold" style={{ color: theme.ink }}>
                {s.title}
              </h2>
              <div className="mt-3 space-y-2 leading-7" style={{ color: theme.ink, opacity: 0.88 }}>
                {s.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
          <p className="rounded-2xl px-5 py-3 text-sm backdrop-blur-md" style={{ background: theme.card, color: theme.sub }}>
            오늘의 행운 아이템은 <b style={{ color: theme.ink }}>{lucky.item}</b>입니다.
          </p>
        </section>

        <div className="mt-10 flex justify-center gap-3">
          <button onClick={copy} className="rounded-xl bg-[var(--gold)] px-6 py-3 font-bold text-black">
            {copied}
          </button>
          <button onClick={onRestart} className="rounded-xl border border-[var(--gold)]/60 bg-black/50 px-6 py-3 font-bold text-[var(--gold-bright)]">
            다시 뽑기
          </button>
        </div>
        <p className="mt-6 text-center text-xs" style={{ color: theme.sub }}>
          재미로 보는 참고용 리딩입니다.
        </p>
      </div>
    </>
  );
}
