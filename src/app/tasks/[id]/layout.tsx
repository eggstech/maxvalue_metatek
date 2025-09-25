
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TaskDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/tasks">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Tasks
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
