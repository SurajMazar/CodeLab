import Link from "next/link";
import { Code2, MessageCircle, Send, Terminal } from "lucide-react";
import { SECTION } from "./Reveal";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Problems", href: "/problems" },
      { label: "Playground", href: "/playground" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Contests", href: "/contests" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Learning Paths", href: "/learning-paths" },
      { label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Changelog", href: "/problems" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-14">
      <div className={SECTION}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Code2 size={20} className="text-[var(--accent)]" />
              DSA Bench
            </div>
            <p className="mt-3 max-w-xs text-sm text-[var(--foreground)]/55">
              A premium, judge-backed practice platform for algorithms and data structures — across 10 languages.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="Community chat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--surface-muted)]"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="#"
                aria-label="Source"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--surface-muted)]"
              >
                <Terminal size={15} />
              </a>
              <a
                href="#"
                aria-label="Updates"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--surface-muted)]"
              >
                <Send size={15} />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/45">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-[var(--foreground)]/65 hover:text-[var(--foreground)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--foreground)]/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DSA Bench. Built for learning, not (yet) for production traffic.</span>
          <span>No account required to start solving.</span>
        </div>
      </div>
    </footer>
  );
}
