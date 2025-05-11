import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t py-12 bg-muted/20">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="font-bold text-xl flex items-center gap-2">
                            <span className="text-primary font-mono">EM</span>
                            <span>Elliott McPherson</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                            Full-stack developer specialising in modern web technologies and creating exceptional digital experiences.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Pages</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#projects" className="text-sm text-muted-foreground hover:text-foreground">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/#skills" className="text-sm text-muted-foreground hover:text-foreground">
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link href="/resume" className="text-sm text-muted-foreground hover:text-foreground">
                                    Resume
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://github.com/emcpherson02"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    GitHub
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Contact</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground">
                                    Contact Form
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:elliott.mcpherson985@gmail.com"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Email Me
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="https://linkedin.com/in/elliott-mcpherson"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    LinkedIn
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        © {currentYear} Elliott McPherson. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                            <Link
                                href="https://github.com/emcpherson02"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                            <Link
                                href="https://linkedin.com/in/elliott-mcpherson"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                            <Link
                                href="https://twitter.com/elliotmcpherson"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                            <Link href="mailto:elliott.mcpherson985@gmail.com">
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}