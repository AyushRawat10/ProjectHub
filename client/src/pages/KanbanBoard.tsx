import type { ReactNode } from "react";
import { Link, useParams } from "react-router";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

type Task = {
  id: string;
  title: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: TaskStatus;
  assignee: string;
  initials: string;
  dueDate?: string;
  comments?: number;
  subtasks?: string;
};

const tasks: Task[] = [
  {
    id: "PH-104",
    title: "Design project member management",
    priority: "LOW",
    status: "TODO",
    assignee: "Ankit",
    initials: "AS",
    dueDate: "Oct 26",
    comments: 1,
  },
  {
    id: "PH-108",
    title: "Write integration tests for authentication",
    priority: "MEDIUM",
    status: "TODO",
    assignee: "Priya",
    initials: "PS",
    dueDate: "Oct 28",
    comments: 3,
  },
  {
    id: "PH-112",
    title: "Implement task filtering and search",
    priority: "HIGH",
    status: "TODO",
    assignee: "Rahul",
    initials: "RK",
    dueDate: "Oct 29",
  },
  {
    id: "PH-115",
    title: "Implement JWT refresh token flow",
    priority: "URGENT",
    status: "IN_PROGRESS",
    assignee: "Ayush",
    initials: "AR",
    dueDate: "Oct 20",
    comments: 2,
    subtasks: "3/4",
  },
  {
    id: "PH-119",
    title: "Create project member API",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignee: "Rahul",
    initials: "RK",
    dueDate: "Oct 18",
    comments: 3,
    subtasks: "3/4",
  },
  {
    id: "PH-122",
    title: "Setup task comment endpoints",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    assignee: "Priya",
    initials: "PS",
    dueDate: "Oct 21",
    comments: 2,
  },
  {
    id: "PH-126",
    title: "Refactor authentication middleware",
    priority: "HIGH",
    status: "IN_REVIEW",
    assignee: "Ayush",
    initials: "AR",
    comments: 2,
  },
  {
    id: "PH-129",
    title: "Standardize API error responses",
    priority: "LOW",
    status: "IN_REVIEW",
    assignee: "Ankit",
    initials: "AS",
    dueDate: "Oct 22",
    comments: 2,
  },
  {
    id: "PH-131",
    title: "Create user registration endpoint",
    priority: "MEDIUM",
    status: "DONE",
    assignee: "Ayush",
    initials: "AR",
    dueDate: "Completed Oct 15",
  },
  {
    id: "PH-133",
    title: "Implement email verification OTP",
    priority: "HIGH",
    status: "DONE",
    assignee: "Rahul",
    initials: "RK",
    dueDate: "Completed Oct 14",
  },
];

const columnConfig: {
  status: TaskStatus;
  label: string;
}[] = [
  {
    status: "TODO",
    label: "TODO",
  },
  {
    status: "IN_PROGRESS",
    label: "IN PROGRESS",
  },
  {
    status: "IN_REVIEW",
    label: "IN REVIEW",
  },
  {
    status: "DONE",
    label: "DONE",
  },
];

const KanbanBoard = () => {
  const { projectId } = useParams();

  const projectName = "ProjectHub";

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            ProjectHub
          </Link>

          {/* Breadcrumb */}

          <div className="hidden items-center gap-2 text-sm md:flex">
            <Link
              to="/projects"
              className="text-muted hover:text-neutral"
            >
              Projects
            </Link>

            <ChevronRightIcon />

            <Link
              to={`/projects/${projectId}`}
              className="text-muted hover:text-neutral"
            >
              {projectName}
            </Link>

            <ChevronRightIcon />

            <span className="font-medium">
              Board
            </span>
          </div>

          {/* Search */}

          <div className="hidden w-64 lg:block">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-panel px-3 text-sm text-muted">
              <SearchIcon />

              <span>Search tasks...</span>

              <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[10px]">
                /
              </span>
            </div>
          </div>

          {/* Account */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-lg border border-line px-3 py-2 text-sm font-medium hover:bg-secondary/40 sm:block"
            >
              Invite Members
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary"
              aria-label="Account"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          APP LAYOUT
      ====================================================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <aside className="hidden w-64 shrink-0 border-r border-line bg-panel lg:block">
          <div className="flex h-full flex-col p-4">
            {/* Workspace */}

            <button
              type="button"
              className="mb-3 flex w-full items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5 text-left"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-secondary">
                  PH
                </span>

                <span className="text-sm font-medium">
                  My Workspace
                </span>
              </span>

              <ChevronDownIcon />
            </button>

            {/* New Task */}

            <button
              type="button"
              className="mb-7 flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-secondary hover:bg-tertiary"
            >
              <PlusIcon />
              New Task

              <span className="ml-auto rounded bg-secondary/20 px-1.5 py-0.5 text-[10px]">
                C
              </span>
            </button>

            {/* Navigation */}

            <div>
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Core Workflows
              </p>

              <SidebarItem
                icon={<GridIcon />}
                label="Dashboard"
              />

              <SidebarItem
                icon={<FolderIcon />}
                label="Projects"
                count="6"
              />

              <SidebarItem
                icon={<BoardIcon />}
                label="Kanban Board"
                active
              />

              <SidebarItem
                icon={<CheckSquareIcon />}
                label="My Tasks"
                count="12"
              />

              <SidebarItem
                icon={<UsersIcon />}
                label="Team Members"
              />

              <SidebarItem
                icon={<SettingsIcon />}
                label="Settings"
              />
            </div>

            {/* Pinned projects */}

            <div className="mt-8">
              <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Pinned Projects
              </p>

              <PinnedProject name="ProjectHub" />
              <PinnedProject name="DevPulse" />
              <PinnedProject name="Portfolio" />
            </div>

            {/* Bottom account */}

            <div className="mt-auto">
              <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
                <span className="flex items-center gap-2 text-xs font-medium text-muted">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  All systems operational
                </span>

                <span className="text-xs text-muted">
                  ↻
                </span>
              </div>

              <div className="flex items-center gap-3 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-tertiary">
                  AR
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Ayush Rawat
                  </p>

                  <p className="text-xs text-muted">
                    Owner
                  </p>
                </div>

                <button
                  type="button"
                  className="ml-auto text-muted"
                  aria-label="More options"
                >
                  <MoreIcon />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
            {/* =================================================
                PROJECT HEADER
            ================================================= */}

            <section className="mb-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />

                    <Link
                      to={`/projects/${projectId}`}
                      className="font-display text-xl font-semibold hover:text-primary"
                    >
                      {projectName}
                    </Link>

                    <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-tertiary">
                      {projectId ?? "PRJ-01"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <BoardIcon />
                      Kanban Board
                    </span>

                    <span>•</span>

                    <span>
                      {tasks.length} tasks
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-sm sm:flex">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Active Project
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary hover:bg-tertiary"
                  >
                    <PlusIcon />
                    New Task
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                BOARD TOOLBAR
            ================================================= */}

            <section className="mb-5 flex flex-col gap-3 rounded-xl border border-line bg-panel p-3 sm:flex-row sm:items-center">
              {/* Search */}

              <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-sm text-muted sm:max-w-md">
                <SearchIcon />

                <span className="truncate">
                  Search project tasks...
                </span>

                <span className="ml-auto shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px]">
                  /
                </span>
              </div>

              {/* Filters */}

              <div className="flex items-center gap-2 overflow-x-auto">
                <FilterButton
                  icon={<FilterIcon />}
                  label="Filter"
                />

                <FilterButton
                  label="Priority"
                  dropdown
                />

                <FilterButton
                  label="Assignee"
                  dropdown
                />
              </div>

              <div className="hidden h-6 w-px bg-line xl:block" />

              <div className="hidden items-center gap-2 text-xs text-muted xl:flex">
                <span>
                  Group by:
                </span>

                <button
                  type="button"
                  className="font-medium text-neutral hover:text-primary"
                >
                  Status⌄
                </button>

                <span className="text-line">
                  |
                </span>

                <span>
                  Sort:
                </span>

                <button
                  type="button"
                  className="font-medium text-neutral hover:text-primary"
                >
                  Priority⌄
                </button>
              </div>
            </section>

            {/* =================================================
                KANBAN BOARD
            ================================================= */}

            <section className="overflow-x-auto pb-5">
              <div className="grid min-w-[72rem] grid-cols-4 gap-4">
                {columnConfig.map((column) => {
                  const columnTasks = getTasksByStatus(
                    column.status,
                  );

                  return (
                    <KanbanColumn
                      key={column.status}
                      status={column.status}
                      label={column.label}
                      tasks={columnTasks}
                    />
                  );
                })}
              </div>
            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="flex flex-col gap-3 border-t border-line pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                ProjectHub task board
              </span>

              <span>
                Press <kbd>/</kbd> to search
                <span className="mx-2">•</span>
                Press <kbd>C</kbd> to create a task
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ============================================================
   KANBAN COLUMN
   ============================================================ */

type KanbanColumnProps = {
  status: TaskStatus;
  label: string;
  tasks: Task[];
};

const KanbanColumn = ({
  status,
  label,
  tasks,
}: KanbanColumnProps) => {
  return (
    <div className="min-w-72 rounded-xl bg-secondary/35 p-2.5">
      {/* Column header */}

      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <StatusDot status={status} />

          <h2 className="text-sm font-semibold">
            {label}
          </h2>

          <span className="text-xs font-medium text-muted">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-paper hover:text-neutral"
          aria-label={`Add task to ${label}`}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Tasks */}

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>

      {/* Add task */}

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-muted hover:bg-paper/70 hover:text-neutral"
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
};

/* ============================================================
   TASK CARD
   ============================================================ */

const TaskCard = ({
  task,
}: {
  task: Task;
}) => {
  return (
    <Link
      to="#"
      className="block rounded-xl border border-line bg-panel p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Task ID + priority */}

      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-medium text-muted">
          {task.id}
        </span>

        <PriorityBadge priority={task.priority} />
      </div>

      {/* Title */}

      <h3 className="text-sm font-medium leading-5">
        {task.title}
      </h3>

      {/* Meta */}

      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-muted">
        <div className="flex min-w-0 items-center gap-3">
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 ${
                task.status !== "DONE" &&
                task.priority === "URGENT"
                  ? "text-red-600"
                  : ""
              }`}
            >
              <CalendarIcon />
              {task.dueDate}
            </span>
          )}

          {task.comments !== undefined && (
            <span className="flex items-center gap-1">
              <CommentIcon />
              {task.comments}
            </span>
          )}

          {task.subtasks && (
            <span className="flex items-center gap-1">
              <CheckIcon />
              {task.subtasks}
            </span>
          )}
        </div>

        {/* Assignee */}

        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-tertiary"
          title={task.assignee}
        >
          {task.initials}
        </span>
      </div>
    </Link>
  );
};

/* ============================================================
   SIDEBAR
   ============================================================ */

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  count?: string;
  active?: boolean;
};

const SidebarItem = ({
  icon,
  label,
  count,
  active = false,
}: SidebarItemProps) => {
  return (
    <Link
      to="#"
      className={`mb-1 flex h-9 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
        active
          ? "bg-primary text-secondary"
          : "text-muted hover:bg-secondary/40 hover:text-neutral"
      }`}
    >
      {icon}

      <span>{label}</span>

      {count && (
        <span
          className={`ml-auto rounded-full px-2 py-0.5 text-[11px] ${
            active
              ? "bg-secondary/20 text-secondary"
              : "bg-secondary text-tertiary"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
};

const PinnedProject = ({
  name,
}: {
  name: string;
}) => {
  return (
    <Link
      to="#"
      className="mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted hover:bg-secondary/40 hover:text-neutral"
    >
      <span className="h-2 w-2 rounded-full bg-primary" />

      <span className="truncate">
        {name}
      </span>
    </Link>
  );
};

/* ============================================================
   FILTERS
   ============================================================ */

const FilterButton = ({
  icon,
  label,
  dropdown = false,
}: {
  icon?: ReactNode;
  label: string;
  dropdown?: boolean;
}) => {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-medium text-muted hover:bg-secondary/40 hover:text-neutral"
    >
      {icon}

      {label}

      {dropdown && (
        <ChevronDownIcon />
      )}
    </button>
  );
};

/* ============================================================
   STATUS
   ============================================================ */

const StatusDot = ({
  status,
}: {
  status: TaskStatus;
}) => {
  const dotClass = {
    TODO: "bg-muted",
    IN_PROGRESS: "bg-primary",
    IN_REVIEW: "bg-tertiary",
    DONE: "bg-primary",
  };

  return (
    <span
      className={`h-2 w-2 rounded-full ${dotClass[status]}`}
    />
  );
};

/* ============================================================
   PRIORITY
   ============================================================ */

const PriorityBadge = ({
  priority,
}: {
  priority: Task["priority"];
}) => {
  const styles = {
    LOW: "bg-paper text-muted",
    MEDIUM: "bg-secondary text-tertiary",
    HIGH: "bg-secondary text-tertiary",
    URGENT: "bg-secondary text-tertiary",
  };

  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

/* ============================================================
   ICONS
   ============================================================ */

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4 shrink-0"
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 5 5" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20c.7-3.3 3.1-5 6.5-5s5.8 1.7 6.5 5" />
  </svg>
);

const GridIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </svg>
);

const FolderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
  </svg>
);

const BoardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 4v16M15 4v16" />
  </svg>
);

const CheckSquareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="m8 12 2.5 2.5L16 9" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
    <circle cx="9.5" cy="7" r="3" />
    <path d="M17 11a3 3 0 1 0-1-5.8" />
    <path d="M21 20v-1.5a4 4 0 0 0-2.8-3.8" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.4V14h-.4a1.7 1.7 0 0 0-1.6 1Z" />
  </svg>
);

const SearchSmallIcon = () => (
  <SearchIcon />
);

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="h-3.5 w-3.5"
  >
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </svg>
);

const CommentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="h-3.5 w-3.5"
  >
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export default KanbanBoard;