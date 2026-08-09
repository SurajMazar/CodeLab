"use client";

import { ReactNode, useCallback, useRef, useState } from "react";

export function ResizableSplit({ left, right }: { left: ReactNode; right: ReactNode }) {
  const [leftPct, setLeftPct] = useState(42);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setLeftPct(Math.min(70, Math.max(25, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="flex h-full w-full overflow-hidden"
    >
      <div style={{ width: `${leftPct}%` }} className="h-full overflow-hidden border-r border-[var(--border)]">
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        className="group relative w-1.5 shrink-0 cursor-col-resize bg-[var(--border)]/40 hover:bg-[var(--accent)]/40"
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
      </div>
      <div style={{ width: `${100 - leftPct}%` }} className="h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}
