export type Cell = 'X' | 'O' | null;
export type Board = Cell[];
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const winnerOf = (b: Board): 'X' | 'O' | 'DRAW' | null => {
  for (const [a, b2, c] of lines) if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a];
  return b.every(Boolean) ? 'DRAW' : null;
};
const available = (b: Board) =>
  b.map((v, i) => (v ? null : i)).filter((v) => v !== null) as number[];
function findWinningMove(b: Board, who: 'X' | 'O') {
  for (const i of available(b)) {
    b[i] = who;
    const w = winnerOf(b);
    b[i] = null;
    if (w === who) return i;
  }
  return null;
}
function minimax(b: Board, isBot: boolean) {
  const w = winnerOf(b);
  if (w === 'O') return 1;
  if (w === 'X') return -1;
  if (w === 'DRAW') return 0;
  if (isBot) {
    let best = -Infinity;
    for (const i of available(b)) {
      b[i] = 'O';
      best = Math.max(best, minimax(b, false));
      b[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of available(b)) {
      b[i] = 'X';
      best = Math.min(best, minimax(b, true));
      b[i] = null;
    }
    return best;
  }
}
function bestMoveStrong(b: Board) {
  let move = -1,
    score = -Infinity;
  for (const i of available(b)) {
    b[i] = 'O';
    const s = minimax(b, false);
    b[i] = null;
    if (s > score) {
      score = s;
      move = i;
    }
  }
  return move;
}
export function bestMove(b: Board, m: number) {
  const winning = findWinningMove(b, 'O');
  if (winning !== null) return winning;
  const avail = available(b);
  if (Math.random() < m) return avail[Math.floor(Math.random() * avail.length)];
  const block = findWinningMove(b, 'X');
  if (block !== null) return block;
  return bestMoveStrong(b);
}
