import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";
import "../animations.css";

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

export const metadata: Metadata = {
    title: "Elliott McPherson | Full-Stack Developer",
    description: "Portfolio website showcasing my projects, skills, and experience as a full-stack web developer.",
    keywords: ["web developer", "front-end", "back-end", "React", "Next.js", "TypeScript", "TailwindCSS", "portfolio"],
    authors: [{ name: "Elliott McPherson" }],
    creator: "Elliott McPherson",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            suppressHydrationWarning
        >
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden`}
            id="home"
        >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <ScrollToTop />
        </body>
        </html>
    );
}