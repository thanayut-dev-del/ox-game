import { pool } from '../db/pool.js';
export const MatchRepo = {
  async insert(userId: number, result: 'WIN' | 'LOSS' | 'DRAW', moves: any) {
    await pool.query('INSERT INTO matches (user_id, result, moves) VALUES (?,?,?)', [
      userId,
      result,
      JSON.stringify(moves),
    ]);
  },
  async historyForUser(userId: number, limit = 50) {
    const [r] = await pool.query(
      'SELECT id, result, finished_at FROM matches WHERE user_id=? ORDER BY finished_at DESC LIMIT ?',
      [userId, limit]
    );
    return r as any[];
  },
};
