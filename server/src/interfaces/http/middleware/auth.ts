import { Request, Response, NextFunction } from 'express';
export const ensureAuth = (req: any, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
};
export const ensureAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user?.is_admin) return next();
  res.status(403).json({ error: 'Forbidden' });
};
