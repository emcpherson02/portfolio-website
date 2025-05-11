import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
        >
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        </body>
        </html>
    );
}