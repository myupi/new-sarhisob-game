"use client";

import { useEffect, useRef } from "react";

export interface MatrixRainProps {
  density?: number;
  speed?: number;
  fontSize?: number;
  opacity?: number;
}

export function MatrixRain({
  density = 0.85,
  speed = 1,
  fontSize = 14,
  opacity = 1,
}: MatrixRainProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const context = el.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let w = (el.width = el.offsetWidth);
    let h = (el.height = el.offsetHeight);
    const chars =
      "アァカサタナハマヤラワABCDEF0123456789{}[]()<>+-=*/!?;:_$#@&%".split("");
    let cols: number;
    let drops: number[];

    const canvas = el;
    function reset() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      cols = Math.floor(w / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -h);
    }

    reset();
    const ro = new ResizeObserver(reset);
    ro.observe(canvas);

    let raf = 0;
    function tick() {
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        if (Math.random() > density) continue;
        const c = chars[(Math.random() * chars.length) | 0]!;
        const x = i * fontSize;
        const y = drops[i]!;
        ctx.fillStyle = `rgba(190,255,200,${opacity})`;
        ctx.fillText(c, x, y);
        ctx.fillStyle = `rgba(0,255,65,${0.7 * opacity})`;
        ctx.fillText(chars[(Math.random() * chars.length) | 0]!, x, y - fontSize);
        drops[i] = y + fontSize * (0.6 + Math.random() * 0.6) * speed;
        if (drops[i]! > h && Math.random() > 0.975) drops[i] = 0;
      }
      raf = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, speed, fontSize, opacity]);

  return <canvas ref={ref} className="cb-matrix-canvas" />;
}
