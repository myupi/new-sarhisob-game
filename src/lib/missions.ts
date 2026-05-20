import type { Task } from "./types";

/** Statik 20 vazifa — Firestore seed bilan mos. */
export const MISSIONS: Task[] = [
  {
    id: 1,
    title: "Tizimga kirish",
    brief:
      "Salom, xaker! Terminalga kirish uchun senga maxsus kalit so'z kerak. Bizda `secret` nomli o'zgaruvchi bor, uning qiymati `\"dasturchi\"`. Sening vazifang — `console.log()` yordamida ushbu o'zgaruvchining uzunligini (nechta harfdan iboratligini) konsolga chiqarish.\n\nMaslahat: Satr uzunligini aniqlash uchun `.length` xususiyatidan foydalaniladi.",
    hints: ["`.length` — satr uzunligi", "console.log(secret.length)"],
    starter: `const secret = "dasturchi";\n// uzunlikni konsolga chiqaring\n`,
    keyWord: "BAYTKOD",
    testFn: 'out => out.some(l => l.trim() === "9")',
  },
  {
    id: 2,
    title: "Salom, dunyo",
    brief: "Konsolga 'Salom, dunyo!' deb yozing — bu sizning birinchi qadamingiz.",
    hints: ["console.log()"],
    starter: `// Bosqich 02 · Salom, dunyo\nconsole.log("Salom, dunyo!");`,
    keyWord: "MATRIKS",
    testFn: "out => /salom,\\s*dunyo/i.test(out.join('\\n'))",
  },
  {
    id: 3,
    title: "Massiv tugunlari",
    brief:
      'Serverlar ro\'yxati: hostlar = ["alfa", "bravo", "charlie"]. Nechta element bor? Natijani konsolga chiqaring.',
    hints: ["Massiv uzunligi", "hostlar.length"],
    starter: `const hostlar = ["alfa", "bravo", "charlie"];\n`,
    keyWord: "OQIM",
    testFn: "out => out.some(l => /\\b3\\b/.test(l))",
  },
  {
    id: 4,
    title: "Yig'indi protokoli",
    brief: "Massivdagi sonlar yig'indisini hisoblang: raqamlar = [4, 8, 15, 16, 23, 42].",
    hints: ["for / reduce", "Akkumulator"],
    starter: `const raqamlar = [4, 8, 15, 16, 23, 42];\n`,
    keyWord: "RELIKT",
    testFn: "out => out.some(l => /\\b108\\b/.test(l))",
  },
  ...Array.from({ length: 16 }, (_, i) => {
    const id = i + 5;
    const keys = [
      "SHIFR", "QALQON", "NUQTA", "OQIM2", "ZANJIR", "KODEX", "SIGNAL", "PORTAL",
      "VERTEX", "PAYLOAD", "KERNEL", "CIPHER", "VECTOR", "BINARY", "NEXUS", "OMEGA",
    ];
    return {
      id,
      title: `Bosqich ${String(id).padStart(2, "0")}`,
      brief: "Bu bosqich tez orada ochiladi. Hozircha oldingi missiyalarni tugating.",
      hints: [] as string[],
      starter: `// Bosqich ${String(id).padStart(2, "0")} — tez orada\n`,
      keyWord: keys[i] ?? "KODEXX",
      testFn: "() => false",
    } satisfies Task;
  }),
];

export function getMission(id: number): Task | undefined {
  return MISSIONS.find((m) => m.id === id);
}

export function runTest(testFn: string, out: string[]): boolean {
  try {
    const fn = new Function("out", `return (${testFn})(out)`);
    return Boolean(fn(out));
  } catch {
    return false;
  }
}
