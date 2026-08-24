import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/business";

/**
 * Only routes that exist and carry real content. No doorway pages, no
 * location routes for unconfirmed locations, no /order while there is no
 * verified ordering destination.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/menu", priority: 0.9 },
    { path: "/visit", priority: 0.8 },
    { path: "/our-story", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
