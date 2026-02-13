import { createContext, useState, useEffect, type ReactNode } from "react";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  isFarmer: boolean;
  createdAt: string;
}

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

const STORAGE_KEY = "fungifarm_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call — replace with Supabase auth later
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if there's an existing user with that email in localStorage
        const storedUsers = JSON.parse(
          localStorage.getItem("fungifarm_users") || "[]",
        ) as UserProfile[];
        const existingUser = storedUsers.find((u) => u.email === email);

        if (existingUser) {
          setUser(existingUser);
          resolve(true);
        } else {
          // For demo: create a user on login anyway
          const newUser: UserProfile = {
            id: crypto.randomUUID(),
            fullName: email.split("@")[0],
            email,
            phone: "",
            isFarmer: false,
            createdAt: new Date().toISOString(),
          };
          setUser(newUser);
          resolve(true);
        }
      }, 1000);
    });
  };

  const register = async (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<boolean> => {
    // Simulate API call — replace with Supabase auth later
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: UserProfile = {
          id: crypto.randomUUID(),
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          isFarmer: false,
          createdAt: new Date().toISOString(),
        };

        // Store in users list for later login lookup
        const storedUsers = JSON.parse(
          localStorage.getItem("fungifarm_users") || "[]",
        ) as UserProfile[];
        storedUsers.push(newUser);
        localStorage.setItem("fungifarm_users", JSON.stringify(storedUsers));

        setUser(newUser);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };

      // Also update in users list
      const storedUsers = JSON.parse(
        localStorage.getItem("fungifarm_users") || "[]",
      ) as UserProfile[];
      const idx = storedUsers.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        storedUsers[idx] = updated;
        localStorage.setItem("fungifarm_users", JSON.stringify(storedUsers));
      }

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
