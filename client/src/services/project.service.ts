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

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<GetProjectsResponse>("/projects");

  return response.data.projects;
};