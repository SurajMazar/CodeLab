"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

const CODE_LINES = [
  { t: "function twoSum(nums, target) {", c: "#c084fc" },
  { t: "  const seen = new Map();", c: "#93c5fd" },
  { t: "  for (let i = 0; i < nums.length; i++) {", c: "#c084fc" },
  { t: "    const need = target - nums[i];", c: "#93c5fd" },
  { t: "    if (seen.has(need)) return [seen.get(need), i];", c: "#fca5a5" },
  { t: "    seen.set(nums[i], i);", c: "#93c5fd" },
  { t: "  }", c: "#c084fc" },
  { t: "}", c: "#c084fc" },
];

export function TerminalVisual() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "running" | "done" | "reset">("typing");

  useEffect(() => {
    let cancelled = false;
    async function cycle() {
      while (!cancelled) {
        setPhase("typing");
        for (let i = 1; i <= CODE_LINES.length; i++) {
          if (cancelled) return;
          setVisibleLines(i);
          await sleep(220);
        }
        setPhase("running");
        await sleep(900);
        if (cancelled) return;
        setPhase("done");
        await sleep(2400);
        if (cancelled) return;
        setPhase("reset");
        setVisibleLines(0);
        await sleep(500);
      }
    }
    cycle();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-[var(--accent)]/25 via-fuchsia-500/10 to-transparent blur-xl" />
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0d1117] shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-white/40">two-sum.js</span>
        </div>
        <div className="min-h-[240px] px-5 py-4 font-mono text-[13px] leading-6">
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="whitespace-pre">
              <span className="mr-3 select-none text-white/20">{i + 1}</span>
              <span style={{ color: line.c }}>{line.t}</span>
            </div>
          ))}
          {phase === "typing" && (
            <span className="ml-6 inline-block h-4 w-[7px] animate-pulse bg-white/70 align-middle" />
          )}

          <AnimatePresence>
            {phase === "running" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 text-xs text-white/50"
              >
                <Zap size={13} className="animate-pulse text-amber-400" /> Running against 14 test cases…
              </motion.div>
            )}
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400"
              >
                <CheckCircle2 size={16} /> Accepted — 14/14 · Runtime 42ms · beats 91%
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
