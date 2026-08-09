import { Problem } from "../types";

export const groupAnagrams: Problem = {
  id: "8",
  slug: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  tags: ["Hash Table", "String"],
  description:
    "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    { input: 'strs = [""]', output: '[[""]]' },
  ],
  constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
  hints: [
    "Two strings are anagrams if and only if their sorted characters are identical.",
    "Use the sorted string as a hash map key, and append the original string to that key's bucket.",
  ],
  functionName: { javascript: "groupAnagrams", python: "group_anagrams" },
  paramNames: ["strs"],
  starterCode: {
    javascript: "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nfunction groupAnagrams(strs) {\n  \n}",
    python: "def group_anagrams(strs):\n    \"\"\"\n    :type strs: List[str]\n    :rtype: List[List[str]]\n    \"\"\"\n    pass",
  },
  visibleTests: [
    { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]], compare: "set" },
    { input: [[""]], expected: [[""]], compare: "set" },
  ],
  hiddenTests: [
    { input: [["a"]], expected: [["a"]], compare: "set" },
    { input: [["abc", "cba", "bac", "foo"]], expected: [["abc", "cba", "bac"], ["foo"]], compare: "set" },
    { input: [["x", "y", "z"]], expected: [["x"], ["y"], ["z"]], compare: "set" },
  ],
  approaches: [
    {
      name: "Sort as Key",
      summary: "For each word, sort its letters to build a canonical key. Words that are anagrams of each other produce the same key, so they land in the same bucket of a hash map.",
      timeComplexity: "O(n · k log k) — n words, k = average word length",
      spaceComplexity: "O(n · k)",
      slides: [
        { caption: "Given a list of words, we need to bucket the ones that are anagrams of each other.", diagram: { type: "array", values: ["eat", "tea", "tan", "ate", "nat", "bat"] } },
        { caption: "Sort the letters of 'eat' → 'aet'. Use that as a hash map key and place 'eat' in its bucket.", diagram: { type: "hashmap", entries: [{ key: "aet", value: "[eat]" }] } },
        { caption: "'tea' also sorts to 'aet' — it joins the same bucket as 'eat'.", diagram: { type: "hashmap", entries: [{ key: "aet", value: "[eat, tea]", active: true }], lookup: "aet" } },
        { caption: "'tan' sorts to 'ant' — a brand-new bucket. Continue through the whole list this way.", diagram: { type: "hashmap", entries: [{ key: "aet", value: "[eat, tea]" }, { key: "ant", value: "[tan]" }] } },
        { caption: "After processing every word: {aet: [eat, tea, ate], ant: [tan, nat], abt: [bat]} — each bucket is one anagram group.", diagram: { type: "hashmap", entries: [{ key: "aet", value: "[eat, tea, ate]" }, { key: "ant", value: "[tan, nat]" }, { key: "abt", value: "[bat]" }] } },
      ],
    },
    {
      name: "Character Count as Key",
      summary: "Instead of sorting, build a fixed-size count of each of the 26 letters per word and use that count signature as the hash map key. Avoids the log k sorting cost.",
      timeComplexity: "O(n · k) — no sorting needed",
      spaceComplexity: "O(n · k)",
      slides: [
        { caption: "For 'eat', count letters: a→1, e→1, t→1 → signature '1,0,0,0,1,...,1,...' (26 slots).", diagram: { type: "hashmap", entries: [{ key: "a1 e1 t1", value: "[eat]" }] } },
        { caption: "'tea' produces the exact same 26-slot signature — same bucket.", diagram: { type: "hashmap", entries: [{ key: "a1 e1 t1", value: "[eat, tea]", active: true }], lookup: "a1 e1 t1" } },
        { caption: "This sidesteps sorting entirely, trading it for a linear counting pass per word — faster for long words.", diagram: { type: "array", values: ["eat", "tea", "tan", "ate", "nat", "bat"] } },
      ],
    },
  ],
};
