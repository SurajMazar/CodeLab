"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface HashMapDiagramProps {
  entries: { key: string; value: string; active?: boolean }[];
  lookup?: string;
}

export function HashMapDiagram({ entries, lookup }: HashMapDiagramProps) {
  if (entries.length === 0) {
    return <p className="py-10 text-center text-sm text-[var(--foreground)]/40 font-mono">{"{ }"} — empty map</p>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-2 py-6">
      <AnimatePresence initial={false}>
        {entries.map((e) => {
          const isLookup = lookup === e.key;
          return (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={[
                "flex items-center overflow-hidden rounded-md border-2 font-mono text-sm",
                e.active || isLookup ? "border-[var(--accent)] bg-[var(--accent)]/15" : "border-[var(--border)] bg-[var(--surface)]",
              ].join(" ")}
            >
              <span className="border-r border-[var(--border)] px-2.5 py-1.5 text-[var(--foreground)]/70">{e.key}</span>
              <span className="px-2.5 py-1.5 font-semibold">{e.value}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
