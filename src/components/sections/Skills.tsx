import { cn } from "@/lib/utils";

interface SkillCategoryProps {
    title: string;
    skills: { name: string; level: number }[];
    className?: string;
}

function SkillCategory({ title, skills, className }: SkillCategoryProps) {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <h3 className="text-xl font-semibold">{title}</h3>
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
                                className="h-full bg-primary rounded-full"
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
        <section className="py-20 bg-muted/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Skills & Expertise
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Here&#39;s an overview of my technical skills and proficiency levels.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <SkillCategory title="Frontend Development" skills={frontendSkills} />
                    <SkillCategory title="Backend Development" skills={backendSkills} />
                    <SkillCategory title="Tools & Deployment" skills={toolsSkills} />
                </div>
            </div>
        </section>
    );
}