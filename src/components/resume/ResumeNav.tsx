'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export function ResumeNav() {
    return (
        <nav className="flex justify-center my-8">
            <div className="bg-card border rounded-lg p-1 inline-flex">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                    <Home className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </nav>
    );
}