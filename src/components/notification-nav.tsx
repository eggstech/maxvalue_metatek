import { Bell, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { notifications } from '@/lib/notifications';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';

export function NotificationNav() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute top-1 right-1 h-4 w-4 justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="font-semibold">Notifications</span>
          <Button variant="link" className="h-auto p-0 text-xs">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              asChild
              className={`p-3 ${!notification.isRead ? 'bg-accent/50' : ''}`}
            >
              <Link
                href={notification.link ?? '#'}
                className="flex items-start gap-3"
              >
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    notification.isRead ? 'bg-transparent' : 'bg-primary'
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
              <Check className="h-8 w-8" />
              <p>You're all caught up!</p>
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
            <Button variant="link" className="w-full h-auto p-0">View all notifications</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
