import type { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  delta?: string;
  accent?: boolean;
}

export function StatCard({ label, value, delta, accent }: StatCardProps) {
  return (
    <div className="cb-panel cb-corners" style={{ padding: "14px 18px", position: "relative", minHeight: 92 }}>
      <span className="cb-c1" />
      <span className="cb-c2" />
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--grn-2)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div
          className={accent ? "cb-grn-glow" : "cb-grn"}
          style={{ fontSize: 30, fontFamily: "var(--font-code)" }}
        >
          {value}
        </div>
        {delta && <div style={{ fontSize: 11, color: "var(--txt-dim)" }}>{delta}</div>}
      </div>
    </div>
  );
}
