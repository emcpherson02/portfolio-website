'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Building, GraduationCap, Code, ChevronDown } from "lucide-react";

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

const CATEGORY_ICON = {
    education: GraduationCap,
    work: Building,
    project: Code,
} as const;

function CategoryIcon({ category, className }: { category: TimelineEvent['category']; className?: string }) {
    const Icon = CATEGORY_ICON[category] ?? Calendar;
    return <Icon className={className} aria-hidden="true" />;
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
            {/* One continuous rail behind everything, rather than a border on a
                container the markers then have to be pulled back over with
                negative offsets. */}
            <span
                aria-hidden="true"
                className="absolute left-[11px] top-3 bottom-3 w-px bg-border print:hidden"
            />

            <div className="space-y-8">
                {sortedYears.map((year) => (
                    <section key={year} className="relative pl-10">
                        {/* Node sits on the rail: 24px wide, centred on left-[11px]. */}
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary/30 bg-background print:hidden"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>

                        <h3 className="font-mono text-sm font-semibold tracking-wider mb-3">
                            {year}
                        </h3>

                        <div className="space-y-3">
                            {eventsByYear[year].map((event) => {
                                const isActive = activeEvent === event.id;
                                const panelId = `${event.id}-panel`;

                                return (
                                    <article
                                        key={event.id}
                                        className={cn(
                                            "rounded-lg border bg-card transition-colors",
                                            isActive
                                                ? "border-primary/40"
                                                : "hover:border-muted-foreground/30"
                                        )}
                                    >
                                        {/* A real button so the CV is reachable by keyboard and
                                            announced as an expandable disclosure. The whole
                                            header is the target, not just the title. */}
                                        <h4>
                                            <button
                                                type="button"
                                                onClick={() => setActiveEvent(isActive ? null : event.id)}
                                                aria-expanded={isActive}
                                                aria-controls={panelId}
                                                className="w-full flex items-start gap-3 p-4 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            >
                                                <span className={cn(
                                                    "mt-0.5 shrink-0 rounded-md p-1.5 transition-colors",
                                                    isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                                )}>
                                                    {event.icon ?? <CategoryIcon category={event.category} className="h-4 w-4" />}
                                                </span>

                                                <span className="min-w-0 flex-1">
                                                    <span className={cn(
                                                        "block font-medium leading-snug",
                                                        isActive && "text-primary"
                                                    )}>
                                                        {event.title}
                                                    </span>
                                                    <span className="block text-sm text-muted-foreground mt-0.5">
                                                        {event.organization}
                                                    </span>
                                                    {/* Its own line rather than fighting the title
                                                        for space on one row. */}
                                                    <span className="block font-mono text-xs text-muted-foreground mt-1.5">
                                                        {event.date}
                                                    </span>
                                                </span>

                                                <ChevronDown
                                                    aria-hidden="true"
                                                    className={cn(
                                                        "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 print:hidden",
                                                        isActive && "rotate-180"
                                                    )}
                                                />
                                            </button>
                                        </h4>

                                        {/* Always rendered, so the detail of each role is present
                                            in the exported HTML for crawlers and link previews.
                                            `hidden` keeps it out of the accessibility tree while
                                            collapsed - which conditional rendering would do too,
                                            but at the cost of it not being in the page at all. */}
                                        <div id={panelId} hidden={!isActive}>
                                            <ul className="space-y-2 list-disc pl-5 pr-4 pb-4 ml-[2.4rem] text-sm text-muted-foreground marker:text-muted-foreground/40">
                                                {event.description.map((desc) => (
                                                    <li key={desc} className="pl-1">{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
