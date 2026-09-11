'use client'

import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <ScrollRevealSection animation="fade" className="w-full">
                <Hero />
            </ScrollRevealSection>

            <ScrollRevealSection animation="slide-up" delay={0.1} className="w-full">
                <FeaturedProjects />
            </ScrollRevealSection>

            <ScrollRevealSection animation="slide-up" delay={0.1} className="w-full">
                <Skills />
            </ScrollRevealSection>

            <ScrollRevealSection animation="slide-up" delay={0.1} className="w-full">
                <Contact />
            </ScrollRevealSection>
        </div>
    );
}
