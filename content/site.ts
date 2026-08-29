export const site = {
  name: "Muhammad Emara",
  brand: "EMARA",
  title: "Muhammad Emara — UI/UX Designer",
  description:
    "UI/UX designer based in Cairo. Product interfaces, design systems, and mobile experiences.",
  email: "hello@muhammademara.com",
  location: "Cairo, EG",
  socials: {
    linkedin: "",
    behance: "",
    github: "",
  },
  nav: [
    { label: "PROJECTS", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACTS", href: "#contact" },
  ],
  hero: {
    headline: ["IF IT'S NOT", "INTUITIVE,", "IT'S NOT DONE."],
    quote:
      "There's no such thing as perfect design just designers who stopped trying to get closer",
    cta: "GET IN TOUCH",
  },
  brandBar: [
    { letter: "E", label: "EXPERIENCE" },
    { letter: "M", label: "MOBILE" },
    { letter: "A", label: "ARCHITECTURE" },
    { letter: "R", label: "RESEARCH" },
    { letter: "A", label: "AESTHETICS" },
  ],
  work: {
    label: "PROJECTS",
    heading: "SELECTED WORK",
  },
  about: {
    label: "ABOUT",
    heading: "DESIGN IS THINKING MADE VISIBLE.",
    role: "UI/UX DESIGNER",
    based: "CAIRO, EG",
    beats: [
      {
        index: "01",
        title: "PRACTICE",
        body: "I shape interfaces for products that have to work in the real world — messy data, Arabic and English, people who will not read a tutorial.",
      },
      {
        index: "02",
        title: "BACKGROUND",
        body: "Materials and Nanoscience at Ain Shams (class of 2028). USAID Egyptian Pioneers Scholarship at AUC. Led NYAS Junior Academy teams on sustainability, health, and technology.",
      },
      {
        index: "03",
        title: "NOW",
        body: "Flagship product work is Spika — a personal finance app live on Google Play.",
      },
    ],
  },
  services: {
    label: "SERVICES",
    heading: "WHAT I DO",
    items: [
      {
        title: "PRODUCT UI",
        description: "Interfaces that carry a product from first launch to daily use.",
      },
      {
        title: "UX FLOWS",
        description: "Clear paths through complex tasks without hand-holding.",
      },
      {
        title: "DESIGN SYSTEMS",
        description: "Repeatable components, tokens, and patterns that scale.",
      },
      {
        title: "MOBILE INTERFACES",
        description: "Touch-first layouts built for real devices and real thumbs.",
      },
      {
        title: "PRODUCT IDENTITY",
        description: "Visual language that reads on screen and in the store.",
      },
    ],
  },
  contact: {
    heading: "LET'S CREATE SOMETHING REMARKABLE TOGETHER.",
    cta: "GET IN TOUCH",
    email: "hello@muhammademara.com",
  },
  footer: {
    copyright: "© 2026 MUHAMMAD EMARA",
    location: "CAIRO",
  },
} as const;
