"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { PublicProblem } from "@/data/publicProblem";
import { SolutionPanel } from "../Solution/SolutionPanel";

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-500 bg-emerald-500/10",
  Medium: "text-amber-500 bg-amber-500/10",
  Hard: "text-rose-500 bg-rose-500/10",
};

export function DescriptionPanel({ problem }: { problem: PublicProblem }) {
  const [tab, setTab] = useState<"description" | "solution">("description");
  const [hintsShown, setHintsShown] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-[var(--border)] px-4">
        {(["description", "solution"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              tab === t ? "border-[var(--accent)] text-[var(--foreground)]" : "border-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="thin-scroll flex-1 overflow-y-auto px-5 py-4">
        {tab === "description" ? (
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h1 className="text-lg font-semibold">{problem.title}</h1>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${difficultyColor[problem.difficulty]}`}>{problem.difficulty}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {problem.tags.map((t) => (
                  <span key={t} className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs text-[var(--foreground)]/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--foreground)]/85">{problem.description}</p>

            <div className="space-y-3">
              {problem.examples.map((ex, i) => (
                <div key={i} className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="mb-1 font-medium text-[var(--foreground)]/70">Example {i + 1}</p>
                  <pre className="whitespace-pre-wrap font-mono text-xs">
                    <span className="text-[var(--foreground)]/60">Input: </span>
                    {ex.input}
                    {"\n"}
                    <span className="text-[var(--foreground)]/60">Output: </span>
                    {ex.output}
                  </pre>
                  {ex.explanation && <p className="mt-1 text-xs text-[var(--foreground)]/60">{ex.explanation}</p>}
                </div>
              ))}
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--foreground)]/70">Constraints</p>
              <ul className="list-inside list-disc space-y-0.5 text-xs text-[var(--foreground)]/60">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="font-mono">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]/70">
                <Lightbulb size={14} className="text-amber-500" /> Hints
              </p>
              <div className="space-y-1.5">
                {problem.hints.slice(0, hintsShown).map((h, i) => (
                  <p key={i} className="rounded-md bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--foreground)]/75">
                    <span className="font-semibold text-[var(--accent)]">Hint {i + 1}: </span>
                    {h}
                  </p>
                ))}
                {hintsShown < problem.hints.length && (
                  <button
                    onClick={() => setHintsShown((n) => n + 1)}
                    className="text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    Show hint {hintsShown + 1} of {problem.hints.length}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <SolutionPanel approaches={problem.approaches} />
        )}
      </div>
    </div>
  );
}
