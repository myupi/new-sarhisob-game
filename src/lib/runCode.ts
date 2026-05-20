export interface RunResult {
  ok: boolean;
  out: string[];
}

let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL("./runCode.worker.ts", import.meta.url));
  }
  return worker;
}

export function runCode(code: string, timeoutMs = 500): Promise<RunResult> {
  return new Promise((resolve) => {
    const w = getWorker();
    let settled = false;

    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      w.removeEventListener("message", onMessage);
      w.removeEventListener("error", onError);
      clearTimeout(timer);
      resolve(result);
    };

    const onMessage = (e: MessageEvent<RunResult>) => finish(e.data);
    const onError = () =>
      finish({ ok: false, out: ["× Worker xatosi — kodni qayta ishga tushiring."] });

    const timer = setTimeout(() => {
      w.terminate();
      worker = null;
      finish({ ok: false, out: ["× Vaqt tugadi (500ms). Kod juda uzoq ishlayapti."] });
    }, timeoutMs);

    w.addEventListener("message", onMessage);
    w.addEventListener("error", onError);
    w.postMessage({ code });
  });
}
