import {
  brand,
  formatAddress,
  orderOnlineUrl,
  primaryLocation,
  siteUrl,
  social,
  verifiedOpeningHoursSpecification,
} from "@/data/business";

/**
 * Restaurant structured data, verified values only.
 *
 * Deliberately absent, each because the underlying value is unverified:
 *   aggregateRating, review, priceRange, geo, acceptsReservations,
 *   hasDeliveryMethod, and the disputed Sunday hours.
 *
 * `verifiedOpeningHoursSpecification` filters to days whose status is
 * "verified", so Sunday cannot leak in even if someone adds a time to it later.
 */
export function restaurantSchema() {
  const loc = primaryLocation;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: brand.displayName,
    description: brand.storyLine,
    url: siteUrl,
    telephone: loc.phone,
    servesCuisine: brand.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.postalCode,
      addressCountry: "US",
    },
    hasMenu: `${siteUrl}/menu`,
    openingHoursSpecification: verifiedOpeningHoursSpecification(loc),
    sameAs: social
      .map((s) => s.href)
      .filter((href): href is string => Boolean(href)),
    ...(orderOnlineUrl ? { acceptsReservations: false } : {}),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${siteUrl}${t.path}`,
    })),
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}

export const addressLine = formatAddress(primaryLocation);
