"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Slide } from "@/data/types";
import { DiagramRenderer } from "../Diagrams/DiagramRenderer";

const SPEEDS = [0.5, 1, 1.5, 2];

export function SlideViewer({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIndex((i) => {
          if (i >= slides.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, 1800 / speed);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed, slides.length]);

  const slide = slides[index];
  const atEnd = index === slides.length - 1;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="min-h-[220px] overflow-hidden rounded-t-lg bg-[var(--surface-muted)]">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <DiagramRenderer step={slide.diagram} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.p key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm leading-relaxed text-[var(--foreground)]/90">
            {slide.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setPlaying(false);
              setIndex((i) => Math.max(0, i - 1));
            }}
            disabled={index === 0}
            className="rounded p-1.5 hover:bg-[var(--surface-muted)] disabled:opacity-30"
            aria-label="Step back"
          >
            <SkipBack size={15} />
          </button>
          <button
            onClick={() => {
              if (atEnd) {
                setIndex(0);
                setPlaying(true);
              } else {
                setPlaying((p) => !p);
              }
            }}
            className="rounded-full bg-[var(--accent)] p-2 text-white hover:opacity-90"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setIndex((i) => Math.min(slides.length - 1, i + 1));
            }}
            disabled={atEnd}
            className="rounded p-1.5 hover:bg-[var(--surface-muted)] disabled:opacity-30"
            aria-label="Step forward"
          >
            <SkipForward size={15} />
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setIndex(0);
            }}
            className="rounded p-1.5 hover:bg-[var(--surface-muted)]"
            aria-label="Restart"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--foreground)]/50">
            Slide {index + 1} / {slides.length}
          </span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-1 text-xs"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}×
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-1 px-4 pb-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setIndex(i);
            }}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i === index ? "bg-[var(--accent)]" : i < index ? "bg-[var(--accent)]/40" : "bg-[var(--border)]"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
