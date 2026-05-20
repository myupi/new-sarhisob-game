export type TokenType = "kw" | "str" | "num" | "com" | "fn" | "punct" | "id" | "ws";

export interface Token {
  t: TokenType;
  v: string;
}

const JS_KW = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "break",
  "continue",
  "switch",
  "case",
  "default",
  "new",
  "this",
  "class",
  "extends",
  "super",
  "import",
  "from",
  "export",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "throw",
  "true",
  "false",
  "null",
  "undefined",
  "typeof",
  "instanceof",
  "in",
  "of",
  "void",
]);

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;

  while (i < src.length) {
    const ch = src[i]!;

    if (ch === "/" && src[i + 1] === "/") {
      const j = src.indexOf("\n", i);
      const end = j < 0 ? src.length : j;
      out.push({ t: "com", v: src.slice(i, end) });
      i = end;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < src.length && src[j] !== ch) {
        if (src[j] === "\\") j++;
        j++;
      }
      out.push({ t: "str", v: src.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < src.length && /[0-9.]/.test(src[j]!)) j++;
      out.push({ t: "num", v: src.slice(i, j) });
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      let j = i + 1;
      while (j < src.length && /[A-Za-z0-9_$]/.test(src[j]!)) j++;
      const word = src.slice(i, j);
      let t: TokenType = "id";
      if (JS_KW.has(word)) t = "kw";
      else if (src[j] === "(") t = "fn";
      out.push({ t, v: word });
      i = j;
      continue;
    }

    if (/\s/.test(ch)) {
      let j = i + 1;
      while (j < src.length && /\s/.test(src[j]!)) j++;
      out.push({ t: "ws", v: src.slice(i, j) });
      i = j;
      continue;
    }

    out.push({ t: "punct", v: ch });
    i++;
  }

  return out;
}
