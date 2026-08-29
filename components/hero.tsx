"use client";

import Image from "next/image";
import { site } from "@/content/site";

/**
 * Mobile: portrait-mobile.png (full quality source)
 * Desktop: original portrait.png (pre-new-upload)
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--forma-red)]">
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

      <div className="shell relative z-10 flex min-h-[100svh] flex-col pb-7 pt-[4.25rem] xl:pb-8 xl:pt-24">
        <div className="flex flex-1 flex-col xl:hidden">
          <div className="max-w-[22rem] pt-1">
            <h1 className="display text-[clamp(1.85rem,8.6vw,2.65rem)] leading-[0.96] text-white">
              {site.hero.headline.map((line, i) => (
                <span key={line}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="min-h-[42vh] flex-1" aria-hidden="true" />

          <div>
            <div className="grid grid-cols-5 items-end gap-1">
              {site.brandBar.map((item, index) => (
                <div
                  key={`m-${item.letter}-${index}`}
                  className="flex min-w-0 flex-col items-center gap-2"
                >
                  <span className="caps w-full text-center text-[0.52rem] leading-[1.15] tracking-[0.08em] text-white/45">
                    {item.label}
                  </span>
                  <span className="display text-center text-[clamp(2.4rem,14vw,4.2rem)] leading-[0.82] tracking-[-0.04em] text-white">
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
              <p className="hero-quote max-w-[34rem] text-right text-[clamp(1.15rem,1.7vw,1.55rem)] leading-[1.45] text-white">
                {site.hero.quote}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="btn-white mt-8 !bg-white !text-[#1a0508]"
              >
                {site.hero.cta}
              </a>
            </div>
          </div>

          <div className="mt-auto">
            <div className="grid grid-cols-5 items-end gap-2">
              {site.brandBar.map((item, index) => (
                <div
                  key={`${item.letter}-${item.label}-${index}`}
                  className="flex min-w-0 flex-col items-center gap-2.5"
                >
                  <span className="caps w-full text-center text-[0.62rem] leading-[1.2] tracking-[0.12em] text-white/45 lg:text-[0.68rem]">
                    {item.label}
                  </span>
                  <span className="display text-center text-[clamp(2.6rem,11vw,13rem)] leading-[0.8] tracking-[-0.045em] text-white">
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
