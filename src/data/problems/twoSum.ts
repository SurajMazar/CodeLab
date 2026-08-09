import { Problem } from "../types";

export const twoSum: Problem = {
  id: "1",
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description:
    "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice. Return the answer in any order.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    { input: "nums = [3,3], target = 6", output: "[0,1]" },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Exactly one valid answer exists.",
  ],
  hints: [
    "What data structure could help you remember values you've already seen?",
    "Can you store each number and its index as you scan the array?",
    "Consider using a hash map: for each number, check if target - number was already seen.",
  ],
  functionName: { javascript: "twoSum", python: "two_sum" },
  paramNames: ["nums", "target"],
  starterCode: {
    javascript:
      "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  \n}",
    python:
      "def two_sum(nums, target):\n    \"\"\"\n    :type nums: List[int]\n    :type target: int\n    :rtype: List[int]\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1], compare: "set" },
    { input: [[3, 2, 4], 6], expected: [1, 2], compare: "set" },
    { input: [[3, 3], 6], expected: [0, 1], compare: "set" },
  ],
  hiddenTests: [
    { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], compare: "set" },
    { input: [[0, 4, 3, 0], 0], expected: [0, 3], compare: "set" },
    { input: [[1, 5, 3, 7, 9, 2], 11], expected: [4, 5], compare: "set" },
    { input: [[10, 20, 30, 40, 50], 90], expected: [3, 4], compare: "set" },
  ],
  approaches: [
    {
      name: "Brute Force",
      summary:
        "Check every pair of numbers and see if they add up to the target. Simple to reason about, but re-examines pairs unnecessarily.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n²) — every pair must still be checked in the worst layout",
      worstCase: "O(n²)",
      slides: [
        { caption: "We're given an array and a target sum. We need the indices of two entries that add up to it.", diagram: { type: "array", values: [2, 7, 11, 15] } },
        { caption: "Start with the first element and compare it against every element after it.", diagram: { type: "array", values: [2, 7, 11, 15], pointers: [{ label: "i", index: 0, color: "amber" }, { label: "j", index: 1, color: "sky" }], highlights: [0, 1] } },
        { caption: "2 + 7 = 9, but that's not our target on this pass — walk j forward and keep comparing.", diagram: { type: "array", values: [2, 7, 11, 15], pointers: [{ label: "i", index: 0, color: "amber" }, { label: "j", index: 2, color: "sky" }], highlights: [0, 2] } },
        { caption: "Once every j has been tried for a given i, move i forward and reset j to i+1.", diagram: { type: "array", values: [2, 7, 11, 15], pointers: [{ label: "i", index: 1, color: "amber" }, { label: "j", index: 2, color: "sky" }], highlights: [1, 2] } },
        { caption: "7 + 11 isn't 9 either — but this exhaustive scan will eventually find every valid pair, checking O(n²) combinations in total.", diagram: { type: "array", values: [2, 7, 11, 15] } },
      ],
    },
    {
      name: "Hash Map (One Pass)",
      summary:
        "Walk the array once. For each number, check whether its complement (target - number) has already been seen. If so, we've found our pair immediately — no nested loop required.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      bestCase: "O(n) — always one full pass",
      worstCase: "O(n)",
      slides: [
        { caption: "Keep a hash map of {value: index} for numbers already visited.", diagram: { type: "array", values: [2, 7, 11, 15] } },
        { caption: "Visit index 0 (value 2). Its complement is 9 - 2 = 7, which isn't in the map yet, so we record 2 → 0.", diagram: { type: "hashmap", entries: [{ key: "2", value: "0" }] } },
        { caption: "Visit index 1 (value 7). Its complement is 9 - 7 = 2 — and 2 is already in the map!", diagram: { type: "hashmap", entries: [{ key: "2", value: "0", active: true }], lookup: "2" } },
        { caption: "That means nums[0] and nums[1] sum to the target. Return their indices [0, 1] immediately — no need to keep scanning.", diagram: { type: "array", values: [2, 7, 11, 15], highlights: [0, 1] } },
        { caption: "Because each lookup and insert into the hash map is O(1) on average, the whole scan finishes in a single O(n) pass.", diagram: { type: "hashmap", entries: [{ key: "2", value: "0" }, { key: "7", value: "1" }] } },
      ],
    },
  ],
};
