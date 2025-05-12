'use client'

import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollButtonProps {
    scrollToTop?: boolean;
    className?: string;
}

export function ScrollButton({ scrollToTop = true, className }: ScrollButtonProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when page is scrolled down sufficiently
            const scrollY = window.scrollY;
            const pageHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;

            if (scrollToTop) {
                // For the "scroll to top" button, show when scrolled down
                setIsVisible(scrollY > 500);
            } else {
                // For the "scroll to bottom" button, hide when near the bottom of the page
                const isNearBottom = scrollY + viewportHeight > pageHeight - 300;
                setIsVisible(!isNearBottom && scrollY < 500);
            }
        };

        // Initial check
        handleScroll();

        // Add scroll listener
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollToTop]);

    const handleClick = () => {
        if (scrollToTop) {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            // Scroll to the next section or further down
            const currentPosition = window.scrollY;
            const viewportHeight = window.innerHeight;

            window.scrollTo({
                top: currentPosition + viewportHeight,
                behavior: "smooth"
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed right-6 z-40 ${scrollToTop ? 'bottom-6' : 'top-20'} ${className}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        onClick={handleClick}
                        size="icon"
                        className="rounded-full h-12 w-12 shadow-md bg-primary/90 hover:bg-primary"
                        aria-label={scrollToTop ? "Scroll to top" : "Scroll down"}
                    >
                        {scrollToTop ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}