'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

const SOCIALS = [
    { href: "https://github.com/emcpherson02", label: "GitHub", Icon: GithubIcon },
    { href: "https://linkedin.com/in/elliott-mcpherson", label: "LinkedIn", Icon: LinkedinIcon },
    { href: "mailto:elliott.mcpherson985@gmail.com", label: "Email", Icon: Mail },
];

export function Hero() {
    return (
        <section id="home" className="w-full py-20 md:py-28 lg:py-36 overflow-hidden scroll-mt-16">
            <div className="container relative">
                {/* Ambient wash. Static - a pulsing blur behind the terminal
                    competed with the typing animation in front of it. */}
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <div className="absolute top-0 left-1/4 w-2/3 h-1/2 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="flex flex-col">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
                            Platform Engineer · Belfast
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                            {/* En space: a plain extra space would collapse in HTML. */}
                            Hi,&ensp;I&#39;m <span className="text-primary">Elliott</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mt-5 text-balance">
                            Software Engineer building secure, scalable cloud infrastructure
                        </p>

                        <p className="text-muted-foreground max-w-lg mt-6 leading-relaxed">
                            I build and operate the infrastructure other engineers build on
                            top of: Kubernetes clusters, Terraform-managed cloud, and the
                            observability that catches problems before anyone else notices.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-9">
                            <Button asChild size="lg" className="group">
                                <a href="#projects">
                                    View my work
                                    <ArrowRight
                                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href="/CV_Elliott_McPherson.pdf" download>
                                    Download CV
                                    <Download className="ml-1.5 h-4 w-4" aria-hidden="true" />
                                </a>
                            </Button>
                        </div>

                        {/* Plain links rather than three outlined circles, which
                            read as a third and fourth button. */}
                        <div className="flex items-center gap-6 mt-10 pt-8 border-t">
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                Find me
                            </span>
                            <div className="flex items-center gap-5">
                                {SOCIALS.map(({ href, label, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        {...(href.startsWith('http')
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                        aria-label={label}
                                        className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <div
                                className="absolute -inset-px bg-gradient-to-br from-primary/40 to-transparent rounded-2xl blur-sm opacity-40"
                                aria-hidden="true"
                            />
                            <InteractiveTerminal />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
