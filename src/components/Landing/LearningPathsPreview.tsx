import { BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const PATHS = [
  { name: "Arrays & Strings", problems: 14, done: 6, color: "#818cf8" },
  { name: "Binary Search", problems: 8, done: 8, color: "#34d399" },
  { name: "Trees & BSTs", problems: 12, done: 2, color: "#fbbf24" },
  { name: "Graphs", problems: 16, done: 0, color: "#f472b6" },
  { name: "Dynamic Programming", problems: 18, done: 3, color: "#60a5fa" },
  { name: "Interview Preparation", problems: 24, done: 9, color: "#c084fc" },
];

const DIFFICULTY = [
  { label: "Easy", pct: 42, color: "#34d399" },
  { label: "Medium", pct: 40, color: "#fbbf24" },
  { label: "Hard", pct: 18, color: "#f87171" },
];

export function LearningPathsPreview() {
  return (
    <section className="py-24">
      <div className={SECTION}>
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <div className={EYEBROW}>
                <BookOpen size={13} /> Structured progression
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Learning paths that build on each other</h2>
              <p className="mt-3 max-w-lg text-[var(--foreground)]/65">
                Each path moves Easy → Medium → Hard → Challenge, with prerequisite problems so you never hit a wall
                you weren&apos;t ready for.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {PATHS.map((p, i) => {
                const pct = Math.round((p.done / p.problems) * 100);
                return (
                  <Reveal key={p.name} delay={i * 0.05}>
                    <div className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent)]/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{p.name}</span>
                        <ArrowUpRight
                          size={15}
                          className="text-[var(--foreground)]/30 transition group-hover:text-[var(--accent)]"
                        />
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: p.color }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-[var(--foreground)]/55">
                        {p.done}/{p.problems} solved
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className={EYEBROW}>Library snapshot</div>
              <h3 className="mt-4 text-lg font-semibold">Difficulty breakdown</h3>
              <p className="mt-1 text-sm text-[var(--foreground)]/55">100+ problems across every pattern.</p>

              <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full">
                {DIFFICULTY.map((d) => (
                  <div key={d.label} style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {DIFFICULTY.map((d) => (
                  <div key={d.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.label}
                    </span>
                    <span className="text-[var(--foreground)]/55">{d.pct}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-6">
                <div>
                  <div className="text-2xl font-bold">40+</div>
                  <div className="text-xs text-[var(--foreground)]/55">Patterns covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">11</div>
                  <div className="text-xs text-[var(--foreground)]/55">Learning paths</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
