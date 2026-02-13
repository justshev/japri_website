import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";
import type { UserProfile, Session } from "@/lib/api/types";

export type { UserProfile };

const SESSION_KEY = "fungifarm_session";
const USER_KEY = "fungifarm_user";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: persist session & user
  const persistAuth = useCallback((session: Session, profile: UserProfile) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // Bootstrap: restore user from localStorage, then verify with /users/me
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedSession = localStorage.getItem(SESSION_KEY);

        if (storedUser && storedSession) {
          // Optimistically set user from cache
          setUser(JSON.parse(storedUser));

          // Verify session is still valid
          try {
            const res = await usersApi.getMe();
            if (res.success && res.data) {
              const profile: UserProfile = {
                id: res.data.id,
                fullName: res.data.fullName,
                email: res.data.email,
                phone: res.data.phone ?? "",
                avatar: res.data.avatar ?? undefined,
                isFarmer: res.data.isFarmer,
                createdAt: res.data.createdAt,
              };
              localStorage.setItem(USER_KEY, JSON.stringify(profile));
              setUser(profile);
            }
          } catch {
            // Token expired / invalid — interceptor will handle refresh or clear
          }
        }
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, [clearAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.data) {
        persistAuth(res.data.session, res.data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const res = await authApi.register(data);
      if (res.success && res.data) {
        persistAuth(res.data.session, res.data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore error on logout
    } finally {
      clearAuth();
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
