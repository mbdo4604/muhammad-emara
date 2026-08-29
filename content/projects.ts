export type ProjectStatus = "shipped" | "concept";

export type Project = {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  status: ProjectStatus;
  featured: boolean;
  cover: string;
  role: string[];
  /** Short plain overview for visitors */
  summary: string;
  /** Simple bullets — what you designed / delivered */
  highlights: string[];
  /** One-line result visitors care about */
  result: string;
  gallery: string[];
  video?: string;
  /** Short note shown beside promo video on desktop */
  videoNote?: string;
  /** Optional logo wordmark instead of text title */
  wordmark?: string;
  /** Live store / product link */
  storeUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "spika",
    title: "Spika",
    year: "2026",
    tags: ["Product Design", "Mobile", "Fintech"],
    status: "shipped",
    featured: true,
    cover: "/images/projects/spika/cover.jpg",
    wordmark: "/images/projects/spika/wordmark.png",
    storeUrl: "https://play.google.com/store/apps/details?id=com.spika.spika",
    role: ["Product Manager"],
    summary:
      "A personal finance app for Egypt. Track money, accounts, and goals in Arabic or English — clear screens, less friction, no bank login required to start.",
    videoNote:
      "A short promo film covering the core product: balance overview, daily spending, voice logging, and the moments that make Spika feel alive.",
    highlights: [
      "Home dashboard with balance, accounts, and quick actions",
      "Daily spending calendar and activity history",
      "Voice expense logging (Spika Now) in Arabic & English",
      "Insights, savings goals, and Word of the Week",
    ],
    result: "Live on Google Play.",
    video: "/videos/spika-promo.mp4",
    gallery: [
      "/images/projects/spika/01.png",
      "/images/projects/spika/02.png",
      "/images/projects/spika/03.png",
    ],
  },
  {
    slug: "nour",
    title: "Nour",
    year: "2025",
    tags: ["Concept", "Fintech"],
    status: "concept",
    featured: false,
    cover: "/images/projects/nour.svg",
    role: ["UI/UX Design"],
    summary:
      "A calm savings companion for people who track money informally and need a gentle start — not a spreadsheet.",
    highlights: [
      "Simple goal setup and visual progress",
      "Arabic-first tone and weekly check-ins",
      "Round-up style saving without bank sync on day one",
    ],
    result: "Concept exploration — screens coming soon.",
    gallery: [
      "/images/projects/nour-frame-1.svg",
      "/images/projects/nour-frame-2.svg",
      "/images/projects/nour-frame-3.svg",
    ],
  },
  {
    slug: "lab-notes",
    title: "Lab Notes",
    year: "2025",
    tags: ["Concept", "Education"],
    status: "concept",
    featured: false,
    cover: "/images/projects/lab-notes.svg",
    role: ["UI/UX Design"],
    summary:
      "A light research workspace for science students — capture experiments, tags, and summaries without becoming a full LMS.",
    highlights: [
      "Experiment cards and quick capture",
      "Tag-based retrieval",
      "Export-friendly summaries for group work",
    ],
    result: "Concept exploration — screens coming soon.",
    gallery: [
      "/images/projects/lab-notes-frame-1.svg",
      "/images/projects/lab-notes-frame-2.svg",
      "/images/projects/lab-notes-frame-3.svg",
    ],
  },
  {
    slug: "afterlight",
    title: "Afterlight",
    year: "2024",
    tags: ["Concept", "Brand + UI"],
    status: "concept",
    featured: false,
    cover: "/images/projects/afterlight.svg",
    role: ["UI/UX Design", "Brand"],
    summary:
      "A cinematic identity and web UI for an independent film collective — drama with readable programs and ticket paths.",
    highlights: [
      "Dark editorial visual system",
      "Modular layouts for screenings and archives",
      "High-contrast type and stills",
    ],
    result: "Brand and web UI concept.",
    gallery: [
      "/images/projects/afterlight-frame-1.svg",
      "/images/projects/afterlight-frame-2.svg",
      "/images/projects/afterlight-frame-3.svg",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };

  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
