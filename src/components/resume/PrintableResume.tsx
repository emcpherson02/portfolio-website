'use client'

import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";

export function PrintableResume() {
    // Function to open the PDF in a new tab for printing
    const handlePrint = () => {
        // Open the PDF in a new tab
        const pdfWindow = window.open('/CV_Elliott_McPherson.pdf', '_blank');

        // Once the PDF is loaded, trigger print dialog
        if (pdfWindow) {
            pdfWindow.addEventListener('load', () => {
                // Short delay to ensure PDF is fully loaded
                setTimeout(() => {
                    pdfWindow.print();
                }, 1000);
            });
        }
    };

    // Function to just view the PDF
    const handleView = () => {
        window.open('/CV_Elliott_McPherson.pdf', '_blank');
    };

    return (
        <div className="flex gap-3 justify-center">
            <Button
                onClick={handlePrint}
                variant="outline"
            >
                Print Resume <Printer className="ml-2 h-4 w-4" />
            </Button>
            <Button
                onClick={handleView}
                variant="ghost"
            >
                View PDF <FileText className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}