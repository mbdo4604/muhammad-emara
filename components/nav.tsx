"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const expo = [0.87, 0, 0.13, 1] as const;
const silk = [0.16, 1, 0.3, 1] as const;

const panel = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.96 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: expo,
      when: "beforeChildren",
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: expo,
      when: "afterChildren",
    },
  },
};

const navList = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.28 },
  },
  exit: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
};

const navItem = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: silk },
  },
  exit: {
    opacity: 0,
    y: -28,
    transition: { duration: 0.35, ease: expo },
  },
};

const footerBlock = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: silk, delay: 0.55 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.28, ease: expo },
  },
};

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openRef = useRef(false);
  const isHome = pathname === "/";
  // Solid header on inner pages; home only after scroll; never while menu is open
  const showHeaderBg = !open && (!isHome || scrolled);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const threshold = () => Math.min(window.innerHeight * 0.72, 640);

    const update = (y: number) => {
      setScrolled(y > threshold());
    };

    const onScroll = () => update(window.scrollY || document.documentElement.scrollTop);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const lenis = (
      window as Window & {
        __lenis?: { on: (e: string, cb: (s: { scroll: number }) => void) => void; off: (e: string, cb: (s: { scroll: number }) => void) => void };
      }
    ).__lenis;

    const onLenis = (state: { scroll: number }) => update(state.scroll);
    lenis?.on?.("scroll", onLenis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off?.("scroll", onLenis);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  // Browser back / Android gesture back closes the menu instead of leaving the page
  useEffect(() => {
    const onPopState = () => {
      if (openRef.current) {
        setOpen(false);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => {
    if (openRef.current) return;
    history.pushState({ emaraMenu: true }, "");
    setOpen(true);
  };

  const closeMenu = () => {
    if (!openRef.current) return;
    setOpen(false);
    if (history.state && (history.state as { emaraMenu?: boolean }).emaraMenu) {
      history.back();
    }
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else openMenu();
  };

  const goTo = (href: string) => {
    closeMenu();
    if (href.startsWith("#")) {
      window.setTimeout(() => {
        const el = document.querySelector(href);
        if (!el) return;
        const lenis = (window as Window & { __lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).__lenis;
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 2.8 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 320);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,backdrop-filter] duration-300 ease-out ${
          showHeaderBg
            ? "bg-[var(--forma-red)]/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="shell relative z-[130] flex h-[3.75rem] items-center justify-between md:h-[4.5rem]">
          <Link
            href="/"
            className="display text-[0.95rem] tracking-[0.06em] md:text-[1.05rem]"
            onClick={closeMenu}
          >
            {site.brand}
          </Link>

          <nav className="hidden items-center gap-7 xl:flex xl:gap-9">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="caps text-[0.62rem] tracking-[0.18em] text-white transition-opacity hover:opacity-65"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-[130] flex h-10 w-10 items-center justify-center xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={toggleMenu}
          >
            <span className="relative block h-4 w-[22px]" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-[22px] origin-center bg-white"
                animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.45, ease: silk }}
              />
              <motion.span
                className="absolute left-0 top-[7px] block h-[1.5px] w-[22px] bg-white"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25, ease: silk }}
              />
              <motion.span
                className="absolute left-0 top-[14px] block h-[1.5px] w-[22px] origin-center bg-white"
                animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.45, ease: silk }}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[110] flex flex-col bg-[var(--forma-red)] px-5 pb-6 pt-[4.25rem] xl:hidden"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
              variants={navList}
            >
              {site.nav.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="menu-link"
                  variants={navItem}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div className="mt-auto space-y-5 text-center" variants={footerBlock}>
              <div className="flex items-center justify-center gap-5">
                {["Fb", "Ig", "Be", "Yt"].map((label) => (
                  <span
                    key={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 text-[0.58rem] uppercase tracking-wider text-white/80"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <p className="text-[0.85rem] text-white/75">
                Let&apos;s create something remarkable together.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="btn-white btn-white-full !bg-white !text-[#1a0508]"
                onClick={closeMenu}
              >
                {site.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
