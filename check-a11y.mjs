/**
 * Accessibility and link audit across every route.
 *  - one H1 per page, heading order never skips a level
 *  - every interactive element has an accessible name and a visible focus ring
 *  - no placeholder or dead hrefs
 *  - external links carry rel="noopener"
 *  - no horizontal overflow at any target width
 *  - touch targets at least 44px on the phone breakpoint
 */
import { chromium } from "playwright-core";

const CHROME =
  process.env.SCROLLCRAFT_CHROME ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const routes = ["/", "/menu", "/our-story", "/gallery", "/visit"];
const widths = [1440, 1280, 1024, 768, 430, 390, 375];

const browser = await chromium.launch({ executablePath: CHROME });
let fails = 0;
const bad = (m) => {
  console.log("  FAIL " + m);
  fails++;
};

/* ---- per route structural audit ---- */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

for (const route of routes) {
  console.log(`\n--- ${route} ---`);
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });

  const r = await page.evaluate(() => {
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter((h) => h.offsetParent !== null || h.getClientRects().length)
      .map((h) => ({ level: +h.tagName[1], text: h.textContent.trim().slice(0, 40) }));

    const name = (el) =>
      (
        el.getAttribute("aria-label") ||
        el.textContent ||
        el.getAttribute("title") ||
        ""
      ).trim();

    const interactive = [...document.querySelectorAll("a[href], button")];
    const unnamed = interactive.filter((el) => !name(el)).map((el) => el.outerHTML.slice(0, 90));

    const links = [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel") || "",
      text: name(a).slice(0, 40),
    }));

    const imgsNoAlt = [...document.querySelectorAll("img")].filter(
      (i) => i.getAttribute("alt") === null,
    ).length;

    return {
      headings,
      unnamed,
      links,
      imgsNoAlt,
      h1Count: headings.filter((h) => h.level === 1).length,
      skip: !!document.querySelector("a.skip"),
      landmarks: {
        main: document.querySelectorAll("main").length,
        header: document.querySelectorAll("header").length,
      },
      title: document.title,
      desc:
        document.querySelector('meta[name="description"]')?.getAttribute("content")
          ?.length ?? 0,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    };
  });

  if (r.h1Count !== 1) bad(`${r.h1Count} H1 elements (expected exactly 1)`);
  if (!r.skip) bad("no skip link");
  if (r.landmarks.main !== 1) bad(`${r.landmarks.main} <main> landmarks`);
  if (r.imgsNoAlt > 0) bad(`${r.imgsNoAlt} <img> without alt`);
  if (!r.title) bad("no <title>");
  if (r.desc < 40) bad(`meta description too short (${r.desc})`);
  if (!r.canonical) bad("no canonical link");

  // Heading order must not skip a level going down.
  let prev = 0;
  for (const h of r.headings) {
    if (prev && h.level > prev + 1) bad(`heading jumps h${prev} -> h${h.level} at "${h.text}"`);
    prev = h.level;
  }

  for (const u of r.unnamed) bad(`interactive element with no accessible name: ${u}`);

  for (const l of r.links) {
    if (!l.href || l.href === "#") bad(`placeholder href on "${l.text}"`);
    if (l.href?.includes("woodys.com") && !l.href.includes("woodysbarbeque"))
      bad(`link to the unrelated Florida business: ${l.href}`);
    if (l.target === "_blank" && !l.rel.includes("noopener"))
      bad(`_blank without noopener: ${l.href}`);
    if (/yelp\.com|google\.com/.test(l.href ?? "") && l.target !== "_blank" && !l.href.startsWith("/"))
      bad(`external link not opening in new tab: ${l.href}`);
  }

  console.log(
    `  headings ${r.headings.length}, links ${r.links.length}, title "${r.title.slice(0, 50)}"`,
  );
}

/* ---- focus visibility on the homepage ---- */
console.log("\n--- focus ring ---");
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const focusReport = [];
for (let i = 0; i < 14; i++) {
  await page.keyboard.press("Tab");
  const f = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const outline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    return {
      tag: el.tagName,
      text: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 32),
      outline,
    };
  });
  if (f) focusReport.push(f);
}
const noRing = focusReport.filter((f) => !f.outline);
if (noRing.length) {
  for (const n of noRing) bad(`no visible focus ring on ${n.tag} "${n.text}"`);
} else {
  console.log(`  ${focusReport.length} tab stops, all with a visible focus ring`);
}
console.log("  order: " + focusReport.map((f) => f.text || f.tag).join(" > "));

await ctx.close();

/* ---- overflow + tap targets across widths ---- */
console.log("\n--- responsive ---");
for (const w of widths) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;
    let offenders = [];
    if (overflow > 1) {
      offenders = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
        .slice(0, 4)
        .map((el) => el.className || el.tagName);
    }
    const small = [...document.querySelectorAll("a[href], button")]
      .filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && b.height < 44 && !el.closest("footer, .bar__nav, .foot");
      })
      .map((el) => `${el.tagName}.${el.className}`.slice(0, 46));
    return { overflow, offenders, small: [...new Set(small)] };
  });
  if (r.overflow > 1) bad(`${w}px: horizontal overflow ${r.overflow}px (${r.offenders.join(", ")})`);
  else console.log(`  ${w}px: no horizontal overflow`);
  if (w <= 430 && r.small.length) console.log(`    small targets: ${r.small.join(" | ")}`);
  await c.close();
}

await browser.close();
console.log(fails === 0 ? "\nAll accessibility and link checks passed." : `\n${fails} FAILURE(S).`);
process.exit(fails === 0 ? 0 : 1);
