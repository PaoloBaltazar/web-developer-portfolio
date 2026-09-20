export const profile = {
  name: "Gabriel Paolo Baltazar",
  shortName: "Gabriel Paolo",
  roles: ["Web Developer", "AI Automation Specialist"],
  email: "gpaolobaltazar@gmail.com",
  phone: "+63 976 573 7246",
  location: "Pampanga, Philippines",
  availability: "Available for new work",
  photo: "/gabriel-paolo-baltazar.jpg",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    automationPortfolio: "https://gabriel-paolo-portfolio.vercel.app/",
    autocare: "https://gp-autocare-landing-page.vercel.app/",
  },
  resumes: {
    webDev: "/Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf",
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
};

export const disciplines: Discipline[] = [
  {
    id: "web",
    index: "01",
    tier: "Primary practice",
    primary: true,
    name: "Web Development",
    role: "Full-Stack Web Developer",
    claim: "Production websites and web apps, built end to end.",
    body: "This is the main work. Responsive, brand-driven frontends on top of serverless backends, databases, and a real deployment pipeline — I own the interface, the API, the schema, the tests, and production. Hand-coded when it needs to be, framework-driven when that ships faster.",
    keywords: [
      "Next.js & React",
      "TypeScript",
      "Serverless APIs",
      "Postgres / Supabase",
      "E2E testing",
      "Deployment",
    ],
    resume: "/Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf",
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
  },
];

export const heroTicker = [
  "FRONTEND · API · DATABASE · DEPLOY",
  "NEXT.JS · REACT · TYPESCRIPT",
  "ALSO: AI AUTOMATION, SEPARATELY",
] as const;

export const techMarquee = [
  "Next.js",
  "TypeScript",
  "React",
  "Supabase",
  "Vercel",
  "Python",
  "FastAPI",
  "Docker",
  "n8n",
  "PostgreSQL",
  "GoHighLevel",
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
    title: "Engineering fundamentals, not template shuffling.",
    body: "A BS in Computer Science from Holy Angel University as a consistent honor student, with coursework in data structures, web development, cybersecurity, and machine learning. I read the stack before I reach for the framework.",
    planes: ["Data structures", "Web development", "Cybersecurity", "Machine learning"],
  },
  {
    index: "02",
    label: "Web development",
    title: "Production websites, hand-coded and shipped on deadline.",
    body: "A year at Luxury Presence building and customizing responsive real estate sites — hand-writing layout and interactive sections in HTML, CSS, JavaScript, and JSON on a proprietary CMS, and owning frontend QA across browsers and devices.",
    planes: ["Brand-driven UI", "Responsive layout", "Cross-browser QA", "Performance passes"],
  },
  {
    index: "03",
    label: "Full-stack delivery",
    title: "UI, API, data, tests, and the deploy that carries it.",
    body: "On GP Autocare I owned the entire pipeline: a hand-built frontend against a Vercel serverless function, Supabase Postgres, and automated Resend email — covered by a Playwright end-to-end suite and shipped through Doppler.",
    planes: ["Interface", "Serverless API", "Postgres", "E2E coverage"],
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
  { value: "50+", label: "Client websites built" },
  { value: "4+", label: "Years writing code" },
  { value: "8", label: "Microservices shipped" },
  { value: "10/10", label: "Agent test scenarios passed" },
] as const;

/* ---------------- Projects ---------------- */
export type Project = {
  id: string;
  discipline: DisciplineId;
  eyebrow: string;
  title: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  /** 1600x1000 screenshot in /public/projects. */
  thumb?: string;
  href?: string;
  hrefLabel?: string;
  accent: "orange" | "mint" | "cobalt" | "purple" | "amber" | "pink";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "gp-autocare",
    discipline: "web",
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
    accent: "cobalt",
    featured: true,
  },
  {
    id: "halston-vale",
    discipline: "web",
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
    accent: "orange",
    featured: true,
  },
  {
    id: "mise",
    discipline: "web",
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
    accent: "amber",
    featured: true,
  },
  {
    id: "signet",
    discipline: "web",
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
    accent: "mint",
    featured: true,
  },
  {
    id: "govcon",
    discipline: "automation",
    eyebrow: "AI automation · Revenue platform",
    title: "GovCon Revenue Automation Platform",
    summary:
      "An 8-microservice platform that ingests federal contract awards, job postings, RFPs, and teaming signals into a single sales pipeline with AI-drafted outreach.",
    outcomes: [
      "SAM.gov qualification with ICP filters, live from the public API",
      "Grok-powered enrichment, plus ZeroBounce verification before the send queue",
      "Flask approval dashboard with suppression lists and Resend webhooks",
      "Docker Compose on a Hostinger VPS, Caddy for automatic SSL",
    ],
    stack: ["Python", "FastAPI", "Flask", "PostgreSQL", "Docker", "n8n", "Grok (xAI)"],
    accent: "amber",
  },
  {
    id: "kb-agent",
    discipline: "automation",
    eyebrow: "AI automation",
    title: "AI Knowledge-Base Support Agent",
    summary:
      "A support agent that answers from a 30-entry knowledge base and escalates cleanly to a human in Slack when it cannot.",
    outcomes: [
      "Passed 10 of 10 test scenarios",
      "Zero invented facts across the evaluation set",
    ],
    stack: ["n8n", "Gemini API", "Slack"],
    accent: "cobalt",
  },
  {
    id: "lead-routing",
    discipline: "automation",
    eyebrow: "AI automation",
    title: "Lead Intake, Scoring & Routing Engine",
    summary:
      "Scores and routes solar leads in seconds with a 95-point JavaScript model, replacing a manual triage that took anywhere from an hour to a full day.",
    outcomes: [
      "95-point scoring model written in JavaScript",
      "Manual triage of up to a full day reduced to seconds",
    ],
    stack: ["Zapier", "JavaScript", "Airtable"],
    accent: "orange",
  },
  {
    id: "dental-snapshot",
    discipline: "automation",
    eyebrow: "AI automation · GoHighLevel",
    title: "Dental Clinic Snapshot",
    summary:
      "A complete dental practice system built in 9 days and packaged as a reusable GoHighLevel snapshot.",
    outcomes: ["8 workflows", "5-stage pipeline", "5-page funnel", "Delivered in 9 days"],
    stack: ["GoHighLevel", "Workflows", "Pipelines", "Funnels"],
    accent: "pink",
  },
  {
    id: "content-engine",
    discipline: "automation",
    eyebrow: "AI automation",
    title: "AI Content Repurposing Engine",
    summary:
      "Turns one Google Doc into three review-ready drafts in a single Gemini call.",
    outcomes: ["Saves 30–45 minutes per piece", "$0 running cost"],
    stack: ["Make", "Gemini API", "Google Workspace"],
    accent: "mint",
  },
  {
    id: "webinar-funnels",
    discipline: "automation",
    eyebrow: "AI automation · AIVARA",
    title: "Webinar Automation System",
    summary:
      "Automated webinar funnels covering registration, reminders, follow-ups, and offer delivery, with attendee segmentation driving personalised email and SMS.",
    outcomes: [
      "Segmented nurture raised attendance",
      "Manual follow-up largely eliminated",
    ],
    stack: ["GoHighLevel", "Email/SMS", "CRM automation"],
    accent: "purple",
  },
];

export const projectFilters = [
  { id: "all" as const, label: "All work" },
  { id: "web" as const, label: "Web development" },
  { id: "automation" as const, label: "AI automation" },
];

/* ---------------- Experience ---------------- */
export const experience = [
  {
    company: "Luxury Presence",
    role: "Junior Web Builder",
    period: "Jul 2025 — Jul 2026",
    discipline: "Web development",
    note: "Hand-coded responsive real estate sites on a proprietary CMS; owned frontend QA and performance.",
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
    note: "Built and maintained company web pages with SEO-focused content and frontend improvements.",
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
        title: "Languages & Frontend",
        items: [
          "JavaScript / TypeScript",
          "HTML5 & CSS3",
          "Responsive, mobile-first design",
          "Design systems & UX/UI",
          "PHP",
        ],
      },
      {
        title: "Frameworks & UI",
        items: [
          "React & Next.js",
          "Tailwind CSS",
          "Motion / scroll-driven UI",
          "WordPress / Elementor",
          "Custom plugins",
        ],
      },
      {
        title: "Backend, Data & DevOps",
        items: [
          "Supabase (Postgres)",
          "REST APIs",
          "Vercel Serverless Functions",
          "FastAPI & Flask",
          "SQL",
          "Docker",
          "Git",
        ],
      },
      {
        title: "Testing & QA",
        items: [
          "Playwright E2E",
          "Cross-browser testing",
          "Device & responsive QA",
          "Accessibility passes",
          "Performance tuning",
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
