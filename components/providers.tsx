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

    const lenis = new Lenis({
      // Same tempo everywhere — phone matches desktop smoothness
      duration: 2.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.55,
      // Touch travels farther per gesture; keep it low so phone feels like desktop
      touchMultiplier: 0.22,
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
