'use client'

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CVTitleProps {
    name?: string;
    label?: string;
    className?: string;
    delay?: number;
}

/**
 * The page masthead. Carries the h1, so the eyebrow above it is a label
 * rather than a heading - the name is what the page is about.
 */
export function CVTitle({
                            name = "Elliott McPherson",
                            label = "Curriculum Vitae",
                            className,
                            delay = 0
                        }: CVTitleProps) {
    return (
        <div className={cn("flex flex-col items-start", className)}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {label}
            </p>

            <div className="relative inline-block">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {name}
                </h1>

                {/* Animates width rather than opacity, so the text beneath is
                    never hidden in the exported HTML. */}
                <motion.span
                    aria-hidden="true"
                    className="block h-1 bg-primary rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: delay + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
}
