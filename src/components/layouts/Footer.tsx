import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t py-10 sm:py-12 bg-muted/20">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    <div className="col-span-2">
                        <Link href="/" className="font-bold text-xl flex items-center gap-2">
                            <span className="text-primary font-mono">EM</span>
                            <span>Elliott McPherson</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                            Software engineer in Belfast, working in platform engineering at Proofpoint.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="space-y-3">
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

                    <div className="space-y-3">
                        <h3 className="font-medium">Elsewhere</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/emcpherson02"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    GitHub
                                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/elliott-mcpherson"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    LinkedIn
                                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                        © {currentYear} Elliott McPherson. All rights reserved.
                    </p>

                    {/* aria-label only. These previously carried a matching
                        sr-only span as well, so each was announced twice. */}
                    <div className="flex gap-3">
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8">
                            <a
                                href="https://github.com/emcpherson02"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <GithubIcon className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8">
                            <a
                                href="https://linkedin.com/in/elliott-mcpherson"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8">
                            <a href="mailto:elliott.mcpherson985@gmail.com" aria-label="Email">
                                <Mail className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}