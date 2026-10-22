'use client';

import {formatDate} from '@anggit-mono/domain';
import {Button} from '@anggit-mono/ui/components/button';
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
import {PencilSimpleIcon, PlusIcon, XIcon} from '@phosphor-icons/react';
import {useRef, useState, type RefObject, type SubmitEvent} from 'react';
import UserItem from './user-item';
import type {Priority, Subtask, TaskFormValues, User} from './types';

const priorities: {value: Priority; label: string}[] = [
  {value: 'low', label: 'Low'},
  {value: 'medium', label: 'Medium'},
  {value: 'high', label: 'High'},
];

type TaskFormProps = {
  /** Used as the <form id>, so an external button can submit via form="..." */
  id: string;
  users: User[];
  defaultValues?: Partial<TaskFormValues>; // new
  onSubmit?: (values: TaskFormValues) => void;
  /** Where the combobox list portals to (e.g. the drawer content) */
  portalContainer?: RefObject<HTMLElement | null>;
};

export default function TaskForm({
  id,
  users,
  defaultValues,
  onSubmit,
  portalContainer,
}: TaskFormProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValues?.dueDate);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(
    defaultValues?.assignee,
  );
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    defaultValues?.subtasks ?? [],
  );
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtask, setEditingSubtask] = useState<number>();
  const [editedTitle, setEditedTitle] = useState('');
  const nextSubtaskId = useRef(
    Math.max(0, ...(defaultValues?.subtasks ?? []).map(s => s.id)) + 1,
  );

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

  function saveSubtask(subtaskId: number) {
    const title = editedTitle.trim();
    if (title) {
      setSubtasks(current =>
        current.map(subtask =>
          subtask.id === subtaskId ? {...subtask, title} : subtask,
        ),
      );
    }
    setEditingSubtask(undefined);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    onSubmit?.({
      title: String(data.get('title') ?? ''),
      description: String(data.get('description') ?? ''),
      priority: (data.get('priority') as Priority) ?? 'low',
      dueDate: date,
      assignee: selectedUser,
      subtasks,
    });
  }

  return (
    <form id={id} onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={defaultValues?.title}
            placeholder="e.g. Prepare UI Components"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={defaultValues?.description}
            placeholder="Optional details"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="priority">Priority</FieldLabel>
            <Select
              name="priority"
              defaultValue={defaultValues?.priority ?? 'low'}
            >
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
                  id="due_date"
                  className="justify-start font-normal"
                >
                  {date ? formatDate(date, 'PPP') : <span>Pick a date</span>}
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
              <ComboboxContent container={portalContainer}>
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
                      onChange={event => setEditedTitle(event.target.value)}
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
    </form>
  );
}
