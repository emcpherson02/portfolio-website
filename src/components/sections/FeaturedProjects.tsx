'use client'

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ImageOff } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
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
        imageSrc: "/projects/studentwallet.jpg",
        imageAlt: "The StudentWallet dashboard, showing budget categories and recent transactions.",
        tags: ["React.js", "Express.js", "CSS/HTML", "Node.js", "docker-compose", "GCP CloudRun", "Firestore", "Plaid API"],
        liveUrl: "https://studentwallet-4e2ca.web.app",
        githubUrl: "https://github.com/emcpherson02/StudentWallet",
    },
    {
        title: "Portfolio Website",
        description: "A portfolio website built to improve my TypeScript and frontend development skills, designed to highlight my projects and demonstrate my employability.",
        imageSrc: "/projects/portfolio-website.png",
        imageAlt: "The landing page of this portfolio site, showing the hero section and interactive terminal.",
        tags: ["React", "TypeScript", "Next.js", "shadcn/ui", "TailwindCSS", "AWS S3", "AWS CloudFront"],
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
                <span className="text-sm font-medium">{title}</span>
            </div>
        );
    }

    return (
        <>
            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full motion-safe:animate-spin" />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(
                    "object-cover transition-opacity duration-300",
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
        <article className="group relative rounded-xl border overflow-hidden transition-colors hover:border-primary/50">
            <div className="flex flex-col lg:flex-row h-full">
                <div className={cn(
                    "relative w-full lg:w-1/2 h-[200px] sm:h-[240px] lg:h-auto overflow-hidden bg-muted/50",
                    reverse ? "lg:order-last" : ""
                )}>
                    <ProjectImage src={imageSrc} alt={imageAlt} title={title} />
                </div>

                <div className="w-full lg:w-1/2 p-5 sm:p-6 lg:p-7 flex flex-col h-full bg-card">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 flex-grow">{description}</p>

                    <ul className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {tags.map((tag) => (
                            <li key={tag}>
                                <Badge variant="secondary" className="text-xs">{tag}</Badge>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-3 mt-auto">
                        {liveUrl && (
                            <Button asChild size="sm" className="shadow-sm">
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    Live Demo <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                                </a>
                            </Button>
                        )}
                        {githubUrl && (
                            <Button asChild variant="outline" size="sm">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    GitHub <GithubIcon className="ml-1 h-3 w-3" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export function FeaturedProjects() {
    return (
        <section className="w-full py-16 sm:py-20 bg-background scroll-mt-16" id="projects">
            <div className="container">
                <div className="mb-10 sm:mb-16">
                    <Badge variant="outline" className="mb-4">My Work</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A showcase of my recent development work, featuring full-stack applications built with modern technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
