import { Link } from "react-router";
import AppHeader from "../components/layouts/AppHeader";
import Sidebar from "../components/layouts/Sidebar";
import Badge from "../components/ui/Badge";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

type Task = {
  id: string;
  title: string;
  project: string;
  projectId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
};

const tasks: Task[] = [
  {
    id: "PH-115",
    title: "Implement JWT refresh token flow",
    project: "ProjectHub",
    projectId: "projecthub",
    status: "IN_PROGRESS",
    priority: "URGENT",
    dueDate: "Oct 20, 2026",
  },
  {
    id: "PH-108",
    title: "Create authentication middleware",
    project: "ProjectHub",
    projectId: "projecthub",
    status: "DONE",
    priority: "HIGH",
    dueDate: "Oct 18, 2026",
  },
  {
    id: "PH-121",
    title: "Build project member management",
    project: "ProjectHub",
    projectId: "projecthub",
    status: "TODO",
    priority: "HIGH",
    dueDate: "Oct 24, 2026",
  },
  {
    id: "DP-042",
    title: "Create developer news API",
    project: "DevPulse",
    projectId: "devpulse",
    status: "IN_REVIEW",
    priority: "MEDIUM",
    dueDate: "Oct 25, 2026",
  },
  {
    id: "DP-038",
    title: "Design article category system",
    project: "DevPulse",
    projectId: "devpulse",
    status: "TODO",
    priority: "LOW",
    dueDate: "Oct 28, 2026",
  },
];

const statusLabels: Record<TaskStatus, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
};

const priorityLabels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-tertiary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {statusLabels[status]}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
        priority === "URGENT"
          ? "bg-secondary text-tertiary"
          : "bg-paper text-muted"
      }`}
    >
      {priorityLabels[priority]}
    </span>
  );
}

function TaskRow({ task }: { task: Task }) {
  return (
    <Link
      to={`/projects/${task.projectId}/tasks/${task.id}`}
      className="group block border-b border-line px-4 py-4 last:border-b-0 hover:bg-secondary/25 sm:px-5"
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_8rem_8rem_8rem] lg:items-center">
        {/* Task */}
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted">
              {task.id}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />

            <span className="text-xs text-muted">
              {task.project}
            </span>
          </div>

          <h3 className="truncate text-sm font-medium text-neutral group-hover:text-primary">
            {task.title}
          </h3>
        </div>

        {/* Status */}
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-wider text-muted lg:hidden">
            Status
          </p>
          <StatusBadge status={task.status} />
        </div>

        {/* Priority */}
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-wider text-muted lg:hidden">
            Priority
          </p>
          <PriorityBadge priority={task.priority} />
        </div>

        {/* Due Date */}
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-wider text-muted lg:hidden">
            Due
          </p>

          <span className="text-sm text-muted">
            {task.dueDate}
          </span>
        </div>
      </div>
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 6v4l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M6 5h10M6 10h10M6 15h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="3.5" cy="5" r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="10" r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="15" r="0.8" fill="currentColor" />
    </svg>
  );
}

const MyTasks = () => {
  const completedTasks = tasks.filter(
    (task) => task.status === "DONE",
  ).length;

  const activeTasks = tasks.filter(
    (task) => task.status !== "DONE",
  ).length;

  const urgentTasks = tasks.filter(
    (task) => task.priority === "URGENT",
  ).length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      <AppHeader pageTitle="My Tasks" />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar activePage="tasks" />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Page Header */}
            <section className="mb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted">
                    Your assigned work
                  </p>

                  <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    My Tasks
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    View and manage all tasks assigned to you across
                    your projects.
                  </p>
                </div>

                <div className="text-sm text-muted">
                  <span className="font-medium text-neutral">
                    {tasks.length}
                  </span>{" "}
                  total tasks
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="mb-3 flex items-center gap-2 text-muted">
                  <ListIcon />
                  <span className="text-xs font-medium">
                    Total Tasks
                  </span>
                </div>

                <p className="text-2xl font-semibold">
                  {tasks.length}
                </p>
              </div>

              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="mb-3 flex items-center gap-2 text-muted">
                  <ClockIcon />
                  <span className="text-xs font-medium">
                    Active Tasks
                  </span>
                </div>

                <p className="text-2xl font-semibold">
                  {activeTasks}
                </p>
              </div>

              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="mb-3 flex items-center gap-2 text-muted">
                  <CheckIcon />
                  <span className="text-xs font-medium">
                    Completed
                  </span>
                </div>

                <p className="text-2xl font-semibold">
                  {completedTasks}
                </p>
              </div>
            </section>

            {/* Task List */}
            <section className="overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex flex-col gap-3 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Assigned Tasks
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    Tasks currently assigned to you
                  </p>
                </div>

                {urgentTasks > 0 && (
                  <Badge
                    variant="default"
                    className="w-fit px-2.5 py-1 text-[11px]"
                  >
                    {urgentTasks} urgent
                  </Badge>
                )}
              </div>

              {/* Table Header */}
              <div className="hidden grid-cols-[minmax(0,1fr)_8rem_8rem_8rem] gap-3 border-b border-line bg-paper/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted lg:grid">
                <span>Task</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Due</span>
              </div>

              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyTasks;