'use client';

import {Button} from '@anggit-mono/ui/components/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@anggit-mono/ui/components/tabs';
import {KanbanIcon, ListIcon, PlusIcon, TrayIcon} from '@phosphor-icons/react';
import {useRef, useState} from 'react';
import DashboardShell from '../../dashboard-shell';
import TaskDetail from '../task-detail';
import TaskDrawer from '../task-drawer';
import TaskEmptyState from '../task-empty-state';
import TaskForm from '../task-form';
import {Priority, TaskData, TaskDetailData, User} from '../types';
import InboxKanban from './inbox-kanban';
import {InboxListComponent} from './inbox-list';

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

// Temporary adapter: sample TaskData has no real date or assignee user yet
function toDetail(task: TaskData): TaskDetailData {
  return {
    id: task.id,
    title: task.title,
    priority: task.priority.toLowerCase() as Priority,
  };
}

export default function InboxMainComponent() {
  const [createNewTask, setCreateNewTask] = useState(false);
  const createDrawerRef = useRef<HTMLDivElement>(null);

  const [selectedTask, setSelectedTask] = useState<TaskDetailData>();
  const [detailOpen, setDetailOpen] = useState(false);

  function openDetail(task: TaskData) {
    setSelectedTask(toDetail(task));
    setDetailOpen(true);
  }

  const taskCount = sampleTasks.length;

  return (
    <>
      <DashboardShell
        title="My Tasks"
        description={`${taskCount} ${taskCount === 1 ? 'task' : 'tasks'}`}
        action={
          taskCount > 0 && (
            <Button type="button" onClick={() => setCreateNewTask(true)}>
              <PlusIcon />
              New Task
            </Button>
          )
        }
      >
        {taskCount > 0 ? (
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
              <InboxListComponent
                tasks={sampleTasks}
                onTaskClick={openDetail}
                onEdit={id => {
                  const task = sampleTasks.find(item => item.id === id);
                  if (task) openDetail(task);
                }}
              />
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

      {/* Create drawer */}
      <TaskDrawer
        open={createNewTask}
        onOpenChange={setCreateNewTask}
        title="New task"
        description="Add details, and create the task."
        formId="new-task-form"
        submitLabel="Create Task"
        contentRef={createDrawerRef}
      >
        <TaskForm
          id="new-task-form"
          users={users}
          portalContainer={createDrawerRef}
          onSubmit={values => {
            console.log(values); // replace with your create-task call
            setCreateNewTask(false);
          }}
        />
      </TaskDrawer>

      {/* Edit / detail drawer (sibling of the create drawer, not a child) */}
      <TaskDetail
        open={detailOpen}
        task={selectedTask}
        users={users}
        onOpenChange={setDetailOpen}
        onSave={(id, values) => {
          console.log(id, values); // replace with your update-task call
          setDetailOpen(false);
        }}
      />
    </>
  );
}
