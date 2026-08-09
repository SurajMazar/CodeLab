// Derived, display-only helpers layered on top of the core Problem schema.
// Keeping these separate from types.ts means adding a new display language
// or a new seeded stat never requires touching per-problem data files.

import { Problem, Language, LANGUAGE_LABELS, EXECUTABLE_LANGUAGES } from "./types";

export function isExecutable(language: Language): boolean {
  return (EXECUTABLE_LANGUAGES as Language[]).includes(language);
}

// Small deterministic string hash (djb2-ish) — same slug always produces the
// same "seeded" stats, so numbers stay stable across renders/reloads without
// persisting anything.
function hashSlug(slug: string): number {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) + h + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export interface ResolvedStats {
  acceptanceRate: number;
  submissions: number;
  solves: number;
}

/**
 * This is a frontend-only demo with no backend telemetry, so problems that
 * don't set explicit acceptanceRate/submissions/solves get stable seeded
 * values instead (biased by difficulty, like real-world acceptance trends).
 */
export function resolveStats(problem: Pick<Problem, "slug" | "difficulty" | "acceptanceRate" | "submissions" | "solves">): ResolvedStats {
  const h = hashSlug(problem.slug);
  const baseAcceptance = problem.difficulty === "Easy" ? 63 : problem.difficulty === "Medium" ? 47 : 33;
  const acceptanceRate = problem.acceptanceRate ?? Math.min(94, Math.max(16, baseAcceptance + (h % 23) - 11));
  const submissions = problem.submissions ?? 3_200 + (h % 180_000);
  const solves = problem.solves ?? Math.round(submissions * (acceptanceRate / 100));
  return { acceptanceRate, submissions, solves };
}

export function resolveFunctionName(problem: Pick<Problem, "functionName">, language: Language): string {
  if (language === "typescript") return problem.functionName.typescript ?? problem.functionName.javascript;
  if (language === "javascript" || language === "python") return problem.functionName[language];
  return problem.functionName.javascript;
}

type PlaceholderBuilder = (fn: string, params: string[]) => string;

const PLACEHOLDER_STARTER: Partial<Record<Language, PlaceholderBuilder>> = {
  rust: (fn, params) =>
    `// ${LANGUAGE_LABELS.rust} execution is coming soon — this editor is read/write for now.\n// Signature: fn ${fn}(${params.join(", ")})\n`,
  cpp: (fn, params) =>
    `// ${LANGUAGE_LABELS.cpp} execution is coming soon — this editor is read/write for now.\n// Signature: ${fn}(${params.join(", ")})\nclass Solution {\npublic:\n    // TODO: implement ${fn}\n};`,
  c: (fn, params) =>
    `// ${LANGUAGE_LABELS.c} execution is coming soon — this editor is read/write for now.\n// Signature: ${fn}(${params.join(", ")})\n`,
  java: (fn, params) =>
    `// ${LANGUAGE_LABELS.java} execution is coming soon — this editor is read/write for now.\nclass Solution {\n    // Signature: ${fn}(${params.join(", ")})\n}`,
  go: (fn, params) =>
    `// ${LANGUAGE_LABELS.go} execution is coming soon — this editor is read/write for now.\n// Signature: func ${fn}(${params.join(", ")})\n`,
  kotlin: (fn, params) =>
    `// ${LANGUAGE_LABELS.kotlin} execution is coming soon — this editor is read/write for now.\n// Signature: fun ${fn}(${params.join(", ")})\n`,
  swift: (fn, params) =>
    `// ${LANGUAGE_LABELS.swift} execution is coming soon — this editor is read/write for now.\n// Signature: func ${fn}(${params.join(", ")})\n`,
  csharp: (fn, params) =>
    `// ${LANGUAGE_LABELS.csharp} execution is coming soon — this editor is read/write for now.\n// Signature: ${fn}(${params.join(", ")})\n`,
};

export function resolveStarterCode(
  problem: Pick<Problem, "starterCode" | "functionName" | "paramNames">,
  language: Language
): string {
  if (language === "javascript") return problem.starterCode.javascript;
  if (language === "python") return problem.starterCode.python;
  if (language === "typescript") return problem.starterCode.typescript ?? problem.starterCode.javascript;
  const fn = resolveFunctionName(problem, language);
  return PLACEHOLDER_STARTER[language]?.(fn, problem.paramNames) ?? `// ${LANGUAGE_LABELS[language]} execution is coming soon.`;
}

// Monaco has no dedicated "c" grammar; "cpp" highlighting is a close-enough
// superset for C source.
export const MONACO_LANGUAGE_ID: Record<Language, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  rust: "rust",
  cpp: "cpp",
  c: "cpp",
  java: "java",
  go: "go",
  kotlin: "kotlin",
  swift: "swift",
  csharp: "csharp",
};
