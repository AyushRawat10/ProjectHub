import api from "./api";

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type VerifyEmailData = {
    email: string;
    otp: string;
};

export type ResendVerificationData = {
    email: string;
};

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "LEADER" | "MEMBER";
    avatar_url?: string | null;
};

export type LoginResponse = {
    accessToken: string;
    user: AuthUser;
};

export type RefreshResponse = {
    accessToken: string;
}

export const register = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);

    return response.data;
}

export const verifyEmail = async (data: VerifyEmailData) => {
    const response = await api.post("/auth/verify-email", data);

    return response.data;
}

export const resendVerification = async (data: ResendVerificationData) => {
    const response = await api.post("/auth/resend-verification", data);

    return response.data;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);

    return response.data;
}

export const getMe = async (): Promise<AuthUser> => {
    const response = await api.get<{user: AuthUser}>("/auth/me");

    return response.data.user;
}

export const refreshToken = async (): Promise<RefreshResponse> => {
    const response = await api.post<RefreshResponse>("/auth/refresh");

    return response.data;
}

export const logout = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
}