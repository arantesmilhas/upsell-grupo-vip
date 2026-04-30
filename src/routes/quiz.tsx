import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Clube VIP Infinity Paper" },
      {
        name: "description",
        content:
          "Descubra em 3 perguntinhas rápidas se o Clube VIP Infinity Paper combina com você.",
      },
      { property: "og:title", content: "Quiz — Clube VIP Infinity Paper" },
      {
        property: "og:description",
        content: "3 perguntinhas rápidas para descobrir seu match com o clube.",
      },
    ],
  }),
  component: QuizPage,
});

type Option = { emoji: string; label: string };
type Question = { title: string; subtitle: string; options: Option[] };

const questions: Question[] = [
  {
    title:
      "Você gostaria de receber kits e conteúdos novos de papelaria direto no seu WhatsApp todo mês?",
    subtitle: "Novidades exclusivas, sem precisar procurar em nenhum lugar.",
    options: [
      { emoji: "✨", label: "Sim, adoraria receber sempre novidades!" },
      { emoji: "🤔", label: "Depende do que for, quero saber mais" },
      { emoji: "📦", label: "Prefiro comprar só quando precisar" },
    ],
  },
  {
    title:
      "Você gostaria de fazer parte de um grupo com outras papeleiras criativas?",
    subtitle:
      "Um espaço para trocar ideias, inspirações e acompanhar tendências juntas.",
    options: [
      { emoji: "💜", label: "Sim, adoro me conectar com pessoas criativas" },
      { emoji: "💡", label: "Sim, especialmente para aprender mais" },
      { emoji: "🙈", label: "Não costumo participar muito de grupos" },
    ],
  },
  {
    title:
      "Por R$ 47,00/mês você teria acesso a kits novos, conteúdos sazonais e uma comunidade ativa — isso faz sentido pra você?",
    subtitle: "Menos que uma pizza, muito mais inspiração todo mês.",
    options: [
      { emoji: "🔥", label: "Faz muito sentido, quero saber mais!" },
      { emoji: "💬", label: "Talvez, depende do que vem no clube" },
      { emoji: "💸", label: "Prefiro avaliar melhor antes" },
    ],
  },
];

const benefits = [
  "Novos kits exclusivos todo mês",
  "Conteúdos sazonais e atualizações frequentes",
  "Acesso ao grupo fechado de papeleiras no WhatsApp",
  "Troca de ideias e inspirações reais",
  "Novidades compartilhadas pela comunidade",
];

type Step = "intro" | 0 | 1 | 2 | "result";

function QuizPage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);

  const currentIndex = typeof step === "number" ? step : -1;
  const progress =
    step === "intro"
      ? 0
      : step === "result"
        ? 100
        : ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    if (typeof step !== "number") return;
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
  };

  const handleNext = () => {
    if (step === "intro") {
      setStep(0);
      return;
    }
    if (typeof step === "number") {
      if (step < questions.length - 1) {
        setStep((step + 1) as Step);
      } else {
        setStep("result");
      }
    }
  };

  const canAdvance =
    typeof step === "number" ? answers[step] !== null : true;

  return (
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#FBFAFF", color: "#3C3489" }}
    >
      {/* Progress bar */}
      {step !== "intro" && (
        <div className="sticky top-0 z-10 bg-[#FBFAFF]/90 backdrop-blur-sm px-5 pt-5 pb-3">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-between mb-2 text-xs font-medium" style={{ color: "#3C3489" }}>
              <span>
                {step === "result"
                  ? "Resultado"
                  : `Pergunta ${currentIndex + 1} de ${questions.length}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#EEEDFE" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, backgroundColor: "#534AB7" }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md px-5 py-8 md:py-12">
        {step === "intro" && <IntroScreen onStart={handleNext} />}

        {typeof step === "number" && (
          <QuestionScreen
            key={step}
            question={questions[step]}
            selected={answers[step]}
            onSelect={handleSelect}
            onNext={handleNext}
            canAdvance={canAdvance}
            isLast={step === questions.length - 1}
          />
        )}

        {step === "result" && <ResultScreen />}
      </div>
    </main>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl mb-6"
        style={{ backgroundColor: "#EEEDFE" }}
      >
        <MessageCircle className="h-10 w-10" style={{ color: "#534AB7" }} strokeWidth={1.8} />
      </div>

      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-5"
        style={{ backgroundColor: "#EEEDFE", color: "#534AB7" }}
      >
        <Sparkles className="h-3 w-3" />
        Quiz exclusivo
      </span>

      <h1
        className="text-2xl md:text-3xl font-semibold leading-tight mb-4 tracking-tight"
        style={{ color: "#3C3489" }}
      >
        Descubra se o Clube VIP Infinity Paper é para você
      </h1>

      <p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: "#6B63C7" }}>
        3 perguntinhas rápidas para ver se você combina com o clube — e o que te
        espera lá dentro.
      </p>

      <button
        onClick={onStart}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
        style={{
          backgroundColor: "#534AB7",
          boxShadow: "0 10px 30px -10px rgba(83, 74, 183, 0.5)",
        }}
      >
        Começar quiz
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function QuestionScreen({
  question,
  selected,
  onSelect,
  onNext,
  canAdvance,
  isLast,
}: {
  question: Question;
  selected: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  canAdvance: boolean;
  isLast: boolean;
}) {
  return (
    <div className="pt-4 animate-in fade-in slide-in-from-right-4 duration-400">
      <h2
        className="text-xl md:text-2xl font-semibold leading-snug mb-3 tracking-tight"
        style={{ color: "#3C3489" }}
      >
        {question.title}
      </h2>
      <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B63C7" }}>
        {question.subtitle}
      </p>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: isSelected ? "#534AB7" : "#EEEDFE",
                borderColor: isSelected ? "#534AB7" : "transparent",
                color: isSelected ? "#FFFFFF" : "#3C3489",
              }}
            >
              <span className="text-2xl shrink-0">{option.emoji}</span>
              <span className="text-sm md:text-base font-medium leading-snug">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!canAdvance}
        className="mt-10 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
        style={{
          backgroundColor: canAdvance ? "#534AB7" : "#C9C5EC",
          boxShadow: canAdvance
            ? "0 10px 30px -10px rgba(83, 74, 183, 0.5)"
            : "none",
        }}
      >
        {isLast ? "Ver meu resultado" : "Próxima pergunta"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ResultScreen() {
  return (
    <div className="pt-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-5"
          style={{ backgroundColor: "#EEEDFE", color: "#534AB7" }}
        >
          <Sparkles className="h-3 w-3" />
          Seu convite exclusivo
        </span>

        <h2
          className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight mb-4"
          style={{ color: "#3C3489" }}
        >
          Você combina com o Clube VIP Infinity Paper!
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "#6B63C7" }}>
          Entre para o espaço exclusivo onde novas ideias de papelaria chegam
          primeiro — direto no seu WhatsApp.
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{ backgroundColor: "#EEEDFE" }}
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#534AB7" }}
            >
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-sm md:text-base leading-relaxed" style={{ color: "#3C3489" }}>
              {b}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="rounded-2xl p-6 mb-10 text-center"
        style={{ backgroundColor: "#534AB7" }}
      >
        <p className="text-white text-base leading-relaxed font-medium">
          Mais que arquivos novos — você entra em um ambiente onde todas crescem
          juntas.
        </p>
        <p className="text-white/80 text-sm leading-relaxed mt-3 italic">
          Uma comunidade criativa, não só uma assinatura.
        </p>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm mb-2" style={{ color: "#6B63C7" }}>
          Sua entrada por apenas
        </p>
        <p className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#3C3489" }}>
          R$ 47,00
          <span className="text-xl font-medium" style={{ color: "#6B63C7" }}>
            /mês
          </span>
        </p>
        <p className="mt-3 text-sm" style={{ color: "#6B63C7" }}>
          Entre hoje e comece a receber as próximas novidades exclusivas.
        </p>
      </div>

      <a
        href="#entrar"
        className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-5 text-sm md:text-base font-bold text-white uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
        style={{
          backgroundColor: "#3C3489",
          boxShadow: "0 15px 40px -10px rgba(60, 52, 137, 0.6)",
        }}
      >
        Quero entrar para o Clube VIP
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>

      <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: "#8B84D1" }}>
        As entradas são liberadas para manter o grupo organizado e ativo.
      </p>
    </div>
  );
}
