import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { CustomJwtPayload } from "./auth.types.js";

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }
    
    const accessToken = authHeader.split(" ")[1];
    
    try {

        if(!accessToken) {
            return res.status(401).json({
                message: "Access token required"
            })
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;

        if(!secret) {
            throw new Error("ACCESS_TOKEN_SECRET is missing")
        }

		const decoded = jwt.verify(
            accessToken,
            secret,
        ) as CustomJwtPayload;


		req.userId = decoded.userId;

		next();
	} catch (error) {
        console.error("ERROR ! Invalid or expired access token : ", error)
    }
};
