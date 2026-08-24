/**
 * Screenshot helper.
 *
 *   node screenshot.mjs http://localhost:3000 label [width] [height]
 *
 * Saves to "./temporary screenshots/screenshot-N[-label].png", auto-incremented.
 * Pass --full for a full-page capture instead of one viewport.
 * Pass --reduced to emulate prefers-reduced-motion.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));

const url = positional[0] ?? "http://localhost:3000";
const label = positional[1] ?? "";
const width = Number(positional[2] ?? 1440);
const height = Number(positional[3] ?? 900);

const CHROME =
  process.env.SCROLLCRAFT_CHROME ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const outDir = path.resolve("temporary screenshots");
fs.mkdirSync(outDir, { recursive: true });

const existing = fs
  .readdirSync(outDir)
  .map((f) => Number(/^screenshot-(\d+)/.exec(f)?.[1] ?? 0))
  .filter((n) => !Number.isNaN(n));
const next = (existing.length ? Math.max(...existing) : 0) + 1;
const file = path.join(outDir, `screenshot-${next}${label ? `-${label}` : ""}.png`);

const browser = await chromium.launch({ executablePath: CHROME });
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  reducedMotion: flags.has("--reduced") ? "reduce" : "no-preference",
});
const page = await context.newPage();

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(900);

if (flags.has("--full")) {
  // Walk the page so every lazy image and every reveal has fired.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 350));
  });
}

await page.screenshot({ path: file, fullPage: flags.has("--full") });
await browser.close();

console.log(`saved ${file}`);
if (errors.length) {
  console.log(`\nCONSOLE ERRORS (${errors.length}):`);
  errors.slice(0, 12).forEach((e) => console.log("  " + e));
} else {
  console.log("no console errors");
}
