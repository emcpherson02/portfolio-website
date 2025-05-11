'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl flex items-center gap-2">
                        <span className="text-primary font-mono">EM</span>
                        <span className={cn("transition-opacity", scrolled ? "opacity-100" : "opacity-0 md:opacity-100")}>
                            Elliott McPherson
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        href="/#projects"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/#skills"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Skills
                    </Link>
                    <Link
                        href="/resume"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Resume
                    </Link>
                    <Link
                        href="/blog"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/#contact"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Contact
                    </Link>
                </nav>

                {/* CTA Button */}
                <div className="hidden md:flex">
                    <Button asChild variant="default" className="shadow-sm">
                        <Link href="/#contact">Hire Me</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    className="md:hidden"
                    size="icon"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-sm animate-in slide-in-from-top">
                    <div className="container py-6 flex flex-col space-y-5">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#projects"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/#skills"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Skills
                        </Link>
                        <Link
                            href="/resume"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resume
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Button asChild variant="default" className="w-full mt-2">
                            <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>Hire Me</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}