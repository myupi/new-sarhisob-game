import {
  addDoc,
  arrayUnion,
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import { submissionsCol } from "./db";

export async function createSubmission(params: {
  studentUid: string;
  studentName: string;
  taskId: number;
  code: string;
  consoleOutput: string[];
  testPassed: boolean;
}): Promise<string> {
  const ref = await addDoc(submissionsCol(), {
    studentUid: params.studentUid,
    studentName: params.studentName,
    taskId: params.taskId,
    code: params.code,
    consoleOutput: params.consoleOutput,
    testPassed: params.testPassed,
    status: "pending",
    grade: null,
    teacherUid: null,
    submittedAt: serverTimestamp(),
    reviewedAt: null,
  });
  return ref.id;
}

export async function approveSubmission(
  submissionId: string,
  grade: number,
  teacherUid: string,
): Promise<void> {
  const db = getFirebaseDb();

  await runTransaction(db, async (tx) => {
    const subRef = doc(db, "submissions", submissionId);
    const subSnap = await tx.get(subRef);
    if (!subSnap.exists()) throw new Error("Topshiriq topilmadi");

    const sub = subSnap.data();
    const userRef = doc(db, "users", sub.studentUid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error("Talaba topilmadi");

    const user = userSnap.data();
    const taskId = sub.taskId as number;
    const nextUnlock = Math.max(user.unlockedUpTo ?? 1, taskId + 1);

    tx.update(subRef, {
      status: "approved",
      grade,
      teacherUid,
      reviewedAt: serverTimestamp(),
    });

    tx.update(userRef, {
      unlockedUpTo: nextUnlock,
      currentTask: Math.max(user.currentTask ?? 1, nextUnlock),
      completedTasks: arrayUnion(taskId),
    });
  });
}

export async function rejectSubmission(
  submissionId: string,
  grade: number,
  teacherUid: string,
): Promise<void> {
  const db = getFirebaseDb();
  const subRef = doc(db, "submissions", submissionId);
  await updateDoc(subRef, {
    status: "rejected",
    grade,
    teacherUid,
    reviewedAt: serverTimestamp(),
  });
}
