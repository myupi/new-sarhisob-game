"use client";

import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuth } from "@/providers/AuthProvider";
import { getFirebaseDb } from "@/lib/firebase";
import type { AppUser } from "@/lib/types";

export function useUserProfile() {
  const { user, loading: authLoading, configured } = useAuth();

  const [snap, docLoading, error] = useDocument(
    configured && user?.uid ? doc(getFirebaseDb(), "users", user.uid) : null,
  );

  const profile = snap?.exists()
    ? ({ ...(snap.data() as Omit<AppUser, "uid">), uid: snap.id } as AppUser)
    : undefined;

  return {
    profile,
    user,
    loading: authLoading || docLoading,
    error,
  };
}
