/**
 * Verifies the deployed site: engine mounted, acts driving, rail travelling,
 * kinetic splitting, images loading, no console errors.
 */
import { chromium } from "playwright-core";
const URL = process.argv[2] || "https://woodybbq.vercel.app";
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const b = await chromium.launch({ executablePath: CHROME });
let fails = 0;
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` :: ${detail}` : ""}`);
  if (!ok) fails++;
};

for (const w of [1440, 390]) {
  console.log(`\n=== ${URL} @ ${w}px ===`);
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } });
  const p = await ctx.newPage();
  const errors = [], imgFails = [];
  p.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  p.on("pageerror", (e) => errors.push(String(e)));
  p.on("response", (r) => { if (r.request().resourceType() === "image" && r.status() >= 400) imgFails.push(`${r.status()} ${r.url().slice(-60)}`); });

  await p.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await p.waitForTimeout(2000);

  const boot = await p.evaluate(() => ({
    ready: document.documentElement.classList.contains("sc-ready"),
    instances: window.ScrollCraft ? window.ScrollCraft.instances.length : 0,
    acts: [...document.querySelectorAll("[data-sc-act]")].map(a => a.dataset.scAct),
    scenes: document.querySelectorAll("[data-scene]").length,
    railOverflow: (() => { const r = document.querySelector("[data-sc-pan]"); return r ? r.scrollWidth - innerWidth : null; })(),
  }));
  check("engine mounted", boot.ready && boot.instances === 1, `instances=${boot.instances}`);
  check("seven scenes", boot.scenes === 7, String(boot.scenes));
  check("act sequence", boot.acts.join(">") === "pin>pan>flow>pin>flow>pin>flow", boot.acts.join(" > "));
  check("pan rail overflows", boot.railOverflow > w * 0.5, `${boot.railOverflow}px`);

  // Drive the page and record whether each act's progress actually moves,
  // whether the rail transform changes, and whether kinetic split ran.
  const motion = await p.evaluate(async () => {
    const acts = [...document.querySelectorAll("[data-scene]")];
    const seen = new Map(acts.map(a => [a.dataset.scene, new Set()]));
    const railT = new Set();
    const max = document.documentElement.scrollHeight - innerHeight;
    for (let i = 0; i <= 40; i++) {
      window.scrollTo({ top: Math.round((max * i) / 40), behavior: "instant" });
      await new Promise(r => setTimeout(r, 90));
      for (const a of acts) {
        const v = getComputedStyle(a).getPropertyValue("--sc-p").trim();
        if (v) seen.get(a.dataset.scene).add(Number(v).toFixed(2));
      }
      const rail = document.querySelector("[data-sc-pan]");
      if (rail) railT.add(getComputedStyle(rail).transform);
    }
    return {
      distinctP: [...seen].map(([k, v]) => `${k}:${v.size}`),
      railStates: railT.size,
      splits: document.querySelectorAll(".sc-split__i").length,
      emberEnd: getComputedStyle(document.documentElement).getPropertyValue("--ember-p").trim(),
      signUnderline: (() => { const s = document.querySelector(".sign__underline"); return s ? getComputedStyle(s).transform : null; })(),
    };
  });

  // Sampled uniformly across the whole page, so a short act only gets two or
  // three samples inside its own travel. That is enough to prove motion is
  // happening, not enough to judge the sweep: check-live-acts.mjs samples each
  // act across its own range and is the authority on that.
  check("every act's progress moves", motion.distinctP.every(s => Number(s.split(":")[1]) >= 3), motion.distinctP.join(" "));
  check("pan rail transform changes", motion.railStates >= 3, `${motion.railStates} distinct transforms at page-level sampling`);
  check("kinetic headline split", motion.splits > 0, `${motion.splits} line units`);
  check("ember line reaches the end", parseFloat(motion.emberEnd) > 0.95, motion.emberEnd);
  check("closing underline drawn", !!motion.signUnderline, motion.signUnderline || "");

  const imgs = await p.evaluate(() => {
    const shown = [...document.querySelectorAll("img")].filter(i => { const b = i.getBoundingClientRect(); return b.width > 0 && b.height > 0; });
    return { total: shown.length, broken: shown.filter(i => !i.complete || i.naturalWidth === 0).length };
  });
  check("images all load", imgs.broken === 0, `${imgs.total} shown, ${imgs.broken} broken`);
  check("no failed image requests", imgFails.length === 0, imgFails.slice(0, 2).join(" | "));
  check("no console errors", errors.length === 0, errors.slice(0, 2).join(" | "));

  await ctx.close();
}
await b.close();
console.log(fails === 0 ? "\nLIVE SITE VERIFIED." : `\n${fails} FAILURE(S) ON LIVE SITE.`);
process.exit(fails === 0 ? 0 : 1);
