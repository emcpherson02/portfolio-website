// src/components/resume/InteractiveTimeline.tsx
'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Building, GraduationCap, Code } from "lucide-react";

interface TimelineEvent {
    id: string;
    title: string;
    organization: string;
    date: string;
    category: 'education' | 'work' | 'project';
    description: string[];
    icon?: React.ReactNode;
}

interface InteractiveTimelineProps {
    events: TimelineEvent[];
    className?: string;
}

export function InteractiveTimeline({ events, className }: InteractiveTimelineProps) {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);

    // Group events by year
    const eventsByYear = events.reduce<Record<string, TimelineEvent[]>>((acc, event) => {
        // Extract year from date
        const year = event.date.split(' ').pop() || '';
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(event);
        return acc;
    }, {});

    // Sort years in descending order
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

    const getIconForCategory = (category: string, isActive: boolean = false) => {
        const iconClass = cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground");

        switch (category) {
            case 'education':
                return <GraduationCap className={iconClass} />;
            case 'work':
                return <Building className={iconClass} />;
            case 'project':
                return <Code className={iconClass} />;
            default:
                return <Calendar className={iconClass} />;
        }
    };

    return (
        <div className={cn("relative", className)}>
            {/* Main Timeline */}
            <div className="border-l-2 border-muted ml-3 pl-8 space-y-8">
                {sortedYears.map((year) => (
                    <div key={year} className="relative">
                        {/* Year label */}
                        <div className="absolute -left-11 bg-muted rounded-full px-2 py-1 text-xs font-semibold">
                            {year}
                        </div>

                        <div className="space-y-6">
                            {eventsByYear[year].map((event) => {
                                const isActive = activeEvent === event.id;

                                return (
                                    <motion.div
                                        key={event.id}
                                        className={cn(
                                            "relative cursor-pointer p-4 rounded-lg transition-all",
                                            isActive
                                                ? "bg-primary/5 border border-primary/20 shadow-sm"
                                                : "hover:bg-muted/30"
                                        )}
                                        onClick={() => setActiveEvent(isActive ? null : event.id)}
                                        whileHover={{ x: 2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Icon circle - fixed positioning */}
                                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border border-muted flex items-center justify-center">
                                            {event.icon || getIconForCategory(event.category, isActive)}
                                        </div>

                                        {/* Title and date row */}
                                        <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 mb-1">
                                            <h3 className={cn(
                                                "font-medium",
                                                isActive ? "text-primary" : ""
                                            )}>
                                                {event.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {event.date}
                                            </span>
                                        </div>

                                        {/* Organization */}
                                        <p className="text-sm text-muted-foreground">{event.organization}</p>

                                        {/* Expanded content */}
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-3 text-sm"
                                            >
                                                <ul className="space-y-2 list-disc pl-4">
                                                    {event.description.map((desc, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + (index * 0.05) }}
                                                            className="text-muted-foreground"
                                                        >
                                                            {desc}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}