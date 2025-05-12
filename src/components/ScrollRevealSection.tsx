'use client'

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollRevealSectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
    staggerChildren?: number;
    threshold?: number;
    animation?: 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'zoom' | 'none';
}

/**
 * A wrapper component that animates its children when scrolled into view
 */
export function ScrollRevealSection({
                                        children,
                                        id,
                                        className = "",
                                        delay = 0,
                                        staggerChildren = 0.1,
                                        threshold = 0.2,
                                        animation = 'slide-up'
                                    }: ScrollRevealSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);

    // Define animation variants
    const getVariants = (): Variants => {
        switch (animation) {
            case 'fade':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case 'slide-up':
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                };
            case 'slide-right':
                return {
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 }
                };
            case 'slide-left':
                return {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                };
            case 'zoom':
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                };
            case 'none':
            default:
                return {
                    hidden: { opacity: 1 },
                    visible: { opacity: 1 }
                };
        }
    };

    // Child variants with staggered animation
    const childVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Container transitions
    const containerTransition = {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Easing function for smooth animation
        staggerChildren: staggerChildren
    };

    useEffect(() => {
        if (isInView && !hasAnimated) {
            controls.start('visible');
            setHasAnimated(true);
        }
    }, [isInView, controls, hasAnimated]);

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            initial="hidden"
            animate={controls}
            variants={getVariants()}
            transition={containerTransition}
        >
            {React.Children.map(children, (child, index) => {
                // If the child is a React element, wrap it with motion.div
                if (React.isValidElement(child) && staggerChildren > 0) {
                    return (
                        <motion.div
                            key={index}
                            variants={childVariants}
                            transition={{
                                delay: delay + (index * staggerChildren),
                                duration: 0.4
                            }}
                        >
                            {child}
                        </motion.div>
                    );
                }
                return child;
            })}
        </motion.div>
    );
}