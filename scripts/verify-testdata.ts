// Standalone sanity check: runs a known-correct reference implementation
// for every seeded problem against every visible + hidden test case and
// reports any mismatch against the `expected` value baked into the data
// file. This is NOT part of the app — just a one-off authoring aid.
import { problems } from "../src/data/problems";
import { TestCase } from "../src/data/types";

function eqUnordered(a: unknown, b: unknown): boolean {
  const norm = (v: unknown): unknown => {
    if (Array.isArray(v)) {
      const mapped = v.map(norm);
      return [...mapped].sort((x, y) => (JSON.stringify(x) < JSON.stringify(y) ? -1 : 1));
    }
    return v;
  };
  return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}

function check(t: TestCase, actual: unknown): boolean {
  if (t.compare === "set") return eqUnordered(actual, t.expected);
  return JSON.stringify(actual) === JSON.stringify(t.expected);
}

// --- Reference implementations (deliberately simple / obviously correct) ---
const refs: Record<string, (...args: any[]) => any> = {
  "two-sum": (nums: number[], target: number) => {
    for (let i = 0; i < nums.length; i++)
      for (let j = i + 1; j < nums.length; j++) if (nums[i] + nums[j] === target) return [i, j];
    return [];
  },
  "contains-duplicate": (nums: number[]) => new Set(nums).size !== nums.length,
  "valid-anagram": (s: string, t: string) => s.split("").sort().join("") === t.split("").sort().join(""),
  "best-time-to-buy-and-sell-stock": (prices: number[]) => {
    let min = Infinity, best = 0;
    for (const p of prices) { min = Math.min(min, p); best = Math.max(best, p - min); }
    return best;
  },
  "binary-search": (nums: number[], target: number) => {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (nums[mid] === target) return mid; if (nums[mid] < target) lo = mid + 1; else hi = mid - 1; }
    return -1;
  },
  "reverse-linked-list": (list: number[]) => [...list].reverse(),
  "product-of-array-except-self": (nums: number[]) => {
    const n = nums.length; const res = new Array(n).fill(1);
    let prefix = 1; for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
    let suffix = 1; for (let i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
    return res;
  },
  "group-anagrams": (strs: string[]) => {
    const map = new Map<string, string[]>();
    for (const s of strs) { const key = s.split("").sort().join(""); if (!map.has(key)) map.set(key, []); map.get(key)!.push(s); }
    return [...map.values()];
  },
  "longest-substring-without-repeating-characters": (s: string) => {
    const lastSeen = new Map<string, number>(); let left = 0, best = 0;
    for (let right = 0; right < s.length; right++) {
      const c = s[right];
      if (lastSeen.has(c) && lastSeen.get(c)! >= left) left = lastSeen.get(c)! + 1;
      lastSeen.set(c, right);
      best = Math.max(best, right - left + 1);
    }
    return best;
  },
  "three-sum": (nums: number[]) => {
    const arr = [...nums].sort((a, b) => a - b);
    const res: number[][] = [];
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
  },
  "number-of-islands": (grid: number[][]) => {
    const g = grid.map((row) => [...row]);
    const rows = g.length, cols = g[0]?.length ?? 0;
    let count = 0;
    const flood = (r: number, c: number) => {
      if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] !== 1) return;
      g[r][c] = 0;
      flood(r + 1, c); flood(r - 1, c); flood(r, c + 1); flood(r, c - 1);
    };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (g[r][c] === 1) { count++; flood(r, c); }
    return count;
  },
  "search-in-rotated-sorted-array": (nums: number[], target: number) => {
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
  },
  "trapping-rain-water": (height: number[]) => {
    if (height.length === 0) return 0;
    let l = 0, r = height.length - 1, leftMax = height[0], rightMax = height[height.length - 1], total = 0;
    while (l < r) {
      if (leftMax <= rightMax) { l++; leftMax = Math.max(leftMax, height[l]); total += leftMax - height[l]; }
      else { r--; rightMax = Math.max(rightMax, height[r]); total += rightMax - height[r]; }
    }
    return total;
  },
  "word-search": (board: string[][], word: string) => {
    const rows = board.length, cols = board[0]?.length ?? 0;
    const visited = board.map((row) => row.map(() => false));
    const dfs = (r: number, c: number, i: number): boolean => {
      if (i === word.length) return true;
      if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || board[r][c] !== word[i]) return false;
      visited[r][c] = true;
      const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
      visited[r][c] = false;
      return found;
    };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (dfs(r, c, 0)) return true;
    return false;
  },
};

let failures = 0;
for (const p of problems) {
  const ref = refs[p.slug];
  if (!ref) { console.log(`⚠️  no reference impl for ${p.slug}, skipping`); continue; }
  const allTests = [...p.visibleTests.map((t) => ({ t, kind: "visible" })), ...p.hiddenTests.map((t) => ({ t, kind: "hidden" }))];
  allTests.forEach(({ t, kind }, i) => {
    let actual: unknown;
    try {
      actual = ref(...t.input);
    } catch (e) {
      console.log(`❌ ${p.slug} [${kind} #${i}] reference impl threw: ${e}`);
      failures++;
      return;
    }
    if (!check(t, actual)) {
      console.log(`❌ ${p.slug} [${kind} #${i}] input=${JSON.stringify(t.input)} expected=${JSON.stringify(t.expected)} got=${JSON.stringify(actual)}`);
      failures++;
    }
  });
}

console.log(failures === 0 ? "\n✅ All test data matches reference implementations." : `\n${failures} mismatch(es) found.`);
process.exit(failures === 0 ? 0 : 1);
