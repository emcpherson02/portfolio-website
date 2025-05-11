import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Clock, Calendar } from "lucide-react";

export function Contact() {
    return (
        <section className="w-full py-16 sm:py-20 bg-background" id="contact">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                    {/* Contact Form */}
                    <div className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
                        <form className="space-y-5 sm:space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input id="name" placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input id="email" type="email" placeholder="Your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject
                                </label>
                                <Input id="subject" placeholder="How can I help you?" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Your message"
                                    rows={5}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                            <div className="space-y-5 sm:space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Location</h4>
                                        <p className="text-muted-foreground">Belfast, United Kingdom</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
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
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Availability</h3>

                            <div className="space-y-5 sm:space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Response Time</h4>
                                        <p className="text-muted-foreground">Usually within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Work Status</h4>
                                        <p className="text-muted-foreground">Open to full-time opportunities and freelance projects</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}