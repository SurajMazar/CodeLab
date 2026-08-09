import { spawn } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * DEMO-GRADE ISOLATION ONLY.
 *
 * This runs submitted code as a plain OS subprocess with a wall-clock
 * timeout and (on POSIX systems) a best-effort virtual-memory ulimit. It is
 * NOT a security sandbox: there is no filesystem/network namespace, no
 * seccomp filter, and no container boundary. That's an intentional,
 * explicitly-agreed trade-off for a local learning tool — see README.md
 * ("Execution model & security") for the production architecture (isolated
 * containers + a job queue) this would need before ever accepting code from
 * untrusted third parties.
 */

export interface SandboxResult {
  stdout: string;
  stderr: string;
  timedOut: boolean;
  killedForMemory: boolean;
  exitCode: number | null;
}

export interface SandboxOptions {
  language: "javascript" | "python";
  source: string;
  timeoutMs: number;
  memoryKB: number; // best-effort, POSIX only
}

export async function runInSandbox(opts: SandboxOptions): Promise<SandboxResult> {
  const dir = await mkdtemp(path.join(tmpdir(), "dsa-run-"));
  const ext = opts.language === "javascript" ? "js" : "py";
  const file = path.join(dir, `solution.${ext}`);
  await writeFile(file, opts.source, "utf8");

  const isWindows = process.platform === "win32";
  // Node's V8 reserves a large virtual address range up front (the "code
  // range") regardless of how much memory the script actually needs, so a
  // tight `ulimit -v` makes Node OOM instantly even for trivial scripts.
  // We cap actual JS heap growth with --max-old-space-size instead, and
  // give the process a generous virtual-memory ceiling just to stop truly
  // pathological allocations. Python has no such reservation quirk, so a
  // normal ulimit -v works directly.
  const runtimeInvocation =
    opts.language === "javascript" ? `node --max-old-space-size=256` : `python3`;
  const vmemLimitKB = opts.language === "javascript" ? Math.max(opts.memoryKB, 1_500_000) : opts.memoryKB;

  let command: string;
  let args: string[];
  if (isWindows) {
    const parts = runtimeInvocation.split(" ");
    command = parts[0];
    args = [...parts.slice(1), file];
  } else {
    command = "bash";
    args = ["-c", `ulimit -v ${vmemLimitKB} 2>/dev/null; exec ${runtimeInvocation} "${file}"`];
  }

  const result = await new Promise<SandboxResult>((resolve) => {
    const child = spawn(command, args, { cwd: dir, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, opts.timeoutMs);

    child.stdout.on("data", (d) => {
      stdout += d.toString();
      // Guard against runaway output (e.g. an infinite print loop).
      if (stdout.length > 2_000_000) {
        stdout = stdout.slice(0, 2_000_000);
        child.kill("SIGKILL");
      }
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString();
      if (stderr.length > 200_000) stderr = stderr.slice(0, 200_000);
    });

    child.on("close", (code, signal) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const killedForMemory = !timedOut && signal === "SIGKILL";
      resolve({ stdout, stderr, timedOut, killedForMemory, exitCode: code });
    });

    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ stdout, stderr: stderr + "\n" + String(err), timedOut, killedForMemory: false, exitCode: null });
    });
  });

  await rm(dir, { recursive: true, force: true });
  return result;
}
