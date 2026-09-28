import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ==================== TOP BAR ==================== */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            ProjectHub
          </Link>

          {/* Workspace */}
          <div className="hidden items-center gap-2 text-sm text-muted md:flex">
            <span>My Workspace</span>
            <ChevronRightIcon />
            <span className="font-medium text-neutral">
              Dashboard
            </span>
          </div>

          {/* Search */}
          <div className="hidden w-64 lg:block">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-panel px-3 text-sm text-muted">
              <SearchIcon />
              <span>Search tasks, projects...</span>
              <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[10px]">
                ⌘K
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden rounded-lg border border-line px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/40 sm:block"
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

      {/* ==================== APP LAYOUT ==================== */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ==================== SIDEBAR ==================== */}
        <aside className="hidden w-64 shrink-0 border-r border-line bg-panel lg:block">
          <div className="flex h-full flex-col p-4">
            {/* Workspace switcher */}
            <button
              type="button"
              className="mb-3 flex w-full items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5 text-left transition-colors hover:bg-secondary"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-secondary">
                  PH
                </span>

                <span className="truncate text-sm font-medium">
                  My Workspace
                </span>
              </span>

              <ChevronDownIcon />
            </button>

            {/* New project */}
            <Link
              to="/projects/new"
              className="mb-7 flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
            >
              <PlusIcon />
              New Project
            </Link>

            {/* Navigation */}
            <div>
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Workspace
              </p>

              <SidebarItem
                icon={<GridIcon />}
                label="Dashboard"
                active
              />

              <SidebarItem
                icon={<FolderIcon />}
                label="Projects"
                count="3"
              />

              <SidebarItem
                icon={<CheckSquareIcon />}
                label="My Tasks"
                count="8"
              />

              <SidebarItem
                icon={<UsersIcon />}
                label="Team Members"
              />
            </div>

            {/* Projects */}
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Projects
                </p>

                <Link
                  to="/projects"
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </div>

              <ProjectSidebarItem
                name="ProjectHub"
                color="bg-primary"
              />

              <ProjectSidebarItem
                name="DevPulse"
                color="bg-secondary"
              />

              <ProjectSidebarItem
                name="Portfolio"
                color="bg-muted"
              />
            </div>

            {/* Bottom */}
            <div className="mt-auto">
              <SidebarItem
                icon={<SettingsIcon />}
                label="Settings"
              />

              <div className="mt-4 rounded-lg border border-line bg-paper p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-secondary">
                    AR
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      Ayush Rawat
                    </p>

                    <p className="truncate text-xs text-muted">
                      Account
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
          </div>
        </aside>

        {/* ==================== MAIN CONTENT ==================== */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
            {/* Mobile navigation */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto lg:hidden">
              <MobileNavItem
                label="Dashboard"
                active
              />

              <MobileNavItem label="Projects" />

              <MobileNavItem label="My Tasks" />

              <MobileNavItem label="Members" />
            </div>

            {/* ==================== PAGE HEADER ==================== */}
            <section className="mb-8">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Workspace overview
                  </p>

                  <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Good morning, Ayush
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                    Here's what's happening across your projects and tasks.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/projects/new"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
                  >
                    <PlusIcon />
                    New Project
                  </Link>

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-line bg-panel px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary/40"
                  >
                    <FilterIcon />
                    Customize
                  </button>
                </div>
              </div>
            </section>

            {/* ==================== STATS ==================== */}
            <section className="mb-9 grid gap-4 md:grid-cols-3">
              <StatCard
                label="Active Projects"
                value="3"
                description="Projects you're currently working on"
                icon={<FolderIcon />}
              />

              <StatCard
                label="My Tasks"
                value="8"
                description="3 in progress · 2 due soon"
                icon={<CheckSquareIcon />}
              />

              <StatCard
                label="Team Members"
                value="12"
                description="Across all your projects"
                icon={<UsersIcon />}
              />
            </section>

            {/* ==================== PROJECTS ==================== */}
            <section className="mb-9">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    Recent Projects
                  </h2>

                  <p className="mt-1 text-sm text-muted">
                    Projects you've recently worked on.
                  </p>
                </div>

                <Link
                  to="/projects"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <ProjectCard
                  title="ProjectHub"
                  description="Project management workspace for development teams."
                  members="4 members"
                  tasks="14 tasks"
                  progress={72}
                  updated="2 hours ago"
                  color="bg-primary"
                />

                <ProjectCard
                  title="DevPulse"
                  description="Developer-focused news and information platform."
                  members="3 members"
                  tasks="22 tasks"
                  progress={45}
                  updated="Yesterday"
                  color="bg-secondary"
                  darkText
                />

                <ProjectCard
                  title="Portfolio"
                  description="Personal portfolio and project showcase."
                  members="2 members"
                  tasks="8 tasks"
                  progress={90}
                  updated="3 days ago"
                  color="bg-muted"
                />
              </div>
            </section>

            {/* ==================== TASKS ==================== */}
            <section>
              <div className="mb-4">
                <h2 className="font-display text-xl font-semibold">
                  My Tasks
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Tasks assigned to you across your projects.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-line bg-panel">
                {/* Task controls */}
                <div className="flex flex-col gap-3 border-b border-line p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-1 overflow-x-auto">
                    <TaskFilter
                      label="All"
                      count="8"
                      active
                    />

                    <TaskFilter
                      label="In Progress"
                      count="3"
                    />

                    <TaskFilter
                      label="Urgent"
                      count="2"
                    />
                  </div>

                  <div className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-sm text-muted sm:w-56">
                    <SearchIcon />
                    <span>Filter tasks...</span>
                  </div>
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                        <th className="px-5 py-3 font-medium">
                          Task
                        </th>

                        <th className="px-4 py-3 font-medium">
                          Status
                        </th>

                        <th className="px-4 py-3 font-medium">
                          Priority
                        </th>

                        <th className="px-4 py-3 font-medium">
                          Project
                        </th>

                        <th className="px-5 py-3 text-right font-medium">
                          Due date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <TaskRow
                        id="TASK-108"
                        title="Implement task filtering"
                        status="In Progress"
                        priority="HIGH"
                        project="ProjectHub"
                        due="Today"
                        urgent
                      />

                      <TaskRow
                        id="TASK-114"
                        title="Build project member list"
                        status="In Progress"
                        priority="MEDIUM"
                        project="ProjectHub"
                        due="Tomorrow"
                      />

                      <TaskRow
                        id="DEV-88"
                        title="Design developer news cards"
                        status="In Review"
                        priority="MEDIUM"
                        project="DevPulse"
                        due="Oct 22"
                      />

                      <TaskRow
                        id="PG-45"
                        title="Update portfolio projects"
                        status="TODO"
                        priority="URGENT"
                        project="Portfolio"
                        due="Oct 24"
                        urgent
                      />

                      <TaskRow
                        id="TASK-120"
                        title="Update API documentation"
                        status="DONE"
                        priority="LOW"
                        project="ProjectHub"
                        due="Oct 16"
                        completed
                      />
                    </tbody>
                  </table>
                </div>

                {/* Mobile task list */}
                <div className="divide-y divide-line md:hidden">
                  <MobileTask
                    title="Implement task filtering"
                    project="ProjectHub"
                    status="In Progress"
                    priority="High"
                    due="Today"
                  />

                  <MobileTask
                    title="Build project member list"
                    project="ProjectHub"
                    status="In Progress"
                    priority="Medium"
                    due="Tomorrow"
                  />

                  <MobileTask
                    title="Design developer news cards"
                    project="DevPulse"
                    status="In Review"
                    priority="Medium"
                    due="Oct 22"
                  />

                  <MobileTask
                    title="Update portfolio projects"
                    project="Portfolio"
                    status="Todo"
                    priority="Urgent"
                    due="Oct 24"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-line bg-paper/50 px-5 py-3 text-xs text-muted">
                  <span>5 of 8 tasks shown</span>

                  <Link
                    to="/tasks"
                    className="font-medium text-primary hover:underline"
                  >
                    View all tasks →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR
   ============================================================ */

type SidebarItemProps = {
  icon: React.ReactNode;
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

type ProjectSidebarItemProps = {
  name: string;
  color: string;
};

const ProjectSidebarItem = ({
  name,
  color,
}: ProjectSidebarItemProps) => {
  return (
    <Link
      to="#"
      className="mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted hover:bg-secondary/40 hover:text-neutral"
    >
      <span className={`h-2 w-2 rounded-full ${color}`} />

      <span className="truncate">{name}</span>
    </Link>
  );
};

const MobileNavItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`shrink-0 rounded-full px-4 py-2 text-sm ${
        active
          ? "bg-primary text-secondary"
          : "border border-line bg-panel text-muted"
      }`}
    >
      {label}
    </button>
  );
};

/* ============================================================
   STAT CARD
   ============================================================ */

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

const StatCard = ({
  label,
  value,
  description,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <div className="mb-7 flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/60 text-primary">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold">
          {value}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">
        {description}
      </p>
    </div>
  );
};

/* ============================================================
   PROJECT CARD
   ============================================================ */

type ProjectCardProps = {
  title: string;
  description: string;
  members: string;
  tasks: string;
  progress: number;
  updated: string;
  color: string;
  darkText?: boolean;
};

const ProjectCard = ({
  title,
  description,
  members,
  tasks,
  progress,
  updated,
  color,
  darkText = false,
}: ProjectCardProps) => {
  return (
    <Link
      to="#"
      className="group rounded-xl border border-line bg-panel p-5 transition-shadow hover:shadow-[0_8px_25px_rgba(2,61,61,0.08)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${color}`}
          />

          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Project
          </span>
        </div>

        <span className="text-xs text-muted">
          {progress}%
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold group-hover:text-primary">
        {title}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-muted">
        {description}
      </p>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary/70">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>{members}</span>
        <span>{tasks}</span>
        <span>{updated}</span>
      </div>
    </Link>
  );
};

/* ============================================================
   TASKS
   ============================================================ */

const TaskFilter = ({
  label,
  count,
  active = false,
}: {
  label: string;
  count: string;
  active?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${
        active
          ? "bg-secondary text-tertiary"
          : "text-muted hover:bg-secondary/40"
      }`}
    >
      {label}{" "}
      <span className="ml-1 opacity-70">
        {count}
      </span>
    </button>
  );
};

type TaskRowProps = {
  id: string;
  title: string;
  status: string;
  priority: string;
  project: string;
  due: string;
  urgent?: boolean;
  completed?: boolean;
};

const TaskRow = ({
  id,
  title,
  status,
  priority,
  project,
  due,
  urgent = false,
  completed = false,
}: TaskRowProps) => {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-primary">
            {id}
          </span>

          <span
            className={`text-sm ${
              completed ? "text-muted line-through" : ""
            }`}
          >
            {title}
          </span>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className="flex items-center gap-2 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "In Progress"
                ? "bg-primary"
                : status === "In Review"
                  ? "bg-secondary"
                  : status === "DONE"
                    ? "bg-primary"
                    : "bg-muted"
            }`}
          />

          {status}
        </span>
      </td>

      <td className="px-4 py-4">
        <span
          className={`text-xs font-medium ${
            urgent
              ? "text-red-600"
              : "text-muted"
          }`}
        >
          {priority}
        </span>
      </td>

      <td className="px-4 py-4 text-xs text-muted">
        {project}
      </td>

      <td
        className={`px-5 py-4 text-right text-xs ${
          due === "Today"
            ? "font-medium text-red-600"
            : "text-muted"
        }`}
      >
        {due}
      </td>
    </tr>
  );
};

const MobileTask = ({
  title,
  project,
  status,
  priority,
  due,
}: {
  title: string;
  project: string;
  status: string;
  priority: string;
  due: string;
}) => {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          <p className="mt-1 text-xs text-muted">
            {project}
          </p>
        </div>

        <span className="shrink-0 text-xs font-medium text-primary">
          {priority}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>{status}</span>
        <span>{due}</span>
      </div>
    </div>
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
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.4V14h-.4a1.7 1.7 0 0 0-1.6 1Z"
    />
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

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export default Dashboard;