'use client'

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillProgressProps {
    name: string;
    value: number;
    colorClass?: string;
    className?: string;
    delay?: number;
}

export function SkillProgress({
                                  name,
                                  value,
                                  colorClass = "bg-primary",
                                  className,
                                  delay = 0
                              }: SkillProgressProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{value}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    className={cn("h-full rounded-full", colorClass)}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{
                        duration: 1,
                        delay: delay,
                        ease: "easeOut"
                    }}
                />
            </div>
        </div>
    );
}

interface SkillGroupProps {
    title: string;
    skills: { name: string; value: number }[];
    className?: string;
    delay?: number;
}

export function SkillGroup({ title, skills, className, delay = 0 }: SkillGroupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn("space-y-4", className)}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="space-y-3">
                {skills.map((skill, index) => (
                    <SkillProgress
                        key={skill.name}
                        name={skill.name}
                        value={skill.value}
                        delay={delay + 0.1 + (index * 0.1)}
                    />
                ))}
            </div>
        </motion.div>
    );
}