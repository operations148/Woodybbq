import type { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import { ctaLabels, primaryLocation } from "@/data/business";
import { assets, hasImage } from "@/data/assets";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Woody's Bar-B-Que on Slauson Avenue: the pit, the plates and the restaurant.",
  alternates: { canonical: "/gallery" },
};

/**
 * The gallery is generated from the asset register, so it shows exactly what
 * the site actually holds and nothing it does not.
 *
 * While photography is pending, each frame is the typeset composition rather
 * than a stock or AI substitute, and the page says so plainly once, at the top,
 * instead of pretending the frames are photographs.
 */
const order = [
  "hero-ribs",
  "rib-tips",
  "hot-links",
  "combination-plate",
  "bbq-chicken",
  "sliced-beef",
  "pit-fire",
  "pit-cooking",
  "mac-and-cheese",
  "peach-cobbler",
  "slauson-exterior",
  "slauson-night",
  "slauson-reference",
];

const ratioFor = (i: number) =>
  i % 5 === 0 ? "wide" : i % 3 === 0 ? "portrait" : "square";

export default function GalleryPage() {
  const items = order.map((id) => assets[id]).filter(Boolean);
  const approved = items.filter(hasImage).length;

  return (
    <>
      <section className="scene page-head" aria-labelledby="gallery-title">
        <div className="wrap">
          <p className="label label--ember">Slauson Avenue</p>
          <h1 id="gallery-title" className="display display--2xl">
            The Gallery
          </h1>
          {approved === 0 ? (
            <p className="lede page-head__lede">
              Photography of the pit, the plates and the restaurant is being
              prepared. Until it is approved for use, these frames are set in
              type rather than filled with stock imagery.
            </p>
          ) : (
            <p className="lede page-head__lede">
              The pit, the plates and the restaurant on Slauson Avenue.
            </p>
          )}
        </div>
      </section>

      <section className="scene scene--surface" aria-label="Photographs">
        <div className="wrap gallery">
          {items.map((a, i) => (
            <figure key={a.id} className="gallery__item">
              <Plate
                id={a.id}
                ratio={ratioFor(i) as "wide" | "portrait" | "square"}
                scale="sm"
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                hideLabel
              />
              <figcaption className="label gallery__caption">
                {a.subject}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="scene" aria-label="Visit Woody's">
        <div className="wrap page-cta">
          <h2 className="display display--xl">See It In Person</h2>
          <p className="body">
            The pit is on Slauson Avenue, and it has been since 1975.
          </p>
          <div className="page-head__actions">
            <ActionLink
              href={primaryLocation.directionsUrl}
              variant="primary"
              external
            >
              {ctaLabels.directions}
            </ActionLink>
            <ActionLink href="/menu" variant="secondary">
              {ctaLabels.menu}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
