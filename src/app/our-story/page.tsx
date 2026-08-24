import type { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import { brand, ctaLabels, primaryLocation } from "@/data/business";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Woody's Bar-B-Que was founded in August 1975 by Woody and Jenetha Phillips on West Slauson Avenue in South Los Angeles, and is still run by the family.",
  alternates: { canonical: "/our-story" },
};

/**
 * Everything on this page is traceable to the researched sources.
 *
 * Deliberately absent: any count of generations, any award, any "best in Los
 * Angeles" claim, any recipe or sauce detail, any celebrity customer, and any
 * date that is not documented. Where a fact was not verifiable it is simply not
 * here, rather than softened with a hedge.
 */
export default function OurStoryPage() {
  return (
    <>
      <section className="scene page-head" aria-labelledby="story-title">
        <div className="wrap">
          <p className="label label--ember">Since August 1975</p>
          <h1 id="story-title" className="display display--2xl">
            A South Los Angeles Tradition
          </h1>
          <p className="lede page-head__lede">{brand.storyLine}</p>
        </div>
      </section>

      <section className="scene ground-paper" aria-label="The founding">
        <div className="wrap story__grid">
          <div className="story__text">
            <h2 className="display display--lg">Woody and Jenetha</h2>
            <div className="story__prose">
              <p className="body body--ink story__first">
                Woody Phillips came to Los Angeles from Louisiana in the 1960s.
                In August 1975, he and Jenetha Phillips opened a barbecue
                restaurant on West Slauson Avenue.
              </p>
              <p className="body">
                He worked the pit. She ran the register. The Slauson restaurant
                was the original location, and it is still the one this site is
                about.
              </p>
              <p className="body">
                The family carried the business forward. A 2023 feature by the
                Los Angeles Rams on Black-owned businesses included Rodney
                Phillips representing the family. A second Woody&rsquo;s opened
                in Inglewood, reported as 1995.
              </p>
            </div>
          </div>

          <div className="story__aside">
            <figure className="story__figure">
              <Plate id="founders" ratio="portrait" scale="md" sizes="(max-width: 880px) 100vw, 34vw" />
            </figure>
            <p className="story__note">
              A founder photograph will replace this frame once the family
              approves one for use.
            </p>
          </div>
        </div>
      </section>

      <section className="scene" aria-label="The pit">
        <div className="wrap wrap--narrow page-prose">
          <h2 className="display display--xl">Brick Pits and Live Oak</h2>
          <p className="body">
            Woody&rsquo;s cooks over live fire in brick pits, using live oak.
            That method is the through line from 1975 to the plate served this
            afternoon, and it is the reason the menu is built around ribs, links,
            sliced beef and chicken.
          </p>
          <p className="body">
            {brand.cookingLine}
          </p>
          <div className="page-head__actions">
            <ActionLink href="/menu" variant="primary">
              {ctaLabels.menu}
            </ActionLink>
            <ActionLink href={primaryLocation.phoneHref} variant="secondary">
              {ctaLabels.phone}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
