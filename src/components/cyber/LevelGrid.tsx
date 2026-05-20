"use client";

import { MISSIONS } from "@/lib/missions";

export interface LevelGridProps {
  current: number;
  unlocked: number;
  completed: number[];
  onPick: (id: number) => void;
}

export function LevelGrid({ current, unlocked, completed, onPick }: LevelGridProps) {
  return (
    <div className="cb-level-grid" style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
      {MISSIONS.map((m) => {
        const locked = m.id > unlocked;
        const done = completed.includes(m.id);
        const active = m.id === current;
        return (
          <button
            key={m.id}
            type="button"
            data-locked={locked}
            className={`cb-level ${active ? "active" : ""} ${done ? "done" : ""}`}
            onClick={() => !locked && onPick(m.id)}
            title={locked ? "Qulflangan" : m.title}
          >
            {locked ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="11" width="14" height="10" rx="1" />
                <path d="M8 11V8a4 4 0 1 1 8 0v3" />
              </svg>
            ) : (
              String(m.id).padStart(2, "0")
            )}
          </button>
        );
      })}
    </div>
  );
}
