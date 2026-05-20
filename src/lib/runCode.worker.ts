/// <reference lib="webworker" />

function formatVal(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null) {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

self.onmessage = (e: MessageEvent<{ code: string }>) => {
  const out: string[] = [];
  const cons = {
    log: (...args: unknown[]) => out.push(args.map(formatVal).join(" ")),
    error: (...args: unknown[]) => out.push("ERR: " + args.map(formatVal).join(" ")),
    warn: (...args: unknown[]) => out.push("WRN: " + args.map(formatVal).join(" ")),
  };

  try {
    const fn = new Function("console", `"use strict";\n${e.data.code}`);
    fn(cons);
    self.postMessage({ ok: true, out });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    self.postMessage({ ok: false, out: [...out, `× ${msg}`] });
  }
};
