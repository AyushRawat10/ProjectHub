import type { ReactNode } from "react";
import { Link } from "react-router";
import AppHeader from "../components/layouts/AppHeader";

type Project = {
  id: string;
  name: string;
  description: string;
  tasks: number;
  members: number;
  progress: number;
  color: string;
};

const projects: Project[] = [
  {
    id: "PRJ-01",
    name: "ProjectHub",
    description:
      "Project management workspace for development teams, tasks, members, and comments.",
    tasks: 14,
    members: 4,
    progress: 78,
    color: "bg-primary",
  },
  {
    id: "PRJ-02",
    name: "DevPulse",
    description:
      "Developer-focused news and information platform for discovering useful technical content.",
    tasks: 22,
    members: 3,
    progress: 45,
    color: "bg-secondary",
  },
  {
    id: "PRJ-03",
    name: "Portfolio",
    description:
      "Personal portfolio website showcasing projects, skills, experience, and development work.",
    tasks: 8,
    members: 2,
    progress: 92,
    color: "bg-muted",
  },
  {
    id: "PRJ-04",
    name: "Game Studio",
    description:
      "Experimental game development project for building gameplay systems and prototypes.",
    tasks: 16,
    members: 3,
    progress: 30,
    color: "bg-primary",
  },
  {
    id: "PRJ-05",
    name: "Developer Tools",
    description:
      "Collection of small tools designed to improve everyday developer workflows.",
    tasks: 11,
    members: 3,
    progress: 65,
    color: "bg-secondary",
  },
  {
    id: "PRJ-06",
    name: "Design System",
    description:
      "Reusable UI components and design guidelines for ProjectHub applications.",
    tasks: 19,
    members: 4,
    progress: 88,
    color: "bg-primary",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ==================== TOP BAR ==================== */}

      <AppHeader pageTitle="Projects" />

      {/* ==================== APP ==================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ==================== SIDEBAR ==================== */}

        <aside className="hidden w-64 shrink-0 border-r border-line bg-panel lg:block">
          <div className="flex h-full flex-col p-4">
            {/* Workspace */}
            <button
              type="button"
              className="mb-3 flex w-full items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5 text-left hover:bg-secondary"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-secondary">
                  PH
                </span>

                <span className="truncate text-sm font-medium">
                  My Workspace
                </span>
              </span>

              <ChevronDownIcon />
            </button>

            {/* New Project */}
            <Link
              to="/projects/new"
              className="mb-7 flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-secondary hover:bg-tertiary"
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
              />

              <SidebarItem
                icon={<FolderIcon />}
                label="Projects"
                count="6"
                active
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

            {/* Project list */}
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Projects
                </p>

                <span className="text-xs text-muted">
                  6
                </span>
              </div>

              {projects.slice(0, 3).map((project) => (
                <ProjectSidebarItem
                  key={project.id}
                  name={project.name}
                  color={project.color}
                />
              ))}
            </div>

            {/* User */}
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
            <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
              <MobileNavItem label="Dashboard" />
              <MobileNavItem label="Projects" active />
              <MobileNavItem label="My Tasks" />
              <MobileNavItem label="Members" />
            </div>

            {/* ==================== PAGE HEADER ==================== */}

            <section className="mb-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      Projects
                    </h1>

                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-tertiary">
                      {projects.length} active
                    </span>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-muted sm:text-base">
                    Manage your projects, organize your team, and keep track
                    of the work that needs to be done.
                  </p>
                </div>

                <Link
                  to="/projects/new"
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-secondary hover:bg-tertiary"
                >
                  <PlusIcon />
                  New Project
                </Link>
              </div>
            </section>

            {/* ==================== FILTER BAR ==================== */}

            <section className="mb-6 flex flex-col gap-3 rounded-xl border border-line bg-panel p-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-sm text-muted sm:max-w-md">
                <SearchIcon />

                <input
                  type="text"
                  placeholder="Filter projects..."
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
                />

                <span className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] sm:block">
                  ⌘K
                </span>
              </div>

              {/* Filters */}
              <div className="flex overflow-x-auto rounded-lg bg-secondary/40 p-1">
                <ProjectFilter
                  label="All"
                  count="6"
                  active
                />

                <ProjectFilter
                  label="Active"
                  count="4"
                />

                <ProjectFilter
                  label="Archived"
                  count="2"
                />
              </div>
            </section>

            {/* ==================== PROJECT GRID ==================== */}

            <section>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            </section>

            {/* ==================== TIP ==================== */}

            <div className="mt-6 flex flex-col gap-2 rounded-lg border border-line bg-secondary/25 px-4 py-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <LightbulbIcon />
                Create a project first, then add members and start creating
                tasks.
              </span>

              <Link
                to="/projects/new"
                className="font-medium text-primary hover:underline"
              >
                Create project →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ============================================================
   PROJECT CARD
   ============================================================ */

const ProjectCard = ({
  project,
}: {
  project: Project;
}) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-xl border border-line bg-panel p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(2,61,61,0.08)]"
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold ${
              project.color === "bg-secondary"
                ? "bg-secondary text-tertiary"
                : `${project.color} text-secondary`
            }`}
          >
            {project.name
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </span>

          <div className="min-w-0">
            <h2 className="truncate font-display text-base font-semibold group-hover:text-primary">
              {project.name}
            </h2>

            <p className="text-xs text-muted">
              {project.id}
            </p>
          </div>
        </div>

        <ArrowUpRightIcon />
      </div>

      {/* Description */}
      <p className="mb-5 min-h-12 text-sm leading-6 text-muted">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-muted">
            Task progress
          </span>

          <span className="font-medium text-primary">
            {project.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-secondary/70">
          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <CheckCircleIcon />
          {project.tasks} tasks
        </span>

        <span className="flex items-center gap-1.5">
          <UsersIcon />
          {project.members} members
        </span>
      </div>
    </Link>
  );
};

/* ============================================================
   SMALL COMPONENTS
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

const ProjectSidebarItem = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
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

const ProjectFilter = ({
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
      className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
        active
          ? "bg-panel text-neutral shadow-sm"
          : "text-muted hover:text-neutral"
      }`}
    >
      {label}{" "}
      <span className="ml-1 opacity-60">
        {count}
      </span>
    </button>
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

const ArrowUpRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4 text-muted transition-colors group-hover:text-primary"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-3.5 w-3.5"
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12 2.3 2.3 4.7-5" />
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
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.4V14h-.4a1.7 1.7 0 0 0-1.6 1Z"
    />
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

const LightbulbIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M8.5 14.5A6 6 0 1 1 15.5 14c-.8.7-1.2 1.5-1.4 2.5h-4.2c-.2-1-.6-1.8-1.4-2.5Z" />
  </svg>
);

export default Projects;