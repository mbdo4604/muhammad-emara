"use client";

import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[var(--forma-red)] py-7">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="caps text-[0.62rem] tracking-[0.14em] text-white/65">
          {site.footer.copyright} · {site.footer.location}
        </p>
        <button
          type="button"
          className="caps text-left text-[0.62rem] tracking-[0.14em] text-white/80 transition-opacity hover:opacity-70 sm:text-right"
          onClick={() => {
            const lenis = (window as Window & { __lenis?: { scrollTo: (v: number, o?: object) => void } }).__lenis;
            if (lenis) lenis.scrollTo(0, { immediate: false, duration: 2.1 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
