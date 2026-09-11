'use client'

import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useInView, type Variants, type Transition } from 'motion/react';

interface ScrollRevealSectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
    animation?: 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'zoom' | 'none';
}

const VARIANTS: Record<NonNullable<ScrollRevealSectionProps['animation']>, Variants> = {
    'fade': {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    'slide-up': {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    'slide-right': {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    'slide-left': {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    'zoom': {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    'none': {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    },
};

const subscribeToNothing = () => () => {};

/**
 * Reveals its children when scrolled into view.
 */
export function ScrollRevealSection({
                                        children,
                                        id,
                                        className = "",
                                        delay = 0,
                                        animation = 'slide-up'
                                    }: ScrollRevealSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    // "some" rather than a fraction: `amount` is measured against the element,
    // not the viewport, so a fraction can never be satisfied by a section
    // taller than 1/amount viewports - it would stay hidden forever.
    const isInView = useInView(ref, { once: true, amount: "some" });

    // False on the server and during the first client render, so the exported
    // HTML carries the visible state instead of opacity:0. Without this, the
    // static files render blank to crawlers and to any client whose JS fails.
    const hydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);

    const transition: Transition = {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
    };

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            initial={false}
            animate={!hydrated || isInView ? 'visible' : 'hidden'}
            variants={VARIANTS[animation]}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}
