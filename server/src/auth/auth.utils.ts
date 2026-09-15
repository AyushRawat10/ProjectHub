import crypto from "crypto";

export const generateSessionToken = (): string => {
    return crypto.randomBytes(32).toString("hex");
}

export const hashSessionToken = (token: string): string => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}