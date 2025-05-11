import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
            <div className="container flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                    Hi, I'm <span className="text-primary"></span>
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                    I'm a graduate
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Button asChild size="lg">
                        <Link href="/projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/resume/cv.pdf" download>
                            Download CV <Download className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}