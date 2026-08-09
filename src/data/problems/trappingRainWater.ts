import { Problem } from "../types";

export const trappingRainWater: Problem = {
  id: "13",
  slug: "trapping-rain-water",
  title: "Trapping Rain Water",
  difficulty: "Hard",
  tags: ["Array", "Two Pointers", "Dynamic Programming"],
  description:
    "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
    { input: "height = [4,2,0,3,2,5]", output: "9" },
  ],
  constraints: ["1 <= height.length <= 2*10^4", "0 <= height[i] <= 10^5"],
  hints: [
    "Water trapped above any bar is limited by the shorter of the tallest bar to its left and the tallest bar to its right.",
    "Precompute the max height to the left and right of every index, then sum min(leftMax, rightMax) - height[i].",
    "Can you avoid two extra arrays by using two pointers moving inward from both ends?",
  ],
  functionName: { javascript: "trap", python: "trap" },
  paramNames: ["height"],
  starterCode: {
    javascript: "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n  \n}",
    python: "def trap(height):\n    \"\"\"\n    :type height: List[int]\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
    { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
  ],
  hiddenTests: [
    { input: [[]], expected: 0 },
    { input: [[1]], expected: 0 },
    { input: [[5, 4, 3, 2, 1]], expected: 0 },
    { input: [[3, 0, 2, 0, 4]], expected: 7 },
  ],
  approaches: [
    {
      name: "Left/Right Max Arrays",
      summary: "Precompute, for every index, the tallest bar to its left and the tallest bar to its right. The water trapped above index i is min(leftMax[i], rightMax[i]) - height[i], if positive.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      slides: [
        { caption: "Elevation map — water pools in the dips between taller bars.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] } },
        { caption: "Left pass: leftMax[i] = tallest bar from 0..i. leftMax = [0,1,1,2,2,2,2,3,3,3,3,3].", diagram: { type: "array", values: [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3] } },
        { caption: "Right pass: rightMax[i] = tallest bar from i..end. rightMax = [3,3,3,3,3,3,3,3,2,2,2,1].", diagram: { type: "array", values: [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1] } },
        { caption: "At index 2 (height 0): min(leftMax=1, rightMax=3) - 0 = 1 unit of water trapped.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: [2] } },
        { caption: "Sum this quantity over every index to get the total trapped water: 6 units.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: [1, 3, 4, 6, 7, 8, 9, 10] } },
      ],
    },
    {
      name: "Two Pointers (O(1) extra space)",
      summary: "Walk from both ends inward with pointers left and right, tracking the running max seen from each side. Move whichever pointer has the smaller running max — that side's bound is already known to be limiting.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "left = 0, right = 11. leftMax = height[0] = 0, rightMax = height[11] = 1.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], pointers: [{ label: "L", index: 0, color: "amber" }, { label: "R", index: 11, color: "sky" }] } },
        { caption: "leftMax (0) <= rightMax (1), so the left side is the limiting bound — process it and move left inward.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], pointers: [{ label: "L", index: 1, color: "amber" }, { label: "R", index: 11, color: "sky" }] } },
        { caption: "Keep advancing the pointer on the smaller-max side, adding leftMax - height[i] (or rightMax - height[i]) as trapped water each step.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], pointers: [{ label: "L", index: 3, color: "amber" }, { label: "R", index: 8, color: "sky" }], window: [3, 8] } },
        { caption: "When left and right meet, every unit of trapped water has been counted exactly once — total 6, using only O(1) extra space.", diagram: { type: "array", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] } },
      ],
    },
  ],
};
