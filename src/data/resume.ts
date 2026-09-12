import { type TimelineEvent } from "@/components/resume/InteractiveTimeline";

export const summary = [
    "Final-year Software Engineering student at Queen's University Belfast with hands-on experience at Rapid7. Strong background in backend Java development, secure cloud infrastructure, and technical expertise in low-level fault analysis for on-premises applications.",
    "Successfully deployed production-grade SaaS applications using Kubernetes and Spinnaker. Known for improving system performance, reducing AWS costs, and implementing security-first processes.",
];

// `start` drives ordering. Deriving it from the date string put the Rapid7
// internship below three 2025 projects, because the parser took the last year
// in the range.
export const events: TimelineEvent[] = [
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
        date: 'Sep 2021 – Jun 2025',
        start: 2021,
        category: 'education',
        description: [
            'Predicted: 2:1',
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
    'Java', 'Python', 'JavaScript/TypeScript', 'React', 'Node.js',
    'Spring Boot', 'AWS', 'GCP', 'Kubernetes', 'Docker',
    'CI/CD', 'REST APIs', 'MongoDB', 'PostgreSQL',
    'Git', 'Terraform', 'Spinnaker', 'Microservices'
];

export const softSkills = [
    'Problem Solving', 'Team Collaboration', 'Communication',
    'Agile/Scrum', 'Technical Documentation', 'Project Management',
    'Pair Programming', 'Presentation Skills', 'Fast Learner'
];
