import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: 'swap',
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    display: 'swap',
    subsets: ["latin"],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Allow zooming for accessibility
    minimumScale: 1,
};

// Must match the canonical address the site is served from. The apex redirects
// here via GoDaddy forwarding, since DNS forbids a CNAME at a zone apex and
// GoDaddy has no ALIAS record.
const SITE_URL = "https://www.example.com";
const TITLE = "Elliott McPherson | Full-Stack Developer";
const DESCRIPTION = "Portfolio of Elliott McPherson - software engineer in Belfast, with experience in Java, cloud infrastructure and full-stack web development.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    keywords: ["web developer", "front-end", "back-end", "React", "Next.js", "TypeScript", "TailwindCSS", "portfolio"],
    authors: [{ name: "Elliott McPherson" }],
    creator: "Elliott McPherson",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "Elliott McPherson",
        title: TITLE,
        description: DESCRIPTION,
        locale: "en_GB",
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="motion-safe:scroll-smooth">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden`}
        >
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
            Skip to content
        </a>
        <MotionProvider>
            <Navbar />
            <main id="main" className="flex-grow pt-16">{children}</main>
            <Footer />
            <ScrollToTop />
        </MotionProvider>
        </body>
        </html>
    );
}
