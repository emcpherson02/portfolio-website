import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    /** Small uppercase label above the heading. */
    label: string;
    title: string;
    description?: string;
    className?: string;
}

/**
 * Shared heading for the homepage sections. The mono eyebrow matches the
 * resume masthead, so both pages read as the same site.
 */
export function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
    return (
        <div className={cn("max-w-2xl mb-10 sm:mb-14", className)}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
                {label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                {title}
            </h2>
            {description && (
                <p className="text-muted-foreground mt-4 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
