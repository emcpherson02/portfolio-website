'use client'

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillListProps {
    skills: string[];
    className?: string;
    delay?: number;
}

export function SkillList({
                              skills,
                              className,
                              delay = 0
                          }: SkillListProps) {
    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {skills.map((skill, index) => (
                <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + (index * 0.05),
                        ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                >
                    <Badge
                        variant="secondary"
                        className="text-sm"
                    >
                        {skill}
                    </Badge>
                </motion.div>
            ))}
        </div>
    );
}