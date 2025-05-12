'use client'

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
    progress: number;
    height?: number;
    colorClass?: string;
    bgClass?: string;
    className?: string;
    showLabel?: boolean;
    animate?: boolean;
    duration?: number;
}

export function ProgressBar({
                                progress,
                                height = 8,
                                colorClass = "bg-primary",
                                bgClass = "bg-muted",
                                className,
                                showLabel = false,
                                animate = true,
                                duration = 1
                            }: ProgressBarProps) {
    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Loading</span>
                    <span className="text-xs font-medium">{Math.round(progress)}%</span>
                </div>
            )}
            <div
                className={cn("w-full rounded-full overflow-hidden", bgClass)}
                style={{ height }}
            >
                <motion.div
                    className={cn("h-full rounded-full", colorClass)}
                    initial={animate ? { width: 0 } : { width: `${progress}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: animate ? duration : 0,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
}