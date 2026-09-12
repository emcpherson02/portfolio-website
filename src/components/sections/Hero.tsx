'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export function Hero() {
    return (
        <section id="home" className="w-full py-16 md:py-24 lg:py-32 xl:py-36 overflow-hidden scroll-mt-16">
            <div className="container relative">
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="flex flex-col space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Hi, I&#39;m <span className="text-primary">Elliott McPherson</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                Software Engineer building secure, scalable cloud infrastructure
                            </p>
                        </div>

                        <p className="text-muted-foreground max-w-md text-lg">
                            I build accessible, responsive, and performant software solutions
                            with a focus on efficient cloud deployment and exceptional user experience.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button asChild size="lg" className="rounded-md shadow-lg">
                                <a href="#projects">
                                    View My Work <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-md border-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                            >
                                <a href="/CV_Elliott_McPherson.pdf" download>
                                    Download CV <Download className="ml-1.5 h-4 w-4" aria-hidden="true" />
                                </a>
                            </Button>
                        </div>

                        <div className="pt-6 flex items-center">
                            <div className="text-sm text-muted-foreground mr-2">Find me on</div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-colors"
                                >
                                    <a href="https://github.com/emcpherson02" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                                        <GithubIcon className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-colors"
                                >
                                    <a href="https://linkedin.com/in/elliott-mcpherson" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                                        <LinkedinIcon className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-colors"
                                >
                                    <a href="mailto:elliott.mcpherson985@gmail.com" aria-label="Email me">
                                        <Mail className="h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <div
                                className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-30 motion-safe:animate-pulse"
                                aria-hidden="true"
                            />

                            <InteractiveTerminal />

                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" aria-hidden="true" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
