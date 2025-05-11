import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Hero />
        <FeaturedProjects />
        <Skills />
        <Contact />
      </div>
  );
}