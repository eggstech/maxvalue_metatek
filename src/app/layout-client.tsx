'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { NotificationNav } from '@/components/notification-nav';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';
import { Skeleton } from '@/components/ui/skeleton';

function AppLayout({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const mounted = useMounted();

  return (
    <div
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full"
      )}
    >
      <div data-state={state} className="group flex w-full flex-1">
        {mounted ? (
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 95 40"
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                >
                  <defs>
                    <linearGradient
                      id="ring-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{
                          stopColor: 'hsl(var(--primary))',
                          stopOpacity: 0.5,
                        }}
                      />
                    </linearGradient>
                  </defs>
                  <path d="M0 40 L10 40 L25 0 L15 0 Z" />
                  <path d="M28 0 L48 0 L48 8 L36 8 L36 16 L46 16 L46 24 L36 24 L36 32 L48 32 L48 40 L28 40 Z" />
                  <path d="M55 20 a 18 18 0 1 1 36 0 a 18 18 0 1 1 -36 0" />
                  <path
                    d="M57 20 a 16 16 0 1 1 32 0 a 16 16 0 1 1 -32 0"
                    fill="hsl(var(--sidebar-background))"
                  />
                  <path
                    d="M 50 18 a 22 10 0 1 0 0 4 a 22 10 0 1 0 0 -4"
                    fill="url(#ring-gradient)"
                    transform="rotate(-15 72 20)"
                  />
                </svg>
                <h1 className="text-xl font-semibold text-sidebar-foreground">
                  ConnectFlow
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
          </Sidebar>
        ) : (
          <div className="hidden md:block">
             <div className="relative h-svh w-[var(--sidebar-width)]" />
          </div>
        )}
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tasks..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-2">
              <NotificationNav />
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </div>
  );
}


export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  const isFieldPage = pathname.startsWith('/field');

  if (isLoginPage || isFieldPage) {
    return (
      <div>
        {children}
        <Toaster />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppLayout>
        {children}
      </AppLayout>
      <Toaster />
    </SidebarProvider>
  );
}
