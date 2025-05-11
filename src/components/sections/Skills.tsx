import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Layers, GitBranch, Server, Paintbrush } from "lucide-react";

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: { name: string; level: number }[];
    className?: string;
}

function SkillCategory({ title, icon, skills, className }: SkillCategoryProps) {
    return (
        <div className={cn("flex flex-col gap-4 p-6 rounded-xl border bg-card hover:shadow-md transition-all", className)}>
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="space-y-3">
                {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">
                                {skill.level > 8 ? "Expert" : skill.level > 6 ? "Advanced" : skill.level > 4 ? "Intermediate" : "Beginner"}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all rounded-full"
                                style={{ width: `${skill.level * 10}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Skills() {
    const frontendSkills = [
        { name: "React", level: 8 },
        { name: "TypeScript", level: 6 },
        { name: "Javascript", level: 8 },
        { name: "TailwindCSS", level: 7 },
        { name: "HTML/CSS", level: 7 },
    ];

    const backendSkills = [
        { name: "Java", level: 8 },
        { name: "Node.js", level: 7 },
        { name: "Python", level: 6 },
        { name: "NoSQL", level: 8 },
        { name: "TTD", level: 8 },
    ];

    const toolsSkills = [
        { name: "Git", level: 8 },
        { name: "Docker", level: 8 },
        { name: "AWS", level: 7 },
        { name: "CI/CD", level: 6 },
        { name: "GCP", level: 6 },
    ];

    return (
        <section id="skills" className="py-20 bg-muted/20">
            <div className="container">
                <div className="mb-16">
                    <Badge variant="outline" className="mb-4">Expertise</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A comprehensive overview of my technical abilities and experience with various tools and technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillCategory
                        title="Frontend Development"
                        icon={<Code className="h-5 w-5" />}
                        skills={frontendSkills}
                    />
                    <SkillCategory
                        title="Backend Development"
                        icon={<Server className="h-5 w-5" />}
                        skills={backendSkills}
                    />
                    <SkillCategory
                        title="Tools & Deployment"
                        icon={<GitBranch className="h-5 w-5" />}
                        skills={toolsSkills}
                    />
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Layers className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">Frameworks</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge>React</Badge>
                            <Badge>Next.js</Badge>
                            <Badge>Express</Badge>
                            <Badge>Jest</Badge>
                            <Badge>Springboot</Badge>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Database className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">Databases</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge>MongoDB</Badge>
                            <Badge>PostgreSQL</Badge>
                            <Badge>MySQL</Badge>
                            <Badge>Firebase</Badge>
                            <Badge>Redis</Badge>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Paintbrush className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">UI/Design</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge>TailwindCSS</Badge>
                            <Badge>Figma</Badge>
                            <Badge>Shadcn UI</Badge>
                            <Badge>CSS</Badge>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Server className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">Cloud Services</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge>AWS</Badge>
                            <Badge>GPC</Badge>
                            <Badge>GitHub Actions</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}