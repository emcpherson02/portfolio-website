'use client'

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink, ImageOff } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useState } from "react";

interface Project {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    reverse?: boolean;
}

const PROJECTS: Project[] = [
    {
        title: "StudentWallet",
        description: "StudentWallet is a comprehensive financial management system designed specifically for university students. It allows students to track their spending, manage budgets, monitor their maintenance loan, and integrate their bank accounts via Plaid.",
        imageSrc: "/projects/studentwallet.png",
        imageAlt: "The StudentWallet sign-up screen, with fields for name, date of birth and email address.",
        tags: ["React.js", "Express.js", "CSS/HTML", "Node.js", "docker-compose", "GCP CloudRun", "Firestore", "Plaid API"],
        liveUrl: "https://studentwallet-4e2ca.web.app",
        githubUrl: "https://github.com/emcpherson02/StudentWallet",
    },
    {
        title: "Portfolio Website",
        description: "A portfolio website built to improve my TypeScript and frontend development skills, designed to highlight my projects and demonstrate my employability.",
        imageSrc: "/projects/portfolio-website.png",
        imageAlt: "The landing page of this portfolio site, showing the hero section and interactive terminal.",
        tags: ["React", "TypeScript", "Next.js", "shadcn/ui", "TailwindCSS", "Firebase Hosting", "GitHub Actions"],
        githubUrl: "https://github.com/emcpherson02/portfolio-website",
        reverse: true,
    },
];

function ProjectImage({ src, alt, title }: { src: string; alt: string; title: string }) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    if (status === 'error') {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                <ImageOff className="h-6 w-6" aria-hidden="true" />
                <span className="font-mono text-xs">{title}</span>
            </div>
        );
    }

    return (
        <>
            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full motion-safe:animate-spin" />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                // contain, not cover: screenshots vary in aspect and cover would
                // crop them - losing the form fields off one and the terminal
                // off the other. Letterboxing against the card ground is the
                // lesser cost when the whole point is seeing the screen.
                className={cn(
                    "object-contain transition-all duration-500 group-hover:scale-[1.02]",
                    status === 'loaded' ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setStatus('loaded')}
                onError={() => setStatus('error')}
            />
        </>
    );
}

function ProjectCard({ title, description, imageSrc, imageAlt, tags, liveUrl, githubUrl, reverse }: Project) {
    return (
        <article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className={cn(
                "relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-muted/50",
                reverse && "lg:order-last"
            )}>
                <ProjectImage src={imageSrc} alt={imageAlt} title={title} />
            </div>

            <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>

                <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>

                <ul className="flex flex-wrap gap-1.5 mt-5">
                    {tags.map((tag) => (
                        <li
                            key={tag}
                            className="rounded-md bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-7">
                    {liveUrl && (
                        <Button asChild size="sm">
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                Live demo
                                <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                        </Button>
                    )}
                    {githubUrl && (
                        <Button asChild size="sm" variant="outline">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                                Source
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}

export function FeaturedProjects() {
    return (
        <section id="projects" className="w-full py-20 sm:py-28 bg-background scroll-mt-16">
            <div className="container">
                <SectionHeader label="My Work" title="Featured Projects" />

                <div className="flex flex-col gap-16 sm:gap-24">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
