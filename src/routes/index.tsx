import { createFileRoute } from "@tanstack/react-router";
import { Check, FolderOpen, TrendingUp, Users, Lightbulb, Zap, Flame, PartyPopper } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { EntryPopup } from "@/components/EntryPopup";
import { WistiaVSL } from "@/components/WistiaVSL";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo VIP Infinity Paper — Sua virada de chave" },
      {
        name: "description",
        content:
          "Grupo VIP Infinity Paper no WhatsApp: arquivos toda semana, tendências em primeira mão e comunidade ativa de papeleiras.",
      },
    ],
  }),
  component: Index,
});

const pains = [
  "Fica sem inspiração e não sabe o que lançar na sua papelaria",
  "Perde tempo procurando tendências espalhadas pela internet",
  "Se sente sozinha nesse mercado, sem ter com quem trocar ideia",
  "Vê outras papeleiras crescendo e não entende o que elas sabem",
  "Seus produtos ficam parados enquanto o mercado se atualiza toda semana",
];

const solutions = [
  {
    icon: FolderOpen,
    title: "Novos arquivos toda semana",
    desc: "Papelaria exclusiva direto no grupo, sem garimpar pela internet.",
  },
  {
    icon: TrendingUp,
    title: "Tendências em primeira mão",
    desc: "Saiba o que está bombando antes de todo mundo e venda mais.",
  },
  {
    icon: Users,
    title: "Network real com papeleiras",
    desc: "Conexões, parcerias e trocas com quem está no mesmo caminho.",
  },
  {
    icon: Lightbulb,
    title: "Inspiração constante",
    desc: "Nunca mais trave na hora de criar. O grupo é combustível para o seu negócio.",
  },
];

const testimonials = [
  {
    name: "Camila R.",
    role: "papeleira há 2 anos",
    text: "Toda semana tem novidade. Já fiz amizades e ainda recebi arquivos incríveis que usei nos meus pedidos.",
    initials: "CR",
  },
  {
    name: "Fernanda L.",
    role: "papelaria digital",
    text: "O network do grupo me rendeu uma parceria que eu nunca esperava. Vale demais.",
    initials: "FL",
  },
  {
    name: "Juliana M.",
    role: "empreendedora criativa",
    text: "É o grupo mais ativo que já participei. Inspiração toda semana garantida!",
    initials: "JM",
  },
];

const finalBenefits = [
  "Arquivos novos toda semana",
  "Tendências antes de todo mundo",
  "Comunidade ativa de papeleiras",
  "Acesso imediato ao WhatsApp VIP",
];

function Index() {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = useCallback(() => {
    setRevealed(true);
    setTimeout(() => {
      document.getElementById("after-video")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 600);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <EntryPopup />
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-float-orb" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[140px] animate-float-orb [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-float-orb [animation-delay:4s]" />
      </div>

      {/* TOP CONGRATS BAR */}
      <div className="relative z-10 w-full bg-gradient-neon py-3 px-4 text-center shadow-neon">
        <p className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-white">
          <PartyPopper className="h-4 w-4 shrink-0" />
          <span>Parabéns pela sua compra! Mas não saia ainda...</span>
        </p>
      </div>

      {/* HERO */}
      <section id="hero" className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight animate-fade-up">
            Acabou de ser liberada uma{" "}
            <span className="text-gradient-neon">oportunidade única</span>{" "}
            para quem adquiriu hoje.
          </h1>

          <p className="mt-8 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl mx-auto animate-fade-up [animation-delay:150ms]">
            Você deu o primeiro passo. Agora imagine ter papelaria nova toda
            semana, estar por dentro das tendências antes de todo mundo e ainda
            fazer parte de uma rede de papeleiras que crescem juntas. Isso é o{" "}
            <span className="text-foreground font-semibold">Grupo VIP Infinity Paper</span>.
          </p>

        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* VSL */}
      <section className="relative px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[var(--font-display)] text-2xl md:text-4xl font-bold tracking-tight">
            Assista esse vídeo{" "}
            <span className="text-gradient-neon">👇</span>
          </h2>

          <div className="mt-10 relative rounded-2xl bg-gradient-neon p-[2px] shadow-neon">
            <WistiaVSL onReveal={handleReveal} />
          </div>

          {!revealed && (
            <p className="mt-6 text-xs md:text-sm text-foreground/60 animate-pulse">
              ⏳ Assista o vídeo até o final para liberar a sua oferta exclusiva...
            </p>
          )}
        </div>
      </section>

      {/* Reveal anchor + gated content */}
      <div id="after-video" />
      <div
        aria-hidden={!revealed}
        className={`transition-all duration-[1200ms] ease-out overflow-hidden ${
          revealed
            ? "opacity-100 translate-y-0 max-h-none pointer-events-auto"
            : "opacity-0 translate-y-6 max-h-0 pointer-events-none"
        }`}
      >
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* BENEFÍCIOS + DEPOIMENTOS */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight">
            Veja o que te espera{" "}
            <span className="text-gradient-neon">dentro do grupo</span> 👇
          </h2>

          <div className="mt-14 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {solutions.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative rounded-xl border border-primary/25 bg-card/60 p-3 md:p-4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/70 hover:shadow-glow"
              >
                <div className="mb-2 inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-neon text-white shadow-glow">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="font-[var(--font-display)] text-xs md:text-sm font-bold leading-tight">
                  {title}
                </h3>
                <p className="mt-1.5 text-[11px] md:text-xs leading-snug text-foreground/70">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-24 text-center font-[var(--font-display)] text-2xl md:text-4xl font-bold tracking-tight">
            Quem já está dentro{" "}
            <span className="text-gradient-neon">não quer sair</span> 💜
          </h3>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-neon font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground/60">{t.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* CTA FINAL */}
      <section id="cta" className="relative px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          {/* Urgência */}
          <div className="mx-auto mb-10 max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-neon p-[1.5px] shadow-neon">
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-background/90 px-5 py-4 backdrop-blur-sm">
                <Zap className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-xs md:text-sm font-medium text-foreground/95">
                  Vagas limitadas para manter o grupo organizado. Essa oferta é
                  só para quem comprou hoje.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight">
            Sua chance de entrar{" "}
            <span className="text-gradient-neon">está aqui</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed">
            Por um valor que cabe no seu bolso, você garante acesso semanal a
            tudo isso:
          </p>

          {/* Price block */}
          <div className="mt-12 rounded-3xl border border-primary/40 bg-card/70 p-8 md:p-10 backdrop-blur-md shadow-neon">
            <p className="text-base text-foreground/50 line-through">De R$ 99,90</p>
            <p className="mt-2 font-[var(--font-display)] text-sm uppercase tracking-[0.3em] text-foreground/60">
              Por apenas
            </p>
            <p className="mt-3 font-[var(--font-display)] text-6xl md:text-7xl font-bold text-gradient-neon leading-none">
              R$ 47,00
            </p>
            <p className="mt-3 text-base text-foreground/70">/mês</p>
            <p className="mt-2 text-xs text-foreground/50">
              (menos de R$ 0,70 por dia)
            </p>

            <ul className="mt-8 space-y-3 text-left">
              {finalBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-neon">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm md:text-base text-foreground/90">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://pay.hotmart.com/W105617111J?checkoutMode=10"
              className="mt-10 group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-neon px-6 py-5 text-sm md:text-base font-bold tracking-wider uppercase text-white animate-pulse-neon transition-transform hover:scale-[1.02]"
            >
              <Flame className="h-5 w-5" />
              Sim! Quero entrar no grupo VIP agora
            </a>

            <p className="mt-5 text-xs text-foreground/50 leading-relaxed">
              Você será redirecionada para o WhatsApp após a confirmação. Vagas
              limitadas.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border/50 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="font-[var(--font-display)] text-lg font-bold">
            <span className="text-gradient-neon">Infinity</span>{" "}
            <span className="text-foreground">Paper</span>
          </div>
          <p className="text-xs text-foreground/50">
            © 2025 Infinity Paper. Todos os direitos reservados.
          </p>
          <div className="flex gap-5 text-xs text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
