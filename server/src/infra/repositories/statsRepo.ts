import { pool } from '../db/pool.js';
export const StatsRepo = {
  async ensureForUser(userId: number) {
    await pool.query('INSERT IGNORE INTO stats (user_id) VALUES (?)', [userId]);
  },
  async getForUser(userId: number) {
    const [r] = await pool.query(
      'SELECT score, win_streak, best_streak FROM stats WHERE user_id=?',
      [userId]
    );
    return (r as any[])[0] ?? { user_id: userId, score: 0, win_streak: 0, best_streak: 0 };
  },
  async applyResultTx(conn: any, userId: number, delta: { result: 'WIN' | 'LOSS' | 'DRAW' }) {
    const [r] = await conn.query(
      'SELECT score, win_streak, best_streak FROM stats WHERE user_id=? FOR UPDATE',
      [userId]
    );
    const s = (r as any[])[0] ?? { score: 0, win_streak: 0, best_streak: 0 };
    let { score, win_streak, best_streak } = s;
    if (delta.result === 'WIN') {
      score += 1;
      win_streak += 1;
      if (win_streak >= 3) {
        score += 1;
        win_streak = 0;
      }
      if (win_streak > best_streak) best_streak = win_streak;
    } else if (delta.result === 'LOSS') {
      score -= 1;
      win_streak = 0;
    }
    await conn.query('UPDATE stats SET score=?, win_streak=?, best_streak=? WHERE user_id=?', [
      score,
      win_streak,
      best_streak,
      userId,
    ]);
  },
};
