'use client'

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
    threshold?: number;
    once?: boolean;
    delay?: number;
}

interface ScrollAnimationResult {
    ref: React.RefObject<HTMLDivElement>;
    isInView: boolean;
    hasAnimated: boolean;
    animationClass: string;
}

/**
 * A hook that detects when an element is in view and triggers animations
 */
export function useScrollAnimation({
                                       threshold = 0.2,
                                       once = true,
                                       delay = 0
                                   }: UseScrollAnimationOptions = {}): ScrollAnimationResult {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [animationClass, setAnimationClass] = useState('opacity-0');

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(true);
                setAnimationClass('animate-fade-in-up');
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [isInView, hasAnimated, delay]);

    return { ref, isInView, hasAnimated, animationClass };
}

/**
 * A variant of useScrollAnimation that accepts different animation types
 */
export function useScrollAnimationWithType(
    type: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'none' = 'fade-up',
    options: UseScrollAnimationOptions = {}
): ScrollAnimationResult {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: options.once ?? true, amount: options.threshold ?? 0.2 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [animationClass, setAnimationClass] = useState(() => {
        // Initial classes based on animation type
        switch (type) {
            case 'fade-in':
                return 'opacity-0';
            case 'fade-up':
                return 'opacity-0 translate-y-8';
            case 'fade-down':
                return 'opacity-0 -translate-y-8';
            case 'fade-left':
                return 'opacity-0 translate-x-8';
            case 'fade-right':
                return 'opacity-0 -translate-x-8';
            case 'zoom-in':
                return 'opacity-0 scale-95';
            case 'none':
            default:
                return '';
        }
    });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(true);
                // Animation end state
                switch (type) {
                    case 'fade-in':
                        setAnimationClass('opacity-100 transition-opacity duration-700');
                        break;
                    case 'fade-up':
                        setAnimationClass('opacity-100 translate-y-0 transition-all duration-700');
                        break;
                    case 'fade-down':
                        setAnimationClass('opacity-100 translate-y-0 transition-all duration-700');
                        break;
                    case 'fade-left':
                        setAnimationClass('opacity-100 translate-x-0 transition-all duration-700');
                        break;
                    case 'fade-right':
                        setAnimationClass('opacity-100 translate-x-0 transition-all duration-700');
                        break;
                    case 'zoom-in':
                        setAnimationClass('opacity-100 scale-100 transition-all duration-700');
                        break;
                    case 'none':
                    default:
                        setAnimationClass('');
                }
            }, (options.delay ?? 0) * 1000);

            return () => clearTimeout(timer);
        }
    }, [isInView, hasAnimated, options.delay, type]);

    return { ref, isInView, hasAnimated, animationClass };
}