import { Crown, Flame, Trophy, Zap, CircleCheck } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const LEADERBOARD = [
  { rank: 1, name: "aria.codes", rating: 2934, solved: 412 },
  { rank: 2, name: "kmatsuda", rating: 2871, solved: 388 },
  { rank: 3, name: "0xnullptr", rating: 2809, solved: 401 },
  { rank: 4, name: "priya_dev", rating: 2745, solved: 356 },
  { rank: 5, name: "you", rating: 2103, solved: 87, isYou: true },
];

const RECENT = [
  { title: "Trapping Rain Water", verdict: "Accepted", lang: "TypeScript" },
  { title: "Course Schedule II", verdict: "Accepted", lang: "Python" },
  { title: "Word Break", verdict: "Wrong Answer", lang: "JavaScript" },
];

export function RankingsAndProgress() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]/40 py-24">
      <div className={SECTION}>
        <Reveal className="max-w-2xl">
          <div className={EYEBROW}>
            <Trophy size={13} /> Compete &amp; track
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">See where you stand, and how far you&apos;ve come</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Crown size={16} className="text-amber-400" /> Global leaderboard
                </h3>
                <span className="text-xs text-[var(--foreground)]/50">Weekly Contest #42</span>
              </div>
              <div className="mt-5 space-y-1.5">
                {LEADERBOARD.map((row) => (
                  <div
                    key={row.rank}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                      row.isYou ? "border border-[var(--accent)]/30 bg-[var(--accent)]/[0.07]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 text-center font-mono text-xs ${
                          row.rank <= 3 ? "text-amber-400" : "text-[var(--foreground)]/40"
                        }`}
                      >
                        {row.rank}
                      </span>
                      <span className={row.isYou ? "font-semibold text-[var(--accent)]" : "font-medium"}>{row.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/55">
                      <span>{row.solved} solved</span>
                      <span className="w-12 text-right font-mono font-semibold text-[var(--foreground)]">{row.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Your progress</h3>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatTile icon={CircleCheck} label="Solved" value="87" />
                <StatTile icon={Flame} label="Streak" value="12d" accent="#fb923c" />
                <StatTile icon={Zap} label="XP" value="4,210" accent="#facc15" />
              </div>

              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[var(--accent)] to-fuchsia-500" />
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-[var(--foreground)]/50">
                <span>Level 14</span>
                <span>680 / 1,000 XP to Level 15</span>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <div className="text-xs font-medium text-[var(--foreground)]/50">Recent submissions</div>
                <div className="mt-3 space-y-2">
                  {RECENT.map((r) => (
                    <div key={r.title} className="flex items-center justify-between text-sm">
                      <span className="truncate">{r.title}</span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          r.verdict === "Accepted"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {r.verdict}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl bg-[var(--surface-muted)] p-3.5">
      <Icon size={16} style={{ color: accent ?? "var(--accent)" }} />
      <div className="mt-2 text-lg font-bold">{value}</div>
      <div className="text-[11px] text-[var(--foreground)]/55">{label}</div>
    </div>
  );
}
