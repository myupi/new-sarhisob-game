"use client";

import { useState } from "react";

export interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  showStrength?: boolean;
  placeholder?: string;
  hint?: string;
  right?: string;
  autoFocus?: boolean;
}

export function PasswordField({
  label,
  value,
  onChange,
  showStrength,
  placeholder,
  hint,
  right,
  autoFocus,
}: PasswordFieldProps) {
  const [shown, setShown] = useState(false);
  const score = (() => {
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[a-z]/.test(value)) s++;
    if (/[0-9]/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return s;
  })();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--grn-2)",
          marginBottom: 6,
        }}
      >
        <span>› {label}</span>
        {right && (
          <span className="cb-low" style={{ letterSpacing: "0.12em" }}>
            {right}
          </span>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type={shown ? "text" : "password"}
          className="cb-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{ padding: "11px 44px 11px 14px", fontSize: 14, background: "rgba(0,0,0,0.6)" }}
        />
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: "translateY(-50%)",
            width: 30,
            height: 30,
            background: "transparent",
            border: 0,
            color: "var(--grn-2)",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
          }}
          title={shown ? "Yashirish" : "Ko‘rsatish"}
        >
          {shown ? "◉" : "◎"}
        </button>
      </div>

      {showStrength && (
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", gap: 3, flex: 1 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  background:
                    i < score
                      ? score < 3
                        ? "var(--warn)"
                        : "var(--grn-0)"
                      : "rgba(0,255,65,0.08)",
                  boxShadow: i < score ? "0 0 6px currentColor" : "none",
                }}
              />
            ))}
          </div>
          <span style={{ color: score < 3 ? "var(--warn)" : "var(--grn-0)" }}>
            {score === 0 ? "—" : score < 3 ? "kuchsiz" : score < 5 ? "kuchli" : "maksimal"}
          </span>
        </div>
      )}
      {hint && (
        <div style={{ marginTop: 6, fontSize: 10.5, color: "var(--txt-low)" }}>{hint}</div>
      )}
    </div>
  );
}
