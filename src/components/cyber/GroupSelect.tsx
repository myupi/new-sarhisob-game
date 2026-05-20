"use client";

import { useEffect, useRef, useState } from "react";

export interface GroupSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function GroupSelect({ value, onChange, options }: GroupSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        className="cb-btn cb-btn-ghost"
        style={{ padding: "4px 10px", fontSize: 11 }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {value} <span className="cb-low">▾</span>
      </button>
      {open && (
        <div className="cb-dropdown" style={{ top: "100%", left: 0, marginTop: 4 }}>
          {options
            .filter((o) => o !== "ALL")
            .map((o) => (
              <button
                key={o}
                type="button"
                className={o === value ? "active" : ""}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                {o}
              </button>
            ))}
        </div>
      )}
    </span>
  );
}
