import { NextRequest, NextResponse } from "next/server";
import { getProblemBySlug } from "@/data/problems";
import { judgeSubmission, runCustomTests } from "@/lib/execute/judge";
import { Language } from "@/data/types";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ExecuteRequestBody {
  slug: string;
  language: Language;
  code: string;
  mode: "run" | "submit";
  customTests?: { input: unknown[] }[];
}

export async function POST(req: NextRequest) {
  let body: ExecuteRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { slug, language, code, mode, customTests } = body;

  if (!slug || !language || typeof code !== "string" || !mode) {
    return NextResponse.json({ error: "Missing slug, language, code, or mode." }, { status: 400 });
  }
  if (language !== "javascript" && language !== "python") {
    return NextResponse.json({ error: "Unsupported language." }, { status: 400 });
  }
  if (code.length > 20_000) {
    return NextResponse.json({ error: "Submission is too long." }, { status: 400 });
  }

  const problem = getProblemBySlug(slug);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found." }, { status: 404 });
  }

  const functionName = problem.functionName[language];

  try {
    if (mode === "submit") {
      const result = await judgeSubmission({
        language,
        code,
        functionName,
        tests: problem.hiddenTests,
        revealDetails: false,
      });
      return NextResponse.json({ mode: "submit", result });
    }

    // mode === "run": visible tests always show full detail, plus any
    // custom test cases the learner typed in (executed, not graded).
    const visibleResult = await judgeSubmission({
      language,
      code,
      functionName,
      tests: problem.visibleTests,
      revealDetails: true,
    });

    let customResult = null;
    if (customTests && customTests.length > 0) {
      const capped = customTests.slice(0, 10).map((t) => t.input);
      customResult = await runCustomTests({ language, code, functionName, inputs: capped });
    }

    return NextResponse.json({ mode: "run", result: visibleResult, customResult });
  } catch (err) {
    return NextResponse.json({ error: `Execution failed: ${String(err)}` }, { status: 500 });
  }
}
