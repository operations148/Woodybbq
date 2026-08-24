/**
 * Screenshot one scene at its real scroll position.
 *   node shot-scene.mjs <sceneNumber> [label] [width] [height] [--reduced]
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const pos = args.filter((a) => !a.startsWith("--"));

const scene = pos[0] ?? "4";
const label = pos[1] ?? `scene${scene}`;
const width = Number(pos[2] ?? 1440);
const height = Number(pos[3] ?? 900);
const frac = Number(pos[4] ?? 0.55);

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
const file = path.join(outDir, `screenshot-${next}-${label}.png`);

const browser = await chromium.launch({ executablePath: CHROME });
const context = await browser.newContext({
  viewport: { width, height },
  reducedMotion: flags.has("--reduced") ? "reduce" : "no-preference",
});
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

// Scroll so the scene sits where its own progress is meaningful.
const info = await page.evaluate(
  ({ scene, frac }) => {
    const el = document.querySelector(`[data-scene="${scene}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const target = top - window.innerHeight * (1 - frac) + r.height * frac * 0.5;
    window.scrollTo({ top: Math.max(0, target), behavior: 'instant' });
    return { top, height: r.height, target };
  },
  { scene, frac },
);

await page.waitForTimeout(700);

const state = await page.evaluate(() => {
  const stage = document.querySelector("[data-progress]");
  return {
    emberP: getComputedStyle(document.documentElement).getPropertyValue("--ember-p"),
    stageP: stage ? getComputedStyle(stage).getPropertyValue("--p") : "n/a",
  };
});

await page.screenshot({ path: file });
await browser.close();
console.log(`saved ${file}`);
console.log("geometry:", JSON.stringify(info));
console.log("progress:", JSON.stringify(state));
