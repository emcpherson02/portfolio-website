
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Database,
    Server,
    FileCode,
    Laptop,
    Wrench,
    Cloud
} from "lucide-react";

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: string[];
    className?: string;
}

function SkillCategory({ title, icon, skills, className }: SkillCategoryProps) {
    return (
        <div className={cn(
            "flex flex-col gap-4 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all",
            className
        )}>
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export function Skills() {
    const frontendSkills = [
        "React",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "TailwindCSS",
        "HTML/CSS",
        "Flutter",
        "Responsive Design",
        "Figma"
    ];

    const backendSkills = [
        "Java",
        "Spring Boot",
        "Node.js",
        "Express",
        "Python",
        "C++",
        "RESTful",
        "Swift"
    ];

    const testingCiCdSkills = [
        "Git",
        "Jenkins",
        "GitLab CI",
        "Maven",
        "Mockito",
        "Jest / supertest",
        "Cucumber (gherkin)",
        "LocalStack",
        "TDD",
        "Pair Programming"
    ];

    const deploymentSkills = [
        "AWS",
        "GCP",
        "Kubernetes",
        "Spinnaker",
        "Terraform",
        "Docker",
        "CloudRun",
        "Firestore",
        "ElastiCache",
        "Lambda",
        "EC2",
        "SQS",
        "SNS",
        "S3"
    ];

    const databaseSkills = [
        "NoSQL",
        "MongoDB",
        "SQL",
        "DynamoDB"
    ];

    const monitoringSkills = [
        "Snyk",
        "Wireshark",
        "DataDog",
        "IDA",
        "CloudWatch",
        "K9S"
    ];

    return (
        <section id="skills" className="w-full py-16 sm:py-20 bg-muted/20">
            <div className="container">
                <div className="mb-10 sm:mb-16">
                    <Badge variant="outline" className="mb-4">Expertise</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A comprehensive overview of my technical abilities and experience across various domains of software development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <SkillCategory
                        title="Frontend Development"
                        icon={<Laptop className="h-5 w-5" />}
                        skills={frontendSkills}
                    />
                    <SkillCategory
                        title="Backend Development"
                        icon={<Server className="h-5 w-5" />}
                        skills={backendSkills}
                    />
                    <SkillCategory
                        title="Testing & CI/CD"
                        icon={<FileCode className="h-5 w-5" />}
                        skills={testingCiCdSkills}
                    />
                    <SkillCategory
                        title="Deployment & Cloud"
                        icon={<Cloud className="h-5 w-5" />}
                        skills={deploymentSkills}
                    />
                    <SkillCategory
                        title="Databases"
                        icon={<Database className="h-5 w-5" />}
                        skills={databaseSkills}
                    />
                    <SkillCategory
                        title="Monitoring & Security"
                        icon={<Wrench className="h-5 w-5" />}
                        skills={monitoringSkills}
                    />
                </div>
            </div>
        </section>
    );
}