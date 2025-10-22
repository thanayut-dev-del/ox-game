import { pool } from '../../infra/db/pool.js';
import { MatchRepo } from '../../infra/repositories/matchRepo.js';
import { StatsRepo } from '../../infra/repositories/statsRepo.js';
import { bestMove, winnerOf, Board } from '../../domain/bot.js';
import { Env } from '../../config/env.js';
export const GameService = {
  async nextStateAfterPlayerMove(userId: number, board: Board) {
    const status = winnerOf(board);
    if (status) {
      const result = status === 'X' ? 'WIN' : status === 'O' ? 'LOSS' : 'DRAW';
      await this._finalize(userId, result, board);
      return { board, result };
    }
    const move = bestMove(board, Env.BOT_MISTAKE_RATE);
    board[move] = 'O';
    const w = winnerOf(board);
    if (w) {
      const result = w === 'X' ? 'WIN' : w === 'O' ? 'LOSS' : 'DRAW';
      await this._finalize(userId, result, board);
      return { board, result };
    }
    return { board, result: null };
  },
  async _finalize(userId: number, result: 'WIN' | 'LOSS' | 'DRAW', board: any) {
    await MatchRepo.insert(userId, result, { board });
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await StatsRepo.applyResultTx(conn, userId, { result });
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  },
};
