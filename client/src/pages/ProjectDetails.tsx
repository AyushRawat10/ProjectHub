import { Link, useParams } from "react-router";
import Sidebar from "../components/layouts/Sidebar";

const ProjectDetails = () => {
  const { projectId } = useParams();

  // Temporary data.
  // Later this will come from your API.
  const project = {
    id: projectId ?? "PRJ-01",
    name: "ProjectHub",
    description:
      "Project management workspace for development teams, tasks, members, and comments.",
    owner: "Ayush Rawat",
    totalTasks: 14,
    completedTasks: 8,
    inProgressTasks: 3,
    reviewTasks: 2,
    todoTasks: 1,
    members: 4,
  };

  const progress = Math.round(
    (project.completedTasks / project.totalTasks) * 100,
  );

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

          <div className="hidden items-center gap-2 text-sm text-muted md:flex">
            <Link
              to="/projects"
              className="hover:text-neutral"
            >
              Projects
            </Link>

            <ChevronRightIcon />

            <span className="font-medium text-neutral">
              {project.name}
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

        <Sidebar activePage="projects" project={{name: project.name, id: project.id, currentView: "overview"}}/>

        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Mobile breadcrumb */}

            <div className="mb-5 flex items-center gap-2 text-sm text-muted lg:hidden">
              <Link
                to="/projects"
                className="hover:text-neutral"
              >
                Projects
              </Link>

              <ChevronRightIcon />

              <span className="font-medium text-neutral">
                {project.name}
              </span>
            </div>

            {/* ==================================================
                PROJECT HEADER
            ================================================== */}

            <section className="rounded-xl border border-line bg-panel p-5 sm:p-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Project information */}

                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-secondary">
                    PH
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {project.name}
                      </h1>

                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-tertiary">
                        Active
                      </span>
                    </div>

                    <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <UserSmallIcon />
                        Owner:{" "}
                        <strong className="font-medium text-neutral">
                          {project.owner}
                        </strong>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <UsersIcon />
                        {project.members} members
                      </span>

                      <span className="font-mono">
                        {project.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    to={`/projects/${project.id}/board`}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary hover:bg-tertiary"
                  >
                    <BoardIcon />
                    Open Board
                  </Link>

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-medium hover:bg-secondary/40"
                  >
                    <EditIcon />
                    Edit Project
                  </button>
                </div>
              </div>
            </section>

            {/* ==================================================
                PROJECT NAVIGATION
            ================================================== */}

            <nav className="my-5 flex gap-1 overflow-x-auto border-b border-line">
              <ProjectTab
                label="Overview"
                active
              />

              <Link
                to={`/projects/${project.id}/board`}
                className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm text-muted hover:text-neutral"
              >
                <BoardIcon />
                Board
              </Link>

              <ProjectTab
                label="Members"
                count={project.members}
              />
            </nav>

            {/* ==================================================
                CONTENT GRID
            ================================================== */}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* =================================================
                  LEFT COLUMN
              ================================================= */}

              <div className="min-w-0 space-y-5">
                {/* Task progress */}

                <section className="rounded-xl border border-line bg-panel p-5 sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-semibold">
                        Project Progress
                      </h2>

                      <p className="mt-1 text-sm text-muted">
                        Current task progress across the project.
                      </p>
                    </div>

                    <span className="font-display text-2xl font-semibold text-primary">
                      {progress}%
                    </span>
                  </div>

                  <div className="mb-5 h-2 overflow-hidden rounded-full bg-secondary/70">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <ProgressStat
                      label="Completed"
                      value={project.completedTasks}
                      dot="bg-primary"
                    />

                    <ProgressStat
                      label="In Progress"
                      value={project.inProgressTasks}
                      dot="bg-primary"
                    />

                    <ProgressStat
                      label="In Review"
                      value={project.reviewTasks}
                      dot="bg-secondary"
                    />

                    <ProgressStat
                      label="To Do"
                      value={project.todoTasks}
                      dot="bg-muted"
                    />
                  </div>
                </section>

                {/* Active tasks */}

                <section className="rounded-xl border border-line bg-panel">
                  <div className="flex items-center justify-between border-b border-line p-5">
                    <div>
                      <h2 className="font-display text-lg font-semibold">
                        Active Tasks
                      </h2>

                      <p className="mt-1 text-sm text-muted">
                        Work currently happening in this project.
                      </p>
                    </div>

                    <Link
                      to={`/projects/${project.id}/board`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View Board →
                    </Link>
                  </div>

                  <div className="divide-y divide-line">
                    <TaskPreview
                      id="TASK-104"
                      title="Implement authentication flow"
                      status="In Progress"
                      priority="HIGH"
                      assignee="Ayush"
                    />

                    <TaskPreview
                      id="TASK-108"
                      title="Build project member management"
                      status="In Review"
                      priority="MEDIUM"
                      assignee="Rahul"
                    />

                    <TaskPreview
                      id="TASK-112"
                      title="Create task filtering"
                      status="TODO"
                      priority="LOW"
                      assignee="Ankit"
                    />

                    <TaskPreview
                      id="TASK-116"
                      title="Improve task comments UI"
                      status="In Progress"
                      priority="MEDIUM"
                      assignee="Ayush"
                    />
                  </div>

                  <div className="border-t border-line p-4">
                    <Link
                      to={`/projects/${project.id}/board`}
                      className="flex items-center justify-center rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-secondary/30"
                    >
                      View all {project.totalTasks} tasks
                    </Link>
                  </div>
                </section>

                {/* Activity */}

                <section className="rounded-xl border border-line bg-panel">
                  <div className="border-b border-line p-5">
                    <h2 className="font-display text-lg font-semibold">
                      Recent Activity
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      Recent changes made in this project.
                    </p>
                  </div>

                  <div className="space-y-5 p-5">
                    <ActivityItem
                      text="Ayush moved"
                      highlight="Implement authentication flow"
                      suffix="to In Progress"
                      time="2 hours ago"
                    />

                    <ActivityItem
                      text="Rahul completed review of"
                      highlight="Project member management"
                      suffix=""
                      time="5 hours ago"
                    />

                    <ActivityItem
                      text="Ankit created"
                      highlight="Create task filtering"
                      suffix=""
                      time="Yesterday"
                    />

                    <ActivityItem
                      text="Ayush added a comment to"
                      highlight="Improve task comments UI"
                      suffix=""
                      time="Yesterday"
                    />
                  </div>
                </section>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================= */}

              <aside className="space-y-5">
                {/* Project Details */}

                <section className="rounded-xl border border-line bg-panel p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">
                      Project Details
                    </h2>

                    <button
                      type="button"
                      className="text-muted hover:text-neutral"
                      aria-label="Project options"
                    >
                      <MoreIcon />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <DetailRow
                      label="Status"
                      value="Active"
                    />

                    <DetailRow
                      label="Owner"
                      value={project.owner}
                    />

                    <DetailRow
                      label="Total Tasks"
                      value={String(project.totalTasks)}
                    />

                    <DetailRow
                      label="Members"
                      value={String(project.members)}
                    />

                    <DetailRow
                      label="Project ID"
                      value={project.id}
                      mono
                    />
                  </div>
                </section>

                {/* Members */}

                <section className="rounded-xl border border-line bg-panel p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">
                      Team
                    </h2>

                    <button
                      type="button"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="space-y-3">
                    <Member
                      initials="AR"
                      name="Ayush Rawat"
                      role="Owner"
                    />

                    <Member
                      initials="RK"
                      name="Rahul Kumar"
                      role="Leader"
                    />

                    <Member
                      initials="AS"
                      name="Ankit Sharma"
                      role="Member"
                    />

                    <Member
                      initials="PS"
                      name="Priya Singh"
                      role="Member"
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary/50 py-2.5 text-sm font-medium text-tertiary hover:bg-secondary"
                  >
                    <PlusIcon />
                    Invite Member
                  </button>
                </section>

                {/* Quick actions */}

                <section className="rounded-xl border border-line bg-panel p-5">
                  <h2 className="mb-4 font-display text-lg font-semibold">
                    Quick Actions
                  </h2>

                  <div className="space-y-2">
                    <Link
                      to={`/projects/${project.id}/board`}
                      className="flex items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2.5 text-sm hover:bg-secondary"
                    >
                      <BoardIcon />
                      Open Kanban Board
                    </Link>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2.5 text-left text-sm hover:bg-secondary"
                    >
                      <PlusIcon />
                      Create Task
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2.5 text-left text-sm hover:bg-secondary"
                    >
                      <UsersIcon />
                      Manage Members
                    </button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENTS
   ============================================================ */

const ProjectTab = ({
  label,
  count,
  active = false,
}: {
  label: string;
  count?: number;
  active?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm ${
        active
          ? "border-primary font-medium text-primary"
          : "border-transparent text-muted hover:text-neutral"
      }`}
    >
      {label}

      {count !== undefined && (
        <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px]">
          {count}
        </span>
      )}
    </button>
  );
};

const ProgressStat = ({
  label,
  value,
  dot,
}: {
  label: string;
  value: number;
  dot: string;
}) => {
  return (
    <div className="rounded-lg bg-paper p-3">
      <div className="mb-1 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />

        <span className="text-xs text-muted">
          {label}
        </span>
      </div>

      <span className="font-display text-xl font-semibold">
        {value}
      </span>
    </div>
  );
};

const TaskPreview = ({
  id,
  title,
  status,
  priority,
  assignee,
}: {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
}) => {
  return (
    <Link
      to="#"
      className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-paper/60 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-primary">
            {id}
          </span>

          <PriorityBadge priority={priority} />
        </div>

        <p className="truncate text-sm font-medium">
          {title}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-xs text-muted">
        <StatusBadge status={status} />

        <span>{assignee}</span>
      </div>
    </Link>
  );
};

const PriorityBadge = ({
  priority,
}: {
  priority: string;
}) => {
  const styles = {
    HIGH: "bg-red-50 text-red-600",
    MEDIUM: "bg-secondary text-tertiary",
    LOW: "bg-paper text-muted",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        styles[priority as keyof typeof styles] ??
        "bg-paper text-muted"
      }`}
    >
      {priority}
    </span>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />

      {status}
    </span>
  );
};

const ActivityItem = ({
  text,
  highlight,
  suffix,
  time,
}: {
  text: string;
  highlight: string;
  suffix: string;
  time: string;
}) => {
  return (
    <div className="flex gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />

      <div className="text-sm leading-5">
        <p className="text-muted">
          {text}{" "}
          <strong className="font-medium text-neutral">
            {highlight}
          </strong>{" "}
          {suffix}
        </p>

        <p className="mt-1 text-xs text-muted">
          {time}
        </p>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted">
        {label}
      </span>

      <span
        className={`text-right text-sm font-medium ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};

const Member = ({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-tertiary">
        {initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {name}
        </p>

        <p className="text-xs text-muted">
          {role}
        </p>
      </div>

      {role === "Owner" && (
        <span className="ml-auto rounded-full bg-secondary px-2 py-1 text-[10px] font-medium text-tertiary">
          Owner
        </span>
      )}
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

const UserSmallIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <circle cx="12" cy="8" r="3" />
    <path d="M5.5 20c.7-3.3 3.1-5 6.5-5s5.8 1.7 6.5 5" />
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

const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="m14 5 5 5" />
    <path d="M5 19h5l9-9-5-5-9 9v5Z" />
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

export default ProjectDetails;