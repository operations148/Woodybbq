"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActionLink } from "@/components/ui/ActionLink";
import { brand, ctaLabels, primaryLocation } from "@/data/business";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/our-story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/visit#reviews" },
  { label: "Visit", href: "/visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* The bar earns a ground once the page has moved off the hero. */
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The panel closes when a link inside it is activated, rather than by
     reacting to the pathname. Watching the route would mean calling setState
     synchronously from an effect, which cascades an extra render. */
  const close = () => setOpen(false);

  /* Lock the page, trap focus, restore it on close. */
  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const first = panelRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  return (
    <header className={`bar ${lifted ? "is-lifted" : ""}`}>
      <div className="bar__inner">
        <Link href="/" className="bar__mark" aria-label={`${brand.displayName}, home`}>
          <span className="bar__mark-name">Woody&rsquo;s</span>
          <span className="bar__mark-sub" aria-hidden="true">
            Bar-B-Que
          </span>
        </Link>

        <nav className="bar__nav" aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="bar__link"
                  aria-current={pathname === l.href ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bar__actions">
          <ActionLink href="/menu" variant="primary" className="bar__cta">
            {ctaLabels.menu}
          </ActionLink>

          <button
            ref={toggleRef}
            type="button"
            className="bar__burger"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
            <span className={`burger ${open ? "is-open" : ""}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {/* Rendered always so it is in the DOM for the toggle to control; the
          panel is inert and hidden until opened. */}
      <div
        id="site-menu"
        ref={panelRef}
        className={`panel ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Site">
          <ul className="panel__list">
            <li>
              <Link href="/" className="panel__link" onClick={close}>
                Home
              </Link>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="panel__link" onClick={close}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="panel__actions" onClick={close}>
          <ActionLink href="/menu" variant="primary">
            {ctaLabels.menu}
          </ActionLink>
          <ActionLink href={primaryLocation.phoneHref} variant="secondary">
            {ctaLabels.phone}
          </ActionLink>
          <ActionLink href={primaryLocation.directionsUrl} variant="secondary">
            {ctaLabels.directions}
          </ActionLink>
        </div>
      </div>
    </header>
  );
}
