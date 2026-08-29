"use client";

import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="section-alt border-t border-line py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <h2 className="display max-w-4xl text-[clamp(1.7rem,5.5vw,3.4rem)]">
            {site.contact.heading}
          </h2>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={`mailto:${site.email}`} className="btn-white">
              {site.contact.cta}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="caps text-[0.68rem] tracking-[0.12em] text-white/80"
            >
              {site.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
