'use client';

import {
  PencilSimpleIcon,
  PlusIcon,
  TrayIcon,
  XIcon,
} from '@phosphor-icons/react';

import {Button} from '@anggit-mono/ui/components/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@anggit-mono/ui/components/drawer';
import {useIsMobile} from '@anggit-mono/ui/hooks/use-mobile';
import {useRef, useState} from 'react';

import {formatDate} from '@anggit-mono/domain';
import {Calendar} from '@anggit-mono/ui/components/calendar';
import {Checkbox} from '@anggit-mono/ui/components/checkbox';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@anggit-mono/ui/components/combobox';
import {Field, FieldGroup, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@anggit-mono/ui/components/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@anggit-mono/ui/components/select';
import {Textarea} from '@anggit-mono/ui/components/textarea';
import DashboardShell from '../dashboard-shell';
import TicketEmptyState from '../ticket-empty-state';
import UserItem, {type User} from '../user-item';
import {TaskGroup} from './types';
import {UpcomingList} from './upcoming-list';

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

type Subtask = {id: number; title: string; completed: boolean};

export default function UpcomingMainComponent() {
  const [createNewTicket, setCreateNewTicket] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtask, setEditingSubtask] = useState<number>();
  const [editedTitle, setEditedTitle] = useState('');
  const nextSubtaskId = useRef(1);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const tasks = [];

  const priorities = [
    {value: 'LOW', label: 'Low'},
    {value: 'MEDIUM', label: 'Medium'},
    {value: 'HIGH', label: 'High'},
  ];

  function addSubtask() {
    const title = newSubtask.trim();
    if (!title) return;

    setSubtasks(current => [
      ...current,
      {id: nextSubtaskId.current++, title, completed: false},
    ]);
    setNewSubtask('');
    setAddingSubtask(false);
  }

  function saveSubtask(id: number) {
    const title = editedTitle.trim();
    if (title) {
      setSubtasks(current =>
        current.map(subtask =>
          subtask.id === id ? {...subtask, title} : subtask,
        ),
      );
    }
    setEditingSubtask(undefined);
  }

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
      <DashboardShell
        title={'Upcoming'}
        description={' Next 5 days . 0 task'}
        action={
          upcomingSampleGroups.length > 0 && (
            <Button type="button" onClick={() => setCreateNewTicket(true)}>
              <PlusIcon />
              New Task
            </Button>
          )
        }
      >
        {tasks.length > 0 ? (
          <div className="mt-4">
            <TicketEmptyState
              title="No tickets in Inbox"
              description="New tickets will appear here."
              icon={TrayIcon}
              action
              setCreateNewTicket={setCreateNewTicket}
            />
          </div>
        ) : (
          <UpcomingList groups={upcomingSampleGroups} />
        )}
      </DashboardShell>

      <Drawer
        open={createNewTicket}
        onOpenChange={setCreateNewTicket}
        direction={isMobile ? 'bottom' : 'right'}
      >
        <DrawerContent ref={drawerRef}>
          <DrawerHeader>
            <DrawerTitle>New ticket</DrawerTitle>
            <DrawerDescription>
              Add details, and create the task.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 scroll-fade overflow-y-auto p-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Prepare UI Components"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Optional details"
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="priority">Priority</FieldLabel>
                  <Select defaultValue="LOW">
                    <SelectTrigger id="priority" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {priorities.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="due_date">Due Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {date ? (
                          formatDate(date, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="assignee">Assignee</FieldLabel>
                {selectedUser ? (
                  <div className="border p-2">
                    <UserItem
                      user={selectedUser}
                      action={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="Remove assignee"
                          onClick={() => setSelectedUser(undefined)}
                        >
                          <XIcon data-icon="inline-start" />
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <Combobox
                    items={users}
                    onValueChange={value => setSelectedUser(value as User)}
                    itemToStringValue={value => (value as User).username}
                  >
                    <ComboboxInput
                      id="assignee"
                      placeholder="Select an assignee"
                      className="w-full"
                    />
                    <ComboboxContent container={drawerRef}>
                      <ComboboxEmpty>No users found.</ComboboxEmpty>
                      <ComboboxList>
                        {value => {
                          const user = value as User;

                          return (
                            <ComboboxItem key={user.username} value={user}>
                              <UserItem user={user} />
                            </ComboboxItem>
                          );
                        }}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              </Field>
              <Field>
                <FieldLabel>Subtask</FieldLabel>
                <div className="flex flex-col items-start gap-1">
                  {subtasks.map(subtask => (
                    <div
                      key={subtask.id}
                      className="group/subtask flex w-full items-center justify-between gap-2"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <Checkbox
                          id={`subtask-${subtask.id}`}
                          checked={subtask.completed}
                          aria-label={`Complete ${subtask.title}`}
                          onCheckedChange={checked =>
                            setSubtasks(current =>
                              current.map(item =>
                                item.id === subtask.id
                                  ? {...item, completed: checked === true}
                                  : item,
                              ),
                            )
                          }
                        />
                        {editingSubtask === subtask.id ? (
                          <Input
                            autoFocus
                            aria-label="Edit subtask"
                            value={editedTitle}
                            onChange={event =>
                              setEditedTitle(event.target.value)
                            }
                            onBlur={() => saveSubtask(subtask.id)}
                            onKeyDown={event => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                saveSubtask(subtask.id);
                              }
                            }}
                          />
                        ) : (
                          <label
                            htmlFor={`subtask-${subtask.id}`}
                            className={
                              subtask.completed
                                ? 'min-w-0 flex-1 cursor-pointer line-through text-muted-foreground'
                                : 'min-w-0 flex-1 cursor-pointer'
                            }
                          >
                            {subtask.title}
                          </label>
                        )}
                      </div>
                      <div className="flex items-center opacity-0 transition-opacity group-hover/subtask:opacity-100 group-focus-within/subtask:opacity-100 [@media(hover:none)]:opacity-100">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${subtask.title}`}
                          onClick={() => {
                            setEditingSubtask(subtask.id);
                            setEditedTitle(subtask.title);
                          }}
                        >
                          <PencilSimpleIcon />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${subtask.title}`}
                          onClick={() =>
                            setSubtasks(current =>
                              current.filter(item => item.id !== subtask.id),
                            )
                          }
                        >
                          <XIcon />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {addingSubtask && (
                    <div className="flex w-full items-center gap-2">
                      <Checkbox disabled aria-label="New subtask" />
                      <Input
                        autoFocus
                        aria-label="New subtask"
                        placeholder="Subtask title"
                        value={newSubtask}
                        onChange={event => setNewSubtask(event.target.value)}
                        onKeyDown={event => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            addSubtask();
                          }
                          if (event.key === 'Escape') {
                            setNewSubtask('');
                            setAddingSubtask(false);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Cancel adding subtask"
                        onClick={() => {
                          setNewSubtask('');
                          setAddingSubtask(false);
                        }}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    className="text-normal"
                    onClick={() => setAddingSubtask(true)}
                  >
                    <PlusIcon />
                    Add subtask
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </div>
          <DrawerFooter>
            <div className="flex gap-2 items-center justify-end">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Create Task</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
