import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

type ProjectContext = {
  name: string;
  id: string;
  currentView?: "overview" | "board" | "task";
  taskTitle?: string;
};

type SidebarProps = {
  activePage?: "dashboard" | "projects" | "tasks" | "team" | "settings";
  project?: ProjectContext;
};

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
  count?: string;
  active?: boolean;
};

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 text-muted"
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="12"
        y="3"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="12"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="12"
        y="12"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M2.75 5.5a1.5 1.5 0 0 1 1.5-1.5h4l1.5 2h6a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckSquareIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m6.5 10 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M13 16v-1.25A2.75 2.75 0 0 0 10.25 12h-4.5A2.75 2.75 0 0 0 3 14.75V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="8"
        cy="7"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 9.25a2.5 2.5 0 1 0 0-5M14.5 12h1a2.5 2.5 0 0 1 2.5 2.5V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M8.5 2.75h3l.45 1.8c.4.15.78.37 1.12.65l1.78-.45 1.5 2.6-1.33 1.3c.05.22.08.45.08.68s-.03.46-.08.68l1.33 1.3-1.5 2.6-1.78-.45c-.34.28-.72.5-1.12.65l-.45 1.8h-3l-.45-1.8a5.5 5.5 0 0 1-1.12-.65l-1.78.45-1.5-2.6 1.33-1.3A3.3 3.3 0 0 1 4.9 9.33c0-.23.03-.46.08-.68l-1.33-1.3 1.5-2.6 1.78.45c.34-.28.72-.5 1.12-.65l.45-1.8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="9.33"
        r="2.25"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="4" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 3v14M13 3v14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SidebarItem({
  icon,
  label,
  to,
  count,
  active,
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-secondary/70 font-medium text-neutral"
          : "text-muted hover:bg-secondary/40 hover:text-neutral"
      }`}
    >
      <span className={active ? "text-primary" : "text-muted"}>
        {icon}
      </span>

      <span className="min-w-0 flex-1 truncate">
        {label}
      </span>

      {count && (
        <span className="text-xs font-medium text-muted">
          {count}
        </span>
      )}
    </Link>
  );
}

function ProjectContextItem({
  icon,
  label,
  to,
  active,
}: {
  icon: ReactNode;
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
        active
          ? "bg-secondary font-medium text-neutral"
          : "text-muted hover:bg-secondary/50 hover:text-neutral"
      }`}
    >
      <span className={active ? "text-primary" : "text-muted"}>
        {icon}
      </span>

      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({
  activePage,
  project,
}: SidebarProps) {
  const location = useLocation();

  const isActive = (
    page: SidebarProps["activePage"],
  ) => {
    if (activePage) {
      return activePage === page;
    }

    if (page === "dashboard") {
      return location.pathname === "/dashboard";
    }

    if (page === "projects") {
      return location.pathname.startsWith("/projects");
    }

    if (page === "tasks") {
      return location.pathname.startsWith("/tasks");
    }

    if (page === "team") {
      return location.pathname.startsWith("/team-members");
    }

    if (page === "settings") {
      return location.pathname.startsWith("/settings");
    }

    return false;
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-line bg-panel lg:block">
      <div className="flex h-full flex-col p-4">
        {/* Workspace */}
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

        {/* New Project */}
        <Link
          to="/projects/new"
          className="mb-7 flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
        >
          <PlusIcon />
          New Project
        </Link>

        {/* Workspace Navigation */}
        <div>
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Workspace
          </p>

          <SidebarItem
            icon={<GridIcon />}
            label="Dashboard"
            to="/dashboard"
            active={isActive("dashboard")}
          />

          <SidebarItem
            icon={<FolderIcon />}
            label="Projects"
            to="/projects"
            count="6"
            active={isActive("projects")}
          />

          <SidebarItem
            icon={<CheckSquareIcon />}
            label="My Tasks"
            to="/tasks"
            count="12"
            active={isActive("tasks")}
          />

          <SidebarItem
            icon={<UsersIcon />}
            label="Team Members"
            to="/team-members"
            active={isActive("team")}
          />
        </div>

        {/* Projects / Current Project */}
        <div className="mt-8">
          {!project ? (
            <>
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

              <Link
                to="/projects/projecthub"
                className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-secondary/40 hover:text-neutral"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                <span className="truncate">ProjectHub</span>
              </Link>

              <Link
                to="/projects/devpulse"
                className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-secondary/40 hover:text-neutral"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                <span className="truncate">DevPulse</span>
              </Link>

              <Link
                to="/projects/portfolio"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-secondary/40 hover:text-neutral"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted" />
                <span className="truncate">Portfolio</span>
              </Link>
            </>
          ) : (
            <>
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Current Project
              </p>

              {/* Project Parent */}
              <div className="rounded-lg bg-secondary/50 p-2">
                <div className="flex items-center gap-2 px-1 py-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-secondary">
                    PH
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {project.name}
                    </p>

                    <p className="truncate text-[10px] text-muted">
                      {project.id}
                    </p>
                  </div>
                </div>

                {/* Child Navigation */}
                <div className="mt-2 border-t border-line/70 pt-2">
                {project.currentView === "overview" && (
                    <ProjectContextItem
                    icon={<GridIcon />}
                    label="Overview"
                    to={`/projects/${project.id}`}
                    active
                    />
                )}

                {project.currentView === "board" && (
                    <ProjectContextItem
                    icon={<BoardIcon />}
                    label="Kanban Board"
                    to={`/projects/${project.id}/board`}
                    active
                    />
                )}

                {project.currentView === "task" && (
                    <ProjectContextItem
                    icon={<CheckSquareIcon />}
                    label={project.taskTitle ?? "Task Details"}
                    to={location.pathname}
                    active
                    />
                )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-auto">
          {/* System Status */}
          <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
            <span className="flex items-center gap-2 text-xs font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-primary" />
              All systems operational
            </span>

            <span className="text-xs text-muted">↻</span>
          </div>

          {/* Settings */}
          <SidebarItem
            icon={<SettingsIcon />}
            label="Settings"
            to="/settings"
            active={isActive("settings")}
          />

          {/* Account */}
          <div className="mt-4 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-tertiary">
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
  );
}