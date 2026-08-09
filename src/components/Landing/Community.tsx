import { Quote, Users2, MessageCircle, GitBranch } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "The solution decks are what sold me — I finally understood why the two-pointer approach works instead of memorizing it.",
    name: "Maya R.",
    role: "SWE @ mid-size startup",
  },
  {
    quote:
      "Switching between Python and Go on the same problem to compare idioms is something I haven't found anywhere else.",
    name: "Daniel K.",
    role: "CS senior",
  },
  {
    quote: "Weekly contests turned practice into a habit. My streak is the only reason I still show up on Sundays.",
    name: "Priya S.",
    role: "Backend engineer",
  },
];

const COMMUNITY_STATS = [
  { icon: Users2, value: "24k+", label: "Problem solvers" },
  { icon: GitBranch, value: "600+", label: "Approaches shared" },
  { icon: MessageCircle, value: "9.2k", label: "Discussion threads" },
];

export function Community() {
  return (
    <section className="py-24">
      <div className={SECTION}>
        <Reveal className="max-w-2xl">
          <div className={EYEBROW}>Community</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Learning sticks when it&apos;s not solo</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid grid-cols-3 gap-4 sm:max-w-lg">
          {COMMUNITY_STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
              <s.icon size={16} className="mx-auto text-[var(--accent)]" />
              <div className="mt-2 text-xl font-bold">{s.value}</div>
              <div className="text-[11px] text-[var(--foreground)]/55">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <Quote size={20} className="text-[var(--accent)]/50" />
                <blockquote className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-semibold text-[var(--accent)]">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-[var(--foreground)]/50">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
