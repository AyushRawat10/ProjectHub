export type CreateTaskBody = {
    title: string;
    description?: string;
    assigneeId?: string;
    status?: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate?: string;
}