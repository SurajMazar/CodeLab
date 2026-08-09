// Mirrors the JSON shape returned by /api/execute. Kept separate from
// judge.ts (which imports node:child_process / node:fs and can only run
// server-side) so client components can import types without pulling in
// server-only code.

export type Verdict =
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Memory Limit Exceeded"
  | "Compilation Error"
  | "Runtime Error";

export interface JudgeTestOutcome {
  index: number;
  passed: boolean;
  ms: number;
  input?: unknown[];
  expected?: unknown;
  actual?: unknown;
  error?: string | null;
}

export interface JudgeResult {
  verdict: Verdict;
  passed: number;
  total: number;
  runtimeMs: number;
  memoryLabel: string;
  outcomes: JudgeTestOutcome[];
  stderr?: string;
}

export interface CustomOutcome {
  input: unknown[];
  output: unknown;
  error: string | null;
  ms: number;
}

export interface RunApiResponse {
  mode: "run";
  result: JudgeResult;
  customResult: { outcomes: CustomOutcome[]; error?: string; timedOut?: boolean } | null;
}

export interface SubmitApiResponse {
  mode: "submit";
  result: JudgeResult;
}

export type ExecuteApiResponse = RunApiResponse | SubmitApiResponse | { error: string };
