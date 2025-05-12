'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Clock, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const formRef = useRef(null);
    const formInView = useInView(formRef, { once: true, amount: 0.3 });

    const infoRef = useRef(null);
    const infoInView = useInView(infoRef, { once: true, amount: 0.3 });

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, x: -30 }}
                        animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                    >
                        <form className="space-y-5 sm:space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="space-y-2"
                                >
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input id="name" placeholder="Your name" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="space-y-2"
                                >
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input id="email" type="email" placeholder="Your email" />
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="space-y-2"
                            >
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject
                                </label>
                                <Input id="subject" placeholder="How can I help you?" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="space-y-2"
                            >
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Your message"
                                    rows={5}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button type="submit" className="w-full shadow-sm">
                                    Send Message
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <div className="space-y-6" ref={infoRef}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                            <div className="space-y-5 sm:space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
                                    animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Availability</h3>

                            <div className="space-y-5 sm:space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
                                    animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
                    </div>
                </div>
            </div>
        </section>
    );
}