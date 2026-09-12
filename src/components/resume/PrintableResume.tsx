'use client'

import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";

export function PrintableResume() {
    return (
        <div className="flex gap-3 justify-center print:hidden">
            <Button onClick={() => window.print()} variant="outline">
                Print this page <Printer className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button asChild variant="ghost">
                <a href="/CV_Elliott_McPherson.pdf" target="_blank" rel="noopener noreferrer">
                    Open PDF <FileText className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
            </Button>
        </div>
    );
}
