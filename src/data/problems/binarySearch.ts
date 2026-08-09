import { Problem } from "../types";

export const binarySearch: Problem = {
  id: "5",
  slug: "binary-search",
  title: "Binary Search",
  difficulty: "Easy",
  tags: ["Array", "Binary Search"],
  description:
    "Given a sorted (ascending) integer array `nums` and an integer `target`, return the index of `target` if it exists in `nums`, or -1 if it doesn't. You must write an algorithm with O(log n) runtime complexity.",
  examples: [
    { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
    { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
  ],
  constraints: ["1 <= nums.length <= 10^4", "nums is sorted in strictly increasing order.", "-10^4 < nums[i], target < 10^4"],
  hints: [
    "Since the array is sorted, comparing against the middle element tells you which half to discard.",
    "Keep a low and high pointer; narrow the range until it's empty or you find the target.",
  ],
  functionName: { javascript: "search", python: "search" },
  paramNames: ["nums", "target"],
  starterCode: {
    javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  \n}",
    python: "def search(nums, target):\n    \"\"\"\n    :type nums: List[int]\n    :type target: int\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
  ],
  hiddenTests: [
    { input: [[5], 5], expected: 0 },
    { input: [[5], -5], expected: -1 },
    { input: [[1, 3, 5, 7, 9, 11, 13], 1], expected: 0 },
    { input: [[1, 3, 5, 7, 9, 11, 13], 13], expected: 6 },
  ],
  approaches: [
    {
      name: "Linear Scan",
      summary: "Check every element left to right until you find the target. Correct, but ignores the fact the array is sorted.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "Without using the sorted order, we'd have to check each element one at a time.", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "i", index: 0 }] } },
        { caption: "This works, but wastes the key property of the input: it's sorted!", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "i", index: 4 }], highlights: [4] } },
      ],
    },
    {
      name: "Binary Search",
      summary: "Maintain a low/high window over the sorted array. Compare the target with the middle element and discard the half that can't contain it — repeat until found or the window is empty.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "Start with the full range: low = 0, high = 5.", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "lo", index: 0, color: "amber" }, { label: "hi", index: 5, color: "sky" }] } },
        { caption: "Middle index is 2 (value 3). Target 9 is greater, so the answer must be in the right half.", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "lo", index: 0, color: "amber" }, { label: "mid", index: 2, color: "violet" }, { label: "hi", index: 5, color: "sky" }], highlights: [2] } },
        { caption: "Discard the left half — move low to mid + 1 = 3.", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "lo", index: 3, color: "amber" }, { label: "hi", index: 5, color: "sky" }], window: [3, 5] } },
        { caption: "New middle is index 4 (value 9) — that's exactly our target! Return 4.", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], pointers: [{ label: "mid", index: 4, color: "violet" }], highlights: [4] } },
        { caption: "Each step halves the search space, so it takes only O(log n) comparisons instead of O(n).", diagram: { type: "array", values: [-1, 0, 3, 5, 9, 12], highlights: [4] } },
      ],
    },
  ],
};
