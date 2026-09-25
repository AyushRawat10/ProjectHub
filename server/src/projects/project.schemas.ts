import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, "Project name is required"),
    description: z.string().trim().optional()
})

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, "Project name is required").optional(),
    description: z.string().trim().optional()
})