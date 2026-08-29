import Image from "next/image";
import Link from "next/link";
import { ProjectScreens } from "@/components/project-screens";
import { ProjectWordmark } from "@/components/project-wordmark";
import type { Project } from "@/content/projects";
import { getAdjacentProjects } from "@/content/projects";

type CaseStudyProps = {
  project: Project;
};

function ProjectTitle({ project }: { project: Project }) {
  if (project.wordmark) {
    return (
      <h1 className="display mt-3 text-[clamp(2.4rem,8vw,4.5rem)] leading-none">
        <ProjectWordmark src={project.wordmark} title={project.title} priority />
      </h1>
    );
  }

  return (
    <h1 className="display mt-3 text-[clamp(2.4rem,8vw,4.5rem)]">{project.title}</h1>
  );
}

export function CaseStudy({ project }: CaseStudyProps) {
  const { next } = getAdjacentProjects(project.slug);
  const statusLabel = project.status === "shipped" ? "LIVE ON GOOGLE PLAY" : "CONCEPT";

  return (
    <article className="bg-[var(--forma-red)] text-white">
      {/* Compact header */}
      <section className="border-b border-line pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="shell">
          <Link
            href="/#work"
            className="caps text-[0.62rem] tracking-[0.14em] text-white/65 transition-opacity hover:opacity-80"
          >
            ← BACK TO PROJECTS
          </Link>

          <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="min-w-0 flex-1">
              <p className="caps text-[0.62rem] tracking-[0.14em] text-white/55">
                {statusLabel} · {project.year}
              </p>
              <ProjectTitle project={project} />
              <p className="caps mt-3 text-[0.58rem] tracking-[0.12em] text-white/65">
                {project.tags.join(" · ")} · {project.role.join(" · ")}
              </p>
            </div>

            {project.storeUrl ? (
              <a
                href={project.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white shrink-0 self-start md:self-end"
              >
                VIEW ON GOOGLE PLAY
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="border-b border-line py-8 md:py-12">
        <div className="shell">
          {project.video ? (
            <>
              {/* Desktop: video (larger) + copy side by side */}
              <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[1.55fr_1fr] lg:gap-12 xl:gap-16">
                <div className="overflow-hidden bg-black">
                  <div className="relative aspect-video">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={project.cover}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">
                    PROMO FILM
                  </p>
                  <p className="display mt-4 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.2]">
                    See the product in motion
                  </p>
                  <p className="mt-4 text-[0.95rem] leading-7 text-white/75">
                    {project.videoNote ?? project.summary}
                  </p>
                </div>
              </div>

              {/* Mobile / tablet: stacked */}
              <div className="lg:hidden">
                <div className="overflow-hidden bg-black">
                  <div className="relative aspect-video">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={project.cover}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
                {project.videoNote ? (
                  <p className="mt-4 text-[0.9rem] leading-7 text-white/70">
                    {project.videoNote}
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <div className="relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden bg-[var(--forma-red-deep)]">
              <Image
                src={project.cover}
                alt={`${project.title} cover`}
                fill
                className="object-cover"
                priority
                draggable={false}
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
          )}
        </div>
      </section>

      <ProjectScreens title={project.title} gallery={project.gallery} />

      {/* Symmetric content block */}
      <section className="py-10 md:py-14">
        <div className="shell grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">OVERVIEW</p>
            <p className="mt-3 text-[0.95rem] leading-7 text-white/80 md:text-base md:leading-8">
              {project.summary}
            </p>
          </div>
          <div>
            <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">ROLE</p>
            <p className="display mt-3 text-[1.25rem] md:text-[1.5rem]">
              {project.role.join(" · ")}
            </p>
            <p className="caps mt-8 text-[0.58rem] tracking-[0.14em] text-white/50">RESULT</p>
            <p className="mt-3 text-[0.95rem] leading-7 text-white/80 md:text-base">
              {project.result}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-10 md:py-14">
        <div className="shell">
          <p className="caps text-[0.58rem] tracking-[0.14em] text-white/50">
            WHAT I DESIGNED
          </p>
          <ul className="mt-6 grid gap-0 sm:grid-cols-2">
            {project.highlights.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 border-t border-line py-5 first:border-t sm:border-t sm:px-0 sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="caps shrink-0 text-[0.58rem] tracking-[0.14em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.92rem] leading-6 text-white/85">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {next ? (
        <section className="border-t border-line py-10 md:py-12">
          <div className="shell">
            <Link
              href={`/work/${next.slug}`}
              className="inline-flex flex-col gap-2 transition-opacity hover:opacity-75"
            >
              <span className="caps text-[0.58rem] tracking-[0.14em] text-white/50">
                NEXT PROJECT
              </span>
              <span className="display text-2xl md:text-3xl">{next.title} →</span>
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}
