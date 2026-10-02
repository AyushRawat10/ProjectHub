import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

const refreshAccessToken = async (): Promise<string | null> => {
    if(refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const response = await axios.post<{accessToken: string}>("http://localhost:5000/api/auth/refresh", {}, {
                withCredentials: true,
            })
            const newToken = response.data.accessToken;

            accessToken = newToken;

            return newToken;
        } catch {
            accessToken = null;
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

api.interceptors.request.use((config) => {
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if(
            error.response?.status !== 401 ||
            originalRequest?._retry ||
            originalRequest?.url?.includes("/auth/refresh")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const newToken = await refreshAccessToken();

        if(!newToken) {
            return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
    }
)

export default api;