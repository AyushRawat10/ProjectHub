import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required"),
    description: z.string().trim().optional(),
    assigneeId: z.string().uuid().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  "Due date must be in YYYY-MM-DD format"
).optional(),
})

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    assigneeId: z.string().uuid().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  "Due date must be in YYYY-MM-DD format"
).optional()
})

