import { z } from "zod";

export const addProjectMemberSchema = z.object({
    userId: z.string().uuid("Invalid user ID")
})