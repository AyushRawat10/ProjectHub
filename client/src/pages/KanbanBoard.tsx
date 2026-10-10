import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import Sidebar from "../components/layouts/Sidebar";
import AppHeader from "../components/layouts/AppHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

import { getProjectTasks, type Task, type TaskStatus, type TaskPriority} from "../services/task.service";

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

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "ALL">("ALL");
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [assignee, setAssignee] = useState<string>("ALL");
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState<"DEFAULT" | "PRIORITY" | "DUE_DATE" | "TITLE">("DEFAULT")
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing");
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectTasks(projectId, {
          search: search.trim() || undefined,
          priority: priority === "ALL" ? undefined : priority,
        });
        
        setTasks(data);
      } catch {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [projectId, search, priority]);

  const getTasksByStatus = (status: TaskStatus) => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.status === status &&
        (assignee === "ALL" ||
          (assignee === "UNASSIGNED"
            ? task.assignee_id === null
            : task.assignee_name === assignee))
    );

    const priorityOrder: Record<TaskPriority, number> = {
      URGENT: 1,
      HIGH: 2,
      MEDIUM: 3,
      LOW: 4,
    };

    return [...filteredTasks].sort((a, b) => {
      switch (sortOrder) {
        case "PRIORITY":
          return priorityOrder[a.priority] - priorityOrder[b.priority];

        case "DUE_DATE":
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return (
            new Date(a.due_date).getTime() -
            new Date(b.due_date).getTime()
          );

        case "TITLE":
          return a.title.localeCompare(b.title);

        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="text-sm text-muted">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">
            Failed to load tasks
          </h1>

          <p className="mt-2 text-sm text-muted">
            {error}
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

      <AppHeader pageTitle="Board" />

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
            name: "Project", 
            id: projectId ?? "",
            currentView: "board" 
          }}
        />

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
                      Project
                    </Link>

                    <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-tertiary">
                      {projectId}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <BoardIcon />
                      Kanban Board
                    </span>

                    <span>•</span>

                    <span>{tasks.length} tasks</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="default"
                    className="hidden items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-sm sm:flex"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Active Project
                  </Badge>

                  <Button variant="primary" className="px-4 py-2.5">
                    <PlusIcon />
                    New Task
                  </Button>
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

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search project tasks..."
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
                />

                <span className="ml-auto shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px]">
                  /
                </span>
              </div>

              {/* Filters */}

              <div className="flex flex-wrap items-center gap-2">
                <FilterButton icon={<FilterIcon />} label="Filter" />

                <div className="relative">
                  <FilterButton
                    label="Priority"
                    dropdown
                    onClick={() => setShowPriorityMenu((value) => !value)}
                  />

                  {showPriorityMenu && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-40 rounded-lg border border-line bg-panel p-1 shadow-lg">
                      {["ALL", "LOW", "MEDIUM", "HIGH", "URGENT"].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setPriority(value as TaskPriority | "ALL");
                            setShowPriorityMenu(false);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-neutral hover:bg-secondary/40"
                        >
                          {value === "ALL" ? "All priorities" : value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <FilterButton
                    label={assignee === "ALL"
                      ? "Assignee" 
                      : assignee === "UNASSIGNED"
                        ? "Unassigned"
                        : assignee
                    }
                    dropdown
                    onClick={() => setShowAssigneeMenu((value) => !value)}
                  />

                  {showAssigneeMenu && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-48 rounded-lg border border-line bg-panel p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setAssignee("ALL");
                          setShowAssigneeMenu(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-neutral hover:bg-secondary/40"
                      >
                        All assignees
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAssignee("UNASSIGNED");
                          setShowAssigneeMenu(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-neutral hover:bg-secondary/40"
                      >
                        Unassigned
                      </button>

                      {Array.from(
                        new Set(
                          tasks
                            .map((task) => task.assignee_name)
                            .filter((name): name is string => Boolean(name))
                        )
                      ).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setAssignee(name);
                            setShowAssigneeMenu(false);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-neutral hover:bg-secondary/40"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden h-6 w-px bg-line xl:block" />

              <div className="hidden items-center gap-2 text-xs text-muted xl:flex">
                <span>Group by:</span>

                <button
                  type="button"
                  className="font-medium text-neutral hover:text-primary"
                >
                  Status⌄
                </button>

                <span className="text-line">|</span>

                <span>Sort:</span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSortMenu((value) => !value)}
                    className="font-medium text-neutral hover:text-primary"
                  >
                    {sortOrder === "DEFAULT"
                      ? "Default"
                      : sortOrder === "PRIORITY"
                        ? "Priority"
                        : sortOrder === "DUE_DATE"
                          ? "Due Date"
                          : "Title"}
                    ⌄
                  </button>

                  {showSortMenu && (
                    <div className="absolute right-0 top-full z-30 mt-2 w-40 rounded-lg border border-line bg-panel p-1 shadow-lg">
                      {[
                        { value: "DEFAULT", label: "Default" },
                        { value: "PRIORITY", label: "Priority" },
                        { value: "DUE_DATE", label: "Due Date" },
                        { value: "TITLE", label: "Title (A–Z)" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortOrder(
                              option.value as "DEFAULT" | "PRIORITY" | "DUE_DATE" | "TITLE"
                            );
                            setShowSortMenu(false);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-neutral hover:bg-secondary/40"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                EMPTY TASK STATE
            ================================================= */}

            {tasks.length === 0 && (
              <div className="mb-6 rounded-xl border border-line bg-panel p-6 text-center">
                <p className="text-sm font-medium text-neutral">
                  No tasks found
                </p>
                <p className="mt-1 text-sm text-muted">
                  Create a task to start managing this project.
                </p>
              </div>
            )}

            {/* =================================================
                KANBAN BOARD
            ================================================= */}

            <section className="overflow-x-auto pb-5">
              <div className="grid min-w-[72rem] grid-cols-4 gap-4">
                {columnConfig.map((column) => {
                  const columnTasks = getTasksByStatus(column.status);

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

const KanbanColumn = ({ status, label, tasks }: KanbanColumnProps) => {
  return (
    <div className="min-w-72 rounded-xl bg-secondary/35 p-2.5">
      {/* Column header */}

      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <StatusDot status={status} />

          <h2 className="text-sm font-semibold">{label}</h2>

          <span className="text-xs font-medium text-muted">{tasks.length}</span>
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
          <TaskCard key={task.id} task={task} />
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
  const initials = task.assignee_name
    ? task.assignee_name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <Link
      to={`/projects/${task.project_id}/tasks/${task.id}`}
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
          {task.due_date && (
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Assignee */}

        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-secondary"
          title={task.assignee_name ?? "Unassigned"}
        >
          {initials}
        </span>
      </div>
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
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  dropdown?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-medium text-muted hover:bg-secondary/40 hover:text-neutral"
    >
      {icon}

      {label}

      {dropdown && <ChevronDownIcon />}
    </button>
  );
};

/* ============================================================
   STATUS
   ============================================================ */

const StatusDot = ({ status }: { status: TaskStatus }) => {
  const dotClass = {
    TODO: "bg-muted",
    IN_PROGRESS: "bg-primary",
    IN_REVIEW: "bg-tertiary",
    DONE: "bg-primary",
  };

  return <span className={`h-2 w-2 rounded-full ${dotClass[status]}`} />;
};

/* ============================================================
   PRIORITY
   ============================================================ */

const PriorityBadge = ({ priority }: { priority: Task["priority"] }) => {
  const variant = priority === "LOW" ? "muted" : "default";

  return (
    <Badge variant={variant} className="px-1.5 py-0.5 text-[10px]">
      {priority}
    </Badge>
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

export default KanbanBoard;
