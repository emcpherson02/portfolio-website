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

export function Navbar({ className }: NavbarProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle smooth scrolling for navigation links
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();

        // Close mobile menu if open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }

        // Only do smooth scrolling if we're on the homepage
        if (pathname === '/') {
            // Extract the target ID from the href
            const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;

            // Find the element to scroll to
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Update URL without reloading the page
            window.history.pushState({}, '', targetId);
        } else {
            // If we're not on the homepage, navigate to homepage with the hash
            window.location.href = `/${targetId}`;
        }
    };

    // Handle window-related operations safely
    useEffect(() => {
        // Set initial mobile state
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isMenuOpen && !target.closest('header')) {
                setIsMenuOpen(false);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Only detect sections on homepage
            if (pathname === '/') {
                // Detect which section is currently in view
                const sections = ['home', 'projects', 'skills', 'contact'];

                let currentSection = 'home';
                let minDistance = Infinity;

                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const distance = Math.abs(rect.top - 100); // Distance from top with offset

                        if (distance < minDistance) {
                            minDistance = distance;
                            currentSection = sectionId;
                        }
                    }
                });

                setActiveSection(currentSection);
            }
        };

        // Add event listeners
        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        // Initial scroll check
        handleScroll();

        // Cleanup event listeners
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMenuOpen, pathname]);

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
                        <span className={cn(
                            "transition-opacity duration-300",
                            scrolled || !isMobile ? "opacity-100" : "opacity-0 md:opacity-100"
                        )}>
                            Elliott McPherson
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    <Link
                        href="/"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative py-1",
                            pathname === '/' && activeSection === 'home' ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full" : ""
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#projects"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative py-1",
                            pathname === '/' && activeSection === 'projects' ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full" : ""
                        )}
                        onClick={(e) => handleNavClick(e, '#projects')}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/#skills"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative py-1",
                            pathname === '/' && activeSection === 'skills' ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full" : ""
                        )}
                        onClick={(e) => handleNavClick(e, '#skills')}
                    >
                        Skills
                    </Link>
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
                        href="/#contact"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative py-1",
                            pathname === '/' && activeSection === 'contact' ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full" : ""
                        )}
                        onClick={(e) => handleNavClick(e, '#contact')}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    className="md:hidden"
                    size="icon"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
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
            <div
                className={cn(
                    "fixed inset-x-0 top-16 z-50 md:hidden transform transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="bg-background/95 backdrop-blur-md border-b shadow-sm">
                    <div className="container py-5">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary py-2",
                                    pathname === '/' && activeSection === 'home' ? "text-primary" : ""
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/#projects"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary py-2",
                                    pathname === '/' && activeSection === 'projects' ? "text-primary" : ""
                                )}
                                onClick={(e) => handleNavClick(e, '#projects')}
                            >
                                Projects
                            </Link>
                            <Link
                                href="/#skills"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary py-2",
                                    pathname === '/' && activeSection === 'skills' ? "text-primary" : ""
                                )}
                                onClick={(e) => handleNavClick(e, '#skills')}
                            >
                                Skills
                            </Link>
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
                            <Link
                                href="/#contact"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary py-2",
                                    pathname === '/' && activeSection === 'contact' ? "text-primary" : ""
                                )}
                                onClick={(e) => handleNavClick(e, '#contact')}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}