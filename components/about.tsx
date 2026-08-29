"use client";

import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="section-alt border-t border-line py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
            <div>
              <p className="caps text-[0.62rem] tracking-[0.16em] text-white/65">
                {site.about.label}
              </p>
              <h2 className="display mt-4 max-w-3xl text-[clamp(1.85rem,4.8vw,3.2rem)]">
                {site.about.heading}
              </h2>
            </div>
            <div className="md:text-right">
              <p className="display text-[1.15rem] tracking-[0.04em] md:text-[1.35rem]">
                {site.name.toUpperCase()}
              </p>
              <p className="caps mt-2 text-[0.58rem] tracking-[0.14em] text-white/65">
                {site.about.role} · {site.about.based}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-2 divide-y divide-line">
          {site.about.beats.map((beat, index) => (
            <Reveal key={beat.index} delay={0.05 + index * 0.07}>
              <div className="grid gap-4 py-8 md:grid-cols-[5rem_10rem_1fr] md:gap-8 md:py-10">
                <span className="caps text-[0.65rem] tracking-[0.14em] text-white/45">
                  {beat.index}
                </span>
                <h3 className="display text-[1.05rem] md:text-[1.2rem]">{beat.title}</h3>
                <p className="max-w-2xl text-[0.95rem] leading-7 text-white/75 md:text-base md:leading-8">
                  {beat.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
