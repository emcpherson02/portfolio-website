'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export function Hero() {
    return (
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-36 overflow-hidden">
            <div className="container relative">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col space-y-6"
                    >
                        <Badge variant="outline" className="w-fit mb-2 text-sm">Available for new opportunities</Badge>

                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Hi, I'm <span className="text-primary">Elliott McPherson</span>
                            </h1>
                            <h2 className="text-xl md:text-2xl text-muted-foreground">
                                Full-Stack Developer specialising in modern web technologies
                            </h2>
                        </div>

                        <p className="text-muted-foreground max-w-md text-lg">
                            I build accessible, responsive, and performant web applications
                            with a focus on elegant solutions and exceptional user experiences.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button asChild size="lg" className="rounded-md shadow-lg">
                                <Link href="/#projects">
                                    View My Work <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-md border-2">
                                <Link href="/resume/cv.pdf" download>
                                    Download CV <Download className="ml-1.5 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-6 flex items-center space-x-2">
                            <div className="text-sm text-muted-foreground mr-2">Find me on</div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="icon" asChild className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-all">
                                    <Link href="https://github.com/emcpherson02" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                        <Github className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="icon" asChild className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-all">
                                    <Link href="https://linkedin.com/in/elliott-mcpherson" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="icon" asChild className="rounded-full h-10 w-10 border-2 hover:text-primary hover:border-primary transition-all">
                                    <Link href="mailto:elliott.mcpherson985@gmail.com" aria-label="Email Me">
                                        <Mail className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-30 animate-pulse"></div>

                            {/* Interactive Terminal Component */}
                            <InteractiveTerminal />

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Tech Stack Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 md:mt-20 lg:mt-24"
                >
                    <div className="flex flex-wrap gap-2 justify-center">
                        <div className="text-sm text-muted-foreground mr-2 font-medium">Tech Stack:</div>
                        {['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'AWS'].map((tech) => (
                            <Badge key={tech} variant="secondary" className="py-1.5 px-3 text-xs font-medium">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}