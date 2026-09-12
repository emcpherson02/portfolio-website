'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Building, GraduationCap, Code } from "lucide-react";

export interface TimelineEvent {
    id: string;
    title: string;
    organization: string;
    /** Display string, e.g. "Jun 2023 – Jun 2024". Not parsed. */
    date: string;
    /**
     * Year this entry is filed under: the start year for a role, the year
     * completed for a qualification. Drives grouping and ordering.
     */
    year: number;
    category: 'education' | 'work' | 'project';
    description: string[];
    icon?: React.ReactNode;
}

export interface InteractiveTimelineProps {
    events: TimelineEvent[];
    className?: string;
}

function getIconForCategory(category: TimelineEvent['category'], isActive: boolean) {
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
}

export function InteractiveTimeline({ events, className }: InteractiveTimelineProps) {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);

    const eventsByYear = events.reduce<Record<number, TimelineEvent[]>>((acc, event) => {
        (acc[event.year] ??= []).push(event);
        return acc;
    }, {});

    const sortedYears = Object.keys(eventsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className={cn("relative", className)}>
            <div className="border-l-2 border-muted ml-6 pl-8 space-y-8">
                {sortedYears.map((year) => (
                    <div key={year} className="relative">
                        <div className="absolute -left-14 -top-1 bg-muted rounded-full px-3 py-1 text-xs font-semibold">
                            {year}
                        </div>

                        <div className="space-y-6">
                            {eventsByYear[year].map((event) => {
                                const isActive = activeEvent === event.id;
                                const panelId = `${event.id}-panel`;

                                return (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            "relative p-4 rounded-lg transition-colors",
                                            isActive
                                                ? "bg-primary/5 border border-primary/20 shadow-sm"
                                                : "border border-transparent hover:bg-muted/30"
                                        )}
                                    >
                                        <div className="absolute -left-12 top-5 h-6 w-6 rounded-full bg-background border border-muted flex items-center justify-center">
                                            {event.icon || getIconForCategory(event.category, isActive)}
                                        </div>

                                        {/* A real button, so the CV is reachable by keyboard and
                                            announced as an expandable disclosure. */}
                                        <h3 className="font-medium text-base md:text-lg">
                                            <button
                                                type="button"
                                                onClick={() => setActiveEvent(isActive ? null : event.id)}
                                                aria-expanded={isActive}
                                                aria-controls={panelId}
                                                className={cn(
                                                    "w-full text-left flex flex-col md:flex-row md:justify-between md:items-center gap-1",
                                                    "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                    isActive ? "text-primary" : ""
                                                )}
                                            >
                                                <span>{event.title}</span>
                                                <span className="text-xs font-normal text-muted-foreground whitespace-nowrap">
                                                    {event.date}
                                                </span>
                                            </button>
                                        </h3>

                                        <p className="text-sm text-muted-foreground mt-2">{event.organization}</p>

                                        {/* Always rendered, so the detail of each role is present
                                            in the exported HTML for crawlers and link previews.
                                            `hidden` keeps it out of the accessibility tree while
                                            collapsed - which conditional rendering would do too,
                                            but at the cost of it not being in the page at all. */}
                                        <div id={panelId} hidden={!isActive} className="text-sm">
                                            <ul className="space-y-2 list-disc pl-4 mt-3">
                                                {event.description.map((desc) => (
                                                    <li key={desc} className="text-muted-foreground">
                                                        {desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
