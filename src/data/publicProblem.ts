import { Problem } from "./types";

/**
 * The hidden test suite must never reach the browser bundle — Submit
 * results are computed entirely server-side in /api/execute. Any time a
 * Problem crosses from a Server Component into a Client Component (which
 * gets serialized into the page payload the browser downloads), strip
 * hiddenTests first.
 */
export type PublicProblem = Omit<Problem, "hiddenTests"> & { hiddenTestCount: number };

export function toPublicProblem(problem: Problem): PublicProblem {
  const { hiddenTests, ...rest } = problem;
  return { ...rest, hiddenTestCount: hiddenTests.length };
}
