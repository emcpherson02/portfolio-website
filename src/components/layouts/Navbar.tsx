'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    className?: string;
}

/** Sections of the homepage. These scroll; they do not navigate. */
const SECTION_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = SECTION_LINKS.map((l) => l.id);

export function Navbar({ className }: NavbarProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const onHome = pathname === '/';
    const onResume = pathname === '/resume';

    // Scroll position only, rAF-throttled and passive.
    useEffect(() => {
        let frame = 0;

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 10);
                frame = 0;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        if (!onHome) return;

        const sections = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: "-64px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [onHome]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        const onPointerDown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest("header")) setIsMenuOpen(false);
        };
        const onResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onPointerDown);
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    // Only intercept on the homepage. Elsewhere the Link navigates normally.
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setIsMenuOpen(false);
        if (!onHome) return;

        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState({}, '', targetId === 'home' ? '/' : `#${targetId}`);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b"
                    : "bg-transparent",
                className
            )}
        >
            <div className="container flex h-16 items-center justify-between gap-4">
                {/* Monogram rather than the full name, which the hero and the
                    resume masthead both already carry. */}
                <Link
                    href="/"
                    aria-label="Elliott McPherson — home"
                    className="group shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <span
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-sm font-bold tracking-tight",
                            "border-primary/30 bg-primary/5 text-primary",
                            "transition-colors duration-200",
                            "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                        )}
                    >
                        EM
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1" aria-label="Main">
                    {SECTION_LINKS.map(({ id, label }) => {
                        const isActive = onHome && activeSection === id;

                        return (
                            <Link
                                key={id}
                                href={id === 'home' ? '/' : `/#${id}`}
                                onClick={(e) => handleNavClick(e, id)}
                                aria-current={isActive ? 'true' : undefined}
                                className={cn(
                                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    isActive ? "text-primary" : "text-foreground/80"
                                )}
                            >
                                {label}
                                {/* Shared layoutId, so the marker slides between
                                    items rather than cutting. */}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active"
                                        aria-hidden="true"
                                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Resume is a page, not a section of this one. The divider and
                        the button treatment are what say so. */}
                    <span aria-hidden="true" className="mx-2 h-5 w-px bg-border" />

                    <Button
                        asChild
                        size="sm"
                        variant={onResume ? "default" : "outline"}
                        className="gap-1.5"
                    >
                        <Link href="/resume" aria-current={onResume ? 'page' : undefined}>
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Resume
                        </Link>
                    </Button>
                </nav>

                <Button
                    variant="ghost"
                    className="md:hidden"
                    size="icon"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* `inert` while closed: the panel is only translated off-screen, so
                without it the links stay tabbable and in the accessibility tree. */}
            <div
                id="mobile-menu"
                inert={!isMenuOpen}
                className={cn(
                    "absolute inset-x-0 top-16 md:hidden origin-top transition-all duration-200 ease-out",
                    isMenuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                )}
            >
                <div className="mx-4 rounded-xl border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden">
                    <nav className="flex flex-col p-2" aria-label="Mobile">
                        {SECTION_LINKS.map(({ id, label }) => {
                            const isActive = onHome && activeSection === id;

                            return (
                                <Link
                                    key={id}
                                    href={id === 'home' ? '/' : `/#${id}`}
                                    onClick={(e) => handleNavClick(e, id)}
                                    aria-current={isActive ? 'true' : undefined}
                                    className={cn(
                                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-foreground/80 hover:bg-muted"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        <span aria-hidden="true" className="my-2 h-px bg-border" />

                        <Link
                            href="/resume"
                            onClick={() => setIsMenuOpen(false)}
                            aria-current={onResume ? 'page' : undefined}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                onResume
                                    ? "bg-primary text-primary-foreground"
                                    : "border bg-card hover:bg-muted"
                            )}
                        >
                            <FileText className="h-4 w-4" aria-hidden="true" />
                            Resume
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
