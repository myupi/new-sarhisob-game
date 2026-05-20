"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  minHeight?: number;
}

export function CodeEditor({ value, onChange, minHeight = 280 }: CodeEditorProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      setHeight(Math.max(minHeight, el.clientHeight));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [minHeight]);

  return (
    <div ref={wrapRef} style={{ flex: 1, minHeight, width: "100%", height: "100%" }}>
      <Editor
        height={height}
        language="javascript"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          readOnly: false,
          fontSize: 13.5,
          fontFamily: "JetBrains Mono, monospace",
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 10, bottom: 10 },
          tabSize: 2,
          wordWrap: "on",
          automaticLayout: true,
          renderLineHighlight: "line",
          cursorBlinking: "solid",
          cursorStyle: "line",
        }}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme("sarhisob-green", {
            base: "vs-dark",
            inherit: true,
            rules: [
              { token: "comment", foreground: "2f5a36", fontStyle: "italic" },
              { token: "string", foreground: "f0c860" },
              { token: "number", foreground: "76d9ff" },
              { token: "keyword", foreground: "5af0a4" },
              { token: "identifier", foreground: "b6ffc4" },
            ],
            colors: {
              "editor.background": "#00000000",
              "editor.foreground": "#b6ffc4",
              "editorLineNumber.foreground": "#066d1c",
              "editorLineNumber.activeForeground": "#00ff41",
              "editorCursor.foreground": "#00ff41",
              "editor.selectionBackground": "#00ff4133",
              "editor.lineHighlightBackground": "#00ff4108",
            },
          });
        }}
        onMount={(editor, monaco) => {
          monaco.editor.setTheme("sarhisob-green");
          editor.focus();
        }}
      />
    </div>
  );
}
