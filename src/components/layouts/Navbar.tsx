'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
                {/* Logo - Name Only */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                >
                    <Link href="/" className="font-bold text-xl group">
                        <span className={cn(
                            "transition-all duration-300 relative",
                            scrolled || !isMobile ? "opacity-100" : "opacity-0 md:opacity-100"
                        )}>
                            <span className="relative z-10">Elliott McPherson</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="hidden md:flex items-center gap-6 lg:gap-8"
                >
                    {['Home', 'Projects', 'Skills', 'Resume', 'Blog', 'Contact'].map((item, index) => {
                        const href = item === 'Home' ? '/' :
                            (item === 'Resume' || item === 'Blog') ? `/${item.toLowerCase()}` :
                                `/#${item.toLowerCase()}`;
                        const isActive = pathname === href ||
                            (pathname === '/' && activeSection === item.toLowerCase()) ||
                            (href === '/' && pathname === '/' && activeSection === 'home');

                        return (
                            <Link
                                key={item}
                                href={href}
                                className={cn(
                                    "text-sm font-medium transition-all duration-300 hover:text-primary relative py-1.5 px-1",
                                    isActive ? "text-primary" : ""
                                )}
                                onClick={href.includes('#') ? (e) => handleNavClick(e, `#${item.toLowerCase()}`) : undefined}
                            >
                                {item}
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                                    isActive ? "w-full" : "w-0"
                                )}></span>
                            </Link>
                        );
                    })}
                </motion.nav>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:flex"
                >
                    <Button
                        variant="default"
                        className="shadow-sm rounded-md relative overflow-hidden group"
                        onClick={() => {
                            if (pathname === '/') {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#contact';
                            }
                        }}
                    >
                        <span className="relative z-10">Hire Me</span>
                        <span className="absolute inset-0 bg-primary/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="md:hidden"
                >
                    <Button
                        variant="ghost"
                        className="h-9 w-9 p-0 rounded-full hover:bg-primary/10"
                        size="icon"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isMenuOpen ? 'close' : 'menu'}
                                initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </motion.div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-x-0 top-16 z-50 md:hidden overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-background/95 backdrop-blur-md border-b shadow-sm"
                        >
                            <div className="container py-5">
                                <nav className="flex flex-col space-y-1">
                                    {['Home', 'Projects', 'Skills', 'Resume', 'Blog', 'Contact'].map((item, index) => {
                                        const href = item === 'Home' ? '/' :
                                            (item === 'Resume' || item === 'Blog') ? `/${item.toLowerCase()}` :
                                                `/#${item.toLowerCase()}`;
                                        const isActive = pathname === href ||
                                            (pathname === '/' && activeSection === item.toLowerCase()) ||
                                            (href === '/' && pathname === '/' && activeSection === 'home');

                                        return (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                            >
                                                <Link
                                                    href={href}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-3 rounded-md transition-all",
                                                        isActive
                                                            ? "bg-primary/10 text-primary"
                                                            : "hover:bg-muted/50 text-foreground"
                                                    )}
                                                    onClick={href.includes('#') ? (e) => handleNavClick(e, `#${item.toLowerCase()}`) : () => setIsMenuOpen(false)}
                                                >
                                                    <span>{item}</span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                        className="pt-2"
                                    >
                                        <Button
                                            variant="default"
                                            className="w-full shadow-sm"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                if (pathname === '/') {
                                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    window.location.href = '/#contact';
                                                }
                                            }}
                                        >
                                            Hire Me
                                        </Button>
                                    </motion.div>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}