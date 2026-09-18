import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const SITE = "https://gabrielpaolobaltazar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Gabriel Paolo Baltazar — Web Developer & AI Automation Specialist",
    template: "%s · Gabriel Paolo Baltazar",
  },
  description:
    "Full-stack web developer and AI automation specialist. I build production websites and web apps end to end, and the automated systems that run behind them.",
  keywords: [
    "web developer",
    "full-stack developer",
    "AI automation specialist",
    "n8n",
    "Next.js",
    "Supabase",
    "Philippines",
  ],
  authors: [{ name: "Gabriel Paolo Baltazar" }],
  creator: "Gabriel Paolo Baltazar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Gabriel Paolo Baltazar",
    title: "Gabriel Paolo Baltazar — Web Developer & AI Automation Specialist",
    description:
      "I build production websites and web apps end to end, and the automated systems that run behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Paolo Baltazar — Web Developer & AI Automation Specialist",
    description:
      "I build production websites and web apps end to end, and the automated systems that run behind them.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-2.5 focus:text-sm focus:text-stone-1100"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
