export type CreateProjectBody = {
    name: string;
    description?: string
}

export type UpdateProjectBody = {
    name?: string;
    description?: string
}