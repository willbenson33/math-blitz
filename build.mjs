#!/usr/bin/env node
/*
 * Build step for GitHub Pages.
 *
 * `index.html` is the source of truth and stays directly openable in a browser:
 * it loads `vendor/babel.min.js` and transpiles its inline `<script
 * type="text/babel">` in the browser. That's great for hacking on the game with
 * no tooling, but it ships a ~3 MB compiler and re-transpiles on every load.
 *
 * This script pre-compiles that JSX once (reusing the already-vendored Babel, so
 * there are no extra dependencies) and writes a production copy to `dist/` that
 * drops Babel entirely. The deploy workflow publishes `dist/` to Pages.
 *
 * Run: `node build.mjs`
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// The vendored Babel is a UMD bundle, so requiring it in Node yields the same
// API the browser uses. Pin to the classic JSX runtime to match the React UMD
// globals (see vendor/README.md).
const Babel = require("./vendor/babel.min.js");

const SRC = join(root, "index.html");
const OUT_DIR = join(root, "dist");

const html = readFileSync(SRC, "utf8");

// 1. Extract the inline Babel script.
const OPEN = '<script type="text/babel" data-presets="react">';
const start = html.indexOf(OPEN);
if (start === -1) throw new Error("Could not find the inline Babel <script> in index.html");
const codeStart = start + OPEN.length;
const codeEnd = html.indexOf("</script>", codeStart);
if (codeEnd === -1) throw new Error("Unterminated Babel <script> in index.html");
const jsx = html.slice(codeStart, codeEnd);

// 2. Transpile JSX -> plain JS (classic runtime, React.createElement).
const { code } = Babel.transform(jsx, { presets: ["react"] });

// 3. Swap the inline script for the compiled JS and drop the Babel <script>.
let out = html.slice(0, start) + "<script>\n" + code + "\n" + html.slice(codeEnd);
out = out.replace(/^\s*<script src="vendor\/babel\.min\.js"><\/script>\n?/m, "");
out = out.replace(
  /<!-- React \+ Babel are vendored[\s\S]*?No build step\. -->/,
  "<!-- Pre-built for deployment: JSX is compiled ahead of time (see build.mjs),\n" +
    "     so only the React runtime is shipped — no in-browser Babel. -->"
);

// 4. Write dist/ with the compiled page and the React runtime (no Babel).
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(join(OUT_DIR, "vendor"), { recursive: true });
writeFileSync(join(OUT_DIR, "index.html"), out);
for (const f of ["react.production.min.js", "react-dom.production.min.js"]) {
  copyFileSync(join(root, "vendor", f), join(OUT_DIR, "vendor", f));
}

console.log("Built dist/index.html (" + (out.length / 1024).toFixed(1) + " KB) — Babel excluded.");
