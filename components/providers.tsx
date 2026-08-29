"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import { SiteLock } from "@/components/site-lock";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Width-only: phone Desktop Mode reports a wide viewport → treat as desktop
    const isPhone = window.matchMedia("(max-width: 767.98px)").matches;

    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.55,
      // Phone: light + smooth (much less drag than before)
      syncTouch: isPhone,
      syncTouchLerp: 0.085,
      touchMultiplier: isPhone ? 0.65 : 0.45,
      touchInertiaExponent: isPhone ? 1.7 : 1.7,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <>
      <SiteLock />
      <Nav />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
