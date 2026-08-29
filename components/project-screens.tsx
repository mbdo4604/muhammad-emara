"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Desktop: three screens side-by-side at a smart height (no sticky).
 * Mobile: sticky vertical scrub that slides the strip.
 */
export function ProjectScreens({
  title,
  gallery,
}: {
  title: string;
  gallery: string[];
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="border-b border-line py-10 md:py-14">
        <div className="shell">
          <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">SCREENS</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-5 lg:gap-6">
            {gallery.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${title} screen ${index + 1}`}
                width={941}
                height={1672}
                draggable={false}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Desktop — static trio, no sticky */}
      <section className="hidden border-b border-line py-14 md:block lg:py-16">
        <div className="shell">
          <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">SCREENS</p>
          <div className="mx-auto mt-8 grid max-w-[58rem] grid-cols-3 gap-4 lg:max-w-[68rem] lg:gap-6 xl:max-w-[76rem] xl:gap-7">
            {gallery.map((image, index) => (
              <div key={image} className="min-w-0">
                <Image
                  src={image}
                  alt={`${title} screen ${index + 1}`}
                  width={941}
                  height={1672}
                  draggable={false}
                  className="h-auto w-full"
                  sizes="(min-width: 1280px) 380px, 30vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile — sticky strip */}
      <MobileScreens title={title} gallery={gallery} />
    </>
  );
}

function MobileScreens({
  title,
  gallery,
}: {
  title: string;
  gallery: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [maxShift, setMaxShift] = useState(0);
  const count = gallery.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, maxShift]);
  const progressPct = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const progressWidth = useMotionTemplate`${progressPct}%`;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const overflow = track.scrollWidth - window.innerWidth;
      setMaxShift(overflow > 0 ? -overflow : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 300);
    const t2 = window.setTimeout(measure, 1000);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [gallery]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(count - 1, Math.max(0, Math.round(v * Math.max(count - 1, 1))));
    setActive(i);
  });

  return (
    <section
      ref={containerRef}
      className="relative border-b border-line md:hidden"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-[var(--forma-red)]">
        <div className="shell mb-5 flex items-end justify-between pt-[4.25rem]">
          <div>
            <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">SCREENS</p>
            <p className="caps mt-2 text-[0.58rem] tracking-[0.14em] text-white/70">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>
          <p className="caps text-[0.55rem] tracking-[0.14em] text-white/40">SCROLL</p>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-start gap-4 pl-[max(1rem,(100vw-min(85vw,22rem))/2)] pr-8 will-change-transform"
          >
            {gallery.map((image, index) => (
              <div key={image} className="w-[min(85vw,22rem)] shrink-0">
                <Image
                  src={image}
                  alt={`${title} screen ${index + 1}`}
                  width={941}
                  height={1672}
                  draggable={false}
                  className="h-auto w-full"
                  sizes="85vw"
                  priority={index === 0}
                  onLoadingComplete={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    const overflow = track.scrollWidth - window.innerWidth;
                    setMaxShift(overflow > 0 ? -overflow : 0);
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="shell mt-6">
          <div className="h-px w-full bg-white/15">
            <motion.div className="h-px bg-white" style={{ width: progressWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}
