import { Problem } from "../types";

export const containsDuplicate: Problem = {
  id: "2",
  slug: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description:
    "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and `false` if every element is distinct.",
  examples: [
    { input: "nums = [1,2,3,1]", output: "true" },
    { input: "nums = [1,2,3,4]", output: "false" },
    { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
  ],
  constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
  hints: [
    "Sorting the array would put duplicates next to each other — but can you avoid the O(n log n) cost?",
    "A hash set lets you check 'have I seen this before?' in O(1).",
  ],
  functionName: { javascript: "containsDuplicate", python: "contains_duplicate" },
  paramNames: ["nums"],
  starterCode: {
    javascript: "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction containsDuplicate(nums) {\n  \n}",
    python: "def contains_duplicate(nums):\n    \"\"\"\n    :type nums: List[int]\n    :rtype: bool\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[1, 2, 3, 1]], expected: true },
    { input: [[1, 2, 3, 4]], expected: false },
    { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
  ],
  hiddenTests: [
    { input: [[1]], expected: false },
    { input: [[]], expected: false },
    { input: [[5, 5]], expected: true },
    { input: [Array.from({ length: 200 }, (_, i) => i)], expected: false },
  ],
  approaches: [
    {
      name: "Sort First",
      summary: "Sort the array, then scan for two adjacent equal elements. Simple and low on extra memory, but pays a sorting cost.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1) extra (in-place sort) / O(n) if the sort isn't in place",
      slides: [
        { caption: "Original order — duplicates can be scattered anywhere.", diagram: { type: "array", values: [4, 3, 2, 7, 8, 2, 1] } },
        { caption: "Sort the array — now equal values are guaranteed to be adjacent.", diagram: { type: "array", values: [1, 2, 2, 3, 4, 7, 8], highlights: [1, 2] } },
        { caption: "Scan neighbor pairs; the moment nums[i] === nums[i+1], report a duplicate.", diagram: { type: "array", values: [1, 2, 2, 3, 4, 7, 8], pointers: [{ label: "i", index: 1, color: "amber" }, { label: "i+1", index: 2, color: "sky" }], highlights: [1, 2] } },
      ],
    },
    {
      name: "Hash Set",
      summary: "Walk the array once, adding each value to a hash set. If a value is already in the set, it's a duplicate — return true immediately.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      slides: [
        { caption: "Keep a hash set of values seen so far — starts empty.", diagram: { type: "hashmap", entries: [] } },
        { caption: "Visit 1, 2, 3 — none seen before, add each to the set.", diagram: { type: "hashmap", entries: [{ key: "1", value: "seen" }, { key: "2", value: "seen" }, { key: "3", value: "seen" }] } },
        { caption: "Visit 1 again — it's already in the set! We can stop and return true right away.", diagram: { type: "hashmap", entries: [{ key: "1", value: "seen", active: true }, { key: "2", value: "seen" }, { key: "3", value: "seen" }], lookup: "1" } },
        { caption: "If we reach the end of the array without a hit, every value was unique — return false.", diagram: { type: "array", values: [1, 2, 3, 1] } },
      ],
    },
  ],
};
