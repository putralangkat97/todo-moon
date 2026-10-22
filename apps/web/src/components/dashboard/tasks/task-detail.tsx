'use client';

import {useRef, useState} from 'react';

import {Avatar, AvatarFallback} from '@anggit-mono/ui/components/avatar';
import {Badge} from '@anggit-mono/ui/components/badge';
import {Button} from '@anggit-mono/ui/components/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@anggit-mono/ui/components/tabs';
import {Textarea} from '@anggit-mono/ui/components/textarea';
import {ListIcon} from '@phosphor-icons/react';
import TaskDrawer from './task-drawer';
import TaskForm from './task-form';
import type {TaskDetailData, TaskFormValues, User} from './types';

type TaskDetailProps = {
  open: boolean;
  /** Keep the last task around after closing so the exit animation can finish */
  task?: TaskDetailData;
  users: User[];
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, values: TaskFormValues) => void;
  onAddComment?: (id: string, body: string) => void;
};

const FORM_ID = 'edit-task-form';

export default function TaskDetail({
  open,
  task,
  users,
  onOpenChange,
  onSave,
  onAddComment,
}: TaskDetailProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState('details');
  const [comment, setComment] = useState('');

  function handleOpenChange(next: boolean) {
    if (!next) {
      setTab('details');
      setComment('');
    }
    onOpenChange(next);
  }

  function submitComment() {
    const body = comment.trim();
    if (!body || !task) return;
    onAddComment?.(task.id, body);
    setComment('');
  }

  const comments = task?.comments ?? [];
  const activity = task?.activity ?? [];

  return (
    <TaskDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Edit task"
      description="Update the details, then save your changes."
      formId={FORM_ID}
      submitLabel="Save changes"
      contentRef={drawerRef}
      showFooter={tab === 'details'}
    >
      {task && (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="details">
              <ListIcon />
              Details
            </TabsTrigger>
            <TabsTrigger value="comments" disabled>
              Comments
              <Badge>soon</Badge>
            </TabsTrigger>
            <TabsTrigger value="activity" disabled>
              Activity
              <Badge>soon</Badge>
            </TabsTrigger>
          </TabsList>

          {/* forceMount keeps unsaved edits alive when switching tabs */}
          <TabsContent
            value="details"
            forceMount
            className="pt-4 data-[state=inactive]:hidden"
          >
            <TaskForm
              key={task.id}
              id={FORM_ID}
              users={users}
              defaultValues={task}
              portalContainer={drawerRef}
              onSubmit={values => onSave(task.id, values)}
            />
          </TabsContent>

          <TabsContent value="comments" className="flex flex-col gap-4 pt-4">
            {comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
            {comments.map(item => (
              <div key={item.id} className="flex gap-3">
                <Avatar className="size-7">
                  <AvatarFallback className="text-xs">
                    {item.author}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">
                    {item.createdLabel}
                  </span>
                  <p className="text-sm">{item.body}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <Textarea
                aria-label="Write a comment"
                placeholder="Write a comment"
                value={comment}
                onChange={event => setComment(event.target.value)}
              />
              <Button
                type="button"
                size="sm"
                className="self-end"
                disabled={!comment.trim()}
                onClick={submitComment}
              >
                Comment
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="flex flex-col gap-3 pt-4">
            {activity.length === 0 && (
              <p className="text-sm text-muted-foreground">No activity yet.</p>
            )}
            {activity.map(item => (
              <div
                key={item.id}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span>{item.message}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.timeLabel}
                </span>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </TaskDrawer>
  );
}
