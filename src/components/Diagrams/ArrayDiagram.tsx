"use client";

import { motion } from "framer-motion";

export interface ArrayDiagramProps {
  values: (number | string)[];
  highlights?: number[];
  pointers?: { label: string; index: number; color?: string }[];
  window?: [number, number];
}

const colorMap: Record<string, string> = {
  amber: "border-amber-400 text-amber-500",
  sky: "border-sky-400 text-sky-500",
  violet: "border-violet-400 text-violet-500",
  emerald: "border-emerald-400 text-emerald-500",
};

export function ArrayDiagram({ values, highlights = [], pointers = [], window: win }: ArrayDiagramProps) {
  const pointersByIndex = new Map<number, { label: string; color?: string }[]>();
  for (const p of pointers) {
    const list = pointersByIndex.get(p.index) ?? [];
    list.push(p);
    pointersByIndex.set(p.index, list);
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <div className="flex items-end gap-1.5">
        {values.map((v, i) => {
          const isHighlighted = highlights.includes(i);
          const inWindow = win && i >= win[0] && i <= win[1];
          const ptrs = pointersByIndex.get(i) ?? [];
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex h-5 flex-col items-center justify-end gap-0.5">
                {ptrs.map((p) => (
                  <span
                    key={p.label}
                    className={`text-[10px] font-semibold leading-none ${p.color ? colorMap[p.color]?.split(" ")[1] : "text-[var(--accent)]"}`}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
              <motion.div
                layout
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-md border-2 text-sm font-mono font-medium",
                  isHighlighted
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                    : inWindow
                    ? "border-sky-400/70 bg-sky-400/10"
                    : "border-[var(--border)] bg-[var(--surface)]",
                ].join(" ")}
              >
                {v}
              </motion.div>
              <span className="text-[10px] text-[var(--foreground)]/35">{i}</span>
              {ptrs.map((p) => (
                <div key={p.label + "-arrow"} className={`h-2 w-0.5 ${p.color ? colorMap[p.color]?.split(" ")[0] : "bg-[var(--accent)]"}`} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
