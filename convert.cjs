const sharp = require("sharp");
const fs = require("fs");

// [source, destination, webp quality]
// Aspect ratios are preserved. Display ratios are handled by the container
// plus object-fit: cover, never by resampling the source to a new shape.
const jobs = [
  ["src/images/pork-ribs.png",        "public/images/hero/woodys-slauson-ribs-hero.webp", 86],
  ["src/images/pork-ribs.png",        "public/images/menu/woodys-pork-ribs.webp",         84],
  ["src/images/hot-links.png",        "public/images/menu/woodys-hot-links.webp",         84],
  ["src/images/bbq-chicken.png",      "public/images/menu/woodys-bbq-chicken.webp",       84],
  ["src/images/combination-plate.png","public/images/menu/woodys-combination-plate.webp",  84],
  ["src/images/full-table.png",       "public/images/menu/woodys-combination-plate-wide.webp", 86],
  ["src/images/mac-cheese.png",       "public/images/menu/woodys-mac-and-cheese.webp",     84],
  ["src/images/peach-cobbler.png",    "public/images/menu/woodys-peach-cobbler.webp",      84],
  ["src/images/live-oak-fire.png",    "public/images/story/woodys-live-oak-fire.webp",     86],
  ["src/images/the-brick-pit.png",    "public/images/story/woodys-brick-pit.webp",         86],
  ["src/images/the-plate.png",        "public/images/story/woodys-finished-plate.webp",    86],
  ["src/images/CTAbanner.png",        "public/images/hero/woodys-bring-home-the-smoke.webp", 88],
];

(async () => {
  for (const [src, dest, q] of jobs) {
    const before = fs.statSync(src).size;
    // No resize: none of these sources exceed their largest display size at 2x,
    // and upscaling to hit a nominal number would only invent detail.
    await sharp(src).webp({ quality: q, effort: 6 }).toFile(dest);
    const m = await sharp(dest).metadata();
    const after = fs.statSync(dest).size;
    console.log(
      `${dest.replace("public/images/", "").padEnd(44)} ${m.width}x${m.height}  q${q}  ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`,
    );
  }
})();
