
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FieldTaskDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-6 w-full">
             <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="sm">
                    <Link href="/field/tasks">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Task List
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
