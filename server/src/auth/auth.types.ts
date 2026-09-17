import "express";
import jwt from "jsonwebtoken";

export type RegisterBody = {
    name: string;
    email: string;
    password: string
}

export type VerifyEmailBody = {
    email: string;
    code: string
}

export type LoginBody = {
    email: string;
    password: string
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export interface CustomJwtPayload extends jwt.JwtPayload {
    userId: string;
}
