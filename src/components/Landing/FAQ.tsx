"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, SECTION, EYEBROW } from "./Reveal";

const FAQS = [
  {
    q: "Is it really free to start?",
    a: "Yes — every problem, the judge, solution decks, and the playground are free to use. Sign-in and cloud sync are on the roadmap.",
  },
  {
    q: "Which languages can I actually submit code in right now?",
    a: "JavaScript, TypeScript, and Python run for real today with instant verdicts. The other 8 languages already have starter code and syntax highlighting in the editor — execution support is rolling out next.",
  },
  {
    q: "How is my progress saved?",
    a: "Progress, saved code, and settings are currently stored locally in your browser. Nothing is sent to a server beyond the code you explicitly Run or Submit for judging.",
  },
  {
    q: "Are the leaderboards and contests live right now?",
    a: "The leaderboard, rankings, and contest pages you see are a preview built on demo data to show the intended experience — real multiplayer contests are on the roadmap.",
  },
  {
    q: "Can I suggest or contribute a problem?",
    a: "The problem schema is designed to be extensible — new problems just need a description, tests, and starter code to slot in.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className={`${SECTION} max-w-3xl`}>
        <Reveal>
          <div className={EYEBROW}>FAQ</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered</h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={16} className="text-[var(--foreground)]/50" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-[var(--foreground)]/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
