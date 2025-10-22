import { useState, useEffect } from 'react';
import { api } from 'shared/api';
type Cell = 'X' | 'O' | null;
export default function Board({
  onResult,
  disabled,
  resetKey,
}: {
  onResult: (r: any) => void;
  disabled: boolean;
  resetKey: number;
}) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [lock, setLock] = useState(false);
  useEffect(() => {
    setBoard(Array(9).fill(null));
    setLock(false);
  }, [resetKey]);
  async function clickCell(i: number) {
    if (disabled || lock || board[i]) return;
    const next = board.slice();
    next[i] = 'X';
    setBoard(next);
    setLock(true);
    const { data } = await api.post('/api/game/move', { board: next });
    setBoard(data.board);
    setLock(false);
    if (data.result) onResult(data.result);
  }
  return (
    <div className="grid3">
      {board.map((c, i) => (
        <button
          key={i}
          disabled={disabled || !!c}
          onClick={() => clickCell(i)}
          style={{ height: 100, fontSize: 28 }}
        >
          {c ?? ''}
        </button>
      ))}
    </div>
  );
}
