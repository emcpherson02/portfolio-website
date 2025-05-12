'use client'

import { motion } from "framer-motion";
import { File, CheckCircle } from "lucide-react";
import { ProgressBar } from "@/components/resume/ProgressBar";
import { useState, useEffect } from "react";

interface ResumeLoadingProps {
    onComplete: () => void;
}

export function ResumeLoading({ onComplete }: ResumeLoadingProps) {
    const [progress, setProgress] = useState(0);

    // Animate progress from 0 to 100 over time
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                // Accelerate towards the end
                const step = prevProgress < 70 ? 2 : (prevProgress < 90 ? 1 : 0.5);
                const newProgress = prevProgress + step;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        onComplete();
                    }, 500);
                    return 100;
                }

                return newProgress;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    // Animation sequence steps
    const steps = [
        "Loading resume...",
        "Parsing experience...",
        "Formatting skills...",
        "Preparing timeline...",
        "Finalizing layout...",
        "Ready!"
    ];

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <motion.div
                className="bg-card border shadow-lg rounded-xl p-8 max-w-md w-full flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="mb-6 bg-primary/10 p-4 rounded-full"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <File className="h-10 w-10 text-primary" />
                </motion.div>

                <h2 className="text-xl font-bold mb-6">Loading Resume</h2>

                <div className="w-full space-y-3 mb-6">
                    {steps.map((step, index) => {
                        // Calculate when each step should appear based on progress
                        const stepProgress = (index + 1) * (100 / steps.length);
                        const isVisible = progress >= stepProgress;

                        return (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                    opacity: isVisible ? 1 : 0,
                                    x: isVisible ? 0 : -10
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                            >
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>{step}</span>
                            </motion.div>
                        );
                    })}
                </div>

                <ProgressBar
                    progress={progress}
                    height={6}
                    showLabel={true}
                    duration={0.2}
                    className="w-full"
                />
            </motion.div>
        </div>
    );
}