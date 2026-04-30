import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Flame, Clock } from "lucide-react";

export function EntryPopup() {
  const [open, setOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
      fireConfetti();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const fireConfetti = () => {
    const colors = ["#9B30FF", "#BF5FFF", "#FF2EEE", "#FFD700"];
    const end = Date.now() + 1200;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors,
    });
  };

  const handleClick = () => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 bg-background/85 backdrop-blur-sm animate-fade-up"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-neon p-[2px] animate-pulse-neon">
        <div className="rounded-3xl bg-card/95 px-6 py-8 md:px-8 md:py-10 text-center backdrop-blur-xl">
          <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold leading-tight tracking-tight">
            🎉 <span className="text-gradient-neon">ATENÇÃO!</span>
            <br />
            NÃO SAIA DESSA PÁGINA!
          </h2>
          <p className="mt-5 text-sm md:text-base text-foreground/80 leading-relaxed">
            Acabou de ser liberada uma oportunidade{" "}
            <span className="text-foreground font-semibold">exclusiva</span>{" "}
            para você que comprou agora.
          </p>
          <p className="mt-3 text-sm md:text-base text-accent font-semibold">
            Essa oferta some em instantes. Não perca!
          </p>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
              <Clock className="h-3.5 w-3.5" />
              Tempo restante
            </div>
            <div className="rounded-2xl bg-gradient-neon p-[2px] animate-pulse-neon">
              <div className="rounded-2xl bg-background/90 px-6 py-3 backdrop-blur-sm">
                <span className="font-[var(--font-display)] text-4xl md:text-5xl font-bold tabular-nums text-gradient-neon tracking-wider">
                  {mm}:{ss}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="mt-8 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-neon px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider text-white animate-pulse-neon transition-transform hover:scale-[1.03]"
          >
            <Flame className="h-5 w-5" />
            Ver minha oportunidade agora
          </button>
        </div>
      </div>
    </div>
  );
}