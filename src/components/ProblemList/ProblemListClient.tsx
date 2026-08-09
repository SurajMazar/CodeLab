"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, CheckCircle2, Circle, Dot } from "lucide-react";
import { PublicProblem } from "@/data/publicProblem";
import { Difficulty } from "@/data/types";
import { useProgressStore } from "@/lib/progressStore";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-rose-500",
};

export function ProblemListClient({ problems }: { problems: PublicProblem[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [tag, setTag] = useState<string>("All");
  const status = useProgressStore((s) => s.status);

  const allTags = useMemo(() => Array.from(new Set(problems.flatMap((p) => p.tags))).sort(), [problems]);

  const filtered = problems.filter((p) => {
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (tag !== "All" && !p.tags.includes(tag)) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] py-1.5 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty | "All")}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-sm"
        >
          <option value="All">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-sm max-w-[160px]"
        >
          <option value="All">All Topics</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--foreground)]/60">
            <tr>
              <th className="w-10 py-2 pl-4 text-left font-medium">Status</th>
              <th className="py-2 text-left font-medium">Title</th>
              <th className="w-24 py-2 text-left font-medium">Difficulty</th>
              <th className="py-2 text-left font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const s = status[p.slug] ?? "unattempted";
              return (
                <tr key={p.slug} className="border-t border-[var(--border)] hover:bg-[var(--surface-muted)]/60">
                  <td className="py-2.5 pl-4">
                    {s === "solved" ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : s === "attempted" ? (
                      <Dot size={16} className="text-amber-500" />
                    ) : (
                      <Circle size={14} className="text-[var(--foreground)]/25" />
                    )}
                  </td>
                  <td className="py-2.5">
                    <Link href={`/problems/${p.slug}`} className="font-medium hover:text-[var(--accent)]">
                      {p.title}
                    </Link>
                  </td>
                  <td className={`py-2.5 font-medium ${difficultyColor[p.difficulty]}`}>{p.difficulty}</td>
                  <td className="py-2.5 text-[var(--foreground)]/60">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-sm text-[var(--foreground)]/50">No problems match your filters.</p>}
      </div>
    </div>
  );
}
