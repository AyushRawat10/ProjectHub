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
	return jwt.verify(
        token, 
        process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string; };
};

export const generateVerificationCode = (): string => {
    return crypto.randomInt(100000, 1000000).toString();
}
