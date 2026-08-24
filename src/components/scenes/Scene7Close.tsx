import Link from "next/link";
import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import {
  brand,
  ctaLabels,
  instagramHandle,
  navigation,
  orderOnlineUrl,
  primaryLocation,
  social,
} from "@/data/business";

/**
 * Scene 7 · Bring Home the Smoke. Ready to act. The close, and the footer.
 *
 * Part three of the signature move, and its resolution: the ember line that has
 * been drawing itself down the left margin for the whole page arrives here as
 * the underline beneath the wordmark. It reads --ember-p, whole-page progress,
 * so it completes exactly as the reader reaches the end. The stroke signs the
 * name.
 *
 * The footer is inside this section on purpose. An eighth scene that is just a
 * footer would let the page trail off, and the close is supposed to resolve and
 * hold. Nothing here is invented: no newsletter, no unverified social account,
 * no legal links pointing at pages that do not exist.
 */
export function Scene7Close() {
  return (
    <section
      className="scene close"
      data-scene="7"
      data-sc-act="flow"
      aria-labelledby="scene-7-title"
    >
      <div className="close__plate" aria-hidden="true">
        {/* Decorative band. The headline directly below already says
            "Bring Home the Smoke", so the plate does not repeat it. */}
        <Plate id="closing-plate" ratio="hero" scale="lg" sizes="100vw" hideLabel />
      </div>

      <div className="wrap close__inner" data-sc-spotlight>
        <div className="close__lead" data-sc-in data-sc-stagger="60">
          <h2 id="scene-7-title" className="display display--3xl">
            Bring Home the Smoke
          </h2>
          <p className="lede close__lede">{brand.cookingLine}</p>

          <div className="close__actions">
            <ActionLink href="/menu" variant="primary">
              {ctaLabels.menu}
            </ActionLink>
            <ActionLink href={primaryLocation.phoneHref} variant="secondary">
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

        {/* The signature resolves. */}
        <div className="sign">
          <p className="sign__mark">
            Woody&rsquo;s
            <span className="sign__underline" aria-hidden="true" />
          </p>
          <p className="sign__sub label">Bar-B-Que</p>
        </div>

        <footer className="foot">
          <div className="foot__grid">
            <div className="foot__about">
              <p className="body foot__desc">{brand.storyLine}</p>
              <address className="foot__address">
                <span>{primaryLocation.address.street}</span>
                <span>
                  {primaryLocation.address.city},{" "}
                  {primaryLocation.address.state}{" "}
                  <span className="num">
                    {primaryLocation.address.postalCode}
                  </span>
                </span>
                <a href={primaryLocation.phoneHref} className="num">
                  {primaryLocation.phone}
                </a>
              </address>
            </div>

            <nav className="foot__nav" aria-label="Footer">
              <h2 className="label foot__heading">Explore</h2>
              <ul>
                {navigation.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href as string}>{n.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/visit#reviews">Reviews</Link>
                </li>
              </ul>
            </nav>

            <div className="foot__contact">
              <h2 className="label foot__heading">Find Us</h2>
              <ul>
                <li>
                  <a
                    href={primaryLocation.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaLabels.directions}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={primaryLocation.googleListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaLabels.hours}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label} {instagramHandle}
                      <span className="visually-hidden">
                        {" "}
                        (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="foot__legal">
            <span className="num">
              &copy; {new Date().getFullYear()} {brand.displayName}
            </span>
            <span aria-hidden="true"> · </span>
            <span>Los Angeles, California</span>
          </p>
        </footer>
      </div>
    </section>
  );
}
