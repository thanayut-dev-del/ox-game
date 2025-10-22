import { Router } from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { ScoreService } from '../../../application/services/scoreService.js';
import { asyncWrap } from '../utils/asyncWrap.js';
export const scoreController = Router();
scoreController.get(
  '/me',
  ensureAuth,
  asyncWrap(async (req: any, res) => {
    res.json(await ScoreService.me(req.user.id));
  })
);
scoreController.get(
  '/me/history',
  ensureAuth,
  asyncWrap(async (req: any, res) => {
    res.json(await ScoreService.myHistory(req.user.id));
  })
);
