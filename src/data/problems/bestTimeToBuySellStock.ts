import { Problem } from "../types";

export const bestTimeToBuySellStock: Problem = {
  id: "4",
  slug: "best-time-to-buy-and-sell-stock",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "Easy",
  tags: ["Array", "Greedy", "Dynamic Programming"],
  description:
    "You're given an array `prices` where `prices[i]` is the price of a stock on day i. You want to maximize profit by choosing a single day to buy and a later single day to sell. Return the maximum profit; if no profit is possible, return 0.",
  examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price 1), sell on day 5 (price 6), profit = 5." },
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only fall — no profitable transaction exists." },
  ],
  constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
  hints: [
    "You must buy before you sell — what's the best price seen so far as you scan forward?",
    "Track the minimum price so far, and at each day compute price - minSoFar.",
  ],
  functionName: { javascript: "maxProfit", python: "max_profit" },
  paramNames: ["prices"],
  starterCode: {
    javascript: "/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  \n}",
    python: "def max_profit(prices):\n    \"\"\"\n    :type prices: List[int]\n    :rtype: int\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
    { input: [[7, 6, 4, 3, 1]], expected: 0 },
  ],
  hiddenTests: [
    { input: [[1, 2]], expected: 1 },
    { input: [[2, 1]], expected: 0 },
    { input: [[3, 3, 3, 3]], expected: 0 },
    { input: [[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]], expected: 8 },
  ],
  approaches: [
    {
      name: "Brute Force",
      summary: "Try every pair of buy/sell days and keep the best profit found.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "For every buy day i, check every possible sell day j after it.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], pointers: [{ label: "buy", index: 1, color: "amber" }, { label: "sell", index: 4, color: "sky" }], highlights: [1, 4] } },
        { caption: "Compute prices[sell] - prices[buy] for each pair and track the maximum seen.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], highlights: [1, 4] } },
      ],
    },
    {
      name: "One Pass (Track Minimum)",
      summary: "Scan once, remembering the lowest price seen so far. At each day, the best profit if selling today is today's price minus that running minimum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "Start with minPrice = prices[0] and bestProfit = 0.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], pointers: [{ label: "min", index: 0, color: "amber" }] } },
        { caption: "Day 1: price is 1, lower than minPrice — update minPrice to 1.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], pointers: [{ label: "min", index: 1, color: "amber" }], highlights: [1] } },
        { caption: "Day 2: price is 5. Profit if we sold today would be 5 - 1 = 4 — update bestProfit.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], pointers: [{ label: "min", index: 1, color: "amber" }, { label: "today", index: 2, color: "sky" }], highlights: [1, 2] } },
        { caption: "Day 4: price is 6. Profit would be 6 - 1 = 5 — the new best.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], pointers: [{ label: "min", index: 1, color: "amber" }, { label: "today", index: 4, color: "sky" }], highlights: [1, 4] } },
        { caption: "After one full pass, bestProfit = 5 — no need to ever look backward.", diagram: { type: "array", values: [7, 1, 5, 3, 6, 4], highlights: [1, 4] } },
      ],
    },
  ],
};
