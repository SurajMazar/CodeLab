import { Search, KeyboardIcon, Send, Sparkles } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const STEPS = [
  {
    icon: Search,
    title: "Pick a problem",
    body: "Filter by difficulty, topic, pattern, or company — or let a learning path choose the next one for you.",
  },
  {
    icon: KeyboardIcon,
    title: "Write & run",
    body: "Code in your language of choice, run against visible tests, and iterate with instant feedback.",
  },
  {
    icon: Send,
    title: "Submit for a verdict",
    body: "Hidden tests decide the real verdict — Accepted, Wrong Answer, or a timing/memory limit breach.",
  },
  {
    icon: Sparkles,
    title: "Understand the optimal",
    body: "Reveal the interactive solution deck to see why the best approach works, not just that it does.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]/40 py-24">
      <div className={SECTION}>
        <Reveal className="max-w-2xl">
          <div className={EYEBROW}>The loop</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="relative">
              <div className="text-5xl font-bold text-[var(--foreground)]/[0.06]">{String(i + 1).padStart(2, "0")}</div>
              <div className="-mt-8 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <step.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--foreground)]/60">{step.body}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute right-[-16px] top-9 hidden h-px w-8 bg-[var(--border)] lg:block" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
