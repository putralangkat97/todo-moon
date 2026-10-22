'use client';

import {
  ArrowUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  FolderIcon,
  ImageIcon,
  TrayIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';

import {appName} from '#/constants';
import {Separator} from '@anggit-mono/ui/components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@anggit-mono/ui/components/sidebar';

const ticketViews = [
  {label: 'Inbox', href: '/dashboard/inbox', icon: TrayIcon},
  {label: 'Today', href: '/dashboard/today', icon: CalendarIcon},
  {label: 'Upcoming', href: '/dashboard/upcoming', icon: ArrowUpIcon},
  {label: 'Completed', href: '/dashboard/completed', icon: CheckCircleIcon},
] as const;

const projectViews = [
  {label: 'Projects', href: '/dashboard/projects', icon: FolderIcon},
] as const;

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

function DashboardSidebar({pathname}: {pathname: string}) {
  const groups = [
    {label: 'Tickets', items: ticketViews},
    {label: 'Projects', items: projectViews},
  ];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/inbox">
                <ImageIcon />
                <span>{appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groups.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(({label, href, icon: Icon}) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      tooltip={label}
                    >
                      <Link href={href}>
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default function DashboardShell({
  children,
  title = '',
  description = '',
  action,
}: DashboardShellProps) {
  const pathname = usePathname() ?? '/dashboard/inbox';
  const views = [...ticketViews, ...projectViews];
  const currentView = views.find(view => view.href === pathname);

  return (
    <SidebarProvider>
      <DashboardSidebar pathname={pathname} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-sm font-medium">
            {currentView?.label ?? 'Inbox'}
          </h1>
        </header>
        <div className="flex flex-1 p-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
              </div>
              {action}
            </div>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
