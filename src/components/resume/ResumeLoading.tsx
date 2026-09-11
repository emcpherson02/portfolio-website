'use client'

import { motion, useReducedMotion } from "motion/react";
import { File } from "lucide-react";
import { ProgressBar } from "@/components/resume/ProgressBar";
import { useState, useEffect } from "react";

interface ResumeLoadingProps {
    onComplete: () => void;
}

const DURATION_MS = 1200;

export function ResumeLoading({ onComplete }: ResumeLoadingProps) {
    const [progress, setProgress] = useState(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) {
            onComplete();
            return;
        }

        // Driven by elapsed wall-clock time rather than counting ticks. A tick
        // counter stretches to minutes in a background tab, where timers are
        // clamped to >=1s - which is exactly how a link gets opened.
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const elapsed = now - start;
            setProgress(Math.min(100, (elapsed / DURATION_MS) * 100));

            if (elapsed < DURATION_MS) {
                frame = requestAnimationFrame(tick);
            } else {
                onComplete();
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [onComplete, reducedMotion]);

    if (reducedMotion) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-label="Loading resume"
        >
            <div className="bg-card border shadow-lg rounded-xl p-8 max-w-md w-full flex flex-col items-center">
                <div className="mb-6 bg-primary/10 p-4 rounded-full">
                    <File className="h-10 w-10 text-primary" />
                </div>

                <p className="text-xl font-bold mb-6">Loading Resume</p>

                <ProgressBar
                    progress={progress}
                    height={6}
                    showLabel={false}
                    duration={0.1}
                    className="w-full"
                />
            </div>
        </motion.div>
    );
}
