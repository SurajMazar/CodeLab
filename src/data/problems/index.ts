import { Problem } from "../types";
import { twoSum } from "./twoSum";
import { containsDuplicate } from "./containsDuplicate";
import { validAnagram } from "./validAnagram";
import { bestTimeToBuySellStock } from "./bestTimeToBuySellStock";
import { binarySearch } from "./binarySearch";
import { reverseLinkedList } from "./reverseLinkedList";
import { productExceptSelf } from "./productExceptSelf";
import { groupAnagrams } from "./groupAnagrams";
import { longestSubstring } from "./longestSubstring";
import { threeSum } from "./threeSum";
import { numberOfIslands } from "./numberOfIslands";
import { searchRotatedArray } from "./searchRotatedArray";
import { trappingRainWater } from "./trappingRainWater";
import { wordSearch } from "./wordSearch";

export const problems: Problem[] = [
  twoSum,
  containsDuplicate,
  validAnagram,
  bestTimeToBuySellStock,
  binarySearch,
  reverseLinkedList,
  productExceptSelf,
  groupAnagrams,
  longestSubstring,
  threeSum,
  numberOfIslands,
  searchRotatedArray,
  trappingRainWater,
  wordSearch,
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export const allTags = Array.from(new Set(problems.flatMap((p) => p.tags))).sort();
