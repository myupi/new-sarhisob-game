"use client";

import Image from "next/image";
import { useState } from "react";

export interface HackerSilhouetteProps {
  glow?: boolean;
  width?: number;
}

function HackerFallback() {
  return (
    <svg viewBox="0 0 360 360" width="100%" height="100%" aria-hidden="true">
      <path
        d="M 60 360 L 60 280 C 60 200, 120 120, 180 120 C 240 120, 300 200, 300 280 L 300 360 Z"
        fill="#020602"
        stroke="#00ff41"
        strokeWidth="1.5"
      />
      <path
        d="M 120 200 C 120 140, 150 100, 180 100 C 210 100, 240 140, 240 200 Z"
        fill="#020602"
        stroke="#00ff41"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function HackerSilhouette({ glow = true, width = 360 }: HackerSilhouetteProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width,
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: "-6%",
            background:
              "radial-gradient(circle at 50% 42%, rgba(0,255,65,0.32) 0%, rgba(0,255,65,0.08) 38%, transparent 70%)",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />
      )}
      {!imgError ? (
        <Image
          src="/hacker.png"
          alt="hacker"
          width={width}
          height={width}
          draggable={false}
          onError={() => setImgError(true)}
          className="hacker-float"
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            objectFit: "contain",
            filter: glow
              ? "drop-shadow(0 0 18px rgba(0,255,65,0.45)) drop-shadow(0 0 4px rgba(0,255,65,0.6))"
              : "none",
            userSelect: "none",
            pointerEvents: "none",
          }}
          priority
        />
      ) : (
        <HackerFallback />
      )}
    </div>
  );
}
