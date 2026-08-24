import type { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { LocationDetails } from "@/components/site/LocationDetails";
import {
  primaryLocation,
  publishReviewQuotes,
  reviewSources,
} from "@/data/business";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Woody's Bar-B-Que is at 3446 W Slauson Ave, Los Angeles, CA 90043. Call (323) 294-9443 for today's hours, or get directions.",
  alternates: { canonical: "/visit" },
};

/**
 * Reviews and the visit details on one page, the same pairing Scene 6 makes on
 * the homepage and for the same reason.
 *
 * No review text, no star scores and no review counts: none of the candidate
 * excerpts could be reverified directly against their source, so the page links
 * to the live listings instead of quoting them.
 */
export default function VisitPage() {
  return (
    <>
      <section className="scene page-head" aria-labelledby="visit-title">
        <div className="wrap">
          <p className="label label--ember">Hyde Park, South Los Angeles</p>
          <h1 id="visit-title" className="display display--2xl">
            Visit Woody&rsquo;s
          </h1>
          <p className="lede page-head__lede">
            The original restaurant on West Slauson Avenue. Hours can change, so
            check today&rsquo;s before you set out.
          </p>
        </div>
      </section>

      <section className="scene scene--surface" aria-label="Location details">
        <div className="wrap trust__grid">
          <div>
            {/* First heading under this page's H1, so it is an h2 here. */}
            <LocationDetails location={primaryLocation} headingLevel={2} />
          </div>
          <figure className="trust__figure">
            <Plate
              id="slauson-exterior"
              ratio="wide"
              scale="sm"
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </figure>
        </div>
      </section>

      <section className="scene" aria-labelledby="reviews-title" id="reviews">
        <div className="wrap wrap--narrow page-prose">
          <h2 id="reviews-title" className="display display--xl">
            What LA Says About Woody&rsquo;s
          </h2>
          <p className="body">
            Woody&rsquo;s has been serving the same street since 1975. Rather
            than reprint reviews here, we link straight to them, so you read
            what people actually wrote, in full and up to date.
          </p>
          {publishReviewQuotes ? null : (
            <ul className="trust__sources">
              {reviewSources.map((s) => (
                <li key={s.label}>
                  <a
                    className="source"
                    href={s.href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="source__label">{s.label}</span>
                    <span className="source__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                    <span className="visually-hidden">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
