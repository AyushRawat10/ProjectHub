import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required"),
    description: z.string().trim().optional(),
    assigneeId: z.string().uuid().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().optional(),
})

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    assigneeId: z.string().uuid().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().optional()
})

