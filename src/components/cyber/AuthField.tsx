"use client";

export interface AuthFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  autoFocus?: boolean;
  right?: string;
  error?: boolean;
}

export function AuthField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  autoFocus,
  right,
  error,
}: AuthFieldProps) {
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: error ? "var(--err)" : "var(--grn-2)",
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
      <input
        type={type}
        className="cb-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          padding: "11px 14px",
          fontSize: 14,
          background: "rgba(0,0,0,0.6)",
          borderColor: error ? "var(--err)" : "var(--grn-3)",
          boxShadow: error ? "0 0 0 1px var(--err)" : undefined,
        }}
      />
      {hint && (
        <div
          style={{
            marginTop: 4,
            fontSize: 10.5,
            color: error ? "var(--err)" : "var(--txt-low)",
            letterSpacing: "0.06em",
          }}
        >
          {hint}
        </div>
      )}
    </label>
  );
}
