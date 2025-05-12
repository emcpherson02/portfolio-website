
'use client'

import Image from "next/image";
import Link from "next/link";
import studentWalletImage from "../../../public/projects/StudentWallet-ui.jpg"
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    reverse?: boolean;
    index: number;
}

function ProjectCard({
                         title,
                         description,
                         imageSrc,
                         tags,
                         liveUrl,
                         githubUrl,
                         reverse = false,
                         index,
                     }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    // Calculate staggered animation delay based on index
    const baseDelay = 0.2;
    const delay = baseDelay + (index * 0.1);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className={cn(
                "group relative rounded-xl border overflow-hidden transition-all hover:border-primary/50 hover:shadow-md",
            )}
        >
            <div className="flex flex-col lg:flex-row gap-0 h-full">
                {/* Project Image */}
                <div className={cn(
                    "relative w-full lg:w-1/2 h-[200px] sm:h-[240px] lg:h-auto overflow-hidden bg-muted/50",
                    reverse ? "lg:order-last" : ""
                )}>
                    {imageSrc ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={imageSrc}
                                alt={title}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted">
                            <div className="text-muted-foreground">Project Preview</div>
                        </div>
                    )}

                    {/* Overlay effect that appears on hover */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Details */}
                <div className={cn(
                    "w-full lg:w-1/2 p-5 sm:p-6 lg:p-7 flex flex-col h-full bg-card",
                )}>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 flex-grow">{description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {tags.map((tag, tagIndex) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{
                                    duration: 0.4,
                                    delay: delay + 0.3 + (tagIndex * 0.05),
                                    ease: [0.25, 0.1, 0.25, 1.0]
                                }}
                            >
                                <Badge variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-auto">
                        {liveUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: delay + 0.5 }}
                            >
                                <Button asChild size="sm" className="shadow-sm">
                                    <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                        Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            </motion.div>
                        )}
                        {githubUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: delay + 0.6 }}
                            >
                                <Button asChild variant="outline" size="sm">
                                    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                        GitHub <Github className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function FeaturedProjects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const projects = [
        {
            title: "StudentWallet",
            description: "StudentWallet is a comprehensive financial management system designed specifically for university students. It allows students to track their spending, manage budgets, monitor their maintenance loan, and integrate their bank accounts via Plaid.",
            imageSrc: studentWalletImage,
            tags: ["React.js", "Express.js", "CSS/HTML", "Node.js", "Docker", "GCP", "Firestore", "Plaid API"],
            liveUrl: "https://studentwallet-4e2ca.web.app",
            githubUrl: "https://github.com/emcpherson02/StudentWallet",
        },
        {
            title: "Portfolio Website",
            description: "A portfolio website built to improve my TypeScript and frontend development skills, designed to highlight my projects and demonstrate my employability.",
            imageSrc: "",
            tags: ["React", "TypeScript", "Next.js", "Shadcn-UI", "TailwindCSS"],
            liveUrl: "",
            githubUrl: "https://github.com/emcpherson02/portfolio-website",
            reverse: true,
        },
    ];

    return (
        <section className="w-full py-16 sm:py-20 bg-background" id="projects">
            <div className="container" ref={sectionRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-16"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <div>
                            <Badge variant="outline" className="mb-4">My Work</Badge>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-muted-foreground max-w-2xl">
                                A showcase of my recent development work, featuring full-stack applications built with modern technologies.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            title={project.title}
                            description={project.description}
                            imageSrc={project.imageSrc}
                            tags={project.tags}
                            liveUrl={project.liveUrl || undefined}
                            githubUrl={project.githubUrl || undefined}
                            reverse={project.reverse || false}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center mt-10 sm:mt-16"
                >
                    <Button
                        asChild
                        size="lg"
                        className="shadow-md transition-all hover:shadow-lg hover:scale-105"
                    >
                        <Link href="/projects">
                            View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}