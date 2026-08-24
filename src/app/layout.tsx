import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { EmberRail } from "@/components/EmberRail";
import { ScrollDriver } from "@/components/ScrollDriver";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";
import { brand, siteUrl } from "@/data/business";
import { jsonLd, restaurantSchema } from "@/lib/schema";

/* Two families, no more. Fraunces carries the voice: at heavy weight with a low
   optical size it has the warm, ink-trapped character of 1970s magazine display
   type, which is the Ebony reference, and it does not thin out into a perfume
   brand. Archivo carries prose AND the signage register, which it reaches by
   weight, uppercase and tracking rather than by a third family. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["600", "700", "900"],
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.displayName} | South Los Angeles BBQ Since 1975`,
    template: `%s | ${brand.displayName}`,
  },
  description:
    "Brick pits. Live oak fire. Saucy ribs, links, sliced beef, and chicken from a South Los Angeles family tradition since 1975. Visit us on Slauson Avenue.",
  applicationName: brand.displayName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.displayName,
    title: `${brand.displayName} | South Los Angeles BBQ Since 1975`,
    description:
      "Brick pits. Live oak fire. A South Los Angeles barbecue tradition since 1975.",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.displayName} | South Los Angeles BBQ Since 1975`,
    description:
      "Brick pits. Live oak fire. A South Los Angeles barbecue tradition since 1975.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0908",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The inline script below adds the `js` class before paint, which changes
    // <html>'s className ahead of hydration. suppressHydrationWarning is scoped
    // to this element's own attributes, not to its children.
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks that scripting is live, before first paint, so the entrance
            styles in globals.css only ever apply when they can be undone. */}
        <script
          dangerouslySetInnerHTML={{
            /* The engine adds `sc-ready` itself once it has mounted. This only
               marks that scripting is live at all. */
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* The scrollcraft engine, served verbatim from /public. Deferred so it
            parses before hydration and is ready when ScrollCraftMount runs. */}
        <script src="/scrollcraft.js" defer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(restaurantSchema())}
        />
        {/* The engine starts every cue and every entrance at opacity 0, and
            pins stages with position: sticky. Without scripting none of that
            is ever undone, so this hands the page back to the document: every
            act becomes an ordinary section and every word is on screen. It is
            what keeps "readable without JavaScript" true now that the engine
            is mounted. */}
        <noscript>
          <style>{`
            [data-sc-cue],
            [data-sc-in],
            [data-sc-stagger] > *,
            .sc-split__i {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
            }
            .sc-stage {
              position: static !important;
              height: auto !important;
              overflow: visible !important;
            }
            .sc-copy {
              position: static !important;
              max-width: none !important;
            }
            [data-sc-pan] {
              flex-wrap: wrap !important;
              transform: none !important;
            }
            [data-sc-reveal] { clip-path: none !important; }
            [data-sc-progress] { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <span data-sc-progress aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <EmberRail />

        <Header />

        <main id="main">{children}</main>

        <MobileActionBar />

        <ScrollDriver />
        <ScrollCraftMount />
      </body>
    </html>
  );
}
