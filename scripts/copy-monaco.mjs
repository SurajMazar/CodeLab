// Copies the Monaco Editor static assets from node_modules into /public so
// the code editor loads from same-origin files instead of a CDN. Runs
// automatically after `npm install` (see package.json "postinstall").
import { existsSync, cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "monaco-editor", "min", "vs");
const dest = join(root, "public", "monaco", "vs");

if (!existsSync(src)) {
  console.warn("[copy-monaco] monaco-editor package not found — skipping (did npm install finish?)");
  process.exit(0);
}

mkdirSync(join(root, "public", "monaco"), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[copy-monaco] copied Monaco assets to public/monaco/vs");
