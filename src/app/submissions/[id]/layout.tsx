import { Button } from "@/components/ui/button";
import { getSubmissionById } from "@/lib/submissions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SubmissionDetailLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { id: string }
}) {
    const submission = getSubmissionById(params.id);

    if (!submission) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Button asChild variant="outline" size="sm">
                    <Link href={`/tasks/${submission.taskId}`}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Task
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
