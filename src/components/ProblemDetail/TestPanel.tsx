"use client";

import { Plus, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { PublicProblem } from "@/data/publicProblem";
import { RunApiResponse, SubmitApiResponse, Verdict } from "@/lib/execute/clientTypes";

export type TestTab = "testcases" | "result" | "submission";
export type CustomTestRow = string[]; // one raw text value per paramName

const verdictStyle: Record<Verdict, string> = {
  Accepted: "text-emerald-500 bg-emerald-500/10",
  "Wrong Answer": "text-rose-500 bg-rose-500/10",
  "Time Limit Exceeded": "text-amber-500 bg-amber-500/10",
  "Memory Limit Exceeded": "text-amber-500 bg-amber-500/10",
  "Compilation Error": "text-rose-500 bg-rose-500/10",
  "Runtime Error": "text-rose-500 bg-rose-500/10",
};

function fmt(v: unknown): string {
  return typeof v === "string" ? v : JSON.stringify(v);
}

export function TestPanel({
  problem,
  tab,
  onTabChange,
  customTests,
  onCustomTestsChange,
  runResponse,
  submitResponse,
  running,
  submitting,
}: {
  problem: PublicProblem;
  tab: TestTab;
  onTabChange: (t: TestTab) => void;
  customTests: CustomTestRow[];
  onCustomTestsChange: (rows: CustomTestRow[]) => void;
  runResponse: RunApiResponse | null;
  submitResponse: SubmitApiResponse | null;
  running: boolean;
  submitting: boolean;
}) {
  const addCustomRow = () => onCustomTestsChange([...customTests, problem.paramNames.map(() => "")]);
  const removeCustomRow = (i: number) => onCustomTestsChange(customTests.filter((_, idx) => idx !== i));
  const updateCustomRow = (rowIdx: number, paramIdx: number, value: string) =>
    onCustomTestsChange(customTests.map((row, i) => (i === rowIdx ? row.map((v, j) => (j === paramIdx ? value : v)) : row)));

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-[var(--border)] px-3">
        {([
          ["testcases", "Testcases"],
          ["result", "Result"],
          ["submission", "Submission"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className={`px-2.5 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${
              tab === value ? "border-[var(--accent)] text-[var(--foreground)]" : "border-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="thin-scroll flex-1 overflow-y-auto px-3 py-3 text-sm">
        {tab === "testcases" && (
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--foreground)]/60">Visible test cases</p>
              <div className="space-y-1.5">
                {problem.visibleTests.map((t, i) => (
                  <div key={i} className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 font-mono text-xs">
                    {problem.paramNames.map((p, j) => `${p} = ${fmt(t.input[j])}`).join("  ")}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-medium text-[var(--foreground)]/60">Custom test cases</p>
                <button onClick={addCustomRow} className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline">
                  <Plus size={12} /> Add
                </button>
              </div>
              {customTests.length === 0 && <p className="text-xs text-[var(--foreground)]/40">No custom tests yet — add one to try your own input.</p>}
              <div className="space-y-2">
                {customTests.map((row, i) => (
                  <div key={i} className="flex items-center gap-1.5 rounded-md border border-[var(--border)] p-2">
                    <div className="flex flex-1 flex-wrap gap-1.5">
                      {problem.paramNames.map((p, j) => (
                        <input
                          key={p}
                          value={row[j] ?? ""}
                          onChange={(e) => updateCustomRow(i, j, e.target.value)}
                          placeholder={`${p} (JSON)`}
                          className="w-32 flex-1 rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-1 font-mono text-xs"
                        />
                      ))}
                    </div>
                    <button onClick={() => removeCustomRow(i)} className="rounded p-1 text-[var(--foreground)]/40 hover:text-rose-500">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--foreground)]/40">
                Enter each argument as JSON (e.g. <code>[3,2,4]</code> or <code>6</code>). Custom tests run alongside visible tests when you click Run.
              </p>
            </div>
          </div>
        )}

        {tab === "result" && (
          <div className="space-y-3">
            {running && (
              <div className="flex items-center gap-2 text-[var(--foreground)]/60">
                <Loader2 size={14} className="animate-spin" /> Running against visible test cases...
              </div>
            )}
            {!running && !runResponse && <p className="text-xs text-[var(--foreground)]/40">Click Run to test your solution against the visible test cases.</p>}
            {!running && runResponse && (
              <>
                {runResponse.result.stderr && (
                  <pre className="whitespace-pre-wrap rounded-md border border-rose-500/30 bg-rose-500/10 p-3 font-mono text-xs text-rose-500">
                    {runResponse.result.stderr}
                  </pre>
                )}
                <div className="space-y-1.5">
                  {runResponse.result.outcomes.map((o, i) => (
                    <div key={i} className="rounded-md border border-[var(--border)] p-2.5">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium">
                        {o.passed ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-rose-500" />}
                        Case {i + 1} · {o.ms.toFixed(2)}ms
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-xs text-[var(--foreground)]/70">
                        Input: {problem.paramNames.map((p, j) => `${p}=${fmt(o.input?.[j])}`).join(", ")}
                        {"\n"}Expected: {fmt(o.expected)}
                        {"\n"}Your Output: {o.error ? `Error: ${o.error}` : fmt(o.actual)}
                      </pre>
                    </div>
                  ))}
                </div>

                {runResponse.customResult && runResponse.customResult.outcomes.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-[var(--foreground)]/60">Custom test output</p>
                    <div className="space-y-1.5">
                      {runResponse.customResult.outcomes.map((o, i) => (
                        <pre key={i} className="whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-2.5 font-mono text-xs">
                          Input: {problem.paramNames.map((p, j) => `${p}=${fmt(o.input[j])}`).join(", ")}
                          {"\n"}Output: {o.error ? `Error: ${o.error}` : fmt(o.output)}
                        </pre>
                      ))}
                    </div>
                  </div>
                )}
                {runResponse.customResult?.error && (
                  <pre className="whitespace-pre-wrap rounded-md border border-rose-500/30 bg-rose-500/10 p-3 font-mono text-xs text-rose-500">
                    {runResponse.customResult.error}
                  </pre>
                )}
              </>
            )}
          </div>
        )}

        {tab === "submission" && (
          <div className="space-y-3">
            {submitting && (
              <div className="flex items-center gap-2 text-[var(--foreground)]/60">
                <Loader2 size={14} className="animate-spin" /> Running the hidden test suite...
              </div>
            )}
            {!submitting && !submitResponse && <p className="text-xs text-[var(--foreground)]/40">Click Submit to run your solution against the full hidden test suite.</p>}
            {!submitting && submitResponse && (
              <>
                <div className={`rounded-md px-3 py-2 text-sm font-semibold ${verdictStyle[submitResponse.result.verdict]}`}>{submitResponse.result.verdict}</div>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--foreground)]/60">
                  <span>
                    {submitResponse.result.passed} / {submitResponse.result.total} tests passed
                  </span>
                  <span>Runtime: {submitResponse.result.runtimeMs}ms</span>
                  <span>Memory: {submitResponse.result.memoryLabel}</span>
                </div>
                {submitResponse.result.stderr && (
                  <pre className="whitespace-pre-wrap rounded-md border border-rose-500/30 bg-rose-500/10 p-3 font-mono text-xs text-rose-500">
                    {submitResponse.result.stderr}
                  </pre>
                )}
                {submitResponse.result.outcomes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {submitResponse.result.outcomes.map((o) => (
                      <span
                        key={o.index}
                        className={`rounded px-2 py-1 text-xs font-mono ${o.passed ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
                      >
                        {o.passed ? "✓" : "✗"} Hidden {o.index + 1}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-[var(--foreground)]/40">Hidden test inputs are never sent to the browser — only pass/fail per case.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
