import api from "./api";

export type AvailableUser = {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
};

type SearchUserResponse = {
    message: string;
    users: AvailableUser[];
};

export const searchAvailableUsers = async (
    projectId: string,
    search: string
): Promise<AvailableUser[]> => {
    const response = await api.get<SearchUserResponse>("/users", {
        params: {
            projectId,
            search,
        },
    });

    return response.data.users;
}