import api from "./api";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export type Task = {
  id: string;
  project_id: string;
  creator_id: string;
  assignee_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  creator_name: string;
  assignee_name: string | null;
};

export type CreateTaskData = {
  title: string;
  description?: string;
  assigneeId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
};

export type UpdateTaskData = Partial<CreateTaskData>;

type GetTasksResponse = {
  message: string;
  tasks: Task[];
};

type TaskResponse = {
  message: string;
  task: Task;
};

export type GetProjectTasksParams = {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: "created_at" | "updated_at" | "due_date" | "title";
  order?: "asc" | "desc";
};

export const getProjectTasks = async (
  projectId: string,
  params?: GetProjectTasksParams
): Promise<Task[]> => {
  const response = await api.get<GetTasksResponse>(
    `/projects/${projectId}/tasks`,
    { params }
  );

  return response.data.tasks;
};

export const getTaskById = async (
  projectId: string,
  taskId: string
): Promise<Task> => {
  const response = await api.get<TaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return response.data.task;
};

export const createTask = async (
  projectId: string,
  data: CreateTaskData
): Promise<Task> => {
  const response = await api.post<TaskResponse>(
    `/projects/${projectId}/tasks`,
    data
  );

  return response.data.task;
};

export const updateTask = async (
  projectId: string,
  taskId: string,
  data: UpdateTaskData
): Promise<Task> => {
  const response = await api.patch<TaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`,
    data
  );

  return response.data.task;
};

export const deleteTask = async (
  projectId: string,
  taskId: string
): Promise<Task> => {
  const response = await api.delete<TaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return response.data.task;
};