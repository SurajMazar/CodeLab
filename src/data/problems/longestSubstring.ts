import { Problem } from "../types";

export const longestSubstring: Problem = {
  id: "9",
  slug: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  tags: ["String", "Sliding Window", "Hash Table"],
  description:
    "Given a string `s`, find the length of the longest substring without repeating characters.",
  examples: [
    { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', length 3." },
    { input: 's = "bbbbb"', output: "1" },
    { input: 's = "pwwkew"', output: "3" },
  ],
  constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
  hints: [
    "Try expanding a window to the right, one character at a time.",
    "When you hit a character already inside the window, shrink the window from the left until the duplicate is gone.",
    "A hash map from character to its last-seen index lets you jump the left edge directly instead of shrinking one step at a time.",
  ],
  functionName: { javascript: "lengthOfLongestSubstring", python: "length_of_longest_substring" },
  paramNames: ["s"],
  starterCode: {
    javascript: "/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  \n}",
    python: "def length_of_longest_substring(s):\n    \"\"\"\n    :type s: str\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: ["abcabcbb"], expected: 3 },
    { input: ["bbbbb"], expected: 1 },
    { input: ["pwwkew"], expected: 3 },
  ],
  hiddenTests: [
    { input: [""], expected: 0 },
    { input: [" "], expected: 1 },
    { input: ["au"], expected: 2 },
    { input: ["dvdf"], expected: 3 },
    { input: ["abba"], expected: 2 },
  ],
  approaches: [
    {
      name: "Brute Force",
      summary: "Check every possible substring and verify whether it has repeating characters, keeping the longest valid one.",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(min(n, charset))",
      slides: [
        { caption: "Try every start and end position, and for each substring, check all characters for duplicates.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: [0, 1, 2] } },
        { caption: "This re-checks overlapping substrings from scratch every time — a lot of repeated work.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"] } },
      ],
    },
    {
      name: "Sliding Window + Hash Map",
      summary: "Grow a window with a right pointer. Track the last-seen index of each character; when a repeat enters the window, jump the left edge past the previous occurrence instead of shrinking one step at a time.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(n, charset))",
      slides: [
        { caption: "left = 0, right = 0. Window starts empty, growing one character at a time.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"], window: [0, 0] } },
        { caption: "Expand right through 'a', 'b', 'c' — no repeats yet, window = 'abc', length 3.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"], window: [0, 2] } },
        { caption: "Right reaches index 3 ('a') — but 'a' is already in the window at index 0! Record 'a' → 0 in the map.", diagram: { type: "hashmap", entries: [{ key: "a", value: "0", active: true }, { key: "b", value: "1" }, { key: "c", value: "2" }], lookup: "a" } },
        { caption: "Jump left to just past the previous 'a': left = 1. Window is now 'bca' — still no duplicate, still length 3.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"], window: [1, 3] } },
        { caption: "Continue sliding right; whenever a repeat shows up, jump left past its last occurrence. Track the max window length seen the whole way.", diagram: { type: "array", values: ["a", "b", "c", "a", "b", "c", "b", "b"], window: [4, 6] } },
      ],
    },
  ],
};
