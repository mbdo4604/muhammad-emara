"use client";

import Image from "next/image";
import { site } from "@/content/site";

/**
 * Mobile: portrait-mobile.png (full quality source)
 * Desktop: original portrait.png (pre-new-upload)
 */
export function Hero() {
  return (
    <section className="relative h-dvh max-h-dvh overflow-hidden bg-[var(--forma-red)] xl:h-auto xl:max-h-none xl:min-h-svh">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/portrait-mobile.png"
          alt="Muhammad Emara"
          fill
          priority
          quality={100}
          unoptimized
          draggable={false}
          sizes="(max-width: 1279px) 100vw, 0px"
          className="object-cover object-[center_28%] xl:hidden"
        />
        <Image
          src="/images/portrait.png"
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          draggable={false}
          sizes="(min-width: 1280px) 100vw, 0px"
          className="hidden object-cover object-[78%_18%] xl:block"
          aria-hidden
        />
      </div>

      <div className="shell relative z-10 flex h-full min-h-0 flex-col pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[4.25rem] xl:min-h-[100svh] xl:pb-8 xl:pt-24">
        <div className="flex min-h-0 flex-1 flex-col xl:hidden">
          <div className="max-w-[22rem] shrink-0 pt-1">
            <h1 className="display text-[clamp(1.55rem,6.5vw,2.4rem)] leading-[0.96] text-white">
              {site.hero.headline.map((line, i) => (
                <span key={line}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* Grows/shrinks with phone height */}
          <div className="min-h-0 flex-1" aria-hidden="true" />

          {/* Mobile EMARA — tight even spacing (same as M–A), no overlap */}
          <div className="flex w-full shrink-0 justify-center pb-1">
            <div className="flex items-end">
              {site.brandBar.map((item, index) => (
                <div
                  key={`m-${item.letter}-${index}`}
                  className="relative flex flex-col items-center"
                >
                  <span className="caps absolute bottom-[100%] left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap text-[0.42rem] leading-[1.1] tracking-[0.05em] text-white/55">
                    {item.label}
                  </span>
                  <span className="brand-mark brand-mark-mobile inline-block text-[clamp(2.6rem,12svh,4.8rem)] leading-[0.8] text-white">
                    {item.letter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-h-0 flex-1 flex-col xl:flex">
          <div className="grid flex-1 grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-center gap-10">
            <div className="max-w-[30rem]">
              <h1 className="display text-[clamp(1.85rem,3.1vw,3.2rem)] leading-[0.98] text-white">
                {site.hero.headline.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col items-end justify-center pt-16">
              <p className="hero-quote max-w-[28rem] text-right text-[clamp(1.15rem,1.7vw,1.55rem)] leading-[1.35] text-white">
                {site.hero.quote.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="btn-white mt-8 !bg-white !text-[#1a0508]"
              >
                {site.hero.cta}
              </a>
            </div>
          </div>

          <div className="mt-auto flex justify-center pb-1">
            <div className="flex items-end">
              {site.brandBar.map((item, index) => (
                <div
                  key={`${item.letter}-${item.label}-${index}`}
                  className="relative flex flex-col items-center"
                >
                  <span className="caps absolute bottom-[100%] left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap text-[0.78rem] leading-[1.2] tracking-[0.12em] text-white/65 lg:text-[0.85rem]">
                    {item.label}
                  </span>
                  <span className="brand-mark brand-mark-hero inline-block px-[0.02em] text-[clamp(3rem,10.5vw,12rem)] leading-[0.78] tracking-[-0.09em] text-white">
                    {item.letter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
