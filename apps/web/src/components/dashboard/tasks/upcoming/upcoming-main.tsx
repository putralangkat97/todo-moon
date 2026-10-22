'use client';

import {TrayIcon} from '@phosphor-icons/react';
import DashboardShell from '../../dashboard-shell';
import {TaskGroup} from '../types';
import TaskEmptyState from '../task-empty-state';
import {UpcomingList} from './upcoming-list';

export default function UpcomingMainComponent() {
  const upcomingSampleGroups: TaskGroup[] = [
    {
      id: 'tomorrow',
      title: 'Tomorrow · Thu, Oct 22',
      tasks: [
        {
          id: 'u1',
          title: 'Send weekly status report',
          project: 'Website relaunch',
          priority: 'MEDIUM',
          dueLabel: 'Tomorrow',
          assignee: 'AM',
        },
        {
          id: 'u2',
          title: 'Fix login redirect bug',
          project: 'Mobile app',
          priority: 'HIGH',
          dueLabel: 'Tomorrow',
          assignee: 'SK',
        },
      ],
    },
    {
      id: 'day-2',
      title: 'Fri, Oct 23',
      tasks: [
        {
          id: 'u3',
          title: 'Design review with stakeholders',
          project: 'Website relaunch',
          priority: 'HIGH',
          dueLabel: 'Oct 23',
          assignee: 'JL',
        },
      ],
    },
    {
      id: 'day-3',
      title: 'Sat, Oct 24',
      tasks: [
        {
          id: 'u4',
          title: 'Plan next sprint backlog',
          project: 'Mobile app',
          priority: 'LOW',
          dueLabel: 'Oct 24',
          assignee: 'AM',
        },
      ],
    },
    {
      id: 'day-4',
      title: 'Sun, Oct 25',
      tasks: [
        {
          id: 'u5',
          title: 'Update onboarding copy',
          project: 'Website relaunch',
          priority: 'MEDIUM',
          dueLabel: 'Oct 25',
          assignee: 'JL',
        },
        {
          id: 'u6',
          title: 'Renew domain subscription',
          project: 'Personal',
          priority: 'LOW',
          dueLabel: 'Oct 25',
          assignee: 'AM',
        },
      ],
    },
    {
      id: 'day-5',
      title: 'Mon, Oct 26',
      tasks: [
        {
          id: 'u7',
          title: 'Release v1.2 to production',
          project: 'Mobile app',
          priority: 'HIGH',
          dueLabel: 'Oct 26',
          assignee: 'SK',
        },
      ],
    },
  ];

  return (
    <>
      <DashboardShell title={'Upcoming'} description={' Next 5 days . 0 task'}>
        {upcomingSampleGroups.length > 0 ? (
          <UpcomingList groups={upcomingSampleGroups} />
        ) : (
          <div className="mt-4">
            <TaskEmptyState
              title="No tasks in Inbox"
              description="New tasks will appear here."
              icon={TrayIcon}
            />
          </div>
        )}
      </DashboardShell>
    </>
  );
}
