import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/20">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Text content */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            Hi, I&#39;m <span className="text-primary">Elliott McPherson</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-muted-foreground">
                            Full-Stack Developer specialising in backend Java development
                        </h2>
                    </div>

                    <p className="text-muted-foreground max-w-md">
                        I build accessible, responsive, and performant software solutions using an array of tools and technologies.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg">
                            <Link href="/projects">
                                View Projects <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/resume/cv.pdf" download>
                                Download CV <Download className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex gap-4 pt-4">
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

                {/* Right side: Image or illustration */}
                <div className="relative flex items-center justify-center">
                    <div className="relative w-full h-[400px] overflow-hidden rounded-xl border shadow-lg bg-card">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                            <div className="p-8 text-center">
                                <div className="text-2xl font-mono mb-4">// Developer</div>
                                <div className="border rounded-lg p-4 bg-card/50 backdrop-blur-sm shadow-sm">
                                    <code className="text-sm">
                                        <span className="text-primary">const</span> developer = {'{'}
                                        <br />
                                        &nbsp;&nbsp;name: <span className="text-green-500">&#39;Elliott McPherson&#39;</span>,
                                        <br />
                                        &nbsp;&nbsp;skills: [<span className="text-yellow-500">&#39;Java&#39;</span>, <span className="text-yellow-500">&#39;Cloud&#39;</span>, <span className="text-yellow-500">&#39;Full Stack&#39;</span>],
                                        <br />
                                        &nbsp;&nbsp;passion: <span className="text-green-500">&#39;Building beautiful UI&#39;</span>
                                        <br />
                                        {'}'};
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}