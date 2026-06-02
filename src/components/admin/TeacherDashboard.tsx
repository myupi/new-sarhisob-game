"use client";

import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  GroupSelect,
  HighlightedCode,
  InlineEdit,
  MatrixRain,
  ProgressMini,
  StatCard,
} from "@/components/cyber";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MISSIONS } from "@/lib/missions";
import { signOut } from "@/lib/auth";
import { getFirebaseDb } from "@/lib/firebase";
import { clearRoleCookie } from "@/lib/session";
import { approveSubmission, rejectSubmission } from "@/lib/submissions";
import type { AppUser, Submission, SubmissionStatus } from "@/lib/types";

const GROUPS = ["ALL", "JS-101-A", "JS-101-B", "JS-202-A", "NIGHT-OPS"];

const STATUS_LABEL: Record<
  SubmissionStatus | "idle",
  { txt: string; cls: string }
> = {
  pending: { txt: "Tekshiruvda", cls: "warn" },
  approved: { txt: "Tasdiqlandi", cls: "ok" },
  rejected: { txt: "Rad etildi", cls: "err" },
  idle: { txt: "Boshlamagan", cls: "idle" },
};

export function TeacherDashboard() {
  const router = useRouter();
  const { profile } = useUserProfile();
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [groupOpen, setGroupOpen] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [unlockAnim, setUnlockAnim] = useState(false);
  const [unlockTargetName, setUnlockTargetName] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [grade, setGrade] = useState(85);
  const [busy, setBusy] = useState(false);

  const [studentsSnap] = useCollection(
    query(collection(getFirebaseDb(), "users"), where("role", "==", "student")),
  );

  const [pendingSnap] = useCollection(
    query(collection(getFirebaseDb(), "submissions"), where("status", "==", "pending")),
  );

  const students = useMemo(() => {
    if (!studentsSnap) return [];
    return studentsSnap.docs.map(
      (d) => ({ ...(d.data() as Omit<AppUser, "uid">), uid: d.id }) as AppUser,
    );
  }, [studentsSnap]);

  const pendingByStudent = useMemo(() => {
    const map = new Map<string, Submission>();
    pendingSnap?.docs.forEach((d) => {
      const sub = { ...(d.data() as Omit<Submission, "id">), id: d.id } as Submission;
      const existing = map.get(sub.studentUid);
      if (!existing || sub.taskId > existing.taskId) map.set(sub.studentUid, sub);
    });
    return map;
  }, [pendingSnap]);

  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return students
      .filter((s) => groupFilter === "ALL" || s.group === groupFilter)
      .filter(
        (s) =>
          !q ||
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          s.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")),
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [students, groupFilter, queryText]);

  const selected =
    filtered.find((s) => s.uid === selectedUid) ?? filtered[0] ?? students[0];

  const selectedSubmission = selected ? pendingByStudent.get(selected.uid) : undefined;

  const stats = useMemo(() => {
    const total = students.length;
    const pending = pendingSnap?.size ?? 0;
    const approved = students.reduce((a, s) => a + (s.completedTasks?.length ?? 0), 0);
    const avg =
      total > 0
        ? Math.round(students.reduce((a, s) => a + (s.currentTask ?? 1), 0) / total)
        : 0;
    return { total, pending, approved, avg };
  }, [students, pendingSnap]);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  };

  const updateStudent = async (uid: string, patch: Partial<AppUser>) => {
    await updateDoc(doc(getFirebaseDb(), "users", uid), patch);
  };

  const handleApprove = async () => {
    if (!selectedSubmission || !profile) return;
    setBusy(true);
    setUnlockTargetName(`${selected.firstName} ${selected.lastName}`);
    setUnlockAnim(true);
    try {
      await approveSubmission(selectedSubmission.id, grade, profile.uid);
      setTimeout(() => {
        showToast(
          `✓ Bosqich ${String(selectedSubmission.taskId).padStart(2, "0")} tasdiqlandi · keyingi level ochildi`,
        );
      }, 1100);
    } catch {
      showToast("× Tasdiqlash xatosi", "err");
    } finally {
      setTimeout(() => setUnlockAnim(false), 2200);
      setBusy(false);
    }
  };

  const handleReject = async () => {
    if (!selectedSubmission || !profile) return;
    setBusy(true);
    try {
      await rejectSubmission(selectedSubmission.id, grade, profile.uid);
      showToast(`✗ ${selected.firstName}ga qayta urinish so‘rovi`, "err");
    } catch {
      showToast("× Rad etish xatosi", "err");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    clearRoleCookie();
    router.push("/login");
  };

  const subStatus: SubmissionStatus | "idle" = selectedSubmission
    ? selectedSubmission.status
    : "idle";

  return (
    <div className="cb-root" data-screen-label="02 Teacher Dashboard">
      <div className="cb-grid" />
      <div className="cb-scanlines" />
      <div className="cb-vignette" />

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 320,
          height: 220,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      >
        <MatrixRain density={0.4} speed={0.8} fontSize={13} />
      </div>

      <div className="cb-page">
        <header className="cb-header">
          <div className="cb-header-left">
            <span className="cb-pill ok cb-flicker">grading rights</span>
          </div>
          <div className="cb-header-center cb-upper cb-brand">
            <span className="cb-grn-glow">SARHISOB</span>
            <span className="cb-low cb-brand-sep" style={{ margin: "0 14px" }}>
              /
            </span>
            <span className="cb-dim cb-brand-sub">control · operator dashboard</span>
          </div>
          <div className="cb-header-right">
            <span className="cb-grn">
              {profile?.firstName} {profile?.lastName}
            </span>
            <button type="button" className="cb-ibtn" onClick={handleLogout}>
              ×
            </button>
          </div>
        </header>

        <div className="admin-stats">
          <StatCard label="Jami talabalar" value={String(stats.total).padStart(2, "0")} accent />
          <StatCard label="Tekshirilmoqda" value={String(stats.pending).padStart(2, "0")} />
          <StatCard label="Tugallangan" value={String(stats.approved)} />
          <StatCard label="O‘rtacha bosqich" value={`${stats.avg}/${MISSIONS.length}`} />
          <div className="cb-panel cb-corners admin-stats-filter" style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  className="cb-btn"
                  style={{ width: "100%", justifyContent: "space-between" }}
                  onClick={() => setGroupOpen((o) => !o)}
                >
                  {groupFilter === "ALL" ? "Barcha guruhlar" : groupFilter}
                  <span>▾</span>
                </button>
                {groupOpen && (
                  <div className="cb-dropdown" style={{ top: "100%", left: 0, right: 0, marginTop: 4 }}>
                    {GROUPS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={g === groupFilter ? "active" : ""}
                        onClick={() => {
                          setGroupFilter(g);
                          setGroupOpen(false);
                        }}
                      >
                        {g === "ALL" ? "Barcha guruhlar" : g}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                className="cb-input"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="ism / telefon..."
                style={{ fontSize: 12 }}
              />
            </div>
          </div>
        </div>

        <div className="admin-main">
          <div className="cb-panel cb-corners admin-table-panel">
            <div className="admin-table-wrap cb-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Ism</th>
                    <th>Familiya</th>
                    <th>Telefon</th>
                    <th>Guruh</th>
                    <th>Joriy</th>
                    <th>Topshirilgan</th>
                    <th>Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const sub = pendingByStudent.get(s.uid);
                    const st = sub ? STATUS_LABEL.pending : STATUS_LABEL.idle;
                    return (
                      <tr
                        key={s.uid}
                        className={s.uid === selected?.uid ? "selected" : ""}
                        onClick={() => setSelectedUid(s.uid)}
                        style={{ cursor: "pointer" }}
                      >
                        <td data-label="Ism">
                          <InlineEdit
                            value={s.firstName}
                            onSave={(v) => updateStudent(s.uid, { firstName: v })}
                          />
                        </td>
                        <td data-label="Familiya">
                          <InlineEdit
                            value={s.lastName}
                            onSave={(v) => updateStudent(s.uid, { lastName: v })}
                          />
                        </td>
                        <td data-label="Telefon" className="cb-code cb-dim">
                          {s.phone}
                        </td>
                        <td data-label="Guruh">
                          <GroupSelect
                            value={s.group ?? "—"}
                            options={GROUPS}
                            onChange={(v) => updateStudent(s.uid, { group: v })}
                          />
                        </td>
                        <td data-label="Joriy">
                          <ProgressMini value={s.currentTask ?? 1} total={20} />
                        </td>
                        <td data-label="Topshirilgan">
                          {sub ? (
                            <span className="cb-grn">M-{String(sub.taskId).padStart(3, "0")}</span>
                          ) : (
                            <span className="cb-low">—</span>
                          )}
                        </td>
                        <td data-label="Holat">
                          <span className={`cb-pill ${st.cls}`}>{st.txt}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cb-panel cb-panel-glow cb-corners admin-detail-panel">
            {selected ? (
              <>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--grn-5)" }}>
                  <div className="cb-grn-glow">
                    {selected.firstName} {selected.lastName}
                  </div>
                  <div className="cb-dim" style={{ fontSize: 12 }}>
                    {selected.group} · bosqich {selected.currentTask}
                  </div>
                </div>

                <div
                  className="cb-scroll cb-code"
                  style={{ padding: 14, fontSize: 13, whiteSpace: "pre", overflow: "auto" }}
                >
                  {selectedSubmission?.code ? (
                    <HighlightedCode src={selectedSubmission.code} />
                  ) : (
                    <span className="cb-low">{"// hozircha pending kod yo'q"}</span>
                  )}
                </div>

                <div style={{ padding: "14px 16px", borderTop: "1px solid var(--grn-5)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={grade}
                      onChange={(e) => setGrade(+e.target.value)}
                      style={{ accentColor: "var(--grn-0)", flex: 1 }}
                    />
                    <span className="cb-grn-glow" style={{ fontSize: 22, fontFamily: "var(--font-code)" }}>
                      {grade}
                    </span>
                  </div>
                  <div className="admin-grade-actions" style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="cb-btn"
                      disabled={!selectedSubmission || busy}
                      onClick={handleReject}
                    >
                      ⟲ Qaytarish
                    </button>
                    <button
                      type="button"
                      className="cb-btn cb-btn-primary"
                      disabled={!selectedSubmission || busy}
                      onClick={handleApprove}
                    >
                      ⟶ Tasdiqlash &amp; Keyingi level ochish
                    </button>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11 }} className="cb-dim">
                    <span className={`cb-pill ${STATUS_LABEL[subStatus].cls}`}>
                      {STATUS_LABEL[subStatus].txt}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="cb-dim" style={{ padding: 24 }}>
                Talaba tanlang
              </div>
            )}
          </div>
        </div>
      </div>

      {unlockAnim && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            background: "radial-gradient(ellipse at center, rgba(0,255,65,0.18), rgba(0,0,0,0.92))",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
            <MatrixRain density={1} speed={2.4} fontSize={18} />
          </div>
          <div
            className="cb-grn-glow admin-unlock-overlay"
            style={{
              position: "relative",
              border: "2px solid var(--grn-0)",
              padding: "36px 56px",
              fontSize: 38,
              fontFamily: "var(--font-code)",
              textAlign: "center",
            }}
          >
            LEVEL_UNLOCKED
            <div className="cb-dim" style={{ fontSize: 12, marginTop: 14 }}>
              › {unlockTargetName}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="cb-toast"
          style={{
            border: `1px solid ${toast.type === "err" ? "var(--err)" : "var(--grn-0)"}`,
            color: toast.type === "err" ? "var(--err)" : "var(--grn-0)",
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
