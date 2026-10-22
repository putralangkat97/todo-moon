'use client';

import {KanbanIcon, ListIcon, PlusIcon, TrayIcon} from '@phosphor-icons/react';
import {Button} from '@anggit-mono/ui/components/button';
import {useRef, useState} from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@anggit-mono/ui/components/tabs';
import DashboardShell from '../../dashboard-shell';
import TaskEmptyState from '../task-empty-state';
import {TaskData} from '../types';
import type {User} from '../user-item';
import InboxKanban from './inbox-kanban';
import {InboxListComponent} from './inbox-list';
import TaskDrawer from '../task-drawer';
import TaskForm from '../task-form';

const users: User[] = [
  {
    username: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    email: 'shadcn@vercel.com',
  },
  {
    username: 'maxleiter',
    avatar: 'https://github.com/maxleiter.png',
    email: 'maxleiter@vercel.com',
  },
  {
    username: 'evilrabbit',
    avatar: 'https://github.com/evilrabbit.png',
    email: 'evilrabbit@vercel.com',
  },
];

export default function InboxMainComponent() {
  const [createNewTask, setCreateNewTask] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const sampleTasks: TaskData[] = [
    {
      id: '1',
      title: 'Reply to design feedback',
      project: 'Website relaunch',
      priority: 'HIGH',
      dueLabel: 'Oct 18',
      assignee: 'JL',
    },
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
  ];

  return (
    <>
      <DashboardShell
        title={'My Tasks'}
        description={'0 task'}
        action={
          sampleTasks.length > 0 && (
            <Button type="button" onClick={() => setCreateNewTask(true)}>
              <PlusIcon />
              New Task
            </Button>
          )
        }
      >
        {sampleTasks.length > 0 ? (
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">
                <ListIcon />
                List
              </TabsTrigger>
              <TabsTrigger value="card">
                <KanbanIcon />
                Card
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <InboxListComponent tasks={sampleTasks} />
            </TabsContent>
            <TabsContent value="card">
              <InboxKanban />
            </TabsContent>
          </Tabs>
        ) : (
          <TaskEmptyState
            title="No tasks in Inbox"
            description="New tasks will appear here."
            icon={TrayIcon}
            action
            setCreateNewTask={setCreateNewTask}
          />
        )}
      </DashboardShell>

      <TaskDrawer
        open={createNewTask}
        onOpenChange={setCreateNewTask}
        title="New task"
        description="Add details, and create the task."
        formId="new-task-form"
        submitLabel="Create Task"
        contentRef={drawerRef}
      >
        <TaskForm
          id="new-task-form"
          users={users}
          portalContainer={drawerRef}
          onSubmit={values => {
            console.log(values);
            setCreateNewTask(false);
          }}
        />
      </TaskDrawer>
    </>
  );
}
