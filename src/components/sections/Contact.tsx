'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Calendar, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Contact() {
    return (
        <section className="w-full py-16 sm:py-20 bg-background scroll-mt-16" id="contact">
            <div className="container">
                <div className="mb-10 sm:mb-16">
                    <Badge variant="outline" className="mb-4">Contact</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Feel free to reach out if you&#39;re looking for a developer, have a question, or just want to connect.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 rounded-xl border bg-card p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>

                        <div className="space-y-5 sm:space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <MapPin className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <p className="text-muted-foreground">Belfast, United Kingdom</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Mail className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a
                                        href="mailto:elliott.mcpherson985@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors break-all"
                                    >
                                        elliott.mcpherson985@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Calendar className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Work Status</h4>
                                    <p className="text-muted-foreground">Open to full-time opportunities and freelance projects</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 rounded-xl border bg-card p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Connect With Me</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="rounded-xl border p-6 flex flex-col items-center text-center">
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <LinkedinIcon className="h-7 w-7 text-foreground" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">LinkedIn</h4>
                                <p className="text-muted-foreground text-sm mb-4">Connect with me professionally</p>
                                <Button asChild variant="default" className="mt-auto w-full shadow-sm">
                                    <a href="https://linkedin.com/in/elliott-mcpherson" target="_blank" rel="noopener noreferrer">
                                        View Profile
                                    </a>
                                </Button>
                            </div>

                            <div className="rounded-xl border p-6 flex flex-col items-center text-center">
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <GithubIcon className="h-7 w-7 text-foreground" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">GitHub</h4>
                                <p className="text-muted-foreground text-sm mb-4">Check out my projects and code</p>
                                <Button asChild variant="outline" className="mt-auto w-full shadow-sm">
                                    <a href="https://github.com/emcpherson02" target="_blank" rel="noopener noreferrer">
                                        View Repositories
                                    </a>
                                </Button>
                            </div>

                            <div className="rounded-xl border p-6 flex flex-col items-center text-center sm:col-span-2">
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <FileText className="h-7 w-7 text-foreground" aria-hidden="true" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">Curriculum Vitae</h4>
                                <p className="text-muted-foreground text-sm mb-4">Download my CV for a detailed overview of my experience and skills</p>
                                <Button asChild variant="default" className="mt-auto w-full shadow-sm">
                                    <a href="/CV_Elliott_McPherson.pdf" download>
                                        Download CV
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
