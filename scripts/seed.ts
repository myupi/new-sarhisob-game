/**
 * Firestore seed: 20 tasks + groups
 * Ishga tushirish: npx tsx scripts/seed.ts
 * Oldin .env.local da Firebase Admin yoki client creds kerak.
 *
 * MVP: client SDK bilan — avvalo teacher hisobidan login qiling,
 * yoki Firebase Console dan qo‘lda import qiling.
 */

import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { MISSIONS } from "../src/lib/missions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const GROUPS = [
  { id: "JS-101-A", name: "JS-101-A", studentCount: 0 },
  { id: "JS-101-B", name: "JS-101-B", studentCount: 0 },
  { id: "JS-202-A", name: "JS-202-A", studentCount: 0 },
  { id: "NIGHT-OPS", name: "NIGHT-OPS", studentCount: 0 },
];

async function main() {
  if (!firebaseConfig.apiKey) {
    console.error("NEXT_PUBLIC_FIREBASE_* env o‘zgaruvchilari topilmadi.");
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  for (const task of MISSIONS) {
    await setDoc(doc(db, "tasks", String(task.id)), task);
    console.log(`✓ tasks/${task.id} — ${task.title}`);
  }

  for (const g of GROUPS) {
    await setDoc(doc(db, "groups", g.id), g);
    console.log(`✓ groups/${g.id}`);
  }

  console.log("\nTayyor! 20 vazifa va 4 guruh yuklandi.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
