// Result comparison helpers used by the judge. Kept separate from the
// sandbox runner so they're trivially unit-testable.

function normalizeUnordered(value: unknown): unknown {
  if (Array.isArray(value)) {
    const mapped = value.map(normalizeUnordered);
    return [...mapped].sort((a, b) => {
      const as = JSON.stringify(a);
      const bs = JSON.stringify(b);
      return as < bs ? -1 : as > bs ? 1 : 0;
    });
  }
  return value;
}

export type CompareMode = "exact" | "sorted" | "set";

export function outputsMatch(actual: unknown, expected: unknown, mode: CompareMode = "exact"): boolean {
  if (mode === "exact") {
    return JSON.stringify(actual ?? null) === JSON.stringify(expected ?? null);
  }
  if (mode === "sorted") {
    const a = Array.isArray(actual) ? [...actual].sort() : actual;
    const b = Array.isArray(expected) ? [...expected].sort() : expected;
    return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  }
  // "set" — unordered equality at every nesting level.
  return JSON.stringify(normalizeUnordered(actual ?? null)) === JSON.stringify(normalizeUnordered(expected ?? null));
}
