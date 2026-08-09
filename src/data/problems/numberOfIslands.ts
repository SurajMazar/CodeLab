import { Problem } from "../types";

export const numberOfIslands: Problem = {
  id: "11",
  slug: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Medium",
  tags: ["Graph", "BFS", "DFS", "Matrix"],
  description:
    "Given an `m x n` 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
  examples: [
    {
      input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      output: "2",
    },
  ],
  constraints: ["1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
  hints: [
    "Whenever you find an unvisited land cell, it's the start of a brand-new island — every cell connected to it is part of the same island.",
    "Use BFS or DFS to 'flood fill' and mark every connected land cell as visited so it isn't counted again.",
  ],
  functionName: { javascript: "numIslands", python: "num_islands" },
  paramNames: ["grid"],
  starterCode: {
    javascript: "/**\n * grid is number[][] where 1 = land, 0 = water.\n * @param {number[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n  \n}",
    python: "def num_islands(grid):\n    \"\"\"\n    grid is List[List[int]] where 1 = land, 0 = water.\n    :type grid: List[List[int]]\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    {
      input: [[[1, 1, 0], [1, 1, 0], [0, 0, 1]]],
      expected: 2,
    },
    {
      input: [[[1, 1, 1, 1, 0], [1, 1, 0, 1, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0]]],
      expected: 1,
    },
  ],
  hiddenTests: [
    { input: [[[0, 0], [0, 0]]], expected: 0 },
    { input: [[[1]]], expected: 1 },
    { input: [[[1, 0, 1, 0, 1]]], expected: 3 },
  ],
  approaches: [
    {
      name: "DFS Flood Fill",
      summary: "Scan every cell. On finding an unvisited '1', increment the island count and recursively visit (and mark) every connected land cell in all 4 directions.",
      timeComplexity: "O(m·n)",
      spaceComplexity: "O(m·n) worst case recursion stack",
      slides: [
        { caption: "Start scanning the grid left-to-right, top-to-bottom, looking for unvisited land.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], current: [0, 0] } },
        { caption: "Found land at (0,0)! This is a new island — dive into DFS, marking every connected land cell as visited.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], current: [0, 0], visited: [[0, 0]] } },
        { caption: "DFS spreads to every adjacent land cell — (0,1), (1,0), (1,1) all belong to the same island.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0], [0, 1], [1, 0], [1, 1]] } },
        { caption: "No more connected land — island #1 is fully marked. Continue the outer scan.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0], [0, 1], [1, 0], [1, 1]], current: [2, 2] } },
        { caption: "The scan reaches (2,2) — unvisited land, and not connected to island #1. That's island #2. Final count: 2.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 2]] } },
      ],
    },
    {
      name: "BFS Flood Fill",
      summary: "Same idea as DFS, but explore each island level-by-level using a queue instead of recursion — avoids deep recursion stacks on huge islands.",
      timeComplexity: "O(m·n)",
      spaceComplexity: "O(m·n) worst case queue size",
      slides: [
        { caption: "On finding land, push it into a queue instead of recursing directly.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], current: [0, 0], frontier: [[0, 0]] } },
        { caption: "Pop (0,0), mark it visited, and push all of its unvisited land neighbors — (0,1) and (1,0) — onto the queue.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0]], frontier: [[0, 1], [1, 0]] } },
        { caption: "Keep popping and expanding until the queue is empty — every cell of the island has now been visited exactly once.", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0], [0, 1], [1, 0], [1, 1]] } },
        { caption: "Resume the outer scan for the next unvisited land cell to start a fresh BFS — this finds island #2 at (2,2).", diagram: { type: "grid", matrix: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], visited: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 2]] } },
      ],
    },
  ],
};
