import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

type WithValidated = Request & {
  validated?: {
    body?: unknown;
    params?: unknown;
    query?: unknown;
  };
};

export const validateBody =
  (schema: ZodSchema) => (req: WithValidated, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'ValidationError', details: parsed.error.flatten() });
    }
    req.validated = { ...(req.validated ?? {}), body: parsed.data };
    next();
  };

export const validateParams =
  (schema: ZodSchema) => (req: WithValidated, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: 'ValidationError', details: parsed.error.flatten() });
    }
    req.validated = { ...(req.validated ?? {}), params: parsed.data };
    next();
  };

export const validateQuery =
  (schema: ZodSchema) => (req: WithValidated, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: 'ValidationError', details: parsed.error.flatten() });
    }
    req.validated = { ...(req.validated ?? {}), query: parsed.data };
    next();
  };
