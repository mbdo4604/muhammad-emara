"use client";

import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function Capabilities() {
  return (
    <section id="services" className="section-block border-t border-line py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="caps text-[0.62rem] tracking-[0.16em] text-white/65">
            {site.services.label}
          </p>
          <h2 className="display mt-3 text-[clamp(1.8rem,5vw,3.2rem)]">
            {site.services.heading}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {site.services.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="grid gap-3 py-7 md:grid-cols-[4.5rem_1fr_1.2fr] md:gap-8 md:py-8">
                <span className="caps text-[0.65rem] tracking-[0.14em] text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display text-[1.15rem] md:text-[1.45rem]">{item.title}</h3>
                <p className="caps text-[0.62rem] leading-5 tracking-[0.1em] text-white/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
