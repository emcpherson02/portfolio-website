'use client'

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillListProps {
    skills: string[];
    className?: string;
}

export function SkillList({ skills, className }: SkillListProps) {
    return (
        <ul className={cn("flex flex-wrap gap-2", className)}>
            {skills.map((skill) => (
                <li key={skill}>
                    <Badge variant="secondary" className="text-sm">
                        {skill}
                    </Badge>
                </li>
            ))}
        </ul>
    );
}
