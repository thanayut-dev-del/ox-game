export default function ScoreBadge({ score, streak }: { score: number; streak: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span>
        Score: <b>{score}</b>
      </span>
      <span>
        Streak: <b>{streak}</b>
      </span>
    </div>
  );
}
