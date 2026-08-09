"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Layers, Terminal, Trophy, Braces, Workflow } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const FEATURES = [
  {
    icon: Gauge,
    title: "Real judge, instant verdicts",
    body: "Every submission runs against visible and hidden test suites in a live sandbox — Accepted, Wrong Answer, TLE, or a compile error, exactly like the real thing.",
    detail: "Accepted · 14/14 · 42ms · beats 91% of submissions",
  },
  {
    icon: Layers,
    title: "Diagram-driven solution decks",
    body: "Stuck? Reveal an interactive, slide-by-slide walkthrough that animates arrays, hash maps, grids, and linked lists as the algorithm runs — not just a wall of code.",
    detail: "Approach 2/2 · Hash Map (One Pass) · O(n) time · O(n) space",
  },
  {
    icon: Terminal,
    title: "One editor, ten languages",
    body: "Switch between JavaScript, TypeScript, Python, Rust, C++, Java, Go, Kotlin, Swift, and C# without leaving the problem — starter code and signatures adapt per language.",
    detail: "JavaScript · TypeScript · Python · Rust · C++ · Java · Go · Kotlin · Swift · C#",
  },
  {
    icon: Workflow,
    title: "Structured learning paths",
    body: "Follow curated tracks — Arrays & Strings, Binary Search, Trees, Graphs, DP, Interview Prep — that escalate from Easy to Challenge with prerequisites built in.",
    detail: "Arrays & Strings · 6/14 complete · next: Sliding Window Maximum",
  },
  {
    icon: Trophy,
    title: "Contests & leaderboards",
    body: "Race the clock in timed contests, climb the global and friends leaderboards, and track rating changes across every past event.",
    detail: "Weekly Contest #42 · starts in 02:14:09 · 1,204 registered",
  },
  {
    icon: Braces,
    title: "Standalone playground",
    body: "Prototype ideas outside the judge — pick a language, write freeform code, feed it custom input, and save or share the snippet with a link.",
    detail: "playground/scratch-7.ts · custom stdin · shareable link",
  },
];

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const Icon = FEATURES[active].icon;

  return (
    <section className="py-24">
      <div className={SECTION}>
        <Reveal className="max-w-2xl">
          <div className={EYEBROW}>Built for deliberate practice</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Everything a serious problem-solver needs</h2>
          <p className="mt-3 text-[var(--foreground)]/65">
            Not just a list of problems — a full loop of solve, verify, understand, and repeat.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
          <Reveal delay={0.05} className="flex flex-col gap-2">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActive(i)}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                  active === i
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.06]"
                    : "border-transparent hover:bg-[var(--surface-muted)]"
                }`}
              >
                <f.icon
                  size={18}
                  className={`mt-0.5 shrink-0 ${active === i ? "text-[var(--accent)]" : "text-[var(--foreground)]/45"}`}
                />
                <div>
                  <div className="text-sm font-semibold">{f.title}</div>
                  {active === i && <div className="mt-1 text-sm text-[var(--foreground)]/65">{f.body}</div>}
                </div>
              </button>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col justify-between"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="mt-6 text-xl font-semibold">{FEATURES[active].title}</h3>
                    <p className="mt-2 max-w-md text-sm text-[var(--foreground)]/65">{FEATURES[active].body}</p>
                  </div>
                  <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 font-mono text-xs text-[var(--foreground)]/70">
                    {FEATURES[active].detail}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
