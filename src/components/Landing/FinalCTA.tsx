import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, SECTION } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="py-24">
      <div className={SECTION}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/15 via-[var(--surface)] to-fuchsia-500/10 px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,var(--accent)_0%,transparent_70%)] opacity-[0.15]"
            />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your next Accepted is one problem away</h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--foreground)]/65">
              Jump into a curated queue of patterns, or browse the full library and pick your own fight.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/problems"
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:opacity-90"
              >
                Start Coding
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold hover:bg-[var(--surface-muted)]"
              >
                Browse the library
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
