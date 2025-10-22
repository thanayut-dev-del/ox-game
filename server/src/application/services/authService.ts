import { UserRepo } from '../../infra/repositories/userRepo.js';
import { StatsRepo } from '../../infra/repositories/statsRepo.js';
import { Env } from '../../config/env.js';
export const AuthService = {
  async upsertGoogleUser(p: { id: string; email: string; name?: string; avatar?: string }) {
    const existing = await UserRepo.findByProvider('google', p.id);
    const isAdmin = p.email ? Env.ADMIN_EMAILS.includes(p.email) : false;
    if (existing) {
      if (!!existing.is_admin !== isAdmin) {
        await UserRepo.updateAdminFlag(existing.id, isAdmin);
        existing.is_admin = isAdmin;
      }
      return existing;
    }
    const created = await UserRepo.insert({
      provider: 'google',
      provider_id: p.id,
      email: p.email,
      name: p.name,
      avatar: p.avatar,
      is_admin: isAdmin,
    });
    await StatsRepo.ensureForUser(created.id);
    return created;
  },
};
