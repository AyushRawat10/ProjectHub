import api from "./api";

export type ProjectMember = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  joined_at: string;
};

type GetProjectMembersResponse = {
  message: string;
  members: ProjectMember[];
};

export const getProjectMembers = async (
  projectId: string
): Promise<ProjectMember[]> => {
  const response = await api.get<GetProjectMembersResponse>(
    `/projects/${projectId}/members`
  );

  return response.data.members;
};