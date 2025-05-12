'use client'

import { useState, useEffect } from 'react';

// Define interfaces for resume data
export interface TimelineEvent {
    id: string;
    title: string;
    organization: string;
    date: string;
    category: 'education' | 'work' | 'project';
    description: string[];
}

export interface Skill {
    name: string;
    level: number;
    category: string;
}

export interface ResumeData {
    events: TimelineEvent[];
    skills: Skill[];
    isLoading: boolean;
}

export function useResumeData(): ResumeData {
    const [isLoading, setIsLoading] = useState(true);

    // Data would normally come from an API, but we'll use static data here
    const events: TimelineEvent[] = [
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

    const skills: Skill[] = [
        { name: 'Frontend Development', level: 85, category: 'Technical' },
        { name: 'Backend Development', level: 90, category: 'Technical' },
        { name: 'Cloud Infrastructure', level: 80, category: 'Technical' },
        { name: 'DevOps & CI/CD', level: 75, category: 'Technical' },
        { name: 'Database Systems', level: 70, category: 'Technical' },
        { name: 'Security Practices', level: 65, category: 'Technical' },
        { name: 'Java', level: 90, category: 'Languages' },
        { name: 'JavaScript/TypeScript', level: 85, category: 'Languages' },
        { name: 'Python', level: 75, category: 'Languages' },
        { name: 'C++', level: 65, category: 'Languages' },
        { name: 'AWS', level: 80, category: 'Cloud' },
        { name: 'GCP', level: 70, category: 'Cloud' }
    ];

    // Simulate loading time
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return {
        events,
        skills,
        isLoading
    };
}