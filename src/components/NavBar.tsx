import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
          <Code2 size={20} className="text-[var(--accent)]" />
          <span>DSA Bench</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--foreground)]/80">
          <Link href="/problems" className="hover:text-[var(--foreground)]">
            Problems
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
