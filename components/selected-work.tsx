"use client";

import Image from "next/image";
import Link from "next/link";
import { ProjectWordmark } from "@/components/project-wordmark";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function SelectedWork() {
  return (
    <section id="work" className="section-block border-t border-line py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="caps text-[0.62rem] tracking-[0.16em] text-white/65">
            {site.work.label}
          </p>
          <h2 className="display mt-3 text-[clamp(1.8rem,5.5vw,3.6rem)]">
            {site.work.heading}
          </h2>
        </Reveal>

        <div className="mt-10">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <Link href={`/work/${project.slug}`} className="work-card group">
                <div className="grid gap-4 md:grid-cols-[4.5rem_1fr_16rem] md:items-center md:gap-8">
                  <span className="caps text-[0.65rem] tracking-[0.14em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden border border-line md:hidden">
                      <Image
                        src={project.cover}
                        alt=""
                        fill
                        draggable={false}
                        className="object-cover"
                        sizes="92vw"
                      />
                    </div>

                    {project.wordmark ? (
                      <h3 className="display text-[1.35rem] leading-none md:text-[1.9rem]">
                        <ProjectWordmark src={project.wordmark} title={project.title} />
                      </h3>
                    ) : (
                      <h3 className="display text-[1.35rem] md:text-[1.9rem]">
                        {project.title}
                      </h3>
                    )}

                    <p className="caps mt-2 text-[0.58rem] tracking-[0.14em] text-white/60">
                      {project.tags.join(" · ")} · {project.year}
                      {project.status === "concept"
                        ? " · CONCEPT"
                        : project.storeUrl
                          ? " · LIVE ON GOOGLE PLAY"
                          : " · SHIPPED"}
                    </p>
                  </div>

                  <div className="relative hidden aspect-[16/10] overflow-hidden border border-line md:block">
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      draggable={false}
                      className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                      sizes="16rem"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
