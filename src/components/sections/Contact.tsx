'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Clock, Calendar, Linkedin, Github, FileText } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const contactInfoRef = useRef(null);
    const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.3 });

    const socialLinksRef = useRef(null);
    const socialLinksInView = useInView(socialLinksRef, { once: true, amount: 0.3 });

    return (
        <section className="w-full py-16 sm:py-20 bg-background" id="contact">
            <div className="container" ref={sectionRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-16"
                >
                    <Badge variant="outline" className="mb-4">Contact</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Feel free to reach out if you&#39;re looking for a developer, have a question, or just want to connect.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Contact Information */}
                    <motion.div
                        ref={contactInfoRef}
                        initial={{ opacity: 0, x: -30 }}
                        animate={contactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                    >
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>

                        <div className="space-y-5 sm:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="flex items-start gap-4"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <p className="text-muted-foreground">Belfast, United Kingdom</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="flex items-start gap-4"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a
                                        href="mailto:elliott.mcpherson985@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        elliott.mcpherson985@gmail.com
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="flex items-start gap-4"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Response Time</h4>
                                    <p className="text-muted-foreground">Usually within 24 hours</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="flex items-start gap-4"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Work Status</h4>
                                    <p className="text-muted-foreground">Open to full-time opportunities and freelance projects</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Social Links & CV */}
                    <motion.div
                        ref={socialLinksRef}
                        initial={{ opacity: 0, x: 30 }}
                        animate={socialLinksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3 rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                    >
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Connect With Me</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* LinkedIn */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={socialLinksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                whileHover={{ y: -5 }}
                                className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-md transition-all"
                            >
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <Linkedin className="h-7 w-7 text-foreground" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">LinkedIn</h4>
                                <p className="text-muted-foreground text-sm mb-4">Connect with me professionally</p>
                                <Button asChild variant="default" className="mt-auto w-full shadow-sm">
                                    <Link href="https://linkedin.com/in/elliott-mcpherson" target="_blank" rel="noopener noreferrer">
                                        View Profile
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* GitHub */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={socialLinksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                whileHover={{ y: -5 }}
                                className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-md transition-all"
                            >
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <Github className="h-7 w-7 text-foreground" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">GitHub</h4>
                                <p className="text-muted-foreground text-sm mb-4">Check out my projects and code</p>
                                <Button asChild variant="outline" className="mt-auto w-full shadow-sm">
                                    <Link href="https://github.com/emcpherson02" target="_blank" rel="noopener noreferrer">
                                        View Repositories
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* CV/Resume */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={socialLinksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileHover={{ y: -5 }}
                                className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-md transition-all sm:col-span-2"
                            >
                                <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                    <FileText className="h-7 w-7 text-foreground" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">Curriculum Vitae</h4>
                                <p className="text-muted-foreground text-sm mb-4">Download my CV for a detailed overview of my experience and skills</p>
                                <div className="flex gap-4 mt-auto w-full">
                                    <Button asChild variant="default" className="w-full shadow-sm">
                                        <a
                                            href="/CV_Elliott_McPherson.pdf"
                                            download="Elliott_McPherson_CV.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download CV
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}