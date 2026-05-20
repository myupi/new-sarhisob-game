export interface ProgressMiniProps {
  value: number;
  total: number;
}

export function ProgressMini({ value, total }: ProgressMiniProps) {
  const pct = (value / total) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 110 }}>
      <div style={{ flex: 1, height: 4, background: "rgba(0,255,65,0.08)", border: "1px solid var(--grn-5)" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "linear-gradient(90deg, var(--grn-2), var(--grn-0))",
            boxShadow: "0 0 6px var(--grn-0)",
          }}
        />
      </div>
      <div className="cb-grn" style={{ fontSize: 11, minWidth: 36, textAlign: "right" }}>
        {String(value).padStart(2, "0")}/{total}
      </div>
    </div>
  );
}
