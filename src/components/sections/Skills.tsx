
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
        <div className={cn("flex flex-col gap-4 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all", className)}>
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </div>
            <div className="space-y-3">
                {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-xs sm:text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">
                                {skill.level > 8 ? "Expert" : skill.level > 6 ? "Advanced" : skill.level > 4 ? "Intermediate" : "Beginner"}
                            </span>
                        </div>
                        <div className="h-1.5 sm:h-2 w-full bg-muted rounded-full overflow-hidden">
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
        { name: "React", level: 9 },
        { name: "TypeScript", level: 8 },
        { name: "Next.js", level: 8 },
        { name: "TailwindCSS", level: 9 },
        { name: "HTML/CSS", level: 9 },
    ];

    const backendSkills = [
        { name: "Node.js", level: 7 },
        { name: "Express", level: 7 },
        { name: "MongoDB", level: 6 },
        { name: "PostgreSQL", level: 5 },
        { name: "GraphQL", level: 6 },
    ];

    const toolsSkills = [
        { name: "Git", level: 8 },
        { name: "Docker", level: 6 },
        { name: "AWS", level: 5 },
        { name: "CI/CD", level: 7 },
        { name: "Webpack", level: 6 },
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
                        A comprehensive overview of my technical abilities and experience with various tools and technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Layers className="h-4 sm:h-5 w-4 sm:w-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold">Frameworks</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Badge className="text-xs">React</Badge>
                            <Badge className="text-xs">Next.js</Badge>
                            <Badge className="text-xs">Express</Badge>
                            <Badge className="text-xs">Jest</Badge>
                            <Badge className="text-xs">React Native</Badge>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Database className="h-4 sm:h-5 w-4 sm:w-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold">Databases</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Badge className="text-xs">MongoDB</Badge>
                            <Badge className="text-xs">PostgreSQL</Badge>
                            <Badge className="text-xs">MySQL</Badge>
                            <Badge className="text-xs">Firebase</Badge>
                            <Badge className="text-xs">Redis</Badge>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Paintbrush className="h-4 sm:h-5 w-4 sm:w-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold">UI/Design</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Badge className="text-xs">TailwindCSS</Badge>
                            <Badge className="text-xs">Figma</Badge>
                            <Badge className="text-xs">Shadcn UI</Badge>
                            <Badge className="text-xs">Responsive</Badge>
                            <Badge className="text-xs">Accessibility</Badge>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 rounded-xl border bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Server className="h-4 sm:h-5 w-4 sm:w-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold">Cloud Services</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Badge className="text-xs">AWS</Badge>
                            <Badge className="text-xs">Vercel</Badge>
                            <Badge className="text-xs">Netlify</Badge>
                            <Badge className="text-xs">GitHub Actions</Badge>
                            <Badge className="text-xs">CircleCI</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}