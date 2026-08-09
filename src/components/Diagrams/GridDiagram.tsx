"use client";

import { motion } from "framer-motion";

export interface GridDiagramProps {
  matrix: (0 | 1)[][];
  visited?: [number, number][];
  current?: [number, number];
  frontier?: [number, number][];
  path?: [number, number][];
}

function has(list: [number, number][] | undefined, r: number, c: number) {
  return !!list?.some(([rr, cc]) => rr === r && cc === c);
}

export function GridDiagram({ matrix, visited, current, frontier, path }: GridDiagramProps) {
  return (
    <div className="flex justify-center py-6">
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length ?? 1}, minmax(0,1fr))` }}>
        {matrix.map((row, r) =>
          row.map((cell, c) => {
            const isCurrent = current && current[0] === r && current[1] === c;
            const isVisited = has(visited, r, c);
            const isFrontier = has(frontier, r, c);
            const isPath = has(path, r, c);
            let cls = cell === 0 ? "bg-sky-400/10 border-sky-400/30" : "bg-[var(--surface)] border-[var(--border)]";
            if (isVisited) cls = "bg-[var(--accent)]/20 border-[var(--accent)]/60";
            if (isFrontier) cls = "bg-amber-400/20 border-amber-400/60";
            if (isPath) cls = "bg-emerald-400/25 border-emerald-500";
            if (isCurrent) cls = "bg-[var(--accent)]/40 border-[var(--accent)]";
            return (
              <motion.div
                key={`${r}-${c}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex h-9 w-9 items-center justify-center rounded border-2 text-xs font-mono ${cls}`}
                title={`(${r}, ${c})`}
              >
                {cell === 1 ? "▓" : ""}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
