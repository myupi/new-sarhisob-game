import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { AppUser, Group, Submission, Task } from "./types";

export const usersCol = () => collection(getFirebaseDb(), "users");
export const tasksCol = () => collection(getFirebaseDb(), "tasks");
export const submissionsCol = () => collection(getFirebaseDb(), "submissions");
export const groupsCol = () => collection(getFirebaseDb(), "groups");

export async function getUser(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "users", uid));
  if (!snap.exists()) return null;
  return { ...(snap.data() as DocumentData), uid: snap.id } as AppUser;
}

export async function getStudentsByGroup(groupId: string | null): Promise<AppUser[]> {
  const q =
    groupId === null
      ? query(usersCol(), where("role", "==", "student"))
      : query(usersCol(), where("role", "==", "student"), where("group", "==", groupId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as DocumentData), uid: d.id }) as AppUser);
}

export async function getTask(taskId: number): Promise<Task | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "tasks", String(taskId)));
  if (!snap.exists()) return null;
  return snap.data() as Task;
}

export async function getAllTasks(): Promise<Task[]> {
  const snap = await getDocs(tasksCol());
  return snap.docs.map((d) => d.data() as Task).sort((a, b) => a.id - b.id);
}

export async function getGroups(): Promise<Group[]> {
  const snap = await getDocs(groupsCol());
  return snap.docs.map((d) => ({ ...(d.data() as DocumentData), id: d.id }) as Group);
}

export async function getPendingSubmissions(): Promise<Submission[]> {
  const q = query(submissionsCol(), where("status", "==", "pending"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as DocumentData), id: d.id }) as Submission);
}
