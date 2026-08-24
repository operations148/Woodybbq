import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import {
  ctaLabels,
  orderOnlineUrl,
  primaryLocation,
  showPrices,
} from "@/data/business";
import { availabilityCaveat, menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Pork ribs, rib tips, beef links, sliced beef, BBQ chicken and combination plates, with classic sides and desserts. Call Woody's on Slauson Avenue to check today's menu.",
  alternates: { canonical: "/menu" },
};

/**
 * The menu, set as an index rather than a price list.
 *
 * No prices appear anywhere: `showPrices` is false because no current,
 * consistent Slauson pricing was verified, and prices copied from a menu-board
 * photograph would be worse than none. The `showPrices` guard is left in the
 * markup so enabling it later is a data change, not a rewrite.
 */
export default function MenuPage() {
  return (
    <>
      <section className="scene page-head" aria-labelledby="menu-title">
        <div className="wrap">
          <p className="label label--ember">Woody&rsquo;s Bar-B-Que</p>
          <h1 id="menu-title" className="display display--2xl">
            The Menu
          </h1>
          <p className="lede page-head__lede">{availabilityCaveat}</p>
          <div className="page-head__actions">
            <ActionLink href={primaryLocation.phoneHref} variant="primary">
              {ctaLabels.phone}
            </ActionLink>
            <ActionLink
              href={primaryLocation.directionsUrl}
              variant="secondary"
              external
            >
              {ctaLabels.directions}
            </ActionLink>
            <ActionLink href={orderOnlineUrl} variant="secondary">
              {ctaLabels.order}
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="scene scene--surface" aria-label="Menu categories">
        <div className="wrap menucard__list">
          {menu.map((cat) => (
            <section key={cat.id} id={cat.id} className="menucard">
              <div className="menucard__head">
                <h2 className="display display--lg">{cat.name}</h2>
                {cat.blurb ? <p className="menucard__blurb">{cat.blurb}</p> : null}
              </div>
              <ul className="menucard__items">
                {cat.items.map((item) => (
                  <li key={`${cat.id}-${item.name}`} className="menucard__item">
                    <span className="menucard__name">{item.name}</span>
                    {item.description ? (
                      <span className="menucard__desc">{item.description}</span>
                    ) : null}
                    {showPrices && item.price ? (
                      <span className="menucard__price num">{item.price}</span>
                    ) : null}
                    {item.note ? (
                      <span className="menucard__note">{item.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="scene" aria-label="Order from Woody's">
        <div className="wrap page-cta">
          <h2 className="display display--xl">Call Woody&rsquo;s</h2>
          <p className="body">
            Prices and daily availability change. The fastest way to check both
            is to call the restaurant on Slauson Avenue.
          </p>
          <p className="page-cta__phone num">
            <a href={primaryLocation.phoneHref}>{primaryLocation.phone}</a>
          </p>
          <div className="page-head__actions">
            <ActionLink href={primaryLocation.phoneHref} variant="primary">
              {ctaLabels.phone}
            </ActionLink>
            <ActionLink href="/visit" variant="secondary">
              Visit Us
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
