import { Router } from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { GameService } from '../../../application/services/gameService.js';
import { validateBody } from '../middleware/validate.js';
import { MoveBody } from '../dto/gameDto.js';
import { asyncWrap } from '../utils/asyncWrap.js';
export const gameController = Router();
gameController.post(
  '/move',
  ensureAuth,
  validateBody(MoveBody),
  asyncWrap(async (req: any, res) => {
    const board = req.validated.body.board;
    const result = await GameService.nextStateAfterPlayerMove(req.user.id, board);
    res.json(result);
  })
);
