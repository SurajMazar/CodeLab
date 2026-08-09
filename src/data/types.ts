// Core data model for the DSA learning + judge platform.
// Kept intentionally small and declarative so new problems, languages,
// and diagram types can be added without touching UI code.

export type Difficulty = "Easy" | "Medium" | "Hard";

/**
 * All languages the platform can *display* (editor, starter code, syntax
 * highlighting). Only `EXECUTABLE_LANGUAGES` can actually Run/Submit today —
 * see src/lib/execute/README or judge.ts. Adding a new runnable language
 * means: add a harness builder in harness.ts, a runtime branch in
 * sandbox.ts, and list it in EXECUTABLE_LANGUAGES below.
 */
export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "rust"
  | "cpp"
  | "c"
  | "java"
  | "go"
  | "kotlin"
  | "swift"
  | "csharp";

export const EXECUTABLE_LANGUAGES: readonly Language[] = ["javascript", "typescript", "python"];

export const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  cpp: "C++",
  c: "C",
  java: "Java",
  go: "Go",
  kotlin: "Kotlin",
  swift: "Swift",
  csharp: "C#",
};

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  /** Positional arguments passed to the candidate function. */
  input: unknown[];
  expected: unknown;
  /**
   * How to compare actual vs expected.
   * "exact"  -> deep equality, order matters
   * "sorted" -> deep equality after sorting both (top-level array)
   * "set"    -> compare as sets (ignores order + duplicates)
   */
  compare?: "exact" | "sorted" | "set";
}

export interface StarterCode {
  javascript: string;
  python: string;
  /** Optional override; plain JS is valid TS, so this falls back to
   * `javascript` when omitted (see resolveStarterCode in publicProblem.ts). */
  typescript?: string;
}

/** A single visual "frame" a slide can render. Add new variants to extend
 * the visualization engine without touching existing diagrams. */
export type DiagramStep =
  | { type: "narrative" }
  | {
      type: "array";
      values: (number | string)[];
      highlights?: number[];
      pointers?: { label: string; index: number; color?: string }[];
      window?: [number, number];
    }
  | {
      type: "hashmap";
      entries: { key: string; value: string; active?: boolean }[];
      lookup?: string;
    }
  | {
      type: "grid";
      matrix: (0 | 1)[][];
      visited?: [number, number][];
      current?: [number, number];
      frontier?: [number, number][];
      path?: [number, number][];
    }
  | {
      type: "linked-list";
      values: (number | string)[];
      pointers?: { label: string; index: number; color?: string }[];
      removedIndex?: number;
    };

export interface Slide {
  caption: string;
  diagram: DiagramStep;
}

export interface Approach {
  name: string;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestCase?: string;
  worstCase?: string;
  slides: Slide[];
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  hints: string[];
  /** The candidate function's name differs by language convention
   * (camelCase in JS/TS, snake_case in Python), so it's keyed per language
   * rather than a single shared string. TypeScript falls back to javascript. */
  functionName: { javascript: string; python: string; typescript?: string };
  paramNames: string[];
  starterCode: StarterCode;
  visibleTests: TestCase[];
  hiddenTests: TestCase[];
  approaches: Approach[];
  followUp?: string;
  companies?: string[];
  relatedSlugs?: string[];
  prerequisiteSlugs?: string[];
  /** Rough "expect to spend" guidance shown next to difficulty, e.g. "15-20 min". */
  estimatedTime?: string;
  /** Seed stats for the demo (acceptance rate 0-100, submission/solve counts).
   * This is a frontend-only app with no backend, so these are curated/seeded
   * numbers rather than live telemetry — see statsFallback in publicProblem.ts
   * for problems that don't set them explicitly. */
  acceptanceRate?: number;
  submissions?: number;
  solves?: number;
}
