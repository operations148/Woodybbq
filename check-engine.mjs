/**
 * Confirms the scrollcraft engine actually mounted and is driving the page.
 *
 * Also measures the pan rail's real overflow. devices.md is explicit that a
 * rail narrower than the viewport travels zero pixels, turning the act into a
 * motionless pinned screen, and that the harness does NOT catch it. It is
 * width-dependent, so it is checked at every target width.
 */
import { chromium } from "playwright-core";

const CHROME =
  process.env.SCROLLCRAFT_CHROME ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME });
let fails = 0;
const bad = (m) => {
  console.log("  FAIL " + m);
  fails++;
};

const widths = [1440, 1280, 1024, 768, 430, 390, 375];

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const r = await page.evaluate(() => {
    const rail = document.querySelector("[data-sc-pan]");
    const acts = [...document.querySelectorAll("[data-sc-act]")].map((a) => ({
      act: a.dataset.scAct,
      span: a.dataset.scSpan || null,
      h: Math.round(a.getBoundingClientRect().height),
      pinnedClass: a.classList.contains("sc-act--pinned"),
    }));
    return {
      ready: document.documentElement.classList.contains("sc-ready"),
      instances: window.ScrollCraft ? window.ScrollCraft.instances.length : 0,
      railOverflow: rail ? rail.scrollWidth - window.innerWidth : null,
      railWidth: rail ? rail.scrollWidth : null,
      acts,
      stages: document.querySelectorAll("[data-sc-stage]").length,
      splitRan: document.querySelectorAll(".sc-split").length,
      docH: document.documentElement.scrollHeight,
      vh: window.innerHeight,
    };
  });

  console.log(`\n--- ${w}px ---`);
  if (!r.ready) bad("engine did not mount (no .sc-ready)");
  if (r.instances !== 1) bad(`expected exactly 1 engine instance, got ${r.instances}`);
  if (errors.length) bad(`page errors: ${errors.slice(0, 2).join(" | ")}`);

  // devices.md: aim for at least half a viewport of overflow.
  const need = Math.round(w * 0.5);
  if (r.railOverflow === null) bad("no pan rail found");
  else if (r.railOverflow < need)
    bad(
      `pan rail overflow ${r.railOverflow}px is under half a viewport (${need}px): the act would barely travel`,
    );
  else console.log(`  rail: ${r.railWidth}px wide, overflow ${r.railOverflow}px  ok`);

  console.log(
    `  acts: ${r.acts.map((a) => a.act + (a.span ? `(${a.span})` : "")).join(" > ")}`,
  );
  console.log(
    `  stages ${r.stages}, kinetic splits ${r.splitRan}, page ${(r.docH / r.vh).toFixed(1)}vh`,
  );

  const pinned = r.acts.filter((a) => ["pin", "pan", "scrub"].includes(a.act));
  const notPinned = pinned.filter((a) => !a.pinnedClass);
  if (notPinned.length)
    bad(`${notPinned.length} pinned act(s) missing .sc-act--pinned`);

  await ctx.close();
}

await browser.close();
console.log(fails === 0 ? "\nEngine checks passed." : `\n${fails} FAILURE(S).`);
process.exit(fails === 0 ? 0 : 1);
