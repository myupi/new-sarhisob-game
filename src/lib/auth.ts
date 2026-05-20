import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./firebase";
import type { AppUser, UserRole } from "./types";

/** Псевдо-email из номера телефона (MVP без SMS Phone Auth). */
export function phoneToEmail(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `${digits}@sarhisob.local`;
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("998")) {
    return `+${digits}`;
  }
  if (digits.length === 9) {
    return `+998${digits}`;
  }
  return `+${digits}`;
}

export async function signUp(params: {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  group?: string | null;
}): Promise<User> {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const email = phoneToEmail(params.phone);
  const cred = await createUserWithEmailAndPassword(auth, email, params.password);
  const phone = normalizePhone(params.phone);

  const userDoc: Omit<AppUser, "createdAt"> & {
    createdAt: ReturnType<typeof serverTimestamp>;
  } = {
    uid: cred.user.uid,
    role: params.role,
    firstName: params.firstName.trim(),
    lastName: params.lastName.trim(),
    phone,
    group: params.role === "student" ? (params.group ?? null) : null,
    currentTask: 1,
    unlockedUpTo: 1,
    completedTasks: [],
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", cred.user.uid), userDoc);
  return cred.user;
}

export async function signIn(phone: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  const email = phoneToEmail(phone);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}
