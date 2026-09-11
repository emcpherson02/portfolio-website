'use client'

import { Badge } from "@/components/ui/badge";
import {
    Code,
    Database,
    GitBranch,
    Server,
    LineChart,
    CloudCog
} from "lucide-react";

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: string[];
}

function SkillCategory({ title, icon, skills }: SkillCategoryProps) {
    return (
        <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl border bg-card">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary" aria-hidden="true">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </div>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((skill) => (
                    <li key={skill}>
                        <Badge variant="secondary" className="text-xs">
                            {skill}
                        </Badge>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const CATEGORIES: SkillCategoryProps[] = [
    {
        title: "Frontend Development",
        icon: <Code className="h-5 w-5" />,
        skills: ["React", "TypeScript", "JavaScript", "Next.js", "TailwindCSS", "HTML/CSS", "Flutter", "Responsive Design", "Figma"],
    },
    {
        title: "Backend Development",
        icon: <Server className="h-5 w-5" />,
        skills: ["Java", "Spring Boot", "Node.js", "Express", "Python", "C++", "REST APIs", "Swift"],
    },
    {
        title: "Testing & CI/CD",
        icon: <GitBranch className="h-5 w-5" />,
        skills: ["Git", "Jenkins", "GitLab CI", "Maven", "Mockito", "Jest / Supertest", "Cucumber (Gherkin)", "LocalStack", "TDD", "Pair Programming"],
    },
    {
        title: "Cloud & Deployment",
        icon: <CloudCog className="h-5 w-5" />,
        skills: ["AWS", "GCP", "Kubernetes", "Spinnaker", "Terraform", "Docker", "Cloud Run", "Firestore", "ElastiCache", "Lambda", "EC2", "SQS", "SNS", "S3", "CloudFront"],
    },
    {
        title: "Databases",
        icon: <Database className="h-5 w-5" />,
        skills: ["NoSQL", "MongoDB", "SQL", "DynamoDB"],
    },
    {
        title: "Monitoring & Security",
        icon: <LineChart className="h-5 w-5" />,
        skills: ["Snyk", "Wireshark", "DataDog", "IDA", "CloudWatch", "k9s"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="w-full py-16 sm:py-20 bg-muted/20 scroll-mt-16">
            <div className="container">
                <div className="mb-10 sm:mb-16">
                    <Badge variant="outline" className="mb-4">Expertise</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Skills &amp; Technologies
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A comprehensive overview of my technical abilities and experience with various tools and technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {CATEGORIES.map((category) => (
                        <SkillCategory key={category.title} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
