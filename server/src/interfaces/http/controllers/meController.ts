import { Router } from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { UserRepo } from '../../../infra/repositories/userRepo.js';
export const meController = Router();
meController.get('/', ensureAuth, async (req: any, res) => {
  const u = await UserRepo.findById(req.user.id);
  const { id, email, name, avatar, is_admin } = u!;
  res.json({ id, email, name, avatar, is_admin });
});
