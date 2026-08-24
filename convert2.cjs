const sharp = require("sharp");
const fs = require("fs");
(async () => {
  // 1. open-late: crop away the caption burned into the lower left
  //    ("Woody's Bar-B-Que / 3446 W Slauson Ave.", source y 755-800) so the
  //    address exists once, as live HTML, and not twice.
  await sharp("src/images/open-late.png")
    .extract({ left: 0, top: 0, width: 1264, height: 748 })
    .webp({ quality: 86, effort: 6 })
    .toFile("public/images/locations/woodys-open-late.webp");

  // 2. woodyex: dusk render of the storefront, already 4:5 for Scene 3.
  await sharp("src/images/woodyex.jpg")
    .webp({ quality: 86, effort: 6 })
    .toFile("public/images/locations/woodys-slauson-exterior.webp");

  // 3. woodyexterior: the authentic reference photograph. Low resolution, so
  //    it is not upscaled; it is used where its real size is enough.
  await sharp("src/images/woodyexterior.webp")
    .webp({ quality: 88, effort: 6 })
    .toFile("public/images/locations/woodys-slauson-reference.webp");

  for (const f of [
    "public/images/locations/woodys-open-late.webp",
    "public/images/locations/woodys-slauson-exterior.webp",
    "public/images/locations/woodys-slauson-reference.webp",
  ]) {
    const m = await sharp(f).metadata();
    console.log(`${f.replace("public/images/", "").padEnd(38)} ${m.width}x${m.height}  ${(fs.statSync(f).size/1024).toFixed(0)}KB`);
  }
})();
