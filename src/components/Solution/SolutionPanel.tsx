"use client";

import { useState } from "react";
import { Lock, Unlock, Clock, Database } from "lucide-react";
import { Approach } from "@/data/types";
import { SlideViewer } from "./SlideViewer";

export function SolutionPanel({ approaches, onReveal }: { approaches: Approach[]; onReveal?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [activeApproach, setActiveApproach] = useState(0);

  if (!revealed) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Lock size={28} className="text-[var(--foreground)]/30" />
        <p className="max-w-xs text-sm text-[var(--foreground)]/60">
          The solution is hidden so you can attempt the problem yourself first. When you reveal it, you'll get an interactive,
          slide-by-slide walkthrough with diagrams — not just a wall of code.
        </p>
        <button
          onClick={() => {
            setRevealed(true);
            onReveal?.();
          }}
          className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Unlock size={14} /> Reveal Solution
        </button>
      </div>
    );
  }

  const approach = approaches[activeApproach];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {approaches.map((a, i) => (
          <button
            key={a.name}
            onClick={() => setActiveApproach(i)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              i === activeApproach
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--foreground)]/60 hover:bg-[var(--surface-muted)]"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-[var(--foreground)]/80">{approach.summary}</p>

      <div className="flex flex-wrap gap-4 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs">
        <span className="flex items-center gap-1.5">
          <Clock size={13} className="text-[var(--accent)]" /> Time: <code className="font-mono">{approach.timeComplexity}</code>
        </span>
        <span className="flex items-center gap-1.5">
          <Database size={13} className="text-[var(--accent)]" /> Space: <code className="font-mono">{approach.spaceComplexity}</code>
        </span>
        {approach.bestCase && <span className="text-[var(--foreground)]/60">Best: {approach.bestCase}</span>}
        {approach.worstCase && <span className="text-[var(--foreground)]/60">Worst: {approach.worstCase}</span>}
      </div>

      <SlideViewer key={approach.name} slides={approach.slides} />

      <p className="text-center text-xs text-[var(--foreground)]/40">
        No source code shown by design — implement it yourself in the editor, then Submit to check against the hidden test suite.
      </p>
    </div>
  );
}
