import Link from "next/link";
import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import { ctaLabels, orderOnlineUrl } from "@/data/business";
import { availabilityCaveat, menu, sidesAndDesserts } from "@/data/menu";

/**
 * Scene 5 · The Full Table. Excited by abundance.
 *
 * An index, not a grid of cards. The range is the argument here, so the whole
 * scene is set as a collection with one label schema: every item gets a name
 * and nothing else, which is what makes it read as a menu rather than a pitch.
 *
 * The category selector is plain links to the menu page rather than JavaScript
 * tabs. That keeps it operable with the keyboard, without hover, without
 * JavaScript, and at 375px, all four of which a tab widget puts at risk for no
 * gain on a page this size.
 */
export function Scene5Table() {
  const { sides, desserts } = sidesAndDesserts;

  return (
    <section
      className="scene scene--surface scene--after-pin spread"
      data-scene="5"
      data-sc-act="flow"
      aria-labelledby="scene-5-title"
    >
      <div className="wrap">
        <div className="spread__head">
          <p className="label label--ember">More Than the Meat</p>
          <h2 id="scene-5-title" className="display display--2xl">
            The Full Table
          </h2>
        </div>

        <div className="spread__grid">
          <nav className="spread__index" aria-label="Menu categories" data-sc-in data-sc-stagger="40">
            <ul>
              {menu.map((c) => (
                <li key={c.id}>
                  <Link href={`/menu#${c.id}`} className="spread__cat">
                    <span className="spread__cat-name">{c.name}</span>
                    <span className="spread__cat-count num" aria-hidden="true">
                      {c.items.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="spread__lists" data-sc-in data-sc-stagger="60">
            <div className="spread__list">
              <h3 className="label spread__list-title">Sides</h3>
              <ul className="spread__items">
                {sides.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>

            <div className="spread__list">
              <h3 className="label spread__list-title">Desserts</h3>
              <ul className="spread__items">
                {desserts.map((d) => (
                  <li key={d.name}>
                    {d.name}
                    {d.note ? (
                      <span className="spread__note"> (ask in store)</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="spread__plates">
            <Plate
              id="combination-plate-wide"
              ratio="wide"
              scale="sm"
              sizes="(max-width: 900px) 50vw, 24vw"
              className="spread__plate"
            />
            <Plate
              id="mac-and-cheese"
              ratio="square"
              scale="sm"
              sizes="(max-width: 900px) 50vw, 18vw"
              className="spread__plate spread__plate--offset"
            />
            <Plate
              id="peach-cobbler"
              ratio="wide"
              scale="sm"
              sizes="(max-width: 900px) 50vw, 20vw"
              className="spread__plate"
            />
          </div>
        </div>

        <div className="spread__foot">
          <div className="spread__actions">
            <ActionLink href="/menu" variant="primary">
              {ctaLabels.fullMenu}
            </ActionLink>
            <ActionLink href={orderOnlineUrl} variant="secondary">
              {ctaLabels.order}
            </ActionLink>
          </div>
          <p className="spread__caveat">{availabilityCaveat}</p>
        </div>
      </div>
    </section>
  );
}
