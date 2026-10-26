export const profile = {
  name: "Gabriel Paolo Baltazar",
  shortName: "Gabriel Paolo",
  roles: ["Web Developer", "WordPress Developer"],
  email: "gpaolobaltazar@gmail.com",
  phone: "+63 976 573 7246",
  location: "Pampanga, Philippines",
  availability: "Available for new work",
  photo: "/gabriel-paolo-baltazar.jpg",
  links: {
    github: "https://github.com/PaoloBaltazar",
    linkedin: "https://www.linkedin.com/in/paolo-baltazar-b4733218b/",
    automationPortfolio: "https://gabriel-paolo-portfolio.vercel.app/",
    autocare: "https://gp-autocare-landing-page.vercel.app/",
  },
  resumes: {
    webDev: "/Gabriel-Paolo-Baltazar-Web-Developer-Resume.pdf",
  },
} as const;

/* ------------------------------------------------------------------
   Two practices, stated separately. Nothing here frames automation as
   a service to the web work, or vice versa — they are distinct offers.
   ------------------------------------------------------------------ */
export type DisciplineId = "web" | "automation";

type Discipline = {
  id: DisciplineId;
  index: string;
  tier: string;
  primary: boolean;
  name: string;
  role: string;
  claim: string;
  body: string;
  keywords: string[];
  /** Only the primary practice publishes a résumé. */
  resume?: string;
  /** The secondary practice links out to its own portfolio instead. */
  portfolio?: string;
};

export const disciplines: Discipline[] = [
  {
    id: "web",
    index: "01",
    tier: "Primary practice",
    primary: true,
    name: "Web Development",
    role: "Web Developer",
    claim: "Responsive websites, built around your brand.",
    body: "I build and customize websites with WordPress, Elementor, WooCommerce, HTML, CSS, and JavaScript. From page layouts and storefronts to content updates and quality checks, I focus on websites that look consistent and work well across devices.",
    keywords: [
      "WordPress & Elementor",
      "WooCommerce",
      "HTML / CSS / JavaScript",
      "Responsive design",
      "Content management",
      "Website QA",
    ],
    resume: profile.resumes.webDev,
  },
  {
    id: "automation",
    index: "02",
    tier: "Secondary practice",
    primary: false,
    name: "AI Automation",
    role: "AI Automation Specialist",
    claim: "Systems that run on their own.",
    body: "A separate, smaller line of work: CRM, lead, and AI workflows built in self-hosted n8n, GoHighLevel, Make, and Zapier.",
    keywords: ["n8n", "GoHighLevel", "Make · Zapier", "LLM agents"],
    portfolio: profile.links.automationPortfolio,
  },
];

export const heroTicker = [
  "WORDPRESS · ELEMENTOR · WOOCOMMERCE",
  "HTML · CSS · JAVASCRIPT",
  "ALSO: AI AUTOMATION, SEPARATELY",
] as const;

export const techMarquee = [
  "WordPress",
  "Elementor",
  "WooCommerce",
  "WPBakery",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Figma",
  "Webflow",
  "React",
  "Next.js",
  "Playwright",
] as const;

/* ---------------- About: pinned layered scroll ---------------- */
export type Chapter = {
  index: string;
  label: string;
  title: string;
  body: string;
  /** Stack of labelled planes rendered as the isometric layer diagram. */
  planes: string[];
};

export const chapters: Chapter[] = [
  {
    index: "01",
    label: "The foundation",
    title: "A foundation in Computer Science.",
    body: "A BS in Computer Science from Holy Angel University as a consistent honor student, with coursework in data structures, web development, cybersecurity, and machine learning. That foundation informs how I build, troubleshoot, and improve websites.",
    planes: ["Data structures", "Web development", "Cybersecurity", "Machine learning"],
  },
  {
    index: "02",
    label: "Web development",
    title: "Careful updates. Consistent websites.",
    body: "At Luxury Presence, I updated real estate websites on a proprietary CMS, edited layouts with HTML, CSS, JavaScript, and JSON, and checked content across browsers and devices. Every update followed client requirements, brand guidelines, and deadlines.",
    planes: ["Content accuracy", "Page layouts", "Brand consistency", "Cross-browser QA"],
  },
  {
    index: "03",
    label: "WordPress development",
    title: "From storefront design to product details.",
    body: "For Luma Skin, I built a responsive skincare store with WordPress, Elementor, and WooCommerce. I customized page layouts and styling, set up the catalog and shopping cart, and configured product categories, pricing, and inventory.",
    planes: ["WordPress", "Elementor layouts", "WooCommerce", "Product management"],
  },
  {
    index: "04",
    label: "AI automation",
    title: "A second, smaller practice on the side.",
    body: "Alongside the web work I take on automation builds: self-hosted n8n, GoHighLevel, Make, and Zapier wired into revenue pipelines — an 8-microservice GovCon platform on a Docker VPS, AI enrichment through Grok and Gemini, and approval dashboards gating every send.",
    planes: ["Triggers", "AI enrichment", "Verification", "Human approval"],
  },
];

export const stats = [
  { value: "CMS", label: "WordPress & Elementor" },
  { value: "Shop", label: "WooCommerce storefronts" },
  { value: "Code", label: "HTML, CSS & JavaScript" },
  { value: "QA", label: "Content & layout checks" },
] as const;

/* ---------------- Projects ---------------- */
export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  /** Optional live-site screenshot; unpublished work uses a text overview. */
  thumb?: string;
  href?: string;
  hrefLabel?: string;
};

export const projects: Project[] = [
  {
    id: "luma-skin",
    eyebrow: "WordPress development · Not yet published",
    title: "Luma Skin",
    summary:
      "A responsive skincare e-commerce website built with WordPress, Elementor, and WooCommerce, with a customized storefront and a consistent shopping experience.",
    outcomes: [
      "Customized page layouts and CSS styling across the storefront",
      "Product catalog and shopping cart functionality",
      "Product listings, categories, pricing, and inventory configuration",
      "Responsive layouts for a user-friendly shopping experience",
    ],
    stack: ["WordPress", "Elementor", "WooCommerce", "CSS"],
  },
  {
    id: "gp-autocare",
    eyebrow: "Web development · Live in production",
    title: "GP Autocare",
    summary:
      "A multi-page marketing site for an auto detailing studio, built from scratch in vanilla HTML, CSS, and JavaScript, sitting on top of an end-to-end serverless lead pipeline that never drops a submission.",
    outcomes: [
      "Custom design system with persistent dark/light theming",
      "Vercel function → Supabase Postgres → automated Resend email, with fault-tolerant submission handling",
      "Scroll-driven canvas animation and an admin triage dashboard",
      "Playwright E2E and browser-QA suite, deployed through Doppler",
    ],
    stack: ["HTML/CSS/JS", "Vercel Functions", "Supabase", "Resend", "Playwright", "Doppler"],
    thumb: "/projects/gp-autocare.jpg",
    href: "https://gp-autocare-landing-page.vercel.app/",
    hrefLabel: "Visit live site",
  },
  {
    id: "halston-vale",
    eyebrow: "Web development · Live",
    title: "Halston & Vale",
    summary:
      "A private brokerage site for South Florida's coastal and urban estates — a full-bleed cinematic video hero over a deliberately small, curated collection of listings.",
    outcomes: [
      "Video hero with an editorial type treatment layered over it",
      "Six-property collection with status, pricing and per-square-foot detail",
      "Press strip, firm narrative, and a private-consultation funnel",
      "Animated volume counters and scroll-revealed sections throughout",
    ],
    stack: ["Next.js", "React", "Scroll animation", "Vercel"],
    thumb: "/projects/halston-vale.jpg",
    href: "https://halston-vale.vercel.app/",
    hrefLabel: "Visit live site",
  },
  {
    id: "mise",
    eyebrow: "Web development · Live",
    title: "Mise",
    summary:
      "A product site for a culinary archive — a searchable home for techniques, pairings and plating ideas, where you search by the way a dish tastes rather than by keyword.",
    outcomes: [
      "Flavour-profile search across heat, acid, fat and colour",
      "Visual tone matching that surfaces dishes from a single swatch",
      "Masonry collection boards mixing photos, notes and recipes",
      "Identify flow that reads ingredients and techniques back from a photo",
    ],
    stack: ["React", "Vite", "CSS", "Vercel"],
    thumb: "/projects/mise.jpg",
    href: "https://mise-web-six.vercel.app/",
    hrefLabel: "Visit live site",
  },
  {
    id: "signet",
    eyebrow: "Web development · Live",
    title: "Signet",
    summary:
      "A product site for a contract e-signature tool — draft, send and sign in one link, with the signing flow rendered as live interface rather than flat mockups.",
    outcomes: [
      "Three-step narrative: drop in a document, place fields, send for signature",
      "Signing order with approvers and per-party field assignment",
      "Audit trail with timestamps and IPs, plus qualified eIDAS signatures",
      "Product UI built in-page, including a drag-to-place field editor",
    ],
    stack: ["Next.js", "React", "Product UI", "Vercel"],
    thumb: "/projects/signet.jpg",
    href: "https://signet-chi-two.vercel.app/",
    hrefLabel: "Visit live site",
  },
];


/* ---------------- Experience ---------------- */
export const experience = [
  {
    company: "Luxury Presence",
    role: "Junior Web Builder",
    period: "Aug 2025 — Aug 2026",
    discipline: "Web development",
    note: "Updated real estate website content and layouts using HTML, CSS, JavaScript, and JSON on a proprietary CMS. Checked content accuracy, brand consistency, and layouts across browsers and devices while meeting deadlines.",
  },
  {
    company: "Freelance",
    role: "AI Automation Specialist",
    period: "2026 — Present",
    discipline: "AI automation",
    note: "GovCon outreach platform on a Docker VPS, plus GoHighLevel funnel builds for AIVARA.",
  },
  {
    company: "Clark International Airport Corporation",
    role: "Web Developer & IT Support Intern",
    period: "Dec 2024 — Mar 2025",
    discipline: "Web development",
    note: "Assisted with company websites, SEO-focused content, and frontend improvements. Provided office IT support and software troubleshooting.",
  },
] as const;

/* ---------------- Capabilities, split by practice ---------------- */
export const capabilityPractices = [
  {
    id: "web" as const,
    name: "Web Development",
    tier: "Primary practice",
    groups: [
      {
        title: "WordPress & E-commerce",
        items: [
          "WordPress", "Elementor", "WPBakery", "WooCommerce",
          "Storefront customization", "Product & inventory management",
        ],
      },
      {
        title: "Web Development",
        items: [
          "HTML5 & CSS3", "JavaScript / TypeScript", "Responsive web design",
          "UI/UX implementation", "React & Next.js", "Supabase & REST APIs",
        ],
      },
      {
        title: "Design & Website Management",
        items: [
          "Figma", "Canva", "Webflow", "Content management",
          "Page layout customization", "SEO-focused content",
        ],
      },
      {
        title: "Quality & Maintenance",
        items: [
          "Cross-browser testing", "Device & responsive QA",
          "Content accuracy checks", "Website troubleshooting", "Playwright E2E",
        ],
      },
    ],
  },
  {
    id: "automation" as const,
    name: "AI Automation",
    tier: "Secondary practice",
    groups: [
      {
        title: "Automation platforms",
        items: [
          "n8n (self-hosted)",
          "GoHighLevel",
          "Make · Zapier",
          "HubSpot · Airtable",
        ],
      },
      {
        title: "AI & integrations",
        items: [
          "Gemini API · Grok (xAI)",
          "Knowledge-base agents",
          "Webhooks & REST APIs",
          "CRM pipeline design",
        ],
      },
    ],
  },
];
