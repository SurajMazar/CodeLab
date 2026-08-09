import { problems } from "@/data/problems";
import { toPublicProblem } from "@/data/publicProblem";
import { ProblemListClient } from "@/components/ProblemList/ProblemListClient";

export default function ProblemsPage() {
  const publicProblems = problems.map(toPublicProblem);
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8">
      <h1 className="text-2xl font-semibold mb-1">Problem Library</h1>
      <p className="text-sm text-[var(--foreground)]/60 mb-6">
        {problems.length} problems. Pick one, write your own solution, then reveal the interactive walkthrough when you're ready.
      </p>
      <ProblemListClient problems={publicProblems} />
    </div>
  );
}
