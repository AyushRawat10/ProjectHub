import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  refreshToken,
  type AuthUser,
  type LoginData,
} from "../services/auth.service";
import { setAccessToken } from "../services/api";

type AuthContextType = {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshResponse = await refreshToken();

        setAccessTokenState(refreshResponse.accessToken);
        setAccessToken(refreshResponse.accessToken);

        const meResponse = await getMe();

        setUser(meResponse);
      } catch (error) {
        setAccessTokenState(null);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (data: LoginData) => {
    const response = await loginRequest(data);

    setAccessTokenState(response.accessToken);
    setAccessToken(response.accessToken);
    setUser(response.user);
  };

  const logout = async () => {
    try {
        await logoutRequest();
    } finally {
        setAccessTokenState(null);
        setAccessToken(null);
        setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
