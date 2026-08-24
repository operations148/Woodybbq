# Asset register — Woody's Bar-B-Que

**Last updated:** 2026-08-25 (image integration batch 1)
**Source of truth in code:** `src/data/assets.ts`
**Originals retained at:** `src/images/` — nothing has been deleted.

## Status

**15 images integrated. 2 slots still empty. 2 supplied images unused.**

**Fourteen of the fifteen are AI-generated**, not documentary photography of this restaurant. The exception is the daytime storefront reference, which is a real photograph.

Provenance is recorded per asset in `src/data/assets.ts` and enforced in the alt text: no food, fire or pit image is described as Woody's own pit, equipment or serving presentation. The three storefront images are the deliberate exception — they depict the real building, so they say so.

## Rights and provenance vocabulary

| Rights | Meaning |
|---|---|
| `approved` | Client-supplied and cleared for use. **The only class that renders.** |
| `ownership-confirmation-required` | Rights or compliance unresolved. Held, not rendered |
| `missing` | No usable image exists for this slot |
| `rejected-third-party` | Belongs to Google, Yelp, an editorial outlet or a customer |

| Provenance | Meaning |
|---|---|
| `ai-generated-conceptual` | Generated with no reference to the real subject |
| `ai-enhanced-from-reference` | Generated or upscaled from an actual photograph |
| `authentic-photograph` | A real photograph of the real subject |

---

## Integrated

All outputs are WebP, metadata stripped by the encoder, aspect ratio preserved (no source was resampled to a new shape; display ratios are handled by the container plus `object-fit: cover`). No source was upscaled.

| Subject | Original file | Final path | Dimensions | Orientation | Placement | Alt text | Provenance | Rights |
|---|---|---|---|---|---|---|---|---|
| Pork ribs, hero | `pork-ribs.png` | `public/images/hero/woodys-slauson-ribs-hero.webp` | 928×1152 | Portrait 4:5 | Scene 1 hero (`priority`) | "Sauced pork ribs with dark charred edges on a black platter." | `ai-generated-conceptual` | approved |
| Pork ribs, card | `pork-ribs.png` | `public/images/menu/woodys-pork-ribs.webp` | 928×1152 | Portrait 4:5 | Scene 2 rail | (label in frame; name is screen-reader text) | `ai-generated-conceptual` | approved |
| Hot links | `hot-links.png` | `public/images/menu/woodys-hot-links.webp` | 928×1152 | Portrait 4:5 | Scene 2 rail | "Barbecue hot links with glossy, charred casing on a black platter." | `ai-generated-conceptual` | approved |
| BBQ chicken | `bbq-chicken.png` | `public/images/menu/woodys-bbq-chicken.webp` | 928×1152 | Portrait 4:5 | Scene 2 rail | "Barbecue chicken pieces with browned and charred skin on a black platter." | `ai-generated-conceptual` | approved |
| Combination plate | `combination-plate.png` | `public/images/menu/woodys-combination-plate.webp` | 928×1152 | Portrait 4:5 | Scene 2 rail | "A heaped combination plate of barbecue ribs, chicken and other smoked meats." | `ai-generated-conceptual` | approved |
| Combination platter, landscape | `full-table.png` | `public/images/menu/woodys-combination-plate-wide.webp` | 1264×848 | Landscape 3:2 | Scene 5 | "A tray of barbecue ribs, a link and chicken on butcher paper." | `ai-generated-conceptual` | approved |
| Macaroni and cheese | `mac-cheese.png` | `public/images/menu/woodys-mac-and-cheese.webp` | 928×1152 | Portrait 4:5 → shown 1:1 | Scene 5 | "A bowl of creamy macaroni and cheese on butcher paper." | `ai-generated-conceptual` | approved |
| Peach cobbler | `peach-cobbler.png` | `public/images/menu/woodys-peach-cobbler.webp` | 928×1152 | Portrait 4:5 → shown 3:2 | Scene 5 | "Warm peach cobbler with a golden-brown crust in a blue enamel dish." | `ai-generated-conceptual` | approved |
| Live oak fire | `live-oak-fire.png` | `public/images/story/woodys-live-oak-fire.webp` | 928×1152 | Portrait 4:5 | Scene 4, frame 1 | "Split oak logs burning down to red embers in a brick firebox." | `ai-generated-conceptual` | approved |
| Brick pit | `the-brick-pit.png` | `public/images/story/woodys-brick-pit.webp` | 928×1152 | Portrait 4:5 | Scene 4, frame 2 | "Racks of ribs and links on a steel grate over glowing embers inside a brick barbecue pit." | `ai-generated-conceptual` | approved |
| Finished plate | `the-plate.png` | `public/images/story/woodys-finished-plate.webp` | 928×1152 | Portrait 4:5 | Scene 4, frame 3 | "A finished tray of barbecue ribs and chicken on butcher paper." | `ai-generated-conceptual` | approved |
| Closing ribs banner | `CTAbanner.png` | `public/images/hero/woodys-bring-home-the-smoke.webp` | 1584×672 | Panoramic 2.36:1 | Scene 7 banner | `alt=""` (decorative; the headline beside it carries the meaning) | `ai-generated-conceptual` | approved |

**Neither the fire nor the pit image may be described as Woody's own pit or equipment.** Neither the mac and cheese nor the cobbler may be presented as the exact current Woody's serving presentation. Those constraints are enforced by the alt text above and recorded on each asset in code.

### Crop decisions

| Asset | Source ratio | Display ratio | `object-position` | Why |
|---|---|---|---|---|
| Mac and cheese | 4:5 | 1:1 | `center 42%` | The bowl sits below centre; held high so the rim is not cropped |
| Peach cobbler | 4:5 | 3:2 | `center 40%` | Cover crops hard top and bottom; the dish centres near 40% |
| Finished plate | 4:5 | ~0.93:1 | `center 38%` | Biased up to keep the top of the meat rather than empty tray |
| Closing banner | 2.36:1 | shallower band | `center center` | Keeps both racks and the bone ends in the safe area |
| All others | 4:5 | 4:5 | default | No crop occurs |

---

## Still empty

| Slot | Why | Effect on the site |
|---|---|---|
| **Rib Tips** (Scene 2) | No image supplied in this batch | Card renders the typeset stand-in beside the photographed cards |
| **Sliced Beef** (Scene 2) | No image supplied. **Deliberately not substituted** | Card renders the typeset stand-in |
| Founders / family photograph | None supplied | Scene 3 uses typography and the documented date |
| Potato salad | None supplied | Not shown as an image |
| Original vector logo | None supplied | Text wordmark in use |

No chicken, rib, turkey-leg or mixed-meat image was used to fill Sliced Beef.

---

## Storefront images — client-authorised, now published

These three were held on 2026-08-25 and released by explicit client instruction the same day. What was flagged remains true and is recorded here rather than smoothed over.

| File | Final path | What it actually is | How it was handled |
|---|---|---|---|
| `open-late.png` (1264×848) | `locations/woodys-open-late.webp` (1264×748) | **Not** a conceptual doorway. A night render of the **real** storefront: the building, bulldog logo, signage and anniversary banners all reproduced. Had **"Woody's Bar-B-Que / 3446 W Slauson Ave." burned into the lower left** | The caption band (source y 755–800) was **cropped away**, so the address appears once on the page as live HTML. Alt text describes it as the real building, because it is one |
| `woodyex.jpg` (928×1152) | `locations/woodys-slauson-exterior.webp` | AI-enhanced dusk render of the same storefront, natively 4:5 for Scene 3 | Published. **Known artifact retained:** the anniversary banner renders as **"IN BCRIKESS"** where the real sign reads "IN BUSINESS". At the sizes used it is about six pixels tall and not legible in place, but it is generated text on a real business's signage |
| `woodyexterior.webp` (677×510) | `locations/woodys-slauson-reference.webp` | The **only authentic photograph** in the set. Low resolution, consistent with a listing or street-level image | Published to the Gallery at native size. **Not upscaled.** Rights remain `ownership-confirmation-required` |

**Provenance correction on the record:** the brief described `open-late.png` as conceptual "without a real Woody's storefront reference". It is not. It and `woodyex.jpg` are both `ai-enhanced-from-reference`, derived from `woodyexterior.webp`.

**Outstanding:** confirm ownership of the underlying reference photograph. Everything above depends on it.

### Also integrated in this pass

| Subject | Final path | Dimensions | Placement | Alt text |
|---|---|---|---|---|
| Storefront at dusk | `locations/woodys-slauson-exterior.webp` | 928×1152 | Scene 3, /visit | "The Woody's Bar-B-Que building on West Slauson Avenue at dusk, with its painted sign and bulldog logo." |
| Storefront at night | `locations/woodys-open-late.webp` | 1264×748 | Scene 6 | "The Woody's Bar-B-Que building on West Slauson Avenue at night, its painted signs lit and the service window open." |
| Storefront, daytime reference | `locations/woodys-slauson-reference.webp` | 677×510 | Gallery | "The Woody's Bar-B-Que building on West Slauson Avenue in daylight." |

Scene 6's figure is `display: none` below 900px so the pinned stage fits a phone viewport; the image is therefore never downloaded on small screens.

---

## Supplied but unused

| File | Subject | Why unused |
|---|---|---|
| `turkey-leg-special.png` | A single glazed turkey leg | Turkey legs are **not** on the verified menu. Publishing it would imply a menu item the business data does not support |
| `chicken-sausage.jpg` | Chicken pieces and sausages together | Ambiguous: it is neither Sliced Beef nor Rib Tips, and "Chicken Links" is a menu item with no card slot on the homepage. Available if a Chicken Links card is wanted |

Both are retained in `src/images/`. Nothing was deleted.

---

## Duplicates to be aware of

`combination-plate.png`, `the-plate.png` and `full-table.png` are **the same meat arrangement** rendered on three different vessels (round platter, square tray, landscape tray). They currently appear in Scene 2, Scene 4 frame 3 and Scene 5. A reader scrolling the whole page passes all three. One additional distinct plate shot would remove the repetition.

`pork-ribs.png` is used twice: the Scene 1 hero and the Scene 2 "Pork Ribs" card. Different crops and scales, but the same dish photograph appears within the first two scenes.

---

## Open rights items

- All twelve integrated images are AI-generated. If the business intends to present authentic photography, these are placeholders of a better kind, not final assets.
- The three storefront files derive from a photograph whose ownership is unconfirmed. **Do not publish any of them until the client confirms they own or have licensed the underlying image.**
- No image is hotlinked. Every rendered image is served from `/public`. Verified automatically.
