'use client'

import { motion } from "framer-motion";
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

    // Character animation for text reveal
    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: delay + (i * 0.05),
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    return (
        <motion.div
            className={cn(
                "flex flex-col items-center justify-center",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="relative mb-4">
                {/* The title text */}
                <div className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                    {title.split('').map((char, index) => (
                        <motion.span
                            key={`title-${index}`}
                            custom={index}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </div>

                {/* Animated underline */}
                <motion.div
                    className="h-1 bg-primary rounded-full mt-1"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{
                        delay: delay + (title.length * 0.05) + 0.2,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                />
            </div>

            {/* Subtitle with staggered animation */}
            <div className="text-xl text-muted-foreground">
                {subtitle.split('').map((char, index) => (
                    <motion.span
                        key={`subtitle-${index}`}
                        custom={index}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                        style={{
                            transitionDelay: `${delay + (title.length * 0.05) + 0.5 + (index * 0.03)}s`
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}