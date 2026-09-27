import crypto from "crypto";
import jwt from "jsonwebtoken";

export const hashSessionToken = (token: string): string => {
	return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

export const generateAccessToken = (userId: string): string => {
	return jwt.sign(
        { userId }, 
        process.env.ACCESS_TOKEN_SECRET!, 
        { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
	return jwt.sign(
        { userId }, 
        process.env.REFRESH_TOKEN_SECRET!, 
        { expiresIn: "7d"}
    );
};

export const verifyRefreshToken = (token: string) => {

    const secret = process.env.REFRESH_TOKEN_SECRET;

    if(!secret) {
        throw new Error("REFRESH_TOKEN_SECRET is missing");
    }

    const decoded = jwt.verify(token, secret);

    if(typeof decoded === "object" && decoded !== null && typeof decoded.userId === "string" && decoded.userId) {
        return {
            userId: decoded.userId
        }
    }

    throw new Error("Invalid refresh token payload");
};

export const generateVerificationCode = (): string => {
    return crypto.randomInt(100000, 1000000).toString();
}
