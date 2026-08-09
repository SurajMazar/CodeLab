// Builds the full source file that actually gets executed for a submission:
// the learner's function definition, plus a small driver appended after it
// that calls the function against every test case and prints a single
// JSON blob wrapped in unmistakable markers so we can find it inside
// whatever else the user's code printed to stdout.

export const RESULT_START = "__DSA_RESULTS_START__";
export const RESULT_END = "__DSA_RESULTS_END__";

export interface HarnessTest {
  input: unknown[];
}

export function buildJsHarness(userCode: string, functionName: string, tests: HarnessTest[]): string {
  const testsJson = JSON.stringify(tests.map((t) => t.input));
  return `
"use strict";
${userCode}

(function () {
  const __tests = ${testsJson};
  const __results = [];
  for (const __args of __tests) {
    const __start = process.hrtime.bigint();
    let __output = null;
    let __error = null;
    try {
      __output = ${functionName}(...__args);
      if (__output === undefined) __output = null;
    } catch (e) {
      __error = (e && e.message) ? String(e.message) : String(e);
    }
    const __end = process.hrtime.bigint();
    __results.push({ output: __output, error: __error, ms: Number(__end - __start) / 1e6 });
  }
  process.stdout.write(${JSON.stringify(RESULT_START)} + JSON.stringify(__results) + ${JSON.stringify(RESULT_END)});
})();
`;
}

export function buildPythonHarness(userCode: string, functionName: string, tests: HarnessTest[]): string {
  const testsJson = JSON.stringify(tests.map((t) => t.input));
  // Use base64-ish safe embedding via a raw JSON string; Python's json module
  // parses standard JSON directly so no extra escaping is required beyond
  // guarding against a literal ''' inside the payload (numbers/strings from
  // our seed data never contain it, but we use double-quoted json.loads to
  // be safe regardless).
  return `
import json, time, sys

${userCode}

def __run():
    __tests = json.loads(${JSON.stringify(testsJson)})
    __results = []
    for __args in __tests:
        __start = time.perf_counter()
        __output = None
        __error = None
        try:
            __output = ${functionName}(*__args)
        except Exception as e:
            __error = str(e)
        __ms = (time.perf_counter() - __start) * 1000
        __results.append({"output": __output, "error": __error, "ms": __ms})
    sys.stdout.write(${JSON.stringify(RESULT_START)} + json.dumps(__results) + ${JSON.stringify(RESULT_END)})

__run()
`;
}

export interface ParsedTestResult {
  output: unknown;
  error: string | null;
  ms: number;
}

export function parseHarnessOutput(stdout: string): ParsedTestResult[] | null {
  const startIdx = stdout.indexOf(RESULT_START);
  const endIdx = stdout.indexOf(RESULT_END);
  if (startIdx === -1 || endIdx === -1) return null;
  const json = stdout.slice(startIdx + RESULT_START.length, endIdx);
  try {
    return JSON.parse(json) as ParsedTestResult[];
  } catch {
    return null;
  }
}
