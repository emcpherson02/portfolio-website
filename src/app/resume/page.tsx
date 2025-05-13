'use client'

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { InteractiveTimeline } from "@/components/resume/InteractiveTimeline";
import { SkillList } from "@/components/resume/SkillProgress";
import { PrintableResume } from "@/components/resume/PrintableResume";
import { ResumeLoading } from "@/components/resume/ResumeLoading";
import { CVTitle } from "@/components/resume/CVTitle";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ScrollButton } from "@/components/resume/ScrollButton";

const events = [
    {
        id: 'job-rapid7',
        title: 'Software Engineering Intern',
        organization: 'Rapid7, Belfast',
        date: 'Jun 2023 – Jun 2024',
        category: 'work',
        description: [
            'Deployed a SaaS platform into production using Kubernetes and Spinnaker, contributing to customer-facing delivery.',
            'Provided critical maintenance and bug resolution for an enterprise Java Spring Boot SaaS application.',
            'Collaborated within an agile team environment to ensure platform stability and reliability.',
            'Refactored legacy Lisp-based systems into Java, improving reliability and extensibility.',
            'Reduced AWS infrastructure costs by 18% through resource usage analysis and optimization with ElastiCache.',
            'Designed cloud architecture documentation to streamline team onboarding.',
            'Built and presented a Snyk-based vulnerability remediation workflow.',
            'Acted as Scrum Master, leading daily stand-ups and retrospectives.',
            'Managed cloud access with Terraform; monitored pipelines via K9s and CloudWatch.'
        ]
    },
    {
        id: 'education-qub',
        title: 'BEng Software Engineering',
        organization: 'Queen\'s University Belfast',
        date: 'Sep 2021 – Jun 2025',
        category: 'education',
        description: [
            'Predicted: 2:1',
            'Key Modules: Cloud Computing (81%), Professional Skills (82%), Artificial Intelligence (67%)'
        ]
    },
    {
        id: 'project-studentwallet',
        title: 'StudentWallet – FinTech Web Application',
        organization: 'React, Node.js, Firebase, Plaid API, GCP',
        date: '2024',
        category: 'project',
        description: [
            'Built a full-stack budgeting platform with secure bank connectivity via Plaid.',
            'Deployed on Google Cloud Run with intelligent autoscaling and load balancing.',
            'Created a comprehensive system for maintenance loan tracking, custom budgeting, and personalized financial advice.'
        ]
    },
    {
        id: 'project-microservices',
        title: 'Cloud Computing Microservices',
        organization: 'Python, Go, Java, Swift, Node.js, Ruby, Kubernetes, Nginx',
        date: '2023',
        category: 'project',
        description: [
            'Designed and deployed containerized services in multiple languages.',
            'Implemented Nginx reverse proxy for performance and load balancing.',
            'Managed multi-environment microservice orchestration via Kubernetes.'
        ]
    },
    {
        id: 'project-studybuddy',
        title: 'Study Buddy – Student Matching Platform',
        organization: 'React (TS), Java (Spring Boot), MongoDB',
        date: '2024-Present',
        category: 'project',
        description: [
            'Matchmaking system to pair students by learning style and schedule.',
            'Implementing backend services using Spring Boot and MongoDB with REST API-based logic.',
            'Designed to address social and academic integration challenges faced by neurodivergent and international students.'
        ]
    },
    {
        id: 'education-alevels',
        title: 'A-Levels',
        organization: 'Ballymena Academy',
        date: '2021',
        category: 'education',
        description: [
            'Engineering (A*), Physics (C), Media (B)'
        ]
    }
];

const technicalSkills = [
    'Java', 'Python', 'JavaScript/TypeScript', 'React', 'Node.js',
    'Spring Boot', 'AWS', 'GCP', 'Kubernetes', 'Docker',
    'CI/CD', 'RESTful APIs', 'MongoDB', 'PostgreSQL',
    'Git', 'Terraform', 'Spinnaker', 'Microservices'
];

const softSkills = [
    'Problem Solving', 'Team Collaboration', 'Communication',
    'Agile/Scrum', 'Technical Documentation', 'Project Management',
    'Pair Programming', 'Presentation Skills', 'Fast Learner'
];

export default function ResumePage() {
    const [showLoading, setShowLoading] = useState(true);
    const [resumeReady, setResumeReady] = useState(false);

    // Add id to body to allow scrolling to top
    useEffect(() => {
        document.body.id = 'resume';
    }, []);

    // Simulate loading time and then hide loading screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setResumeReady(true);
        }, 3000); // Show loading for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-background">
            <AnimatePresence>
                {showLoading && (
                    <ResumeLoading onComplete={() => setShowLoading(false)} />
                )}
            </AnimatePresence>

            <div className={`container py-16 sm:py-20 ${!resumeReady ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
                {/* Page Header */}
                <div className="mb-12">
                    {resumeReady && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* CV Title Animation */}
                            <div className="mb-10 text-center">
                                <CVTitle delay={0.3} />
                            </div>

                            <Badge variant="outline" className="mb-4">Curriculum Vitae</Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
                            <p className="text-muted-foreground max-w-3xl text-lg">
                                My professional journey, skills, and experience as a software engineer.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="mt-6 flex flex-wrap gap-4"
                            >
                                <Button
                                    asChild
                                    className="shadow-md"
                                >
                                    <a
                                        href="/CV_Elliott_McPherson.pdf"
                                        download="Elliott_McPherson_CV.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download CV <Download className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                >
                                    <Link href="/#contact">
                                        Contact Me <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Resume Navigation */}
                {resumeReady && <ResumeNav />}

                {/* Main Resume Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    {/* Left Column - Summary & Skills */}
                    <div className="lg:col-span-1 space-y-8">
                        {resumeReady && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-xl p-6 border shadow-sm"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold border-b pb-2">Professional Summary</h2>
                                    <p className="text-muted-foreground">
                                        Final-year Software Engineering student at Queen's University Belfast with hands-on experience at Rapid7. Strong background in backend Java development, secure cloud infrastructure, and technical expertise in low-level fault analysis for on-premises applications.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Successfully deployed production-grade SaaS applications using Kubernetes and Spinnaker. Known for improving system performance, reducing AWS costs, and implementing security-first processes.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Skills Section with Progress Bars */}
                        {resumeReady && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-card rounded-xl p-6 border shadow-sm"
                            >
                                <h2 className="text-xl font-bold border-b pb-2 mb-4">Technical Skills</h2>
                                <SkillList
                                    skills={technicalSkills}
                                    delay={0.1}
                                />
                            </motion.div>
                        )}

                        {resumeReady && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-card rounded-xl p-6 border shadow-sm"
                            >
                                <h2 className="text-xl font-bold border-b pb-2 mb-4">Soft Skills</h2>
                                <SkillList
                                    skills={softSkills}
                                    delay={0.1}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Interactive Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Interactive Timeline Section */}
                        {resumeReady && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-card rounded-xl p-6 border shadow-sm"
                            >
                                <h2 className="text-xl font-bold border-b pb-2 mb-6">Professional Timeline</h2>
                                <p className="text-muted-foreground mb-6">
                                    Click on each event to expand and see more details about my experience, education, and projects.
                                </p>

                                <InteractiveTimeline events={events} />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                {resumeReady && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="mt-12 bg-primary/5 rounded-xl p-8 border shadow-sm text-center"
                    >
                        <h2 className="text-2xl font-bold mb-4">Looking for a Skilled Developer?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            I'm currently open to new opportunities in software development. If you're looking for a passionate developer with hands-on experience, let's connect!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="shadow-md">
                                <Link href="/#contact">
                                    Get in Touch
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                            >
                                <a
                                    href="/CV_Elliott_McPherson.pdf"
                                    download="Elliott_McPherson_CV.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download CV <Download className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Printable Version Button */}
                {resumeReady && (
                    <div className="mt-8 text-center">
                        <PrintableResume />
                    </div>
                )}
            </div>

            {/* Scroll Buttons */}
            {resumeReady && (
                <>
                    <ScrollButton scrollToTop={false} />
                    <ScrollButton scrollToTop={true} />
                </>
            )}
        </div>
    );
}