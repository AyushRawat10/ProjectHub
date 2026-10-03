import api from "./api";

export type Project = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

type GetProjectsResponse = {
  message: string;
  projects: Project[];
};

export type CreateProjectData = {
  name: string;
  description?: string;
}

type CreateProjectResponse = {
  message: string;
  project: Project;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<GetProjectsResponse>("/projects");

  return response.data.projects;
};

export const createProject = async (
  data: CreateProjectData
): Promise<Project> => {
  const response = await api.post<CreateProjectResponse>("/projects", data);

  return response.data.project;
}