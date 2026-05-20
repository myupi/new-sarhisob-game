"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "@/lib/firebase";

/** Faqat Firebase sozlangan bo‘lganda chaqiring (AuthStateBridge ichida). */
export function useFirebaseAuthState() {
  return useAuthState(getFirebaseAuth());
}
