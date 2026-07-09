import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getCurrentUser, login, register } from "../api/authApi";
import { deleteAccessToken, getAccessToken, saveAccessToken } from "../storage/tokenStorage";
import type {
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

type AuthContextValue = {
  user: CurrentUser | null;
  loading: boolean;
  authenticated: boolean;
  loginUser: (request: LoginRequest) => Promise<void>;
  registerUser: (request: RegisterRequest) => Promise<void>;
  logoutUser: () => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCurrentUser = useCallback(async () => {
    const currentUser = await getCurrentUser();

    setUser(currentUser);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrapAuth() {
      try {
        const token = await getAccessToken();

        if (!token) {
          return;
        }

        const currentUser = await getCurrentUser();

        if (mounted) {
          setUser(currentUser);
        }
      } catch {
        await deleteAccessToken();

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    bootstrapAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const loginUser = useCallback(async (request: LoginRequest) => {
    const response = await login(request);

    await saveAccessToken(response.accessToken);

    setUser({
      userId: response.userId,
      fullName: response.fullName,
      email: response.email,
      totalXp: response.totalXp,
      level: response.level,
    });
  }, []);

  const registerUser = useCallback(async (request: RegisterRequest) => {
    const response = await register(request);

    await saveAccessToken(response.accessToken);

    setUser({
      userId: response.userId,
      fullName: response.fullName,
      email: response.email,
      totalXp: response.totalXp,
      level: response.level,
    });
  }, []);

  const logoutUser = useCallback(async () => {
    await deleteAccessToken();

    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      authenticated: user !== null,
      loginUser,
      registerUser,
      logoutUser,
      refreshCurrentUser,
    }),
    [user, loading, loginUser, registerUser, logoutUser, refreshCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return value;
}