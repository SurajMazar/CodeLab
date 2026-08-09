"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { TerminalVisual } from "./TerminalVisual";
import { SECTION, EYEBROW } from "./Reveal";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Java",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "C#",
  "C",
];

const STATS = [
  { value: "100+", label: "Curated problems" },
  { value: "40+", label: "Algorithmic patterns" },
  { value: "10", label: "Languages supported" },
  { value: "0", label: "Cost to start" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent)_0%,transparent_70%)] opacity-[0.12]"
      />
      <div className={SECTION}>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={EYEBROW}
            >
              <Sparkles size={13} /> Now with 10 languages &amp; interactive solution decks
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-[2.65rem] font-bold leading-[1.08] tracking-tight sm:text-6xl"
            >
              Master algorithms with a{" "}
              <span className="bg-gradient-to-r from-[var(--accent)] to-fuchsia-500 bg-clip-text text-transparent">
                judge that teaches back
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg text-[var(--foreground)]/70"
            >
              Solve real interview-grade problems, get instant verdicts from a real judge, and unlock
              diagram-driven walkthroughs that show you exactly how the optimal solution thinks —
              across 10 languages, with your own playground and progress to track.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/problems"
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:opacity-90"
              >
                Start Coding
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold hover:bg-[var(--surface-muted)]"
              >
                <Compass size={16} /> Explore Problems
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-2"
            >
              {LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--foreground)]/70"
                >
                  {lang}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-10 grid grid-cols-4 gap-6 border-t border-[var(--border)] pt-6"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                  <div className="mt-0.5 text-xs text-[var(--foreground)]/55">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <TerminalVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
