
'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  BarChart3,
  ClipboardList,
  Eye,
  LayoutDashboard,
  Settings,
  Repeat,
} from 'lucide-react';
import Link from 'next/link';

const mainMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
];

const taskMenuItems = [
  { href: '/tasks', label: 'All Tasks', icon: ClipboardList, exact: true },
  { href: '/tasks?tab=schedules', label: 'Schedules', icon: Repeat, exact: false, activeOn: '/tasks' },
  { href: '/review', label: 'Review', icon: Eye, exact: false },
]

const settingsMenuItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
]

export function MainNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string, exact: boolean = true, activeOn?: string) => {
    const currentTab = searchParams.get('tab');
    const url = new URL(href, 'http://localhost');
    const hrefTab = url.searchParams.get('tab');

    if (activeOn && pathname.startsWith(activeOn)) {
        if(hrefTab && hrefTab === currentTab) return true;
        if(!hrefTab && !currentTab && pathname === href) return true;
    }
    
    if (exact) {
      return pathname === href && !currentTab;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarMenu>
        <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                >
                    <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            {taskMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href, item.exact, item.activeOn)}
                    tooltip={item.label}
                >
                    <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarGroup>
        
        <SidebarSeparator />

        <SidebarGroup>
             {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                >
                    <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarGroup>
    </SidebarMenu>
  );
}
