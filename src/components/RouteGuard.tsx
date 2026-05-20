"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";
import type { UserRole } from "@/lib/types";

export function RouteGuard({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading: authLoading, configured } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  useEffect(() => {
    if (!configured) return;
    if (authLoading || profileLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (profile && profile.role !== role) {
      router.replace(profile.role === "teacher" ? "/admin" : "/workspace");
    }
  }, [configured, authLoading, profileLoading, user, profile, role, router]);

  if (!configured) {
    return (
      <div className="cb-root" style={{ display: "grid", placeItems: "center", height: "100%" }}>
        <p className="cb-grn">Firebase sozlanmagan. .env.local faylini to‘ldiring.</p>
      </div>
    );
  }

  if (authLoading || profileLoading || !user || !profile || profile.role !== role) {
    return (
      <div className="cb-root" style={{ display: "grid", placeItems: "center", height: "100%" }}>
        <span className="cb-pulse cb-grn">⟳ Yuklanmoqda…</span>
      </div>
    );
  }

  return <>{children}</>;
}
