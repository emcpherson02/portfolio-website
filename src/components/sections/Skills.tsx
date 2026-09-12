'use client'

import {
    Code,
    Database,
    GitBranch,
    Server,
    LineChart,
    CloudCog
} from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    skills: string[];
}

const CATEGORIES: SkillCategory[] = [
    {
        title: "Cloud",
        icon: <CloudCog className="h-4 w-4" />,
        skills: ["AWS", "EKS", "Kubernetes", "Helm", "Terraform", "Docker", "Argo CD", "GitOps", "Istio", "GCP"],
    },
    {
        title: "Observability & Incident Response",
        icon: <LineChart className="h-4 w-4" />,
        skills: ["OpenTelemetry", "Prometheus", "Grafana", "Coralogix", "Honeycomb", "Refinery", "DataDog", "CloudWatch", "incident.io", "PagerDuty"],
    },
    {
        title: "CI/CD",
        icon: <GitBranch className="h-4 w-4" />,
        skills: ["Git", "Jenkins", "GitLab CI", "CircleCI", "Argo Workflows", "Snyk"],
    },
    {
        title: "Backend Development",
        icon: <Server className="h-4 w-4" />,
        skills: ["Go", "Java", "Spring Boot", "Node.js", "Python"],
    },
    {
        title: "Frontend Development",
        icon: <Code className="h-4 w-4" />,
        skills: ["React", "TypeScript", "JavaScript", "Next.js", "TailwindCSS", "HTML/CSS", "Figma"],
    },
    {
        title: "Databases",
        icon: <Database className="h-4 w-4" />,
        skills: ["PostgreSQL", "MongoDB", "Redis", "SQL"],
    },
];

function SkillCategory({ title, icon, skills }: SkillCategory) {
    return (
        <div className="border-t pt-5">
            <h3 className="flex items-center gap-2.5 text-sm font-semibold mb-4">
                <span className="text-primary" aria-hidden="true">{icon}</span>
                {title}
            </h3>
            {/* Light chips on a tinted section ground. The inverse - white
                chips on a near-white section - left nothing between them, and
                muted text on a muted fill was illegible at this size. */}
            <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                    <li
                        key={skill}
                        className="rounded-md border border-border/70 bg-background px-2.5 py-1 font-mono text-[13px] leading-5 text-foreground shadow-sm transition-colors hover:border-foreground/25"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="w-full py-20 sm:py-28 bg-muted/40 scroll-mt-16">
            <div className="container">
                <SectionHeader label="Expertise" title="Skills & Technologies" />

                {/* Rules and space rather than six bordered cards, which turned a
                    list of tags into a grid of boxes. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
                    {CATEGORIES.map((category) => (
                        <SkillCategory key={category.title} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
