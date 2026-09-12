'use client'

import { Button } from "@/components/ui/button";
import { Mail, MapPin, Briefcase, ArrowUpRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { SectionHeader } from "@/components/sections/SectionHeader";

const DETAILS = [
    { Icon: MapPin, label: "Location", value: "Belfast, United Kingdom" },
    { Icon: Briefcase, label: "Work status", value: "Full-time Software Engineer" },
];

const LINKS = [
    {
        href: "https://linkedin.com/in/elliott-mcpherson",
        label: "LinkedIn",
        detail: "Connect with me professionally",
        Icon: LinkedinIcon,
    },
    {
        href: "https://github.com/emcpherson02",
        label: "GitHub",
        detail: "Projects and source code",
        Icon: GithubIcon,
    },
];

export function Contact() {
    return (
        <section id="contact" className="w-full py-20 sm:py-28 bg-background scroll-mt-16">
            <div className="container">
                <SectionHeader
                    label="Contact"
                    title="Get in touch"
                    description="Feel free to reach out if you're looking for an engineer, have a question, or just want to connect."
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Details as a plain list. These were a bordered card
                        containing four more bordered rows. */}
                    <div className="lg:col-span-2">
                        <a
                            href="mailto:elliott.mcpherson985@gmail.com"
                            className="group inline-flex items-start gap-3 text-lg font-medium hover:text-primary transition-colors"
                        >
                            <Mail className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden="true" />
                            <span className="break-all">
                                elliott.mcpherson985@gmail.com
                                <ArrowUpRight
                                    className="inline h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden="true"
                                />
                            </span>
                        </a>

                        <dl className="mt-8 space-y-5">
                            {DETAILS.map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                                    <div>
                                        <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                            {label}
                                        </dt>
                                        <dd className="mt-1">{value}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>

                        <Button asChild className="mt-9">
                            <a href="/CV_Elliott_McPherson.pdf" download>
                                Download CV
                                <Download className="ml-1.5 h-4 w-4" aria-hidden="true" />
                            </a>
                        </Button>
                    </div>

                    {/* Rows rather than three cards inside a card. */}
                    <div className="lg:col-span-3">
                        <ul className="divide-y border-y">
                            {LINKS.map(({ href, label, detail, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 py-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                    >
                                        {/* A 10% tint rather than a solid fill: --primary
                                            is a near-black slate, so filling it turned the
                                            tile black on hover. */}
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-primary/10">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-medium">{label}</span>
                                            <span className="block text-sm text-muted-foreground">{detail}</span>
                                        </span>
                                        <ArrowUpRight
                                            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
