import { Link } from "react-router";
import { useState, useEffect } from "react";
import AppHeader from "../components/layouts/AppHeader";
import Sidebar from "../components/layouts/Sidebar";
import Badge from "../components/ui/Badge";
import { getProjects, type Project } from "../services/project.service";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(data);
      } catch {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ==================== TOP BAR ==================== */}

      <AppHeader pageTitle="Projects" />

      {/* ==================== APP ==================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ==================== SIDEBAR ==================== */}

        <Sidebar activePage="projects" />

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

                    <Badge
                      variant="default"
                      className="px-2.5 py-1 text-xs"
                    >
                      {projects.length} total
                    </Badge>
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
                  count={String(projects.length)}
                  active
                />
              </div>
            </section>

            {/* ==================== PROJECT GRID ==================== */}

            <section>
              {loading ? (
                <div className="rounded-xl border border-line bg-panel p-8 text-center">
                  <p className="text-sm text-muted">Loading projects...</p>
                </div>
              ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="rounded-xl border border-line bg-panel p-8 text-center">
                  <p className="font-display text-lg font-semibold">No projects yet</p>
                  <p className="mt-1 text-sm text-muted">Create you first project to get started</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              )}
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
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-[10px] font-semibold text-secondary">
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

            <p className="truncate text-xs text-muted">
              {project.id}
            </p>
          </div>
        </div>

        <ArrowUpRightIcon />
      </div>

      {/* Description */}
      <p className="min-h-12 text-sm leading-6 text-muted">
        {project.description || "No description provided."}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>
          Created{" "}
          {new Date(project.created_at).toLocaleDateString()}
        </span>

        <span>
          Updated{" "}
          {new Date(project.updated_at).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

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