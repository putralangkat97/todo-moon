// Shared types for the task management app (web + API).
// These mirror schema.prisma but use plain strings for dates, so they are safe
// to use in the browser and match what the API sends as JSON.
// Put this file in a shared package, for example packages/types/src/index.ts.

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export type GreetingResponse = string;

/** Full timestamp, e.g. "2026-10-19T09:30:00.000Z". */
export type ISODateTime = string;
/** Calendar date without a time, e.g. "2026-10-19". */
export type ISODate = string;

// ---------------------------------------------------------------------------
// Enums (same values as schema.prisma)
// ---------------------------------------------------------------------------

export const MEMBER_ROLES = ['OWNER', 'EDITOR', 'VIEWER'] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export const WORKSPACE_USAGES = ['PERSONAL', 'WORK', 'TEAM'] as const;
export type WorkspaceUsage = (typeof WORKSPACE_USAGES)[number];

export type StepContext = {
  userName: string;
  values: WorkspaceUsage;
};

export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const OAUTH_PROVIDERS = ['GITHUB', 'GOOGLE'] as const;
export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const AUTH_TOKEN_TYPES = ['EMAIL_VERIFICATION', 'PASSWORD_RESET'] as const;
export type AuthTokenType = (typeof AUTH_TOKEN_TYPES)[number];

export const INVITE_STATUSES = ['PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED'] as const;
export type InviteStatus = (typeof INVITE_STATUSES)[number];

export const THEME_PREFERENCES = ['LIGHT', 'DARK', 'SYSTEM'] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export const DENSITIES = ['COMFORTABLE', 'COMPACT'] as const;
export type Density = (typeof DENSITIES)[number];

export const WEEK_STARTS = ['MONDAY', 'SUNDAY'] as const;
export type WeekStart = (typeof WEEK_STARTS)[number];

export const DATE_FORMATS = ['MMM_D_YYYY', 'D_M_YYYY', 'YYYY_MM_DD'] as const;
export type DateFormat = (typeof DATE_FORMATS)[number];

export const ACTIVITY_TYPES = [
  'TASK_CREATED',
  'TASK_ASSIGNED',
  'PRIORITY_CHANGED',
  'STATUS_CHANGED',
  'DUE_DATE_CHANGED',
  'TASK_COMPLETED',
  'TASK_REOPENED',
  'COMMENT_ADDED',
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

// ---------------------------------------------------------------------------
// Entities (what the API returns)
// ---------------------------------------------------------------------------

/** The signed-in user. Never includes the password hash. */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  emailVerifiedAt: ISODateTime | null;
  onboardedAt: ISODateTime | null;
  createdAt: ISODateTime;
}

/** A teammate shown in lists, avatars and mentions. */
export type UserSummary = Pick<User, 'id' | 'name' | 'avatarUrl'> & {
  /** Only sent to people who share a workspace with this user. */
  email?: string;
};

export interface UserSettings {
  theme: ThemePreference;
  density: Density;
  weekStartsOn: WeekStart;
  dateFormat: DateFormat;
  emailDueReminders: boolean;
  emailDailySummary: boolean;
  emailAssignments: boolean;
  emailWeeklyDigest: boolean;
  pushDueSoon: boolean;
  pushOverdue: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  usage: WorkspaceUsage;
  createdAt: ISODateTime;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  color: string;
  dueDate: ISODate | null;
  archivedAt: ISODateTime | null;
  createdById: string;
  createdAt: ISODateTime;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  role: MemberRole;
  user: UserSummary;
  openTaskCount: number;
  lastActiveAt: ISODateTime | null;
}

export interface Invite {
  id: string;
  email: string;
  role: MemberRole;
  message: string | null;
  status: InviteStatus;
  workspaceId: string;
  projectId: string | null;
  expiresAt: ISODateTime;
  createdAt: ISODateTime;
}

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  done: boolean;
  position: number;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: ISODate | null;
  completedAt: ISODateTime | null;
  position: number;
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  createdById: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Comment {
  id: string;
  taskId: string;
  author: UserSummary;
  body: string;
  mentions: UserSummary[];
  editedAt: ISODateTime | null;
  createdAt: ISODateTime;
}

// ---------------------------------------------------------------------------
// Activity history (discriminated union on `type`)
// ---------------------------------------------------------------------------

interface ActivityBase {
  id: string;
  taskId: string;
  actor: UserSummary;
  createdAt: ISODateTime;
}

export type ActivityEvent = ActivityBase &
  (
    | {type: 'TASK_CREATED'; payload: null}
    | {
        type: 'TASK_ASSIGNED';
        payload: {from: UserSummary | null; to: UserSummary | null};
      }
    | {
        type: 'PRIORITY_CHANGED';
        payload: {from: TaskPriority; to: TaskPriority};
      }
    | {type: 'STATUS_CHANGED'; payload: {from: TaskStatus; to: TaskStatus}}
    | {
        type: 'DUE_DATE_CHANGED';
        payload: {from: ISODate | null; to: ISODate | null};
      }
    | {type: 'TASK_COMPLETED'; payload: null}
    | {type: 'TASK_REOPENED'; payload: null}
    | {type: 'COMMENT_ADDED'; payload: {commentId: string}}
  );

// ---------------------------------------------------------------------------
// View types (joined data for each screen)
// ---------------------------------------------------------------------------

export type ProjectSummary = Pick<Project, 'id' | 'name' | 'color'>;

/** A row in the task list, Today, Upcoming, Completed and board cards. */
export interface TaskListItem extends Task {
  project: ProjectSummary | null;
  assignee: UserSummary | null;
  subtaskCount: number;
  subtasksDone: number;
  commentCount: number;
}

/** The Edit task panel (Details, Comments and Activity tabs). */
export interface TaskDetail extends TaskListItem {
  subtasks: Subtask[];
  comments: Comment[];
  activity: ActivityEvent[];
}

/** A card on the Projects page and the header of Project detail. */
export interface ProjectWithStats extends Project {
  openTasks: number;
  completedTasks: number;
  /** 0 to 100: completed tasks divided by all tasks. */
  progress: number;
  members: UserSummary[];
}

/** Columns for the project Board view. */
export type BoardColumns = Record<TaskStatus, TaskListItem[]>;

/** Sidebar data: counts and the project list. */
export interface SidebarData {
  inboxCount: number;
  projects: ProjectSummary[];
}

export interface Session {
  user: User;
  settings: UserSettings;
  workspace: Workspace;
}

// ---------------------------------------------------------------------------
// Request inputs (forms)
// ---------------------------------------------------------------------------

// Auth
export interface SignUpInput {
  name: string;
  email: string;
  /** At least 8 characters. */
  password: string;
  acceptTerms: boolean;
}

export interface LogInInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface VerifyEmailInput {
  token: string;
}

export interface ResendVerificationInput {
  email: string;
}

// Onboarding (one input per step)
export interface OnboardingWorkspaceInput {
  workspaceName: string;
  usage: WorkspaceUsage;
}

export interface OnboardingProjectInput {
  name: string;
  description?: string;
  firstTaskTitle?: string;
}

export interface OnboardingInvitesInput {
  invites: Array<{email: string; role: Exclude<MemberRole, 'OWNER'>}>;
}

// Tasks
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: ISODate | null;
  projectId?: string | null;
  assigneeId?: string | null;
  subtasks?: Array<{title: string}>;
}

export type UpdateTaskInput = Partial<Omit<CreateTaskInput, 'subtasks'>>;

export interface MoveTaskInput {
  status: TaskStatus;
  /** Position between its new neighbours in the column. */
  position: number;
}

export interface CreateSubtaskInput {
  title: string;
}

export interface UpdateSubtaskInput {
  title?: string;
  done?: boolean;
  position?: number;
}

export type TaskView = 'inbox' | 'today' | 'upcoming' | 'completed';
export type TaskSort = 'dueDate' | 'priority' | 'createdAt';

export interface TaskFilters {
  view?: TaskView;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: string;
  assigneeId?: string;
  search?: string;
  sort?: TaskSort;
  cursor?: string;
  limit?: number;
}

// Comments
export interface CreateCommentInput {
  body: string;
  mentionUserIds?: string[];
}

export interface UpdateCommentInput {
  body: string;
}

// Projects and members
export interface CreateProjectInput {
  name: string;
  description?: string;
  color?: string;
  dueDate?: ISODate | null;
  memberIds?: string[];
}

export type UpdateProjectInput = Partial<Omit<CreateProjectInput, 'memberIds'>> & {
  archived?: boolean;
};

export interface InviteMemberInput {
  email: string;
  role: Exclude<MemberRole, 'OWNER'>;
  message?: string;
}

export interface UpdateMemberRoleInput {
  role: MemberRole;
}

// Settings
export interface UpdateProfileInput {
  name?: string;
  email?: string;
  avatarUrl?: string | null;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export type UpdateNotificationSettingsInput = Partial<
  Pick<
    UserSettings,
    'emailDueReminders' | 'emailDailySummary' | 'emailAssignments' | 'emailWeeklyDigest' | 'pushDueSoon' | 'pushOverdue'
  >
>;

export type UpdateAppearanceSettingsInput = Partial<
  Pick<UserSettings, 'theme' | 'density' | 'weekStartsOn' | 'dateFormat'>
>;

export interface DeleteAccountInput {
  /** The user must type DELETE to confirm. */
  confirmation: 'DELETE';
}

// ---------------------------------------------------------------------------
// API envelopes
// ---------------------------------------------------------------------------

export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
}

export type FieldErrors<T> = Partial<Record<keyof T & string, string>>;

export interface ApiError<T = unknown> {
  statusCode: number;
  /** Stable machine-readable code, e.g. "EMAIL_TAKEN" or "INVALID_CREDENTIALS". */
  code: string;
  message: string;
  fieldErrors?: FieldErrors<T>;
}

export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_TAKEN: 'EMAIL_TAKEN',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
} as const;
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
