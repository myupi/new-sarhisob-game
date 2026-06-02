"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthField, AuthShell, PasswordField } from "@/components/cyber";
import { signIn } from "@/lib/auth";
import { getUser } from "@/lib/db";
import { isFirebaseConfigured } from "@/lib/firebase";
import { setRoleCookie } from "@/lib/session";
import type { UserRole } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("+998 ");
  const [pw, setPw] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!isFirebaseConfigured()) {
      setError("Firebase sozlanmagan. .env.local ni to‘ldiring.");
      return;
    }

    if (phone.replace(/\D/g, "").length < 9) {
      setError("Telefon raqami noto‘g‘ri formatda.");
      return;
    }
    if (pw.length < 4) {
      setError("Parol kamida 4 belgi bo‘lishi kerak.");
      return;
    }

    setBusy(true);
    try {
      const user = await signIn(phone, pw);
      const profile = await getUser(user.uid);
      if (!profile) {
        setError("Profil topilmadi.");
        return;
      }
      if (profile.role !== role) {
        setError(
          role === "student"
            ? "Bu hisob o‘qituvchi sifatida ro‘yxatdan o‘tgan."
            : "Bu hisob talaba sifatida ro‘yxatdan o‘tgan.",
        );
        return;
      }
      setRoleCookie(profile.role);
      if (remember) {
        localStorage.setItem("sarhisob_remember", "1");
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(profile.role === "teacher" ? "/admin" : "/workspace");
      }, 600);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Kirish muvaffaqiyatsiz. Qayta urinib ko‘ring.";
      setError(msg.includes("invalid-credential") ? "Telefon yoki parol noto‘g‘ri." : msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      screenLabel="03 Login"
      hudLeft="auth.sign-in"
      hudRight="LATENCY 14ms"
      footerText="© SARHISOB.LAB · barcha urinishlar log/02 ga yoziladi"
    >
      <div
        className="cb-panel cb-panel-glow cb-corners auth-panel"
        style={{
          position: "relative",
          padding: "36px 38px 32px",
          background: "rgba(0,0,0,0.78)",
          backdropFilter: "blur(6px)",
        }}
      >
        <span className="cb-c1" />
        <span className="cb-c2" />

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            className="cb-upper"
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "var(--grn-2)",
              marginBottom: 10,
            }}
          >
            {"// operator authentication"}
          </div>
          <div
            className="cb-grn-glow"
            style={{ fontSize: 28, letterSpacing: "0.12em", fontFamily: "var(--font-code)" }}
          >
            KIRISH
          </div>
          <div className="cb-dim" style={{ marginTop: 8, fontSize: 12, letterSpacing: "0.08em" }}>
            JS o‘yiniga kirish · 30 bosqich, 1 maqsad
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 22 }}>
          {[
            { id: "student" as const, txt: "TALABA" },
            { id: "teacher" as const, txt: "O‘QITUVCHI" },
          ].map((r, i) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              type="button"
              style={{
                background: role === r.id ? "rgba(0,255,65,0.16)" : "transparent",
                color: role === r.id ? "var(--grn-0)" : "var(--txt-dim)",
                border: "1px solid var(--grn-3)",
                borderLeftWidth: i === 0 ? 1 : 0,
                padding: "10px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                cursor: "pointer",
                boxShadow:
                  role === r.id ? "inset 0 0 12px rgba(0,255,65,0.18)" : "none",
                textShadow: role === r.id ? "0 0 8px rgba(0,255,65,0.6)" : "none",
              }}
            >
              {r.txt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AuthField
            label="TELEFON RAQAMI"
            value={phone}
            onChange={setPhone}
            placeholder="+998 90 123 45 67"
            right="ID"
            autoFocus
          />
          <PasswordField
            label="PAROL"
            value={pw}
            onChange={setPw}
            placeholder="••••••••"
            right="ENCRYPTED · AES-256"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
            }}
          >
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                color: "var(--txt-dim)",
                letterSpacing: "0.08em",
              }}
            >
              <span
                onClick={() => setRemember((r) => !r)}
                style={{
                  width: 16,
                  height: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--grn-3)",
                  background: remember ? "rgba(0,255,65,0.18)" : "transparent",
                  color: "var(--grn-0)",
                  fontSize: 11,
                }}
              >
                {remember ? "✓" : ""}
              </span>
              <span>SESSIYA · 24h saqlash</span>
            </label>
          </div>

          {error && (
            <div
              style={{
                padding: "10px 12px",
                border: "1px solid var(--err)",
                color: "var(--err)",
                fontSize: 11.5,
                background: "rgba(255,90,90,0.06)",
              }}
            >
              × {error}
            </div>
          )}

          {success && (
            <div
              style={{
                padding: "10px 12px",
                border: "1px solid var(--grn-0)",
                color: "var(--grn-0)",
                fontSize: 11.5,
                background: "rgba(0,255,65,0.06)",
                boxShadow: "0 0 14px rgba(0,255,65,0.3)",
              }}
            >
              ✓ Autentifikatsiya muvaffaqiyatli · yo‘naltirilmoqda…
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="cb-btn cb-btn-primary"
            style={{
              padding: "14px 18px",
              fontSize: 13,
              justifyContent: "center",
              letterSpacing: "0.24em",
              marginTop: 6,
            }}
          >
            {busy ? (
              <span className="cb-pulse">⟳ ULANISH…</span>
            ) : (
              <span>⟶ TIZIMGA KIRISH</span>
            )}
          </button>
        </form>

        <div
          style={{
            margin: "24px 0 18px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ height: 1, background: "var(--grn-5)" }} />
          <span className="cb-low" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
            YOKI
          </span>
          <div style={{ height: 1, background: "var(--grn-5)" }} />
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "var(--txt-dim)", marginTop: 6 }}>
          Hali ro‘yxatdan o‘tmaganmisiz?{" "}
          <Link
            href="/register"
            style={{
              color: "var(--grn-0)",
              textDecoration: "none",
              borderBottom: "1px solid var(--grn-3)",
            }}
          >
            RO‘YXATDAN O‘TISH ›
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
