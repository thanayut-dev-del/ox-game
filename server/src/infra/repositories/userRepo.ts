import { pool } from '../db/pool.js';
export const UserRepo = {
  async findByProvider(provider: string, provider_id: string) {
    const [r] = await pool.query('SELECT * FROM users WHERE provider=? AND provider_id=?', [
      provider,
      provider_id,
    ]);
    return (r as any[])[0] ?? null;
  },
  async findById(id: number) {
    const [r] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
    return (r as any[])[0] ?? null;
  },
  async findAllWithStats() {
    const [r] = await pool.query(
      'SELECT u.id,u.name,u.email,u.avatar,s.score,s.win_streak,s.best_streak FROM stats s JOIN users u ON u.id=s.user_id ORDER BY s.score DESC, u.name ASC'
    );
    return r as any[];
  },
  async insert(u: any) {
    const [res] = await pool.query(
      'INSERT INTO users (provider, provider_id, email, name, avatar, is_admin) VALUES (?,?,?,?,?,?)',
      [u.provider, u.provider_id, u.email, u.name, u.avatar, u.is_admin ?? false]
    );
    const id = (res as any).insertId;
    const [r2] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
    return (r2 as any[])[0];
  },
  async updateAdminFlag(id: number, isAdmin: boolean) {
    await pool.query('UPDATE users SET is_admin=? WHERE id=?', [isAdmin, id]);
  },
};
