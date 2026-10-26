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
    default: "Gabriel Paolo Baltazar — Web Developer & WordPress Developer",
    template: "%s · Gabriel Paolo Baltazar",
  },
  description:
    "Web Developer building responsive websites with WordPress, Elementor, WooCommerce, HTML, CSS, and JavaScript. Experienced in content management and website quality assurance.",
  keywords: [
    "web developer",
    "WordPress developer",
    "Elementor",
    "WooCommerce",
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
    title: "Gabriel Paolo Baltazar — Web Developer & WordPress Developer",
    description:
      "Web Developer specializing in WordPress, responsive websites, WooCommerce storefronts, and website content management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Paolo Baltazar — Web Developer & WordPress Developer",
    description:
      "Web Developer specializing in WordPress, responsive websites, WooCommerce storefronts, and website content management.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
      {/*
        Browser extensions inject attributes onto <body> before React hydrates
        (ColorZilla's cz-shortcut-listen, Grammarly, etc.), which trips a
        hydration warning that has nothing to do with this app. Suppression
        here applies only to <body>'s own attributes — mismatches anywhere
        inside the tree still surface normally.
      */}
      <body suppressHydrationWarning>
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
