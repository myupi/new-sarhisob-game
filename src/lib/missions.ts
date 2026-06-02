import type { Task } from "./types";

/** Statik 30 vazifa — Firestore seed bilan mos. */
export const MISSIONS: Task[] = [
  {
    id: 1,
    title: "Maxfiy taxallus yaratish",
    brief:
      "Salom, xaker! Tizimga yangi agent sifatida kirding, lekin hali senga taxallus berilmagan. Sening vazifang — codename nomli o'zgaruvchi yaratish va unga \"Shadow\" qiymatini berish, so'ng uni console.log() yordamida konsolga chiqarish.\n\nMaslahat: O'zgaruvchi yaratish uchun let yoki const kalit so'zidan foydalaniladi.",
    hints: ["const codename = \"Shadow\";", "console.log(codename)"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "SHADOW",
    testFn: 'out => out.some(l => l.includes("Shadow"))',
  },
  {
    id: 2,
    title: "Agent dosyesi",
    brief:
      "Salom, xaker! Tizimda har bir agentning to'liq ma'lumotlari saqlanishi kerak. Sening vazifang — uchta o'zgaruvchi yaratish: name = \"Alex\" (matn), age = 25 (son), isActive = true (mantiqiy). Uchtalasini ham console.log() yordamida konsolga chiqar.\n\nMaslahat: Matn uchun \" \", son uchun faqat raqam, ha/yo'q uchun true/false ishlatiladi.",
    hints: ["const name = \"Alex\"; const age = 25; const isActive = true;", "console.log(name, age, isActive)"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "DOSYE",
    testFn: 'out => { const s = out.join(" "); return s.includes("Alex") && /\\b25\\b/.test(s) && /\\btrue\\b/.test(s); }',
  },
  {
    id: 3,
    title: "Tizimga kirish",
    brief:
      "Salom, xaker! Terminalga kirish uchun senga maxsus kalit so'z kerak. Bizda secret nomli o'zgaruvchi bor, uning qiymati \"dasturchi\". Sening vazifang — console.log() yordamida ushbu o'zgaruvchining uzunligini (nechta harfdan iboratligini) konsolga chiqarish.\n\nMaslahat: Satr uzunligini aniqlash uchun .length xususiyatidan foydalaniladi.",
    hints: [".length — satr uzunligi", "console.log(secret.length)"],
    starter: `const secret = "dasturchi";\n// Kodingni shu yerga yoz\n`,
    keyWord: "KALIT",
    testFn: 'out => out.some(l => l.trim() === "9")',
  },
  {
    id: 4,
    title: "Xabarni shifrlash",
    brief:
      "Salom, xaker! Dushman eshityapti. Barcha maxfiy xabarlar KATTA HARFLAR bilan yuborilishi shart. Bizda message nomli o'zgaruvchi bor, uning qiymati \"operatsiya boshlandi\". Sening vazifang — bu xabarni katta harflarga o'tkazib, konsolga chiqarish.\n\nMaslahat: Satrni katta harfga o'tkazish uchun .toUpperCase() metodidan foydalaniladi.",
    hints: [".toUpperCase()", "console.log(message.toUpperCase())"],
    starter: `const message = "operatsiya boshlandi";\n// Kodingni shu yerga yoz\n`,
    keyWord: "SHIFR",
    testFn: 'out => out.some(l => l.includes("OPERATSIYA BOSHLANDI"))',
  },
  {
    id: 5,
    title: "Josusni topish",
    brief:
      "Salom, xaker! Razvedka ma'lumotlariga ko'ra, josus jamoada yashiringan. Bizda report nomli o'zgaruvchi bor, uning qiymati \"agent_007_josus_aniqlandi\". Sening vazifang — ushbu matinda \"josus\" so'zi borligini tekshirib, natijani konsolga chiqarish.\n\nMaslahat: Matnda so'z borligini tekshirish uchun .includes() metodidan foydalaniladi.",
    hints: [".includes(\"josus\")", "console.log(report.includes(\"josus\"))"],
    starter: `const report = "agent_007_josus_aniqlandi";\n// Kodingni shu yerga yoz\n`,
    keyWord: "JOSUS",
    testFn: 'out => out.some(l => l.trim() === "true")',
  },
  {
    id: 6,
    title: "Seyfni ochish",
    brief:
      "Salom, xaker! Maxfiy hujjatlar seyfda qulflangan. Seyfning kodi — bu hisob-kitob natijasi: (250 / 5) + 30 - 10. Sening vazifang — ushbu ifodani hisoblash va natijani console.log() yordamida konsolga chiqarish.\n\nMaslahat: JavaScript da +, -, *, / hisob amallari ishlatiladi.",
    hints: ["console.log((250 / 5) + 30 - 10)", "Natija: 70"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "SEYF",
    testFn: 'out => out.some(l => l.trim() === "70")',
  },
  {
    id: 7,
    title: "Juft kanal topish",
    brief:
      "Salom, xaker! Signal faqat juft kanallarda uzatiladi, toq kanallarda esa bloklanadi. Bizda channel = 47 bor. Sening vazifang — bu kanalning juft yoki toqligini aniqlash uchun qoldiqni konsolga chiqarish.\n\nMaslahat: Qoldiq topish uchun % operatori ishlatiladi. 0 = juft, 1 = toq.",
    hints: ["channel % 2", "console.log(channel % 2)"],
    starter: `const channel = 47;\n// Kodingni shu yerga yoz\n`,
    keyWord: "KANAL",
    testFn: 'out => out.some(l => l.trim() === "1")',
  },
  {
    id: 8,
    title: "Agentni tasdiqlash",
    brief:
      "Salom, xaker! Kimdir tizimga kirishga urinmoqda. Uning kodi to'g'ri yoki yo'qligini tekshirishimiz kerak. Bizda inputCode = \"X-99\" va realCode = \"X-99\" bor. Sening vazifang — ikkala kod bir xilmi yoki yo'qligini tekshirib, natijani konsolga chiqarish.\n\nMaslahat: Qiymatlarni solishtirish uchun === operatoridan foydalaniladi.",
    hints: ["inputCode === realCode", "console.log(inputCode === realCode)"],
    starter: `const inputCode = "X-99";\nconst realCode = "X-99";\n// Kodingni shu yerga yoz\n`,
    keyWord: "TASDIQ",
    testFn: 'out => out.some(l => l.trim() === "true")',
  },
  {
    id: 9,
    title: "Kirish nazorati",
    brief:
      "Salom, xaker! Maxfiy baza faqat 5 dan yuqori darajali agentlarni ichkariga o'tkazadi. Bizda accessLevel = 3 bor. Sening vazifang — agar daraja 5 dan katta bo'lsa \"Kirish ruxsat etildi\", aks holda \"Kirish taqiqlandi\" deb konsolga chiqarish.\n\nMaslahat: Shartni tekshirish uchun if / else dan foydalaniladi.",
    hints: ["if (accessLevel > 5) { ... } else { ... }", "console.log(\"Kirish taqiqlandi\")"],
    starter: `const accessLevel = 3;\n// Kodingni shu yerga yoz\n`,
    keyWord: "NAZORAT",
    testFn: 'out => out.some(l => l.includes("Kirish taqiqlandi"))',
  },
  {
    id: 10,
    title: "Ikki bosqichli himoya",
    brief:
      "Salom, xaker! Maxfiy bazaga kirish uchun ikkala shart bir vaqtda bajarilishi kerak: agentda guvohnoma bo'lishi (hasPass = true) VA uning darajasi 4 dan katta bo'lishi (level = 6). Sening vazifang — ikkala shart bajarilganini tekshirib, konsolga chiqarish.\n\nMaslahat: Ikkala shartni bir vaqtda tekshirish uchun && operatori ishlatiladi.",
    hints: ["hasPass && level > 4", "console.log(hasPass && level > 4)"],
    starter: `const hasPass = true;\nconst level = 6;\n// Kodingni shu yerga yoz\n`,
    keyWord: "QALQON",
    testFn: 'out => out.some(l => l.trim() === "true")',
  },
  {
    id: 11,
    title: "Tezkor qaror",
    brief:
      "Salom, xaker! Vaqt yo'q, tez qaror qabul qilish kerak! Agent onlaynda (isOnline = true). Sening vazifang — ternary operator yordamida: onlayn bo'lsa \"Aloqa bor\", bo'lmasa \"Aloqa yo'q\" deb konsolga chiqarish. Buni faqat BITTA QATORDA yoz!\n\nMaslahat: shart ? \"ha\" : \"yo'q\" — ternary operator shunday ishlaydi.",
    hints: ["isOnline ? \"Aloqa bor\" : \"Aloqa yo'q\"", "console.log(...)"],
    starter: `const isOnline = true;\n// Kodingni shu yerga yoz\n`,
    keyWord: "QAROR",
    testFn: 'out => out.some(l => l.includes("Aloqa bor"))',
  },
  {
    id: 12,
    title: "Portlarni skanerlash",
    brief:
      "Salom, xaker! Tizimning barcha portlarini tekshirish kerak. 1 dan 5 gacha bo'lgan portlarni birma-bir skanerlashimiz lozim. Sening vazifang — for tsikli yordamida 1 dan 5 gacha bo'lgan har bir port raqamini konsolga chiqarish.\n\nMaslahat: for (let i = 1; i <= 5; i++) ko'rinishida yoziladi.",
    hints: ["for (let i = 1; i <= 5; i++)", "console.log(i)"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "PORT",
    testFn: 'out => ["1","2","3","4","5"].every(n => out.some(l => l.trim() === n))',
  },
  {
    id: 13,
    title: "Buzish urinishlari",
    brief:
      "Salom, xaker! Tizim qo'riqchisi faqat 3 ta urinishga ruxsat beradi. Bizda attempts = 0 bor. Sening vazifang — while tsikli yordamida, urinishlar 3 dan kam bo'lguncha \"Urinish #1\", \"Urinish #2\", \"Urinish #3\" deb konsolga chiqarish.\n\nMaslahat: while(shart){ ... } ishlatiladi. Har safar attempts ni 1 ga oshirishni unutma!",
    hints: ["while (attempts < 3) { ... }", "attempts++ — oshirishni unutma"],
    starter: `let attempts = 0;\n// Kodingni shu yerga yoz\n`,
    keyWord: "BUZISH",
    testFn: 'out => [1,2,3].every(n => out.some(l => l.includes("Urinish #" + n)))',
  },
  {
    id: 14,
    title: "Agentlar ro'yxati",
    brief:
      "Salom, xaker! Jamoangni tizimga kiritish vaqti keldi. Sening vazifang — agents nomli massiv yaratish va unga \"Ghost\", \"Shadow\", \"Phantom\" agentlarini kiritish, so'ng massivni konsolga chiqarish.\n\nMaslahat: Massiv yaratish uchun [] qavslaridan foydalaniladi.",
    hints: ["const agents = [\"Ghost\", \"Shadow\", \"Phantom\"];", "console.log(agents)"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "ROYXAT",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && s.includes("Shadow") && s.includes("Phantom"); }',
  },
  {
    id: 15,
    title: "Agentni aniqlash",
    brief:
      "Salom, xaker! Baza ikkinchi agentning ma'lumotlarini talab qilmoqda. Bizda agents = [\"Ghost\", \"Shadow\", \"Phantom\"] bor. Sening vazifang — massivdagi ikkinchi agentni (Shadow ni) topib, uni konsolga chiqarish.\n\nMaslahat: Massivda indeks 0 dan boshlanadi. Birinchi element [0], ikkinchisi [1].",
    hints: ["agents[1]", "console.log(agents[1])"],
    starter: `const agents = ["Ghost", "Shadow", "Phantom"];\n// Kodingni shu yerga yoz\n`,
    keyWord: "INDEKS",
    testFn: 'out => out.some(l => l.includes("Shadow"))',
  },
  {
    id: 16,
    title: "Yangi agent qo'shish",
    brief:
      "Salom, xaker! Jamoaga yangi agent qo'shildi — \"Viper\". Bizda team = [\"Ghost\", \"Shadow\"] bor. Sening vazifang — \"Viper\" ni massiv oxiriga qo'shib, yangilangan ro'yxatni konsolga chiqarish.\n\nMaslahat: Massiv oxiriga element qo'shish uchun .push() metodidan foydalaniladi.",
    hints: ["team.push(\"Viper\")", "console.log(team)"],
    starter: `const team = ["Ghost", "Shadow"];\n// Kodingni shu yerga yoz\n`,
    keyWord: "PUSH",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && s.includes("Shadow") && s.includes("Viper"); }',
  },
  {
    id: 17,
    title: "Agentni chiqarib yuborish",
    brief:
      "Salom, xaker! Missiya muvaffaqiyatsiz tugadi, oxirgi agent jamoadan chetlatildi. Bizda team = [\"Ghost\", \"Shadow\", \"Viper\"] bor. Sening vazifang — massivdan oxirgi elementni o'chirib, yangilangan ro'yxatni konsolga chiqarish.\n\nMaslahat: Massiv oxiridan element o'chirish uchun .pop() metodidan foydalaniladi.",
    hints: ["team.pop()", "console.log(team)"],
    starter: `const team = ["Ghost", "Shadow", "Viper"];\n// Kodingni shu yerga yoz\n`,
    keyWord: "POP",
    testFn: 'out => out.some(l => l.includes("Ghost") && l.includes("Shadow") && !l.includes("Viper"))',
  },
  {
    id: 18,
    title: "Shifrlash qurilmasi",
    brief:
      "Salom, xaker! Har safar ma'lumot yuborishdan oldin uni shifrlash kerak. Sening vazifang — encrypt nomli funksiya yaratish. U chaqirilganda konsolga \"Ma'lumotlar shifrlandi!\" deb chiqarsin. Funksiyani yaratgach, uni chaqirishni unutma!\n\nMaslahat: Funksiya yaratish uchun function nomi() { } ko'rinishidan foydalaniladi.",
    hints: ["function encrypt() { console.log(\"Ma'lumotlar shifrlandi!\"); }", "encrypt() — chaqirishni unutma"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "KRIPTO",
    testFn: 'out => out.some(l => l.includes("shifrlandi"))',
  },
  {
    id: 19,
    title: "Shaxsiy xush kelibsiz",
    brief:
      "Salom, xaker! Tizim har bir agentni ismi bilan kutib oladi. Sening vazifang — greetAgent(name) funksiyasini yozish. U \"Xush kelibsiz, [ism]!\" ko'rinishida konsolga chiqarsin. Funksiyani \"Ghost\" nomi bilan chaqir.\n\nMaslahat: Funksiyaga ma'lumot uzatish uchun parametrlardan foydalaniladi.",
    hints: ["function greetAgent(name) { ... }", "greetAgent(\"Ghost\")"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "SALOM",
    testFn: 'out => out.some(l => l.includes("Xush kelibsiz") && l.includes("Ghost"))',
  },
  {
    id: 20,
    title: "Dekodlash tizimi",
    brief:
      "Salom, xaker! Dushman kodlari ikki barobar kuchaytirilgan holda uzatiladi. Sening vazifang — decode(code) funksiyasini yozish: u kiritilgan sonni 2 ga ko'paytirib, natijani qaytarsin (return). Natijani o'zgaruvchiga saqlab, konsolga chiqar. Funksiyani 21 soni bilan chaqir.\n\nMaslahat: Funksiyadan natija qaytarish uchun return kalit so'zi ishlatiladi.",
    hints: ["function decode(code) { return code * 2; }", "console.log(decode(21))"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "DEKOD",
    testFn: 'out => out.some(l => l.trim() === "42")',
  },
  {
    id: 21,
    title: "Hisobot yaratish",
    brief:
      "Salom, xaker! Tizim avtomatik ravishda agent haqida hisobot tayyorlaydi. Bizda name = \"Ghost\", level = 7, status = \"faol\" bor. Sening vazifang — template literal yordamida quyidagi ko'rinishda matn yaratib konsolga chiqarish:\n\"Agent Ghost. Daraja: 7. Holat: faol\"\n\nMaslahat: Template literal uchun ` belgilari va ${o'zgaruvchi} ishlatiladi.",
    hints: ["`Agent ${name}. Daraja: ${level}. Holat: ${status}`", "console.log(...)"],
    starter: `const name = "Ghost";\nconst level = 7;\nconst status = "faol";\n// Kodingni shu yerga yoz\n`,
    keyWord: "HISOBOT",
    testFn: 'out => out.some(l => l.includes("Agent Ghost") && l.includes("Daraja: 7") && l.includes("Holat: faol"))',
  },
  {
    id: 22,
    title: "Tizimni yangilash",
    brief:
      "Salom, xaker! Kod eski uslubda yozilgan, uni zamonaviy ko'rinishga o'tkazish kerak. Quyidagi funksiyani strelkali funksiya (arrow function) ko'rinishida qayta yoz, so'ng uni 15 soni bilan chaqirib natijani konsolga chiqar.\n\nMaslahat: const nomi = (parametr) => ifoda ko'rinishida yoziladi.",
    hints: ["const double = (n) => n * 2;", "console.log(double(15))"],
    starter: `// function double(n) {\n//   return n * 2;\n// }\n// Strelkali funksiyani shu yerga yoz\n`,
    keyWord: "STRELKA",
    testFn: 'out => out.some(l => l.trim() === "30")',
  },
  {
    id: 23,
    title: "Agent profili",
    brief:
      "Salom, xaker! Tizimda har bir agent ob'ekt sifatida saqlanadi. Sening vazifang — agent nomli ob'ekt yaratish va unga quyidagi ma'lumotlarni kiritish: name: \"Ghost\", level: 7, isActive: true. So'ng uni konsolga chiqarish.\n\nMaslahat: Ob'ekt yaratish uchun { kalit: qiymat } ko'rinishidan foydalaniladi.",
    hints: ["const agent = { name: \"Ghost\", level: 7, isActive: true };", "console.log(agent)"],
    starter: `// Kodingni shu yerga yoz\n`,
    keyWord: "PROFIL",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && /\\b7\\b/.test(s) && s.includes("true"); }',
  },
  {
    id: 24,
    title: "Ma'lumotni o'qish",
    brief:
      "Salom, xaker! Agent profili tizimda mavjud, lekin bizga faqat uning ismi va darajasi kerak. Sening vazifang — quyidagi ob'ektdan faqat name va level ni konsolga chiqarish.\n\nMaslahat: Ob'ekt xususiyatiga kirish uchun ob'ekt.xususiyat ko'rinishi ishlatiladi.",
    hints: ["agent.name, agent.level", "console.log(agent.name, agent.level)"],
    starter: `const agent = { name: "Ghost", level: 7, isActive: true };\n// Kodingni shu yerga yoz\n`,
    keyWord: "OQISH",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && /\\b7\\b/.test(s); }',
  },
  {
    id: 25,
    title: "Jihozlarni tekshirish",
    brief:
      "Salom, xaker! Agent qurollangan va yo'lga chiqishga tayyor. Quyidagi ob'ektdan agentning qurol nomini topib, konsolga chiqar.\n\nMaslahat: Ichki ob'ektga kirish uchun agent.gear.weapon ko'rinishidan foydalaniladi.",
    hints: ["agent.gear.weapon", "console.log(agent.gear.weapon)"],
    starter: `const agent = {\n  name: "Ghost",\n  gear: {\n    weapon: "Snayper miltiq",\n    gadget: "Dron"\n  }\n};\n// Kodingni shu yerga yoz\n`,
    keyWord: "QUROL",
    testFn: 'out => out.some(l => l.includes("Snayper miltiq"))',
  },
  {
    id: 26,
    title: "Jamoani briefing qilish",
    brief:
      "Salom, xaker! Har bir agentga missiya topshirig'i berilishi kerak. Bizda agents = [\"Ghost\", \"Shadow\", \"Phantom\"] bor. Sening vazifang — forEach yordamida har bir agent uchun konsolga \"Topshiriq: Ghost\" ko'rinishida chiqarish.\n\nMaslahat: .forEach() massivning har bir elementini aylanib o'tadi.",
    hints: ["agents.forEach(a => console.log(\"Topshiriq: \" + a))", "har bir agent uchun bitta qator"],
    starter: `const agents = ["Ghost", "Shadow", "Phantom"];\n// Kodingni shu yerga yoz\n`,
    keyWord: "BRIFING",
    testFn: 'out => ["Ghost","Shadow","Phantom"].every(n => out.some(l => l.includes("Topshiriq: " + n)))',
  },
  {
    id: 27,
    title: "Elita tanlash",
    brief:
      "Salom, xaker! Maxsus operatsiyaga faqat darajasi 5 dan yuqori agentlar qabul qilinadi. Sening vazifang — quyidagi massivdan faqat shunday agentlarni ajratib olish va yangi massivni konsolga chiqarish.\n\nMaslahat: .filter() metodi shartga mos elementlarni qaytaradi.",
    hints: ["agents.filter(a => a.level > 5)", "console.log(...)"],
    starter: `const agents = [\n  { name: "Ghost", level: 8 },\n  { name: "Rookie", level: 2 },\n  { name: "Shadow", level: 6 }\n];\n// Kodingni shu yerga yoz\n`,
    keyWord: "ELITA",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && s.includes("Shadow") && !s.includes("Rookie"); }',
  },
  {
    id: 28,
    title: "Agentlarni kodlash",
    brief:
      "Salom, xaker! Xavfsizlik tizimi barcha agentlarning ismlariga \"Agent_\" prefiksini qo'shishni talab qiladi. Bizda names = [\"Ghost\", \"Shadow\", \"Viper\"] bor. Sening vazifang — har bir ismga \"Agent_\" qo'shib, yangi massiv yaratib konsolga chiqarish.\n\nMaslahat: .map() metodi massivning har bir elementini o'zgartiradi.",
    hints: ["names.map(n => \"Agent_\" + n)", "console.log(...)"],
    starter: `const names = ["Ghost", "Shadow", "Viper"];\n// Kodingni shu yerga yoz\n`,
    keyWord: "PREFIKS",
    testFn: 'out => { const s = out.join(" "); return s.includes("Agent_Ghost") && s.includes("Agent_Shadow") && s.includes("Agent_Viper"); }',
  },
  {
    id: 29,
    title: "Agentni izlash",
    brief:
      "Salom, xaker! \"Shadow\" agenti bilan zudlik bilan bog'lanish kerak. Quyidagi massivdan uni topib, ob'ektini konsolga chiqar.\n\nMaslahat: .find() metodi shartga mos birinchi elementni qaytaradi.",
    hints: ["agents.find(a => a.name === \"Shadow\")", "console.log(...)"],
    starter: `const agents = [\n  { name: "Ghost", level: 8 },\n  { name: "Shadow", level: 6 },\n  { name: "Viper", level: 9 }\n];\n// Kodingni shu yerga yoz\n`,
    keyWord: "IZLASH",
    testFn: 'out => out.some(l => l.includes("Shadow") && /\\b6\\b/.test(l))',
  },
  {
    id: 30,
    title: "YAKUNIY OPERATSIYA",
    brief:
      "Salom, xaker! Bu oxirgi va eng muhim sinov. Barcha bilimingni ishga sol! Quyidagi agentlar ro'yxatidan faqat faol bo'lgan (isActive: true) agentlarni topib, har birini quyidagi ko'rinishda konsolga chiqar:\n\"✅ Agent Ghost — daraja 8\"\n\nMaslahat: .filter() va .forEach() metodlarini birga ishlatib ko'r.",
    hints: ["agents.filter(a => a.isActive)", "filter(...).forEach(a => console.log(`✅ Agent ${a.name} — daraja ${a.level}`))"],
    starter: `const agents = [\n  { name: "Ghost", level: 8, isActive: true },\n  { name: "Rookie", level: 2, isActive: false },\n  { name: "Shadow", level: 6, isActive: true },\n  { name: "Phantom", level: 9, isActive: false },\n  { name: "Viper", level: 7, isActive: true }\n];\n// Kodingni shu yerga yoz\n`,
    keyWord: "OPERATSIYA",
    testFn: 'out => { const s = out.join(" "); return s.includes("Ghost") && s.includes("Shadow") && s.includes("Viper") && !s.includes("Rookie") && !s.includes("Phantom"); }',
  },
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
