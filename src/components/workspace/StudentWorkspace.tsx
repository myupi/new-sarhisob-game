"use client";

import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CodeEditor,
  HackerSilhouette,
  KeyDisplay,
  LevelGrid,
  MatrixRain,
  TerminalBlock,
} from "@/components/cyber";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getFirebaseDb } from "@/lib/firebase";
import { getMission, MISSIONS, runTest } from "@/lib/missions";
import { runCode } from "@/lib/runCode";
import { clearRoleCookie } from "@/lib/session";
import { signOut } from "@/lib/auth";
import { createSubmission } from "@/lib/submissions";

type RunStatus = "idle" | "running" | "passed" | "failed" | "pending";

export function StudentWorkspace() {
  const router = useRouter();
  const { profile } = useUserProfile();

  const unlocked = profile?.unlockedUpTo ?? 1;
  const completed = useMemo(
    () => profile?.completedTasks ?? [],
    [profile?.completedTasks],
  );
  const [missionId, setMissionId] = useState(profile?.currentTask ?? 1);
  const mission = useMemo(() => getMission(missionId) ?? MISSIONS[0]!, [missionId]);

  const [code, setCode] = useState(mission.starter);
  const [logs, setLogs] = useState<string[]>([]);
  const [reveal, setReveal] = useState(0);
  const [status, setStatus] = useState<RunStatus>("idle");
  const [showHints, setShowHints] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [prevUnlocked, setPrevUnlocked] = useState(unlocked);

  useEffect(() => {
    if (profile?.currentTask) setMissionId(profile.currentTask);
  }, [profile?.currentTask]);

  useEffect(() => {
    if (unlocked > prevUnlocked) {
      setToast("Yangi bosqich ochildi!");
      setTimeout(() => setToast(null), 3000);
    }
    setPrevUnlocked(unlocked);
  }, [unlocked, prevUnlocked]);

  // Faqat bosqich almashganda — kodni qayta yozmaslik (Firestore listener har safar completed ni yangilaydi)
  useEffect(() => {
    const m = getMission(missionId) ?? MISSIONS[0]!;
    setCode(m.starter);
    setLogs([
      `> Bosqich ${String(m.id).padStart(2, "0")} · ${m.title}`,
      `> Kodni yozing · «Kodni ishga tushirish», so‘ng «Tekshirish».`,
    ]);
    setShowHints(false);
    setStatus("idle");
    setReveal(0);
  }, [missionId]);

  useEffect(() => {
    if (completed.includes(mission.id)) {
      setReveal(mission.keyWord.length);
      setStatus("passed");
    }
  }, [mission.id, mission.keyWord.length, completed]);

  const saveCurrentTask = useCallback(
    async (id: number) => {
      if (!profile?.uid) return;
      await updateDoc(doc(getFirebaseDb(), "users", profile.uid), { currentTask: id });
    },
    [profile?.uid],
  );

  const handlePick = (id: number) => {
    setMissionId(id);
    saveCurrentTask(id);
  };

  const handleRun = async () => {
    setStatus("running");
    const res = await runCode(code);
    const stamp = new Date().toTimeString().slice(0, 8);
    setLogs((l) => [
      ...l,
      `> [${stamp}] runtime.exec(mission-${String(mission.id).padStart(2, "0")})`,
      ...res.out.map((line) => `· ${line}`),
      res.ok ? "> Bajaruv: muvaffaqiyatli." : "> Bajaruv: xato.",
    ]);
    setStatus(res.ok ? "idle" : "failed");
  };

  const animateReveal = (word: string) => {
    let i = 0;
    const tick = () => {
      i++;
      setReveal(i);
      if (i < word.length) setTimeout(tick, 140);
    };
    tick();
  };

  const handleSubmit = async () => {
    if (!profile) return;
    setStatus("running");
    const res = await runCode(code);
    const pass = res.ok && runTest(mission.testFn, res.out);
    const stamp = new Date().toTimeString().slice(0, 8);

    setLogs((l) => [
      ...l,
      `> [${stamp}] tekshiruv.submit()`,
      ...res.out.map((l2) => `· ${l2}`),
      pass
        ? "✓ Test o‘tdi. O‘qituvchiga yuborildi — kuting…"
        : "✗ Test muvaffaqiyatsiz. Yana urinib ko‘ring.",
    ]);

    if (pass) {
      setStatus("pending");
      animateReveal(mission.keyWord);
      try {
        await createSubmission({
          studentUid: profile.uid,
          studentName: `${profile.firstName} ${profile.lastName}`,
          taskId: mission.id,
          code,
          consoleOutput: res.out,
          testPassed: true,
        });
        setLogs((l) => [...l, "> Navbat: o‘qituvchi tasdiqlashini kuting."]);
      } catch {
        setLogs((l) => [...l, "× Yuborish xatosi — qayta urinib ko‘ring."]);
      }
    } else {
      setStatus("failed");
      setReveal(0);
    }
  };

  const handleLogout = async () => {
    await signOut();
    clearRoleCookie();
    router.push("/login");
  };

  const handlePrev = () => missionId > 1 && handlePick(missionId - 1);
  const handleNext = () => missionId < unlocked && handlePick(missionId + 1);

  const statusPill =
    status === "passed" ? (
      <span className="cb-pill ok">o‘tildi</span>
    ) : status === "failed" ? (
      <span className="cb-pill err">xato</span>
    ) : status === "pending" ? (
      <span className="cb-pill warn">kutilmoqda</span>
    ) : status === "running" ? (
      <span className="cb-pill warn">ishlamoqda</span>
    ) : (
      <span className="cb-pill idle">tayyor</span>
    );

  return (
    <div className="cb-root" data-screen-label="01 Student Workspace">
      <div className="cb-grid" />
      <div className="cb-scanlines" />
      <div className="cb-vignette" />

      <div className="cb-page cb-page-workspace">
        <section className="ws-top-hud cb-panel cb-corners">
          <span className="cb-c1" />
          <span className="cb-c2" />

          <header className="ws-hud-header">
            <div className="ws-hud-user">
              <div className="ws-hud-logo" aria-hidden>
                ◆
              </div>
              <div className="ws-hud-user-text">
                <span className="ws-hud-name cb-grn-glow">{profile?.firstName}</span>
                <span className="ws-hud-group cb-dim">{profile?.group}</span>
              </div>
              <span className="cb-pill ok cb-flicker ws-hud-pill">uplink</span>
            </div>

            <div className="ws-hud-brand cb-upper">
              <span className="ws-hud-title cb-grn-glow">SARHISOB</span>
              <span className="ws-hud-subtitle cb-dim">30 bosqichli JS o‘yini</span>
            </div>

            <div className="ws-hud-progress">
              <div className="ws-hud-progress-meta">
                <span className="cb-dim">Holat</span>
                <span className="cb-grn">
                  {completed.length}/{MISSIONS.length} bosqich · {Math.round((completed.length / MISSIONS.length) * 100)}%
                </span>
              </div>
              <div className="cb-bar ws-hud-bar">
                <div
                  className="cb-bar-fill"
                  style={{ width: `${(completed.length / MISSIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <button type="button" className="cb-ibtn ws-hud-logout" onClick={handleLogout} title="Chiqish">
              ×
            </button>
          </header>

          <div className="ws-hud-levels">
            <div className="ws-level-badge" aria-label={`Bosqich ${missionId} dan ${MISSIONS.length}`}>
              <span className="ws-level-badge-num">{String(missionId).padStart(2, "0")}</span>
              <span className="ws-level-badge-total">/ {MISSIONS.length}</span>
            </div>
            <div className="cb-level-scroll ws-level-scroll">
              <LevelGrid
                current={missionId}
                unlocked={unlocked}
                completed={completed}
                onPick={handlePick}
              />
            </div>
            <div className="ws-level-nav-btns">
              <button type="button" className="cb-ibtn" onClick={handlePrev} disabled={missionId === 1} aria-label="Oldingi bosqich">
                ◀
              </button>
              <button
                type="button"
                className="cb-ibtn"
                onClick={handleNext}
                disabled={missionId >= unlocked}
                aria-label="Keyingi bosqich"
              >
                ▶
              </button>
            </div>
          </div>
        </section>

        <div className="ws-main">
          <div className="ws-left-col">
            <TerminalBlock
              title={`Bosqich ${String(mission.id).padStart(2, "0")} · ${mission.title}`}
              right={`MISSION ID · M-${String(mission.id).padStart(3, "0")}`}
            >
              <div className="ws-brief-scroll cb-scroll ws-brief-body">
                {mission.brief}
                {mission.hints.length > 0 && (
                  <div style={{ marginTop: 14, border: "1px solid var(--grn-5)" }}>
                    <button
                      type="button"
                      onClick={() => setShowHints((s) => !s)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: 0,
                        color: "var(--grn-2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      ◷ MASLAHATLAR ({mission.hints.length}) {showHints ? "▴" : "▾"}
                    </button>
                    {showHints && (
                      <ol style={{ margin: 0, padding: "8px 12px 8px 28px", fontSize: 12.5 }}>
                        {mission.hints.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            </TerminalBlock>

            <TerminalBlock
              title={`MISSION-${String(mission.id).padStart(2, "0")}.JS`}
              right="KODLASH: UTF-8 · ECMA-2022"
              style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
              className="ws-editor-panel"
            >
              <div className="ws-editor-body">
                <CodeEditor value={code} onChange={setCode} minHeight={280} />
              </div>
            </TerminalBlock>

            <TerminalBlock title="› KONSOL" right={statusPill} className="ws-console-panel">
              <div className="cb-scroll cb-code ws-console-log">
                {logs.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      color: l.startsWith("✓")
                        ? "var(--grn-0)"
                        : l.startsWith("✗") || l.startsWith("×")
                          ? "var(--err)"
                          : l.startsWith(">")
                            ? "var(--grn-2)"
                            : "var(--txt-dim)",
                    }}
                  >
                    {l}
                  </div>
                ))}
                <div className="cb-grn">
                  ›<span className="cb-caret" />
                </div>
              </div>
              <div className="ws-console-actions">
                <div className="ws-console-hint cb-low">↵ Enter · Tab — chekinish</div>
                <div className="ws-console-btns">
                  <button type="button" className="cb-btn cb-btn-ghost" onClick={() => setCode(mission.starter)}>
                    ↺ Tiklash
                  </button>
                  <button type="button" className="cb-btn" onClick={handleRun}>
                    <span className="ws-btn-full">▶ Kodni ishga tushirish</span>
                    <span className="ws-btn-short">▶ Ishga tushirish</span>
                  </button>
                  <button type="button" className="cb-btn cb-btn-primary" onClick={handleSubmit}>
                    ⏎ Tekshirish
                  </button>
                </div>
              </div>
            </TerminalBlock>
          </div>

          <div className="cb-panel cb-panel-glow cb-corners ws-side-panel">
            <span className="cb-c1" />
            <span className="cb-c2" />
            <div className="ws-side-inner">
              <MatrixRain density={0.92} speed={1} fontSize={16} />
            </div>
            <div className="ws-hacker-wrap">
              <HackerSilhouette width={360} />
            </div>
            <div className="ws-key-wrap">
              <div className="cb-upper" style={{ fontSize: 11, color: "var(--grn-2)", marginBottom: 14 }}>
                KALIT_SATR_DISPLEY
              </div>
              <KeyDisplay word={mission.keyWord} revealCount={reveal} />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="cb-toast"
          style={{
            border: "1px solid var(--grn-0)",
            color: "var(--grn-0)",
            boxShadow: "0 0 24px rgba(0,255,65,0.4)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
