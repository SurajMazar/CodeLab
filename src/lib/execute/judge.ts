import { buildJsHarness, buildPythonHarness, parseHarnessOutput } from "./harness";
import { runInSandbox } from "./sandbox";
import { outputsMatch, CompareMode } from "./compare";
import { Language, TestCase } from "@/data/types";

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
  /** Only populated when the test case is allowed to be shown in full (Run mode / custom tests). */
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

const TIMEOUT_MS = 5000;
const MEMORY_KB = 512 * 1024; // 512MB, best-effort on POSIX

function looksLikeSyntaxError(stderr: string): boolean {
  return /SyntaxError|IndentationError|Unexpected token|Unexpected identifier/i.test(stderr);
}

export async function judgeSubmission(params: {
  language: Language;
  code: string;
  functionName: string;
  tests: TestCase[];
  /** When false (hidden/submit tests), input/expected/actual are stripped from outcomes. */
  revealDetails: boolean;
}): Promise<JudgeResult> {
  const { language, code, functionName, tests, revealDetails } = params;

  if (tests.length === 0) {
    return { verdict: "Accepted", passed: 0, total: 0, runtimeMs: 0, memoryLabel: "N/A", outcomes: [] };
  }

  const source =
    language === "javascript"
      ? buildJsHarness(code, functionName, tests)
      : buildPythonHarness(code, functionName, tests);

  const sandboxResult = await runInSandbox({
    language,
    source,
    timeoutMs: TIMEOUT_MS,
    memoryKB: MEMORY_KB,
  });

  if (sandboxResult.timedOut) {
    return {
      verdict: "Time Limit Exceeded",
      passed: 0,
      total: tests.length,
      runtimeMs: TIMEOUT_MS,
      memoryLabel: "N/A",
      outcomes: [],
      stderr: revealDetails ? sandboxResult.stderr.slice(0, 2000) : undefined,
    };
  }

  if (sandboxResult.killedForMemory) {
    return {
      verdict: "Memory Limit Exceeded",
      passed: 0,
      total: tests.length,
      runtimeMs: 0,
      memoryLabel: `> ${Math.round(MEMORY_KB / 1024)}MB`,
      outcomes: [],
    };
  }

  const parsed = parseHarnessOutput(sandboxResult.stdout);

  if (!parsed) {
    // The driver never printed its result marker — either a parse/syntax
    // error before any code ran, or an uncaught crash.
    const verdict: Verdict = looksLikeSyntaxError(sandboxResult.stderr) ? "Compilation Error" : "Runtime Error";
    return {
      verdict,
      passed: 0,
      total: tests.length,
      runtimeMs: 0,
      memoryLabel: "N/A",
      outcomes: [],
      stderr: sandboxResult.stderr.slice(0, 4000) || "The program did not produce any output.",
    };
  }

  let passed = 0;
  let totalMs = 0;
  let firstRuntimeError: string | null = null;
  const outcomes: JudgeTestOutcome[] = parsed.map((r, i) => {
    totalMs += r.ms;
    const test = tests[i];
    const compare: CompareMode = test.compare ?? "exact";
    // Note: r.error can legitimately be an empty string (e.g. Python's
    // bare `raise MemoryError()` stringifies to ""), so we must check
    // `!= null` rather than truthiness to still treat it as a failure.
    const hasError = r.error != null;
    const ok = !hasError && outputsMatch(r.output, test.expected, compare);
    if (ok) passed += 1;
    if (hasError && firstRuntimeError === null) {
      firstRuntimeError = r.error && r.error.length > 0 ? r.error : "The program raised an error with no message.";
    }

    const base: JudgeTestOutcome = { index: i, passed: ok, ms: r.ms };
    if (revealDetails) {
      base.input = test.input;
      base.expected = test.expected;
      base.actual = r.output;
      base.error = r.error;
    }
    return base;
  });

  let verdict: Verdict;
  if (firstRuntimeError !== null && passed < tests.length) {
    verdict = "Runtime Error";
  } else if (passed === tests.length) {
    verdict = "Accepted";
  } else {
    verdict = "Wrong Answer";
  }

  return {
    verdict,
    passed,
    total: tests.length,
    runtimeMs: Math.round(totalMs * 100) / 100,
    memoryLabel: "~modest (not precisely measured in this demo sandbox)",
    outcomes,
    stderr: verdict === "Runtime Error" && firstRuntimeError ? firstRuntimeError : undefined,
  };
}

export interface CustomOutcome {
  input: unknown[];
  output: unknown;
  error: string | null;
  ms: number;
}

/** Runs arbitrary user-authored test inputs with no expected value — just
 * executes and reports back stdout/return value. Used by the "Run Custom
 * Test" action. */
export async function runCustomTests(params: {
  language: Language;
  code: string;
  functionName: string;
  inputs: unknown[][];
}): Promise<{ outcomes: CustomOutcome[]; error?: string; timedOut?: boolean }> {
  const { language, code, functionName, inputs } = params;
  if (inputs.length === 0) return { outcomes: [] };

  const source =
    language === "javascript"
      ? buildJsHarness(code, functionName, inputs.map((i) => ({ input: i })))
      : buildPythonHarness(code, functionName, inputs.map((i) => ({ input: i })));

  const sandboxResult = await runInSandbox({ language, source, timeoutMs: TIMEOUT_MS, memoryKB: MEMORY_KB });

  if (sandboxResult.timedOut) return { outcomes: [], timedOut: true, error: "Time limit exceeded." };

  const parsed = parseHarnessOutput(sandboxResult.stdout);
  if (!parsed) {
    return { outcomes: [], error: sandboxResult.stderr.slice(0, 4000) || "The program did not produce any output." };
  }

  return {
    outcomes: parsed.map((r, i) => ({ input: inputs[i], output: r.output, error: r.error, ms: r.ms })),
  };
}
