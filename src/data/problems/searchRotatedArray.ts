import { Problem } from "../types";

export const searchRotatedArray: Problem = {
  id: "12",
  slug: "search-in-rotated-sorted-array",
  title: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  tags: ["Array", "Binary Search"],
  description:
    "There is an integer array `nums` sorted in ascending order (with distinct values), possibly rotated at an unknown pivot. Given `nums` and a `target`, return the index of target if it is in nums, or -1 if it is not, in O(log n) time.",
  examples: [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
    { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
  ],
  constraints: ["1 <= nums.length <= 5000", "All values of nums are unique.", "nums is an ascending array possibly rotated."],
  hints: [
    "At any midpoint, at least one of the two halves is still a normally sorted, non-rotated range.",
    "Figure out which half is 'normal' by comparing nums[low] to nums[mid], then check if the target could live in that normal half.",
  ],
  functionName: { javascript: "search", python: "search" },
  paramNames: ["nums", "target"],
  starterCode: {
    javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  \n}",
    python: "def search(nums, target):\n    \"\"\"\n    :type nums: List[int]\n    :type target: int\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
    { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
  ],
  hiddenTests: [
    { input: [[1], 0], expected: -1 },
    { input: [[1], 1], expected: 0 },
    { input: [[5, 1, 3], 5], expected: 0 },
    { input: [[6, 7, 0, 1, 2, 4, 5], 4], expected: 5 },
  ],
  approaches: [
    {
      name: "Linear Scan",
      summary: "Simply scan every element for the target. Correct, but ignores the rotated-sorted structure entirely.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "Without exploiting structure, we'd just check each element in order.", diagram: { type: "array", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ label: "i", index: 0 }] } },
      ],
    },
    {
      name: "Modified Binary Search",
      summary: "At each step, one side of mid is guaranteed to be a normal ascending run. Determine which side that is, then decide whether the target could be in it — narrowing the search just like standard binary search.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "low = 0, high = 6, mid = 3 (value 7). nums[low]=4 <= nums[mid]=7, so the LEFT half [4,5,6,7] is normally sorted.", diagram: { type: "array", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ label: "lo", index: 0, color: "amber" }, { label: "mid", index: 3, color: "violet" }, { label: "hi", index: 6, color: "sky" }], window: [0, 3] } },
        { caption: "Target 0 is not between nums[low]=4 and nums[mid]=7, so it can't be in the sorted left half — search the right half instead.", diagram: { type: "array", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ label: "lo", index: 4, color: "amber" }, { label: "hi", index: 6, color: "sky" }], window: [4, 6] } },
        { caption: "New mid = 5 (value 1). Target 0 < 1, and this right segment is sorted, so move high to mid - 1.", diagram: { type: "array", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ label: "mid", index: 5, color: "violet" }, { label: "hi", index: 4, color: "sky" }], highlights: [4] } },
        { caption: "low and high converge on index 4 — value 0 matches the target. Return 4.", diagram: { type: "array", values: [4, 5, 6, 7, 0, 1, 2], highlights: [4] } },
      ],
    },
  ],
};
