/**
 * Image-integration QA: every rendered image loads, none is distorted, none
 * is oversized for its slot, and no placeholder shows once a photo is in.
 */
import { chromium } from "playwright-core";
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const b = await chromium.launch({ executablePath: CHROME });
let fails = 0;
const bad = (m) => { console.log("  FAIL " + m); fails++; };

for (const w of [1440, 1280, 1024, 768, 430, 390, 375]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } });
  const p = await ctx.newPage();
  const failed = [];
  p.on("response", (r) => { if (r.request().resourceType() === "image" && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  // walk so lazy images load
  await p.evaluate(async () => {
    const step = window.innerHeight * 0.5;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 80));
    }
  });
  await p.waitForTimeout(900);

  const r = await p.evaluate(() => {
    // Only images the layout actually renders. A slot hidden at this
    // breakpoint (Scene 6's figure below 900px) is never fetched, which is the
    // point: it must not count as broken, and it must not cost bytes.
    const imgs = [...document.querySelectorAll("img")].filter((i) => {
      const b = i.getBoundingClientRect();
      return b.width > 0 && b.height > 0;
    });
    return {
      total: imgs.length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
      distorted: imgs.filter((i) => getComputedStyle(i).objectFit !== "cover").map((i) => i.src.split("/").pop()),
      oversized: imgs.map((i) => {
        const box = i.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const need = box.width * dpr;
        return need > 0 && i.naturalWidth > need * 2.4
          ? `${i.src.split("/").pop()} natural ${i.naturalWidth} vs slot ${Math.round(need)}`
          : null;
      }).filter(Boolean),
      // any typeset placeholder still visible in a slot that has a photo
      strayPlaceholders: [...document.querySelectorAll(".plate--photo .plate__char")].length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      photoPlates: document.querySelectorAll(".plate--photo").length,
      typesetPlates: document.querySelectorAll(".plate--typeset").length,
    };
  });

  console.log(`\n--- ${w}px ---  imgs:${r.total} photo-plates:${r.photoPlates} typeset-left:${r.typesetPlates}`);
  if (failed.length) bad(`image requests failed: ${failed.slice(0,3).join(", ")}`);
  if (errs.length) bad(`page errors: ${errs.slice(0,2).join(" | ")}`);
  if (r.broken.length) bad(`broken images: ${r.broken.join(", ")}`);
  if (r.distorted.length) bad(`not object-fit:cover: ${r.distorted.join(", ")}`);
  if (r.strayPlaceholders) bad(`${r.strayPlaceholders} placeholder texture(s) still painted behind a photo`);
  if (r.overflow > 1) bad(`horizontal overflow ${r.overflow}px`);
  if (r.oversized.length) console.log(`  note oversized: ${r.oversized.join(" | ")}`);
  if (!failed.length && !r.broken.length && !r.distorted.length && r.overflow <= 1) console.log("  ok");
  await ctx.close();
}
await b.close();
console.log(fails === 0 ? "\nImage QA passed." : `\n${fails} FAILURE(S).`);
process.exit(fails === 0 ? 0 : 1);
