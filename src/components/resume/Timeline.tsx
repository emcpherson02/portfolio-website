'use client'

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
    title: string;
    organization: string;
    date: string;
    icon: React.ReactNode;
    description?: string;
    badges?: string[];
    isLast?: boolean;
    index?: number;
    children?: React.ReactNode;
}

export function TimelineItem({
                                 title,
                                 organization,
                                 date,
                                 icon,
                                 description,
                                 badges,
                                 isLast = false,
                                 index = 0,
                                 children
                             }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            className={cn(
                "relative pl-8 border-l-2 border-muted",
                !isLast && "pb-8"
            )}
        >
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                {icon}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">
                        {date}
                    </Badge>
                </div>
            </div>
            <p className="text-muted-foreground font-medium mb-3">{organization}</p>

            {description && (
                <p className="text-muted-foreground mb-3">{description}</p>
            )}

            {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">{badge}</Badge>
                    ))}
                </div>
            )}

            {children}
        </motion.div>
    );
}