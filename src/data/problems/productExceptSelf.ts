import { Problem } from "../types";

export const productExceptSelf: Problem = {
  id: "7",
  slug: "product-of-array-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  tags: ["Array", "Prefix Sum"],
  description:
    "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) and without using division.",
  examples: [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
    { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
  ],
  constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix/suffix fits in a 32-bit integer."],
  hints: [
    "answer[i] is the product of everything to the left of i, times everything to the right of i.",
    "Can you compute all the 'everything to the left' products in one pass, then fold in the right-side products in a second pass?",
  ],
  functionName: { javascript: "productExceptSelf", python: "product_except_self" },
  paramNames: ["nums"],
  starterCode: {
    javascript: "/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n  \n}",
    python: "def product_except_self(nums):\n    \"\"\"\n    :type nums: List[int]\n    :rtype: List[int]\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
    { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
  ],
  hiddenTests: [
    { input: [[2, 3]], expected: [3, 2] },
    { input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1] },
    { input: [[5, 0]], expected: [0, 5] },
    { input: [[1, 2, 3, 4, 5]], expected: [120, 60, 40, 30, 24] },
  ],
  approaches: [
    {
      name: "Division (naive, but instructive)",
      summary: "Multiply everything together, then divide out nums[i] for each position. Fails when a zero is present and the problem forbids division anyway — good to know why it's disallowed.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) extra",
      slides: [
        { caption: "Compute the total product of all elements: 1×2×3×4 = 24.", diagram: { type: "array", values: [1, 2, 3, 4] } },
        { caption: "For each index, divide the total by nums[i] — e.g. 24 / 1 = 24 for index 0.", diagram: { type: "array", values: [1, 2, 3, 4], highlights: [0] } },
        { caption: "Breaks immediately if any element is 0 (division by zero), which is exactly why the problem bans division.", diagram: { type: "array", values: [-1, 1, 0, -3, 3], highlights: [2] } },
      ],
    },
    {
      name: "Prefix & Suffix Products",
      summary: "Build a prefix-product array (product of everything to the left) and a suffix-product array (product of everything to the right), then multiply them together position-by-position.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) (O(1) extra if the output array itself is reused)",
      slides: [
        { caption: "Left pass: prefix[i] = product of all elements before i. prefix[0] = 1 (nothing to the left).", diagram: { type: "array", values: [1, 2, 3, 4] } },
        { caption: "prefix = [1, 1, 2, 6] — each entry is the running product of everything seen so far.", diagram: { type: "array", values: [1, 1, 2, 6], highlights: [0, 1, 2, 3] } },
        { caption: "Right pass: suffix[i] = product of all elements after i. suffix[3] = 1 (nothing to the right).", diagram: { type: "array", values: [24, 12, 4, 1], highlights: [3] } },
        { caption: "suffix = [24, 12, 4, 1] computed by scanning from the end backward.", diagram: { type: "array", values: [24, 12, 4, 1] } },
        { caption: "answer[i] = prefix[i] × suffix[i] → [1×24, 1×12, 2×4, 6×1] = [24, 12, 8, 6].", diagram: { type: "array", values: [24, 12, 8, 6], highlights: [0, 1, 2, 3] } },
      ],
    },
  ],
};
