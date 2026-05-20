"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthField, AuthShell, PasswordField } from "@/components/cyber";
import { signUp } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase";
import { setRoleCookie } from "@/lib/session";

const REG_GROUPS = ["JS-101-A", "JS-101-B", "JS-202-A", "NIGHT-OPS"];

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    first: "",
    last: "",
    phone: "+998 ",
    group: "JS-101-A",
    pw: "",
    pw2: "",
    accept: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof data, v: string | boolean) =>
    setData((d) => ({ ...d, [k]: v }));

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s >= 1) {
      if (data.first.trim().length < 2) e.first = "Ism juda qisqa.";
      if (data.last.trim().length < 2) e.last = "Familiya juda qisqa.";
      if (data.phone.replace(/\D/g, "").length < 9) e.phone = "Telefon noto‘g‘ri.";
    }
    if (s >= 2) {
      if (data.pw.length < 6) e.pw = "Kamida 6 belgi.";
      if (data.pw !== data.pw2) e.pw2 = "Parollar mos kelmadi.";
    }
    if (s >= 3 && !data.accept) e.accept = "Shartlarni qabul qiling.";
    return e;
  };

  const next = async () => {
    const e = validateStep(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!isFirebaseConfigured()) {
      setErrors({ accept: "Firebase sozlanmagan." });
      return;
    }

    setBusy(true);
    try {
      await signUp({
        phone: data.phone,
        password: data.pw,
        firstName: data.first,
        lastName: data.last,
        role: "student",
        group: data.group,
      });
      setRoleCookie("student");
      setDone(true);
      setTimeout(() => router.push("/workspace"), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Ro‘yxatdan o‘tish xatosi.";
      setErrors({ accept: msg.includes("email-already-in-use") ? "Bu telefon allaqachon ro‘yxatdan o‘tgan." : msg });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      screenLabel="04 Register"
      hudLeft="auth.register"
      hudRight={`STEP ${step}/3`}
      footerText="© SARHISOB.LAB · sertifikatlar /etc/x509"
    >
      <div
        className="cb-panel cb-panel-glow cb-corners auth-panel"
        style={{
          position: "relative",
          padding: "32px 34px 28px",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(6px)",
        }}
      >
        <span className="cb-c1" />
        <span className="cb-c2" />

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            className="cb-upper"
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "var(--grn-2)",
              marginBottom: 10,
            }}
          >
            {"// new operator enrollment"}
          </div>
          <div
            className="cb-grn-glow"
            style={{ fontSize: 26, letterSpacing: "0.12em", fontFamily: "var(--font-code)" }}
          >
            RO‘YXATDAN O‘TISH
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 22,
          }}
        >
          {["IDENTITY", "CREDENTIALS", "CONFIRM"].map((label, i) => {
            const idx = i + 1;
            const active = step === idx;
            const past = step > idx;
            return (
              <div key={label} style={{ opacity: active || past ? 1 : 0.5 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: active ? "var(--grn-0)" : past ? "var(--grn-2)" : "var(--txt-low)",
                  }}
                >
                  {past ? "✓" : idx} {label}
                </div>
                <div
                  style={{
                    height: 2,
                    marginTop: 6,
                    background: active ? "var(--grn-0)" : past ? "var(--grn-2)" : "var(--grn-5)",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 280 }}>
          {step === 1 && (
            <>
              <div className="auth-register-names" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <AuthField
                  label="ISM"
                  value={data.first}
                  onChange={(v) => set("first", v)}
                  placeholder="Aziza"
                  hint={errors.first}
                  error={!!errors.first}
                  autoFocus
                />
                <AuthField
                  label="FAMILIYA"
                  value={data.last}
                  onChange={(v) => set("last", v)}
                  placeholder="Karimova"
                  hint={errors.last}
                  error={!!errors.last}
                />
              </div>
              <AuthField
                label="TELEFON RAQAMI"
                value={data.phone}
                onChange={(v) => set("phone", v)}
                placeholder="+998 90 123 45 67"
                hint={errors.phone || "O‘zbekiston formatida, xalqaro kod bilan."}
                error={!!errors.phone}
                right="ID"
              />
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--grn-2)",
                    marginBottom: 8,
                  }}
                >
                  › GURUH TANLASH
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {REG_GROUPS.map((g) => {
                    const on = data.group === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => set("group", g)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          background: on ? "rgba(0,255,65,0.14)" : "rgba(0,0,0,0.5)",
                          border: `1px solid ${on ? "var(--grn-0)" : "var(--grn-4)"}`,
                          color: on ? "var(--grn-0)" : "var(--txt-dim)",
                          cursor: "pointer",
                          fontFamily: "var(--font-mono)",
                          fontSize: 12,
                        }}
                      >
                        {g} {on ? "◉" : "◎"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <PasswordField
                label="PAROL YARATING"
                value={data.pw}
                onChange={(v) => set("pw", v)}
                placeholder="kamida 6 belgi"
                showStrength
                hint={errors.pw}
                autoFocus
              />
              <PasswordField
                label="PAROLNI TASDIQLANG"
                value={data.pw2}
                onChange={(v) => set("pw2", v)}
                placeholder="qaytaring"
                hint={errors.pw2}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div
                style={{
                  padding: "14px 16px",
                  border: "1px solid var(--grn-3)",
                  background: "rgba(0,255,65,0.04)",
                  fontSize: 12.5,
                }}
              >
                <div className="cb-grn" style={{ fontSize: 10, marginBottom: 10 }}>
                  {"// SIZNING MA'LUMOTLARINGIZ"}
                </div>
                <div>
                  {data.first} {data.last} · {data.phone} · {data.group}
                </div>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 11.5,
                  color: "var(--txt-dim)",
                  cursor: "pointer",
                }}
              >
                <span
                  onClick={() => set("accept", !data.accept)}
                  style={{
                    width: 18,
                    height: 18,
                    border: `1px solid ${errors.accept ? "var(--err)" : "var(--grn-3)"}`,
                    background: data.accept ? "rgba(0,255,65,0.2)" : "transparent",
                    color: "var(--grn-0)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {data.accept ? "✓" : ""}
                </span>
                <span>
                  Foydalanish shartlari va xavfsizlik bayonotini o‘qib chiqdim. Mening kod
                  yuborganlarim o‘qituvchi tomonidan ko‘rib chiqilishi mumkin.
                </span>
              </label>
              {errors.accept && (
                <div style={{ color: "var(--err)", fontSize: 11 }}>× {errors.accept}</div>
              )}
            </>
          )}
        </div>

        <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            className="cb-btn cb-btn-ghost"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            ◀ ORQAGA
          </button>
          <button
            type="button"
            className="cb-btn cb-btn-primary"
            onClick={next}
            disabled={busy}
          >
            {step < 3 ? "KEYINGI ▶" : busy ? "⟳ …" : "⟶ RO‘YXATDAN O‘TISH"}
          </button>
        </div>

        {done && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              display: "grid",
              placeItems: "center",
              zIndex: 5,
            }}
          >
            <div className="cb-grn-glow" style={{ fontSize: 34, fontFamily: "var(--font-code)" }}>
              ACCESS_GRANTED
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", fontSize: 12, color: "var(--txt-dim)", marginTop: 18 }}>
          Hisobingiz bormi?{" "}
          <Link href="/login" style={{ color: "var(--grn-0)", borderBottom: "1px solid var(--grn-3)" }}>
            KIRISH ›
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
