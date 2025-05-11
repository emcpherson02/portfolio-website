import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left side: Text content */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3">
                                Hi, I&#39;m <span className="text-primary">Elliott McPherson</span>
                            </h1>
                            <h2 className="text-xl md:text-2xl text-muted-foreground">
                                Full-Stack Developer specialising in modern web technologies
                            </h2>
                        </div>

                        <p className="text-muted-foreground max-w-md">
                            I build accessible, responsive, and performant web applications
                            using React, TypeScript, Next.js, and TailwindCSS.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg">
                                <Link href="/#projects">
                                    View Projects <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/resume/cv.pdf" download>
                                    Download CV <Download className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link href="https://github.com/emcpherson02" target="_blank" rel="noopener noreferrer">
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link href="https://linkedin.com/in/elliott-mcpherson" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link href="mailto:elliott.mcpherson985@gmail.com">
                                    <Mail className="h-5 w-5" />
                                    <span className="sr-only">Email</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right side: Code illustration */}
                    <div className="relative flex items-center justify-center mt-8 lg:mt-0">
                        <div className="w-full aspect-[4/3] max-w-xl overflow-hidden rounded-xl border shadow-lg bg-card">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                                <div className="p-6 md:p-8 text-center">
                                    <div className="text-xl md:text-2xl font-mono mb-4">// Developer</div>
                                    <div className="border rounded-lg p-3 md:p-4 bg-card/50 backdrop-blur-sm shadow-sm">
                                        <code className="text-xs md:text-sm">
                                            <span className="text-primary">const</span> developer = {'{'}
                                            <br />
                                            &nbsp;&nbsp;name: <span className="text-green-500">'Elliott McPherson'</span>,
                                            <br />
                                            &nbsp;&nbsp;skills: [<span className="text-yellow-500">'React'</span>, <span className="text-yellow-500">'TypeScript'</span>, <span className="text-yellow-500">'Next.js'</span>],
                                            <br />
                                            &nbsp;&nbsp;passion: <span className="text-green-500">'Building beautiful UI'</span>
                                            <br />
                                            {'}'};
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}