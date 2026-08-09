import { Problem } from "../types";

export const threeSum: Problem = {
  id: "10",
  slug: "three-sum",
  title: "3Sum",
  difficulty: "Medium",
  tags: ["Array", "Two Pointers", "Sorting"],
  description:
    "Given an integer array `nums`, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and nums[i] + nums[j] + nums[k] == 0. The result must not contain duplicate triplets.",
  examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
    { input: "nums = [0,1,1]", output: "[]" },
    { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
  ],
  constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
  hints: [
    "Sorting the array first makes duplicate-skipping and two-pointer scanning much easier.",
    "Fix one number, then use the classic two-sum-on-sorted-array two-pointer trick for the remaining two.",
    "Skip over duplicate values at every position to avoid emitting the same triplet twice.",
  ],
  functionName: { javascript: "threeSum", python: "three_sum" },
  paramNames: ["nums"],
  starterCode: {
    javascript: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction threeSum(nums) {\n  \n}",
    python: "def three_sum(nums):\n    \"\"\"\n    :type nums: List[int]\n    :rtype: List[List[int]]\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], compare: "set" },
    { input: [[0, 1, 1]], expected: [], compare: "set" },
    { input: [[0, 0, 0]], expected: [[0, 0, 0]], compare: "set" },
  ],
  hiddenTests: [
    { input: [[0, 0, 0, 0]], expected: [[0, 0, 0]], compare: "set" },
    { input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]], compare: "set" },
    { input: [[1, 2, -2, -1]], expected: [], compare: "set" },
  ],
  approaches: [
    {
      name: "Brute Force",
      summary: "Try every triplet of indices and check whether they sum to zero, using a set to dedupe results afterward.",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n) for dedup storage",
      slides: [
        { caption: "Three nested loops try every combination of i < j < k.", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2], pointers: [{ label: "i", index: 0 }, { label: "j", index: 1 }, { label: "k", index: 2 }], highlights: [0, 1, 2] } },
        { caption: "Works, but with n up to 3000 this is far too slow, and duplicate triplets need extra bookkeeping.", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2] } },
      ],
    },
    {
      name: "Sort + Two Pointers",
      summary: "Sort the array. Fix each number in turn as the first of the triplet, then use two pointers (one from just after it, one from the end) walking toward each other to find pairs that complete the sum to zero.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1) extra (ignoring the sort and output)",
      slides: [
        { caption: "Sort first: [-4, -1, -1, 0, 1, 2]. Sorted order makes duplicate-skipping and two-pointer movement possible.", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2] } },
        { caption: "Fix i = 0 (value -4). Set left just after i, right at the array's end.", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2], pointers: [{ label: "i", index: 0, color: "violet" }, { label: "L", index: 1, color: "amber" }, { label: "R", index: 5, color: "sky" }] } },
        { caption: "-4 + -1 + 2 = -3, too small — move L right to increase the sum.", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2], pointers: [{ label: "i", index: 0, color: "violet" }, { label: "L", index: 2, color: "amber" }, { label: "R", index: 5, color: "sky" }] } },
        { caption: "Now fix i = 1 (value -1). L starts at 2, R at 5: -1 + -1 + 2 = 0 — a match! Record [-1, -1, 2].", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2], pointers: [{ label: "i", index: 1, color: "violet" }, { label: "L", index: 2, color: "amber" }, { label: "R", index: 5, color: "sky" }], highlights: [1, 2, 5] } },
        { caption: "Move both L and R inward, skipping any duplicate values, and keep scanning: next match is [-1, 0, 1].", diagram: { type: "array", values: [-4, -1, -1, 0, 1, 2], highlights: [1, 3, 4] } },
      ],
    },
  ],
};
