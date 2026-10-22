'use client';

import {TrayIcon} from '@phosphor-icons/react';
import DashboardShell from '../../dashboard-shell';
import TaskEmptyState from '../task-empty-state';
import {TaskData} from '../types';
import {CompletedListComponent} from './completed-list';

export default function CompletedMainComponent() {
  const completedSampleTasks: TaskData[] = [
    {
      id: 'c1',
      title: 'Send weekly status report',
      project: 'Website relaunch',
      priority: 'MEDIUM',
      dueLabel: 'Oct 20',
      assignee: 'AM',
      completed: true,
    },
    {
      id: 'c2',
      title: 'Fix login redirect bug',
      project: 'Mobile app',
      priority: 'HIGH',
      dueLabel: 'Oct 20',
      assignee: 'SK',
      completed: true,
    },
    {
      id: 'c3',
      title: 'Design review with stakeholders',
      project: 'Website relaunch',
      priority: 'HIGH',
      dueLabel: 'Oct 19',
      assignee: 'JL',
      completed: true,
    },
    {
      id: 'c4',
      title: 'Update onboarding copy',
      project: 'Website relaunch',
      priority: 'MEDIUM',
      dueLabel: 'Oct 18',
      assignee: 'JL',
      completed: true,
    },
    {
      id: 'c5',
      title: 'Plan next sprint backlog',
      project: 'Mobile app',
      priority: 'LOW',
      dueLabel: 'Oct 17',
      assignee: 'AM',
      completed: true,
    },
    {
      id: 'c6',
      title: 'Renew domain subscription',
      project: 'Personal',
      priority: 'LOW',
      dueLabel: 'Oct 16',
      assignee: 'AM',
      completed: true,
    },
  ];

  return (
    <>
      <DashboardShell
        title={'Completed'}
        description={'4 tasks finished this week'}
      >
        {completedSampleTasks.length > 0 ? (
          <CompletedListComponent
            title="Finished"
            tasks={completedSampleTasks}
          />
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
