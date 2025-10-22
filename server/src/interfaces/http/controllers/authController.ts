import { Router } from 'express';
import passport from '../auth/passport.js';
import { Env } from '../../../config/env.js';

export const authController = Router();

authController.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authController.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: Env.CLIENT_URL + '/login' }),
  (_req, res) => res.redirect(Env.CLIENT_URL)
);

authController.post('/logout', (req: any, res) => {
  req.logout(() => {});
  res.clearCookie('connect.sid');
  res.json({ ok: true });
});
