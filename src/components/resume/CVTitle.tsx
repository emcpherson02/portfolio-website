'use client'

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CVTitleProps {
    title?: string;
    subtitle?: string;
    className?: string;
    delay?: number;
}

export function CVTitle({
                            title = "CURRICULUM VITAE",
                            subtitle = "ELLIOTT MCPHERSON",
                            className,
                            delay = 0
                        }: CVTitleProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div className="relative mb-4">
                <p className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                    {title}
                </p>

                {/* Animating width rather than opacity, so the text underneath is
                    never hidden in the exported HTML. */}
                <motion.div
                    className="h-1 bg-primary rounded-full mt-1"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: delay + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
    );
}
