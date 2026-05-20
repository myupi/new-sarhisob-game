"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { getUser } from "@/lib/db";
import { setRoleCookie } from "@/lib/session";

export default function HomePage() {
  const router = useRouter();
  const { user, loading, configured } = useAuth();

  useEffect(() => {
    if (!configured) {
      router.replace("/login");
      return;
    }
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    getUser(user.uid).then((profile) => {
      if (!profile) {
        router.replace("/login");
        return;
      }
      setRoleCookie(profile.role);
      router.replace(profile.role === "teacher" ? "/admin" : "/workspace");
    });
  }, [configured, loading, user, router]);

  return (
    <div className="cb-root" style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <span className="cb-pulse cb-grn">⟳ Yo‘naltirilmoqda…</span>
    </div>
  );
}
