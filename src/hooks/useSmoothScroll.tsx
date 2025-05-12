'use client'

import { useCallback } from 'react';

interface SmoothScrollOptions {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
}

/**
 * A hook that provides smooth scrolling functionality to elements
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}) {
    const {
        offset = 80,
        duration = 800,
        easing = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) // Default easing function (easeInOutQuad)
    } = options;

    // Linear interpolation function
    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const scrollTo = useCallback(
        (targetId: string) => {
            // Remove # if present
            const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
            const targetElement = document.getElementById(id);

            if (!targetElement) {
                console.warn(`Element with id "${id}" not found.`);
                return;
            }

            const startPosition = window.scrollY;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
            let startTime: number | null = null;

            const animateScroll = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easing(progress);

                window.scrollTo(0, lerp(startPosition, targetPosition, easedProgress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        },
        [offset, duration, easing]
    );

    return { scrollTo };
}