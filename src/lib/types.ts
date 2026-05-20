import type { Timestamp } from "firebase/firestore";

export type UserRole = "student" | "teacher";

export interface AppUser {
  uid: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  group: string | null;
  currentTask: number;
  unlockedUpTo: number;
  completedTasks: number[];
  createdAt: Timestamp;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  studentUid: string;
  studentName: string;
  taskId: number;
  code: string;
  consoleOutput: string[];
  testPassed: boolean;
  status: SubmissionStatus;
  grade: number | null;
  teacherUid: string | null;
  submittedAt: Timestamp;
  reviewedAt: Timestamp | null;
}

export interface Task {
  id: number;
  title: string;
  brief: string;
  hints: string[];
  starter: string;
  keyWord: string;
  testFn: string;
}

export interface Group {
  id: string;
  name: string;
  studentCount: number;
}
