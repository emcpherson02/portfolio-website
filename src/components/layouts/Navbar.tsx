import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
                className
            )}
        >
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl">
                        Your Name
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/skills"
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
                        href="/contact"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Contact
                    </Link>
                </nav>

                {/* CTA Button */}
                <div className="hidden md:flex">
                    <Button asChild variant="default">
                        <Link href="/contact">Hire Me</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    className="md:hidden"
                    size="icon"
                    onClick={toggleMenu}
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="container py-4 flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/skills"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Skills
                        </Link>
                        <Link
                            href="/resume"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resume
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Button asChild variant="default" className="w-full mt-4">
                            <Link href="/contact">Hire Me</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}