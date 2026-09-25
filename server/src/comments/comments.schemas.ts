import { z } from "zod";

export const createCommentSchema = z.object({
    content: z.string().trim().min(1, "Comment content is required")
})

export const updateCommentSchema = z.object({
    content: z.string().trim().min(1, "Comment content is required")
})