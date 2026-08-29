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

    const isPhone =
      window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)")
        .matches;

    const lenis = new Lenis({
      duration: 2.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.55,
      // Phone: smooth + moderately heavy (not as locked as before)
      syncTouch: isPhone,
      syncTouchLerp: 0.055,
      touchMultiplier: isPhone ? 0.22 : 0.45,
      touchInertiaExponent: isPhone ? 2.2 : 1.7,
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
