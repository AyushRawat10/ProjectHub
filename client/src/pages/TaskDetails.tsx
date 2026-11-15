import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import Sidebar from "../components/layouts/Sidebar";
import AppHeader from "../components/layouts/AppHeader";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";

import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../services/task.service";
import type { Task } from "../services/task.service";

import { getProjectMembers } from "../services/project-member.service";
import type { ProjectMember } from "../services/project-member.service";

import { getProjectById } from "../services/project.service";
import type { Project } from "../services/project.service";

import { useAuth } from "../context/AuthContext";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

type Comment = {
  id: string;
  name: string;
  initials: string;
  role: string;
  message: string;
  time: string;
};

const comments: Comment[] = [
  {
    id: "1",
    name: "Rahul Kumar",
    initials: "RK",
    role: "Developer",
    message:
      "I have completed the refresh token endpoint. The remaining work is handling token rotation and invalid sessions.",
    time: "24 minutes ago",
  },
  {
    id: "2",
    name: "Ayush Rawat",
    initials: "AR",
    role: "Project Owner",
    message:
      "Please make sure the refresh token is stored securely and the cookie configuration is correct.",
    time: "12 minutes ago",
  },
];

const TaskDetails = () => {
  const { projectId, taskId } = useParams();

  const projectName = "ProjectHub";

  const [taskData, setTaskData] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "TODO" as TaskStatus,
    priority: "MEDIUM" as Priority,
    dueDate: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [isAssigneeModalOpen, setIsAssigneeModalOpen] = useState(false);
  const [selectedAssigneeId, setSelectedAssigneeId] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [assigneeError, setAssigneeError] = useState("");

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!projectId || !taskId) {
        setError("Invalid project or task ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getTaskById(projectId, taskId);
        setTaskData(data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;

      try {
        const [projectData, membersData] = await Promise.all([
          getProjectById(projectId),
          getProjectMembers(projectId),
        ]);

        setProject(projectData);
        setMembers(membersData);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        setAssigneeError("Failed to load project members.");
      }
    };

    fetchProjectData();
  }, [projectId]);

  const openEditModal = () => {
    if (!taskData) return;

    setEditForm({
      title: taskData.title,
      description: taskData.description ?? "",
      status: taskData.status,
      priority: taskData.priority,
      dueDate: taskData.due_date
        ? taskData.due_date.slice(0, 10)
        : "",
    });

    setEditError("");
    setIsEditModalOpen(true);
  }

  const openAssigneeModal = () => {
    if (!taskData) return;

    setSelectedAssigneeId(taskData.assignee_id ?? "");
    setAssigneeError("");
    setIsAssigneeModalOpen(true);
  }

  const handleAssignTask = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!projectId || !taskId) return;

    try {
      setIsAssigning(true);
      setAssigneeError("");

      const updatedTask = await updateTask(projectId, taskId, {
        assigneeId: selectedAssigneeId || null,
      });

      const refreshedTask = await getTaskById(projectId, taskId);
      
      setTaskData(refreshedTask);
      setIsAssigneeModalOpen(false);
    } catch (error) {
      console.error("Failed to updated assignee:", error);
      setAssigneeError("Failed to update assignee. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  }

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!projectId || !taskId) return;

    try {
      setIsSaving(true);
      setEditError("");

      const updatedTask = await updateTask(projectId, taskId, {
        title: editForm.title,
        description: editForm.description.trim() || null,
        status: editForm.status,
        priority: editForm.priority,
        dueDate: editForm.dueDate || null,
      });
      
      setTaskData(updatedTask);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update task:", err);
      setEditError("Failed to update task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if(loading) {
    return <div className="p-8 text-center">Loading task....</div>
  }

  if(error || !taskData) {
    return (
      <div className="p-8 text-center text-red-600">
        {error || "Task not found"}
      </div>
    )
  }

  const getInitials = (name: string | null) => {
    if (!name) return "--";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const task = {
    id: taskData.id,
    title: taskData.title,
    description: taskData.description ?? "No description provided.",
    status: taskData.status,
    priority: taskData.priority,
    assignee: taskData.assignee_name ?? "Unassigned",
    assigneeInitials: getInitials(taskData.assignee_name),
    creator: taskData.creator_name,
    creatorInitials: getInitials(taskData.creator_name),
    dueDate: taskData.due_date
      ? new Date(taskData.due_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      : "No due date",
    createdAt: new Date(taskData.created_at).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    subtasks: "0 / 0",
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <AppHeader pageTitle="Task" />

      {/* =====================================================
          APP LAYOUT
      ===================================================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <Sidebar
          activePage="projects"
          project={{
            name: projectName,
            id: projectId ?? "projecthub",
            currentView: "task",
            taskTitle: task.title,
          }}
        />

        {/* ===================================================
            MAIN
        =================================================== */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb */}

            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
              <Link to="/projects" className="hover:text-neutral">
                Projects
              </Link>

              <ChevronRightIcon />

              <Link
                to={`/projects/${projectId ?? "projecthub"}`}
                className="hover:text-neutral"
              >
                {projectName}
              </Link>

              <ChevronRightIcon />

              <span>{task.id}</span>
            </div>

            {/* =================================================
                TASK HEADER
            ================================================= */}

            <section className="mb-6 rounded-2xl border border-line bg-panel p-5 sm:p-7">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-medium text-muted">
                        {task.id}
                      </span>

                      <StatusBadge status={task.status} />

                      <PriorityBadge priority={task.priority} />
                    </div>

                    <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      {task.title}
                    </h1>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button 
                    variant="outline" 
                    className="px-3 py-2"
                    onClick={openEditModal}
                    >
                      <EditIcon />
                      Edit
                    </Button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted hover:bg-secondary/40 hover:text-neutral"
                      aria-label="More task options"
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-4 text-sm text-muted">
                  <span className="flex items-center gap-2">
                    <CalendarIcon />
                    Due {task.dueDate}
                  </span>

                  <span className="flex items-center gap-2">
                    <ClockIcon />
                    Created {task.createdAt}
                  </span>

                  <span className="flex items-center gap-2">
                    <CommentIcon />
                    {comments.length} comments
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
              {/* =================================================
                  LEFT
              ================================================= */}

              <div className="min-w-0 space-y-5">
                {/* Description */}

                <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">
                      Description
                    </h2>

                    <Button
                      variant="outline"
                      className="px-0 py-0 text-sm font-medium text-primary hover:bg-transparent hover:text-tertiary"
                    >
                      Edit
                    </Button>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-muted">
                    {task.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-secondary/35 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Implementation progress
                      </span>

                      <span className="text-xs font-medium text-muted">
                        {task.subtasks}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-line">
                      <div className="h-full w-3/4 rounded-full bg-primary" />
                    </div>
                  </div>
                </section>

                {/* Comments */}

                <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">
                      Comments
                    </h2>

                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-tertiary">
                      {comments.length}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {comments.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))}
                  </div>

                  {/* Add comment */}

                  <div className="mt-6 border-t border-line pt-5">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-tertiary">
                        AR
                      </div>

                      <div className="min-w-0 flex-1">
                        <textarea
                          rows={3}
                          placeholder="Write a comment..."
                          className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-primary"
                        />

                        <div className="mt-2 flex justify-end">
                          <Button variant="primary" className="px-4 py-2">
                            Comment
                            <ArrowRightIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* =================================================
                  RIGHT DETAILS
              ================================================= */}

              <aside className="space-y-5">
                {/* Task details */}

                <section className="rounded-2xl border border-line bg-panel p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-base font-semibold">
                      Task Details
                    </h2>

                    <button
                      type="button"
                      className="text-muted hover:text-neutral"
                      aria-label="Task details options"
                    >
                      <MoreIcon />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <DetailItem
                      label="Status"
                      value={<StatusBadge status={task.status} />}
                    />

                    <DetailItem
                      label="Priority"
                      value={<PriorityBadge priority={task.priority} />}
                    />

                    <DetailItem
                      label="Assignee"
                      value={
                        <Person
                          initials={task.assigneeInitials}
                          name={task.assignee}
                        />
                      }
                    />

                    <DetailItem
                      label="Creator"
                      value={
                        <Person
                          initials={task.creatorInitials}
                          name={task.creator}
                        />
                      }
                    />

                    <DetailItem
                      label="Due date"
                      value={
                        <span className="text-sm font-medium">
                          {task.dueDate}
                        </span>
                      }
                    />
                  </div>
                </section>

                {/* Project */}

                <section className="rounded-2xl border border-line bg-panel p-5">
                  <h2 className="mb-4 font-display text-base font-semibold">
                    Project
                  </h2>

                  <Link
                    to={`/projects/${projectId ?? "projecthub"}`}
                    className="flex items-center gap-3 rounded-xl bg-secondary/35 p-3 hover:bg-secondary/55"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-secondary">
                      PH
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {projectName}
                      </p>

                      <p className="text-xs text-muted">Project workspace</p>
                    </div>

                    <ChevronRightIcon />
                  </Link>
                </section>

                {/* Actions */}

                <section className="rounded-2xl border border-line bg-panel p-5">
                  <h2 className="mb-4 font-display text-base font-semibold">
                    Actions
                  </h2>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <CheckSquareIcon />
                      Mark as complete
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={openAssigneeModal}
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <UserPlusIcon />
                      Change assignee
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <CalendarIcon />
                      Change due date
                    </Button>

                    <Button
                      variant="danger"
                      className="w-full justify-start px-3 py-2.5 text-left"
                    >
                      <TrashIcon />
                      Delete task
                    </Button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
        description="Update the details of your task."
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                const form = document.getElementById(
                  "edit-task-form"
                ) as HTMLFormElement;

                form?.requestSubmit();
              }}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        }
      >
        <form
          id="edit-task-form"
          onSubmit={handleUpdateTask}
          className="space-y-4"
        >
          {editError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {editError}
            </p>
          )}

          <Input
            label="Task Title"
            value={editForm.title}
            onChange={(e) => 
              setEditForm({ ...editForm, title: e.target.value })
            }
            required
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral">
              Description
            </label>

            <textarea
              value={editForm.description}
              onChange={(e) => 
                setEditForm({ ...editForm, description: e.target.value })
              }
              rows={4}
              className="w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral">
              Status
            </label>

            <select
              value={editForm.status}
              onChange={(e) => 
                setEditForm({ 
                  ...editForm, 
                  status: e.target.value as TaskStatus,
                })
              }
              className="w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-sm"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral">
              Priority
            </label>

            <select
              value={editForm.priority}
              onChange={(e) => 
                setEditForm({ 
                  ...editForm, 
                  priority: e.target.value as Priority,
                })
              }
              className="w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-sm"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={editForm.dueDate}
            onChange={(e) =>
              setEditForm({ ...editForm, dueDate: e.target.value })
            }
          />
        </form>
      </Modal>

      <Modal
        isOpen={isAssigneeModalOpen}
        onClose={() => setIsAssigneeModalOpen(false)}
        title="Change Assignee"
      >
        <form onSubmit={handleAssignTask} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Assign task to
            </label>

            <select
              value={selectedAssigneeId}
              onChange={(e) => setSelectedAssigneeId(e.target.value)}
              className="w-full rounded-lg border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Unassigned</option>

              {project && (
                <option value={project.owner_id}>
                  {project.owner_name} (Project Owner)
                </option>
              )}

              {members
                .filter((member) => member.id !== project?.owner_id)
                .map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
            </select>
          </div>

          {assigneeError && (
            <p className="text-sm text-red-600">{assigneeError}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAssigneeModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isAssigning}>
              {isAssigning ? "Saving..." : "Save Assignee"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ============================================================
   COMPONENTS
   ============================================================ */

const DetailItem = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted">{label}</span>

      <div className="text-right">{value}</div>
    </div>
  );
};

const Person = ({ initials, name }: { initials: string; name: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-tertiary">
        {initials}
      </span>

      <span className="max-w-28 truncate text-sm font-medium">{name}</span>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <article className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-tertiary">
        {comment.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">{comment.name}</span>

          <span className="text-xs text-muted">{comment.role}</span>

          <span className="text-xs text-muted">• {comment.time}</span>
        </div>

        <p className="mt-2 text-sm leading-6 text-muted">{comment.message}</p>
      </div>
    </article>
  );
};

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const labels: Record<TaskStatus, string> = {
    TODO: "Todo",
    IN_PROGRESS: "In Progress",
    IN_REVIEW: "In Review",
    DONE: "Done",
  };

  return (
    <Badge variant="default" className="gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {labels[status]}
    </Badge>
  );
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const variant =
    priority === "URGENT"
      ? "danger"
      : priority === "HIGH"
        ? "danger"
        : priority === "MEDIUM"
          ? "warning"
          : "muted";

  return <Badge variant={variant}>{priority}</Badge>;
};

/* ============================================================
   ICONS
   ============================================================ */

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

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="h-4 w-4"
  >
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const CommentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="h-4 w-4"
  >
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
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
    <path d="m4 20 4.2-.8L19 8.4a2 2 0 0 0-2.8-2.8L5.4 16.4 4 20Z" />
    <path d="m14.8 7.2 2 2" />
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

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const UserPlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c.5-3.3 2.5-5 6-5s5.5 1.7 6 5" />
    <path d="M18 8v6M15 11h6" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M5 7h14M10 11v5M14 11v5" />
    <path d="M9 7V4h6v3M7 7l1 14h8l1-14" />
  </svg>
);

export default TaskDetails;
