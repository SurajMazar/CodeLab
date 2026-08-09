"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface LinkedListDiagramProps {
  values: (number | string)[];
  pointers?: { label: string; index: number; color?: string }[];
  removedIndex?: number;
}

export function LinkedListDiagram({ values, pointers = [], removedIndex }: LinkedListDiagramProps) {
  const pointersByIndex = new Map<number, string[]>();
  for (const p of pointers) {
    const list = pointersByIndex.get(p.index) ?? [];
    list.push(p.label);
    pointersByIndex.set(p.index, list);
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-mono text-[var(--foreground)]/60">HEAD</span>
      <div className="flex flex-wrap items-center justify-center gap-1">
        <AnimatePresence initial={false}>
          {values.map((v, i) => {
            const labels = pointersByIndex.get(i) ?? [];
            const isRemoved = removedIndex === i;
            return (
              <motion.div key={`${i}-${v}`} className="flex items-center" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: isRemoved ? 0.3 : 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col items-center gap-1">
                  {labels.length > 0 && (
                    <div className="flex gap-1">
                      {labels.map((l) => (
                        <span key={l} className="text-[10px] font-semibold text-[var(--accent)]">
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                  <div
                    className={[
                      "flex h-11 min-w-[3rem] items-center justify-center rounded-md border-2 px-2 font-mono text-sm font-medium",
                      labels.length > 0 ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--border)] bg-[var(--surface)]",
                    ].join(" ")}
                  >
                    {v}
                  </div>
                </div>
                {i < values.length - 1 && <ArrowRight size={16} className="mx-1 text-[var(--foreground)]/30" />}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <ArrowRight size={16} className="mx-1 text-[var(--foreground)]/30" />
        <span className="rounded bg-[var(--surface-muted)] px-2 py-1 text-xs font-mono text-[var(--foreground)]/50">NULL</span>
      </div>
    </div>
  );
}
