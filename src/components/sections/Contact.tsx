import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";

export function Contact() {
    return (
        <section className="py-20 bg-background" id="contact">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Feel free to reach out if you&#39;re looking for a developer, have a question, or just want to connect.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="rounded-lg border bg-card p-8 shadow-sm">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    <div className="space-y-8">
                        <div className="rounded-lg border bg-card p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium">Location</h4>
                                        <p className="text-muted-foreground">Belfast, United Kingdom</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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

                        <div className="rounded-lg border bg-card p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Availability</h3>
                            <p className="text-muted-foreground mb-6">

                            </p>
                            <p className="text-sm text-muted-foreground">
                                Usually replies within 24 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}