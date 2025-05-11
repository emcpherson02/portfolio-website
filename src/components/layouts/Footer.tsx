import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t py-12 bg-muted/20">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="font-bold text-xl">
                            Your Name
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 items-center md:items-end">
                        <div className="flex gap-3">
                            <Button variant="ghost" size="icon" asChild>
                                <Link
                                    href="https://github.com/emcpherson02"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link
                                    href="https://linkedin.com/in/elliott-mcpherson"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="mailto:elliott.mcpherson985@gmail.com">
                                    <Mail className="h-4 w-4" />
                                    <span className="sr-only">Email</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <Link href="/projects" className="hover:text-foreground">
                                Projects
                            </Link>
                            <Link href="/blog" className="hover:text-foreground">
                                Blog
                            </Link>
                            <Link href="/contact" className="hover:text-foreground">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}