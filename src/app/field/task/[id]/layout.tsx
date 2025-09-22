
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FieldTaskDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            <div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/field">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Task List
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
