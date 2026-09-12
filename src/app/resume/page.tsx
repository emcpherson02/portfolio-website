'use client'

import { AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { InteractiveTimeline } from "@/components/resume/InteractiveTimeline";
import { SkillList } from "@/components/resume/SkillList";
import { PrintableResume } from "@/components/resume/PrintableResume";
import { ResumeLoading } from "@/components/resume/ResumeLoading";
import { CVTitle } from "@/components/resume/CVTitle";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ScrollButton } from "@/components/resume/ScrollButton";
import { events, summary, technicalSkills, softSkills } from "@/data/resume";

export default function ResumePage() {
    // The splash is decoration only. It overlays finished content rather than
    // gating it, so the CV is present in the exported HTML and a reader who
    // arrives while it is up can still scroll and read underneath.
    const [showLoading, setShowLoading] = useState(true);
    const hideLoading = useCallback(() => setShowLoading(false), []);

    return (
        <div className="bg-background">
            <AnimatePresence>
                {showLoading && (
                    <ResumeLoading onComplete={hideLoading} />
                )}
            </AnimatePresence>

            <div className="container py-16 sm:py-20">
                <div className="mb-12">
                    <div className="mb-10 text-center">
                        <CVTitle delay={0.3} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
                    <p className="text-muted-foreground max-w-3xl text-lg">
                        My professional journey, skills, and experience as a software engineer.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <Button asChild className="shadow-md">
                            <a href="/CV_Elliott_McPherson.pdf" download>
                                Download CV <Download className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/#contact">
                                Contact Me <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <ResumeNav />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    <div className="lg:col-span-1 space-y-8">
                        <section className="bg-card rounded-xl p-6 border shadow-sm">
                            <h2 className="text-xl font-bold border-b pb-2 mb-4">Professional Summary</h2>
                            <div className="space-y-4">
                                {summary.map((paragraph) => (
                                    <p key={paragraph} className="text-muted-foreground">{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        <section className="bg-card rounded-xl p-6 border shadow-sm">
                            <h2 className="text-xl font-bold border-b pb-2 mb-4">Technical Skills</h2>
                            <SkillList skills={technicalSkills} />
                        </section>

                        <section className="bg-card rounded-xl p-6 border shadow-sm">
                            <h2 className="text-xl font-bold border-b pb-2 mb-4">Soft Skills</h2>
                            <SkillList skills={softSkills} />
                        </section>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-card rounded-xl p-6 border shadow-sm">
                            <h2 className="text-xl font-bold border-b pb-2 mb-6">Professional Timeline</h2>

                            <InteractiveTimeline events={events} />
                        </section>
                    </div>
                </div>

                <section className="mt-12 bg-primary/5 rounded-xl p-8 border shadow-sm text-center">
                    <h2 className="text-2xl font-bold mb-4">Looking for a Skilled Engineer?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        If you&#39;re looking for a passionate engineer with hands-on experience, let&#39;s connect!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="shadow-md">
                            <Link href="/#contact">
                                Get in Touch
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <a href="/CV_Elliott_McPherson.pdf" download>
                                Download CV <Download className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </section>

                <div className="mt-8 text-center">
                    <PrintableResume />
                </div>
            </div>

            <ScrollButton scrollToTop={false} />
        </div>
    );
}
