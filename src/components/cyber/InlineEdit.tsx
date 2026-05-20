"use client";

import { useEffect, useState } from "react";

export interface InlineEditProps {
  value: string;
  onSave: (v: string) => void;
}

export function InlineEdit({ value, onSave }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [tmp, setTmp] = useState(value);

  useEffect(() => {
    setTmp(value);
  }, [value]);

  if (editing) {
    return (
      <input
        autoFocus
        className="cb-input"
        style={{ padding: "4px 8px", fontSize: 12.5 }}
        value={tmp}
        onChange={(e) => setTmp(e.target.value)}
        onBlur={() => {
          onSave(tmp);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave(tmp);
            setEditing(false);
          }
          if (e.key === "Escape") {
            setTmp(value);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      style={{ cursor: "text", padding: "2px 4px", margin: "0 -4px" }}
      title="Tahrirlash uchun bosing"
    >
      {value}
    </span>
  );
}
