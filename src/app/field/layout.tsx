'use client';

import { UserNav } from "@/components/user-nav";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard, ListTodo } from "lucide-react";
import Link from "next/link";
import { NotificationNav } from "@/components/notification-nav";
import { cn } from "@/lib/utils";


export default function FieldLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();
    const pathname = usePathname();

    const isDashboard = pathname === '/field' || pathname === '/field/dashboard';
    const isTasks = pathname === '/field/tasks';

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                <div className="flex items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 95 40"
                            className="w-8 h-8 text-primary hidden sm:block"
                            fill="currentColor"
                        >
                            <defs>
                                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5}} />
                                </linearGradient>
                            </defs>
                            <path d="M0 40 L10 40 L25 0 L15 0 Z" />
                            <path d="M28 0 L48 0 L48 8 L36 8 L36 16 L46 16 L46 24 L36 24 L36 32 L48 32 L48 40 L28 40 Z" />
                            <path d="M55 20 a 18 18 0 1 1 36 0 a 18 18 0 1 1 -36 0" />
                            <path d="M57 20 a 16 16 0 1 1 32 0 a 16 16 0 1 1 -32 0" fill="hsl(var(--background))" />
                            <path d="M 50 18 a 22 10 0 1 0 0 4 a 22 10 0 1 0 0 -4" fill="url(#ring-gradient)" transform="rotate(-15 72 20)" />
                        </svg>
                        <nav className="flex items-center gap-2">
                           <Button asChild variant={isDashboard ? 'secondary': 'ghost'} size="sm">
                                <Link href="/field/dashboard">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span className="hidden sm:inline-block ml-2">Dashboard</span>
                                </Link>
                           </Button>
                           <Button asChild variant={isTasks ? 'secondary': 'ghost'} size="sm">
                                <Link href="/field/tasks">
                                    <ListTodo className="h-4 w-4" />
                                    <span className="hidden sm:inline-block ml-2">Tasks</span>
                                </Link>
                           </Button>
                        </nav>
                </div>
                <div className="flex items-center gap-2">
                    <NotificationNav />
                    <UserNav />
                </div>
            </header>
            <main className="flex flex-1 flex-col p-4 md:p-8">
                {children}
            </main>
        </div>
    );
  }
  
