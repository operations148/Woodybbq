/**
 * Single source of truth for Woody's Bar-B-Que business data.
 *
 * Rules encoded here, from the client's locked direction:
 *  - Nothing uncertain is published. A conflicted value carries status
 *    "conflict" or "unknown" and the UI withholds it rather than guessing.
 *  - CTAs render only when their destination exists. `orderOnlineUrl` is null,
 *    so no Order Online button is rendered anywhere. Never a disabled button.
 *  - No ratings, no review counts, no prices, no invented claims.
 *
 * Every conflict is documented in docs/business-data-audit.md.
 */

export type VerificationStatus =
  | "verified"
  | "conflict"
  | "confirmation-required"
  | "unknown";

export type BusinessLink = {
  label: string;
  href: string | null;
  external?: boolean;
};

export type BusinessHours = {
  day: string;
  opens?: string;
  closes?: string;
  /** "conflict" means sources disagree. Never render a specific time for it. */
  status: "verified" | "conflict" | "closed" | "unknown";
  note?: string;
};

export type Location = {
  id: string;
  name: string;
  shortName: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  phoneHref: string;
  directionsUrl: string;
  googleListingUrl: string;
  hours: BusinessHours[];
  status: "verified-active" | "confirmation-required";
};

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const brand = {
  /** Signage / wordmark spelling. Used for display throughout the site. */
  displayName: "Woody's Bar-B-Que",
  /**
   * The name discovered on the Google Business Profile. It differs from the
   * signage spelling. Until the client confirms which is canonical, structured
   * data uses `displayName` and the difference is logged in the audit.
   */
  googleListingName: "Woody's Bar-B-Q",
  nameSpellingStatus: "confirmation-required" as VerificationStatus,
  cuisine: "Barbecue",
  neighborhood: "Hyde Park / South Los Angeles",
  foundedYear: 1975,
  foundedMonth: "August",
  founders: "Woody and Jenetha Phillips",
  positioning:
    "A longstanding, Black-owned, family-operated South Los Angeles barbecue business.",
  /** The one approved story sentence. Do not extend it. */
  storyLine:
    "A South Los Angeles BBQ tradition since 1975, founded by Woody and Jenetha Phillips and carried forward by their family.",
  /** The one approved cooking sentence. Do not extend it. */
  cookingLine: "Brick pits. Live oak fire. A South Los Angeles tradition since 1975.",
} as const;

/* ------------------------------------------------------------------ */
/* Canonical URL                                                       */
/* ------------------------------------------------------------------ */

/**
 * The canonical origin, in order of preference:
 *   1. NEXT_PUBLIC_SITE_URL, once the real domain is confirmed
 *   2. the Vercel deployment URL, so previews and the default domain get
 *      correct canonicals and sitemap entries instead of localhost
 *   3. localhost, for development
 *
 * No parked or legacy domain is hardcoded, because the canonical domain is
 * still an open item. See docs/business-data-audit.md.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000");

export const canonicalDomainStatus: VerificationStatus = "confirmation-required";

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

const slausonDirections =
  "https://www.google.com/maps/dir/?api=1&destination=3446+W+Slauson+Ave%2C+Los+Angeles%2C+CA+90043";

export const slauson: Location = {
  id: "slauson",
  name: "Woody's Bar-B-Que — Slauson",
  shortName: "Slauson",
  address: {
    street: "3446 W Slauson Ave",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90043",
  },
  phone: "(323) 294-9443",
  phoneHref: "tel:+13232949443",
  directionsUrl: slausonDirections,
  googleListingUrl: "https://share.google/Z6ML7mnKKVD8JzL4p",
  status: "verified-active",
  hours: [
    { day: "Monday", opens: "11:00", closes: "21:00", status: "verified" },
    { day: "Tuesday", opens: "11:00", closes: "21:00", status: "verified" },
    { day: "Wednesday", opens: "11:00", closes: "21:00", status: "verified" },
    { day: "Thursday", opens: "11:00", closes: "21:00", status: "verified" },
    { day: "Friday", opens: "11:00", closes: "22:00", status: "verified" },
    { day: "Saturday", opens: "11:00", closes: "22:00", status: "verified" },
    {
      day: "Sunday",
      status: "conflict",
      note: "Sources disagree on the closing time. Check the current listing.",
    },
  ],
};

/** The active scope. Slauson only until the client confirms otherwise. */
export const locations: Location[] = [slauson];
export const primaryLocation = slauson;

export const multiLocationScopeStatus: VerificationStatus =
  "confirmation-required";

/**
 * Researched but NOT published. Held here so the data is not lost and so the
 * audit can reference it. Nothing in the UI reads this array.
 */
export const unpublishedLocationCandidates = [
  {
    id: "inglewood",
    name: "Woody's Bar-B-Que — Inglewood",
    street: "475 S Market St, Inglewood, CA 90301",
    phone: "(310) 672-4200",
    blockedBy: "Scope not confirmed by client.",
  },
  {
    id: "florence",
    name: "Woody's Bar-B-Que — Florence",
    street: "1958 W Florence Ave, Los Angeles",
    phone: "(323) 758-8303",
    blockedBy:
      "ZIP code (90043 vs 90047), operating hours, and current status all conflict across sources.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Conversion actions                                                  */
/* ------------------------------------------------------------------ */

/**
 * No business-owned Slauson ordering URL was verified. While this is null the
 * Order Online CTA is not rendered anywhere on the site. Never render it
 * disabled; omit it.
 */
export const orderOnlineUrl: string | null = null;

/** No current, consistent Slauson pricing was verified. */
export const showPrices = false;

/**
 * Phone ordering is not confirmed, so the phone CTA uses a neutral label.
 * Do not change this to "Call to Order" without client confirmation.
 */
export const phoneCtaLabel = "Call Woody's";

/** One label per intent, used everywhere. */
export const ctaLabels = {
  menu: "View Menu",
  fullMenu: "View Full Menu",
  phone: phoneCtaLabel,
  directions: "Get Directions",
  hours: "Check Today's Hours",
  order: "Order Online",
} as const;

export const acceptsReservations = false;
export const reservationsStatus: VerificationStatus = "unknown";
export const dineInStatus: VerificationStatus = "unknown";
export const cateringProcessStatus: VerificationStatus = "unknown";

/* ------------------------------------------------------------------ */
/* Social                                                              */
/* ------------------------------------------------------------------ */

export const social: BusinessLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/woodysbbqla/",
    external: true,
  },
];

export const instagramHandle = "@woodysbbqla";

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

/**
 * No review text was directly reverified against its source, so no quotations,
 * reviewer names, star scores or counts are published. The UI renders
 * source-link cards instead. Do not add AggregateRating or Review schema.
 */
export const publishReviewQuotes = false;

export const reviewSources: BusinessLink[] = [
  {
    label: "Read reviews on Google",
    href: "https://share.google/Z6ML7mnKKVD8JzL4p",
    external: true,
  },
  {
    label: "Read reviews on Yelp",
    href: "https://www.yelp.com/biz/woodys-bar-b-que-los-angeles",
    external: true,
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navigation: BusinessLink[] = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/our-story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit", href: "/visit" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatAddress(location: Location): string {
  const { street, city, state, postalCode } = location.address;
  return `${street}, ${city}, ${state} ${postalCode}`;
}

/** 24h "21:00" to a display "9:00 PM". */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

/**
 * Opening hours for structured data. Days whose status is not "verified" are
 * omitted entirely, so the disputed Sunday value never reaches schema.
 */
export function verifiedOpeningHoursSpecification(location: Location) {
  return location.hours
    .filter((h) => h.status === "verified" && h.opens && h.closes)
    .map((h) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: h.day,
      opens: h.opens as string,
      closes: h.closes as string,
    }));
}

export const hasHoursConflict = (location: Location) =>
  location.hours.some((h) => h.status === "conflict");
