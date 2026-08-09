// Hits the live dev server's /api/execute for every problem, in both
// languages, with a known-correct solution, and expects "Accepted".
// Also throws a couple of deliberately-wrong / slow solutions at it to
// confirm Wrong Answer / Time Limit Exceeded classification still works.

const BASE = "http://localhost:3100";

const solutions = {
  "two-sum": {
    javascript: `function twoSum(nums, target) {
      const seen = new Map();
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (seen.has(need)) return [seen.get(need), i];
        seen.set(nums[i], i);
      }
      return [];
    }`,
    python: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []`,
  },
  "contains-duplicate": {
    javascript: `function containsDuplicate(nums) { return new Set(nums).size !== nums.length; }`,
    python: `def contains_duplicate(nums):\n    return len(set(nums)) != len(nums)`,
  },
  "valid-anagram": {
    javascript: `function isAnagram(s, t) { return s.split("").sort().join("") === t.split("").sort().join(""); }`,
    python: `def is_anagram(s, t):\n    return sorted(s) == sorted(t)`,
  },
  "best-time-to-buy-and-sell-stock": {
    javascript: `function maxProfit(prices) {
      let min = Infinity, best = 0;
      for (const p of prices) { min = Math.min(min, p); best = Math.max(best, p - min); }
      return best;
    }`,
    python: `def max_profit(prices):\n    lo = float("inf")\n    best = 0\n    for p in prices:\n        lo = min(lo, p)\n        best = max(best, p - lo)\n    return best`,
  },
  "binary-search": {
    javascript: `function search(nums, target) {
      let lo = 0, hi = nums.length - 1;
      while (lo <= hi) { const mid = (lo + hi) >> 1; if (nums[mid] === target) return mid; if (nums[mid] < target) lo = mid + 1; else hi = mid - 1; }
      return -1;
    }`,
    python: `def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1`,
  },
  "reverse-linked-list": {
    javascript: `function reverseList(list) { return [...list].reverse(); }`,
    python: `def reverse_list(list):\n    return list[::-1]`,
  },
  "product-of-array-except-self": {
    javascript: `function productExceptSelf(nums) {
      const n = nums.length; const res = new Array(n).fill(1);
      let prefix = 1; for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
      let suffix = 1; for (let i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
      return res;
    }`,
    python: `def product_except_self(nums):\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res`,
  },
  "group-anagrams": {
    javascript: `function groupAnagrams(strs) {
      const map = new Map();
      for (const s of strs) { const key = s.split("").sort().join(""); if (!map.has(key)) map.set(key, []); map.get(key).push(s); }
      return [...map.values()];
    }`,
    python: `def group_anagrams(strs):\n    m = {}\n    for s in strs:\n        key = "".join(sorted(s))\n        m.setdefault(key, []).append(s)\n    return list(m.values())`,
  },
  "longest-substring-without-repeating-characters": {
    javascript: `function lengthOfLongestSubstring(s) {
      const lastSeen = new Map(); let left = 0, best = 0;
      for (let right = 0; right < s.length; right++) {
        const c = s[right];
        if (lastSeen.has(c) && lastSeen.get(c) >= left) left = lastSeen.get(c) + 1;
        lastSeen.set(c, right);
        best = Math.max(best, right - left + 1);
      }
      return best;
    }`,
    python: `def length_of_longest_substring(s):\n    last = {}\n    left = 0\n    best = 0\n    for right, c in enumerate(s):\n        if c in last and last[c] >= left:\n            left = last[c] + 1\n        last[c] = right\n        best = max(best, right - left + 1)\n    return best`,
  },
  "three-sum": {
    javascript: `function threeSum(nums) {
      const arr = [...nums].sort((a, b) => a - b);
      const res = [];
      for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        let l = i + 1, r = arr.length - 1;
        while (l < r) {
          const sum = arr[i] + arr[l] + arr[r];
          if (sum === 0) {
            res.push([arr[i], arr[l], arr[r]]);
            while (l < r && arr[l] === arr[l + 1]) l++;
            while (l < r && arr[r] === arr[r - 1]) r--;
            l++; r--;
          } else if (sum < 0) l++; else r--;
        }
      }
      return res;
    }`,
    python: `def three_sum(nums):\n    arr = sorted(nums)\n    res = []\n    n = len(arr)\n    for i in range(n - 2):\n        if i > 0 and arr[i] == arr[i-1]:\n            continue\n        l, r = i + 1, n - 1\n        while l < r:\n            s = arr[i] + arr[l] + arr[r]\n            if s == 0:\n                res.append([arr[i], arr[l], arr[r]])\n                while l < r and arr[l] == arr[l+1]:\n                    l += 1\n                while l < r and arr[r] == arr[r-1]:\n                    r -= 1\n                l += 1\n                r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    return res`,
  },
  "number-of-islands": {
    javascript: `function numIslands(grid) {
      const g = grid.map(row => [...row]);
      const rows = g.length, cols = g[0]?.length ?? 0;
      let count = 0;
      function flood(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] !== 1) return;
        g[r][c] = 0;
        flood(r+1,c); flood(r-1,c); flood(r,c+1); flood(r,c-1);
      }
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (g[r][c] === 1) { count++; flood(r,c); }
      return count;
    }`,
    python: `def num_islands(grid):\n    g = [row[:] for row in grid]\n    rows = len(g)\n    cols = len(g[0]) if rows else 0\n    count = 0\n    def flood(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or g[r][c] != 1:\n            return\n        g[r][c] = 0\n        flood(r+1,c); flood(r-1,c); flood(r,c+1); flood(r,c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if g[r][c] == 1:\n                count += 1\n                flood(r, c)\n    return count`,
  },
  "search-in-rotated-sorted-array": {
    javascript: `function search(nums, target) {
      let lo = 0, hi = nums.length - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) return mid;
        if (nums[lo] <= nums[mid]) {
          if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; else lo = mid + 1;
        } else {
          if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; else hi = mid - 1;
        }
      }
      return -1;
    }`,
    python: `def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[lo] <= nums[mid]:\n            if nums[lo] <= target < nums[mid]:\n                hi = mid - 1\n            else:\n                lo = mid + 1\n        else:\n            if nums[mid] < target <= nums[hi]:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n    return -1`,
  },
  "trapping-rain-water": {
    javascript: `function trap(height) {
      if (height.length === 0) return 0;
      let l = 0, r = height.length - 1, leftMax = height[0], rightMax = height[height.length-1], total = 0;
      while (l < r) {
        if (leftMax <= rightMax) { l++; leftMax = Math.max(leftMax, height[l]); total += leftMax - height[l]; }
        else { r--; rightMax = Math.max(rightMax, height[r]); total += rightMax - height[r]; }
      }
      return total;
    }`,
    python: `def trap(height):\n    if not height:\n        return 0\n    l, r = 0, len(height) - 1\n    left_max, right_max = height[0], height[-1]\n    total = 0\n    while l < r:\n        if left_max <= right_max:\n            l += 1\n            left_max = max(left_max, height[l])\n            total += left_max - height[l]\n        else:\n            r -= 1\n            right_max = max(right_max, height[r])\n            total += right_max - height[r]\n    return total`,
  },
  "word-search": {
    javascript: `function exist(board, word) {
      const rows = board.length, cols = board[0]?.length ?? 0;
      const visited = board.map(row => row.map(() => false));
      function dfs(r, c, i) {
        if (i === word.length) return true;
        if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || board[r][c] !== word[i]) return false;
        visited[r][c] = true;
        const found = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);
        visited[r][c] = false;
        return found;
      }
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (dfs(r,c,0)) return true;
      return false;
    }`,
    python: `def exist(board, word):\n    rows = len(board)\n    cols = len(board[0]) if rows else 0\n    visited = [[False]*cols for _ in range(rows)]\n    def dfs(r, c, i):\n        if i == len(word):\n            return True\n        if r < 0 or c < 0 or r >= rows or c >= cols or visited[r][c] or board[r][c] != word[i]:\n            return False\n        visited[r][c] = True\n        found = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)\n        visited[r][c] = False\n        return found\n    for r in range(rows):\n        for c in range(cols):\n            if dfs(r, c, 0):\n                return True\n    return False`,
  },
};

let pass = 0, fail = 0;
for (const [slug, langs] of Object.entries(solutions)) {
  for (const [language, code] of Object.entries(langs)) {
    const res = await fetch(`${BASE}/api/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, language, code, mode: "submit" }),
    });
    const data = await res.json();
    const verdict = data?.result?.verdict;
    if (verdict === "Accepted") {
      pass++;
      console.log(`✅ ${slug} [${language}] -> Accepted (${data.result.passed}/${data.result.total})`);
    } else {
      fail++;
      console.log(`❌ ${slug} [${language}] -> ${verdict}`, JSON.stringify(data.result));
    }
  }
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
