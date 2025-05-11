import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    reverse?: boolean;
}

function ProjectCard({
                         title,
                         description,
                         imageSrc,
                         tags,
                         liveUrl,
                         githubUrl,
                         reverse = false,
                     }: ProjectCardProps) {
    return (
        <div className={cn(
            "group relative rounded-xl border overflow-hidden transition-all hover:border-primary/50 hover:shadow-md",
        )}>
            <div className="flex flex-col lg:flex-row gap-0 h-full">
                {/* Project Image */}
                <div className={cn(
                    "relative w-full lg:w-1/2 h-[240px] lg:h-auto overflow-hidden bg-muted/50",
                    reverse ? "lg:order-last" : ""
                )}>
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={title}
                            className="object-cover transition-transform group-hover:scale-105"
                            fill
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted">
                            <div className="text-muted-foreground">Project Image</div>
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div className={cn(
                    "w-full lg:w-1/2 p-6 lg:p-8 flex flex-col h-full bg-card",
                )}>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-auto">
                        {liveUrl && (
                            <Button asChild size="sm">
                                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                            </Button>
                        )}
                        {githubUrl && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    GitHub <Github className="ml-1 h-3 w-3" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FeaturedProjects() {
    const projects = [
        {
            title: "StudentWallet",
            description: "StudentWallet is a comprehensive financial management system designed specifically for university students. It allows students to track their spending, manage budgets, monitor their maintenance loan, and integrate their bank accounts via Plaid.",
            imageSrc: "/../projects/StudentWallet-ui.png",
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
        }
    ];

    return (
        <section className="py-20 bg-background" id="projects">
            <div className="container">
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <div>
                            <Badge variant="outline" className="mb-4">My Work</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-muted-foreground max-w-2xl">
                                A showcase of my recent development work, featuring full-stack applications built with modern technologies.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            imageSrc={project.imageSrc}
                            tags={project.tags}
                            liveUrl={project.liveUrl}
                            githubUrl={project.githubUrl}
                            reverse={project.reverse}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/projects">
                            View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
