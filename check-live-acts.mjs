/**
 * Samples each act across ITS OWN scroll range rather than uniformly across
 * the page, so a short act is not judged by how few page-level samples land
 * inside it. Confirms progress actually sweeps 0 -> 1 and the rail moves.
 */
import { chromium } from "playwright-core";
const URL = process.argv[2] || "https://woodybbq.vercel.app";
const b = await chromium.launch({ executablePath: process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fails = 0;
for (const w of [1440, 390]) {
  console.log(`\n=== ${w}px ===`);
  const p = await (await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } })).newPage();
  await p.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await p.waitForTimeout(1500);
  const out = await p.evaluate(async () => {
    const res = [];
    const acts = [...document.querySelectorAll("[data-scene]")];
    for (const a of acts) {
      const top = a.getBoundingClientRect().top + scrollY;
      const h = a.offsetHeight;
      const lo = Math.max(0, top - innerHeight);
      const hi = top + h;
      const vals = new Set(); const rail = new Set();
      for (let i = 0; i <= 24; i++) {
        window.scrollTo({ top: Math.round(lo + ((hi - lo) * i) / 24), behavior: "instant" });
        await new Promise(r => setTimeout(r, 70));
        const v = getComputedStyle(a).getPropertyValue("--sc-p").trim();
        if (v !== "") vals.add(Number(v).toFixed(3));
        const r = a.querySelector("[data-sc-pan]");
        if (r) rail.add(getComputedStyle(r).transform);
      }
      const nums = [...vals].map(Number);
      res.push({
        scene: a.dataset.scene, act: a.dataset.scAct,
        distinct: vals.size,
        min: nums.length ? Math.min(...nums).toFixed(2) : "-",
        max: nums.length ? Math.max(...nums).toFixed(2) : "-",
        railStates: rail.size || null,
      });
    }
    return res;
  });
  for (const r of out) {
    const sweeps = r.distinct >= 8 && Number(r.min) <= 0.05 && Number(r.max) >= 0.95;
    const railOk = r.railStates === null || r.railStates >= 8;
    const ok = sweeps && railOk;
    if (!ok) fails++;
    console.log(`${ok ? "  ok  " : " FAIL "} scene ${r.scene} (${r.act}): ${r.distinct} distinct p, ${r.min} -> ${r.max}${r.railStates ? `, rail ${r.railStates} states` : ""}`);
  }
  await p.close();
}
await b.close();
console.log(fails === 0 ? "\nAll acts sweep 0 -> 1 on the live site." : `\n${fails} act(s) did not sweep.`);
process.exit(fails === 0 ? 0 : 1);
