"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "@/data/types";

export type ProblemStatus = "unattempted" | "attempted" | "solved";

interface ProgressState {
  status: Record<string, ProblemStatus>;
  savedCode: Record<string, Partial<Record<Language, string>>>;
  markAttempted: (slug: string) => void;
  markSolved: (slug: string) => void;
  saveCode: (slug: string, language: Language, code: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      status: {},
      savedCode: {},
      markAttempted: (slug) =>
        set((s) => ({
          status: { ...s.status, [slug]: s.status[slug] === "solved" ? "solved" : "attempted" },
        })),
      markSolved: (slug) => set((s) => ({ status: { ...s.status, [slug]: "solved" } })),
      saveCode: (slug, language, code) =>
        set((s) => ({
          savedCode: { ...s.savedCode, [slug]: { ...s.savedCode[slug], [language]: code } },
        })),
    }),
    { name: "dsa-progress" }
  )
);
