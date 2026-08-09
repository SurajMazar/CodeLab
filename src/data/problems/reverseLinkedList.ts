import { Problem } from "../types";

// Represented as a plain array for the judge harness — index 0 is HEAD.
export const reverseLinkedList: Problem = {
  id: "6",
  slug: "reverse-linked-list",
  title: "Reverse Linked List",
  difficulty: "Easy",
  tags: ["Linked List", "Recursion"],
  description:
    "Given the head of a singly linked list (represented here as an array of values from head to tail for simplicity), reverse the list and return the new head order as an array.",
  examples: [
    { input: "list = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
    { input: "list = [1,2]", output: "[2,1]" },
  ],
  constraints: ["0 <= list.length <= 5000", "-5000 <= list[i] <= 5000"],
  hints: [
    "You only have a 'next' pointer on each node — reversing means flipping each next pointer to point backward.",
    "Keep three pointers as you walk: previous, current, and next — relink current.next = previous, then advance all three.",
  ],
  functionName: { javascript: "reverseList", python: "reverse_list" },
  paramNames: ["list"],
  starterCode: {
    javascript:
      "/**\n * list is given as a plain array [head, ..., tail].\n * Return the reversed array [newHead, ..., newTail].\n * @param {number[]} list\n * @return {number[]}\n */\nfunction reverseList(list) {\n  \n}",
    python:
      "def reverse_list(list):\n    \"\"\"\n    list is given as a plain array [head, ..., tail].\n    Return the reversed array [newHead, ..., newTail].\n    :type list: List[int]\n    :rtype: List[int]\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { input: [[1, 2]], expected: [2, 1] },
  ],
  hiddenTests: [
    { input: [[]], expected: [] },
    { input: [[1]], expected: [1] },
    { input: [[7, 7, 7]], expected: [7, 7, 7] },
    { input: [[1, 2, 3, 4, 5, 6, 7]], expected: [7, 6, 5, 4, 3, 2, 1] },
  ],
  approaches: [
    {
      name: "Iterative (Three Pointers)",
      summary: "Walk the list once, flipping each node's next pointer to point at the previous node instead of the next one.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      slides: [
        { caption: "HEAD points at node 1 → 2 → 3 → 4 → 5 → NULL.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5] } },
        { caption: "prev = null, curr = HEAD. Save curr.next before we overwrite it.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5], pointers: [{ label: "curr", index: 0, color: "amber" }] } },
        { caption: "Point curr.next backward at prev (null for now), then advance prev and curr forward.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5], pointers: [{ label: "prev", index: 0, color: "violet" }, { label: "curr", index: 1, color: "amber" }] } },
        { caption: "Repeat: node 2 now points back at node 1. prev and curr both slide one step forward.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5], pointers: [{ label: "prev", index: 1, color: "violet" }, { label: "curr", index: 2, color: "amber" }] } },
        { caption: "After the loop finishes, prev sits on the old tail — the new head. The list now reads 5 → 4 → 3 → 2 → 1.", diagram: { type: "linked-list", values: [5, 4, 3, 2, 1] } },
      ],
    },
    {
      name: "Recursive",
      summary: "Recurse to the end of the list first, then relink pointers backward as the call stack unwinds.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) — call stack depth",
      slides: [
        { caption: "Recurse forward: reverse(1) needs reverse(2), which needs reverse(3), and so on to the tail.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5] } },
        { caption: "Base case: we reach the last node (5) — it becomes the new head of the reversed list.", diagram: { type: "linked-list", values: [1, 2, 3, 4, 5], pointers: [{ label: "base", index: 4, color: "violet" }] } },
        { caption: "As recursion unwinds, each node sets the next node's `.next` to point back at itself.", diagram: { type: "linked-list", values: [5, 4, 3, 2, 1] } },
        { caption: "By the time the outermost call returns, every link has been flipped — same result as the iterative approach, traded stack space for shorter code.", diagram: { type: "linked-list", values: [5, 4, 3, 2, 1] } },
      ],
    },
  ],
};
