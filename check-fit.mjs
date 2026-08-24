/**
 * Pinned stages clip their overflow at exactly 100vh. Anything taller is
 * silently cut off, and it is worst on a phone. This measures each stage's
 * real content height against the viewport at every target width.
 */
import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fails = 0;
for (const w of [1440, 1280, 1024, 768, 430, 390, 375]) {
  const p = await (await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } })).newPage();
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const rows = await p.evaluate(() => {
    return [...document.querySelectorAll("[data-sc-stage]")].map((s) => {
      const scene = s.closest("[data-scene]").dataset.scene;
      // Tallest single child-subtree that must fit, ignoring absolutely
      // positioned overlays and cue blocks that cross over.
      const kids = [...s.children];
      const contentH = Math.max(...kids.map(k => k.scrollHeight), s.scrollHeight);
      return { scene, stageH: Math.round(s.getBoundingClientRect().height), contentH: Math.round(contentH) };
    });
  });
  console.log(`\n--- ${w}px ---`);
  for (const r of rows) {
    const over = r.contentH - r.stageH;
    const flag = over > 4 ? `OVERFLOWS by ${over}px` : "fits";
    if (over > 4) { fails++; console.log(`  FAIL scene ${r.scene}: content ${r.contentH} vs stage ${r.stageH} -> ${flag}`); }
    else console.log(`  scene ${r.scene}: ${r.contentH}/${r.stageH} ${flag}`);
  }
  await p.close();
}
await b.close();
console.log(fails === 0 ? "\nAll pinned stages fit." : `\n${fails} STAGE OVERFLOW(S).`);
process.exit(fails === 0 ? 0 : 1);
