import { type TimelineEvent } from "@/components/resume/InteractiveTimeline";

export const summary = [
    "Software engineer on the platform engineering team at Proofpoint, working on the infrastructure and delivery tooling behind their security products. BEng Software Engineering from Queen's University Belfast, with a prior internship at Rapid7.",
    "Experienced in backend Java development, Kubernetes, and secure cloud infrastructure. Has deployed production SaaS with Kubernetes and Spinnaker, reduced AWS spend through resource analysis, and introduced security-first processes to a delivery team.",
];

// `year` is the year an entry is filed under in the timeline: the start year
// for a role, the year completed for a qualification. It is explicit because
// deriving it from the date string filed the degree under 2021 and sorted it
// below an internship that finished a year earlier.
export const events: TimelineEvent[] = [
    {
        id: 'job-proofpoint',
        title: 'Software Engineer – Platform Engineering',
        organization: 'Proofpoint, Belfast',
        date: 'Aug 2025 – Present',
        year: 2025,
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
        year: 2023,
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
        date: 'Graduated Jul 2025',
        year: 2025,
        category: 'education',
        description: [
            'Awarded 2:1 (Hons)',
            'Key Modules: Cloud Computing (81%), Professional Skills (82%), Artificial Intelligence (67%)'
        ]
    },
    {
        id: 'education-alevels',
        title: 'A-Levels',
        organization: 'Ballymena Academy',
        date: '2021',
        year: 2021,
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
