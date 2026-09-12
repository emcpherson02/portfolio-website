'use client'

import { MotionConfig } from "motion/react";

/**
 * Honours the OS "reduce motion" setting across every Motion animation in the
 * tree, so individual components do not each have to check it.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
