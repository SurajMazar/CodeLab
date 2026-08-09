import { Problem } from "../types";

export const wordSearch: Problem = {
  id: "14",
  slug: "word-search",
  title: "Word Search",
  difficulty: "Hard",
  tags: ["Backtracking", "Matrix", "DFS"],
  description:
    "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring), and the same cell may not be reused within one word.",
  examples: [
    {
      input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
      output: "true",
    },
    {
      input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
      output: "true",
    },
  ],
  constraints: ["1 <= board length, width <= 6", "1 <= word.length <= 15"],
  hints: [
    "Try starting the search from every cell that matches the word's first letter.",
    "At each step, explore all 4 directions with DFS, temporarily marking the current cell as visited so the same path can't reuse it.",
    "Backtrack: once a direction fails, un-mark the cell so other paths can still try it.",
  ],
  functionName: { javascript: "exist", python: "exist" },
  paramNames: ["board", "word"],
  starterCode: {
    javascript: "/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n  \n}",
    python: "def exist(board, word):\n    \"\"\"\n    :type board: List[List[str]]\n    :type word: str\n    :rtype: bool\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"], expected: true },
    { input: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE"], expected: true },
    { input: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB"], expected: false },
  ],
  hiddenTests: [
    { input: [[["A"]], "A"], expected: true },
    { input: [[["A"]], "B"], expected: false },
    { input: [[["A", "A"]], "AA"], expected: true },
  ],
  approaches: [
    {
      name: "Backtracking DFS",
      summary: "Try starting at each cell matching the word's first letter. From there, DFS in all 4 directions, marking visited cells so the same cell isn't reused, and backtrack (un-mark) whenever a path dead-ends.",
      timeComplexity: "O(m·n·4^L) — L = word length, in the worst case",
      spaceComplexity: "O(L) recursion depth",
      slides: [
        { caption: "Word to find: 'ABCCED'. Scan the board for cells matching 'A', the first letter.", diagram: { type: "grid", matrix: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1]], current: [0, 0] } },
        { caption: "Found 'A' at (0,0). Mark it visited, then try DFS in each direction for the next letter 'B'.", diagram: { type: "grid", matrix: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1]], visited: [[0, 0]], current: [0, 1] } },
        { caption: "'B' matches at (0,1) — mark it visited too, and continue the chain: 'C' at (0,2).", diagram: { type: "grid", matrix: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1]], visited: [[0, 0], [0, 1]], current: [0, 2] } },
        { caption: "The next 'C' needs to come from (1,2), not (0,2) again — DFS explores downward and finds it.", diagram: { type: "grid", matrix: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1]], visited: [[0, 0], [0, 1], [0, 2]], current: [1, 2] } },
        { caption: "If a branch ever fails to extend the word, backtrack — un-mark that cell and try a different neighbor. Continuing this way traces out the full path for 'ABCCED', so the answer is true.", diagram: { type: "grid", matrix: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1]], visited: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]] } },
      ],
    },
  ],
};
