import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study";
import { Footer } from "@/components/footer";
import { getProjectBySlug, projects } from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Muhammad Emara`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Muhammad Emara`,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <main>
        <CaseStudy project={project} />
      </main>
      <Footer />
    </>
  );
}
