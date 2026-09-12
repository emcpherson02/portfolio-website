'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    className?: string;
}

const SECTION_LINKS = [
    { id: 'home', href: '/', label: 'Home' },
    { id: 'projects', href: '/#projects', label: 'Projects' },
    { id: 'skills', href: '/#skills', label: 'Skills' },
] as const;

const CONTACT_LINK = { id: 'contact', href: '/#contact', label: 'Contact' } as const;

const SECTION_IDS = ['home', 'projects', 'skills', 'contact'];

export function Navbar({ className }: NavbarProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const onHome = pathname === '/';

    // Scroll position only. Throttled through rAF because the previous version
    // ran on every scroll event and forced layout each time.
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

    // Scroll-spy via IntersectionObserver rather than measuring every section
    // against the viewport on each scroll event.
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

    // Close the mobile menu on Escape, on outside click, and once the viewport
    // is wide enough that it is no longer reachable.
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

    // Only intercept when already on the homepage. Off it, the Link navigates
    // normally, which keeps the client router rather than reloading the page.
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setIsMenuOpen(false);
        if (!onHome) return;

        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState({}, '', `#${targetId}`);
        }
    };

    const linkClass = (id: string, extra: string) => cn(
        "text-sm font-medium transition-colors hover:text-primary",
        extra,
        onHome && activeSection === id ? "text-primary" : ""
    );

    const desktopLink = (id: string, extra = "") => cn(
        linkClass(id, cn("relative py-1", extra)),
        onHome && activeSection === id
            ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full"
            : ""
    );

    const allLinks = [...SECTION_LINKS, CONTACT_LINK];

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
                    : "bg-transparent",
                className
            )}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl flex items-center gap-2">
                        <span className={cn(
                            "transition-opacity duration-300",
                            scrolled ? "opacity-100" : "opacity-0 md:opacity-100"
                        )}>
                            Elliott McPherson
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main">
                    {SECTION_LINKS.map(({ id, href, label }) => (
                        <Link
                            key={id}
                            href={href}
                            className={desktopLink(id)}
                            onClick={id === 'home' ? undefined : (e) => handleNavClick(e, id)}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/resume"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === '/resume' ? "text-primary" : ""
                        )}
                    >
                        Resume
                    </Link>
                    <Link
                        href={CONTACT_LINK.href}
                        className={desktopLink(CONTACT_LINK.id)}
                        onClick={(e) => handleNavClick(e, CONTACT_LINK.id)}
                    >
                        {CONTACT_LINK.label}
                    </Link>
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
                    "fixed inset-x-0 top-16 z-50 md:hidden transform transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="bg-background/95 backdrop-blur-md border-b shadow-sm">
                    <div className="container py-5">
                        <nav className="flex flex-col space-y-4" aria-label="Mobile">
                            {allLinks.map(({ id, href, label }) => (
                                <Link
                                    key={id}
                                    href={href}
                                    className={linkClass(id, "py-2")}
                                    onClick={id === 'home'
                                        ? () => setIsMenuOpen(false)
                                        : (e) => handleNavClick(e, id)}
                                >
                                    {label}
                                </Link>
                            ))}
                            <Link
                                href="/resume"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary py-2",
                                    pathname === '/resume' ? "text-primary" : ""
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Resume
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
