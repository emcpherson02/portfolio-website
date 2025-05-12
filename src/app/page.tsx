'use client'

import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { useEffect } from "react";

export default function Home() {
    // Add id to body to allow scrolling to top
    useEffect(() => {
        document.body.id = 'home';
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <ScrollRevealSection
                id="hero-section"
                animation="fade"
                threshold={0.1}
                className="w-full"
            >
                <Hero />
            </ScrollRevealSection>

            <ScrollRevealSection
                id="projects"
                animation="slide-up"
                delay={0.1}
                staggerChildren={0.15}
                threshold={0.15}
                className="w-full"
            >
                <FeaturedProjects />
            </ScrollRevealSection>

            <ScrollRevealSection
                id="skills"
                animation="slide-up"
                delay={0.1}
                staggerChildren={0.1}
                threshold={0.15}
                className="w-full"
            >
                <Skills />
            </ScrollRevealSection>

            <ScrollRevealSection
                id="contact"
                animation="slide-up"
                delay={0.1}
                staggerChildren={0.1}
                threshold={0.15}
                className="w-full"
            >
                <Contact />
            </ScrollRevealSection>
        </div>
    );
}