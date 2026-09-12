import { type TimelineEvent } from "@/components/resume/InteractiveTimeline";

export const summary = [
    "Platform Engineer at Proofpoint, responsible for the Kubernetes clusters, AWS infrastructure, and observability underpinning a full business unit, with daily, Terraform-driven work in production.",
    "Recent work includes the unit's EKS migration and its move from Coralogix SaaS to a self-hosted deployment. BEng Software Engineering from Queen's University Belfast, with a prior internship at Rapid7.",
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
            'Own the Kubernetes clusters, AWS infrastructure and observability tooling for an entire business unit.',
            'Hold AWS administrative access for the unit, carrying out production changes on behalf of other teams.',
            'Built the cluster-level workloads for the unit’s EKS migration, including CrowdStrike Falcon sensors, Honeycomb Refinery, Argo Workflows, Node Exporter and more.',
            'Drove the migration from Coralogix SaaS to a bring-your-own-cloud deployment, as one of two engineers owning the Coralogix vendor relationship.',
            'Designed and delivered a Lambda and Slack application routing the unit’s CloudWatch logs to each owning team’s channel — adopted across all teams.',
            'Built Grafana dashboards including a dashboard for Istio gateway health, giving the unit live visibility throughout the EKS migration.',
            'On call for production systems, running incident response through incident.io and PagerDuty.',
            'Manage the unit’s AWS estate as code in Terraform.'
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
    'Terraform', 'Kubernetes', 'EKS', 'Helm', 'Istio', 'Docker', 'GitOps',
    'AWS', 'Lambda', 'CloudWatch', 'GCP',
    'Argo CD', 'Argo Workflows', 'CircleCI', 'Jenkins',
    'OpenTelemetry', 'Prometheus', 'Grafana', 'Coralogix', 'Honeycomb',
    'incident.io', 'PagerDuty',
    'Go', 'Java', 'Python', 'JavaScript/TypeScript', 'Spring Boot',
    'PostgreSQL', 'MongoDB', 'Redis'
];

export const softSkills = [
    'Problem Solving', 'Team Collaboration', 'Communication',
    'Agile/Scrum', 'Technical Documentation', 'Project Management',
    'Pair Programming', 'Presentation Skills', 'Fast Learner'
];
