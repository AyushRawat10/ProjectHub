import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required"),
    description: z.string().trim().optional(),
    assigneeId: z.string().uuid().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Due date must be in YYYY-MM-DD format"
      )
      .refine((date) => {
        const parsedDate = new Date(`${date}T00:00:00.000Z`);

        return (
          !Number.isNaN(parsedDate.getTime()) &&
          parsedDate.toISOString().slice(0, 10) === date
        );
      }, "Due date must be a valid calendar date")
      .optional(),
})

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().nullable().optional(),
    assigneeId: z.string().uuid().nullable().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Due date must be in YYYY-MM-DD format"
      )
      .refine((date) => {
        const parsedDate = new Date(`${date}T00:00:00.000Z`);

        return (
          !Number.isNaN(parsedDate.getTime()) &&
          parsedDate.toISOString().slice(0, 10) === date
        );
      }, "Due date must be a valid calendar date")
      .nullable()
      .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided to update the task",
  }
);

