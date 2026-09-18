export const profile = {
  name: "Gabriel Paolo Baltazar",
  shortName: "Gabriel Paolo",
  roles: ["Web Developer", "AI Automation Specialist"],
  email: "gpaolobaltazar@gmail.com",
  phone: "+63 976 573 7246",
  location: "Pampanga, Philippines",
  availability: "Available for new work",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    automationPortfolio: "https://gabriel-paolo-portfolio.vercel.app/",
    autocare: "https://gp-autocare-landing-page.vercel.app/",
  },
  resumes: {
    webDev: "/Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf",
    automation: "/Gabriel-Paolo-Baltazar-AI-Automation-Resume.pdf",
  },
} as const;

export const heroTicker = [
  "FULL-STACK WEB DEVELOPMENT",
  "AI WORKFLOW AUTOMATION",
  "SERVERLESS ARCHITECTURE",
  "BS COMPUTER SCIENCE",
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
    label: "The craft",
    title: "Production websites, hand-coded and shipped on deadline.",
    body: "A year at Luxury Presence building and customizing responsive real estate sites — hand-writing layout and interactive sections in HTML, CSS, JavaScript, and JSON on a proprietary CMS, and owning frontend QA across browsers and devices.",
    planes: ["Brand-driven UI", "Responsive layout", "Cross-browser QA", "Performance passes"],
  },
  {
    index: "03",
    label: "The full stack",
    title: "UI, API, data, tests, and the deploy that carries it.",
    body: "I own the whole pipeline. GP Autocare runs a vanilla frontend against a Vercel serverless function, Supabase Postgres, and automated Resend email — covered by a Playwright end-to-end suite and shipped through Doppler.",
    planes: ["Interface", "Serverless API", "Postgres", "E2E coverage"],
  },
  {
    index: "04",
    label: "The automation",
    title: "Systems that keep working after I log off.",
    body: "Self-hosted n8n, GoHighLevel, Make, and Zapier wired into real revenue pipelines — an 8-microservice GovCon platform on a Docker VPS, AI enrichment through Grok and Gemini, email verification, and approval dashboards before anything sends.",
    planes: ["Triggers", "AI enrichment", "Verification", "Human approval"],
  },
];

export const stats = [
  { value: "4+", label: "Years writing code" },
  { value: "8", label: "Microservices shipped" },
  { value: "50+", label: "Client sites built" },
  { value: "10/10", label: "Agent test scenarios passed" },
] as const;

/* ---------------- Projects ---------------- */
export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  accent: "orange" | "mint" | "cobalt" | "purple" | "amber" | "pink";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "gp-autocare",
    eyebrow: "Full-stack · Live in production",
    title: "GP Autocare",
    summary:
      "A multi-page marketing site built from scratch in vanilla HTML, CSS, and JavaScript, sitting on top of an end-to-end serverless lead pipeline that never drops a submission.",
    outcomes: [
      "Custom design system with persistent dark/light theming",
      "Vercel function → Supabase Postgres → automated Resend email, with fault-tolerant submission handling",
      "Scroll-driven canvas animation and an admin triage dashboard",
      "Playwright E2E and browser-QA suite, deployed through Doppler",
    ],
    stack: ["HTML/CSS/JS", "Vercel Functions", "Supabase", "Resend", "Playwright", "Doppler"],
    href: profile.links.autocare,
    hrefLabel: "Visit live site",
    accent: "orange",
    featured: true,
  },
  {
    id: "govcon",
    eyebrow: "Client project · Revenue platform",
    title: "GovCon Revenue Automation Platform",
    summary:
      "An 8-microservice platform that ingests federal contract awards, job postings, RFPs, and teaming signals into a single sales pipeline with AI-drafted outreach.",
    outcomes: [
      "SAM.gov qualification with ICP filters, live from the public API",
      "Grok-powered enrichment and contact discovery",
      "ZeroBounce verification before anything enters the send queue",
      "Flask approval dashboard with suppression lists and Resend webhooks",
      "Docker Compose on a Hostinger VPS, Caddy for automatic SSL",
    ],
    stack: ["Python", "FastAPI", "Flask", "PostgreSQL", "Docker", "n8n", "Grok (xAI)"],
    accent: "mint",
    featured: true,
  },
  {
    id: "kb-agent",
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
    eyebrow: "AI automation",
    title: "Lead Intake, Scoring & Routing Engine",
    summary:
      "Scores and routes solar leads in seconds with a 95-point JavaScript model, replacing a manual triage that took anywhere from an hour to a full day.",
    outcomes: [
      "95-point scoring model written in JavaScript",
      "Manual triage of up to a full day reduced to seconds",
    ],
    stack: ["Zapier", "JavaScript", "Airtable"],
    accent: "amber",
  },
  {
    id: "dental-snapshot",
    eyebrow: "Client project · GoHighLevel",
    title: "Dental Clinic Snapshot",
    summary:
      "A complete dental practice system built in 9 days and packaged as a reusable GoHighLevel snapshot.",
    outcomes: ["8 workflows", "5-stage pipeline", "5-page funnel", "Delivered in 9 days"],
    stack: ["GoHighLevel", "Workflows", "Pipelines", "Funnels"],
    accent: "purple",
  },
  {
    id: "content-engine",
    eyebrow: "AI automation",
    title: "AI Content Repurposing Engine",
    summary:
      "Turns one Google Doc into three review-ready drafts in a single Gemini call.",
    outcomes: ["Saves 30–45 minutes per piece", "$0 running cost"],
    stack: ["Make", "Gemini API", "Google Workspace"],
    accent: "pink",
  },
  {
    id: "webinar-funnels",
    eyebrow: "Freelance · AIVARA",
    title: "Webinar Automation System",
    summary:
      "Automated webinar funnels covering registration, reminders, follow-ups, and offer delivery, with attendee segmentation driving personalised email and SMS.",
    outcomes: [
      "Segmented nurture raised attendance",
      "Manual follow-up largely eliminated",
      "CRM tracking and pipeline automation for lead monitoring",
    ],
    stack: ["GoHighLevel", "Email/SMS", "CRM automation"],
    accent: "orange",
  },
];

/* ---------------- Experience ---------------- */
export const experience = [
  {
    company: "Luxury Presence",
    role: "Junior Web Builder",
    period: "Jul 2025 — Jul 2026",
    note: "Hand-coded responsive real estate sites on a proprietary CMS; owned frontend QA and performance.",
  },
  {
    company: "Freelance",
    role: "AI Automation Specialist",
    period: "2026 — Present",
    note: "GovCon outreach platform on a Docker VPS, plus GoHighLevel funnel builds for AIVARA.",
  },
  {
    company: "Clark International Airport Corporation",
    role: "Web Developer & IT Support Intern",
    period: "Dec 2024 — Mar 2025",
    note: "Built and maintained company web pages with SEO-focused content and frontend improvements.",
  },
] as const;

/* ---------------- Capability groups ---------------- */
export const capabilities = [
  {
    title: "Languages & Frontend",
    items: [
      "JavaScript / TypeScript",
      "Python",
      "PHP",
      "HTML5 & CSS3",
      "SQL",
      "Responsive, mobile-first design",
      "Design systems & UX/UI",
      "WordPress / Elementor",
    ],
  },
  {
    title: "Backend, Data & DevOps",
    items: [
      "Supabase (Postgres)",
      "REST APIs",
      "Vercel Serverless Functions",
      "FastAPI & Flask",
      "Docker",
      "Git",
      "Caddy / VPS deployment",
    ],
  },
  {
    title: "Testing, AI & Automation",
    items: [
      "Playwright E2E",
      "Browser & cross-device QA",
      "n8n (self-hosted)",
      "Zapier · Make · HubSpot",
      "GoHighLevel",
      "Gemini & Grok APIs",
      "Claude Code / Codex",
    ],
  },
] as const;
