import { useEffect, useState } from 'react';
import { getLeaderboard, getUserHistory } from 'entities/admin/api';
export default function AdminLeaderboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    getLeaderboard()
      .then(setRows)
      .catch(() => setRows([]));
  }, []);
  const view = async (id: number) => {
    setSelected(id);
    const data = await getUserHistory(id).catch(() => []);
    setHistory(data);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th>
            <th>Streak</th>
            <th>Best</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src={r.avatar} style={{ width: 24, height: 24, borderRadius: 999 }} />
                {r.name}
              </td>
              <td>{r.email}</td>
              <td>{r.score}</td>
              <td>{r.win_streak}</td>
              <td>{r.best_streak}</td>
              <td>
                <button onClick={() => view(r.id)}>History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div style={{ marginTop: 16 }}>
          <h4>User #{selected} recent matches</h4>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Result</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {history.map((m: any, i: number) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td>{m.result}</td>
                  <td>{new Date(m.finished_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
