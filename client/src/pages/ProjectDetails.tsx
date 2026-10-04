import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Sidebar from "../components/layouts/Sidebar";
import Button from "../components/ui/Button";
import AppHeader from "../components/layouts/AppHeader";
import Badge from "../components/ui/Badge";

import { getProjectById, type Project } from "../services/project.service";
import {
  getProjectMembers,
  type ProjectMember,
} from "../services/project-member.service";
import { getProjectTasks, type Task } from "../services/task.service";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing");
      setLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(projectId);

        setProject(data);
      } catch {
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);
  
  useEffect(() => {
    if (!projectId) {
      setMembersLoading(false);
      return;
    }
    
    const loadMembers = async () => {
      try {
        setMembersLoading(true);
        
        const data = await getProjectMembers(projectId);
        
        setMembers(data);
      } catch {
        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };
    
    loadMembers();
  }, [projectId]);
  
  useEffect(() => {
    if (!projectId) {
      setTasksLoading(false);
      return;
    }
    
    const loadTasks = async () => {
      try {
        setTasksLoading(true);
        
        const data = await getProjectTasks(projectId);
        
        setTasks(data);
      } catch {
        setTasks([]);
      } finally {
        setTasksLoading(false);
      }
    };
    
    loadTasks();
  }, [projectId]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="text-sm text-muted">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">
            Project not found
          </h1>

          <p className="mt-2 text-sm text-muted">
            {error || "The requested project could not be found."}
          </p>

          <Link
            to="/projects"
            className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <AppHeader pageTitle={project.name} />

      {/* ======================================================
          APP LAYOUT
      ====================================================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <Sidebar
          activePage="projects"
          project={{
            name: project.name,
            id: project.id,
            currentView: "overview",
          }}
        />

        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Mobile breadcrumb */}

            <div className="mb-5 flex items-center gap-2 text-sm text-muted lg:hidden">
              <Link to="/projects" className="hover:text-neutral">
                Projects
              </Link>

              <ChevronRightIcon />

              <span className="font-medium text-neutral">{project.name}</span>
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
                    </div>

                    <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <UserSmallIcon />
                        Owner ID:{" "}
                        <strong className="font-medium text-neutral">
                          {project.owner_id}
                        </strong>
                      </span>

                      <span className="font-mono">{project.id}</span>
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

                  <Button variant="outline">
                    <EditIcon />
                    Edit Project
                  </Button>
                </div>
              </div>
            </section>

            {/* ==================================================
                PROJECT NAVIGATION
            ================================================== */}

            <nav className="my-5 flex gap-1 overflow-x-auto border-b border-line">
              <ProjectTab label="Overview" active />

              <Link
                to={`/projects/${project.id}/board`}
                className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm text-muted hover:text-neutral"
              >
                <BoardIcon />
                Board
              </Link>

              <ProjectTab label="Members" count={members.length} />
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
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      Project Information
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      Basic information about this project.
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <DetailRow
                      label="Created"
                      value={new Date(project.created_at).toLocaleDateString()}
                    />

                    <DetailRow
                      label="Last Updated"
                      value={new Date(project.updated_at).toLocaleDateString()}
                    />

                    <DetailRow label="Owner ID" value={project.owner_id} mono />

                    <DetailRow label="Project ID" value={project.id} mono />
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
                    {tasksLoading ? (
                      <div className="p-5">
                        <p className="text-sm text-muted">
                          Loading tasks...
                        </p>
                      </div>
                    ) : tasks.length === 0 ? (
                      <div className="p-5">
                        <p className="text-sm text-muted">
                          No tasks have been created yet.
                        </p>
                      </div>
                    ) : (
                      tasks.slice(0, 5).map((task) => (
                        <Link
                          key={task.id}
                          to={`/projects/${project.id}/tasks/${task.id}`}
                          className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-paper/60 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <Badge variant="muted">
                                {task.priority}
                              </Badge>

                              <Badge variant="default">
                                {task.status}
                              </Badge>
                            </div>

                            <p className="truncate text-sm font-medium">
                              {task.title}
                            </p>
                          </div>

                          <div className="shrink-0 text-xs text-muted">
                            {task.assignee_name ?? "Unassigned"}
                          </div>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="border-t border-line p-4">
                    <Link
                      to={`/projects/${project.id}/board`}
                      className="flex items-center justify-center rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-secondary/30"
                    >
                      View all tasks
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

                  <div className="p-5">
                    <p className="text-sm text-muted">
                      Recent activity will appear here once activity tracking is
                      connected.
                    </p>
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
                    <DetailRow label="Owner ID" value={project.owner_id} mono />

                    <DetailRow
                      label="Created"
                      value={new Date(project.created_at).toLocaleDateString()}
                    />

                    <DetailRow
                      label="Updated"
                      value={new Date(project.updated_at).toLocaleDateString()}
                    />

                    <DetailRow label="Project ID" value={project.id} mono />
                  </div>
                </section>

                {/* Members */}

                <section className="rounded-xl border border-line bg-panel p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">Team</h2>

                    <button
                      type="button"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="space-y-3">
                    {membersLoading ? (
                      <p className="text-sm text-muted">Loading members...</p>
                    ) : members.length === 0 ? (
                      <p className="text-sm text-muted">
                        No members have been added yet.
                      </p>
                    ) : (
                      members.map((member) => (
                        <Member
                          key={member.id}
                          initials={member.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                          name={member.name}
                          role="Member"
                        />
                      ))
                    )}
                  </div>

                  <Button variant="secondary" className="mt-5 w-full">
                    <PlusIcon />
                    Invite Member
                  </Button>
                </section>

                {/* Quick actions */}

                <section className="rounded-xl border border-line bg-panel p-5">
                  <h2 className="mb-4 font-display text-lg font-semibold">
                    Quick Actions
                  </h2>

                  <div className="space-y-2">
                    <Link
                      to={`/projects/${project.id}/board`}
                      className="flex items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2.5 text-sm hover:bg-secondary font-medium"
                    >
                      <BoardIcon />
                      Open Kanban Board
                    </Link>

                    <Button
                      variant="secondary"
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <PlusIcon />
                      Create Task
                    </Button>

                    <Button
                      variant="secondary"
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <UsersIcon />
                      Manage Members
                    </Button>
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
        <Badge variant="default" className="px-1.5 py-0.5 text-[10px]">
          {count}
        </Badge>
      )}
    </button>
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
      <span className="text-sm text-muted">{label}</span>

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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-secondary">
        {initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>

        <p className="text-xs text-muted">{role}</p>
      </div>

      {role === "Owner" && (
        <Badge variant="default" className="ml-auto px-2 py-1 text-[10px]">
          Owner
        </Badge>
      )}
    </div>
  );
};

/* ============================================================
   ICONS
   ============================================================ */

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
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export default ProjectDetails;
