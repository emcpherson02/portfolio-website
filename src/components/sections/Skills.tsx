'use client'

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Code,
    Database,
    GitBranch,
    Server,
    LineChart,
    CloudCog
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
    name: string;
    highlight?: boolean;
}

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: Skill[];
    className?: string;
    delay?: number;
}

function SkillCategory({ title, icon, skills, className, delay = 0 }: SkillCategoryProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className={cn("flex flex-col gap-4 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all", className)}
        >
            <div className="flex items-center gap-3">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, delay: delay + 0.2 }}
                    className="p-2 rounded-lg bg-primary/10 text-primary"
                >
                    {icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.4,
                            delay: delay + 0.3 + (index * 0.05),
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}
                    >
                        <Badge
                            variant={skill.highlight ? "default" : "secondary"}
                            className={cn(
                                "text-xs",
                                skill.highlight && "shadow-sm"
                            )}
                        >
                            {skill.name}
                        </Badge>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    // Custom skill lists
    const frontendSkills = [
        { name: "React" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Next.js" },
        { name: "TailwindCSS" },
        { name: "HTML/CSS" },
        { name: "Flutter" },
        { name: "Responsive Design" },
        { name: "Figma" }
    ];

    const backendSkills = [
        { name: "Java" },
        { name: "Spring Boot" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "Python" },
        { name: "C++" },
        { name: "RESTful" },
        { name: "Swift" }
    ];

    const testingCiCdSkills = [
        { name: "Git" },
        { name: "Jenkins" },
        { name: "GitLab CI" },
        { name: "Maven" },
        { name: "Mockito" },
        { name: "Jest / supertest" },
        { name: "Cucumber (gherkin)" },
        { name: "LocalStack" },
        { name: "TDD" },
        { name: "Pair Programming" }
    ];

    const deploymentSkills = [
        { name: "AWS" },
        { name: "GCP" },
        { name: "Kubernetes" },
        { name: "Spinnaker" },
        { name: "Terraform" },
        { name: "Docker" },
        { name: "CloudRun" },
        { name: "Firestore" },
        { name: "ElastiCache" },
        { name: "Lambda" },
        { name: "EC2" },
        { name: "SQS" },
        { name: "SNS" },
        { name: "S3" }
    ];

    const databaseSkills = [
        { name: "NoSQL" },
        { name: "MongoDB" },
        { name: "SQL" },
        { name: "DynamoDB" }
    ];

    const monitoringSkills = [
        { name: "Snyk" },
        { name: "Wireshark" },
        { name: "DataDog" },
        { name: "IDA" },
        { name: "CloudWatch" },
        { name: "K9S" }
    ];

    return (
        <section id="skills" className="w-full py-16 sm:py-20 bg-muted/20">
            <div className="container" ref={sectionRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-16"
                >
                    <Badge variant="outline" className="mb-4">Expertise</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A comprehensive overview of my technical abilities and experience with various tools and technologies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <SkillCategory
                        title="Frontend Development"
                        icon={<Code className="h-5 w-5" />}
                        skills={frontendSkills}
                        delay={0.1}
                    />
                    <SkillCategory
                        title="Backend Development"
                        icon={<Server className="h-5 w-5" />}
                        skills={backendSkills}
                        delay={0.2}
                    />
                    <SkillCategory
                        title="Testing & CI/CD"
                        icon={<GitBranch className="h-5 w-5" />}
                        skills={testingCiCdSkills}
                        delay={0.3}
                    />
                </div>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SkillCategory
                        title="Cloud & Deployment"
                        icon={<CloudCog className="h-5 w-5" />}
                        skills={deploymentSkills}
                        delay={0.4}
                    />
                    <SkillCategory
                        title="Databases"
                        icon={<Database className="h-5 w-5" />}
                        skills={databaseSkills}
                        delay={0.5}
                    />
                    <SkillCategory
                        title="Monitoring & Security"
                        icon={<LineChart className="h-5 w-5" />}
                        skills={monitoringSkills}
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
}