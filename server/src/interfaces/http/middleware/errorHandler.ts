import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../../core/errors.js';
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError)
    return res.status(err.status).json({ error: err.message, details: err.details });
  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
}
