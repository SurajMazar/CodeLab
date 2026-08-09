import { notFound } from "next/navigation";
import { getProblemBySlug, problems } from "@/data/problems";
import { toPublicProblem } from "@/data/publicProblem";
import { ProblemWorkspace } from "@/components/ProblemDetail/ProblemWorkspace";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export default async function ProblemPage({ params }: PageProps<"/problems/[slug]">) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  return <ProblemWorkspace problem={toPublicProblem(problem)} />;
}
