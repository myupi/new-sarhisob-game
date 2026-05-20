"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useFirebaseAuthState } from "@/hooks/useFirebaseAuth";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { User } from "firebase/auth";

interface AuthContextValue {
  user: User | undefined;
  loading: boolean;
  error: Error | undefined;
  configured: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  loading: true,
  error: undefined,
  configured: false,
});

function AuthStateBridge({ children }: { children: ReactNode }) {
  const [user, loading, error] = useFirebaseAuthState();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? undefined,
        loading,
        error,
        configured: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{ user: undefined, loading: true, error: undefined, configured }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  if (!configured) {
    return (
      <AuthContext.Provider
        value={{ user: undefined, loading: false, error: undefined, configured: false }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return <AuthStateBridge>{children}</AuthStateBridge>;
}

export function useAuth() {
  return useContext(AuthContext);
}
