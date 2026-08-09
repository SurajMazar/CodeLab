"use client";

import Editor, { loader } from "@monaco-editor/react";
import { Play, Send, Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { Language } from "@/data/types";
import { useTheme } from "@/components/ThemeProvider";

// Self-host the Monaco assets (copied into /public/monaco/vs at build time,
// see package.json "postinstall") instead of pulling them from a CDN — keeps
// the editor working fully offline and avoids a runtime dependency on a
// third-party script host.
loader.config({ paths: { vs: "/monaco/vs" } });

const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
};

export function CodeEditorPanel({
  language,
  code,
  onLanguageChange,
  onCodeChange,
  onRun,
  onSubmit,
  running,
  submitting,
  fullscreen,
  onToggleFullscreen,
  onReset,
}: {
  language: Language;
  code: string;
  onLanguageChange: (l: Language) => void;
  onCodeChange: (v: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  running: boolean;
  submitting: boolean;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onReset: () => void;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-1.5">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs font-medium"
        >
          {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1.5">
          <button onClick={onReset} title="Reset to starter code" className="rounded p-1.5 hover:bg-[var(--surface-muted)]">
            <RotateCcw size={14} />
          </button>
          <button onClick={onToggleFullscreen} title="Toggle full-screen" className="rounded p-1.5 hover:bg-[var(--surface-muted)]">
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language === "javascript" ? "javascript" : "python"}
          value={code}
          onChange={(v) => onCodeChange(v ?? "")}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 12 },
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-3 py-2">
        <button
          onClick={onRun}
          disabled={running || submitting}
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-50"
        >
          <Play size={14} /> {running ? "Running..." : "Run"}
        </button>
        <button
          onClick={onSubmit}
          disabled={running || submitting}
          className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          <Send size={14} /> {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
