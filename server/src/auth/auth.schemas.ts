import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export const verifyEmailSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    code: z.string().regex(/^\d{6}$/, "Verification code must be 6 digits")
})