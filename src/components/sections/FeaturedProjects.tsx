import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {ArrowUpRight, Github} from "lucide-react";

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
        <div
            className={cn(
                "flex flex-col gap-8 md:gap-12 md:items-center",
                reverse ? "md:flex-row-reverse" : "md:flex-row"
            )}
        >
            {/* Project Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden rounded-lg border">
                <Image
                    src={imageSrc}
                    alt={title}
                    className="object-cover"
                    fill
                    priority
                />
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/2 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-muted-foreground mb-6">{description}</p>

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
                        <Button asChild>
                            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    {githubUrl && (
                        <Button asChild variant="outline">
                            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                GitHub <Github className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function FeaturedProjects() {
    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Description
                    </p>
                </div>

                <div className="flex flex-col gap-24">
                    <ProjectCard
                        title="Project One"
                        description=""
                        imageSrc=""
                        tags={[""]}
                        liveUrl=""
                        githubUrl=""
                    />

                    <ProjectCard
                        title="Project Two"
                        description=""
                        imageSrc=""
                        tags={[""]}
                        liveUrl=""
                        githubUrl=""
                        reverse
                    />

                    <ProjectCard
                        title="Project Three"
                        description=""
                        imageSrc=""
                        tags={[""]}
                        liveUrl=""
                        githubUrl=""
                    />
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