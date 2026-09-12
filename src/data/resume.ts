import { type TimelineEvent } from "@/components/resume/InteractiveTimeline";

export const summary = [
    "Software engineer on the platform engineering team at Proofpoint, working on the infrastructure and delivery tooling behind their security products. BEng Software Engineering from Queen's University Belfast, with a prior internship at Rapid7.",
    "Experienced in backend Java development, Kubernetes, and secure cloud infrastructure. Has deployed production SaaS with Kubernetes and Spinnaker, reduced AWS spend through resource analysis, and introduced security-first processes to a delivery team.",
];

// `start` drives ordering. Deriving it from the date string put the Rapid7
// internship below three 2025 projects, because the parser took the last year
// in the range.
export const events: TimelineEvent[] = [
    {
        id: 'job-proofpoint',
        title: 'Software Engineer',
        organization: 'Proofpoint, Platform Engineering',
        date: 'Jul 2025 – Present',
        start: 2025,
        category: 'work',
        description: [
            'Platform engineering for a cybersecurity product suite, covering infrastructure, delivery tooling and observability.',
        ]
    },
    {
        id: 'job-rapid7',
        title: 'Software Engineering Intern',
        organization: 'Rapid7, Belfast',
        date: 'Jun 2023 – Jun 2024',
        start: 2023,
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
        organization: "Queen's University Belfast",
        date: 'Sep 2021 – Jul 2025',
        start: 2021,
        category: 'education',
        description: [
            'Awarded 2:1 (Hons)',
            'Key Modules: Cloud Computing (81%), Professional Skills (82%), Artificial Intelligence (67%)'
        ]
    },
    {
        id: 'project-studentwallet',
        title: 'StudentWallet – FinTech Web Application',
        organization: 'Personal project',
        date: '2025',
        start: 2025,
        category: 'project',
        technologies: ['React', 'Node.js', 'Firebase', 'Plaid API', 'GCP'],
        description: [
            'Built a full-stack budgeting platform with secure bank connectivity via Plaid.',
            'Deployed on Google Cloud Run with intelligent autoscaling and load balancing.',
            'Created a comprehensive system for maintenance loan tracking, custom budgeting, and personalized financial advice.'
        ]
    },
    {
        id: 'project-microservices',
        title: 'Cloud Computing Microservices',
        organization: 'University project',
        date: '2025',
        start: 2025,
        category: 'project',
        technologies: ['Python', 'Go', 'Java', 'Swift', 'Node.js', 'Ruby', 'Kubernetes', 'Nginx'],
        description: [
            'Designed and deployed containerized services in multiple languages.',
            'Implemented Nginx reverse proxy for performance and load balancing.',
            'Managed multi-environment microservice orchestration via Kubernetes.'
        ]
    },
    {
        id: 'weekender-ireland',
        title: 'WeekenderIreland – Domestic Tourism App',
        organization: 'Personal project',
        date: 'Present',
        start: 2026,
        category: 'project',
        technologies: ['Flutter', 'Java (Spring Boot)', 'Firestore', 'Google Maps SDK'],
        description: [
            'A gamified tourism app for Ireland, displaying a map of activities to explore.',
            'Users earn points for completing activities and can compare scores with friends.'
        ]
    },
    {
        id: 'education-alevels',
        title: 'A-Levels',
        organization: 'Ballymena Academy',
        date: '2021',
        start: 2019,
        category: 'education',
        description: [
            'Engineering (A*), Physics (C), Media (B)'
        ]
    }
];

export const technicalSkills = [
    'Go', 'Java', 'Python', 'JavaScript/TypeScript', 'Spring Boot',
    'Kubernetes', 'Helm', 'Istio', 'Docker', 'Terraform', 'GitOps',
    'Argo CD', 'Argo Workflows', 'CircleCI', 'Jenkins',
    'AWS', 'GCP', 'OpenTelemetry', 'Prometheus', 'Grafana',
    'PostgreSQL', 'MongoDB', 'Redis', 'Microservices'
];

export const softSkills = [
    'Problem Solving', 'Team Collaboration', 'Communication',
    'Agile/Scrum', 'Technical Documentation', 'Project Management',
    'Pair Programming', 'Presentation Skills', 'Fast Learner'
];
