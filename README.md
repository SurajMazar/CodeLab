# DSA Bench

A LeetCode-style Data Structures & Algorithms problem bench: a curated problem
library organized by difficulty and topic, a real multi-language code editor
with a Run / Submit judge, and a **Solution** tab that stays locked until you
choose to reveal it — and when you do, it's an interactive, slide-by-slide
walkthrough with animated diagrams, not a wall of source code.

Built with Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4,
Monaco Editor, and Framer Motion.

## Quick start

```bash
npm install     # also self-hosts the Monaco editor assets (see below)
npm run dev
```

Open http://localhost:3000/problems.

For a production build:

```bash
npm run build
npm start
```

## What's here

- **14 seeded problems** spanning Easy → Medium → Hard (Two Sum, Contains
  Duplicate, Valid Anagram, Best Time to Buy/Sell Stock, Binary Search,
  Reverse Linked List, Product of Array Except Self, Group Anagrams, Longest
  Substring Without Repeating Characters, 3Sum, Number of Islands, Search in
  Rotated Sorted Array, Trapping Rain Water, Word Search). Each has a
  description, examples, constraints, progressive hints, starter code in
  JavaScript and Python, visible test cases, a separate hidden test suite,
  and 1–2 fully-explained approaches.
- **Run vs Submit**, matching the LeetCode convention: Run executes the
  visible test cases (plus any custom test cases you add) and shows full
  input/expected/actual detail. Submit executes the hidden test suite and
  returns a verdict (Accepted / Wrong Answer / Time Limit Exceeded / Memory
  Limit Exceeded / Compilation Error / Runtime Error) with pass count,
  runtime, and per-case pass/fail — **never** the hidden inputs themselves.
- **The Solution tab is locked by default.** Revealing it shows an
  interactive slide deck per approach — play / pause / step / restart /
  speed controls driving animated array, hash map, grid, and linked-list
  diagrams — plus time/space complexity. No source code is ever shown; the
  idea is you implement it yourself and check your work against the hidden
  suite.
- **Multi-language**: JavaScript and Python today. Adding a language means
  adding a harness builder in `src/lib/execute/harness.ts`, a runtime branch
  in `src/lib/execute/sandbox.ts`, and a `starterCode` / `functionName` entry
  per problem — the rest of the UI (editor, Run/Submit, test panel) is
  already language-agnostic.
- **Local progress tracking** (solved/attempted status, per-language code
  autosave) stored in the browser via `localStorage` — no backend/database
  in this build (see "What's intentionally not built" below).

## Execution model & security — read this before deploying anywhere public

Submitted code runs as a real OS subprocess (`node` or `python3`), inside a
temp directory, with:

- a **5-second wall-clock timeout** (enforced from Node, not the OS, so it
  works identically on macOS/Linux/Windows), and
- a **best-effort memory ceiling** via `ulimit -v` on POSIX systems (Python
  gets a straightforward 512MB virtual-memory limit; Node's V8 reserves a
  large virtual address range up front regardless of actual usage, so JS
  heap growth is capped instead via `--max-old-space-size=256`, with a much
  higher `ulimit -v` floor just to stop truly pathological allocations).

**This is a demo-grade sandbox, not a security boundary.** There is no
container, no filesystem namespace, no network isolation, and no seccomp
filter — submitted code runs with the same OS-level privileges as the Next.js
process itself. That trade-off is fine for a personal/local learning tool
where you're only ever running your own code, which is what this project is.

It is **not** fine for a multi-tenant product that executes arbitrary code
from untrusted users. If you take this further in that direction, replace
`src/lib/execute/sandbox.ts` with the architecture described in the original
spec this project was built from:

```
Browser → API → Submission Service → Job Queue (Redis/BullMQ)
        → Execution Workers (one-shot, network-disabled containers)
        → Test Runner → Result → Browser
```

i.e. push each submission onto a queue, run it in a freshly-created,
network-disabled container (gVisor/Firecracker/Docker with tight cgroup
limits) that's destroyed after one run, and never let the API process itself
touch the code.

## Where the hidden tests actually live

`src/data/problems/*.ts` defines `hiddenTests` per problem. `toPublicProblem()`
(`src/data/publicProblem.ts`) strips `hiddenTests` out of every `Problem`
object before it's ever handed to a Client Component — so the hidden inputs
never end up in the page payload the browser downloads. The only place
`hiddenTests` is read is inside `/api/execute`'s `submit` branch, which runs
entirely server-side and only ever returns pass/fail + counts, never the
inputs.

## Project structure

```
src/
  data/
    types.ts               Problem / Approach / Slide / DiagramStep schema
    problems/*.ts           the 14 seeded problems (one file each)
    publicProblem.ts        strips hiddenTests before crossing to the client
  lib/
    execute/
      harness.ts            wraps user code + calls it against test inputs
      sandbox.ts             spawns the subprocess (timeout + memory limit)
      judge.ts               orchestrates harness+sandbox, computes verdicts
      compare.ts             exact / sorted / set-equality comparison modes
      clientTypes.ts         client-safe copies of the response shapes
    progressStore.ts        zustand + localStorage (solved status, autosave)
  components/
    Diagrams/                Array / HashMap / Grid / LinkedList renderers
    Solution/                SlideViewer (transport controls) + SolutionPanel
    ProblemDetail/           editor panel, test panel, resizable split, etc.
    ProblemList/             filterable problem table
  app/
    problems/                list page + [slug] detail page
    api/execute/route.ts     the judge endpoint (POST)
scripts/
  verify-testdata.ts         sanity-checks every seeded test case against a
                              known-correct reference implementation
  e2e-check.mjs               hits a running dev server and expects
                              "Accepted" for every problem × language
  copy-monaco.mjs             postinstall: copies Monaco's static assets into
                              /public so the editor is self-hosted, not CDN-loaded
```

## Extending it

**Add a problem:** create `src/data/problems/yourProblem.ts` following the
existing shape (see `twoSum.ts` for the most fully-worked example), export it
from `src/data/problems/index.ts`. Run `npm run verify-testdata` to check
your `expected` values against a reference implementation you provide in
`scripts/verify-testdata.ts` before shipping it.

**Add a diagram type:** extend the `DiagramStep` union in `src/data/types.ts`,
add a renderer in `src/components/Diagrams/`, wire it into
`DiagramRenderer.tsx`.

**Add a language:** see "Multi-language" above.

## What's intentionally not built

This started from a much larger spec (full curriculum with lessons/slides
per concept, a visual algorithm playground, contests with leaderboards, a
Postgres+Redis+queue backend, accounts). What shipped here is the slice that
was actually asked for: a problem library with a real judge and solutions
you have to reveal on purpose. The rest — structured lessons, a standalone
algorithm playground, contests, a real backend/accounts instead of
localStorage — would layer on top of this same data model and execution
pipeline without needing to redo either.
