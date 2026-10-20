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

import {appName} from '#/constants';
import {Button} from '@anggit-mono/ui/components/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@anggit-mono/ui/components/empty';
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
import {Separator} from '@anggit-mono/ui/components/separator';

export type DashboardView =
  'inbox' | 'today' | 'upcoming' | 'completed' | 'projects';

const ticketViews = [
  {label: 'Inbox', view: 'inbox', icon: TrayIcon},
  {label: 'Today', view: 'today', icon: CalendarIcon},
  {label: 'Upcoming', view: 'upcoming', icon: ArrowUpIcon},
  {label: 'Completed', view: 'completed', icon: CheckCircleIcon},
] as const;

const viewContent: Record<
  DashboardView,
  {label: string; title: string; description: string; icon: typeof TrayIcon}
> = {
  inbox: {
    label: 'Inbox',
    title: 'No tickets in Inbox',
    description: 'New tickets will appear here.',
    icon: TrayIcon,
  },
  today: {
    label: 'Today',
    title: 'No tickets today',
    description: 'Tickets due today will appear here.',
    icon: CalendarIcon,
  },
  upcoming: {
    label: 'Upcoming',
    title: 'No upcoming tickets',
    description: 'Future tickets will appear here.',
    icon: ArrowUpIcon,
  },
  completed: {
    label: 'Completed',
    title: 'No completed tickets',
    description: 'Completed tickets will appear here.',
    icon: CheckCircleIcon,
  },
  projects: {
    label: 'Projects',
    title: 'No projects yet',
    description: 'Create a project to organize your tickets.',
    icon: FolderIcon,
  },
};

function DashboardSidebar({currentView}: {currentView: DashboardView}) {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <ImageIcon />
                <span>{appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ticketViews.map(({label, view, icon: Icon}) => (
                <SidebarMenuItem key={view}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentView === view}
                    tooltip={label}
                  >
                    <Link href={`/dashboard?view=${view}`}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={currentView === 'projects'}
                  tooltip="Projects"
                >
                  <Link href="/dashboard?view=projects">
                    <FolderIcon />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default function DashboardShell({
  currentView,
}: {
  currentView: DashboardView;
}) {
  const content = viewContent[currentView];
  const ContentIcon = content.icon;

  return (
    <SidebarProvider>
      <DashboardSidebar currentView={currentView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-sm font-medium">{content.label}</h1>
        </header>

        <div className="flex flex-1">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ContentIcon />
              </EmptyMedia>
              <EmptyTitle>{content.title}</EmptyTitle>
              <EmptyDescription>{content.description}</EmptyDescription>
            </EmptyHeader>

            {currentView === 'projects' && (
              <EmptyContent>
                <Button type="button">Create project</Button>
              </EmptyContent>
            )}
          </Empty>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
