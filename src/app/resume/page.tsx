'use client'

import { AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin } from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { InteractiveTimeline } from "@/components/resume/InteractiveTimeline";
import { SkillList } from "@/components/resume/SkillList";
import { ResumeLoading } from "@/components/resume/ResumeLoading";
import { CVTitle } from "@/components/resume/CVTitle";
import { events, summary, technicalSkills, softSkills } from "@/data/resume";

/** Section heading with a hairline rule, used instead of wrapping each block in a card. */
function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground pb-2 mb-4 border-b">
            {children}
        </h2>
    );
}

export default function ResumePage() {
    // The splash is decoration only. It overlays finished content rather than
    // gating it, so the CV is present in the exported HTML and a reader who
    // arrives while it is up can still scroll and read underneath.
    const [showLoading, setShowLoading] = useState(true);
    const hideLoading = useCallback(() => setShowLoading(false), []);

    return (
        <div className="bg-background">
            <AnimatePresence>
                {showLoading && <ResumeLoading onComplete={hideLoading} />}
            </AnimatePresence>

            <div className="container max-w-6xl py-16 sm:py-20">
                <header className="mb-14">
                    <CVTitle delay={0.3} />

                    <p className="text-lg text-muted-foreground mt-5 max-w-2xl">
                        Platform Engineer at Proofpoint, working on Kubernetes, cloud
                        infrastructure and observability.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            Belfast, United Kingdom
                        </span>
                        <a
                            href="mailto:elliott.mcpherson985@gmail.com"
                            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            elliott.mcpherson985@gmail.com
                        </a>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Button asChild>
                            <a href="/CV_Elliott_McPherson.pdf" download>
                                Download CV <Download className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/#contact">Get in touch</Link>
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                    <div className="lg:col-span-1 space-y-10">
                        <section>
                            <SectionHeading>Profile</SectionHeading>
                            <div className="space-y-4">
                                {summary.map((paragraph) => (
                                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>

                        <section>
                            <SectionHeading>Technical Skills</SectionHeading>
                            <SkillList skills={technicalSkills} />
                        </section>

                        <section>
                            <SectionHeading>Soft Skills</SectionHeading>
                            <SkillList skills={softSkills} />
                        </section>
                    </div>

                    <div className="lg:col-span-2">
                        <section>
                            <SectionHeading>Experience &amp; Education</SectionHeading>
                            <InteractiveTimeline events={events} />
                        </section>
                    </div>
                </div>

                {/* The one block that keeps a surface, so it reads as a call to
                    action rather than another section of the document. */}
                <section className="mt-16 rounded-xl border bg-muted/30 px-6 py-10 text-center">
                    <h2 className="text-xl font-bold mb-3">Looking for a Skilled Engineer?</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                        If you&#39;re looking for a passionate engineer with hands-on experience, let&#39;s connect!
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button asChild>
                            <Link href="/#contact">Get in touch</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <a href="/CV_Elliott_McPherson.pdf" download>
                                Download CV <Download className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
