import { useEffect, useState } from 'react';
import { getMyScore, getMyHistory } from 'entities/stats/api';
import ScoreBadge from 'widgets/scoreboard/ui/ScoreBadge';
import Board from 'features/board/ui/Board';
import RestartButton from 'features/game/restart/ui/RestartButton';
import { useRestart } from 'features/game/restart/model/useRestart';
import Button from 'shared/ui/Button';
type Match = { id: number; result: 'WIN' | 'LOSS' | 'DRAW'; finished_at: string };
export default function GamePage() {
  const [score, setScore] = useState({ score: 0, win_streak: 0 });
  const [message, setMessage] = useState('Your turn!');
  const [finished, setFinished] = useState(false);
  const { resetKey, restart } = useRestart();
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<Match[]>([]);
  const load = async () => setScore(await getMyScore());
  useEffect(() => {
    load();
  }, []);
  const onResult = async (r: 'WIN' | 'LOSS' | 'DRAW') => {
    setMessage(r === 'WIN' ? 'You win!' : r === 'LOSS' ? 'You lose!' : 'Draw!');
    setFinished(true);
    await load();
  };
  const handleRestart = () => {
    setFinished(false);
    setMessage('Your turn!');
    restart();
  };
  const toggleHistory = async () => {
    const next = !showHistory;
    setShowHistory(next);
    if (next) {
      const data = await getMyHistory();
      setHistory(data);
      setTimeout(
        () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
        50
      );
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ScoreBadge score={score.score} streak={score.win_streak} />
        <div style={{ display: 'flex', gap: 8 }}>
          <RestartButton onClick={handleRestart} finished={finished} />
          <Button onClick={toggleHistory}>{showHistory ? 'Hide' : 'My History'}</Button>
        </div>
      </div>
      <p style={{ marginTop: 8 }}>{message}</p>
      <Board onResult={onResult} disabled={finished} resetKey={resetKey} />
      {showHistory && (
        <div style={{ marginTop: 24 }}>
          <h4>My recent matches</h4>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Result</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {history.map((m, i) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td>{m.result}</td>
                  <td>{new Date(m.finished_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer-space" />
        </div>
      )}
    </div>
  );
}
