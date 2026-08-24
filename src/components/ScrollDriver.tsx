"use client";

import { useEffect } from "react";

/**
 * Publishes scroll position as CSS custom properties, and nothing else.
 *
 * Two outputs:
 *   --ember-p   on <html>: whole-page progress, 0 to 1. Drives the Since-1975
 *               ember rail and the closing underline.
 *   --p         on each [data-progress] element: that element's own progress
 *               through the viewport, 0 to 1. Drives the Scene 4 reveal.
 *
 * It writes custom properties and toggles one class. It never moves, inserts or
 * removes DOM, so the page is identical with this component absent, which is
 * what keeps the no-JavaScript path honest.
 *
 * Under prefers-reduced-motion both values are pinned to 1: every sequence
 * renders complete and still, which is the documented accessibility state
 * rather than an empty frame.
 */
export function ScrollDriver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let nodes: HTMLElement[] = [];

    const collect = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    };

    const settle = () => {
      root.style.setProperty("--ember-p", "1");
      nodes.forEach((el) => el.style.setProperty("--p", "1"));
    };

    const measure = () => {
      frame = 0;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const page = scrollable > 0 ? window.scrollY / scrollable : 1;
      root.style.setProperty("--ember-p", clamp(page).toFixed(4));

      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the element's top reaches the lower third, 1 once its bottom
        // has travelled to the upper third. Gives the sequence a full, unhurried
        // run without ever holding the viewport still.
        const start = vh * 0.85;
        const end = -r.height + vh * 0.35;
        const span = start - end;
        const p = span > 0 ? (start - r.top) / span : 1;
        el.style.setProperty("--p", clamp(p).toFixed(4));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const apply = () => {
      collect();
      if (reduced.matches) {
        settle();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        return;
      }
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    };

    apply();
    reduced.addEventListener("change", apply);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  return null;
}

const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
