import type { CSSProperties, ReactNode } from "react";

export interface TerminalBlockProps {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TerminalBlock({
  title,
  right,
  children,
  glow = false,
  className = "",
  style,
}: TerminalBlockProps) {
  return (
    <div
      className={`cb-panel ${glow ? "cb-panel-glow" : ""} cb-corners ${className}`.trim()}
      style={style}
    >
      <span className="cb-c1" />
      <span className="cb-c2" />
      {(title || right) && (
        <div
          className="cb-terminal-head"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 6,
            padding: "8px 14px",
            borderBottom: "1px solid var(--grn-5)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--grn-2)",
            background: "rgba(0,255,65,0.03)",
          }}
        >
          <span>{title}</span>
          <span style={{ color: "var(--txt-low)" }}>{right}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
