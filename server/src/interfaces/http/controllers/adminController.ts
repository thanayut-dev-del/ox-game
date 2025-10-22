import { Router } from 'express';
import { ensureAdmin } from '../middleware/auth.js';
import { ScoreService } from '../../../application/services/scoreService.js';
import { validateParams } from '../middleware/validate.js';
import { IdParam } from '../dto/commonDto.js';
import { asyncWrap } from '../utils/asyncWrap.js';
export const adminController = Router();
adminController.get(
  '/leaderboard',
  ensureAdmin,
  asyncWrap(async (_req, res) => {
    res.json(await ScoreService.adminLeaderboard());
  })
);
adminController.get(
  '/user/:userId/history',
  ensureAdmin,
  validateParams(IdParam),
  asyncWrap(async (req: any, res) => {
    const id: number = req.validated.params.userId;
    res.json(await ScoreService.adminUserHistory(id));
  })
);
