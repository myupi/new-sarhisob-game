"use client";

import { useEffect, useState, type ReactNode } from "react";
import { HackerSilhouette, MatrixRain } from "@/components/cyber";

export interface AuthShellProps {
  children: ReactNode;
  screenLabel: string;
  hudLeft: string;
  hudRight: string;
  footerText: string;
}

export function AuthShell({
  children,
  screenLabel,
  hudLeft,
  hudRight,
  footerText,
}: AuthShellProps) {
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      "› bootstrap.init() …",
      "› secure.handshake / kex25519 … OK",
      "› key.verify(server.cert) … 256-bit",
      "› endpoint: gw-08.sarhisob.lab",
      "› awaiting credentials …",
    ];
    let i = 0;
    const id = setInterval(() => {
      if (i >= lines.length) {
        clearInterval(id);
        return;
      }
      setBootLines((b) => (b.length > i ? b : [...b, lines[i]!]));
      i++;
    }, 380);
    return () => clearInterval(id);
  }, []);

  const buildDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  return (
    <div className="cb-root" data-screen-label={screenLabel}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.45 }}>
        <MatrixRain density={0.75} speed={0.9} fontSize={14} />
      </div>
      <div className="cb-grid" />
      <div className="cb-scanlines" />
      <div className="cb-vignette" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,40,10,0.25) 0%, rgba(0,0,0,0.85) 80%)",
          pointerEvents: "none",
        }}
      />

      <header className="auth-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span className="cb-grn-glow">◆</span>
          <span>SARHISOB · access node</span>
          <span className="cb-low">/</span>
          <span className="cb-dim">{hudLeft}</span>
        </div>
        <div className="auth-top-bar-right">
          <span className="cb-pill ok cb-flicker" style={{ fontSize: 9 }}>
            secure
          </span>
          <span>UPTIME · 14:23:08</span>
          <span>{hudRight}</span>
        </div>
      </header>

      <div className="auth-shell-main">
        <aside className="auth-shell-side">
          <div
            className="cb-upper"
            style={{
              fontSize: 10,
              color: "var(--grn-2)",
              letterSpacing: "0.24em",
              marginBottom: 18,
            }}
          >
            ›_ KIRISH JURNALI
          </div>
          <div
            className="cb-code"
            style={{
              fontSize: 12.5,
              color: "var(--txt-dim)",
              lineHeight: 1.95,
              background: "rgba(0,0,0,0.4)",
              border: "1px solid var(--grn-5)",
              padding: "14px 16px",
              maxWidth: 420,
              backdropFilter: "blur(2px)",
            }}
          >
            {bootLines.filter(Boolean).map((l, i) => (
              <div
                key={i}
                className="cb-fadein"
                style={{
                  color:
                    l.includes("OK") || l.includes("256")
                      ? "var(--grn-0)"
                      : "var(--txt-dim)",
                }}
              >
                {l}
              </div>
            ))}
            <div className="cb-grn" style={{ display: "inline-block" }}>
              ›<span className="cb-caret" />
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 10.5,
              color: "var(--grn-3)",
              letterSpacing: "0.16em",
              maxWidth: 380,
              lineHeight: 1.85,
            }}
          >
            <div className="cb-grn" style={{ fontSize: 11, marginBottom: 6 }}>
              {"// disclaimer"}
            </div>
            <div>Tizimga kirish faqat ro‘yxatdan o‘tgan operatorlar uchun.</div>
            <div>Har bir urinish jurnalga yoziladi.</div>
          </div>
        </aside>

        <div className="auth-shell-form">{children}</div>

        <div className="auth-shell-hero">
          <div style={{ filter: "drop-shadow(0 0 24px rgba(0,255,65,0.25))" }}>
            <HackerSilhouette width={320} />
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        <span>{footerText}</span>
        <span>v 2.04.7 · build sarhisob-{buildDate}</span>
      </footer>
    </div>
  );
}
