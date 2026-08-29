"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

let runId = 0;
let lastCompletedPath: string | null = null;

function scrollToTop() {
  const lenis = (
    window as Window & { __lenis?: { scrollTo: (v: number, o?: object) => void } }
  ).__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Full-viewport black curtain (above nav) — slow enough to read.
 * Cover → hold → uncover → reveal content.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const childrenRef = useRef(children);
  const [page, setPage] = useState(children);
  const [covered, setCovered] = useState(true);
  const [visible, setVisible] = useState(false);

  childrenRef.current = children;

  useLayoutEffect(() => {
    if (reduce) {
      lastCompletedPath = pathname;
      setCovered(false);
      setVisible(true);
      setPage(childrenRef.current);
      return;
    }

    if (lastCompletedPath === pathname) {
      setPage(childrenRef.current);
      setCovered(false);
      setVisible(true);
      return;
    }

    const id = ++runId;
    const first = lastCompletedPath === null;

    setVisible(false);
    setCovered(true);

    // Slow cinematic timing
    const swapAt = first ? 80 : 900;
    const openAt = first ? 200 : 1100;
    const showAt = openAt + 1100;

    const t1 = window.setTimeout(() => {
      if (id !== runId) return;
      setPage(childrenRef.current);
      scrollToTop();
    }, swapAt);

    const t2 = window.setTimeout(() => {
      if (id !== runId) return;
      setCovered(false);
    }, openAt);

    const t3 = window.setTimeout(() => {
      if (id !== runId) return;
      setVisible(true);
      lastCompletedPath = pathname;
    }, showAt);

    const safety = window.setTimeout(() => {
      if (id !== runId) return;
      setPage(childrenRef.current);
      setCovered(false);
      setVisible(true);
      lastCompletedPath = pathname;
    }, 4200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(safety);
    };
  }, [pathname, reduce]);

  if (reduce) return <>{children}</>;

  return (
    <div className="relative min-h-[100svh]">
      <div
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
          transition: visible ? "opacity 0.55s ease" : "none",
        }}
      >
        {page}
      </div>

      {/* z above header so black covers the whole viewport */}
      <motion.div
        aria-hidden
        className={`fixed inset-0 z-[200] bg-black ${
          covered ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
        animate={{ y: covered ? "0%" : "-100%" }}
        transition={{ duration: 1.15, ease }}
      />
    </div>
  );
}
