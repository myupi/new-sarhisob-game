export interface KeyDisplayProps {
  word: string;
  revealCount: number;
}

export function KeyDisplay({ word, revealCount }: KeyDisplayProps) {
  const letters = word.split("");
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {letters.map((c, i) => {
        const rev = i < revealCount;
        return (
          <div key={i} className={`cb-keybox ${rev ? "revealed" : "locked"}`}>
            {rev ? c : "*"}
          </div>
        );
      })}
    </div>
  );
}
