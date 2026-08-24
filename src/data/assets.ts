/**
 * The asset register, in code.
 *
 * Every image slot on the site is addressed by id through this file. Right now
 * every entry is `missing` or `ownership-confirmation-required`, because no
 * client-owned Woody's photography exists in the repository. The `Plate`
 * component renders an honest typographic composition for those, and swaps to
 * the real photograph the moment one is dropped at `src` and the status is
 * changed to "approved".
 *
 * That is the whole mechanism: no code changes are needed when photography
 * arrives, only this file.
 *
 * Never point `src` at a Yelp, Google, editorial or directory URL. Local files
 * under /public/images only. Never substitute AI-generated or stock BBQ
 * photography for missing authentic Woody's imagery.
 */

export type AssetRights =
  | "approved"
  | "ownership-confirmation-required"
  | "missing"
  | "rejected-third-party"
  | "duplicate";

/**
 * How the image was made. Kept separate from rights on purpose: a client may
 * approve an image for use while it is still not documentary photography of
 * this restaurant, and the site must never imply otherwise in alt text,
 * captions or structured data.
 */
export type Provenance =
  | "authentic-photograph"
  | "ai-generated-conceptual"
  | "ai-enhanced-from-reference"
  | "unknown";

export type Asset = {
  id: string;
  /** What the photograph should show. Also drives the honest fallback caption. */
  subject: string;
  rights: AssetRights;
  provenance: Provenance;
  /** Where the reference came from, and whether its ownership is confirmed. */
  referenceStatus?: string;
  /** Local path under /public. Null until an approved file exists. */
  src: string | null;
  alt: string;
  /**
   * object-position for the rendered image. Needed where the display ratio
   * differs from the source ratio, so cover-cropping keeps the subject.
   */
  objectPosition?: string;
  /** Where it belongs, for the register doc. */
  placement: string;
  /** Rendered on the fallback composition. Keep it short. */
  fallbackLabel: string;
  /** Optional second line on the fallback. */
  fallbackNote?: string;
};

const asset = (a: Asset): Asset => a;

export const assets: Record<string, Asset> = {
  /* ---- brand ---- */
  wordmark: asset({
    id: "wordmark",
    subject: "Woody's bulldog wordmark, original vector or transparent PNG",
    rights: "missing",
    provenance: "unknown",
    referenceStatus: "No logo package supplied. Text wordmark in use.",
    src: null,
    alt: "Woody's Bar-B-Que",
    placement: "Header, footer",
    fallbackLabel: "Woody's",
  }),

  /* ---- hero ---- */
  "hero-ribs": asset({
    id: "hero-ribs",
    subject: "Sauced pork ribs on a dark platter",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/hero/woodys-slauson-ribs-hero.webp",
    alt: "Sauced pork ribs with dark charred edges on a black platter.",
    placement: "Scene 1 hero",
    fallbackLabel: "Pork Ribs",
  }),

  /* ---- signature meats, Scene 2 ---- */
  "rib-tips": asset({
    id: "rib-tips",
    subject: "Rib tips in a foil tray or serving tray",
    rights: "missing",
    provenance: "unknown",
    referenceStatus: "No image supplied in this batch.",
    src: null,
    alt: "Woody's rib tips.",
    placement: "Scene 2",
    fallbackLabel: "Rib Tips",
  }),
  "hot-links": asset({
    id: "hot-links",
    subject: "Barbecue hot links with charred casing",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/menu/woodys-hot-links.webp",
    alt: "Barbecue hot links with glossy, charred casing on a black platter.",
    placement: "Scene 2",
    fallbackLabel: "Hot Links",
  }),
  "bbq-chicken": asset({
    id: "bbq-chicken",
    subject: "Barbecue chicken pieces with browned skin",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/menu/woodys-bbq-chicken.webp",
    alt: "Barbecue chicken pieces with browned and charred skin on a black platter.",
    placement: "Scene 2",
    fallbackLabel: "BBQ Chicken",
  }),
  "sliced-beef": asset({
    id: "sliced-beef",
    subject: "Sliced beef plate or preparation",
    rights: "missing",
    provenance: "unknown",
    referenceStatus:
      "No image supplied in this batch. Deliberately NOT substituted: no chicken, rib, turkey-leg or mixed-meat image may stand in for sliced beef.",
    src: null,
    alt: "Woody's sliced beef.",
    placement: "Scene 2",
    fallbackLabel: "Sliced Beef",
  }),
  "combination-plate": asset({
    id: "combination-plate",
    subject: "Heaped combination plate of barbecue meats",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/menu/woodys-combination-plate.webp",
    alt: "A heaped combination plate of barbecue ribs, chicken and other smoked meats.",
    placement: "Scene 2",
    fallbackLabel: "Combination Plate",
  }),
  "combination-plate-wide": asset({
    id: "combination-plate-wide",
    subject: "Combination platter on a tray, landscape",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/menu/woodys-combination-plate-wide.webp",
    alt: "A tray of barbecue ribs, a link and chicken on butcher paper.",
    placement: "Scene 5",
    fallbackLabel: "Combination Plate",
  }),

  /* ---- story, Scene 3 ---- */
  founders: asset({
    id: "founders",
    subject: "Woody and Jenetha Phillips, founder or family photograph",
    rights: "missing",
    provenance: "unknown",
    referenceStatus:
      "No image supplied. Never generate a substitute for a founder photograph.",
    src: null,
    alt: "Woody and Jenetha Phillips.",
    placement: "Scene 3, Our Story",
    fallbackLabel: "1975",
    fallbackNote: "Family photograph pending approval",
  }),
  "slauson-exterior": asset({
    id: "slauson-exterior",
    subject: "Woody's storefront at dusk, Slauson Avenue",
    rights: "approved",
    provenance: "ai-enhanced-from-reference",
    referenceStatus:
      "Client-authorised for use. An AI-enhanced dusk render of the real storefront, derived from the reference photograph in this same folder. KNOWN ARTIFACT: the anniversary banner renders as 'IN BCRIKESS' where the real sign reads 'IN BUSINESS'. It is roughly six pixels tall at the sizes used here and is not legible in place, but it is generated text on a real business's signage and should be corrected if a clean asset becomes available.",
    src: "/images/locations/woodys-slauson-exterior.webp",
    // The building sits in the upper two thirds; held high so a shorter crop
    // keeps the signage rather than the empty forecourt.
    objectPosition: "center 38%",
    alt: "The Woody's Bar-B-Que building on West Slauson Avenue at dusk, with its painted sign and bulldog logo.",
    placement: "Scene 3, /visit",
    fallbackLabel: "3446 W Slauson Ave",
  }),
  "slauson-reference": asset({
    id: "slauson-reference",
    subject: "Woody's storefront, daytime reference photograph",
    rights: "ownership-confirmation-required",
    provenance: "authentic-photograph",
    referenceStatus:
      "Client-authorised for use. The only authentic photograph in the set. Low resolution (677x510), consistent with a listing or street-level image, so ownership is still worth confirming before wider use. Never upscaled.",
    src: "/images/locations/woodys-slauson-reference.webp",
    alt: "The Woody's Bar-B-Que building on West Slauson Avenue in daylight.",
    placement: "Gallery",
    fallbackLabel: "Slauson Avenue",
  }),
  "slauson-night": asset({
    id: "slauson-night",
    subject: "Woody's storefront lit at night, Slauson Avenue",
    rights: "approved",
    provenance: "ai-enhanced-from-reference",
    referenceStatus:
      "Client-authorised for use. A night render of the real storefront, derived from the same reference photograph. The supplied master had 'Woody's Bar-B-Que / 3446 W Slauson Ave.' burned into the lower left; that band (source y 755-800) was cropped away, so the address appears once on the page, as live HTML. Because the image is the real building, the alt text says so rather than describing a generic doorway.",
    src: "/images/locations/woodys-open-late.webp",
    objectPosition: "center 45%",
    alt: "The Woody's Bar-B-Que building on West Slauson Avenue at night, its painted signs lit and the service window open.",
    placement: "Scene 6",
    fallbackLabel: "Open Late",
  }),

  /* ---- the Pit-to-Plate reveal, Scene 4. The peak. ----
     These three are conceptual images. The alt text describes a brick pit and
     a wood fire, never "Woody's pit" or "Woody's equipment", because none of
     them was made from a reference of the real thing. */
  "pit-fire": asset({
    id: "pit-fire",
    subject: "Split logs burning down to embers in a brick firebox",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Must not be described as Woody's own pit.",
    src: "/images/story/woodys-live-oak-fire.webp",
    alt: "Split oak logs burning down to red embers in a brick firebox.",
    placement: "Scene 4, frame 1",
    fallbackLabel: "Live Oak Fire",
  }),
  "pit-cooking": asset({
    id: "pit-cooking",
    subject: "Meat cooking on a grate over embers in a brick pit",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Must not be described as Woody's own pit.",
    src: "/images/story/woodys-brick-pit.webp",
    alt: "Racks of ribs and links on a steel grate over glowing embers inside a brick barbecue pit.",
    placement: "Scene 4, frame 2",
    fallbackLabel: "The Brick Pit",
  }),
  "pit-plate": asset({
    id: "pit-plate",
    subject: "Finished barbecue plate on a tray",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Near-duplicate of combination-plate: same arrangement, different vessel.",
    src: "/images/story/woodys-finished-plate.webp",
    // The pile sits high in a 4:5 source shown in a squarer frame, so the crop
    // is biased upward to keep the top of the meat rather than the empty tray.
    objectPosition: "center 38%",
    alt: "A finished tray of barbecue ribs and chicken on butcher paper.",
    placement: "Scene 4, frame 3",
    fallbackLabel: "The Plate",
  }),

  /* ---- sides and desserts, Scene 5 ---- */
  "mac-and-cheese": asset({
    id: "mac-and-cheese",
    subject: "Bowl of macaroni and cheese",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No real dish reference. Not the exact current Woody's serving presentation.",
    src: "/images/menu/woodys-mac-and-cheese.webp",
    // Source is 4:5, shown in a 1:1 card. Held slightly high so the bowl,
    // which sits below centre, is not cropped at the rim.
    objectPosition: "center 42%",
    alt: "A bowl of creamy macaroni and cheese on butcher paper.",
    placement: "Scene 5",
    fallbackLabel: "Mac & Cheese",
  }),
  "potato-salad": asset({
    id: "potato-salad",
    subject: "Potato salad",
    rights: "missing",
    provenance: "unknown",
    referenceStatus: "No image supplied in this batch.",
    src: null,
    alt: "Woody's potato salad.",
    placement: "Scene 5",
    fallbackLabel: "Potato Salad",
  }),
  "peach-cobbler": asset({
    id: "peach-cobbler",
    subject: "Peach cobbler in an enamel dish",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No real dish reference. Not the exact current Woody's serving presentation.",
    src: "/images/menu/woodys-peach-cobbler.webp",
    // Source is 4:5, shown in a 3:2 card, so cover crops hard top and bottom.
    // The dish centres around 40% of the frame height.
    objectPosition: "center 40%",
    alt: "Warm peach cobbler with a golden-brown crust in a blue enamel dish.",
    placement: "Scene 5",
    fallbackLabel: "Peach Cobbler",
  }),

  /* ---- close, Scene 7 ---- */
  "closing-plate": asset({
    id: "closing-plate",
    subject: "Two racks of sauced ribs on a tray, panoramic",
    rights: "approved",
    provenance: "ai-generated-conceptual",
    referenceStatus:
      "No authentic Woody's reference. Client-supplied conceptual food image.",
    src: "/images/hero/woodys-bring-home-the-smoke.webp",
    // Master is ~2.36:1 shown in a shallower band. The ribs sit centre-left,
    // so the crop is held centre to keep both racks and the bone ends.
    objectPosition: "center center",
    alt: "",
    placement: "Scene 7 closing banner",
    fallbackLabel: "Bring Home the Smoke",
  }),
};

export function getAsset(id: string): Asset {
  const a = assets[id];
  if (!a) {
    throw new Error(
      `Unknown asset id "${id}". Add it to src/data/assets.ts before referencing it.`,
    );
  }
  return a;
}

/** True when a real, approved file exists and can be rendered. */
export function hasImage(a: Asset): boolean {
  return a.rights === "approved" && typeof a.src === "string" && a.src.length > 0;
}

/** Count of approved images, used to decide the Scene 4 reveal's shape. */
export function approvedCount(ids: string[]): number {
  return ids.filter((id) => hasImage(getAsset(id))).length;
}
