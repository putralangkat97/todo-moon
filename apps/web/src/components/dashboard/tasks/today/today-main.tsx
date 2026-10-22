'use client';

import {TrayIcon} from '@phosphor-icons/react';
import {useToday} from '#/hooks/use-today';
import {formatDate} from '@anggit-mono/domain';
import DashboardShell from '../../dashboard-shell';
import TaskEmptyState from '../task-empty-state';
import {TaskGroup} from '../types';
import {TodayList} from './today-list';

export default function TodayMainComponent() {
  const sampleGroups: TaskGroup[] = [
    {
      id: 'overdue',
      title: 'Overdue',
      tasks: [
        {
          id: '1',
          title: 'Reply to design feedback',
          project: 'Website relaunch',
          priority: 'HIGH',
          dueLabel: 'Oct 18',
          assignee: 'JL',
        },
      ],
    },
    {
      id: 'today',
      title: 'Due today',
      tasks: [
        {
          id: '2',
          title: 'Review pull request #128',
          project: 'Website relaunch',
          priority: 'HIGH',
          dueLabel: 'Today',
          assignee: 'AM',
        },
        {
          id: '3',
          title: 'Prepare sprint demo',
          project: 'Mobile app',
          priority: 'MEDIUM',
          dueLabel: 'Today',
          assignee: 'SK',
        },
        {
          id: '4',
          title: 'Write standup notes',
          project: 'Personal',
          priority: 'LOW',
          dueLabel: 'Today',
          assignee: 'AM',
        },
      ],
    },
  ];

  const today = useToday();

  return (
    <>
      <DashboardShell
        title={'Today'}
        description={
          today ? `${formatDate(today, 'PPP')} · 0 task left` : '0 task left'
        }
      >
        {sampleGroups.length > 0 ? (
          <TodayList groups={sampleGroups} />
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
