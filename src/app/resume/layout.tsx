import type { Metadata } from "next";

// The page itself is a client component and so cannot export metadata. Without
// this, /resume inherits the root layout's - including its canonical URL, which
// pointed at the homepage and told search engines the CV was a duplicate of it.

const TITLE = "Resume | Elliott McPherson";
const DESCRIPTION = "The experience, education and projects of Elliott McPherson - platform engineer at Proofpoint in Belfast, previously at Rapid7.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
        canonical: "/resume/",
    },
    openGraph: {
        type: "profile",
        url: "/resume/",
        title: TITLE,
        description: DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
    },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
