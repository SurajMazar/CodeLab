import { Problem } from "../types";

export const validAnagram: Problem = {
  id: "3",
  slug: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  tags: ["String", "Hash Table"],
  description:
    "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram uses exactly the same letters, the same number of times, just rearranged.",
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: "true" },
    { input: 's = "rat", t = "car"', output: "false" },
  ],
  constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
  hints: [
    "If two strings are anagrams, what must be true about their sorted versions?",
    "Alternatively, could you count how many times each letter appears in each string?",
  ],
  functionName: { javascript: "isAnagram", python: "is_anagram" },
  paramNames: ["s", "t"],
  starterCode: {
    javascript: "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  \n}",
    python: "def is_anagram(s, t):\n    \"\"\"\n    :type s: str\n    :type t: str\n    :rtype: bool\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: ["anagram", "nagaram"], expected: true },
    { input: ["rat", "car"], expected: false },
  ],
  hiddenTests: [
    { input: ["a", "a"], expected: true },
    { input: ["ab", "a"], expected: false },
    { input: ["listen", "silent"], expected: true },
    { input: ["aacc", "ccac"], expected: false },
  ],
  approaches: [
    {
      name: "Sort & Compare",
      summary: "Sort both strings' characters. Anagrams become identical strings once sorted.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      slides: [
        { caption: "Two candidate strings — are they rearrangements of the same letters?", diagram: { type: "array", values: ["a", "n", "a", "g", "r", "a", "m"] } },
        { caption: "Sort the letters of s alphabetically.", diagram: { type: "array", values: ["a", "a", "a", "g", "m", "n", "r"] } },
        { caption: "Sort the letters of t the same way — if s and t are anagrams, the sorted forms must be identical.", diagram: { type: "array", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: [0, 1, 2, 3, 4, 5, 6] } },
      ],
    },
    {
      name: "Character Frequency Map",
      summary: "Count how many times each letter appears in s, then subtract counts while scanning t. If every count returns to zero, and lengths matched, they're anagrams.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) — at most 26 lowercase letters",
      slides: [
        { caption: "Build a frequency map by scanning s.", diagram: { type: "hashmap", entries: [] } },
        { caption: "After scanning 'anagram': a→3, n→1, g→1, r→1, m→1.", diagram: { type: "hashmap", entries: [{ key: "a", value: "3" }, { key: "n", value: "1" }, { key: "g", value: "1" }, { key: "r", value: "1" }, { key: "m", value: "1" }] } },
        { caption: "Now scan t ('nagaram') and decrement the matching counts as each letter is consumed.", diagram: { type: "hashmap", entries: [{ key: "a", value: "0" }, { key: "n", value: "0" }, { key: "g", value: "0" }, { key: "r", value: "0" }, { key: "m", value: "0" }] } },
        { caption: "Every count landed exactly on zero and lengths matched, so s and t are anagrams.", diagram: { type: "array", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: [0, 1, 2, 3, 4, 5, 6] } },
      ],
    },
  ],
};
