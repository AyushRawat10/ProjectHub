import { z } from "zod";

export const createCommentSchema = z.object({
    content: z.
        string()
        .trim()
        .min(1, "Comment content is required")
        .max(5000, "Comment cannot exceed 5000 characters")
})

export const updateCommentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Comment cannot be empty")
        .max(5000, "Comment cannot exceed 5000 characters")
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided",
    }
)