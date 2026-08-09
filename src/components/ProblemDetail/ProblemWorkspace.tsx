"use client";

import { useEffect, useState } from "react";
import { PublicProblem } from "@/data/publicProblem";
import { Language } from "@/data/types";
import { resolveStarterCode } from "@/data/derived";
import { useProgressStore } from "@/lib/progressStore";
import { ResizableSplit } from "./ResizableSplit";
import { DescriptionPanel } from "./DescriptionPanel";
import { CodeEditorPanel } from "./CodeEditorPanel";
import { TestPanel, TestTab, CustomTestRow } from "./TestPanel";
import { RunApiResponse, SubmitApiResponse } from "@/lib/execute/clientTypes";

export function ProblemWorkspace({ problem }: { problem: PublicProblem }) {
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(problem.starterCode.javascript);
  const [fullscreen, setFullscreen] = useState(false);
  const [testTab, setTestTab] = useState<TestTab>("testcases");
  const [customTests, setCustomTests] = useState<CustomTestRow[]>([]);

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runResponse, setRunResponse] = useState<RunApiResponse | null>(null);
  const [submitResponse, setSubmitResponse] = useState<SubmitApiResponse | null>(null);

  const savedCode = useProgressStore((s) => s.savedCode[problem.slug]);
  const saveCode = useProgressStore((s) => s.saveCode);
  const markAttempted = useProgressStore((s) => s.markAttempted);
  const markSolved = useProgressStore((s) => s.markSolved);

  // Restore saved code (if any) when switching language or on mount.
  useEffect(() => {
    const restored = savedCode?.[language];
    setCode(restored ?? resolveStarterCode(problem, language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleCodeChange = (v: string) => {
    setCode(v);
    saveCode(problem.slug, language, v);
  };

  const handleReset = () => {
    const starter = resolveStarterCode(problem, language);
    setCode(starter);
    saveCode(problem.slug, language, starter);
  };

  const parseCustomTests = () =>
    customTests
      .filter((row) => row.some((v) => v.trim().length > 0))
      .map((row) => {
        try {
          return { input: row.map((v) => JSON.parse(v.trim() === "" ? "null" : v)) };
        } catch {
          return null;
        }
      })
      .filter((t): t is { input: unknown[] } => t !== null);

  const handleRun = async () => {
    setRunning(true);
    setTestTab("result");
    markAttempted(problem.slug);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: problem.slug, language, code, mode: "run", customTests: parseCustomTests() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRunResponse({
          mode: "run",
          result: { verdict: "Runtime Error", passed: 0, total: 0, runtimeMs: 0, memoryLabel: "N/A", outcomes: [], stderr: data.error },
          customResult: null,
        });
      } else {
        setRunResponse(data);
      }
    } catch (e) {
      setRunResponse({
        mode: "run",
        result: { verdict: "Runtime Error", passed: 0, total: 0, runtimeMs: 0, memoryLabel: "N/A", outcomes: [], stderr: String(e) },
        customResult: null,
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setTestTab("submission");
    markAttempted(problem.slug);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: problem.slug, language, code, mode: "submit" }),
      });
      const data: SubmitApiResponse = await res.json();
      setSubmitResponse(data);
      if (data.result?.verdict === "Accepted") markSolved(problem.slug);
    } catch (e) {
      setSubmitResponse({
        mode: "submit",
        result: { verdict: "Runtime Error", passed: 0, total: 0, runtimeMs: 0, memoryLabel: "N/A", outcomes: [], stderr: String(e) },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const rightColumn = (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <CodeEditorPanel
          language={language}
          code={code}
          onLanguageChange={setLanguage}
          onCodeChange={handleCodeChange}
          onRun={handleRun}
          onSubmit={handleSubmit}
          running={running}
          submitting={submitting}
          fullscreen={fullscreen}
          onToggleFullscreen={() => setFullscreen((f) => !f)}
          onReset={handleReset}
        />
      </div>
      <div className="h-[300px] shrink-0 border-t border-[var(--border)]">
        <TestPanel
          problem={problem}
          tab={testTab}
          onTabChange={setTestTab}
          customTests={customTests}
          onCustomTestsChange={setCustomTests}
          runResponse={runResponse}
          submitResponse={submitResponse}
          running={running}
          submitting={submitting}
        />
      </div>
    </div>
  );

  return (
    <div className={fullscreen ? "fixed inset-0 z-50 bg-[var(--background)]" : "h-[calc(100vh-56px)]"}>
      {fullscreen ? rightColumn : <ResizableSplit left={<DescriptionPanel problem={problem} />} right={rightColumn} />}
    </div>
  );
}
