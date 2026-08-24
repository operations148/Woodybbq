/**
 * Verifies the two states the brief treats as non-negotiable:
 *   1. JavaScript disabled  -> all content readable, all conversion actions present
 *   2. prefers-reduced-motion -> the Scene 4 sequence renders complete and still
 *
 * Fails loudly, because "it probably degrades fine" is exactly the claim that
 * turns out to be wrong on the device that matters.
 */
import { chromium } from "playwright-core";

const CHROME =
  process.env.SCROLLCRAFT_CHROME ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME });
let failures = 0;

const check = (label, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` :: ${detail}` : ""}`);
  if (!ok) failures++;
};

/**
 * `walk` scrolls the whole page before measuring, recording the highest
 * opacity each cued element ever reaches. With the engine mounted, an element
 * below the fold is legitimately at opacity 0 until it is scrolled to, so
 * measuring at scroll 0 would fail a page that is working correctly. What
 * actually matters is that every element becomes fully visible at some point,
 * and that the Scene 4 sequence completes.
 */
async function audit(name, contextOptions, walk = false) {
  console.log(`\n--- ${name} ---`);
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ...contextOptions,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.waitForTimeout(1400);

  if (walk) {
    await page.evaluate(async () => {
      const sel = "[data-sc-cue], [data-sc-in], [data-sc-stagger] > *";
      const best = new Map();
      const sample = () => {
        for (const el of document.querySelectorAll(sel)) {
          const o = parseFloat(getComputedStyle(el).opacity);
          if (!best.has(el) || o > best.get(el)) best.set(el, o);
        }
      };
      const step = window.innerHeight * 0.1;
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 55));
        sample();
      }
      // Stash peak opacity so the measurement below reads the walk, not the
      // single frame we happen to have stopped on.
      for (const [el, o] of best) el.dataset.peakOpacity = String(o);
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise((r) => setTimeout(r, 400));
    });
  }

  const r = await page.evaluate(() => {
    const vis = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        cs.visibility !== "hidden" &&
        cs.display !== "none" &&
        parseFloat(cs.opacity) > 0.95 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const h1 = document.querySelector("h1");
    const scenes = [...document.querySelectorAll("[data-scene]")].map(
      (s) => s.dataset.scene,
    );

    // Every entrance target and every cue must end up fully opaque. With the
    // engine mounted these all start at opacity 0, so this is the check that
    // proves the no-JS and reduced-motion paths actually hand the page back.
    const faded = [
      ...document.querySelectorAll(
        "[data-sc-cue], [data-sc-in], [data-sc-stagger] > *",
      ),
    ].filter((el) => {
      const peak = el.dataset.peakOpacity;
      const o = peak !== undefined
        ? parseFloat(peak)
        : parseFloat(getComputedStyle(el).opacity);
      return o < 0.95;
    }).length;

    // Scene 4 frames must be unclipped in these states.
    const frames = [...document.querySelectorAll(".pitplate__mask")].map((el) => {
      const cp = getComputedStyle(el).clipPath;
      const m = /inset\(([^)]+)\)/.exec(cp);
      if (!m) return { cp, rightPct: 0 };
      const parts = m[1].trim().split(/\s+/);
      return { cp, rightPct: parseFloat(parts[1] ?? "0") };
    });

    const act4 = document.querySelector('[data-scene="4"]');
    const stageP =
      (act4 && getComputedStyle(act4).getPropertyValue("--sc-p").trim()) ||
      "(unset, falls back to 1)";

    const text = document.body.innerText;
    const labels = [...document.querySelectorAll(".action")].map((a) =>
      a.textContent.trim(),
    );

    return {
      h1Visible: vis(h1),
      h1Text: h1?.textContent?.trim() ?? "",
      scenes,
      faded,
      frames,
      stageP: stageP.trim(),
      hasPhone: !!document.querySelector('a[href^="tel:"]'),
      hasDirections: !!document.querySelector('a[href*="google.com/maps/dir"]'),
      hasMenuLink: !!document.querySelector('a[href="/menu"]'),
      orderButtons: labels.filter((l) => /order online/i.test(l)).length,
      storyPresent: text.includes("Woody Phillips came to Los Angeles"),
      addressPresent: text.includes("3446 W Slauson Ave"),
      captionsPresent:
        text.includes("Live oak fire") || text.includes("LIVE OAK FIRE"),
    };
  });

  check("H1 rendered and fully opaque", r.h1Visible, r.h1Text.slice(0, 40));
  check("all seven scenes present", r.scenes.length === 7, r.scenes.join(","));
  check("no element stuck faded", r.faded === 0, `${r.faded} faded`);
  check("phone link present", r.hasPhone);
  check("directions link present", r.hasDirections);
  check("menu link present", r.hasMenuLink);
  check("no Order Online button", r.orderButtons === 0);
  check("story copy present", r.storyPresent);
  check("address present", r.addressPresent);
  check("Scene 4 captions reachable", r.captionsPresent);

  const clipped = r.frames.filter((f) => f.rightPct > 1);
  check(
    "Scene 4 triptych fully revealed",
    r.frames.length === 3 && clipped.length === 0,
    `p=${r.stageP} frames=${r.frames.map((f) => f.rightPct + "%").join(",")}`,
  );

  await ctx.close();
}

await audit("JavaScript DISABLED", { javaScriptEnabled: false });
await audit("prefers-reduced-motion: reduce", { reducedMotion: "reduce" }, true);
await audit("motion allowed, walked", {}, true);

await browser.close();
console.log(
  failures === 0
    ? "\nAll degradation checks passed."
    : `\n${failures} CHECK(S) FAILED.`,
);
process.exit(failures === 0 ? 0 : 1);
