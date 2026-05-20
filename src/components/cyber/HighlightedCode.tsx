"use client";

import { useMemo } from "react";
import { tokenize } from "./tokenize";

export interface HighlightedCodeProps {
  src: string;
}

export function HighlightedCode({ src }: HighlightedCodeProps) {
  const toks = useMemo(() => tokenize(src), [src]);

  return (
    <>
      {toks.map((t, idx) =>
        t.t === "ws" ? (
          <span key={idx}>{t.v}</span>
        ) : (
          <span key={idx} className={`tok-${t.t}`}>
            {t.v}
          </span>
        ),
      )}
    </>
  );
}
